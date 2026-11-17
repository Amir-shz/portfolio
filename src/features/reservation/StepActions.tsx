import { cn } from "@/lib/utils";

// Bottom action area of a booking step. On phones it sticks to the bottom
// of the screen on a frosted strip, so the main button is always in reach.
function StepActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-auto pt-6",
        "max-sm:sticky max-sm:bottom-0 max-sm:-mx-4 max-sm:bg-gradient-to-t max-sm:from-mist max-sm:via-mist/90 max-sm:to-transparent max-sm:px-4 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default StepActions;
