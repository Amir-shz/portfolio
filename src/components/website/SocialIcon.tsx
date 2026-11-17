import { FaInstagram, FaLinkedinIn, FaTelegram } from "react-icons/fa6";
import { Mail } from "lucide-react";
import type { SocialKey } from "./contact";

function SocialIcon({
  name,
  className,
}: {
  name: SocialKey;
  className?: string;
}) {
  switch (name) {
    case "instagram":
      return <FaInstagram className={className} aria-hidden />;
    case "linkedin":
      return <FaLinkedinIn className={className} aria-hidden />;
    case "telegram":
      return <FaTelegram className={className} aria-hidden />;
    case "email":
      return <Mail className={className} aria-hidden />;
  }
}

export default SocialIcon;
