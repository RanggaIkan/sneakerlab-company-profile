# 👨‍💻 SneakerLab - Developer Reference Guide

Quick reference for developers working on the SneakerLab sneaker store.

---

## 📚 Quick Navigation

- [Project Structure](#project-structure)
- [Design Tokens](#design-tokens)
- [Component API](#component-api)
- [State Management](#state-management)
- [Adding Features](#adding-features)
- [Common Tasks](#common-tasks)
- [Debugging](#debugging)

---

## 📁 Project Structure

```
index.html              Main entry point, semantic structure
style.css             All CSS + design tokens (975 lines)
script.js             State management + utilities (238 lines)
components.js         UI components (423 lines)
README.md            Full project documentation
IMPLEMENTATION_SUMMARY.md  What was built in PROMPT 1 & 2
DEVELOPER_GUIDE.md    This file
```

---

## 🎨 Design Tokens

### Accessing Design Tokens in CSS

All design tokens are CSS custom properties defined in `:root`:

```css
/* Use in your styles */
color: var(--color-text-primary);
padding: var(--space-lg);
background: var(--color-bg-card);
border-radius: var(--radius-md);
transition: all var(--transition-base);
```

### Color Tokens

```css
--color-bg-primary:      #0b0b0e   /* Main background */
--color-bg-card:         #16161c   /* Card/elevated background */
--color-accent-primary:  #ff5500   /* Orange - CTA/hover */
--color-accent-success:  #00e676   /* Green - success states */
--color-text-primary:    #ffffff   /* Primary text */
--color-text-secondary:  #8e8e93   /* Secondary text */
--color-border:          rgba(255, 255, 255, 0.08)
--color-border-hover:    rgba(255, 255, 255, 0.12)
```

### Spacing Scale (8px base)

```css
--space-xs:   0.25rem (4px)     --space-md:   1rem (16px)
--space-sm:   0.5rem (8px)      --space-lg:   1.5rem (24px)
--space-xl:   2rem (32px)       --space-2xl:  2.5rem (40px)
--space-3xl:  3rem (48px)       --space-4xl:  4rem (64px)
```

### Font Sizes

```css
--font-size-xs:  0.75rem (12px)
--font-size-sm:  0.875rem (14px)
--font-base:     1rem (16px)
--font-size-lg:  1.125rem (18px)
--font-size-xl:  1.25rem (20px)
--font-size-2xl: 1.5rem (24px)
--font-size-3xl: 1.875rem (30px)
--font-size-4xl: 2.25rem (36px)
--font-size-5xl: 3rem (48px)
```

### Border Radius

```css
--radius-sm:   0.375rem (6px)
--radius-md:   0.5rem (8px)
--radius-lg:   0.75rem (12px)
--radius-xl:   1rem (16px)
--radius-2xl:  1.25rem (20px)
```

### Transitions

```css
--transition-fast:  150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base:  200ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow:  300ms cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🧩 Component API

### NavbarComponent

**Render**
```javascript
NavbarComponent.render() // Returns HTML string
```

**Initialize**
```javascript
NavbarComponent.init() // Mounts navbar and attaches listeners
```

**Methods**
```javascript
NavbarComponent.updateBadges() // Updates cart & wishlist counters
```

**DOM Elements Created**
- `#navbar` - Main container
- `#mobile-drawer` - Mobile menu
- `#search-modal` - Search dialog
- `#search-input` - Search field
- `#cart-badge` - Cart counter
- `#wishlist-badge` - Wishlist counter

---

### FooterComponent

**Render**
```javascript
FooterComponent.render() // Returns HTML string
```

**Initialize**
```javascript
FooterComponent.init() // Mounts footer and sets up forms
```

**DOM Elements Created**
- `#footer` - Main container
- `#newsletter-form` - Newsletter form

**Events**
- Form submit: Validates email, shows toast notification

---

### FABComponent

**Render**
```javascript
FABComponent.render() // Returns HTML string
```

**Initialize**
```javascript
FABComponent.init() // Mounts FAB button
```

**DOM Elements Created**
- `#fab-container` - FAB wrapper
- `#fab-whatsapp` - WhatsApp link

**Customization**
```javascript
// Update WhatsApp link in components.js:
href="https://wa.me/YOUR_PHONE?text=YOUR_MESSAGE"
```

---

## 🔄 State Management

### AppState Object

Located in `script.js`, manages all application state:

```javascript
AppState = {
  cart: { items: [], total: 0 },
  wishlist: [],
  mobileMenuOpen: false,
  searchOpen: false,
  user: null
}
```

### Core Methods

**Initialize State**
```javascript
AppState.init() // Load from localStorage
```

**Save State**
```javascript
AppState.save() // Persist to localStorage
```

**Cart Operations**
```javascript
AppState.addToCart(item)        // item = { id, price, quantity: 1 }
AppState.removeFromCart(itemId)
AppState.updateCartTotal()
```

**Wishlist Operations**
```javascript
AppState.toggleWishlist(itemId) // Add or remove from wishlist
```

**Notifications**
```javascript
AppState.notifyCartUpdate()      // Dispatch cartUpdated event
AppState.notifyWishlistUpdate()  // Dispatch wishlistUpdated event
```

### Custom Events

Listen for state changes in your components:

```javascript
// Listen for cart updates
document.addEventListener('cartUpdated', (event) => {
  console.log('Cart updated:', event.detail); // Contains AppState.cart
});

// Listen for wishlist updates
document.addEventListener('wishlistUpdated', (event) => {
  console.log('Wishlist updated:', event.detail); // Contains AppState.wishlist
});

// Listen for app ready
document.addEventListener('appReady', (event) => {
  const { AppState, query, showToast } = event.detail;
  // Use these utilities...
});
```

---

## 🛠️ Utility Functions

All utilities are exposed globally and in `event.detail` on 'appReady':

### DOM Querying

```javascript
// Safe querySelector (handles errors)
const element = query('#selector');
const element = query('.class', context); // Context optional

// Get multiple elements
const elements = queryAll('.item'); // Returns array
const elements = queryAll('.item', context);
```

### Event Binding

```javascript
on(element, 'click', (e) => {
  console.log('clicked');
});
```

### Formatting

```javascript
formatCurrency(49.99) // Returns "$49.99" (USD)
```

### Performance

```javascript
const debouncedFunction = debounce((value) => {
  // This fires after 300ms of inactivity
}, 300);

// Call many times, function executes once
input.addEventListener('input', () => {
  debouncedFunction(input.value);
});
```

### Notifications

```javascript
// Info toast (default)
showToast('Message'); // 3s duration

// Success toast
showToast('Great!', 'success', 2000);

// Custom styling via type parameter
// 'success' = green, anything else = orange
```

---

## ➕ Adding Features

### Add a Navigation Link

**File: components.js**

In `NavbarComponent.render()`, add to `nav-list`:

```html
<li><a href="/products" class="nav-link">Products</a></li>
```

### Add to Cart

**Example Code:**

```javascript
// Listen for click
const addBtn = query('#add-to-cart');
on(addBtn, 'click', () => {
  AppState.addToCart({
    id: 'sneaker-001',
    name: 'Air Jordan 1',
    price: 180,
    quantity: 1
  });
  
  showToast('Added to cart!', 'success');
});
```

### Add Wishlist Toggle

**Example Code:**

```javascript
const wishlistBtn = query('#wishlist-btn');
on(wishlistBtn, 'click', () => {
  AppState.toggleWishlist('product-id');
  showToast('Added to wishlist!', 'success');
});

// Listen for updates
document.addEventListener('wishlistUpdated', (event) => {
  const isWishlisted = event.detail.includes('product-id');
  wishlistBtn.classList.toggle('active', isWishlisted);
});
```

### Add New Button Style

**File: style.css**

```css
/* Add new button variant */
.btn-tertiary {
  background-color: transparent;
  border: 2px solid var(--color-accent-primary);
  color: var(--color-accent-primary);
}

.btn-tertiary:hover {
  background-color: rgba(255, 85, 0, 0.1);
}
```

### Add New Section

**HTML:**

```html
<section id="featured" class="featured-section" role="region">
  <div class="container">
    <h2 class="section-title">Featured</h2>
    <div class="featured-grid">
      <!-- Content here -->
    </div>
  </div>
</section>
```

**CSS:**

```css
.featured-section {
  padding: var(--space-3xl) 0;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}
```

### Change Colors

**File: style.css**

```css
:root {
  --color-accent-primary: #your-color; /* Change orange */
  --color-bg-primary: #your-bg;        /* Change dark bg */
  /* etc... */
}
```

All components automatically update!

---

## 📋 Common Tasks

### Update Cart Badge

```javascript
// Automatically updates when AppState.cart changes
// NavbarComponent listens for 'cartUpdated' event

// Manually trigger update:
NavbarComponent.updateBadges();
```

### Open/Close Mobile Menu

```javascript
const drawer = query('#mobile-drawer');
drawer.classList.remove('hidden'); // Open
drawer.classList.add('hidden');    // Close
```

### Open/Close Search Modal

```javascript
const modal = query('#search-modal');
modal.classList.remove('hidden'); // Open
modal.classList.add('hidden');    // Close
```

### Create Toast Notification

```javascript
// Information (orange)
showToast('Processing your order...');

// Success (green)
showToast('Order placed successfully!', 'success');

// Custom duration
showToast('Saved!', 'success', 2000); // 2 seconds
```

### Add Hover Effects

```css
/* Use transitions for smooth effects */
.card {
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Format Prices

```javascript
const price = 99.99;
const formatted = formatCurrency(price); // "$99.99"
```

---

## 🐛 Debugging

### Check App State

```javascript
// In browser console
window.__SneakerLab.AppState

// Check cart
window.__SneakerLab.AppState.cart

// Check wishlist
window.__SneakerLab.AppState.wishlist
```

### Query DOM Elements

```javascript
// In console
window.query('#navbar')
window.query('.card')
window.queryAll('.product')
```

### Test Utilities

```javascript
// Format currency
window.formatCurrency(150)

// Show toast
window.showToast('Test message', 'success')
```

### View Computed Styles

```javascript
// In DevTools
1. Right-click element
2. Select "Inspect"
3. View "Computed" tab
4. Look for CSS custom properties (--color-*, --space-*, etc)
```

### Monitor Events

```javascript
// Log state updates
document.addEventListener('cartUpdated', (e) => {
  console.log('Cart updated:', e.detail);
});

document.addEventListener('wishlistUpdated', (e) => {
  console.log('Wishlist updated:', e.detail);
});
```

### Browser DevTools Tips

**Check Mobile Responsive:**
- Device Emulation: Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac)
- Set viewport to 375px width for mobile baseline
- Test at 768px (tablet) and 1280px (desktop)

**Performance:**
- Lighthouse: Ctrl+Shift+I → Lighthouse tab
- Performance: Ctrl+Shift+I → Performance tab

**Accessibility:**
- DevTools: Ctrl+Shift+I → Accessibility tree
- Color contrast checker: DevTools → Elements → Computed styles

---

## 🔌 Integration Points

### Ready to Add:

**PROMPT 3: Hero & Products**
- Hero banner component
- Product card components
- Product image gallery
- Rating system

**PROMPT 4: Shopping Cart**
- Cart modal/drawer
- Quantity controls
- Remove item button
- Order summary & checkout

**PROMPT 5: Product Details**
- Product detail page
- Image gallery
- Size/color selector
- "Add to cart" functionality

**PROMPT 6: User Features**
- Login/signup forms
- User profile page
- Order history
- Address management

---

## 📞 Getting Help

### Console Errors?

1. Check browser console (F12 → Console tab)
2. Look for error messages
3. Check file paths in script tags
4. Verify CSS syntax in style.css

### Style Not Applying?

1. Check CSS selector specificity
2. Use `!important` sparingly (debug only)
3. Verify class names match HTML
4. Check media queries at different widths
5. Clear browser cache (Ctrl+Shift+Del)

### State Not Updating?

1. Check AppState.init() was called
2. Verify custom events are dispatched
3. Check event listeners are attached
4. Monitor console for errors
5. Use `window.__SneakerLab` to inspect state

### Responsive Issues?

1. Test at exact breakpoint widths (375, 640, 768, 1024, 1280)
2. Check media queries in CSS
3. Verify container max-width settings
4. Test touch interactions on mobile
5. Check font scaling at different sizes

---

## ✅ Best Practices

### Do's ✅

- Use CSS custom properties for colors/spacing
- Leverage utility classes (.flex, .gap-*, .text-*)
- Use semantic HTML tags (nav, main, footer, section)
- Add ARIA labels to interactive elements
- Test on mobile devices/emulation
- Use transition-base for smooth effects
- Keep components modular & reusable
- Use custom events for component communication

### Don'ts ❌

- Don't use hardcoded colors (#123456)
- Don't use px values for spacing (use var(--space-*))
- Don't add margins/padding inside flex containers (use gap)
- Don't forget media queries for responsive design
- Don't omit accessibility attributes
- Don't use slow transitions (>400ms)
- Don't create massive CSS files (modularize)
- Don't use !important for production code

---

## 🎓 Learning Resources

- **MDN Web Docs**: https://developer.mozilla.org/
- **CSS Tricks**: https://css-tricks.com/
- **Web.dev**: https://web.dev/
- **A11y Project**: https://www.a11yproject.com/
- **Google Fonts**: https://fonts.google.com/

---

## 🚀 Next Steps

1. Review IMPLEMENTATION_SUMMARY.md for full breakdown
2. Open DevTools (F12) and inspect the components
3. Test responsive behavior at different widths
4. Experiment with modifying colors in CSS
5. Add new navigation links to the navbar
6. Create your own custom components following the pattern

---

**SneakerLab Developer Guide** | Built for developers who care about quality code 🔥
