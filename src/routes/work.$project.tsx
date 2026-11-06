import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { TiltCard } from "@/components/fx/TiltCard";
import { ProjectNavigation } from "@/components/ProjectNavigation";
import { TechnologyStack } from "@/components/TechnologyStack";
import { projectTechnologies } from "@/data/project-technologies";
import ecommerceShot from "@/assets/ecommerce.jpg";
import fomaShot from "@/assets/foma.jpg";
import habeshaDashboard from "@/assets/habesha-learn-dashboard.png";
import habeshaOverview from "@/assets/habesha-learn-document-overview.png";
import habeshaQuiz from "@/assets/habesha-learn-quiz.png";

const projects = {
  ecommerce: {
    name: "Full-Stack E-commerce",
    category: "Online shop · Full-stack app",
    brand: "Yordi Store / EthioShopping",
    url: "https://fullstack-ecommerce-v2.vercel.app/",
    github: "https://github.com/YOOOOOOOOor/Fullstack-Ecommerce-V2",
    apiUrl: "https://fullstack-ecommerce-y6d2.onrender.com/",
    image: ecommerceShot,
    summary:
      "A full-stack store connecting a customer shopping journey to an API and relational data store.",
    overview:
      "The application brings catalog browsing, customer accounts, wishlists, checkout, and order history into one shopping flow. It pairs a React interface with a Node.js and Express API and PostgreSQL, so the customer-facing screens and persisted commerce data have a clear boundary.",
    features: [
      "Browse products and categories",
      "Create an account and sign in",
      "Save products to a wishlist",
      "Proceed through checkout",
      "Place and review orders",
    ],
    architecture: ["React client", "Express 5 API · Node.js", "PostgreSQL"],
    anatomy:
      "The browser client makes HTTP requests to the separately deployed API. The API handles application requests and uses PostgreSQL for relational data. Cloudinary and Multer appear in the supplied stack for image handling; specific payment and storage integrations are not named here.",
    stack: projectTechnologies.ecommerce,
  },
  foma: {
    name: "FoMA Football Simulator",
    category: "Football management · Browser game",
    brand: "Football Management · Career Mode",
    url: "https://fo-ma-iota.vercel.app/",
    github: "https://github.com/YOOOOOOOOoor/FoMA",
    image: fomaShot,
    apiUrl: undefined,
    summary:
      "A browser football management simulator built around connected career, team, and match systems.",
    overview:
      "Start or continue a career, manage a squad and transfers, choose tactics, and simulate matches as the season advances. The interesting engineering work is the connection between those management decisions and the evolving career and match state.",
    features: [
      "Create, continue, or load a career",
      "Manage players, teams, and transfers",
      "Set tactics before a match",
      "Run the match simulation",
      "Advance career and season progression",
      "Track season statistics and economy",
    ],
    architecture: ["React interface", "JavaScript game systems", "Career and season state"],
    anatomy:
      "React renders the management screens while JavaScript drives the career, season economy, tactics, transfers, and simulation runtime. The project is presented as a browser application; no separate backend or database is part of the supplied technology list.",
    stack: projectTechnologies.foma,
  },
  "habesha-learn": {
    name: "Habesha Learn",
    category: "Full-stack / AI-powered education",
    brand: "Habesha Learn",
    url: "https://habesha-learn.vercel.app/",
    github: "",
    image: habeshaDashboard,
    summary:
      "An AI-powered learning platform that transforms uploaded study PDFs into structured learning materials, quizzes, and interactive study assistance.",
    overview:
      "Students often have long study PDFs but limited time to turn them into useful revision material. Habesha Learn lets students upload a document, review an AI-generated overview and structured learning sections, study key terms, take quizzes, and ask an AI assistant questions about the material.",
    features: [
      "PDF upload and processing",
      "AI-generated overviews and learning sections",
      "Key terms",
      "AI-generated quizzes",
      "Interactive AI study assistant",
      "OCR fallback for scanned PDFs",
      "Guest sessions and document management",
    ],
    architecture: ["React client", "Express API · PostgreSQL", "Python PDF/OCR service", "Google Gemini"],
    anatomy:
      "The browser client sends document and study requests to the Node.js and Express API. The API coordinates persistent data in PostgreSQL, calls the Python FastAPI service to extract PDF text and page-level OCR results, and uses Google Gemini to create learning content and answer study questions. PyMuPDF extracts selectable text; Tesseract handles scanned pages when needed. The frontend communicates with the API over HTTP.",
    stack: projectTechnologies.habeshaLearn,
  },
} as const;

