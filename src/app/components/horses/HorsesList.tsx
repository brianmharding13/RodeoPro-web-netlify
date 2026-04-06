import { Link } from "react-router";
import { Plus, Trophy } from "lucide-react";
import { horses } from "../../data/mockData";
import { useState } from "react";
import AddHorseModal from "./AddHorseModal";

export default function HorsesList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [horsesList, setHorsesList] = useState(horses);

  const handleAddHorse = (newHorse: {
    barnName: string;
    registeredName: string;
    color: string;
    personalRecord: string;
  }) => {
    const horse = {
      id: String(horsesList.length + 1),
      barnName: newHorse.barnName,
      registeredName: newHorse.registeredName || undefined,
      color: newHorse.color,
      personalRecord: newHorse.personalRecord ? parseFloat(newHorse.personalRecord) : 0,
      totalRuns: 0,
      cleanRuns: 0,
      averageTime: 0,
    };
    setHorsesList([...horsesList, horse]);
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
            <p className="text-sm text-gray-500 dark:text-[#9CA3AF] mt-1">Horses</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#0D9488] text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-[#0F766E] transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Horse
          </button>
        </div>
        <p className="text-sm text-gray-400 dark:text-[#6B7280] mt-3">
          {horsesList.length} {horsesList.length === 1 ? "horse" : "horses"} total
        </p>
      </div>

      {/* Horses List */}
      <div className="px-4 py-4 space-y-3">
        {horsesList.map((horse) => (
          <Link
            key={horse.id}
            to={`/app/horses/${horse.id}`}
            className="block bg-gray-50 dark:bg-[#1F2937] rounded-xl overflow-hidden border-l-4 hover:bg-gray-100 dark:hover:bg-[#374151] transition-all active:scale-[0.98]"
            style={{ borderLeftColor: horse.color }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {horse.barnName}
                  </h3>
                  {horse.registeredName && (
                    <p className="text-sm text-gray-500 dark:text-[#9CA3AF] italic">
                      {horse.registeredName}
                    </p>
                  )}
                </div>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ml-3"
                  style={{ backgroundColor: horse.color }}
                >
                  {horse.barnName[0]}
                </div>
              </div>

              {/* PR Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/30 mb-3">
                <Trophy className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-sm font-bold text-[#F59E0B]">
                  PR: {horse.personalRecord.toFixed(3)}s
                </span>
              </div>

              {/* Stats Chips */}
              <div className="flex items-center gap-3 flex-wrap text-xs text-gray-500 dark:text-[#9CA3AF]">
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {horse.totalRuns}
                  </span>{" "}
                  runs
                </span>
                <span className="text-gray-300 dark:text-[#4B5563]">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {horse.averageTime.toFixed(1)}s
                  </span>{" "}
                  avg
                </span>
                <span className="text-gray-300 dark:text-[#4B5563]">•</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-[#10B981]">
                    {horse.cleanRuns}
                  </span>{" "}
                  clean
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Add Horse Modal */}
      {showAddModal && (
        <AddHorseModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddHorse}
        />
      )}
    </div>
  );
}