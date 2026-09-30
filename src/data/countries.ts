/* ---------------------------------------------------------------------------
   countries — what a visitor can pick on the contact form: the ISO codes the
   Hub's Customers app knows (its country list, 250), so the Hub files the
   country under the very name that app uses. The names shown are the
   browser's own, in the page's language (Intl.DisplayNames), each with its
   flag — the Hub's rule for every country list.
   --------------------------------------------------------------------------- */

export const COUNTRY_CODES: readonly string[] = (
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ " +
  "CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR " +
  "GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP " +
  "KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT " +
  "MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW " +
  "SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG " +
  "UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW"
).split(" ");

/** The flag of an ISO code, as the emoji the system draws. */
export const flagEmoji = (code: string): string =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));

/** Every country in a language: its code, its name there, its flag — in
 *  that language's alphabetical order. */
export function countryOptions(lang: string): Array<{ code: string; name: string; flag: string }> {
  let names: Intl.DisplayNames | null = null;
  try { names = new Intl.DisplayNames([lang, "en"], { type: "region" }); } catch { names = null; }
  return COUNTRY_CODES
    .map((code) => ({ code, name: names?.of(code) ?? code, flag: flagEmoji(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, lang));
}
