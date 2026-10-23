export const siteSettings = {
  name: "Vini Corporate",
  legalName: "Vini Corporates",
  tagline: "Harness the Sun. Power Your Tomorrow.",
  founded: 2019,
  address: "M.P. Building, Golghar, Gorakhpur, U.P.",
  phone: "+91 808-178-5320",
  phoneRaw: "918081785320",
  email: "vinicorporates@gmail.com",
  instagram: "https://instagram.com/solarwala_up",
  mapEmbed:
    "https://www.google.com/maps?q=Golghar,Gorakhpur,Uttar+Pradesh&output=embed",
};

export const stats = [
  { label: "Happy Customers", value: 350, suffix: "+" },
  { label: "Projects Completed", value: 350, suffix: "+" },
  { label: "Awards Won", value: 15, suffix: "" },
  { label: "Expert Workers", value: 25, suffix: "+" },
];

export const services = [
  {
    slug: "residential-solar",
    name: "Residential Solar Panels",
    image: "/images/residential-rooftop-install.jpg",
    tagline: "Efficient residential solar — roof and ground mounts",
    icon: "home",
  },
  {
    slug: "commercial-solar",
    name: "Commercial Solar Panels",
    image: "/images/commercial-campus-dusk.jpg",
    tagline: "Commercial solar systems powering businesses",
    icon: "building",
  },
  {
    slug: "industrial-solar",
    name: "Industrial Solar Panels",
    image: "/images/industrial-solar-park-aerial.jpg",
    tagline: "Industrial-scale systems for large operations",
    icon: "factory",
  },
];

export type SolarType = {
  slug: string;
  name: string;
  short: string;
  icon: "home" | "building" | "factory" | "sun" | "layers" | "gauge" | "plug";
  image: string;
  intro: string;
  benefits: string[];
  subsections: { title: string; body: string }[];
  cta: string;
};

