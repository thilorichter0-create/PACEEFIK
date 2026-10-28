export type ServiceFaq = { question: string; answer: string };

export type ServiceRecord = {
  slug: string;
  name: string;
  cardDescription: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  included: string[];
  excluded: string[];
  approach: string;
  faqs: ServiceFaq[];
};

export const servicesIntro =
  "From building construction, structural and concrete works, and blockwork to borehole drilling, project supervision and consultancy, geotechnical services, and renovation, we discuss your project with you. Our in-house design capability supports the project planning process. You have one point of contact for your enquiry. Tell us what you plan to build, where it is, and what information you have available.";

export const servicesHubMeta = {
  title: "Building and Engineering Services | Paceefik Engineering",
  description:
    "Explore Paceefik Engineering’s seven approved services and share your project details so the scope can be confirmed.",
};

const locationFaq: ServiceFaq = {
  question: "Do you take projects outside Osogbo?",
  answer: "We are based in Osogbo, Osun State. Share your project location so we can confirm whether we can serve it.",
};

const changeFaq: ServiceFaq = {
  question: "What happens if the project scope changes?",
  answer: "Changes are agreed in writing before work starts.",
};

export const services: ServiceRecord[] = [
  {
    slug: "building-construction",
    name: "Building Construction",
    cardDescription: "Discuss building construction for your project.",
    metaTitle: "Building Construction | Paceefik Engineering",
    metaDescription: "Discuss Building Construction with Paceefik Engineering. Share project details so the scope can be confirmed.",
    overview:
      "We list Building Construction as one of our seven named services. Building construction concerns carrying out building work under an agreed design and project scope. The project types, work stages, deliverables, exclusions, approvals and limits for Paceefik Engineering have not been verified in the information supplied. Share the site location, proposed building and any drawings or project details. We can use that information to discuss the work you want considered. Before work begins, the approved scope and responsibilities should be clear. Confirmed service scope: {{BUILDING_CONSTRUCTION_SCOPE}}.",
    included: ["{{BUILDING_CONSTRUCTION_INCLUDED_SCOPE}}"],
    excluded: ["{{BUILDING_CONSTRUCTION_EXCLUDED_SCOPE}}"],
    approach: "{{BUILDING_CONSTRUCTION_APPROACH}}",
    faqs: [
      { question: "What building work does this service cover?", answer: "{{BUILDING_CONSTRUCTION_CONFIRMED_SCOPE}}" },
      { question: "Can you work from my architect’s drawings?", answer: "{{BUILDING_CONSTRUCTION_DRAWINGS_POLICY}}" },
      locationFaq,
      changeFaq,
    ],
  },
  {
    slug: "structural-and-concrete-works",
    name: "Structural and Concrete Works",
    cardDescription: "Discuss structural and concrete work for your project.",
    metaTitle: "Structural and Concrete Works | Paceefik Engineering",
    metaDescription: "Discuss Structural and Concrete Works with Paceefik Engineering. Share your project details to confirm the scope.",
    overview:
      "Structural and concrete work concerns parts of a building that support or transfer loads and the concrete work set out in the design. The exact elements, methods, checks, deliverables, exclusions and responsibilities for Paceefik Engineering have not been verified in the information supplied. Share your location, available drawings and the work you want considered. The drawings and project-specific agreement should define what is covered. Ask a qualified engineer to review design decisions for your project. Confirm the scope before work starts. Confirmed service scope: {{STRUCTURAL_AND_CONCRETE_WORKS_SCOPE}}.",
    included: ["{{STRUCTURAL_AND_CONCRETE_WORKS_INCLUDED_SCOPE}}"],
    excluded: ["{{STRUCTURAL_AND_CONCRETE_WORKS_EXCLUDED_SCOPE}}"],
    approach: "{{STRUCTURAL_AND_CONCRETE_WORKS_APPROACH}}",
    faqs: [
      { question: "Which structural or concrete elements are included?", answer: "{{STRUCTURAL_AND_CONCRETE_WORKS_CONFIRMED_SCOPE}}" },
      { question: "What determines the arrangement of structural members?", answer: "The engineer’s drawings determine the actual arrangement for a project." },
      { question: "What is not included?", answer: "{{STRUCTURAL_AND_CONCRETE_WORKS_EXCLUSIONS}}" },
      { question: "What information should I share?", answer: "Share the project location, available drawings and the work you want to discuss." },
    ],
  },
  {
    slug: "blockwork",
    name: "Blockwork",
    cardDescription: "Discuss blockwork for your project.",
    metaTitle: "Blockwork Services | Paceefik Engineering",
    metaDescription: "Discuss Blockwork with Paceefik Engineering. Share the project details so its scope can be confirmed.",
    overview:
      "Blockwork means placing masonry units to form parts of a wall or other structure. The block type, dimensions, openings, reinforcement, connections, finishes and other details depend on the design and agreed scope. Paceefik Engineering lists Blockwork as a service, but the company’s specific inclusions, exclusions and responsibilities have not been verified in the information supplied. Share the site location, available drawings and the work you want considered. Confirm the scope before work starts. No technical specification is shown until the company confirms it. Confirmed service scope: {{BLOCKWORK_SCOPE}}.",
    included: ["{{BLOCKWORK_INCLUDED_SCOPE}}"],
    excluded: ["{{BLOCKWORK_EXCLUDED_SCOPE}}"],
    approach: "{{BLOCKWORK_APPROACH}}",
    faqs: [
      { question: "What blockwork does this service cover?", answer: "{{BLOCKWORK_CONFIRMED_SCOPE}}" },
      { question: "Which block types or specifications are used?", answer: "{{BLOCKWORK_SPECIFICATION}}" },
      { question: "What is not included?", answer: "{{BLOCKWORK_EXCLUSIONS}}" },
      { question: "What information should I share?", answer: "Share the location, available drawings and the work you want considered." },
    ],
  },
  {
    slug: "borehole-drilling",
    name: "Borehole Drilling",
    cardDescription: "Discuss borehole drilling for your site.",
    metaTitle: "Borehole Drilling | Paceefik Engineering",
    metaDescription: "Discuss Borehole Drilling with Paceefik Engineering. Share your site details so the scope can be confirmed.",
    overview:
      "Borehole drilling creates a bore in the ground as part of seeking a groundwater supply. Ground conditions differ between sites, so an outcome cannot be promised from a general description. The specific assessment, drilling method, casing, pump, testing, power arrangements, exclusions and responsibilities for Paceefik Engineering have not been verified in the information supplied. Share the site location and water requirements you want to discuss. Confirm the deliverables and limitations for your site before work begins. Confirmed service scope: {{BOREHOLE_DRILLING_SCOPE}}.",
    included: ["{{BOREHOLE_DRILLING_INCLUDED_SCOPE}}"],
    excluded: ["{{BOREHOLE_DRILLING_EXCLUDED_SCOPE}}"],
    approach: "{{BOREHOLE_DRILLING_APPROACH}}",
    faqs: [
      { question: "What does this service include?", answer: "{{BOREHOLE_DRILLING_CONFIRMED_SCOPE}}" },
      { question: "Can you guarantee a water-supply result?", answer: "No water-supply result is stated as guaranteed. Ground conditions vary between sites." },
      { question: "Which pump, casing or testing work is included?", answer: "{{BOREHOLE_DRILLING_EQUIPMENT_AND_TESTING_SCOPE}}" },
      { question: "What information should I share?", answer: "Share the site location and the water requirements you want to discuss." },
    ],
  },
  {
    slug: "project-supervision-and-consultancy",
    name: "Project Supervision and Consultancy",
    cardDescription: "Discuss project supervision and consultancy for your project.",
    metaTitle: "Project Supervision and Consultancy | Paceefik",
    metaDescription: "Discuss Project Supervision and Consultancy. Share your project details to confirm the appointment scope.",
    overview:
      "Project supervision and consultancy is an appointment to support a client through agreed professional services. The person’s role, authority, reporting, site attendance, checks, exclusions and responsibilities depend on the written appointment. Paceefik Engineering lists this as a service, but its detailed company-specific scope has not been verified in the information supplied. Tell us what support you need and who is already involved. The responsibilities should be agreed in writing before work begins. Request and review the proposed appointment before agreeing to the work. Confirmed service scope: {{PROJECT_SUPERVISION_AND_CONSULTANCY_SCOPE}}.",
    included: ["{{PROJECT_SUPERVISION_AND_CONSULTANCY_INCLUDED_SCOPE}}"],
    excluded: ["{{PROJECT_SUPERVISION_AND_CONSULTANCY_EXCLUDED_SCOPE}}"],
    approach: "{{PROJECT_SUPERVISION_AND_CONSULTANCY_APPROACH}}",
    faqs: [
      { question: "What does the appointment cover?", answer: "{{PROJECT_SUPERVISION_AND_CONSULTANCY_CONFIRMED_SCOPE}}" },
      { question: "What authority and responsibilities would you have?", answer: "The appointment should define the agreed role, authority and responsibilities." },
      { question: "What reporting is included?", answer: "{{PROJECT_SUPERVISION_AND_CONSULTANCY_REPORTING_SCOPE}}" },
      { question: "What information should I share?", answer: "Tell us what support you need and who is already involved in the project." },
    ],
  },
  {
    slug: "geotechnical-services",
    name: "Geotechnical Services",
    cardDescription: "Discuss geotechnical services for your site.",
    metaTitle: "Geotechnical Services | Paceefik Engineering",
    metaDescription: "Discuss Geotechnical Services with Paceefik Engineering. Share site details so requirements can be confirmed.",
    overview:
      "Geotechnical services examine ground and soil conditions to inform engineering decisions. Investigation methods, tests, sample handling, interpretation, reports and any foundation advice depend on the site and proposed structure. Paceefik Engineering lists Geotechnical Services as a service, but the company’s specific methods, exclusions and deliverables have not been verified in the information supplied. Share your site location, proposed building and available drawings. Confirm the required work and outputs for your project before it begins. Ask which decisions the investigation is intended to support. Confirmed service scope: {{GEOTECHNICAL_SERVICES_SCOPE}}.",
    included: ["{{GEOTECHNICAL_SERVICES_INCLUDED_SCOPE}}"],
    excluded: ["{{GEOTECHNICAL_SERVICES_EXCLUDED_SCOPE}}"],
    approach: "{{GEOTECHNICAL_SERVICES_APPROACH}}",
    faqs: [
      { question: "Which geotechnical investigations are available?", answer: "{{GEOTECHNICAL_SERVICES_CONFIRMED_SCOPE}}" },
      { question: "Why test soil before building?", answer: "Soil information can help inform engineering decisions. The suitable investigation depends on the site and proposed structure." },
      { question: "Which reports or test results are provided?", answer: "{{GEOTECHNICAL_SERVICES_DELIVERABLES}}" },
      { question: "What information should I share?", answer: "Share your site location, proposed building and available drawings." },
    ],
  },
  {
    slug: "renovation",
    name: "Renovation",
    cardDescription: "Discuss renovation for your existing building.",
    metaTitle: "Renovation Services | Paceefik Engineering",
    metaDescription: "Discuss Renovation with Paceefik Engineering. Share building details so the work can be confirmed.",
    overview:
      "Renovation changes or repairs an existing building. The suitable work depends on the building’s condition, the changes you want and any drawings or records available. Paceefik Engineering lists Renovation as a service, but its project types, scope limits, exclusions, phases, finishes and responsibilities have not been verified in the information supplied. Share the site location, work you have in mind and any available photos or drawings. Confirm the work and arrangements for your building before it starts. The agreed scope should reflect what is found on site. Confirmed service scope: {{RENOVATION_SCOPE}}.",
    included: ["{{RENOVATION_INCLUDED_SCOPE}}"],
    excluded: ["{{RENOVATION_EXCLUDED_SCOPE}}"],
    approach: "{{RENOVATION_APPROACH}}",
    faqs: [
      { question: "What renovation work does this service cover?", answer: "{{RENOVATION_CONFIRMED_SCOPE}}" },
      { question: "Can renovation work be phased?", answer: "{{RENOVATION_PHASE_POLICY}}" },
      { question: "What is not included?", answer: "{{RENOVATION_EXCLUSIONS}}" },
      { question: "What information should I share?", answer: "Tell us what you want to change and share any available site details, drawings or photographs." },
    ],
  },
];

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

export function serviceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
