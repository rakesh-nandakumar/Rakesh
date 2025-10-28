# LoadingIndicator Component

A unified, beautiful loading indicator component used across the entire application. Features unique animated designs with gradient colors matching your site's theme.

## Features

- 🎨 **Multiple Variants**: Three distinct animation styles (spinner, pulse, dots)
- 📏 **Size Options**: Small, medium, and large sizes
- 🌈 **Gradient Colors**: Uses site's primary gradient colors (#ff014f → #ff6b9d → #ff6b35)
- ♿ **Accessible**: Includes proper ARIA labels and reduced motion support
- 🎭 **Theme Support**: Works with both light and dark themes
- 📱 **Responsive**: Adapts to different screen sizes

## Usage

### Basic Usage

```javascript
import LoadingIndicator from "@/components/LoadingIndicator";

// Default spinner
<LoadingIndicator />

// With custom message
<LoadingIndicator message="Loading data" />
```

### Size Variants

```javascript
// Small - for inline or compact spaces
<LoadingIndicator size="small" message="Loading" />

// Medium (default) - for general use
<LoadingIndicator size="medium" message="Loading content" />

// Large - for page-level loading
<LoadingIndicator size="large" message="Loading page" />
```

### Animation Variants

```javascript
// Spinner (default) - rotating rings with pulsing core
<LoadingIndicator variant="spinner" message="Loading" />

// Pulse - expanding circles
<LoadingIndicator variant="pulse" message="Loading" />

// Dots - bouncing dots
<LoadingIndicator variant="dots" message="Loading" />
```

### Fullscreen Overlay

```javascript
// Show as fullscreen overlay with backdrop
<LoadingIndicator
  fullScreen={true}
  size="large"
  message="Please wait"
  variant="spinner"
/>
```

## Props

| Prop         | Type      | Default        | Description                                             |
| ------------ | --------- | -------------- | ------------------------------------------------------- |
| `size`       | `string`  | `"medium"`     | Size of the indicator: `"small"`, `"medium"`, `"large"` |
| `message`    | `string`  | `"Loading..."` | Loading message to display below the indicator          |
| `fullScreen` | `boolean` | `false`        | Whether to show as fullscreen overlay                   |
| `variant`    | `string`  | `"spinner"`    | Animation style: `"spinner"`, `"pulse"`, `"dots"`       |

## Examples

### In Page Components

```javascript
// Blogs page
{loading ? (
  <LoadingIndicator
    size="large"
    message="Loading blogs"
    variant="spinner"
  />
) : (
  // Content here
)}
```

### In Suspense Boundaries

```javascript
import { Suspense } from "react";

<Suspense
  fallback={
    <LoadingIndicator
      size="small"
      message="Loading suggestions"
      variant="dots"
    />
  }
>
  <AsyncComponent />
</Suspense>;
```

### Global Loading (app/loading.js)

```javascript
export default function Loading() {
  return (
    <LoadingIndicator size="large" message="Loading page" variant="spinner" />
  );
}
```

## Animation Details

### Spinner Variant

- Three rotating rings at different speeds and directions
- Pulsing gradient core in the center
- Smooth cubic-bezier animations
- Best for: General loading states

### Pulse Variant

- Three expanding circles with fade-out effect
- Staggered animation delays
- Smooth expansion animation
- Best for: Data fetching, updates

### Dots Variant

- Four bouncing dots with gradient colors
- Sequential bounce animation
- Playful and engaging
- Best for: Quick loads, inline loading

## Styling

The component uses:

- CSS custom properties for theme colors
- CSS animations for smooth performance
- Gradient colors from site theme
- Responsive breakpoints

Colors used:

- Primary: `#ff6b35`
- Gradient: `#ff014f` → `#ff6b9d` → `#ff6b35`

## Accessibility

- Proper semantic HTML structure
- ARIA labels for screen readers
- Reduced motion support via `prefers-reduced-motion`
- High contrast animations

## Browser Support

Works in all modern browsers that support:

- CSS Animations
- CSS Gradients
- CSS Custom Properties
- Flexbox

## Performance

- Pure CSS animations (GPU accelerated)
- No JavaScript animation loops
- Minimal DOM elements
- Optimized for 60fps

## Files

- Component: `components/LoadingIndicator.js`
- Styles: `styles/LoadingIndicator.css`

## Integration

This component has been integrated throughout the application:

- ✅ `/app/loading.js` - Global page transitions
- ✅ `/app/blogs/page.js` - Blog listing
- ✅ `/app/portfolio/page.js` - Portfolio listing
- ✅ `/app/templates/page.js` - Templates listing
- ✅ `/app/not-found.js` - 404 page suggestions

Feel free to use this component anywhere you need a loading indicator for consistency across the application!
