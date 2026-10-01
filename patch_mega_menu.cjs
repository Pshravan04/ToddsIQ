const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace mega-menu styles
css = css.replace(
  /\.mega-menu\{[^}]+\}/,
  `.mega-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) scale(0.96) translateY(-10px);
  transform-origin: top center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 24px;
  box-shadow: 0 30px 60px -12px rgba(30, 42, 56, 0.15), 0 18px 36px -18px rgba(30, 42, 56, 0.1);
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  min-width: 700px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s 0.3s;
  z-index: 200;
  border: 1px solid rgba(30, 42, 56, 0.08);
  pointer-events: none;
}
/* Invisible bridge to prevent accidental hover leave */
.mega-menu::after {
  content: '';
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  height: 24px;
  background: transparent;
}
/* Upward pointing caret */
.mega-menu::before {
  content: '';
  position: absolute;
  top: -7px;
  left: calc(50% - 7px);
  width: 14px;
  height: 14px;
  background: white;
  transform: rotate(45deg);
  border-left: 1px solid rgba(30, 42, 56, 0.08);
  border-top: 1px solid rgba(30, 42, 56, 0.08);
  border-radius: 3px 0 0 0;
  z-index: -1;
}`
);

css = css.replace(
  /\.nav-item:hover \.mega-menu\{[^}]+\}/,
  `.nav-item:hover .mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1) translateY(0);
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1);
  pointer-events: all;
  transition-delay: 0.05s;
}`
);

css = css.replace(
  /\.mega-age-tile:hover\{[^}]+\}/,
  `.mega-age-tile:hover {
  transform: translateX(6px);
  background: rgba(30, 42, 56, 0.03);
  box-shadow: 0 4px 12px rgba(30, 42, 56, 0.02);
}
.mega-age-tile:hover .mega-age-dot {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 8px 16px -4px rgba(30, 42, 56, 0.15);
}`
);

css = css.replace(
  /\.mega-age-dot\{[^}]+\}/,
  `.mega-age-dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.4rem;
  transition: transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1), box-shadow 0.3s ease;
}`
);

css = css.replace(
  /\.mega-interest-link:hover\{[^}]+\}/,
  `.mega-interest-link:hover {
  color: var(--ink-navy);
  background: rgba(30, 42, 56, 0.03);
  transform: translateX(4px);
}
.mega-interest-link:hover .mega-interest-icon {
  transform: scale(1.1);
}`
);

css = css.replace(
  /\.mega-interest-link\{[^}]+\}/,
  `.mega-interest-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.875rem;
  border-radius: var(--r-md);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: transform var(--t-bounce), color var(--t-fast), background var(--t-fast);
  text-decoration: none;
}`
);

css = css.replace(
  /\.mega-interest-icon/g,
  `.mega-interest-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1rem;
  transition: transform var(--t-bounce);
}
.mega-interest-icon`
); // Note: Since the icon didn't have a class definition before (it was inline style in React), adding it.

// Clean up duplicate if existed
css = css.replace(/\.mega-interest-icon \{\n[^}]+\}\n\.mega-interest-icon \{/g, '.mega-interest-icon {');

fs.writeFileSync('src/index.css', css);
console.log('Applied modern mega menu CSS!');
