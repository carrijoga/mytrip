"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface TimeLeft {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownClockProps {
  targetDate: string
}

export default function CountdownClock({ targetDate }: CountdownClockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate)
      const now = new Date()

      if (now >= target) {
        return {
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      // Calculate total seconds difference
      let delta = Math.floor((target.getTime() - now.getTime()) / 1000)

      // Calculate months (approximate)
      const secondsInMonth = 30 * 24 * 60 * 60
      const months = Math.floor(delta / secondsInMonth)
      delta -= months * secondsInMonth

      // Calculate days
      const secondsInDay = 24 * 60 * 60
      const days = Math.floor(delta / secondsInDay)
      delta -= days * secondsInDay

      // Calculate hours
      const secondsInHour = 60 * 60
      const hours = Math.floor(delta / secondsInHour)
      delta -= hours * secondsInHour

      // Calculate minutes
      const secondsInMinute = 60
      const minutes = Math.floor(delta / secondsInMinute)
      delta -= minutes * secondsInMinute

      // Remaining seconds
      const seconds = delta

      return {
        months,
        days,
        hours,
        minutes,
        seconds,
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clean up interval on unmount
    return () => clearInterval(timer)
  }, [targetDate])

  const timeItems = [
    { label: "Meses", value: timeLeft.months, emoji: "" },
    { label: "Dias", value: timeLeft.days, emoji: "" },
    { label: "Horas", value: timeLeft.hours, emoji: "" },
    { label: "Minutos", value: timeLeft.minutes, emoji: "" },
    { label: "Segundos", value: timeLeft.seconds, emoji: "" },
  ]

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {new Date(targetDate).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </motion.h2>

      <Card className="w-full max-w-2xl shadow-lg bg-gray-800 border-gray-700 overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-5 gap-4 text-center">
            {timeItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="text-lg mb-1"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 2, delay: index * 0.2, repeat: 0 }}
                >
                  {item.emoji}
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-cyan-400 mb-2 tabular-nums"
                  key={`${item.value}-${index}`}
                  initial={{ opacity: 0.5, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.value.toString().padStart(2, "0")}
                </motion.div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

