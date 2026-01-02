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
        <div className="max-w-6xl w-full text-white flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          
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
            <h1 className="text-4xl sm:text-5xl leading-tight font-medium tracking-tight mb-3">
              Google Developer Groups
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg mb-6">
              On Campus · Netaji Subhas University Of Technology
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-4 mb-6">
              {/* Let’s Connect */}
              <button
               className="
               bg-white text-black
               px-8 sm:px-10 py-2.5
               rounded-md
               text-base sm:text-lg md:text-xl

               transition-all duration-200 ease-out
               hover:-translate-y-[1px]
               hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)]
               hover:scale-[1.02]

               active:translate-y-0
               active:scale-[0.98]
               "
               >
                Let’s Connect
              </button>

              {/* Play Button */}
              <button
                className="
                  flex items-center justify-center
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-full
                  bg-white
                  transition-transform duration-200
                  hover:scale-105 active:scale-95
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 sm:w-8 sm:h-8 fill-black translate-x-[-1px]"
                >
                  <path d="M8 5.14v13.72c0 .97 1.05 1.57 1.9 1.06l10.3-6.86c.8-.53.8-1.6 0-2.12L9.9 4.08c-.85-.51-1.9.09-1.9 1.06z" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed max-w-xl">
              At GDG NSUT, we aim to learn, teach and grow. Together. The place
              where creative minds come together to build something amazing.
            </p>
          </div>

          {/* RIGHT BUTTON */}
          <div className="md:pb-[6px]">
            <button className="bg-[#4285F4] text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium shadow-lg hover:bg-[#3367D6] transition">
              Join Community
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}
