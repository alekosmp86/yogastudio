"use client";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useAppPreferences } from "@/lib/contexts/AppPreferencesContext";
import { BusinessTime } from "@/lib/utils/date";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const { getPreferenceByName } = useAppPreferences();

  const businessTime = new BusinessTime(
    getPreferenceByName<string>("timezone") || "UTC"
  );

  const iconClasses = "h-5 w-5 text-custom-100 hover:text-custom-50 transition";

  return (
    <footer className="bg-gradient-to-b from-custom-400 to-custom-300 text-custom-50">
      <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col items-center gap-4">
        {/* Brand / Copyright */}
        <div className="text-center space-y-1">
          <div className="text-base font-semibold tracking-wide">
            {getPreferenceByName<string>("businessName")}
          </div>
          <p className="text-xs opacity-80">
            © {businessTime.now().year} — {t("allRightsReserved")}
          </p>
        </div>

        {/* Social / Contact icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:scale-110 transition"
          >
            <Instagram className={iconClasses} />
          </a>

          <a
            href={`https://wa.me/${getPreferenceByName<string>(
              "businessWhatsappNumber"
            )}`}
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

        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs tracking-wide">
          <a href="/about" className="hover:text-custom-100 transition">
            {t("about")}
          </a>
          <a href="/contact" className="hover:text-custom-100 transition">
            {t("contact")}
          </a>
          <a href="/terms" className="hover:text-custom-100 transition">
            {t("terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
