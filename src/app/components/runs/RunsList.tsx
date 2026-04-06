import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Filter, DollarSign, Image, Video } from "lucide-react";
import { runs, horses, arenas, getHorseById, getArenaById } from "../../data/mockData";

export default function RunsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);

  const filteredRuns = runs
    .filter((run) => {
      if (selectedHorse && run.horseId !== selectedHorse) return false;
      if (searchQuery) {
        const horse = getHorseById(run.horseId);
        const arena = getArenaById(run.arenaId);
        const searchLower = searchQuery.toLowerCase();
        return (
          horse?.barnName.toLowerCase().includes(searchLower) ||
          arena?.name.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] transition-colors">
      {/* Header with subtle texture */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-50 dark:from-[#1F2937] to-white dark:to-[#111827] border-b border-gray-200 dark:border-[#374151] px-4 py-6 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                RODEO<span className="text-[#F59E0B]">PRO</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-[#9CA3AF] mt-1">Runs</p>
          </div>
          <Link
            to="/app/runs/add"
            className="flex items-center gap-2 bg-[#F59E0B] text-[#111827] px-4 py-2.5 rounded-lg font-semibold hover:bg-[#D97706] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Run
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search runs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#374151] border border-gray-300 dark:border-[#4B5563] rounded-lg pl-10 pr-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-colors"
          />
        </div>

        {/* Horse Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedHorse(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all ${
              !selectedHorse
                ? "bg-[#F59E0B] text-[#111827]"
                : "bg-gray-200 dark:bg-[#374151] text-gray-600 dark:text-[#9CA3AF] hover:bg-gray-300 dark:hover:bg-[#4B5563]"
            }`}
          >
            All Horses
          </button>
          {horses.map((horse) => (
            <button
              key={horse.id}
              onClick={() => setSelectedHorse(horse.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedHorse === horse.id
                  ? "bg-[#F59E0B] text-[#111827]"
                  : "bg-gray-200 dark:bg-[#374151] text-gray-600 dark:text-[#9CA3AF] hover:bg-gray-300 dark:hover:bg-[#4B5563]"
              }`}
            >
              {horse.barnName}
            </button>
          ))}
        </div>
      </div>

      {/* Runs List */}
      <div className="px-4 py-4 space-y-3">
        {filteredRuns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🤠</div>
            <p className="text-gray-500 dark:text-[#9CA3AF] text-center mb-2">No runs yet</p>
            <p className="text-sm text-gray-400 dark:text-[#6B7280] text-center mb-6">
              Start tracking your performance
            </p>
            <Link
              to="/app/runs/add"
              className="bg-[#F59E0B] text-[#111827] px-6 py-3 rounded-lg font-semibold hover:bg-[#D97706] transition-all"
            >
              Add Your First Run
            </Link>
          </div>
        ) : (
          filteredRuns.map((run) => {
            const horse = getHorseById(run.horseId)!;
            const arena = getArenaById(run.arenaId)!;
            const runDate = new Date(run.date);
            const formattedDate = runDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <Link
                key={run.id}
                to={`/app/runs/${run.id}`}
                className="bg-gray-50 dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] hover:border-[#F59E0B] transition-all active:scale-[0.98] block"
              >
                <div className="flex items-center gap-4">
                  {/* Horse Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: horse.color }}
                  >
                    {horse.barnName[0]}
                  </div>

                  {/* Run Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white truncate">
                      {horse.barnName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-[#9CA3AF] truncate">
                      {arena.name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-[#6B7280] mt-0.5">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Time Display */}
                  <div className="text-right flex-shrink-0">
                    <div
                      className="font-mono text-2xl font-bold tracking-tight"
                      style={{ color: run.isClean ? "#F59E0B" : "#9CA3AF" }}
                    >
                      {run.time.toFixed(3)}
                      <span className="text-sm ml-0.5">s</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {run.isClean ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                        Clean Run
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
                        {run.barrelCount} Barrel{run.barrelCount !== 1 ? "s" : ""}{" "}
                        Knocked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {run.payout !== undefined && run.payout > 0 && (
                      <div className="flex items-center gap-1 text-[#10B981]">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold text-sm">{run.payout.toLocaleString()}</span>
                      </div>
                    )}
                    {(run.photos || run.videos) && (
                      <div className="flex items-center gap-2">
                        {run.photos && run.photos.length > 0 && (
                          <div className="flex items-center gap-1 text-[#0D9488]">
                            <Image className="w-4 h-4" />
                            <span className="text-xs font-semibold">{run.photos.length}</span>
                          </div>
                        )}
                        {run.videos && run.videos.length > 0 && (
                          <div className="flex items-center gap-1 text-[#F59E0B]">
                            <Video className="w-4 h-4" />
                            <span className="text-xs font-semibold">{run.videos.length}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}