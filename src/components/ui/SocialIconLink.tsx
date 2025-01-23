import { socialIconLinkProps } from "@/types/types";
import Link from "next/link";

function SocialIconLink({
  size = "sm",
  href,
  children,
}: socialIconLinkProps): React.ReactNode {
  return (
    <Link
      href={href}
      target="_blank"
      className={` transition-all duration-200 hover:border-purple-200 hover:border hover:bg-purple-50 [&>svg]:hover:fill-purple-500 [&>svg]:fill-[#737373] shadow-shadow3   flex justify-center items-center ${
        size === "sm" && "rounded-xl size-16 [&>svg]:size-8 bg-neutral-100"
      } ${
        size === "lg" && " rounded-2xl size-20 [&>svg]:size-10 bg-neutral-200"
      }`}
    >
      {children}
    </Link>
  );
}

export default SocialIconLink;
