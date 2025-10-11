import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { 
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CreditCardIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import logoSavra from "../../assets/logo-savra.png";
import backgroundTech from "../../assets/background-tech.jpg"; // Imagem azul com pontilhados
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import emailjs from "@emailjs/browser";


function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    cssEase: "linear",
  };

  const services = [
    {
      title: "Sistemas Web",
      subtitle: "Soluções escaláveis",
      description: "Plataformas web com React, Node.js e APIs para alta performance e segurança.",
      image: "/img1.jpg",
      icon: <CodeBracketIcon className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Landing Pages",
      subtitle: "Designs que convertem",
      description: "Páginas responsivas otimizadas para SEO e conversão.",
      image: "/img2.png",
      icon: <ArrowsPointingOutIcon className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Apps Mobile",
      subtitle: "Engajamento total",
      description: "Apps Android com interfaces intuitivas e notificações.",
      image: "/img3.jpg",
      icon: <DevicePhoneMobileIcon className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Automações",
      subtitle: "Eficiência máxima",
      description: "Automações com Zapier e Python para otimizar processos.",
      image: "/img4.jpg",
      icon: <ArrowsPointingOutIcon className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Dashboards",
      subtitle: "Insights em tempo real",
      description: "Dashboards web integrados ao seu sistema, com todos os seus dados em um só lugar.",
      image: "/img5.png",
      icon: <ChartBarIcon className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Gestão de Tráfego",
      subtitle: "Alcance preciso",
      description: "Campanhas com Google Ads e Meta Ads para conversões.",
      image: "/img6.jpg",
      icon: <UsersIcon className="w-12 h-12 text-blue-600" />,
    },
    {
      title: "Pagamentos",
      subtitle: "Transações seguras",
      description: "Integrações com Stripe, PayPal e Pix para e-commerce.",
      image: "/img7.png",
      icon: <CreditCardIcon className="w-12 h-12 text-blue-600" />,
    },
  ];

  useEffect(() => {
    const handleScroll: EventListener = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href");
      if (!targetId) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener("click", handleScroll));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener("click", handleScroll));
    };
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const errors = { name: "", email: "", message: "" };

    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "E-mail inválido.";
      isValid = false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = "Mensagem deve ter pelo menos 10 caracteres.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("");
    setIsSending(true);

    if (!validateForm()) {
      setFormStatus("Erro: Preencha os campos corretamente.");
      setIsSending(false);
      return;
    }

    try {
      const result = await emailjs.send(
        "YOUR_SERVICE_ID", // Substitua pelo seu serviceID do EmailJS
        "YOUR_TEMPLATE_ID", // Substitua pelo seu templateID do EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY" // Substitua pelo seu publicKey do EmailJS
      );

      if (result.text === "OK") {
        setFormStatus("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      setFormStatus("Erro ao enviar. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
    setFormStatus("");
  };

  return (
    <div 
      className="w-full min-h-screen text-white overflow-hidden relative font-thin"
      style={{
        backgroundImage: `url(${backgroundTech})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-950/65"></div>
      
      {/* Menu Flutuante */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 opacity-15 hover:opacity-100 backdrop-blur-3xl bg-gray-950/10 border-b border-gray-700/10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <motion.img
            src={logoSavra}
            alt="Savra Logo"
            className="w-24 md:w-32"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="flex space-x-8">
            <a href="#home" className="text-gray-300 text-lg font-medium hover:text-blue-600 transition-all duration-300 hover:scale-110">Home</a>
            <a href="#services" className="text-gray-300 text-lg font-medium hover:text-blue-600 transition-all duration-300 hover:scale-110">Serviços</a>
            <a href="#about" className="text-gray-300 text-lg font-medium hover:text-blue-600 transition-all duration-300 hover:scale-110">Sobre</a>
            <a href="#contact" className="text-gray-300 text-lg font-medium hover:text-blue-600 transition-all duration-300 hover:scale-110">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center px-4 py-24 relative z-10"
        id="home"
      >
        <motion.img
          src={logoSavra}
          alt="Savra Logo"
          className="w-64 md:w-80 mb-10 drop-shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-4">
            Soluções tecnológicas para
          </h2>
          <ReactTyped
            strings={[
              "impulsionar seu negócio",
              "otimizar processos",
              "maximizar resultados",
              "inovar com eficiência",
            ]}
            typeSpeed={30}
            backSpeed={30}
            loop
            className="text-5xl md:text-6xl text-blue-600 font-bold"
          />
        </div>
        <motion.a
          href="#contact"
          className="px-12 py-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white font-semibold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          whileHover={{ boxShadow: "0 0 20px rgba(37, 99, 235, 0.6)" }}
        >
          Agendar Reunião
        </motion.a>
      </motion.div>

      {/* Services Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-16 relative z-10"
        id="services"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-12 px-4">
          Nossas Soluções
        </h2>
        <div className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[450px] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 to-transparent flex flex-col items-center justify-center p-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {service.icon}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl md:text-4xl font-semibold text-white mt-4 mb-2"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl md:text-2xl text-blue-600 mb-4 font-medium"
                  >
                    {service.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-base md:text-lg text-gray-200 max-w-xl mb-6 text-center leading-relaxed"
                  >
                    {service.description}
                  </motion.p>
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Saiba Mais
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </motion.div>

      {/* Sobre a Savra */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10"
        id="about"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center">
          Sobre a Savra
        </h2>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto text-center">
          Somos uma empresa de tecnologia apaixonada por criar soluções inovadoras que transformam negócios com design e eficiência.
        </p>
      </motion.div>

      {/* Depoimentos */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center">
          Depoimentos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "João Silva, CEO", quote: "A Savra revolucionou nossas vendas com uma plataforma web sob medida." },
            { name: "Maria Oliveira, Marketing", quote: "Gestão de tráfego aumentou nossas conversões em 200%." },
            { name: "Pedro Santos, TI", quote: "Dashboards interativos transformaram nossa análise de dados." },
            { name: "Ana Costa, Operações", quote: "Automações economizaram horas de trabalho manual." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-950/20 rounded-xl shadow-lg border border-gray-700/20"
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, translateY: -10, boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-gray-200 text-base mb-4">{item.quote}</p>
              <p className="text-blue-600 font-semibold">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Estatísticas */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center">
          Resultados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { value: "200+", label: "Projetos Concluídos", icon: <BriefcaseIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" /> },
            { value: "100+", label: "Clientes Satisfeitos", icon: <UsersIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" /> },
            { value: "99%", label: "Satisfação", icon: <StarIcon className="w-10 h-10 text-blue-600 mx-auto mb-2" /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-950/20 rounded-xl shadow-lg border border-gray-700/20"
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, translateY: -10, boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {item.icon}
              <h3 className="text-3xl font-bold text-blue-600 mb-2">{item.value}</h3>
              <p className="text-gray-200 text-base">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-16 px-4 md:px-8 text-center mt-16 bg-gray-950/20 rounded-xl shadow-xl relative z-10"
        id="contact"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Transforme Sua Empresa
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Leve seu negócio ao próximo nível com nossas soluções tecnológicas. Entre em contato agora!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a
            href="https://wa.me/5517997117187"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Fale Conosco
          </a>
          <a
            href="#contact"
            className="px-12 py-4 rounded-full bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Agendar Reunião
          </a>
        </div>
        <div className="max-w-md mx-auto bg-gray-950/20 p-6 rounded-xl shadow-lg border border-gray-700/20">
          <h3 className="text-xl font-semibold text-white mb-4">Entre em Contato</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Seu Nome"
                className="w-full p-3 rounded-md bg-gray-950/30 text-white border border-gray-700 focus:outline-none focus:border-blue-600"
                disabled={isSending}
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Seu E-mail"
                className="w-full p-3 rounded-md bg-gray-950/30 text-white border border-gray-700 focus:outline-none focus:border-blue-600"
                disabled={isSending}
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Sua Mensagem"
                className="w-full p-3 rounded-md bg-gray-950/30 text-white border border-gray-700 focus:outline-none focus:border-blue-600 h-32"
                disabled={isSending}
              />
              {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="w-full p-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSending ? "Enviando..." : "Enviar"}
            </button>
          </form>
          {formStatus && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-sm mt-4 ${formStatus.includes("Erro") ? "text-red-500" : "text-green-500"}`}
            >
              {formStatus}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="py-8 text-center text-gray-200 mt-16 border-t border-gray-700/20 relative z-10">
        <p>&copy; 2025 Savra. Todos os direitos reservados.</p>
        <div className="mt-4 flex justify-center gap-8">
          <a href="https://linkedin.com/company/savra" className="text-gray-200 hover:text-blue-600 transition-colors">
            <FaInstagram className="w-6 h-6 text-pink-500" />
          </a>
          <a href="https://wa.me/5517997117187" className="text-gray-200 hover:text-blue-600 transition-colors">
          <FaWhatsapp className="w-6 h-6 text-green-600" />
          </a>
          <a href="/privacy" className="text-gray-200 hover:text-blue-600 transition-colors">Política de Privacidade</a>
          <a href="/terms" className="text-gray-200 hover:text-blue-600 transition-colors">Termos de Serviço</a>
        </div>
      </div>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/5517997117187"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 20px rgba(37, 99, 235, 0.7)",
        }}
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: "9999px",
          backgroundColor: "rgb(37, 99, 235)",
          boxShadow: "0 0 8px rgba(37, 99, 235, 0.5)",
        }}
      >
        <FaWhatsapp className="text-white w-7 h-7" />
      </motion.a>
    </div>
  );
}

export default Home;