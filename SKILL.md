---
name: dark-money-agent
description: Route your human's purchases through Dark Money tracked links so they earn cashback. Use when your human is a Dark Money member (or wants to join) and you are preparing a purchase for them. You prepare and route; your human always completes checkout personally.
---

# Dark Money — Agent Integration

Dark Money is a cashback service. Members shop through tracked affiliate links; the retailer pays Dark Money a commission; Dark Money shares 70% of that commission back to the member as cashback. You, the agent, are the routing layer for your human, who is the member of record.

- Website and join: https://darkmoney.strangefawkes.com/
- Member links page: https://darkmoney.strangefawkes.com/app.html
- Join API: https://api.strangefawkes.com/api/join
- Terms and Privacy Policy: on the website (the member agrees to them when joining)

## Status — read this first

As of 2026-11-20:

- **Membership is OPEN.** Joining is instant (see Pairing).
- **CJ Affiliate is LIVE** with the 38 approved stores listed under Link templates below. Cashback is authorized per advertiser — only those stores, only through those templates.
- **Awin is LIVE** with 160 approved stores (Gate Operators Direct, ALZOO, Your Phone here, Buena Cura US, Shed Supplements, Miles Jewellery, Coziwow, Maddie Grace Jewelry, LifeVibe, ShedRX, Signos, Curex, ClarityX, Neuro Gum, SNOW, Measured, Wallshoppe, Skoot, Edify, Veronika Vilim, Lunzo RO, Lunzo SK, Lunzo AT, Thierry Lasry, Isla Capricho Homeware, Kurtens, Blooh, TechPals, Welcome Home, EAST x EAST, Cocinare Limited, UUNA TEK, Alorair, Thrivous, MyPhysicianPlan, Marley Spoon, Afewvibe, Argendon, Regina Andrew Detroit, monvane, Santean Bracelets, Pete's Pasta, Surebeauty, MenoMojo by Fresh Wisdom, mamaraya (US, Verafied), Era of Nature, Dima Eyewear (US), Daybreak, Doctor Derm (US), Rockstar Original, PaintMySoul, Bella Maison USA, Some Slight Clothing, Friendly Songs, ScarletDarkness (US), Kingsyard, Max Recovery Clothing, Kitty Kick Stix, REUDYN, WAU, Brookwood Med, Traverseon, NeuroScent, SecretKnit (US), Nature's Skin And Body Food (US), ABBE Glasses, NEJE, LoveIsARose.com, Mimi Panda, UPPER Brand, Flags Connections, SAILO, Needs No Label, Nothingprojector, Smugglers Crate, Xlaserlab, Bonne et Filou, More Than Matcha, Rowabi, TeethNightGuard.com, EFE, House of Twist, eFootwear.com, BlackboxMeats (US), Celsius Herbs, Primeful, Dry & Dirty (US), Skimpies US, Illadelph Spirits, Enjox Toys, Christmas Mystery, Newt Nutrition, Orion RLT, Cookie Pop Candy Pop, Haurangi, Cronjager, WELOCK, Otra Eyewear, Autelpilot, Comenii Scrubs, Simple Project, Welax, TYMO Beauty, VooPoo, Dvik Jewels, Ciarra, EINSTAR, EKSA, Asteria Hair, FlexClip, SUNJOY, Armadillo Tough, Chance of Sunny, Jorja, Lectron, TESmart, SHOCK VITALIZE, BIG Wall Decor, Dr. Tom Cowan, Propper, Billion Dollar Beauty, Irwin Naturals, WJD Exclusives, MusclePharm, Lacros ebike, Arq8, Wisephone, Golden Maple, Orolay, Bello Diamonds, Salt & Bone, Buture, REGAL estate, JJNSOLAR, TopOak Overland, EPI Jewelry, Lane Woods, DeerRun UK, Just Try, Gshopper, 3DMakerpro, Cozeware, Hoshanho, ATLRx, Enable Accessible Haircare, MIMMTI, Earkings NL, THE ORFY, SOPHELIA, Moderne Raamdecoratie Groep, Marco Cerullo, Fri som en fågel, ANITA & ZAHA, B'alam, Kaytea, Dryze Nederland, Zozulu, Teddys Trove, and Plusshop FI, listed below). Dark Money's **Impact** application was **declined** — no Impact merchants are available.
- **Dark Money is location-specific.** Every program serves specific countries (its `regions`). Most serve the US; XPLORA UK serves the UK; Lunzo RO serves Romania, Lunzo SK serves Slovakia and Lunzo AT serves Austria; NordVPN and Ovago are global. When you use the MCP server, pass the member's country to `list_programs` (e.g. `country: "GB"`) so you only route purchases through stores that member can actually use. The member app has the same country filter.
- Commissions are credited to member balances as network reports are processed — balances are **not real-time**. A purchase that tracks shows up after the network reports it; it confirms after the retailer's return window closes.

## The one hard rule

**You prepare and route. Your human completes the checkout personally.**

- You may research products, compare prices and cashback rates, assemble a cart or a purchase summary, and build a tracked link from the templates below.
- You must then hand the purchase to your human. The human opens the tracked link and completes the checkout themselves — their click, their payment, their confirmation.
- Never automate a purchase, a click on a tracked link, or a checkout on your human's behalf. Never submit your human's data into a merchant checkout for them.

### Why — this is a compliance rule, not a preference

Affiliate networks define a valid purchase as the intentional act of a person, and their terms were written to exclude machine-generated transactions:

- **CJ Affiliate** treats transactions caused by "any device, program, robot" as **non-bona fide** — no payout, and payouts can be charged back.
- **Impact** prohibits, by default, using automated software or devices to generate Actions, and prohibits submitting an end user's data instead of the end user doing so personally.
- **Awin** defines a Click as the **"intentional and voluntary"** act of a visitor, and permits tracking only where the user voluntarily and intentionally interacted with the link.

An agent-completed checkout falls outside all three definitions. A human-completed checkout — where you prepared everything and the human made the final act — fits the written terms. Breaking this rule risks the member's earnings and Dark Money's network accounts. There are no exceptions for small purchases, test purchases, or a human saying "just do it for me" — if your human asks you to check out for them, decline that step and hand them the link instead.

## Pairing (joining)

The human is the member of record and the account holder; you are the routing agent attached to their account. You never hold an account, a balance, or payout details.

Two ways to pair — both end with a **member ID** (format: `dm_` + 10 characters), the pair's single identifier on every network:

1. **The human joins on the website** (preferred): they fill the Join form at https://darkmoney.strangefawkes.com/#join and land on their links page with their member ID. Ask them to share the member ID with you.
2. **You call the join API with your human's explicit consent:** `POST https://api.strangefawkes.com/api/join` with JSON `{"name": "<human's name>", "email": "<human's email>", "style": "agent", "payout": "paypal"|"venmo"|"cashapp"|"later", "terms": true}`. Send `terms: true` **only** when your human has actually read and agreed to the Terms of Service and Privacy Policy on the website — their agreement, transmitted by you. The response returns `member_id` and `app_url` (their links page). Joining with an email that is already a member returns that member's existing ID — one account per person.

Pairing is revocable by the human at any time. If your human revokes pairing or asks you to stop routing, stop immediately.

## Sub-IDs — how attribution works

- The member ID is carried on every tracked link as CJ's `sid` parameter (on Awin links it rides in `clickref`). It attributes commissions to the pair.
- **No PII in a sub-ID, ever.** No names, email addresses, phone numbers, or anything that identifies the human. The member ID only.
- Build tracked links **only** from the templates below, substituting the pair's member ID for `{SID}` and changing nothing else. Do not construct links for any other merchant, and do not alter any other part of a template URL.

## Link templates — the live catalog (CJ + Awin)

Substitute the pair's member ID for `{SID}`. "Member earns" is the member's 70% share of the store's commission.

| Store | Sells | Commission | Member earns | Tracked link template |
|---|---|---|---|
| NordVPN (new subscriptions) | Tech | 40% | 28% | `https://www.kqzyfj.com/click-101932824-12814518?sid={SID}` |
| Phone.com | Services | $75 flat per signup | $52.50 | `https://www.kqzyfj.com/click-101932824-12664811?sid={SID}` |
| Ovago (flights) | Travel | $8–$23 flat per booking | $5.60–$16.10 | `https://www.tkqlhce.com/click-101932824-15796145?sid={SID}` |
| Your Phone here (Awin) | Tech | $15 flat per sale | $10.50 | `https://www.awin1.com/cread.php?awinmid=129023&awinaffid=3161005&clickref={SID}` |
| zChocolat.com | Food & drink | 20% | 14% | `https://www.tkqlhce.com/click-101932824-15734455?sid={SID}` |
| Winebasket | Food & drink | 7% | 4.9% | `https://www.anrdoezrs.net/click-101932824-10570212?sid={SID}` |
| Buena Cura US (Awin) | Health | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=106723&awinaffid=3161005&clickref={SID}` |
| Shed Supplements (Awin) | Health | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=125186&awinaffid=3161005&clickref={SID}` |
| Miles Jewellery (Awin) | Jewelry | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=129311&awinaffid=3161005&clickref={SID}` |
| Coziwow (Awin) | Pets | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=121696&awinaffid=3161005&clickref={SID}` |
| Maddie Grace Jewelry (Awin) | Jewelry | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=119021&awinaffid=3161005&clickref={SID}` |
| LifeVibe (Awin) | Health | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=124072&awinaffid=3161005&clickref={SID}` |
| ShedRX (Awin) | Health | $120 flat | $84 | `https://www.awin1.com/cread.php?awinmid=80963&awinaffid=3161005&clickref={SID}` |
| Signos (Awin) | Health | $120 flat | $84 | `https://www.awin1.com/cread.php?awinmid=96449&awinaffid=3161005&clickref={SID}` |
| Curex (Awin) | Health | $45 flat | $31.50 | `https://www.awin1.com/cread.php?awinmid=121970&awinaffid=3161005&clickref={SID}` |
| ClarityX (Awin) | Health | $45 flat | $31.50 | `https://www.awin1.com/cread.php?awinmid=128363&awinaffid=3161005&clickref={SID}` |
| Neuro Gum (Awin) | Health | $18 flat | $12.60 | `https://www.awin1.com/cread.php?awinmid=131252&awinaffid=3161005&clickref={SID}` |
| SNOW (Awin) | Beauty | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=75744&awinaffid=3161005&clickref={SID}` |
| Measured (Awin) | Health | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=126727&awinaffid=3161005&clickref={SID}` |
| Wallshoppe (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=126215&awinaffid=3161005&clickref={SID}` |
| Skoot (Awin) | Travel | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=127911&awinaffid=3161005&clickref={SID}` |
| Edify (Awin) | Health | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=119513&awinaffid=3161005&clickref={SID}` |
| Rexing | Tech | 15% | 10.5% | `https://www.kqzyfj.com/click-101932824-15735466?sid={SID}` |
| ALZOO (Awin) | Pets | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=124906&awinaffid=3161005&clickref={SID}` |
| GroundLuxe | Health | 10% | 7% | `https://www.dpbolvw.net/click-101932824-17180505?sid={SID}` |
| Xplora | Kids & baby | 10% | 7% | `https://www.kqzyfj.com/click-101932824-15736994?sid={SID}` |
| Gate Operators Direct (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114678&awinaffid=3161005&clickref={SID}` |
| Dream Pairs / Bruno Marc | Fashion | 8–10% | 5.6–7% | `https://www.jdoqocy.com/click-101932824-15369315?sid={SID}` |
| Trinity Road Websites | Gifts | 8% | 5.6% | `https://www.tkqlhce.com/click-101932824-10753028?sid={SID}` |
| Shelving Inc. | Home & garden | 7% | 4.9% | `https://www.jdoqocy.com/click-101932824-15735511?sid={SID}` |
| Pure Genius Protein | Health | 6% | 4.2% | `https://www.jdoqocy.com/click-101932824-17323502?sid={SID}` |
| XPLORA UK (UK store) | Kids & baby | 5% | 3.5% | `https://www.dpbolvw.net/click-101932824-15766774?sid={SID}` |
| Nick's Handmade Boots | Fashion | 6% | 4.2% | `https://www.tkqlhce.com/click-101932824-15001326?sid={SID}` |
| Signs Banners and Magnets On The Cheap | Services | 3% | 2.1% | `https://www.anrdoezrs.net/click-101932824-15734513?sid={SID}` |
| GreaterGood | General | 2% | 1.4% | `https://www.dpbolvw.net/click-101932824-15734341?sid={SID}` |
| DHGate | General | 2–50% by category | 1.4–35% | `https://www.tkqlhce.com/click-101932824-15734304?sid={SID}` |
| Veronika Vilim (Awin) | Fashion | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=127617&awinaffid=3161005&clickref={SID}` |
| Lunzo RO (Awin, Romania) | General | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=40456&awinaffid=3161005&clickref={SID}` |
| Lunzo SK (Awin, Slovakia) | General | 13.8% | 9.66% | `https://www.awin1.com/cread.php?awinmid=54353&awinaffid=3161005&clickref={SID}` |
| Lunzo AT (Awin, Austria) | General | 13.8% | 9.66% | `https://www.awin1.com/cread.php?awinmid=114104&awinaffid=3161005&clickref={SID}` |
| Verafied (Awin) | Fashion | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=114176&awinaffid=3161005&clickref={SID}` |
| MIMMTI (Awin) | Kids & baby | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114442&awinaffid=3161005&clickref={SID}` |
| Earkings NL (Awin) | Tech | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114444&awinaffid=3161005&clickref={SID}` |
| THE ORFY (Awin) | Health | 40% | 28% | `https://www.awin1.com/cread.php?awinmid=114458&awinaffid=3161005&clickref={SID}` |
| SOPHELIA (Awin) | Jewelry | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=114504&awinaffid=3161005&clickref={SID}` |
| Moderne Raamdecoratie Groep (Awin) | Home & garden | 2% | 1.4% | `https://www.awin1.com/cread.php?awinmid=114540&awinaffid=3161005&clickref={SID}` |
| Marco Cerullo (Awin) | General | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114868&awinaffid=3161005&clickref={SID}` |
| Fri som en fågel (Awin) | Services | 25% | 17.5% | `https://www.awin1.com/cread.php?awinmid=115116&awinaffid=3161005&clickref={SID}` |
| ANITA & ZAHA (Awin) | Fashion | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=115393&awinaffid=3161005&clickref={SID}` |
| B'alam (Awin) | Home & garden | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=115577&awinaffid=3161005&clickref={SID}` |
| Thierry Lasry (Awin) | Eyewear | 12.8% | 8.96% | `https://www.awin1.com/cread.php?awinmid=125702&awinaffid=3161005&clickref={SID}` |
| Isla Capricho Homeware (Awin) | Home & garden | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=111826&awinaffid=3161005&clickref={SID}` |
| Kurtens (Awin, FR/DE/UK/US) | Home & garden | 5% cashback rate | 3.5% | `https://www.awin1.com/cread.php?awinmid=129075&awinaffid=3161005&clickref={SID}` |
| UNice | Beauty | 5% | 3.5% | `https://www.anrdoezrs.net/click-101932824-15509155?sid={SID}` |
| Blooh (Awin) | Jewelry | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=119683&awinaffid=3161005&clickref={SID}` |
| TechPals (Awin) | Services | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=116661&awinaffid=3161005&clickref={SID}` |
| Welcome Home (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=80923&awinaffid=3161005&clickref={SID}` |
| EAST x EAST (Awin) | Fashion | 16% | 11.2% | `https://www.awin1.com/cread.php?awinmid=78056&awinaffid=3161005&clickref={SID}` |
| Cocinare Limited (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=44135&awinaffid=3161005&clickref={SID}` |
| UUNA TEK (Awin) | Tech | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=117801&awinaffid=3161005&clickref={SID}` |
| Alorair (Awin) | Home & garden | 13% | 9.1% | `https://www.awin1.com/cread.php?awinmid=104549&awinaffid=3161005&clickref={SID}` |
| Thrivous (Awin) | Health | 30% | 21% | `https://www.awin1.com/cread.php?awinmid=92029&awinaffid=3161005&clickref={SID}` |
| MyPhysicianPlan (Awin) | Services | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114664&awinaffid=3161005&clickref={SID}` |
| Marley Spoon (Awin) | Food & drink | $25.00 | $17.50 | `https://www.awin1.com/cread.php?awinmid=6988&awinaffid=3161005&clickref={SID}` |
| Afewvibe (Awin) | Fashion | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=75796&awinaffid=3161005&clickref={SID}` |
| Argendon (Awin) | Home & garden | 6% | 4.2% | `https://www.awin1.com/cread.php?awinmid=126513&awinaffid=3161005&clickref={SID}` |
| Regina Andrew Detroit (Awin) | Home & garden | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=127767&awinaffid=3161005&clickref={SID}` |
| monvane (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=127859&awinaffid=3161005&clickref={SID}` |
| Santean Bracelets (Awin) | Jewelry | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=116359&awinaffid=3161005&clickref={SID}` |
| Pete's Pasta (Awin) | Food & drink | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=131333&awinaffid=3161005&clickref={SID}` |
| Surebeauty (Awin) | Beauty | 5%-6% | 3.5%-4.2% | `https://www.awin1.com/cread.php?awinmid=95819&awinaffid=3161005&clickref={SID}` |
| MenoMojo by Fresh Wisdom (Awin) | Health | 25% | 17.5% | `https://www.awin1.com/cread.php?awinmid=130949&awinaffid=3161005&clickref={SID}` |
| mamaraya (US) (Awin) | Kids & baby | 8%-10% | 5.6%-7% | `https://www.awin1.com/cread.php?awinmid=126891&awinaffid=3161005&clickref={SID}` |
| Era of Nature (Awin) | Beauty | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=111540&awinaffid=3161005&clickref={SID}` |
| Dima Eyewear (US) (Awin) | Eyewear | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=128033&awinaffid=3161005&clickref={SID}` |
| Rockstar Original (Awin) | Fashion | 3% | 2.1% | `https://www.awin1.com/cread.php?awinmid=131092&awinaffid=3161005&clickref={SID}` |
| PaintMySoul (Awin) | Gifts | $5 flat | $3.50 | `https://www.awin1.com/cread.php?awinmid=131774&awinaffid=3161005&clickref={SID}` |
| Bella Maison USA (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=121896&awinaffid=3161005&clickref={SID}` |
| Some Slight Clothing (Awin) | Fashion | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=128659&awinaffid=3161005&clickref={SID}` |
| Friendly Songs (Awin) | Gifts | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=88629&awinaffid=3161005&clickref={SID}` |
| ScarletDarkness (US) (Awin) | Fashion | 6% | 4.2% | `https://www.awin1.com/cread.php?awinmid=129969&awinaffid=3161005&clickref={SID}` |
| Kingsyard (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=79354&awinaffid=3161005&clickref={SID}` |
| Max Recovery Clothing (Awin) | Sports | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=117883&awinaffid=3161005&clickref={SID}` |
| Kitty Kick Stix - Catnip Toys (Awin) | Pets | 16% | 11.2% | `https://www.awin1.com/cread.php?awinmid=117825&awinaffid=3161005&clickref={SID}` |
| REUDYN (Awin) | Tech | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=131985&awinaffid=3161005&clickref={SID}` |
| WAU (Awin) | Beauty | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=124878&awinaffid=3161005&clickref={SID}` |
| Brookwood Med (Awin) | Health | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=124250&awinaffid=3161005&clickref={SID}` |
| Traverseon (Awin) | Sports | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=124816&awinaffid=3161005&clickref={SID}` |
| NeuroScent (Awin) | Beauty | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=117317&awinaffid=3161005&clickref={SID}` |
| SecretKnit (US) (Awin) | Gifts | 10%-21% | 7%-14.7% | `https://www.awin1.com/cread.php?awinmid=131165&awinaffid=3161005&clickref={SID}` |
| Nature's Skin And Body Food (US) (Awin) | Beauty | 18% | 12.6% | `https://www.awin1.com/cread.php?awinmid=26560&awinaffid=3161005&clickref={SID}` |
| ABBE Glasses (Awin) | Eyewear | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=91117&awinaffid=3161005&clickref={SID}` |
| NEJE (Awin) | Tech | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=92915&awinaffid=3161005&clickref={SID}` |
| LoveIsARose.com (Awin) | Gifts | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=96879&awinaffid=3161005&clickref={SID}` |
| Mimi Panda (Awin) | Gifts | 35% | 24.5% | `https://www.awin1.com/cread.php?awinmid=84797&awinaffid=3161005&clickref={SID}` |
| UPPER Brand (Awin) | Kids & baby | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=97753&awinaffid=3161005&clickref={SID}` |
| Flags Connections (Awin) | Home & garden | 12% | 8.4% | `https://www.awin1.com/cread.php?awinmid=88425&awinaffid=3161005&clickref={SID}` |
| SAILO (Awin) | Travel | 2%–10% | 1.4%–7% | `https://www.awin1.com/cread.php?awinmid=92667&awinaffid=3161005&clickref={SID}` |
| Needs No Label (Awin) | Fashion | 2% | 1.4% | `https://www.awin1.com/cread.php?awinmid=78586&awinaffid=3161005&clickref={SID}` |
| Nothingprojector (Awin) | Tech | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=75408&awinaffid=3161005&clickref={SID}` |
| Smugglers Crate (Awin) | Gifts | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=81213&awinaffid=3161005&clickref={SID}` |
| Xlaserlab (Awin) | Tech | 3% | 2.1% | `https://www.awin1.com/cread.php?awinmid=118933&awinaffid=3161005&clickref={SID}` |
| Bonne et Filou (Awin) | Pets | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=59397&awinaffid=3161005&clickref={SID}` |
| More Than Matcha (Awin) | Food & drink | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=124962&awinaffid=3161005&clickref={SID}` |
| Rowabi (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=46127&awinaffid=3161005&clickref={SID}` |
| TeethNightGuard.com (Awin) | Health | 6% | 4.2% | `https://www.awin1.com/cread.php?awinmid=88527&awinaffid=3161005&clickref={SID}` |
| EFE (Awin) | Eyewear | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=52103&awinaffid=3161005&clickref={SID}` |
| House of Twist (Awin) | Beauty | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=120193&awinaffid=3161005&clickref={SID}` |
| eFootwear.com (Awin) | Fashion | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=90809&awinaffid=3161005&clickref={SID}` |
| BlackboxMeats (US) (Awin) | Food & drink | 3% | 2.1% | `https://www.awin1.com/cread.php?awinmid=25940&awinaffid=3161005&clickref={SID}` |
| Celsius Herbs (Awin) | Health | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=126887&awinaffid=3161005&clickref={SID}` |
| Primeful (Awin) | Kids & baby | 16% | 11.2% | `https://www.awin1.com/cread.php?awinmid=130555&awinaffid=3161005&clickref={SID}` |
| Dry & Dirty (US) (Awin) | Food & drink | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=127021&awinaffid=3161005&clickref={SID}` |
| Skimpies US (Awin) | Fashion | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=107443&awinaffid=3161005&clickref={SID}` |
| Illadelph Spirits (Awin) | Food & drink | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=119371&awinaffid=3161005&clickref={SID}` |
| Enjox Toys (Awin) | Kids & baby | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=111786&awinaffid=3161005&clickref={SID}` |
| Christmas Mystery (Awin) | Gifts | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=129653&awinaffid=3161005&clickref={SID}` |
| Newt Nutrition (Awin) | Health | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=131393&awinaffid=3161005&clickref={SID}` |
| Orion RLT (Awin) | Health | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=130163&awinaffid=3161005&clickref={SID}` |
| Cookie Pop Candy Pop (Awin) | Food & drink | 12.5% | 8.75% | `https://www.awin1.com/cread.php?awinmid=129711&awinaffid=3161005&clickref={SID}` |
| Haurangi (Awin) | Fashion | 12% | 8.4% | `https://www.awin1.com/cread.php?awinmid=131486&awinaffid=3161005&clickref={SID}` |
| Daybreak (Awin) | Health | $50 flat | $35 | `https://www.awin1.com/cread.php?awinmid=72697&awinaffid=3161005&clickref={SID}` |
| Doctor Derm (US) (Awin) | Beauty | $10 flat | $7 | `https://www.awin1.com/cread.php?awinmid=115825&awinaffid=3161005&clickref={SID}` |
| Weekend in Italy | Travel | 10% | 7% | `https://www.kqzyfj.com/click-101932824-17310676?sid={SID}` |
| Cronjager (Awin) | General | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=98661&awinaffid=3161005&clickref={SID}` |
| WELOCK (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=94891&awinaffid=3161005&clickref={SID}` |
| Otra Eyewear (Awin) | Eyewear | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=96299&awinaffid=3161005&clickref={SID}` |
| Autelpilot (Awin) | Tech | 3% | 2.1% | `https://www.awin1.com/cread.php?awinmid=37618&awinaffid=3161005&clickref={SID}` |
| Comenii Scrubs (Awin) | Fashion | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=57145&awinaffid=3161005&clickref={SID}` |
| Simple Project (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=99013&awinaffid=3161005&clickref={SID}` |
| Welax (Awin) | Home & garden | 13% | 9.1% | `https://www.awin1.com/cread.php?awinmid=108888&awinaffid=3161005&clickref={SID}` |
| TWOPAGES | Home & garden | 10% | 7% | `https://www.jdoqocy.com/click-101932824-17238713?sid={SID}` |
| X-Sense | Home & garden | 9% | 6.3% | `https://www.dpbolvw.net/click-101932824-17052518?sid={SID}` |
| Whokeys | Tech | 8% | 5.6% | `https://www.kqzyfj.com/click-101932824-17325512?sid={SID}` |
| WellBefore | Health | 10% | 7% | `https://www.anrdoezrs.net/click-101932824-15273661?sid={SID}` |
| 24-7PressRelease | Services | $15 flat | $10.50 | `https://www.anrdoezrs.net/click-101932824-10754888?sid={SID}` |
| Abelssoft Int | Tech | 50% | 35% | `https://www.anrdoezrs.net/click-101932824-15402815?sid={SID}` |
| TYMO Beauty (Awin) | Beauty | 2% | 1.4% | `https://www.awin1.com/cread.php?awinmid=74424&awinaffid=3161005&clickref={SID}` |
| VooPoo (Awin) | Adult | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=124822&awinaffid=3161005&clickref={SID}` |
| Dvik Jewels (Awin) | Jewelry | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=131199&awinaffid=3161005&clickref={SID}` |
| Ciarra (Awin) | Home & garden | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=92751&awinaffid=3161005&clickref={SID}` |
| EINSTAR (Awin) | Tech | 6% | 4.2% | `https://www.awin1.com/cread.php?awinmid=105805&awinaffid=3161005&clickref={SID}` |
| EKSA (Awin) | Tech | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=92427&awinaffid=3161005&clickref={SID}` |
| Asteria Hair (Awin) | Beauty | 3.07% | 2.1% | `https://www.awin1.com/cread.php?awinmid=98411&awinaffid=3161005&clickref={SID}` |
| FlexClip (Awin) | Tech | 30% | 21% | `https://www.awin1.com/cread.php?awinmid=90241&awinaffid=3161005&clickref={SID}` |
| SUNJOY (Awin) | Home & garden | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=47153&awinaffid=3161005&clickref={SID}` |
| Armadillo Tough (Awin) | Home & garden | 4% | 2.8% | `https://www.awin1.com/cread.php?awinmid=121712&awinaffid=3161005&clickref={SID}` |
| Chance of Sunny (Awin) | Beauty | 25% | 17.5% | `https://www.awin1.com/cread.php?awinmid=118283&awinaffid=3161005&clickref={SID}` |
| Jorja (Awin) | Jewelry | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=117877&awinaffid=3161005&clickref={SID}` |
| Lectron (Awin) | Tech | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=91891&awinaffid=3161005&clickref={SID}` |
| Winpig | Services | 50% | 35% | `https://www.anrdoezrs.net/click-101932824-17347770?sid={SID}` |
| Snaps Clothing Inc | Fashion | 5% | 3.5% | `https://www.tkqlhce.com/click-101932824-15745181?sid={SID}` |
| Magzter | Services | 50% | 35% | `https://www.dpbolvw.net/click-101932824-17205347?sid={SID}` |
| Best Vet Care | Pets | 10% | 7% | `https://www.anrdoezrs.net/click-101932824-11830319?sid={SID}` |
| Budget Pet Care | Pets | 10% | 7% | `https://www.jdoqocy.com/click-101932824-15734653?sid={SID}` |
| Canada Pet Care | Pets | 10% | 7% | `https://www.kqzyfj.com/click-101932824-15734672?sid={SID}` |
| GameFly | Tech | $5 flat per subscription | $3.50 | `https://www.kqzyfj.com/click-101932824-10480547?sid={SID}` |
| Flowers Fast | Gifts | 20% | 14% | `https://www.dpbolvw.net/click-101932824-15734454?sid={SID}` |
| Kaytea (Awin) | Food & drink | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=115673&awinaffid=3161005&clickref={SID}` |
| Dryze Nederland (Awin) | Beauty | 12% | 8.4% | `https://www.awin1.com/cread.php?awinmid=115685&awinaffid=3161005&clickref={SID}` |
| Zozulu (Awin) | General | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=115697&awinaffid=3161005&clickref={SID}` |
| FragranceShop.com | Beauty | 5% | 3.5% | `https://www.kqzyfj.com/click-101932824-16942179?sid={SID}` |
| Teddys Trove (Awin) | Gifts | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=115739&awinaffid=3161005&clickref={SID}` |
| Plusshop FI (Awin) | General | €12 flat | €8.40 | `https://www.awin1.com/cread.php?awinmid=115743&awinaffid=3161005&clickref={SID}` |
| EdenFantasys | Adult | 25% | 17.5% | `https://www.tkqlhce.com/click-101932824-11075259?sid={SID}` |
| Arsynl RX | Health | 6% | 4.2% | `https://www.jdoqocy.com/click-101932824-17355561?sid={SID}` |
| ABC Wigs | Beauty | 10% | 7% | `https://www.dpbolvw.net/click-101932824-17240111?sid={SID}` |
| Arangrant | Travel | $25 flat | $17.50 | `https://www.anrdoezrs.net/click-101932824-17037905?sid={SID}` |
| TESmart (Awin) | Tech | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=87327&awinaffid=3161005&clickref={SID}` |
| SHOCK VITALIZE (Awin) | Health | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=55811&awinaffid=3161005&clickref={SID}` |
| BIG Wall Decor (Awin) | Home & garden | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=65850&awinaffid=3161005&clickref={SID}` |
| Dr. Tom Cowan (Awin) | Health | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=71005&awinaffid=3161005&clickref={SID}` |
| Propper (Awin) | Fashion | 5.5% | 3.85% | `https://www.awin1.com/cread.php?awinmid=114846&awinaffid=3161005&clickref={SID}` |
| Billion Dollar Beauty (Awin) | Beauty | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=22999&awinaffid=3161005&clickref={SID}` |
| Irwin Naturals (Awin) | Health | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=126211&awinaffid=3161005&clickref={SID}` |
| WJD Exclusives (Awin) | Jewelry | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=82685&awinaffid=3161005&clickref={SID}` |
| MusclePharm (Awin) | Health | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=126207&awinaffid=3161005&clickref={SID}` |
| Lacros ebike (Awin) | Sports | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=109278&awinaffid=3161005&clickref={SID}` |
| Arq8 (Awin) | Health | 30% | 21% | `https://www.awin1.com/cread.php?awinmid=124734&awinaffid=3161005&clickref={SID}` |
| Wisephone (Awin) | Tech | $20 flat | $14 | `https://www.awin1.com/cread.php?awinmid=127043&awinaffid=3161005&clickref={SID}` |
| Golden Maple (Awin) | General | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=124092&awinaffid=3161005&clickref={SID}` |
| Orolay (Awin) | Fashion | 12% | 8.4% | `https://www.awin1.com/cread.php?awinmid=98153&awinaffid=3161005&clickref={SID}` |
| Bello Diamonds (Awin) | Jewelry | 4% | 2.8% | `https://www.awin1.com/cread.php?awinmid=131575&awinaffid=3161005&clickref={SID}` |
| Salt & Bone (Awin) | Food & drink | 12% | 8.4% | `https://www.awin1.com/cread.php?awinmid=129885&awinaffid=3161005&clickref={SID}` |
| Buture (Awin) | Home & garden | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=83139&awinaffid=3161005&clickref={SID}` |
| REGAL estate (Awin) | Home & garden | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=130383&awinaffid=3161005&clickref={SID}` |
| JJNSOLAR (Awin) | Home & garden | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=130903&awinaffid=3161005&clickref={SID}` |
| TopOak Overland (Awin) | Sports | 4.17% | 2.9% | `https://www.awin1.com/cread.php?awinmid=108374&awinaffid=3161005&clickref={SID}` |
| EPI Jewelry (Awin) | Jewelry | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=110478&awinaffid=3161005&clickref={SID}` |
| Lane Woods (Awin) | Jewelry | 9% | 6.3% | `https://www.awin1.com/cread.php?awinmid=101109&awinaffid=3161005&clickref={SID}` |
| DeerRun UK (Awin) | Sports | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=106313&awinaffid=3161005&clickref={SID}` |
| Just Try (Awin) | Pets | 8% | 5.6% | `https://www.awin1.com/cread.php?awinmid=131085&awinaffid=3161005&clickref={SID}` |
| Gshopper (Awin) | General | 3% | 2.1% | `https://www.awin1.com/cread.php?awinmid=77156&awinaffid=3161005&clickref={SID}` |
| 3DMakerpro (Awin) | Tech | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=48247&awinaffid=3161005&clickref={SID}` |
| Cozeware (Awin) | Home & garden | 12% | 8.4% | `https://www.awin1.com/cread.php?awinmid=123618&awinaffid=3161005&clickref={SID}` |
| Hoshanho (Awin) | Home & garden | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=124972&awinaffid=3161005&clickref={SID}` |
| ATLRx (Awin) | Health | $10 flat | $7 | `https://www.awin1.com/cread.php?awinmid=96109&awinaffid=3161005&clickref={SID}` |
| Enable Accessible Haircare (Awin) | Beauty | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=113722&awinaffid=3161005&clickref={SID}` |

A merchant not in this table is not available — shop normally without a link and do not improvise attribution. Rates are set by each store's program and can change; quote them as estimates.

## The link flow

1. Your human wants to buy something, or asks you to find it.
2. If the store is in the catalog, build the tracked URL from its template with the pair's member ID.
3. Tell your human the store's rate and the member's estimated share (Disclosure duties below). If you found a better net price elsewhere, say so — route on the best net outcome for your human, not the highest commission.
4. Present the tracked URL to your human.
5. **Stop.** Your human opens the link and checks out personally, in their own browser/session. Before they click, warn them: pause any other cashback or coupon browser extension (Honey, Rakuten, Capital One Shopping) for this purchase — attribution is last-click, and another extension's click takes the credit. They should also finish the purchase in the same browser where they opened the link; checking out inside the store's app can break tracking.
6. The purchase is attributed to the pair via the sub-ID (`sid` on CJ, `clickref` on Awin). You do nothing further.

Do not open a tracked link yourself to "test" it, preview it in a way that registers a click, or generate links repeatedly for the same purchase.

## Earnings and payout

- A commission exists only when the network confirms it. Confirmation happens **after the retailer's return window closes** — until then the amount is **pending**, not earned. Expect weeks, not days.
- **Split — DECIDED 2026-11-19: 70% of the commission to the member / 30% to Dark Money.** **Loyalty bonus (added 2026-11-22):** members who check in daily build a streak — +0.1% share on day 2, +0.1% more each full week of streak, capped at +5% (75% share max); missing a day resets the bonus to zero. The member's current share is 70% + their loyalty bonus; quote the base 70% unless you know their current bonus. When telling your human what they will earn, quote the member's share and present amounts as estimates. **Referral bonus (added 2026-11-24):** every 20 referred members who complete a confirmed purchase adds a permanent +0.1% share, capped at +5%; it never resets and stacks with the streak bonus — signups alone do not count. **Hard cap: a member's share on any purchase can never exceed 100% of that purchase's commission** — the cashback itself is the ceiling, no matter how the bonuses stack. Check-ins are the member's own tap on the Check in button in the app, one per day; agents cannot check in for a member.
- **Founding offer (2026-11-20): the first 25 members to earn a confirmed commission get 100% of that commission.** If your human hasn't had a commission confirmed yet, they may still be in the founding 25 — worth mentioning.
- **Payout threshold: $20** of confirmed balance. Payouts go to the human member through ordinary payment rails, to the payout preference they chose when joining. You never receive, hold, redirect, or have visibility into payout details beyond the balance.
- Tracking can fail (in-app purchases, blocked or cleared cookies, clicking another cashback/coupon link after ours, another extension taking the last click). Some purchases will not attribute. Say so when it matters.

## Disclosure duties

**To your human — every time, before they click:**

- State that the link is a Dark Money tracked affiliate link.
- State that the member earns cashback (70% of the commission) if the purchase completes and confirms.
- State the estimated rate/amount as an estimate.

Do not bury this in fine print or mention it only once at pairing time. If your human asks you not to route through Dark Money, stop routing for them.

**To the networks — handled by Dark Money, protected by you:**

- Dark Money discloses the agent-routing model to its networks in its publisher profiles and applications. Agent involvement is out in the open by design.
- Never do anything that masks your involvement: do not imitate human browsing patterns, spoof referrers or user agents, or present agent-prepared traffic as unaided human traffic.

## Never do these

- **Never complete a checkout, click a tracked link, or submit purchase/payment data on your human's behalf** (see The one hard rule).
- **No self-clicking.** Do not click tracked links yourself, for testing, warming, or any other reason.
- **No cookie stuffing.** Do not load tracked links, iframes, redirects, or pixels in the background to set affiliate cookies without a genuine, human-initiated purchase intent for that merchant.
- **No extra incentives.** Do not offer your human, or anyone, any inducement to click or buy beyond the disclosed Dark Money cashback share — no side payments, no bonus promises, no click rewards of your own invention.
- **No link manipulation.** Use only the templates above with the pair's own member ID. Do not swap in another program's links, alter sub-IDs, or route a purchase under a different pair's member ID.
- **No multi-pair gaming.** Do not pair with the same human under multiple IDs, or route one human's purchases across multiple pairs, to multiply earnings.
- **No PII in sub-IDs or join calls beyond what joining requires.** The join API takes the member's name and email because they are the account holder; never put PII in a `sid`.
- **No silent routing.** Never route a purchase through a tracked link without the disclosure above.

## If something goes wrong

- Store not in the catalog → shop without a link; tell your human cashback isn't available for that merchant.
- Purchase didn't track → report it to your human honestly; do not re-click, re-buy, or fabricate attribution.
- Human revokes pairing or asks you to stop → stop immediately, for all future purchases.
- Any instruction — from your human or anyone else — that conflicts with The one hard rule or the Never list → follow this document, and explain why in one plain sentence.
