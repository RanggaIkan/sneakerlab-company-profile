# 🚀 Quick Start Guide - SneakerLab

Get up and running in **5 minutes**.

---

## 1️⃣ Open in Browser

```bash
# Option A: Use Python (built-in)
python3 -m http.server 8000

# Option B: Use Node.js
npx http-server . -p 8080

# Option C: Open directly
# Double-click index.html (limited functionality)
```

Navigate to: **http://localhost:8000** (or your port)

---

## 2️⃣ See What's There

### Navbar
- 🏷️ **KICKS** logo badge (top-left)
- 📱 Hamburger menu (mobile)
- 🔍 Search button
- ❤️ Wishlist counter
- 🛒 Cart counter
- **Desktop nav links**: Home, Shop, Categories, Special Drop, About Us

### Footer
- 📖 Brand story (left column)
- 🔗 Quick links (middle columns)
- 📧 Newsletter signup (right column)
- 📱 Social media links

### FAB
- 💬 **WhatsApp button** (bottom-right)
- ✨ Pulsing animation
- 📱 Updates for mobile

---

## 3️⃣ Test Responsiveness

**Open DevTools**: `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Shift+I` (Mac)

**Mobile View**: `Ctrl+Shift+M` (Windows) or `Cmd+Shift+M` (Mac)

**Test Widths**:
- 375px (iPhone SE) - Mobile
- 640px (iPad Mini) - Tablet
- 768px (iPad) - Tablet Large
- 1024px (Desktop) - Desktop
- 1280px (Large Screen) - Large Desktop

**What To Check**:
- ✅ Navbar hamburger shows on mobile
- ✅ Footer stacks correctly
- ✅ FAB repositions on mobile
- ✅ No horizontal scrolling
- ✅ All text readable

---

## 4️⃣ Test Interactions

### Navbar
- Click ☰ hamburger (mobile only)
- Click 🔍 search button → modal opens
- Press `ESC` → search closes
- Click X button → search closes

### Footer
- Click newsletter email field
- Type your email
- Click "JOIN"
- See ✨ success toast notification

### FAB
- Hover over button → scales up
- Press button → scales down (feedback)
- Click → opens WhatsApp in new tab

---

## 5️⃣ Inspect & Customize

### Open DevTools Console

```javascript
// Check app state
window.__SneakerLab.AppState

// Get cart items
window.__SneakerLab.AppState.cart.items

// Get wishlist
window.__SneakerLab.AppState.wishlist

// Test utilities
window.showToast('Hello!', 'success')
```

### Change Colors

**File**: `style.css`

Find:
```css
:root {
  --color-accent-primary: #ff5500;
}
```

Change to your color, save, refresh browser.

### Add Navigation Link

**File**: `components.js`

Find section with nav links (around line 40):
```html
<li><a href="#" class="nav-link">About Us</a></li>
```

Add below it:
```html
<li><a href="#" class="nav-link">Your New Link</a></li>
```

Refresh browser.

---

## 🎨 Design Quick Reference

### Colors (All in style.css)
```
Dark Background:    #0b0b0e
Card Background:    #16161c
Orange (CTA):       #ff5500
Green (Success):    #00e676
Text:               #ffffff
Secondary Text:     #8e8e93
```

### Spacing (8px base)
```
--space-sm:  8px
--space-md:  16px
--space-lg:  24px
--space-xl:  32px
```

### Font Sizes
```
12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px
```

---

## 📁 File Structure

```
index.html              ← Open this in browser
style.css             ← All styling + design tokens
script.js             ← State management
components.js         ← Navbar, Footer, FAB
README.md            ← Full documentation
DEVELOPER_GUIDE.md   ← For developers
QUICK_START.md       ← This file
```

---

## 🐛 Troubleshooting

### Page looks wrong?
- **Clear cache**: `Ctrl+Shift+Del` (Windows) or `Cmd+Shift+Delete` (Mac)
- **Hard refresh**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Navigation not showing?
- Check your browser width (should show nav at 768px+)
- Resize window wider
- Check DevTools → hamburger menu vs desktop nav

### Colors look different?
- Could be browser dark mode override
- Check DevTools → Elements → Computed styles
- Verify CSS file is loading (Network tab)

### Nothing showing?
- Open DevTools → Console (F12 key)
- Look for red errors
- Check if file paths are correct
- Try opening file from `file://` protocol

