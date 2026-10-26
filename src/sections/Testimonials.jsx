import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
    {
        quote: "I can highly recommend Ronnel for the way he works. He quickly understands his clients’ needs, approachable, and consistently meets agreed deadlines. He’s flexible, easy to work with, and delivers excellent result",
        author: "Mara",
        role: "Co-Founder Akron",
    },
    {
        quote: "I’ve worked with Ronnel and beyond being a great Full Stack Developer, he’s also one of the most supportive teammates I’ve ever had. He’s the kind of person who’s always ready to help, even when things get tough, and you can really see how dedicated he is to his work. More than the skills, it’s his attitude and passion that make him stand out. I’m lucky to call him both a colleague and a friend.",
        author: "John Carlo Torralba",
        role: "Data AI Engineer",
    },
    {
        quote: "Ron is hardworker, passionate about his work, and a great team player.",
        author: "Pandu Wiguna",
        role: "Senior Full Stack Web Developer Supervisor"
    },

];




export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = (direction) => setActiveIndex((previous) => (previous + direction + testimonials.length) % testimonials.length);
  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="section-spacing testimonials-section" aria-labelledby="testimonials-title">
      <div className="page-container">
        <div className="section-label" data-reveal><span>04 / KIND WORDS</span><span className="section-label-line" /></div>
        <div className="testimonials-layout" data-reveal>
          <div className="testimonials-intro"><h2 id="testimonials-title">Good work starts<br />with <span className="text-accent">good people.</span></h2><p className="body-copy">A few words from the people I’ve had the pleasure of working with.</p><div className="testimonial-controls"><button className="icon-button" onClick={() => step(-1)} aria-label="Previous testimonial"><ChevronLeft size={19} /></button><span className="mono">0{activeIndex + 1} <span className="text-muted">/ 0{testimonials.length}</span></span><button className="icon-button" onClick={() => step(1)} aria-label="Next testimonial"><ChevronRight size={19} /></button></div></div>
          <div className="testimonial-card" role="region" aria-roledescription="carousel" aria-label="Colleague testimonials" onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }} tabIndex={0}>
            <Quote className="quote-icon" size={34} strokeWidth={1.25} aria-hidden="true" />
            <div aria-live="polite" aria-atomic="true" className="testimonial-content" key={activeIndex}><blockquote>“{active.quote}”</blockquote><div className="testimonial-author"><div className="author-avatar" aria-hidden="true">{active.author.split(" ").slice(0, 2).map((part) => part[0]).join("")}</div><div><strong>{active.author}</strong><span>{active.role}</span></div></div></div>
            <div className="testimonial-dots">{testimonials.map((testimonial, index) => <button key={testimonial.author} onClick={() => setActiveIndex(index)} aria-label={`Show testimonial from ${testimonial.author}`} aria-pressed={activeIndex === index}><span className={activeIndex === index ? "active" : ""} /></button>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
