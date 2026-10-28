export type InsightCategory = "Guides" | "Structural Basics" | "Project Notes" | "Company News";
export type InsightFaq = { question: string; answer: string };
export type InsightSource = { title: string; url: string };

export type InsightRecord = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: InsightCategory;
  excerpt: string;
  date: string;
  author: string;
  serviceSlug: string;
  bodyMarkdown: string;
  wordCount: number;
  keyTakeaways: [string, string, string];
  faqs: [InsightFaq, InsightFaq, InsightFaq];
  sources: InsightSource[];
  relatedSlugs: string[];
};

// Editorial drafts researched for plain-language education. Confirm the visible date placeholder before publication.
export const insights: InsightRecord[] = [
  {
    slug: "primary-secondary-beams",
    title: "Primary and secondary beams: what they do in your building",
    metaTitle: "Primary and Secondary Beams Explained | Paceefik",
    metaDescription: "Learn how primary and secondary beams support floors, share loads and connect to the wider structure, and why drawings and professional design matter.",
    category: "Structural Basics",
    excerpt: "See how primary and secondary beams work together to support a floor, pass loads to columns and foundations, and why the right layout depends on the building’s design.",
    date: "{{ARTICLE_DATE}}",
    author: "Ibrahim Muslihudeen Pacific",
    serviceSlug: "structural-and-concrete-works",
    wordCount: 497,
    bodyMarkdown: `A floor frame is a connected system, not a set of beams working alone. In many buildings, the floor slab—the flat structural plate forming a floor or roof—rests on beams. Those beams carry its weight, along with people, furniture, partitions and other loads, towards columns or walls and then the foundations. This route through the structure is called the **load path**: how forces travel from where they arise to the ground.

In a common beam-supported layout, **secondary beams** support the slab directly. They span between **primary beams**, which collect their loads and pass them to columns or other main supports. A span is the distance between a member’s supports. The [Steel Construction Institute’s framing guidance](https://steelconstruction.info/topics/design/service-integration/) describes secondary beams supporting the slab and spanning between primary beams. The exact arrangement can differ: the project’s structural drawings show which members are primary or secondary and what each one supports.

Think of the roles as a chain of support. The slab transfers its load to the secondary beams; these pass it to the primary beams; the primary beams pass it to columns or walls. The columns or walls then carry loads down to the foundations. A primary beam may therefore collect loads from several secondary beams, while a secondary beam often supports a portion of floor between main beams. This is a typical arrangement, not a rule for every building. For example, a transfer slab can carry loads from columns above to columns below where their positions change; this is a different structural solution with its own implications, as [The Concrete Centre explains](https://www.concretecentre.com/Structural-design/Building-Elements/Transfer-slabs.aspx).

The terms describe a member’s place in the framing arrangement, not a guaranteed size or material. A primary beam is not automatically deeper, wider or stronger than every secondary beam. The design depends on factors such as the beam’s span, the loads it carries, its material, its supports and its connections. The connections—the details joining structural members—must also be designed to pass the forces safely. Steel and reinforced-concrete frames use different materials and detailing, but the basic idea remains: each member must be designed for its role in the complete system.

This is why beam layout and sizing should not be guessed from a photo, a neighbour’s building or a rule of thumb. Even preliminary sizing references are only guides: the [American Institute of Steel Construction](https://www.aisc.org/architecture-center/resources/engineering-basics/preliminary-beam-girder-and-column-size-tables/) says member requirements depend on project-specific loading and serviceability, including deflection and vibration, and calls for competent professional verification. Site conditions and the actual building configuration also matter when checking whether proposed work suits the structure.

If you are planning a new floor, opening, extension or alteration, ask a qualified structural professional to review the project-specific drawings and investigate relevant site conditions. Do not cut, remove, drill or add loads to a beam based on its label alone. A change to one member can affect the supports and load path around it. The drawings and professional assessment—not a general article—should guide decisions for your building.`,
    keyTakeaways: [
      "Secondary beams commonly support the slab and transfer loads to primary beams.",
      "Primary beams collect loads and pass them to columns or other designed supports.",
      "Beam labels do not determine safe sizes; use project-specific drawings and qualified professional advice.",
    ],
    faqs: [
      { question: "Is a primary beam always larger than a secondary beam?", answer: "No. “Primary” and “secondary” describe a beam’s role in the framing layout, not a fixed size. Each member is designed for its loads, span, material, supports and connections." },
      { question: "Can I remove or cut a beam if it looks like a secondary beam?", answer: "No. A label or appearance alone cannot establish that a change is safe. Have a qualified structural professional review the drawings and investigate the building before any structural alteration." },
      { question: "Do primary and secondary beams only occur in steel buildings?", answer: "The terms are commonly used to describe a hierarchy of supports in framed floors, including steel framing. Arrangements and detailing vary by structural system and material, so follow the project drawings rather than assuming every building uses the same layout." },
    ],
    sources: [
      { title: "Service integration in steel-framed buildings for efficiency — Steel Construction Institute", url: "https://steelconstruction.info/topics/design/service-integration/" },
      { title: "Preliminary Beam, Girder, and Column Size Tables — American Institute of Steel Construction", url: "https://www.aisc.org/architecture-center/resources/engineering-basics/preliminary-beam-girder-and-column-size-tables/" },
      { title: "Transfer slabs — The Concrete Centre", url: "https://www.concretecentre.com/Structural-design/Building-Elements/Transfer-slabs.aspx" },
    ],
    relatedSlugs: ["soil-testing-before-building", "hire-professional-engineer-for-house"],
  },
  {
    slug: "soil-testing-before-building",
    title: "Why you should test your soil before you build",
    metaTitle: "Why Test Your Soil Before Building | Paceefik",
    metaDescription: "Learn how soil testing informs foundation design, what a site investigation can reveal and what to ask your project team before building.",
    category: "Guides",
    excerpt: "Soil testing helps your design team understand ground conditions before foundation choices are fixed. Learn what an investigation can reveal, what it cannot promise and what to ask next.",
    date: "{{ARTICLE_DATE}}",
    author: "Ibrahim Muslihudeen Pacific",
    serviceSlug: "geotechnical-services",
    wordCount: 562,
    bodyMarkdown: `A plot can look level and firm while conditions below the surface are quite different. Soil can vary across one site and with depth. Groundwater—the water held below ground—can also affect how the ground behaves. A geotechnical investigation, meaning a planned examination of ground conditions for engineering, helps the project team understand what lies beneath before foundation decisions are settled. The Federal Highway Administration’s guidance describes site characterisation as a way to identify soil and rock layers, groundwater, design information and ground-related risks. The project-specific scope will differ for a building, but those are useful questions for any design team to consider. [FHWA Geotechnical Site Characterization](https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-NHI-16-072.pdf)

### What the investigation can tell you

A site investigation may include an inspection of the site, boreholes—narrow holes drilled to examine ground below the surface—or trial pits, small excavations made to view shallow soil, with selected field and laboratory tests. The right methods and locations depend on the site and proposed structure. Results help describe what materials are present, how layers vary and whether water was encountered. They are not a single pass-or-fail score. Samples and measurements relate to the places and conditions examined, so a qualified professional must interpret them for the actual project.

This matters because foundations transfer a building’s loads into the ground. Bearing capacity means how much load the ground can support without failing. The ground also needs to limit settlement, which is downward movement as soil compresses under load. If one part of a building moves more than another, cracking or distortion can result. Investigation findings help the design team assess these issues and consider a suitable foundation approach. That may involve comparing options, rather than assuming the same foundation will suit every plot.

### Why it is useful before construction

Ground information can reveal conditions that are not obvious from the surface, such as soft layers, made ground (soil or fill placed by people) or water at the locations investigated. These findings can affect design details and the way excavation or foundation work is planned. Discovering a concern during design gives the team a chance to assess it before work reaches that stage; it does not mean every issue can be predicted or avoided. The Institution of Civil Engineers describes geotechnical engineering as the civil engineering field concerned with the engineering behaviour of earth materials. [ICE: Geology, geotechnical and ground engineering](https://www.ice.org.uk/areas-of-interest/geology-geotechnical-and-ground-engineering)

An investigation report can therefore support decisions by the structural and geotechnical professionals working on your project. It can help them explain the assumptions behind the foundation design and identify where more information may be needed. The Federal Highway Administration notes that ground conditions retain some uncertainty even after investigation, and that the scope should match the project and its risks. Testing is valuable information, not a guarantee of performance or a substitute for design.

### What to do next

Arrange site investigation early enough for its findings to inform the project-specific drawings. Ask the responsible professionals what parts of the site were examined, what the results mean for the proposed building and whether any further investigation is recommended. Share the report with the design and construction team, and ask them to explain any recommendations in plain language. Do not choose a foundation from a neighbour’s experience or a general online rule: nearby plots can differ, and the right decision depends on your site, building and drawings.`,
    keyTakeaways: [
      "Soil conditions can vary across a plot and below the surface, so visible ground conditions are not enough to select a foundation.",
      "A site investigation gives design professionals evidence about soil layers, groundwater and ground-related risks, but it cannot guarantee performance.",
      "Arrange investigation early, then ask the project team to explain how its findings inform the project-specific drawings and foundation design.",
    ],
    faqs: [
      { question: "Is a soil test the same as one laboratory test?", answer: "Not necessarily. A site investigation can combine inspection, drilling or shallow excavations with selected field and laboratory tests. The methods should fit the site and proposed building." },
      { question: "Can soil testing guarantee that a building will not develop problems?", answer: "No. Investigation reduces uncertainty by giving the design team information about examined locations and conditions, but it cannot capture every ground condition or guarantee how a building will perform. Project-specific design and construction still matter." },
      { question: "When should I arrange a soil investigation?", answer: "Arrange it early enough for the findings to inform the design. The project professionals can advise what investigation is appropriate for the site, proposed structure and drawings." },
    ],
    sources: [
      { title: "Federal Highway Administration, Geotechnical Site Characterization", url: "https://highways.dot.gov/sites/fhwa.dot.gov/files/FHWA-NHI-16-072.pdf" },
      { title: "Institution of Civil Engineers, Geology, geotechnical and ground engineering", url: "https://www.ice.org.uk/areas-of-interest/geology-geotechnical-and-ground-engineering" },
    ],
    relatedSlugs: ["primary-secondary-beams", "borehole-drilling-how-it-works"],
  },
  {
    slug: "choose-building-contractor-nigeria",
    title: "How to choose a building contractor in Nigeria: questions to ask",
    metaTitle: "How to Choose a Building Contractor in Nigeria",
    metaDescription: "Questions to ask before hiring a building contractor in Nigeria, from project scope and references to registrations, payments and written terms.",
    category: "Guides",
    excerpt: "Compare contractors on the same project scope, check relevant experience and professional credentials, and agree in writing how quality, payments and changes will be handled.",
    date: "{{ARTICLE_DATE}}",
    author: "Ibrahim Muslihudeen Pacific",
    serviceSlug: "building-construction",
    wordCount: 553,
    bodyMarkdown: `Choosing a building contractor is not only about finding the lowest quotation. You need a team that understands your project, can explain its approach and is willing to put the agreement in writing. Before comparing offers, have the project-specific drawings and specifications reviewed by qualified professionals. If the site has uncertain ground, drainage or access conditions, seek appropriate site investigation rather than relying on assumptions.

### Is the proposed work clearly defined?

Ask each contractor what is included and excluded. Does the offer cover labour, materials, delivery, temporary facilities, finishing and removal of waste? Ask how the contractor has priced anything that is not yet specified. Where appropriate, request a bill of quantities—an itemised list of work and estimated quantities—to help compare like with like. A low figure may not be comparable if it leaves important work out. Do not rely on a verbal promise to fill gaps later.

Ask what happens if the drawings change or hidden site conditions affect the work. A variation is an agreed change to the original scope. The contract should explain how proposed variations are described, priced and approved before the extra work proceeds.

### Who will manage and carry out the work?

Ask who will supervise the site day to day, which trades will be subcontracted, and who is responsible for coordinating them. Request examples of comparable completed projects and, with the owners’ permission, speak to past clients. Ask what the contractor was responsible for, whether the work matched the agreed documents, and how issues were resolved. A photograph or testimonial alone cannot confirm workmanship or scope.

Where engineering services form part of the project, ask for the name and registration details of the responsible engineer and check the current status using COREN’s [practitioner and engineering-firm verification portal](https://portal.coren.gov.ng/verification). COREN’s [Act](https://coren.gov.ng/about-us/coren-act/) describes its role in regulating engineering practice and maintaining a register of practitioners. If the contractor offers engineering services through a firm, ask whether the firm’s COREN status is relevant to that service; COREN publishes [requirements for engineering-firm registration](https://coren.gov.ng/service/contracting-firm/). For architectural services, ask who is responsible and check the architect or firm’s status using the Architects Registration Council of Nigeria (ARCON) [verification service](https://arconigeria.gov.ng/verify-architect/). Match the credential check to the professional role; it is not a substitute for checking the contractor’s actual experience.

### How will price, payment and quality be managed?

Ask for a written breakdown showing the work covered, assumptions, exclusions and payment stages. What evidence will be used to confirm a stage is complete? Agree how changes, defects and delays will be recorded and addressed. Avoid paying for work that has not been explained in the agreed terms, and ask for receipts for payments. Ask what site safety arrangements are planned and who will keep the work area orderly. The appropriate measures depend on the project and site.

### What will the written agreement say?

Before work starts, make sure the agreement identifies the parties, site, scope, drawings and specifications that apply, price basis, payment process, responsibilities, how changes are approved, and how disputes or termination will be handled. Ask who will keep records of instructions and approvals. Read the full document and have a qualified adviser review it if the commitment is significant or unclear. A contractor who answers clearly and records decisions gives you a sounder basis for comparing proposals than a promise alone.`,
    keyTakeaways: [
      "Compare written offers against the same drawings, specifications and defined scope.",
      "Verify credentials for the specific professional role, and independently check relevant references.",
      "Put payment stages, changes, responsibilities and dispute processes in a written agreement.",
    ],
    faqs: [
      { question: "Should I choose the cheapest building contractor?", answer: "Not on price alone. First compare what each offer includes, excludes and assumes, then assess relevant experience, clarity and the written terms." },
      { question: "How do I check an engineer or architect in Nigeria?", answer: "For an engineer or engineering firm, use COREN’s official verification portal with the registration number. For an architect or architectural firm, use ARCON’s status lookup. Confirm that the person named is the one responsible for your project’s relevant work." },
      { question: "What should I have before requesting a quotation?", answer: "Share the current project-specific drawings and specifications, describe the intended work and site, and identify any known constraints. Where information about ground or other site conditions is uncertain, seek advice from qualified professionals before relying on an assumption." },
    ],
    sources: [
      { title: "COREN Act", url: "https://coren.gov.ng/about-us/coren-act/" },
      { title: "COREN registration verification portal", url: "https://portal.coren.gov.ng/verification" },
      { title: "COREN engineering-firm registration requirements", url: "https://coren.gov.ng/service/contracting-firm/" },
      { title: "ARCON architect verification", url: "https://arconigeria.gov.ng/verify-architect/" },
    ],
    relatedSlugs: ["bill-of-quantities-explained", "hire-professional-engineer-for-house"],
  },
  {
    slug: "bill-of-quantities-explained",
    title: "What is a bill of quantities and how do you read one?",
    metaTitle: "Bill of Quantities: How to Read One | Paceefik",
    metaDescription: "Learn what a bill of quantities covers, how to read its descriptions, units, quantities and rates, and what to check before agreeing a project price.",
    category: "Guides",
    excerpt: "A plain guide to the quantities, descriptions, rates and totals in a bill of quantities, with practical checks for Nigerian building and engineering projects.",
    date: "{{ARTICLE_DATE}}",
    author: "Ibrahim Muslihudeen Pacific",
    serviceSlug: "project-supervision-and-consultancy",
    wordCount: 585,
    bodyMarkdown: `## What a bill of quantities does

A bill of quantities (BOQ) is a structured list of construction work, with descriptions and quantities for the items in a project. The Royal Institution of Chartered Surveyors (RICS) defines it as a list giving detailed descriptions and firm quantities of the work in a contract. It helps a client and contractor discuss the same scope and lets a tenderer price item by item, rather than submit only one unexplained figure. It is not a complete design, a shopping list of materials or, by itself, a guarantee that the final amount paid will never change. The contract, drawings, specifications and site conditions still matter. [RICS’ measurement standard](https://www.rics.org/content/dam/ricsglobal/documents/standards/october_2021_nrm_2.pdf)

## Start with the whole document

Before reading prices, check the project name, document title, issue or revision, units and instructions. Make sure you have the drawings, specifications (the written requirements for materials and workmanship) and contract conditions that the BOQ refers to. A Nigerian procurement example from the African Development Bank says its BOQ is to be read with the specifications, contract conditions and tender drawings. If a document is missing or two documents appear to disagree, ask the project team for clarification; do not assume the BOQ overrides the others. [AfDB Nigeria BOQ example](https://www.afdb.org/fileadmin/uploads/afdb/Documents/Procurement/Corporate-Procurement/RFP%20-%20Procurement%20of%20Construction%20Works%20for%20AfDB%20Nigeria%20Field%20Office%20-%20Lot%201-Building%20works%20-%20Vol%203%20-Bills%20of%20Quantities.PDF)

## Follow each row across

A typical row has an item description, quantity, unit, rate and amount. The description says what work is included; check materials, size, location, finish and any drawing reference. The unit tells how it is counted: for example, metres (m) for length, square metres (m²) for area, cubic metres (m³) for volume, or “No.” for separate pieces. “Sum” may mark a priced lump-sum item. The quantity is the measured amount of that work. The rate is the tenderer’s price per unit, and the amount is generally quantity multiplied by rate. Check that the unit suits the description and that the arithmetic carries through page totals, section summaries and the overall summary. Follow the tender instructions on taxes and what the total includes; treatment can differ between documents.

Read section headings too. A BOQ may group work under preliminaries (project-wide arrangements such as mobilisation or site facilities), then building elements, finishes or services. Do not compare two rates until you confirm their descriptions and included work match. A low-looking rate may exclude something covered in another line, or reflect an error; the BOQ alone cannot tell you which.

## Look closely at allowances and gaps

A provisional sum is an allowance inserted for work that is not yet fully defined when the BOQ is issued. Find the note explaining how it is to be treated and whether the tenderer is expected to add anything. It is not necessarily a fixed price for the eventual work. Also check blank rates, “included” entries, exclusions, qualifications and any instructions about omitted items. Raise unclear points in writing before submitting or accepting a price, using the project’s stated clarification process.

## Use it with professional judgement

Check quantities and descriptions against the current, project-specific drawings and specifications. Where ground, existing structures or access affect the work, site investigation may be needed; do not guess from the BOQ. The BOQ is a useful pricing and scope document, but the contract governs how changes, errors, measurement and payment are handled. For a project-specific review, speak with the design and cost professionals responsible for the documents. In Nigeria, the Quantity Surveyors Registration Board of Nigeria (QSRBN) says it regulates the profession and practice; its information can help you check the right professional contact. [QSRBN](https://qsrbn.gov.ng/who-we-are/)
`,
    keyTakeaways: [
      "A BOQ lists measured work so the scope and prices can be reviewed item by item.",
      "Read the description, unit, quantity, rate and amount together, then check how totals and allowances are treated.",
      "Use the BOQ alongside current project drawings, specifications, contract terms and relevant site investigation; get unclear points clarified by the responsible professionals.",
    ],
    faqs: [
      { question: "Is a bill of quantities the final project price?", answer: "Not on its own. The BOQ provides priced items and a summary, but the contract terms determine how changes, errors, measurement, taxes and payment are handled." },
      { question: "What should I do if a BOQ item does not match a drawing?", answer: "Do not choose one document or guess. Record the item and drawing reference, then request written clarification through the project’s stated process before pricing or agreeing the work." },
      { question: "Does every BOQ line have a unit rate?", answer: "No. Some entries may be priced as a lump sum, shown as included, or presented as an allowance such as a provisional sum. Follow the instructions in that BOQ and ask how unclear entries should be priced." },
    ],
    sources: [
      { title: "RICS, NRM 2: Detailed measurement for building works", url: "https://www.rics.org/content/dam/ricsglobal/documents/standards/october_2021_nrm_2.pdf" },
      { title: "African Development Bank, Nigeria Field Office Abuja: Bill of Quantities", url: "https://www.afdb.org/fileadmin/uploads/afdb/Documents/Procurement/Corporate-Procurement/RFP%20-%20Procurement%20of%20Construction%20Works%20for%20AfDB%20Nigeria%20Field%20Office%20-%20Lot%201-Building%20works%20-%20Vol%203%20-Bills%20of%20Quantities.PDF" },
      { title: "Quantity Surveyors Registration Board of Nigeria, About us", url: "https://qsrbn.gov.ng/who-we-are/" },
    ],
    relatedSlugs: ["choose-building-contractor-nigeria", "hire-professional-engineer-for-house"],
  },
  {
    slug: "borehole-drilling-how-it-works",
    title: "How borehole drilling works, and what affects success",
    metaTitle: "How Borehole Drilling Works | Paceefik",
    metaDescription: "Learn how boreholes are sited, drilled, tested and completed, and what geology, construction and water quality mean for success.",
    category: "Guides",
    excerpt: "A borehole is more than a deep hole: its success depends on the ground beneath a site, sound construction, careful testing and water-quality checks.",
    date: "{{ARTICLE_DATE}}",
    author: "Ibrahim Muslihudeen Pacific",
    serviceSlug: "borehole-drilling",
    wordCount: 563,
    bodyMarkdown: `A borehole is a narrow, drilled well that reaches groundwater below the ground. Drilling can provide a water source, but success is not simply finding water. The completed well must supply water at a useful rate and have water suitable for its intended use. Ground conditions vary, so neither depth nor a nearby borehole can guarantee the same result at another site.

### From site choice to drilling

Before drilling, site investigation helps assess likely ground conditions and select a location. A hydrogeologist or other qualified professional may review local geology, available groundwater information, nearby wells and possible contamination risks. An aquifer is a layer of rock or sediment that can store and transmit groundwater. An [assessment of the site and its intended demand](https://www.rural-water-supply.net/en/resources/617) helps shape the design; the Standards Organisation of Nigeria’s Code of Practice for Water Well Construction is a relevant Nigerian reference for this work.

A drilling rig then advances a hole through soil and rock. The method and progress depend on the materials encountered. During drilling, the team should record the layers and any water-bearing zones found. This record helps the responsible professional decide how to finish the hole. A change in geology, unstable ground or limited water-bearing material can affect the final design and available supply.

### Making the hole into a well

The open hole is usually fitted with a casing, a tube that supports the borehole walls. Across water-bearing sections, a screen—a section with openings that lets water in while limiting sediment—may be installed. Sealing the space around the casing in the right places helps keep surface water and contaminants from entering the well. The details depend on the ground and project design; they should not be guessed from a standard depth or copied from another property. The [US Geological Survey explains common well parts and how local geology affects them](https://www.usgs.gov/water-science-school/science/groundwater-wells).

After installation, the well is developed. This means removing drilling debris and fine material near the screen so water can enter more freely and the pumped water clears. A pumping test then checks how the water level responds while water is drawn out, and how it recovers afterwards. The test helps assess the well’s yield—the rate of water it can supply under stated test conditions—and informs pump selection. The result is not a promise that the same rate will always be available: water levels can change seasonally and with use, as the USGS notes.

### Check quality as well as quantity

A clear-looking sample is not proof that water is safe. Groundwater may contain harmful microbes or naturally occurring chemicals, and the risks differ by location. UNICEF’s [Handbook on Water Quality](https://www.unicef.org/media/91301/file/Handbook-Water-Quality.pdf) discusses source protection and groundwater contaminants. Arrange appropriate testing through a competent laboratory before deciding how the water can be used. If results show a concern, the right response may involve treatment, another source or further professional advice; the test findings should guide that decision.

Ask for the site investigation, drilling record, well construction details, pumping-test results and water-quality report. In Nigeria, the SON code provides a national practice reference, while [COREN publishes guidance on registration of engineering practitioners](https://coren.gov.ng/guidelines-for-registration-of-engineers/). Ask who is responsible for each design or engineering decision and check their relevant experience. Follow project-specific drawings and advice from qualified professionals. Good decisions at each stage help reduce avoidable problems, but only site evidence can show what a particular borehole can deliver.`,
    keyTakeaways: [
      "Ground conditions and site investigation shape the location, design and likely supply; nearby wells are not a guarantee.",
      "Casing, screens, seals, well development and pumping tests all affect how a borehole performs.",
      "Test water quality as well as quantity, then use the results and qualified advice to decide how the water can be used.",
    ],
    faqs: [
      { question: "How do I know if a borehole will produce enough water?", answer: "A site investigation can inform the plan, but actual supply needs to be assessed after drilling. A pumping test measures performance under stated conditions; it cannot guarantee an unchanging supply in future." },
      { question: "Does finding groundwater mean the water is safe to drink?", answer: "No. Water may look clear and still contain microbes or dissolved chemicals. Have it tested by a competent laboratory and follow professional advice on treatment and use." },
      { question: "Why are casing and a screen installed?", answer: "Casing supports the borehole walls. A screen admits water from selected water-bearing layers while limiting sediment. Their placement and design depend on local ground conditions and the project design." },
    ],
    sources: [
      { title: "U.S. Geological Survey, Groundwater Wells", url: "https://www.usgs.gov/water-science-school/science/groundwater-wells" },
      { title: "Rural Water Supply Network library, Code of Practice for Water Well Construction (Standards Organisation of Nigeria)", url: "https://www.rural-water-supply.net/en/resources/617" },
      { title: "UNICEF, Handbook on Water Quality", url: "https://www.unicef.org/media/91301/file/Handbook-Water-Quality.pdf" },
      { title: "Council for the Regulation of Engineering in Nigeria, Guidelines for Registration with COREN as an Engineering Practitioner", url: "https://coren.gov.ng/guidelines-for-registration-of-engineers/" },
    ],
    relatedSlugs: ["soil-testing-before-building", "primary-secondary-beams"],
  },
  {
    slug: "hire-professional-engineer-for-house",
    title: "Why you should hire a professional engineer for your house",
    metaTitle: "Why Hire a Professional Engineer for Your House?",
    metaDescription: "Learn how an engineer can guide house design, site decisions and construction checks, and what to confirm before you appoint one in Nigeria.",
    category: "Guides",
    excerpt: "A professional engineer can help turn your house plans into project-specific technical decisions, coordinate key details and identify questions to resolve before and during construction.",
    date: "{{ARTICLE_DATE}}",
    author: "Ibrahim Muslihudeen Pacific",
    serviceSlug: "project-supervision-and-consultancy",
    wordCount: 579,
    bodyMarkdown: `A house is a major investment, and decisions made on paper affect what happens on site. A professional engineer can help you make those decisions with a clear technical basis, rather than relying on guesswork or copying details from another building. The right specialist depends on the work: structural and civil engineers address different parts of a project, while electrical or mechanical services may need their own qualified professionals.

### Make the design suit your house

A structural engineer considers the proposed layout, materials, number of floors and the forces the building must carry. The **load path** is the route those forces take through the building, from floors and roof through beams and columns to the foundation and ground. A sound, project-specific design helps ensure that connected parts are considered together. It also gives the builder clearer drawings to follow. A drawing prepared for another plot or layout should not be treated as a ready-made answer for yours. The Institution of Structural Engineers’ [homeowner guide to appointing a structural engineer](https://www.findanengineer.com/homeowner-s-guide-chapter-4-engaging-a-structural-engineer) recommends agreeing what design information and services are included.

### Ask what the ground can support

The foundation must suit both the building and the ground. A **site investigation** is a planned examination of ground conditions, which may include soil testing. Its findings can help the design team assess what foundation approach is appropriate. Do not assume a neighbouring house’s foundation is suitable for your plot; conditions and proposed buildings can differ. Ask the engineer what information is needed, who will arrange any investigation, and how the findings will affect the design. Where information is incomplete or unexpected conditions appear, a qualified professional may need to review the design rather than improvise on site. The Institution’s guide notes that unforeseen conditions, particularly below ground, cannot be ruled out.

### Coordinate decisions before work begins

House plans involve more than structure. Changes to room layouts, openings, water tanks, roof forms or service routes can affect the engineering design. Bring the relevant designers into the conversation early, and ask them to resolve clashes before construction. If a builder proposes moving a column, cutting a beam or changing materials, pause and refer the change to the responsible engineer for project-specific advice. Do not rely on a verbal assurance or a detail seen on another project.

### Know what supervision includes

“Supervision” can mean different things. Agree in writing whether the engineer’s appointment includes site visits, what those visits cover, how observations will be reported, and how design questions or changes should be raised. An engineer’s inspection can offer useful checks at agreed stages, but it is not automatically continuous monitoring of every task or a guarantee of the builder’s workmanship. The Institution’s guide explains these limits and recommends a clear written scope. Keep the approved drawings and records of decisions accessible to the owner, builder and relevant professionals.

### Check who you are appointing

Ask about relevant experience, the proposed deliverables, exclusions and who will answer questions during construction. In Nigeria, COREN—the Council for the Regulation of Engineering in Nigeria—says its statutory functions include regulating engineering practice and maintaining a register of persons entitled to practise as registered engineers. You can [check a practitioner’s or engineering firm’s registration status on COREN’s portal](https://portal.coren.gov.ng/verification). This is a practical verification step, not a substitute for checking that the person’s experience and proposed scope match your project. Settle the brief before work starts, and seek project-specific advice from qualified professionals when site findings or design changes call for it.`,
    keyTakeaways: [
      "Choose an engineer whose discipline and experience fit the work, and use drawings prepared for your project.",
      "Confirm what site information, design coordination and site visits are included in the written scope.",
      "Verify a proposed Nigerian practitioner or firm through COREN, and refer design changes to the responsible professional.",
    ],
    faqs: [
      { question: "Do I need an engineer for every house project?", answer: "Not every task needs the same specialist. A new build, structural alteration or question about load-bearing parts may warrant a structural engineer; discuss the project with qualified professionals to identify the right scope and any local approval requirements." },
      { question: "What should I ask an engineer before appointing them?", answer: "Ask for a written scope covering the drawings, calculations or reports to be provided, any site investigation, coordination with other designers, site visits, fees and exclusions. Confirm who will respond when construction questions arise." },
      { question: "Does hiring an engineer guarantee that the builder’s work will be correct?", answer: "No. Engineering advice and agreed inspections do not guarantee workmanship or replace the builder’s responsibilities. Clarify what the engineer will inspect, keep records, and raise concerns promptly with the relevant professionals." },
    ],
    sources: [
      { title: "COREN Act", url: "https://coren.gov.ng/about-us/coren-act/" },
      { title: "COREN registration verification portal", url: "https://portal.coren.gov.ng/verification" },
      { title: "The Institution of Structural Engineers, Homeowner’s Guide: Engaging a Structural Engineer", url: "https://www.findanengineer.com/homeowner-s-guide-chapter-4-engaging-a-structural-engineer" },
    ],
    relatedSlugs: ["choose-building-contractor-nigeria", "bill-of-quantities-explained"],
  },
];

export function insightBySlug(slug: string) {
  return insights.find((article) => article.slug === slug);
}

export function readMinutes(article: InsightRecord) {
  return Math.max(2, Math.ceil(article.wordCount / 200));
}
