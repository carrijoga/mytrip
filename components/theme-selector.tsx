"use client"

import { useTheme, themes } from "@/lib/theme-context"
import { Button } from "@/components/ui/button"
import { Check, Palette } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme()

  const handleThemeChange = (value: string) => {
    const selectedTheme = themes.find((theme) => theme.name === value)
    if (selectedTheme) {
      setTheme(selectedTheme)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${currentTheme.cardBg} ${currentTheme.borderColor} hover:bg-gray-700`}
        >
          <Palette className="h-4 w-4 text-white" />
          <span className="text-white">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`w-56 ${currentTheme.cardBg} ${currentTheme.borderColor}`}>
        <DropdownMenuLabel className="text-gray-300">Color Themes</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuRadioGroup value={currentTheme.name} onValueChange={handleThemeChange}>
          {themes.map((theme) => (
            <DropdownMenuRadioItem
              key={theme.name}
              value={theme.name}
              className="text-gray-300 focus:bg-gray-700 focus:text-white cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${theme.numberColor.replace("text-", "bg-")}`} />
                <span>{theme.name}</span>
                {currentTheme.name === theme.name && <Check className="h-4 w-4 ml-auto" />}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

