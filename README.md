# ✈️ MyTrip

A beautiful and interactive travel countdown application built with Next.js. Count down the days, hours, minutes, and seconds until your next adventure!

## 🌟 Features

- **Interactive Countdown Timer**: Real-time countdown display with animated numbers showing years, months, days, hours, minutes, and seconds until your trip
- **Date Selection**: Easy-to-use date picker to select your travel date
- **Multi-language Support**: Switch between Portuguese (Português) and English
- **Theme Customization**: Multiple color themes to personalize your experience
- **Dark/Light Mode**: Automatic theme detection with manual override option
- **Celebration Effects**: Confetti animation when the countdown reaches zero
- **Responsive Design**: Fully responsive interface that works on all devices
- **Smooth Animations**: Elegant motion animations powered by Framer Motion

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Number Animations**: @number-flow/react
- **Icons**: Lucide React
- **Date Handling**: date-fns & react-day-picker
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner

## 📦 Installation

### Prerequisites

- Node.js 18+ installed on your machine
- npm, pnpm, or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/carrijoga/mytrip.git
cd mytrip
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎯 Usage

1. **Select Your Travel Date**: Click on the date picker to choose when your trip begins
2. **Watch the Countdown**: The countdown timer automatically updates every second
3. **Change Language**: Click the globe icon to switch between Portuguese and English
4. **Customize Theme**: Click the palette icon to choose your preferred color theme
5. **Celebrate**: When the countdown reaches zero, enjoy the confetti celebration! 🎉

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Project Structure

```
mytrip/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── countdown-clock.tsx    # Countdown timer component
│   ├── date-picker.tsx        # Date selection component
│   ├── theme-provider.tsx     # Theme context provider
│   ├── theme-selector.tsx     # Theme selection component
│   └── ui/                    # Shadcn UI components
├── lib/                   # Utility functions
│   ├── language-context.tsx   # Language context provider
│   └── utils.ts              # Helper functions
├── public/                # Static assets
└── styles/                # Additional styles
```

## 🎨 Customization

### Adding New Themes

Themes can be customized by modifying the theme selector component. The application uses CSS variables for theming, making it easy to add new color schemes.

### Changing Languages

The application supports Portuguese and English out of the box. To add more languages, extend the language context in `lib/language-context.tsx`.

## 🌐 Deployment

The easiest way to deploy your MyTrip application is to use [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/carrijoga/mytrip)

Alternatively, you can deploy to any platform that supports Next.js applications.

## 📄 License

This project is private and intended for personal use.

## 👨‍💻 Author

Developed with ❤️ by [carrijoga](https://github.com/carrijoga)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

**Ready to count down to your next adventure? Start planning your trip today!** ✈️🌍
