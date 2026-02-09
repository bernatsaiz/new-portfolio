export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  /** Optional single image for list/card. */
  image?: string;
  /** Multiple images for the project page (gallery). */
  images?: string[];
  context?: string;
  role: string;
  keyDecisions?: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    slug: "lies-feed-hate",
    title: "Lies Feed Hate",
    subtitle: "Designing data visualizations to counter misinformation on migration",
    summary:
      "A long-form, data-driven editorial project developed at Verificat to expose and contextualize false narratives around migration in Spain and Catalonia.",
    images: [
      "https://picsum.photos/seed/lies1/800/500",
      "https://picsum.photos/seed/lies2/800/500",
      "https://picsum.photos/seed/lies3/800/500",
    ],
    context:
      "Misinformation about migration often relies on simplified or misleading representations of data. This project aimed to provide a rigorous, evidence-based visual repository to counter those narratives responsibly.",
    role:
      "Visual and web design lead. I was responsible for the information architecture, visual system, chart design, and overall narrative structure.",
    keyDecisions: [
      "Prioritized clarity and completeness over immediacy, accepting higher visual density where necessary.",
      "Used restrained color encoding to avoid emotional bias in sensitive topics.",
      "Structured the project as a modular system rather than isolated articles.",
    ],
    outcome:
      "One of Verificat's most comprehensive investigations, widely referenced by educators, journalists, and civil organizations.",
  },
  {
    slug: "electoral-information-system",
    title: "Electoral Information System — Diari de Barcelona",
    subtitle: "Designing an interactive system to explain elections to young audiences",
    summary:
      "An interactive editorial prototype developed as part of the digital relaunch of Diari de Barcelona, aimed at making electoral processes understandable for readers aged 16–30.",
    images: [
      "https://picsum.photos/seed/electoral1/800/500",
      "https://picsum.photos/seed/electoral2/800/500",
    ],
    context:
      "Elections are often covered through party-centric narratives that overlook how the system itself works.",
    role:
      "Sole author. Research, concept development, content strategy, UX, data framing, and visual design.",
    keyDecisions: [
      "Focused on explaining electoral mechanics rather than only results.",
      "Used step-by-step visual explanations where precision mattered more than speed.",
      "Designed a consistent color logic to support comparison.",
    ],
    outcome:
      "A full interactive prototype demonstrating how political data can be structured as an information system.",
  },
  {
    slug: "verificat-social",
    title: "Verificat — Information Design for Social Platforms",
    subtitle: "Translating verified data into clear, scalable visual explanations",
    summary:
      "A collection of information design pieces created to communicate verified data across constrained formats such as Instagram and TikTok.",
    images: ["https://picsum.photos/seed/verificat1/800/500"],
    role:
      "Information design lead. Visual system development, format definition, and execution.",
    outcome:
      "Helped Verificat reach younger audiences while maintaining editorial rigor.",
  },
  {
    slug: "desfake",
    title: "Desfake",
    subtitle: "Brand and visual system for a media literacy initiative",
    summary:
      "Brand identity and visual system for Desfake, a media literacy project by Verificat targeting secondary school students.",
    images: [
      "https://picsum.photos/seed/desfake1/800/500",
      "https://picsum.photos/seed/desfake2/800/500",
    ],
    role: "Brand and visual system designer.",
    outcome: "The project is actively used in schools across Catalonia.",
  },
];
