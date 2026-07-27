# 🔥 SneakerLab - Premium Sneaker Store

A modern, portfolio-grade **Nike SNKRS-style sneaker store** built with vanilla HTML, CSS, and JavaScript. This project demonstrates professional front-end development practices with a focus on design systems, responsive design, and user experience.

---

## 📋 Project Overview

### What's Included

**PROMPT 1: Project Setup & Design Tokens** ✅
- Clean semantic HTML structure
- Comprehensive CSS design system with CSS custom properties
- Mobile-first responsive approach (375px baseline)
- Professional typography system using **Plus Jakarta Sans**
- Base component styles and utility classes
- Core JavaScript state management

**PROMPT 2: Navbar, Footer & FAB** ✅
- **Glassmorphism Sticky Navbar**
  - Brand logo badge "KICKS"
  - Desktop navigation with smooth underline hover effects
  - Mobile hamburger menu with slide-over drawer
  - Search toggle modal
  - Wishlist & Cart badge counters
  - Responsive design

- **E-Commerce Footer**
  - 4-column responsive grid (stacks on mobile)
  - Brand story section
  - Quick links
  - Customer care resources
  - Newsletter subscription form
  - Social media links
  - Copyright info

- **Floating Action Button (FAB)**
  - WhatsApp integration at `bottom-6 right-6`
  - Pulse animation effect
  - Responsive sizing
  - Direct WhatsApp chat link

---

## 🎨 Design System

### Color Palette

```css
--color-bg-primary:      #0b0b0e    /* Deep Charcoal/Black */
--color-bg-card:         #16161c    /* Dark Slate */
--color-accent-primary:  #ff5500    /* Vibrant Flame Orange */
--color-accent-success:  #00e676    /* Electric Green */
--color-text-primary:    #ffffff    /* White */
--color-text-secondary:  #8e8e93    /* Gray */
--color-border:          rgba(255, 255, 255, 0.08)
```

### Typography

- **Font Family**: Plus Jakarta Sans (Google Fonts)
- **Font Weights**: 400, 500, 600, 700, 800
- **Scale**: From 12px (xs) to 48px (5xl) with proper line heights

### Spacing System (8px base)

```
xs: 4px   | sm: 8px   | md: 16px  | lg: 24px
xl: 32px  | 2xl: 40px | 3xl: 48px | 4xl: 64px
```

### Responsiveness

- **Mobile-first approach**
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl), 1536px (2xl)
- **Grid System**: 1→2→4 columns based on viewport width

---

## 📁 Project Structure

```
sneaker-store/
├── index.html              # Main HTML entry point
├── style.css              # All styles + design tokens
├── script.js              # Core app state & utilities
├── components.js          # Navbar, Footer, FAB components
└── README.md             # This file
```

### File Breakdown

**index.html**
- Semantic HTML5 structure
- Meta tags for responsiveness & SEO
- Google Fonts integration
- Main container with sections for hero, products, navbar, footer
- Script references

**style.css** (512+ lines)
- CSS custom properties (design tokens)
- Global base styles
- Typography utilities
- Flexbox & grid utilities
- Component styles (buttons, cards, badges, inputs)
- Layout section styles
- Navbar, Footer, and FAB component styles
- Responsive design patterns
- Animations (pulse, slideInUp, fadeIn)

**script.js** (238+ lines)
- `AppState` object for cart, wishlist, user state
- State persistence to localStorage
- Utility functions (query, queryAll, on, formatCurrency, debounce)
- Toast notifications
- Custom events for state updates

**components.js** (423+ lines)
- `NavbarComponent`: Renders sticky navbar with glassmorphism effect
- `FooterComponent`: Renders 4-column footer with newsletter
- `FABComponent`: Renders WhatsApp floating action button
- Component initialization & event handlers

---

## 🚀 Quick Start

1. **Open the project:**
   ```bash
   # Start a local server
   npx http-server . -p 8080
   # Or use Python
   python3 -m http.server 8080
   ```

2. **Navigate to:**
   ```
   http://localhost:8080
   ```

3. **View the live preview** in v0 or your browser

---

## 🎯 Key Features

### 1. **Glassmorphism Navbar**
- Sticky positioning with backdrop blur
- Smooth navigation underline animations
- Mobile hamburger menu with slide-over drawer
- Search modal with smooth interactions
- Wishlist & Cart badge counters
- Brand logo with accent badge

