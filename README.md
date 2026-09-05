# Project

Modern Next.js application built with TypeScript.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- Husky
- lint-staged
- GSAP
- Lenis

## Architecture

```text
src/
├── app/                # Next.js routing
├── components/         # Shared UI components
│   ├── ui/             # Design system
│   └── layout/         # Header, Footer, etc.
├── features/           # Application/page features
├── animations/         # GSAP / Lenis animations
│   ├── scroll/
│   ├── parallax/
│   └── transitions/
├── hooks/              # Shared React hooks
├── services/           # API/external services
├── lib/                # Utilities
├── config/             # Application configuration
└── types/              # Shared TypeScript types

public/
├── images/
├── videos/
├── fonts/
└── icons/
```
