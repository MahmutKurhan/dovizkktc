import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HiRefresh } from 'react-icons/hi';

// forceDarkMode parametresini kaldırdım
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // darkMode değişkeni artık gerekli değil, kaldırdım
  const navRef = useRef(null);
  
  // Döviz kurları için state'ler
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState('');

  // Aktif bölüm için state
  const [activeSection, setActiveSection] = useState('hero');

  // Daha akıcı kaydırma algılama
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Hangi bölümün viewportta olduğunu belirle
      const sections = ['hero', 'converter', 'rates', 'charts', 'news'];
      
      // En üstte görünen bölümü bul
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Header'ın yüksekliğini hesaba katarak, viewport'un üst kısmında olan bölümü seç
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sayfa yüklendiğinde dark mode'u zorla uygula
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Mobil menü açıkken kaydırmayı engelle 
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Klavye navigasyonu ile menü kapatma
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  // API'den döviz kurlarını çekme
  const fetchCurrencyRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://doviz.gokelci.com/api/merkezBank/cek.php');
      
      // API'den gelen veri yapısını kontrol et ve işle
      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        // Doğrudan API'nin data dizisini kullan
        setCurrencies(response.data.data);
        
        // Son güncelleme zamanını al
        if (response.data.lastUpdate) {
          setLastUpdateTime(response.data.lastUpdate);
        } else {
          setLastUpdateTime(new Date().toLocaleString('tr-TR'));
        }
      } else if (response.data && Array.isArray(response.data)) {
        // Alternatif API formatı - verinin doğrudan dizi olduğu durumda
        // API'den gelen verileri formatlama
        const formattedCurrencies = response.data.map(item => {
          // API verilerini uygun formata dönüştürme
          const code = item.Sembol ? `${item.Sembol}/TRY` : item.code;
          const rate = item.Doviz_Alis ? parseFloat(item.Doviz_Alis) : (parseFloat(item.buying) || 0);
          const buying = item.Doviz_Alis ? parseFloat(item.Doviz_Alis) : (parseFloat(item.buying) || 0);
          const selling = item.Doviz_Satis ? parseFloat(item.Doviz_Satis) : (parseFloat(item.selling) || 0);
          
          // Trend değerleri
          const trend = item.trend || (Math.random() > 0.5 ? 'up' : 'down');
          const change = item.change || (trend === 'up' ? '+%0.8' : '-%0.5');
          
          return {
            code,
            rate,
            change,
            trend,
            buying,
            selling,
            unit: parseInt(item.Birim || item.unit) || 1,
            name: item.Isim || item.name || '',
            effectiveBuying: item.Efektif_Alis ? parseFloat(item.Efektif_Alis) : (parseFloat(item.effectiveBuying) || 0),
            effectiveSelling: item.Efektif_Satis ? parseFloat(item.Efektif_Satis) : (parseFloat(item.effectiveSelling) || 0)
          };
        });
        
        setCurrencies(formattedCurrencies);
        setLastUpdateTime(new Date().toLocaleString('tr-TR'));
      } else {
        console.error('API yanıtı beklenen formatta değil:', response.data);
      }
    } catch (error) {
      console.error('Döviz kurları alınırken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Component yüklendiğinde ve periyodik olarak kurları güncelleme
  useEffect(() => {
    fetchCurrencyRates();
    
    // 5 dakikada bir döviz kurlarını güncelle
    const interval = setInterval(fetchCurrencyRates, 300000);
    return () => clearInterval(interval);
  }, []);
  
  // USD ve EUR para birimlerini filtreleme
  const usdCurrency = currencies.find(c => c.code === 'USD/TRY');
  const eurCurrency = currencies.find(c => c.code === 'EUR/TRY');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled 
          ? 'py-2.5 bg-[#0b0b0a]/90 shadow-lg backdrop-blur-lg' 
          : 'py-4 bg-[#0b0b0a]'
      } transition-all duration-300 border-b border-transparent ${scrolled ? 'border-gray-800/70' : ''}`}
    >
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="flex items-center justify-between">
          {/* Logo ve Site Adı - QR APEX olarak güncellendi */}
          <a 
            href="#hero" 
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              const heroSection = document.getElementById('hero');
              if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('hero');
              }
            }}
          >
            <div className="relative flex items-center">
              <img 
                src="/APXQR.svg" 
                alt="QR APEX Logo" 
                className="h-9 sm:h-10 mr-2 transition-all duration-300 hover:scale-105"
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-[#0b0b0a] dark:text-white leading-tight tracking-tight">
                  QR <span className="text-[#9a8c14] dark:text-[#eddc0f]">APEX</span>
                </h1>
                <div className="flex items-center mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ea0b0b] mr-1.5 animate-ping"></span>
                  <p className="text-xs font-medium text-gray-400 tracking-wide">CANLI DÖVİZ KURLARI</p>
                </div>
              </div>
            </div>
          </a>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:block">
            <div className="relative overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 p-1 shadow-inner">
              <ul className="flex relative z-10">
                {[
                  { name: 'Ana Sayfa', href: '#hero', section: 'hero' },
                  { name: 'Döviz Çevirici', href: '#converter', section: 'converter' },
                  { name: 'Hakkımızda', href: '#rates', section: 'rates' },
                  { name: 'Haberler', href: '#news', section: 'news' }
                ].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(item.href);
                        if (element) {
                          setActiveSection(item.section);
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full block transition-all focus:outline-none focus:ring-2 focus:ring-[#9a8c14] focus:ring-offset-2 ${
                        activeSection === item.section 
                          ? 'text-[#0b0b0a]' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-[#9a8c14] dark:hover:text-[#eddc0f]'
                      }`}
                      aria-current={activeSection === item.section ? 'page' : undefined}
                    >
                      {activeSection === item.section && (
                        <span className="absolute inset-0 bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] rounded-full -z-10">
                          <span className="absolute inset-0 bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                        </span>
                      )}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sağ Kısım Kontrolleri */}
          <div className="flex items-center space-x-3">
            {/* Döviz Kurları Göstergesi - API ile Entegre Edildi */}
            <div className="hidden lg:flex items-center text-sm">
              <div className="flex items-center space-x-3 mr-2">
                {loading ? (
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ) : (
                  <>
                    {usdCurrency && (
                      <div className="flex flex-col items-end group relative">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-gray-100">USD</span>
                          <span className={`ml-1.5 text-${usdCurrency.trend === 'up' ? 'green' : 'red'}-600 dark:text-${usdCurrency.trend === 'up' ? 'green' : 'red'}-400 text-xs font-semibold`}>
                            {usdCurrency.change}
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">{usdCurrency.rate.toFixed(2)} ₺</span>
                        
                        {/* Tooltip */}
                        <div className="absolute top-full mt-2 -right-4 bg-white dark:bg-[#0b0b0a] shadow-lg rounded-lg p-3 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">KKTC Merkez Bankası Kurları</div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Alış:</span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">{usdCurrency.buying.toFixed(5)} ₺</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Satış:</span>
                            <span className="text-sm font-bold text-[#ea0b0b] dark:text-[#ea0b0b]">{usdCurrency.selling.toFixed(5)} ₺</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {eurCurrency && (
                      <div className="flex flex-col items-end group relative">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-gray-100">EUR</span>
                          <span className={`ml-1.5 text-${eurCurrency.trend === 'up' ? 'green' : 'red'}-600 dark:text-${eurCurrency.trend === 'up' ? 'green' : 'red'}-400 text-xs font-semibold`}>
                            {eurCurrency.change}
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">{eurCurrency.rate.toFixed(2)} ₺</span>
                        
                        {/* Tooltip */}
                        <div className="absolute top-full mt-2 -right-4 bg-white dark:bg-[#0b0b0a] shadow-lg rounded-lg p-3 w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">KKTC Merkez Bankası Kurları</div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Alış:</span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">{eurCurrency.buying.toFixed(5)} ₺</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Satış:</span>
                            <span className="text-sm font-bold text-[#ea0b0b] dark:text-[#ea0b0b]">{eurCurrency.selling.toFixed(5)} ₺</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Yenileme butonu */}
                    <button 
                      onClick={fetchCurrencyRates} 
                      disabled={loading}
                      className="flex items-center justify-center w-7 h-7 rounded-full bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f] hover:bg-[#eddc0f]/30 dark:hover:bg-[#eddc0f]/20 transition-colors duration-200 ml-1"
                      title="Kurları yenile"
                    >
                      <HiRefresh className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Dil Seçimi */}
            <div className="hidden sm:block">
              <div className="relative">
                <select 
                  className="appearance-none pl-3 pr-9 py-1.5 text-sm bg-gray-800 rounded-md text-gray-300 font-medium border-0 focus:outline-none focus:ring-2 focus:ring-[#eddc0f] focus:ring-offset-1 cursor-pointer shadow-sm"
                  aria-label="Dil Seçimi"
                >
                  <option>🇹🇷 TR</option>
                  <option>🇬🇧 EN</option>
                  <option>🇩🇪 DE</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobil Menü Düğmesi */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden group relative overflow-hidden flex items-center justify-center w-9 h-9 rounded-md bg-gray-800 shadow-sm transition-transform hover:scale-105 active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Ana menüyü aç/kapat"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#eddc0f] to-[#9a8c14] opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <span className="sr-only">Menüyü Aç/Kapat</span>
              <div className="flex flex-col justify-center items-center w-5 h-5 space-y-1.5 transform transition-all duration-300">
                <div className={`h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all ${mobileMenuOpen ? 'opacity-0 translate-x-5' : ''}`}></div>
                <div className={`h-0.5 w-5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü - sadece karanlık temaya uygun stiller */}
      <div 
        id="mobile-menu"
        ref={navRef}
        className={`absolute top-full left-0 right-0 bg-[#0b0b0a] shadow-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[80vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col space-y-2">
            {[
              { name: 'Ana Sayfa', href: '#hero', section: 'hero' },
              { name: 'Döviz Çevirici', href: '#converter', section: 'converter' },
              { name: 'Kurlar', href: '#rates', section: 'rates' },
              { name: 'Grafikler', href: '#charts', section: 'charts' },
              { name: 'Haberler', href: '#news', section: 'news' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    setActiveSection(item.section);
                    element.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }
                }}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all focus:ring-2 focus:outline-none focus:ring-[#eddc0f] ${
                  activeSection === item.section 
                    ? 'bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] text-[#0b0b0a] shadow-md' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-current={activeSection === item.section ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* Döviz Kurları (Mobil) - API ile Entegre Edildi */}
          <div className="mt-5 grid grid-cols-2 gap-2 bg-[#eddc0f]/10 dark:bg-[#eddc0f]/5 p-3 rounded-lg">
            {loading ? (
              <>
                <div className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </>
            ) : (
              <>
                {currencies.slice(0, 4).map((currency, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded shadow-sm">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{currency.code}</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900 dark:text-white">{currency.rate.toFixed(2)}</span>
                      <span className={`ml-1 ${currency.trend === 'up' ? 'text-green-500' : 'text-[#ea0b0b]'} text-xs`}>{currency.change}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {/* Dil Seçimi */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dil Seçimi</span>
              <div className="relative">
                <select className="appearance-none pl-7 pr-9 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 font-medium border-0 focus:outline-none focus:ring-2 focus:ring-[#eddc0f] shadow-sm">
                  <option>🇹🇷 Türkçe</option>
                  <option>🇬🇧 English</option>
                  <option>🇩🇪 Deutsch</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Son güncelleme bilgisi */}
          <div className="mt-4 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>Son güncelleme: {lastUpdateTime || 'Henüz güncelleme yok'}</p>
            <button 
              onClick={fetchCurrencyRates}
              disabled={loading} 
              className="mt-2 text-[#9a8c14] dark:text-[#eddc0f] font-medium flex items-center justify-center mx-auto"
            >
              <HiRefresh className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Yenile
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;