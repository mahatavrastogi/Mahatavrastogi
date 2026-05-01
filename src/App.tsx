import { motion, useMotionValue, useSpring } from "motion/react";
import { 
  Home as HomeIcon, 
  User, 
  Briefcase, 
  Mail, 
  Download, 
  ExternalLink,
  Phone,
  Linkedin,
  Instagram,
  Youtube,
  Play,
  Film,
  X,
  ArrowRight,
  Sun,
  Moon,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";
import { AnimatePresence } from "motion/react";

// --- Nav Config ---
const SECTIONS = [
  { id: "home", name: "Home", icon: <HomeIcon size={20} /> },
  { id: "about", name: "About", icon: <User size={20} /> },
  { id: "showreel", name: "Showreel", icon: <Play size={20} /> },
  { id: "portfolio", name: "Works", icon: <Briefcase size={20} /> },
  { id: "contact", name: "Contact", icon: <Mail size={20} /> },
];

// --- Custom Cursor ---
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-20 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#111] flex items-center justify-center hover:bg-accent hover:text-black transition-all z-[1100] shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex-1 overflow-y-auto w-full h-full">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Sections ---

const HomeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Background GIF - Fully Covering */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/d/1bP0DZfctAoHrzTNJ1mVknE_TyW6ql4i_"
          alt="Background Animation"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
      </div>
      
      {/* Enhanced Dark Overlay for better coverage */}
      <div className="absolute inset-0 bg-black/70 sm:bg-black/60 lg:bg-black/40" />
      
      {/* Full screen gradient fade to prevent sharp edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 lg:from-black/60 lg:to-black/60" />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/10 rounded-full"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Rotating VFX Elements */}
      <motion.div 
        className="absolute top-20 right-1/4 w-64 h-64 border border-white/5 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-accent/20" />
      </motion.div>
      <motion.div 
        className="absolute bottom-40 left-1/3 w-96 h-96 border border-white/5 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-accent/20" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
};

