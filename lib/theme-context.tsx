"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type ThemeOption = {
  name: string
  bgGradient: string
  cardBg: string
  borderColor: string
  numberColor: string
  labelColor: string
  headingColor: string
}

export const themes: ThemeOption[] = [
  {
    name: "Cyan",
    bgGradient: "bg-gradient-to-b from-gray-900 to-gray-950",
    cardBg: "bg-gray-800",
    borderColor: "border-gray-700",
    numberColor: "text-cyan-400",
    labelColor: "text-gray-400",
    headingColor: "text-white",
  },
  {
    name: "Purple",
    bgGradient: "bg-gradient-to-b from-gray-900 to-slate-950",
    cardBg: "bg-gray-800",
    borderColor: "border-gray-700",
    numberColor: "text-purple-400",
    labelColor: "text-gray-400",
    headingColor: "text-white",
  },
  {
    name: "Amber",
    bgGradient: "bg-gradient-to-b from-gray-900 to-zinc-950",
    cardBg: "bg-gray-800",
    borderColor: "border-gray-700",
    numberColor: "text-amber-400",
    labelColor: "text-gray-400",
    headingColor: "text-white",
  },
  {
    name: "Green",
    bgGradient: "bg-gradient-to-b from-gray-900 to-gray-950",
    cardBg: "bg-gray-800",
    borderColor: "border-gray-700",
    numberColor: "text-emerald-400",
    labelColor: "text-gray-400",
    headingColor: "text-white",
  },
  {
    name: "Rose",
    bgGradient: "bg-gradient-to-b from-slate-900 to-gray-950",
    cardBg: "bg-gray-800",
    borderColor: "border-gray-700",
    numberColor: "text-rose-400",
    labelColor: "text-gray-400",
    headingColor: "text-white",
  },
]

type ThemeContextType = {
  currentTheme: ThemeOption
  setTheme: (theme: ThemeOption) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const defaultTheme = themes[0] // Cyan theme

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(defaultTheme)

  // Ensure theme is set on initial client-side render
  useEffect(() => {
    setCurrentTheme(defaultTheme)
  }, [])

  const setTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme)
  }

  return <ThemeContext.Provider value={{ currentTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

