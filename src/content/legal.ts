export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CookieTableRow = {
  name: string;
  purpose: string;
  duration: string;
  type: string;
};

export type LegalPolicy = {
  title: string;
  intro: string;
  contactLabel: string;
  contact: string;
  sections: LegalSection[];
  cookieRows?: CookieTableRow[];
};

const legalReviewNote = "LAWYER REVIEW REQUIRED BEFORE LAUNCH";
const effectiveDate = "{{EFFECTIVE_DATE}}";
const lastUpdated = "{{LAST_UPDATED}}";

export const legalPolicies: Record<"privacy" | "terms" | "cookies", LegalPolicy> = {
  privacy: {
    title: "Privacy Policy",
    intro: "This policy describes the types of information that may be handled when you use the Paceefik Engineering Services Limited website or contact the company.",
    contactLabel: "Data protection contact",
    contact: "{{DATA_PROTECTION_CONTACT}}",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Paceefik Engineering Services Limited (RC {{RC_NUMBER}}) is based in Osogbo, Osun State, Nigeria. The company’s role in deciding why and how personal information is used on this website must be confirmed: {{DATA_CONTROLLER_ROLE}}.",
          "For questions or requests about your personal information, contact us at {{DATA_PROTECTION_CONTACT}}.",
        ],
      },
      {
        heading: "What we may collect",
        paragraphs: [
          "If you send a quote request, we may receive your name, phone number, email address, project type, location, approximate size, information about drawings or site readiness, preferred contact time, message and any drawings or photos you choose to send. If you use the contact form, we may receive your name, email address, phone number, subject and message. Do not send information that is not needed for your enquiry.",
          "If you contact us through WhatsApp, we may receive your phone number and the messages or files you choose to send. WhatsApp is an external service. Review its own privacy information before using it.",
          "The website or its hosting service may also process technical information when a page loads. Confirm the exact information and server logs before launch: {{TECHNICAL_DATA_COLLECTED}}.",
          "The current cookie-preference control stores your choice in browser local storage. Check the Cookie Policy and production browser behaviour for any cookies set by the website, hosting platform or third parties.",
        ],
      },
      {
        heading: "Why we use information and the lawful basis",
        paragraphs: [
          "We use enquiry details to read and respond to your message, discuss a quote you asked for and manage the enquiry. The basis for each purpose must be checked and confirmed before launch: {{CONFIRMED_LAWFUL_BASES_BY_PURPOSE}}. Where it applies, this may include taking steps you ask us to take before entering a contract.",
          "Analytics may be used only if an analytics service is configured and you choose to allow it. The current site has no analytics provider configured. Any legal-obligation purpose must also be confirmed: {{LEGAL_OBLIGATIONS_IF_ANY}}.",
        ],
      },
      {
        heading: "Who may receive your information",
        paragraphs: [
          "Information may be handled by people authorised to manage your enquiry and by providers needed to operate the website, database, email delivery and file storage. Confirm each provider, its role and location before launch: {{HOSTING_DATABASE_EMAIL_AND_STORAGE_PROVIDERS}}.",
          "If you choose WhatsApp, your message is handled through that service. Any other recipient or purpose must be confirmed here: {{OTHER_RECIPIENTS_IF_ANY}}. We may disclose information to a public authority or another party only where the reason and scope are confirmed and disclosure is required by law.",
        ],
      },
      {
        heading: "How long we keep information",
        paragraphs: [
          "We keep personal information only for the period approved for its purpose or required by law. The exact retention period and deletion process must be supplied before launch: {{RETENTION}}.",
        ],
      },
      {
        heading: "Transfers outside Nigeria",
        paragraphs: [
          "Confirm whether any hosting, email, storage, messaging or other provider receives personal information outside Nigeria: {{IF_ANY}}. If a transfer occurs, identify the destination and confirm the safeguards and legal basis that apply before this policy is approved.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Subject to the Act and the circumstances of your request, you may ask for access to your personal information, correction of inaccurate information, deletion where the law allows it, restriction or objection to processing, and transfer of your information in a portable format. You may also withdraw consent where consent is the basis for processing and complain to the Nigeria Data Protection Commission.",
          "To make a request, contact {{DATA_PROTECTION_CONTACT}}. We may need to confirm your identity before acting. Add the approved request-handling process and any limits required by law: {{DATA_RIGHTS_REQUEST_PROCESS}}.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We plan to use appropriate technical and organisational safeguards to protect personal information. The safeguards actually in place must be confirmed before launch: {{SECURITY_MEASURES}}. No online service can promise that every transmission or storage system is risk-free.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "The company’s approach to information about children has not been supplied. Add the verified process, including any age checks, parent or guardian involvement and situations in which child information may be processed: {{CHILDREN_PROCESSING_POLICY}}. Have a Nigerian lawyer check that the notice and website design meet applicable requirements.",
        ],
      },
      {
        heading: "Changes and complaints",
        paragraphs: [
          "We may update this notice when our data practices or legal duties change. The effective date above should show when the current version took effect. If you are unhappy with how we handle your information, contact us first at {{DATA_PROTECTION_CONTACT}}. You may also contact the Nigeria Data Protection Commission through its official website.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro: "These terms describe general conditions for using the Paceefik Engineering Services Limited website.",
    contactLabel: "Contact",
    contact: "{{DATA_PROTECTION_CONTACT}}",
    sections: [
      {
        heading: "Use of this website",
        paragraphs: [
          "Use this website lawfully. Do not interfere with its operation or another person’s use of it.",
          "The website provides general information about Paceefik Engineering and its services. Information on the site is not a project-specific design, inspection, engineering instruction, quote or contract. Project scope, responsibilities, price and other terms must be set out and agreed separately in writing before work begins.",
        ],
      },
      {
        heading: "Accuracy of information",
        paragraphs: [
          "We take care when preparing website information, but some details may be incomplete, out of date or awaiting confirmation. Check important project information with us before relying on it. A service description is not a promise of a price, start date, completion date or project outcome unless that term is expressly agreed in a separate written agreement.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Confirm the owner of the website text, photographs, drawings, logo and other material before launch: {{INTELLECTUAL_PROPERTY_OWNER_AND_PERMISSIONS}}. Do not copy, publish or adapt material unless you have permission or the law allows it. Client or third-party material may be used only with the required permission.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "This site may link to third-party websites or services. Those services are controlled by other organisations. We do not control their content or privacy practices. Review their terms and privacy information before using them.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "The limitation-of-liability wording requires Nigerian legal review. Insert approved text before launch: {{LIMITATION_OF_LIABILITY_TEXT}}. Nothing in these terms is intended to exclude a responsibility or liability that Nigerian law does not allow a party to exclude.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of Nigeria, subject to any mandatory legal rights that apply to you.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms may be sent to {{DATA_PROTECTION_CONTACT}}. Confirm whether a separate general contact should be used: {{GENERAL_CONTACT}}.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "This policy explains browser storage and cookie preferences used by the Paceefik Engineering website.",
    contactLabel: "Contact",
    contact: "{{DATA_PROTECTION_CONTACT}}",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "A cookie is a small text file that a website may store in your browser or device. Websites may also use other browser storage, such as local storage. The current consent control saves your choice in local storage under paceefik-cookie-preferences. This is browser storage, not a cookie.",
          "The current site has no analytics provider configured. Analytics cookies must not be set unless a provider is configured and you choose to allow analytics. Confirm whether the production host or any third party sets other cookies before this policy is approved: {{HOSTING_PLATFORM_COOKIE_AUDIT}}.",
        ],
      },
      {
        heading: "Storage and cookies used by this draft",
        paragraphs: [
          "The table records the preference storage present in the application and a placeholder for any additional cookie confirmed by the production audit. Remove the placeholder row if no such cookie is used. Add every cookie that is actually set.",
        ],
      },
      {
        heading: "Change your choice",
        paragraphs: [
          "You can accept all cookies, decline non-essential cookies or manage your choice using the cookie notice. You can change your choice at any time using the Change cookie settings button below.",
        ],
      },
    ],
    cookieRows: [
      {
        name: "paceefik-cookie-preferences",
        purpose: "Remembers your essential and analytics preference in this browser.",
        duration: "Until cleared by you or your browser.",
        type: "Essential local storage; not a cookie.",
      },
      {
        name: "{{THIRD_PARTY_COOKIE_NAME}}",
        purpose: "{{THIRD_PARTY_COOKIE_PURPOSE}}",
        duration: "{{THIRD_PARTY_COOKIE_DURATION}}",
        type: "{{THIRD_PARTY_COOKIE_TYPE}}",
      },
    ],
  },
};

export const legalDraftMetadata = {
  note: legalReviewNote,
  effectiveDate,
  lastUpdated,
} as const;
