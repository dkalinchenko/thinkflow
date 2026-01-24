import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// Plugin to copy decisions and guides folders to dist
function copyPublicDirsPlugin() {
    return {
        name: 'copy-public-dirs',
        closeBundle() {
            // Copy decisions folder
            const decisionsDir = './decisions';
            const distDecisionsDir = './dist/decisions';
            
            if (!existsSync(distDecisionsDir)) {
                mkdirSync(distDecisionsDir, { recursive: true });
            }
            
            if (existsSync(decisionsDir)) {
                const files = readdirSync(decisionsDir);
                files.forEach(file => {
                    const srcPath = join(decisionsDir, file);
                    const destPath = join(distDecisionsDir, file);
                    try {
                        copyFileSync(srcPath, destPath);
                        console.log(`Copied: ${file} to dist/decisions`);
                    } catch (err) {
                        console.error(`Failed to copy ${file}:`, err.message);
                    }
                });
                console.log(`✓ Copied ${files.length} file(s) to dist/decisions`);
            }
            
            // Copy guides folder
            const guidesDir = './guides';
            const distGuidesDir = './dist/guides';
            
            if (!existsSync(distGuidesDir)) {
                mkdirSync(distGuidesDir, { recursive: true });
            }
            
            if (existsSync(guidesDir)) {
                const files = readdirSync(guidesDir);
                files.forEach(file => {
                    const srcPath = join(guidesDir, file);
                    const destPath = join(distGuidesDir, file);
                    try {
                        copyFileSync(srcPath, destPath);
                        console.log(`Copied: ${file} to dist/guides`);
                    } catch (err) {
                        console.error(`Failed to copy ${file}:`, err.message);
                    }
                });
                console.log(`✓ Copied ${files.length} file(s) to dist/guides`);
            }
        }
    };
}

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
        }),
        copyPublicDirsPlugin()
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
