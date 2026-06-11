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
        description: "A web-based internal system designed to streamline insurance form processing by digitizing manual workflows, improving data accuracy, and enabling faster submission and tracking.",
        image: "/projects/vigattin.png",
        tags: ["PHP", "MySQL", "JavaScript", "jQuery", "AJAX"],
        link: "#",
        github: "#",
    },
    {
        title: "Akron Peak Website",
        description: "A responsive company website built to present services, company information, and contact details, with a focus on clean UI, performance, and maintainability.",
        image: "/projects/akron.png",
        tags: ["PHP", "HTML", "CSS", "Bootstrap", "JavaScript"],
        link: "#",
        github: "#",
    },
    {
        title: "Dahua Turnstile App",
        description: "A management interface for access control and turnstile reporting, built for efficient device monitoring and quick operational updates.",
        image: "/projects/dahua_turnstile_app.PNG",
        tags: ["PHP", "JavaScript", "API", "Bootstrap"],
        link: "#",
        github: "#",
    },
    {
        title: "ISTI ERP System",
        description: "An enterprise resource planning solution for inventory, billing, and order workflows, designed to simplify internal operations with clean data management.",
        image: "/projects/isti_erp.PNG",
        tags: ["PHP", "MySQL", "JavaScript", "jQuery"],
        link: "#",
        github: "#",
    },
    {
        title: "ISTI Ticketing License Portal",
        description: "A ticketing and license management portal built for streamlined service requests and compliance tracking.",
        image: "/projects/isti_ticketing_license.PNG",
        tags: ["PHP", "MySQL", "AJAX", "jQuery"],
        link: "#",
        github: "#",
    },
    {
        title: "Silver Continental Website",
        description: "A custom WordPress theme website built from scratch using a tailored theme design, polished UI, and responsive page layouts for a professional corporate presence.",
        image: "/projects/silver_continental.PNG",
        tags: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
        link: "#",
        github: "#",
    },
];

export const Projects = () => {
    return (
        <section id="projects" className="py-32 relative overflow-hidden">
            {/* Bg Glows */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5  rounded-full blur-3xl" />
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mx-auto max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">Featured Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-200 text-secondary-foreground">
                        Projects that
                        <span className="font-serif italic font-normal text-white">
                            {" "}
                            make an impact.</span>
                    </h2>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        A selection of my recent work building in-house web systems and automation tools that improve workflows and solve real operational needs.
                    </p>
                </div>
                {/* Project Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <div key={idx}
                            className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                            style={{ animationDelay: `${(idx + 1) * 100}ms ` }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60"
                                />
                                {/* Over lay Links */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href={project.link} className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </a>
                                    <a href={project.github} className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                                        <Github className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            {/* Contents */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary
                                        group-hover:translate-x-1 group-hover:-translate-y-1 transition-all
                                    "/>
                                </div>
                                <p className="text-muted-foreground pb-2 text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2">{project.tags.map((tag, tagIdx) => (
                                    <span
                                        key={tagIdx}
                                        className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 ">
                                        {tag}
                                    </span>
                                ))}</div>
                            </div>
                        </div>
                    ))}
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
