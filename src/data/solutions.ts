// ---------------------------------------------------------------------------
// Solutions data for the Koleex International Group website
// ---------------------------------------------------------------------------

export interface Solution {
  title: string;
  slug: string;
  description: string;
  /** Name of the icon to render (e.g. from lucide-react or a custom icon set). */
  icon: string;
  /** Extended summary shown on the solution detail page. */
  overview: string;
}

export const solutions: Solution[] = [
  {
    title: "Smart Manufacturing",
    slug: "smart-manufacturing",
    icon: "Factory",
    description:
      "End-to-end automation, real-time quality control, and predictive analytics that transform traditional factories into adaptive, data-driven production environments.",
    overview:
      "Our Smart Manufacturing suite integrates robotics, machine vision, and enterprise analytics into a unified operational layer. From shop-floor sensors to executive dashboards, every element is designed to reduce cycle times, eliminate waste, and accelerate time to market.",
  },
  {
    title: "Energy Transition",
    slug: "energy-transition",
    icon: "Zap",
    description:
      "Integrated renewable generation, storage, and grid management solutions that help utilities and enterprises achieve decarbonisation targets on schedule.",
    overview:
      "Koleex Energy Transition solutions combine solar arrays, wind turbines, battery storage, and intelligent grid infrastructure into cohesive energy ecosystems. Our platforms optimise dispatch in real time, balancing demand, supply, and market signals to maximise both sustainability and return on investment.",
  },
  {
    title: "Connected Infrastructure",
    slug: "connected-infrastructure",
    icon: "Network",
    description:
      "IoT-enabled monitoring, digital twins, and cybersecurity frameworks that keep critical infrastructure resilient, efficient, and secure.",
    overview:
      "From water treatment plants to transportation networks, our Connected Infrastructure solutions layer intelligent sensing and analytics onto physical assets. Digital twin models provide a living replica of operations, enabling scenario planning, predictive maintenance, and rapid incident response.",
  },
  {
    title: "Healthcare Innovation",
    slug: "healthcare-innovation",
    icon: "HeartPulse",
    description:
      "Biocompatible materials, precision instruments, and data platforms that accelerate medical device development and improve patient outcomes.",
    overview:
      "Koleex serves the healthcare value chain with medical-grade polymers, high-resolution imaging instruments, and secure cloud analytics. Our solutions support device OEMs, clinical researchers, and hospital networks in delivering safer, more effective care at lower cost.",
  },
  {
    title: "Sustainable Supply Chain",
    slug: "sustainable-supply-chain",
    icon: "Truck",
    description:
      "Visibility, traceability, and emissions tracking across global supply chains, powered by IoT sensors and enterprise analytics.",
    overview:
      "Our Sustainable Supply Chain offering delivers real-time visibility from raw material sourcing through final delivery. Embedded sensors and blockchain-anchored data trails ensure provenance, reduce scope-3 emissions reporting burden, and help organisations meet evolving ESG requirements.",
  },
  {
    title: "Aerospace & Defence",
    slug: "aerospace-defence",
    icon: "Plane",
    description:
      "Lightweight composite structures, thermal management systems, and mission-critical electronics for demanding airborne and space environments.",
    overview:
      "Koleex Aerospace & Defence solutions leverage decades of materials science and precision engineering expertise. From carbon-fibre airframe components to thermal barrier coatings for jet engines, our portfolio meets the stringent certification and performance requirements of global aerospace programmes.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
