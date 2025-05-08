const CurrencyCard = ({ currencies = [], loading }) => {
  // Hata ayıklama için gelen veriyi konsola yazdır
  console.log('CurrencyCard - Gelen currencies:', currencies);
  
  // En popüler 4 para birimiyle sınırla
  const topCurrencies = currencies.slice(0, 4);
  console.log('CurrencyCard - İşlenen topCurrencies:', topCurrencies);
  
  // Para birimi sembol haritası
  const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'TRY': '₺',
    'BTC': '₿',
    'RUB': '₽',
    'CNY': '¥',
  };
  
  // Para birimi arka plan renk haritası - Altın/Haki tonlarla güncellendi
  const currencyColors = {
    'USD': 'bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]',
    'EUR': 'bg-[#9a8c14]/20 text-[#9a8c14] dark:bg-[#9a8c14]/10 dark:text-[#eddc0f]',
    'GBP': 'bg-[#eddc0f]/15 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]',
    'JPY': 'bg-[#9a8c14]/15 text-[#9a8c14] dark:bg-[#9a8c14]/10 dark:text-[#eddc0f]',
    'TRY': 'bg-[#eddc0f]/25 text-[#9a8c14] dark:bg-[#eddc0f]/15 dark:text-[#eddc0f]',
    'BTC': 'bg-[#9a8c14]/25 text-[#9a8c14] dark:bg-[#9a8c14]/15 dark:text-[#eddc0f]',
    'RUB': 'bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]',
    'CNY': 'bg-[#9a8c14]/20 text-[#9a8c14] dark:bg-[#9a8c14]/10 dark:text-[#eddc0f]',
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all hover:shadow-[#eddc0f]/10 dark:bg-[#0b0b0a]/90 dark:shadow-none dark:hover:shadow-none border border-gray-100 dark:border-gray-700">
      {/* Kart Başlık - Altın/Haki Renklere Güncellendi */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#eddc0f] to-[#9a8c14] dark:from-[#eddc0f] dark:to-[#9a8c14]"></div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Popüler Kurlar</h3>
        </div>
        <div className={`flex items-center gap-2 rounded-full ${loading ? 'bg-[#9a8c14]/20 text-[#9a8c14] dark:bg-[#9a8c14]/30 dark:text-[#eddc0f]' : 'bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/30 dark:text-[#eddc0f]'} px-3 py-1 text-xs font-medium shadow-sm`}>
          <span className={`relative flex h-2 w-2 ${loading ? 'animate-pulse': ''}`}>
            <span className={`absolute inline-flex h-full w-full rounded-full ${loading ? 'bg-[#9a8c14]' : 'bg-[#eddc0f]'} opacity-75 animate-ping`}></span>
            <span className={`relative inline-flex h-2 w-2 rounded-full ${loading ? 'bg-[#9a8c14]' : 'bg-[#eddc0f]'}`}></span>
          </span>
          {loading ? 'Güncelleniyor...' : 'Canlı Veri'}
        </div>
      </div>
      
      {/* Para Birimleri Listesi */}
      <div className="grid grid-cols-1 gap-3">
        {topCurrencies.length > 0 ? (
          topCurrencies.map((currency, index) => {
            const baseCurrency = currency.code.split('/')[0];
            const symbol = currencySymbols[baseCurrency] || baseCurrency.charAt(0);
            const colorClass = currencyColors[baseCurrency] || 'bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f]';
            
            return (
              <div key={index} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-all hover:bg-[#eddc0f]/5 hover:shadow-sm dark:border-gray-700 dark:hover:bg-[#eddc0f]/5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full ${colorClass} shadow-sm`}>
                    <span className="text-lg font-bold">{symbol}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{currency.code}</h4>
                    <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${currency.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-[#ea0b0b]/10 text-[#ea0b0b] dark:bg-[#ea0b0b]/20 dark:text-[#ea0b0b]/90'}`}>
                    {currency.trend === 'up' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 13a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 13H12z" clipRule="evenodd" />
                      </svg>
                    )}
                    {currency.change}
                  </span>
                  </div>
                </div>
                
                {/* Alış/Satış değerleri - Altın/Haki ve Kırmızı renkleri */}
                <div className="flex flex-col items-end">
                  <div className="flex gap-1 items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Alış:</span>
                    <span className="text-sm font-bold text-[#9a8c14] dark:text-[#eddc0f]">{Number(currency.buying).toFixed(4)}</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Satış:</span>
                    <span className="text-sm font-bold text-[#ea0b0b] dark:text-[#ea0b0b]">{Number(currency.selling).toFixed(4)}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Yükleme iskelet ekranı - Daha hafif altın tonları
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#eddc0f]/10 animate-pulse dark:bg-[#eddc0f]/5"></div>
                <div className="space-y-2">
                  <div className="h-4 w-20 rounded bg-[#9a8c14]/10 animate-pulse dark:bg-[#9a8c14]/5"></div>
                  <div className="h-3 w-16 rounded bg-[#9a8c14]/10 animate-pulse dark:bg-[#9a8c14]/5"></div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="h-4 w-24 rounded bg-[#eddc0f]/10 animate-pulse dark:bg-[#eddc0f]/5"></div>
                <div className="h-4 w-24 rounded bg-[#eddc0f]/10 animate-pulse dark:bg-[#eddc0f]/5"></div>
                <div className="h-4 w-12 rounded-full bg-[#9a8c14]/10 animate-pulse dark:bg-[#9a8c14]/5"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrencyCard;