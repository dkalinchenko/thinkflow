import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'app.html',
                index: 'index.html'
            },
            output: {
                manualChunks: {
                    // Split vendor libraries
                    'vendor-charts': ['chart.js'],
                    'vendor-ui': ['tippy.js', 'sortablejs'],
                    // Split application code
                    'ai': ['./js/ai.js', './js/amazon-research.js'],
                    'state': ['./js/state.js', './js/db.js'],
                    'utils': ['./js/utils.js', './js/affiliate.js']
                }
            }
        },
        chunkSizeWarningLimit: 1000
    },
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ],
    server: {
        port: 3000,
        open: true
    }
});
