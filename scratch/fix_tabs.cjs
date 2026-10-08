const fs = require('fs');
let content = fs.readFileSync('src/pages/Product.jsx', 'utf8');

const target = `{/* Tab Navigation Bar with Sliding Background Pill */}
<div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
<div className="relative bg-canvas p-1.5 rounded-full border-2 border-ink flex items-center shadow-sm" id="pill-tab-container">
{/* Sliding Indicator Pill */}
<button onClick={() => setActiveTab('overview')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'overview' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>Overview</button>
<button onClick={() => setActiveTab('included')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'included' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>What's Included</button>
<button onClick={() => setActiveTab('how-to-use')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'how-to-use' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>How to Use</button>
<button onClick={() => setActiveTab('clinical')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'clinical' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>Clinical Benefits</button>
<button onClick={() => setActiveTab('safety')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'safety' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>Age &amp; Safety</button>
</div>
</div>`;

const replacement = `{/* Tab Navigation Bar (Responsive: Dropdown on Mobile, Pills on Desktop) */}
<div className="w-full flex justify-center mb-10 px-4 md:px-0">
  {/* Mobile Dropdown */}
  <div className="w-full md:hidden relative">
    <select 
      value={activeTab}
      onChange={(e) => setActiveTab(e.target.value)}
      className="w-full appearance-none bg-canvas border-2 border-ink text-ink font-display font-bold text-sm rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1E2A38] focus:outline-none"
    >
      <option value="overview">Overview</option>
      <option value="included">What's Included</option>
      <option value="how-to-use">How to Use</option>
      <option value="clinical">Clinical Benefits</option>
      <option value="safety">Age &amp; Safety</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink">
      <span className="material-symbols-outlined">expand_more</span>
    </div>
  </div>

  {/* Desktop Pill Tabs */}
  <div className="hidden md:flex justify-center overflow-x-auto pb-2 scrollbar-hide">
    <div className="relative bg-canvas p-1.5 rounded-full border-2 border-ink flex items-center shadow-sm" id="pill-tab-container">
      {/* Sliding Indicator Pill */}
      <button onClick={() => setActiveTab('overview')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'overview' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>Overview</button>
      <button onClick={() => setActiveTab('included')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'included' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>What's Included</button>
      <button onClick={() => setActiveTab('how-to-use')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'how-to-use' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>How to Use</button>
      <button onClick={() => setActiveTab('clinical')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'clinical' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>Clinical Benefits</button>
      <button onClick={() => setActiveTab('safety')} className={\`tab-btn relative z-10 px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-bold transition-colors \${activeTab === 'safety' ? 'bg-coral-fixed text-canvas-fixed border-2 border-ink shadow-[2px_2px_0px_#1E2A38]' : 'bg-[#F4F1EA] text-ink border-2 border-transparent hover:border-ink'}\`}>Age &amp; Safety</button>
    </div>
  </div>
</div>`;

// Normalizing whitespace for safety
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const newContent = normalizedContent.replace(normalizedTarget, replacement);
  fs.writeFileSync('src/pages/Product.jsx', newContent, 'utf8');
  console.log('SUCCESS');
} else {
  console.log('TARGET NOT FOUND');
}
