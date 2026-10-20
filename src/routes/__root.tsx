import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import { SmoothScroll } from "../components/fx/smooth-scroll";
import { PortfolioCursor } from "../components/fx/PortfolioCursor";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">This page isn’t here</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The address may have changed. Head back to the homepage to find the project you need.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn’t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading this page. Try again or return to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Yordanos Teshome | Software Engineering Student" },
      {
        name: "description",
        content:
          "I'm a Software Engineering student building full-stack applications and interactive projects.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/yt-mark.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style>{`
          #portfolio-intro { display: none; }
          html[data-show-portfolio-intro] #portfolio-intro {
            position: fixed; inset: 0; z-index: 2147483000;
            display: flex; align-items: center; justify-content: center;
            background: #211f1c; color: #f3f0e8;
          }
          @media (prefers-reduced-motion: no-preference) {
            html[data-show-portfolio-intro] #portfolio-intro {
              animation: portfolio-intro-failsafe 1.4s ease 0.15s forwards;
            }
            @keyframes portfolio-intro-failsafe {
              0%, 70% { opacity: 1; visibility: visible; }
              100% { opacity: 0; visibility: hidden; }
            }
          }
          @media (prefers-reduced-motion: reduce) {
            html[data-show-portfolio-intro] #portfolio-intro {
              animation: portfolio-intro-failsafe 0.001ms linear 500ms forwards;
            }
            @keyframes portfolio-intro-failsafe {
              to { opacity: 0; visibility: hidden; }
            }
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `try { if (location.pathname === "/" && !sessionStorage.getItem("yordanos-portfolio-intro-seen")) document.documentElement.setAttribute("data-show-portfolio-intro", ""); } catch (e) { if (location.pathname === "/") document.documentElement.setAttribute("data-show-portfolio-intro", ""); }`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioCursor />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
      <LoadingIntro />
    </QueryClientProvider>
  );
}

function LoadingIntro() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.removeAttribute("data-show-portfolio-intro");
      setVisible(false);
      return;
    }
    if (!document.documentElement.hasAttribute("data-show-portfolio-intro")) {
      setVisible(false);
      return;
    }
    const key = "yordanos-portfolio-intro-seen";
    try {
      if (sessionStorage.getItem(key)) {
        document.documentElement.removeAttribute("data-show-portfolio-intro");
        setVisible(false);
        return;
      }
    } catch {
      // Storage can be disabled; the bounded intro still dismisses safely.
    }
    const markSeen = () => {
      try {
        sessionStorage.setItem(key, "true");
      } catch {
        // The in-memory dismissal still works when browser storage is unavailable.
      }
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduceMotion ? 350 : 1100;
    const exitDuration = reduceMotion ? 0 : 360;
    const dismiss = window.setTimeout(() => setClosing(true), delay);
    const finish = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.removeAttribute("data-show-portfolio-intro");
      markSeen();
    }, delay + exitDuration);
    const fallback = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.removeAttribute("data-show-portfolio-intro");
      markSeen();
    }, 1800);
    return () => {
      window.clearTimeout(dismiss);
      window.clearTimeout(finish);
      window.clearTimeout(fallback);
    };
  }, [pathname]);
  return (
    <div
      id="portfolio-intro"
      aria-hidden="true"
      className={`portfolio-intro ${closing ? "is-closing" : ""}`}
    >
      <div className="portfolio-intro-mark">
        YT<span> / </span>PORTFOLIO
      </div>
      <p className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
        Yordanos Teshome
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[.28em] text-muted-foreground">
        Software Engineering student · Developer
      </p>
      <div className="portfolio-intro-line" />
    </div>
  );
}
