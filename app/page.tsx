"use client"

import { useState } from "react"
import CountdownClock from "@/components/countdown-clock"
import { DatePicker } from "@/components/date-picker"
import { motion } from "framer-motion"
import { Toaster } from "sonner"
import { ColorThemeSelector } from "@/components/theme-selector"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString())
  const { setLanguage } = useLanguage()

  const handleDateChange = (date: Date) => {
    setTargetDate(date.toISOString())
  }

  const isCurrentDate = () => {
    const today = new Date()
    const target = new Date(targetDate)
    return today.toDateString() === target.toDateString()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <ColorThemeSelector />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-custom">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-custom-lg">
            <DropdownMenuItem onClick={() => setLanguage("pt")}>
              Português
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("en")}>
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 drop-shadow-custom">
              <span role="img" aria-label="hourglass" className="text-3xl">
                ✈️
              </span>
              Tempo Restante para Viajar
            </h1>
            <p className="text-muted-foreground mb-1 drop-shadow-custom-sm">Selecione uma data para sua viagem</p>
            <div className="max-w-xs mx-auto shadow-custom-lg rounded-lg">
              <DatePicker onDateChange={handleDateChange} />
            </div>
          </motion.div>

          {!isCurrentDate() && <CountdownClock targetDate={targetDate} />}
        </div>
      </div>
      <motion.div
        className="text-muted-foreground text-sm py-4 drop-shadow-custom-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p>Desenvolvido com ❤️ por <a href="https://github.com/carrijoga" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">carrijoga</a></p>
      </motion.div>
      <Toaster richColors position="bottom-center" />
    </div>
  )
}

