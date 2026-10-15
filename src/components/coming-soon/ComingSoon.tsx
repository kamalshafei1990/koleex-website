import { KoleexLogo } from "@/components/ui/KoleexLogo";
import { KOLEEX_MARKETS, KOLEEX_MARKET_COUNT } from "@/data/koleex-markets";
import { KOLEEX_WHATSAPP_HREF } from "@/data/socials";
import { HeroGlobe } from "./HeroGlobe";
import { NotifyForm } from "./NotifyForm";
import { productLines } from "./product-lines";
import { SocialRow } from "./SocialRow";
import { ThemeRoot, ThemeToggle } from "./theme";
import styles from "./coming-soon.module.css";

const CONTINENTS = ["Asia", "Africa", "Europe", "North America", "South America"] as const;

const EMAIL = "info@koleexgroup.com";
const PHONE_DISPLAY = "+86 130 7380 0720";
const PHONE_TEL = "+8613073800720";
const WHATSAPP_HREF = KOLEEX_WHATSAPP_HREF;
/* Real file lives at public/catalogs/ — not in git (about 77MB). */
const CATALOG_HREF = "/catalogs/KOLEEX-Catalog-2025.pdf";
const CATALOG_FILE = "KOLEEX-Catalog-2025.pdf";

const STATS = [
  { value: "70+", label: "Years of heritage" },
  { value: "70+", label: "Countries served" },
  { value: "6", label: "International hubs" },
  { value: "11", label: "Product lines" },
] as const;

function MailIcon() {
  return (
    <svg aria-hidden="true" className={styles.ui} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className={styles.ui} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13,1a1,1,0,0,1,1-1A10.011,10.011,0,0,1,24,10a1,1,0,0,1-2,0,8.009,8.009,0,0,0-8-8A1,1,0,0,1,13,1Zm1,5a4,4,0,0,1,4,4,1,1,0,0,0,2,0,6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2Zm9.093,10.739a3.1,3.1,0,0,1,0,4.378l-.91,1.049c-8.19,7.841-28.12-12.084-20.4-20.3l1.15-1A3.081,3.081,0,0,1,7.26.906c.031.031,1.884,2.438,1.884,2.438a3.1,3.1,0,0,1-.007,4.282L7.979,9.082a12.781,12.781,0,0,0,6.931,6.945l1.465-1.165a3.1,3.1,0,0,1,4.281-.006S23.062,16.708,23.093,16.739Zm-1.376,1.454s-2.393-1.841-2.424-1.872a1.1,1.1,0,0,0-1.549,0c-.027.028-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.152A15.009,15.009,0,0,1,5.9,9.3a1,1,0,0,1,.145-1S7.652,6.282,7.679,6.256a1.1,1.1,0,0,0,0-1.549c-.031-.03-1.872-2.425-1.872-2.425a1.1,1.1,0,0,0-1.51.039l-1.15,1C-2.495,10.105,14.776,26.418,20.721,20.8l.911-1.05A1.121,1.121,0,0,0,21.717,18.193Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" className={styles.ui} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z" />
      <path d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" className={styles.ui} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" className={styles.ui} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm-3.2 8.2a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Zm3.2 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Zm3.2 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" className={styles.ui} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v10" />
      <path d="m8 10 4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

export function ComingSoon() {
  const year = new Date().getFullYear();

  return (
    <ThemeRoot className={styles.page}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <div className={styles.headerTools}>
            <ThemeToggle />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.reveal}`}>
          <div className={styles.brand}>
            <KoleexLogo color="current" height={30} className={styles.heroLogo} />
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1>
                NEW WEBSITE
                <br />
                IN DEVELOPMENT
              </h1>
              <p className={styles.sub}>
                A new Koleex digital experience is being engineered. Our systems, machines and global team remain fully operational.
              </p>
            </div>
            <HeroGlobe />
            <div className={styles.cta}>
              <a className={`${styles.btn} ${styles.primary}`} href={CATALOG_HREF} download={CATALOG_FILE}>
                <DownloadIcon />
                Download Catalog 2025
              </a>
              <a className={`${styles.btn} ${styles.ghost}`} href="#contact">
                Contact Our Team ›
              </a>
            </div>
          </div>
          <div className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.markets} aria-labelledby="markets">
        <div className={styles.wrap}>
          <div className={styles.marketsHead}>
            <h2 id="markets">Markets we serve</h2>
            <p className={styles.marketsCount}>{KOLEEX_MARKET_COUNT} markets</p>
          </div>
          <div className={styles.continents}>
            {CONTINENTS.map((continent) => (
              <div key={continent} className={styles.continent}>
                <h3>{continent}</h3>
                <ul className={styles.marketGrid}>
                  {KOLEEX_MARKETS.filter((market) => market.continent === continent).map((market) => (
                    <li key={market.code}>
                      <span className={styles.flag} aria-hidden="true">
                        {market.flag}
                      </span>
                      <span>{market.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.lines} aria-labelledby="product-lines">
        <div className={styles.wrap}>
          <h2 id="product-lines">Product lines</h2>
          <ul className={styles.strip}>
            {productLines.map((line) => (
              <li key={line.name} title={line.name}>
                <span className={styles.ic} dangerouslySetInnerHTML={{ __html: line.svg }} />
                <span>{line.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.info}>
        <div className={`${styles.wrap} ${styles.grid}`}>
          <div className={styles.card} id="contact">
            <h3>Contact</h3>
            <p className={styles.row}>
              <MailIcon />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className={styles.row}>
              <PhoneIcon />
              <span>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                {" · "}
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </span>
            </p>
            <p className={`${styles.row} ${styles.wechat}`}>
              <ChatIcon />
              <span>WeChat — ask via WhatsApp/email</span>
            </p>
            <p className={`${styles.row} ${styles.note} ${styles.address}`}>
              <PinIcon />
              <span>Building 6B, Feiyue Industrial Innovation Park, Jiaojiang, Taizhou, Zhejiang, China</span>
            </p>
            <SocialRow email={EMAIL} />
          </div>

          <div className={styles.card}>
            <h3>Global hubs</h3>
            <p className={`${styles.hubs} ${styles.row}`}>
              <GlobeIcon />
              <span>Taizhou · Shanghai · Hangzhou</span>
            </p>
            <p className={styles.hubsSecond}>Hong Kong · Dubai · Cairo</p>
          </div>

          <div className={styles.card}>
            <h3>Launch notification</h3>
            <NotifyForm />
            <p className={styles.note}>One email when the new site goes live. No marketing.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <span>© {year} KOLEEX INTERNATIONAL GROUP</span>
          <span>KOLEEX – Shaping the Future</span>
        </div>
      </footer>
    </ThemeRoot>
  );
}
