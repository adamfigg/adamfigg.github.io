// ---------------------------------------------------------------------------
// All site content lives here. Edit this file to update the portfolio.
// No component changes required.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Adam Figgat',
  title: 'Senior Full-Stack Software Engineer',
  location: 'Greater Salt Lake Area, Utah',
  email: 'afiggat@gmail.com',
  phone: '760-814-7652',
  linkedin: 'https://www.linkedin.com/in/adam-figgat',
  github: 'https://github.com/adamfigg',
  resume: '/Adam_Figgat_Software_Engineer_8.31.pdf',
  tagline:
    'I build enterprise web applications that people actually rely on. Nine years across fintech, healthcare, and e-commerce, mostly on the front end, always close to the product.',
  summary: [
    'I’m a senior full-stack engineer with 9+ years of experience shipping enterprise applications in fintech and healthcare. Most of my work lives on the front end, in React, Angular, TypeScript, and GraphQL, but I own features end to end, from design review through delivery and support.',
    'At BILL I owned Invoice Financing onboarding experiences and Line of Credit initiatives, working alongside product, design, operations, and compliance to ship financial products at scale. Before that I helped modernize patient-facing healthcare applications at Intermountain Health during their Angular to React migration.',
    'I care about clean, maintainable code and about the people using what I build. I also lean heavily on AI-assisted development. Claude Code and GitHub Copilot are part of my daily workflow for prototyping, test generation, and refactoring, without letting quality slip.',
  ],
}

// `detail` is optional. Leave it off and the stat renders with just a label.
export const stats = [
  {
    value: '9+',
    label: 'Years engineering',
    detail: 'Shipping code since 2017',
  },
  {
    value: '1M+',
    label: 'Emails delivered daily',
    detail: 'Sustained for over two years',
  },
  {
    value: '3',
    label: 'Regulated industries',
    detail: 'Financial, healthcare, e-commerce',
  },
]

export const skills = [
  {
    group: 'Frontend',
    items: ['React', 'Angular', 'TypeScript', 'JavaScript', 'React Native', 'Redux', 'HTML & CSS', 'Material UI'],
  },
  {
    group: 'Backend & Data',
    items: ['Node.js', 'GraphQL', 'REST APIs', 'Elasticsearch', 'DynamoDB', 'Elixir'],
  },
  {
    group: 'AI-Assisted Development',
    items: ['Claude Code', 'GitHub Copilot', 'Prompt Engineering'],
  },
  {
    group: 'Tools & Practices',
    items: ['Git', 'GitHub', 'Bitbucket', 'Jest', 'SendGrid', 'Figma', 'Agile'],
  },
]

