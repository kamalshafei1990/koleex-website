import { createHash } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, rename, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

// Provenance stays versioned; the original 76.5 MiB PDF never enters git.
export const CATALOG = Object.freeze({
  url: 'https://github.com/kamalshafei1990/koleex-website/releases/download/catalog-2025/KOLEEX-Catalog-2025.pdf',
  bytes: 80247243,
  sha256: 'c500080c3bad0dbd192eb4f80bf87ecaa876ff6b2adcdf879f7538092c7d1a43',
});
export const CATALOG_PATH = fileURLToPath(new URL('../public/catalogs/KOLEEX-Catalog-2025.pdf', import.meta.url));

export async function verifyCatalog(path, expected = CATALOG) {
  try {
    if ((await stat(path)).size !== expected.bytes) return false;
    const hash = createHash('sha256');
    for await (const chunk of createReadStream(path)) hash.update(chunk);
    return hash.digest('hex') === expected.sha256;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

// Injection is only for offline tests; the CLI always uses the pinned release.
export async function prepareCatalog({
  destination = CATALOG_PATH, expected = CATALOG, fetcher = fetch,
  attempts = 3, timeoutMs = 120_000,
} = {}) {
  if (await verifyCatalog(destination, expected)) return 'verified existing file';
  await mkdir(dirname(destination), { recursive: true });
  // Never leave an invalid cached catalog usable after a failed preparation.
  await rm(destination, { force: true });
  const temporary = `${destination}.${process.pid}.part`;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetcher(expected.url, {
        redirect: 'follow', signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok || !response.body) {
        await response.body?.cancel();
        throw new Error(`Catalog HTTP ${response.status}`);
      }
      let bytes = 0;
      const hash = createHash('sha256');
      const check = new Transform({
        transform(chunk, _encoding, callback) {
          bytes += chunk.length;
          if (bytes > expected.bytes) return callback(new Error('Catalog exceeds pinned size'));
          hash.update(chunk);
          callback(null, chunk);
        },
      });
      await pipeline(Readable.fromWeb(response.body), check, createWriteStream(temporary, { flags: 'wx' }));
      if (bytes !== expected.bytes || hash.digest('hex') !== expected.sha256) {
        throw new Error('Catalog size/SHA-256 mismatch');
      }
      await rename(temporary, destination);
      return 'downloaded and verified original';
    } catch (error) {
      await rm(temporary, { force: true });
      if (attempt === attempts) throw error;
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareCatalog().then(
    (result) => console.log(`Catalog: ${result}; ${CATALOG.bytes} bytes; SHA-256 ${CATALOG.sha256}`),
    (error) => { console.error('Catalog preparation failed; build stopped:', error.message); process.exitCode = 1; },
  );
}
