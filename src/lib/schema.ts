import { column, Schema, Table } from '@powersync/web';

const users = new Table(
  {
    email: column.text,
    phone: column.text,
    profile_image_path: column.text,
    expo_push_tokens: column.text,
    created_at: column.text,
    updated_at: column.text,
    phone_updated_at: column.text,
    profile_image_updated_at: column.text,
    expo_push_tokens_updated_at: column.text,
  },
  { indexes: {} },
);

const horses = new Table(
  {
    user_id: column.text,
    barn_name: column.text,
    registered_name: column.text,
    profile_image_path: column.text,
    sort_order: column.integer,
    created_at: column.text,
    updated_at: column.text,
    barn_name_updated_at: column.text,
    registered_name_updated_at: column.text,
    profile_image_updated_at: column.text,
    deleted_at: column.text,
  },
  { indexes: { user_horses: ['user_id'] } },
);

const arenas = new Table(
  {
    user_id: column.text,
    name: column.text,
    city: column.text,
    state: column.text,
    location: column.text,
    profile_image_path: column.text,
    created_at: column.text,
    updated_at: column.text,
    name_updated_at: column.text,
    location_updated_at: column.text,
    profile_image_updated_at: column.text,
    deleted_at: column.text,
  },
  { indexes: { user_arenas: ['user_id'] } },
);

const runs = new Table(
  {
    user_id: column.text,
    horse_id: column.text,
    arena_id: column.text,
    run_at: column.text,
    time_ms: column.integer,
    is_clean: column.integer,
    barrel_count: column.integer,
    payout_cents: column.integer,
    notes: column.text,
    created_at: column.text,
    updated_at: column.text,
    time_updated_at: column.text,
    is_clean_updated_at: column.text,
    payout_updated_at: column.text,
    notes_updated_at: column.text,
    deleted_at: column.text,
  },
  { indexes: { user_runs: ['user_id', 'run_at'] } },
);

const media = new Table(
  {
    user_id: column.text,
    run_id: column.text,
    horse_id: column.text,
    type: column.text,
    local_uri: column.text,
    storage_path: column.text,
    thumbnail_path: column.text,
    status: column.text,
    created_at: column.text,
    uploaded_at: column.text,
    deleted_at: column.text,
  },
  { indexes: { run_media: ['run_id', 'status'] } },
);

export const AppSchema = new Schema({ users, horses, arenas, runs, media });

export type HorseRow = {
  id: string;
  user_id: string;
  barn_name: string | null;
  registered_name: string | null;
  profile_image_path: string | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
  barn_name_updated_at: string | null;
  registered_name_updated_at: string | null;
  profile_image_updated_at: string | null;
  deleted_at: string | null;
};

export type ArenaRow = {
  id: string;
  user_id: string;
  name: string | null;
  city: string | null;
  state: string | null;
  location: string | null;
  profile_image_path: string | null;
  created_at: string | null;
  updated_at: string | null;
  name_updated_at: string | null;
  location_updated_at: string | null;
  profile_image_updated_at: string | null;
  deleted_at: string | null;
};

export type RunRow = {
  id: string;
  user_id: string;
  horse_id: string | null;
  arena_id: string | null;
  run_at: string | null;
  time_ms: number | null;
  is_clean: number | null;
  barrel_count: number | null;
  payout_cents: number | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
  time_updated_at: string | null;
  is_clean_updated_at: string | null;
  payout_updated_at: string | null;
  notes_updated_at: string | null;
  deleted_at: string | null;
};

export type RunWithDetails = RunRow & {
  horse_name: string | null;
  horse_profile_image_path: string | null;
  horse_deleted_at: string | null;
  arena_name: string | null;
  arena_deleted_at: string | null;
  photo_count: number;
  video_count: number;
};
