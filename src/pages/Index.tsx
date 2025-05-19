
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-manscara-offwhite overflow-x-hidden">
      <Helmet>
        <title>Manscara - Premium Face Wash for Men</title>
        <meta name="description" content="Discover Manscara's premium face wash designed specifically for men. Cleanse, refresh, and rejuvenate your skin with our exclusive formula." />
        <meta name="keywords" content="men face wash, manscara, premium skincare, men skincare, face cleansing" />
        <link rel="canonical" href="https://manscara.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Manscara - Premium Face Wash for Men" />
        <meta property="og:description" content="Premium skincare products designed specifically for men. Looking good has never been this simple." />
        <meta property="og:url" content="https://manscara.com" />
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.91/build/spline-viewer.js"></script>
      </Helmet>

      <Navbar />
      <main className="animate-fade-in">
        <HeroSection />
        <div id="catalog-section" className="animate-fade-in" style={{animationDelay: "0.3s"}}>
          <ProductCatalog className="bg-white" />
        </div>
        <div id="features-section" className="animate-fade-in" style={{animationDelay: "0.4s"}}>
          <FeaturesSection className="bg-manscara-offwhite" />
        </div>
        <div id="benefits-section" className="animate-fade-in" style={{animationDelay: "0.5s"}}>
          <BenefitsSection className="bg-manscara-beige" />
        </div>
        <div id="testimonials-section" className="animate-fade-in" style={{animationDelay: "0.6s"}}>
          <ReviewsSection className="bg-white" />
        </div>
        <div className="animate-fade-in" style={{animationDelay: "0.7s"}}>
          <CTASection className="bg-manscara-black" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
