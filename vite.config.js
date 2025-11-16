import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Como tu repo es juanploxz.github.io, la página vive en la raíz del dominio:
  // https://juanploxz.github.io  → base "/"
  base: "/",
});
