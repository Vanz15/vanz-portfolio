/**
 * Site content — single source of truth for copy and links.
 * Facts drawn from the CV (Aivann_Martinez_CV.docx), GitHub (Vanz15),
 * and the CMSC 190 thesis. Remaining placeholders are marked PLACEHOLDER.
 */

export const site = {
  name: "Aivann Martinez",
  firstName: "aivann",
  role: "computer scientist & builder",
  /** Caption under the hero portrait. */
  heroRole: "solutions architect & product builder",
  location: "Quezon City, Philippines",
  tagline:
    "I find everyday problems, build and optimize solutions, and put them in front of the people who use them.",
  intro:
    "I'm Aivann, a computer science graduate who notices when things are harder than they need to be, asks why, and builds better, simpler ways to do them. I've built tools to make note-taking easier, make budgeting more intuitive, ensure medical AI models are honest before deployment, and written PRDs that turn ideas into clear plans a team can build from. My favorite loop is simple: notice something repetitive or annoying in real life, figure out why it is that way, build the fix, then keep sanding it down until it feels natural, useful, and a little easier to live with.",
  links: {
    github: "https://github.com/Vanz15",
    linkedin: "https://www.linkedin.com/in/ahpmartinez",
    email: "mailto:aivannpmartinez@gmail.com",
    /** Shown as plain text in the footer so the address is readable, not hidden behind a label. */
    emailAddress: "aivannpmartinez@gmail.com",
    instagram: "https://www.instagram.com/ibaaannn__",
    /** Handles shown beside each platform label in the footer. */
    handles: {
      github: "@Vanz15",
      linkedin: "ahpmartinez",
      instagram: "@ibaaannn__",
    },
    purch: "https://the-purch.vercel.app/",
    purchRepo: "https://github.com/Vanz15/purch",
    tabbinRepo: "https://github.com/Vanz15/tabbin",
    gaxRepo: "https://github.com/Vanz15/gax-safety",
    jobMatcherRepo: "https://github.com/Vanz15/job-matcher-n8n",
  },
  education: {
    title: "B.S. Computer Science, UP Baguio — Cum Laude",
    period: "2022 — 2026",
    detail:
      "GWA 1.46/3.54 · SM Foundation academic scholar · Outstanding Thesis Presenter",
  },
  experience: [
    {
      period: "Sep 2026",
      title: "Junior Product Analyst — White Cloak Technologies",
      detail:
        "5-day Launchpad Challenge on a live HRIS: development-ready PRD with 36 acceptance criteria, QA plan with a role-access matrix, and a clickable prototype — presented at Demo Day.",
    },
    {
      period: "May — Jun 2026",
      title: "AI Intern — Springer Capital",
      detail:
        "Debugged and evaluated LangGraph agents; built a self-directed employee sentiment pipeline that flagged flight-risk staff over rolling 30-day windows; reported findings for non-technical stakeholders.",
    },
    {
      period: "Feb — May 2026",
      title: "Social Media Strategist — Aftertaste Cafe",
      detail:
        "Ran a 9-week video campaign to 79,760 views across TikTok, Instagram, and Facebook, then used skip-rate and watch-time data to steer the next creative cycle.",
    },
    {
      period: "Mar — Jun 2025",
      title: "QA Tester — UP Baguio, Office of Student Affairs",
      detail:
        "Wrote automated feature tests (PHP/Laravel, Livewire) for a student-assistant duty and time-tracking system, testing each of three user roles separately to catch permission issues.",
    },
  ],
  certifications: [
    "LLM Engineering & Agents — Udemy (Feb 2026)",
    "Python for Data Science — Udemy (Jan 2026)",
    "Data Fundamentals — IBM SkillsBuild (Dec 2025)",
  ],
};

export type CaseStep = {
  label: "problem" | "approach" | "built" | "improved" | "presented";
  text: string;
};

export type CaseStudy = {
  number: string;
  title: string;
  subtitle: string;
  meta: string; // year · status, shown in mono
  stack: string[];
  links: { label: string; href: string; external: boolean }[];
  image: string | null;
  imageAlt: string;
  /** Set when the capture is very wide (e.g. a workflow canvas) and must not be cropped. */
  wideImage?: boolean;
  video?: {
    src: string;
    poster: string;
    label: string;
    duration: string;
  };
  paper?: {
    abstractSrc: string;
    abstractThumb: string;
    title: string;
    authors: string;
  };
  steps: CaseStep[];
};