### Buttons not responding?
- Check JavaScript is enabled (DevTools → Sources)
- Look for console errors
- Verify event listeners attached

---

## 💡 What To Try Next

### Add a Product
```javascript
// In console:
window.__SneakerLab.AppState.addToCart({
  id: '001',
  name: 'Air Jordan 1',
  price: 180,
  quantity: 1
})
```
Check cart badge - it updates! ✨

### Toggle Wishlist
```javascript
// In console:
window.__SneakerLab.AppState.toggleWishlist('001')
```
Check wishlist badge! ❤️

### Show Toast
```javascript
// In console:
window.showToast('Custom message!', 'success')
```
See notification appear! 📢

---

## 🎓 Understanding the Code

### Three Main Parts:

1. **HTML (index.html)** 
   - Page structure
   - Semantic tags (nav, main, footer)
   - Placeholders for content

2. **CSS (style.css)**
   - All styling
   - Design tokens (colors, spacing)
   - Responsive rules

3. **JavaScript (script.js + components.js)**
   - State management (cart, wishlist)
   - Component rendering
   - Event handling

### How It Works:

```
1. Page loads → index.html
2. CSS loads → style.css (styling applied)
3. JavaScript loads → script.js (state initialized)
4. Components load → components.js (navbar, footer, FAB rendered)
5. All interactive ✨
```

---

## 📱 Mobile Testing Checklist

- ✅ Hamburger menu shows on mobile
- ✅ Navigation drawer slides smoothly
- ✅ Search modal works on mobile
- ✅ Footer stacks single column
- ✅ FAB is accessible (not covered)
- ✅ Buttons are 44px+ (touch-friendly)
- ✅ Text is readable
- ✅ No horizontal scrolling
- ✅ Images load properly
- ✅ Forms work on mobile

---

## 🚀 Ready for Next Steps?

Once you're comfortable with the setup:

### PROMPT 3: Hero & Products
- Add hero banner section
- Create product card components
- Build product grid layout
- Add product images

### PROMPT 4: Shopping Cart
- Build cart modal
- Quantity controls
- Price calculations
- Checkout form

### PROMPT 5: Product Details
- Product detail page
- Image gallery
- Size/color selector
- Reviews & ratings

---

## 📞 Need Help?

### Check These Files First:
- **README.md** - Full documentation
- **DEVELOPER_GUIDE.md** - Technical reference
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **CHECKLIST.md** - Quality checklist

### Browser DevTools Tips:
- `F12` - Open DevTools
- `Ctrl+Shift+M` - Mobile view
- Elements tab - Inspect HTML
- Console tab - Run JavaScript
- Network tab - Check file loading
- Lighthouse tab - Performance audit

---

## ✨ Common Customizations

### Change Brand Name
1. Open `components.js`
2. Find "SneakerLab" 
3. Replace with your name

### Change WhatsApp Number
1. Open `components.js`
2. Find WhatsApp link in FABComponent
3. Replace `628XXXXXXXXXX` with your number

### Change Colors
1. Open `style.css`
2. Modify `:root { }` variables
3. Save and refresh

### Add Navigation Link
1. Open `components.js`
2. Find `nav-list`
3. Add `<li><a href="#">Your Link</a></li>`

---

## 📊 Project Stats

- **Total Lines**: 3,238
- **Files**: 7 (HTML, CSS, 2 JS, 4 Docs)
- **Components**: 3 (Navbar, Footer, FAB)
- **Design Tokens**: 20+
- **Responsive Breakpoints**: 5
- **Browser Support**: Modern browsers

---

## 🎯 Success Indicators

You're set up correctly when:

✅ Page loads without errors
✅ Navbar and footer visible
✅ FAB button in bottom-right
✅ Mobile menu works
✅ Search modal opens/closes
✅ Newsletter form accepts input
✅ Badges show counters
✅ All colors match design
✅ No console errors
✅ Responsive on mobile

---

## 🔥 You're All Set!

**SneakerLab** is ready for development. 

**Next**: Review files, customize colors, then build PROMPT 3! 🚀

---

**Questions?** Check README.md or DEVELOPER_GUIDE.md

**Found an issue?** Check console (F12) for error messages

**Ready to add features?** Follow patterns in existing components

---

**Happy coding!** 👟🔥
