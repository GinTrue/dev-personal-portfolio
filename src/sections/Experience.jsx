const experiences = [
  {
    period: "April 2025 – January 2026",
    role: "Full Stack Web Developer",
    company: "Exponential Technologies",
    description:
      "Developed and maintained a digital accounting software product. Built backend features using Django and PostgreSQL, integrated REST APIs with Axios, and implemented responsive frontend functionality using jQuery, AJAX, and Bootstrap. Optimized system performance and collaborated with the team to deliver new accounting modules.",
    technologies: [
      "Django",
      "Python",
      "PostgreSQL",
      "JavaScript",
      "jQuery",
      "AJAX",
      "Bootstrap",
      "REST API",
      "Axios",
      "Git"
    ],
    current: true
  },
  {
    period: "February 2022 – April 2025",
    role: "IT Assistant",
    company: "Antz Insurance and Services Inc.",
    description:
      "Provided IT support and maintained company infrastructure while developing and automating in-house business processes. Built internal web systems using CodeIgniter and MySQL, developed REST APIs, handled server management, and ensured system reliability, security, and performance.",
    technologies: [
      "PHP",
      "CodeIgniter",
      "MySQL",
      "JavaScript",
      "jQuery",
      "AJAX",
      "Bootstrap",
      "REST API",
      "Axios",
      "Git"
    ],
    current: false
  },
  {
    period: "October 2021 – February 2022",
    role: "Customer Service Representative / Case Manager",
    company: "INFOCOM",
    description:
    "Handled inbound customer calls for a local telecommunications account, resolving service issues, managing customer cases, and ensuring timely follow-ups. Used Excel spreadsheets and internal case management tools to track concerns, document resolutions, and coordinate with internal teams to improve customer satisfaction.",
    technologies: [
    "Microsoft Excel",
    "In-House Case Management Tools",
    "CRM Systems"
    ],
    current: false
  }
];

export const Experience = () => {
    return (
        <section id="experience" className="py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="container mx-auto px-6 relative z-10">
                {/* section header */}
                <div className="max-w-3xl mb-16">
                    <span className="text-secondary-foreground text-sm font tracking-wider uppercase animate-fade-in">Career Journey</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                        Experience that <span className="font-serif italic font-normal text-white"> speaks.</span>
                    </h2>
                    <p className="text-muted-foreground animate-fade-in animation-delay-200">
                        A timeline of my professional growth, from curious IT Assistant to Junior Developer
                    </p>
                </div>
                {/* Timeline */}
                <div className="relative">
                    <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />
                    {/* experience */}
                    <div className="space-y-12">
                        {experiences.map((exp,idx) => (
                            <div key={idx} 
                                 className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                                 style={{animationDelay: `${(idx + 1) * 150}ms`}}
                                 >
                                {/* experience dot */}
                                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                                    {exp.current && (
                                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                                    )}
                                </div>
                                {/* content */}
                                <div className={`pl-8 md:pl-0 ${
                                    idx % 2 === 0 
                                        ? "md:pr-16 md:text-right" 
                                        : "md:col-start-2 md:pl-16"
                                    }`}
                                >
                                    <div className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}>
                                        <span className="text-sm text-primary font-medium">
                                            {exp.period}
                                        </span>
                                        <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                                        <p className="text-muted-foreground">{exp.company}</p>
                                        <p className="text-sm text-muted-foreground mt-4">{exp.description}</p>
                                        <div className={`flex flex-wrap gap-2 mt-4 ${
                                            idx % 2 === 0 ? "md:justify-end" : ""
                                        }`}>
                                            {exp.technologies.map((tech, techIdx) =>(
                                            <span key={techIdx} 
                                                  className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}