export const solarTypes: SolarType[] = [
  {
    slug: "residential-solar",
    name: "Residential Solar",
    short: "Rooftop systems sized for homes, built for daily savings.",
    icon: "home",
    image: "/images/residential-terrace-panel.jpg",
    intro:
      "Cut your monthly electricity bill and gain energy independence with a residential solar system designed around your roof, your household load, and your budget — from a modest 1kW starter setup to a full 10kW+ net-metered array.",
    benefits: [
      "Lower electricity bills from month one",
      "25-year panel performance warranty",
      "Net-metering paperwork handled for you",
      "Battery backup options for power cuts",
      "Government subsidy assistance",
    ],
    subsections: [
      {
        title: "Rooftop Mounted",
        body: "The most common residential setup — panels mounted directly on your roof using corrosion-resistant aluminium rails, angled for maximum sun exposure across the year.",
      },
      {
        title: "Ground Mounted",
        body: "For homes with limited or shaded roof space, we install a dedicated ground-mounted array on your property with the same output guarantees.",
      },
    ],
    cta: "Ready to turn your rooftop into a power plant?",
  },
  {
    slug: "commercial-solar",
    name: "Commercial Solar",
    short: "Predictable energy costs for shops, offices & institutions.",
    icon: "building",
    image: "/images/commercial-campus-dusk.jpg",
    intro:
      "Commercial electricity tariffs are only rising. A commercial solar installation from Vini Corporate locks in your energy costs, improves your ESG profile, and typically pays back within 3–5 years.",
    benefits: [
      "Significant reduction in operating costs",
      "Scalable systems from 10kW to 100kW+",
      "Minimal downtime during installation",
      "Preventive maintenance contracts available",
      "Financing & leasing options",
    ],
    subsections: [
      {
        title: "Retail & Office Spaces",
        body: "Compact, high-efficiency panel arrays designed to fit constrained commercial rooftops without disrupting operations.",
      },
      {
        title: "Institutions & Campuses",
        body: "Larger multi-array installations for schools, hospitals and campuses, engineered for high daytime load offsetting.",
      },
    ],
    cta: "See how much your business could save.",
  },
  {
    slug: "industrial-solar",
    name: "Industrial Solar",
    short: "Heavy-duty systems engineered for continuous operations.",
    icon: "factory",
    image: "/images/industrial-solar-park-aerial.jpg",
    intro:
      "Industrial operations demand reliability at scale. Our industrial solar systems are engineered for continuous, high-load environments — factories, warehouses and processing units — with robust structural mounting and grid-synchronised inverters.",
    benefits: [
      "Built for high continuous power draw",
      "Structural engineering & load analysis included",
      "Grid-tied and hybrid configurations",
      "Remote performance monitoring",
      "Dedicated project manager",
    ],
    subsections: [
      {
        title: "Factory Rooftops",
        body: "Large-span industrial roofs are ideal for high-capacity arrays — we handle structural assessment, mounting and wiring end-to-end.",
      },
      {
        title: "Captive Power Plants",
        body: "For heavy consumption sites, we design captive ground-mounted plants sized to offset a major share of industrial load.",
      },
    ],
    cta: "Talk to us about powering your plant.",
  },
  {
    slug: "rooftop-solar",
    name: "Rooftop Solar System",
    short: "The most popular, space-efficient way to go solar.",
    icon: "layers",
    image: "/images/hero-rooftop-sunset.jpg",
    intro:
      "Rooftop solar makes use of space you're already paying for. Whether it's a flat concrete roof, a sloped tile roof, or a metal-sheet shed roof, we engineer a mounting solution that fits.",
    benefits: [
      "No extra land required",
      "Custom mounting for flat, sloped & metal roofs",
      "Weatherproof cabling & junction boxes",
      "Bird-mesh & maintenance walkway options",
      "Fast 3–7 day installation timelines",
    ],
    subsections: [
      {
        title: "Flat Concrete Roofs",
        body: "Tilted mounting structures set at the optimal angle for your latitude, anchored without compromising roof waterproofing.",
      },
      {
        title: "Sloped & Metal Roofs",
        body: "Rail-less or hook-mounted systems that follow your existing roof pitch for a clean, low-profile installation.",
      },
    ],
    cta: "Get a rooftop assessment.",
  },
  {
    slug: "ground-mounted-solar",
    name: "Ground Mounted Solar",
    short: "Open-land systems for maximum capacity & easy servicing.",
    icon: "sun",
    image: "/images/ground-mounted-array-clouds.jpg",
    intro:
      "When you have open land available, ground-mounted systems allow for larger capacities, optimal panel orientation, and easier long-term maintenance access than rooftop arrays.",
    benefits: [
      "Higher capacity potential",
      "Optimal tilt & orientation, unrestricted by roof shape",
      "Easier cleaning & maintenance access",
      "Galvanized steel foundation structures",
      "Suitable for farms, plots & open industrial land",
    ],
    subsections: [
      {
        title: "Fixed-Tilt Arrays",
        body: "Cost-effective fixed-angle mounting structures optimised for year-round sun exposure at your location.",
      },
      {
        title: "Elevated Structures",
        body: "Raised mounting for agricultural land, allowing continued use of the land beneath the panels.",
      },
    ],
    cta: "Explore what your land can generate.",
  },
  {
    slug: "on-grid-solar",
    name: "On-Grid Solar",
    short: "Grid-tied systems with net metering for fastest payback.",
    icon: "gauge",
    image: "/images/grid-power-lines-sunset.jpg",
    intro:
      "On-grid systems stay connected to the utility grid and use net metering to credit any surplus power you generate — the most cost-effective option with the fastest return on investment.",
    benefits: [
      "Lowest upfront cost per kW",
      "Net-metering credits for excess generation",
      "No battery required",
      "Full subsidy eligibility",
      "Simple, low-maintenance system",
    ],
    subsections: [
      {
        title: "Net Metering",
        body: "Surplus units you generate flow back to the grid and are credited on your bill — we handle the DISCOM paperwork and meter installation.",
      },
      {
        title: "Grid-Tied Inverters",
        body: "Certified inverters that synchronise seamlessly with grid frequency for safe, efficient two-way power flow.",
      },
    ],
    cta: "See your net-metering savings.",
  },
  {
    slug: "off-grid-solar",
    name: "Off-Grid Solar",
    short: "Full independence with battery-backed power, anywhere.",
    icon: "plug",
    image: "/images/panels-forest-clearing.jpg",
    intro:
      "For locations with unreliable grid access — or homeowners who want complete independence — off-grid systems store energy in batteries so you have power around the clock, with or without the grid.",
    benefits: [
      "Complete energy independence",
      "Reliable power during outages",
      "Lithium & tubular battery options",
      "Ideal for remote sites & farmhouses",
      "Custom sizing based on daily load",
    ],
    subsections: [
      {
        title: "Battery Banks",
        body: "Sized precisely to your household or facility's daily consumption, with lithium options for longer life and faster charging.",
      },
      {
        title: "Hybrid Configurations",
        body: "Combine grid, solar and battery for the best of both worlds — grid as backup, solar as primary, battery for continuity.",
      },
    ],
    cta: "Go fully independent.",
  },
];

