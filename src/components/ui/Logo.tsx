import Image from "next/image";
// import logo from "../../../public/logo.svg";
// import logoMobile from "../../../public/logoMobile.svg";
import logoMobile from "../../../public/textLogo.svg";
import Link from "next/link";

function Logo(): React.ReactNode {
  return (
    <>
      {/* <Image src={logo} alt="logo" className="size-14 max-sm:hidden" /> */}
      <Link href="/" className="block sm:hidden">
        <Image src={logoMobile} alt="logo" className="size-16 sm:hidden " />
      </Link>

      <Link href="/" className="block max-sm:hidden ">
        <Image src={logoMobile} alt="logo" className="size-20 max-sm:hidden " />
      </Link>
    </>
  );
}

export default Logo;
