import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background + Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(0,0,0,0.95) 0%,
              rgba(0,0,0,0.85) 25%,
              rgba(0,0,0,0.65) 45%,
              rgba(0,0,0,0.35) 60%,
              rgba(0,0,0,0.0) 75%
            ),
            url("/hero-bg.svg")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <section className="relative flex min-h-screen items-center px-6 md:px-16">
        <div className="max-w-6xl w-full text-white flex items-end justify-between">
          
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            {/* Logo */}
            <Image
              src="/gdg-logo.svg"
              alt="GDG Logo"
              width={44}
              height={44}
              className="h-9 md:h-11 lg:h-12 w-auto mb-6"
              priority
            />

            {/* Heading */}
            <h1 className="text-[48px] leading-[1.15] font-semibold tracking-[-0.5px] mb-3">
              Google Developer Groups
            </h1>

            {/* Subheading */}
            <p className="text-[18px] mb-6">
              On Campus · Netaji Subhas University Of Technology
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-4 mb-6">
              <button className="bg-white text-black px-10 py-2.5 rounded-md text-[14px] font-medium">
                Let’s Connect
              </button>

              {/* Play Button */}
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white">
                <span className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-xs">
                  ▶
                </span>
              </button>
            </div>

            {/* Description */}
            <p className="text-[18px] leading-[1.6] max-w-xl">
              At GDG NSUT, we aim to learn, teach and grow. Together. The place
              where creative minds come together to build something amazing.
            </p>
          </div>

          {/* RIGHT BUTTON — ALIGNED WITH LAST TEXT LINE */}
          <div className="pb-[6px]">
            <button className="bg-[#4285F4] text-white px-6 py-3 rounded-lg text-[14px] font-medium shadow-lg hover:bg-[#3367D6] transition">
              Join Community
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