export const whyChooseUs = [
  {
    title: "Quality Products",
    body: "Tier-1 panels and certified components sourced from trusted manufacturers.",
  },
  {
    title: "Expert Services",
    body: "25+ trained installers with hands-on experience across 350+ projects.",
  },
  {
    title: "Customer-Centric Approach",
    body: "From site survey to after-sales support, you're guided at every step.",
  },
  {
    title: "Convenient Location",
    body: "Based in Golghar, Gorakhpur — easy to reach for consultations & service.",
  },
  {
    title: "Flexible Payment Options",
    body: "UPI, Net Banking, Cheque/DD and Cash — pay the way that works for you.",
  },
];

export const testimonials = [
  {
    name: "Rakesh Verma",
    role: "Homeowner, Gorakhpur",
    quote:
      "Vini Corporate installed a 5kW rooftop system on our house — the team was punctual, transparent about costs, and our electricity bill dropped drastically from the very first month.",
  },
  {
    name: "Sunita Agarwal",
    role: "Shop Owner, Golghar",
    quote:
      "We switched our shop to solar last year. The net-metering setup was handled completely by their team — no running around DISCOM offices ourselves.",
  },
  {
    name: "Manoj Tiwari",
    role: "Factory Owner, Gorakhpur",
    quote:
      "Professional survey, clean installation, and honest guidance on system sizing for our unit. Would recommend Vini Corporate to any industrial setup considering solar.",
  },
];

export const team = [
  {
    name: "Aditya Singh",
    role: "Founder & Proprietor",
    initials: "AS",
  },
];

export const galleryCategories = [
  "Residential",
  "Commercial",
  "Industrial",
  "Installation in Progress",
] as const;

// NOTE: stock placeholder photography (Unsplash). Replace with the client's
// own project photos before launch.
export type GalleryItem = {
  id: number;
  src: string;
  title: string;
  category: (typeof galleryCategories)[number];
};

export const gallery: GalleryItem[] = [
  { src: "hero-rooftop-sunset", title: "Factory Rooftop Array", category: "Industrial" },
  { src: "residential-rooftop-install", title: "Residential Rooftop", category: "Installation in Progress" },
  { src: "commercial-campus-dusk", title: "Campus Solar Plant", category: "Commercial" },
  { src: "residential-terrace-panel", title: "Terrace System", category: "Residential" },
  { src: "industrial-solar-park-aerial", title: "Captive Power Plant", category: "Industrial" },
  { src: "installer-wiring-panel", title: "Junction & Wiring", category: "Installation in Progress" },
  { src: "ground-mounted-array-clouds", title: "Ground-Mounted Array", category: "Commercial" },
  { src: "panels-orchard", title: "Farmhouse Off-Grid", category: "Residential" },
  { src: "solar-grid-aerial", title: "Open-Land Plant", category: "Industrial" },
  { src: "ground-mounted-blue-sky", title: "Institution Rooftop", category: "Commercial" },
  { src: "panel-rows-symmetry", title: "Elevated Structure", category: "Industrial" },
  { src: "panels-forest-clearing", title: "Hybrid Backup System", category: "Residential" },
  { src: "ground-mounted-field", title: "Fixed-Tilt Array", category: "Commercial" },
  { src: "panel-rows-closeup", title: "Module Commissioning", category: "Installation in Progress" },
  { src: "panels-on-grass", title: "School Campus Array", category: "Commercial" },
].map((g, i) => ({
  ...g,
  id: i + 1,
  src: `/images/${g.src}.jpg`,
  category: g.category as GalleryItem["category"],
}));

export const kwOptions = [
  "1 KW",
  "2 KW",
  "3 KW",
  "4 KW",
  "5 KW",
  "6 KW",
  "7 KW",
  "8 KW",
  "9 KW",
  "10 KW",
  "More than 10 KW",
];
