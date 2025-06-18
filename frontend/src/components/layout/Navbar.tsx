import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut, isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleChatNowClick = () => {
    navigate("/chat");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm",
        isScrolled ? "bg-white/90 shadow-soft py-2" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-mindwell font-bold text-2xl">Mind</span>
              <span className="text-mindwell font-medium">Bridge</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#about" className="text-gray-600 hover:text-medical transition duration-200">
              About
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-medical transition duration-200">
              How It Works
            </a>
            <a href="#faq" className="text-gray-600 hover:text-medical transition duration-200">
              FAQs
            </a>
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Button onClick={handleChatNowClick} className="btn-primary">
                  Chat Now
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleChatNowClick} className="btn-primary">
                Get Started
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4">
            <a href="#about" className="text-gray-600 hover:text-medical transition duration-200">
              About
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-medical transition duration-200">
              How It Works
            </a>
            <a href="#faq" className="text-gray-600 hover:text-medical transition duration-200">
              FAQs
            </a>
            {isSignedIn ? (
              <>
                <Button onClick={handleChatNowClick} className="btn-primary w-full">
                  Chat Now
                </Button>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={handleChatNowClick} className="btn-primary w-full">
                Get Started
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