export const caseStudies: CaseStudy[] = [
  {
    number: "01.",
    title: "Tabbin — notes that get out of the way",
    subtitle:
      "A Windows sticky-note dock with real users: hover the screen edge, notes appear, no account or setup required.",
    meta: "2025 — · shipped · 10 releases, 200 downloads",
    stack: ["Electron", "JavaScript", "Node", "electron-builder"],
    links: [
      { label: "readme", href: "https://github.com/Vanz15/tabbin#readme", external: true },
      { label: "repo", href: "https://github.com/Vanz15/tabbin", external: true },
    ],
    image: null, // PLACEHOLDER: dock/note screenshot — superseded by the demo video below
    imageAlt:
      "Screen recording of Tabbin: notes docked to the screen edge, the note editor, and the Settings panel for dock side, background, and auto-hide",
    video: {
      src: "/videos/tabbin-demo.mp4",
      poster: "/videos/tabbin-demo-poster.jpg",
      label: "play the 30s demo",
      duration: "0:30",
    },
    steps: [
      {
        label: "problem",
        text: "Sticky-note apps either clutter the screen or bury notes behind alt-tab. I wanted notes that appear in half a second and vanish when I'm done.",
      },
      {
        label: "approach",
        text: "Interaction first: I prototyped the dock, screen flows, and edge cases in Figma and FigJam before writing code, then designed around a hidden edge dock that reveals on hover.",
      },
      {
        label: "built",
        text: "An Electron app with edge docking, drag-out windows, rich-text editing, keyboard shortcuts, installer and portable builds, an auto-updater, and eight test suites covering storage, the updater state machine, and release checksums.",
      },
      {
        label: "improved",
        text: "Ten releases of real-user iteration: v2.2.3 alone fixed three bugs that looked correct in code — including note order silently resetting on restart — and I replaced the weak tests that missed them.",
      },
      {
        label: "presented",
        text: "Every decision and its reasoning lives in a public changelog, including features I chose not to build. Users file GitHub issues; the roadmap follows their workflows.",
      },
    ],
  },
  {
    number: "02.",
    title: "Purch — budgeting as a conversation",
    subtitle:
      "A chat-based, LLM-powered expense tracker where logging a purchase is one message, not a form.",
    meta: "2025 — · live",
    stack: ["Next.js / TypeScript", "FastAPI", "LangGraph", "Groq + Gemini", "Supabase / Postgres"],
    links: [
      { label: "open live", href: "https://the-purch.vercel.app/", external: true },
      { label: "repo", href: "https://github.com/Vanz15/purch", external: true },
    ],
    image: "/images/purch-mockup.jpg",
    imageAlt:
      "Purch on a laptop and phone: the landing page, the budget dashboard with bills and a 7-day spend chart, wallet balance, transaction history, and the Purch assistant chat",
    steps: [
      {
        label: "problem",
        text: "Budget apps die at data entry. Nobody wants to open a form, find the category, and type amounts after every purchase.",
      },
      {
        label: "approach",
        text: "Make the chat the interface: a LangGraph agent pipeline routes between Groq (Llama 3.3 70B, GPT-OSS 20B) and Gemini models, extracting the transaction while the ledger stays out of sight.",
      },
      {
        label: "built",
        text: "A full-stack app — Next.js/TypeScript frontend, FastAPI backend, Supabase/Postgres — with Google OAuth and three AI personas tuned through prompt iteration to feel natural and localized.",
      },
      {
        label: "improved",
        text: "Routed every request through two models instead of one: a stronger reasoning model for the general thinking — deciding categories, parsing messy receipt text — and a faster conversational model for the chat itself, so replies stayed quick without the ledger getting dumber.",
      },
      {
        label: "presented",
        text: "Deployed live on Vercel with the architecture and environment contract documented for anyone who wants to run it.",
      },
    ],
  },
  {
    number: "03.",
    title: "GAX-Safety — when accuracy isn't enough",
    subtitle:
      "Undergraduate thesis: auditing whether a pneumonia classifier reasons from the lungs or from shortcuts. Outstanding Thesis Presenter.",
    meta: "2025 — 2026 · research · CMSC 190",
    stack: ["PyTorch", "ResNet34", "Explainable AI / GAX"],
    links: [
      { label: "code & experiments", href: "https://github.com/Vanz15/gax-safety", external: true },
    ],
    image: null, // PLACEHOLDER: confidence-map heatmap — the abstract card below covers this
    imageAlt:
      "The abstract page of the CMSC 190 thesis: the title, both authors, the adviser, and the full abstract paragraph",
    paper: {
      abstractSrc: "/papers/gax-abstract.pdf",
      abstractThumb: "/papers/gax-abstract-thumb.png",
      title:
        "Quantifying the Reliability of a Pneumonia-Diagnosing ResNet34 Model via GAX-based Interpretable Confidence Maps",
      authors: "Martinez & Talaue",
    },
    steps: [
      {
        label: "problem",
        text: "A chest X-ray model can score 90%+ accuracy and still be reading hospital tokens instead of lungs. Standard metrics can't tell the difference — and in medicine that gap is dangerous.",
      },
      {
        label: "approach",
        text: "Treat explanation as an audit: extend the GAX method from qualitative heatmaps into a quantitative pre-deployment check, comparing attribution maps against true lung regions from a segmentation model.",
      },
      {
        label: "built",
        text: "Eight ResNet34 variants trained on 14,863 RSNA chest X-rays (test accuracy up to 93.14%), plus the Cheating Score — the share of a model's positive evidence that falls outside the lung fields.",
      },
      {
        label: "improved",
        text: "The audit found what accuracy hid: accuracy and cheating rose together across all variants, and at the standard safety threshold 96 of 100 correctly classified pneumonia cases relied on shortcut learning.",
      },
      {
        label: "presented",
        text: "Defended at UP Baguio in May 2026 as a designed pre-deployment safety check, with the pipeline published as open code and experiments.",
      },
    ],
  },
  {
    number: "04.",
    title: "Job Hunter — automate the boring loop",
    subtitle:
      "A live n8n workflow that scrapes job boards, LLM-scores every listing against a resume, and files results to a sheet.",
    meta: "2025 · automation · self-hosted",
    stack: ["n8n", "Apify", "Gemini Flash", "Docker Compose", "AWS EC2"],
    links: [
      { label: "repo", href: "https://github.com/Vanz15/job-matcher-n8n", external: true },
    ],
    image: "/images/n8n-workflow-half.jpg",
    wideImage: true,
    imageAlt:
      "The n8n job-matcher workflow: a manual trigger, Resume Text, a JobStreet fetch, Trim Job Fields, then Get Existing URLs, Dedupe Jobs, Aggregate, Score Fit with Gemini Flash, and Parse Scores Array, branching to two Google Sheets appends",
    steps: [
      {
        label: "problem",
        text: "Job hunting in the Philippines means re-searching the same boards daily and eyeballing every posting for fit. That loop is pure drudgery.",
      },
      {
        label: "approach",
        text: "Automate the whole loop as a workflow: Apify scrapes the boards, an LLM scores each posting 1–100 against a resume, results land in Google Sheets for actual decisions.",
      },
      {
        label: "built",
        text: "A live n8n workflow, self-hosted on AWS EC2 with Docker Compose, running on Gemini Flash with automatic retries on failed calls.",
      },
      {
        label: "improved",
        text: "Hit rate limits across six LLM providers, then fixed the bottleneck by rewriting N sequential scoring calls into a single batched call — one request per run instead of dozens.",
      },
      {
        label: "presented",
        text: "Kept running and maintained as personal infrastructure; the workflow is documented in the repo for anyone with the same problem.",
      },
    ],
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "product & requirements",
    items: ["PRDs", "user stories", "acceptance criteria", "edge case analysis", "stakeholder interviews", "feedback synthesis"],
  },
  {
    label: "design",
    items: ["Figma", "FigJam", "wireframes", "clickable prototypes", "user journeys"],
  },
  {
    label: "qa & testing",
    items: ["test planning", "automated feature tests (Laravel/Livewire)", "regression & UAT", "defect reporting"],
  },
  {
    label: "ai & data",
    items: ["LangGraph agents", "LLM integration & prompt design", "NLP", "CNNs (ResNet34)", "explainable AI"],
  },
  {
    label: "software development",
    items: ["TypeScript / JavaScript", "React / Next.js", "FastAPI", "Python", "SQL", "Supabase / Postgres", "Docker Compose", "AWS EC2", "n8n", "Git"],
  },
];
