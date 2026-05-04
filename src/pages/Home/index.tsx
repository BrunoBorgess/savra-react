import { useEffect, useRef, useState } from "react";
import { ReactTyped } from "react-typed";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CreditCardIcon,
  ArrowsPointingOutIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import emailjs from "@emailjs/browser";

/* ─── Paleta ─── */
const C = {
  red: "#e8192c",
  redDark: "#b01020",
  redGlow: "rgba(232,25,44,0.35)",
  bg: "#0a0a0b",
  bgCard: "#111114",
  bgCard2: "#16161a",
  border: "rgba(255,255,255,0.06)",
  muted: "#5a5a6a",
  text: "#f0f0f2",
  textSub: "#9898a8",
};

/* ─── Variantes ─── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

/* ─── Cursor personalizado ─── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dot.current) { dot.current.style.left = x + "px"; dot.current.style.top = y + "px"; }
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
    };
    const frame = () => { requestAnimationFrame(frame); };
    window.addEventListener("mousemove", move);
    frame();
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: C.red, position: "fixed", top: 0, left: 0 }} />
      <div ref={ring} className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border" style={{ borderColor: C.red, opacity: 0.4, position: "fixed", top: 0, left: 0 }} />
    </>
  );
}

/* ─── Partículas ─── */
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: C.red, opacity: 0.25 }}
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Linha decorativa animada ─── */
function RedLine({ className = "" }: { className?: string }) {
  return (
    <motion.div className={`h-px ${className}`}
      style={{ background: `linear-gradient(90deg, transparent, ${C.red}, transparent)` }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    />
  );
}

/* ─── Número animado ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const sliderSettings = {
    dots: true, infinite: true, speed: 700, slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 4000, pauseOnHover: true, arrows: false, fade: true,
  };

  const services = [
    { title: "Sistemas Web", subtitle: "Alta performance", desc: "Plataformas web com React, Node.js e APIs robustas para escalar com segurança.", icon: <CodeBracketIcon className="w-6 h-6" />, image: "/img1.jpg" },
    { title: "Landing Pages", subtitle: "Conversão máxima", desc: "Páginas responsivas, rápidas e otimizadas para SEO que vendem por você.", icon: <ArrowsPointingOutIcon className="w-6 h-6" />, image: "/img2.png" },
    { title: "Apps Mobile", subtitle: "Engajamento total", desc: "Apps Android com UX intuitiva, notificações push e integração com APIs.", icon: <DevicePhoneMobileIcon className="w-6 h-6" />, image: "/img3.jpg" },
    { title: "Automações", subtitle: "Zero retrabalho", desc: "Automatize processos com Zapier, Python e IA para ganhar horas todo dia.", icon: <ArrowsPointingOutIcon className="w-6 h-6" />, image: "/img4.jpg" },
    { title: "Dashboards", subtitle: "Decisões em tempo real", desc: "Painéis visuais conectados aos seus dados para você enxergar o negócio inteiro.", icon: <ChartBarIcon className="w-6 h-6" />, image: "/img5.png" },
    { title: "QA & Analytics", subtitle: "Qualidade garantida", desc: "Testes automatizados, análise de dados e relatórios para garantir que tudo funciona.", icon: <MagnifyingGlassIcon className="w-6 h-6" />, image: "/img5.png" },
    { title: "Marketing Digital", subtitle: "Agência completa", desc: "Gestão de redes sociais, tráfego pago e estratégias de crescimento para empresas.", icon: <MegaphoneIcon className="w-6 h-6" />, image: "/img6.jpg" },
    { title: "Pagamentos", subtitle: "Transações seguras", desc: "Integrações com Stripe, PayPal e Pix para e-commerce e assinaturas.", icon: <CreditCardIcon className="w-6 h-6" />, image: "/img7.png" },
    { title: "Gestão de Tráfego", subtitle: "Alcance preciso", desc: "Campanhas no Google Ads e Meta Ads com foco total em conversão e ROI.", icon: <UsersIcon className="w-6 h-6" />, image: "/img6.jpg" },
  ];

  const stats = [
    { value: 200, suffix: "+", label: "Projetos entregues", icon: <BriefcaseIcon className="w-5 h-5" /> },
    { value: 100, suffix: "+", label: "Clientes ativos", icon: <UsersIcon className="w-5 h-5" /> },
    { value: 99, suffix: "%", label: "Satisfação", icon: <StarIcon className="w-5 h-5" /> },
    { value: 5, suffix: " anos", label: "No mercado", icon: <StarIcon className="w-5 h-5" /> },
  ];

  const testimonials = [
    { name: "João Silva", role: "CEO, TechBR", quote: "A Savra entregou um sistema completo em metade do tempo que eu esperava. Qualidade absurda." },
    { name: "Maria Oliveira", role: "Head de Marketing", quote: "As campanhas deles aumentaram nossas conversões em 200% no primeiro mês. Impressionante." },
    { name: "Pedro Santos", role: "CTO", quote: "O QA deles pegou bugs que nossa equipe interna não viu. Salvaram nosso lançamento." },
    { name: "Ana Costa", role: "Diretora de Ops", quote: "As automações economizaram 30 horas semanais da nossa equipe. ROI imediato." },
  ];

  useEffect(() => {
    const handleScroll: EventListener = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute("href");
      if (!id) return;
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener("click", handleScroll));
    return () => anchors.forEach(a => a.removeEventListener("click", handleScroll));
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const validate = () => {
    const errors = { name: "", email: "", message: "" };
    let ok = true;
    if (formData.name.trim().length < 2) { errors.name = "Nome inválido."; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { errors.email = "E-mail inválido."; ok = false; }
    if (formData.message.trim().length < 10) { errors.message = "Mensagem muito curta."; ok = false; }
    setFormErrors(errors);
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("");
    setIsSending(true);
    if (!validate()) { setFormStatus("Erro: corrija os campos."); setIsSending(false); return; }
    try {
      const r = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { from_name: formData.name, from_email: formData.email, message: formData.message }, "YOUR_PUBLIC_KEY");
      if (r.text === "OK") { setFormStatus("Enviado com sucesso!"); setFormData({ name: "", email: "", message: "" }); }
      else setFormStatus("Erro ao enviar.");
    } catch { setFormStatus("Erro ao enviar."); }
    finally { setIsSending(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    setFormErrors(p => ({ ...p, [name]: "" }));
    setFormStatus("");
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: C.bg, color: C.text, fontFamily: "'Outfit', 'DM Sans', sans-serif", cursor: "none" }}>
      <Cursor />

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { cursor: none !important; }
        .slick-dots li button:before { color: ${C.red} !important; }
        .slick-dots li.slick-active button:before { color: ${C.red} !important; }
        ::selection { background: ${C.red}; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}; border-radius: 4px; }
        .service-card:hover .service-icon { transform: scale(1.15) rotate(-6deg); }
        .service-icon { transition: transform 0.3s ease; }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(10,10,11,0.8)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.border}` }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-5">
          {/* Logo texto */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: C.red, boxShadow: `0 0 8px ${C.red}` }} />
            <span className="text-2xl font-black tracking-tight" style={{ letterSpacing: "-0.04em" }}>
              SAV<span style={{ color: C.red }}>RA</span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {[["#home","Home"],["#services","Serviços"],["#about","Sobre"],["#contact","Contato"]].map(([href, label]) => (
              <a key={href} href={href} className="text-sm font-medium transition-all duration-200 relative group"
                style={{ color: C.textSub }}
                onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textSub)}
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: C.red }} />
              </a>
            ))}
          </div>

          <a href="https://wa.me/5517997117187" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ background: C.red, color: "#fff", boxShadow: `0 0 20px ${C.redGlow}` }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 35px ${C.redGlow}`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${C.redGlow}`; }}
          >
            <FaWhatsapp className="w-4 h-4" /> Falar agora
          </a>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        <Particles />

        {/* Grid de fundo */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />

        {/* Glow central */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${C.redGlow} 0%, transparent 70%)`,
        }} />

        <motion.style variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
            style={{ background: "rgba(232,25,44,0.1)", color: C.red, border: `1px solid rgba(232,25,44,0.3)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.red }} />
            Agência de tecnologia & marketing
          </motion.div>
        </motion.style>

        <motion.div
          initial="hidden" animate="show" variants={stagger}
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.h1 variants={fadeUp}
            className="text-6xl md:text-[7rem] font-black leading-none mb-2"
            style={{ letterSpacing: "-0.05em" }}
          >
            SAV<span style={{ color: C.red, textShadow: `0 0 60px ${C.redGlow}` }}>RA</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="text-2xl md:text-4xl font-light mb-6" style={{ color: C.textSub }}>
            <ReactTyped
              strings={["Sistemas que escalam.", "Marketing que converte.", "QA que protege.", "Automações que liberam.", "Resultados que impressionam."]}
              typeSpeed={40} backSpeed={20} loop
              style={{ color: C.text, fontWeight: 300 }}
            />
          </motion.div>

          <motion.p variants={fadeUp} className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: C.textSub }}>
            Desenvolvemos sistemas web, apps, automações, dashboards, QA analytics e gerenciamos sua presença digital com estratégia e resultado.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact"
              className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
              style={{ background: C.red, color: "#fff", boxShadow: `0 8px 32px ${C.redGlow}`, letterSpacing: "0.1em" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 40px ${C.redGlow}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${C.redGlow}`; }}
            >
              Começar projeto
            </a>
            <a href="#services"
              className="px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
              style={{ border: `1px solid ${C.border}`, color: C.text, letterSpacing: "0.1em" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.red; (e.currentTarget as HTMLElement).style.color = C.red; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.text; }}
            >
              Ver soluções
            </a>
          </motion.div>
        </motion.div>

        {/* Stats na base do hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 md:gap-20"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-black" style={{ color: C.red, letterSpacing: "-0.03em" }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[11px] uppercase tracking-widest" style={{ color: C.muted }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <RedLine className="mx-10" />

      {/* ── SERVICES ── */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-20">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: C.red }}>
              O que entregamos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black" style={{ letterSpacing: "-0.04em" }}>
              Soluções completas<br />
              <span style={{ color: C.red }}>para seu negócio.</span>
            </motion.h2>
          </motion.div>

          {/* Grid de serviços */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {services.map((s, i) => (
              <motion.div key={i}
                className="service-card p-7 rounded-2xl relative overflow-hidden group"
                style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ borderColor: C.red, y: -6 }}
              >
                {/* Glow no hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse 60% 60% at 0% 100%, rgba(232,25,44,0.08) 0%, transparent 70%)` }}
                />

                <div className="service-icon w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(232,25,44,0.1)", color: C.red }}
                >
                  {s.icon}
                </div>

                <h3 className="text-base font-bold mb-1" style={{ color: C.text }}>{s.title}</h3>
                <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: C.red }}>{s.subtitle}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.textSub }}>{s.desc}</p>

                <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${C.red}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* Carrossel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: `0 0 80px rgba(0,0,0,0.6), 0 0 1px ${C.red}` }}
          >
            <Slider {...sliderSettings}>
              {services.filter(s => s.image).map((s, i) => (
                <div key={i} className="relative outline-none">
                  <img src={s.image} alt={s.title} className="w-full h-[500px] object-cover" style={{ filter: "brightness(0.35) saturate(0.6)" }} />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-14"
                    style={{ background: "linear-gradient(to top, rgba(10,10,11,0.95) 0%, transparent 55%)" }}
                  >
                    <div className="w-px h-16 mb-6" style={{ background: C.red }} />
                    <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: C.red }}>{s.subtitle}</p>
                    <h3 className="text-4xl md:text-5xl font-black mb-3" style={{ letterSpacing: "-0.03em" }}>{s.title}</h3>
                    <p className="text-sm max-w-lg leading-relaxed" style={{ color: C.textSub }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      <RedLine className="mx-10" />

      {/* ── SOBRE ── */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: C.red }}>
              Quem somos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-8" style={{ letterSpacing: "-0.04em" }}>
              Tecnologia.<br />
              <span style={{ color: C.red }}>Marketing.</span><br />
              Resultado.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed mb-4" style={{ color: C.textSub }}>
              A Savra é uma empresa full-stack de tecnologia e marketing digital. Desenvolvemos sistemas, automatizamos processos, garantimos qualidade com QA analytics e gerenciamos a presença digital de empresas que querem crescer de verdade.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base leading-relaxed mb-10" style={{ color: C.textSub }}>
              Nossa equipe combina desenvolvimento técnico com visão de negócio — entregamos solução, não só código.
            </motion.p>
            <motion.a variants={fadeUp} href="#contact"
              className="inline-flex px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
              style={{ background: C.red, color: "#fff", boxShadow: `0 6px 24px ${C.redGlow}`, letterSpacing: "0.1em" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Fale com a gente
            </motion.a>
          </motion.div>

          {/* Diferenciais */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "01", title: "Entrega rápida", desc: "Prazos reais, sem enrolação. Metodologia ágil do início ao fim." },
              { num: "02", title: "QA profissional", desc: "Testamos tudo antes de entregar. Zero surpresa em produção." },
              { num: "03", title: "Marketing integrado", desc: "Dev + marketing na mesma empresa. Estratégia e execução juntos." },
              { num: "04", title: "Suporte real", desc: "Pós-entrega com acompanhamento ativo, não só ticket no sistema." },
            ].map((d, i) => (
              <motion.div key={i}
                className="p-6 rounded-2xl"
                style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: C.red, y: -4 }}
              >
                <span className="text-4xl font-black block mb-3" style={{ color: "rgba(232,25,44,0.15)", letterSpacing: "-0.04em" }}>{d.num}</span>
                <h4 className="text-sm font-bold mb-2" style={{ color: C.text }}>{d.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: C.textSub }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RedLine className="mx-10" />

      {/* ── DEPOIMENTOS ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: C.red }}>
              Clientes
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black" style={{ letterSpacing: "-0.04em" }}>
              Quem confia na Savra.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                className="p-8 rounded-2xl relative overflow-hidden group"
                style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: C.red, y: -4 }}
              >
                <div className="text-5xl font-black mb-4 leading-none" style={{ color: C.red, opacity: 0.25 }}>"</div>
                <p className="text-base leading-relaxed mb-6" style={{ color: C.text }}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                    style={{ background: C.red, boxShadow: `0 0 16px ${C.redGlow}` }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.text }}>{t.name}</p>
                    <p className="text-xs" style={{ color: C.muted }}>{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-3.5 h-3.5" style={{ color: "#f59e0b" }} />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RedLine className="mx-10" />

      {/* ── CONTATO ── */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: C.red }}>
              Vamos começar
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-4" style={{ letterSpacing: "-0.04em" }}>
              Seu próximo projeto<br />
              <span style={{ color: C.red }}>começa aqui.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base max-w-lg mx-auto" style={{ color: C.textSub }}>
              Descreva seu desafio. Nossa equipe entra em contato em até 2 horas nos dias úteis.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Info */}
            <motion.div initial="hidden" whileInView="show" variants={stagger} viewport={{ once: true }} className="flex flex-col gap-8">
              {[
                { icon: <FaWhatsapp className="w-5 h-5" />, label: "WhatsApp", value: "+55 17 99711-7187", href: "https://wa.me/5517997117187" },
                { icon: <FaInstagram className="w-5 h-5" />, label: "Instagram", value: "@savra.tech", href: "https://instagram.com" },
              ].map((c, i) => (
                <motion.a key={i} variants={fadeUp} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: "rgba(232,25,44,0.1)", color: C.red, border: `1px solid rgba(232,25,44,0.2)` }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: C.muted }}>{c.label}</p>
                    <p className="text-sm font-bold" style={{ color: C.text }}>{c.value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div variants={fadeUp} className="p-6 rounded-2xl mt-4"
                style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
              >
                <div className="w-2 h-2 rounded-full mb-4 animate-pulse" style={{ background: C.red }} />
                <p className="text-sm font-bold mb-1" style={{ color: C.text }}>Resposta garantida</p>
                <p className="text-sm" style={{ color: C.textSub }}>
                  Respondemos em até <span style={{ color: C.red, fontWeight: 700 }}>2 horas</span> nos dias úteis. Projetos urgentes têm atendimento prioritário.
                </p>
              </motion.div>
            </motion.div>

            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl"
              style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { type: "text", name: "name", placeholder: "Seu nome", value: formData.name, error: formErrors.name },
                  { type: "email", name: "email", placeholder: "Seu e-mail", value: formData.email, error: formErrors.email },
                ].map(f => (
                  <div key={f.name}>
                    <input type={f.type} name={f.name} value={f.value} onChange={handleChange}
                      placeholder={f.placeholder} disabled={isSending}
                      className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}
                      onFocus={e => (e.target.style.borderColor = C.red)}
                      onBlur={e => (e.target.style.borderColor = C.border)}
                    />
                    {f.error && <p className="text-xs mt-1 ml-1" style={{ color: C.red }}>{f.error}</p>}
                  </div>
                ))}
                <div>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    placeholder="Descreva seu projeto..." disabled={isSending}
                    className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200 resize-none h-36"
                    style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}
                    onFocus={e => (e.target.style.borderColor = C.red)}
                    onBlur={e => (e.target.style.borderColor = C.border)}
                  />
                  {formErrors.message && <p className="text-xs mt-1 ml-1" style={{ color: C.red }}>{formErrors.message}</p>}
                </div>
                <button type="submit" disabled={isSending}
                  className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-40"
                  style={{ background: C.red, color: "#fff", boxShadow: `0 4px 20px ${C.redGlow}`, letterSpacing: "0.1em" }}
                  onMouseEnter={e => { (e.currentTarget.style.transform = "translateY(-1px)"); (e.currentTarget.style.boxShadow = `0 8px 30px ${C.redGlow}`); }}
                  onMouseLeave={e => { (e.currentTarget.style.transform = "translateY(0)"); (e.currentTarget.style.boxShadow = `0 4px 20px ${C.redGlow}`); }}
                >
                  {isSending ? "Enviando..." : "Enviar mensagem"}
                </button>
                <AnimatePresence>
                  {formStatus && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-sm text-center font-medium"
                      style={{ color: formStatus.includes("Erro") || formStatus.includes("corrija") ? C.red : "#22c55e" }}
                    >
                      {formStatus}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-8" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xl font-black tracking-tight" style={{ letterSpacing: "-0.04em" }}>
            SAV<span style={{ color: C.red }}>RA</span>
          </span>
          <p className="text-xs" style={{ color: C.muted }}>&copy; 2025 Savra. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" className="transition-all duration-200 hover:scale-110 hover:rotate-6">
              <FaInstagram className="w-5 h-5" style={{ color: C.muted }} />
            </a>
            <a href="https://wa.me/5517997117187" className="transition-all duration-200 hover:scale-110">
              <FaWhatsapp className="w-5 h-5" style={{ color: C.muted }} />
            </a>
            <a href="/privacy" className="text-xs transition-colors" style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >Privacidade</a>
            <a href="/terms" className="text-xs transition-colors" style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >Termos</a>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLUTUANTE ── */}
      <motion.a href="https://wa.me/5517997117187" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
        style={{ width: "3.5rem", height: "3.5rem", borderRadius: "9999px", background: "#25d366", boxShadow: "0 4px 24px rgba(37,211,102,0.45)" }}
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
      </motion.a>
    </div>
  );
}