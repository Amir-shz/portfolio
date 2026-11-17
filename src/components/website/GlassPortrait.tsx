"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// A photo held in a frosted glass frame. Floating glass chips can be passed
// as children; position them with absolute classes.
function GlassPortrait({
  src,
  alt,
  priority = false,
  animate = true,
  aspect = "aspect-[4/5]",
  objectPosition = "object-[50%_18%]",
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 340px, 80vw",
  className,
  children,
}: {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  animate?: boolean;
  aspect?: string;
  objectPosition?: string;
  sizes?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const instant = !animate || reduce;

  return (
    <div className={cn("relative mx-auto w-full", className)}>
      {/* soft halo behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_55%_at_50%_45%,rgba(143,112,234,0.28),transparent_70%)]"
      />
      <motion.div
        initial={animate ? { opacity: 0, y: 16, scale: 0.98 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={instant ? { duration: 0 } : { duration: 0.9, ease }}
        className="glass rounded-[1.75rem] p-2"
      >
        <div className={cn("relative overflow-hidden rounded-[1.375rem] bg-iris-tint", aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            placeholder="blur"
            sizes={sizes}
            className={cn("object-cover", objectPosition)}
          />
        </div>
      </motion.div>
      {children}
    </div>
  );
}

// A small frosted label that floats over the portrait.
export function GlassChip({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass absolute rounded-xl px-3 py-2 text-[0.75rem] font-medium leading-5 text-ink-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default GlassPortrait;
