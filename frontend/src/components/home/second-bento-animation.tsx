import { OrbitingCircles } from '@/components/home/ui/orbiting-circle';
import { Brain, Network, Cpu, Database, Shield, Zap, Cloud, Users, Globe, Sparkles } from 'lucide-react';

export function SecondBentoAnimation() {
  return (
    <div className="  h-full w-full  justify-center   ">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-gray-900 to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-gray-900 to-transparent z-20"></div>

      {/* Central Neural Core */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center size-20 bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-2xl z-30 shadow-2xl shadow-cyan-500/25 border border-cyan-400/30">
        <Brain className="size-10 text-white" />
        {/* Pulsing Rings */}
        <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl animate-ping opacity-20" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          {/* Inner Orbit - AI Core Systems */}
          <OrbitingCircles
            index={0}
            iconSize={70}
            radius={120}
            reverse
            speed={1.2}
          >
            <div className="size-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 border border-cyan-400/30 backdrop-blur-xl">
              <Cpu className="size-7 text-cyan-400" />
            </div>
            <div className="size-14 bg-purple-500/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20 border border-purple-400/30 backdrop-blur-xl">
              <Database className="size-7 text-purple-400" />
            </div>
            <div className="size-14 bg-green-500/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 border border-green-400/30 backdrop-blur-xl">
              <Shield className="size-7 text-green-400" />
            </div>
            <div className="size-14 bg-pink-500/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/20 border border-pink-400/30 backdrop-blur-xl">
              <Sparkles className="size-7 text-pink-400" />
            </div>
          </OrbitingCircles>

          {/* Middle Orbit - Network Layer */}
          <OrbitingCircles index={1} iconSize={65} radius={180} speed={0.8}>
            <div className="size-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/20 border border-cyan-400/30 backdrop-blur-xl">
              <Network className="size-6 text-cyan-400" />
            </div>
            <div className="size-12 bg-purple-500/20 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/20 border border-purple-400/30 backdrop-blur-xl">
              <Users className="size-6 text-purple-400" />
            </div>
            <div className="size-12 bg-green-500/20 rounded-xl flex items-center justify-center shadow-xl shadow-green-500/20 border border-green-400/30 backdrop-blur-xl">
              <Zap className="size-6 text-green-400" />
            </div>
            <div className="size-12 bg-pink-500/20 rounded-xl flex items-center justify-center shadow-xl shadow-pink-500/20 border border-pink-400/30 backdrop-blur-xl">
              <Cloud className="size-6 text-pink-400" />
            </div>
            <div className="size-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/20 border border-cyan-400/30 backdrop-blur-xl">
              <Globe className="size-6 text-cyan-400" />
            </div>
          </OrbitingCircles>

          {/* Outer Orbit - Integration Layer */}
          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={260}
            reverse
            speed={0.6}
          >
            <div className="size-11 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/15 border border-cyan-400/20 backdrop-blur-xl">
              <div className="text-cyan-300 text-xs font-bold">AI</div>
            </div>
            <div className="size-11 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/15 border border-green-400/20 backdrop-blur-xl">
              <div className="text-green-300 text-xs font-bold">BC</div>
            </div>
            <div className="size-11 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/15 border border-purple-400/20 backdrop-blur-xl">
              <div className="text-purple-300 text-xs font-bold">VR</div>
            </div>
            <div className="size-11 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/15 border border-pink-400/20 backdrop-blur-xl">
              <div className="text-pink-300 text-xs font-bold">AR</div>
            </div>
            <div className="size-11 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/15 border border-cyan-400/20 backdrop-blur-xl">
              <div className="text-cyan-300 text-xs font-bold">IoT</div>
            </div>
            <div className="size-11 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/15 border border-purple-400/20 backdrop-blur-xl">
              <div className="text-purple-300 text-xs font-bold">ML</div>
            </div>
          </OrbitingCircles>
          
          {/* Extended Orbit - Ecosystem Partners */}
          <OrbitingCircles
            index={3}
            iconSize={50}
            radius={350}
            speed={0.4}
          >
            <div className="size-10 bg-cyan-500/15 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/10 border border-cyan-400/15 backdrop-blur-xl opacity-80">
              <div className="text-cyan-300 text-[10px] font-bold">ETH</div>
            </div>
            <div className="size-10 bg-purple-500/15 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/10 border border-purple-400/15 backdrop-blur-xl opacity-80">
              <div className="text-purple-300 text-[10px] font-bold">SOL</div>
            </div>
            <div className="size-10 bg-green-500/15 rounded-lg flex items-center justify-center shadow-md shadow-green-500/10 border border-green-400/15 backdrop-blur-xl opacity-80">
              <div className="text-green-300 text-[10px] font-bold">COS</div>
            </div>
            <div className="size-10 bg-pink-500/15 rounded-lg flex items-center justify-center shadow-md shadow-pink-500/10 border border-pink-400/15 backdrop-blur-xl opacity-80">
              <div className="text-pink-300 text-[10px] font-bold">DOT</div>
            </div>
            <div className="size-10 bg-cyan-500/15 rounded-lg flex items-center justify-center shadow-md shadow-cyan-500/10 border border-cyan-400/15 backdrop-blur-xl opacity-80">
              <div className="text-cyan-300 text-[10px] font-bold">AVAX</div>
            </div>
            <div className="size-10 bg-purple-500/15 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/10 border border-purple-400/15 backdrop-blur-xl opacity-80">
              <div className="text-purple-300 text-[10px] font-bold">NEAR</div>
            </div>
            <div className="size-10 bg-green-500/15 rounded-lg flex items-center justify-center shadow-md shadow-green-500/10 border border-green-400/15 backdrop-blur-xl opacity-80">
              <div className="text-green-300 text-[10px] font-bold">APT</div>
            </div>
            <div className="size-10 bg-pink-500/15 rounded-lg flex items-center justify-center shadow-md shadow-pink-500/10 border border-pink-400/15 backdrop-blur-xl opacity-80">
              <div className="text-pink-300 text-[10px] font-bold">SUI</div>
            </div>
          </OrbitingCircles>

          {/* Neural Connection Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-cyan-400/20 to-transparent"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-160px)`,
                }}
              />
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-pulse
                  ${i % 4 === 0 ? 'bg-cyan-400' : ''}
                  ${i % 4 === 1 ? 'bg-purple-400' : ''}
                  ${i % 4 === 2 ? 'bg-green-400' : ''}
                  ${i % 4 === 3 ? 'bg-pink-400' : ''}
                `}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}