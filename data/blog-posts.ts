export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "vibe-coding-as-a-senior-dev",
    title: "Vibe Coding as a Senior Dev",
    excerpt:
      "Hyperdirmic is a macOS utility that watches your Downloads folder for new files and instantly moves them into clean subfolders.",
    content: `
## The Art of Flow State

There's something magical about those moments when code just flows. As a senior developer, I've learned that these moments don't happen by accident—they're cultivated through deliberate practice and environment design.

### Setting the Stage

The first step is eliminating distractions. I use a combination of tools:

- **Focus modes** on macOS to silence notifications
- **Dedicated workspace** with minimal visual clutter
- **Curated playlists** that match the task at hand

### The Hyperdirmic Approach

I built Hyperdirmic because I noticed how much mental energy I was spending on file organization. Every time I downloaded a resource, I'd have to:

1. Open Finder
2. Navigate to Downloads
3. Identify the file type
4. Move it to the appropriate folder

This might seem trivial, but these micro-interruptions add up. Hyperdirmic watches your Downloads folder and automatically sorts files based on rules you define. PDFs go to Documents, images to a design assets folder, code snippets to your dev directory.

### The Compound Effect

Small optimizations compound. When you eliminate friction from routine tasks, you preserve cognitive bandwidth for the work that matters. This is the essence of vibe coding—creating an environment where you can do your best work effortlessly.

### Practical Tips

1. **Audit your workflow** - Spend a day noting every small friction point
2. **Automate ruthlessly** - If you do something more than twice, script it
3. **Invest in your tools** - A good chair, monitor, and keyboard pay dividends
4. **Protect your flow** - Schedule blocks of uninterrupted time

The goal isn't to work harder—it's to work in a way that feels effortless.
    `,
    date: "2024-01-15",
    readTime: "5 min",
    image: "/placeholder-blog-1.jpg",
    tags: ["productivity", "tools", "workflow"],
  },
  {
    id: "2",
    slug: "productivity-super-stack",
    title: "Productivity Super Stack",
    excerpt:
      "Welcome to the Productivity Super Stack. This is all about the core tools that keep me focused, fast, and efficient.",
    content: `
## The Foundation

Every productive workflow needs a solid foundation. After years of experimentation, I've settled on a stack that works seamlessly together.

### Task Management: Linear

Linear has revolutionized how I think about project management. Its keyboard-first design means I can capture and organize tasks without breaking flow. The key features I rely on:

- **Cycles** for time-boxed sprints
- **Views** that adapt to my current context
- **Integrations** with GitHub for automatic issue updates

### Note-Taking: Obsidian

My second brain lives in Obsidian. The bidirectional linking creates a knowledge graph that surfaces connections I wouldn't have made otherwise. My setup includes:

- **Daily notes** for capturing thoughts
- **Project folders** with standardized templates
- **Tag taxonomy** for cross-cutting concerns

### Communication: Minimal and Async

I've deliberately reduced synchronous communication:

- Slack notifications off except for DMs
- Email checked twice daily at set times
- Meetings only when async won't work

### The Glue: Raycast

Raycast ties everything together. Custom scripts let me:

- Create Linear issues from anywhere
- Search my Obsidian vault
- Quick-capture ideas to my inbox

### Building Your Stack

The best stack is the one you'll actually use. Start with your biggest pain point and solve that first. Don't try to adopt everything at once—that's a recipe for tool fatigue.

Remember: tools should serve your workflow, not the other way around.
    `,
    date: "2024-01-10",
    readTime: "8 min",
    image: "/placeholder-blog-2.jpg",
    tags: ["productivity", "tools", "workflow"],
  },
  {
    id: "3",
    slug: "design-systems-at-scale",
    title: "Design Systems at Scale",
    excerpt:
      "Building consistent UI across multiple products requires more than just a component library. Here's how to think about it.",
    content: `
## Beyond Components

A design system is not a component library. Components are the visible output, but the system encompasses much more: principles, patterns, processes, and people.

### The Three Pillars

#### 1. Design Tokens

Tokens are the atomic values that define your visual language:

- Colors (semantic, not arbitrary)
- Typography scales
- Spacing systems
- Animation curves

These tokens should be platform-agnostic and serve as the single source of truth.

#### 2. Component Architecture

Components should be:

- **Composable** - Small pieces that combine well
- **Accessible** - WCAG compliance built in
- **Documented** - Usage guidelines and examples
- **Tested** - Visual regression and unit tests

#### 3. Governance

Without governance, systems decay. You need:

- Clear contribution guidelines
- Review processes for changes
- Versioning and changelog
- Deprecation policies

### Scaling Challenges

As your system grows, you'll encounter:

- **Adoption resistance** - Teams with existing patterns
- **Edge cases** - Components that don't quite fit
- **Performance** - Bundle size and tree-shaking
- **Versioning** - Breaking changes across consumers

### The Human Element

The hardest part isn't technical—it's organizational. Success requires:

- Executive sponsorship
- Dedicated team (not part-time)
- Clear communication channels
- Feedback loops with consumers

A design system is a product. Treat it like one.
    `,
    date: "2024-01-05",
    readTime: "6 min",
    image: "/placeholder-blog-3.jpg",
    tags: ["design", "systems", "architecture"],
  },
  {
    id: "4",
    slug: "the-art-of-refactoring",
    title: "The Art of Refactoring",
    excerpt:
      "When code becomes unmanageable, it's time to refactor. Here's a systematic approach to cleaning up legacy codebases.",
    content: `
## Why Refactor?

Code is read more often than it's written. Refactoring isn't about making code "prettier"—it's about making it more understandable and maintainable.

### Signs You Need to Refactor

- **Shotgun surgery** - One change requires edits in many places
- **Feature envy** - Methods that use more of another class's data
- **Long methods** - Functions that do too much
- **Duplicated logic** - The same pattern repeated

### The Safety Net

Before refactoring, you need tests. If the code doesn't have tests, write them first. These aren't tests for correctness—they're characterization tests that document current behavior.

### The Process

#### 1. Small Steps

Never refactor and add features simultaneously. Make one small change, verify tests pass, commit. Repeat.

#### 2. Naming

Good names are the cheapest documentation. Spend time finding the right name—it forces you to understand what the code actually does.

#### 3. Extract and Inline

The two most common refactorings:

- **Extract** - Pull code into a named function/variable
- **Inline** - Replace indirection with direct code

Use extract when code's purpose is unclear. Use inline when abstraction adds no value.

### Common Patterns

#### Replace Conditional with Polymorphism

Instead of switch statements, use objects with a common interface.

#### Introduce Parameter Object

When functions take many related parameters, group them into an object.

#### Replace Magic Numbers with Named Constants

Self-documenting code doesn't need comments.

### When to Stop

Refactoring can be endless. Stop when:

- The immediate pain is resolved
- Further changes don't improve readability
- You're gold-plating

Perfect is the enemy of good. Ship it.
    `,
    date: "2024-01-01",
    readTime: "7 min",
    image: "/placeholder-blog-4.jpg",
    tags: ["code", "refactoring", "best-practices"],
  },
  {
    id: "5",
    slug: "motion-design-principles",
    title: "Motion Design Principles",
    excerpt:
      "Good animation isn't just decoration. Learn the principles that make UI motion feel natural and purposeful.",
    content: `
## Purpose Over Polish

Animation should serve a purpose. Every motion should either:

- Provide feedback
- Show relationships
- Guide attention
- Create continuity

If it doesn't do one of these, remove it.

### The 12 Principles (Adapted for UI)

Disney's 12 principles of animation apply to interfaces too:

#### 1. Timing

Fast animations (100-200ms) for direct manipulation. Slower (300-500ms) for state changes and transitions.

#### 2. Easing

Never use linear easing for UI. Natural motion accelerates and decelerates:

- **Ease-out** for entrances
- **Ease-in** for exits
- **Ease-in-out** for state changes

#### 3. Follow Through

Elements should settle into place, not stop abruptly. A slight overshoot and correction feels more natural.

#### 4. Staging

Direct attention to what matters. Dim or blur background elements during modal transitions.

### Performance Considerations

Smooth animation requires 60fps. Stick to properties that can be GPU-accelerated:

- transform
- opacity

Avoid animating:

- width/height
- top/left
- box-shadow

### Accessibility

Motion can cause discomfort for some users. Always:

- Respect prefers-reduced-motion
- Provide controls to disable animations
- Avoid strobing or rapid movement

### Tools of the Trade

- **Framer Motion** for React
- **GSAP** for complex sequences
- **CSS transitions** for simple states

Start simple. Add complexity only when needed.
    `,
    date: "2023-12-28",
    readTime: "6 min",
    image: "/placeholder-blog-5.jpg",
    tags: ["animation", "design", "ux"],
  },
  {
    id: "6",
    slug: "building-for-accessibility",
    title: "Building for Accessibility",
    excerpt:
      "Accessibility isn't an afterthought. Here's how to bake it into your design and development process from day one.",
    content: `
## The Business Case

Accessibility isn't charity—it's good business:

- 15% of the world's population has a disability
- Accessible sites rank better in search
- Legal requirements are increasing
- It improves UX for everyone

### The POUR Principles

WCAG guidelines organize around four principles:

#### Perceivable

Information must be presentable in ways users can perceive:

- Alt text for images
- Captions for video
- Sufficient color contrast
- Resizable text

#### Operable

UI must be operable by various input methods:

- Keyboard navigation
- No time limits (or adjustable)
- No seizure-inducing content
- Clear navigation

#### Understandable

Content must be understandable:

- Readable text
- Predictable behavior
- Input assistance
- Error prevention

#### Robust

Content must work with current and future tools:

- Valid HTML
- Proper ARIA usage
- Compatible with assistive tech

### Practical Implementation

#### Semantic HTML

Use the right elements:

- \`<button>\` for actions
- \`<a>\` for navigation
- \`<nav>\`, \`<main>\`, \`<aside>\` for structure

#### Focus Management

- Visible focus indicators
- Logical tab order
- Focus trapping in modals

#### ARIA (Use Sparingly)

ARIA is a last resort. If you can use semantic HTML, do that instead. When you need ARIA:

- aria-label for icon buttons
- aria-expanded for toggles
- aria-live for dynamic content

### Testing

- Use your keyboard only
- Test with screen readers (VoiceOver, NVDA)
- Run automated tools (axe, Lighthouse)
- Involve users with disabilities

Accessibility is a journey, not a destination. Start where you are and improve continuously.
    `,
    date: "2023-12-20",
    readTime: "9 min",
    image: "/placeholder-blog-6.jpg",
    tags: ["accessibility", "ux", "best-practices"],
  },
];
