import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Check, Image, Video, X } from "lucide-react";
import { horses, arenas } from "../../data/mockData";

type Step = "horse" | "arena" | "details";

export default function AddRun() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("horse");
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  const [selectedArena, setSelectedArena] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [isClean, setIsClean] = useState(true);
  const [knockedBarrels, setKnockedBarrels] = useState<number[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [payout, setPayout] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

  const handleBarrelClick = (barrelNum: number) => {
    if (knockedBarrels.includes(barrelNum)) {
      setKnockedBarrels(knockedBarrels.filter((b) => b !== barrelNum));
    } else {
      setKnockedBarrels([...knockedBarrels, barrelNum]);
      setIsClean(false);
    }
  };

  const handleCleanToggle = () => {
    setIsClean(true);
    setKnockedBarrels([]);
  };

  const canProceed = () => {
    if (step === "horse") return selectedHorse !== null;
    if (step === "arena") return selectedArena !== null;
    if (step === "details") return time !== "" && parseFloat(time) > 0;
    return false;
  };

  const handleNext = () => {
    if (step === "horse") setStep("arena");
    else if (step === "arena") setStep("details");
    else if (step === "details") {
      // Save run (in a real app)
      navigate("/app/runs");
    }
  };

  const getStepNumber = () => {
    if (step === "horse") return 1;
    if (step === "arena") return 2;
    return 3;
  };

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col">
      {/* Header */}
      <div className="bg-[#1F2937] border-b border-[#374151] px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => {
              if (step === "arena") setStep("horse");
              else if (step === "details") setStep("arena");
              else navigate("/app/runs");
            }}
            className="text-[#9CA3AF] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Add New Run</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center flex-1">
              <div
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  num <= getStepNumber() ? "bg-[#F59E0B]" : "bg-[#374151]"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-[#9CA3AF]">
          <span className={step === "horse" ? "text-[#F59E0B]" : ""}>
            Horse
          </span>
          <span className={step === "arena" ? "text-[#F59E0B]" : ""}>
            Arena
          </span>
          <span className={step === "details" ? "text-[#F59E0B]" : ""}>
            Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-6">
        {step === "horse" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Horse</h2>
            <div className="space-y-3">
              {horses.map((horse) => (
                <button
                  key={horse.id}
                  onClick={() => setSelectedHorse(horse.id)}
                  className={`w-full bg-[#1F2937] rounded-xl p-5 border-2 transition-all active:scale-[0.98] ${
                    selectedHorse === horse.id
                      ? "border-[#F59E0B]"
                      : "border-[#374151] hover:border-[#4B5563]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                      style={{ backgroundColor: horse.color }}
                    >
                      {horse.barnName[0]}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-lg text-white">
                        {horse.barnName}
                      </p>
                      {horse.registeredName && (
                        <p className="text-sm text-[#9CA3AF] italic">
                          {horse.registeredName}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-[#F59E0B] font-semibold">
                          PR: {horse.personalRecord.toFixed(3)}s
                        </span>
                      </div>
                    </div>
                    {selectedHorse === horse.id && (
                      <Check className="w-6 h-6 text-[#F59E0B]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "arena" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Arena</h2>
            <div className="space-y-3">
              {arenas.map((arena) => (
                <button
                  key={arena.id}
                  onClick={() => setSelectedArena(arena.id)}
                  className={`w-full bg-[#1F2937] rounded-xl p-5 border-2 transition-all active:scale-[0.98] text-left ${
                    selectedArena === arena.id
                      ? "border-[#F59E0B]"
                      : "border-[#374151] hover:border-[#4B5563]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-white">{arena.name}</p>
                      <p className="text-sm text-[#9CA3AF] mt-1">
                        {arena.city}, {arena.state}
                      </p>
                      {arena.recordTime && (
                        <p className="text-xs text-[#0D9488] mt-2">
                          Best: {arena.recordTime.toFixed(3)}s
                        </p>
                      )}
                    </div>
                    {selectedArena === arena.id && (
                      <Check className="w-6 h-6 text-[#F59E0B] flex-shrink-0 ml-3" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-3">
                Time
              </label>
              <div className="flex items-center justify-center py-8">
                <input
                  type="number"
                  step="0.001"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="0.000"
                  className="bg-transparent border-none outline-none text-center font-mono text-6xl font-bold text-[#F59E0B] w-full focus:ring-0"
                  style={{ appearance: "textfield" }}
                />
                <span className="text-3xl text-[#F59E0B] ml-2">s</span>
              </div>
            </div>

            {/* Barrel Status */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-3">
                Run Status
              </label>
              <div className="bg-[#1F2937] rounded-xl p-6 border border-[#374151]">
                <button
                  onClick={handleCleanToggle}
                  className={`w-full px-4 py-3 rounded-lg font-semibold mb-4 transition-all ${
                    isClean && knockedBarrels.length === 0
                      ? "bg-[#10B981] text-white"
                      : "bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563]"
                  }`}
                >
                  Clean Run
                </button>

                <p className="text-sm text-[#9CA3AF] mb-3 text-center">
                  or tap barrels knocked
                </p>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                    const isKnocked = knockedBarrels.includes(num);
                    return (
                      <button
                        key={num}
                        onClick={() => handleBarrelClick(num)}
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all active:scale-90 ${
                          isKnocked
                            ? "border-[#EF4444] bg-[#EF4444]/20 text-[#EF4444]"
                            : "border-[#4B5563] bg-[#374151] text-[#9CA3AF] hover:border-[#6B7280]"
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              />
            </div>

            {/* Payout */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Payout (optional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#1F2937] border border-[#374151] rounded-lg pl-9 pr-4 py-3 text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Photos (optional)
              </label>
              <div className="flex items-center gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <button
                      onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                      className="absolute top-0 right-0 bg-[#F59E0B] text-[#111827] rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "image/*";
                    fileInput.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files && target.files.length > 0) {
                        const file = target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setPhotos([...photos, reader.result as string]);
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    fileInput.click();
                  }}
                  className="bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563] rounded-full p-2"
                >
                  <Image className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Videos (optional)
              </label>
              <div className="flex items-center gap-2">
                {videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video
                      src={video}
                      alt={`Video ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-full"
                      controls
                    />
                    <button
                      onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                      className="absolute top-0 right-0 bg-[#F59E0B] text-[#111827] rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "video/*";
                    fileInput.onchange = (e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.files && target.files.length > 0) {
                        const file = target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setVideos([...videos, reader.result as string]);
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    fileInput.click();
                  }}
                  className="bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563] rounded-full p-2"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="p-4 bg-[#1F2937] border-t border-[#374151]">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            canProceed()
              ? "bg-[#F59E0B] text-[#111827] hover:bg-[#D97706] active:scale-[0.98]"
              : "bg-[#374151] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          {step === "details" ? "Save Run" : "Continue"}
        </button>
      </div>
    </div>
  );
}