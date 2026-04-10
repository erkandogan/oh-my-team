---
name: frontend-ui-ux
description: "Frontend and UI/UX development guidance. Provides patterns for responsive design, accessibility, component architecture, state management, and visual consistency. Load this skill when working on any frontend task."
user-invocable: false
---

# Frontend UI/UX Development Guide

When working on frontend code, follow these principles:

## Component Architecture

- **Single Responsibility**: Each component does one thing well
- **Composition over inheritance**: Build complex UIs from simple, composable pieces
- **Props down, events up**: Data flows down, actions flow up
- **Colocation**: Keep styles, tests, and types near their component

## Responsive Design

- **Mobile-first**: Start with the smallest breakpoint, enhance up
- **Fluid layouts**: Use relative units (rem, %, vw/vh) over fixed pixels
- **Breakpoint strategy**: Match the project's existing breakpoints
- **Touch targets**: Minimum 44x44px for interactive elements

## Accessibility (A11y)

- **Semantic HTML**: Use proper elements (button, nav, main, aside)
- **ARIA when needed**: Only when semantic HTML isn't sufficient
- **Keyboard navigation**: All interactive elements must be keyboard-accessible
- **Color contrast**: WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- **Focus management**: Visible focus indicators, logical tab order
- **Screen readers**: Test with VoiceOver/NVDA, use aria-label/aria-describedby

## State Management

- **Local state first**: useState/useReducer before reaching for global state
- **Server state**: Use the project's data fetching library (React Query, SWR, etc.)
- **URL state**: Filters, pagination, tabs → URL parameters
- **Form state**: Use the project's form library (React Hook Form, Formik, etc.)
- **Global state**: Only for truly app-wide concerns (theme, auth, locale)

## Visual Consistency

- **Design tokens**: Use the project's existing variables/tokens for colors, spacing, typography
- **Spacing scale**: Follow the project's spacing system (don't use arbitrary values)
- **Typography**: Use existing type scale, don't create new sizes
- **Icons**: Use the project's icon system/library

## Performance

- **Lazy loading**: Code-split routes and heavy components
- **Image optimization**: Proper formats (WebP/AVIF), srcset, lazy loading
- **Bundle awareness**: Check impact of new dependencies
- **Render optimization**: Memoize expensive computations, avoid unnecessary re-renders

## Testing

- **Component tests**: Render, interact, assert on DOM output
- **Visual regression**: Screenshot tests for critical UI
- **Accessibility tests**: Automated a11y checks (axe-core)
- **User flow tests**: E2E tests for critical paths
