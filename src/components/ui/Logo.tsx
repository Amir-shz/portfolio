import Image from "next/image";
import logo from "../../../public/logo.svg";
import logoMobile from "../../../public/logoMobile.svg";

function Logo(): React.ReactNode {
  return (
    <>
      <Image src={logo} alt="logo" className="size-14 max-sm:hidden" />
      <Image src={logoMobile} alt="logo" className="size-14 sm:hidden" />
    </>
  );
}

export default Logo;
