export const PAPER_FIELDS = [
  'title', 'abstract', 'year', 'authors', 'citationCount',
  'influentialCitationCount', 'referenceCount', 'isOpenAccess',
  'openAccessPdf', 'externalIds', 'fieldsOfStudy', 'publicationTypes',
  'publicationDate', 'venue', 'tldr', 'url',
].join(',');

export const CITATION_EDGE_FIELDS = [
  'contexts', 'intents', 'isInfluential',
].join(',');

export const CITED_PAPER_FIELDS = [
  'title', 'abstract', 'year', 'authors', 'citationCount',
  'externalIds', 'url',
].join(',');

export const AUTHOR_FIELDS = [
  'name', 'affiliations', 'homepage', 'paperCount',
  'citationCount', 'hIndex', 'externalIds', 'url',
].join(',');
