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
                    // Split application code only
                    // Note: chart.js, tippy.js, sortablejs are loaded from CDN
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
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Proxy error - API not available. Use "npm run dev" to run with Vercel Dev which supports serverless functions.');
                        res.writeHead(503, {
                            'Content-Type': 'application/json',
                        });
                        res.end(JSON.stringify({
                            error: 'API not available in Vite-only mode',
                            message: 'Please use "npm run dev" instead of "npm run dev:vite" to enable API endpoints. This requires Vercel CLI.',
                            solution: 'Run: npm install && npm run dev'
                        }));
                    });
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        // If connection is refused, send helpful error
                        proxyReq.on('error', (err) => {
                            console.log('API endpoint not available. Use "npm run dev" to run with Vercel Dev.');
                        });
                    });
                }
            }
        }
    }
});
