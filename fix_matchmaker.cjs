const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// Ensure useState is imported
if (!content.includes('useState')) {
  content = content.replace("import React, { useRef } from 'react';", "import React, { useRef, useState } from 'react';");
}

// Add state variables inside the Home component
const stateVars = `
  const [quizAge, setQuizAge] = useState('3-4');
  const [quizGoal, setQuizGoal] = useState('focus');
  const [showQuizResult, setShowQuizResult] = useState(false);
`;

const exportDefaultIndex = content.indexOf('export default function Home() {');
if (exportDefaultIndex !== -1 && !content.includes('const [quizAge')) {
  const insertionPoint = content.indexOf('{', exportDefaultIndex) + 1;
  content = content.slice(0, insertionPoint) + stateVars + content.slice(insertionPoint);
}

// Find the toy quiz section bounds using exact strings we know exist from the view_file output
const startIdentifier = '<div className="mt-space-xl space-y-space-lg" id="toy-quiz-container">';
const endIdentifier = '<div className="hidden mt-space-md p-space-md rounded-2xl bg-secondary-container border-2 border-on-surface animate-fade-in" id="quiz-result-box">';

const startIndex = content.indexOf(startIdentifier);
let endIndex = content.indexOf(endIdentifier, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  // We want to replace from startIndex up to the end of the section. Let's find the closing tag of the section.
  const sectionEndIdentifier = '</section>';
  const finalEndIndex = content.indexOf(sectionEndIdentifier, endIndex);
  
  if (finalEndIndex !== -1) {
    const replacement = `<div className="mt-space-xl space-y-space-lg" id="toy-quiz-container">

<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-on-surface block font-bold">1. How old is your child?</label>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="quiz-age-group">
  {[
    { id: '1-2', label: '1–2 Years' },
    { id: '3-4', label: '3–4 Years' },
    { id: '5-7', label: '5–7 Years' },
    { id: '8+', label: '8+ Years' }
  ].map(age => (
    <button 
      key={age.id}
      onClick={() => { setQuizAge(age.id); setShowQuizResult(false); }}
      type="button"
      className={\`quiz-age-btn px-4 py-3 rounded-xl border-2 font-label-md text-label-md text-center transition-all \${quizAge === age.id ? 'active-quiz-chip bg-primary-fixed text-on-primary-fixed border-on-surface shadow-[3px_3px_0px_#1c1c18]' : 'bg-surface-container border-on-surface text-on-surface hover:bg-surface-container-high'}\`}
    >
      {age.label}
    </button>
  ))}
</div>
</div>

<div className="space-y-space-sm">
<label className="font-label-md text-label-md text-on-surface block font-bold">2. What would you like to encourage most?</label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm" id="quiz-goal-group">
  {[
    { id: 'creative', icon: 'draw', iconColor: 'text-primary', label: 'Creative Drawing & Fine Motor Control' },
    { id: 'stem', icon: 'precision_manufacturing', iconColor: 'text-tertiary', label: 'Spatial STEM & Building Physics' },
    { id: 'focus', icon: 'self_improvement', iconColor: 'text-primary', label: 'Deep Calm Focus (Zero Screen Meltdowns)' },
    { id: 'phonics', icon: 'spellcheck', iconColor: 'text-secondary', label: 'Early Phonics, Words & Math Numbers' }
  ].map(goal => (
    <button 
      key={goal.id}
      onClick={() => { setQuizGoal(goal.id); setShowQuizResult(false); }}
      type="button"
      className={\`quiz-goal-btn px-4 py-3 rounded-xl border-2 font-label-md text-label-md text-left flex items-center gap-3 transition-all \${quizGoal === goal.id ? 'active-quiz-chip bg-secondary-fixed text-on-secondary-fixed border-on-surface shadow-[3px_3px_0px_#1c1c18]' : 'bg-surface-container border-on-surface text-on-surface hover:bg-surface-container-high'}\`}
    >
      <span className={\`material-symbols-outlined \${goal.iconColor}\`}>{goal.icon}</span>
      <span>{goal.label}</span>
    </button>
  ))}
</div>
</div>

<div className="pt-space-sm flex flex-col items-center gap-space-xs">
<button 
  onClick={() => setShowQuizResult(true)}
  type="button"
  className="w-full sm:w-auto px-space-2xl py-3.5 bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg border-2 border-on-surface shadow-[4px_4px_0px_#1c1c18] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
>
  <span>Show My 3 Personalized Matches</span>
  <span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 pt-1">
  <span className="material-symbols-outlined text-sm text-primary">lock</span> Instant recommendations • No email required to view
</span>
</div>

<div className={\`mt-space-md p-space-md rounded-2xl bg-secondary-container border-2 border-on-surface transition-all duration-500 \${showQuizResult ? 'opacity-100 block' : 'opacity-0 hidden'}\`} id="quiz-result-box">
<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-3xl text-on-secondary-container">auto_awesome</span>
    <div>
      <p className="font-label-md text-label-md text-on-secondary-container font-bold">
        Top Match: {quizGoal === 'stem' ? 'ToddsIQ™ Build-a-Bot Kit' : quizGoal === 'phonics' ? 'ToddsIQ™ Phonics Starter' : 'ToddsIQ™ Bot + 150 Card Core Set'}
      </p>
      <p className="font-body-sm text-body-sm text-on-secondary-container">
        Perfect for {quizAge} yrs: {quizGoal === 'focus' ? 'builds 25+ min calm independent focus without screens.' : 'fosters hands-on learning and reduces screen time.'}
      </p>
    </div>
  </div>
  <Link to="/product/toddsiq-robot" className="px-5 py-2.5 bg-surface-container-lowest text-on-surface rounded-xl font-label-md text-label-md border-2 border-on-surface shadow-[3px_3px_0px_#1c1c18] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center whitespace-nowrap">View Bundle ($89)</Link>
</div>
</div>
</div>
`;
    content = content.slice(0, startIndex) + replacement + content.slice(finalEndIndex);
    fs.writeFileSync('src/pages/Home.jsx', content);
    console.log('Successfully applied Matchmaker interactivity.');
  } else {
    console.log('Could not find end of section bounds.');
  }
} else {
  console.log('Could not find Matchmaker boundaries.');
}
