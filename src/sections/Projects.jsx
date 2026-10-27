import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Layers, Workflow, X, ZoomIn, ZoomOut } from "lucide-react";

const featuredProject = {
  title: "RR ERP",
  company: "Original ERP: Laravel, PHP & MySQL · Interactive browser demo",
  description: "One connected workspace for sales, purchasing, receiving, delivery, inventory, and finance. Sign in with a dummy account and take a transaction from the first order to the final payment.",
  tags: ["Sales & Purchasing", "Inventory", "Accounting", "Role Permissions"],
  screenshots: [
    { title: "Workspace Overview", caption: "Live order metrics, stock value, outstanding balances, and a guided transaction flow.", image: "/projects/rr-erp/overview.png" },
    { title: "Sales Orders", caption: "Create orders, add line items, approve transactions, and track fulfillment.", image: "/projects/rr-erp/sales-orders.png" },
    { title: "Inventory", caption: "Receiving and delivery automatically update stock with a linked movement history.", image: "/projects/rr-erp/inventory.png" },
    { title: "Accounts Receivable", caption: "Issue invoices and record partial or full customer payments.", image: "/projects/rr-erp/receivables.png" },
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
        title: "Silver Continental Website",
        description: "A custom WordPress theme website built from scratch using a tailored theme design, polished UI, and responsive page layouts for a professional corporate presence.",
        image: "/projects/silver_continental.PNG",
        tags: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
        link: "#",
        github: "#",
    },
];


const projectCategories = ["Business systems", "Websites", "Integrations", "Websites"];
const filters = ["All work", "Business systems", "Websites", "Integrations"];

