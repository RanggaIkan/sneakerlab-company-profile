# 🏗️ SneakerLab Architecture & File Structure

## Project Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         SNEAKERLAB APP                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    PRESENTATION LAYER                    │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │  │
│  │  │   Navbar    │  │    Footer    │  │   FAB Button    │ │  │
│  │  │ (Sticky)    │  │  (Responsive)│  │  (WhatsApp)     │ │  │
│  │  │             │  │              │  │                 │ │  │
│  │  │ ☰ Menu     │  │ 4 Columns    │  │  💬 Pulsing     │ │  │
│  │  │ 🔍 Search   │  │ Newsletter   │  │  📍 Bottom-Right│ │  │
│  │  │ ❤️ Wishlist │  │ Social Links │  │                 │ │  │
│  │  │ 🛒 Cart     │  │              │  │                 │ │  │
│  │  └─────────────┘  └──────────────┘  └──────────────────┘ │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                   MAIN CONTENT                      │  │  │
│  │  │  ┌──────────────┐  ┌────────────────────────────┐  │  │  │
│  │  │  │    Hero      │  │   Products Grid (Ready)   │  │  │  │
│  │  │  │   Section    │  │   (1→2→4 columns)         │  │  │  │
│  │  │  └──────────────┘  └────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   LOGIC LAYER                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │           STATE MANAGEMENT (AppState)           │   │  │
│  │  │  ┌─────────┐  ┌──────────┐  ┌─────────────────┐ │   │  │
│  │  │  │  Cart   │  │ Wishlist │  │  User Profile   │ │   │  │
│  │  │  │ {items} │  │  [ids]   │  │  (auth ready)   │ │   │  │
│  │  │  └─────────┘  └──────────┘  └─────────────────┘ │   │  │
│  │  │              ↓                                   │   │  │
│  │  │         localStorage                            │   │  │
│  │  │  (Persistence across sessions)                  │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │          CUSTOM EVENT SYSTEM                     │   │  │
│  │  │  'cartUpdated' → Badge counter updates          │   │  │
│  │  │  'wishlistUpdated' → Wishlist counter updates   │   │  │
│  │  │  'appReady' → Components initialized            │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 STYLING LAYER                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │       CSS CUSTOM PROPERTIES (Design Tokens)      │   │  │
│  │  │  ✓ Colors (6)     ✓ Spacing (8)                 │   │  │
│  │  │  ✓ Typography (9) ✓ Shadows (4)                 │   │  │
│  │  │  ✓ Radius (4)     ✓ Transitions (3)             │   │  │
│  │  │                                                  │   │  │
│  │  │  Responsive: 5 breakpoints (375-1280px)         │   │  │
│  │  │  Mobile-first approach                          │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 File Organization

