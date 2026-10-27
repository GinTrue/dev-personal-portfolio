import { ArrowDown, ArrowUpRight, Code2, Github, Linkedin, MapPin } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import profile from "@/data/profile.json";

const technologies = ["Laravel", "React", "TypeScript", "PHP", "Python", "MySQL", "WordPress", "REST APIs"];

export const Hero = () => (
  <section id="home" className="hero section-shell" aria-labelledby="hero-title">
    <div className="hero-grid" aria-hidden="true" />
    <div className="page-container hero-content">
      <div className="hero-copy">
        <div className="availability"><span className="status-dot" /> Open to new opportunities</div>
        <p className="hero-intro">Hi, I’m Ron <span className="intro-line" /></p>
        <h1 id="hero-title">Thoughtful code.<br /><span>Real-world impact.</span></h1>
        <p className="hero-description">I’m Ronnel Daryl Rontos, a full stack developer and systems engineer building web applications, CRM workflows, and reliable business systems.</p>
        <div className="hero-actions">
          <a href="/?demo=rr" className="button button-primary">Try RR ERP <ArrowUpRight size={18} /></a>
          <AnimatedBorderButton />
        </div>
        <div className="hero-socials">
          <a href="https://github.com/GinTrue/" target="_blank" rel="noopener noreferrer" aria-label="Visit Ron’s GitHub"><Github size={19} /></a>
          <a href="https://www.linkedin.com/in/darylrontos/" target="_blank" rel="noopener noreferrer" aria-label="Visit Ron’s LinkedIn"><Linkedin size={19} /></a>
          <span className="social-divider" />
          <span><MapPin size={14} /> {profile.location}</span>
        </div>
      </div>
      <div className="hero-portrait">
        <div className="portrait-frame">
          <div className="portrait-topline"><span>THE PERSON BEHIND THE CODE</span><span className="portrait-cross">+</span></div>
          <div className="portrait-image"><img src="/profile-photo.png" alt="Ronnel Daryl Rontos, software developer" fetchPriority="high" width="1024" height="1024" /></div>
          <div className="portrait-caption"><div><strong>Ronnel Daryl Rontos</strong><span>Full Stack Developer & Systems Engineer</span></div><Code2 size={24} /></div>
        </div>
        <div className="portrait-note"><span className="status-dot" /><div>Currently building at<strong>{profile.experiences[0].company}</strong></div><ArrowUpRight size={17} /></div>
        <span className="portrait-coordinate" aria-hidden="true">IDEAS → SYSTEMS → IMPACT</span>
      </div>
    </div>
    <div className="page-container hero-bottom">
      <a href="#about" className="scroll-link"><span className="scroll-icon"><ArrowDown size={15} /></span> A little more about me</a>
      <span className="hero-bottom-note">Built with curiosity. Refined with purpose.</span>
    </div>
    <div className="technology-strip"><div className="page-container technology-inner"><span className="technology-label">MY EVERYDAY TOOLKIT</span><div className="technology-list">{technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></div>
  </section>
);
