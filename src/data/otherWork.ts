export interface OtherWorkItem {
  title: string;
  subtitle: string;
  url: string;
  image?: string;
  year?: string;
  kind: "Talk" | "Podcast";
  ctaText: string;
}

/** Same titles, subtitles, years (and images where available) as in work experience / project cards. */
export const otherWork: OtherWorkItem[] = [
  {
    title: "TEDxUPF Talk",
    subtitle: "The future of media: evolution, revolution and disruption",
    url: "https://www.ted.com/",
    image: "/images/projects/tedxupf/01.jpg",
    year: "2023",
    kind: "Talk",
    ctaText: "Watch talk",
  },
  {
    title: "Destruir la Democràcia",
    subtitle: "Narrative podcast on how democracies erode from within",
    url: "https://open.spotify.com/",
    image: "https://picsum.photos/seed/democracia1/1200/675",
    year: "2025",
    kind: "Podcast",
    ctaText: "Listen",
  },
];
