import type { Config } from "tailwindcss";
import Colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#002A5C",
          50: "#B8D8FF",
          100: "#A3CDFF",
          200: "#7BB7FF",
          300: "#52A1FF",
          400: "#298BFF",
          500: "#0075FF",
          600: "#0062D6",
          700: "#004FAE",
          800: "#003D85",
          900: "#002A5C",
          950: "#001D40",
        },
        secondary: {
          DEFAULT: "#A51C30",
          50: "#F7D3D8",
          100: "#F5C1C9",
          200: "#EF9EAA",
          300: "#E97C8B",
          400: "#E3596D",
          500: "#DD364E",
          600: "#C8223A",
          700: "#A51C30",
          800: "#751422",
          900: "#450C14",
          950: "#2D080D",
        },
        neutral: Colors.zinc,
        base: {
          DEFAULT: "#212529",
          50: "#CED2D7",
          100: "#C2C8CE",
          200: "#ACB4BC",
          300: "#959FAA",
          400: "#7E8B98",
          500: "#6A7783",
          600: "#58626D",
          700: "#454E56",
          800: "#333940",
          900: "#212529",
          950: "#141719",
        },
      },
    },
  },
  plugins: [],
};
export default config;
