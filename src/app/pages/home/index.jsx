import { useState, useEffect } from 'react';
import { Page } from "components/shared/Page";
import { HiArrowUp } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

// Modüler bileşenleri import et
import Header from 'components/Header';
import Hero from 'components/Hero';
import CurrencyConverter from 'components/CurrencyConverter';
import About from 'components/About';
import Footer from 'components/Footer';

export default function Home() {
  // API'den çekilen döviz kurları için state
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState(100);
  const [convertedAmount, setConvertedAmount] = useState(3215);
  
  // Simüle edilmiş grafik verileri
  const chartData = [
    { date: 'Nis 25', rate: 31.85 },
    { date: 'Nis 26', rate: 31.92 },
    { date: 'Nis 27', rate: 31.98 },
    { date: 'Nis 28', rate: 32.05 },
    { date: 'Nis 29', rate: 32.10 },
    { date: 'Nis 30', rate: 31.95 },
    { date: 'May 1', rate: 32.02 },
    { date: 'May 2', rate: 32.08 },
    { date: 'May 3', rate: 32.15 },
  ];

  // API'den döviz kurlarını çekmek için
  const fetchCurrencyRates = async () => {
    setLoading(true);
    try {
      console.log('API isteği gönderiliyor...');
      const response = await axios.get('https://doviz.gokelci.com/api/merkezBank/cek.php');
      console.log('API yanıtı:', response.data);
      
      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        // API'den gelen verileri formatlama - data array'i içindeki değerleri kullan
        const formattedCurrencies = response.data.data.map(item => {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
            unit: item.unit,
            buying: item.buying,
            selling: item.selling,
            rate: item.rate,
            trend: item.trend,
            change: item.change,
            updatedAt: item.updatedAt
          };
        });
        
        console.log('Formatlanmış veri:', formattedCurrencies);
        setCurrencies(formattedCurrencies);
      } else {
        console.error('API yanıtı beklenen formatta değil:', response.data);
        // API yanıtı uygun değilse varsayılan demo verileri kullan
      }
    } catch (error) {
      console.error('Döviz kurları alınırken hata oluştu:', error);
      // Hata durumunda demo verileri göster
    } finally {
      setLoading(false);
    }
  };

  // Para birimi dönüştürme fonksiyonu
  const handleConvert = () => {
    const rate = currencies.find(c => c.code.startsWith(selectedCurrency + '/'))?.rate || 0;
    setConvertedAmount((amount * rate).toFixed(2));
  };

  // Sayfa yüklendiğinde API'den verileri çek
  useEffect(() => {
    fetchCurrencyRates();
    
    // 5 dakikada bir güncelle
    const interval = setInterval(fetchCurrencyRates, 300000);
    return () => clearInterval(interval);
  }, []);

  // Sayfa yüklendiğinde her zaman dark mode'u etkinleştir
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Döviz değerini güncelle
  useEffect(() => {
    if (currencies.length > 0) {
      handleConvert();
    }
  }, [amount, selectedCurrency, currencies, handleConvert]);

  // Yukarı çık butonu için görünürlük state'i
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Scroll olayını izleme
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Yukarı çık fonksiyonu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Page title="Döviz Kurları | Anlık ve Güncel">
      <Header forceDarkMode={true} />
      
      {/* Hero Bölümü */}
      <div id="hero">
        <Hero 
          currencies={currencies} 
          loading={loading} 
        />
      </div>
      
      {/* Döviz Çevirici Bölümü */}
      <div id="converter">
        <CurrencyConverter 
          amount={amount}
          setAmount={setAmount}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          convertedAmount={convertedAmount}
          chartData={chartData}
          currencies={currencies}
          loading={loading}
          handleConvert={handleConvert}
          fetchCurrencyRates={fetchCurrencyRates}
        />
      </div>
      {/* Kurlar Bölümü */}
      <div id="rates">
        <About />
      </div>
      
      {/* Haberler Bölümü */}
      <div id="news">
        <Footer />
      </div>
      
      {/* WhatsApp İletişim Butonu */}
      <a 
        href="https://wa.me/905001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-5 bottom-5 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        aria-label="WhatsApp ile iletişime geçin"
      >
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping-slow"></div>
        <FaWhatsapp className="h-7 w-7" />
      </a>
      
      {/* Yukarı Çık Butonu */}
      <button
        onClick={scrollToTop}
        className={`fixed right-5 bottom-5 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Sayfanın en üstüne çık"
      >
        <HiArrowUp className="h-6 w-6" />
      </button>
    </Page>
  );
}