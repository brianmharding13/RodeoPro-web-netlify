import { FormEvent, useMemo, useState } from 'react';
import DashboardShell from './DashboardShell';
import { useAuth } from '@/app/context/AuthContext';
import { useHorses } from '@/hooks/useHorses';
import { useArenas } from '@/hooks/useArenas';
import { createRun, deleteRun, updateRun, useRuns } from '@/hooks/useRuns';

function msToTimeString(timeMs: number | null): string {
  if (timeMs === null || timeMs === 0) return 'n/a';
  const ms = Math.abs(timeMs % 1000);
  const totalSec = Math.floor(timeMs / 1000);
  if (totalSec >= 60) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${String(secs).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
  }
  return `${totalSec}.${String(ms).padStart(3, '0')}`;
}

export default function RunsPage() {
  const { user } = useAuth();
  const { horses } = useHorses();
  const { arenas } = useArenas();
  const { runs, isLoading, error } = useRuns();

  const [horseId, setHorseId] = useState('');
  const [arenaId, setArenaId] = useState('');
  const [timeMs, setTimeMs] = useState('');
  const [barrelCount, setBarrelCount] = useState('0');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const horseOptions = useMemo(() => horses ?? [], [horses]);
  const arenaOptions = useMemo(() => arenas ?? [], [arenas]);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await createRun({
        userId: user.id,
        horseId: horseId || null,
        arenaId: arenaId || null,
        timeMs: timeMs.trim() ? Number(timeMs) : null,
        barrelCount: Number(barrelCount || 0),
        isClean: Number(barrelCount || 0) === 0,
        notes: notes.trim() || null,
      });

      setHorseId('');
      setArenaId('');
      setTimeMs('');
      setBarrelCount('0');
      setNotes('');
    } finally {
      setSaving(false);
    }
  }

  async function onEditNotes(id: string, current: string | null) {
    const next = window.prompt('Run notes', current ?? '');
    if (next === null) return;
    await updateRun(id, { notes: next.trim() || null });
  }

  async function onDelete(id: string) {
    if (!window.confirm('Delete this run?')) return;
    await deleteRun(id);
  }

  return (
    <DashboardShell title="Runs" description="Track run records for horses and arenas.">
      <form onSubmit={onCreate} className="bg-[#1F2937] border border-[#374151] rounded-xl p-4 grid grid-cols-1 md:grid-cols-6 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="run-horse" className="text-xs font-medium text-[#D1D5DB]">
            Horse
          </label>
          <select
            id="run-horse"
            value={horseId}
            onChange={(e) => setHorseId(e.target.value)}
            className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          >
            <option value="">Horse</option>
            {horseOptions.map((horse) => (
              <option key={horse.id} value={horse.id}>{horse.barn_name ?? 'Unnamed horse'}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="run-arena" className="text-xs font-medium text-[#D1D5DB]">
            Arena
          </label>
          <select
            id="run-arena"
            value={arenaId}
            onChange={(e) => setArenaId(e.target.value)}
            className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          >
            <option value="">Arena</option>
            {arenaOptions.map((arena) => (
              <option key={arena.id} value={arena.id}>{arena.name ?? 'Unnamed arena'}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="run-time-ms" className="text-xs font-medium text-[#D1D5DB]">
            Time (ms)
          </label>
          <input
            id="run-time-ms"
            value={timeMs}
            onChange={(e) => setTimeMs(e.target.value)}
            type="number"
            placeholder="Time ms"
            className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="run-barrel-count" className="text-xs font-medium text-[#D1D5DB]">
            Knocked Barrels
          </label>
          <input
            id="run-barrel-count"
            value={barrelCount}
            onChange={(e) => setBarrelCount(e.target.value)}
            type="number"
            min={0}
            max={3}
            placeholder="Barrels"
            className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1">
          <label htmlFor="run-notes" className="text-xs font-medium text-[#D1D5DB]">
            Notes
          </label>
          <input
            id="run-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          />
        </div>

        <button
          type="submit"
          disabled={saving || !user}
          className="md:col-span-6 bg-[#F59E0B] text-[#111827] rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Add Run'}
        </button>
      </form>

      <div className="mt-4 bg-[#1F2937] border border-[#374151] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-sm text-[#9CA3AF]">Loading runs...</div>
        ) : error ? (
          <div className="p-4 text-sm text-red-400">{String(error)}</div>
        ) : (runs?.length ?? 0) === 0 ? (
          <div className="p-4 text-sm text-[#9CA3AF]">No runs yet.</div>
        ) : (
          <ul>
            {runs.map((run) => (
              <li key={run.id} className="px-4 py-3 border-t border-[#374151] first:border-t-0 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {run.horse_name ?? 'Unknown horse'} at {run.arena_name ?? 'Unknown arena'}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    Time: {msToTimeString(run.time_ms)} · Barrels: {run.barrel_count ?? 0} · {run.notes ?? 'No notes'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onEditNotes(run.id, run.notes)} className="px-3 py-1.5 text-xs rounded border border-[#374151] text-[#9CA3AF] hover:text-white">
                    Edit Notes
                  </button>
                  <button onClick={() => onDelete(run.id)} className="px-3 py-1.5 text-xs rounded border border-red-500/30 text-red-400 hover:text-red-300">
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
