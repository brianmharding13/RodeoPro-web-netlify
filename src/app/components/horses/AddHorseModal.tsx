import { useState } from "react";
import { X } from "lucide-react";

interface AddHorseModalProps {
  onClose: () => void;
  onSave: (horse: {
    barnName: string;
    registeredName: string;
    color: string;
    personalRecord: string;
  }) => void;
}

const PRESET_COLORS = [
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#10B981", // Green
  "#0D9488", // Teal
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F97316", // Orange
  "#14B8A6", // Cyan
  "#6366F1", // Indigo
  "#A855F7", // Violet
  "#84CC16", // Lime
];

export default function AddHorseModal({ onClose, onSave }: AddHorseModalProps) {
  const [barnName, setBarnName] = useState("");
  const [registeredName, setRegisteredName] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [personalRecord, setPersonalRecord] = useState("");

  const canSave = barnName.trim() !== "";

  const handleSave = () => {
    if (canSave) {
      onSave({
        barnName: barnName.trim(),
        registeredName: registeredName.trim(),
        color,
        personalRecord,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-slide-up transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-[#374151]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Horse</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-[#9CA3AF] hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
          {/* Registered Name */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mb-2">
              Registered Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              value={barnName}
              onChange={(e) => setBarnName(e.target.value)}
              placeholder="e.g., Thunder's Golden Promise"
              className="w-full bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#374151] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-colors"
              autoFocus
            />
          </div>

          {/* Barn Name */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mb-2">
              Barn Name (optional)
            </label>
            <input
              type="text"
              value={registeredName}
              onChange={(e) => setRegisteredName(e.target.value)}
              placeholder="e.g., Thunder, Lucky, Storm"
              className="w-full bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#374151] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-colors"
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mb-3">
              Display Color
            </label>
            <div className="grid grid-cols-6 gap-3">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className={`w-full aspect-square rounded-full transition-all active:scale-90 ${
                    color === presetColor
                      ? "ring-4 ring-[#0D9488] ring-offset-2 ring-offset-white dark:ring-offset-[#1F2937] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: presetColor }}
                />
              ))}
            </div>
          </div>

          {/* Personal Record */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-[#9CA3AF] mb-2">
              Personal Record (optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.001"
                value={personalRecord}
                onChange={(e) => setPersonalRecord(e.target.value)}
                placeholder="0.000"
                className="flex-1 bg-gray-50 dark:bg-[#111827] border border-gray-300 dark:border-[#374151] rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent font-mono text-lg transition-colors"
              />
              <span className="text-gray-500 dark:text-[#9CA3AF] font-mono text-lg">s</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-[#6B7280] mt-1.5">
              You can update this later as your horse sets new records
            </p>
          </div>

          {/* Preview Card */}
          <div className="bg-gray-50 dark:bg-[#111827] rounded-xl p-5 border-l-4 transition-colors" style={{ borderLeftColor: color }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {barnName || "Registered Name"}
                </h3>
                {registeredName && (
                  <p className="text-sm text-gray-500 dark:text-[#9CA3AF] italic mt-0.5">
                    {registeredName}
                  </p>
                )}
                {personalRecord && (
                  <p className="text-sm text-[#F59E0B] font-semibold mt-2">
                    PR: {parseFloat(personalRecord).toFixed(3)}s
                  </p>
                )}
              </div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ml-3"
                style={{ backgroundColor: color }}
              >
                {barnName ? barnName[0].toUpperCase() : "?"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-[#374151] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg font-semibold bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#4B5563] transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              canSave
                ? "bg-[#0D9488] text-white hover:bg-[#0F766E] active:scale-95"
                : "bg-gray-200 dark:bg-[#374151] text-gray-400 dark:text-[#6B7280] cursor-not-allowed"
            }`}
          >
            Add Horse
          </button>
        </div>
      </div>
    </div>
  );
}