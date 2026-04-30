import type { SSClient } from '../client.js';
import { PAPER_FIELDS } from '../fields.js';

export async function ssPaper(
  client: SSClient,
  args: { paper_id: string },
): Promise<unknown> {
  return client.get(`/paper/${encodeURIComponent(args.paper_id)}`, {
    fields: PAPER_FIELDS,
  });
}

export async function ssPaperBatch(
  client: SSClient,
  args: { paper_ids: string[] },
): Promise<unknown> {
  return client.post('/paper/batch', { ids: args.paper_ids }, {
    fields: PAPER_FIELDS,
  });
}
