import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, X } from "lucide-react";

const featuredProject = {
  title: "Inaveit ERP Platform",
  company: "Inaveit Systems Technologies Incorporated",
  eyebrow: "Featured ERP Build",
  description:
    "Built and maintained an internal ERP platform that unified sales orders, procurement, delivery workflows, accounting, inventory, notifications, and role management into one operational system for the company.",
  tags: ["Laravel", "PHP", "MySQL", "HTML", "CSS", "Bootstrap", "Tailwind CSS", "GitHub"],
  screenshots: [
    {
      title: "Activity Logs",
      caption: "Cross-module audit tracking for operations and admin activity.",
      image: "/projects/inaveit/activity-logs.jpg"
    },
    {
      title: "Login Portal",
      caption: "Branded ERP authentication screen for secure access.",
      image: "/projects/inaveit/login.jpg"
    },
    {
      title: "Dashboard",
      caption: "Procurement, logistics, and accounts payable reporting overview.",
      image: "/projects/inaveit/dashboard.jpg"
    },
    {
      title: "Notifications",
      caption: "User alert center for workflow updates and recent actions.",
      image: "/projects/inaveit/notifications.jpg"
    },
    {
      title: "Sale Order Creation",
      caption: "Structured sales document creation with customer and line-item handling.",
      image: "/projects/inaveit/sale-order.jpg"
    },
    {
      title: "Purchase Orders",
      caption: "Procurement records with approvals, totals, status, and filtering.",
      image: "/projects/inaveit/purchase-order.jpg"
    },
    {
      title: "Accounts Payable",
      caption: "Voucher, tax, and invoice handling for payable workflows.",
      image: "/projects/inaveit/accounts-payable.jpg"
    },
    {
      title: "Accounts Receivable",
      caption: "Invoice issuance, delivery details, payment terms, and document actions.",
      image: "/projects/inaveit/accounts-receivable.jpg"
    },
    {
      title: "Role Management",
      caption: "Granular permissions for module visibility, read, and write access.",
      image: "/projects/inaveit/role-management.jpg"
    },
    {
      title: "Inventory",
      caption: "Product stock listing and movement tracking for warehouse operations.",
      image: "/projects/inaveit/inventory.jpg"
    },
    {
      title: "Delivery Orders",
      caption: "Receiving and delivery tracking tied to procurement records.",
      image: "/projects/inaveit/delivery-order.jpg"
    }
  ]
};

const projects = [
  {
    title: "Vigattin Insurance Forms",
    description:
      "A web-based internal system designed to streamline insurance form processing by digitizing manual workflows, improving data accuracy, and enabling faster submission and tracking.",
    image: "/projects/vigattin.png",
    tags: ["PHP", "MySQL", "JavaScript", "jQuery", "AJAX"],
    link: null,
    github: null
  },
  {
    title: "Akron Peak Website",
    description:
      "A responsive company website built to present services, company information, and contact details, with a focus on clean UI, performance, and maintainability.",
    image: "/projects/akron.png",
    tags: ["PHP", "HTML", "CSS", "Bootstrap", "JavaScript"],
    link: null,
    github: null
  }
];

