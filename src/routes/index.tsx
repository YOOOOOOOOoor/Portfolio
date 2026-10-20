import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Spotlight } from "@/components/fx/Spotlight";
import { BlurText, Magnet } from "@/components/fx/reactbits";
import { projectTechnologies } from "@/data/project-technologies";
import {
  useHomeSectionNavigation,
  useHomeSectionTarget,
  useScrollTo,
} from "@/components/fx/section-navigation";
import ecommerceShot from "@/assets/ecommerce.jpg";
import fomaShot from "@/assets/foma.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yordanos Teshome | Software Engineering Student & Developer" },
      {
        name: "description",
        content:
          "I'm a Software Engineering student who builds full-stack applications and interactive projects, including an online shop and a football management game.",
      },
      {
        property: "og:title",
        content: "Yordanos Teshome | Software Engineering Student & Developer",
      },
      {
        property: "og:description",
        content:
          "Two projects by Yordanos Teshome: a full-stack e-commerce app and FoMA, a football management simulator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PROFILE = {
  name: "Yordanos Teshome",
  location: "",
  email: "tyordi132@gmail.com",
  github: "",
  linkedin: "",
};

const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    no: "01",
    slug: "ecommerce",
    name: "Full-Stack E-commerce",
    brand: "Online shop · PERN stack",
    url: "https://fullstack-ecommerce-ashen.vercel.app/",
    image: ecommerceShot,
    blurb:
      "A PERN stack shop with product categories, customer accounts, wishlists, order history and a payment flow.",
    tags: projectTechnologies.ecommerce.map(({ name }) => name),
  },
  {
    no: "02",
    slug: "foma",
    name: "FoMA Football Simulator",
    brand: "Football management · Career mode",
    url: "https://fo-ma-iota.vercel.app/",
    image: fomaShot,
    blurb:
      "A browser football sim with career saves, squad and tactics management, transfers and match simulation.",
    tags: projectTechnologies.foma.map(({ name }) => name),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Index() {
  useHomeSectionTarget();
  const go = useScrollTo();
  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-background">
      <button
        onClick={() => go("work")}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to work
      </button>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const go = useHomeSectionNavigation();
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 120],
    [
      "color-mix(in oklab, var(--background) 0%, transparent)",
      "color-mix(in oklab, var(--background) 82%, transparent)",
    ],
  );
  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line backdrop-blur-md"
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"
        aria-label="Main"
      >
        <button
          onClick={() => go("top")}
          className="flex items-center gap-2 font-mono text-sm tracking-tight"
        >
          <img src="/yt-mark.svg" alt="" width={30} height={30} />
          <span>{PROFILE.name}</span>
        </button>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className="group rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="text-ember">0{i + 1}</span> {n.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            {NAV.map((n, i) => (
              <li key={n.id}>
                <button
                  onClick={() => {
                    setOpen(false);
                    go(n.id);
                  }}
                  className="flex w-full items-baseline gap-4 px-5 py-4 text-left font-display text-3xl font-semibold"
                >
                  <span className="font-mono text-xs text-ember">0{i + 1}</span>
                  {n.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const go = useScrollTo();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section
      id="top"
      ref={ref}
      tabIndex={-1}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 md:pb-20"
    >
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_30%,black_20%,transparent_70%)]"
        aria-hidden
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
      <div
        aria-hidden
        className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-ember/20 blur-[140px]"
      />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8"
      >
        <h1 className="font-display text-[clamp(3rem,11vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.045em]">
          <BlurText text="Full-stack" className="block" animateOnMount />
          <span className="block">
            <BlurText text="developer," delay={0.06} animateOnMount />{" "}
            <motion.em
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.14, duration: 0.55, ease }}
              className="font-serif font-normal italic tracking-normal text-gradient-ember"
            >
              shipping
            </motion.em>
          </span>
          <BlurText
            text="real products."
            delay={0.12}
            className="block text-muted-foreground"
            animateOnMount
          />
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55, ease }}
            className="max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            I'm a Software Engineering student. I build full-stack apps, from the data and APIs to
            the interface people use.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55, ease }}
            className="flex flex-wrap gap-3"
          >
            <Magnet>
              <button
                onClick={() => go("work")}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-medium text-primary-foreground shadow-ember transition-transform active:scale-95"
              >
                Explore my work
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:rotate-[-45deg]" />
              </button>
            </Magnet>
            <Magnet>
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-4 font-medium transition-colors hover:bg-accent"
              >
                Contact me
              </button>
            </Magnet>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["Databases", "APIs", "Interfaces", "Payments", "Game logic", "Deployment"];
  const row = [...words, ...words];
  return (
    <div className="border-y border-line bg-ink py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl font-semibold text-muted-foreground md:text-3xl"
          >
            {w}
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ no, children }: { no: string; children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
    >
      <span className="text-ember">{no}</span>
      <span className="h-px w-10 bg-border" />
      {children}
    </motion.div>
  );
}

