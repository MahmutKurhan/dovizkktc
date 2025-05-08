import { useState, useEffect, useRef } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      position: "Finans Uzmanı, XYZ Yatırım",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Bu uygulama sayesinde döviz kurlarını takip etmek çok kolay hale geldi. Canlı veriler ve kullanıcı dostu arayüzü ile tüm finansal işlemlerimde vazgeçilmez bir araç oldu."
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      position: "İhracat Müdürü, ABC Şirketi",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Şirketimizin uluslararası ödemelerinde kur takibi yapmak için mükemmel bir uygulama. Grafik analizleri ve anlık bildirimler sayesinde en iyi kur oranlarını yakalayabiliyoruz."
    },
    {
      id: 3,
      name: "Mehmet Demir",
      position: "Serbest Yatırımcı",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      rating: 4,
      text: "Döviz çevirici özelliği ile seyahatlerimde bütçemi planlamak çok daha kolay oldu. Ayrıca geçmiş kur verilerini görebilmek yatırım kararlarımda bana yardımcı oluyor."
    },
    {
      id: 4,
      name: "Zeynep Şahin",
      position: "E-ticaret İşletmecisi",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
      rating: 5,
      text: "Yurtdışından ürün ithal ettiğim için döviz kurlarını sürekli takip etmem gerekiyor. Bu uygulama sayesinde artık tüm para birimlerini tek bir yerden kolayca izleyebiliyorum."
    },
    {
      id: 5,
      name: "Can Özkan",
      position: "Yazılım Mühendisi",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      rating: 5,
      text: "Kullanıcı arayüzü ve performansı gerçekten etkileyici. Diğer finans uygulamalarına kıyasla çok daha hızlı ve kararlı çalışıyor. Ayrıca karanlık mod seçeneği harika!"
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    autoPlayRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#eddc0f]/5 dark:from-[#0b0b0a] dark:to-[#0b0b0a]/90 relative overflow-hidden">
      {/* Dekoratif arka plan - Altın/Haki tonlarına güncellendi */}
      <div className="absolute -top-24 right-16 w-96 h-96 bg-[#eddc0f]/10 dark:bg-[#eddc0f]/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-16 w-96 h-96 bg-[#9a8c14]/10 dark:bg-[#9a8c14]/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] dark:bg-[url('/grid-pattern-dark.svg')] bg-center opacity-[0.03] dark:opacity-[0.025] -z-10"></div>
      
      {/* Büyük alıntı işaretleri - rengi güncellendi */}
      <div className="hidden lg:block absolute top-1/2 left-8 transform -translate-y-1/2 text-[#eddc0f]/20 dark:text-[#eddc0f]/10 opacity-20">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] dark:from-[#eddc0f] dark:to-[#9a8c14] inline-block text-transparent bg-clip-text mb-2">
            Kullanıcı Deneyimleri
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Uygulamamızı kullanan müşterilerimizin deneyimlerini ve geri bildirimlerini keşfedin.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Slayt kontrolleri - büyük ekranlar - Altın/Haki tonlarına güncellendi */}
          <div className="hidden md:block">
            <button 
              onClick={prevSlide} 
              className="absolute top-1/2 -left-16 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#0b0b0a] text-[#9a8c14] dark:text-[#eddc0f] flex items-center justify-center shadow-lg hover:bg-[#eddc0f]/10 dark:hover:bg-[#0b0b0a]/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#eddc0f]/50 dark:focus:ring-[#eddc0f]/30 z-10"
              aria-label="Önceki yorum"
            >
              <HiChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute top-1/2 -right-16 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#0b0b0a] text-[#9a8c14] dark:text-[#eddc0f] flex items-center justify-center shadow-lg hover:bg-[#eddc0f]/10 dark:hover:bg-[#0b0b0a]/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#eddc0f]/50 dark:focus:ring-[#eddc0f]/30 z-10"
              aria-label="Sonraki yorum"
            >
              <HiChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Ana slayt gösterisi - Altın/Haki tonlarına güncellendi */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-[#0b0b0a] border border-gray-100 dark:border-gray-800">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full p-6 md:p-10 flex flex-col md:flex-row items-center"
                >
                  <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-[#0b0b0a]/90 shadow-lg">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 rounded-full px-3 py-1 flex items-center shadow-md">
                        {[...Array(5)].map((_, i) => (
                          <HiStar 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#eddc0f]' : 'text-gray-300 dark:text-gray-700'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-10">
                    <blockquote className="text-gray-600 dark:text-gray-300 text-lg italic leading-relaxed mb-4 relative">
                      <span className="absolute -top-4 -left-2 text-4xl text-[#eddc0f]/30 dark:text-[#eddc0f]/20"></span>
                      {testimonial.text}
                      <span className="absolute -bottom-4 -right-2 text-4xl text-[#eddc0f]/30 dark:text-[#eddc0f]/20"></span>
                    </blockquote>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 dark:text-white">{testimonial.name}</span>
                      <span className="text-[#9a8c14] dark:text-[#eddc0f] text-sm">{testimonial.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* İlerleme göstergesi - Altın/Haki tonlarına güncellendi */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 focus:outline-none 
                    ${currentIndex === index 
                      ? 'bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] dark:from-[#eddc0f] dark:to-[#9a8c14] w-8' 
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-[#eddc0f]/50 dark:hover:bg-[#eddc0f]/30 w-3'
                    }`}
                  aria-label={`Kullanıcı yorumu ${index + 1}`}
                >
                </button>
              ))}
            </div>
          </div>

          {/* Mobil kontroller - Altın/Haki tonlarına güncellendi */}
          <div className="flex justify-center mt-6 space-x-4 md:hidden">
            <button 
              onClick={prevSlide} 
              className="w-10 h-10 rounded-full bg-white dark:bg-[#0b0b0a]/80 text-[#9a8c14] dark:text-[#eddc0f] flex items-center justify-center shadow-md hover:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eddc0f]/50 dark:focus:ring-[#eddc0f]/30"
              aria-label="Önceki yorum"
            >
              <HiChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide} 
              className="w-10 h-10 rounded-full bg-white dark:bg-[#0b0b0a]/80 text-[#9a8c14] dark:text-[#eddc0f] flex items-center justify-center shadow-md hover:bg-[#eddc0f]/10 dark:hover:bg-[#eddc0f]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#eddc0f]/50 dark:focus:ring-[#eddc0f]/30"
              aria-label="Sonraki yorum"
            >
              <HiChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Ekstra altın/haki tonlu alt dekoratif öğe */}
        <div className="max-w-xl mx-auto mt-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#eddc0f]/10 dark:bg-[#eddc0f]/5 text-[#9a8c14] dark:text-[#eddc0f] text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-[#eddc0f] animate-pulse"></span>
              Kullanıcılarımızın %96 sı uygulamayı tavsiye ediyor
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;