
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCountUp } from "@/hooks/useCountUp";

const HeroSection = () => {
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobile = useIsMobile();
  
  // CountUp hooks for statistics
  const cleanerSkinCount = useCountUp({ end: 98, suffix: '%' });
  const ingredientsCount = useCountUp({ end: 30, suffix: '+' });
  const lastingEffectCount = useCountUp({ end: 24, suffix: 'h' });

  return (
    <section className={`relative ${isMobile ? 'h-[45vh]' : 'h-[80vh] sm:h-screen'} overflow-hidden pt-10 md:pt-16`}>
      {/* Spline 3D Background using the provided embed code */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Using dangerouslySetInnerHTML to properly render the custom element */}
        <div dangerouslySetInnerHTML={{ 
          __html: '<spline-viewer loading-anim-type="spinner-small-light" url="https://prod.spline.design/E1JnXeUPttEDoYtZ/scene.splinecode"></spline-viewer>'
        }} className="w-full h-full" />
      </div>
      
      {/* Bottom overlay to hide Spline watermark - enhanced for mobile */}
      <div className={`absolute bottom-0 left-0 w-full ${isMobile ? 'h-16' : 'h-16'} bg-manscara-offwhite z-10`}></div>
      
      {/* Additional overlay specifically for mobile to cover Spline logo better */}
      {isMobile && (
        <div className="absolute bottom-0 right-0 w-full h-12 bg-manscara-offwhite z-20"></div>
      )}
      
      {/* Specific overlay for the bottom right corner where Spline logo appears */}
      {isMobile && (
        <div className="absolute bottom-0 right-0 w-32 h-20 bg-manscara-offwhite z-30"></div>
      )}
      
      {/* Hero Content - Fixed to always take exactly 50% width on desktop, 50% on mobile */}
      <div className="relative z-20 container h-full flex items-center">
        <div className={`${isMobile ? 'w-1/2' : 'w-1/2'} animate-fade-in`}>
          <div className="flex flex-col justify-center">
            <h1 className={`${isMobile ? 'text-xl' : 'text-5xl md:text-6xl lg:text-7xl'} font-bold leading-tight mb-6 animate-enter`}>
              <span className="font-serif">Manscara</span> <span className={`${isMobile ? 'block' : 'inline'} text-gray-700`}>Face Wash</span>
            </h1>
            
            {/* Description paragraph - hidden on mobile */}
            {!isMobile && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in max-w-md" style={{animationDelay: "0.2s"}}>
                Advanced formula with natural ingredients to cleanse, refresh, and rejuvenate your skin. Developed by dermatologists specifically for men's skin.
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button 
                size={isMobile ? "default" : "lg"} 
                className="bg-manscara-black hover:bg-black text-white hover:scale-105 transition-transform duration-300"
                onClick={scrollToNextSection}
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className="hover:scale-105 transition-transform duration-300"
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats section with horizontal layout on mobile */}
            <div className="mt-6 animate-fade-in" style={{animationDelay: "0.6s"}}>
              <div className="grid grid-cols-3 gap-2 max-w-sm">
                <div ref={cleanerSkinCount.ref} className="hover:scale-105 transition-transform duration-300">
                  <p className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-bold`}>{cleanerSkinCount.value}</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Cleaner Skin</p>
                </div>
                <div ref={ingredientsCount.ref} className="hover:scale-105 transition-transform duration-300">
                  <p className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-bold`}>{ingredientsCount.value}</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Ingredients</p>
                </div>
                <div ref={lastingEffectCount.ref} className="hover:scale-105 transition-transform duration-300">
                  <p className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-bold`}>{lastingEffectCount.value}</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Effect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Button - with pulse animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-white/20 transition-colors"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
