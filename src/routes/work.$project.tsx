import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { TiltCard } from "@/components/fx/TiltCard";
import { projectTechnologies } from "@/data/project-technologies";
import ecommerceShot from "@/assets/ecommerce.jpg";
import fomaShot from "@/assets/foma.jpg";

const projects = {
  ecommerce: {
    name: "Full-Stack E-commerce",
    category: "Online shop · Full-stack app",
    brand: "Yordi Store / EthioShopping",
    url: "https://fullstack-ecommerce-ashen.vercel.app/",
    image: ecommerceShot,
    summary: "An online shop with product browsing, accounts, wishlists, orders and checkout.",
    overview:
      "I built the store around everyday shopping tasks: finding a product, saving it for later and placing an order. Customers can also return to their order history.",
    features: [
      "Product browsing and listings",
      "Accounts and authentication",
      "Wishlists",
      "Orders and order history",
      "Payment flow",
    ],
    anatomy:
      "The React client sends requests to an Express API running on Node.js. PostgreSQL stores the app's relational data.",
    stack: projectTechnologies.ecommerce,
    next: "foma",
  },
  foma: {
    name: "FoMA Football Simulator",
    category: "Football management · Browser game",
    brand: "Football Management · Career Mode",
    url: "https://fo-ma-iota.vercel.app/",
    image: fomaShot,
    summary:
      "A football management sim built around careers, squad decisions and match simulation.",
    overview:
      "Start a career, set up a squad and tactics, then run matches. Save options let you start fresh or continue a career later.",
    features: [
      "Start a new career",
      "Continue or load a save",
      "Manage the squad and transfers",
      "Set up tactics",
      "Simulate matches",
    ],
    anatomy:
      "React renders the management screens. JavaScript handles the career, season economy, tactics, transfers and match simulation.",
    stack: projectTechnologies.foma,
    next: "ecommerce",
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
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-medium text-primary-foreground"
          >
            Open the live project <ArrowUpRight size={17} />
          </a>
        </section>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div data-image-glow className="case-study-image-glow-host">
            <div className="case-study-glow" aria-hidden="true" />
            <TiltCard>
              <div className="relative z-[1] overflow-hidden rounded-2xl border border-line bg-card shadow-deep">
                <img
                  src={project.image}
                  alt={`${project.name} interface`}
                  width={1440}
                  height={900}
                  fetchPriority="high"
                  className="block aspect-[16/9] w-full object-cover object-top"
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
          </div>
        </div>
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
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.stack.map((technology) => (
                <li key={technology.name} className="rounded-xl border border-line bg-card p-5">
                  <h3 className="font-mono text-sm text-foreground">{technology.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {technology.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="border-t border-line">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-ember">Next project</p>
              <Link
                to="/work/$project"
                params={{ project: project.next }}
                className="mt-3 inline-flex items-center gap-2 font-display text-3xl font-semibold hover:text-ember"
              >
                {projects[project.next].name}
                <ArrowUpRight />
              </Link>
            </div>
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
