import { useRef, useEffect } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Leaf, Mail, MapPin, Sprout } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import mainImage from "../assets/images/main-w.jpg";
import ScheduleTable from "../assets/components/ScheduleTable";
import SkillsBoard from "../assets/components/Skillsboard";

// A lightweight helper to split text into characters for heavy GSAP staggering
const SplitText = ({ children, className = "" }: { children: string, className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {children.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="gsap-char inline-block translate-y-[120%] rotate-[15deg] opacity-0 origin-bottom-left">
              {char}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  );
};

const navItems = [
  ["About", "#about"], 
  ["Expertise", "#expertise"], 
  ["Education", "#education"], 
  ["Schedule", "#schedule"], 
  ["Contact", "#contact"]
];

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Initial Hero Bloom (Heavy entrance)
    const tl = gsap.timeline();
    
    // Animate the characters in the heading (like wind blowing leaves into place)
    tl.to(".gsap-char", {
      y: "0%",
      rotate: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.03,
      ease: "power4.out",
      delay: 0.2
    })
    // Fade in paragraph and button
    .fromTo(".hero-fade", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }, 
      "-=1"
    )
    // Mask reveal the hero image (growing from the center like a seed)
    .fromTo(".hero-image-container",
      { clipPath: "ellipse(0% 0% at 50% 100%)", scale: 1.1 },
      { clipPath: "ellipse(150% 150% at 50% 100%)", scale: 1, duration: 2, ease: "power3.inOut" },
      "-=1.5"
    );

    // 2. Continuous "Breathing" for icons
    gsap.to(".breathing-icon", {
      y: -8,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // 3. Heavy Scroll Effects - The Vine
    gsap.to(".plant-stem", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".site-content",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Vine Leaves sprouting as you scroll
    gsap.utils.toArray(".vine-leaf").forEach((leaf: any) => {
      gsap.fromTo(leaf, 
        { scale: 0, rotate: -45 }, 
        { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: leaf,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 4. Pinning Sections (Editorial heavy feel)
    // Lock the "About" title in place while the text scrolls next to it
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function() {
        ScrollTrigger.create({
          trigger: "#about",
          start: "top top",
          end: "bottom bottom",
          pin: ".about-title-pin",
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: "#education",
          start: "top 10%",
          end: "bottom bottom",
          pin: ".edu-title-pin",
          pinSpacing: false,
        });
      }
    });

    // 5. Heavy Card Unfolding Reveals
    gsap.utils.toArray(".unfold-card").forEach((card: any) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0, rotateX: -15, transformPerspective: 1000 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 6. Deep Parallax on Hero Image
    gsap.to(".portrait-img", {
      yPercent: 20,
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative min-h-screen font-sans overflow-hidden">
      
      {/* Central Content Container */}
      <div className="site-content relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* The growing plant stem */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[2px] bg-earth-900/10 z-0">
          <div className="plant-stem w-full h-full bg-leaf-500 origin-top scale-y-0" />
          
          {/* Sprouting leaves along the stem */}
          <div className="vine-leaf absolute top-[25%] -left-3 text-leaf-500"><Leaf size={16} className="fill-leaf-500" /></div>
          <div className="vine-leaf absolute top-[50%] -left-3 text-leaf-500 -scale-x-100"><Leaf size={16} className="fill-leaf-500" /></div>
          <div className="vine-leaf absolute top-[75%] -left-3 text-leaf-500"><Leaf size={16} className="fill-leaf-500" /></div>
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-paper-100/90 backdrop-blur-md border-b border-earth-900/5">
          <a href="#top" className="flex items-center gap-3 font-serif font-bold text-xl tracking-wide group text-leaf-600">
            <Leaf size={24} className="group-hover:-rotate-12 transition-transform duration-500" />
            <span className="hidden md:block text-earth-900">Wilcah Quibo</span>
          </a>
          <nav className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-earth-800">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-leaf-600 transition-colors">{label}</a>
            ))}
          </nav>
          <a href="mailto:wilcahsy@gmail.com" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-earth-900/20 px-5 py-2 hover:bg-earth-900 hover:text-paper-100 transition-colors rounded-full">
            Connect
          </a>
        </header>

        {/* Hero Section */}
        <section className="hero-section min-h-screen flex flex-col md:flex-row items-center pt-24 pb-12 gap-12 ml-6 md:ml-12 relative z-10" id="top">
          <div className="w-full md:w-3/5">
            <p className="hero-fade flex items-center gap-3 text-leaf-600 font-bold text-xs tracking-[0.2em] uppercase mb-8">
              <span className="w-8 h-[2px] bg-leaf-600 rounded-full" />
              Registered Agriculturist · Educator
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-earth-900 font-serif">
              <SplitText>Growing knowledge.</SplitText><br />
              <em className="text-leaf-600 italic font-light"><SplitText>Cultivating futures.</SplitText></em>
            </h1>
            <p className="hero-fade text-lg md:text-xl text-earth-800 max-w-xl leading-relaxed mb-10 font-serif">
              I bring the science of agriculture into the classroom—helping students turn practical knowledge into confident, responsible action.
            </p>
            <div className="hero-fade flex flex-wrap items-center gap-6">
              <a href="#about" className="flex items-center gap-2 bg-leaf-600 text-paper-100 px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-leaf-700 transition-colors rounded-full shadow-lg hover:shadow-leaf-600/30">
                Explore Work <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-fade flex gap-8 mt-16 text-sm text-earth-800 font-medium">
              <div className="flex items-center gap-2"><MapPin size={18} className="text-clay-500 breathing-icon"/> Tubod, Lanao del Norte</div>
              <div className="flex items-center gap-2"><BookOpen size={18} className="text-clay-500 breathing-icon"/> Tubod College</div>
            </div>
          </div>

          <div className="w-full md:w-2/5 relative">
            <div className="hero-image-container aspect-[3/4] overflow-hidden rounded-t-[100px] rounded-b-xl relative border-4 border-paper-200 shadow-2xl">
              <img src={mainImage} alt="Wilcah S. Quibo" className="portrait-img w-full h-[130%] object-cover absolute top-[-15%]" />
            </div>
            {/* Floating journal note */}
            <div className="hero-fade absolute -bottom-6 -left-12 bg-paper-100 border border-earth-900/10 p-6 shadow-xl rounded-br-3xl">
              <Sprout size={24} className="text-leaf-500 mb-2 breathing-icon" />
              <span className="block font-serif italic text-xl text-earth-900">Where science meets stewardship</span>
            </div>
          </div>
        </section>

        {/* About Section - With Heavy Pinning */}
        <section className="py-32 ml-6 md:ml-12 border-t border-earth-900/10 relative z-10" id="about">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
              <div className="about-title-pin pt-12 md:pt-32">
                <span className="text-clay-500 font-bold text-xs tracking-widest uppercase">01 / Field Notes</span>
                <h2 className="text-5xl font-serif italic mt-4 text-earth-900 leading-tight">Rooted in<br/>practice.</h2>
              </div>
            </div>
            <div className="w-full md:w-2/3 pt-12 md:pt-32 pb-32">
              <h3 className="unfold-card text-2xl md:text-4xl font-serif leading-tight mb-12 text-earth-900">Agriculture is more than a field of study. It’s how communities thrive.</h3>
              <div className="unfold-card grid md:grid-cols-2 gap-8 text-earth-800 leading-relaxed mb-16 text-lg">
                <p>I am a registered agriculturist and instructor with experience across agricultural systems, education, and technology-supported learning. My work connects classroom fundamentals with the realities of the field.</p>
                <p>Whether I’m planning a lesson, guiding a crop production activity, or helping students build confidence, I approach every task with patience, curiosity, and care for the communities we serve.</p>
              </div>
              
              <div className="grid md:grid-cols-1 gap-6">
                {[
                  { icon: <Sprout size={28}/>, num: "01", title: "Learn by doing", desc: "Practical experience makes knowledge last long after the harvest." },
                  { icon: <BookOpen size={28}/>, num: "02", title: "Teach with clarity", desc: "Complex ideas deserve accessible explanations to cultivate true understanding." },
                  { icon: <Leaf size={28}/>, num: "03", title: "Grow responsibly", desc: "Sustainable progress begins with profound care for land and people." }
                ].map((item, i) => (
                  <article key={i} className="unfold-card group p-8 bg-paper-200/40 rounded-xl border border-earth-900/5 flex items-start gap-6 hover:bg-paper-200 transition-colors duration-500">
                    <div className="text-leaf-600 bg-paper-100 min-w-[64px] h-16 flex items-center justify-center rounded-full shadow-sm breathing-icon">{item.icon}</div>
                    <div>
                      <h4 className="font-serif font-bold text-2xl text-earth-900 mb-2">{item.title}</h4>
                      <p className="text-earth-800 text-lg">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-32 ml-6 md:ml-12 border-t border-earth-900/10 relative z-10" id="expertise">
          <div className="mb-16">
            <span className="text-clay-500 font-bold text-xs tracking-widest uppercase">02 / Expertise</span>
            <h2 className="unfold-card text-5xl md:text-6xl font-serif mt-4 max-w-2xl text-earth-900">Knowledge built across the classroom and the field.</h2>
          </div>
          <div className="unfold-card bg-paper-200/50 border border-earth-900/5 p-8 rounded-3xl shadow-lg">
            <SkillsBoard />
          </div>
        </section>

        {/* Education Section - With Pinning */}
        <section className="py-32 ml-6 md:ml-12 border-t border-earth-900/10 relative z-10" id="education">
          <div className="flex flex-col md:flex-row gap-16">
             <div className="w-full md:w-1/3">
                <div className="edu-title-pin pt-12 md:pt-32">
                  <span className="text-clay-500 font-bold text-xs tracking-widest uppercase">03 / Education</span>
                  <h2 className="text-5xl font-serif mt-4 text-earth-900 leading-tight">Practice to<br/><em className="italic">mastery.</em></h2>
                </div>
             </div>
             
             <div className="w-full md:w-2/3 pt-12 md:pt-32 pb-32">
              <div className="space-y-16 pl-6 border-l-2 border-earth-900/10 relative">
                {[
                  { type: "Diploma", title: "Diploma in Agricultural Technology", desc: "Major in Crop Production Technology", year: "2018" },
                  { type: "Bachelor’s Degree", title: "Bachelor of Agricultural Technology", desc: "Advanced agricultural practice and technology", year: "2020" },
                  { type: "Master’s Degree", title: "Master of Science in Crop Science", desc: "Graduate studies in crop science", year: "2023" }
                ].map((edu, i) => (
                  <article key={i} className="unfold-card relative pl-8 group">
                    <span className="absolute left-[-42px] top-1 text-leaf-500 bg-paper-100 p-1 rounded-full border-2 border-paper-100 group-hover:scale-125 transition-transform duration-500">
                      <Leaf size={24} className="fill-leaf-500/20" />
                    </span>
                    <p className="text-xs text-clay-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-4">
                      {edu.type} <span className="h-px bg-clay-500/30 flex-1"></span> {edu.year}
                    </p>
                    <h3 className="text-3xl font-serif font-bold text-earth-900 mb-4">{edu.title}</h3>
                    <p className="text-earth-800 text-lg">{edu.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="py-32 ml-6 md:ml-12 border-t border-earth-900/10 relative z-10" id="schedule">
          <div className="mb-16">
            <span className="text-clay-500 font-bold text-xs tracking-widest uppercase">04 / Schedule</span>
            <h2 className="unfold-card text-5xl font-serif mt-4 mb-4 text-earth-900">In the classroom.</h2>
            <p className="unfold-card text-earth-800 text-lg">A current overview of lecture and laboratory hours.</p>
          </div>
          <div className="unfold-card bg-paper-200/50 border border-earth-900/5 p-4 md:p-8 overflow-x-auto rounded-3xl shadow-lg">
            <ScheduleTable />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 ml-6 md:ml-12 border-t border-earth-900/10 mb-12 relative z-10" id="contact">
          <div className="unfold-card bg-leaf-600 text-paper-100 p-12 md:p-24 relative overflow-hidden rounded-[3rem] shadow-2xl">
            <div className="relative z-10">
              <p className="font-bold text-xs tracking-widest uppercase mb-8 border-b border-paper-100/30 inline-block pb-2">Start a conversation</p>
              <h2 className="text-6xl md:text-8xl font-serif mb-12 leading-[0.9]">
                Let’s grow <br/>something <em className="italic font-light text-paper-200">worthwhile.</em>
              </h2>
              <a href="mailto:wilcahsy@gmail.com" className="inline-flex items-center gap-6 text-2xl md:text-4xl font-serif hover:text-paper-200 transition-colors group">
                <span className="bg-paper-100 text-leaf-600 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </span>
                wilcahsy@gmail.com 
              </a>
            </div>
            {/* Background botanical graphics */}
            <Leaf size={600} className="absolute -right-20 -bottom-20 text-leaf-500/40 rotate-45 breathing-icon" style={{ animationDuration: '6s' }} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 ml-6 md:ml-12 border-t border-earth-900/10 flex flex-col md:flex-row justify-between items-center text-xs text-earth-800 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Wilcah S. Quibo, RAgr.</p>
          <a href="#top" className="hover:text-leaf-600 transition-colors mt-4 md:mt-0 flex items-center gap-2 group">
            Back to canopy 
            <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
          </a>
        </footer>

      </div>
    </main>
  );
}