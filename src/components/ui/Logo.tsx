import Image from "next/image";
// import logo from "../../../public/logo.svg";
// import logoMobile from "../../../public/logoMobile.svg";
import logoMobile from "../../../public/textLogo.svg";

function Logo(): React.ReactNode {
  return (
    <>
      {/* <Image src={logo} alt="logo" className="size-14 max-sm:hidden" /> */}
      <Image src={logoMobile} alt="logo" className="size-16 sm:hidden " />
      <Image src={logoMobile} alt="logo" className="size-20 max-sm:hidden " />
    </>
  );
}

export default Logo;
