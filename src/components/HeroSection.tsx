
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Spline 3D Background */}
      <iframe 
        src="https://my.spline.design/untitled-u4s8i7PRD7YAgbg8Z2gY3yZo/" 
        frameBorder="0"
        className="absolute inset-0 w-full h-full z-0"
        title="3D Background"
      />
      
      {/* Bottom overlay to hide Spline watermark */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-manscara-offwhite z-10"></div>
      
      {/* Modified: Removing the top overlay and handling this with padding */}
      
      {/* Hero Content - Adjusted padding */}
      <div className="relative z-20 container h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-16 md:pt-0">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="font-serif">Manscara</span> <span className="text-gray-700">Face Wash</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Advanced formula with natural ingredients to cleanse, refresh, and rejuvenate your skin. Developed by dermatologists specifically for men's skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary text-lg">Shop Now</Button>
              <Button variant="outline" className="text-lg">Learn More</Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-manscara-beige border border-white flex items-center justify-center text-xs font-semibold">
                    {i}
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">500+</span> 5-star reviews
              </p>
            </div>
          </div>
          
          {/* This second column is intentionally left empty to maintain layout */}
          <div className="hidden md:block"></div>
        </div>
      </div>
      
      {/* Down arrow button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/80 hover:bg-white shadow-md"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Responsive styles using Tailwind classes instead of JSX style */}
      <style>
        {`
          @media (max-width: 768px) {
            h1 {
              font-size: 2.5rem;
            }
            p {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
