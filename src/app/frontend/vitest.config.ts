import * as path from 'path'

import react from '@vitejs/plugin-react'
import * as VitestConfig from 'vitest/config'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export default VitestConfig.defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-env.ts'],
    includeSource: ['src/**/*.{ts,tsx}'],
    exclude: ['node_modules'],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [react()],
})
