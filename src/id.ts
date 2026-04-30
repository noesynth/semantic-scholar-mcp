export type PaperIdKind =
  | 'S2' | 'ARXIV' | 'DOI' | 'PMID' | 'PMCID'
  | 'ACL' | 'CorpusId' | 'URL' | 'UNKNOWN';

export interface ParsedPaperId {
  kind: PaperIdKind;
  raw: string;
  formatted: string;
}

const PREFIXES: PaperIdKind[] = [
  'ARXIV', 'DOI', 'PMID', 'PMCID', 'ACL', 'CorpusId', 'URL',
];

const S2_HEX = /^[0-9a-f]{40}$/i;
const BARE_ARXIV = /^\d{4}\.\d{4,5}(v\d+)?$/;
const BARE_DOI = /^10\.\d{4,}\//;
const BARE_URL = /^https?:\/\//i;

export function parsePaperId(input: string): ParsedPaperId {
  const trimmed = input.trim();

  for (const prefix of PREFIXES) {
    if (trimmed.toLowerCase().startsWith(prefix.toLowerCase() + ':')) {
      return { kind: prefix, raw: trimmed, formatted: `${prefix}:${trimmed.slice(prefix.length + 1)}` };
    }
  }

  if (S2_HEX.test(trimmed)) {
    return { kind: 'S2', raw: trimmed, formatted: trimmed };
  }

  if (BARE_ARXIV.test(trimmed)) {
    return { kind: 'ARXIV', raw: trimmed, formatted: `ARXIV:${trimmed}` };
  }

  if (BARE_DOI.test(trimmed)) {
    return { kind: 'DOI', raw: trimmed, formatted: `DOI:${trimmed}` };
  }

  if (BARE_URL.test(trimmed)) {
    return { kind: 'URL', raw: trimmed, formatted: `URL:${trimmed}` };
  }

  return { kind: 'UNKNOWN', raw: trimmed, formatted: trimmed };
}

export function isKnownId(id: ParsedPaperId): boolean {
  return id.kind !== 'UNKNOWN';
}