const HomeSection = ({ onOpenAbout, theme }: { onOpenAbout: () => void, theme: string }) => (
  <section id="home" className="relative flex flex-col lg:flex-row h-full min-h-[100dvh] lg:min-h-screen overflow-hidden">
    <HomeBackground />
    
    <div className="w-full lg:w-[40%] flex items-center justify-center p-6 lg:p-0 z-10 lg:pl-10">
      <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] mt-16 sm:mt-20 lg:mt-0">
        {/* Yellow corner blocks with continuous animation */}
        <motion.div 
          className="absolute -top-3 -left-3 lg:-top-6 lg:-left-6 w-16 h-16 lg:w-32 lg:h-32 bg-accent -z-10 rounded-tl-[40px] lg:rounded-tl-[100px]"
          animate={{ 
            scale: [1, 1.08, 1],
            x: [0, -8, 0],
            y: [0, -8, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-3 -right-3 lg:-bottom-6 lg:-right-6 w-16 h-16 lg:w-32 lg:h-32 bg-accent -z-10 rounded-br-[40px] lg:rounded-br-[100px]"
          animate={{ 
            scale: [1, 1.08, 1],
            x: [0, 8, 0],
            y: [0, 8, 0],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className={`w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative border border-white/5 ${theme === 'light' ? 'bg-white' : 'bg-[#111]'}`}
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1D-OAAxBPA6jVyJGtogfHz6SXe3-zB8_d" 
            alt="Profile" 
            className="w-full h-full object-cover lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </div>

    <div className="w-full lg:w-[60%] flex flex-col justify-center px-4 sm:px-6 lg:px-20 pt-8 pb-32 lg:py-0 text-center lg:text-left z-10">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-[50px] font-black uppercase tracking-tight text-accent leading-tight mb-2 sm:mb-4 flex flex-col lg:flex-row items-center lg:items-center gap-1 sm:gap-2 lg:gap-4">
          <span className="hidden lg:block w-8 lg:w-10 h-[4px] bg-accent shrink-0"></span>
          <span>I'm Mahatav <span className="text-white">Rastogi.</span></span>
        </h1>
        <h2 className="text-base sm:text-xl md:text-[32px] font-bold uppercase tracking-widest text-white mb-4 sm:mb-6">
          CG/VFX Compositor
        </h2>
        <p className="text-white/80 text-xs sm:text-base md:text-[18px] leading-relaxed max-w-[800px] mb-8 sm:mb-10 mx-auto lg:mx-0 font-medium">
          CG/VFX Compositing Artist with <span className="font-bold italic text-accent">6+ years of experience</span> in compositing, CG integration, keying, and final shot enhancement. Worked on <span className="font-bold italic text-accent">Hollywood projects</span> such as <span className="font-bold italic text-accent">Silo, Prehistoric Planet Season 2</span>, and <span className="font-bold italic text-accent">The Wheel of Time Season 2</span>, along with <span className="font-bold italic text-accent">Bollywood projects</span> like <span className="font-bold italic text-accent">Kantara, ARM, and Citadel: Honey Bunny</span>. Also contributed to commercial campaigns for global brands like <span className="font-bold italic text-accent">HP, Lenovo, Sony, and Panasonic</span>. Strong understanding of the complete 2D/3D VFX pipeline.
        </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start justify-center lg:justify-start">
          <button
            onClick={onOpenAbout}
            className="group relative inline-flex items-center gap-8 lg:gap-10 pl-8 lg:pl-10 pr-4 py-2.5 sm:py-3 lg:py-4 border-[1px] border-accent rounded-full text-[10px] sm:text-xs lg:text-sm font-black uppercase tracking-[2px] overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10">More About Me</span>
            <span className="relative z-10 bg-accent p-3 sm:p-3.5 lg:p-4 rounded-full text-black">
              <ArrowRight size={18} />
            </span>
            <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 -z-0" />
          </button>
        </div>
      </motion.div>
    </div>

    {/* Scroll to Explore Indicator */}
    <div className="scroll-indicator absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
      <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center p-1">
        <motion.div 
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 bg-accent rounded-full"
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[3px] text-accent">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <ArrowDown size={14} className="text-accent" />
      </motion.div>
    </div>
  </section>
);

const SkillCircle = ({ name, percent, logo }: { name: string, percent: number, logo: string }) => (
  <div className="flex flex-col items-center group">
    <div className="circle-progress mb-3 sm:mb-6 relative group-hover:scale-105 transition-transform duration-500 w-[62px] h-[62px] sm:w-32 sm:h-32">
      <svg className="w-full h-full" viewBox="0 0 128 128">
        <circle className="bg" cx="64" cy="64" r="54" />
        <circle 
          className="fill" 
          cx="64" 
          cy="64" 
          r="54" 
          strokeDasharray={339.292}
          strokeDashoffset={339.292 - (339.292 * percent) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-3.5 sm:p-8">
        <img 
          src={logo} 
          alt={name} 
          className="w-full h-full object-contain filter lg:grayscale lg:group-hover:grayscale-0 transition-all duration-500" 
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <p className="text-[10px] sm:text-sm font-bold uppercase tracking-[1px] text-center text-white/40 group-hover:text-accent transition-colors">{name}</p>
  </div>
);

const TimelineItem = ({ year, title, subtitle, desc, logo }: { year: string, title: string, subtitle: string, desc: string, logo?: string }) => (
  <div className="flex gap-4 sm:gap-6 group relative">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center p-2 flex-shrink-0 shadow-lg group-hover:border-accent/40 transition-all duration-500 overflow-hidden">
        {logo ? (
          <img 
            src={logo} 
            alt={subtitle} 
            className="w-full h-full object-contain transition-all duration-500 transform group-hover:scale-110" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <Briefcase size={20} className="text-accent sm:w-6 sm:h-6" />
        )}
      </div>
      <div className="w-[2px] h-full bg-gradient-to-b from-white/10 to-transparent my-4"></div>
    </div>
    <div className="pb-8 sm:pb-12 pt-1 text-left">
      <span className="text-[9px] sm:text-[10px] bg-white/5 px-2 sm:px-3 py-1 rounded-full font-black text-white/40 uppercase tracking-[2px] mb-2 sm:mb-4 inline-block group-hover:text-accent/60 transition-colors">
        {year}
      </span>
      <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2 text-white leading-tight">
        {title} <span className="text-white/40 font-bold block text-[10px] sm:text-xs mt-1">— {subtitle}</span>
      </h4>
      <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-medium max-w-lg group-hover:text-white/70 transition-colors">
        {desc}
      </p>
    </div>
  </div>
);

const AboutContent = ({ theme }: { theme: string }) => {
  const stats = [
    { label: "Years experience", val: "6+" },
    { label: "Studios Worked With", val: "5" },
    { label: "Films & Episodic", val: "12+" },
    { label: "Commercial Projects", val: "25+" },
  ];

  return (
    <div className="pt-20 pb-8 lg:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="relative mb-6 lg:mb-16 text-left">
        <h2 className="section-title-bg opacity-5 hidden lg:block">Resume</h2>
        <h2 className="section-title text-left !py-4 lg:!py-10">About <span>Me</span></h2>
      </div>

      <div className="mb-12 lg:mb-24 flex flex-col items-start text-left">
        <div className="max-w-4xl w-full">
          <h3 className="text-xl lg:text-3xl font-black uppercase mb-6 lg:mb-12 relative inline-block whitespace-nowrap">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 sm:gap-y-8 text-[13px] sm:text-[15px] font-semibold text-left">
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[9px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">First Name:</span>
              <span className="text-white font-black truncate">Mahatav</span>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">Last Name:</span>
              <span className="text-white font-black truncate">Rastogi</span>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">Age:</span>
              <span className="text-white font-black truncate">28 Years</span>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">Nationality:</span>
              <span className="text-white font-black truncate">Indian</span>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">Mobile:</span>
              <span className="text-accent font-black truncate">+91 9621653604</span>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">Address:</span>
              <span className="text-white font-black truncate">Pune, Maharashtra, India</span>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-28 shrink-0">LinkedIn:</span>
              <a href="https://linkedin.com/in/mahatav-rastogi" target="_blank" rel="noreferrer" className="text-white font-black hover:text-accent transition-colors truncate">mahatav-rastogi</a>
            </div>
            <div className="flex flex-row items-center gap-3 border-b border-white/5 pb-2">
              <span className="text-white/40 uppercase text-[8px] sm:text-[10px] tracking-widest font-black w-20 sm:w-24 shrink-0">Email:</span>
              <a href="mailto:mahatavrastogi97@gmail.com" className="text-white font-black hover:text-accent transition-colors truncate">mahatavrastogi97@gmail.com</a>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <a 
              href="https://drive.google.com/file/d/15AEeKEP75brGswY5E5_eJMjZTjhiQaoe/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-8 px-10 py-4 border-[1px] border-accent rounded-full text-sm font-black uppercase tracking-[2px] hover:bg-accent hover:text-black transition-all"
            >
              Download CV 
              <span className="bg-accent p-3 rounded-full text-black group-hover:bg-white transition-colors">
                <Download size={18} />
              </span>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-white/5 mb-32" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
      <div className="mb-10 text-left lg:mb-16">
        <h3 className="text-2xl lg:text-3xl font-black uppercase relative inline-block">
          My Skills
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-x-1 sm:gap-10 gap-y-6 sm:gap-y-10">
        <SkillCircle name="Nuke" percent={95} logo="https://img.icons8.com/color/512/nuke.png" />
        <SkillCircle name="After Effects" percent={89} logo="https://img.icons8.com/color/512/adobe-after-effects--v1.png" />
        <SkillCircle name="Premiere Pro" percent={92} logo="https://img.icons8.com/color/512/adobe-premiere-pro--v1.png" />
        <SkillCircle name="Photoshop" percent={88} logo="https://img.icons8.com/color/512/adobe-photoshop--v1.png" />
        <SkillCircle name="Maya" percent={70} logo="https://img.icons8.com/color/512/autodesk-maya.png" />
        <SkillCircle name="3ds Max" percent={88} logo="https://img.icons8.com/color/512/autodesk-3ds-max.png" />
        <SkillCircle name="Houdini" percent={75} logo="https://lh3.googleusercontent.com/d/1gUVzU42ENlwl9aZU3-l7deFOj7gof4u6" />
        <SkillCircle name="CorelDraw" percent={85} logo="https://lh3.googleusercontent.com/d/1_YEbYQuUHgwxeXSy3daJg0zT81jiKpYn" />
      </div>
    </div>

    <div className="mt-12 lg:mt-0">
      <div className="mb-10 text-left lg:mb-16">
        <h3 className="text-2xl lg:text-3xl font-black uppercase relative inline-block whitespace-nowrap">
          My Stats
        </h3>
      </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-500 shadow-2xl relative overflow-hidden group ${theme === 'light' ? 'bg-[#f5f5f5]' : 'bg-[#111]'}`}>
                <div className="absolute -right-4 -bottom-4 w-12 sm:w-24 h-12 sm:h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all"></div>
                <h4 className="text-2xl sm:text-4xl font-black text-accent mb-1 sm:mb-2 relative z-10">{s.val}</h4>
                <p className="text-[8px] sm:text-[10px] uppercase font-black tracking-[1px] sm:tracking-[2px] leading-relaxed relative pl-4 sm:pl-8 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 sm:before:w-5 before:h-[2px] before:bg-accent/40 text-white/50 z-10 group-hover:text-white transition-colors">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-white/5 mb-32" />

      <div className="flex justify-start mb-8 sm:mb-20">
        <h3 className="text-2xl lg:text-3xl font-black uppercase relative inline-block whitespace-nowrap">
          Experience & Education
        </h3>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10">
        <div className="space-y-4 text-left">
          <h4 className="text-accent font-black uppercase tracking-[4px] text-xs mb-10 inline-block relative uppercase">
            Professional Experience
          </h4>
          <div className="text-left space-y-4">
            <TimelineItem 
              year="February 2026 - Present" 
              title="Mid CG/VFX Compositor" 
              subtitle="DNEG" 
              logo="https://lh3.googleusercontent.com/d/1HwyNi_tDnYqCzG65pY8-_A2wGr09v9u7"
              desc="Working as a Mid CG/VFX Compositor, responsible for end-to-end shot compositing, including CG integration, keying, paint/cleanup, and look development. Focused on maintaining visual consistency and delivering high-quality final shots." 
            />
            <TimelineItem 
              year="May 2023 - February 2026" 
              title="Mid CG/VFX Compositor" 
              subtitle="Envision VFX" 
              logo="https://lh3.googleusercontent.com/d/1oufP9lLaCst-fQmyJ_bFjgolP8RxyG02"
              desc="I have worked as a Mid VFX/CG Compositor on projects like Parasyte The Grey, Senna, City Hunter, and A.R.M. My responsibilities included integrating 3D renders with live footage, chroma keying, and enhancing visual elements for seamless final shots." 
            />
            <TimelineItem 
              year="October 2022 - May 2023" 
              title="Jr. CG/VFX Compositor" 
              subtitle="Moving Picture Company (MPC)" 
              logo="https://lh3.googleusercontent.com/d/1HvFlc8NI27l2kQz5kLAdTSRhu1M1fPaU"
              desc="I have worked as a Jr. VFX/CG Compositor on projects such as Prehistoric Planet Season 2, Silo, and The Wheel of Time Season 2. My primary responsibilities included integrating CG with live-action footage and adding 2D elements to enhance the final visuals and overall shot quality." 
            />
            <TimelineItem 
              year="May 2021 - September 2022" 
              title="CG Compositor" 
              subtitle="HMX media" 
              logo="https://lh3.googleusercontent.com/d/1JTQBZIRysBDIDiyNrdpB6m5D8erp_9QD"
              desc="I have worked as a CG Compositor on projects for clients such as Lenovo, Sony, HP, and Panasonic. My responsibilities included integrating and compositing 3D renders, enhancing visual quality, and ensuring a polished and cohesive final output for each project." 
            />
            <TimelineItem 
              year="March 2020 - May 2021" 
              title="Compositor" 
              subtitle="Mid Green VFX" 
              logo="https://lh3.googleusercontent.com/d/1NRyE6ZeDBYgfYafbKHd59BnWcUloktUg"
              desc="I worked as a Compositor on Advertisement projects, handling roto, keying, and compositing tasks. Additionally, I contributed to motion graphics projects, focusing on enhancing visual elements and ensuring seamless integration for a polished final output." 
            />
          </div>
        </div>
        <div className="space-y-4 text-left">
          <h4 className="text-accent font-black uppercase tracking-[4px] text-xs mb-10 inline-block relative uppercase">
            Education Background
          </h4>
          <div className="text-left space-y-4">
            <TimelineItem 
              year="2017 - 2020" 
              title="Maya Academy of Advanced Cinematics" 
              subtitle="Lucknow, Uttar Pradesh" 
              logo="https://lh3.googleusercontent.com/d/1Bc_6JJyKZkdQgfYdKzT2btKB2RYGzdng"
              desc="ADVFX (Advanced Program In 3D Animation & Visual Effects). Comprehensive training in industry-standard software including Nuke, After Effects, and Maya." 
            />
            <TimelineItem 
              year="2014 - 2017" 
              title="Shia P.G. College" 
              subtitle="Lucknow, Uttar Pradesh" 
              logo="https://lh3.googleusercontent.com/d/13t6Zz2viChBTrnsXjUD-VIozkHyscXV3"
              desc="Bachelor of Science. Focused on Computer Science and Mathematics, building a strong foundation in computational logic and analytical thinking." 
            />
            <TimelineItem 
              year="2012 - 2014" 
              title="Mahatma Gandhi Inter Collage" 
              subtitle="Lucknow, Uttar Pradesh" 
              logo="https://lh3.googleusercontent.com/d/1dRTIKEZocJcUgtVTe_BhQaVAIl6EEKcF"
              desc="Intermediate. Studied Physics, Chemistry, and Maths (PCM) with a focus on scientific principles and advanced calculus." 
            />
            <TimelineItem 
              year="2010 - 2012" 
              title="Mahatma Gandhi Inter Collage" 
              subtitle="Lucknow, Uttar Pradesh" 
              logo="https://lh3.googleusercontent.com/d/1dRTIKEZocJcUgtVTe_BhQaVAIl6EEKcF"
              desc="High School. Completed primary secondary education with distinction in mathematics and science subjects." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = ({ theme }: { theme: string }) => (
  <section id="about" className="min-h-screen">
    <AboutContent theme={theme} />
  </section>
);

const ShowreelSection = () => {
  const videos = [
    { id: "vbB5El825YU", title: "Mahatav Rastogi compositing showreel 2024-2025", type: "Featured" },
    { id: "z0qVVCEzc1E", title: "Mahatav Rastogi compositing showreel 2023", type: "Breakdown" },
    { id: "b8kKIT6GPG0", title: "Mahatav Rastogi compositing showreel", type: "Cinematic" },
    { id: "4HQuGiCJq-g", title: "My work as compositor at HMX Media (2021-2022)", type: "Breakdown" },
    { id: "Jg3FCciIodw", title: "Coffee Addvertisement", type: "Technical" },
    { id: "0OMkbtm8rdk", title: "Composting showreel 2021", type: "Creative" },
    { id: "v5HgOe_GTt4", title: "FX showreel 2021", type: "Career" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section id="showreel" className="py-8 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden">
      <div className="relative mb-6 lg:mb-20 text-left">
        <h2 className="section-title-bg hidden sm:block uppercase opacity-5">Showreel</h2>
        <h2 className="section-title text-left !py-4 lg:!py-10">My <span>Showreel</span></h2>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 lg:gap-10 items-start mt-4 lg:mt-0 relative">
        {/* Main Player Display */}
        <div className="lg:col-span-3 space-y-4 lg:space-y-6 w-full max-w-[85vw] sm:max-w-2xl lg:max-w-none mx-auto relative group">
          {/* Animated Background decorative element for mobile */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[80px] lg:hidden animate-pulse pointer-events-none"></div>
          
          <div className="relative aspect-video bg-black rounded-xl lg:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 z-10 transition-all duration-500">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=0&controls=1&rel=0&modestbranding=1`} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen 
                  title={videos[currentIndex].title}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Enhanced Title/Status for All Views */}
          <div className="relative z-20 flex flex-col items-center lg:items-start px-4 lg:px-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[3px] text-accent">Playing Now</span>
            </div>
            <h3 className="text-sm sm:text-base lg:text-3xl font-black uppercase tracking-tight leading-snug text-center lg:text-left line-clamp-1 lg:line-clamp-2">
              {videos[currentIndex].title}
            </h3>
          </div>
        </div>

        {/* Thumbnail Carousel for Mobile/Tablet & Sidebar for Desktop */}
        <div className="lg:col-span-1 relative mt-6 lg:mt-0 z-20 mx-auto w-full max-w-[95vw] lg:max-w-none">
          <div className="relative flex items-center group/nav">
            <div 
              className="flex lg:flex-col gap-2 sm:gap-4 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden pb-4 lg:pb-0 scrollbar-hide h-full lg:max-h-[500px] px-8 lg:px-2 justify-start lg:justify-start" 
              id="thumbnail-strip"
            >
              {videos.map((vid, i) => (
                <button
                  key={vid.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`flex-shrink-0 transition-all duration-300 text-left relative ${
                    currentIndex === i 
                    ? "scale-105 lg:scale-[0.98] z-20 border-accent bg-accent/5 shadow-lg shadow-accent/5" 
                    : "opacity-40 hover:opacity-100 scale-95 lg:scale-100 border-white/5 bg-white/5"
                  } ${
                    "w-[85px] sm:w-[120px] lg:w-full p-1.5 lg:p-3 rounded-lg lg:rounded-2xl border transition-all"
                  }`}
                >
                  <div className="relative aspect-video lg:w-20 lg:h-12 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden bg-black/40">
                    <img 
                      src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`} 
                      alt={vid.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${currentIndex === i ? 'grayscale-0' : 'grayscale'}`}
                    />
                  </div>
                  <div className="mt-1.5 lg:mt-0 lg:ml-3 min-w-0">
                    <p className="text-[8px] sm:text-[10px] font-extrabold uppercase leading-tight line-clamp-1 lg:line-clamp-2">{vid.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Minimal Indicators with Integrated Navigation for Mobile/Tablet */}
          <div className="flex lg:hidden justify-center items-center gap-4 mt-4">
            <button 
              onClick={() => {
                const newIndex = (currentIndex - 1 + videos.length) % videos.length;
                setCurrentIndex(newIndex);
                document.getElementById('thumbnail-strip')?.scrollBy({ left: -100, behavior: 'smooth' });
              }}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-accent flex items-center justify-center shadow-lg active:scale-95 transition-all"
              aria-label="Previous video"
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </button>

            <div className="flex gap-1.5">
              {videos.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full transition-all duration-500 ${currentIndex === i ? "bg-accent w-3" : "bg-white/10"}`}
                />
              ))}
            </div>

            <button 
              onClick={() => {
                const newIndex = (currentIndex + 1) % videos.length;
                setCurrentIndex(newIndex);
                document.getElementById('thumbnail-strip')?.scrollBy({ left: 100, behavior: 'smooth' });
              }}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-accent flex items-center justify-center shadow-lg active:scale-95 transition-all"
              aria-label="Next video"
            >
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const categories = ["All", "Commercial", "Episodic (OTT)", "Movie"];
  const [activeTab, setActiveTab] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const projects = [
    { 
      title: "Legion 7 Series (Intel)", 
      category: "Commercial", 
      youtubeId: "NV8D9bAEyuw",
      featured: true
    },
    { 
      title: "Citadel Haney Bunny", 
      category: "Episodic (OTT)", 
      youtubeId: "ZQuuw18Yicw",
      featured: true
    },
    { 
      title: "One Hundred Years of Solitude", 
      category: "Episodic (OTT)", 
      youtubeId: "4oQeQR1DEjw",
      featured: true
    },
    { 
      title: "Lenovo IdeaPad Gaming 3i (15'', 7)", 
      category: "Commercial", 
      youtubeId: "sL6lG-fDwWc" 
    },
    { 
      title: "Panasonic 2022 LZ2000 4K OLED TV", 
      category: "Commercial", 
      youtubeId: "qAIuZpp1cjk" 
    },
    { 
      title: "Razer x Lambda Tensorbook", 
      category: "Commercial", 
      youtubeId: "FmtB5-ZMRH0" 
    },
    { 
      title: "The Wheel Of Time", 
      category: "Episodic (OTT)", 
      youtubeId: "-VA4Vi6TYLg" 
    },
    { 
      title: "Parasyte The Gray", 
      category: "Episodic (OTT)", 
      youtubeId: "maIGHqJB6aQ" 
    },
    { 
      title: "Prehistoric Planet 2", 
      category: "Episodic (OTT)", 
      youtubeId: "xWlmzl2jCNs" 
    },
    { 
      title: "Kantara", 
      category: "Movie", 
      youtubeId: "M2OnifMgvps" 
    },
    { 
      title: "ARM", 
      category: "Movie", 
      youtubeId: "nMLZUQrdV8g" 
    },
    { 
      title: "Senna", 
      category: "Episodic (OTT)", 
      youtubeId: "_jMIULxyT4w" 
    },
    { 
      title: "Silo", 
      category: "Episodic (OTT)", 
      youtubeId: "8ZYhuvIv1pA" 
    },
    { 
      title: "City hunter", 
      category: "Movie", 
      youtubeId: "G20m5NTAVAE" 
    },
    { 
      title: "Dhurandhar", 
      category: "Movie", 
      youtubeId: "BKOVzHcjEIo" 
    },
    { 
      title: "Dust-bunny", 
      category: "Movie", 
      youtubeId: "lQqmOjPDlWg" 
    },
    { 
      title: "sony HT-A5000 soundbar", 
      category: "Commercial", 
      youtubeId: "DM8Ugsr14ew" 
    },
    { 
      title: "Sony Noise Cancelling Headphones WF-1000XM4", 
      category: "Commercial", 
      youtubeId: "cC3KIlN4AsE" 
    },
    { 
      title: "ThinkCentre Neo Series (2022) Sizzle", 
      category: "Commercial", 
      youtubeId: "L9r3e1ffZxY" 
    },
    { 
      title: "Yoga Slim - The Power to Just Be You", 
      category: "Commercial", 
      youtubeId: "PoNMvmkYX4Q" 
    },
    { 
      title: "Yoga Slim 7i Pro X (2022)", 
      category: "Commercial", 
      youtubeId: "U3KhuOAdlEY" 
    },
    { 
      title: "Lenovo Legion H600 S600",
      category: "Commercial",
      youtubeId: "NUokc2Aw3_k"
    }
  ];

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      <div className="relative mb-6 sm:mb-12 text-left">
        <h2 className="section-title-bg hidden sm:block uppercase opacity-5">Works</h2>
        <h2 className="section-title text-left !py-4 lg:!py-10">My <span>Portfolio</span></h2>
      </div>

      {/* Modern Filter Tabs */}
      <div className="flex overflow-x-auto justify-center mb-6 sm:mb-12 scrollbar-hide px-2">
        <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl shrink-0 mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-3 sm:px-8 py-2 sm:py-3 rounded-full text-[9px] sm:text-[11px] font-black uppercase tracking-tight sm:tracking-[1.5px] transition-all ${
                activeTab === cat 
                ? "bg-accent text-black shadow-xl" 
                : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[280px] sm:auto-rows-[320px] grid-flow-dense"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelectedVideo(project.youtubeId)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer ${
                project.featured ? "sm:row-span-2 lg:col-span-2" : ""
              }`}
            >
              <img 
                src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1 opacity-80 group-hover:opacity-100" 
                alt={project.title}
                referrerPolicy="no-referrer"
              />
              
              {/* VFX Scan Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,180,0,0.1)_50%,transparent_100%)] h-[20%] w-full top-[-20%] animate-scan"></div>
              </div>

              {/* Glassmorphism Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-[2px]">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <h4 className="text-xl sm:text-3xl font-black uppercase text-accent mb-2 sm:mb-4 leading-tight tracking-tighter">{project.title}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] sm:text-[11px] text-white/50 uppercase font-bold tracking-[2px]">{project.category}</p>
                      <div className="flex items-center gap-2 text-accent text-[9px] sm:text-[11px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                        {project.category === 'Commercial' ? 'Product Tour' : 'Trailer'} <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 border-t-2 border-r-2 border-accent/50 rounded-tr-lg"></div>
              </div>
              <div className="absolute bottom-6 left-6 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 border-b-2 border-l-2 border-accent/50 rounded-bl-lg"></div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/40">
                  <Play size={32} fill="black" className="ml-1 text-black" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,180,0,0.1)]"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-accent text-white hover:text-black rounded-full flex items-center justify-center transition-all backdrop-blur-md"
              >
                <X size={24} />
              </button>
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-24 text-center">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.imdb.com/name/nm14881801/" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-3 sm:gap-8 px-8 sm:px-12 py-4 sm:py-6 bg-white text-black font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] rounded-full hover:bg-accent transition-all shadow-2xl text-[10px] sm:text-sm"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" className="w-8 sm:w-12 h-auto shrink-0" alt="IMDb" />
          <span className="whitespace-nowrap">Explore Full Credits</span> <ExternalLink size={16} className="sm:w-5 sm:h-5" />
        </motion.a>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/mahatavrastogi97@gmail.com", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok && result.success === "true") {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="relative mb-8 lg:mb-16 text-left">
        <h2 className="section-title-bg opacity-5 hidden lg:block">Contact</h2>
        <h2 className="section-title text-left !py-4 lg:!py-10">Get In <span>Touch</span></h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1 text-left">
          <h3 className="text-2xl font-black uppercase mb-6 text-white text-left">Don't be shy !</h3>
          <p className="text-white/60 mb-8 leading-relaxed text-left">
            Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <Mail className="text-accent" size={32} />
              <div className="text-left">
                <p className="text-xs uppercase font-bold text-white/40 tracking-[2px]">Mail Me</p>
                <p className="font-bold text-white">mahatavrastogi97@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Phone className="text-accent" size={32} />
              <div className="text-left">
                <p className="text-xs uppercase font-bold text-white/40 tracking-[2px]">Phone Me</p>
                <p className="font-bold text-white">+91 9621653604</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12 justify-start">
            {[
              { Icon: Linkedin, href: "https://in.linkedin.com/in/mahatav-rastogi" },
              { Icon: Instagram, href: "https://www.instagram.com/mahatavrastogi/" },
              { Icon: Youtube, href: "https://www.youtube.com/@mahatavrastogi9141" }
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <form className="grid md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
            <input 
              name="name"
              required
              className="bg-surface border-none rounded-full px-8 py-4 outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-semibold text-white" 
              placeholder="YOUR NAME" 
            />
            <input 
              name="email"
              type="email"
              required
              className="bg-surface border-none rounded-full px-8 py-4 outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-semibold text-white" 
              placeholder="YOUR EMAIL" 
            />
            <input 
              name="subject"
              required
              className="bg-surface border-none rounded-full px-8 py-4 outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-semibold text-white md:col-span-2" 
              placeholder="YOUR SUBJECT" 
            />
            <textarea 
              name="message"
              required
              className="bg-surface border-none rounded-[30px] px-8 py-6 outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-semibold text-white md:col-span-2 h-40 resize-none" 
              placeholder="YOUR MESSAGE"
            ></textarea>
            
            <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6">
              <button 
                type="submit"
                disabled={status === "loading"}
                className="group relative inline-flex items-center gap-6 px-10 py-5 border-[2px] border-accent rounded-full text-sm font-black uppercase tracking-[2px] overflow-hidden transition-all duration-300 w-fit disabled:opacity-50"
              >
                <span className="relative z-10">
                  {status === "loading" ? "Sending..." : "Send Message"}
                </span>
                <span className="relative z-10 bg-accent p-3 rounded-full text-black group-hover:translate-x-2 transition-transform duration-300">
                  <Mail size={18} fill="black" />
                </span>
                <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 -z-0" />
              </button>

              {status === "success" && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-accent font-bold uppercase tracking-widest text-xs"
                >
                  Message sent successfully!
                </motion.p>
              )}

              {status === "error" && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 font-bold uppercase tracking-widest text-xs"
                >
                  Failed to send. Please try again.
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'showreel', 'portfolio', 'contact'];
      let current = 'home';
      
      // Calculate which section is most visible in the top third of the viewport
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.4; // 40% threshold

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section has reached the threshold, or if it's the last section and we're at the bottom
          if (rect.top <= threshold) {
            current = id;
          }
        }
      }

      // Special case: if we are at the very top, always home
      if (window.scrollY < 50) {
        current = 'home';
      }
      
      if (activeSection !== current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className={`selection:bg-accent selection:text-black min-h-screen transition-colors duration-500 overflow-x-hidden pt-0 ${theme === 'light' ? 'bg-white' : 'bg-[#111111]'}`}>
      <CustomCursor />
      
      {/* Mobile Navigation - Top pill */}
      <div className={`lg:hidden fixed left-1/2 -translate-x-1/2 top-6 z-[1100] w-fit px-2 py-1.5 rounded-full backdrop-blur-xl border flex items-center gap-1 shadow-2xl transition-all duration-500 ${theme === 'light' ? 'bg-white/90 border-black/10' : 'bg-black/90 border-white/10'}`}>
        <nav className="flex items-center gap-1">
          {SECTIONS.map((s) => (
            <button 
              key={s.id}
              onClick={() => {
                const el = document.getElementById(s.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(s.id);
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${activeSection === s.id ? "bg-accent text-black shadow-lg" : theme === 'light' ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white"}`}
              aria-label={s.name}
            >
              <span className="scale-75 sm:scale-90">{s.icon}</span>
            </button>
          ))}
        </nav>
        <div className={`w-[1px] h-5 sm:h-6 mx-1 ${theme === 'light' ? 'bg-black/10' : 'bg-white/10'}`}></div>
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${theme === 'light' ? "bg-black/5 text-black hover:bg-accent hover:text-white" : "bg-white/10 text-white hover:bg-accent hover:text-black"}`}
          aria-label="Toggle theme"
        >
          <span className="scale-75 sm:scale-90">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</span>
        </button>
      </div>

      {/* Desktop Navigation - Side vertical */}
      <nav className="hidden lg:flex fixed right-10 top-1/2 -translate-y-1/2 z-[100] flex-col gap-6 items-end">
        {SECTIONS.map((s) => (
          <button 
            key={s.id} 
            onClick={() => {
              const el = document.getElementById(s.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(s.id);
            }}
            className={`nav-bullet ${activeSection === s.id ? "active" : ""}`}
            aria-label={s.name}
          >
            <span className="nav-label">{s.name}</span>
            <span className="nav-icon">{s.icon}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Theme Toggle */}
      <div className="hidden lg:block fixed top-10 right-10 z-[1100]">
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>


      {/* About Modal */}
      <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)}>
        <AboutContent theme={theme} />
      </Modal>

      {/* Main Content */}
      <main>
        <HomeSection onOpenAbout={() => setIsAboutOpen(true)} theme={theme} />
        <AboutSection theme={theme} />
        <ShowreelSection />
        <PortfolioSection />
        <ContactSection />
      </main>

      <footer className={`fixed bottom-6 left-6 text-[10px] uppercase tracking-[3px] font-black z-50 pointer-events-none md:block hidden ${theme === 'light' ? 'text-black/20' : 'text-white/20'}`}>
        Mahatav Rastogi © 2026
      </footer>
    </div>
  );
}
