export function DeskIntro({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="text-[clamp(2.75rem,5.5vw,5rem)] font-black leading-[0.9] tracking-tight text-[#090F05] dark:font-semibold dark:text-white">
        Aditya
        <br />
        Oswal
      </h1>
      <p className="mt-4 text-base font-medium text-[#4A5B38] dark:font-mono dark:text-sm dark:text-white/60">
        Product designer and design engineer in Bangalore.
      </p>
    </div>
  );
}
