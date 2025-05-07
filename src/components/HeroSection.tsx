
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobile = useIsMobile();

  return (
    <section className="relative h-[90vh] sm:h-screen overflow-hidden">
      {/* Spline 3D Background using the provided embed code */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Using dangerouslySetInnerHTML to properly render the custom element */}
        <div dangerouslySetInnerHTML={{ 
          __html: '<spline-viewer loading-anim-type="spinner-small-light" url="https://prod.spline.design/E1JnXeUPttEDoYtZ/scene.splinecode"></spline-viewer>'
        }} className="w-full h-full" />
      </div>
      
      {/* Bottom overlay to hide Spline watermark */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-manscara-offwhite z-10"></div>
      
      {/* Hero Content - Adjusted to take 50% width on all screen sizes */}
      <div className="relative z-20 container h-full flex items-center">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col justify-center">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold leading-tight mb-6`}>
              <span className="font-serif">Manscara</span> <span className="text-gray-700">Face Wash</span>
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-muted-foreground mb-8`}>
              Advanced formula with natural ingredients to cleanse, refresh, and rejuvenate your skin. Developed by dermatologists specifically for men's skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-manscara-black hover:bg-black text-white"
                onClick={scrollToNextSection}
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
              >
                Learn More
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Report Cleaner Skin</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">30+</p>
                <p className="text-sm text-muted-foreground">Natural Ingredients</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold">24h</p>
                <p className="text-sm text-muted-foreground">Lasting Effect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full animate-bounce"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
