"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import Confetti from 'react-confetti-boom';

interface DatePickerProps {
  onDateChange: (date: Date) => void
}

export function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState<Date>(new Date())

  // Load date from localStorage on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem("targetDate")
    if (savedDate) {
      const parsedDate = new Date(savedDate)
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate)
        setMonth(parsedDate)
        onDateChange(parsedDate)
        setOpen(false)
      }
    }
  }, [])

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setMonth(newDate)
      localStorage.setItem("targetDate", newDate.toISOString())
      onDateChange(newDate)
      setOpen(false)

      toast.success("Data salva! ✅", {
        description: `Contagem regressiva atualizada para ${format(newDate, "dd/MM/yyyy")}`,
        duration: 3000,
        position: "bottom-center"
      })
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal border-input hover:bg-accent hover:text-accent-foreground",
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
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            month={month}
            onMonthChange={setMonth}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
