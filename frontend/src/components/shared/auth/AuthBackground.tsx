export function AuthBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-indigo-50/60 to-violet-100/60" />

      {/* Floating aurora blobs */}
      <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl" />
      <div className="animate-blob animation-delay-2000 absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl" />
      <div className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/25 blur-3xl" />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
