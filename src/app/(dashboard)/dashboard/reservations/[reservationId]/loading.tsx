export default function Loading() {
  return (
    <div aria-busy="true" aria-label="در حال بارگذاری" className="grid gap-4 sm:gap-5">
      <div className="h-9 w-48 animate-pulse rounded-xl bg-white/60" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="glass h-28 animate-pulse rounded-[1.25rem]" />
        ))}
      </div>
      <div className="glass grid h-72 place-items-center rounded-[1.25rem]">
        <div className="loaderDot" />
      </div>
    </div>
  );
}
