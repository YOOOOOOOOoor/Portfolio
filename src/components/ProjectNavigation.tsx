import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type NavigationProject = {
  slug: string;
  name: string;
  category: string;
  image: string;
};

type ProjectNavigationProps = {
  previousProject: NavigationProject | null;
  nextProject: NavigationProject | null;
};

function NavigationCard({
  direction,
  project,
}: {
  direction: "previous" | "next";
  project: NavigationProject | null;
}) {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "Previous project" : "Next project";
  const Arrow = isPrevious ? ArrowLeft : ArrowRight;
  const body = (
    <div
      className={
        "group flex h-full items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-colors duration-300 " +
        (project ? "hover:border-ember hover:bg-ink/70" : "opacity-70")
      }
    >
      {isPrevious && (
        <span className="inline-flex shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-ember">
          <Arrow size={20} aria-hidden="true" />
        </span>
      )}
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-ink sm:h-24 sm:w-32">
        {project ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {isPrevious ? "Start" : "End"}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[.18em] text-ember">{label}</p>
        <p className="mt-2 truncate font-display text-lg font-semibold leading-tight sm:text-xl">
          {project?.name ?? (isPrevious ? "First project" : "End of projects")}
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project?.category ??
            (isPrevious
              ? "You are at the beginning of the project list."
              : "You have reached the last project.")}
        </p>
      </div>
      {!isPrevious && (
        <span className="inline-flex shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember">
          <Arrow size={20} aria-hidden="true" />
        </span>
      )}
    </div>
  );

  return project ? (
    <Link
      to="/work/$project"
      params={{ project: project.slug }}
      aria-label={label + ": " + project.name}
      className="block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {body}
    </Link>
  ) : (
    <div aria-label={label + ": no project"} aria-disabled="true" className="h-full rounded-2xl">
      {body}
    </div>
  );
}

export function ProjectNavigation({ previousProject, nextProject }: ProjectNavigationProps) {
  const reduceMotion = useReducedMotion();
  return (
    <section aria-label="Project navigation" className="border-t border-line bg-ink/40">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <NavigationCard direction="previous" project={previousProject} />
          <NavigationCard direction="next" project={nextProject} />
        </motion.div>
      </div>
    </section>
  );
}
