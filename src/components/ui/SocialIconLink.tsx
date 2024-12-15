import { socialIconLinkProps } from "@/types/types";
import Link from "next/link";

function SocialIconLink({
  href,
  children,
}: socialIconLinkProps): React.ReactNode {
  return (
    <Link
      href={href}
      target="_blank"
      className=" shadow-shadow3 bg-neutral-200 rounded-xl size-16 flex justify-center items-center"
    >
      {children}
    </Link>
  );
}

export default SocialIconLink;
