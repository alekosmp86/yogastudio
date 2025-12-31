"use client";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { BusinessTime } from "@/lib/utils/date";

export default function Footer() {
  const {getPreferenceByName} = useAppPreferences();
  const iconClasses = "h-5 w-5 text-white hover:text-primary-400 transition";

  return (
    <footer className="border-t bg-theme-headings text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 flex flex-col items-center gap-4">
        {/* Copyright */}
        <p className="text-sm">
          © {BusinessTime.now().year} {getPreferenceByName<string>("businessName")} — All rights reserved
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
            href={`https://wa.me/${getPreferenceByName<string>("businessWhatsappNumber")}`}
            target="_blank"
            className="hover:scale-110 transition"
          >
            <MessageCircle className={iconClasses} />
          </a>

          <a
            href={`mailto:${getPreferenceByName<string>("businessEmail")}`}
            className="hover:scale-110 transition"
          >
            <Mail className={iconClasses} />
          </a>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="/about" className="hover:text-primary-400">
            About
          </a>
          <a href="/contact" className="hover:text-primary-400">
            Contact
          </a>
          <a href="/terms" className="hover:text-primary-400">
            Terms & Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
