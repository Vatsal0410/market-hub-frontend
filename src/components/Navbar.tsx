import { useState } from "react";
import { Link } from "react-router-dom";
import leavesIcon from "../assets/images/leaves.png";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  mode?: "login" | "signup" | "verification" | "recovery";
}

export const Navbar = ({ mode = "login" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRightAction = () => {
    switch (mode) {
      case "verification":
        return (
          <Link
            to="/login"
            className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        );
      case "recovery":
        return (
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-[#22c55e] transition-colors font-medium"
          >
            Back to Login
          </Link>
        );
      default:
        return (
          <Link
            to={mode === "login" ? "/register" : "/login"}
            className="px-4 py-2 bg-[#22c55e] text-white text-sm font-semibold rounded-lg hover:bg-[#006e2f] transition-colors"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </Link>
        );
    }
  };

  return (
    <header className="bg-linear-to-tr from-green-50 to-white backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3 md:py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img src={leavesIcon} alt="MarketHub" className="w-7 h-7 md:w-8 md:h-8" />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-[#006e2f]">
            MarketHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/help"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-[#22c55e] transition-colors"
          >
            Help
          </a>
          {getRightAction()}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col px-4 py-4 gap-4">
            <a
              href="/help"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-[#22c55e] transition-colors"
            >
              Help
            </a>
            {getRightAction()}
          </div>
        </div>
      )}
    </header>
  );
};