import * as path from 'path'
import * as VitestConfig from 'vitest/config'
import react from '@vitejs/plugin-react'

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
