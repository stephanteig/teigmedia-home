import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Play, Menu } from 'lucide-react';
import './styles.css';

// EDIT YOUR HOMEPAGE HERE: swap these words, links, and project details for your own.
const projects = [
  { number: '01', title: 'A quieter kind of energy', type: 'FILM · 2025', image: 'photo-1470252649378-9c29740c9fa8', color: 'project-one' },
  { number: '02', title: 'Made for the long way', type: 'CAMPAIGN · 2024', image: 'photo-1500530855697-b586d89ba3ee', color: 'project-two' },
  { number: '03', title: 'The shape of sound', type: 'IDENTITY · 2024', image: 'photo-1519608487953-e999c86e7455', color: 'project-three' },
];

function App() {
  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#top" aria-label="Teig Media home"><span className="brand-mark">t</span><span>TEIG<br/>MEDIA</span></a>
        <div className="nav-links"><a href="#work">Selected work</a><a href="#about">About</a><a href="#contact">Contact <ArrowUpRight size={14}/></a></div>
        <a className="menu-button" href="#contact"><Menu size={20}/><span>MENU</span></a>
      </nav>

      <section className="hero wrap" id="top">
        <div className="live-test" role="status" aria-live="polite">
          <span className="live-test-indicator" aria-hidden="true" />
          <span className="live-test-label">LIVE SITE TEST</span>
          <span className="live-test-copy">If you can read this, teigmedia.com reached the website.</span>
        </div>
        <div className="hero-meta"><span>INDEPENDENT CREATIVE STUDIO</span><span>BASED IN NORWAY · WORKING EVERYWHERE</span></div>
        <h1>Ideas made<br/><em>visible.</em></h1>
        <div className="hero-bottom">
          <p>We make films, images, and digital experiences<br className="desktop-break"/> for people with something to say.</p>
          <a className="circle-link" href="#work" aria-label="Explore selected work"><ArrowDownRight size={25}/></a>
        </div>
        <div className="hero-image" role="img" aria-label="Sunlight falling across a mountain landscape">
          <div className="image-caption"><span>FIELD NOTES / 001</span><span>60°23' N — 05°19' E</span></div>
          <span className="image-stamp">TM<br/><small>EST. 2024</small></span>
        </div>
      </section>

      <section className="intro wrap" id="about">
        <div className="section-label"><span>01 / THE STUDIO</span><span>SMALL BY DESIGN</span></div>
        <div className="intro-content"><h2>Good work starts<br/>with <em>good questions.</em></h2><div className="intro-copy"><p>Teig Media is an independent creative studio for thoughtful stories and bold ideas. From the first sketch to the final frame, we bring clarity, craft, and a little curiosity to every collaboration.</p><a className="text-link" href="#contact">A little more about us <ArrowUpRight size={16}/></a></div></div>
      </section>

      <section className="work wrap" id="work">
        <div className="section-label"><span>02 / SELECTED WORK</span><span>2024 — 2025</span></div>
        <div className="work-heading"><h2>Things we've<br/><em>put into the world.</em></h2><p>A few recent collaborations<br/>we're proud to share.</p></div>
        <div className="project-grid">{projects.map((project) => <a className="project" href="#contact" key={project.number}><div className={`project-image ${project.color}`} style={{backgroundImage: `url(https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1200&q=85)`}}><span className="project-number">{project.number}</span><span className="project-arrow"><ArrowUpRight size={19}/></span></div><div className="project-info"><h3>{project.title}</h3><span>{project.type}</span></div></a>)}</div>
      </section>

      <section className="manifesto"><div className="wrap manifesto-inner"><span className="section-label">A NOTE ON HOW WE WORK</span><p>Make it <em>mean something.</em><br/>Make it <em>feel like something.</em></p><span className="manifesto-mark">✳</span></div></section>

      <footer className="footer wrap" id="contact">
        <div className="section-label"><span>03 / YOUR TURN</span><span>LET'S MAKE SOMETHING GOOD</span></div>
        <div className="footer-main"><h2>Have a good<br/><em>one in mind?</em></h2><a className="contact-button" href="mailto:hello@teigmedia.com">Tell us about it <ArrowUpRight size={20}/></a></div>
        <div className="footer-bottom"><a className="brand" href="#top"><span className="brand-mark">t</span><span>TEIG<br/>MEDIA</span></a><span>© TEIG MEDIA 2025</span><div><a href="https://instagram.com">INSTAGRAM <ArrowUpRight size={12}/></a><a href="mailto:hello@teigmedia.com">EMAIL <ArrowUpRight size={12}/></a></div><a href="#top" className="back-top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
