import { FormEvent, useState } from 'react';
import DashboardShell from './DashboardShell';
import { createHorse, deleteHorse, updateHorse, useHorses } from '@/hooks/useHorses';
import { useAuth } from '@/app/context/AuthContext';

export default function HorsesPage() {
  const { user } = useAuth();
  const { horses, isLoading, error } = useHorses();
  const [barnName, setBarnName] = useState('');
  const [registeredName, setRegisteredName] = useState('');
  const [saving, setSaving] = useState(false);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    if (!user || !barnName.trim()) return;
    setSaving(true);
    try {
      await createHorse({
        userId: user.id,
        barnName: barnName.trim(),
        registeredName: registeredName.trim() || null,
      });
      setBarnName('');
      setRegisteredName('');
    } finally {
      setSaving(false);
    }
  }

  async function onRename(id: string, current: string | null) {
    const next = window.prompt('Barn name', current ?? '');
    if (next === null) return;
    await updateHorse(id, { barn_name: next.trim() || null });
  }

  async function onDelete(id: string) {
    if (!window.confirm('Delete this horse?')) return;
    await deleteHorse(id);
  }

  return (
    <DashboardShell title="Horses" description="Create, update, and delete horse records.">
      <form onSubmit={onCreate} className="bg-[#1F2937] border border-[#374151] rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={barnName}
          onChange={(e) => setBarnName(e.target.value)}
          placeholder="Barn name"
          className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
          required
        />
        <input
          value={registeredName}
          onChange={(e) => setRegisteredName(e.target.value)}
          placeholder="Registered name (optional)"
          className="bg-[#111827] border border-[#374151] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#F59E0B]"
        />
        <button
          type="submit"
          disabled={saving || !user}
          className="bg-[#F59E0B] text-[#111827] rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Add Horse'}
        </button>
      </form>

      <div className="mt-4 bg-[#1F2937] border border-[#374151] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-sm text-[#9CA3AF]">Loading horses...</div>
        ) : error ? (
          <div className="p-4 text-sm text-red-400">{String(error)}</div>
        ) : (horses?.length ?? 0) === 0 ? (
          <div className="p-4 text-sm text-[#9CA3AF]">No horses yet.</div>
        ) : (
          <ul>
            {horses.map((horse) => (
              <li key={horse.id} className="px-4 py-3 border-t border-[#374151] first:border-t-0 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{horse.barn_name ?? 'Unnamed horse'}</p>
                  <p className="text-xs text-[#9CA3AF]">{horse.registered_name ?? 'No registered name'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onRename(horse.id, horse.barn_name)} className="px-3 py-1.5 text-xs rounded border border-[#374151] text-[#9CA3AF] hover:text-white">
                    Rename
                  </button>
                  <button onClick={() => onDelete(horse.id)} className="px-3 py-1.5 text-xs rounded border border-red-500/30 text-red-400 hover:text-red-300">
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
