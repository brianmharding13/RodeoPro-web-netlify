import { useParams, Link, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Star, 
  DollarSign, 
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  X,
  Edit,
  Trash2
} from "lucide-react";
import { runs, horses, arenas } from "../../data/mockData";
import { useState } from "react";

export default function RunDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'photo' | 'video', url: string } | null>(null);

  const run = runs.find(r => r.id === id);
  
  if (!run) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111827] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-[#9CA3AF] mb-4">Run not found</p>
          <Link to="/app/runs" className="text-[#0D9488] font-semibold">
            Back to Runs
          </Link>
        </div>
      </div>
    );
  }

  const horse = horses.find(h => h.id === run.horseId);
  const arena = arenas.find(a => a.id === run.arenaId);

  const formattedDate = new Date(run.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(run.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827] transition-colors pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-[#374151] px-4 py-4 transition-colors">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/app/runs');
              }
            }}
            className="flex items-center gap-2 text-[#0D9488] font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F2937] transition-colors">
              <Edit className="w-5 h-5 text-gray-600 dark:text-[#9CA3AF]" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F2937] transition-colors">
              <Trash2 className="w-5 h-5 text-[#EF4444]" />
            </button>
          </div>
        </div>
      </div>

      {/* Time Hero Section */}
      <div className="px-4 py-8 bg-gradient-to-b from-gray-50 dark:from-[#1F2937] to-white dark:to-[#111827] border-b border-gray-200 dark:border-[#374151] transition-colors">
        <div className="text-center mb-6">
          <div className="text-sm font-semibold text-gray-500 dark:text-[#9CA3AF] mb-2 uppercase tracking-wider">
            Final Time
          </div>
          <div
            className="font-mono text-6xl font-bold tracking-tight mb-3"
            style={{ color: run.isClean ? "#F59E0B" : "#9CA3AF" }}
          >
            {run.time.toFixed(3)}
            <span className="text-2xl ml-1">s</span>
          </div>
          {run.isClean ? (
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
              ✓ Clean Run
            </div>
          ) : (
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
              {run.barrelCount} Barrel{run.barrelCount !== 1 ? "s" : ""} Knocked
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {run.payout !== undefined && run.payout > 0 && (
            <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-[#10B981]" />
                <span className="text-xs font-semibold text-gray-500 dark:text-[#9CA3AF] uppercase">Payout</span>
              </div>
              <div className="text-2xl font-bold text-[#10B981]">
                ${run.payout.toLocaleString()}
              </div>
            </div>
          )}
          <div className="bg-white dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-[#0D9488]" />
              <span className="text-xs font-semibold text-gray-500 dark:text-[#9CA3AF] uppercase">Date</span>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">
              {formattedDate}
            </div>
            <div className="text-xs text-gray-500 dark:text-[#9CA3AF] mt-1">
              {formattedTime}
            </div>
          </div>
        </div>
      </div>

      {/* Horse & Arena Info */}
      <div className="px-4 py-6">
        <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
          Run Details
        </h3>
        <div className="space-y-3">
          {/* Horse */}
          {horse && (
            <Link
              to={`/app/horses/${horse.id}`}
              className="flex items-center gap-4 bg-gray-50 dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] hover:border-[#F59E0B] transition-all"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ backgroundColor: horse.color }}
              >
                {horse.barnName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-[#9CA3AF] uppercase">Horse</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{horse.barnName}</p>
                <p className="text-sm text-gray-500 dark:text-[#9CA3AF]">{horse.registeredName}</p>
              </div>
            </Link>
          )}

          {/* Arena */}
          {arena && (
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#1F2937] rounded-xl p-4 border border-gray-200 dark:border-[#374151] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#0D9488]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#0D9488]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#0D9488]" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-[#9CA3AF] uppercase">Arena</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{arena.name}</p>
                <p className="text-sm text-gray-500 dark:text-[#9CA3AF]">{arena.location}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Photos Section */}
      {run.photos && run.photos.length > 0 && (
        <div className="px-4 py-6 border-t border-gray-200 dark:border-[#374151]">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-[#0D9488]" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Photos ({run.photos.length})
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {run.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedMedia({ type: 'photo', url: photo })}
                className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-[#374151] hover:opacity-80 transition-opacity"
              >
                <img
                  src={photo}
                  alt={`Run photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Videos Section */}
      {run.videos && run.videos.length > 0 && (
        <div className="px-4 py-6 border-t border-gray-200 dark:border-[#374151]">
          <div className="flex items-center gap-2 mb-4">
            <VideoIcon className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Videos ({run.videos.length})
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {run.videos.map((video, index) => (
              <button
                key={index}
                onClick={() => setSelectedMedia({ type: 'video', url: video })}
                className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-[#374151] relative group hover:opacity-80 transition-opacity"
              >
                <video
                  src={video}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section (if we want to add notes later) */}
      {run.notes && (
        <div className="px-4 py-6 border-t border-gray-200 dark:border-[#374151]">
          <h3 className="text-xs font-bold text-gray-400 dark:text-[#6B7280] uppercase tracking-wider mb-3">
            Notes
          </h3>
          <p className="text-gray-700 dark:text-[#D1D5DB] leading-relaxed">
            {run.notes}
          </p>
        </div>
      )}

      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'photo' ? (
              <img
                src={selectedMedia.url}
                alt="Full size"
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}