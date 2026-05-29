import { ArrowUpRight, Github } from "lucide-react";

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
            </div>
        </section>
    )
}