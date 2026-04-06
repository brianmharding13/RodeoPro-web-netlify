import { useParams, useNavigate, Link } from "react-router";
import { ChevronLeft, Trophy, CheckCircle2, XCircle, MapPin, X, DollarSign, Image, Video } from "lucide-react";
import { getHorseById, getRunsByHorse, getArenaById, arenas } from "../../data/mockData";
import { useState } from "react";

export default function HorseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const horse = getHorseById(id!);
  const horseRuns = getRunsByHorse(id!);
  const [selectedArenaId, setSelectedArenaId] = useState<string | null>(null);

  if (!horse) {
    return <div>Horse not found</div>;
  }

  // Calculate performance by arena
  const arenaPerformance = arenas
    .map((arena) => {
      const arenaRuns = horseRuns.filter((run) => run.arenaId === arena.id);
      if (arenaRuns.length === 0) return null;
      const bestTime = Math.min(...arenaRuns.map((r) => r.time));
      return {
        arena,
        bestTime,
        runCount: arenaRuns.length,
      };
    })
    .filter((p) => p !== null);

  const knockedRuns = horse.totalRuns - horse.cleanRuns;
  
  // Calculate total earnings
  const totalEarnings = horseRuns.reduce((sum, run) => sum + (run.payout || 0), 0);

  // Get runs for selected arena
  const selectedArenaRuns = selectedArenaId
    ? horseRuns
        .filter((run) => run.arenaId === selectedArenaId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : [];

  const selectedArena = selectedArenaId ? getArenaById(selectedArenaId) : null;

  return (
    <div className="min-h-screen bg-[#111827] pb-6">
      {/* Header */}
      <div className="bg-[#1F2937] border-b border-[#374151] px-4 py-4">
        <button
          onClick={() => navigate("/app/horses")}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors mb-3"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Horses</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-8 text-center">
        <div
          className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-5xl border-4"
          style={{ backgroundColor: horse.color, borderColor: horse.color }}
        >
          {horse.barnName[0]}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{horse.barnName}</h1>
        {horse.registeredName && (
          <p className="text-lg text-[#9CA3AF] italic">{horse.registeredName}</p>
        )}
      </div>

      {/* PR Card */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-[#111827]" />
            <span className="text-sm font-bold text-[#111827] uppercase tracking-wide">
              Personal Record
            </span>
          </div>
          <div className="font-mono text-5xl font-bold text-[#111827]">
            {horse.personalRecord.toFixed(3)}
            <span className="text-2xl ml-1">s</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Statistics</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]">
            <div className="text-3xl font-bold text-[#F59E0B] mb-1">
              {horse.totalRuns}
            </div>
            <div className="text-sm text-[#9CA3AF]">Total Runs</div>
          </div>
          <div className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]">
            <div className="text-3xl font-bold text-[#0D9488] mb-1">
              {horse.averageTime.toFixed(1)}
              <span className="text-lg">s</span>
            </div>
            <div className="text-sm text-[#9CA3AF]">Average Time</div>
          </div>
          <div className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              <span className="text-3xl font-bold text-[#10B981]">
                {horse.cleanRuns}
              </span>
            </div>
            <div className="text-sm text-[#9CA3AF]">Clean Runs</div>
          </div>
          <div className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-6 h-6 text-[#EF4444]" />
              <span className="text-3xl font-bold text-[#EF4444]">
                {knockedRuns}
              </span>
            </div>
            <div className="text-sm text-[#9CA3AF]">Knocked Runs</div>
          </div>
          <div className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-6 h-6 text-[#F59E0B]" />
              <span className="text-3xl font-bold text-[#F59E0B]">
                {totalEarnings.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-[#9CA3AF]">Total Earnings</div>
          </div>
        </div>
      </div>

      {/* Performance by Arena */}
      {arenaPerformance.length > 0 && (
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold text-white mb-3">
            Performance by Arena
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {arenaPerformance.map((perf) => (
              <div
                key={perf!.arena.id}
                className="flex-shrink-0 bg-[#1F2937] rounded-xl p-4 border border-[#374151] min-w-[240px]"
                onClick={() => setSelectedArenaId(perf!.arena.id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedArenaId === perf!.arena.id ? "#374151" : "#1F2937",
                }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#9CA3AF] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {perf!.arena.name}
                    </p>
                    <p className="text-xs text-[#6B7280] truncate">
                      {perf!.arena.city}, {perf!.arena.state}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="font-mono text-2xl font-bold text-[#F59E0B]">
                    {perf!.bestTime.toFixed(3)}
                    <span className="text-sm ml-0.5">s</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    Best of {perf!.runCount} run{perf!.runCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Runs */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">
            {selectedArena ? `Runs at ${selectedArena.name}` : "Runs"}
          </h2>
          {selectedArenaId && (
            <button
              onClick={() => setSelectedArenaId(null)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563] hover:text-white transition-all text-sm"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
        <div className="space-y-3">
          {selectedArenaRuns.length > 0
            ? selectedArenaRuns.map((run) => {
                const arena = getArenaById(run.arenaId)!;
                const runDate = new Date(run.date);
                const formattedDate = runDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <Link
                    key={run.id}
                    to={`/app/runs/${run.id}`}
                    className="bg-[#1F2937] rounded-xl p-4 border-l-4 block hover:bg-[#374151] transition-colors"
                    style={{
                      borderLeftColor: run.isClean ? "#10B981" : "#EF4444",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">
                          {arena.name}
                        </p>
                        <p className="text-xs text-[#9CA3AF]">{formattedDate}</p>
                      </div>
                      <div className="font-mono text-2xl font-bold text-[#F59E0B] ml-3">
                        {run.time.toFixed(3)}
                        <span className="text-sm ml-0.5">s</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {run.isClean ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#10B981]/20 text-[#10B981]">
                            Clean
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#EF4444]/20 text-[#EF4444]">
                            {run.barrelCount} Knocked
                          </span>
                        )}
                        {(run.photos || run.videos) && (
                          <div className="flex items-center gap-2 ml-2">
                            {run.photos && run.photos.length > 0 && (
                              <div className="flex items-center gap-0.5 text-[#0D9488]">
                                <Image className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold">{run.photos.length}</span>
                              </div>
                            )}
                            {run.videos && run.videos.length > 0 && (
                              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                                <Video className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold">{run.videos.length}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {run.payout !== undefined && run.payout > 0 && (
                        <div className="flex items-center gap-1 text-[#10B981]">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold">{run.payout.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })
            : horseRuns
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((run) => {
                  const arena = getArenaById(run.arenaId)!;
                  const runDate = new Date(run.date);
                  const formattedDate = runDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <Link
                      key={run.id}
                      to={`/app/runs/${run.id}`}
                      className="bg-[#1F2937] rounded-xl p-4 border-l-4 block hover:bg-[#374151] transition-colors"
                      style={{
                        borderLeftColor: run.isClean ? "#10B981" : "#EF4444",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate">
                            {arena.name}
                          </p>
                          <p className="text-xs text-[#9CA3AF]">{formattedDate}</p>
                        </div>
                        <div className="font-mono text-2xl font-bold text-[#F59E0B] ml-3">
                          {run.time.toFixed(3)}
                          <span className="text-sm ml-0.5">s</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {run.isClean ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#10B981]/20 text-[#10B981]">
                              Clean
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-[#EF4444]/20 text-[#EF4444]">
                              {run.barrelCount} Knocked
                            </span>
                          )}
                          {(run.photos || run.videos) && (
                            <div className="flex items-center gap-2 ml-2">
                              {run.photos && run.photos.length > 0 && (
                                <div className="flex items-center gap-0.5 text-[#0D9488]">
                                  <Image className="w-3.5 h-3.5" />
                                  <span className="text-xs font-semibold">{run.photos.length}</span>
                                </div>
                              )}
                              {run.videos && run.videos.length > 0 && (
                                <div className="flex items-center gap-0.5 text-[#F59E0B]">
                                  <Video className="w-3.5 h-3.5" />
                                  <span className="text-xs font-semibold">{run.videos.length}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {run.payout !== undefined && run.payout > 0 && (
                          <div className="flex items-center gap-1 text-[#10B981]">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold">{run.payout.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
        </div>
      </div>
    </div>
  );
}