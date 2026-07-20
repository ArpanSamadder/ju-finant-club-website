import type {StructureResolver} from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('JU FinAnt Club CMS')
    .items([
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.listItem()
                .title('Legacy Foundation')
                .child(S.documentTypeList('legacyEvent').title('Legacy Foundation')),
              S.listItem()
                .title('Voices of FinAnt')
                .child(S.documentTypeList('voiceOfFinant').title('Voices of FinAnt')),
              S.listItem()
                .title('Partners & Collaborators')
                .child(S.documentTypeList('partner').title('Partners & Collaborators')),
              S.listItem()
                .title('Closing CTA')
                .child(
                  S.document()
                    .schemaType('homepageClosingCta')
                    .documentId('homepageClosingCta')
                    .title('Closing CTA')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Initiatives')
        .child(S.documentTypeList('event').title('Full Initiative Documents')),
      S.listItem()
        .title('People')
        .child(S.documentTypeList('person').title('People and Advisor Documents')),
      S.divider(),
      S.listItem()
        .title('Global Settings')
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.listItem()
                .title('Footer')
                .child(
                  S.document()
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                    .title('Footer')
                ),
            ])
        ),
    ]);
