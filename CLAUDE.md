# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Type-check with TypeScript, then build for production
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

## Tech Stack

**Frontend Framework**: React 19.1.1 with TypeScript
**Build Tool**: Vite 7.1.7
**Styling**: Tailwind CSS v4.1.16 with @tailwindcss/vite plugin
**Routing**: React Router DOM 7.9.4
**State Management**: Zustand 5.0.8
**Forms**: React Hook Form 7.65.0 with Zod 4.1.12 validation via @hookform/resolvers
**Data Tables**: TanStack React Table 8.21.3
**UI Utilities**:
- `class-variance-authority` - Type-safe variant styling
- `clsx` + `tailwind-merge` - Composable className utility (see `src/lib/utils.ts`)
- `lucide-react` - Icon library
- `date-fns` - Date utilities

## Project Structure

```
src/
├── lib/
│   └── utils.ts       # Utility functions (cn for className merging)
├── App.tsx            # Main app component
├── main.tsx           # React entry point
└── index.css          # Global styles
```

## Configuration Notes

**Path Aliases**: The `@/` alias maps to `./src/` directory (configured in vite.config.ts and tsconfig.json)

**TypeScript**: Strict mode enabled with additional checks:
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Target: ES2022 with React JSX transform
- Module resolution: bundler mode

**ESLint**: Configured for TypeScript + React with:
- React Hooks rules (recommended-latest)
- React Refresh for HMR compatibility
- Ignores `dist/` directory

**Tailwind CSS**: Using v4 with Vite plugin integration (not traditional PostCSS setup)
