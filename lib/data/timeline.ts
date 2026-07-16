// ─── Timeline / Journey Data ──────────────────────────────────────────────────

export interface Milestone {
  number: string;
  type: string;
  title: string;
  institution?: string;
  institutionUrl?: string;
  period?: string;
  description: string;
  highlights: string[];
  color: string;
  side: "left" | "right";
  logo?: string;
}

export const milestones: Milestone[] = [
  {
    number: "01",
    type: "Primary Education",
    title: "St. John Bosco Vidyalayam",
    description:
      "This is where my educational journey began. During these formative years, I developed curiosity, discipline, and a strong interest in learning and problem-solving.",
    highlights: [
      "Foundational Learning",
      "Critical Thinking",
      "Discipline & Growth",
    ],
    color: "#a8ff78",
    side: "right",
    logo: "/images/bosco.jpg",
  },
  {
    number: "02",
    type: "Secondary Education",
    title: "Jaffna Hindu College",
    institutionUrl: "https://jhc.lk/",
    description:
      "Completed secondary education while building a strong academic foundation in science and mathematics. Advanced Level stream in Physical Science with Combined Mathematics, Physics, and Chemistry.",
    highlights: ["Combined Mathematics", "Physics", "Chemistry"],
    color: "#06b6d4",
    side: "left",
    logo: "/images/jhc.jpeg",
  },
  {
    number: "03",
    type: "University Education",
    title: "Uva Wellassa University",
    institutionUrl: "https://www.uwu.ac.lk/",
    period: "2022 – 2026",
    description:
      "Pursuing BSc (Honours) in Computer Science and Technology — building practical expertise in full-stack development, modern web technologies, backend systems, databases, machine learning, and software engineering principles.",
    highlights: [
      "Full Stack Development",
      "Software Engineering",
      "Database Systems",
      "Machine Learning",
      "Research & Innovation",
    ],
    color: "#8b5cf6",
    side: "right",
    logo: "/images/uwu.jpg",
  },
  {
    number: "04",
    type: "Professional Development",
    title: "Real-World Projects & Growth",
    description:
      "Continuously improving through real-world software projects, certifications, technical research, and modern development practices. Each project has been a step forward in engineering quality and problem-solving.",
    highlights: [
      "Allora.AI Platform",
      "Smart Pharmacy System",
      "Automobile Service System",
      "Food Delivery App",
      "ML Research",
    ],
    color: "#f59e0b",
    side: "left",
  },
  {
    number: "05",
    type: "Future Vision",
    title: "Building for Tomorrow",
    description:
      "My goal is to become a highly skilled Software Engineer capable of designing and building scalable software products, cloud-native systems, and innovative technology solutions that create meaningful impact.",
    highlights: [
      "Software Architecture",
      "Cloud Computing",
      "DevOps",
      "Product Engineering",
      "Machine Learning",
    ],
    color: "#78ffd6",
    side: "right",
  },
];
