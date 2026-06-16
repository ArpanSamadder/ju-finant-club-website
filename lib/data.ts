import { BriefcaseBusiness, CalendarDays, Handshake, Sparkles, Trophy, UsersRound } from 'lucide-react';

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Biztigation 2.0', href: '/biztigation' },
  { label: 'Events', href: '/events' },
  { label: 'People', href: '/people' },
  { label: 'Partners', href: '/partners' },
  { label: 'Join Us', href: '/join' }
];

export const pillars = [
  {
    icon: Sparkles,
    title: 'AI-Native Capability',
    description: 'Members learn to use AI as leverage for research, communication, productivity, documentation, and execution.'
  },
  {
    icon: BriefcaseBusiness,
    title: 'Business Readiness',
    description: 'Finance, business cases, career preparation, presentation strength, and analytical thinking beyond the classroom.'
  },
  {
    icon: UsersRound,
    title: 'Leadership Development',
    description: 'A student-led structure where members grow through ownership, accountability, teamwork, and operational responsibility.'
  },
  {
    icon: Handshake,
    title: 'Corporate Connection',
    description: 'Partnerships, sponsors, advisors, judges, speakers, and recruiters connected to a serious student talent platform.'
  }
];

export const metrics = [
  { value: '2025', label: 'Established' },
  { value: 'AI-First', label: 'Professional Culture' },
  { value: '600+', label: 'Biztigation 2.0 Team Target' },
  { value: '35+', label: 'University Reach Target' }
];

export const eventCards = [
  {
    title: 'Biztigation 2.0',
    category: 'Flagship Business Case Competition',
    description: 'A national inter-university business tournament built around real-world corporate challenges.',
    stats: '600+ teams target · 35+ universities · 1.5M+ projected reach',
    href: '/biztigation'
  },
  {
    title: 'Crackademy',
    category: 'Competition Bootcamp',
    description: 'A practical training platform for case solving, presentation design, and executive-level pitching.',
    stats: '110+ teams · 21+ departments · 31K+ reach',
    href: '/events'
  },
  {
    title: 'Finance Fest Legacy',
    category: 'Student-Corporate Engagement',
    description: 'Job fairs, panels, publications, competitions, campus engagement, and large-scale audience activation.',
    stats: '80+ stalls · 15,000+ CVs · 20+ speakers',
    href: '/events'
  }
];

export const tournamentRounds = [
  {
    step: '01',
    title: 'The Qualifier',
    subtitle: 'PPTX Submission',
    description: 'Registered teams receive a real-world case and submit strategic solutions for expert evaluation.'
  },
  {
    step: '02',
    title: 'Semi-Final Gauntlet',
    subtitle: 'PPTX + OVC Submission',
    description: 'Top teams refine their strategies and create persuasive original video commercials.'
  },
  {
    step: '03',
    title: 'Grand Finale',
    subtitle: 'Live Presentation',
    description: 'Finalists defend their solutions before industry leaders, academics, and corporate evaluators.'
  }
];

export const samplePeople = [
  { name: 'Arpan Samadder', role: 'President', group: 'Governing Body', email: 'president@jufinant.org' },
  { name: 'General Secretary', role: 'General Secretary', group: 'Governing Body', email: 'general.secretary@jufinant.org' },
  { name: 'Corporate Advisor', role: 'Advisor', group: 'Corporate Advisory Board', email: 'partnerships@jufinant.org' }
];

export const partnerValues = [
  'Talent access across high-potential student communities',
  'Employer branding through workshops, case files, roadshows, and finale engagement',
  'Strategic sponsorship visibility beyond passive logo placement',
  'Long-term institutional relationship with JU FinAnt Club'
];

export const icons = { CalendarDays, Trophy, Handshake };
