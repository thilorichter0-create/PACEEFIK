const previewImages: Record<string, number> = {
  "building-construction": 52,
  "structural-and-concrete-works": 22,
  "blockwork": 57,
  "borehole-drilling": 18,
  "project-supervision-and-consultancy": 14,
  "geotechnical-services": 17,
  "renovation": 55,
};

export function servicePreviewImage(slug: string) {
  return `/images/paceefik/image${previewImages[slug] ?? 52}.webp`;
}
