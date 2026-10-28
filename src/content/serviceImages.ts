const previewImages: Record<string, number> = {
  "building-construction": 52,
  "structural-and-concrete-works": 22,
  "blockwork": 57,
  "borehole-drilling": 18,
  "project-supervision-and-consultancy": 14,
  "geotechnical-services": 17,
  "renovation": 55,
};

export function getAssetUrl(path: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

export function paceefikImageUrl(imageNumber: number | string, thumbnail = false): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const folder = thumbnail ? "/images/paceefik/thumb" : "/images/paceefik";
  return `${base}${folder}/image${imageNumber}.webp`;
}

export function servicePreviewImage(slug: string, thumbnail = true): string {
  const num = previewImages[slug] ?? 52;
  return paceefikImageUrl(num, thumbnail);
}
