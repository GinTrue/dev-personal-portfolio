import { ArrowUpRight, Github, Linkedin } from "lucide-react";

export const Footer = () => (
  <footer className="site-footer">
    <div className="page-container">
      <div className="footer-top"><a href="#home" className="brand" aria-label="Return to Ron Rontos home">rr<span>.</span></a><p>Thoughtful code. Meaningful connections.</p><div className="footer-socials"><a href="https://github.com/GinTrue/" target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a><a href="https://www.linkedin.com/in/darylrontos/" target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ronnel Daryl Rontos</span><span>Made with care, from the Philippines.</span><a href="#home">Back to the top ↑</a></div>
    </div>
  </footer>
);