```
ROOT DIRECTORY
│
├── 📄 HTML
│   └── index.html (70 lines)
│       ├── Meta tags (responsiveness, SEO, theme)
│       ├── Google Fonts import
│       ├── CSS link
│       ├── Semantic structure
│       │   ├── <nav id="navbar">       [PROMPT 2]
│       │   ├── <main id="main-content"> 
│       │   │   ├── <section id="hero">        [PROMPT 3]
│       │   │   └── <section id="products">    [PROMPT 3]
│       │   └── <footer id="footer">   [PROMPT 2]
│       └── Script references (script.js, components.js)
│
├── 🎨 CSS
│   └── style.css (975 lines)
│       ├── CSS CUSTOM PROPERTIES (:root)
│       │   ├── Colors (--color-*)
│       │   ├── Spacing (--space-*)
│       │   ├── Typography (--font-*)
│       │   ├── Radius (--radius-*)
│       │   ├── Shadows (--shadow-*)
│       │   └── Transitions (--transition-*)
│       │
│       ├── GLOBAL STYLES
│       │   ├── Reset (*, body, html)
│       │   ├── Typography defaults
│       │   └── Link/button normalization
│       │
│       ├── UTILITY CLASSES
│       │   ├── .flex, .flex-center, .flex-between
│       │   ├── .grid, .gap-*
│       │   ├── .hidden, .sr-only
│       │   └── .text-primary, .text-accent
│       │
│       ├── COMPONENT STYLES
│       │   ├── .btn (primary, secondary, icon)
│       │   ├── .card
│       │   ├── .badge
│       │   └── .input
│       │
│       ├── LAYOUT SECTIONS
│       │   ├── .container
│       │   ├── .hero-section
│       │   ├── .products-section
│       │   └── .products-grid
│       │
│       ├── NAVBAR COMPONENT (200+ lines)
│       │   ├── .navbar-wrapper (glassmorphism)
│       │   ├── .navbar-logo
│       │   ├── .nav-list, .nav-link
│       │   ├── .mobile-drawer
│       │   └── .search-modal
│       │
│       ├── FOOTER COMPONENT (180+ lines)
│       │   ├── .footer-wrapper
│       │   ├── .footer-grid
│       │   ├── .footer-col
│       │   ├── .newsletter-form
│       │   └── .footer-socials
│       │
│       ├── FAB COMPONENT (80+ lines)
│       │   ├── .fab-container
│       │   └── .fab (WhatsApp styling)
│       │
│       └── ANIMATIONS
│           ├── @keyframes pulse
│           ├── @keyframes slideInUp
│           └── @keyframes fadeIn
│
├── ⚙️ JAVASCRIPT CORE
│   ├── script.js (238 lines)
│   │   ├── STATE MANAGEMENT
│   │   │   └── AppState = {
│   │   │       ├── cart: { items: [], total: 0 }
│   │   │       ├── wishlist: []
│   │   │       ├── mobileMenuOpen: false
│   │   │       ├── searchOpen: false
│   │   │       └── user: null
│   │   │   }
│   │   │
│   │   ├── METHODS
│   │   │   ├── init() - Load from localStorage
│   │   │   ├── save() - Persist state
│   │   │   ├── addToCart()
│   │   │   ├── removeFromCart()
│   │   │   ├── toggleWishlist()
│   │   │   ├── notifyCartUpdate() - Custom event
│   │   │   └── notifyWishlistUpdate() - Custom event
│   │   │
│   │   └── UTILITIES
│   │       ├── query(selector) - Safe DOM query
│   │       ├── queryAll(selector) - Multiple elements
│   │       ├── on(el, event, handler) - Event binding
│   │       ├── formatCurrency(amount) - USD formatting
│   │       ├── debounce(func, delay) - Performance
│   │       └── showToast(msg, type, duration) - Notifications
│   │
│   └── components.js (423 lines)
│       ├── NAVBAR COMPONENT
│       │   ├── render() - HTML markup
│       │   ├── init() - Mount & listeners
│       │   └── updateBadges() - Update counters
│       │
│       ├── FOOTER COMPONENT
│       │   ├── render() - HTML markup
│       │   └── init() - Mount & form handler
│       │
│       ├── FAB COMPONENT
│       │   ├── render() - HTML markup
│       │   └── init() - Mount button
│       │
│       └── INITIALIZATION
│           ├── Listen for 'appReady' event
│           ├── NavbarComponent.init()
│           ├── FooterComponent.init()
│           └── FABComponent.init()
│
├── 📚 DOCUMENTATION
│   ├── README.md (378 lines)
│   │   ├── Project overview
│   │   ├── Design system tokens
│   │   ├── Customization guide
│   │   ├── Component examples
│   │   └── Future enhancements
│   │
│   ├── DEVELOPER_GUIDE.md (668 lines)
│   │   ├── Quick navigation
│   │   ├── Design tokens reference
│   │   ├── Component API
│   │   ├── State management
│   │   ├── Utility functions
│   │   ├── Adding features
│   │   ├── Common tasks
│   │   ├── Debugging tips
│   │   └── Best practices
│   │
│   ├── IMPLEMENTATION_SUMMARY.md (486 lines)
│   │   ├── PROMPT 1 breakdown
│   │   ├── PROMPT 2 breakdown
│   │   ├── Design system applied
│   │   ├── Component initialization flow
│   │   ├── Testing checklist
│   │   └── Code metrics
│   │
│   ├── QUICK_START.md (396 lines)
│   │   ├── Getting started (5 min)
│   │   ├── Testing interactions
│   │   ├── Customization quick tips
│   │   ├── File structure
│   │   ├── Troubleshooting
│   │   └── Common customizations
│   │
│   ├── CHECKLIST.md (427 lines)
│   │   ├── Project deliverables
│   │   ├── Design system verification
│   │   ├── Component functionality tests
│   │   ├── Quality checklist
│   │   ├── Deployment checklist
│   │   └── File statistics
│   │
│   ├── PROJECT_SUMMARY.txt (583 lines)
│   │   ├── Deliverables overview
│   │   ├── Technical specifications
│   │   ├── File structure
│   │   ├── Design highlights
│   │   ├── Key features
│   │   ├── Next steps
│   │   ├── Quality assurance
│   │   └── Success criteria
│   │
│   └── ARCHITECTURE.md (This file)
│       └── Visual diagrams & file structure
│
└── 🔧 SUPPORTING FILES (Pre-existing)
    ├── package.json
    ├── next.config.mjs
    ├── tsconfig.json
    └── postcss.config.mjs
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   USER INTERACTION                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Button  │  │   Link   │  │   Form   │  │  Search    │  │
│  │  Click   │  │  Hover   │  │  Submit  │  │  Input     │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
└───────┼─────────────┼─────────────┼──────────────┼──────────┘
        │             │             │              │
        └─────────────┴─────────────┴──────────────┘
                       ↓
        ┌──────────────────────────────────┐
        │   EVENT LISTENER (on function)   │
        │   - Captures user action         │
        │   - Extracts event data          │
        └────────────┬─────────────────────┘
                     ↓
        ┌──────────────────────────────────┐
        │    APP LOGIC (components.js)     │
        │  - Handle click/submit           │
        │  - Call AppState methods         │
        │  - Dispatch events               │
        └────────────┬─────────────────────┘
                     ↓
        ┌──────────────────────────────────┐
        │    STATE UPDATE (AppState)       │
        │  - Update cart/wishlist          │
        │  - Recalculate totals            │
        │  - Save to localStorage          │
        └────────────┬─────────────────────┘
                     ↓
        ┌──────────────────────────────────┐
        │   CUSTOM EVENT (cartUpdated)     │
        │   - Dispatch event with data     │
        │   - Notify subscribers           │
        └────────────┬─────────────────────┘
                     ↓
        ┌──────────────────────────────────┐
        │  COMPONENT UPDATES (navbar.js)   │
        │  - Listen for event              │
        │  - Update DOM (badges)           │
        │  - Apply CSS transitions         │
        └────────────┬─────────────────────┘
                     ↓
        ┌──────────────────────────────────┐
        │   UI RENDERS (style.css)         │
        │  - Smooth animations             │
        │  - Updated badges visible        │
        │  - User sees changes             │
        └──────────────────────────────────┘
```

