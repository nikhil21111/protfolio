# Nikhil Retro Portfolio

A next-level retro computer portfolio website inspired by Windows 95/98, built with Next.js, React, TypeScript, and Tailwind CSS.

## 🌟 Features

### UI Theme
- Classic Windows 95/98 style design
- Retro boot splash screen with loading animation
- All apps (.exe) arranged in desktop grid layout
- Authentic pixel art icons and styling

### Applications (.exe)
1. **AboutMe.exe** - Personal introduction with stats and fun facts
2. **Projects.exe** - Portfolio of completed projects
3. **Education.exe** - Academic background and certifications
4. **Skills.exe** - Technical skills with progress bars
5. **ArtStudio.exe** - Pixel art canvas and tools
6. **Games.exe** - Retro games collection
7. **ContactMe.exe** - Contact form
8. **MiniMarket.exe** - Fun marketplace with PASSION/CREATIVITY currency
9. **Blog.exe** - Blog posts and updates
10. **Resume.exe** - Downloadable resume
11. **Settings.exe** - Theme and customization options
12. **Gallery.exe** - Image and art gallery
13. **Terminal.exe** - Interactive command-line interface
14. **ChatBot.exe** - AI assistant chatbot
15. **Achievements.exe** - Progress tracking and unlockables
16. **EasterEgg.exe** - Hidden secrets and codes
17. **Visitor.exe** - Visitor counter and stats

### Interactive Features
- Draggable, resizable windows
- Minimize/maximize/close animations
- Working taskbar with time and date
- Visitor counter
- Music toggle
- CRT scanline effects
- Keyboard navigation support
- Responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🛠️ Technologies Used

- **Next.js 15** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Draggable** - Draggable windows

## 📁 Project Structure

```
protfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── apps/
│   │   ├── AboutMe.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── ArtStudio.tsx
│   │   ├── Games.tsx
│   │   ├── ContactMe.tsx
│   │   ├── MiniMarket.tsx
│   │   ├── Blog.tsx
│   │   ├── Resume.tsx
│   │   ├── Settings.tsx
│   │   ├── Gallery.tsx
│   │   ├── Terminal.tsx
│   │   ├── ChatBot.tsx
│   │   ├── Achievements.tsx
│   │   ├── EasterEgg.tsx
│   │   ├── Visitor.tsx
│   │   └── AppContent.tsx
│   ├── BootScreen.tsx
│   ├── Desktop.tsx
│   ├── DesktopIcon.tsx
│   ├── Taskbar.tsx
│   └── Window.tsx
├── lib/
│   └── apps.ts
├── public/
├── .github/
│   └── copilot-instructions.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## 🎨 Customization

### Changing Content
Edit the content in each app component located in `components/apps/`

### Adding New Apps
1. Create a new component in `components/apps/`
2. Add the app definition to `lib/apps.ts`
3. Import and register in `components/apps/AppContent.tsx`

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Windows 95 colors and utilities defined in Tailwind theme

## 🏆 Easter Eggs

Try these secret codes in EasterEgg.exe:
- `1337` - Leet code
- `1995` - Windows 95 year
- `love` - Secret message
- `coffee` - Programmer fuel
- `42` - Answer to everything

## 📝 License

This project is open source and available under the MIT License.


