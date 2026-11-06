export type ProjectTechnology = {
  name: string;
  description?: string;
  note?: string;
};

export type ProjectTechnologyGroup = {
  name: string;
  technologies: ProjectTechnology[];
};

export const projectTechnologies = {
  ecommerce: [
    {
      name: "React",
      technologies: [
        { name: "React 19" },
        { name: "JavaScript" },
        { name: "React Router" },
        { name: "Axios" },
        { name: "Vite" },
        { name: "Tailwind CSS 4" },
        { name: "shadcn/ui + Mantine" },
      ],
    },
    {
      name: "Node.js",
      technologies: [
        { name: "Node.js" },
        { name: "Express 5" },
        { name: "CORS" },
        { name: "Helmet" },
        { name: "Express Rate Limit" },
        { name: "Morgan" },
        { name: "Multer" },
      ],
    },
    {
      name: "PostgreSQL",
      technologies: [{ name: "PostgreSQL", description: "Relational database" }],
    },
    {
      name: "Authentication",
      technologies: [{ name: "JWT" }, { name: "Google OAuth" }, { name: "bcryptjs" }],
    },
    {
      name: "Services & Libraries",
      technologies: [
        { name: "Cloudinary" },
        { name: "Zod" },
        { name: "Recharts" },
        { name: "Lucide React" },
        { name: "React Icons" },
        { name: "Sonner" },
      ],
    },
    {
      name: "Development",
      technologies: [{ name: "ESLint" }, { name: "Nodemon" }],
    },
  ],
  foma: [
    {
      name: "React",
      technologies: [{ name: "React 18 + React DOM" }, { name: "JSX" }],
    },
    {
      name: "JavaScript & Web",
      technologies: [{ name: "JavaScript (ES6+)" }, { name: "HTML5" }, { name: "CSS3" }],
    },
    {
      name: "Development",
      technologies: [{ name: "Vite" }, { name: "Node.js + npm" }, { name: "Vitest" }],
    },
  ],
  habeshaLearn: [
    {
      name: "React",
      technologies: [{ name: "React 19" }],
    },
    {
      name: "Languages",
      technologies: [{ name: "TypeScript" }, { name: "JavaScript" }],
    },
    {
      name: "Node.js",
      technologies: [{ name: "Node.js" }, { name: "Express" }],
    },
    {
      name: "PostgreSQL",
      technologies: [{ name: "PostgreSQL" }],
    },
    {
      name: "Python PDF Processing",
      technologies: [
        { name: "Python" },
        { name: "FastAPI" },
        { name: "PyMuPDF" },
        { name: "Tesseract OCR" },
      ],
    },
    {
      name: "AI Integration",
      technologies: [
        {
          name: "Google Gemini API",
          description: "AI integration · document understanding and content generation.",
          note: "Default models: gemini-3.8-flash primary · gemini-3.5-flash-lite fallback",
        },
      ],
    },
    {
      name: "Frontend & Build",
      technologies: [{ name: "Tailwind CSS" }, { name: "Vite" }],
    },
  ],
} satisfies Record<"ecommerce" | "foma" | "habeshaLearn", ProjectTechnologyGroup[]>;
