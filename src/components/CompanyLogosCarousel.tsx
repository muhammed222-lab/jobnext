import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

interface CompanyLogo {
  name: string;
  logoPath: string;
}

interface CompanyLogosCarouselProps {
  className?: string;
}

const CompanyLogosCarousel: React.FC<CompanyLogosCarouselProps> = ({
  className,
}) => {
  const companies: CompanyLogo[] = [
    { name: "Google", logoPath: "/companies/google.webp" },
    { name: "Meta", logoPath: "/companies/meta.svg" },
    { name: "Amazon", logoPath: "/companies/amazon.svg" },
    { name: "Microsoft", logoPath: "/companies/microsoft.webp" },
    { name: "Netflix", logoPath: "/companies/netflix.png" },
    { name: "Atlassian", logoPath: "/companies/atlassian.svg" },
    { name: "IBM", logoPath: "/companies/ibm.svg" },
    { name: "Uber", logoPath: "/companies/uber.svg" },
  ];

  const doubledCompanies = [...companies, ...companies, ...companies];

  return (
    <div className={cn("w-full overflow-hidden relative", className)}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1500,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {doubledCompanies.map((company, index) => (
            <CarouselItem
              key={`${company.name}-${index}`}
              className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="flex items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 group hover:scale-105">
                <img
                  src={company.logoPath}
                  alt={company.name}
                  className="w-full h-auto max-h-12 object-contain opacity-80 group-hover:opacity-100 group-hover:brightness-125 transition-all duration-500 filter grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Gradient overlays for better visual effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
    </div>
  );
};

export default CompanyLogosCarousel;
