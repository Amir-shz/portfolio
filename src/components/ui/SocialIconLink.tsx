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
      className=" transition-all duration-200 hover:bg-purple-50 [&>svg]:hover:fill-purple-500 [&>svg]:fill-[#737373] shadow-shadow3 bg-neutral-200 rounded-xl size-16 flex justify-center items-center"
    >
      {children}
    </Link>
  );
}

export default SocialIconLink;