---

## 🎯 Component Interaction Flow

```
┌────────────────────────────────────────────────────────────────┐
│                     PAGE LOAD SEQUENCE                        │
└────────────────────────────────────────────────────────────────┘

1. DOMContentLoaded Event
   ↓
2. script.js loads
   ├─ AppState.init() → Load from localStorage
   ├─ Dispatch 'appReady' event
   └─ Expose utilities globally
   ↓
3. components.js loads
   ├─ Listen for 'appReady'
   ├─ NavbarComponent.init()
   │  ├─ Render navbar HTML
   │  ├─ Attach click listeners
   │  └─ Set up badge updaters
   ├─ FooterComponent.init()
   │  ├─ Render footer HTML
   │  └─ Attach form listener
   ├─ FABComponent.init()
   │  ├─ Render FAB button
   │  └─ Open WhatsApp on click
   ↓
4. All components mounted & interactive ✓
   ↓
5. Listen for state changes
   ├─ 'cartUpdated' → Update cart badge
   └─ 'wishlistUpdated' → Update wishlist badge
```

---

## 📊 State Management Flow

```
ADD TO CART EXAMPLE:

1. User clicks "Add to Cart" button
   ↓
2. Event handler calls:
   AppState.addToCart({
     id: '001',
     name: 'Air Jordan 1',
     price: 180,
     quantity: 1
   })
   ↓
3. AppState method runs:
   ├─ Check if item exists
   ├─ Add/update item in cart array
   ├─ Call updateCartTotal()
   ├─ Call save() → localStorage
   └─ Call notifyCartUpdate()
   ↓
4. Custom event dispatched:
   document.dispatchEvent(
     new CustomEvent('cartUpdated', {
       detail: AppState.cart
     })
   )
   ↓
5. NavbarComponent listens & updates:
   ├─ Calculate total items
   ├─ Update badge text
   ├─ Apply CSS animation
   ├─ Show toast notification
   └─ UI reflects change immediately ✓
   ↓
6. State persisted to localStorage
   → Survives page refresh ✓
```

