"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface DatePickerProps {
  onDateChange: (date: Date) => void
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date("2025-05-23"))

  // Load date from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem("targetDate")
    if (savedDate) {
      const parsedDate = new Date(savedDate)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
        onDateChange(parsedDate)
      }
    }
  }, [onDateChange])

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      localStorage.setItem("targetDate", newDate.toISOString())
      onDateChange(newDate)

      toast({
        title: "Data salva! ✅",
        description: `Contagem regressiva atualizada para ${format(newDate, "dd/MM/yyyy")}`,
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white",
              !date && "text-muted-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <span role="img" aria-label="calendar" className="text-lg">
                📅
              </span>
              {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
            </span>
            <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="bg-gray-800 text-white"
          />
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}

