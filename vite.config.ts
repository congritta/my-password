import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["images/favicon.ico", "images/apple-touch-icon.png", "images/mask-icon.svg"],
      manifest: {
        name: "My Password",
        short_name: "My Password",
        description: "Password generator of the New Generation",
        theme_color: "#eb4034",
        icons: [
          {
            src: "images/apple-touch-icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "images/apple-touch-icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
