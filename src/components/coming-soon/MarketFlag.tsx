"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./coming-soon.module.css";

/** Only the image fallback needs a client boundary; the directory stays server-rendered. */
export function MarketFlag({ code, flag }: { code: string; flag: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={styles.marketFlag} aria-hidden="true">
      {failed ? (
        flag
      ) : (
        <Image
          src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
          width={24}
          height={16}
          alt=""
          aria-hidden="true"
          unoptimized
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
