import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Keep the custom SSR error wrapper in src/server.ts as the server entry.
      server: { entry: "server" },
    }),
    nitro({ preset: "cloudflare-module" }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    tsconfigPaths: true,
  },
});
