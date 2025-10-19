# Project Guidelines

This document outlines coding standards, architectural patterns, and best practices for the at-drucial project.

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router with Turbopack)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4.0 with custom design tokens
- **Animation**: Motion (Framer Motion) 12.23.24
- **Theming**: next-themes for dark/light mode
- **Icons**: Lucide React
- **Type Safety**: TypeScript 5

## Code Style & Linting

### ESLint Configuration

We enforce strict code quality standards through ESLint. Key rules:

#### Import Management

- **Always use `@/` alias imports** instead of relative parent imports (`../` or `../../`)
  - ✅ `import { Logo } from "@/components/ui/logo"`
  - ❌ `import { Logo } from "../../ui/logo"`

- **Separate type imports**
  - ✅ `import type { LucideIcon } from "lucide-react"`
  - ❌ `import { LucideIcon } from "lucide-react"`

- **Import order** (auto-sorted):
  1. Side effect imports
  2. Node.js built-ins
  3. React and Next.js
  4. Other packages
  5. Absolute imports (`@/`)
  6. Relative imports (`./)

- **No unused imports or variables** - Auto-removed with `npm run lint:fix`

#### TypeScript Standards

- **Use `type` over `interface`** for all type definitions
  - ✅ `type NavLinkProps = { ... }`
  - ❌ `interface NavLinkProps { ... }`

- **Enforce function declarations** for named components
  - ✅ `export function NavLink() { ... }`
  - ❌ `export const NavLink = () => { ... }`

- **Arrow functions** for unnamed/inline components

#### React Standards

- **Props are automatically sorted** by ESLint:
  - Reserved props first (key, ref)
  - Shorthand props
  - Regular props
  - Multi-line props last
  - Callbacks last

#### Code Formatting

- **Blank lines required**:
  - After all imports
  - Before return statements
  - Before/after function declarations
  - Before/after type/interface declarations
  - Before/after class declarations
  - Between export statements

### Running Code Quality Checks

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
npm run format        # Format with Prettier
npm run format:check  # Check Prettier formatting
npm run type-check    # TypeScript type checking
npm run check         # Run all checks in parallel
```

## File Structure

### Component Organization

```
components/
├── layout/          # Layout components (header, footer, etc.)
│   └── header/
│       ├── index.tsx       # Main export with layout logic
│       ├── nav.tsx         # Navigation component
│       ├── nav-link.tsx    # Individual nav link
│       └── nav-links.ts    # Navigation data
├── pages/           # Page-specific components
│   └── index/
│       └── the-alchemist.tsx
├── providers/       # Context providers (theme, etc.)
│   └── theme-provider.tsx
└── ui/              # Reusable UI components
    ├── button.tsx
    ├── logo.tsx
    ├── theme-toggle.tsx
    └── typography/
        └── heading.tsx
```

### Hooks

```
hooks/
├── use-directional-hover.ts   # Directional hover animations
└── use-icon-flip.ts            # 3D icon flip transitions
```

Custom hooks follow the `use-*` naming convention and are placed in the root `hooks/` directory.

## Layout System

### 12-Column Grid System

We use a consistent 12-column grid across all layouts:

```tsx
<section className="grid grid-cols-12 gap-x-8 px-6 md:px-8 lg:px-12">
  <div className="col-span-6 md:col-span-6">{/* Content */}</div>
  <div className="col-span-6 md:col-span-6">{/* Content */}</div>
</section>
```

#### Grid Spacing Standards

- **Gap**: `gap-x-8` (horizontal gap between columns)
- **Padding**:
  - Mobile: `px-6`
  - Tablet: `md:px-8`
  - Desktop: `lg:px-12`

#### Important Grid Considerations

When child components have their own padding (like navigation items with `px-4`), remove padding from the parent grid column to avoid double-padding issues:

```tsx
// ✅ Correct - no padding on column, child handles its own
<div className="col-span-6 flex items-center justify-end">
  <Nav /> {/* Nav links have internal px-4 */}
</div>

// ❌ Incorrect - double padding
<div className="col-span-6 px-6 flex items-center justify-end">
  <Nav /> {/* This creates unwanted spacing */}
</div>
```

### Header Layout

```tsx
export const HEADER_HEIGHT = 128; // Fixed height constant

<header
  className="grid grid-cols-12 gap-x-8 border-b"
  style={{ height: HEADER_HEIGHT }}
>
  <div className="col-span-6 flex items-center px-6 md:px-8">
    <Logo />
  </div>
  <div className="col-span-6 flex items-center justify-end">
    <Nav />
  </div>
</header>;
```

## Animation Patterns

### Motion (Framer Motion)

We use the `motion` package for all animations. Import from `motion/react`:

```tsx
import {
  motion,
  useMotionValue,
  useAnimationControls,
  animate,
} from "motion/react";
```

### Custom Animation Hooks

#### useDirectionalHover

Provides directional hover effects that animate from the mouse entry direction:

```tsx
const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLButtonElement>({
  duration: 0.3, // optional, defaults to 0.3
  ease: "easeInOut", // optional, defaults to "easeInOut"
});

return (
  <button
    ref={ref}
    onMouseEnter={handlers.onMouseEnter}
    onMouseLeave={handlers.onMouseLeave}
  >
    <motion.div
      className="bg-muted absolute inset-0"
      style={{ translateX: bgX, translateY: bgY }}
    />
  </button>
);
```

**Key features**:

- Detects entry/exit direction (left, right, top, bottom)
- Animates background from that direction
- Auto-cleanup on unmount
- Generic type support for any HTML element

#### useIconFlip

Creates 3D flip transitions between two icons:

```tsx
const { icon1Controls, icon2Controls, icon1Initial, icon2Initial } =
  useIconFlip(isFirstIconVisible, {
    duration: 0.4, // optional, defaults to 0.4
    ease: "easeInOut", // optional
  });

return (
  <div style={{ perspective: "800px" }}>
    <motion.div
      animate={icon1Controls}
      initial={icon1Initial}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Icon1 />
    </motion.div>
    <motion.div
      animate={icon2Controls}
      initial={icon2Initial}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Icon2 />
    </motion.div>
  </div>
);
```

**Key features**:

- 3D rotateX flip animation
- Opacity transitions
- Triggers automatically on state change
- Returns both controls and initial states

### Animation Best Practices

1. **Always use hooks for reusable patterns** - Extract repeated animation logic
2. **Set perspective on parent container** for 3D effects: `style={{ perspective: "800px" }}`
3. **Use transformStyle preserve-3d** on animated elements
4. **Clean up animations** - Both hooks handle cleanup automatically

## Styling & Design

### Custom Fonts

Three custom variable fonts are configured:

- **Archivo**: Primary sans-serif (100-900 weight)
- **Teko**: Display font for headings (300-700 weight)
- **Styro**: Decorative font (200-900 weight)

Access via Tailwind classes:

```tsx
<div className="font-teko">Heading</div>
<div className="font-styro">Decorative</div>
```

### Typography Hierarchy

Headings automatically use the Teko font:

```tsx
<h1>  // text-9xl, font-bold
<h2>  // text-6xl, font-semibold
<h3>  // text-4xl, font-semibold
<h4>  // text-3xl, font-medium
<h5>  // text-2xl, font-medium
```

**Eyebrow text** (small text before headings):

```tsx
<hgroup>
  <p>Eyebrow text</p> {/* Auto-styled as uppercase, muted */}
  <h1>Main Heading</h1>
</hgroup>
```

**Subtitle text** (text after headings):

```tsx
<hgroup>
  <h1>Main Heading</h1>
  <p>Subtitle text</p> {/* Auto-styled as lowercase, muted */}
</hgroup>
```

### Color System

**IMPORTANT**: Always use semantic theme colors defined in `app/globals.css`. Never use Tailwind's default color palette (red-500, blue-600, etc.).

Using OKLCH color space for perceptually uniform colors with automatic dark mode support:

#### Semantic Colors

- `background` / `foreground` - Base page colors
- `primary` / `primary-foreground` - Primary actions and emphasis
- `secondary` / `secondary-foreground` - Secondary actions
- `muted` / `muted-foreground` - Subdued backgrounds and text
- `accent` / `accent-foreground` - Accent elements
- `destructive` / `destructive-foreground` - Destructive actions

#### Component Colors

- `card` / `card-foreground` - Card backgrounds
- `popover` / `popover-foreground` - Popover/dropdown backgrounds
- `border` - Border colors
- `input` - Input border colors
- `ring` - Focus ring colors

#### Usage Examples

```tsx
// ✅ Correct - Use semantic colors
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
<div className="border-border">

// ❌ Incorrect - Don't use Tailwind default colors
<div className="bg-white text-black">
<button className="bg-blue-600 text-white">
<p className="text-gray-500">
<div className="border-gray-300">
```

These colors automatically adapt to dark mode without additional CSS.

### Prose Width Utilities

For readable text content:

```tsx
<div className="w-prose">     {/* 65ch - default */}
<div className="w-prose-sm">  {/* 55ch */}
<div className="w-prose-lg">  {/* 75ch */}
<div className="w-prose-xl">  {/* 85ch */}
<div className="w-prose-2xl"> {/* 95ch */}
```

## Dark Mode

Using `next-themes` for theme management:

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
const isLight = theme === "light";

// Toggle theme
setTheme(isLight ? "dark" : "light");
```

Dark mode is configured with the custom variant in `globals.css`:

```css
@custom-variant dark (&:is(.dark *));
```

## Component Patterns

### Interactive Components

Use directional hover effects for interactive elements:

```tsx
export function InteractiveCard() {
  const { ref, bgX, bgY, handlers } = useDirectionalHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      onMouseEnter={handlers.onMouseEnter}
      onMouseLeave={handlers.onMouseLeave}
    >
      <motion.div
        className="bg-muted absolute inset-0"
        style={{ translateX: bgX, translateY: bgY }}
      />
      {/* Content */}
    </div>
  );
}
```

### Icon Transitions

For toggling between two icons based on state:

```tsx
export function ToggleButton() {
  const [isActive, setIsActive] = useState(false);
  const { icon1Controls, icon2Controls, icon1Initial, icon2Initial } =
    useIconFlip(isActive);

  return (
    <button onClick={() => setIsActive(!isActive)}>
      <div className="relative size-8" style={{ perspective: "800px" }}>
        <motion.div
          animate={icon1Controls}
          className="absolute inset-0"
          initial={icon1Initial}
          style={{ transformStyle: "preserve-3d" }}
        >
          <IconOne className="size-6" />
        </motion.div>
        <motion.div
          animate={icon2Controls}
          className="absolute inset-0"
          initial={icon2Initial}
          style={{ transformStyle: "preserve-3d" }}
        >
          <IconTwo className="size-6" />
        </motion.div>
      </div>
    </button>
  );
}
```

### Layout Components

Always export layout constants for reusability:

```tsx
export const HEADER_HEIGHT = 128;

