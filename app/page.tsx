"use client"

import { useState } from "react"
import CountdownClock from "@/components/countdown-clock"
import { DatePicker } from "@/components/date-picker"
import { motion } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [targetDate, setTargetDate] = useState<string>("2025-05-23T00:00:00")

  const handleDateChange = (date: Date) => {
    setTargetDate(date.toISOString())
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <Toaster />
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4 text-white flex items-center justify-center gap-2">
            <span role="img" aria-label="hourglass" className="text-3xl">
              ✈️
            </span>
            Tempo Restante para Viajar
          </h1>
          <p className="text-gray-400 mb-6">Selecione uma data para sua viagem</p>
          <div className="max-w-xs mx-auto">
            <DatePicker onDateChange={handleDateChange} />
          </div>
        </motion.div>

        <CountdownClock targetDate={targetDate} />

        <motion.div
          className="mt-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>A data selecionada é salva automaticamente no seu navegador</p>
        </motion.div>
      </div>
    </div>
  )
}

