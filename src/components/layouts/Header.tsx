import Logo from "../ui/Logo";
import NameLink from "../ui/NameLink";
import NavList from "../ui/NavList";

function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <NameLink />
      <NavList />
      <Logo />
    </header>
  );
}

export default Header;