export function Header() {
  return (
    <header style={{ height: HEADER_HEIGHT }}>
      {/* ... */}
    </header>
  );
}

// In other components
import { HEADER_HEIGHT } from "@/components/layout/header";

<section style={{ height: `calc(100svh - ${HEADER_HEIGHT}px)` }}>
```

## Development Workflow

### Development Server

```bash
npm run dev  # Start Next.js with Turbopack
```

### Before Committing

```bash
npm run check  # Run lint, format check, and type check in parallel
```

### Building for Production

```bash
npm run build  # Build with Turbopack
npm run start  # Start production server
```

## Key Principles

1. **Consistency**: Follow the 12-column grid system everywhere
2. **Reusability**: Extract repeated patterns into hooks and components
3. **Type Safety**: Use TypeScript for all code, prefer `type` over `interface`
4. **Code Quality**: Run linting and formatting before committing
5. **Performance**: Leverage Next.js 15 features and Turbopack
6. **Accessibility**: Include `sr-only` labels for interactive elements
7. **Animations**: Use custom hooks for consistent motion design
8. **Spacing**: Mind child component padding when using grid layouts
9. **Theming**: Always use semantic colors from `globals.css`, never Tailwind default colors

## Common Patterns

### Navigation Item with Hover Effect

```tsx
<Link
  ref={ref}
  className="relative flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden px-4"
  href={href}
  onMouseEnter={handlers.onMouseEnter}
  onMouseLeave={handlers.onMouseLeave}
>
  <motion.div
    className="bg-muted absolute inset-0"
    style={{ translateX: bgX, translateY: bgY }}
  />
  <Icon className="text-muted-foreground size-6 stroke-1" />
  <span className="sr-only">{label}</span>
</Link>
```

### Responsive Grid Section

```tsx
<section className="grid grid-cols-12 gap-x-8 px-6 md:px-8 lg:px-12">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    {/* Content adapts: full width mobile, half tablet, third desktop */}
  </div>
</section>
```

### Full-Height Section with Header Offset

```tsx
import { HEADER_HEIGHT } from "@/components/layout/header";

<section
  className="grid grid-cols-12 gap-x-8 px-6 md:px-8 lg:px-12"
  style={{ height: `calc(100svh - ${HEADER_HEIGHT}px)` }}
>
  {/* Content fills viewport height minus header */}
</section>;
```

---

**Note**: This document should be updated as new patterns and conventions are established.
