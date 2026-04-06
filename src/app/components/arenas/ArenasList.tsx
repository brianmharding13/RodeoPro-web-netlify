import { useState } from "react";
import { MapPin, Plus, Trophy } from "lucide-react";
import { arenas } from "../../data/mockData";

export default function ArenasList() {
  const [showAddArena, setShowAddArena] = useState(false);
  const [arenaName, setArenaName] = useState("");
  const [arenaLocation, setArenaLocation] = useState("");

  const handleAddArena = () => {
    // In a real app, save the arena
    setArenaName("");
    setArenaLocation("");
    setShowAddArena(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] transition-colors">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-50 dark:from-[#1F2937] to-white dark:to-[#111827] border-b border-gray-200 dark:border-[#374151] px-4 py-6 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                RODEO<span className="text-[#F59E0B]">PRO</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-[#9CA3AF] mt-1">Arenas</p>
          </div>
          <button
            onClick={() => setShowAddArena(true)}
            className="flex items-center gap-2 bg-[#0D9488] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-[#0F766E] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Arena
          </button>
        </div>
        <p className="text-sm text-gray-400 dark:text-[#6B7280] mt-3">
          {arenas.length} {arenas.length === 1 ? "arena" : "arenas"} total
        </p>
      </div>

      {/* Arenas List */}
      <div className="px-4 py-4 space-y-3">
        {arenas.map((arena) => (
          <div
            key={arena.id}
            className="bg-gray-50 dark:bg-[#1F2937] rounded-xl p-5 border border-gray-200 dark:border-[#374151] hover:border-[#0D9488] transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#0D9488]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                  {arena.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-[#9CA3AF] truncate">
                  {arena.city}, {arena.state}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500 dark:text-[#9CA3AF]">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {arena.runCount}
                  </span>{" "}
                  runs
                </span>
                {arena.recordTime && (
                  <>
                    <span className="text-gray-300 dark:text-[#4B5563]">•</span>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-[#F59E0B]" />
                      <span className="font-mono font-bold text-[#F59E0B]">
                        {arena.recordTime.toFixed(3)}s
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Arena Bottom Sheet */}
      {showAddArena && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white dark:bg-[#1F2937] w-full max-w-md mx-auto rounded-t-2xl border-t border-gray-200 dark:border-[#374151] animate-slide-up transition-colors">
            <div className="p-4 border-b border-gray-200 dark:border-[#374151]">
              <div className="w-12 h-1 bg-gray-300 dark:bg-[#4B5563] rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Arena</h3>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mb-2">
                  Arena Name
                </label>
                <input
                  type="text"
                  value={arenaName}
                  onChange={(e) => setArenaName(e.target.value)}
                  placeholder="Enter arena name"
                  className="w-full bg-gray-100 dark:bg-[#374151] border border-gray-300 dark:border-[#4B5563] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={arenaLocation}
                  onChange={(e) => setArenaLocation(e.target.value)}
                  placeholder="City, State"
                  className="w-full bg-gray-100 dark:bg-[#374151] border border-gray-300 dark:border-[#4B5563] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddArena(false)}
                  className="flex-1 px-4 py-3 rounded-lg font-semibold bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#4B5563] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddArena}
                  disabled={!arenaName || !arenaLocation}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                    arenaName && arenaLocation
                      ? "bg-[#0D9488] text-white hover:bg-[#0F766E]"
                      : "bg-gray-200 dark:bg-[#374151] text-gray-400 dark:text-[#6B7280] cursor-not-allowed"
                  }`}
                >
                  Add Arena
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}