const ProjectDialog = ({ project, initialIndex = 0, onClose }) => {
  const dialogRef = useRef(null);
  const viewportRef = useRef(null);
  const dragRef = useRef(null);
  const [shotIndex, setShotIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const screenshots = project.screenshots || [{ title: project.title, caption: project.description, image: project.image }];
  const shot = screenshots[shotIndex];
  const step = (direction) => setShotIndex((index) => (index + direction + screenshots.length) % screenshots.length);
  const zoomLevels = ["fit", 1, 1.5, 2];
  const changeZoom = (direction) => setZoom((current) => zoomLevels[Math.max(0, Math.min(zoomLevels.length - 1, zoomLevels.indexOf(current) + direction))]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const left = window.innerWidth <= 650 && zoom !== "fit" ? Math.max(0, (imageWidth * zoom - viewport.clientWidth) / 2) : 0;
    viewport.scrollTo({ left, top: 0 });
  }, [shotIndex, zoom, imageWidth]);

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
    <dialog ref={dialogRef} className="project-dialog project-image-viewer" onClose={(event) => { if (!event.currentTarget.open) onClose(); }} aria-labelledby="project-dialog-title" aria-describedby="viewer-help"
      onKeyDown={(event) => {
        if (event.target.closest('.dialog-image-viewport') || event.target.tagName === "SELECT") return;
        if (screenshots.length > 1 && event.key === "ArrowRight") { event.preventDefault(); step(1); }
        if (screenshots.length > 1 && event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      }}>
      <div className="viewer-header"><div><p className="eyebrow">{project.title} / SCREENSHOT VIEWER</p><h2 id="project-dialog-title">{shot.title}</h2></div><div className="viewer-header-actions">{project.title === "RR ERP" && <a className="button button-primary" href="/?demo=rr">Open live demo <ArrowUpRight size={18} /></a>}<button className="icon-button" aria-label="Close project preview" onClick={onClose} autoFocus><X size={24} /></button></div></div>
      <div className="viewer-toolbar"><div className="viewer-zoom"><button className="icon-button" onClick={() => changeZoom(-1)} disabled={zoom === "fit"} aria-label="Zoom out"><ZoomOut size={21} /></button><label>Zoom<select value={String(zoom)} onChange={(event) => setZoom(event.target.value === "fit" ? "fit" : Number(event.target.value))}><option value="fit">Fit width</option><option value="1">100% (actual)</option><option value="1.5">150%</option><option value="2">200%</option></select></label><button className="icon-button" onClick={() => changeZoom(1)} disabled={zoom === 2} aria-label="Zoom in"><ZoomIn size={21} /></button></div><a className="text-link" href={shot.image} target="_blank" rel="noopener noreferrer">Open original image <ArrowUpRight size={18} /></a></div>
      <div ref={viewportRef} className="dialog-image-viewport" tabIndex={0} role="region" aria-label="Screenshot. Scroll or drag to explore." onPointerDown={(event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        dragRef.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = "true";
      }} onPointerMove={(event) => {
        if (!dragRef.current) return;
        event.currentTarget.scrollLeft = dragRef.current.left - (event.clientX - dragRef.current.x);
        event.currentTarget.scrollTop = dragRef.current.top - (event.clientY - dragRef.current.y);
      }} onPointerUp={(event) => { dragRef.current = null; event.currentTarget.dataset.dragging = "false"; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={(event) => { dragRef.current = null; event.currentTarget.dataset.dragging = "false"; }}>
        <img src={shot.image} alt={shot.title} onLoad={(event) => setImageWidth(event.currentTarget.naturalWidth)} onDragStart={(event) => event.preventDefault()} style={{ width: zoom === "fit" ? "100%" : imageWidth ? `${imageWidth * zoom}px` : "auto" }} />
      </div>
      <div className="viewer-footer"><div><p className="viewer-caption" aria-live="polite">{shot.caption}</p><p id="viewer-help">Scroll or drag to inspect the image. Choose Fit width for an overview. Press Esc to close.</p></div>{screenshots.length > 1 && <div className="viewer-navigation"><button className="icon-button" aria-label="Previous screenshot" onClick={() => step(-1)}><ArrowLeft size={21} /></button><span>{shotIndex + 1} / {screenshots.length}</span><button className="icon-button" aria-label="Next screenshot" onClick={() => step(1)}><ArrowRight size={21} /></button></div>}</div>
      {screenshots.length > 1 && <div className="viewer-screen-tabs" role="group" aria-label="Choose a screenshot">{screenshots.map((screenshot, index) => <button key={screenshot.title} onClick={() => setShotIndex(index)} aria-label={`View ${screenshot.title}`} aria-pressed={index === shotIndex}>{screenshot.title}</button>)}</div>}
    </dialog>
  );
};

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [featuredShot, setFeaturedShot] = useState(0);
  const visibleProjects = projects.map((project, index) => ({ ...project, category: projectCategories[index] })).filter((project) => activeFilter === "All work" || project.category === activeFilter);
  const showFeatured = activeFilter === "All work" || activeFilter === "Business systems";
  const shot = featuredProject.screenshots[featuredShot];
  const resultCount = visibleProjects.length + (showFeatured ? 2 : 0);

  return (
    <section id="projects" className="section-spacing work-section" aria-labelledby="projects-title">
      <div className="page-container">
        <div className="section-label" data-reveal><span>02 / SELECTED WORK</span><span className="section-label-line" /></div>
        <div className="section-heading" data-reveal><div><h2 id="projects-title">Built for real people.<br /><span className="text-muted">Made to make a difference.</span></h2></div><p>A selection of business systems, thoughtful websites, and the problems they help solve.</p></div>
        <div className="project-toolbar" data-reveal><div className="project-filters" role="group" aria-label="Filter projects">{filters.map((filter) => <button key={filter} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><span className="project-count mono" role="status">{String(resultCount).padStart(2, "0")} PROJECT{resultCount !== 1 ? "S" : ""}</span></div>
        {showFeatured && <article className="featured-project rr-project-highlight" id="rr-erp">
          <header className="rr-project-heading"><div><span className="featured-eyebrow"><Layers size={18} /> FEATURED BUILD / TRY IT YOURSELF</span><h3>{featuredProject.title}<span className="rr-live-label">INTERACTIVE DEMO</span></h3></div><div className="rr-project-actions"><button className="button button-secondary rr-preview-open" onClick={() => setSelectedProject({ project: featuredProject, initialIndex: featuredShot })}><Expand size={19} /> View full screen</button><a className="button button-primary rr-launch" href="/?demo=rr">Launch RR ERP <ArrowUpRight size={19} /></a></div></header>
          <div className="featured-gallery"><div className="rr-gallery-tabs" role="group" aria-label="Preview ERP screens">{featuredProject.screenshots.map((screenshot, index) => <button key={screenshot.title} aria-pressed={index === featuredShot} onClick={() => setFeaturedShot(index)}>{screenshot.title}</button>)}</div><button className="featured-image" onClick={() => setSelectedProject({ project: featuredProject, initialIndex: featuredShot })} aria-label={`Enlarge RR ERP ${shot.title} screenshot`}><div className="browser-bar" aria-hidden="true"><span /><span /><span /><span className="browser-label">rr erp / {shot.title.toLowerCase()}</span><Expand size={18} /></div><img src={shot.image} alt={`RR ERP — ${shot.title}`} loading="lazy" width="1440" height="1000" /></button><div className="featured-gallery-controls"><div className="rr-gallery-description" aria-live="polite"><strong>{shot.title}</strong><p>{shot.caption}</p></div><div><button className="icon-button" aria-label="Previous platform screenshot" onClick={() => setFeaturedShot((index) => (index - 1 + featuredProject.screenshots.length) % featuredProject.screenshots.length)}><ArrowLeft size={19} /></button><span className="mono">{String(featuredShot + 1).padStart(2, "0")} / {featuredProject.screenshots.length}</span><button className="icon-button" aria-label="Next platform screenshot" onClick={() => setFeaturedShot((index) => (index + 1) % featuredProject.screenshots.length)}><ArrowRight size={19} /></button></div></div></div>
          <div className="rr-project-summary"><div className="featured-copy"><p>{featuredProject.description}</p><div className="skill-tags">{featuredProject.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><span className="featured-company">{featuredProject.company}</span></div><div className="rr-project-credentials"><span>FULL ACCESS DEMO ACCOUNT</span><code>admin@rr.example</code><code>RRdemo2026!</code><small>Fictional data. Your own workspace. Reset anytime.</small></div></div>
        </article>}
        {showFeatured && <article className="current-project" aria-labelledby="kuga-work-title">
          <div><span className="featured-eyebrow"><Workflow size={14} /> RECENT WORK / KUGA ENERGY</span><h3 id="kuga-work-title">CRM & operational workflows</h3><p>Practical business tools for solar quotations, inspections, and day-to-day operations.</p><div className="skill-tags">{["PHP", "WordPress", "CRM", "Ubuntu", "DigitalOcean"].map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
          <ul><li><strong>CRM & dashboards</strong><span>Warranty claims, cost-centre enhancements, and subcontractor workflow visibility.</span></li><li><strong>Solar quotations & inspections</strong><span>Solar calculation interfaces, rooftop assessments, battery incentives, and audit and inspection requirements.</span></li><li><strong>Forms & documents</strong><span>Custom WordPress/PHP forms with signature capture and PDF document generation.</span></li></ul>
        </article>}
        <div className="project-grid" key={activeFilter}>{visibleProjects.map((project, index) => <article className="project-card" key={project.title} style={{ animationDelay: `${index * 45}ms` }}><button className="project-image" onClick={() => setSelectedProject({ project })} aria-label={`Explore ${project.title}`}><img src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" width="800" height="450" /><span className="project-image-overlay"><span>Explore project <ArrowUpRight size={18} /></span></span><span className="project-category">{project.category}</span></button><div className="project-card-content"><h3><button onClick={() => setSelectedProject({ project })}>{project.title}<ArrowUpRight size={19} /></button></h3><p>{project.description}</p><div className="project-card-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
        <div className="work-footer"><span>Practical problems. Purposeful solutions.</span><a href="https://github.com/GinTrue/" className="text-link" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={16} /></a></div>
      </div>
      {selectedProject && <ProjectDialog {...selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
};