export const Projects = () => {
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [selectedShotIndex, setSelectedShotIndex] = useState(null);

  const activeShot = featuredProject.screenshots[activeShotIndex];
  const totalShots = featuredProject.screenshots.length;

  const getWrappedIndex = (index) => {
    if (index < 0) {
      return totalShots - 1;
    }

    if (index >= totalShots) {
      return 0;
    }

    return index;
  };

  const goToShot = (index) => {
    setActiveShotIndex(getWrappedIndex(index));
  };

  const stepCarousel = (direction) => {
    setActiveShotIndex((currentIndex) => getWrappedIndex(currentIndex + direction));
  };

  const openModal = (index) => {
    const nextIndex = getWrappedIndex(index);
    setActiveShotIndex(nextIndex);
    setSelectedShotIndex(nextIndex);
  };

  const stepModal = (direction) => {
    setSelectedShotIndex((currentIndex) => {
      const safeIndex = currentIndex ?? activeShotIndex;
      const nextIndex = getWrappedIndex(safeIndex + direction);
      setActiveShotIndex(nextIndex);
      return nextIndex;
    });
  };

  return (
    <>
      <section id="projects" className="relative overflow-hidden py-32">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-highlight/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="animate-fade-in text-sm font-medium tracking-wider text-secondary-foreground uppercase">
              Featured Work
            </span>
            <h2 className="mt-4 mb-6 text-4xl font-bold text-secondary-foreground animate-fade-in animation-delay-200 md:text-5xl">
              Projects that
              <span className="font-serif italic font-normal text-white"> make an impact.</span>
            </h2>
            <p className="text-muted-foreground animate-fade-in animation-delay-200">
              A selection of my recent work building in-house web systems and automation tools that improve workflows and solve real operational needs.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <article className="group glass animate-fade-in w-full overflow-hidden rounded-2xl md:w-[calc(50%-1rem)]">
              <div className="relative overflow-hidden bg-[#e8eef8] p-4 md:p-5">
                <button
                  type="button"
                  onClick={() => openModal(activeShotIndex)}
                  className="block w-full"
                >
                  <img
                    src={activeShot.image}
                    alt={activeShot.title}
                    className="aspect-video w-full rounded-2xl bg-white object-contain object-top"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => stepCarousel(-1)}
                  className="absolute top-1/2 left-6 -translate-y-1/2 rounded-full border border-white/40 bg-background/75 p-3 text-white backdrop-blur-sm transition-colors hover:bg-background"
                  aria-label="Previous ERP screenshot"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => stepCarousel(1)}
                  className="absolute top-1/2 right-6 -translate-y-1/2 rounded-full border border-white/40 bg-background/75 p-3 text-white backdrop-blur-sm transition-colors hover:bg-background"
                  aria-label="Next ERP screenshot"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-4">
                  <div className="rounded-full border border-white/20 bg-background/80 px-4 py-2 text-xs font-medium tracking-[0.2em] text-white uppercase backdrop-blur-sm">
                    {activeShotIndex + 1} / {totalShots}
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-background/70 px-3 py-2 backdrop-blur-sm">
                    {featuredProject.screenshots.map((shot, index) => (
                      <button
                        key={shot.title}
                        type="button"
                        onClick={() => goToShot(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          index === activeShotIndex ? "bg-primary shadow-[0_0_12px_rgba(32,178,166,0.8)]" : "bg-white/45"
                        }`}
                        aria-label={`Show ${shot.title}`}
                        aria-pressed={index === activeShotIndex}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                      {featuredProject.eyebrow}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-primary md:text-2xl">
                      {featuredProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{featuredProject.company}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal(activeShotIndex)}
                    className="hidden text-sm text-muted-foreground transition-colors hover:text-primary md:block"
                  >
                    Open fullscreen
                  </button>
                </div>

                <p className="text-sm text-muted-foreground">{featuredProject.description}</p>

                <div className="rounded-2xl border border-border/60 bg-surface/60 p-4">
                  <p className="text-sm font-semibold text-white">{activeShot.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{activeShot.caption}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/50 bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, idx) => {
              const hasLink = Boolean(project.link);
              const hasGithub = Boolean(project.github);

              return (
                <div
                  key={project.title}
                  className="group glass animate-fade-in overflow-hidden rounded-2xl"
                  style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                    {(hasLink || hasGithub) && (
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {hasLink && (
                          <a
                            href={project.link}
                            className="glass rounded-full p-3 transition-all hover:bg-primary hover:text-primary-foreground"
                          >
                            <ArrowUpRight className="h-5 w-5" />
                          </a>
                        )}

                        {hasGithub && (
                          <a
                            href={project.github}
                            className="glass rounded-full p-3 transition-all hover:bg-primary hover:text-primary-foreground"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      {(hasLink || hasGithub) && (
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/50 bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedShotIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/92 p-4 backdrop-blur-md"
          onClick={() => setSelectedShotIndex(null)}
        >
          <div
            className="glass-strong w-full max-w-6xl rounded-[2rem] border border-primary/20 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  Screen {selectedShotIndex + 1} / {totalShots}
                </p>
                <h4 className="mt-2 text-xl font-semibold text-white">
                  {featuredProject.screenshots[selectedShotIndex].title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {featuredProject.screenshots[selectedShotIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stepModal(-1)}
                  className="rounded-full border border-border/70 bg-surface/70 p-2 text-muted-foreground transition-colors hover:text-white"
                  aria-label="Previous fullscreen image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => stepModal(1)}
                  className="rounded-full border border-border/70 bg-surface/70 p-2 text-muted-foreground transition-colors hover:text-white"
                  aria-label="Next fullscreen image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedShotIndex(null)}
                  className="rounded-full border border-border/70 bg-surface/70 p-2 text-muted-foreground transition-colors hover:text-white"
                  aria-label="Close image preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] bg-[#e8eef8] p-3">
              <img
                src={featuredProject.screenshots[selectedShotIndex].image}
                alt={featuredProject.screenshots[selectedShotIndex].title}
                className="max-h-[75vh] w-full rounded-[1.1rem] bg-white object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
