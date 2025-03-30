// Root-level server.js entry point for Render
console.log('Starting ThinkFlow from root server.js');
console.log('Current working directory:', process.cwd());

// Require the actual server implementation
require('./server/server.js'); 