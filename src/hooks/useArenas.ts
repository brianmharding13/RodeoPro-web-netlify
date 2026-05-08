import { useQuery } from '@powersync/react';
import { execute } from '@/lib/db';
import type { ArenaRow } from '@/lib/schema';

const ARENAS_SQL = `
  SELECT * FROM arenas
  WHERE deleted_at IS NULL
  ORDER BY name ASC
`;

export function useArenas() {
  const { data, isLoading, error } = useQuery<ArenaRow>(ARENAS_SQL);
  return { arenas: data, isLoading, error };
}

export type CreateArenaInput = {
  userId: string;
  name: string;
  city?: string | null;
  state?: string | null;
  location?: string | null;
  profileImagePath?: string | null;
};

export async function createArena(input: CreateArenaInput): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await execute(
    `INSERT INTO arenas (
      id, user_id, name, city, state, location, profile_image_path,
      created_at, updated_at,
      name_updated_at, location_updated_at, profile_image_updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.userId,
      input.name,
      input.city ?? null,
      input.state ?? null,
      input.location ?? null,
      input.profileImagePath ?? null,
      now,
      now,
      now,
      now,
      now,
    ],
  );

  return id;
}

export type UpdateArenaInput = Partial<
  Pick<ArenaRow, 'name' | 'city' | 'state' | 'location' | 'profile_image_path'>
>;

export async function updateArena(id: string, input: UpdateArenaInput): Promise<void> {
  const now = new Date().toISOString();
  const fields: string[] = ['updated_at = ?'];
  const values: (string | number | null)[] = [now];

  if ('name' in input) {
    fields.push('name = ?', 'name_updated_at = ?');
    values.push(input.name ?? null, now);
  }
  if ('city' in input) {
    fields.push('city = ?');
    values.push(input.city ?? null);
  }
  if ('state' in input) {
    fields.push('state = ?');
    values.push(input.state ?? null);
  }
  if ('location' in input) {
    fields.push('location = ?', 'location_updated_at = ?');
    values.push(input.location ?? null, now);
  }
  if ('profile_image_path' in input) {
    fields.push('profile_image_path = ?', 'profile_image_updated_at = ?');
    values.push(input.profile_image_path ?? null, now);
  }

  values.push(id);
  await execute(`UPDATE arenas SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function deleteArena(id: string): Promise<void> {
  const now = new Date().toISOString();
  await execute(
    `UPDATE arenas SET deleted_at = ?, updated_at = ? WHERE id = ?`,
    [now, now, id],
  );
}