### 2. **Responsive Grid**
- Footer adapts from 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Products grid scalable (1 → 2 → 4 columns)
- Mobile-optimized spacing and typography

### 3. **State Management**
- Cart & wishlist state stored in localStorage
- Custom events for component communication
- Global utilities exposed for debugging

### 4. **Micro-interactions**
- Smooth transitions on buttons, links, cards
- Hover effects with elevation changes
- Pulse animation on FAB
- Search modal slide-in animation
- Smooth scroll behavior

### 5. **Accessibility**
- Semantic HTML (nav, main, footer, section)
- ARIA labels and roles
- Screen reader only text
- Keyboard navigation support
- Focus states on interactive elements

---

## 🔧 Customization Guide

### Change Brand Colors

Edit the CSS custom properties in `style.css`:

```css
:root {
  --color-accent-primary: #your-color;
  --color-bg-primary: #your-bg-color;
  /* etc */
}
```

### Change Font

Import a different Google Font in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

Then update `style.css`:

```css
--font-family: 'YourFont', -apple-system, BlinkMacSystemFont, ...;
```

### Add Navigation Links

Edit `components.js` in `NavbarComponent.render()`:

```jsx
<li><a href="#" class="nav-link">Your Link</a></li>
```

### Customize WhatsApp Link

In `FABComponent.render()`, update the `href`:

```jsx
href="https://wa.me/YOUR_NUMBER?text=YOUR_MESSAGE"
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile (375px+) - default */
/* Tablet (640px+) */
@media (min-width: 640px) { }

/* Tablet (768px+) */
@media (min-width: 768px) { }

/* Desktop (1024px+) */
@media (min-width: 1024px) { }

/* Large Desktop (1280px+) */
@media (min-width: 1280px) { }
```

---

## 🎨 Component Examples

### Button Styles

```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-icon">Icon Button</button>
```

### Cards & Badges

```html
<div class="card">Card content</div>
<span class="badge">99</span>
<span class="badge badge-success">Success</span>
```

### Layout Utilities

```html
<div class="flex flex-between">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="grid gap-lg">
  <!-- Grid content -->
</div>
```

---

## 🧪 Testing

### Browser DevTools

Open Developer Tools and:
1. Test responsive design with device emulation
2. Check console for state logs (window.__SneakerLab)
3. Inspect computed styles for design tokens
4. Test keyboard navigation

### Mobile Testing

- Use Chrome DevTools device emulation
- Test at 375px width (iPhone SE baseline)
- Verify touch interactions on mobile

---

## 📊 Performance Tips

1. **CSS Custom Properties**: Cached by the browser, performant for theming
2. **Debounced Events**: Used for resize/scroll listeners
3. **LocalStorage**: Minimal impact for state persistence
4. **Lazy Loading**: Ready for product images (to be added)
5. **Smooth Scrolling**: Native CSS, no JavaScript overhead

---

## 🔐 Accessibility Checklist

- ✅ Semantic HTML structure (nav, main, footer)
- ✅ ARIA labels on buttons & forms
- ✅ Color contrast (WCAG AA compliant)
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Screen reader text (sr-only class)
- ✅ Form labels & placeholders
- ✅ Alt text support ready (for images)

---

## 📝 Next Steps (Future Enhancements)

### PROMPT 3: Hero Section & Product Cards
- Dynamic hero banner with gradient effects
- Product card components with images
- Rating & review system
- Add to cart interactions

### PROMPT 4: Shopping Cart & Checkout
- Cart modal/drawer
- Quantity controls
- Price calculations
- Checkout form

### PROMPT 5: Product Details & Search
- Product detail page
- Image gallery
- Size/color selection
- Search functionality

### PROMPT 6: User Authentication
- Login/signup forms
- User profile
- Order history
- Saved addresses

---

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [A11y Project](https://www.a11yproject.com/)
- [Google Fonts](https://fonts.google.com/)

---

## 📄 License

This project is open-source and available for personal and commercial use.

---

## 👨‍💻 Built By

**Expert Senior Front-End Developer** | Portfolio-Grade Project

---

## 🤝 Contributing

Feel free to fork, modify, and enhance this project. Submit pull requests for improvements!

---

**SneakerLab** - *Curated Streetwear Culture* 🔥👟

Built for Sneakerheads, by developers who care about code quality.
