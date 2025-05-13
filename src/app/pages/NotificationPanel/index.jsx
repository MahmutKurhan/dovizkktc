import { useState, useEffect } from 'react';
import { 
  HiBell, HiClock, HiOutlinePhotograph, HiUserGroup, HiX, HiCheck, 
  HiExclamation, HiChartBar, HiFilter, HiClipboardList, HiRefresh,
  HiChevronDown, HiOutlineAdjustments, HiTemplate, HiDeviceMobile
} from 'react-icons/hi';

const NotificationPanel = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('normal');
  const [targetUsers, setTargetUsers] = useState('all');
  const [scheduleType, setScheduleType] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('compose');
  const [showPreview, setShowPreview] = useState(false);
  const [deepLink, setDeepLink] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [templates] = useState([
    { id: 1, title: 'Hoş Geldin Bildirimi', content: 'Uygulamamıza hoş geldiniz! Size özel fırsatları kaçırmayın.', priority: 'normal' },
    { id: 2, title: 'Fiyat Değişimi', content: 'Takip ettiğiniz dövizde önemli değişiklik oldu!', priority: 'high' },
    { id: 3, title: 'Yeni Özellik', content: 'Uygulamamıza yeni özellikler ekledik! Hemen keşfedin.', priority: 'normal' }
  ]);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  // Ana ekran seçenekleri
  const [currentDevice, setCurrentDevice] = useState('iphone');
  const devices = {
    iphone: { width: 375, height: 812, name: 'iPhone 13' },
    android: { width: 360, height: 800, name: 'Android' },
    tablet: { width: 768, height: 1024, name: 'Tablet' }
  };

  // Dashboard istatistikleri (demo veriler)
  const stats = [
    { 
      title: 'Gönderilen Bildirimler', 
      value: '1,847', 
      change: '+12.4%', 
      isIncrease: true,
      color: 'from-emerald-500 to-teal-400',
      icon: <HiBell className="h-6 w-6" />
    },
    { 
      title: 'Açılma Oranı', 
      value: '36.5%', 
      change: '+2.8%', 
      isIncrease: true,
      color: 'from-[#eddc0f] to-[#9a8c14]',
      icon: <HiChartBar className="h-6 w-6" />
    },
    { 
      title: 'Ortalama Tepki Süresi', 
      value: '2.3dk', 
      change: '-0.5dk', 
      isIncrease: true,
      color: 'from-violet-500 to-purple-500',
      icon: <HiClock className="h-6 w-6" />
    },
  ];
  
  // Son bildirimler (demo)
  const recentNotifications = [
    { id: 1, title: 'Yeni Fiyat Alarmı', sent: '2 saat önce', openRate: '34%', priority: 'high' },
    { id: 2, title: 'Haftalık Piyasa Özeti', sent: '1 gün önce', openRate: '42%', priority: 'normal' },
    { id: 3, title: 'Bakım Bildirimi', sent: '3 gün önce', openRate: '28%', priority: 'low' },
  ];

  // Tarih ve saat alanları için minimum değerleri ayarla
  const now = new Date();
  const minDate = now.toISOString().split('T')[0]; // YYYY-MM-DD formatı
  
  // Bildirim önceliği için renk sınıfları
  const priorityColors = {
    low: "bg-gray-100 border-gray-300 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300",
    normal: "bg-[#eddc0f]/10 border-[#9a8c14]/30 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:border-[#eddc0f]/30 dark:text-[#eddc0f]",
    high: "bg-[#ea0b0b]/10 border-[#ea0b0b]/30 text-[#ea0b0b] dark:bg-[#ea0b0b]/10 dark:border-[#ea0b0b]/30 dark:text-[#ea0b0b]"
  };

  // Şablon seçme
  const selectTemplate = (template) => {
    setTitle(template.title);
    setContent(template.content);
    setPriority(template.priority);
    setShowTemplateSelector(false);
  };

  // Dosya yükleme işleyicisi
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Dosya önizlemesi oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Önizleme temizleme
  const clearPreview = () => {
    setPreviewImage(null);
  };

  // Bildirim gönderme simülasyonu
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Temel doğrulama
    if (!title || !content) {
      setNotification({
        type: 'error',
        message: 'Lütfen başlık ve içerik alanlarını doldurun.'
      });
      return;
    }
    
    setSending(true);
    
    // Gerçek uygulamada burada API çağrısı yapılacaktır
    setTimeout(() => {
      setSending(false);
      setNotification({
        type: 'success',
        message: 'Bildirim başarıyla gönderildi!'
      });
      
      // Formu sıfırla (gerçek uygulamada isteğe bağlı)
      setTitle('');
      setContent('');
      setPriority('normal');
      setTargetUsers('all');
      setScheduleType('now');
      setScheduledDate('');
      setScheduledTime('');
      setPreviewImage(null);
      setDeepLink('');
      setButtonText('');
      
      // Başarı mesajını 5 saniye sonra temizle
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }, 1500);
  };

  // Bildirim içeriği değiştiğinde önizleme güncellemesi
  useEffect(() => {
    // Önizleme görünümü açıksa
    if (showPreview) {
      // Burada önizleme için gereken işlemler olabilir
    }
  }, [title, content, previewImage, priority, showPreview]);

  // Mobil cihaz önizlemesi için stil hesaplamaları
  const getDeviceStyle = () => {
    const device = devices[currentDevice];
    return {
      width: `${device.width / 3}px`,
      height: `${device.height / 3}px`,
      borderRadius: currentDevice === 'tablet' ? '12px' : '30px'
    };
  };

  return (
    <section className="min-h-screen py-6 sm:py-10">
      <div className="container mx-auto px-4">
        {/* Başlık ve Tabs */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <div className="inline-block rounded-lg bg-gradient-to-r from-[#eddc0f]/10 to-[#9a8c14]/10 px-4 py-1.5 text-sm font-medium text-[#9a8c14] dark:from-[#eddc0f]/20 dark:to-[#9a8c14]/20 dark:text-[#eddc0f] mb-3">
                Yönetim Paneli
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0b0b0a] dark:text-white">
                Bildirim Yönetimi
                <div className="relative mt-1 sm:mt-2">
                  <div className="h-1.5 w-20 bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] rounded-full"></div>
                </div>
              </h2>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <button className="hidden md:flex items-center justify-center h-10 px-4 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <HiFilter className="mr-2 h-5 w-5" />
                <span>Filtrele</span>
              </button>
              <button className="hidden md:flex items-center justify-center h-10 px-4 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <HiRefresh className="mr-2 h-5 w-5" />
                <span>Yenile</span>
              </button>
              <button 
                onClick={() => setActiveTab('compose')} 
                className="flex items-center justify-center h-10 px-4 rounded-lg bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] hover:from-[#9a8c14] hover:to-[#eddc0f] text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <HiBell className="mr-2 h-5 w-5" />
                <span>Yeni Bildirim</span>
              </button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center ${
                activeTab === 'dashboard'
                  ? 'bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f]'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <HiChartBar className="mr-2 h-5 w-5" />
              Gösterge Paneli
            </button>
            <button
              onClick={() => setActiveTab('compose')}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center ${
                activeTab === 'compose'
                  ? 'bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f]'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <HiBell className="mr-2 h-5 w-5" />
              Bildirim Oluştur
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center ${
                activeTab === 'history'
                  ? 'bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f]'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <HiClipboardList className="mr-2 h-5 w-5" />
              Bildirim Geçmişi
            </button>
            <button
              onClick={() => setActiveTab('segments')}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center ${
                activeTab === 'segments'
                  ? 'bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f]'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              <HiUserGroup className="mr-2 h-5 w-5" />
              Kullanıcı Segmentleri
            </button>
          </div>
        </div>
        
        {/* Bildirim mesajı */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center justify-between shadow-md animate-fade-in ${
            notification.type === 'success' 
              ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800/30 dark:text-green-400' 
              : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-800/30 dark:text-red-400'
          }`}>
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center mr-3">
                  <HiCheck className="h-5 w-5" />
                </div>
              ) : (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center mr-3">
                  <HiExclamation className="h-5 w-5" />
                </div>
              )}
              <div>
                <h3 className="font-medium">
                  {notification.type === 'success' ? 'İşlem Başarılı' : 'Hata'}
                </h3>
                <p className="text-sm opacity-90">{notification.message}</p>
              </div>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-[#0b0b0a]/80 rounded-xl shadow-md overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white mr-4`}>
                        {stat.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {stat.title}
                        </h3>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <span className={`ml-2 text-sm font-medium ${
                            stat.isIncrease ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${stat.color}`} 
                          style={{ width: `${Math.random() * 60 + 30}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Ek İstatistikler ve Grafikler */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#0b0b0a]/80 rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <HiChartBar className="mr-2 h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
                    Bildirim Analitikleri
                  </h3>
                </div>
                <div className="p-5">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex rounded-full bg-[#eddc0f]/10 p-3 text-[#9a8c14] dark:text-[#eddc0f] mb-4">
                        <HiChartBar className="h-8 w-8" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Burada bildirim analitikleri grafikleri yer alacak.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Gönderim ve açılma oranları, en aktif kullanıcılar, bildirim etkileşimleri
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#0b0b0a]/80 rounded-xl shadow-md overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <HiClock className="mr-2 h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
                    Son Bildirimler
                  </h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentNotifications.map((item) => (
                    <div key={item.id} className="p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          item.priority === 'low' ? 'bg-gray-400' :
                          item.priority === 'normal' ? 'bg-[#9a8c14] dark:bg-[#eddc0f]' :
                          'bg-[#ea0b0b]'
                        }`}></div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>{item.sent}</span>
                            <span className="mx-1.5">•</span>
                            <span className="text-green-600 dark:text-green-400">{item.openRate} açılma</span>
                          </div>
                        </div>
                        <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                          <HiChevronDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button className="text-sm font-medium text-[#9a8c14] hover:text-[#eddc0f] dark:text-[#eddc0f] dark:hover:text-[#eddc0f]/80">
                    Tümünü Görüntüle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'compose' && (
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 animate-fade-in">
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-[#0b0b0a]/90 rounded-xl shadow-xl overflow-hidden">
                <div className="border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-[#eddc0f]/5 to-[#9a8c14]/5 dark:from-[#eddc0f]/10 dark:to-[#9a8c14]/10 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f] mr-3">
                        <HiBell className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0b0b0a] dark:text-white">
                        Yeni Bildirim Oluştur
                      </h3>
                    </div>
                    
                    {/* Şablon seçici buton */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowTemplateSelector(!showTemplateSelector)} 
                        className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <HiTemplate className="h-4 w-4" />
                        <span>Şablonlar</span>
                        <HiChevronDown className={`h-4 w-4 transition-transform duration-200 ${showTemplateSelector ? 'transform rotate-180' : ''}`} />
                      </button>
                      
                      {/* Şablon seçici dropdown */}
                      {showTemplateSelector && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
                          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                            <h4 className="font-medium text-gray-900 dark:text-white">Bildirim Şablonları</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hızlı başlangıç için bir şablon seçin</p>
                          </div>
                          <div className="max-h-52 overflow-y-auto">
                            {templates.map((template) => (
                              <button
                                key={template.id}
                                onClick={() => selectTemplate(template)}
                                className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-start"
                              >
                                <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                                  template.priority === 'low' ? 'bg-gray-400' :
                                  template.priority === 'normal' ? 'bg-[#9a8c14] dark:bg-[#eddc0f]' :
                                  'bg-[#ea0b0b]'
                                }`}></div>
                                <div>
                                  <h5 className="font-medium text-sm text-gray-900 dark:text-white">{template.title}</h5>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{template.content}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                          <div className="p-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                            <button className="w-full text-xs text-[#9a8c14] dark:text-[#eddc0f] hover:underline text-center">
                              Şablonları Yönet
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                  <div className="space-y-5">
                    {/* Bildirim Başlığı */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bildirim Başlığı <span className="text-[#ea0b0b]">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Bildirim başlığını girin"
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                        required
                      />
                    </div>
                    
                    {/* Bildirim İçeriği */}
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bildirim İçeriği <span className="text-[#ea0b0b]">*</span>
                      </label>
                      <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="3"
                        placeholder="Bildirim içeriğini girin"
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white resize-none"
                        required
                      />
                      <div className="mt-1 flex justify-end">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Maks. 160 karakter
                        </span>
                      </div>
                    </div>
                    
                    {/* Bildirim Butonu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="button-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bildirim Butonu (Opsiyonel)
                        </label>
                        <input
                          type="text"
                          id="button-text"
                          value={buttonText}
                          onChange={(e) => setButtonText(e.target.value)}
                          placeholder="Ör: Fırsatları Keşfet"
                          className="w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="deep-link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Yönlendirme Linki (Opsiyonel)
                        </label>
                        <input
                          type="text"
                          id="deep-link"
                          value={deepLink}
                          onChange={(e) => setDeepLink(e.target.value)}
                          placeholder="Ör: doviz://parity/USD-TRY"
                          className="w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    {/* Tercihler satırı - Öncelik ve Hedef */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Bildirim Önceliği */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bildirim Önceliği
                        </label>
                        <div className="flex gap-2">
                          {['low', 'normal', 'high'].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPriority(p)}
                              className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-all flex items-center justify-center ${
                                priority === p 
                                  ? `${priorityColors[p]} shadow-sm` 
                                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                              }`}
                            >
                              {p === 'low' && (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-gray-400 mr-2"></span>
                                  Düşük
                                </>
                              )}
                              {p === 'normal' && (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-[#9a8c14] dark:bg-[#eddc0f] mr-2"></span>
                                  Normal
                                </>
                              )}
                              {p === 'high' && (
                                <>
                                  <span className="h-2 w-2 rounded-full bg-[#ea0b0b] mr-2"></span>
                                  Yüksek
                                </>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Hedef Kullanıcılar */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Hedef Kullanıcılar
                        </label>
                        <div className="relative">
                          <select
                            value={targetUsers}
                            onChange={(e) => setTargetUsers(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-gray-200 p-3 pr-10 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                          >
                            <option value="all">Tüm Kullanıcılar</option>
                            <option value="active">Aktif Kullanıcılar</option>
                            <option value="premium">Premium Kullanıcılar</option>
                            <option value="new">Yeni Kayıt Olanlar</option>
                            <option value="custom">Özel Segment</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <HiUserGroup className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="mt-1.5">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            <span className="text-[#9a8c14] dark:text-[#eddc0f] font-medium">1.2M</span> kullanıcı bu kritere uyuyor
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Zamanlama */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Gönderim Zamanı
                      </label>
                      <div className="flex gap-3 mb-3">
                        {['now', 'scheduled'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setScheduleType(type)}
                            className={`px-4 py-2 rounded-md border text-sm font-medium transition-all flex items-center ${
                              scheduleType === type 
                                ? 'bg-[#eddc0f]/10 border-[#9a8c14]/30 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:border-[#eddc0f]/30 dark:text-[#eddc0f] shadow-sm' 
                                : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                          >
                            {type === 'now' && (
                              <>
                                <HiBell className="mr-2 h-4 w-4" />
                                Hemen Gönder
                              </>
                            )}
                            {type === 'scheduled' && (
                              <>
                                <HiClock className="mr-2 h-4 w-4" />
                                Zamanla
                              </>
                            )}
                          </button>
                        ))}
                      </div>
                      
                      {scheduleType === 'scheduled' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700">
                          <div>
                            <label htmlFor="scheduleDate" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Tarih
                            </label>
                            <input
                              type="date"
                              id="scheduleDate"
                              value={scheduledDate}
                              onChange={(e) => setScheduledDate(e.target.value)}
                              min={minDate}
                              className="w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="scheduleTime" className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Saat
                            </label>
                            <input
                              type="time"
                              id="scheduleTime"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              className="w-full rounded-lg border border-gray-200 p-3 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Görsel Ekleme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Görsel Ekle (Opsiyonel)
                      </label>
                      
                      {!previewImage ? (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/20">
                          <div className="space-y-2 text-center">
                            <div className="mx-auto h-12 w-12 text-gray-400 flex items-center justify-center">
                              <HiOutlinePhotograph className="h-8 w-8" />
                            </div>
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                              <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-[#9a8c14] dark:text-[#eddc0f] hover:text-[#eddc0f] dark:hover:text-[#eddc0f]/80 focus-within:outline-none">
                                <span>Dosya Seç</span>
                                <input 
                                  id="image-upload" 
                                  name="image" 
                                  type="file" 
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="sr-only" 
                                />
                              </label>
                              <p className="pl-1">veya sürükle ve bırak</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, GIF (max. 2MB)
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center">
                          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img 
                              src={previewImage} 
                              alt="Görsel önizleme" 
                              className="w-full h-full object-cover" 
                            />
                            <button
                              type="button"
                              onClick={clearPreview}
                              className="absolute top-2 right-2 bg-gray-800/70 rounded-full p-1.5 text-white hover:bg-gray-800 transition-colors"
                            >
                              <HiX className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Gelişmiş Ayarlar Bölümü */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="w-full p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        <div className="flex items-center">
                          <HiOutlineAdjustments className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                          <span className="font-medium">Ek Seçenekler</span>
                        </div>
                        <HiChevronDown className={`h-5 w-5 transition-transform duration-200 ${showPreview ? 'transform rotate-180' : ''}`} />
                      </button>
                      
                      {showPreview && (
                        <div className="p-4 bg-white dark:bg-[#0b0b0a]/60 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Ses
                              </label>
                              <div className="relative">
                                <select
                                  className="w-full appearance-none rounded-lg border border-gray-200 p-2.5 pr-10 text-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                                >
                                  <option value="default">Varsayılan Ses</option>
                                  <option value="alert">Uyarı Sesi</option>
                                  <option value="notification">Bildirim Sesi</option>
                                  <option value="none">Ses Yok</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                  <HiChevronDown className="h-5 w-5" />
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Titreşim
                              </label>
                              <div className="relative">
                                <select
                                  className="w-full appearance-none rounded-lg border border-gray-200 p-2.5 pr-10 text-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:border-gray-700 dark:bg-[#0b0b0a]/80 dark:text-white"
                                >
                                  <option value="default">Varsayılan Titreşim</option>
                                  <option value="short">Kısa Titreşim</option>
                                  <option value="long">Uzun Titreşim</option>
                                  <option value="none">Titreşim Yok</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                  <HiChevronDown className="h-5 w-5" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Bildirim Yaşam Süresi
                              </label>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                1 hafta
                              </span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="30"
                              defaultValue="7"
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-[#9a8c14] dark:accent-[#eddc0f]"
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span>1 gün</span>
                              <span>15 gün</span>
                              <span>30 gün</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Gönder Butonu */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={sending}
                        className={`w-full py-3.5 px-5 rounded-lg text-[#0b0b0a] font-medium relative overflow-hidden group ${
                          sending ? 'opacity-80 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-gradient-to-r from-[#eddc0f] via-[#9a8c14] to-[#eddc0f] group-hover:bg-gradient-to-l"></span>
                        <span className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-20 bg-white"></span>
                        <span className="relative flex items-center justify-center gap-2">
                          {sending ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-[#0b0b0a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Gönderiliyor...
                            </>
                          ) : (
                            <>
                              <HiBell className="h-5 w-5" />
                              Bildirimi Gönder
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                    
                    {/* Altbilgi notu */}
                    <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                      <span className="flex items-center justify-center gap-1">
                        <HiClock className="h-3.5 w-3.5" />
                        Bildirimler genellikle birkaç dakika içinde iletilir
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Önizleme Kısmı */}
            <div className="lg:col-span-3">
              <div className="sticky top-8 bg-white dark:bg-[#0b0b0a]/90 rounded-xl shadow-xl overflow-hidden">
                <div className="border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-[#eddc0f]/5 to-[#9a8c14]/5 dark:from-[#eddc0f]/10 dark:to-[#9a8c14]/10 p-5">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eddc0f]/20 text-[#9a8c14] dark:bg-[#eddc0f]/10 dark:text-[#eddc0f] mr-3">
                      <HiDeviceMobile className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b0b0a] dark:text-white">
                      Bildirim Önizleme
                    </h3>
                  </div>
                </div>
                
                <div className="p-5">
                  {/* Cihaz Seçici */}
                  <div className="flex justify-center space-x-2 mb-6">
                    {Object.keys(devices).map((device) => (
                      <button
                        key={device}
                        onClick={() => setCurrentDevice(device)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                          currentDevice === device
                            ? 'bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f]'
                            : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                        }`}
                      >
                        {devices[device].name}
                      </button>
                    ))}
                  </div>
                
                  {/* Telefon Önizlemesi */}
                  <div className="flex justify-center">
                    <div 
                      className="relative bg-gray-900 rounded-[30px] border-4 border-gray-800 shadow-xl overflow-hidden transition-all duration-300"
                      style={getDeviceStyle()}
                    >
                      {/* Ekran içeriği */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] overflow-hidden">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-4 py-1 text-white text-xs bg-black/30">
                          <div>9:41</div>
                          <div className="flex items-center space-x-1">
                            <div className="i-signal"></div>
                            <div className="i-wifi"></div>
                            <div className="i-battery"></div>
                          </div>
                        </div>
                        
                        {/* Arka plan görüntüsü (mobil ekran arka planı) */}
                        <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-blue-600 to-purple-800"></div>
                        
                        {/* Bildirim */}
                        <div className="absolute left-0 right-0 top-12 px-2">
                          <div className="bg-white/95 dark:bg-gray-800/95 shadow-lg rounded-xl overflow-hidden animate-fade-in">
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] flex items-center justify-center mr-3">
                                <HiBell className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white text-sm">Döviz</h5>
                                <p className="text-xs text-gray-500 dark:text-gray-400">şimdi</p>
                              </div>
                            </div>
                            
                            <div className="p-3 space-y-2">
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                                {title || "Bildirim Başlığı"}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-300">
                                {content || "Bildirim içeriği burada görünecek. Kullanıcılarınıza ulaşacak mesajı yazın."}
                              </p>
                              
                              {previewImage && (
                                <div className="mt-2 rounded-md overflow-hidden h-32 w-full">
                                  <img 
                                    src={previewImage} 
                                    alt="Bildirim görseli" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              {buttonText && (
                                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                  <button className="w-full py-1.5 text-center text-sm font-medium rounded-md bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] text-white">
                                    {buttonText}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bilgilendirime */}
                  <div className="mt-8 px-4 py-3 rounded-lg bg-[#eddc0f]/10 dark:bg-[#eddc0f]/5 text-xs text-gray-600 dark:text-gray-300 border border-[#9a8c14]/20 dark:border-[#eddc0f]/10">
                    <p className="flex items-start">
                      <HiExclamation className="h-4 w-4 text-[#9a8c14] dark:text-[#eddc0f] mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Bu önizleme görünümü tahminidir. Gerçek bildirim görünümü, kullanıcıların cihaz modeline, işletim sistemi sürümüne ve bildirim ayarlarına göre değişiklik gösterebilir.
                      </span>
                    </p>
                  </div>
                  
                  {/* İstatistik Kartları */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Tahmini Etkiler
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/30">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Tahmini Erişim</div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">245K</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">+12% ortalama üstü</div>
                      </div>
                      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/30">
 <div className="text-xs text-gray-500 dark:text-gray-400">Tahmini Tıklama Oranı</div>
                        <div className="font-bold text-lg text-gray-900 dark:text-white">27.3%</div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">+3.5% geçen aya göre</div>
                      </div>
                    </div>
                    
                    {/* Etkileşim Grafiği */}
                    <div className="mt-5 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b0b0a]/60">
                      <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">Benzer Bildirim Performansı</h5>
                      <div className="h-20 w-full flex items-end gap-1 mb-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div 
                            key={i}
                            className="h-full flex-1 bg-gradient-to-t from-[#eddc0f]/70 to-[#9a8c14]/70 dark:from-[#eddc0f]/40 dark:to-[#9a8c14]/40 rounded-sm"
                            style={{ height: `${Math.random() * 50 + 30}%` }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>00:00</span>
                        <span>12:00</span>
                        <span>23:59</span>
                      </div>
                      <div className="flex items-center justify-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-[#9a8c14] dark:bg-[#eddc0f] rounded-full mr-1"></span>
                          En iyi gönderim saatleri: 09:00-11:00, 19:00-21:00
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Alt bilgi */}
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                    <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-[#9a8c14] dark:text-[#eddc0f] hover:underline">
                      <span>Detaylı Analiz Görüntüle</span>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="animate-fade-in">
            <div className="bg-white dark:bg-[#0b0b0a]/90 rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-800 p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <HiClipboardList className="mr-2 h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
                  Bildirim Geçmişi
                </h3>
              </div>
              
              {/* Filtre & Arama */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-grow">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Bildirim ara..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm shadow-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:bg-[#0b0b0a]/60 dark:text-white"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <select
                        className="appearance-none rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 pr-8 text-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:bg-[#0b0b0a]/60 dark:text-white"
                      >
                        <option value="all">Tüm Bildirimler</option>
                        <option value="high">Yüksek Öncelikli</option>
                        <option value="normal">Normal Öncelikli</option>
                        <option value="low">Düşük Öncelikli</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <HiChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <select
                        className="appearance-none rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 pr-8 text-sm focus:border-[#9a8c14] focus:ring focus:ring-[#eddc0f]/20 focus:ring-opacity-50 dark:bg-[#0b0b0a]/60 dark:text-white"
                      >
                        <option value="recent">Son 30 Gün</option>
                        <option value="quarter">Son 3 Ay</option>
                        <option value="year">Son 1 Yıl</option>
                        <option value="all">Tüm Zamanlar</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <HiChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <button className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b0b0a]/60 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <HiFilter className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Bildirim Listesi */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-900/30">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Başlık
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Gönderim Tarihi
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Hedef
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Açılma Oranı
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        Durum
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#0b0b0a]/60 divide-y divide-gray-200 dark:divide-gray-800">
                    {[
                      { id: 1, title: 'Dolar/TL Fiyat Alarmı', date: '10 Mayıs 2025, 09:15', target: 'Tüm Kullanıcılar', openRate: '42%', status: 'delivered', priority: 'high' },
                      { id: 2, title: 'Haftalık Piyasa Özeti', date: '3 Mayıs 2025, 18:00', target: 'Premium Kullanıcılar', openRate: '68%', status: 'delivered', priority: 'normal' },
                      { id: 3, title: 'Yeni Özellik: Portföy Takibi', date: '25 Nisan 2025, 12:30', target: 'Tüm Kullanıcılar', openRate: '31%', status: 'delivered', priority: 'normal' },
                      { id: 4, title: 'Planlı Bakım Bildirimi', date: '15 Nisan 2025, 22:00', target: 'Aktif Kullanıcılar', openRate: '26%', status: 'delivered', priority: 'low' },
                      { id: 5, title: 'Yeni Güncelleme', date: '8 Nisan 2025, 14:45', target: 'Tüm Kullanıcılar', openRate: '39%', status: 'delivered', priority: 'normal' },
                    ].map((notification) => (
                      <tr key={notification.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
                              notification.priority === 'low' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
                              notification.priority === 'normal' ? 'bg-[#eddc0f]/10 text-[#9a8c14] dark:bg-[#eddc0f]/20 dark:text-[#eddc0f]' :
                              'bg-[#ea0b0b]/10 text-[#ea0b0b] dark:bg-[#ea0b0b]/20 dark:text-[#ea0b0b]'
                            } flex items-center justify-center`}>
                              <HiBell className="h-4 w-4" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1 max-w-xs">
                                {notification.id % 2 === 0 ? 'Bildirim içeriği burada görünür. Uzun içerikler kırpılır...' : 'Takip ettiğiniz döviz çiftinde önemli değişiklik oldu!'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {notification.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {notification.target}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div className="bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] h-2 rounded-full" style={{ width: notification.openRate }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{notification.openRate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Tamamlandı
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="text-[#9a8c14] hover:text-[#eddc0f] dark:text-[#eddc0f] dark:hover:text-[#eddc0f]/80">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Sayfalama */}
              <div className="px-6 py-4 bg-white dark:bg-[#0b0b0a]/60 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Toplam <span className="font-medium text-gray-900 dark:text-white">28</span> bildirim
                  </div>
                  <div className="flex gap-1">
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0b0b0a]/80 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Önceki
                    </button>
                    <div className="hidden md:flex">
                      {[1, 2, 3, 4, 5].map((page) => (
                        <button
                          key={page}
                          className={`inline-flex items-center px-3 py-1.5 border ${
                            page === 1 
                              ? 'border-[#9a8c14] dark:border-[#eddc0f] bg-[#eddc0f]/10 text-[#9a8c14] dark:text-[#eddc0f]' 
                              : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0b0b0a]/80 hover:bg-gray-50 dark:hover:bg-gray-800'
                          } text-sm font-medium mx-0.5 rounded-md`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0b0b0a]/80 hover:bg-gray-50 dark:hover:bg-gray-800">
                      Sonraki
                      <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'segments' && (
          <div className="animate-fade-in">
            <div className="bg-white dark:bg-[#0b0b0a]/90 rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-800 p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <HiUserGroup className="mr-2 h-5 w-5 text-[#9a8c14] dark:text-[#eddc0f]" />
                  Kullanıcı Segmentleri
                </h3>
              </div>
              
              {/* Segment Oluşturma UI'ı buraya gelecek */}
              <div className="p-6">
                <div className="text-center py-8">
                  <div className="inline-flex rounded-full bg-[#eddc0f]/10 p-3 text-[#9a8c14] dark:text-[#eddc0f] mb-4">
                    <HiUserGroup className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Geliştirme Aşamasında</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Kullanıcı segmentleri modülü şu anda geliştirme aşamasındadır. Bu özellik yakında kullanıma sunulacaktır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotificationPanel;