import { create } from 'zustand'

export const useThemeStore = create((set) => ({

  // we have used local storage to keep the user selected theme selected so that it doesnt reset on reload
  theme: localStorage.getItem("lexisphere-theme") || "autumn",
  setTheme:(theme)=>{
    localStorage.setItem("lexisphere-theme",theme);
    set({theme});
  },
}))