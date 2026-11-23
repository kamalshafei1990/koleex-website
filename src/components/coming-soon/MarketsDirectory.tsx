import { KOLEEX_MARKETS } from "@/data/koleex-markets";
import { MarketFlag } from "./MarketFlag";
import styles from "./coming-soon.module.css";

const CONTINENTS = ["Asia", "Africa", "Europe", "North America", "South America"] as const;

type Continent = (typeof CONTINENTS)[number];

function marketsIn(continent: Continent) {
  return KOLEEX_MARKETS.filter((market) => market.continent === continent);
}

function regionId(continent: Continent) {
  return `markets-${continent.replace(/\s+/g, "-").toLowerCase()}`;
}

function MarketRegion({ continent }: { continent: Continent }) {
  const markets = marketsIn(continent);
  const headingId = regionId(continent);

  return (
    <details className={styles.marketRegion}>
      <summary className={styles.marketRegionToggle}>
        <h3 id={headingId} className={styles.marketRegionTitle}>
          <span>{continent}</span>
          <span className={styles.marketRegionCount} aria-label={`${markets.length} markets`}>{markets.length}</span>
          <svg className={styles.marketRegionChevron} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h3>
      </summary>
      <ul className={styles.marketNames} aria-labelledby={headingId}>
        {markets.map((market) => (
          <li key={market.code}>
            <MarketFlag code={market.code} flag={market.flag} />
            <span>{market.name}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function MarketsDirectory() {
  return (
    <div className={styles.marketsDirectory}>
      {CONTINENTS.map((continent) => (
        <MarketRegion key={continent} continent={continent} />
      ))}
    </div>
  );
}
