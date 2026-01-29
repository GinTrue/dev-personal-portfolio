import { Code2, Rocket, Users, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and delivering fast, efficient user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to build reliable and effective solutions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously learning and applying new ideas to improve systems.",
  },
];

export const About = () => {
    return (
        <section id="about" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    { /* Left Column */ }
                    <div className="space-y-8">
                        <div className="animate-fade-in">
                            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">About Me</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
                            Building The Future,
                            <span className="font-serif italic font-normal text-white"> 
                                {" "}
                                one component at a time.
                            </span>
                        </h2>
                        <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
                            <p>
                            I’m a Junior Software Developer with hands-on experience working in an in-house environment,
                            building and maintaining internal systems that support daily business operations.
                            My background as an IT Assistant gives me a strong understanding of real-world workflows
                            and user needs.
                            </p>

                            <p>
                            I work primarily with PHP, MySQL, HTML, CSS, Bootstrap, JavaScript, jQuery, and AJAX to
                            develop web-based tools, automate manual processes, and improve existing systems for
                            better efficiency and reliability.
                            </p>

                            <p>
                            I believe that a good leader is always a good student, which drives me to continuously
                            learn, improve my skills, and build practical, scalable solutions that add real value
                            to the organization.
                            </p>
                        </div>
                        <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
                            <p className="text-lg font-medium italic text-foreground">
                            "My mission is to build practical, reliable, and scalable web systems that improve business
                            operations by turning real-world problems into efficient digital solutions—while continuously
                            learning and growing as a developer."
                            </p>
                        </div>
                    </div>
                    { /* Right Column */ }
                    <div className="grid sm:grid-cols-2 gap-6">
                        {highlights.map((item,idx) => (
                            <div key={idx} 
                                 className="glass p-6 rounded-2xl animate-fade-in"
                                 style={{animationDelay:`${(idx + 1) * 100}ms`}}
                                 >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                                    <item.icon className="w-6 h-6 text-primary"/>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}