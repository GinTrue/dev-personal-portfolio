import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Expand, Layers, X } from "lucide-react";

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


const projectCategories = ["Business systems", "Websites", "Integrations", "Business systems", "Business systems", "Websites"];
const filters = ["All work", "Business systems", "Websites", "Integrations"];

const ProjectDialog = ({ project, initialIndex = 0, onClose }) => {
  const dialogRef = useRef(null);
  const [shotIndex, setShotIndex] = useState(initialIndex);
  const screenshots = project.screenshots || [{ title: project.title, caption: project.description, image: project.image }];
  const shot = screenshots[shotIndex];
  const step = (direction) => setShotIndex((index) => (index + direction + screenshots.length) % screenshots.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="project-dialog" onClose={(event) => { if (!event.currentTarget.open) onClose(); }} aria-labelledby="project-dialog-title"
      onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }}
      onKeyDown={(event) => { if (screenshots.length > 1 && event.key === "ArrowRight") { event.preventDefault(); step(1); } if (screenshots.length > 1 && event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }}>
      <div className="dialog-header"><div><p className="eyebrow">PROJECT EXPLORER</p><h2 id="project-dialog-title">{project.title}</h2></div><button className="icon-button" aria-label="Close project preview" onClick={onClose} autoFocus><X size={21} /></button></div>
      <div className="dialog-image"><img src={shot.image} alt={shot.title} />{screenshots.length > 1 && <><button className="gallery-arrow previous" aria-label="Previous screenshot" onClick={() => step(-1)}><ChevronLeft size={22} /></button><button className="gallery-arrow next" aria-label="Next screenshot" onClick={() => step(1)}><ChevronRight size={22} /></button></>}</div>
      <div className="dialog-shot-caption" aria-live="polite"><div><strong>{shot.title}</strong><p>{shot.caption}</p></div><a href={shot.image} className="icon-button" target="_blank" rel="noopener noreferrer" aria-label="Open full size screenshot"><Expand size={17} /></a></div>
      {screenshots.length > 1 && <div className="dialog-thumbnails" aria-label="Choose a screenshot">{screenshots.map((screenshot, index) => <button key={screenshot.title} onClick={() => setShotIndex(index)} aria-label={`View ${screenshot.title}`} aria-pressed={index === shotIndex}><img src={screenshot.image} alt="" loading="lazy" /><span>{screenshot.title}</span></button>)}</div>}
      <div className="dialog-details"><p>{project.description}</p><div className="skill-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
      <div className="dialog-footer"><span className="mono">{String(shotIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}</span><span>{screenshots.length > 1 ? "← → to browse · " : ""}Esc to close</span></div>
    </dialog>
  );
};

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [featuredShot, setFeaturedShot] = useState(2);
  const visibleProjects = projects.map((project, index) => ({ ...project, category: projectCategories[index] })).filter((project) => activeFilter === "All work" || project.category === activeFilter);
  const showFeatured = activeFilter === "All work" || activeFilter === "Business systems";
  const shot = featuredProject.screenshots[featuredShot];
  const resultCount = visibleProjects.length + (showFeatured ? 1 : 0);

  return (
    <section id="projects" className="section-spacing work-section" aria-labelledby="projects-title">
      <div className="page-container">
        <div className="section-label" data-reveal><span>02 / SELECTED WORK</span><span className="section-label-line" /></div>
        <div className="section-heading" data-reveal><div><h2 id="projects-title">Built for real people.<br /><span className="text-muted">Made to make a difference.</span></h2></div><p>A selection of business systems, thoughtful websites, and the problems they help solve.</p></div>
        <div className="project-toolbar" data-reveal><div className="project-filters" role="group" aria-label="Filter projects">{filters.map((filter) => <button key={filter} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><span className="project-count mono" role="status">{String(resultCount).padStart(2, "0")} PROJECT{resultCount !== 1 ? "S" : ""}</span></div>
        {showFeatured && <article className="featured-project">
          <div className="featured-copy"><span className="featured-eyebrow"><Layers size={14} /> A CLOSER LOOK</span><h3>{featuredProject.title}</h3><p>{featuredProject.description}</p><div className="skill-tags">{["Laravel", "PHP", "MySQL", "JavaScript"].map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><button className="text-link" onClick={() => setSelectedProject({ project: featuredProject, initialIndex: featuredShot })}>Explore the platform <ArrowUpRight size={17} /></button><span className="featured-company">{featuredProject.company}</span></div>
          <div className="featured-gallery"><button className="featured-image" onClick={() => setSelectedProject({ project: featuredProject, initialIndex: featuredShot })} aria-label={`Enlarge Inaveit ERP ${shot.title} screenshot`}><div className="browser-bar" aria-hidden="true"><span /><span /><span /><span className="browser-label">inaveit / {shot.title.toLowerCase()}</span><Expand size={13} /></div><img src={shot.image} alt={`Inaveit ERP — ${shot.title}`} loading="lazy" /><span className="image-expand"><Expand size={16} /> Click to explore</span></button><div className="featured-gallery-controls"><span className="featured-shot-title" aria-live="polite">{shot.title}</span><div><button className="icon-button" aria-label="Previous platform screenshot" onClick={() => setFeaturedShot((index) => (index - 1 + featuredProject.screenshots.length) % featuredProject.screenshots.length)}><ArrowLeft size={15} /></button><span className="mono">{String(featuredShot + 1).padStart(2, "0")} / {featuredProject.screenshots.length}</span><button className="icon-button" aria-label="Next platform screenshot" onClick={() => setFeaturedShot((index) => (index + 1) % featuredProject.screenshots.length)}><ArrowRight size={15} /></button></div></div></div>
        </article>}
        <div className="project-grid" key={activeFilter}>{visibleProjects.map((project, index) => <article className="project-card" key={project.title} style={{ animationDelay: `${index * 45}ms` }}><button className="project-image" onClick={() => setSelectedProject({ project })} aria-label={`Explore ${project.title}`}><img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" width="800" height="450" /><span className="project-image-overlay"><span>Explore project <ArrowUpRight size={18} /></span></span><span className="project-category">{project.category}</span></button><div className="project-card-content"><h3><button onClick={() => setSelectedProject({ project })}>{project.title}<ArrowUpRight size={19} /></button></h3><p>{project.description}</p><div className="project-card-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        <div className="work-footer"><span>Practical problems. Purposeful solutions.</span><a href="https://github.com/GinTrue/" className="text-link" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={16} /></a></div>
      </div>
      {selectedProject && <ProjectDialog {...selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};
