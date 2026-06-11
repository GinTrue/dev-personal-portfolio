const experiences = [
  {
    period: "March 2026 - Present",
    role: "System Engineer",
    company: "Inaveit Systems Technologies Incorporated",
    description:
      "Developed and maintained the company's ERP application across sales, procurement, delivery, finance, inventory, and administrative workflows using PHP, MySQL, HTML, CSS, Bootstrap, Tailwind CSS, Laravel, and GitHub.",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind CSS",
      "GitHub"
    ],
    current: true
  },
  {
    period: "April 2025 - January 2026",
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
    current: false
  },
  {
    period: "February 2022 - April 2025",
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
    period: "October 2021 - February 2022",
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
    <section id="experience" className="relative overflow-hidden py-32">
      <div className="absolute top-1/2 left-1/4 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 max-w-3xl">
          <span className="animate-fade-in text-sm font-medium tracking-wider text-secondary-foreground uppercase">
            Career Journey
          </span>
          <h2 className="mt-4 mb-6 text-4xl font-bold text-secondary-foreground animate-fade-in animation-delay-100 md:text-5xl">
            Experience that <span className="font-serif italic font-normal text-white">speaks.</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A timeline of my professional growth across IT support, internal tools, and ERP system development.
          </p>
        </div>

        <div className="relative">
          <div className="timeline-glow absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent shadow-[0_0_25px_rgba(32,178,166,0.8)] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid gap-8 animate-fade-in md:grid-cols-2"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                <div className="absolute top-0 left-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background md:left-1/2">
                  {exp.current && <span className="absolute inset-0 rounded-full bg-primary opacity-75 animate-ping" />}
                </div>

                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div className="glass rounded-2xl border border-primary/30 p-6 transition-all duration-500 hover:border-primary/50">
                    <span className="text-sm font-medium text-primary">{exp.period}</span>
                    <h3 className="mt-2 text-xl font-semibold">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{exp.description}</p>

                    <div className={`mt-4 flex flex-wrap gap-2 ${idx % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="rounded-full bg-surface px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
