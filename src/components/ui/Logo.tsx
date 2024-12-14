import Image from "next/image";
import logo from "../../../public/logo.svg";

function Logo(): React.ReactNode {
  return <Image src={logo} alt="logo" className=" size-14" />;
}

export default Logo;
