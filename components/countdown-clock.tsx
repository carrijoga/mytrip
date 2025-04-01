"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import NumberFlow, { Format } from '@number-flow/react'

interface TimeLeft {
  years: number
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
    years: 0,
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
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      let delta = Math.floor((target.getTime() - now.getTime()) / 1000)

      const secondsInYear = 365 * 24 * 60 * 60
      const years = Math.floor(delta / secondsInYear)
      delta -= years * secondsInYear

      const secondsInMonth = 30 * 24 * 60 * 60
      const months = Math.floor(delta / secondsInMonth)
      delta -= months * secondsInMonth

      const secondsInDay = 24 * 60 * 60
      const days = Math.floor(delta / secondsInDay)
      delta -= days * secondsInDay

      const secondsInHour = 60 * 60
      const hours = Math.floor(delta / secondsInHour)
      delta -= hours * secondsInHour

      const secondsInMinute = 60
      const minutes = Math.floor(delta / secondsInMinute)
      delta -= minutes * secondsInMinute

      const seconds = delta

      return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatLabel = (value: number, singular: string, plural: string) => {
    return value === 1 ? singular : plural
  }

  const timeItems = [
    { 
      label: formatLabel(timeLeft.years, "Ano", "Anos"), 
      value: timeLeft.years, 
      emoji: "" 
    },
    { 
      label: formatLabel(timeLeft.months, "Mês", "Meses"), 
      value: timeLeft.months, 
      emoji: "" 
    },
    { 
      label: formatLabel(timeLeft.days, "Dia", "Dias"), 
      value: timeLeft.days, 
      emoji: "" 
    },
    { 
      label: formatLabel(timeLeft.hours, "Hora", "Horas"), 
      value: timeLeft.hours, 
      emoji: "" 
    },
    { 
      label: formatLabel(timeLeft.minutes, "Minuto", "Minutos"), 
      value: timeLeft.minutes, 
      emoji: "" 
    },
    { 
      label: formatLabel(timeLeft.seconds, "Segundo", "Segundos"), 
      value: timeLeft.seconds, 
      emoji: "" 
    },
  ].filter(item => item.value > 0)

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-3 md:grid-cols-5",
    6: "grid-cols-3 md:grid-cols-6"
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full max-w-4xl shadow-lg bg-gray-800 border-gray-700 overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <div className={`grid ${gridCols[timeItems.length as keyof typeof gridCols]} gap-4 text-center`}>
            {timeItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-2"
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
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2 tabular-nums min-w-[60px] sm:min-w-[80px]">
                  <NumberFlow
                    value={item.value}
                    format={((value: number) => value.toString().padStart(2, "0")) as Format}
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
