import { useEffect, useState } from "react";
import { getPreferredTheme,setTheme  } from "../../utill/Them";

export function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    setThemeState(preferred);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      onClick={toggle}
      className=" glass border border-white px-3 py-1.5
                   dark:text-white rounded-full"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}