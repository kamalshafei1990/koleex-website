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
    <section className={styles.marketRegion} aria-labelledby={headingId}>
      <h3 id={headingId} className={styles.marketRegionTitle}>
        {continent} <span className={styles.marketRegionCount}>{markets.length}</span>
      </h3>
      <ul className={styles.marketNames}>
        {markets.map((market) => (
          <li key={market.code}>
            <MarketFlag code={market.code} flag={market.flag} />
            <span>{market.name}</span>
          </li>
        ))}
      </ul>
    </section>
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
