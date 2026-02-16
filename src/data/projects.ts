export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  year: string;
  context?: string;
  role: string;
  tags: string[];
  tools?: string[];
  keyDecisions?: string[];
  outcome: string;
  /** Optional single image for list/card. */
  image?: string;
  /** Multiple images for the project page (gallery). */
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "lies-feed-hate",
    title: "Lies Feed Hate",
    subtitle:
      "Designing data visualizations to counter misinformation on migration",
    summary:
      "A long-form, data-driven editorial project developed at Verificat to expose and contextualize false narratives around migration in Spain and Catalonia. The project combined rigorous data analysis with visual journalism to build an evidence-based repository that could be used by journalists, educators, and civil organizations.\n\nThe visual system was designed to handle sensitive topics with restraint, prioritizing clarity and completeness over emotional impact, while still making the information accessible to non-specialist audiences.",
    year: "2023",
    context:
      "Misinformation about migration often relies on simplified or misleading representations of data. This project aimed to provide a rigorous, evidence-based visual repository to counter those narratives responsibly.",
    role: "Visual and web design lead. Information architecture, visual system, chart design, and overall narrative structure.",
    tags: ["Data Visualization", "Editorial", "Fact-checking"],
    tools: ["D3.js", "Figma", "Illustrator"],
    keyDecisions: [
      "Prioritized clarity and completeness over immediacy, accepting higher visual density where necessary.",
      "Used restrained color encoding to avoid emotional bias in sensitive topics.",
      "Structured the project as a modular system rather than isolated articles.",
    ],
    outcome:
      "One of Verificat's most comprehensive investigations, widely referenced by educators, journalists, and civil organizations.",
    images: [
      "/images/projects/lies-feed-hate/01.webp",
      "/images/projects/lies-feed-hate/02.webp",
      "/images/projects/lies-feed-hate/03.webp",
      "/images/projects/lies-feed-hate/04.webp",
      "/images/projects/lies-feed-hate/05.webp",
    ],
  },
  {
    slug: "electoral-information-system",
    title: "Electoral Information System",
    subtitle:
      "Designing an interactive system to explain elections to young audiences",
    summary:
      "An interactive editorial prototype developed as part of the digital relaunch of Diari de Barcelona, aimed at making electoral processes understandable for readers aged 16-30.\n\nThe project moved away from conventional election coverage (party-centric, results-driven) toward a systems-thinking approach: explaining how elections work, why they're structured the way they are, and what the data actually means.",
    year: "2024",
    context:
      "Elections are often covered through party-centric narratives that overlook how the system itself works. Young audiences in particular lack structured access to this information.",
    role: "Sole author. Research, concept development, content strategy, UX, data framing, and visual design.",
    tags: ["Information Design", "Interactive", "Civic"],
    tools: ["Figma", "HTML/CSS", "JavaScript"],
    keyDecisions: [
      "Focused on explaining electoral mechanics rather than only results.",
      "Used step-by-step visual explanations where precision mattered more than speed.",
      "Designed a consistent color logic to support comparison across parties and territories.",
    ],
    outcome:
      "A full interactive prototype demonstrating how political data can be structured as an information system. Bachelor's thesis project.",
    images: [
      "/images/projects/electoral-information-system/01.webp",
      "/images/projects/electoral-information-system/02.webp",
      "/images/projects/electoral-information-system/03.webp",
      "/images/projects/electoral-information-system/04.webp",
      "/images/projects/electoral-information-system/05.webp",
      "/images/projects/electoral-information-system/06.webp",
    ],
  },
  {
    slug: "verificat-social",
    title: "Verificat Social",
    subtitle:
      "Translating verified data into clear, scalable visual explanations",
    summary:
      "A collection of information design pieces created to communicate verified data across constrained formats such as Instagram carousels and TikTok videos.\n\nThe challenge was maintaining editorial rigor and visual clarity within the severe constraints of social media: small screens, short attention spans, algorithmic pressures. Each piece had to work as a self-contained unit of understanding.",
    year: "2020–2024",
    context:
      "Fact-checking organizations need to reach audiences where misinformation spreads: social platforms. The formats demand visual systems that are both scalable and editorially precise.",
    role: "Information design lead. Visual system development, format definition, and execution across Instagram, TikTok, and web.",
    tags: ["Information Design", "Social Media", "Visual Systems"],
    tools: ["Figma", "After Effects", "Illustrator"],
    keyDecisions: [
      "Developed a modular visual system that could scale across different platforms and topics.",
      "Created template structures that maintained design quality at high output volume.",
      "Balanced pedagogical clarity with the engagement demands of social algorithms.",
    ],
    outcome:
      "Helped Verificat reach younger audiences while maintaining editorial rigor. Significant growth in social engagement metrics.",
    images: [
      "/images/projects/verificat-social/01.webp",
      "/images/projects/verificat-social/02.webp",
      "/images/projects/verificat-social/03.webp",
      "/images/projects/verificat-social/04.webp",
    ],
  },
  {
    slug: "desfake",
    title: "Desfake",
    subtitle: "Brand and visual system for a media literacy initiative",
    summary:
      "Brand identity and visual system for Desfake, a media literacy project by Verificat targeting secondary school students across Catalonia.\n\nThe visual language needed to feel bold and approachable for Gen Z audiences while conveying pedagogical seriousness. The system had to work across printed materials, digital platforms, and classroom presentations.",
    year: "2022",
    context:
      "Media literacy education for teenagers requires visual languages that feel credible to young audiences without being condescending. The brand needed to bridge the gap between educational rigor and youth culture.",
    role: "Brand and visual system designer. Logo, color system, typography, layout templates, and application guidelines.",
    tags: ["Branding", "Visual Systems", "Education"],
    tools: ["Figma", "Illustrator", "InDesign"],
    keyDecisions: [
      "Combined bold geometric shapes with a high-contrast color palette to stand out in classroom settings.",
      "Designed the system to be implementable by non-designers (teachers, educators).",
      "Created a flexible identity that works across print, digital, and presentation formats.",
    ],
    outcome:
      "The project is actively used in schools across Catalonia as part of Verificat's educational programs.",
    images: [
      "/images/projects/desfake/01.webp",
      "/images/projects/desfake/02.webp",
      "/images/projects/desfake/03.webp",
      "/images/projects/desfake/04.webp",
      "/images/projects/desfake/05.webp",
      "/images/projects/desfake/06.webp",
      "/images/projects/desfake/07.webp",
      "/images/projects/desfake/08.webp",
    ],
  },
  {
    slug: "forbes-data-journalism",
    title: "Forbes / Forbes Women",
    subtitle:
      "Data-driven reporting and editorial infographics for print and digital",
    summary:
      "Data-driven articles and double-page infographics developed during an internship at Storydata for print and digital editions of Forbes Spain and Forbes Women.\n\nThe work involved the full pipeline: identifying stories in data, structuring the narrative, designing the visual system, and producing print-ready infographics that worked within the magazine's editorial constraints.",
    year: "2024",
    context:
      "Business and economic journalism often struggles to make data compelling for general audiences. Forbes required infographics that were both analytically rigorous and visually striking within print constraints.",
    role: "Data journalist. Research, data analysis, writing, and infographic design for print and digital editions.",
    tags: ["Data Journalism", "Infographics", "Print"],
    tools: ["Excel", "Illustrator", "Datawrapper"],
    outcome:
      "Multiple published articles and infographics in Forbes Spain and Forbes Women, contributing data-driven depth to the magazine's editorial coverage.",
    images: [
      "/images/projects/forbes-data-journalism/01.webp",
      "/images/projects/forbes-data-journalism/02.webp",
      "/images/projects/forbes-data-journalism/03.webp",
      "/images/projects/forbes-data-journalism/04.webp",
    ],
  },
];
