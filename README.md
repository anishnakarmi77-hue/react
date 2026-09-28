# Bubblewrap — Playful E-commerce (React + Vite)

Same features as the original project, rebuilt with a custom playful/rounded
design (no Bootstrap) and a few fixes.

## What it does
- **Home** — hero section, category pills, trending products (live data from
  [dummyjson.com](https://dummyjson.com))
- **Products** — full catalog with search + price sort
- **Product detail** — quantity picker, add to cart, add to wishlist
  (localStorage)
- **Cart** — now fully working: change quantity, remove items, subtotal +
  shipping + total, checkout button that clears the cart
- **Register** — real client-side validation, playful gender-pill picker,
  saves to localStorage

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   Header, Footer, product Card
  pages/        Layout, Homepage, Products, Productview, Cart, Register
  index.css     design tokens + global styles (colors, radius, fonts)
```

Fonts (Baloo 2 + Quicksand) are loaded from Google Fonts in `index.html`.
Colors, radius and shadows are defined as CSS variables at the top of
`src/index.css` — change those to restyle the whole app in one place.
