import { useEffect } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Leaf, Mail, MapPin, Sprout } from "lucide-react";
import mainImage from "../assets/images/main-w.jpg";
import ScheduleTable from "../assets/components/ScheduleTable";
import SkillsBoard from "../assets/components/Skillsboard";

const navItems = [["About", "#about"], ["Expertise", "#expertise"], ["Education", "#education"], ["Schedule", "#schedule"], ["Contact", "#contact"]];

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = document.querySelectorAll<HTMLElement>(".section");

    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("scroll-visible", entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let isSnapping = false;
    let releaseTimer: number | undefined;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (isSnapping) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>(".hero, .section"));
      const containingIndex = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 1 && rect.bottom > 1;
      });
      const currentIndex = containingIndex >= 0 ? containingIndex : sections.reduce((closest, section, index) =>
        Math.abs(section.getBoundingClientRect().top) < Math.abs(sections[closest].getBoundingClientRect().top) ? index : closest, 0);
      const currentRect = sections[currentIndex].getBoundingClientRect();

      if (event.deltaY > 0 && currentRect.bottom > window.innerHeight + 2) return;
      if (event.deltaY < 0 && currentRect.top < -2) return;

      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + (event.deltaY > 0 ? 1 : -1)));
      if (nextIndex === currentIndex) return;

      event.preventDefault();
      isSnapping = true;
      sections[nextIndex].scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => { isSnapping = false; }, 900);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearTimeout(releaseTimer);
    };
  }, []);

  return <main className="site-shell">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Wilcah Quibo, home"><span>WQ</span><p>Wilcah Quibo</p></a>
      <nav aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <a className="header-cta" href="mailto:wilcahsy@gmail.com">Let’s connect <ArrowUpRight size={16} /></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span /> Registered Agriculturist · Educator</p>
        <h1>Growing knowledge.<br /><em>Cultivating futures.</em></h1>
        <p className="hero-intro">I bring the science of agriculture into the classroom—helping students turn practical knowledge into confident, responsible action.</p>
        <div className="hero-actions"><a className="button button-primary" href="#about">Explore my work <ArrowDown size={17} /></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a></div>
        <div className="hero-meta"><div><MapPin size={17} /><span>Based in Tubod,<br />Lanao del Norte</span></div><div><BookOpen size={17} /><span>Instructor at<br />Tubod College</span></div></div>
      </div>
      <div className="portrait-wrap reveal delay-one">
        <div className="portrait-frame"><img src={mainImage} alt="Wilcah S. Quibo outdoors at the college campus" /></div>
        <div className="portrait-note"><Leaf size={19} /><span>Where science meets<br />stewardship</span></div><span className="portrait-index">01 — FIELD NOTES</span>
      </div>
    </section>

    <section className="about section" id="about">
      <div className="section-label"><span>01</span> About</div>
      <div className="about-content"><p className="kicker">Rooted in practice</p><h2>Agriculture is more than a field of study. It’s how communities thrive.</h2>
        <div className="about-grid"><p>I am a registered agriculturist and instructor with experience across agricultural systems, education, and technology-supported learning. My work connects classroom fundamentals with the realities of the field.</p><p>Whether I’m planning a lesson, guiding a crop production activity, or helping students build confidence, I approach every task with patience, curiosity, and care for the communities we serve.</p></div>
        <div className="principles"><article><Sprout size={22} /><span>01</span><h3>Learn by doing</h3><p>Practical experience makes knowledge last.</p></article><article><BookOpen size={22} /><span>02</span><h3>Teach with clarity</h3><p>Complex ideas deserve accessible explanations.</p></article><article><Leaf size={22} /><span>03</span><h3>Grow responsibly</h3><p>Progress begins with care for land and people.</p></article></div>
      </div>
    </section>

    <section className="expertise section" id="expertise"><div className="section-heading light"><div className="section-label"><span>02</span> Expertise</div><div><p className="kicker">A working toolkit</p><h2>Knowledge built across the classroom and the field.</h2></div></div><SkillsBoard /></section>
    <section className="education section" id="education">
      <div className="section-heading"><div className="section-label"><span>03</span> Education</div><div><p className="kicker">Academic foundation</p><h2>Learning that moves from practice to mastery.</h2></div></div>
      <div className="education-path">
        <article><span className="degree-mark">01</span><div><p>Diploma</p><h3>Diploma in Agricultural Technology</h3><small>Major in Crop Production Technology</small></div></article>
        <article><span className="degree-mark">02</span><div><p>Bachelor’s Degree</p><h3>Bachelor of Agricultural Technology</h3><small>Advanced agricultural practice and technology</small></div></article>
        <article><span className="degree-mark">03</span><div><p>Master’s Degree</p><h3>Master of Science in Crop Science</h3><small>Graduate studies in crop science</small></div></article>
      </div>
    </section>
    <section className="schedule section" id="schedule"><div className="section-heading"><div className="section-label"><span>04</span> Schedule</div><div><p className="kicker">Weekly rhythm</p><h2>In the classroom.</h2><p className="heading-copy">A current overview of lecture and laboratory hours.</p></div></div><ScheduleTable /></section>
    <section className="contact section" id="contact"><div className="contact-copy"><p className="eyebrow"><span /> Start a conversation</p><h2>Let’s grow something <em>worthwhile.</em></h2><p>For academic collaboration, agricultural projects, or teaching opportunities, my inbox is open.</p></div><a className="contact-card" href="mailto:wilcahsy@gmail.com"><Mail size={25} /><span><small>Email me at</small>wilcahsy@gmail.com</span><ArrowUpRight size={23} /></a></section>
    <footer><p>© {new Date().getFullYear()} Wilcah S. Quibo, RAgr.</p><a href="#top">Back to top ↑</a></footer>
  </main>;
}
