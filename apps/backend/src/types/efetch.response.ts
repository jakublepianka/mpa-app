export type EFetchResponse = {
  articles: {
    id: string;
    title: string;
    publicationDate?: string; // ISO: "2026-03-25"
    journal: {
      journalId?: string; // ISSN
      journalTitle: string;
    };
    abstract?: string;
    doi?: string;
    publicationType?: string;
    authors: {
      foreName?: string;
      lastName: string;
      initials?: string;
      orcid?: string;
    }[];
    language?: string;
    keywords: string[];
  }[];
};




