# Synergy 2025 - IIIT Bangalore TechFest Website

A modern, CyberPunk-themed website for IIIT Bangalore's annual technical festival, Synergy 2025. Built with Next.js, Tailwind CSS, and GSAP animations.

## Features

- 🎨 CyberPunk theme with neon colors and futuristic design
- ⚡ Smooth animations and transitions using GSAP
- 📱 Fully responsive design for all devices
- 🎯 Interactive event cards and timeline
- 📝 Contact form with validation
- 🎮 Modern UI components with hover effects
- 🖼️ Optimized images and assets

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Framer Motion
- Three.js (for 3D elements)

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/synergy-2025.git
cd synergy-2025
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add any necessary environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
synergy-2025/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── EventCard.tsx      # Event card component
│   ├── Timeline.tsx       # Timeline component
│   ├── EventsSection.tsx  # Events section
│   ├── TimelineSection.tsx # Timeline section
│   ├── AboutSection.tsx   # About section
│   └── ContactSection.tsx # Contact section
├── constants/             # Constants and data
│   └── data.ts           # Static data
├── public/               # Static assets
│   ├── images/          # Image assets
│   └── grid.svg         # Background pattern
└── styles/              # Additional styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from zentry.com
- UI components inspired by modern web design trends
- Icons from Heroicons
- Fonts from Google Fonts

## Contact

For any queries or collaborations, please reach out to:
- Email: synergy@iiitb.ac.in
- Website: https://synergy.iiitb.ac.in 