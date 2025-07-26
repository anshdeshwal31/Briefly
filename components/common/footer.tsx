import Link from 'next/link';
import { FileText, Mail, Twitter, Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-rose-50/40 to-white border-rose-100/30">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/20 via-transparent to-teal-50/20 pointer-events-none" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl">
                  <FileText className="h-6 w-6 text-white " />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">
                  Briefly
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Transform lengthy documents into clear, actionable insights with our AI-powered summarizer. Save hours of reading time.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://x.com/wrestlinge29621"
                  className="p-2 text-gray-400 hover:text-rose-500 transition-colors duration-300 hover:scale-110 transform"
                >
                  <Twitter className="h-5 w-5 animate-pulse text-rose-500" />
                </Link>
                <Link
                  href="https://github.com/anshdeshwal31"
                  className="p-2 text-gray-400 hover:text-rose-500 transition-colors duration-300 hover:scale-110 transform"
                >
                  <Github className="h-5 w-5 animate-pulse text-rose-500" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ansh-deshwal-67ab992ab/"
                  className="p-2 text-gray-400 hover:text-rose-500 transition-colors duration-300 hover:scale-110 transform"
                >
                  <Linkedin className="h-5 w-5 text-rose-500 animate-pulse" />
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#features"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/summaries"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    My Summaries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Service Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/licenses"
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 text-sm"
                  >
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-6 border-t border-rose-100/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>© 2025 Briefly. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/security"
                className="text-gray-500 hover:text-rose-600 transition-colors duration-300"
              >
                Security
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-500 hover:text-rose-600 transition-colors duration-300"
              >
                Accessibility
              </Link>
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="h-4 w-4" />
                <span className="text-xs">hello@Briefly.ai</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-teal-400 opacity-60 animate-gradient-x" />
    </footer>
  );
};
