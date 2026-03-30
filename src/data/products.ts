// ---------------------------------------------------------------------------
// Product hierarchy data for the Koleex International Group website
// ---------------------------------------------------------------------------

export interface Model {
  name: string;
  slug: string;
  sku: string;
  tagline: string;
}

export interface Product {
  name: string;
  slug: string;
  description: string;
  models: Model[];
}

export interface Subcategory {
  name: string;
  slug: string;
  description: string;
  products: Product[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Division {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  categories: Category[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const divisions: Division[] = [
  // ======================================================================
  // 1. Industrial Technology
  // ======================================================================
  {
    name: "Industrial Technology",
    slug: "industrial-technology",
    tagline: "Precision at Scale",
    description:
      "Precision-engineered systems that power manufacturing lines, logistics networks, and critical infrastructure across six continents.",
    categories: [
      {
        name: "Automation & Robotics",
        slug: "automation-robotics",
        description:
          "Intelligent automation platforms that bring speed, accuracy, and adaptability to every stage of production.",
        subcategories: [
          {
            name: "Collaborative Robots",
            slug: "collaborative-robots",
            description:
              "Safe, sensor-rich robots designed to work alongside human operators in shared workspaces.",
            products: [
              {
                name: "KX CoBot",
                slug: "kx-cobot",
                description:
                  "A six-axis collaborative robot arm with force-limited joints and intuitive teach-pendant programming.",
                models: [
                  { name: "KX CoBot 5", slug: "kx-cobot-5", sku: "KXC-005", tagline: "5 kg payload, desktop-class" },
                  { name: "KX CoBot 12", slug: "kx-cobot-12", sku: "KXC-012", tagline: "12 kg payload, production-grade" },
                  { name: "KX CoBot 25", slug: "kx-cobot-25", sku: "KXC-025", tagline: "25 kg payload, heavy-duty" },
                ],
              },
            ],
          },
          {
            name: "Industrial AGVs",
            slug: "industrial-agvs",
            description:
              "Autonomous guided vehicles for material transport in warehouse and factory environments.",
            products: [
              {
                name: "KX Mover",
                slug: "kx-mover",
                description:
                  "A fleet-scalable autonomous guided vehicle with LiDAR navigation and dynamic path planning.",
                models: [
                  { name: "KX Mover 300", slug: "kx-mover-300", sku: "KXM-300", tagline: "300 kg capacity, compact footprint" },
                  { name: "KX Mover 1000", slug: "kx-mover-1000", sku: "KXM-1K", tagline: "1-tonne capacity, heavy logistics" },
                ],
              },
            ],
          },
          {
            name: "Vision Systems",
            slug: "vision-systems",
            description:
              "Machine vision platforms for real-time quality inspection, defect detection, and dimensional measurement.",
            products: [
              {
                name: "KX Sight",
                slug: "kx-sight",
                description:
                  "High-speed inline vision system with deep-learning defect classification.",
                models: [
                  { name: "KX Sight Pro", slug: "kx-sight-pro", sku: "KXS-PRO", tagline: "Multi-camera, sub-micron resolution" },
                  { name: "KX Sight Lite", slug: "kx-sight-lite", sku: "KXS-LTE", tagline: "Single-camera, rapid deployment" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Precision Instruments",
        slug: "precision-instruments",
        description:
          "Laboratory and field instruments delivering measurement certainty for research, quality, and compliance.",
        subcategories: [
          {
            name: "Metrology",
            slug: "metrology",
            description:
              "Dimensional and surface metrology instruments for nanometre-level accuracy.",
            products: [
              {
                name: "KX Measure CMM",
                slug: "kx-measure-cmm",
                description:
                  "A coordinate measuring machine with five-axis scanning and automated part alignment.",
                models: [
                  { name: "CMM 700", slug: "cmm-700", sku: "KMC-700", tagline: "Mid-range, shop-floor rated" },
                  { name: "CMM 1200", slug: "cmm-1200", sku: "KMC-1200", tagline: "Large-volume, aerospace-grade" },
                ],
              },
            ],
          },
          {
            name: "Spectroscopy",
            slug: "spectroscopy",
            description:
              "Optical and mass spectrometry systems for elemental and molecular analysis.",
            products: [
              {
                name: "KX Spectrum",
                slug: "kx-spectrum",
                description:
                  "Benchtop mass spectrometer with automated sample introduction and cloud data management.",
                models: [
                  { name: "Spectrum QE", slug: "spectrum-qe", sku: "KSP-QE", tagline: "Quadrupole-enhanced, high throughput" },
                  { name: "Spectrum FT", slug: "spectrum-ft", sku: "KSP-FT", tagline: "Fourier-transform, research-grade" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Process Control",
        slug: "process-control",
        description:
          "Sensors, controllers, and software that maintain process stability from pilot plants to gigafactories.",
        subcategories: [
          {
            name: "Flow & Level",
            slug: "flow-level",
            description:
              "High-accuracy flow meters and level transmitters for liquids, gases, and slurries.",
            products: [
              {
                name: "KX Flow",
                slug: "kx-flow",
                description:
                  "Coriolis mass flow meter with integrated diagnostics and HART/Modbus connectivity.",
                models: [
                  { name: "Flow 50", slug: "flow-50", sku: "KXF-050", tagline: "DN50, general purpose" },
                  { name: "Flow 200", slug: "flow-200", sku: "KXF-200", tagline: "DN200, high-volume pipelines" },
                ],
              },
            ],
          },
          {
            name: "Distributed Control",
            slug: "distributed-control",
            description:
              "Scalable DCS platforms for continuous and batch process management.",
            products: [
              {
                name: "KX Command",
                slug: "kx-command",
                description:
                  "A modular distributed control system with redundant controllers and integrated safety logic.",
                models: [
                  { name: "Command S", slug: "command-s", sku: "KXD-S", tagline: "Small-scale, up to 500 I/O" },
                  { name: "Command X", slug: "command-x", sku: "KXD-X", tagline: "Enterprise-scale, 50 000+ I/O" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================
  // 2. Energy Systems
  // ======================================================================
  {
    name: "Energy Systems",
    slug: "energy-systems",
    tagline: "Power Without Compromise",
    description:
      "Next-generation energy platforms spanning generation, storage, and distribution for a sustainable and resilient grid.",
    categories: [
      {
        name: "Renewable Generation",
        slug: "renewable-generation",
        description:
          "Utility-scale and distributed generation technologies harnessing solar, wind, and hydrogen.",
        subcategories: [
          {
            name: "Solar Arrays",
            slug: "solar-arrays",
            description:
              "High-efficiency photovoltaic modules and tracking systems for commercial and utility installations.",
            products: [
              {
                name: "KX Solar Panel",
                slug: "kx-solar-panel",
                description:
                  "Bifacial heterojunction solar module with industry-leading temperature coefficient.",
                models: [
                  { name: "Solar 450", slug: "solar-450", sku: "KES-450", tagline: "450 W, residential rooftop" },
                  { name: "Solar 700", slug: "solar-700", sku: "KES-700", tagline: "700 W, utility-scale" },
                ],
              },
            ],
          },
          {
            name: "Wind Turbines",
            slug: "wind-turbines",
            description:
              "Onshore and offshore wind turbine platforms with advanced blade aerodynamics.",
            products: [
              {
                name: "KX Aero",
                slug: "kx-aero",
                description:
                  "Direct-drive offshore wind turbine with a lightweight nacelle and predictive maintenance suite.",
                models: [
                  { name: "Aero 8", slug: "aero-8", sku: "KEA-008", tagline: "8 MW, onshore" },
                  { name: "Aero 15", slug: "aero-15", sku: "KEA-015", tagline: "15 MW, offshore floating" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Grid Infrastructure",
        slug: "grid-infrastructure",
        description:
          "Transmission and distribution equipment that keeps power flowing safely across continents.",
        subcategories: [
          {
            name: "Switchgear",
            slug: "switchgear",
            description:
              "Medium- and high-voltage switchgear for utility substations and industrial power distribution.",
            products: [
              {
                name: "KX Switch",
                slug: "kx-switch",
                description:
                  "SF6-free medium-voltage switchgear with vacuum interrupter technology.",
                models: [
                  { name: "Switch MV24", slug: "switch-mv24", sku: "KGS-MV24", tagline: "24 kV, eco-gas insulated" },
                  { name: "Switch HV145", slug: "switch-hv145", sku: "KGS-HV145", tagline: "145 kV, GIS compact" },
                ],
              },
            ],
          },
          {
            name: "Transformers",
            slug: "transformers",
            description:
              "Power and distribution transformers engineered for minimal losses and extended service life.",
            products: [
              {
                name: "KX Transformer",
                slug: "kx-transformer",
                description:
                  "Amorphous-core distribution transformer with real-time thermal monitoring.",
                models: [
                  { name: "TX 2500", slug: "tx-2500", sku: "KGT-2500", tagline: "2.5 MVA, pad-mount" },
                  { name: "TX 100", slug: "tx-100", sku: "KGT-100", tagline: "100 MVA, substation class" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Energy Storage",
        slug: "energy-storage",
        description:
          "Battery and hydrogen storage platforms that balance the grid and unlock renewable potential.",
        subcategories: [
          {
            name: "Battery Systems",
            slug: "battery-systems",
            description:
              "Lithium-ion and solid-state battery enclosures for grid, commercial, and microgrid applications.",
            products: [
              {
                name: "KX Vault",
                slug: "kx-vault",
                description:
                  "Containerised battery energy storage system with integrated fire suppression and BMS.",
                models: [
                  { name: "Vault 500", slug: "vault-500", sku: "KEB-500", tagline: "500 kWh, commercial" },
                  { name: "Vault 5000", slug: "vault-5000", sku: "KEB-5K", tagline: "5 MWh, utility-scale" },
                ],
              },
            ],
          },
          {
            name: "Hydrogen Storage",
            slug: "hydrogen-storage",
            description:
              "Compressed and liquid hydrogen storage vessels for mobility and stationary power.",
            products: [
              {
                name: "KX H2 Tank",
                slug: "kx-h2-tank",
                description:
                  "Type IV composite hydrogen storage vessel rated to 700 bar with integrated leak detection.",
                models: [
                  { name: "H2 Tank 350", slug: "h2-tank-350", sku: "KEH-350", tagline: "350 bar, fleet refuelling" },
                  { name: "H2 Tank 700", slug: "h2-tank-700", sku: "KEH-700", tagline: "700 bar, passenger vehicle" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================
  // 3. Digital Solutions
  // ======================================================================
  {
    name: "Digital Solutions",
    slug: "digital-solutions",
    tagline: "Intelligence, Connected",
    description:
      "Enterprise software and connected platforms that turn operational data into decisive action across the value chain.",
    categories: [
      {
        name: "IoT Platforms",
        slug: "iot-platforms",
        description:
          "Scalable device connectivity, edge computing, and data orchestration for the industrial Internet of Things.",
        subcategories: [
          {
            name: "Edge Gateways",
            slug: "edge-gateways",
            description:
              "Ruggedised edge computing devices that aggregate sensor data and run local inference models.",
            products: [
              {
                name: "KX Edge",
                slug: "kx-edge",
                description:
                  "Industrial edge gateway with GPU acceleration, OPC-UA, and MQTT connectivity.",
                models: [
                  { name: "Edge 100", slug: "edge-100", sku: "KDE-100", tagline: "Compact, fanless, DIN-rail" },
                  { name: "Edge 400", slug: "edge-400", sku: "KDE-400", tagline: "High-compute, GPU-enabled" },
                ],
              },
            ],
          },
          {
            name: "Cloud IoT Hub",
            slug: "cloud-iot-hub",
            description:
              "Cloud-native device management and telemetry ingestion at global scale.",
            products: [
              {
                name: "KX Connect",
                slug: "kx-connect",
                description:
                  "Managed IoT platform handling millions of device connections with built-in digital twin modelling.",
                models: [
                  { name: "Connect Standard", slug: "connect-standard", sku: "KDC-STD", tagline: "Up to 10 000 devices" },
                  { name: "Connect Enterprise", slug: "connect-enterprise", sku: "KDC-ENT", tagline: "Unlimited devices, multi-region" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Enterprise Analytics",
        slug: "enterprise-analytics",
        description:
          "AI-powered analytics suites that surface insights from structured and unstructured operational data.",
        subcategories: [
          {
            name: "Predictive Maintenance",
            slug: "predictive-maintenance",
            description:
              "Machine-learning models that forecast equipment failure before it impacts production.",
            products: [
              {
                name: "KX Predict",
                slug: "kx-predict",
                description:
                  "SaaS predictive maintenance platform with anomaly detection and remaining-useful-life estimation.",
                models: [
                  { name: "Predict Core", slug: "predict-core", sku: "KDA-COR", tagline: "Single-site, up to 500 assets" },
                  { name: "Predict Fleet", slug: "predict-fleet", sku: "KDA-FLT", tagline: "Multi-site, enterprise-wide" },
                ],
              },
            ],
          },
          {
            name: "Operational Intelligence",
            slug: "operational-intelligence",
            description:
              "Real-time dashboards and decision-support tools for plant and supply-chain leaders.",
            products: [
              {
                name: "KX Insight",
                slug: "kx-insight",
                description:
                  "Unified operational intelligence dashboard with natural-language querying and automated reporting.",
                models: [
                  { name: "Insight Pro", slug: "insight-pro", sku: "KDI-PRO", tagline: "Advanced visualisation, custom KPIs" },
                  { name: "Insight Essentials", slug: "insight-essentials", sku: "KDI-ESS", tagline: "Pre-built templates, rapid setup" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Cybersecurity",
        slug: "cybersecurity",
        description:
          "Industrial cybersecurity solutions protecting OT and IT networks against evolving threats.",
        subcategories: [
          {
            name: "OT Network Security",
            slug: "ot-network-security",
            description:
              "Purpose-built firewalls and intrusion detection for operational technology environments.",
            products: [
              {
                name: "KX Shield",
                slug: "kx-shield",
                description:
                  "OT-aware firewall with deep-packet inspection of industrial protocols.",
                models: [
                  { name: "Shield 1G", slug: "shield-1g", sku: "KDS-1G", tagline: "1 Gbps throughput, DIN-rail" },
                  { name: "Shield 10G", slug: "shield-10g", sku: "KDS-10G", tagline: "10 Gbps, data-centre grade" },
                ],
              },
            ],
          },
          {
            name: "Identity & Access",
            slug: "identity-access",
            description:
              "Zero-trust identity platforms for industrial control systems and remote access.",
            products: [
              {
                name: "KX Access",
                slug: "kx-access",
                description:
                  "Zero-trust remote access gateway for control-system engineers and third-party vendors.",
                models: [
                  { name: "Access 50", slug: "access-50", sku: "KDA-050", tagline: "50 concurrent sessions" },
                  { name: "Access 500", slug: "access-500", sku: "KDA-500", tagline: "500 concurrent sessions, HA cluster" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================
  // 4. Advanced Materials
  // ======================================================================
  {
    name: "Advanced Materials",
    slug: "advanced-materials",
    tagline: "Engineered at the Molecular Level",
    description:
      "High-performance materials designed for extreme environments in aerospace, medical, and industrial applications.",
    categories: [
      {
        name: "Composite Systems",
        slug: "composite-systems",
        description:
          "Carbon-fibre and glass-fibre composite laminates, prepregs, and structural cores for lightweight construction.",
        subcategories: [
          {
            name: "Structural Composites",
            slug: "structural-composites",
            description:
              "Load-bearing composite solutions for airframes, wind blades, and automotive chassis.",
            products: [
              {
                name: "KX Carbon",
                slug: "kx-carbon",
                description:
                  "Aerospace-grade carbon-fibre prepreg with autoclave and out-of-autoclave cure options.",
                models: [
                  { name: "Carbon T700", slug: "carbon-t700", sku: "KAC-T7", tagline: "Standard modulus, general structural" },
                  { name: "Carbon M60", slug: "carbon-m60", sku: "KAC-M60", tagline: "Ultra-high modulus, space-rated" },
                ],
              },
            ],
          },
          {
            name: "Core Materials",
            slug: "core-materials",
            description:
              "Honeycomb and foam cores that provide exceptional stiffness-to-weight ratios in sandwich panels.",
            products: [
              {
                name: "KX Core",
                slug: "kx-core",
                description:
                  "Aramid honeycomb core with flame-retardant resin coating for aircraft interior panels.",
                models: [
                  { name: "Core 32", slug: "core-32", sku: "KAK-032", tagline: "32 kg/m3, interior panels" },
                  { name: "Core 96", slug: "core-96", sku: "KAK-096", tagline: "96 kg/m3, structural floors" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Specialty Polymers",
        slug: "specialty-polymers",
        description:
          "Engineering thermoplastics and thermosets for demanding chemical, thermal, and mechanical environments.",
        subcategories: [
          {
            name: "High-Temperature Polymers",
            slug: "high-temperature-polymers",
            description:
              "PEEK, PEI, and custom blends that maintain structural integrity above 250 degrees Celsius.",
            products: [
              {
                name: "KX Therm",
                slug: "kx-therm",
                description:
                  "Injection-mouldable PEEK compound with carbon-fibre reinforcement for bearing and seal applications.",
                models: [
                  { name: "Therm 260", slug: "therm-260", sku: "KAT-260", tagline: "260 C continuous, unfilled" },
                  { name: "Therm 310 CF", slug: "therm-310-cf", sku: "KAT-310", tagline: "310 C, 30% carbon-fibre" },
                ],
              },
            ],
          },
          {
            name: "Biocompatible Polymers",
            slug: "biocompatible-polymers",
            description:
              "ISO 10993 compliant polymer systems for implantable devices and surgical instruments.",
            products: [
              {
                name: "KX BioGrade",
                slug: "kx-biograde",
                description:
                  "Medical-grade PEEK with full biocompatibility documentation and lot traceability.",
                models: [
                  { name: "BioGrade Implant", slug: "biograde-implant", sku: "KAB-IMP", tagline: "Implantable, radiolucent" },
                  { name: "BioGrade Instrument", slug: "biograde-instrument", sku: "KAB-INS", tagline: "Autoclavable, chemical resistant" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Ceramic & Thermal",
        slug: "ceramic-thermal",
        description:
          "Advanced ceramic formulations and thermal management materials for extreme heat and wear resistance.",
        subcategories: [
          {
            name: "Technical Ceramics",
            slug: "technical-ceramics",
            description:
              "Silicon carbide, alumina, and zirconia components for abrasion, corrosion, and high-temperature service.",
            products: [
              {
                name: "KX Cera",
                slug: "kx-cera",
                description:
                  "Pressureless-sintered silicon carbide components for pump seals, bearings, and armour tiles.",
                models: [
                  { name: "Cera SiC", slug: "cera-sic", sku: "KCC-SIC", tagline: "Silicon carbide, wear-resistant" },
                  { name: "Cera ZrO", slug: "cera-zro", sku: "KCC-ZRO", tagline: "Zirconia, fracture-tough" },
                ],
              },
            ],
          },
          {
            name: "Thermal Barrier Coatings",
            slug: "thermal-barrier-coatings",
            description:
              "Plasma-sprayed and EB-PVD coatings that protect turbine blades and combustion components.",
            products: [
              {
                name: "KX ThermaCoat",
                slug: "kx-thermacoat",
                description:
                  "Yttria-stabilised zirconia thermal barrier coating system with bond-coat optimisation.",
                models: [
                  { name: "ThermaCoat 1200", slug: "thermacoat-1200", sku: "KCT-1200", tagline: "1 200 C service, APS applied" },
                  { name: "ThermaCoat 1400", slug: "thermacoat-1400", sku: "KCT-1400", tagline: "1 400 C service, EB-PVD applied" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find((d) => d.slug === slug);
}

export function getCategoryBySlug(
  divisionSlug: string,
  categorySlug: string,
): Category | undefined {
  const division = getDivisionBySlug(divisionSlug);
  return division?.categories.find((c) => c.slug === categorySlug);
}

export function getSubcategoryBySlug(
  divisionSlug: string,
  categorySlug: string,
  subcategorySlug: string,
): Subcategory | undefined {
  const category = getCategoryBySlug(divisionSlug, categorySlug);
  return category?.subcategories.find((s) => s.slug === subcategorySlug);
}

export function getProductBySlug(
  divisionSlug: string,
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
): Product | undefined {
  const subcategory = getSubcategoryBySlug(divisionSlug, categorySlug, subcategorySlug);
  return subcategory?.products.find((p) => p.slug === productSlug);
}

export function getModelBySlug(
  divisionSlug: string,
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
  modelSlug: string,
): Model | undefined {
  const product = getProductBySlug(divisionSlug, categorySlug, subcategorySlug, productSlug);
  return product?.models.find((m) => m.slug === modelSlug);
}

/** Flat list of every product across all divisions. */
export function getAllProducts(): (Product & { divisionSlug: string; categorySlug: string; subcategorySlug: string })[] {
  const results: (Product & { divisionSlug: string; categorySlug: string; subcategorySlug: string })[] = [];
  for (const division of divisions) {
    for (const category of division.categories) {
      for (const subcategory of category.subcategories) {
        for (const product of subcategory.products) {
          results.push({
            ...product,
            divisionSlug: division.slug,
            categorySlug: category.slug,
            subcategorySlug: subcategory.slug,
          });
        }
      }
    }
  }
  return results;
}