function Work() {
  return (
    <section id="work" tabIndex={-1} className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionLabel no="01">Selected work</SectionLabel>
      <h2 className="max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
        <BlurText text="A couple of things I've built." />{" "}
      </h2>
      <div className="mt-16 border-t border-line">
        {PROJECTS.map((p) => (
          <Project key={p.no} p={p} />
        ))}
      </div>
    </section>
  );
}

function Project({ p }: { p: (typeof PROJECTS)[number] }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease }}
      data-cursor-label="Explore"
      data-project-image={p.image}
      className="group/project border-b border-line"
    >
      <a
        href={`/work/${p.slug}`}
        aria-label={`Explore ${p.name} case study`}
        className="block py-10 outline-none focus-visible:ring-2 focus-visible:ring-ember md:py-14 lg:py-16"
      >
        <div className="grid items-center gap-5 md:grid-cols-[5rem_1fr_auto] md:gap-8">
          <span className="font-mono text-sm text-ember">{p.no}</span>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[.2em] text-muted-foreground">
              {p.brand}
            </p>
            <h3 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight transition-colors group-hover/project:text-ember md:text-6xl lg:text-7xl">
              {p.name}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {p.blurb}
            </p>
            {p.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember md:mt-0">
            Explore{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/project:translate-x-1 group-hover/project:-translate-y-1" />
          </span>
        </div>
        <div className="project-static-preview mt-6 aspect-[16/9] overflow-hidden rounded-xl border border-line md:hidden">
          <img
            src={p.image}
            alt={`${p.name} project preview`}
            loading="lazy"
            width={1440}
            height={900}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </a>
    </motion.article>
  );
}

function About() {
  return (
    <section id="about" tabIndex={-1} className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-12 md:px-8 md:py-40">
        <div className="md:col-span-4">
          <SectionLabel no="02">About</SectionLabel>
        </div>
        <div className="md:col-span-8">
          <p className="font-display text-3xl font-medium leading-[1.2] tracking-tight md:text-5xl">
            <BlurText
              stagger={0.03}
              text="I'm studying Software Engineering and learning by building applications from the data layer up."
            />{" "}
            <span className="font-serif italic text-muted-foreground">
              Then I work through the details on screen.
            </span>
          </p>
          <div className="mt-12 grid gap-8 text-muted-foreground sm:grid-cols-2">
            <p>
              I like working across the stack: shaping data, writing APIs and making the interface
              clear on a phone as well as a desktop.
            </p>
            <p>
              Most of what I know comes from building projects and figuring out what each part needs
              to do. I'm looking for opportunities to keep learning alongside a team and contribute
              useful software.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState("JavaScript");
  const reduceMotion = useReducedMotion();
  const technologies: [string, string, string][] = [
    [
      "JavaScript",
      "Languages",
      "FoMA uses it for careers, seasons, transfers and match simulation.",
    ],
    ["HTML", "Languages", "HTML5 provides the base structure for web pages."],
    ["CSS", "Languages", "CSS3 styles FoMA's management screens and this portfolio."],
    ["SQL", "Languages", "A query language for relational databases."],
    ["Python", "Languages", "Another language in my toolkit."],
    ["TypeScript", "Languages", "Typesafe code used in this portfolio."],
    ["React", "Frontend", "Used for this portfolio and the two project interfaces."],
    ["React DOM", "Frontend", "Connects React interfaces to the browser."],
    ["JSX", "Frontend", "The component syntax used with React in FoMA."],
    ["Tailwind CSS", "Frontend", "Styles this portfolio's responsive layouts."],
    ["Node.js", "Backend", "Runs the e-commerce server and FoMA project tooling."],
    ["Express.js", "Backend", "Handles the e-commerce application's API."],
    ["REST APIs", "Backend", "The e-commerce app connects its client to server endpoints."],
    ["PostgreSQL", "Databases", "Stores relational data for the e-commerce app."],
    ["MongoDB", "Databases", "A document database I've worked with."],
    ["MySQL", "Databases", "A relational database I've worked with."],
    ["Git", "Tools", "Tracks changes across the projects."],
    ["GitHub", "Tools", "Hosts repositories and project code."],
    ["Vite", "Tools", "Builds this portfolio and the FoMA app."],
    ["npm", "Tools", "Installs packages and runs project commands."],
    ["Vercel", "Tools", "Hosts the featured project sites."],
    ["Render", "Tools", "A deployment platform I've used."],
    ["TanStack Start / Router", "Tools", "Runs routes and server rendering in this portfolio."],
    ["Vitest-style tests", "Tools", "FoMA tests cover seasons, simulation and transfers."],
    ["Motion", "Animation & Motion", "Drives transitions and scroll reveals here."],
    ["Lenis", "Animation & Motion", "Handles smooth scrolling in this portfolio."],
  ];
  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Databases",
    "Languages",
    "Tools",
    "Animation & Motion",
  ];
  const visibleTechnologies = technologies.filter(
    ([, category]) => filter === "All" || category === filter,
  );
  useEffect(() => {
    if (!visibleTechnologies.some(([name]) => name === selected))
      setSelected(visibleTechnologies[0]?.[0] ?? "React");
  }, [filter, selected, visibleTechnologies]);
  const current = technologies.find(([name]) => name === selected) ?? technologies[0]!;
  return (
    <section id="stack" tabIndex={-1} className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <SectionLabel no="03">Stack</SectionLabel>
      <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
        Tools I{" "}
        <span className="font-serif font-normal italic text-gradient-ember">reach for.</span>
      </h2>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Here are the tools behind these projects and this site. Select one to see where it fits.
      </p>
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter technologies by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${filter === category ? "border-ember bg-ember/10 text-foreground" : "border-line text-muted-foreground hover:border-ember/60"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div layout={!reduceMotion} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {visibleTechnologies.map(([name, category]) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            aria-pressed={selected === name}
            className={`rounded-xl border p-4 text-left transition-colors hover:border-ember/60 focus-visible:border-ember ${selected === name ? "border-ember bg-ember/10 text-foreground" : "border-line bg-card text-muted-foreground"}`}
          >
            <span className="mr-3 text-ember">✳</span>
            {name}
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider opacity-60">
              {category}
            </span>
          </button>
        ))}
      </motion.div>
      <div aria-live="polite" className="mt-6 rounded-2xl border border-line bg-ink p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ember">{current[1]}</p>
        <h3 className="mt-2 font-display text-2xl">{current[0]}</h3>
        <p className="mt-2 text-muted-foreground">{current[2]}</p>
      </div>
    </section>
  );
}

