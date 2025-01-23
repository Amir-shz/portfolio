import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        shadow1: "4px 4px 8px 0 rgba(17,17,17,0.16)",
        shadow2: "0px 4px 8px 0 rgba(17,17,17,0.08)",
        shadow3: "2px 2px 6px 0 rgba(17,17,17,0.16)",
        shadow4: "0px 0px 8px 2px rgba(17,17,17,0.12)",
      },
      colors: {
        background: "#FAFAFA",
        purple: {
          50: "#EFE6FD",
          100: "#CEB0FA",
          200: "#B78AF7",
          300: "#9654F4",
          400: "#8133F1",
          500: "#6200EE",
          600: "#5900D9",
          700: "#4600A9",
          800: "#360083",
          900: "#290064",
        },
        error: {
          100: "#ffe9e9",
          500: "#ff2525",
          700: "#e82222",
          800: "#851a1a",
        },
        success: colors.green,
        warning: colors.yellow,
      },
      fontSize: {
        // DESKTOP

        // HEADERS
        // Semi-Bold headers (i converted px to rem)
        h1_SB_desktop: ["2.281rem", { fontWeight: "600" }],
        h2_SB_desktop: ["2.027rem", { fontWeight: "600" }],
        h3_SB_desktop: ["1.802rem", { fontWeight: "600" }],
        h4_SB_desktop: ["1.602rem", { fontWeight: "600" }],
        h5_SB_desktop: ["1.424rem", { fontWeight: "600" }],
        h6_SB_desktop: ["1.266rem", { fontWeight: "600" }],
        // Bold headers (i converted px to rem)
        h1_B_desktop: ["2.281rem", { fontWeight: "700" }],
        h2_B_desktop: ["2.027rem", { fontWeight: "700" }],
        h3_B_desktop: ["1.802rem", { fontWeight: "700" }],
        h4_B_desktop: ["1.602rem", { fontWeight: "700" }],
        h5_B_desktop: ["1.424rem", { fontWeight: "700" }],
        h6_B_desktop: ["1.266rem", { fontWeight: "700" }],

        // TEXT (PARAGRAPH)
        // Regular paragraph (i converted px to rem)
        p1_R_desktop: ["1.125rem", { fontWeight: "400" }],
        p2_R_desktop: ["1.000rem", { fontWeight: "400" }],
        p3_R_desktop: ["0.889rem", { fontWeight: "400" }],
        p4_R_desktop: ["0.790rem", { fontWeight: "400" }],
        // Medium paragraph (i converted px to rem)
        p1_M_desktop: ["1.125rem", { fontWeight: "500" }],
        p2_M_desktop: ["1.000rem", { fontWeight: "500" }],
        p3_M_desktop: ["0.889rem", { fontWeight: "500" }],
        p4_M_desktop: ["0.790rem", { fontWeight: "500" }],
        // Semi-Bold paragraph (i converted px to rem)
        p1_SB_desktop: ["1.125rem", { fontWeight: "600" }],
        p2_SB_desktop: ["1.000rem", { fontWeight: "600" }],
        p3_SB_desktop: ["0.889rem", { fontWeight: "600" }],
        p4_SB_desktop: ["0.790rem", { fontWeight: "600" }],

        // LABEL
        lb1_desktop: ["0.889rem", { fontWeight: "600" }],
        lb2_desktop: ["0.79rem", { fontWeight: "600" }],
        lb3_desktop: ["0.625rem", { fontWeight: "500" }],

        // MOBILE

        // HEADERS
        // Semi-Bold headers (i converted px to rem)
        h1_SB_mobile: ["2.281rem", { fontWeight: "600" }],
        h2_SB_mobile: ["2.027rem", { fontWeight: "600" }],
        h3_SB_mobile: ["1.802rem", { fontWeight: "600" }],
        h4_SB_mobile: ["1.602rem", { fontWeight: "600" }],
        h5_SB_mobile: ["1.424rem", { fontWeight: "600" }],
        h6_SB_mobile: ["1.266rem", { fontWeight: "600" }],
        // Bold headers (i converted px to rem)
        h1_B_mobile: ["2.281rem", { fontWeight: "700" }],
        h2_B_mobile: ["2.027rem", { fontWeight: "700" }],
        h3_B_mobile: ["1.802rem", { fontWeight: "700" }],
        h4_B_mobile: ["1.602rem", { fontWeight: "700" }],
        h5_B_mobile: ["1.424rem", { fontWeight: "700" }],
        h6_B_mobile: ["1.266rem", { fontWeight: "700" }],

        // TEXT (PARAGRAPH)
        // Regular paragraph (i converted px to rem)
        p1_R_mobile: ["1.125rem", { fontWeight: "400" }],
        p2_R_mobile: ["1.000rem", { fontWeight: "400" }],
        p3_R_mobile: ["0.889rem", { fontWeight: "400" }],
        p4_R_mobile: ["0.790rem", { fontWeight: "400" }],
        // Medium paragraph (i converted px to rem)
        p1_M_mobile: ["1.125rem", { fontWeight: "500" }],
        p2_M_mobile: ["1.000rem", { fontWeight: "500" }],
        p3_M_mobile: ["0.889rem", { fontWeight: "500" }],
        p4_M_mobile: ["0.790rem", { fontWeight: "500" }],
        // Semi-Bold paragraph (i converted px to rem)
        p1_SB_mobile: ["1.125rem", { fontWeight: "600" }],
        p2_SB_mobile: ["1.000rem", { fontWeight: "600" }],
        p3_SB_mobile: ["0.889rem", { fontWeight: "600" }],
        p4_SB_mobile: ["0.790rem", { fontWeight: "600" }],

        // LABEL
        lb1_mobile: ["0.878rem", { fontWeight: "600" }],
        lb2_mobile: ["0.772rem", { fontWeight: "600" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
