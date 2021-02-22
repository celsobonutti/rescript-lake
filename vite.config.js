import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import ViteRsw from 'vite-plugin-rsw';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: 
  [reactRefresh(),
  ViteRsw({
    mode: 'release',
    crates: [
      'lake',
    ]
  }),]
})