function Contact() {
  const [feedback, setFeedback] = useState("");
  const links = [
    PROFILE.github && { label: "GitHub", href: PROFILE.github },
    PROFILE.linkedin && { label: "LinkedIn", href: PROFILE.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];
  return (
    <section id="contact" tabIndex={-1} className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="absolute left-1/2 top-full h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/25 blur-[160px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-28 text-center md:px-8 md:py-44">
        <SectionLabel no="04">Contact</SectionLabel>
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
          Start a conversation
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Open to product engineering roles, freelance builds, and collaboration on motion-heavy web
          experiences.
        </p>
        <form
          className="mx-auto mt-10 grid max-w-2xl gap-5 text-left"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const name = String(data.get("name") ?? "").trim();
            const email = String(data.get("email") ?? "").trim();
            const message = String(data.get("message") ?? "").trim();
            const subject = `Portfolio inquiry — ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailto = `mailto:${PROFILE.email}?${new URLSearchParams({
              subject,
              body,
            }).toString()}`;
            try {
              window.location.assign(mailto);
              setFeedback("Email draft requested. You still need to send it from your email app.");
            } catch {
              setFeedback(
                "Could not open an email draft. Check your browser's email app settings.",
              );
            }
          }}
        >
          <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Name
            <input
              name="name"
              autoComplete="name"
              required
              className="rounded-xl border border-line bg-card px-4 py-3 font-sans text-base normal-case tracking-normal text-foreground outline-none focus-visible:border-ember"
            />
          </label>
          <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-xl border border-line bg-card px-4 py-3 font-sans text-base normal-case tracking-normal text-foreground outline-none focus-visible:border-ember"
            />
          </label>
          <label className="grid gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Message
            <textarea
              name="message"
              rows={5}
              required
              className="resize-y rounded-xl border border-line bg-card px-4 py-3 font-sans text-base normal-case tracking-normal text-foreground outline-none focus-visible:border-ember"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground shadow-ember transition-transform active:scale-95"
            >
              Send message
            </button>
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {feedback}
            </p>
          </div>
        </form>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-4 font-medium hover:bg-accent"
            >
              {l.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const go = useHomeSectionNavigation();
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}.
        </p>
        <ul className="flex flex-wrap gap-5">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className="uppercase tracking-widest hover:text-foreground"
              >
                {n.label}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => go("top")} className="uppercase tracking-widest text-ember">
              Top ↑
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
