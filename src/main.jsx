import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Camera, Check, Code2, Download,
  ExternalLink, Film, Github, Instagram, Linkedin, Mail, MapPin, Menu, Play,
  Send, Tv, X, Youtube,
} from 'lucide-react';
import CV from './content.json';
import './styles.css';

const jellyfinUrl = 'https://watch-metropolis.teigmedia.com';
const navigation = [
  { id: 'home', no: 'Hjem', en: 'Home' },
  { id: 'resume', no: 'CV', en: 'Resume' },
  { id: 'works', no: 'Prosjekter', en: 'Work' },
  { id: 'contact', no: 'Kontakt', en: 'Contact' },
];
const categoryNames = {
  no: { alle: 'Alle', film: 'Film', foto: 'Foto', tech: 'Verktøy & kode', esport: 'Esport' },
  en: { alle: 'All work', film: 'Film', foto: 'Photography', tech: 'Tools & code', esport: 'Esports' },
};
const text = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.no ?? '';
const projectTitle = (project) => project.tittel;

function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'home');
  const [lang, setLang] = useState(() => localStorage.getItem('teigmedia-lang') || 'no');
  const [filter, setFilter] = useState('alle');
  const [selectedProject, setSelectedProject] = useState(null);
  const [formState, setFormState] = useState('idle');

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash.slice(1) || 'home';
      setPage(navigation.some((item) => item.id === next) ? next : 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('teigmedia-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const onKey = (event) => event.key === 'Escape' && setSelectedProject(null);
    document.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [selectedProject]);

  const visibleProjects = useMemo(
    () => filter === 'alle' ? CV.prosjekter : CV.prosjekter.filter((project) => project.filter === filter),
    [filter],
  );

  const go = (id) => `#${id}`;
  const ui = {
    studio: lang === 'no' ? 'Uavhengig kreativ praksis' : 'Independent creative practice',
    location: lang === 'no' ? 'Fredrikstad, Norge' : 'Fredrikstad, Norway',
    homeTitle: lang === 'no' ? <>Kamera. Kode.<br /><em>Fortellinger.</em></> : <>Camera. Code.<br /><em>Stories.</em></>,
    intro: lang === 'no'
      ? 'Jeg lager film, foto og digitale verktøy. Best når kamera, kode og historiefortelling møtes.'
      : 'I make films, photographs and digital tools. Best when camera, code and storytelling meet.',
    selected: lang === 'no' ? 'Utvalgt arbeid' : 'Selected work',
    allWork: lang === 'no' ? 'Se alle prosjektene' : 'Explore all work',
    about: lang === 'no' ? 'Litt om meg' : 'A little about me',
    resume: lang === 'no' ? 'Erfaring og CV' : 'Experience & resume',
    contact: lang === 'no' ? 'Skal vi lage noe?' : 'Have a project in mind?',
    download: lang === 'no' ? 'Last ned CV som PDF' : 'Download CV as PDF',
    watch: lang === 'no' ? 'Åpne Jellyfin' : 'Open Jellyfin',
    watchSub: lang === 'no' ? 'Metropolis · privat bibliotek' : 'Metropolis · private library',
    language: lang === 'no' ? 'English' : 'Norsk',
  };

  const projectByTitle = (title) => CV.prosjekter.find((project) => project.tittel === title);
  const featuredProjects = ['Et ekko av henne', 'Respawn Østfold', 'TEDx Fredrikstad']
    .map(projectByTitle).filter(Boolean);

  async function sendMessage(event) {
    event.preventDefault();
    setFormState('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${CV.formspreeId}`, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Form submission failed');
      event.currentTarget.reset();
      setFormState('sent');
    } catch {
      setFormState('error');
    }
  }

  return (
    <div className="site-shell">
      <aside className="sidebar">
        <a className="sidebar-brand" href={go('home')} aria-label="Teig Media home">
          <span className="brand-symbol">t<span>.</span></span>
          <span className="brand-wordmark">TEIG<br />MEDIA</span>
        </a>
        <div className="profile-block">
          <div className="portrait-wrap"><img src="/Media/IMG_3340.JPG" alt="Stephan Teig" /></div>
          <h2>Stephan <em>Teig</em></h2>
          <p className="profile-role">{text(CV.tittel, lang)}</p>
          <p className="profile-place"><MapPin size={13} />{ui.location}</p>
        </div>
        <nav className="side-nav" aria-label={lang === 'no' ? 'Hovedmeny' : 'Main navigation'}>
          <span className="side-nav-label">{lang === 'no' ? 'NAVIGASJON' : 'NAVIGATION'}</span>
          {navigation.map((item, index) => (
            <a key={item.id} className={page === item.id ? 'active' : ''} href={go(item.id)}>
              <span className="nav-index">0{index + 1}</span><span>{item[lang]}</span>
              {page === item.id && <ArrowUpRight size={15} />}
            </a>
          ))}
        </nav>
        <div className="sidebar-skills">
          <span className="side-nav-label">{lang === 'no' ? 'DET JEG GJØR' : 'WHAT I DO'}</span>
          <div><Camera size={14} />{lang === 'no' ? 'Film & foto' : 'Film & photography'}</div>
          <div><Film size={14} />{lang === 'no' ? 'Klipp & farge' : 'Edit & colour'}</div>
          <div><Code2 size={14} />{lang === 'no' ? 'Digitale verktøy' : 'Digital tools'}</div>
        </div>
        <div className="sidebar-bottom">
          <a className="pdf-link" href="/Media/StephanTeigCV.pdf" target="_blank" rel="noreferrer"><Download size={15} />{ui.download}</a>
          <div className="social-links" aria-label="Social links">
            <a href="https://www.youtube.com/@StephanTeig" aria-label="YouTube" target="_blank" rel="noreferrer"><Youtube size={16} /></a>
            <a href="https://www.instagram.com/stephanteig" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram size={16} /></a>
            <a href="https://www.linkedin.com/in/stephan-teig-727a8428b/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={16} /></a>
            <a href="https://github.com/stephanteig" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={16} /></a>
          </div>
          <span className="copyright">© {new Date().getFullYear()} TEIG MEDIA</span>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-context"><span className="online-dot" />{ui.studio}<span className="topbar-divider">/</span>{ui.location}</div>
          <div className="topbar-actions">
            <a className="jellyfin-link" href={jellyfinUrl} target="_blank" rel="noreferrer"><Tv size={16} /><span>{ui.watch}</span><ArrowUpRight size={13} /></a>
            <button className="language-button" onClick={() => setLang(lang === 'no' ? 'en' : 'no')} aria-label={`Switch language to ${ui.language}`}>{ui.language}</button>
            <a className="top-contact" href={go('contact')}>{lang === 'no' ? 'Ta kontakt' : 'Say hello'} <ArrowUpRight size={14} /></a>
          </div>
        </header>

        <main className="page-content" key={page}>
          {page === 'home' && <>
            <section className="home-hero page-wrap">
              <div className="hero-copy">
                <div className="eyebrow"><span>01 / {lang === 'no' ? 'FILM + KODE' : 'FILM + CODE'}</span><span>59°12′N 11°06′E</span></div>
                <h1>{ui.homeTitle}</h1>
                <p className="hero-lede">{ui.intro}</p>
                <div className="hero-actions"><a className="button-primary" href={go('works')}>{lang === 'no' ? 'Utforsk arbeidet' : 'Explore my work'} <ArrowRight size={16} /></a><a className="button-quiet" href={go('resume')}>{lang === 'no' ? 'Se CV' : 'View resume'} <ArrowDownRight size={16} /></a></div>
                <div className="hero-meta"><span>INDEPENDENT · ØSTFOLD</span><span>CAMERA / CODE / STORY</span></div>
              </div>
              <div className="hero-visual">
                <img className="hero-portrait" src="/Media/IMG_3340.JPG" alt="Portrait of Stephan Teig" />
                <div className="portrait-gradient" />
                <div className="visual-caption"><span>STEPHAN TEIG</span><span>CREATIVE PRACTICE — 2026</span></div>
                <div className="frame-index">ST<br /><span>01</span></div>
              </div>
              <div className="hero-stats">{CV.stats.map((stat, i) => <div className="stat" key={i}><strong>{stat.tall}</strong><span>{text(stat.label, lang)}</span></div>)}</div>
            </section>

            <section className="home-about page-wrap section-block">
              <SectionHeading index="02" label={lang === 'no' ? 'OM MEG' : 'ABOUT'} title={ui.about} />
              <div className="about-grid"><p className="about-statement">{text(CV.bio, lang)}</p><div className="about-aside"><p>{lang === 'no' ? 'Et lite, nysgjerrig studioarbeid med blikk for mennesker, detaljer og gode historier.' : 'A small, curious creative practice focused on people, details and stories worth telling.'}</p><a className="inline-link" href={go('resume')}>{lang === 'no' ? 'Mer om erfaringen min' : 'More about my experience'} <ArrowUpRight size={15} /></a></div></div>
            </section>

            <section className="home-work page-wrap section-block">
              <SectionHeading index="03" label={ui.selected} title={lang === 'no' ? 'Fra idé til ferdig uttrykk.' : 'From first idea to final frame.'} action={<a className="inline-link" href={go('works')}>{ui.allWork} <ArrowUpRight size={15} /></a>} />
              <div className="featured-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.tittel} project={project} index={index} lang={lang} onOpen={setSelectedProject} />)}</div>
            </section>

            <section className="home-links page-wrap section-block">
              <SectionHeading index="04" label={lang === 'no' ? 'FLERE ROM' : 'OTHER SPACES'} title={lang === 'no' ? 'Prosjekter med eget hjem.' : 'Projects with a home of their own.'} />
              <div className="external-grid">
                <a className="external-card staf-card" href="/staf/"><div className="external-thumb"><img src="/staf/assets/img/staf-opening-still.webp" alt="STAF Films project still" /><span className="external-mark">STAF.</span></div><div className="external-card-info"><div><span className="eyebrow-small">FILM STUDIO</span><h3>STAF Films</h3><p>{lang === 'no' ? 'Kortfilmer, festival og prosessen bak.' : 'Short films, festivals and the process behind them.'}</p></div><ArrowUpRight size={20} /></div></a>
                <a className="external-card tool-card" href="/shotlist-planner/client/"><div className="tool-visual shotlist-visual"><span>01 / PRE-PRODUCTION</span><div><span className="tool-lines" /><span className="tool-grid-mark">▤</span></div><strong>SHOTLIST<br />PLANNER</strong></div><div className="external-card-info"><div><span className="eyebrow-small">PRODUCTION TOOL</span><h3>Shotlist Planner</h3><p>{lang === 'no' ? 'Planlegg opptaket før kamera ruller.' : 'Plan the shoot before the camera rolls.'}</p></div><ArrowUpRight size={20} /></div></a>
                <a className="external-card tool-card" href="/studio-tools/"><div className="tool-visual studio-tools-visual"><span>02 / STUDIO SYSTEMS</span><div className="tool-circle">TM</div><strong>STUDIO<br />TOOLS</strong></div><div className="external-card-info"><div><span className="eyebrow-small">CREATIVE WORKFLOW</span><h3>Studio Tools</h3><p>{lang === 'no' ? 'Små verktøy for en bedre produksjonsflyt.' : 'Small tools for a smoother production workflow.'}</p></div><ArrowUpRight size={20} /></div></a>
              </div>
            </section>

            <section className="jellyfin-feature page-wrap"><div className="jellyfin-icon"><Tv size={22} /></div><div><span className="eyebrow-small">PRIVATE MEDIA LIBRARY</span><h2>Metropolis</h2><p>{ui.watchSub}</p></div><a href={jellyfinUrl} className="button-primary" target="_blank" rel="noreferrer">{ui.watch} <ArrowUpRight size={16} /></a></section>
            <Footer lang={lang} />
          </>}

          {page === 'resume' && <>
            <section className="page-intro page-wrap"><div className="eyebrow"><span>02 / {lang === 'no' ? 'CV & ERFARING' : 'RESUME & EXPERIENCE'}</span><span>STEPHAN TEIG</span></div><h1>{lang === 'no' ? <>Arbeid med<br /><em>mening.</em></> : <>Work with<br /><em>meaning.</em></>}</h1><p className="hero-lede">{text(CV.bio, lang)}</p><a className="button-primary" href="/Media/StephanTeigCV.pdf" target="_blank" rel="noreferrer"><Download size={16} />{ui.download}</a></section>
            <section className="page-wrap section-block resume-section"><SectionHeading index="01" label={text(CV.ui.ervaring, lang)} title={lang === 'no' ? 'Erfaring' : 'Experience'} /><Timeline items={CV.erfaring} lang={lang} /></section>
            <section className="page-wrap section-block resume-section"><SectionHeading index="02" label={text(CV.ui.verv, lang)} title={lang === 'no' ? 'Verv & engasjement' : 'Roles & engagement'} /><Timeline items={CV.verv} lang={lang} /></section>
            <section className="page-wrap section-block resume-section"><SectionHeading index="03" label={text(CV.ui.utdanning, lang)} title={lang === 'no' ? 'Utdanning' : 'Education'} /><Timeline items={CV.utdanning} lang={lang} /></section>
            <section className="page-wrap section-block"><SectionHeading index="04" label={lang === 'no' ? 'FERDIGHETER' : 'SKILLS'} title={lang === 'no' ? 'Verktøy og fag.' : 'Tools of the craft.'} /><div className="skills-grid">{CV.ferdigheter.map((skill, i) => <div className="skill-row" key={i}><div><span>{text(skill.navn, lang)}</span><small>{String(skill.prosent).padStart(2, '0')}%</small></div><div className="skill-track"><span style={{ width: `${skill.prosent}%` }} /></div></div>)}</div><div className="language-row"><span>{lang === 'no' ? 'Språk' : 'Languages'}</span>{CV.sprak.map((item) => <span className="language-pill" key={item.namn.no}>{text(item.namn, lang)} · {item.nivaa}/5</span>)}</div></section>
            <section className="resume-download page-wrap"><div><span className="eyebrow-small">PDF · UPDATED CV</span><h2>{lang === 'no' ? 'Ta med detaljene.' : 'Take the details with you.'}</h2></div><a className="button-primary" href="/Media/StephanTeigCV.pdf" target="_blank" rel="noreferrer"><Download size={16} />{ui.download}</a></section>
            <Footer lang={lang} />
          </>}

          {page === 'works' && <>
            <section className="page-intro page-wrap"><div className="eyebrow"><span>03 / {lang === 'no' ? 'PROSJEKTER' : 'SELECTED WORK'}</span><span>{CV.prosjekter.length} PROJECTS</span></div><h1>{lang === 'no' ? <>Ting jeg har<br /><em>laget.</em></> : <>Things I’ve<br /><em>made.</em></>}</h1><p className="hero-lede">{lang === 'no' ? 'Film, foto, små digitale verktøy og arbeid med mennesker.' : 'Film, photography, small digital tools and collaborative work.'}</p></section>
            <section className="page-wrap work-page-section"><div className="filter-bar" aria-label={lang === 'no' ? 'Filtrer prosjekter' : 'Filter projects'}>{['alle', ...new Set(CV.prosjekter.map((project) => project.filter))].map((category) => <button key={category} className={filter === category ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(category)}>{categoryNames[lang][category] ?? category}</button>)}<span className="results-count">{String(visibleProjects.length).padStart(2, '0')} / {String(CV.prosjekter.length).padStart(2, '0')}</span></div><div className="project-grid">{visibleProjects.map((project, index) => <ProjectCard key={project.tittel} project={project} index={index} lang={lang} onOpen={setSelectedProject} />)}</div></section>
            <Footer lang={lang} />
          </>}

          {page === 'contact' && <>
            <section className="page-intro contact-intro page-wrap"><div className="eyebrow"><span>04 / {lang === 'no' ? 'KONTAKT' : 'CONTACT'}</span><span>OPEN TO GOOD IDEAS</span></div><h1>{lang === 'no' ? <>Skal vi lage<br /><em>noe sammen?</em></> : <>Make something<br /><em>with me.</em></>}</h1><p className="hero-lede">{lang === 'no' ? 'Fortell meg hva du jobber med, eller bare si hei.' : 'Tell me what you’re working on, or just say hello.'}</p></section>
            <section className="contact-layout page-wrap section-block"><div className="contact-details"><span className="eyebrow-small">DIRECT LINE</span><a href={`mailto:${CV.epost}`}><Mail size={18} />{CV.epost}<ArrowUpRight size={15} /></a><a href={`tel:${CV.telefon.replaceAll(' ', '')}`}><span className="phone-symbol">＋</span>{CV.telefon}<ArrowUpRight size={15} /></a><p><MapPin size={16} />{text(CV.sted, lang)}</p><div className="contact-socials"><span className="eyebrow-small">FIND ME ELSEWHERE</span>{CV.sosiale.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight size={13} /></a>)}</div><a className="contact-jellyfin" href={jellyfinUrl} target="_blank" rel="noreferrer"><Tv size={18} /><span><strong>Metropolis</strong><small>{lang === 'no' ? 'Jellyfin-bibliotek' : 'Jellyfin library'}</small></span><ArrowUpRight size={15} /></a></div><form className="contact-form" onSubmit={sendMessage}><label>{lang === 'no' ? 'Ditt navn' : 'Your name'}<input name="name" placeholder={text(CV.ui.navnPlaceholder, lang)} required /></label><label>{lang === 'no' ? 'E-postadressen din' : 'Your email'}<input name="email" type="email" placeholder={text(CV.ui.epostPlaceholder, lang)} required /></label><label>{lang === 'no' ? 'Hva tenker du på?' : 'What’s on your mind?'}<textarea name="message" rows="6" placeholder={text(CV.ui.meldingPlaceholder, lang)} required /></label><button className="button-primary" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? text(CV.ui.senderMelding, lang) : <>{text(CV.ui.sendKnapp, lang)} <Send size={15} /></>}</button>{formState === 'sent' && <p className="form-message success"><Check size={15} />{text(CV.ui.meldingSendt, lang)}</p>}{formState === 'error' && <p className="form-message error">{text(CV.ui.meldingFeil, lang)}</p>}</form></section>
            <Footer lang={lang} />
          </>}
        </main>
      </div>

      <nav className="mobile-dock" aria-label={lang === 'no' ? 'Mobilmeny' : 'Mobile navigation'}>{navigation.map((item, index) => <a key={item.id} className={page === item.id ? 'active' : ''} href={go(item.id)}><span>{['⌂', '▤', '▧', '↗'][index]}</span>{item[lang]}</a>)}<a href={jellyfinUrl} target="_blank" rel="noreferrer"><Tv size={16} />Jellyfin</a></nav>

      {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-label={projectTitle(selectedProject)} onClick={(event) => event.stopPropagation()}><div className="modal-head"><div><span className="eyebrow-small">{text(selectedProject.rolle, lang)}</span><h2>{projectTitle(selectedProject)}</h2></div><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label={lang === 'no' ? 'Lukk' : 'Close'}><X size={20} /></button></div><div className="modal-media">{selectedProject.type === 'youtube' ? <iframe title={projectTitle(selectedProject)} src={`https://www.youtube-nocookie.com/embed/${selectedProject.embed}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <iframe title={projectTitle(selectedProject)} src={`https://drive.google.com/file/d/${selectedProject.embed}/preview`} allow="autoplay" allowFullScreen />}</div></div></div>}
    </div>
  );
}

function SectionHeading({ index, label, title, action }) {
  return <div className="section-heading"><div><div className="section-kicker"><span>{index} /</span>{label}</div><h2>{title}</h2></div>{action && <div className="section-action">{action}</div>}</div>;
}

function Timeline({ items, lang }) {
  return <div className="timeline">{items.map((item, index) => <article className="timeline-item" key={`${item.aar}-${index}`}><span className="timeline-date">{item.aar}</span><span className="timeline-dot" /><div className="timeline-copy"><h3>{text(item.tittel, lang)}</h3><p className="timeline-place">{text(item.sted, lang)}</p>{text(item.tekst, lang) && <p className="timeline-description">{text(item.tekst, lang)}</p>}</div></article>)}</div>;
}

function ProjectCard({ project, index, lang, onOpen }) {
  const external = project.lenke;
  const isPreview = ['youtube', 'drive'].includes(project.type);
  let imageUrl = project.thumbnail ? `/${project.thumbnail}` : project.type === 'youtube' ? `https://img.youtube.com/vi/${project.embed}/hqdefault.jpg` : null;
  const mainContent = <>
    <div className={`project-art art-${project.filter} ${imageUrl ? 'has-image' : ''}`} style={imageUrl ? { backgroundImage: `linear-gradient(180deg, transparent 52%, rgba(8,8,14,.62)), url("${imageUrl}")` } : undefined}>
      <span className="art-index">{String(index + 1).padStart(2, '0')}</span>
      {isPreview && <span className="play-button"><Play size={17} fill="currentColor" /></span>}
      {!imageUrl && <span className="art-type">{project.filter === 'tech' ? <Code2 size={35} /> : project.filter === 'esport' ? 'RØ' : <Film size={34} />}</span>}
      <span className="art-category">{categoryNames[lang][project.filter] ?? project.filter}</span>
      {project.badge && <span className="project-badge">{lang === 'no' ? 'UNDER UTVIKLING' : 'IN DEVELOPMENT'}</span>}
    </div>
    <div className="project-card-copy"><div><span className="project-role">{text(project.rolle, lang)}</span><h3>{projectTitle(project)}</h3>{project.tekst && <p>{text(project.tekst, lang)}</p>}</div><ArrowUpRight size={17} className="project-card-arrow" /></div>
  </>;
  if (isPreview) return <button className={`project-card ${index === 0 ? 'featured' : ''}`} onClick={() => onOpen(project)} aria-label={`${lang === 'no' ? 'Se' : 'Watch'} ${projectTitle(project)}`}>{mainContent}</button>;
  return <article className={`project-card ${index === 0 ? 'featured' : ''}`}><a className="project-main-link" href={external ?? project.github ?? '#'} target={external || project.github ? '_blank' : undefined} rel={external || project.github ? 'noreferrer' : undefined}>{mainContent}</a>{project.github && <div className="project-github"><a href={project.github} target="_blank" rel="noreferrer"><Github size={14} />{lang === 'no' ? 'Kildekode' : 'Source code'}<ExternalLink size={12} /></a></div>}</article>;
}

function Footer({ lang }) {
  return <footer className="site-footer page-wrap"><a className="footer-mark" href="#home">TEIG<span>MEDIA</span></a><span>© {new Date().getFullYear()} STEPHAN TEIG · FREDRIKSTAD</span><a href="mailto:teig.stephan@gmail.com">{lang === 'no' ? 'SEND EN E-POST' : 'SEND AN EMAIL'} <ArrowUpRight size={12} /></a></footer>;
}

createRoot(document.getElementById('root')).render(<App />);
