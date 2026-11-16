"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { KOLEEX_MARKETS } from "@/data/koleex-markets";
import styles from "./coming-soon.module.css";

const CONTINENTS = ["Asia", "Africa", "Europe", "North America", "South America"] as const;

type Continent = (typeof CONTINENTS)[number];

const CONTINENT_COUNTS = Object.fromEntries(
  CONTINENTS.map((continent) => [
    continent,
    KOLEEX_MARKETS.filter((market) => market.continent === continent).length,
  ]),
) as Record<Continent, number>;

export function MarketsBrowser() {
  const [selected, setSelected] = useState<Continent>("Asia");
  const [query, setQuery] = useState("");
  const tabRefs = useRef<Partial<Record<Continent, HTMLButtonElement | null>>>({});

  const markets = useMemo(() => {
    const inRegion = KOLEEX_MARKETS.filter((market) => market.continent === selected);
    const needle = query.trim().toLowerCase();
    if (!needle) return inRegion;
    return inRegion.filter(
      (market) => market.name.toLowerCase().includes(needle) || market.code.toLowerCase().includes(needle),
    );
  }, [selected, query]);

  function selectContinent(continent: Continent, moveFocus = false) {
    setSelected(continent);
    if (moveFocus) tabRefs.current[continent]?.focus();
  }

  function onTabListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = CONTINENTS.indexOf(selected);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectContinent(CONTINENTS[(index + 1) % CONTINENTS.length], true);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectContinent(CONTINENTS[(index - 1 + CONTINENTS.length) % CONTINENTS.length], true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectContinent(CONTINENTS[0], true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectContinent(CONTINENTS[CONTINENTS.length - 1], true);
    }
  }

  return (
    <div className={styles.marketsBrowser}>
      <div
        className={styles.segments}
        role="tablist"
        aria-label="Market regions"
        onKeyDown={onTabListKeyDown}
      >
        {CONTINENTS.map((continent) => {
          const isSelected = continent === selected;
          return (
            <button
              key={continent}
              type="button"
              role="tab"
              id={`market-tab-${continent.replace(/\s+/g, "-").toLowerCase()}`}
              aria-selected={isSelected}
              aria-controls="market-panel"
              tabIndex={isSelected ? 0 : -1}
              className={styles.segment}
              ref={(node) => {
                tabRefs.current[continent] = node;
              }}
              onClick={() => selectContinent(continent)}
            >
              <span className={styles.segmentName}>{continent}</span>
              <span className={styles.segmentCount}>{CONTINENT_COUNTS[continent]}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="market-panel"
        aria-labelledby={`market-tab-${selected.replace(/\s+/g, "-").toLowerCase()}`}
        className={styles.continent}
      >
        <div className={styles.panelHead}>
          <h3 className={styles.continentTitle}>{selected}</h3>
          <input
            type="search"
            className={styles.marketSearch}
            placeholder="Find a market"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Find a market"
            autoComplete="off"
          />
        </div>
        {markets.length === 0 ? (
          <p className={styles.marketEmpty}>No markets in this region match.</p>
        ) : (
          <ul className={styles.marketGrid}>
            {markets.map((market) => (
              <li key={market.code}>
                <span className={styles.flag} aria-hidden="true">
                  {market.flag}
                </span>
                <span>{market.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
