export interface HeroImage {
  src: string;
  alt: string;
  hint: string;
}

export interface ImageSettings {
  logo: string;
  heroCarousel: HeroImage[];
  sponsorImage: string;
}
