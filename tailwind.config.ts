import type { Config } from "tailwindcss";
import daisyui from 'daisyui'
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  themes: {
    extend:{}
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:[    
      {
        mytheme: {
          "primary": "#3BB77E",//primaary
          "primary-content":"#c8ecdc",//banner light green
          "error":"#FDE0E9",
          "secondary": "#F2FCE4",//cake and milk burger bg
          "accent": "#FF8C42",// chatgpt suggested 
          "neutral": "#5A5A5A",// chatgpt suggested
          "base-100": "#FFFFFF",//base background color
        },
      },
    ]
  }
};
export default config;
