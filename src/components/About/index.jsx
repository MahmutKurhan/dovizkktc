const About = () => {
  return (
    <section className="py-10 sm:py-16 relative overflow-hidden">
      {/* Arka plan efektleri - Mobilde sadeleştirildi */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eddc0f]/10 to-white dark:from-[#0b0b0a] dark:to-[#0b0b0a]/90 -z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] dark:bg-[url('/grid-pattern-dark.svg')] bg-center opacity-[0.08] dark:opacity-[0.05] -z-10"></div>
      
      {/* Dekoratif efektler - Mobilde gizlendi */}
      <div className="absolute hidden sm:block top-32 right-16 w-96 h-96 bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 rounded-full filter blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute hidden sm:block -bottom-20 -left-20 w-96 h-96 bg-[#9a8c14]/20 dark:bg-[#9a8c14]/10 rounded-full filter blur-3xl -z-10 animate-pulse-slow animation-delay-2000"></div>
      
      <div className="container mx-auto px-4">
        {/* Başlık - Mobil için küçültüldü */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block rounded-lg bg-gradient-to-r from-[#eddc0f]/10 to-[#9a8c14]/10 px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base font-medium text-[#9a8c14] dark:from-[#eddc0f]/20 dark:to-[#9a8c14]/20 dark:text-[#eddc0f] mb-3 sm:mb-4 animate-pulse-slow">
            Ekibimizle Tanışın
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b0b0a] dark:text-white">Hakkımızda</h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#eddc0f] to-[#9a8c14] rounded-full mx-auto my-3 sm:my-4"></div>
        </div>

        {/* Ana içerik - Mobilde dikey, tablet/masaüstünde yatay */}
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          {/* Şirket Fotoğrafı - Mobil için küçültüldü */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              {/* Dekoratif kutuları mobilde küçültüldü */}
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-16 sm:w-24 h-16 sm:h-24 bg-[#eddc0f]/20 rounded-lg"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-[#9a8c14]/20 rounded-lg"></div>
              
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="/dukkan.jpeg" 
                  alt="Döviz Uygulaması Ekibi" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#9a8c14]/70 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <h4 className="text-lg sm:text-xl font-bold mb-0.5 sm:mb-1 drop-shadow-md">QR APEX Ekibi</h4>
                  <p className="text-xs sm:text-sm opacity-90 drop-shadow-md">Finans ve teknoloji uzmanlarından oluşan ekibimiz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hakkımızda Bilgisi - Mobil için optimize edildi */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0b0b0a] dark:text-white mb-3 sm:mb-4">
              Finansal Dünyanın <span className="text-[#9a8c14] dark:text-[#eddc0f]">Güvenilir Rehberi</span>
            </h3>
            
            <p className="text-sm sm:text-base text-[#0b0b0a]/80 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              2023 yılında kurulan şirketimiz, kullanıcılarımıza en doğru ve güncel döviz kuru bilgilerini sağlamak amacıyla yola çıktı. Merkez Bankası ve uluslararası finans kuruluşlarından aldığımız verileri, kullanıcı dostu bir arayüzle sunuyoruz.
            </p>
            
            <p className="text-sm sm:text-base text-[#0b0b0a]/80 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Uzman ekibimiz, finans ve teknoloji alanlarında yıllarca edindiği tecrübeyi, sizlere en iyi hizmeti sunmak için kullanıyor. Amacımız, döviz işlemlerinizde size zaman kazandırmak ve doğru kararlar vermenize yardımcı olmaktır.
            </p>
            
            {/* Misyon kutusu - Mobil için optimize edildi */}
            <div className="bg-[#eddc0f]/5 dark:bg-[#0b0b0a]/80 p-4 sm:p-6 rounded-lg border-l-4 border-[#9a8c14] dark:border-[#eddc0f] shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-[#0b0b0a] dark:text-white mb-1 sm:mb-2">Misyonumuz</h4>
              <p className="text-xs sm:text-sm text-[#0b0b0a]/80 dark:text-gray-300">
                Kullanıcılarımıza en güncel ve doğru döviz kuru bilgilerini sunarak, finansal kararlarında yanlarında olmak.
              </p>
            </div>
            
            {/* İstatistik kutuları - Mobil için tam genişlikte ayarlandı */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-[#0b0b0a]/80 p-3 rounded-lg shadow-md flex items-center space-x-3 border border-[#eddc0f]/20 dark:border-[#eddc0f]/10 hover:border-[#9a8c14]/30 dark:hover:border-[#eddc0f]/30 transition-colors duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 rounded-full flex items-center justify-center text-[#9a8c14] dark:text-[#eddc0f]">
                  <span className="text-base sm:text-lg font-bold">30+</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Para Birimi</p>
                  <p className="text-sm sm:text-base font-medium text-[#0b0b0a] dark:text-white">Destekliyoruz</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#0b0b0a]/80 p-3 rounded-lg shadow-md flex items-center space-x-3 border border-[#eddc0f]/20 dark:border-[#eddc0f]/10 hover:border-[#9a8c14]/30 dark:hover:border-[#eddc0f]/30 transition-colors duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#eddc0f]/20 dark:bg-[#eddc0f]/10 rounded-full flex items-center justify-center text-[#9a8c14] dark:text-[#eddc0f]">
                  <span className="text-base sm:text-lg font-bold">10+</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Profesyonel</p>
                  <p className="text-sm sm:text-base font-medium text-[#0b0b0a] dark:text-white">Finans Uzmanı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Altın/Haki tonlarında dalga efekti - Mobilde gizlendi */}
        <div className="absolute hidden sm:block bottom-0 left-0 right-0 h-8 w-full overflow-hidden z-10">
          <div className="absolute -bottom-1 left-0 right-0 h-16 w-[200%] animate-wave bg-[url('/wave.svg')] bg-repeat-x opacity-10 [mask-image:linear-gradient(to-r,#eddc0f,#9a8c14)]"></div>
        </div>
      </div>
    </section>
  );
};

export default About;