export type ProjectTechnology = {
  name: string;
  role: string;
};

export const projectTechnologies = {
  ecommerce: [
    { name: "React", role: "Builds the shopping interface." },
    { name: "Node.js", role: "Runs the server-side application." },
    { name: "Express", role: "Handles the application API." },
    { name: "PostgreSQL", role: "Stores the application's relational data." },
  ],
  foma: [
    { name: "React 18", role: "Renders the interface and management screens." },
    {
      name: "JavaScript (ES6+)",
      role: "Powers careers, seasons, tactics, players, transfers and match simulation.",
    },
    { name: "JSX", role: "Describes the React interface in components." },
    { name: "Vite", role: "Runs the development server and production build." },
    { name: "HTML5", role: "Provides the page structure." },
    { name: "CSS3", role: "Styles the management screens and layouts." },
    { name: "React DOM", role: "Connects React components to the browser." },
    { name: "Node.js / npm", role: "Runs project commands and manages packages." },
    {
      name: "Vitest-style tests",
      role: "Cover career history, season economy, simulation runtime, transfers and management.",
    },
  ],
} satisfies Record<"ecommerce" | "foma", ProjectTechnology[]>;
