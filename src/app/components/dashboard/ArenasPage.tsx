import { FormEvent, useState } from 'react';
import DashboardShell from './DashboardShell';
import { createArena, deleteArena, updateArena, useArenas } from '@/hooks/useArenas';
import { useAuth } from '@/app/context/AuthContext';

export default function ArenasPage() {
  const { user } = useAuth();
  const { arenas, isLoading, error } = useArenas();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [saving, setSaving] = useState(false);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    if (!user || !name.trim()) return;

    setSaving(true);
    try {
      await createArena({
        userId: user.id,
        name: name.trim(),
        city: city.trim() || null,
        state: state.trim() || null,
      });
      setName('');
      setCity('');
      setState('');
    } finally {
      setSaving(false);
    }
  }

  async function onRename(id: string, current: string | null) {
    const next = window.prompt('Arena name', current ?? '');
    if (next === null) return;
    await updateArena(id, { name: next.trim() || null });
  }

  async function onDelete(id: string) {
    if (!window.confirm('Delete this arena?')) return;
    await deleteArena(id);
  }

  return (
    <DashboardShell title="Arenas" description="Manage arenas and locations.">
      <form onSubmit={onCreate} className="bg-[#1F2937] border border-[#374151] rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Arena name"
          className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          required
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
        />
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
        />
        <button
          type="submit"
          disabled={saving || !user}
          className="bg-[#F59E0B] text-[#111827] rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Add Arena'}
        </button>
      </form>

      <div className="mt-4 bg-[#1F2937] border border-[#374151] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-sm text-[#9CA3AF]">Loading arenas...</div>
        ) : error ? (
          <div className="p-4 text-sm text-red-400">{String(error)}</div>
        ) : (arenas?.length ?? 0) === 0 ? (
          <div className="p-4 text-sm text-[#9CA3AF]">No arenas yet.</div>
        ) : (
          <ul>
            {arenas.map((arena) => (
              <li key={arena.id} className="px-4 py-3 border-t border-[#374151] first:border-t-0 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{arena.name ?? 'Unnamed arena'}</p>
                  <p className="text-xs text-[#9CA3AF]">{[arena.city, arena.state].filter(Boolean).join(', ') || 'No location'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onRename(arena.id, arena.name)} className="px-3 py-1.5 text-xs rounded border border-[#374151] text-[#9CA3AF] hover:text-white">
                    Rename
                  </button>
                  <button onClick={() => onDelete(arena.id)} className="px-3 py-1.5 text-xs rounded border border-red-500/30 text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardShell>
  );
}
