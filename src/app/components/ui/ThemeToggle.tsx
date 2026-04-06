import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#4B5563] transition-all active:scale-95 shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[#F59E0B]" />
      ) : (
        <Moon className="w-5 h-5 text-[#6366F1]" />
      )}
    </button>
  );
}