---

## 🎨 CSS Architecture

```
┌───────────────────────────────────────────┐
│        CSS CUSTOM PROPERTIES (:root)      │
├───────────────────────────────────────────┤
│                                           │
│  COLOR TOKENS                             │
│  ├─ --color-bg-primary      #0b0b0e      │
│  ├─ --color-bg-card         #16161c      │
│  ├─ --color-accent-primary  #ff5500      │
│  ├─ --color-accent-success  #00e676      │
│  ├─ --color-text-primary    #ffffff      │
│  ├─ --color-text-secondary  #8e8e93      │
│  └─ --color-border          rgba(...)    │
│                                           │
│  SPACING TOKENS (8px base)                │
│  ├─ --space-xs through --space-4xl        │
│  └─ Usage: padding, margin, gap           │
│                                           │
│  TYPOGRAPHY TOKENS                        │
│  ├─ --font-family                         │
│  ├─ --font-weight-* (400-800)             │
│  ├─ --font-size-* (12px-48px)             │
│  └─ --line-height-* (1.2-1.75)            │
│                                           │
│  BORDER RADIUS TOKENS                     │
│  ├─ --radius-sm (6px) to --radius-2xl     │
│  └─ Usage: border-radius                  │
│                                           │
│  SHADOW TOKENS                            │
│  ├─ --shadow-sm to --shadow-xl            │
│  └─ Usage: box-shadow, elevation          │
│                                           │
│  TRANSITION TOKENS                        │
│  ├─ --transition-fast (150ms)             │
│  ├─ --transition-base (200ms)             │
│  └─ --transition-slow (300ms)             │
│                                           │
└───────────────────────────────────────────┘
         ↓ Uses
┌───────────────────────────────────────────┐
│      COMPONENT STYLES (50+ classes)       │
├───────────────────────────────────────────┤
│                                           │
│  BUTTONS                                  │
│  ├─ .btn (base)                           │
│  ├─ .btn-primary (orange)                 │
│  ├─ .btn-secondary (outline)              │
│  └─ .btn-icon (circular)                  │
│                                           │
│  CARDS                                    │
│  ├─ .card (dark background)               │
│  └─ Hover: elevation + transform           │
│                                           │
│  BADGES                                   │
│  ├─ .badge (orange)                       │
│  └─ .badge-success (green)                │
│                                           │
│  INPUTS                                   │
│  ├─ .input (form field)                   │
│  └─ :focus (accent border + ring)         │
│                                           │
│  UTILITY CLASSES                          │
│  ├─ .flex, .flex-center, .flex-between    │
│  ├─ .grid, .gap-*                         │
│  ├─ .text-primary, .text-secondary        │
│  └─ .hidden, .sr-only                     │
│                                           │
└───────────────────────────────────────────┘
         ↓ Inherited by
┌───────────────────────────────────────────┐
│     SPECIFIC COMPONENTS (Navbar, etc)     │
├───────────────────────────────────────────┤
│                                           │
│  NAVBAR (400+ lines)                      │
│  ├─ .navbar-wrapper (sticky + blur)       │
│  ├─ .navbar-logo (brand badge)            │
│  ├─ .nav-link (animated underline)        │
│  ├─ .mobile-drawer (slide transition)     │
│  └─ .search-modal (overlay + animation)   │
│                                           │
│  FOOTER (300+ lines)                      │
│  ├─ .footer-grid (responsive)             │
│  ├─ .footer-link (animated border)        │
│  ├─ .newsletter-form (responsive)         │
│  └─ .footer-social-link (hover effect)    │
│                                           │
│  FAB (100+ lines)                         │
│  ├─ .fab-container (fixed positioning)    │
│  └─ .fab (WhatsApp green + pulse)         │
│                                           │
└───────────────────────────────────────────┘
         ↓ Results in
┌───────────────────────────────────────────┐
│      CONSISTENT VISUAL LANGUAGE           │
│                                           │
│  ✓ Single source of truth (CSS vars)      │
│  ✓ Easy to theme/customize                │
│  ✓ Maintainable & scalable                │
│  ✓ Performance optimized                  │
│  ✓ Responsive at all breakpoints          │
│                                           │
└───────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoint Strategy

```
┌────────────────────────────────────────────────┐
│      MOBILE-FIRST RESPONSIVE DESIGN           │
└────────────────────────────────────────────────┘

