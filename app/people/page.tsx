import type {Metadata} from 'next';
import {
  PeopleDirectory,
  type DirectoryGroups,
  type DirectoryPerson,
} from '@/components/people/people-directory';
import {client} from '@/sanity/lib/client';

export const metadata: Metadata = {
  title: 'People | JU FinAnt Club',
  description:
    'Meet the governing body, senior executive board, faculty advisors, and corporate advisors of Jahangirnagar University FinAnt Club.',
};

export const revalidate = 60;

type RawPerson = {
  _id: string;
  name?: string;
  designation?: string;
  company?: string;
  group?: string;
  imageUrl?: string;
};

const peopleQuery = `
  *[_type == "person" && coalesce(active, true) == true]
  | order(group asc, coalesce(order, 100) asc, name asc) {
    _id,
    name,
    "designation": coalesce(designation, role, "Designation"),
    company,
    group,
    "imageUrl": profileImage.asset->url
  }
`;

const groupNames = [
  'Governing Body',
  'Senior Executive Board',
  'Faculty Advisory Panel',
  'Corporate Advisory Panel',
] as const;

type GroupName = (typeof groupNames)[number];

function normalizeGroup(group?: string): GroupName | null {
  if (!group) return null;

  const aliases: Record<string, GroupName> = {
    'Governing Body': 'Governing Body',
    'Senior Executive Board': 'Senior Executive Board',
    'Faculty Advisory Panel': 'Faculty Advisory Panel',
    'Faculty Advisor': 'Faculty Advisory Panel',
    'Corporate Advisory Panel': 'Corporate Advisory Panel',
    'Corporate Advisory Board': 'Corporate Advisory Panel',
  };

  return aliases[group] || null;
}

function placeholderPeople(group: GroupName, count: number): DirectoryPerson[] {
  return Array.from({length: count}, (_, index) => ({
    id: `${group}-placeholder-${index + 1}`,
    name: 'Member Name',
    designation: 'Designation',
    company: group.includes('Advisory') ? 'Company/Institution' : undefined,
  }));
}

function buildGroups(people: RawPerson[]): DirectoryGroups {
  const grouped = Object.fromEntries(
    groupNames.map((group) => [group, [] as DirectoryPerson[]])
  ) as DirectoryGroups;

  people.forEach((person) => {
    const group = normalizeGroup(person.group);
    if (!group) return;

    grouped[group].push({
      id: person._id,
      name: person.name?.trim() || 'Member Name',
      designation: person.designation?.trim() || 'Designation',
      company: person.company?.trim() || undefined,
      imageUrl: person.imageUrl,
    });
  });

  if (grouped['Governing Body'].length === 0) {
    grouped['Governing Body'] = placeholderPeople('Governing Body', 5);
  }
  if (grouped['Senior Executive Board'].length === 0) {
    grouped['Senior Executive Board'] = placeholderPeople(
      'Senior Executive Board',
      6
    );
  }
  if (grouped['Faculty Advisory Panel'].length === 0) {
    grouped['Faculty Advisory Panel'] = placeholderPeople(
      'Faculty Advisory Panel',
      5
    );
  }
  if (grouped['Corporate Advisory Panel'].length === 0) {
    grouped['Corporate Advisory Panel'] = placeholderPeople(
      'Corporate Advisory Panel',
      5
    );
  }

  return grouped;
}

async function getPeople(): Promise<DirectoryGroups> {
  try {
    const people = await client.fetch<RawPerson[]>(
      peopleQuery,
      {},
      {next: {revalidate}}
    );
    return buildGroups(people);
  } catch (error) {
    console.error('Could not load people from Sanity CMS', error);
    return buildGroups([]);
  }
}

export default async function PeoplePage() {
  const groups = await getPeople();

  return (
    <section
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 50% 0%, rgba(5, 38, 83, .34), transparent 34%), #010d24',
      }}
    >
      <PeopleDirectory groups={groups} />
    </section>
  );
}
