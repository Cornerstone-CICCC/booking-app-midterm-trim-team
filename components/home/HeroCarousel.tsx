"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const IMAGES = [
  "/hero/trim-image_01.jpg",
  "/hero/trim-image_02.jpg",
  "/hero/trim-image_03.jpg",
];

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {IMAGES.map((src, i) => (
          <div key={src} className="relative h-full min-w-0 flex-[0_0_100%]">
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
