import { useEffect } from "react";
import { ReactTyped } from "react-typed";
import { 
  GlobeAltIcon,
  ChartBarIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  LightBulbIcon,
  CalendarDateRangeIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import logoSavra from "../../assets/logo-savra.png";
import { FaWhatsapp } from "react-icons/fa";

function Home() {
useEffect(() => {
  const handleScroll = (e: Event) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLAnchorElement;
    const targetId = target.getAttribute("href");
    if (!targetId) return;

    const targetElement = document.querySelector<HTMLElement>(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
  anchors.forEach(anchor => anchor.addEventListener("click", handleScroll));

  return () => {
    anchors.forEach(anchor => anchor.removeEventListener("click", handleScroll));
  };
}, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-purple-900 to-gray-900 text-white overflow-hidden relative">
      {/* Hero with Fixed Text and Simulation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center px-4 py-16"
      >
        <img 
          src={logoSavra} 
          alt="Savra Logo" 
          className="w-64 md:w-80 mb-8 animate-pulse duration-1000"
        />
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-xl md:text-2xl text-gray-200 font-light tracking-wide mb-4">
            Transformando negócios com
          </h2>
          <ReactTyped
            strings={[
              "inovação para empresas de todos os tamanhos",
              "soluções web e mobile sob medida",
              "automações e dashboards para o futuro",
              "gestão de tráfego para maximizar resultados"
            ]}
            typeSpeed={15}
            backSpeed={15}
            loop
            className="text-2xl md:text-3xl text-purple-300 inline-block"
          />
        </div>
        {/* Technological Simulation (Pulsing Lines) */}
        <motion.div 
          className="w-72 h-72 md:w-96 md:h-96 relative"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-24 md:h-32 bg-gradient-to-b from-purple-400/50 to-purple-700/50 rounded"
              style={{
                transformOrigin: "bottom",
                left: `${50 + 30 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                top: "50%",
              }}
              animate={{
                rotate: [0, 15, -15, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        <a 
          href="#contact" 
          className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transition duration-500 shadow-xl text-lg font-semibold transform hover:scale-105 mt-12"
        >
          Agendar Reunião
        </a>

        {/* Continuous Integrated Flow */}
        <div className="max-w-7xl mx-auto space-y-24 px-6 md:px-12 mt-24">
          {/* Services with Enhanced Design */}
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CodeBracketIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Sistemas Web Personalizados</h3>
              <p className="text-gray-300 text-base leading-snug">
                Plataformas escaláveis e otimizadas, desenvolvidas com tecnologia de ponta para impulsionar sua produtividade.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <GlobeAltIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Páginas e Landing Pages</h3>
              <p className="text-gray-300 text-base leading-snug">
                Designs profissionais e otimizados para maximizar conversões e fortalecer sua marca digital.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <DevicePhoneMobileIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Aplicativos Mobile</h3>
              <p className="text-gray-300 text-base leading-snug">
                Aplicativos intuitivos para iOS e Android, projetados para desempenho e engajamento.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <LightBulbIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Automações Inteligentes</h3>
              <p className="text-gray-300 text-base leading-snug">
                Soluções automatizadas para otimizar processos e reduzir custos operacionais.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CalendarDateRangeIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Extração de Dados</h3>
              <p className="text-gray-300 text-base leading-snug">
                Extração e análise de dados para insights estratégicos e decisões informadas.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <ChartBarIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Dashboards Interativos</h3>
              <p className="text-gray-300 text-base leading-snug">
                Ferramentas visuais para monitoramento em tempo real de KPIs e desempenho.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6 py-10 bg-gray-800/40 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ArrowTrendingUpIcon className="w-12 h-12 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-white mb-2">Gestão de Tráfego</h3>
              <p className="text-gray-300 text-base leading-snug">
                Estratégias avançadas para aumentar visibilidade e conversões online.
              </p>
            </div>
          </motion.div>

          {/* About */}
          <motion.div 
            className="max-w-4xl mx-auto space-y-12 text-center mt-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-700 bg-clip-text text-transparent mb-12">
              Por Que Escolher a Savra?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
              Especialistas em transformar ideias em soluções tecnológicas que impulsionam o crescimento, com foco em inovação e resultados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div 
                className="p-6 bg-gray-800/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Soluções Personalizadas</h3>
                <p className="text-gray-300 text-sm">Projetos sob medida para suas necessidades específicas.</p>
              </motion.div>
              <motion.div 
                className="p-6 bg-gray-800/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Equipe Experiente</h3>
                <p className="text-gray-300 text-sm">Profissionais com expertise em tecnologia avançada.</p>
              </motion.div>
              <motion.div 
                className="p-6 bg-gray-800/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Tecnologia de Ponta</h3>
                <p className="text-gray-300 text-sm">Ferramentas modernas para soluções eficientes.</p>
              </motion.div>
              <motion.div 
                className="p-6 bg-gray-800/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">Suporte Contínuo</h3>
                <p className="text-gray-300 text-sm">Acompanhamento dedicado para seu sucesso.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            className="py-24 px-6 md:px-12 text-center mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse opacity-30 pointer-events-none"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Transforme Sua Empresa com Tecnologia
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Descubra como nossas soluções inovadoras podem impulsionar seu negócio. Entre em contato agora!
            </p>
            <a 
              href="mailto:contato@savra.com" 
              className="px-12 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transition duration-500 shadow-xl text-lg font-semibold transform hover:scale-105"
            >
              Fale Conosco
            </a>
          </motion.div>

          {/* Continuous Footer */}
          <div className="py-8 text-center text-gray-300 mt-24">
            <p>&copy; 2025 Savra. Todos os direitos reservados.</p>
            <div className="mt-2 space-x-6">
              <a href="mailto:contato@savra.com" className="hover:text-purple-300 transition-colors">Contato</a>
              <a href="/privacy" className="hover:text-purple-300 transition-colors">Política de Privacidade</a>
              <a href="/terms" className="hover:text-purple-300 transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.a
        href="https://wa.me/5567981775552"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 mb-3
                  md:bottom-15 md:right-20 flex items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 35px rgb(0,255,170), 0 0 70px rgb(0,255,170)",
        }}
        style={{
          width: "5rem",  // w-16
          height: "5rem", // h-16
          borderRadius: "9999px", // totalmente arredondado
          backgroundColor: "rgb(0,255,170)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 2px rgb(0,255,170), 0 0 10px rgb(0,255,170)",
          cursor: "pointer",
        }}
      >
        <FaWhatsapp className="text-white w-8 h-8 md:w-10 md:h-10" />
      </motion.a>
      
    </div>
  );
}

export default Home;