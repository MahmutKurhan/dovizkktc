import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiMail, HiPhone, HiRefresh } from 'react-icons/hi';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGooglePlay, FaApple } from 'react-icons/fa';

const Footer = () => {
  // Döviz kurları için state'ler
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState('');
  
  // API'den döviz kurlarını çekme
  const fetchCurrencyRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://doviz.gokelci.com/api/merkezBank/cek.php');
      
      // API'den gelen veri yapısını kontrol et ve işle
      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        setCurrencies(response.data.data);
        
        if (response.data.lastUpdate) {
          setLastUpdateTime(response.data.lastUpdate);
        } else {
          setLastUpdateTime(new Date().toLocaleString('tr-TR'));
        }
      } else if (response.data && Array.isArray(response.data)) {
        // Alternatif API formatı - verinin doğrudan dizi olduğu durumda
        const formattedCurrencies = response.data.map(item => {
          const code = item.Sembol ? `${item.Sembol}/TRY` : item.code;
          const rate = item.Doviz_Alis ? parseFloat(item.Doviz_Alis) : (parseFloat(item.buying) || 0);
          const buying = item.Doviz_Alis ? parseFloat(item.Doviz_Alis) : (parseFloat(item.buying) || 0);
          const selling = item.Doviz_Satis ? parseFloat(item.Doviz_Satis) : (parseFloat(item.selling) || 0);
          
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
  
  // Component yüklendiğinde kurları getir
  useEffect(() => {
    fetchCurrencyRates();
  }, []);
  
  // Popüler para birimleri
  const usdCurrency = currencies.find(c => c.code === 'USD/TRY');
  const eurCurrency = currencies.find(c => c.code === 'EUR/TRY');
  const gbpCurrency = currencies.find(c => c.code === 'GBP/TRY');
  const jpyCurrency = currencies.find(c => c.code === 'JPY/TRY');

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#eddc0f]/5 to-white dark:from-[#0b0b0a] dark:to-[#0b0b0a]/95 text-gray-800 dark:text-white pt-16 pb-8 transition-colors duration-300">
      {/* Arkaplan efektleri - Altın/Haki tonlarına güncellendi */}
      <div className="absolute inset-0 -z-10 bg-[url('/grid-pattern.svg')] dark:bg-[url('/grid-pattern-dark.svg')] bg-center opacity-[0.04] dark:opacity-[0.03]"></div>
      <div className="absolute -top-24 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-l from-[#eddc0f]/5 to-[#9a8c14]/10 dark:from-[#eddc0f]/5 dark:to-[#9a8c14]/10 blur-3xl"></div>
      <div className="absolute -bottom-24 left-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-r from-[#9a8c14]/5 to-[#eddc0f]/10 dark:from-[#9a8c14]/5 dark:to-[#eddc0f]/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Hakkımızda - Altın/Haki tonlarına güncellendi */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <img 
                src="/APXQR.svg" 
                alt="Döviz Uygulaması Logo" 
                className="h-7 mr-2"
              />
              <span className="bg-gradient-to-r from-[#9a8c14] to-[#eddc0f] dark:from-[#eddc0f] dark:to-[#9a8c14] bg-clip-text text-transparent">
                Döviz Uygulaması
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              Güncel döviz kurları, çevirici ve profesyonel finans araçları ile hizmetinizdeyiz. Anlık ve doğru verilerle güvenilir çözümler sunuyoruz.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="h-10 w-10 rounded-full bg-[#eddc0f]/10 hover:bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/20 flex items-center justify-center transition-colors duration-200">
                <FaTwitter className="h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#eddc0f]/10 hover:bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/20 flex items-center justify-center transition-colors duration-200">
                <FaFacebook className="h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#eddc0f]/10 hover:bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/20 flex items-center justify-center transition-colors duration-200">
                <FaInstagram className="h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#eddc0f]/10 hover:bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/20 flex items-center justify-center transition-colors duration-200">
                <FaLinkedin className="h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
              </a>
            </div>
          </div>
          
          {/* Mobil Uygulama İndirme Bölümü */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-white flex items-center">
              <span className="bg-gradient-to-r from-[#9a8c14] to-[#eddc0f] dark:from-[#eddc0f] dark:to-[#9a8c14] bg-clip-text text-transparent">
                Mobil Uygulamamız
              </span>
            </h3>
            
            <div className="flex flex-col space-y-3">
              <a 
                href="https://play.google.com/store/apps/details?id=com.dovizuygulamasi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 bg-[#0b0b0a] hover:bg-[#1a1a19] dark:bg-[#121212] dark:hover:bg-[#1a1a19] text-white rounded-lg shadow-lg transition-all duration-200 border border-[#eddc0f]/20 dark:border-[#eddc0f]/20 group hover:scale-[1.02]"
              >
                <div className="h-9 w-9 bg-black rounded-md flex items-center justify-center mr-3 shadow-inner">
                  <FaGooglePlay className="h-5 w-5 text-[#eddc0f] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">İNDİR</div>
                  <div className="text-sm font-semibold">Google Play Store</div>
                </div>
              </a>
              
              <a 
                href="https://apps.apple.com/app/id123456789" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center px-4 py-3 bg-[#0b0b0a] hover:bg-[#1a1a19] dark:bg-[#121212] dark:hover:bg-[#1a1a19] text-white rounded-lg shadow-lg transition-all duration-200 border border-[#eddc0f]/20 dark:border-[#eddc0f]/20 group hover:scale-[1.02]"
              >
                <div className="h-9 w-9 bg-black rounded-md flex items-center justify-center mr-3 shadow-inner">
                  <FaApple className="h-6 w-6 text-[#eddc0f] group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">İNDİR</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
            
          </div>
          
          {/* Döviz Kurları - Altın/Haki tonlarına güncellendi */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Popüler Kurlar</h3>
            <ul className="space-y-2">
              {loading ? (
                <>
                  <li className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></li>
                  <li className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></li>
                  <li className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></li>
                  <li className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded"></li>
                </>
              ) : (
                <>
                  {usdCurrency && (
                    <li className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f] flex items-center justify-center mr-2 text-xs font-bold">$</span>
                        USD/TRY
                      </span>
                      <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]">{usdCurrency.rate.toFixed(2)}</span>
                    </li>
                  )}
                  {eurCurrency && (
                    <li className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f] flex items-center justify-center mr-2 text-xs font-bold">€</span>
                        EUR/TRY
                      </span>
                      <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]">{eurCurrency.rate.toFixed(2)}</span>
                    </li>
                  )}
                  {gbpCurrency && (
                    <li className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f] flex items-center justify-center mr-2 text-xs font-bold">£</span>
                        GBP/TRY
                      </span>
                      <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]">{gbpCurrency.rate.toFixed(2)}</span>
                    </li>
                  )}
                  {jpyCurrency && (
                    <li className="text-gray-600 dark:text-gray-300 text-sm flex items-center justify-between">
                      <span className="flex items-center">
                        <span className="h-6 w-6 rounded-full bg-[#ea0b0b]/10 text-[#ea0b0b] dark:bg-[#ea0b0b]/10 dark:text-[#ea0b0b] flex items-center justify-center mr-2 text-xs font-bold">¥</span>
                        JPY/TRY
                      </span>
                      <span className="font-medium text-[#9a8c14] dark:text-[#eddc0f]">{jpyCurrency.rate.toFixed(2)}</span>
                    </li>
                  )}
                  {!usdCurrency && !eurCurrency && !gbpCurrency && !jpyCurrency && (
                    <li className="text-gray-500 dark:text-gray-400 text-sm">
                      Döviz kurları yüklenemedi. Lütfen daha sonra tekrar deneyin.
                    </li>
                  )}
                </>
              )}
            </ul>
            
            {/* Güncelleme bilgisini ve butonu içeren kısım */}
            <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center mb-1.5">
                Son güncelleme: {lastUpdateTime || 'Henüz güncelleme yok'}
              </div>
              <button 
                onClick={fetchCurrencyRates}
                disabled={loading} 
                className="text-xs text-[#9a8c14] dark:text-[#eddc0f] font-medium flex items-center justify-center mx-auto"
              >
                <HiRefresh className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Kurları yenile
              </button>
            </div>
          </div>
          {/* İletişim - Altın/Haki tonlarına güncellendi */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">İletişim</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                <HiMail className="h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f] mr-2 mt-0.5" />
                <span>iletisim@dovizuygulamasi.com</span>
              </li>
              <li className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                <HiPhone className="h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f] mr-2 mt-0.5" />
                <span>+90 (212) 123 45 67</span>
              </li>
            </ul>

          </div>
        </div>
        
        {/* Alt Çizgi - Altın/Haki tonlarına güncellendi */}
        <div className="pt-8 border-t border-[#eddc0f]/10 dark:border-[#eddc0f]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Döviz Uygulaması. Tüm hakları saklıdır.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-[#9a8c14] dark:text-gray-400 dark:hover:text-[#eddc0f] text-xs transition-colors duration-200">Gizlilik Politikası</a>
              <a href="#" className="text-gray-500 hover:text-[#9a8c14] dark:text-gray-400 dark:hover:text-[#eddc0f] text-xs transition-colors duration-200">Kullanım Koşulları</a>
              <a href="#" className="text-gray-500 hover:text-[#9a8c14] dark:text-gray-400 dark:hover:text-[#eddc0f] text-xs transition-colors duration-200">Yasal Uyarı</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;