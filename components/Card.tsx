import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { GitHubIcon } from '@/components/icons';

interface TeamCardProps {
  name: string;
  imageSrc: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function Card({ name, imageSrc, linkedinUrl, githubUrl }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-80 xl:h-80 flex items-center justify-center">

        {/* Hover Loop Border */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden p-1">
          <div
            className="w-full h-full rounded-full animate-spin"
            style={{
              background: 'conic-gradient(#0F9D58 0%, #4285F4 25%, #FBBC04 50%, #EA4335 75%, #0F9D58 100%)',
              animationDuration: '3s'
            }}
          />
        </div>

        {/* Profile Image */}
        <div className="absolute inset-1.5 rounded-full overflow-hidden bg-white z-10">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>

        {/* Social buttons (only rendered when a link exists) */}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="absolute bottom-2 left-2 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#181717] text-white border-2 border-white shadow-lg z-30 hover:scale-110 transition-transform duration-300 hover:bg-black"
          >
            <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        )}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="absolute bottom-2 right-2 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#0A66C2] text-white border-2 border-white shadow-lg z-30 hover:scale-110 transition-transform duration-300 hover:bg-[#004182]"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" fill="white" strokeWidth={0} />
          </a>
        )}
      </div>

      <div className="text-center z-10">
        <h3 className="text-[#3C4043] font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl hover:text-red-500 capitalize">{name.toLowerCase()}</h3>
      </div>
    </div>
  );
}