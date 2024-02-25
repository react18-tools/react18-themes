import { create } from "zustand";
import { PersistNSyncOptionsType, StorageType, persistNSync } from "persist-and-sync";

export type ColorSchemeType = "" | "system" | "dark" | "light";

export type ThemeStoreType = {
  theme: string;
  darkTheme: string;
  lightTheme: string;
  colorSchemePref: ColorSchemeType;
  resolvedTheme: string;
  resolvedColorScheme: ColorSchemeType;
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  __persistNSyncOptions: PersistNSyncOptionsType;
};

export type ThemeStoreActionsType = {
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  setForcedTheme: (forcedTheme?: string) => void;
  setForcedColorScheme: (forcedColorScheme?: ColorSchemeType) => void;
  setResolved: (resolved: { resolvedTheme: string; resolvedColorScheme: ColorSchemeType }) => void;
  setStorage: (storage: StorageType) => void;
};

const storeOptions: PersistNSyncOptionsType = {
  name: "react18-themes",
  exclude: [/forced/, /resolved/, /^__/],
  storage: "localStorage",
};

export const initialState: ThemeStoreType = {
  theme: "",
  resolvedTheme: "",
  darkTheme: "dark",
  lightTheme: "",
  colorSchemePref: "system",
  resolvedColorScheme: "system",
  __persistNSyncOptions: storeOptions,
};

export const useTheme = create<ThemeStoreType & ThemeStoreActionsType>()(
  persistNSync(
    (set, get) => ({
      ...initialState,
      setTheme: theme => set({ ...get(), theme }),
      setDarkTheme: darkTheme => set({ ...get(), darkTheme }),
      setLightTheme: lightTheme => set({ ...get(), lightTheme }),
      setForcedTheme: forcedTheme => set({ ...get(), forcedTheme }),
      setForcedColorScheme: forcedColorScheme => set({ ...get(), forcedColorScheme }),
      setColorSchemePref: colorSchemePref => set({ ...get(), colorSchemePref }),
      setResolved: ({ resolvedColorScheme, resolvedTheme }) => set({ ...get(), resolvedColorScheme, resolvedTheme }),
      setThemeSet: ({ lightTheme, darkTheme }) => set({ ...get(), lightTheme, darkTheme }),
      setStorage: storage => set({ ...get(), __persistNSyncOptions: { ...storeOptions, storage } }),
    }),
    storeOptions,
  ),
);
