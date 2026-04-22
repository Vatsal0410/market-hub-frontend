import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 md:py-8 border-t border-gray-200 bg-linear-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center gap-4 text-center">
        <span className="text-base md:text-lg font-bold text-[#006e2f]">MarketHub</span>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            to="/privacy-policy"
            className="text-xs md:text-sm text-gray-500 hover:text-[#22c55e] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-xs md:text-sm text-gray-500 hover:text-[#22c55e] transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/help"
            className="text-xs md:text-sm text-gray-500 hover:text-[#22c55e] transition-colors"
          >
            Help Center
          </Link>
          <Link
            to="/contact"
            className="text-xs md:text-sm text-gray-500 hover:text-[#22c55e] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <p className="text-xs md:text-sm text-gray-500">
          © {currentYear} MarketHub. All fresh rights reserved.
        </p>
      </div>
    </footer>
  );
};