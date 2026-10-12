import fs from 'fs';

// Read the original CSV
const csvContent = fs.readFileSync('shopify_products_import.csv', 'utf8');

// Robust CSV Parser
function parseCSV(text) {
  const rows = [];
  let cur = [];
  let f = '';
  let q = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') {
      if (q && next === '"') {
        f += '"';
        i++;
      } else {
        q = !q;
      }
    } else if (c === ',' && !q) {
      cur.push(f);
      f = '';
    } else if ((c === '\r' || c === '\n') && !q) {
      if (c === '\r' && next === '\n') i++;
      cur.push(f);
      if (cur.some(x => x.trim() !== '')) rows.push(cur);
      cur = [];
      f = '';
    } else {
      f += c;
    }
  }
  if (f || cur.length) {
    cur.push(f);
    rows.push(cur);
  }
  return rows;
}

// Robust CSV Formatter
function formatCSV(rows) {
  return rows.map(row => {
    return row.map(field => {
      if (field === null || field === undefined) field = '';
      const str = String(field);
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',');
  }).join('\n');
}

// 40 Products Metadata & Rich Descriptions
const productMap = {
  "thoson-magtrack™": {
    newHandle: "toddsiq-magtrack",
    title: "ToddsIQ™ MagTrack™",
    type: "Magnetic Train Track Set",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "The train set kids engineer themselves. ToddsIQ™ MagTrack™ lets young builders snap together modular magnetic tracks into loops, gravity-defying bridges, and imaginative new routes — before sending the motorized train on its maiden run. Every track layout becomes an exciting hands-on STEM project that builds spatial reasoning, problem-solving, and engineering confidence.",
    highlights: [
      "100% Screen-Free STEM Play — Inspires creative thinking, trial-and-error experimentation, and active spatial awareness.",
      "Instant Magnetic Snap-Lock — Easy for little hands to assemble sturdy 3D elevations, tunnels, and banking curves.",
      "Rechargeable Motorized Locomotive — Smooth, continuous track motion with rechargeable convenience (no battery hassles).",
      "Endless Layout Configurations — Expands effortlessly to grow alongside your child's building skills."
    ],
    optionsBreakdown: [
      "<strong>Rookie Edition (32 Pieces):</strong> Perfect beginner set featuring essential straight/curved tracks and the motorized train.",
      "<strong>PRO Edition (68 Pieces):</strong> Double the track pieces, elevated bridge supports, and loop connectors for advanced engineering.",
      "<strong>Master Edition (141 Pieces):</strong> The ultimate mega-track set with multi-tier spirals, flyover junctions, and dual elevation towers."
    ],
    whatsIncluded: [
      "1x USB-Rechargeable Motorized Train",
      "Expandable Magnetic Track Pieces & Elevated Bridge Risers",
      "USB Quick-Charging Cable",
      "Inspiration Building Guide with 20+ Challenge Layouts"
    ],
    specs: {
      age: "Ages 3+",
      material: "BPA-Free, Non-Toxic ABS with Encapsulated Rare-Earth Magnets",
      power: "USB Rechargeable Train Engine"
    }
  },

  "thoson-quarry": {
    newHandle: "toddsiq-quarry",
    title: "ToddsIQ™ Quarry™",
    type: "Construction Vehicle Playset",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "A working construction quarry powered by kids' hands instead of a screen. With ToddsIQ™ Quarry™, kids design realistic hauling routes, load rock boulders at the interactive conveyor station, and send the motorized dump truck hauling material around custom track layouts. Loading, hauling, and dumping cycles teach cause-and-effect and physical planning through engaging screen-free play.",
    highlights: [
      "Interactive Working Conveyor & Chute — Hands-on mechanical loading teaches early physics and sequential logic.",
      "Motorized Chassis System — Powers the dump truck smoothly along custom modular rail paths.",
      "Modular Track Construction — Rebuilds into endless job-site layouts for continuous imaginative play.",
      "Heavy-Duty Kid-Proof Design — High-impact, drop-resistant construction engineered for energetic builders."
    ],
    optionsBreakdown: [
      "<strong>Standard Quarry Playset:</strong> Complete construction playset with motorized hauler, quarry loading tower, and boulder chute."
    ],
    whatsIncluded: [
      "1x Motorized Dump Truck with Swappable Chassis",
      "1x Quarry Rock Loading Station with Working Hand-Cranked Conveyor",
      "Customizable Modular Track Sections & Ramp Risers",
      "Set of Realistic Molded Rock Boulders",
      "Instruction & Blueprint Play Guide"
    ],
    specs: {
      age: "Ages 3+",
      material: "Ultra-Durable, Non-Toxic ABS Plastic",
      power: "Motorized Vehicle Chassis"
    }
  },

  "thoson-lingo": {
    newHandle: "toddsiq-lingo",
    title: "ToddsIQ™ Lingo™",
    type: "Phonics Learning Set",
    categories: ["Reading", "STEM & Learning"],
    ages: ["Ages 1-3", "Ages 3-5"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "Forty little books, one massive milestone: reading independently. ToddsIQ™ Lingo™ is a premier set of 40 Read & Rhyme phonics flip books where kids physically turn letter flaps to sound out words, discover rhyming patterns, and decode phonics families. Designed with early childhood educators to turn sounding-out into an intuitive, playful game.",
    highlights: [
      "Master 40 Core Phonics Families — Covers CVC words, short/long vowels, Magic E, blends, and digraphs.",
      "Tactile Letter-Flipping Design — Hands-on interaction cements muscle memory and phonemic awareness.",
      "Self-Correcting Visual Clues — Full-color illustrations help children verify word meanings independently.",
      "Screen-Free Early Literacy — Replaces passive flashcard drills with delightful, confidence-boosting practice."
    ],
    optionsBreakdown: [
      "<strong>Complete 40-Book Phonics Library:</strong> All 40 progressive flip books spanning Stage 1 beginner phonics to Stage 4 early reader sentences."
    ],
    whatsIncluded: [
      "40x Spiral-Bound Phonics & Word Family Flip Books",
      "Illustrated Word Family Guide & Sounding-Out Card",
      "Compact Sturdy Storage Box"
    ],
    specs: {
      age: "Ages 3+ (Great for 3 to 7)",
      material: "Tear-Resistant Laminated Heavy-Stock Cardboard",
      curriculum: "Orton-Gillingham & Montessori Aligned"
    }
  },

  "thoson-spark-™": {
    newHandle: "toddsiq-spark",
    title: "ToddsIQ™ Spark™",
    type: "Electronic Logic Game",
    categories: ["STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Their first circuit, their first 'it works!' ToddsIQ™ Spark™ is a smart electronic logic board where kids snap in tactile function modules to solve real electrical circuit puzzles. With 5 function modules and 500+ progressive puzzle combinations, challenges scale naturally from beginner connections at age 5 to multi-step logic challenges for older kids.",
    highlights: [
      "500+ Progressive Puzzle Combinations — Automatically detects solutions and provides instant light & sound feedback.",
      "Snap-in Modular Electronics — Teaches sequencing, conductivity, logic gates, and safe low-voltage circuitry.",
      "Self-Paced Screen-Free Problem Solving — Encourages persistence, critical reasoning, and scientific curiosity.",
      "USB Rechargeable & Portable — Great for home STEM labs, travel, and quiet afternoon focus."
    ],
    optionsBreakdown: [
      "<strong>Complete Spark Logic Lab:</strong> Master electronic console, 5 snap-in logic modules, and challenge booklet."
    ],
    whatsIncluded: [
      "1x Smart Electronic Logic Base Board",
      "5x Modular Function & Sensor Blocks",
      "USB Quick Charging Cable",
      "Spiral Challenge Book with 500+ Leveled Challenges"
    ],
    specs: {
      age: "Ages 5–10",
      material: "BPA-Free Heavy-Duty ABS Plastic",
      power: "USB Rechargeable Lithium Battery"
    }
  },

  "thoson-bot-full-pack™": {
    newHandle: "toddsiq-bot-full-pack",
    title: "ToddsIQ™ Bot - Full Pack™",
    type: "Drawing Robot Kit",
    categories: ["Arts & Crafts", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "A smart companion robot that transforms 'I can't draw' into 'look what I created!' ToddsIQ™ Bot speaks with a warm, encouraging voice and draws alongside children stroke by stroke. Insert any card, and the Bot breaks complex figures into simple, repeatable lines — nurturing creative confidence, fine motor control, and early robotics intuition.",
    highlights: [
      "Step-by-Step Audio & Visual Guidance — Clear, friendly voice prompts teach letter tracing, animals, and objects.",
      "100 Progressive Drawing & Learning Cards — Spans alphabet writing, numbers, geometric shapes, and charming artwork.",
      "Encourages Fine Motor Precision — Builds pencil grip, hand-eye coordination, and spatial visualization.",
      "100% Screen-Free Robotics — No mobile apps, Wi-Fi, or tablet screens needed."
    ],
    optionsBreakdown: [
      "<strong>Sky Blue Edition:</strong> Full pack with Sky Blue robot, 100 cards, and washable markers.",
      "<strong>Petal Pink Edition:</strong> Full pack with Blossom Pink robot, 100 cards, and washable markers."
    ],
    whatsIncluded: [
      "1x ToddsIQ™ Interactive Drawing Robot",
      "100x RFID-Scannable Step-by-Step Drawing Cards",
      "2x Child-Safe Washable Drawing Markers",
      "1x USB-C High-Speed Charging Cable",
      "1x Beginner Drawing Pad"
    ],
    specs: {
      age: "Ages 3+",
      material: "Eco-Friendly Drop-Resistant ABS",
      power: "Rechargeable USB-C Battery (up to 4.5 hrs runtime)"
    }
  },

  "thoson-microscope-explorer™": {
    newHandle: "toddsiq-microscope-explorer",
    title: "ToddsIQ™ MicroScope Explorer™",
    type: "Kids Microscope Kit",
    categories: ["STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Reveal the microscopic wonders hidden in plain sight. ToddsIQ™ MicroScope Explorer™ puts real scientific observation into young researchers' hands. With high-clarity optical glass and dual LED illumination, kids can inspect garden leaves, insect wings, fabric fibers, and everyday textures with professional magnification.",
    highlights: [
      "Precision Optical Magnification — Clear zoom capabilities designed specifically for children's eyes.",
      "Dual LED Top & Bottom Illumination — Ensures bright, crisp views of both transparent and solid specimens.",
      "Handheld & Tabletop 2-in-1 Versatility — Detach for outdoor backyard expeditions or mount to the observation stand.",
      "Inspires Lifelong Scientific Curiosity — Turns everyday surroundings into exciting biology investigations."
    ],
    optionsBreakdown: [
      "<strong>Complete Explorer Set:</strong> Portable digital/optical microscope, specimen slides, tweezers, and field lab tools."
    ],
    whatsIncluded: [
      "1x High-Resolution Explorer Microscope Unit",
      "1x Desktop Stand with Precision Focusing Stage",
      "Prepared Biological Specimen Slides & Blank Slides",
      "Field Collection Tweezers, Dropper, and Sample Vials",
      "Young Scientist's Field Journal & Guide"
    ],
    specs: {
      age: "Ages 5+",
      material: "Durable Optical Grade Acrylic & Impact-Resistant ABS",
      power: "Rechargeable LED Illumination"
    }
  },

  "snaptalk-duo": {
    newHandle: "toddsiq-snaptalk-duo",
    title: "ToddsIQ™ SnapTalk Duo™",
    type: "Kids Video Walkie-Talkies",
    categories: ["STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Their very first phone call — completely free of smartphones, social media, and internet hazards. ToddsIQ™ SnapTalk Duo™ is a pair of kid-sized, durable video walkie-talkies featuring crisp two-way audio and live video streaming. Whether executing secret indoor missions or exploring the backyard, kids stay happily connected and active.",
    highlights: [
      "Real-Time Two-Way Audio & Video — See and hear each other with vibrant color screens and push-to-talk simplicity.",
      "Zero Internet, Zero Apps, 100% Private — Direct encrypted wireless link protects children's privacy entirely.",
      "Outdoor Extended Range — Powerful connection penetrates walls, across floors, and extends into the yard.",
      "Rechargeable Convenience — Built-in lithium batteries eliminate constant AAA battery shopping."
    ],
    optionsBreakdown: [
      "<strong>Both Blue:</strong> Pair of 2 Cobalt Blue walkie-talkie handsets.",
      "<strong>Both Pink:</strong> Pair of 2 Sakura Pink walkie-talkie handsets.",
      "<strong>Blue + Pink:</strong> Duo combo with 1 Cobalt Blue and 1 Sakura Pink handset."
    ],
    whatsIncluded: [
      "2x SnapTalk Video Walkie-Talkie Handsets",
      "2x Secure Breakaway Safety Lanyards",
      "1x Dual USB-C Charging Cable",
      "Quick-Start Mission Guide"
    ],
    specs: {
      age: "Ages 5+",
      range: "Up to 500 meters direct point-to-point link",
      power: "Built-In Rechargeable Lithium Batteries"
    }
  },

  "thoson-fracsnap™": {
    newHandle: "toddsiq-fracsnap",
    title: "ToddsIQ™ FracSnap™",
    type: "Fraction Learning Set",
    categories: ["STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Fractions kids can hold, touch, and understand instantly. ToddsIQ™ FracSnap™ is an award-winning magnetic fraction learning book packed with 102 color-coded magnetic tiles (circles and bars from 1 whole down to 1/12). By physically snapping pieces into place, kids visually see that two quarters equal a half — turning elementary school's hardest math topic into intuitive fun.",
    highlights: [
      "102 Color-Coded Magnetic Tiles — Includes both circular pie slices and rectangular fraction bars.",
      "Concrete Visual Understanding — Bridges abstract numbers with tangible geometry for lasting mastery.",
      "Foldable Magnetic Activity Book — Keep pieces organized and securely attached during travel or study.",
      "Classroom & Homeschool Favorite — Eliminates math frustration, anxiety, and tears."
    ],
    optionsBreakdown: [
      "<strong>Complete Magnetic Fraction Set:</strong> 102 magnetic pieces with deluxe trifold magnetic workbook."
    ],
    whatsIncluded: [
      "1x Deluxe Magnetic Trifold Learning Book",
      "102x Precision Magnetic Fraction Tiles & Circles (1/1 to 1/12)",
      "Fraction Equivalence Challenge Sheet"
    ],
    specs: {
      age: "Ages 4–10 (Preschool to Grade 5)",
      material: "Soft-Touch Waterproof EVA Foam with Embedded Magnetic Backing",
      standards: "Common Core & Montessori Math Aligned"
    }
  },

  "thoson-pippo": {
    newHandle: "toddsiq-pippo",
    title: "ToddsIQ™ Pippo™",
    type: "Talking Flash Cards",
    categories: ["Reading", "Sensory", "STEM & Learning"],
    ages: ["Ages 1-3", "Ages 3-5"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "Meet Pippo, the adorable talking puppy who turns toddler pointing into expressive vocabulary. Insert any card, and Pippo speaks the word in warm, native pronunciation accompanied by playful real-life sound effects (woofs, honks, and animal sounds). A repeat button lets toddlers practice independently at their own pace without screens.",
    highlights: [
      "73 Double-Sided Flash Cards (146 Words) — Animals, vehicles, foods, colors, family members, and everyday objects.",
      "Realistic Sound Effects — Hear real animal calls and vehicle sirens that ignite toddler laughter and imitation.",
      "Gentle Speech Therapy Design — Encourages language development, speech articulation, and cognitive naming.",
      "Screen-Free Independent Play — Lightweight, ergonomic shape built perfectly for tiny toddler hands."
    ],
    optionsBreakdown: [
      "<strong>Standard Puppy Reader:</strong> Puppy talking audio reader device with 73 double-sided cards."
    ],
    whatsIncluded: [
      "1x ToddsIQ™ Pippo Puppy Audio Device",
      "73x Double-Sided Heavy Duty Flash Cards (146 vocabulary words)",
      "1x USB Charging Cable",
      "Parent Language Milestones Guide"
    ],
    specs: {
      age: "Ages 1–4",
      material: "Shatter-Resistant, Smooth-Edged ABS",
      power: "Rechargeable Lithium Battery (4+ hours continuous play)"
    }
  },

  "thoson-clash": {
    newHandle: "toddsiq-clash",
    title: "ToddsIQ™ Clash™",
    type: "Remote Control Toy",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Two motorized robotic snakes, two remotes, one high-energy battle arena. ToddsIQ™ Clash™ turns the living room floor into an exhilarating chase. As snakes slither across the room, they 'swallow' magnetic food blocks that automatically lock onto their tails — making them grow longer before your eyes. Whoever collects the longest tail wins!",
    highlights: [
      "Magnetic Growth Mechanic — Tail blocks lock on automatically when bumped, providing clear visual scoring.",
      "Smooth Omnidirectional Slithering — Realistic undulating serpentine movement with bright glowing LED eyes.",
      "Simultaneous 2-Player Head-to-Head RC — Independent 2.4GHz remotes prevent signal interference.",
      "Rechargeable Action — Both snakes charge quickly via USB, keeping the competition running without battery waste."
    ],
    optionsBreakdown: [
      "<strong>2-Player Battle Arena Set:</strong> Includes 1 Yellow Snake, 1 Green Snake, 2 Remote Controllers, and 16 Magnetic Food Blocks."
    ],
    whatsIncluded: [
      "2x Motorized RC Robotic Snakes (Yellow & Green)",
      "2x Ergonomic 2.4GHz Remote Controllers",
      "16x Magnetic Prey / Tail Extension Blocks",
      "2x USB Charging Cables"
    ],
    specs: {
      age: "Ages 6+",
      material: "Reinforced ABS Plastic with Secure Magnet Enclosures",
      power: "USB Rechargeable Snakes (Remotes take 2x AAA batteries each)"
    }
  },

  "thoson-lizard-play-pack™": {
    newHandle: "toddsiq-lizard-play-pack",
    title: "ToddsIQ™ Lizard - Play Pack™",
    type: "Remote Control Toy",
    categories: ["STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Defy gravity on walls, glass windows, and ceilings! The ToddsIQ™ Lizard is an astonishing vacuum-suction remote control gecko that scampers vertically up smooth surfaces with realistic leg-scuttling motion. Sized for small hands, it provides instant thrills that get kids up and moving around the house.",
    highlights: [
      "Patented Wall-Climbing Vacuum Suction — Drives smoothly up walls, sliding glass doors, mirrors, and ceilings.",
      "Dual Ground & Wall Modes — Switch to ground mode for speedy drift turns across hardwood and tile.",
      "Glowing LED Eyes & Scuttling Legs — Mesmerizing lifelike reptile animation that delights kids and pets alike.",
      "USB Quick Recharge — Conveniently recharges in minutes for non-stop vertical chase adventures."
    ],
    optionsBreakdown: [
      "<strong>Complete Play Pack:</strong> Wall-climbing gecko lizard, 2.4GHz remote controller, and charging cable."
    ],
    whatsIncluded: [
      "1x Gravity-Defying Wall-Climbing Gecko",
      "1x Multi-Directional Infrared/2.4G Remote",
      "1x USB Fast Charger Cable",
      "User Manual & Surface Prep Guide"
    ],
    specs: {
      age: "Ages 3+",
      material: "Lightweight High-Strength Aerodynamic ABS",
      power: "USB Rechargeable Internal Battery"
    }
  },

  "thoson-relay": {
    newHandle: "toddsiq-relay",
    title: "ToddsIQ™ Relay™",
    type: "Car Adventure Track",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Pure mechanical engineering where nothing moves without your child's hands. Press a lever to launch a car to the magnetic helicopter; turn a crank to climb the steep conveyor; twist a knob to rotate the turntable toward the bridge. ToddsIQ™ Relay™ has zero batteries and zero screens — just 6 tactile stations of physical cause-and-effect problem solving.",
    highlights: [
      "100% Battery-Free Mechanical Engineering — Every lift, twist, and turn is powered solely by children's hands.",
      "6 Interactive Control Stations — Teaches mechanical sequence, timing, coordination, and physical physics.",
      "Includes 6 Mini Adventure Vehicles — Rescue cars, police, fire engines, and trucks keep stories dynamic.",
      "Tabletop Space-Saving Footprint — Compact 10x10-inch base sits neatly on play tables and stores easily."
    ],
    optionsBreakdown: [
      "<strong>Tabletop Adventure Track:</strong> Master mechanical track console with 6 mini vehicles and magnetic rescue helicopter."
    ],
    whatsIncluded: [
      "1x Tabletop Mechanical Raceway Track Console",
      "6x Die-Cast Style Mini Adventure Cars",
      "1x Magnetic Rescue Helicopter Crane",
      "Conveyor Belt, Turntable, Elevator, and Bridge Assembly"
    ],
    specs: {
      age: "Ages 3+",
      material: "Heavy-Duty ABS Plastic, Smooth Polished Edges",
      power: "100% Mechanical (No batteries required)"
    }
  },

  "thoson-squishblocks": {
    newHandle: "toddsiq-squishblocks",
    title: "ToddsIQ™ SquishBlocks™",
    type: "Soft Building Blocks",
    categories: ["Building", "Sensory"],
    ages: ["Ages 1-3", "Ages 3-5"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "Building blocks that squish, squeeze, and connect back! ToddsIQ™ SquishBlocks™ combine open-ended construction play with soothing sensory tactile feedback. Made from velvety food-grade silicone, these soft blocks stack, interlock, bend, and pop — making them the perfect calming, frustration-free building set for toddlers and preschoolers.",
    highlights: [
      "Ultra-Soft Food-Grade Silicone — Safe for teething gums, quiet when dropped, and 100% dishwasher safe.",
      "Interlocking Suction & Peg Connectors — Snap together with gentle tactile feedback that rewards small fingers.",
      "Sensory Calming Textures — Textured geometric faces promote tactile exploration and emotional regulation.",
      "Bathtub, Floor & Travel Friendly — Works in water, sticks to windows and high chairs, and packs compactly."
    ],
    optionsBreakdown: [
      "<strong>Complete Sensory Block Set:</strong> Full collection of soft interlocking blocks in vibrant developmental colors."
    ],
    whatsIncluded: [
      "Full Set of Soft Interlocking Sensory SquishBlocks",
      "Breathable Mesh Storage & Wash Bag",
      "Early Shape & Stacking Guide"
    ],
    specs: {
      age: "Ages 12 Months to 5 Years",
      material: "100% Food-Grade BPA-Free & Phthalate-Free Silicone",
      care: "Dishwasher Safe & Boil-Proof"
    }
  },

  "thoson-magic-gel": {
    newHandle: "toddsiq-magic-gel",
    title: "ToddsIQ™ Magic Gel™",
    type: "3D Craft Gel Kit",
    categories: ["Arts & Crafts", "Sensory"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Squeeze liquid colors into molds, dip into magic water, and watch them solidify into squishy 3D toy creatures! ToddsIQ™ Magic Gel™ is an astonishing hands-on chemistry craft kit that turns art into three-dimensional squishy figurines kids can play with forever. A non-toxic, mess-free alternative to sticky slime.",
    highlights: [
      "Instant Water-Activated Transformation — Liquid gels transform into 3D squishies in under 3 minutes.",
      "Develops Fine Motor Grip & Patience — Squeezing precision nozzles builds hand strength for writing.",
      "100% Non-Toxic & Odorless — Made from eco-friendly sodium alginate and calcium lactate minerals.",
      "Contains the Mess in the Bin — No sticky residue on carpets, furniture, or clothes."
    ],
    optionsBreakdown: [
      "<strong>Deluxe 30-Piece Full Pack:</strong> Complete chemistry craft studio with multiple squeeze colors, molds, and magic powder."
    ],
    whatsIncluded: [
      "Multi-Color Magic Gel Squeeze Bottles with Precision Tips",
      "Assorted Themed 3D Molds (Sea Creatures, Dinosaurs, Animals)",
      "Magic Setting Mineral Powder Packs",
      "Dipping Tray, Strainer Net, and Storage Container"
    ],
    specs: {
      age: "Ages 3+",
      safety: "Non-Toxic, Skin-Safe, Eco-Friendly Mineral Formula",
      type: "STEM Chemistry & Creative Art"
    }
  },

  "thoson-buildbox": {
    newHandle: "toddsiq-buildbox",
    title: "ToddsIQ™ BuildBox™",
    type: "Kids Tool Set",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "A real carpenter's workbench sized for capable little hands. ToddsIQ™ BuildBox™ equips junior builders with working, child-safe tools: an electric drill, realistic wrench, hammer, bolts, and interlocking wooden plates. The rugged toolbox cleverly folds out into a sturdy tabletop workbench and stool, then packs everything up in seconds.",
    highlights: [
      "Working 2-Way Electric Drill — Features realistic forward and reverse action for screwing bolts into plates.",
      "Convertible 3-in-1 Design — Transforms seamlessly between Portable Tool Carrier, Workbench, and Sturdy Seat.",
      "Real Mechanical Fasteners — Teaches rotational mechanics, fastener alignment, and spatial assembly.",
      "Encourages Imaginative Construction — Builds independence and pride as children fix and build their own creations."
    ],
    optionsBreakdown: [
      "<strong>Classic Blue Edition:</strong> Complete convertible workbench set in vibrant Royal Blue & Yellow.",
      "<strong>Pastel Pink Edition:</strong> Complete convertible workbench set in soft Rose & Mint accents."
    ],
    whatsIncluded: [
      "1x Convertible 3-in-1 Tool Box Workbench",
      "1x Battery-Powered Child-Safe Reversible Drill with Bits",
      "Hand Tools: Wrench, Screwdriver, Saw, Hammer",
      "Assorted Screws, Nuts, Pegs, and Building Plates",
      "Project Assembly Idea Cards"
    ],
    specs: {
      age: "Ages 3+",
      material: "Smooth-Polished, High-Impact ABS Plastic",
      drillPower: "2x AA Batteries (not included)"
    }
  },

  "thoson-lettercrew™": {
    newHandle: "toddsiq-lettercrew",
    title: "ToddsIQ™ LetterCrew™",
    type: "Alphabet Learning Set",
    categories: ["Reading", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Bring letters out of textbooks and straight into their hands. ToddsIQ™ LetterCrew™ pairs 52 smooth solid-wood letter blocks with 28 illustrated word cards. Kids slide a card into the wooden tray, sound out each phonetic symbol, and physically assemble the letters to spell the word. Hands-on multisensory spelling practice that feels like play.",
    highlights: [
      "52 Solid Natural Beechwood Letters — Generously sized blocks with rounded, splinter-free edges.",
      "28 Double-Sided Illustrated Cards — Covers high-frequency CVC words, animals, and household objects.",
      "Tactile Wooden Spelling Tray — Keeps cards and letter blocks organized while children work.",
      "Montessori Reading Foundation — Accelerates letter recognition, phonics blending, and spelling mastery."
    ],
    optionsBreakdown: [
      "<strong>Complete LetterCrew Spelling Set:</strong> 52 wooden uppercase/lowercase blocks, 28 double-sided cards, and wooden display stand."
    ],
    whatsIncluded: [
      "52x Precision-Carved Solid Wood Letter Blocks",
      "28x Double-Sided Laminated Word Cards (56 spelling exercises)",
      "1x Solid Wood Word Slot Display Stand",
      "Canvas Travel Drawstring Bag"
    ],
    specs: {
      age: "Ages 3+",
      material: "100% Natural Sustainable Hardwood & Non-Toxic Water-Based Paints",
      certifications: "ASTM & EN71 Child Safety Certified"
    }
  },

  "thoson-chime": {
    newHandle: "toddsiq-chime",
    title: "ToddsIQ™ Chime™",
    type: "Wooden Marble Run",
    categories: ["Sensory", "Building"],
    ages: ["Ages 1-3", "Ages 3-5"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "The heirloom wooden toy that calms the entire room. ToddsIQ™ Chime™ is a solid-wood musical marble tree: drop a marble at the crown, and it cascades gracefully down cascading rainbow leaves, releasing a soft, hypnotic xylophone-like ding at every tier. Mesmerizing to watch, deeply soothing to hear, and handsome enough to sit proudly on any living-room shelf.",
    highlights: [
      "Calming Acoustic Ding — Generates gentle, harmonic musical tones that soothe overstimulated children.",
      "Montessori Visual Tracking — Builds focus, smooth eye tracking, and patience as balls spiral down.",
      "Solid Natural Beechwood Construction — Crafted with heirloom quality for years of durable family use.",
      "Zero Batteries, Zero Screens — A peaceful wind-down activity before bedtime or quiet time."
    ],
    optionsBreakdown: [
      "<strong>Heirloom Wooden Musical Tree:</strong> Solid wood cascading tree tower with set of polished wooden rolling balls."
    ],
    whatsIncluded: [
      "1x Handcrafted Solid Wood Musical Tree Tower (Rainbow Tiered Petals)",
      "Sturdy Broad Base with Ball-Catch Basin",
      "Set of Smooth Polished Wooden Marbles/Balls",
      "Pre-Assembled and Ready for Play"
    ],
    specs: {
      age: "Ages 3+ (Supervised play for younger toddlers)",
      material: "Sustainably Sourced Beechwood with Non-Toxic Water Paints",
      height: "Approx. 28 inches tall"
    }
  },

  "thoson-100-000-whys™": {
    newHandle: "toddsiq-100-000-whys",
    title: "ToddsIQ™ 100,000 Whys™",
    type: "Illustrated Q&A Book",
    categories: ["Reading", "STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "For the child who asks 'why?' 400 times a day — finally, an encyclopedia that keeps up. ToddsIQ™ 100,000 Whys™ answers real kids' questions across 6 core science disciplines: Astronomy & Space, Planet Earth, Modern Technology, Plants, Animals, and the Human Body. Vibrant comic-strip illustrations transform complex scientific phenomena into captivating bedtime stories.",
    highlights: [
      "Curated Scientific Explanations — Explains everyday mysteries in clear, age-appropriate, fascinating language.",
      "Vibrant Comic-Strip Visuals — Keeps reluctant readers glued to every page well past bedtime.",
      "6 Science Themes in One Volume — Deepens knowledge of biology, physics, astronomy, and technology.",
      "Encourages Inquisitive Minds — Nurtures critical thinking, curiosity, and reading stamina."
    ],
    optionsBreakdown: [
      "<strong>Hardcover Science Encyclopedia:</strong> Deluxe full-color illustrated volume spanning 6 science domains."
    ],
    whatsIncluded: [
      "1x Deluxe Full-Color Hardcover '100,000 Whys' Science Book",
      "Ribbon Bookmark & Interactive Quiz Challenges"
    ],
    specs: {
      age: "Ages 6–12",
      format: "Hardcover, Heavy-Weight Glossy Paper",
      pages: "Over 200 Illustrated Pages"
    }
  },

  "thoson-aquadoodle-book™": {
    newHandle: "toddsiq-aquadoodle-book",
    title: "ToddsIQ™ AquaDoodle Book™",
    type: "Water Drawing Book",
    categories: ["Arts & Crafts", "Sensory"],
    ages: ["Ages 1-3", "Ages 3-5"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "The drawing book that never runs out of ink — and never leaves a mess on your sofa. With ToddsIQ™ AquaDoodle Book™, kids draw using only pure tap water. Vibrant colors magically appear as the brush touches the page, then gently fade clear as the water dries after 5 minutes — ready to be drawn on all over again!",
    highlights: [
      "100% Mess-Free Water Magic — Zero ink, zero stains on clothing, hands, car seats, or walls.",
      "Infinite Reusable Pages — Dries clear automatically in 5–10 minutes for endless creative cycles.",
      "Travel-Friendly Spiral Binding — Perfect for airplanes, long road trips, and restaurant table quiet time.",
      "Develops Pencil Grip & Stroke Control — Thick water pens designed specifically for beginner toddler grasps."
    ],
    optionsBreakdown: [
      "<strong>Reusable Water Doodle Book:</strong> Spiral-bound activity book with refillable water pen."
    ],
    whatsIncluded: [
      "1x Spiral-Bound Heavy-Duty Reusable AquaDoodle Book",
      "2x Refillable Chunky Water Magic Pens with Soft Tips",
      "Hidden Picture Activity Guide"
    ],
    specs: {
      age: "Ages 18 Months to 5 Years",
      material: "Water-Activated Multi-Layered Polymer Board",
      maintenance: "Fill pen with clean tap water; air dry book"
    }
  },

  "nestwood-full-pack™": {
    newHandle: "toddsiq-nestwood-full-pack",
    title: "ToddsIQ™ NestWood - Full Pack™",
    type: "Wooden Puzzle Blocks",
    categories: ["Building", "Sensory"],
    ages: ["Ages 1-3", "Ages 3-5"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "Forty-two natural wooden Tetris-style geometric blocks, one deceptively engaging challenge: make them all fit into the tray! ToddsIQ™ NestWood™ turns abstract spatial reasoning and geometric problem-solving into soothing, tactile play. Children rotate, flip, and plan their moves until every piece clicks into place, or freely build 3D animal and castle sculptures.",
    highlights: [
      "42 Solid Wood Geometric Shapes — Tangram-style pieces in rainbow pastels with velvety smooth finishes.",
      "Montessori Spatial Reasoning — Challenges hand-eye coordination, mental rotation, and logical planning.",
      "2-in-1 Flat Puzzle & 3D Building Set — Use inside the tray as a brain teaser or stand upright as architectural blocks.",
      "Quiet-Time Screen-Free Focus — Proven to captivate toddlers and preschoolers during afternoon calm time."
    ],
    optionsBreakdown: [
      "<strong>Full Pack Wooden Puzzle Set:</strong> 42 solid wood blocks with wooden display tray and challenge cards."
    ],
    whatsIncluded: [
      "42x Precision-Milled Wooden Geometric Puzzle Blocks",
      "1x Solid Wood Beveled Frame Tray",
      "Tangram Pattern Guide with 50+ 2D & 3D Building Ideas"
    ],
    specs: {
      age: "Ages 3+ (Toddlers & Preschoolers)",
      material: "Natural Renewable Hardwood & Non-Toxic Matte Water Paints",
      certifications: "Meets All International Child Toy Safety Standards"
    }
  },

  "thoson-blocks-full-pack™": {
    newHandle: "toddsiq-blocks-full-pack",
    title: "ToddsIQ™ Blocks - Full Pack™",
    type: "Magnetic Building Blocks",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 1-3", "Ages 3-5", "Ages 5+"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Castles, spaceships, towering fortresses, and fantasy kingdoms: ToddsIQ™ Blocks are ultra-strong magnetic cube blocks that snap together effortlessly from every side. With internal sound-rattling magnets that rotate to connect without polarity frustration, kids can construct genuine 3D structures with rock-solid stability.",
    highlights: [
      "360-Degree Omnidirectional Magnetism — Magnets swivel internally so cubes snap together on all 6 faces without repelling.",
      "Tactile Click Feedback — Satisfying snap sounds reinforce fine motor connections and structural engineering.",
      "Ultrasonic Welded Safety — Completely sealed cubes prevent magnets from ever dislodging or exposing.",
      "The Ultimate Open-Ended Construction Toy — Compatible with all major magnetic cube brands."
    ],
    optionsBreakdown: [
      "<strong>Royal Empire:</strong> Majestic gold, purple, and stone fortress themed blocks.",
      "<strong>Ocean Castle:</strong> Deep sea blues, turquoise, and coral reef blocks.",
      "<strong>Rainbow Palace:</strong> Vibrant primary & rainbow prism blocks.",
      "<strong>Starlight Unicorn:</strong> Magical pastel pink, lilac, and mint blocks.",
      "<strong>Hero Fire Station:</strong> Emergency red, white, and warning yellow blocks.",
      "<strong>Construction Crew:</strong> Builder yellow, hazard orange, and concrete grey blocks.",
      "<strong>Arctic Adventure:</strong> Glacial white, frost blue, and iceberg blocks.",
      "<strong>Fire & Ice Clash:</strong> Dynamic contrast of flame orange and crystal blue blocks.",
      "<strong>Pirate Adventure:</strong> Timber brown, treasure gold, and skull black blocks.",
      "<strong>Woodland Adventure:</strong> Forest greens, bark brown, and leaf blocks."
    ],
    whatsIncluded: [
      "Full Pack Magnetic Building Cube Set (Themed Color Palette)",
      "Idea Inspiration Poster with 40+ Architectural Models",
      "Durable Storage Box"
    ],
    specs: {
      age: "Ages 3–12",
      material: "Food-Grade Ultrasonic-Sealed ABS, Rare Earth Neodymium Magnets",
      blockDimensions: "Standard 0.8 in (2 cm) Cubes"
    }
  },

  "thoson-sandlab": {
    newHandle: "toddsiq-sandlab",
    title: "ToddsIQ™ Sandlab™",
    type: "Sensory Sand Kit",
    categories: ["Sensory", "Arts & Crafts"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "The sensory beach experience that cleans itself up! ToddsIQ™ Sandlab™ packs premium kinetic moldable play sand, excavation tools, and glow-in-the-dark gemstone treasures into an all-in-one storage case that snaps shut in seconds. All the therapeutic joy of sandbox play with none of the indoor mess.",
    highlights: [
      "Never Dries Out Kinetic Sand — Sticks only to itself, flowing like liquid silk through little fingers without adhering to skin.",
      "Snap-Shut Mess-Free Play Case — Opens into a dedicated sandbox station and closes securely for instant cleanup.",
      "Glow-in-the-Dark Treasure Gems — Turn lights down for exciting excavation hunts and nighttime sensory wonder.",
      "Sensory Calming & Regulating — Squeezing and molding relieves anxiety, boosts focus, and strengthens hand grip."
    ],
    optionsBreakdown: [
      "<strong>Complete Sandlab Studio:</strong> Snap-close portable sandbox bin, moldable sensory sand, glow stones, and sculpting tools."
    ],
    whatsIncluded: [
      "1x Heavy-Duty Latching Sensory Sand Tray & Storage Bin",
      "Premium Kinetic Moldable Play Sand",
      "Set of Glow-in-the-Dark Polished Gemstones",
      "4x Castle & Creature Molds, Sculpting Rake and Spade"
    ],
    specs: {
      age: "Ages 3+",
      material: "Non-Toxic Natural Sand with Polymeric Binder, BPA-Free Tray",
      cleaning: "Wipes clean with damp cloth; sand never dries"
    }
  },

  "thoson-wordplay": {
    newHandle: "toddsiq-wordplay",
    title: "ToddsIQ™ WordPlay™",
    type: "Word-Building Game",
    categories: ["Reading", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Spelling practice they mistake for an exciting board game. ToddsIQ™ WordPlay™ turns letter cubes into game tiles that kids combine, swap, and race to form into words. Featuring an interactive card-holder tray with an ingenious peek-a-boo flap, children can test their spelling before uncovering the answer for instant validation.",
    highlights: [
      "Ingenious Flap-Cover Word Tray — Conceals the written word while kids spell, then flips open for self-checking.",
      "Multi-Level Word Cards — Spans 3-letter CVC words up to 5-letter advanced vocabulary.",
      "Spelling, Phonics & Memory in One — Combines picture recognition with tactile letter manipulation.",
      "Solo or Sibling Race Play — Great for independent daily practice or friendly head-to-head word challenges."
    ],
    optionsBreakdown: [
      "<strong>Ocean Blue Edition:</strong> Word-matching tray and card set in Royal Ocean Blue.",
      "<strong>Blossom Pink Edition:</strong> Word-matching tray and card set in Blossom Rose Pink."
    ],
    whatsIncluded: [
      "1x Interactive Word-Building Console with Answer Flap",
      "30x Double-Sided Flash Cards (60 Progressive Words)",
      "8x Tactile Letter Rolling Blocks",
      "Quick Play Rule Sheet"
    ],
    specs: {
      age: "Ages 3–8",
      material: "BPA-Free Durable ABS with Rounded Child-Safe Edges",
      skills: "Letter Recognition, Phonics, Spelling, Working Memory"
    }
  },

  "spell-play-full-pack™": {
    newHandle: "toddsiq-spell-play-full-pack",
    title: "ToddsIQ™ Spell & Play - Full Pack™",
    type: "Spelling & Reading Set",
    categories: ["Reading", "STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "The breakthrough moment when letters stop being abstract symbols and become tools kids can hold and command. ToddsIQ™ Spell & Play™ turns early literacy into an intuitive tactile game: pick a flash card, find the corresponding wooden character rods, and snap them into place to construct real words and equations.",
    highlights: [
      "Multi-Sensory Kinesthetic Learning — Bridges visual card cues with physical letter positioning.",
      "Builds Confident Early Readers — Eliminates tedious worksheets in favor of engaging puzzle play.",
      "Self-Correcting Activity Cards — Clear illustrations provide instant hints for independent self-guided learning.",
      "Sturdy Wooden Craftsmanship — Built with durable natural materials designed for years of classroom use."
    ],
    optionsBreakdown: [
      "<strong>Alphabet Edition:</strong> Full pack focused on early reading, letter recognition, and spelling.",
      "<strong>Numeric & Math Edition:</strong> Full pack focused on numbers, counting, and early addition/subtraction equations."
    ],
    whatsIncluded: [
      "Complete Set of Tactile Character Blocks / Rods",
      "Set of Double-Sided Heavyweight Illustrated Flash Cards",
      "Wooden Holding Stand & Card Slot",
      "Storage Canvas Pouch"
    ],
    specs: {
      age: "Ages 4–9",
      material: "Eco-Friendly Natural Wood & Non-Toxic Coatings",
      learningPillars: "Literacy, Numeracy, Fine Motor Coordination"
    }
  },

  "thoson-pixelforge™": {
    newHandle: "toddsiq-pixelforge",
    title: "ToddsIQ™ PixelForge™",
    type: "Magnetic Mosaic Set",
    categories: ["Building", "Arts & Crafts", "STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Pixel art reborn in natural wood and magnetic precision. ToddsIQ™ PixelForge™ provides kids with 288 magnetic wooden mosaic tiles and a framed metallic display canvas to assemble stunning pixelated characters, vehicles, retro art, and mosaics — one satisfying magnetic snap at a time.",
    highlights: [
      "288 Magnetic Wooden Pixel Tiles — Rich jewel-toned colors with powerful embedded magnets.",
      "162-Page Pattern Guide with 280+ Designs — Features game characters, animals, vehicles, and intricate geometric patterns.",
      "Framed Tabletop Display Board — Works flat on tables or props upright on the included easel stand to display creations.",
      "Exceptional Focus & Fine Motor Calming — Cultivates patient attention span, hand precision, and creative design thinking."
    ],
    optionsBreakdown: [
      "<strong>Deluxe Pixel Studio Pack:</strong> 288 wooden magnetic tiles, metallic display board with easel, and 162-page pattern book."
    ],
    whatsIncluded: [
      "288x Magnetic Wooden Color Mosaic Blocks",
      "1x Framed Magnetic Canvas Board with Display Stand",
      "1x Spiral Bound Pattern Book with 280+ Project Blueprints",
      "Velvet Storage Bag for Mosaic Tiles"
    ],
    specs: {
      age: "Ages 4–12+",
      material: "Natural Wood Tiles with Enclosed Magnetics, Powder-Coated Metal Canvas",
      dimensions: "11 x 11 in Work Canvas"
    }
  },

  "thoson-turbomonster-pack™": {
    newHandle: "toddsiq-turbomonster-pack",
    title: "ToddsIQ™ TurboMonster Pack™",
    type: "Toy Monster Trucks",
    categories: ["Sensory", "Building"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Built specifically to be revved, launched, and crashed. The ToddsIQ™ TurboMonster Pack features chunky, high-suspension monster trucks equipped with 4-wheel friction-powered inertia drives that perform gravity-defying 360-degree upright spins when encountering obstacles. Unbreakable, energetic, screen-free action.",
    highlights: [
      "Powerful Friction Inertia Drive — Push forward once and watch them tear across carpets, tiles, and grass.",
      "360-Degree Stunt Upright Spins — Hit a wall or obstacle and the truck automatically stands up and spins in circles.",
      "All-Terrain Shock-Absorbing Springs — Oversized rubberized tread wheels conquer rugs, thresholds, and outdoor dirt.",
      "100% Battery-Free — No dead batteries, no waiting on charging — ready for high-octane play anytime."
    ],
    optionsBreakdown: [
      "<strong>Multi-Pack TurboMonster Fleet:</strong> Set of colorful high-suspension friction stunt monster trucks."
    ],
    whatsIncluded: [
      "Multi-Pack Friction-Powered Stunt Monster Trucks (Assorted Vibrant Colors)",
      "High-Traction Rubberized Shock Suspension System"
    ],
    specs: {
      age: "Ages 3+",
      material: "Shatterproof Heavy-Duty ABS Body with High-Elastic Springs",
      drive: "Friction-Powered Inertia (No batteries required)"
    }
  },

  "thoson-shapecrew™": {
    newHandle: "toddsiq-shapecrew",
    title: "ToddsIQ™ ShapeCrew™",
    type: "Pattern Puzzle Set",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5"],
    ageCollections: ["Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "One hundred twenty solid wood geometric shapes, endless imaginative pictures. ToddsIQ™ ShapeCrew™ is a classic Montessori tangram pattern puzzle where children recreate colorful animals, buildings, and vehicles on a wooden frame board — or invent their own freeform artistic mosaics without a screen in sight.",
    highlights: [
      "120 Polished Wooden Geometric Blocks — Triangles, rhombuses, trapezoids, squares, and hexagons in vivid safe colors.",
      "40 Progressive Pattern Challenge Cards — Starts with beginner 1-to-1 shape outlines and advances to complex visual puzzles.",
      "Teaches Spatial Geometry & Fractions — Hands-on understanding of how smaller shapes combine into larger figures.",
      "Montessori Independent Play — Develops deep concentration, spatial organization, and self-confidence."
    ],
    optionsBreakdown: [
      "<strong>Complete Wooden Tangram Studio:</strong> 120 wooden shape tiles, 40 progressive cards, and wooden work board."
    ],
    whatsIncluded: [
      "120x Solid Wood Precision Geometric Shape Blocks",
      "40x Double-Sided Thick Pattern Challenge Cards",
      "1x Wooden Frame Play Board",
      "1x Canvas Storage Drawstring Pouch"
    ],
    specs: {
      age: "Ages 3–7",
      material: "100% Sustainably Sourced Wood with Water-Based Non-Toxic Paint",
      safety: "Smooth Beveled Edges, Non-Choking Tested"
    }
  },

  "thoson-spiderracer-duo": {
    newHandle: "toddsiq-spiderracer-duo",
    title: "ToddsIQ™ SpiderRacer Duo™",
    type: "Remote Control Stunt Cars",
    categories: ["STEM & Learning", "Building"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Two high-speed stunt cars, two independent controllers, one thrilling living-room championship! ToddsIQ™ SpiderRacer Duo™ features dual-sided tumbling RC stunt vehicles that perform 360-degree spins, flips off walls, and instant upside-down driving. Sized for kids with easy joystick controls that make racing immediate fun.",
    highlights: [
      "Double-Sided Flip & Roll Stunts — Flips over obstacles and keeps driving right side up without stopping.",
      "Independent 2.4GHz Anti-Interference — Both cars race simultaneously at top speed without signal cross-talk.",
      "High-Grip Off-Road Tires — Treads grip hardwood, carpet, asphalt, and outdoor lawn surfaces effortlessly.",
      "Active Sibling & Parent Competition — Gets children off screens and into active head-to-head racing."
    ],
    optionsBreakdown: [
      "<strong>2-Car Racing Championship Set:</strong> 2 Stunt Cars (Red & Blue), 2 Remote Controllers, and USB Charging Cables."
    ],
    whatsIncluded: [
      "2x Double-Sided RC Stunt Cars",
      "2x 2.4GHz Wireless Joystick Remote Controllers",
      "2x USB Rechargeable Car Batteries & Charging Cables",
      "Racing Cones & Track Marker Accessories"
    ],
    specs: {
      age: "Ages 5+",
      material: "Shock-Resistant Composite Polymer, Soft Rubber Tire Treads",
      speed: "Up to 12 km/h stunt speed"
    }
  },

  "thoson-mission": {
    newHandle: "toddsiq-mission-3-pack",
    title: "ToddsIQ™ Mission™ 3-Pack",
    type: "Routine Chart Set",
    categories: ["STEM & Learning", "Reading"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Transform chaotic mornings and bedtime battles into smooth, self-guided missions. The ToddsIQ™ Mission™ 3-Pack provides three dedicated tactile sliding charts: Morning Routine, Daily Tasks, and Bedtime Mission. Kids look at the intuitive picture cards, complete the step independently, and slide the satisfying button from ✗ to ✓ with zero parental nagging.",
    highlights: [
      "Visual Picture Cards (Pre-Reader Friendly) — Children who cannot read yet easily follow clear illustrated icons.",
      "Satisfying Physical Sliding Toggles — Kids love physically snapping sliders across as they accomplish tasks.",
      "Fosters Responsibility & Self-Esteem — Eliminates morning repetitive reminders while building healthy life habits.",
      "Versatile Mounting Options — Sticks magnetically to the refrigerator, hangs on the wall, or stands on a desk."
    ],
    optionsBreakdown: [
      "<strong>Deluxe 3-Pack Routine System:</strong> 3 Sliding Chart Boards (Morning, Daytime, Bedtime) with customizable magnetic activity tiles."
    ],
    whatsIncluded: [
      "3x Magnetic Slider Boards (Morning, Daytime, Bedtime)",
      "Sheet of Reusable Activity Icon Stickers (Brushing, Dressing, Homework, Chores)",
      "Blank Customization Tiles for Dry-Erase Notes",
      "Magnetic Refrigerator Backing & Desktop Stands"
    ],
    specs: {
      age: "Ages 3–10",
      material: "Sturdy ABS Frame with Magnetic Backing & Smooth Glide Sliders",
      setup: "Zero batteries, zero apps, 100% screen-free"
    }
  },

  "thoson-readladder": {
    newHandle: "toddsiq-readladder",
    title: "ToddsIQ™ ReadLadder™",
    type: "Learn-to-Read Flash Cards",
    categories: ["Reading", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "From first phonetic sounds to reading full stories, one step at a time. ToddsIQ™ ReadLadder™ is a teacher-developed progressive literacy curriculum organized across 20 leveled stages. Children climb from letter phonics to sight words to reading complete sentences — celebrating frequent, confidence-boosting milestones along the way.",
    highlights: [
      "20 Systematic Leveled Stages — Carefully scaffolds reading from basic vowels and CVC words to complex multi-syllable phrases.",
      "High-Frequency Sight Words & Decodable Phonics — Follows modern science of reading and Orton-Gillingham methods.",
      "Clear Color-Coded Ring Binders — Keeps cards organized in sequence and ready for quick 10-minute daily practice sessions.",
      "Transforms Reluctant Readers — Builds genuine confidence without academic pressure or screen fatigue."
    ],
    optionsBreakdown: [
      "<strong>Complete 20-Stage Reading System:</strong> Full 20-stage card deck with organizer rings and progress tracker."
    ],
    whatsIncluded: [
      "20 Leveled Packs of Double-Sided Reading Cards (Over 200 reading milestones)",
      "Sturdy Metal Card-Holding Rings",
      "Visual Progress Ladder Chart with Milestone Stickers",
      "Parent Quick-Coaching Guide"
    ],
    specs: {
      age: "Ages 4–8 (Preschool through 2nd Grade)",
      material: "Waterproof, Anti-Glare Heavy-Stock Cardboard with Rounded Edges",
      pedagogy: "Science of Reading Aligned"
    }
  },

  "thoson-skypop™": {
    newHandle: "toddsiq-skypop",
    title: "ToddsIQ™ SkyPop™",
    type: "Bubble Machine",
    categories: ["Sensory"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Push one button and flood the entire yard with thousands of iridescent bubbles! ToddsIQ™ SkyPop™ is an adjustable standing bubble tower (elevating from 28 to 47 inches) equipped with vibrant LED lights and cheerful music. Turns backyard playdates, birthday parties, and sunny afternoons into an active bubble-chasing wonderland.",
    highlights: [
      "Outputs 10,000+ Bubbles per Minute — High-velocity cyclone wands generate an endless skyward stream.",
      "Adjustable Height Telescoping Pole (28–47 in) — Sits at ideal heights for toddlers, kids, or elevated patio placement.",
      "Weighted Spill-Proof Base — Fillable water/sand chamber prevents enthusiastic kids or pets from tipping it over.",
      "USB-C Rechargeable — No scrambling for dozens of disposable AA batteries during outdoor events."
    ],
    optionsBreakdown: [
      "<strong>Telescoping Tower Bubble Station:</strong> Adjustable standing bubble machine with rechargeable battery and bubble solution."
    ],
    whatsIncluded: [
      "1x High-Output Automatic Bubble Motor Head with LED Lights",
      "1x Heavy-Duty Telescoping Height Pole (28 to 47 in)",
      "1x Fillable Anti-Tip Weighted Base Stand",
      "1x Bottle of Concentrated Bubble Solution",
      "1x USB-C Quick Charging Cable"
    ],
    specs: {
      age: "Ages 3+",
      features: "LED Night Illumination, Optional Music Toggle, Leak-Proof Reservoir",
      power: "Rechargeable Lithium Battery"
    }
  },

  "numbernest-full-pack™": {
    newHandle: "toddsiq-count-crew-full-pack",
    title: "ToddsIQ™ Count Crew - Full Pack™",
    type: "Counting & Math Set",
    categories: ["STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Math that lives in their hands instead of abstract worksheets. ToddsIQ™ Count Crew™ turns numbers into tangible wooden characters, counting rings, and ten-frame blocks that kids can hold, stack, and sort. Through joyful hands-on manipulation, children master number recognition, counting, and early addition with natural ease.",
    highlights: [
      "Montessori-Inspired Ten-Frame System — Teaches base-10 math visually and tangibly before kindergarten.",
      "Vibrant Weighted Number Figures — Number blocks correspond in height and weight to their numerical value.",
      "Multisensory Ring Stacking Pegs — Connects quantities with physical finger counts to build strong number sense.",
      "Eliminates Early Math Frustration — Replaces flashcard stress with intuitive, playful discovery."
    ],
    optionsBreakdown: [
      "<strong>Complete Count Crew Math Lab:</strong> Solid wood counting board, number figurines, color counting rings, and activity cards."
    ],
    whatsIncluded: [
      "1x Solid Wood Multi-Row Counting Base Board",
      "10x Wooden Number Figurines (1 to 10)",
      "55x Color-Coded Wooden Counting Rings",
      "Ten-Frame Counting Blocks & Mathematical Operator Tiles (+, -, =)",
      "20x Double-Sided Math Challenge Cards"
    ],
    specs: {
      age: "Ages 3–7",
      material: "Natural Beechwood, Smooth Hand-Finished Corners, Non-Toxic Stains",
      standards: "Montessori & Early Childhood Math Aligned"
    }
  },

  "wonder-magic-art-full-pack": {
    newHandle: "toddsiq-magic-art-full-pack",
    title: "ToddsIQ™ Magic Art - Full Pack™",
    type: "Mess-Free Coloring Set",
    categories: ["Arts & Crafts", "Sensory"],
    ages: ["Ages 3-5"],
    ageCollections: ["Preschool Toys Ages 3-5"],
    isBestseller: true,
    summary: "All the wonder of painting — with absolutely zero mess on hands, walls, or furniture. ToddsIQ™ Magic Art™ pairs reactive magic coloring paper with an interactive water/clear-gel brush. Colors and intricate illustrations emerge exclusively on the special pages, keeping couches, clothes, and carpets completely pristine.",
    highlights: [
      "100% Mess-Free Reactive Magic — Color appears only on special sheets, invisible on skin and fabric.",
      "Independent Creative Expression — Toddlers and preschoolers paint with total freedom while parents relax.",
      "Vibrant Color Revelations — Reveals hidden patterns, rich textures, and whimsical characters with every brush stroke.",
      "Ideal for Road Trips & Home Quiet Time — Compact portfolio keeps pages and pens safely contained."
    ],
    optionsBreakdown: [
      "<strong>Full Pack Studio Edition:</strong> Magic Art interactive brush, deluxe themed coloring sheets, and travel portfolio."
    ],
    whatsIncluded: [
      "1x Magic Art No-Mess Interactive Brush / Applicator",
      "Assorted Magic Reveal Coloring Pages (Animals, Fairy Tales, Vehicles)",
      "Sturdy Travel Activity Portfolio with Pen Loops"
    ],
    specs: {
      age: "Ages 3+",
      safety: "Non-Toxic, Odorless, Chemical-Free Reactive Color Formula",
      refillCompatible: "Compatible with standard Magic Art refill pads"
    }
  },

  "thoson-apex": {
    newHandle: "toddsiq-apex",
    title: "ToddsIQ™ Apex™",
    type: "Remote Control Toy",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Press one button and a mighty prehistoric T-Rex strides across the floor with swinging tail, predatory stomping claws, and realistic roaring! Press another, and glowing LED lights illuminate a cloud of cool water vapor mist rolling out of its jaws. With ToddsIQ™ Apex™, children take full command of an awe-inspiring robotic dinosaur.",
    highlights: [
      "Realistic Robotic Walking & Roaring — Stomps forward with natural articulated leg motion and dinosaur sound effects.",
      "Cool Water Vapor Mist Breath with LEDs — Add plain tap water to generate safe, illuminated dragon mist.",
      "Kid-Friendly 2.4GHz Fossil Remote — Intuitive push-button controller shaped like a fossil dinosaur footprint.",
      "Active Screen-Free Imagination — Inspires thrilling prehistoric adventures across living-room terrain."
    ],
    optionsBreakdown: [
      "<strong>Apex Walking Dinosaur:</strong> Motorized walking T-Rex with illuminated mist function and fossil remote."
    ],
    whatsIncluded: [
      "1x Motorized Walking T-Rex Robotic Dinosaur",
      "1x Fossil-Themed 2.4GHz Wireless Remote Controller",
      "1x Water Dropper Bottle for Mist Chamber",
      "Dinosaur Fact & Instruction Book"
    ],
    specs: {
      age: "Ages 3+",
      material: "Rugged Non-Toxic ABS Plastic with Detailed Textured Scales",
      power: "Battery Operated (Requires AA batteries for dinosaur & remote)"
    }
  },

  "thoson-run": {
    newHandle: "toddsiq-run",
    title: "ToddsIQ™ Run™",
    type: "Domino Train Set",
    categories: ["Building", "STEM & Learning"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Load domino tiles into the cartridge, snap it onto the motorized locomotive, and push start. The ToddsIQ™ Run™ train chugs across the room, automatically depositing tiles in perfectly spaced rows behind it — solving the one part of domino play that frustrates small fingers! Turn the chimney to steer corners, add the cactus spinner, and tap the first tile for a thrilling chain reaction.",
    highlights: [
      "Automatic Precision Tile Dispenser — Perfectly spaces dominoes behind the locomotive as it drives.",
      "Rotatable Chimney Steering — Turn the train's smokestack to steer curved serpentine paths and loops.",
      "200 Colorful Building Dominoes — With train turned off, tiles double as versatile building and counting blocks.",
      "Teaches Patience, Cause & Effect — The anticipation of the final chain reaction captivates all ages."
    ],
    optionsBreakdown: [
      "<strong>Deluxe 200-Tile Domino Set:</strong> Automated train locomotive, 200 colored tiles, 2 loading magazines, and cactus spinner."
    ],
    whatsIncluded: [
      "1x Motorized Domino Dispensing Locomotive with Sound & Headlight",
      "200x Precision ABS Domino Tiles (Assorted Bright Colors)",
      "2x Quick-Loading Domino Cartridge Magazines",
      "1x Direction-Changing Cactus Spinner Obstacle"
    ],
    specs: {
      age: "Ages 4+",
      material: "Shatterproof Smooth-Edged ABS Plastic",
      power: "Requires 2x AA Batteries (not included)"
    }
  },

  "thoson-blitz": {
    newHandle: "toddsiq-blitz",
    title: "ToddsIQ™ Blitz™",
    type: "Handheld Electronic Game",
    categories: ["Sensory", "STEM & Learning"],
    ages: ["Ages 1-3", "Ages 3-5", "Ages 5+"],
    ageCollections: ["Toddler Toys Ages 1-3", "Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "The viral sensory pop game that sharpens reflexes and keeps hands busy for hours! Silicone bubbles light up in rapid random sequences: pop them down before time expires, push the spring-loaded reset panel on the back, and advance to faster levels. With 4 game modes (Speed, Memory, Scoring, and Multiplayer), ToddsIQ™ Blitz™ delivers pure tactile satisfaction with volume control.",
    highlights: [
      "4 Engaging Game Modes — Breakout Speed Mode, Memory Sequence Challenge, High Score Mode, and Multiplayer Relay.",
      "Tactile Soft Silicone Pop Buttons — Satisfying sensory popping sensation relieves stress and fidgeting.",
      "Adjustable Volume & Silent Mode — Lower the sound in cars, silence it in restaurants, or turn it up for family games.",
      "Pocket-Sized Ergonomic Grip — Durable ABS shell shaped to fit comfortably in both toddler and adult hands."
    ],
    optionsBreakdown: [
      "<strong>Blue Cat:</strong> Playful feline design in Aqua Blue & White.",
      "<strong>Pink Rabbit:</strong> Cute bunny ears design in Sakura Rose & White.",
      "<strong>Yellow Deer:</strong> Antler design in Sunshine Yellow & White."
    ],
    whatsIncluded: [
      "1x ToddsIQ™ Blitz Handheld Quick-Push Game Console",
      "User Manual with Game Mode Rule Guides"
    ],
    specs: {
      age: "Ages 3 to Adult",
      material: "High-Grade ABS with Soft Sensory Food-Grade Silicone Bubbles",
      power: "Requires 3x AAA Batteries (not included)"
    }
  },

  "thoson-pinpoint": {
    newHandle: "toddsiq-pinpoint",
    title: "ToddsIQ™ Pinpoint™",
    type: "Floating Target Game",
    categories: ["STEM & Learning", "Sensory"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Turn on the base and watch five foam spheres float mid-air on invisible columns of air! Load a soft safety dart, take aim, and knock down the suspended targets one by one. ToddsIQ™ Pinpoint™ brings arcade-style target practice into your home, featuring individual airflow adjustment dials so you can raise, lower, and oscillate targets as skills advance.",
    highlights: [
      "Aerodynamic Floating Air Columns — Realistic physics in action as balls hover weightlessly above each vent.",
      "Individual Height Tuning Dials — Adjust airflow on each nozzle to create custom tiered difficulty challenges.",
      "Safe Soft-Foam Dart Blaster — Non-marking, soft foam darts safe for walls, windows, and indoor living rooms.",
      "Develops Focus & Hand-Eye Coordination — Teaches breath control, steady aiming, and athletic concentration."
    ],
    optionsBreakdown: [
      "<strong>Floating Target Arcade Arena:</strong> Multi-nozzle airflow base, soft foam blaster, 10 safety darts, and 10 floating target orbs."
    ],
    whatsIncluded: [
      "1x Aerodynamic Airflow Hover Target Base with 5 Vents",
      "1x Soft Foam Dart Blaster",
      "10x Soft Safety Foam Darts",
      "10x Ultralight Floating Target Foam Balls",
      "1x USB Power Cable (Also battery compatible for outdoor play)"
    ],
    specs: {
      age: "Ages 5+",
      power: "Dual Power: USB Powered or 4x AA Batteries (not included)",
      safety: "Soft Foam Darts with Blunt Tips"
    }
  },

  "thoson-phono": {
    newHandle: "toddsiq-phono",
    title: "ToddsIQ™ Phono™",
    type: "Story & Song Player",
    categories: ["Reading", "Sensory"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Modeled after a charming retro phonograph record player, ToddsIQ™ Phono™ delivers hours of enchanting stories, nursery rhymes, and calming classical music without a single screen. Place a mini vinyl disc onto the turntable, move the tone arm into position, and rich audio flows through the acoustic speaker. Includes recordable discs so family members can record personalized bedtime stories!",
    highlights: [
      "90+ Classic Audio Tracks — Includes beloved fairy tales (Cinderella, Little Mermaid), Aesop's fables, and nursery rhymes.",
      "4 Personalized Recordable Discs — Record Mom, Dad, or Grandparents reading bedtime stories or singing lullabies.",
      "100% Screen-Free Auditory Development — Fosters listening comprehension, imagination, and peaceful bedtime transitions.",
      "Authentic Tactile Phonograph Arm — Toddlers love physically moving the needle arm to start and pause audio."
    ],
    optionsBreakdown: [
      "<strong>Vintage Orange Edition:</strong> Retro phonograph in warm Tangerine & Cream.",
      "<strong>Sage Green Edition:</strong> Retro phonograph in calming Mint Sage & Cream."
    ],
    whatsIncluded: [
      "1x ToddsIQ™ Phono Record Player with Rechargeable Speaker",
      "90+ Pre-Loaded Story, Fable & Song Mini Vinyl Discs",
      "4x Custom Recordable Discs for Family Voice Memos",
      "1x USB-C Charging Cable",
      "Collector's Album Storage Box"
    ],
    specs: {
      age: "Ages 3+",
      features: "Hi-Fi Volume Limiting Speaker, Auto-Shutoff Sleep Timer",
      power: "Rechargeable Lithium Battery"
    }
  },

  "thoson-reflex": {
    newHandle: "toddsiq-reflex",
    title: "ToddsIQ™ Reflex™",
    type: "Reaction Drop Game",
    categories: ["Sensory", "STEM & Learning"],
    ages: ["Ages 5+"],
    ageCollections: ["Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Hang the bar, choose your drop speed, and press start. A friendly voice counts down '3, 2, 1...' and sticks begin falling at random intervals! Catch as many as you can before they hit the ground. ToddsIQ™ Reflex™ is an electrifying agility and reaction challenge that tests hand-eye speed for kids, teens, and parents alike.",
    highlights: [
      "Randomized Drop Sequence — Keeps players guessing with unpredictable timing and stick releases.",
      "3 Adjustable Speed Levels — Progress from beginner reaction warm-ups to lightning-fast champion mode.",
      "Solo Training or Head-to-Head Duel — Yellow sticks on one side, blue on the other for high-stakes sibling duels.",
      "Wireless Remote Controller — Start rounds from across the room or let a parent/coach trigger surprise drops."
    ],
    optionsBreakdown: [
      "<strong>Reaction Drop Agility Arena:</strong> Hanging electronic drop bar, 6 grip drop sticks, wireless remote, and hanging hooks."
    ],
    whatsIncluded: [
      "1x Smart Electronic Hanging Drop Bar",
      "6x Soft-Grip Reaction Drop Sticks (Blue & Yellow)",
      "1x Wireless Pocket Remote Control",
      "1x Suspension Rope & 2 Heavy-Duty Adhesive Wall Hooks",
      "1x USB Quick Charging Cable"
    ],
    specs: {
      age: "Ages 5 to Adult",
      features: "Audio Countdown Voice, Magnetic Catch Clips, Auto Sleep",
      power: "USB Rechargeable Bar (Remote uses CR2032 battery)"
    }
  },

  "thoson-squishy-advent": {
    newHandle: "toddsiq-squishy-advent",
    title: "ToddsIQ™ Squishy Advent™",
    type: "Advent Calendar",
    categories: ["Sensory"],
    ages: ["Ages 3-5", "Ages 5+"],
    ageCollections: ["Preschool Toys Ages 3-5", "Big Kids Ages 5+"],
    isBestseller: true,
    summary: "Make the December countdown magical every morning without sugar crashes! Behind each of the 24 numbered doors in the ToddsIQ™ Squishy Advent™ calendar waits an adorable, super-soft mochi squishy toy wearing Santa hats, scarves, and holiday antlers. Squeezable, washable, and deeply comforting, these sensory characters become year-round pocket companions.",
    highlights: [
      "24 Unique Holiday Characters — Zero repeats: penguins, snowmen, reindeer, gingerbread, and holiday friends.",
      "Sugar-Free Holiday Morning Excitement — Starts December days with joyful anticipation and sensory comfort.",
      "Ultra-Soft Stress-Relieving Silicone — Perfect for fidgeting, sensory regulation, and soothing holiday excitement.",
      "Washable & Reusable — Rinses clean with warm soapy water for months of imaginative play."
    ],
    optionsBreakdown: [
      "<strong>24-Day Holiday Advent Calendar:</strong> Deluxe illustrated holiday countdown box with 24 individually sealed character compartments."
    ],
    whatsIncluded: [
      "1x Deluxe 24-Window Holiday Illustrated Countdown Box",
      "24x Unique Holiday Mochi Squishy Toys"
    ],
    specs: {
      age: "Ages 3+",
      material: "Safe Non-Toxic TPR (Thermoplastic Rubber)",
      cleaning: "Washable with mild soap and water"
    }
  }
};

// Generate HTML Description Function
function generateProductHTML(p) {
  let html = `<p>${p.summary}</p>\n`;

  html += `<h4>✨ Key Highlights</h4>\n<ul>\n`;
  for (const h of p.highlights) {
    html += `  <li>${h}</li>\n`;
  }
  html += `</ul>\n`;

  if (p.optionsBreakdown && p.optionsBreakdown.length > 0) {
    html += `<h4>🎨 Available Options & Editions</h4>\n<ul>\n`;
    for (const opt of p.optionsBreakdown) {
      html += `  <li>${opt}</li>\n`;
    }
    html += `</ul>\n`;
  }

  html += `<h4>📦 What's Included</h4>\n<ul>\n`;
  for (const item of p.whatsIncluded) {
    html += `  <li>${item}</li>\n`;
  }
  html += `</ul>\n`;

  html += `<h4>💡 Specifications</h4>\n<ul>\n`;
  html += `  <li><strong>Recommended Age:</strong> ${p.specs.age}</li>\n`;
  if (p.specs.material) html += `  <li><strong>Materials:</strong> ${p.specs.material}</li>\n`;
  if (p.specs.power) html += `  <li><strong>Power & Battery:</strong> ${p.specs.power}</li>\n`;
  if (p.specs.features) html += `  <li><strong>Key Features:</strong> ${p.specs.features}</li>\n`;
  if (p.specs.safety) html += `  <li><strong>Safety:</strong> ${p.specs.safety}</li>\n`;
  html += `</ul>\n`;

  html += `<p><em>Invest in screen-free creativity and developmental confidence with <strong>ToddsIQ™</strong>.</em></p>`;

  return html;
}

// Generate Tags Function
function generateTags(p) {
  const tags = new Set();
  
  // Brand tag
  tags.add("ToddsIQ");

  // Bestsellers
  if (p.isBestseller) {
    tags.add("Best Sellers");
    tags.add("Bestseller");
  }

  // Categories (STEM & Learning, Arts & Crafts, Building, Reading, Sensory)
  for (const cat of p.categories) {
    tags.add(cat);
  }

  // Ages (Ages 1-3, Ages 3-5, Ages 5+)
  for (const age of p.ages) {
    tags.add(age);
  }

  // Age Collections (Toddler Toys Ages 1-3, Preschool Toys Ages 3-5, Big Kids Ages 5+)
  if (p.ageCollections) {
    for (const col of p.ageCollections) {
      tags.add(col);
    }
  }

  // Shorthand general age tags for maximum searchability
  if (p.ages.includes("Ages 1-3")) tags.add("Toddler");
  if (p.ages.includes("Ages 3-5")) tags.add("Preschool");
  if (p.ages.includes("Ages 5+")) tags.add("Big Kids");

  return Array.from(tags).join(', ');
}

// Process Rows
const rows = parseCSV(csvContent);
console.log('Total input CSV rows:', rows.length);

const outputRows = [];
outputRows.push(rows[0]); // Headers

let mappedCount = 0;

for (let r = 1; r < rows.length; r++) {
  const row = [...rows[r]];
  const originalHandle = row[0];

  const meta = productMap[originalHandle];
  if (!meta) {
    console.warn(`WARNING: Handle not mapped in productMap: "${originalHandle}"`);
    outputRows.push(row);
    continue;
  }

  // Update Handle on EVERY row for this product (crucial for multi-variant and multi-image linking in Shopify!)
  row[0] = meta.newHandle;

  // If this is the main product definition row (Title is populated)
  if (row[1] && row[1].trim() !== '') {
    mappedCount++;
    row[1] = meta.title;
    row[2] = generateProductHTML(meta);
    row[3] = "ToddsIQ"; // Vendor
    row[4] = meta.type; // Type
    row[5] = generateTags(meta); // Tags

    // SEO Title & Description (Column 28 & 29: SEO Title, SEO Description)
    row[28] = `${meta.title} | ToddsIQ™ Official`;
    row[29] = meta.summary.length > 160 ? meta.summary.substring(0, 157) + '...' : meta.summary;
  } else {
    // For variant rows, ensure vendor or title isn't accidentally leaving "Thoson"
    if (row[3] && row[3].trim() !== '') {
      row[3] = "ToddsIQ";
    }
  }

  outputRows.push(row);
}

console.log(`Mapped ${mappedCount} products successfully across ${outputRows.length - 1} rows!`);

// Write the transformed CSV
const newCSV = formatCSV(outputRows);
fs.writeFileSync('shopify_products_import.csv', newCSV, 'utf8');
console.log('Saved updated shopify_products_import.csv successfully!');

// Also create a backup / export copy in scratch for safety
fs.writeFileSync('scratch/shopify_products_import_toddsiq.csv', newCSV, 'utf8');
console.log('Saved backup copy to scratch/shopify_products_import_toddsiq.csv');
