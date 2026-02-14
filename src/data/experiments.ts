export interface Experiment {
  title: string;
  shortDescription: string;
  url: string;
  image: string;
  year?: string;
  tags?: string[];
}

/** Small experiments and prototypes made with vibe coding (AI-assisted). */
export const experiments: Experiment[] = [
  {
    title: "Experiment 1",
    shortDescription: "Small prototype or plaything made with vibe coding.",
    url: "https://github.com",
    image: "https://picsum.photos/seed/exp1/800/450",
    year: "2025",
    tags: ["Vibe coding"],
  },
  {
    title: "Experiment 2",
    shortDescription: "Another experiment with AI-assisted coding.",
    url: "https://codepen.io",
    image: "https://picsum.photos/seed/exp2/800/450",
    year: "2025",
    tags: ["Vibe coding"],
  },
];
