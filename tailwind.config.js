/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": { "canvas": "#FBF8F2", "ink": "#1E2A38", "coral": "#FF6154", "marigold": "#FFB627", "teal": "#1F9D8A", "periwinkle": "#6C8EF5", "primary-container": "#ff6154", "primary-fixed-dim": "#ffb4ab", "primary": "#b22a24", "tertiary-fixed-dim": "#ffba3b", "on-tertiary-container": "#402a00", "on-background": "#1c1c18", "on-surface-variant": "#5a413e", "on-secondary-container": "#576474", "on-tertiary-fixed": "#281900", "on-secondary": "#ffffff", "on-tertiary": "#ffffff", "on-surface": "#1c1c18", "error": "#ba1a1a", "error-container": "#ffdad6", "outline-variant": "#e2beba", "inverse-surface": "#31312d", "inverse-on-surface": "#f3f0ea", "on-secondary-fixed": "#101c2a", "on-tertiary-fixed-variant": "#604100", "background": "#fcf9f3", "surface-container": "#f0eee8", "on-primary": "#ffffff", "surface-container-high": "#ebe8e2", "secondary": "#535f6f", "tertiary": "#7f5700", "surface-container-low": "#f6f3ed", "tertiary-fixed": "#ffdead", "primary-fixed": "#ffdad5", "outline": "#8e706c", "surface-tint": "#b22a24", "surface": "#fcf9f3", "surface-variant": "#e5e2dc", "surface-dim": "#dcdad4", "secondary-fixed": "#d7e3f6", "secondary-fixed-dim": "#bbc7da", "secondary-container": "#d4e1f4", "on-error-container": "#93000a", "on-primary-fixed-variant": "#900d0f", "on-error": "#ffffff", "on-primary-container": "#650004", "tertiary-container": "#c78a00", "inverse-primary": "#ffb4ab", "surface-bright": "#fcf9f3", "surface-container-lowest": "#ffffff", "on-secondary-fixed-variant": "#3c4857", "on-primary-fixed": "#410002", "surface-container-highest": "#e5e2dc" },
      "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px", "2xl": "1rem", "3xl": "1.5rem" },
      "spacing": { "space-sm": "0.5rem", "space-xl": "2.5rem", "space-xs": "0.25rem", "space-2xl": "4rem", "margin-mobile": "1.25rem", "space-md": "1rem", "gutter": "1.5rem", "space-3xl": "6rem", "gutter-mobile": "1rem", "space-lg": "1.5rem", "margin": "3rem" },
      "fontFamily": { 
        "display": [ '"Baloo 2"', "sans-serif" ],
        "hand": [ "Caveat", "cursive" ],
        "body": [ "Inter", "sans-serif" ],
        "body-lg": [ "Inter", "sans-serif" ], 
        "label-lg": [ "Plus Jakarta Sans", "sans-serif" ], 
        "label-sm": [ "Plus Jakarta Sans", "sans-serif" ], 
        "headline-sm": [ "Plus Jakarta Sans", "sans-serif" ], 
        "headline-lg": [ "Plus Jakarta Sans", "sans-serif" ], 
        "body-md": [ "Inter", "sans-serif" ], 
        "label-md": [ "Plus Jakarta Sans", "sans-serif" ], 
        "body-sm": [ "Inter", "sans-serif" ], 
        "headline-lg-mobile": [ "Plus Jakarta Sans", "sans-serif" ], 
        "display-hero-mobile": [ "Plus Jakarta Sans", "sans-serif" ], 
        "title-md": [ "Plus Jakarta Sans", "sans-serif" ], 
        "display-hero": [ "Plus Jakarta Sans", "sans-serif" ], 
        "headline-md": [ "Plus Jakarta Sans", "sans-serif" ], 
        "annotation-stamp": [ "Plus Jakarta Sans", "sans-serif" ] 
      },
      "fontSize": { 
        "body-lg": [ "18px", { "lineHeight": "28px", "fontWeight": "400" } ], 
        "label-lg": [ "15px", { "lineHeight": "20px", "letterSpacing": "0.02em", "fontWeight": "700" } ], 
        "label-sm": [ "11px", { "lineHeight": "14px", "letterSpacing": "0.04em", "fontWeight": "700" } ], 
        "headline-sm": [ "22px", { "lineHeight": "28px", "fontWeight": "600" } ], 
        "headline-lg": [ "40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" } ], 
        "body-md": [ "15px", { "lineHeight": "22px", "fontWeight": "400" } ], 
        "label-md": [ "13px", { "lineHeight": "16px", "letterSpacing": "0.03em", "fontWeight": "700" } ], 
        "body-sm": [ "13px", { "lineHeight": "18px", "fontWeight": "400" } ], 
        "headline-lg-mobile": [ "28px", { "lineHeight": "34px", "letterSpacing": "-0.01em", "fontWeight": "700" } ], 
        "display-hero-mobile": [ "36px", { "lineHeight": "42px", "letterSpacing": "-0.02em", "fontWeight": "800" } ], 
        "title-md": [ "18px", { "lineHeight": "24px", "fontWeight": "600" } ], 
        "display-hero": [ "56px", { "lineHeight": "64px", "letterSpacing": "-0.03em", "fontWeight": "800" } ], 
        "headline-md": [ "28px", { "lineHeight": "36px", "letterSpacing": "-0.01em", "fontWeight": "700" } ], 
        "annotation-stamp": [ "14px", { "lineHeight": "18px", "letterSpacing": "0.06em", "fontWeight": "800" } ] 
      },
      "boxShadow": {
        "card": "0 8px 24px rgba(30,42,56,0.10), 0 2px 6px rgba(30,42,56,0.06)",
        "lift": "0 16px 36px rgba(30,42,56,0.16), 0 4px 10px rgba(30,42,56,0.08)",
      },
      "keyframes": {
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "fadeUp": { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
      "animation": {
        "marquee": "marquee 22s linear infinite",
        "fadeUp": "fadeUp 0.5s ease-out both",
      }
    },
  },
  plugins: [],
}
