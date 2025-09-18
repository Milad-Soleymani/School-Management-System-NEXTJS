import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loader: {
          "100%": { backgroundPosition: "right -30px top 0" },
        },
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blueSky: "#C3EBFA",
        blueSkyLight: "#EDF9FD",
        specialPurple: "#CFCEFF",
        specialPurpleLight: "#F1F0FF",
        specialYellow: "#FAE27C",
        specialYellowLight: "#FEFCE8",
      },
    },
  },
  plugins: [],
};
export default config;
