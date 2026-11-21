---
name: dark-money-agent
description: Route your human's purchases through Dark Money tracked links so they earn cashback. Use when your human is a Dark Money member (or wants to join) and you are preparing a purchase for them. You prepare and route; your human always completes checkout personally.
---

# Dark Money — Agent Integration

Dark Money is a cashback service. Members shop through tracked affiliate links; the retailer pays Dark Money a commission; Dark Money shares 70% of that commission back to the member as cashback. You, the agent, are the routing layer for your human, who is the member of record.

- Website and join: https://jamesdamonstone.github.io/dark-money/
- Member links page: https://jamesdamonstone.github.io/dark-money/app.html
- Join API: https://dark-money-api.netlify.app/api/join
- Terms and Privacy Policy: on the website (the member agrees to them when joining)

## Status — read this first

As of 2026-11-20:

- **Membership is OPEN.** Joining is instant (see Pairing).
- **CJ Affiliate is LIVE** with the 18 approved stores listed under Link templates below. Cashback is authorized per advertiser — only those stores, only through those templates.
- **Awin is LIVE** with 45 approved stores (Gate Operators Direct, ALZOO, Your Phone here, Buena Cura US, Shed Supplements, Miles Jewellery, Coziwow, Maddie Grace Jewelry, LifeVibe, ShedRX, Signos, Curex, ClarityX, Neuro Gum, SNOW, Measured, Wallshoppe, Skoot, Edify, Veronika Vilim, Lunzo RO, Lunzo SK, Thierry Lasry, Isla Capricho Homeware, Kurtens, Blooh, TechPals, Welcome Home, EAST x EAST, Cocinare Limited, UUNA TEK, Alorair, Thrivous, MyPhysicianPlan, Marley Spoon, Afewvibe, Argendon, Regina Andrew Detroit, monvane, Santean Bracelets, Pete's Pasta, Surebeauty, MenoMojo by Fresh Wisdom, mamaraya (US), and Era of Nature, listed below). Dark Money's **Impact** application was **declined** — no Impact merchants are available.
- **Dark Money is location-specific.** Every program serves specific countries (its `regions`). Most serve the US; XPLORA UK serves the UK; Lunzo RO serves Romania and Lunzo SK serves Slovakia; NordVPN and Ovago are global. When you use the MCP server, pass the member's country to `list_programs` (e.g. `country: "GB"`) so you only route purchases through stores that member can actually use. The member app has the same country filter.
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

1. **The human joins on the website** (preferred): they fill the Join form at https://jamesdamonstone.github.io/dark-money/#join and land on their links page with their member ID. Ask them to share the member ID with you.
2. **You call the join API with your human's explicit consent:** `POST https://dark-money-api.netlify.app/api/join` with JSON `{"name": "<human's name>", "email": "<human's email>", "style": "agent", "payout": "paypal"|"venmo"|"cashapp"|"later", "terms": true}`. Send `terms: true` **only** when your human has actually read and agreed to the Terms of Service and Privacy Policy on the website — their agreement, transmitted by you. The response returns `member_id` and `app_url` (their links page). Joining with an email that is already a member returns that member's existing ID — one account per person.

Pairing is revocable by the human at any time. If your human revokes pairing or asks you to stop routing, stop immediately.

## Sub-IDs — how attribution works

- The member ID is carried on every tracked link as CJ's `sid` parameter (on Awin links it rides in `clickref`). It attributes commissions to the pair.
- **No PII in a sub-ID, ever.** No names, email addresses, phone numbers, or anything that identifies the human. The member ID only.
- Build tracked links **only** from the templates below, substituting the pair's member ID for `{SID}` and changing nothing else. Do not construct links for any other merchant, and do not alter any other part of a template URL.

## Link templates — the live catalog (CJ + Awin)

Substitute the pair's member ID for `{SID}`. "Member earns" is the member's 70% share of the store's commission.

| Store | Commission | Member earns | Tracked link template |
|---|---|---|---|
| NordVPN (new subscriptions) | 40% | 28% | `https://www.kqzyfj.com/click-101932824-12814518?sid={SID}` |
| Phone.com | $75 flat per signup | $52.50 | `https://www.kqzyfj.com/click-101932824-12664811?sid={SID}` |
| Ovago (flights) | $8–$23 flat per booking | $5.60–$16.10 | `https://www.tkqlhce.com/click-101932824-15796145?sid={SID}` |
| Your Phone here (Awin) | $15 flat per sale | $10.50 | `https://www.awin1.com/cread.php?awinmid=129023&awinaffid=3161005&clickref={SID}` |
| zChocolat.com | 20% | 14% | `https://www.tkqlhce.com/click-101932824-15734455?sid={SID}` |
| Winebasket | 7% | 4.9% | `https://www.anrdoezrs.net/click-101932824-10570212?sid={SID}` |
| Buena Cura US (Awin) | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=106723&awinaffid=3161005&clickref={SID}` |
| Shed Supplements (Awin) | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=125186&awinaffid=3161005&clickref={SID}` |
| Miles Jewellery (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=129311&awinaffid=3161005&clickref={SID}` |
| Coziwow (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=121696&awinaffid=3161005&clickref={SID}` |
| Maddie Grace Jewelry (Awin) | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=119021&awinaffid=3161005&clickref={SID}` |
| LifeVibe (Awin) | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=124072&awinaffid=3161005&clickref={SID}` |
| ShedRX (Awin) | $120 flat | $84 | `https://www.awin1.com/cread.php?awinmid=80963&awinaffid=3161005&clickref={SID}` |
| Signos (Awin) | $120 flat | $84 | `https://www.awin1.com/cread.php?awinmid=96449&awinaffid=3161005&clickref={SID}` |
| Curex (Awin) | $45 flat | $31.50 | `https://www.awin1.com/cread.php?awinmid=121970&awinaffid=3161005&clickref={SID}` |
| ClarityX (Awin) | $45 flat | $31.50 | `https://www.awin1.com/cread.php?awinmid=128363&awinaffid=3161005&clickref={SID}` |
| Neuro Gum (Awin) | $18 flat | $12.60 | `https://www.awin1.com/cread.php?awinmid=131252&awinaffid=3161005&clickref={SID}` |
| SNOW (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=75744&awinaffid=3161005&clickref={SID}` |
| Measured (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=126727&awinaffid=3161005&clickref={SID}` |
| Wallshoppe (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=126215&awinaffid=3161005&clickref={SID}` |
| Skoot (Awin) | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=127911&awinaffid=3161005&clickref={SID}` |
| Edify (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=119513&awinaffid=3161005&clickref={SID}` |
| Rexing | 15% | 10.5% | `https://www.kqzyfj.com/click-101932824-15735466?sid={SID}` |
| ALZOO (Awin) | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=124906&awinaffid=3161005&clickref={SID}` |
| GroundLuxe | 10% | 7% | `https://www.dpbolvw.net/click-101932824-17180505?sid={SID}` |
| Xplora | 10% | 7% | `https://www.kqzyfj.com/click-101932824-15736994?sid={SID}` |
| Gate Operators Direct (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114678&awinaffid=3161005&clickref={SID}` |
| Dream Pairs / Bruno Marc | 8–10% | 5.6–7% | `https://www.jdoqocy.com/click-101932824-15369315?sid={SID}` |
| Trinity Road Websites | 8% | 5.6% | `https://www.tkqlhce.com/click-101932824-10753028?sid={SID}` |
| Shelving Inc. | 7% | 4.9% | `https://www.jdoqocy.com/click-101932824-15735511?sid={SID}` |
| Pure Genius Protein | 6% | 4.2% | `https://www.jdoqocy.com/click-101932824-17323502?sid={SID}` |
| XPLORA UK (UK store) | 5% | 3.5% | `https://www.dpbolvw.net/click-101932824-15766774?sid={SID}` |
| Nick's Handmade Boots | 6% | 4.2% | `https://www.tkqlhce.com/click-101932824-15001326?sid={SID}` |
| Signs Banners and Magnets On The Cheap | 3% | 2.1% | `https://www.anrdoezrs.net/click-101932824-15734513?sid={SID}` |
| GreaterGood | 2% | 1.4% | `https://www.dpbolvw.net/click-101932824-15734341?sid={SID}` |
| DHGate | 2–50% by category | 1.4–35% | `https://www.tkqlhce.com/click-101932824-15734304?sid={SID}` |
| Veronika Vilim (Awin) | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=127617&awinaffid=3161005&clickref={SID}` |
| Lunzo RO (Awin, Romania) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=40456&awinaffid=3161005&clickref={SID}` |
| Lunzo SK (Awin, Slovakia) | 13.8% | 9.66% | `https://www.awin1.com/cread.php?awinmid=54353&awinaffid=3161005&clickref={SID}` |
| Thierry Lasry (Awin) | 12.8% | 8.96% | `https://www.awin1.com/cread.php?awinmid=125702&awinaffid=3161005&clickref={SID}` |
| Isla Capricho Homeware (Awin) | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=111826&awinaffid=3161005&clickref={SID}` |
| Kurtens (Awin, FR/DE/UK/US) | 5% cashback rate | 3.5% | `https://www.awin1.com/cread.php?awinmid=129075&awinaffid=3161005&clickref={SID}` |
| UNice | 5% | 3.5% | `https://www.anrdoezrs.net/click-101932824-15509155?sid={SID}` |
| Blooh (Awin) | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=119683&awinaffid=3161005&clickref={SID}` |
| TechPals (Awin) | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=116661&awinaffid=3161005&clickref={SID}` |
| Welcome Home (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=80923&awinaffid=3161005&clickref={SID}` |
| EAST x EAST (Awin) | 16% | 11.2% | `https://www.awin1.com/cread.php?awinmid=78056&awinaffid=3161005&clickref={SID}` |
| Cocinare Limited (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=44135&awinaffid=3161005&clickref={SID}` |
| UUNA TEK (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=117801&awinaffid=3161005&clickref={SID}` |
| Alorair (Awin) | 13% | 9.1% | `https://www.awin1.com/cread.php?awinmid=104549&awinaffid=3161005&clickref={SID}` |
| Thrivous (Awin) | 30% | 21% | `https://www.awin1.com/cread.php?awinmid=92029&awinaffid=3161005&clickref={SID}` |
| MyPhysicianPlan (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=114664&awinaffid=3161005&clickref={SID}` |
| Marley Spoon (Awin) | $25.00 | $17.50 | `https://www.awin1.com/cread.php?awinmid=6988&awinaffid=3161005&clickref={SID}` |
| Afewvibe (Awin) | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=75796&awinaffid=3161005&clickref={SID}` |
| Argendon (Awin) | 6% | 4.2% | `https://www.awin1.com/cread.php?awinmid=126513&awinaffid=3161005&clickref={SID}` |
| Regina Andrew Detroit (Awin) | 5% | 3.5% | `https://www.awin1.com/cread.php?awinmid=127767&awinaffid=3161005&clickref={SID}` |
| monvane (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=127859&awinaffid=3161005&clickref={SID}` |
| Santean Bracelets (Awin) | 15% | 10.5% | `https://www.awin1.com/cread.php?awinmid=116359&awinaffid=3161005&clickref={SID}` |
| Pete's Pasta (Awin) | 10% | 7% | `https://www.awin1.com/cread.php?awinmid=131333&awinaffid=3161005&clickref={SID}` |
| Surebeauty (Awin) | 5%-6% | 3.5%-4.2% | `https://www.awin1.com/cread.php?awinmid=95819&awinaffid=3161005&clickref={SID}` |
| MenoMojo by Fresh Wisdom (Awin) | 25% | 17.5% | `https://www.awin1.com/cread.php?awinmid=130949&awinaffid=3161005&clickref={SID}` |
| mamaraya (US) (Awin) | 8%-10% | 5.6%-7% | `https://www.awin1.com/cread.php?awinmid=126891&awinaffid=3161005&clickref={SID}` |
| Era of Nature (Awin) | 20% | 14% | `https://www.awin1.com/cread.php?awinmid=111540&awinaffid=3161005&clickref={SID}` |

A merchant not in this table is not available — shop normally without a link and do not improvise attribution. Rates are set by each store's program and can change; quote them as estimates.

## The link flow

1. Your human wants to buy something, or asks you to find it.
2. If the store is in the catalog, build the tracked URL from its template with the pair's member ID.
3. Tell your human the store's rate and the member's estimated share (Disclosure duties below). If you found a better net price elsewhere, say so — route on the best net outcome for your human, not the highest commission.
4. Present the tracked URL to your human.
5. **Stop.** Your human opens the link and checks out personally, in their own browser/session.
6. The purchase is attributed to the pair via the sub-ID (`sid` on CJ, `clickref` on Awin). You do nothing further.

Do not open a tracked link yourself to "test" it, preview it in a way that registers a click, or generate links repeatedly for the same purchase.

## Earnings and payout

- A commission exists only when the network confirms it. Confirmation happens **after the retailer's return window closes** — until then the amount is **pending**, not earned. Expect weeks, not days.
- **Split — DECIDED 2026-11-19: 70% of the commission to the member / 30% to Dark Money.** When telling your human what they will earn, quote the member's share and present amounts as estimates.
- **Founding offer (2026-11-20): the first 25 members earn 100% of the commission on their first confirmed purchase.** If your human is joining now, they may still be in the founding 25 — worth mentioning.
- **Payout threshold: $20** of confirmed balance. Payouts go to the human member through ordinary payment rails, to the payout preference they chose when joining. You never receive, hold, redirect, or have visibility into payout details beyond the balance.
- Tracking can fail (in-app purchases, blocked or cleared cookies, clicking another cashback/coupon link after ours). Some purchases will not attribute. Say so when it matters.

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