DEFAULT (Mobile): 375px+
├─ 1 column layouts
├─ Hamburger menu (navbar)
├─ Stacked footer (1 column)
├─ FAB: 48px size
├─ Minimal spacing
└─ Touch-optimized

    ↓

SM BREAKPOINT: 640px+
├─ Start 2 column layouts
├─ Slightly larger spacing
├─ Footer: 2 columns
└─ Better readability

    ↓

MD BREAKPOINT: 768px+
├─ Desktop nav appears
├─ Hamburger hides
├─ Tab optimized
├─ Footer: 2 columns
└─ Modal/drawer sizing

    ↓

LG BREAKPOINT: 1024px+
├─ Full 4 column layouts
├─ Enhanced spacing
├─ Footer: 4 columns
├─ Products: 4 columns
└─ Desktop experience

    ↓

XL BREAKPOINT: 1280px+
├─ Max container width
├─ Full desktop features
├─ Generous spacing
└─ Large screen optimized
```

---

## 🔌 Integration Points (Ready for PROMPT 3+)

```
CURRENT STATE (PROMPT 1 & 2):
┌──────────────────────────────────────┐
│  ✓ Navbar with state integration     │
│  ✓ Footer with newsletter            │
│  ✓ FAB with WhatsApp link            │
│  ✓ Complete design system            │
│  ✓ State management setup            │
└──────────────────────────────────────┘
         ↓
NEXT PHASE (PROMPT 3):
┌──────────────────────────────────────┐
│  Hero Section                        │
│  ├─ Hero banner component            │
│  ├─ CTA buttons                      │
│  └─ Gradient background              │
│                                      │
│  Product Cards                       │
│  ├─ Card component                   │
│  ├─ Product image slot               │
│  ├─ Price display                    │
│  ├─ Rating system                    │
│  └─ Add to cart button               │
│                                      │
│  Products Grid                       │
│  ├─ Grid layout (1→2→4 cols)         │
│  ├─ Dynamic product feed             │
│  └─ Responsive spacing               │
└──────────────────────────────────────┘
         ↓
PHASE 2 (PROMPT 4):
┌──────────────────────────────────────┐
│  Shopping Cart                       │
│  ├─ Cart modal/drawer                │
│  ├─ Cart item list                   │
│  ├─ Quantity controls                │
│  ├─ Remove button                    │
│  └─ Order summary                    │
│                                      │
│  Checkout                            │
│  ├─ Form fields                      │
│  ├─ Payment integration              │
│  └─ Order confirmation               │
└──────────────────────────────────────┘
```

---

## 🎯 Success Criteria Verification

```
✅ PROMPT 1: Project Setup & Design Tokens
   ├─ [✓] File structure created
   ├─ [✓] Design tokens (20+) defined
   ├─ [✓] Base styles applied
   ├─ [✓] Responsive setup (375px baseline)
   └─ [✓] Core functionality ready

✅ PROMPT 2: Navbar, Footer & FAB
   ├─ [✓] Glassmorphism navbar (sticky + blur)
   ├─ [✓] Brand logo with badge
   ├─ [✓] Desktop navigation (5 links)
   ├─ [✓] Mobile hamburger menu
   ├─ [✓] Search modal functionality
   ├─ [✓] Badge counters (cart + wishlist)
   ├─ [✓] 4-column responsive footer
   ├─ [✓] Newsletter subscription form
   ├─ [✓] Social media links
   ├─ [✓] WhatsApp FAB (bottom-right)
   ├─ [✓] Pulse animation on FAB
   ├─ [✓] Smooth transitions everywhere
   ├─ [✓] Mobile responsiveness
   ├─ [✓] Accessibility compliance
   └─ [✓] Complete documentation

📦 READY FOR: PROMPT 3 (Hero & Products) 🚀
```

---

**SneakerLab Architecture** | Built for scalability & maintainability 🔥
