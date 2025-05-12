import NavBtn from "./NavBtn";

function NavList(): React.ReactNode {
  return (
    <nav className=" flex items-center gap-10 max-sm:hidden">
      <NavBtn href="/">صفحه اصلی</NavBtn>
      <NavBtn href="/about-me">درباره من</NavBtn>
      <NavBtn href="/services">رزرو نوبت</NavBtn>
      <NavBtn href="/contact-me">ارتباط با من</NavBtn>
    </nav>
  );
}

export default NavList;
