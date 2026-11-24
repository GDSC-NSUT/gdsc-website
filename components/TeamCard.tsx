"use client";
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { GitHubIcon } from '@/components/icons';

interface TeamCardProps {
  name: string;
  role: string;
  imageSrc: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function TeamCard({ name, role, imageSrc, linkedinUrl, githubUrl }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center group w-full max-w-50">
      <div className="relative w-32 h-36 sm:w-40 sm:h-43 md:w-60 md:h-64 xl:w-80 xl:h-85 mb-4 flex items-center justify-center">

        {/* Hover Loop Border */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden p-1">
          <div
            className="w-full h-full rounded-full animate-hover-loop"
            style={{
              background: 'conic-gradient(#0F9D58 0%, #4285F4 25%, #FBBC04 50%, #EA4335 75%, #0F9D58 100%)'
            }}
          />
        </div>

        {/* Profile Image */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden bg-white z-10">
          <Image
            src={imageSrc}
            alt={name}
            // width={320}
            // height={320}
            fill
            className=" object-cover group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          />
        </div>

        {/* Social buttons (only rendered when a link exists) */}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="absolute bottom-2 left-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 rounded-full bg-[#181717] text-white border-2 border-white shadow-lg z-20 transition-transform duration-300 [@media(hover:hover)]:scale-0 [@media(hover:hover)]:group-hover:scale-100 focus-visible:scale-100 hover:bg-black"
          >
            <GitHubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5" />
          </a>
        )}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="absolute bottom-2 right-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 rounded-full bg-[#0A66C2] text-white border-2 border-white shadow-lg z-20 transition-transform duration-300 [@media(hover:hover)]:scale-0 [@media(hover:hover)]:group-hover:scale-100 focus-visible:scale-100 hover:bg-[#004182]"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5" fill="white" strokeWidth={0} />
          </a>
        )}
      </div>

      <div className="text-center text-nowrap">
        <h3 className="text-[#3C4043] font-bold text-lg sm:text-2xl md:text-3xl font-product-sans">{name}</h3>
        <p className="text-[#70757A] text-sm sm:text-xl uppercase ">{role}</p>
      </div>
    </div>
  );
}