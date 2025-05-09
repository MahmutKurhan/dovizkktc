import { useState, useEffect } from 'react';
import CurrencyCard from '../CurrencyCard';
import { HiArrowRight, HiChartBar, HiChevronRight } from 'react-icons/hi';

const Hero = ({ currencies, loading }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animasyon için gecikmeli görünürlük
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pb-12 sm:pb-20 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      {/* Arkaplan efektleri */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#eddc0f]/10 via-white to-white dark:from-[#0b0b0a]/90 dark:via-[#0b0b0a] dark:to-[#0b0b0a]"></div>
      <div className="absolute inset-0 -z-20 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.08] [mask-image:radial-gradient(circle_at_top,white,transparent_70%)]"></div>
      <div className="absolute -top-64 left-1/3 -z-20 h-[40rem] w-[40rem] rounded-full bg-gradient-to-r from-[#eddc0f]/20 to-[#9a8c14]/20 blur-3xl dark:from-[#eddc0f]/10 dark:to-[#9a8c14]/10 animate-pulse-slow"></div>
      <div className="absolute -right-64 -top-64 -z-20 h-[40rem] w-[40rem] rounded-full bg-gradient-to-l from-[#9a8c14]/20 to-[#eddc0f]/20 blur-3xl dark:from-[#9a8c14]/10 dark:to-[#eddc0f]/10 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute left-1/2 top-1/2 -z-20 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#ea0b0b]/5 to-[#9a8c14]/10 blur-3xl dark:from-[#ea0b0b]/5 dark:to-[#9a8c14]/5 animate-pulse-slow animation-delay-4000"></div>
      
      <div className="container mx-auto px-4">
        {/* Mobil görünümde daha kompakt bir layout */}
        <div className="relative items-center gap-8 md:grid md:grid-cols-2 md:gap-12 lg:gap-16">
          
          {/* Sol Kısım - Mobil cihazlarda gizlenecek */}
          <div className={`hidden md:flex flex-col transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            
            {/* Ana Başlık */}
            <h1 className="mb-7 text-4xl font-extrabold leading-tight tracking-tight text-[#0b0b0a] dark:text-white md:text-5xl lg:text-6xl">
              <span className="block mb-2 drop-shadow-sm">Anlık <span className="relative inline">
                Döviz 
                <svg className="absolute -z-10 -bottom-0.5 w-full h-3 left-0 dark:opacity-70" viewBox="0 0 120 8" preserveAspectRatio="none">
                  <path d="M0 5 Q 20 4 40 5 Q 60 6 80 5 Q 100 4 120 5 L 120 8 L 0 8 Z" fill="url(#gold-gradient)" />
                  <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#eddc0f" />
                      <stop offset="50%" stopColor="#9a8c14" />
                      <stop offset="100%" stopColor="#eddc0f" />
                    </linearGradient>
                  </defs>
                </svg>
              </span> Kurları</span>
              <span className="block">
                ve <span className="relative inline-block bg-gradient-to-r from-[#eddc0f] via-[#9a8c14] to-[#eddc0f] bg-clip-text pb-1 text-transparent">
                  Güvenilir Çeviri
                  <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#eddc0f] via-[#9a8c14] to-[#eddc0f] opacity-70 blur-sm"></span>
                </span>
              </span>
            </h1>
            
            {/* Açıklama */}
            <p className="mb-8 max-w-2xl text-lg text-[#0b0b0a]/80 dark:text-gray-300">
              En güncel döviz kurlarını takip edin, anında para birimi dönüşümleri yapın ve finansal kararlarınızı <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]">güvenle</span> alın.
            </p>
            
            {/* Butonlar */}
            <div className="flex flex-wrap gap-4">
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#eddc0f] via-[#9a8c14] to-[#eddc0f] px-7 py-4 font-medium text-[#0b0b0a] shadow-xl transition-all duration-300 hover:shadow-[#eddc0f]/25 dark:hover:shadow-[#9a8c14]/40 hover:scale-105 active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  Döviz Çevir
                  <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#9a8c14] via-[#eddc0f] to-[#9a8c14] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="absolute -inset-3 z-0 rounded-full bg-gradient-to-r from-[#eddc0f] via-[#9a8c14] to-[#eddc0f] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"></span>
              </button>
              <button className="group relative overflow-hidden rounded-full border-2 border-[#eddc0f]/30 bg-white/80 px-7 py-4 font-medium text-[#0b0b0a] shadow-md backdrop-blur-sm transition-all duration-300 hover:border-[#9a8c14] hover:text-[#9a8c14] hover:shadow-[#9a8c14]/10 dark:border-[#9a8c14]/30 dark:bg-[#0b0b0a]/80 dark:text-gray-300 dark:hover:border-[#eddc0f] dark:hover:text-[#eddc0f] dark:hover:shadow-[#eddc0f]/10 hover:scale-105 active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  <HiChartBar className="transition-all duration-300 group-hover:text-[#9a8c14] dark:group-hover:text-[#eddc0f]" />
                  Kurları Görüntüle
                </span>
              </button>
            </div>
            
            {/* Öne Çıkan Özellikler */}
            <div className="mt-10 space-y-4">
              {[
                { title: 'Tüm Dünya Para Birimleri', description: '180+ farklı para biriminin anlık değerleri' },
                { title: 'Düşük Komisyonlar', description: 'Sadece %0.1 işlem ücreti ile piyasanın en avantajlı oranları' },
                { title: '7/24 Canlı Veriler', description: 'Kesintisiz güncellenen kurlar ve piyasa verileri' },
              ].map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10">
                    <HiChevronRight className="h-4 w-4 text-[#9a8c14] dark:text-[#eddc0f]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#0b0b0a] dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-[#0b0b0a]/70 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobil için mini başlık - Sadece mobilde gösterilecek */}
          <div className="mb-4 text-center md:hidden">
            <h2 className="text-2xl font-bold text-[#0b0b0a] dark:text-white mb-2">
              Anlık <span className="text-[#9a8c14] dark:text-[#eddc0f]">Döviz</span> Kurları
            </h2>
            <p className="text-sm text-[#0b0b0a]/80 dark:text-gray-300 mb-4">
              En güncel kurları takip edin, anında dönüşüm yapın
            </p>
          </div>
          
          {/* Sağ Kısım - Kur Kartı (Tüm ekranlarda gösterilecek) */}
          <div className={`relative flex items-center justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} md:mt-0 mx-auto w-full max-w-md`}>
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#eddc0f]/30 to-[#9a8c14]/30 opacity-60 blur-3xl dark:from-[#eddc0f]/10 dark:to-[#9a8c14]/10"></div>
            
            {/* Hareketli Para Simgeleri - Sadece tablet ve masaüstünde görünecek */}
            <div className="absolute z-30 animate-custom-float hidden md:flex" style={{ top: '5%', left: '2%' }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl dark:bg-[#0b0b0a] ring-2 ring-[#eddc0f]/30 dark:ring-[#eddc0f]/20 hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] bg-clip-text text-transparent animate-pulse-slow">$</span>
              </div>
            </div>
            <div className="absolute z-30 animate-custom-float2 hidden md:flex" style={{ top: '75%', right: '0%' }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl dark:bg-[#0b0b0a] ring-2 ring-[#9a8c14]/30 dark:ring-[#9a8c14]/20 hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#9a8c14] to-[#eddc0f] bg-clip-text text-transparent animate-pulse-slow">€</span>
              </div>
            </div>
            <div className="absolute z-30 animate-custom-float3 hidden md:flex" style={{ bottom: '10%', left: '0%' }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl dark:bg-[#0b0b0a] ring-2 ring-[#ea0b0b]/30 dark:ring-[#ea0b0b]/20 hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ea0b0b] to-[#9a8c14] bg-clip-text text-transparent animate-pulse-slow">£</span>
              </div>
            </div>
            
            <div className="relative z-10 w-full max-w-md transform transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.03]">
              <CurrencyCard currencies={currencies} loading={loading} />
              <div className="absolute -bottom-3 -left-3 -right-3 -z-10 h-full rounded-2xl bg-gradient-to-tr from-[#eddc0f]/10 to-[#9a8c14]/10 blur-xl dark:from-[#eddc0f]/5 dark:to-[#9a8c14]/5"></div>
              
              {/* Vurgu efekti - Altın renklerle */}
              <div className="absolute -inset-px -z-5 animate-pulse-slow animation-delay-4000 bg-gradient-to-r from-[#eddc0f]/0 via-[#eddc0f]/30 to-[#eddc0f]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-sm"></div>
            </div>
          </div>

          {/* Mobil için Öne Çıkan Özellikler - Kur kartının altında gösterilecek */}
          <div className={`mt-8 md:hidden transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-lg font-semibold text-center text-[#0b0b0a] dark:text-white mb-4">Öne Çıkan Özellikler</h3>
            <div className="space-y-3 bg-white/40 dark:bg-[#0b0b0a]/60 p-4 rounded-lg backdrop-blur-sm border border-[#eddc0f]/10 dark:border-[#eddc0f]/5">
              {[
                { title: 'Tüm Dünya Para Birimleri', description: '180+ farklı para biriminin anlık değerleri' },
                { title: 'Düşük Komisyonlar', description: 'Sadece %0.1 işlem ücreti ile piyasanın en avantajlı oranları' },
                { title: '7/24 Canlı Veriler', description: 'Kesintisiz güncellenen kurlar ve piyasa verileri' },
              ].map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10">
                    <HiChevronRight className="h-3 w-3 text-[#9a8c14] dark:text-[#eddc0f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#0b0b0a] dark:text-white">{feature.title}</h4>
                    <p className="text-xs text-[#0b0b0a]/70 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Güven Göstergeleri - Sadece tablet ve masaüstünde görünecek */}
        <div className={`mt-8 md:mt-16 hidden md:block transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-center bg-white/40 dark:bg-[#0b0b0a]/60 py-3 px-6 rounded-lg backdrop-blur-sm border border-[#eddc0f]/10 dark:border-[#eddc0f]/5">
            <p className="text-sm font-medium text-[#0b0b0a]/80 dark:text-gray-300">Verilerin güvenilir kaynakları:</p>
            {['Merkez Bankası', 'Reuters', 'Bloomberg', 'Forex'].map((source, index) => (
              <div key={index} className="flex items-center gap-1 text-[#0b0b0a]/80 dark:text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9a8c14] dark:bg-[#eddc0f]"></span>
                <span className="text-sm font-medium">{source}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dekore Edici Efektler */}
        <div className="absolute top-[20%] right-[5%] h-24 w-24 rounded-full bg-[#ea0b0b]/5 blur-3xl dark:bg-[#ea0b0b]/3 animate-pulse-slow"></div>
        
        {/* Hareketli dalga efekti - Sadece tablet ve masaüstünde görünecek */}
        <div className="absolute bottom-0 left-0 right-0 h-16 w-full overflow-hidden hidden md:block">
          <div className="absolute -bottom-1 left-0 right-0 h-16 w-[200%] animate-wave bg-[url('/wave.svg')] bg-repeat-x opacity-10 [mask-image:linear-gradient(to-r,#eddc0f,#9a8c14)]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;