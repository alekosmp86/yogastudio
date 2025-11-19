"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  const iconClasses = "h-5 w-5 text-gray-600 hover:text-blue-600 transition";

  return (
    <footer className="border-t bg-white mt-10">
      <div className="mx-auto max-w-4xl px-4 py-8 flex flex-col items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Yoga Studio — All rights reserved
        </p>

        {/* Icons */}
        <div className="flex gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:scale-110 transition"
          >
            <Instagram className={iconClasses} />
          </a>

          <a
            href="https://wa.me/00000000"
            target="_blank"
            className="hover:scale-110 transition"
          >
            <MessageCircle className={iconClasses} />
          </a>

          <a
            href="mailto:contact@yogastudio.com"
            className="hover:scale-110 transition"
          >
            <EnvelopeIcon className={iconClasses} />
          </a>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="/about" className="hover:text-blue-600">
            About
          </a>
          <a href="/contact" className="hover:text-blue-600">
            Contact
          </a>
          <a href="/terms" className="hover:text-blue-600">
            Terms & Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
