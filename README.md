# ThinkFlow AI 🧠

A next-generation decision matrix application powered by AI. Make better choices with weighted criteria analysis, all while keeping your data private in your browser.

![ThinkFlow AI](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **AI-Powered Intelligence** - Get smart suggestions for criteria, alternatives, and evaluations
- **Zero Setup** - No accounts, no servers, instant start
- **Privacy First** - All data stays in your browser with IndexedDB
- **Beautiful Visualizations** - Rankings, radar charts, and detailed analysis
- **Collaboration Ready** - Share decisions via URL, export to JSON/CSV/Markdown
- **Offline Capable** - Works without internet after initial load (PWA)
- **Dark/Light Modes** - Automatic theme switching

## 🚀 Quick Start

1. Open `index.html` in a modern browser
2. Click "New Decision" or choose a template
3. Add your criteria and alternatives
4. Score your options
5. View results and AI insights

### Using AI Features

**AI features are pre-configured with DeepSeek** and ready to use immediately!

To change AI settings:
1. Click the ⚙️ Settings button
2. Choose your AI provider (DeepSeek, OpenAI, or Anthropic)
3. Enter your own API key (optional)
4. Save settings

Your API key is stored locally and encrypted. It's only used to communicate directly with your chosen AI provider.

## 📁 Project Structure

```
optimind.light/
├── index.html          # Main application
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline
├── css/
│   └── styles.css     # All styles with CSS variables
└── js/
    ├── app.js         # Main application logic
    ├── db.js          # IndexedDB with Dexie.js
    ├── state.js       # State management
    ├── ai.js          # AI service adapter
    ├── utils.js       # Utility functions
    └── templates.js   # Decision templates
```

## 🛠 Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), No build step required
- **Storage**: IndexedDB via Dexie.js
- **Visualization**: Chart.js
- **AI**: DeepSeek, OpenAI GPT-4, or Anthropic Claude
- **Compression**: LZ-String for URL sharing
- **Drag & Drop**: SortableJS

## 📊 Decision Templates

Pre-built templates for common decisions:
- 💼 Job Offer Comparison
- 🏠 Housing Decision
- 💻 Tech Purchase
- 🤝 Vendor Selection
- 🎓 Education Program
- 📈 Investment Opportunity
- 🚗 Car Purchase
- ✈️ Travel Destination
- 🔧 Software Selection
- 🏥 Healthcare Decision
- 👥 Hiring Decision
- 📋 Project Prioritization

## 🔒 Privacy & Security

- All decision data stored locally in IndexedDB
- No tracking, analytics, or cookies
- API keys encrypted at rest
- AI calls go directly to provider (not through our servers)
- Export your data anytime in JSON format

## 📱 Mobile Support

- Fully responsive design
- Touch-optimized controls
- Installable as PWA
- Works offline

## 🎨 Customization

### Themes
The app defaults to **light mode** with an option to toggle to dark mode using the 🌙 button in the header. Your preference is saved locally.

### Scoring Scale
Choose between 1-10 (default) or 1-5 scale in Settings.

### AI Providers
- **DeepSeek** (Recommended) - Most affordable, good quality
- **OpenAI GPT-4** - Premium quality
- **Anthropic Claude** - Alternative premium option

## 📤 Export Options

- **JSON** - Full data backup, re-importable
- **CSV** - Spreadsheet-compatible format
- **Markdown** - Documentation-friendly text

## 🔗 Sharing

Share decisions via URL:
1. Click "Share" button
2. Copy the generated link
3. Recipients can view (read-only) and clone to their browser

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N` - New decision
- `Ctrl/Cmd + S` - Save (auto-saves anyway)
- `Escape` - Close modals
- `Tab` - Navigate through score inputs

## 🐛 Troubleshooting

### AI not working?
- Check your API key is correctly entered
- Verify you have credits/balance with your AI provider
- Check browser console for error messages

### Data not saving?
- Ensure you have sufficient storage quota
- Try clearing old decisions
- Check if private/incognito mode is enabled (limits storage)

### Slow performance?
- Large decisions (50+ alternatives) may impact rendering
- Try closing other browser tabs
- Clear AI cache in browser dev tools

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- [Dexie.js](https://dexie.org/) - IndexedDB wrapper
- [Chart.js](https://www.chartjs.org/) - Beautiful charts
- [SortableJS](https://sortablejs.github.io/Sortable/) - Drag and drop
- [LZ-String](https://pieroxy.net/blog/pages/lz-string/index.html) - Compression

---

Made with ❤️ for better decision-making
