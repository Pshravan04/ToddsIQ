const fs = require('fs');

let content = fs.readFileSync('src/pages/Product.jsx', 'utf8');

// Add framer-motion import if not present
if (!content.includes('framer-motion')) {
  content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { motion } from 'framer-motion';");
}

// Replace the entire tabs section (lines 369 to 379 approx)
const tabsStartStr = `<div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">`;
const tabsEndStr = `</div>\n</div>\n{/* Tab 1: Overview Panel */}`;

const startIndex = content.indexOf(tabsStartStr);
const endIndex = content.indexOf(tabsEndStr, startIndex) + `</div>\n</div>\n`.length;

if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
  const replacement = `<div className="flex justify-start md:justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide w-full px-4">
<div className="relative bg-canvas p-1.5 rounded-full border-2 border-ink flex items-center shadow-sm min-w-max mx-auto" id="pill-tab-container">
{[
  { id: 'overview', label: 'Overview' },
  { id: 'included', label: "What's Included" },
  { id: 'how-to-use', label: 'How to Use' },
  { id: 'clinical', label: 'Clinical Benefits' },
  { id: 'safety', label: 'Age & Safety' }
].map(tab => (
  <button 
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === tab.id ? 'text-white' : 'text-ink-muted hover:text-ink'}\`}
  >
    {activeTab === tab.id && (
      <motion.div
        layoutId="active-pill"
        className="absolute inset-0 bg-ink rounded-full"
        style={{ zIndex: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
    <span className="relative z-10">{tab.label}</span>
  </button>
))}
</div>
</div>
`;
  content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
  fs.writeFileSync('src/pages/Product.jsx', content);
  console.log('Successfully patched tabs!');
} else {
  console.log('Failed to find tabs bounds');
}
