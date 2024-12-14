import Link from "next/link";

function NameLink(): React.ReactNode {
  return (
    <Link href="/">
      <h1 className=" text-neutral-400 font-bold text-[1.375rem]">
        فاطمه شفیعی
      </h1>
    </Link>
  );
}

export default NameLink;
