/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "washed-Purple/washed-purple-50": "#f8f7ff",
        "washed-Purple/washed-purple-100": "#e8e7ff",
        "washed-Purple/washed-purple-200": "#dddcff",
        "washed-Purple/washed-purple-300": "#cdcbff",
        "washed-Purple/washed-purple-400": "#c4c1ff",
        "washed-Purple/washed-purple-500": "#b5b2ff",
        "washed-Purple/washed-purple-600": "#a5a2e8",
        "washed-Purple/washed-purple-700": "#817eb5",
        "washed-Purple/washed-purple-800": "#64628c",
        "washed-Purple/washed-purple-900": "#4c4b6b",
        "washed-blue/washed-blue-50": "#f0f3ff",
        "washed-blue/washed-blue-100": "#d0daff",
        "washed-blue/washed-blue-200": "#bac9ff",
        "washed-blue/washed-blue-300": "#9ab0ff",
        "washed-blue/washed-blue-400": "#86a1ff",
        "washed-blue/washed-blue-500": "#6889ff",
        "washed-blue/washed-blue-600": "#5f7de8",
        "washed-blue/washed-blue-700": "#4a61b5",
        "washed-blue/washed-blue-800": "#394b8c",
        "washed-blue/washed-blue-900": "#2c3a6b",
        "primary-blue/blue-50": "#e6f0ff",
        "primary-blue/blue-100": "#b1d1ff",
        "primary-blue/blue-200": "#8cbaff",
        "primary-blue/blue-300": "#579bff",
        "primary-blue/blue-400": "#3687ff",
        "primary-blue/blue-500": "#0469ff",
        "primary-blue/blue-600": "#0460e8",
        "primary-blue/blue-700": "#034bb5",
        "primary-blue/blue-800": "#023a8c",
        "primary-blue/blue-900": "#022c6b",
        "primary-purple/purple-50": "#f1e6ff",
        "primary-purple/purple-100": "#d3b0ff",
        "primary-purple/purple-200": "#bd8aff",
        "primary-purple/purple-300": "#9f54ff",
        "primary-purple/purple-400": "#8d33ff",
        "primary-purple/purple-500": "#7000ff",
        "primary-purple/purple-600": "#6600e8",
        "primary-purple/purple-700": "#5000b5",
        "primary-purple/purple-800": "#3e008c",
        "primary-purple/purple-900": "#2f006b",
        "Nuetrals/nuetrals-1": "#ffffff",
        "Nuetrals/nuetrals-2": "#fcfcfd",
        "Nuetrals/nuetrals-3": "#f5f5f6",
        "Nuetrals/nuetrals-4": "#f0f0f1",
        "Nuetrals/nuetrals-5": "#d9d9dc",
        "Nuetrals/nuetrals-6": "#c0bfc4",
        "Nuetrals/nuetrals-7": "#8e8c95",
        "Nuetrals/nuetrals-8": "#5b5966",
        "Nuetrals/nuetrals-9": "#474553",
        "Nuetrals/nuetrals-10": "#292637",
        "Nuetrals/nuetrals-11": "#211f30",
        "Nuetrals/nuetrals-12": "#171427",
        "Nuetrals/nuetrals-13": "#030014",
        "brand/brand-washedPurple": "#b5b2ff",
        "brand/brand-washedBlue": "#6889ff",
        "brand/brand-primaryBlue": "#0469ff",
        "brand/brand-primaryPurple": "#7000ff",
        "brand/brand-dark": "#030014",
        "Red/red-50": "#fce9eb",
        "Red/red-100": "#f5b9c1",
        "Red/red-200": "#f198a3",
        "Red/red-300": "#ea6879",
        "Red/red-400": "#e64b5f",
        "Red/red-500": "#e01e37",
        "Red/red-600": "#cc1b32",
        "Red/red-700": "#9f1527",
        "Red/red-800": "#7b111e",
        "Red/red-900": "#5e0d17",
        "LogoGradient1":"#FFF200",
        "LogoGradient2":"#FFCF24",
        "LogoGradient3":"#FF93B1",
        "LogoGradient4":"#FFFFFF"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
