
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserData } from "@/types/user";
import { useCart } from "@/context/CartContext";
import { User, ShoppingCart, Home, Package, LogOut, MapPin, CreditCard, Heart, Menu, X } from "lucide-react";
import authService from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const { cartCount } = useCart();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Get current pathname
  const pathname = location.pathname;
  const isHomePage = pathname === "/";
  const isCheckoutPage = pathname === "/checkout";
  const isProfilePage = pathname.startsWith("/profile");
  const isCartPage = pathname === "/cart";
  const isAuthPage = pathname.startsWith("/auth/");

  // Check if user is logged in
  useEffect(() => {
    const userData = authService.getUserData();
    setUser(userData);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await authService.logout();
      
      toast({
        title: "Logout Successful",
        description: response.message || "You have been logged out successfully.",
      });
      
      // Update the user state to reflect logout
      setUser(null);
      
      // Optionally redirect to home page
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Logout Error",
        description: error.message || "An error occurred during logout.",
        variant: "destructive",
      });
      
      // Still update the user state to reflect logout
      setUser(null);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/lovable-uploads/619af646-e154-42b0-91d9-8b80937da07b.png"
            alt="Manscara Logo"
            className="h-10 w-auto"
            width="40"
            height="40"
          />
          <span className="text-2xl font-serif font-bold">Manscara</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium hover:text-gray-600 transition-colors ${
              isHomePage ? "text-black" : "text-gray-500"
            }`}
          >
            Home
          </Link>
          
          {/* Match with Homepage sections */}
          <a 
            href="#catalog-section" 
            className="text-sm font-medium text-gray-500 hover:text-gray-600 transition-colors"
          >
            Products
          </a>
          <a
            href="#features-section"
            className="text-sm font-medium text-gray-500 hover:text-gray-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#benefits-section"
            className="text-sm font-medium text-gray-500 hover:text-gray-600 transition-colors"
          >
            Benefits
          </a>
          <a
            href="#testimonials-section"
            className="text-sm font-medium text-gray-500 hover:text-gray-600 transition-colors"
          >
            Testimonials
          </a>
        </nav>

        {/* Right side: Cart, Account */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          {!isCheckoutPage && !isAuthPage && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-manscara-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          )}

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    {user.profilePicture ? (
                      <AvatarImage src={user.profilePicture} alt={user.firstName} />
                    ) : null}
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {user.firstName?.charAt(0)}
                      {user.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs font-normal text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile?tab=orders">
                  <DropdownMenuItem className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile?tab=addresses">
                  <DropdownMenuItem className="cursor-pointer">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Addresses</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile?tab=payment">
                  <DropdownMenuItem className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Payment Methods</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile?tab=wishlist">
                  <DropdownMenuItem className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Wishlist</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/login">
              <Button variant="default" size="sm" className="bg-manscara-black hover:bg-black">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-4">
          <Link to="/" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100" onClick={closeMenu}>
            <Home className="h-5 w-5" /> 
            <span>Home</span>
          </Link>
          <a href="#catalog-section" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100" onClick={closeMenu}>
            <ShoppingCart className="h-5 w-5" />
            <span>Products</span>
          </a>
          <a href="#features-section" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100" onClick={closeMenu}>
            <Package className="h-5 w-5" />
            <span>Features</span>
          </a>
          <a href="#benefits-section" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100" onClick={closeMenu}>
            <Heart className="h-5 w-5" />
            <span>Benefits</span>
          </a>
          <a href="#testimonials-section" className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100" onClick={closeMenu}>
            <User className="h-5 w-5" />
            <span>Testimonials</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;