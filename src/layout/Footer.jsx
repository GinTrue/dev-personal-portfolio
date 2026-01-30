import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/GinTrue", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/your-handle", label: "Twitter" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border">
      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-10 items-center">

          {/* Brand */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold">RR.</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building clean, scalable, and modern web experiences with passion and purpose.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 flex-wrap">
            {footerLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex justify-end gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-surface transition-all"
              >
                <social.icon className="w-5 h-5 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Ronnel Rontos. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500" /> using React & Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
};
