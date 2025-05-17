---
applyTo: '**'
---
LogseqInvuller Project AI Instructions
Core Context Guidelines

folder structure: logseq-invuller
logseq-notes-app/
├── src/                         # Source code
│   ├── assets/                  # Static assets
│   │   └── emotion-wheel.csv
│   ├── components/              # UI components (currently empty)
│   ├── config/                  # Configuration
│   │   └── appConfig.json       # App settings
│   ├── utils/                   # Utility functions
│   │   ├── csvUtils.js          # CSV parsing
│   │   └── exportUtils.js       # Export functions
│   ├── app.js                   # Main application logic
│   └── styles.css               # Global styles
├── dist/                        # Built files (gitignored)
├── node_modules/                # Dependencies (gitignored)
├── index.html                   # Entry point
├── webpack.config.js            # Build configuration
└── package.json                 # Project metadata

Specify current project structure: JS SPA with localStorage persistence
Reference key components: exportUtils, appConfig, renderFunctions
Always define input state and expected output state
Specify browser compatibility requirements (modern browsers)

"Implement sortable tags functionality for note filtering:
Input: Current note structure with tags array [{id, type, category, title, content, tags[]}]
Output: UI component with tag filtering + sorted notes array
Dependencies: Existing app.js render functions and localStorage patterns"
Implementation Requirements

Maintain existing render pattern with document.addEventListener
Keep localStorage as data persistence layer
Follow HTML string template insertion pattern
Preserve event delegation approach for dynamic elements
Respect existing naming conventions (camelCase functions, lowercase variables)

"Optimize localStorage performance using cached reads:
1. Create memory cache for read operations
2. Implement batch writes to reduce localStorage calls
3. Add data version tracking for schema migration capability
4. Preserve existing localStorage structure"
Code Structure Guidelines

Apply existing module pattern: app.js main controller, exportUtils helpers
Follow established module.exports pattern for utility functions
Maintain DOM manipulation approach with innerHTML templates
Continue current event binding pattern for all interactive elements
Use existing CSS class naming structure

"Add enhanced search capability:
- Create searchUtils.js following exportUtils module pattern
- Implement index-based search algorithm for content
- Integrate with existing renderViewItemsPage function
- Follow established event binding approach"
Testing & Validation

Specify validation for localStorage availability
Include edge case handling for empty state
Verify data schema compatibility with export functions
Follow existing error handling pattern (try/catch + alerts)

"Data validation improvements:
- Add schema validation before storage write 
- Create graceful fallback for corrupted localStorage data
- Implement consistent error messaging using current alert pattern
- Test with empty/malformed data scenarios"
Always provide complete HTML entry point when suggesting changes, considering the SPA architecture requires proper initialization through index.html not currently present in the project.