import { useQuery } from '@powersync/react';
import { execute } from '@/lib/db';
import type { HorseRow } from '@/lib/schema';

const HORSES_SQL = `
  SELECT * FROM horses
  WHERE deleted_at IS NULL
  ORDER BY COALESCE(sort_order, 999999) ASC, barn_name ASC
`;

export function useHorses() {
  const { data, isLoading, error } = useQuery<HorseRow>(HORSES_SQL);
  return { horses: data, isLoading, error };
}

export type CreateHorseInput = {
  userId: string;
  barnName: string;
  registeredName?: string | null;
  profileImagePath?: string | null;
};

export async function createHorse(input: CreateHorseInput): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await execute(
    `INSERT INTO horses (
      id, user_id, barn_name, registered_name, profile_image_path,
      created_at, updated_at,
      barn_name_updated_at, registered_name_updated_at, profile_image_updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      input.userId,
      input.barnName,
      input.registeredName ?? null,
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

export type UpdateHorseInput = Partial<
  Pick<HorseRow, 'barn_name' | 'registered_name' | 'profile_image_path' | 'sort_order'>
>;

export async function updateHorse(id: string, input: UpdateHorseInput): Promise<void> {
  const now = new Date().toISOString();
  const fields: string[] = ['updated_at = ?'];
  const values: (string | number | null)[] = [now];

  if ('barn_name' in input) {
    fields.push('barn_name = ?', 'barn_name_updated_at = ?');
    values.push(input.barn_name ?? null, now);
  }
  if ('registered_name' in input) {
    fields.push('registered_name = ?', 'registered_name_updated_at = ?');
    values.push(input.registered_name ?? null, now);
  }
  if ('profile_image_path' in input) {
    fields.push('profile_image_path = ?', 'profile_image_updated_at = ?');
    values.push(input.profile_image_path ?? null, now);
  }
  if ('sort_order' in input) {
    fields.push('sort_order = ?');
    values.push(input.sort_order ?? null);
  }

  values.push(id);
  await execute(`UPDATE horses SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function deleteHorse(id: string): Promise<void> {
  const now = new Date().toISOString();
  await execute(
    `UPDATE horses SET deleted_at = ?, updated_at = ? WHERE id = ?`,
    [now, now, id],
  );
}
