"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import NumberFlow, { Format } from '@number-flow/react'
import Confetti from 'react-confetti-boom'
import { useLanguage } from "@/lib/language-context"

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
  const [showConfetti, setShowConfetti] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate)
      const now = new Date()

      if (now >= target) {
        setShowConfetti(true)
        return {
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      setShowConfetti(false)
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
      label: formatLabel(timeLeft.years, language === "pt" ? "Ano" : "Year", language === "pt" ? "Anos" : "Years"), 
      value: timeLeft.years, 
      emoji: "",
      showIfZero: false
    },
    { 
      label: formatLabel(timeLeft.months, language === "pt" ? "Mês" : "Month", language === "pt" ? "Meses" : "Months"), 
      value: timeLeft.months, 
      emoji: "",
      showIfZero: timeLeft.years > 0
    },
    { 
      label: formatLabel(timeLeft.days, language === "pt" ? "Dia" : "Day", language === "pt" ? "Dias" : "Days"), 
      value: timeLeft.days, 
      emoji: "",
      showIfZero: timeLeft.years > 0 || timeLeft.months > 0
    },
    { 
      label: formatLabel(timeLeft.hours, language === "pt" ? "Hora" : "Hour", language === "pt" ? "Horas" : "Hours"), 
      value: timeLeft.hours, 
      emoji: "",
      showIfZero: timeLeft.years > 0 || timeLeft.months > 0 || timeLeft.days > 0
    },
    { 
      label: formatLabel(timeLeft.minutes, language === "pt" ? "Minuto" : "Minute", language === "pt" ? "Minutos" : "Minutes"), 
      value: timeLeft.minutes, 
      emoji: "",
      showIfZero: timeLeft.years > 0 || timeLeft.months > 0 || timeLeft.days > 0 || timeLeft.hours > 0
    },
    { 
      label: formatLabel(timeLeft.seconds, language === "pt" ? "Segundo" : "Second", language === "pt" ? "Segundos" : "Seconds"), 
      value: timeLeft.seconds, 
      emoji: "",
      showIfZero: true
    },
  ].filter(item => item.value > 0 || item.showIfZero)

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
      className="flex flex-col items-center relative overflow-visible w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {showConfetti && (
        <div className="fixed inset-1 pointer-events-none">
          <Confetti mode="boom" particleCount={200} />
        </div>
      )}
      <Card className="w-full max-w-4xl shadow-custom-lg relative backdrop-blur-sm bg-background/80">
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
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 tabular-nums min-w-[60px] sm:min-w-[80px] drop-shadow-custom">
                  <NumberFlow
                    value={item.value}
                    format={((value: number) => value.toString().padStart(2, "0")) as Format}
                  />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap drop-shadow-custom-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
