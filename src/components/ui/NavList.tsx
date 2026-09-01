import { HiChevronDown } from "react-icons/hi2";
import NavBtn from "./NavBtn";

function NavList(): React.ReactNode {
  return (
    <nav className=" flex items-center gap-10 max-sm:hidden">
      <NavBtn href="/">صفحه اصلی</NavBtn>
      <NavBtn href="/services">رزرو نوبت</NavBtn>
      <NavBtn href="/experiences">سوابق</NavBtn>
      {/*  */}

      <div className="relative group">
        <p className="px-6 py-3 rounded-xl font-bold text-base leading-[1.125rem] cursor-pointer text-neutral-600 transition-all duration-300 flex items-center gap-1">
          خدمات
          <span>
            <HiChevronDown />
          </span>
        </p>

        <div className="absolute top-full hidden group-hover:block w-max translate-x-1/2 right-1/2">
          <div className=" flex flex-col w-max gap-1 bg-neutral-50 rounded-lg p-2">
            <NavBtn href="/businesses">کسب و کارها</NavBtn>
            <NavBtn href="/personalDevelopment">توسعه فردی</NavBtn>
          </div>
        </div>
      </div>

      {/* <NavBtn href="/businesses">کسب و کارها</NavBtn>
      <NavBtn href="/personalDevelopment">توسعه فردی</NavBtn> */}
      {/*  */}
      {/* <NavBtn href="/contact-me">ارتباط با من</NavBtn> */}
    </nav>
  );
}

export default NavList;
