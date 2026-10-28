export type ProjectStatus = "Completed" | "Ongoing";

export type ProjectRecord = {
  title: string;
  slug: string;
  location: string;
  service: string;
  year: string;
  status: ProjectStatus | "";
  scope: string;
  ourRole: string;
  overview: string;
  challenge: string;
  whatWeDid: string;
  result: string;
  images: string[];
  relatedSlugs: string[];
  clientName?: string;
  clientNameApproved?: boolean;
  isSample?: boolean;
  published?: boolean;
  sampleLabel?: string;
};

export const CLIENT_NAME_APPROVED = false;

export const projects: ProjectRecord[] = [
  {
    title: "{{PROJECT_TITLE_1}}",
    slug: "sample-project-1",
    location: "",
    service: "",
    year: "",
    status: "",
    scope: "",
    ourRole: "",
    overview: "",
    challenge: "",
    whatWeDid: "",
    result: "",
    images: [],
    relatedSlugs: [],
    isSample: true,
    published: false,
    sampleLabel: "SAMPLE: delete before launch",
  },
  {
    title: "{{PROJECT_TITLE_2}}",
    slug: "sample-project-2",
    location: "",
    service: "",
    year: "",
    status: "",
    scope: "",
    ourRole: "",
    overview: "",
    challenge: "",
    whatWeDid: "",
    result: "",
    images: [],
    relatedSlugs: [],
    isSample: true,
    published: false,
    sampleLabel: "SAMPLE: delete before launch",
  },
  {
    title: "{{PROJECT_TITLE_3}}",
    slug: "sample-project-3",
    location: "",
    service: "",
    year: "",
    status: "",
    scope: "",
    ourRole: "",
    overview: "",
    challenge: "",
    whatWeDid: "",
    result: "",
    images: [],
    relatedSlugs: [],
    isSample: true,
    published: false,
    sampleLabel: "SAMPLE: delete before launch",
  },
];

export function projectsForView(includeSamples: boolean) {
  return projects.filter((project) => project.published === true || (includeSamples && project.isSample === true));
}

export function projectBySlug(slug: string, includeSamples: boolean) {
  return projectsForView(includeSamples).find((project) => project.slug === slug);
}

export function isRealContent(value: string | undefined) {
  return Boolean(value && value.trim() && !/^\{\{[^}]+\}\}$/.test(value.trim()));
}
