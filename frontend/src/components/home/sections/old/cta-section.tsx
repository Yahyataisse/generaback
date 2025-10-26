import Image from 'next/image';
import { siteConfig } from '@/lib/home';
import Link from 'next/link';

export function CTASection() {
  const { ctaSection } = siteConfig;

  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full pt-20 pb-20 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* خلفية نيونية ثلاثية الأبعاد */}
      <div className="absolute inset-0 z-0">
        {/* شبكة ثلاثية الأبعاد */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-3d"></div>
        </div>
        
        {/* أشكال هندسية نيونية متحركة */}
        <div className="neon-shapes">
          <div className="neon-cube cube-1"></div>
          <div className="neon-cube cube-2"></div>
          <div className="neon-sphere sphere-1"></div>
          <div className="neon-pyramid pyramid-1"></div>
          <div className="neon-rings rings-1"></div>
        </div>

        {/* تأثيرات الإضاءة */}
        <div className="light-effects">
          <div className="light-beam beam-1"></div>
          <div className="light-beam beam-2"></div>
          <div className="glow-overlay"></div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="w-full mx-auto relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="h-[500px] md:h-[550px] overflow-hidden w-full rounded-2xl bg-transparent relative">
            
            {/* حاوية النص مع تأثير النيون */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="neon-text-container mb-8">
                <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter max-w-xs md:max-w-2xl text-center neon-text">
                  {ctaSection.title}
                </h1>
                <div className="text-glow"></div>
              </div>

              {/* زر CTA مع تأثير ثلاثي الأبعاد */}
              <div className="absolute bottom-16 flex flex-col items-center justify-center gap-4">
                <Link
                  href={ctaSection.button.href}
                  className="neon-button-3d bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg h-14 w-48 rounded-xl flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-neon"
                >
                  <span className="relative z-10">{ctaSection.button.text}</span>
                  <div className="button-glow"></div>
                </Link>
                
                <span className="text-cyan-200 text-md font-light tracking-wide neon-subtext">
                  {ctaSection.subtext}
                </span>
              </div>
            </div>

            {/* العناصر ثلاثية الأبعاد العائمة */}
            <div className="floating-elements">
              <div className="digital-twin-icon"></div>
              <div className="blockchain-node"></div>
              <div className="ai-core"></div>
            </div>
          </div>
        </div>
      </div>

      {/* الأنماط المضمنة */}
      <style jsx>{`
        .grid-3d {
          background: 
            linear-gradient(90deg, transparent 95%, rgba(0, 255, 255, 0.1) 100%),
            linear-gradient(0deg, transparent 95%, rgba(0, 255, 255, 0.1) 100%);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center;
        }

        .neon-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .neon-cube, .neon-sphere, .neon-pyramid, .neon-rings {
          position: absolute;
          border: 2px solid;
          animation: float 6s ease-in-out infinite;
        }

        .cube-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          border-color: #00ffff;
          box-shadow: 0 0 20px #00ffff, inset 0 0 20px #00ffff;
          transform: rotate(45deg);
          animation-delay: 0s;
        }

        .cube-2 {
          width: 60px;
          height: 60px;
          bottom: 30%;
          right: 15%;
          border-color: #ff00ff;
          box-shadow: 0 0 20px #ff00ff, inset 0 0 20px #ff00ff;
          transform: rotate(15deg);
          animation-delay: 2s;
        }

        .sphere-1 {
          width: 100px;
          height: 100px;
          top: 60%;
          left: 20%;
          border-radius: 50%;
          border-color: #00ffaa;
          box-shadow: 0 0 30px #00ffaa, inset 0 0 30px #00ffaa;
          animation-delay: 1s;
        }

        .pyramid-1 {
          width: 0;
          height: 0;
          top: 15%;
          right: 20%;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
          border-bottom: 80px solid #ffaa00;
          filter: drop-shadow(0 0 20px #ffaa00);
          animation-delay: 3s;
        }

        .rings-1 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          left: 70%;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top: 2px solid #aa00ff;
          border-right: 2px solid #aa00ff;
          box-shadow: 0 0 25px #aa00ff;
          animation: spin 8s linear infinite;
        }

        .light-beam {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          filter: blur(1px);
          animation: beam-sweep 10s linear infinite;
        }

        .beam-1 {
          top: 30%;
          animation-delay: 0s;
        }

        .beam-2 {
          top: 70%;
          animation-delay: 5s;
        }

        .glow-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 40%, rgba(0, 255, 255, 0.1), transparent 50%),
                     radial-gradient(circle at 70% 60%, rgba(255, 0, 255, 0.1), transparent 50%);
        }

        .neon-text {
          text-shadow: 
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 40px #00ffff,
            0 0 80px #00ffff;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffaa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent 70%);
          filter: blur(20px);
          z-index: -1;
        }

        .neon-button-3d {
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow: 
            0 10px 30px rgba(0, 255, 255, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .neon-button-3d::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffaa);
          z-index: -1;
          margin: -2px;
          border-radius: inherit;
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .neon-button-3d:hover .button-glow {
          left: 100%;
        }

        .neon-subtext {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .digital-twin-icon, .blockchain-node, .ai-core {
          position: absolute;
          width: 40px;
          height: 40px;
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.7;
          animation: float-slow 8s ease-in-out infinite;
        }

        .digital-twin-icon {
          background-image: url("data:image/svg+xml,..."); // أيقونة Digital Twin
          top: 25%;
          right: 25%;
          animation-delay: 0s;
        }

        .blockchain-node {
          background-image: url("data:image/svg+xml,..."); // أيقونة Blockchain
          bottom: 35%;
          left: 25%;
          animation-delay: 2.5s;
        }

        .ai-core {
          background-image: url("data:image/svg+xml,..."); // أيقونة AI
          top: 45%;
          left: 15%;
          animation-delay: 1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-15px) translateX(10px); }
          66% { transform: translateY(5px) translateX(-10px); }
        }

        @keyframes beam-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .shadow-neon {
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.7),
            0 0 40px rgba(0, 255, 255, 0.5),
            0 0 60px rgba(0, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}