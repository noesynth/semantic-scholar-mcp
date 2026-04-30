import type { SSClient } from '../client.js';
import { CITATION_EDGE_FIELDS, CITED_PAPER_FIELDS } from '../fields.js';

const REF_FIELDS = `${CITATION_EDGE_FIELDS},citedPaper.${CITED_PAPER_FIELDS.split(',').join(',citedPaper.')}`;
const CIT_FIELDS = `${CITATION_EDGE_FIELDS},citingPaper.${CITED_PAPER_FIELDS.split(',').join(',citingPaper.')}`;

interface PaginatedArgs {
  paper_id: string;
  offset?: number;
  limit?: number;
}

export async function ssReferences(
  client: SSClient,
  args: PaginatedArgs,
): Promise<unknown> {
  const params: Record<string, string> = {
    fields: REF_FIELDS,
    offset: String(args.offset ?? 0),
    limit: String(Math.min(args.limit ?? 100, 1000)),
  };
  return client.get(`/paper/${args.paper_id}/references`, params);
}

export async function ssCitations(
  client: SSClient,
  args: PaginatedArgs,
): Promise<unknown> {
  const params: Record<string, string> = {
    fields: CIT_FIELDS,
    offset: String(args.offset ?? 0),
    limit: String(Math.min(args.limit ?? 100, 1000)),
  };
  return client.get(`/paper/${args.paper_id}/citations`, params);
}