export const experience = [
  {
    role: 'Software Engineer II',
    company: 'BILL (formerly Divvy)',
    period: 'Dec 2021 – Jul 2026',
    highlights: [
      'Owned multiple Invoice Financing onboarding experiences and key Line of Credit initiatives, leading front-end implementation from design through delivery with React, Angular, TypeScript, and GraphQL.',
      'Owned the front end of the Invoice Financing SendGrid ecosystem, supporting 15+ million transactional emails per month across onboarding, funding, repayment, and customer lifecycle communications.',
      'Maintained and extended a production Elixir service, adding schema and query support for new fields across product expansions and resolving defects.',
      'Led cross-functional efforts with engineering, product, design, operations, and compliance to deliver scalable financial products, influencing architecture and implementation strategy.',
      'Mentored engineers, reviewed code, and led implementation efforts in a senior-level capacity across projects.',
      'Championed AI-driven development with Claude Code and GitHub Copilot to accelerate feature work, generate tests, and refactor complex code while maintaining high quality.',
    ],
    stack: ['React', 'Angular', 'TypeScript', 'GraphQL', 'Node.js', 'SendGrid', 'Elixir'],
  },
  {
    role: 'Software Engineer',
    company: 'Intermountain Health',
    period: 'Jun 2019 – Dec 2021',
    highlights: [
      'Helped modernize enterprise healthcare applications by contributing to the migration from Angular to React.',
      'Delivered patient billing, financial assistance, pre-registration, and COVID-19 applications using React, React Native, TypeScript, and GraphQL.',
      'Built reusable front-end architecture with cross-functional Agile teams to deliver secure patient experiences.',
    ],
    stack: ['React', 'React Native', 'Angular', 'TypeScript', 'GraphQL'],
  },
  {
    role: 'Front-End Software Engineer',
    company: 'Younique',
    period: '2018 – 2019',
    highlights: [
      'Developed React-based e-commerce applications and reusable UI components for a global platform.',
    ],
    stack: ['React', 'Redux', 'JavaScript'],
  },
  {
    role: 'Front-End Developer',
    company: 'VisualCue',
    period: '2017 – 2018',
    highlights: [
      'Built responsive websites and digital experiences using HTML, CSS, JavaScript, and WordPress.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
  },
]

// ---------------------------------------------------------------------------
// FEATURED PROJECTS: the full-width blocks in the Projects section.
// Each entry renders its own block, in order. Remove one, or set the array to
// [], to hide it.
//
// Images live in /public/projects/ ; selecting one opens a full-screen viewer.
// Per image, `fit: 'contain'` letterboxes an odd-shaped screenshot instead of
// cropping it. `galleryNote` is optional fine print under the screenshots.
// ---------------------------------------------------------------------------
export const featuredProjects = [
  {
    title: 'Invoice Financing & Line of Credit',
    org: 'BILL',
    role: 'Software Engineer II',
    period: 'Dec 2021 – Jul 2026',
    summary:
      'Expanding BILL’s Invoice Financing platform into a full Line of Credit product, with front-end work spanning the entire customer lifecycle from enrollment through daily servicing.',
    body: [
      'As a Software Engineer on the Invoice Financing team at BILL, I partnered closely with product managers, designers, backend engineers, and other stakeholders to evolve the Invoice Financing platform and expand it to support Line of Credit customers. I played a key role in designing and implementing end-to-end front-end experiences across multiple applications, unifying the existing Invoice Financing customer journey with new Line of Credit enrollment and servicing workflows.',
      'Working across several React and Angular repositories, I leveraged AI-assisted development tools to accelerate implementation, improve consistency, and deliver features efficiently while maintaining high code quality. I helped drive front-end architecture decisions, collaborated on complex technical solutions, and delivered scalable, user-focused experiences that supported the successful expansion of BILL’s lending products.',
      'I also owned the email template system used for every Invoice Financing and Line of Credit customer. That placed me across the entire customer lifecycle: sign-up forms, in-product onboarding, adoption prompts and CTAs, and the dashboards and detail pages customers interact with day to day.',
    ],
    highlights: [
      'Unified Invoice Financing and Line of Credit into a single customer journey',
      'Shipped front-end features across multiple React and Angular repositories',
      'Owned the transactional email template system end to end',
      'Drove front-end architecture decisions alongside product, design, and backend',
    ],
    stack: ['React', 'Angular', 'TypeScript', 'GraphQL', 'Node.js', 'SendGrid', 'Figma'],
    gallery: [
      {
        src: '/projects/invoice-financing-details.webp',
        alt: 'Invoice Financing Details page showing outstanding balance, repayment progress bar, and financing terms.',
        caption:
          'Invoice financing detail page with outstanding balance, repayment progress, and financing terms for a single financed invoice.',
      },
      {
        src: '/projects/line-of-credit-draw-details.webp',
        alt: 'Line of Credit draw details page with summary, account activity ledger, and payment due date schedule.',
        caption:
          'Line of Credit draw detail page with summary, account activity ledger, and upcoming payment schedule.',
      },
      {
        src: '/projects/credit-line-draws.webp',
        alt: 'Credit line draws table listing draw dates, amounts, repayment status, and repay actions.',
        caption:
          'Credit line draws list showing repayment status, next payment due, and inline repay actions across all draws.',
      },
      {
        src: '/projects/financing-email.webp',
        alt: 'Transactional email notifying a customer that financing funds are being deposited to their account.',
        caption:
          'Transactional email from the template system I owned, notifying a customer that funds are being disbursed.',
      },
    ],
    galleryNote:
      'Screens captured in internal test environments; data shown is not real customer data.',
  },
  {
    title: 'Analytics Lite',
    org: 'Personal project',
    role: 'Design, front end, and backend',
    period: '2026',
    summary:
      'Privacy-first web analytics for small businesses. It watches where visitors go and where they drop off, then sends the owner a short, plain-English digest by email and SMS, but only when something actually moved.',
    body: [
      'Small business owners do not want a dashboard, they want to be told what changed. Analytics Lite collects pageviews from a single script tag and turns them into a morning digest written in plain language. It runs without cookies or visitor IDs: a visitor is a hash of IP, user agent and a salt that is destroyed at midnight, so yesterday\u2019s hashes can never be recomputed. Raw events are folded into counters and dropped inside the request, which is what lets the product say no cookie banner is required.',
      'The interesting constraint was keeping AI cost near zero without making the product dumber. All of the analysis is deterministic code, not a model. A model is used for exactly one thing, writing the copy, and email and SMS share a single call. A suppression gate sits in front of it, so a quiet day costs nothing and sends nothing. A digest that only arrives when something changed is a digest that gets read. The signup and marketing site customers see first, HuMun, is a separate Next.js App Router build.',
    ],
    highlights: [
      'Cookieless visitor counting with a salt destroyed nightly',
      'Deterministic analysis in code; the model only writes the copy',
      'One model call per client per day, and none when nothing changed',
      'Google Analytics CSV import so a migrating customer has history on day one',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Next.js', 'Node.js', 'SQLite', 'Anthropic API'],
    gallery: [
      {
        src: '/projects/analytics-digest.webp',
        alt: 'Analytics Lite digest showing a drop-off headline, visitor and conversion counts with change percentages, and two callouts.',
        caption:
          'The digest a customer wakes up to: what moved, what is worth a look, and one bright spot.',
      },
      {
        src: '/projects/humun-hero.webp',
        alt: 'HuMun marketing site home page with the headline "Wake to answers, not dashboards" over an animated night sky.',
        caption:
          'HuMun, the Next.js marketing and signup site customers land on before they ever see the dashboard.',
      },
    ],
    galleryNote: 'Screens captured from the running app using sample data.',
  },
  {
    title: 'Stadium: Buyer-First Card Marketplace',
    org: 'Personal project',
    role: 'Design, front end, and backend',
    period: '2026',
    summary:
      'A marketplace for Pok\u00e9mon cards that runs in reverse. Buyers post what they are after, sellers compete with fully public offers, and the pressure on price runs down instead of up.',
    body: [
      'On a normal marketplace the buyer does the work: hunt listings, compare conditions, and bid the price up against other buyers. Stadium inverts that. A buyer posts a want with the exact card, the condition or grade they will accept, a budget range, whether they want local pickup or nationwide shipping, and how long the post stays open. Sellers then compete for it in the open. Every offer is visible to every other seller and ranked by delivered price, so each seller can see exactly what they have to beat.',
      'Posts move through a real state machine rather than a status string: open while looking, pending once an offer is accepted, then closed as sold or closed with no deal, and an open post that reaches its time limit closes itself. Every mutation runs through a server action instead of a client-side fetch. Card names, set numbers, official images and market prices come from a free public card API, cached so repeated searches cost nothing.',
    ],
    highlights: [
      'Public offer threads ranked by delivered price rather than listing age',
      'Post lifecycle as a state machine, with automatic expiry on open posts',
      'Card search, images and market prices pulled from a public API and cached',
      'Every mutation handled by a server action, not a client-side fetch',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Server Actions'],
    gallery: [
      {
        src: '/projects/stadium-offers.webp',
        alt: 'Public offer thread on a want, showing two competing seller offers with prices, locations, notes and accept buttons, with the lowest flagged.',
        caption:
          'The public offer thread. Every seller sees every other offer, ranked by delivered price, with the lowest flagged.',
      },
      {
        src: '/projects/stadium-post.webp',
        alt: 'Post a want form with card search, card name, set, number, quality, price range, description, photo upload and visibility options.',
        caption:
          'Posting a want. Card search fills the name, set, number and market price, or a buyer can type it in by hand.',
      },
    ],
    galleryNote: 'Screens captured from the running app using seeded demo data.',
  },
  {
    title: 'Adam\u2019s Work Ledger',
    org: 'Personal project',
    role: 'Design, front end, and agent pipeline',
    period: '2026',
    summary:
      'A work ledger that tracks where my time actually goes across a dozen side projects, then sends one short message a day telling me what deserves the next hour.',
    body: [
      'With a dozen things running at once, the hard part is not doing the work, it is deciding what to do next. The ledger logs every session against a project and measures the week against a target per category rather than against a to-do list, so progress stays visible without a planning ritual. Every project also carries a heat level: high heat, cooling, or freezer. Putting something on the back burner has to be an explicit choice, which keeps quiet neglect from passing for a plan.',
      'The part I actually wanted to build is what runs at the end of the day. A scheduled agent reads the ledger, pulls commit counts and line changes from each project\u2019s linked public repo, and sets the two against each other. Hours logged say what I intended to do; commits say what shipped. It sends back one short message on where to spend time next, and it names the gap out loud when a project has hours against it but nothing pushed in two weeks.',
    ],
    highlights: [
      'Session logging measured against weekly targets per category',
      'An explicit heat level per project, so the back burner is a decision',
      'Scheduled agent that weighs hours logged against commits actually pushed',
      'One short message a day instead of a dashboard to interpret',
    ],
    stack: ['JavaScript', 'Scheduled agents', 'GitHub API'],
    gallery: [
      {
        src: '/projects/ledger-dashboard.webp',
        alt: 'Work ledger dashboard: a form for logging a session, progress bars for the week against per-category targets, and the high heat project band.',
        caption:
          'Logging a session, the week measured against a target per category, and the projects currently running hot.',
      },
      {
        src: '/projects/ledger-projects.webp',
        alt: 'Cooling and freezer project bands above the full project list, with the new project dialog open showing name, category, heat and an optional GitHub repo field.',
        caption:
          'Cooling and freezer bands, the full project list, and the dialog where a project gets its repo link. That link is what the evening agent reads commits from.',
      },
      {
        src: '/projects/ledger-log.webp',
        alt: 'Running session log listing recent entries with date, project, category, hours and a short note on each.',
        caption:
          'The running session log. The short note on each entry is what the evening agent reads before writing the next message.',
      },
    ],
  },
  {
    title: 'Simon Says',
    org: 'Personal project',
    role: 'Learning build',
    period: '2026',
    summary:
      'The memory game, built to learn Ruby on Rails properly by putting a Rails API behind a React client and making the server the authority on the sequence.',
    body: [
      'I wanted to actually learn Rails rather than read about it, so I picked something small enough to finish and structured enough to stay interesting. The Rails API owns the sequence and decides whether each attempt was correct, which means a score has to be earned. Rounds only ever advance by one, only through the submit path, and only when the submitted presses match what the server stored, so there is no posting a score of 40 without having played 39 valid rounds first.',
      'On the client the game is a union of phases rather than a pile of booleans, so an illegal transition cannot be expressed in the first place. Presses that arrive during playback are dropped in the reducer, which keeps the keyboard listener and the on-screen pads from ever disagreeing about the rule. The reducer is pure and unit tested, and every timer lives in one hook where it gets cleaned up on phase change. The tones are synthesized with the Web Audio API at the frequencies of the original 1978 game, so there are no audio files at all.',
    ],
    highlights: [
      'Rails 8 API that owns the sequence and validates every attempt server side',
      'Client state modeled as a phase union, so illegal transitions cannot be expressed',
      'Pure, unit-tested reducer with every timer isolated in a single hook',
      'Tones synthesized with the Web Audio API at the original 1978 frequencies',
    ],
    stack: ['Ruby on Rails', 'React', 'TypeScript', 'Vite', 'SQLite', 'RSpec', 'Vitest'],
    gallery: [
      {
        src: '/projects/simon-board.webp',
        alt: 'Simon Says game board with four colored directional pads, a round counter, and a name field with a start button.',
        caption:
          'The board at rest. Four pads, round counter, and keyboard or tap input.',
        fit: 'contain',
      },
      {
        src: '/projects/simon-mobile.webp',
        alt: 'The same Simon Says board rendered at phone width, with the pads and controls stacked.',
        caption: 'The same layout at phone width.',
        fit: 'contain',
      },
    ],
  },
  {
    title: 'COVID-19 Intake & Patient Results',
    org: 'Intermountain Health',
    role: 'Software Engineer',
    period: 'Jun 2019 – Dec 2021',
    summary:
      'High-priority patient tools delivered at the height of the pandemic, including the online intake form for COVID-19 testing, built while the team was actively migrating from Angular to React.',
    body: [
      'I joined Intermountain while the organization was modernizing its patient-facing applications, and a large part of my value was flexibility. I worked in both the legacy Angular codebase and the newer React one, helping move features across as the migration progressed rather than waiting for it to finish. Being productive in either stack meant I could pick up whatever the team needed most that week.',
      'When COVID-19 arrived, that flexibility mattered. I helped deliver high-priority pieces of the online intake form patients used to register for COVID-19 testing, shipped under real time pressure while requirements changed week to week. Patients could then view, download, and share their results directly from their health record, which took pressure off phone lines at a moment when every call counted.',
      'Alongside the pandemic work, I delivered patient billing, financial assistance, and pre-registration experiences using React, React Native, TypeScript, and GraphQL, building reusable front-end architecture with cross-functional Agile teams.',
    ],
    highlights: [
      'Worked across both Angular and React during an active migration',
      'Delivered high-priority pieces of the COVID-19 testing intake form',
      'Built patient results views for viewing, downloading, and sharing lab results',
      'Shipped under pandemic time pressure with rapidly shifting requirements',
    ],
    stack: ['React', 'Angular', 'React Native', 'TypeScript', 'GraphQL'],
    gallery: [
      {
        src: '/projects/intermountain-lab-results.webp',
        alt: 'Mobile patient view of a COVID-19 antibody lab result showing value, interpretation, reference range, and clinical notes.',
        caption:
          'Patient results view on mobile, with the result value, reference range, clinical notes, and actions to message, download, or share.',
        fit: 'contain',
      },
      {
        src: '/projects/intermountain-results-guide.webp',
        alt: 'Three-step patient guidance graphic showing how to navigate the health record app to find and download COVID-19 test results.',
        caption:
          'Patient guidance walking people to their COVID-19 results, using the health record screens my team delivered.',
        fit: 'contain',
      },
    ],
    galleryNote:
      'Screens taken from patient-facing guidance materials; the record shown is sample data.',
  },
  {
    title: 'Looks: Shoppable Content Platform',
    org: 'Younique',
    role: 'Front-End Software Engineer',
    period: '2018 – 2019',
    summary:
      'A shoppable content platform where creators pair photos and videos with the exact products they used, so shoppers can add the whole look, or any single piece of it, straight to their cart.',
    body: [
      'I worked on a team to develop and launch Looks, a new application where users could pair images and video with the products used to create them. With full functionality, a shopper could add every item in a look to their cart at once, or pick and choose individual products. It was built to be fully responsive using React, Redux, Elasticsearch, and DynamoDB.',
      'During my time at Younique I also created and delivered numerous front-end assets for the main website. Those pages went on to serve as the landing experience for millions of users daily.',
    ],
    highlights: [
      'Helped build and launch the Looks application end to end',
      'Add-to-cart for an entire look or individual products',
      'Fully responsive React and Redux front end',
      'Built high-traffic marketing and landing pages for the main storefront',
    ],
    stack: ['React', 'Redux', 'Elasticsearch', 'DynamoDB', 'JavaScript', 'HTML/CSS'],
    gallery: [
      {
        src: '/projects/younique-looks.webp',
        alt: 'Looks detail page showing a creator photo alongside a shoppable product list with checkboxes, prices, and shade selectors.',
        caption:
          'Looks detail view. A creator’s photo and video paired with the products used, each selectable with its own shade and addable to the cart.',
      },
      {
        src: '/projects/younique-homepage.webp',
        alt: 'Younique storefront landing page featuring a product campaign for Touch foundations.',
        caption:
          'Storefront landing page, one of the campaign experiences I built for the main site.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// ADDITIONAL PROJECTS: the card grid below the featured blocks.
// Empty by default, so the Projects section currently shows only the featured
// projects above. Add entries here if you ever want a grid of smaller projects.
//
//   {
//     title: 'Project name',
//     blurb: 'One or two sentences on what it does and who it is for.',
//     impact: 'A measurable outcome, optional.',
//     stack: ['React', 'TypeScript'],
//     live: '',   // optional URL; the link hides itself when empty
//     repo: '',   // optional URL; the link hides itself when empty
//     image: '',  // optional, drop a file in /public/projects/
//     featured: true,  // true = larger card in the top row
//   }
//
// The grid and its heading disappear entirely while this array is empty.
// ---------------------------------------------------------------------------
export const projects = []

export const education = [
  {
    credential: 'B.S. Business Management & Marketing',
    institution: 'Brigham Young University–Idaho',
    year: '2012',
  },
  {
    credential: 'Web Development Immersive Program',
    institution: 'DevMountain',
    year: '2017',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]