export const Route = createFileRoute("/work/$project")({
  beforeLoad: ({ params }) => {
    if (!(params.project in projects)) throw notFound();
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project: slug } = Route.useParams();
  const project = projects[slug as keyof typeof projects];
  const reduceMotion = useReducedMotion();
  return (
    <main className="grain relative isolate min-h-screen overflow-x-clip bg-background">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8">
        <Link
          to="/"
          state={{ portfolioScrollTarget: "work" }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to work
        </Link>
        <span className="font-mono text-xs text-ember">CASE STUDY / {project.name}</span>
      </header>
      <motion.article
        className="relative z-10"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
          <p className="font-mono text-xs uppercase tracking-[.2em] text-ember">
            {project.category}
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.95] tracking-tight md:text-8xl">
            {project.name}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              Open live demo <ArrowUpRight size={17} />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-6 py-3 font-medium hover:border-ember"
              >
                GitHub repository <ArrowUpRight size={17} />
              </a>
            )}
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div data-image-glow className="case-study-image-glow-host">
            <div className="case-study-glow" aria-hidden="true" />
            <TiltCard>
              <div className="relative z-[1] overflow-hidden rounded-2xl border border-line bg-card shadow-deep">
                <img
                  src={project.image}
                  alt={
                    slug === "ecommerce"
                      ? "EthioShopping home screen with product discovery and login navigation"
                      : slug === "habesha-learn"
                        ? "Habesha Learn student dashboard"
                        : "FoMA career menu with continue, new game, load game, and settings options"
                  }
                  width={slug === "habesha-learn" ? 1456 : 1440}
                  height={slug === "habesha-learn" ? 735 : 900}
                  fetchPriority="high"
                  className={slug === "habesha-learn" ? "block h-auto w-full" : "block aspect-[16/9] w-full object-cover object-top"}
                />
              </div>
            </TiltCard>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[.7fr_1.3fr] md:px-8 md:py-28">
          <aside>
            <p className="font-mono text-xs uppercase tracking-widest text-ember">01 / Overview</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">What it does</h2>
          </aside>
          <div>
            <p className="text-xl leading-relaxed text-muted-foreground">{project.overview}</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ember">
              How it works
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{project.anatomy}</p>
            {slug === "habesha-learn" && (
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Upload a PDF study document.",
                  "Extract and process its content, with OCR fallback for scanned PDFs.",
                  "Generate structured learning content using AI.",
                  "Study the generated sections and key terms.",
                  "Test understanding with quizzes or ask the AI study assistant questions.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-xl border border-line bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-mono text-ember">0{index + 1}</span>{step}
                  </li>
                ))}
              </ol>
            )}
            <h3 className="mt-10 font-mono text-xs uppercase tracking-widest text-ember">
              Application flow
            </h3>
            <div
              className="mt-4 flex flex-wrap items-center gap-2"
              aria-label={`Architecture: ${project.architecture.join(" to ")}`}
            >
              {project.architecture.map((part, index) => (
                <div key={part} className="flex items-center gap-2">
                  <span className="rounded-lg border border-line bg-card px-4 py-3 text-sm text-foreground">
                    {part}
                  </span>
                  {index < project.architecture.length - 1 && (
                    <span aria-hidden="true" className="text-ember">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {slug === "habesha-learn" && (
          <section className="border-y border-line bg-ink/90">
            <div className="mx-auto max-w-7xl space-y-16 px-5 py-20 md:px-8 md:py-28">
              {[
                { image: habeshaOverview, alt: "Habesha Learn document overview and generated learning content", title: "Document processing and generated learning content", text: "Once a document is processed, students can move through its generated overview, structured learning sections, and key terms." },
                { image: habeshaQuiz, alt: "Habesha Learn interactive quiz for checking understanding", title: "Interactive learning and assessment", text: "AI-generated quizzes give students a way to check their understanding, while the study assistant can respond to questions about the material." },
              ].map((item, index) => (
                <motion.section key={item.title} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65 }} className={`grid items-center gap-8 md:grid-cols-2 ${index % 2 ? "" : ""}`}>
                  <div className={index % 2 ? "md:order-2" : ""}>
                    <p className="font-mono text-xs uppercase tracking-widest text-ember">0{index + 1} / {index === 0 ? "Document learning" : "Practice"}</p>
                    <h2 className="mt-4 font-display text-3xl font-semibold">{item.title}</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                  <TiltCard>
                    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-deep">
                      <img src={item.image} alt={item.alt} loading="lazy" width={index === 0 ? 1169 : 1220} height={index === 0 ? 873 : 584} className="block h-auto w-full" />
                    </div>
                  </TiltCard>
                </motion.section>
              ))}
            </div>
          </section>
        )}
        <section className="border-y border-line bg-ink/90">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
            <p className="font-mono text-xs uppercase tracking-widest text-ember">02 / Features</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, i) => (
                <div key={feature} className="rounded-xl border border-line bg-card p-6">
                  <span className="font-mono text-xs text-ember">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-xl font-medium">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-[.7fr_1.3fr] md:px-8 md:py-28">
          <aside>
            <p className="font-mono text-xs uppercase tracking-widest text-ember">
              03 / Technology
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Built with</h2>
          </aside>
          <div>
            {slug === "habesha-learn" && <p className="mb-6 leading-relaxed text-muted-foreground">The listed stack was checked against the Habesha Learn package manifest, Express server, Python service dependencies, PDF extraction implementation, and frontend source.</p>}
            <TechnologyStack groups={project.stack} />
          </div>
        </section>
        <ProjectNavigation
          previousProject={getAdjacentProject(slug, -1)}
          nextProject={getAdjacentProject(slug, 1)}
        />
        <section className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
            <nav className="flex flex-wrap gap-3" aria-label="Page sections">
              <Link
                to="/"
                state={{ portfolioScrollTarget: "about" }}
                className="rounded-full border border-line px-5 py-3 hover:border-ember"
              >
                About
              </Link>
              <Link
                to="/"
                state={{ portfolioScrollTarget: "work" }}
                className="rounded-full border border-line px-5 py-3 hover:border-ember"
              >
                Work
              </Link>
              <Link
                to="/"
                state={{ portfolioScrollTarget: "contact" }}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 hover:border-ember"
              >
                <Mail size={16} /> Get in touch
              </Link>
            </nav>
          </div>
        </section>
      </motion.article>
    </main>
  );
}

function getAdjacentProject(slug: string, offset: -1 | 1) {
  const orderedProjects = Object.entries(projects);
  const currentIndex = orderedProjects.findIndex(([projectSlug]) => projectSlug === slug);
  const adjacentEntry = orderedProjects[currentIndex + offset];
  if (!adjacentEntry) return null;

  const [projectSlug, project] = adjacentEntry;
  return {
    slug: projectSlug,
    name: project.name,
    category: project.category,
    image: project.image,
  };
}
