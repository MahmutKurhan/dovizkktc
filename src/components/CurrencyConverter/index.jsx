import { useState, useEffect } from 'react';
import { HiSwitchHorizontal, HiArrowRight, HiRefresh, HiChartBar, HiStar, HiClock } from 'react-icons/hi';

const CurrencyConverter = ({ 
  amount, 
  setAmount, 
  selectedCurrency,
  setSelectedCurrency, 
  currencies = [],  // API'den gelen kur verileri
  loading = false,  // Yükleme durumu
  handleConvert,    // Dönüştürme fonksiyonu
  fetchCurrencyRates // Kur güncelleme fonksiyonu
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fromCurrency, setFromCurrency] = useState(selectedCurrency || 'USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [lastUpdateTime, setLastUpdateTime] = useState('');
  
  // Para birimi simge haritası
  const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'TRY': '₺',
    'CHF': 'Fr',
    'CAD': 'C$',
    'AUD': 'A$',
    // API'deki diğer para birimleri için ek semboller eklenebilir
  };
  
  // Para birimi renk haritası - Altın/Haki tonlarında güncellendi
  const currencyColors = {
    'USD': 'bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]',
    'EUR': 'bg-[#9a8c14]/20 text-[#9a8c14] dark:bg-[#9a8c14]/10 dark:text-[#eddc0f]',
    'GBP': 'bg-[#eddc0f]/15 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]',
    'JPY': 'bg-[#9a8c14]/15 text-[#9a8c14] dark:bg-[#9a8c14]/10 dark:text-[#eddc0f]',
    'TRY': 'bg-[#eddc0f]/25 text-[#9a8c14] dark:bg-[#eddc0f]/15 dark:text-[#eddc0f]',
    'CHF': 'bg-[#9a8c14]/25 text-[#9a8c14] dark:bg-[#9a8c14]/15 dark:text-[#eddc0f]',
    'CAD': 'bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]',
    'AUD': 'bg-[#9a8c14]/20 text-[#9a8c14] dark:bg-[#9a8c14]/10 dark:text-[#eddc0f]',
  };
  
  // Diğer mevcut useEffect ve fonksiyonlar aynı kalacak
  // Para birimi değiştiğinde, Home bileşenindeki state'i güncelle
  useEffect(() => {
    if (fromCurrency !== selectedCurrency) {
      setSelectedCurrency(fromCurrency);
    }
  }, [fromCurrency, selectedCurrency, setSelectedCurrency]);
  
  // Popüler dönüşümleri API verilerinden hesaplama
  const getPopularConversions = () => {
    // API verilerinden popüler para birimlerini bulalım
    const usdTry = currencies.find(c => c.code === 'USD/TRY');
    const eurTry = currencies.find(c => c.code === 'EUR/TRY');
    const gbpTry = currencies.find(c => c.code === 'GBP/TRY');
    
    if (!usdTry || !eurTry || !gbpTry) {
      return [
        { from: 'USD', to: 'EUR', rate: 0.91 },
        { from: 'EUR', to: 'USD', rate: 1.10 },
        { from: 'USD', to: 'GBP', rate: 0.78 },
        { from: 'GBP', to: 'EUR', rate: 1.17 },
      ];
    }
    
    // Çapraz kurları hesaplayalım
    const usdEur = +(usdTry.rate / eurTry.rate).toFixed(4);
    const eurUsd = +(eurTry.rate / usdTry.rate).toFixed(4);
    const usdGbp = +(usdTry.rate / gbpTry.rate).toFixed(4);
    const gbpEur = +(gbpTry.rate / eurTry.rate).toFixed(4);
    
    return [
      { from: 'USD', to: 'EUR', rate: usdEur },
      { from: 'EUR', to: 'USD', rate: eurUsd },
      { from: 'USD', to: 'GBP', rate: usdGbp },
      { from: 'GBP', to: 'EUR', rate: gbpEur },
    ];
  };
  
  // Güncel popüler dönüşümleri hesaplayalım
  const popularConversions = getPopularConversions();
  
  // Para birimlerini ters çevir ve ana bileşeni güncelle
  const swapCurrencies = () => {
    if (toCurrency === 'TRY') {
      // TRY'yi from'a, seçili para birimini to'ya koy
      setFromCurrency('TRY');
      setToCurrency(fromCurrency);
      setSelectedCurrency('TRY');
    } else {
      // Normal ters çevirme
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setSelectedCurrency(toCurrency);
    }
  };
  
  // Kur güncelleme fonksiyonu
  const refreshRates = () => {
    fetchCurrencyRates();
    setLastUpdateTime(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
  };

  // Son güncelleme zamanını ayarla
  useEffect(() => {
    setLastUpdateTime(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
  }, [currencies]);
  
  // Animasyon için gecikmeli görünürlük
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Para birimi değiştiğinde dönüştürmeyi otomatik başlat
  useEffect(() => {
    if (currencies.length > 0) {
      handleConvert(fromCurrency, toCurrency);
    }
  }, [fromCurrency, toCurrency, currencies.length]);

  // Mevcut kur bilgisini hesapla
  const getCurrentRate = () => {
    if (currencies.length === 0) return 0;
    
    // From currency'den TRY'ye kur
    const fromRate = fromCurrency === 'TRY' ? 1 : currencies.find(c => c.code === `${fromCurrency}/TRY`)?.rate || 0;
    
    // To currency'den TRY'ye kur
    const toRate = toCurrency === 'TRY' ? 1 : currencies.find(c => c.code === `${toCurrency}/TRY`)?.rate || 0;
    
    // Çapraz kur hesaplaması
    if (fromCurrency === 'TRY') {
      // TRY'den başka bir para birimine
      return +(1 / toRate).toFixed(4);
    } else if (toCurrency === 'TRY') {
      // Başka bir para biriminden TRY'ye
      return +fromRate.toFixed(4);
    } else {
      // İki farklı para birimi arasında çapraz kur
      return +(fromRate / toRate).toFixed(4);
    }
  };
  
  // Kur oranını al
  const currentRate = getCurrentRate();
  
  // Dönüşüm sonucunu hesapla
  const calculatedAmount = (amount * currentRate).toFixed(2);

  // Popüler dönüşüm seçme işlevi ekleyin
  const selectPopularConversion = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
    // Mobil optimizasyonu: Daha yumuşak kaydırma
    document.querySelector('#converter-form')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center'
    });
  };

  // Tüm kurları görüntüle fonksiyonu
  const viewAllRates = () => {
    // Burada istediğiniz sayfaya yönlendirme yapabilirsiniz
    alert('Tüm kurlar yakında burada olacak!');
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 bg-gradient-to-b from-white to-[#eddc0f]/5 dark:from-[#0b0b0a] dark:to-[#0b0b0a]/90">
      {/* Arkaplan Efektleri - Mobilde gizlendi */}
      <div className="absolute inset-0 -z-20 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.08] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]"></div>
      <div className="absolute hidden sm:block -right-64 top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-l from-[#eddc0f]/10 to-[#9a8c14]/20 blur-3xl dark:from-[#eddc0f]/5 dark:to-[#9a8c14]/10 animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute hidden sm:block -left-64 bottom-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-[#9a8c14]/10 to-[#eddc0f]/20 blur-3xl dark:from-[#9a8c14]/5 dark:to-[#eddc0f]/10 animate-pulse-slow animation-delay-4000"></div>
      
      {/* Animasyonlu Para Simgeleri - Mobilde gizlendi */}
      <div className="absolute hidden sm:block top-10 left-[15%] z-20 animate-float-slow opacity-40">
        <div className="text-9xl font-bold bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] dark:from-[#eddc0f] dark:to-[#9a8c14] bg-clip-text text-transparent transform rotate-[15deg] drop-shadow-[0_0_15px_rgba(237,220,15,0.4)]">$</div>
      </div>
      <div className="absolute hidden sm:block top-1/4 right-[10%] z-20 animate-float-slow animation-delay-2000 opacity-40">
        <div className="text-8xl font-bold bg-gradient-to-r from-[#9a8c14] to-[#eddc0f] dark:from-[#9a8c14] dark:to-[#eddc0f] bg-clip-text text-transparent transform -rotate-[10deg] drop-shadow-[0_0_15px_rgba(154,140,20,0.4)]">€</div>
      </div>
      <div className="absolute hidden sm:block bottom-1/3 left-[8%] z-20 animate-float-slow animation-delay-1000 opacity-40">
        <div className="text-10xl font-bold bg-gradient-to-r from-[#ea0b0b] to-[#9a8c14] dark:from-[#ea0b0b] dark:to-[#9a8c14] bg-clip-text text-transparent transform rotate-[5deg] drop-shadow-[0_0_15px_rgba(234,11,11,0.4)]">£</div>
      </div>
      <div className="absolute hidden sm:block bottom-20 right-[20%] z-20 animate-float-slow animation-delay-3000 opacity-40">
        <div className="text-8xl font-bold bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] dark:from-[#eddc0f] dark:to-[#9a8c14] bg-clip-text text-transparent transform -rotate-[8deg] drop-shadow-[0_0_15px_rgba(237,220,15,0.4)]">¥</div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto mb-6 sm:mb-10 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <div className="inline-block rounded-lg bg-gradient-to-r from-[#eddc0f]/10 to-[#9a8c14]/10 px-3 py-1 text-sm sm:text-base font-medium text-[#9a8c14] dark:from-[#eddc0f]/20 dark:to-[#9a8c14]/20 dark:text-[#eddc0f] mb-3 sm:mb-4 animate-pulse-slow">
            Kolay ve Hızlı Çeviri
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b0b0a] dark:text-white mb-3 sm:mb-4 relative">
            <span className="relative inline z-10">
              Döviz Çeviri
              <svg className="absolute -z-10 -bottom-0.5 w-full h-3 sm:h-4 left-0 dark:opacity-30" viewBox="0 0 120 8" preserveAspectRatio="none">
                <path d="M0 5 Q 20 4 40 5 Q 60 6 80 5 Q 100 4 120 5 L 120 8 L 0 8 Z" fill="url(#gold-gradient)" />
                <defs>
                  <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#eddc0f" />
                    <stop offset="50%" stopColor="#9a8c14" />
                    <stop offset="100%" stopColor="#eddc0f" />
                  </linearGradient>
                </defs>
              </svg>
            </span> Aracı
            {/* Parlama Efekti - Mobilde gizlendi */}
            <span className="absolute hidden sm:block -top-8 -right-8 h-16 w-16 rounded-full bg-[#eddc0f]/20 blur-xl animate-pulse-slow"></span>
            <span className="absolute hidden sm:block -bottom-4 -left-6 h-12 w-12 rounded-full bg-[#9a8c14]/20 blur-xl animate-pulse-slow animation-delay-2000"></span>
          </h2>
          <p className="text-base sm:text-lg text-[#0b0b0a]/80 dark:text-gray-300 max-w-3xl mx-auto">
            Saniyeler içinde para birimlerini birbirine çevirin ve en güncel kurlardan hesaplama yapın.
            Her zaman <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]">güncel</span> ve 
            <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]"> güvenilir</span> verilerle hizmetinizdeyiz.
          </p>
        </div>
        
        <div className={`max-w-6xl mx-auto relative transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Ana İçerik - Mobil için tek sütunlu */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8">
            {/* Çevirici Alanı */}
            <div className="lg:col-span-3">
              {/* Kart */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm border border-[#eddc0f]/30 dark:border-[#eddc0f]/30 shadow-xl h-full">
                {/* Kart Arka Plan Efekti */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 dark:from-[#0b0b0a]/90 dark:to-[#0b0b0a]/70"></div>
                
                {/* Parıltı Efekti - Mobilde sadeleştirildi */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#eddc0f]/50 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#9a8c14]/50 to-transparent"></div>
                
                <div className="relative p-4 sm:p-8">
                  {/* Form Başlığı */}
                  <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0b0b0a] dark:text-white">Para Birimi Dönüştürücü</h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <HiClock className="mr-1.5 h-4 w-4" />
                      Son güncelleme: {lastUpdateTime}
                    </div>
                  </div>
                  
                  {/* Çevirici Formu */}
                  <div id="converter-form" className="space-y-4 sm:space-y-6">
                    {/* Miktar Girişi - Mobil için optimize edildi */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                        Çevrilecek Miktar
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 p-3 sm:p-4 pr-12 text-base shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white transition-all duration-200"
                          placeholder="Miktar girin"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <div className={`flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-full ${currencyColors[fromCurrency]} shadow-sm`}>
                            <span className="text-sm font-bold">{currencySymbols[fromCurrency]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Para Birimi Seçenekleri - Mobil için optimize edildi */}
                    <div className="grid grid-cols-9 items-center gap-2 sm:gap-4">
                      <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          Kaynak Para Birimi
                        </label>
                        <div className="relative">
                          <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-gray-200 p-3 sm:p-4 pr-10 text-sm sm:text-base shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white transition-all duration-200"
                          >
                            {/* API'den gelen para birimlerini göster */}
                            {currencies.map(currency => {
                              const code = currency.code.split('/')[0];
                              return (
                                <option key={code} value={code}>
                                  {code} ({currencySymbols[code] || code})
                                </option>
                              );
                            })}
                            {/* TRY seçeneğini de ekle */}
                            <option value="TRY">TRY (₺)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Değiştirme Butonu - Mobil için optimize edildi */}
                      <div className="col-span-1 flex items-center justify-center pt-6">
                        <button 
                          onClick={swapCurrencies}
                          className="relative flex items-center justify-center h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-[#eddc0f]/20 hover:bg-[#eddc0f]/30 dark:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/20 text-[#9a8c14] dark:text-[#eddc0f] shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 group"
                        >
                          <HiSwitchHorizontal className="h-4 w-4 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-180" />
                          <span className="absolute -inset-1 rounded-full bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                        </button>
                      </div>
                      
                      <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                          Hedef Para Birimi
                        </label>
                        <div className="relative">
                          <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-gray-200 p-3 sm:p-4 pr-10 text-sm sm:text-base shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white transition-all duration-200"
                          >
                            {/* TRY seçeneğini en başa ekle */}
                            <option value="TRY">TRY (₺)</option>
                            {/* API'den gelen para birimlerini göster */}
                            {currencies.map(currency => {
                              const code = currency.code.split('/')[0];
                              return (
                                <option key={code} value={code}>
                                  {code} ({currencySymbols[code] || code})
                                </option>
                              );
                            })}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* DÖNÜŞÜM SONUCU - Mobil için optimize edildi */}
                  <div className="mt-6 sm:mt-8">
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#eddc0f]/40 dark:border-[#eddc0f]/40 bg-white/80 dark:bg-[#0b0b0a]/50 shadow-2xl backdrop-blur-sm">
                      {/* Arka plan efekti */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#eddc0f]/5 via-white/80 to-[#9a8c14]/5 dark:from-[#eddc0f]/10 dark:via-[#0b0b0a]/80 dark:to-[#9a8c14]/10 pointer-events-none"></div>
                      
                      {/* Üst çizgi parlaklık */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#eddc0f]/70 to-transparent"></div>
                      
                      {/* Başlık */}
                      <div className="relative px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-gradient-to-r from-[#eddc0f]/10 via-[#9a8c14]/10 to-[#eddc0f]/10 dark:from-[#eddc0f]/20 dark:via-[#9a8c14]/20 dark:to-[#eddc0f]/20 border-b border-[#eddc0f]/20 dark:border-[#eddc0f]/20">
                        <h3 className="text-base sm:text-lg font-bold text-[#0b0b0a] dark:text-white flex items-center gap-2">
                          <span className="relative">
                            Dönüşüm Sonucu
                            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] dark:from-[#eddc0f] dark:to-[#9a8c14]"></span>
                          </span>
                        </h3>
                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#eddc0f]/10 to-[#9a8c14]/10 dark:from-[#eddc0f]/20 dark:to-[#9a8c14]/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-[#eddc0f]/20 dark:border-[#eddc0f]/30">
                          <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-[#eddc0f] animate-pulse"></span>
                          <span className="text-[10px] sm:text-xs font-medium text-[#9a8c14] dark:text-[#eddc0f]">Canlı Kur</span>
                        </div>
                      </div>
                  
                      {/* Ana içerik */}
                      <div className="relative p-4 sm:p-6">
                        {/* Büyük dönüşüm gösterimi - Mobil için düzenlendi */}
                        <div className="bg-gradient-to-br from-white/60 to-white/30 dark:from-[#0b0b0a]/60 dark:to-[#0b0b0a]/30 rounded-xl p-3 sm:p-4 border border-[#eddc0f]/30 dark:border-[#eddc0f]/30 shadow-lg">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                            {/* Kaynak para birimi */}
                            <div className="relative flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 bg-gradient-to-r from-[#eddc0f]/10 to-[#eddc0f]/5 dark:from-[#eddc0f]/10 dark:to-[#eddc0f]/5 rounded-lg border border-[#eddc0f]/30 dark:border-[#eddc0f]/30 shadow-sm w-full md:w-auto">
                              <div className={`flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full ${currencyColors[fromCurrency]} shadow-md ring-1 ring-white dark:ring-gray-700`}>
                                <span className="text-base sm:text-lg font-bold">{currencySymbols[fromCurrency]}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] sm:text-xs font-medium text-[#9a8c14]/80 dark:text-[#eddc0f]/80">Çevrilen Miktar</span>
                                <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#9a8c14] to-[#eddc0f] bg-clip-text text-transparent">{amount || '0'}</span>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{fromCurrency}</span>
                              </div>
                            </div>
                  
                            {/* Ok işareti */}
                            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#eddc0f]/20 to-[#9a8c14]/20 dark:from-[#eddc0f]/20 dark:to-[#9a8c14]/20 shadow-sm transform rotate-90 md:rotate-0">
                              <HiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
                              <div className="absolute inset-0 rounded-full bg-[#eddc0f]/10 dark:bg-[#eddc0f]/5 blur animate-pulse"></div>
                            </div>
                  
                            {/* Hedef para birimi */}
                            <div className="relative flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 bg-gradient-to-r from-[#9a8c14]/10 to-[#eddc0f]/5 dark:from-[#9a8c14]/10 dark:to-[#eddc0f]/5 rounded-lg border border-[#9a8c14]/30 dark:border-[#9a8c14]/30 shadow-sm w-full md:w-auto">
                              <div className={`flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full ${currencyColors[toCurrency]} shadow-md ring-1 ring-white dark:ring-gray-700`}>
                                <span className="text-base sm:text-lg font-bold">{currencySymbols[toCurrency]}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] sm:text-xs font-medium text-[#9a8c14]/80 dark:text-[#eddc0f]/80">Sonuç</span>
                                <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#9a8c14] to-[#eddc0f] bg-clip-text text-transparent animate-fade-in">
                                  {loading ? '...' : calculatedAmount}
                                </span>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{toCurrency}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                  
                        {/* Döviz kuru bilgisi - Mobil için düzenlendi */}
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white/80 dark:from-[#0b0b0a]/50 dark:to-[#0b0b0a]/30 border border-gray-100 dark:border-gray-700/50 shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="flex -space-x-2">
                                <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${currencyColors[fromCurrency]} shadow border-2 border-white dark:border-[#0b0b0a] z-10`}>
                                  <span className="text-xs sm:text-sm font-bold">{currencySymbols[fromCurrency]}</span>
                                </div>
                                <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${currencyColors[toCurrency]} shadow border-2 border-white dark:border-[#0b0b0a]`}>
                                  <span className="text-xs sm:text-sm font-bold">{currencySymbols[toCurrency]}</span>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">Güncel Kur</span>
                                <span className="text-sm sm:text-base font-bold text-[#0b0b0a] dark:text-white flex items-center gap-1.5">
                                  1 {fromCurrency} = 
                                  <span className="text-[#9a8c14] dark:text-[#eddc0f]">{currentRate}</span> 
                                  {toCurrency}
                                  <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {loading ? '...' : 
                                      (fromCurrency === 'USD' && toCurrency === 'TRY' ? 
                                        currencies.find(c => c.code === 'USD/TRY')?.change : '+0.12%')}
                                  </span>
                                </span>
                              </div>
                            </div>
                            
                            <button 
                              onClick={refreshRates}
                              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium text-[#0b0b0a] bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] hover:from-[#9a8c14] hover:to-[#eddc0f] shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto group"
                            >
                              <HiRefresh className={`h-4 w-4 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                              <span>{loading ? 'Güncelleniyor...' : 'Kuru Güncelle'}</span>
                            </button>
                          </div>
                        </div>
                  
                        {/* Bilgi satırı */}
                        <div className="mt-3 sm:mt-5 text-center">
                          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic">
                            Son güncelleme: {lastUpdateTime} • Kaynak: Merkez Bankası
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sağ Kenar Bilgileri - Popüler Dönüşümler - Mobil için düzenlendi */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 mt-4 lg:mt-0">
              {/* Popüler Dönüşümler - Mobil için optimize edildi */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm border border-[#eddc0f]/30 dark:border-[#eddc0f]/30 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 dark:from-[#0b0b0a]/90 dark:to-[#0b0b0a]/70"></div>
                
                <div className="relative p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#0b0b0a] dark:text-white mb-3 sm:mb-4 flex items-center">
                    <HiStar className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#eddc0f]" />
                    Popüler Dönüşümler
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {popularConversions.map((conversion, index) => (
                      <div 
                        key={index} 
                        className="p-2 sm:p-3 rounded-lg bg-white/70 dark:bg-[#0b0b0a]/50 hover:bg-[#eddc0f]/5 dark:hover:bg-[#eddc0f]/10 transition-colors duration-200 shadow-sm cursor-pointer transform hover:scale-102 hover:shadow-md active:scale-98"
                        onClick={() => selectPopularConversion(conversion.from, conversion.to)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full ${currencyColors[conversion.from]} shadow-sm`}>
                              <span className="text-xs font-bold">{currencySymbols[conversion.from]}</span>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-[#0b0b0a] dark:text-gray-200">1 {conversion.from}</span>
                          </div>
                          
                          <HiArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                          
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-xs sm:text-sm font-medium text-[#0b0b0a] dark:text-gray-200">{conversion.rate} {conversion.to}</span>
                            <div className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full ${currencyColors[conversion.to]} shadow-sm`}>
                              <span className="text-xs font-bold">{currencySymbols[conversion.to]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={viewAllRates}
                    className="mt-3 sm:mt-4 w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg bg-[#eddc0f]/10 hover:bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/20 text-[#9a8c14] dark:text-[#eddc0f] text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <HiChartBar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Tüm Kurları Görüntüle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-6 sm:mt-10 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs sm:text-sm text-[#0b0b0a]/70 dark:text-gray-400">
            Tüm hesaplamalar güncel piyasa verilerine dayanmaktadır ve sadece bilgi amaçlıdır. 
            Yatırım kararlarınız için finansal danışmanınıza başvurunuz.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;