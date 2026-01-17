import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "autumn" ? "sunset" : "autumn");
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {theme === "autumn" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </button>
  );
};

export default ThemeSelector;
