import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/test/',
                '**/*.test.{ts,tsx}',
                '**/*.spec.{ts,tsx}',
                '**/types/**',
            ],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@/hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
            '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
        },
    },
});
