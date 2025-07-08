export interface HeroImage {
  src: string;
  alt: string;
  hint: string;
}

export interface ImageSettings {
  logo: string;
  favicon: string;
  heroCarousel: HeroImage[];
  sponsorImage: string;
  donationAmounts: number[];
  galleryImages: HeroImage[];
}
