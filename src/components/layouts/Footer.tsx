import Image from "next/image";
import Link from "next/link";
import footerName from "@/../public/footerName.svg";
import footerNameMobile from "@/../public/footerNameMobile.svg";

function Footer() {
  return (
    <footer className=" rounded-t-3xl border-4 border-purple-200  bg-purple-50 shadow-shadow4 mt-[5.75rem] relative -bottom-1 ">
      <div className=" flex justify-between items-center mt-10 mx-8 mb-[4.25rem] max-sm:flex-col-reverse max-sm:gap-6 max-sm:mb-8 max-sm:mt-4">
        <nav className=" flex gap-8 [&>a]:text-neutral-500 [&>a]:font-bold [&>a]:leading-[1.125rem] [&>a:hover]:text-neutral-700 [&>a]:duration-200 max-sm:flex-col max-sm:gap-4 max-sm:items-center">
          <Link href="/">صفحه اصلی</Link>
          <Link href="/about-me">درباره من</Link>
          <Link href="/services">خدمات</Link>
          <Link href="/contact-me">ارتباط با من</Link>
        </nav>

        <div className="flex items-center flex-row-reverse gap-2 max-sm:flex-col max-sm:gap-1 mt-2">
          <Image src={footerName} alt="logo" className="max-sm:hidden" />
          <Image src={footerNameMobile} alt="logo" className="sm:hidden" />
        </div>
      </div>
      <p className="text-center mb-4 text-neutral-500 text-sm leading-[1.125rem] font-medium">
        All Rights Reserved by Fatemeh Shafiei
        <span> &copy;</span>
      </p>
    </footer>
  );
}

export default Footer;
