import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ProjectTechnologyGroup } from "@/data/project-technologies";

export function TechnologyStack({ groups }: { groups: ProjectTechnologyGroup[] }) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      nextIndex = (index + 1) % groups.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      nextIndex = (index - 1 + groups.length) % groups.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = groups.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      buttons.current[nextIndex]?.focus();
    }
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2" aria-label="Technology groups">
      {groups.map((group, index) => {
        const isOpen = activeGroup === group.name;
        const panelId = "technology-group-" + index;
        return (
          <motion.li
            layout
            key={group.name}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { layout: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }
            }
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setActiveGroup(group.name);
            }}
            className="overflow-hidden rounded-xl border border-line bg-card transition-colors duration-300 hover:border-ember/70"
          >
            <button
              ref={(element) => {
                buttons.current[index] = element;
              }}
              id={"technology-heading-" + index}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActiveGroup(isOpen ? null : group.name)}
              onFocus={() => setActiveGroup(group.name)}
              onKeyDown={(event) => moveFocus(event, index)}
              className="group flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember"
            >
              <span className="font-mono text-sm uppercase tracking-[.12em] text-foreground transition-colors group-hover:text-ember group-focus-visible:text-ember">
                {group.name}
              </span>
              <span
                aria-hidden="true"
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ember transition-transform duration-300 " +
                  (isOpen ? "rotate-180" : "")
                }
              >
                <ChevronDown size={15} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={"technology-heading-" + index}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-2 border-t border-line/80 px-5 py-4">
                    {group.technologies.map((technology) => (
                      <li key={technology.name} className="border-l border-ember/50 pl-3">
                        <p className="text-sm font-medium text-foreground">{technology.name}</p>
                        {technology.description && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {technology.description}
                          </p>
                        )}
                        {technology.note && (
                          <p className="mt-1 font-mono text-[10px] leading-relaxed text-ember">
                            {technology.note}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
