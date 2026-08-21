import type { TripEntrySection } from "@/components/TripEntryLayout";
import { img } from "./meta";

export const sections = [
  {
    id: "overview",
    marker: "PHUKET",
    label: "Trip Cover",
    detail: "Island laziness · 2026.08.20 — 08.24",
  },
  {
    id: "day-1",
    marker: "DAY 1",
    label: "Delayed Takeoff, Midnight Landing",
    detail: "Shanghai ✈️ Phuket · Goose Island, Sassy, and 3:30 a.m.",
  },
  {
    id: "day-2-morning",
    marker: "DAY 2",
    label: "Sea Breeze, Pool and Slow Time",
    detail: "Slow breakfast · private beach · booking a dive",
  },
  {
    id: "day-2-sunset",
    marker: "DAY 2",
    label: "Sunset, Paragliding and Sea Breeze",
    detail: "Patong stroll · Malin Plaza night market · towel elephant",
  },
  {
    id: "day-3",
    marker: "DAY 3",
    label: "Discover Scuba at Racha",
    detail: "Patong Dive Center · DSD day trip",
  },
  {
    id: "food-bill",
    marker: "FOOD",
    label: "Food & Bills",
    detail: "Honest restaurant notes & running expenses",
  },
] satisfies readonly TripEntrySection[];

export default function PhuketEN() {
  return (
    <div className="phuket-trip" style={{ display: "contents" }}>

      {/* ========= CARD 1: COVER ========= */}
      <section className="card-wrap" id="overview" data-trip-section="overview">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>PHUKET<br />2026</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🏝️ 🌴 ✈️</div>
            <h1 className="cover-title">
              Slow Days by the Sea
            </h1>
            <div className="cover-subtitle">
              Travel Journal
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2026.08.20 — 08.24
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 460, textAlign: "center", marginTop: 10 }}>
              &ldquo;Island plan: no rushing, no checklist.<br />
              Waking up is the whole point.&rdquo;
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">BOARDING PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </section>

      {/* ========= CARD 2: DAY 1 DEPARTURE & ARRIVAL ========= */}
      <section className="card-wrap" data-trip-section="day-1">
        <div className="card">
          <div className="deco" style={{ width: 130, height: 130, top: -30, right: -20 }} />

          <div className="day-header">
            <div className="day-circle">
              <span className="lbl">Day</span>
              <span className="num">1</span>
            </div>
            <div>
              <div className="day-title">Delayed Takeoff, Midnight Landing</div>
              <div className="day-sub">Thursday, August 20th · Shanghai ✈️ Phuket</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>After a long, long stretch of work, we finally pulled ourselves out and headed for an island break. The day before, Xiaotu had handed in notice and signed the next offer — as if the universe had arranged it, everything wrapped up right on the eve of departure. No loose ends, just anticipation. Perfect timing. Can&apos;t wait for a Thai summer 🌴</p>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">15:30</span><div className="ev">Taxi to Pudong</div><div className="dt">Mind already on island time</div></div>
            <div className="tl-item"><span className="tm">16:00+</span><div className="ev">Arrived at Pudong T1</div><div className="dt">Check-in and bag drop</div></div>
            <div className="tl-item"><span className="tm">17:00</span><div className="ev">Exchanged 5,000 THB</div><div className="dt">Roughly ¥1,100+ at the airport counter</div></div>
            <div className="tl-item"><span className="tm">Before dinner</span><div className="ev">Goose Island Beer Co.</div><div className="dt">Pudong T1 · sandwich and fries set</div></div>
            <div className="tl-item"><span className="tm">18:40 → ~20:00</span><div className="ev">Shanghai Airlines FM831 delayed</div><div className="dt">Pudong T1 → Phuket International</div></div>
            <div className="tl-item"><span className="tm">In-flight</span><div className="ev">Chicken noodle meal</div><div className="dt">Barely edible 😖 survived on phone dramas</div></div>
            <div className="tl-item"><span className="tm">Midnight</span><div className="ev">Landed in Phuket</div><div className="dt">Picked up rental car, ~1 hour drive</div></div>
            <div className="tl-item"><span className="tm">02:00</span><div className="ev">Checked into Merlin Beach Marriott</div><div className="dt">Pool-view king room</div></div>
            <div className="tl-item"><span className="tm">02:00+</span><div className="ev">Late-night supper at Sassy</div><div className="dt">Isaan flavors that made the detour worth it</div></div>
            <div className="tl-item"><span className="tm">03:30</span><div className="ev">Finally asleep</div><div className="dt">Expectation won over exhaustion 🌴</div></div>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("goose-island.jpeg")} alt="Goose Island Beer Co. sign at Pudong T1" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Goose Island at Pudong T1</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("airport-hotdog-fries.jpeg")} alt="Hot dog and fries set at the airport" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Sandwich + fries set ¥68</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>🍜</span></div>

          <div className="jtxt">
            <p>An evening flight dragged to nearly 8 p.m. before wheels-up. The chicken noodles on board were basically inedible; phone dramas were the only thing that got me through the long red-eye. We landed at midnight, picked up the rental and drove an hour through the dark to the hotel. We only meant to grab a quick bite before sleep, but Sassy — a tucked-away Isaan spot nearby — turned the whole exhausting journey into something worth it.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("sassy-restaurant.jpeg")} alt="Sassy traditional Isaan Thai restaurant storefront" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Sassy · late-night canteen near the hotel</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="Raw shrimp glass noodle salad at Sassy" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Raw shrimp glass noodle salad 🦐</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("sassy-pad-thai.jpeg")} alt="Pad Thai with a bowl of tom yum" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Pad Thai, with what looks like tom yum</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🏨 Merlin Beach Marriott Resort &amp; Spa</div>
            <p>Staying three nights from Aug 20 to Aug 23 in a pool-view king room. The lobby has a black-and-white patterned base, white pointed lamps, and purple floral arrangements — surprisingly tasteful.</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">✈️ Flight delay note</div>
            <p>FM831 was scheduled for 18:40 but did not take off until around 20:00. Keep the delay certificate — the delay insurance can pay up to ¥300.</p>
          </div>

          <div className="page-num">- 02 -</div>
        </div>
      </section>

      {/* ========= CARD 3: DAY 2 MORNING & SLOW BEACH ========= */}
      <section className="card-wrap" data-trip-section="day-2-morning">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Sea Breeze, Pool and Slow Time</div>
              <div className="day-sub">Friday, August 21st · Hotel breakfast · private beach · booking a dive</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>The restless night was healed by a slow morning. We ambled down to breakfast after ten. It was an enormous buffet, and we picked an outdoor table with the hotel&apos;s huge pool ahead and the sea just beyond. The omelette station lets you pile on toppings, and the local noodle dish had a flavor all its own. After 11, it was back to the room to keep doing nothing. No itinerary, no checkpoints — today, that is the whole plan.</p>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("breakfast-poolside.jpeg")} alt="Poolside breakfast with omelette and iced coffee" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Breakfast outdoors, pool and sea ahead</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🌴</span></div>

          <div className="jtxt">
            <p>We didn&apos;t leave the hotel until 2 p.m. — originally just to swim — but ran into Ellie and Rock by the pool, and the four of us drifted off to explore the hotel&apos;s private beach. It was very private: the sand was a little hard with the odd broken shell, but it was quiet, almost empty. Standing on the stone steps looking out, the sea stretched ahead, with scattered houses and coconut palms on the opposite hillside. Everything loosened up.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("private-beach.jpeg")} alt="Hotel private beach with sea and palms" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Private beach · sea + palms</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("beach-view.jpeg")} alt="Beach view with red- and blue-roofed houses across the bay" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Houses across the bay (dive shop is nearby)</div>
            </div>
          </div>

          <div className="jtxt mt12">
            <p>Right beside the beach was a dive shop. The four of us made a snap decision: tomorrow we dive. Just like that, an afternoon turned into a new plan. Back at the pool we kept at it — some freestyle practice, then full flat-out on the loungers. Sea breeze, palms, the distant surf — every element was in place.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("pool-swimmer.jpeg")} alt="JJ practising freestyle in the pool" className="pt" loading="lazy" decoding="async" />
              <div className="cap">JJ in the pool · freestyle practice</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("pool-palms.jpeg")} alt="Pool palms and blue-umbrella lounger area" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Pool palms · blue-umbrella loungers</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("resort-pool-view.jpeg")} alt="Winding resort pool and palm trees" loading="lazy" decoding="async" /><div className="pol-t">Winding pool + palms 🌴</div></div>
            <div className="pol tr-tilt"><img src={img("pool-building.jpeg")} alt="Pool and resort building" loading="lazy" decoding="async" /><div className="pol-t">Pool + resort building</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🤿 The dive shop on the beach</div>
            <p>The shop is Patong Dive Center (PADI certified), right beside the private beach. It has two resident cats — one owns the sign, the other claims the floor; neither seems thrilled to be photographed 🐱. We booked on the spot: DSD day trip to Racha Island, 4,400 THB per person, 8,800 THB for the two of us (≈¥1,800, 880 THB / person deposit paid, no park fee). Pickup 6:45 a.m. tomorrow at the hotel lobby.</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol"><img src={img("dive-shop-cat.jpeg")} alt="Cat on the dive shop sign" loading="lazy" decoding="async" /><div className="pol-t">Sign cat · owns the C-spot</div></div>
            <div className="pol"><img src={img("dive-shop-cat2.jpeg")} alt="Tabby cat on the floor of the dive shop" loading="lazy" decoding="async" /><div className="pol-t">Floor tabby · mildly unimpressed</div></div>
          </div>

          <div className="page-num">- 03 -</div>
        </div>
      </section>

      {/* ========= CARD 4: DAY 2 SUNSET & NIGHT MARKET ========= */}
      <section className="card-wrap" data-trip-section="day-2-sunset">
        <div className="card">
          <div className="day-header">
            <div className="day-circle" style={{ background: "linear-gradient(135deg, #ff8a65, #ffb74d)" }}>
              <span className="lbl">Dusk</span>
              <span className="num">2</span>
            </div>
            <div>
              <div className="day-title">Sunset, Paragliding and Sea Breeze</div>
              <div className="day-sub">Friday, August 21st · Patong stroll · Malin Plaza · towel elephant</div>
            </div>
            <div className="day-weather">🌅</div>
          </div>

          <div className="jtxt">
            <p>After dinner we wandered Patong Beach while the sky was still light. The sea turned the whole orange-red of the evening clouds, the waves were gentle, and a few people were out surfing or swimming. Best of all was the paragliding — speedboats towing colorful canopies that rose, turned, circled in the sky, as if someone were painting on the clouds. We lost track of time watching them. And you happened to be in frame with one of those canopies right behind you.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("sunset-paragliding.jpeg")} alt="Paraglider over Patong at sunset" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Paraglider + sunset · the colored canopies steal the show</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("patong-sunset.jpeg")} alt="Patong sunset over the bay" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Patong sunset · clouds burning red</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("selfie-paragliding.jpeg")} alt="JJ and Xiaotu taking a selfie with paraglider behind" loading="lazy" decoding="async" /><div className="pol-t">JJ &amp; Xiaotu · a paraglider in the background</div></div>
            <div className="pol tr-tilt"><img src={img("selfie-peace.jpeg")} alt="Peace sign selfie by the sea" loading="lazy" decoding="async" /><div className="pol-t">Peace sign ✌️ · standard island pose</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🦐</span></div>

          <div className="jtxt">
            <p>Malin Plaza is more low-key than the Patong night market — fewer people, slower pace, and the vendors don&apos;t hover over your wallet the way they do in the tourist strips. A whole grilled fish for 200 THB, a big shrimp for 250 THB, a crab plate for 350 THB, abalone 200 — 300 THB — every single dish had us smiling. We ended the night with a full-table photo: the most generous meal of the trip.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("malin-shrimp.jpeg")} alt="Malin Plaza shrimp stall" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Shrimp stall · 100 / 150 / 200 / 250 THB</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("malin-abalone.jpeg")} alt="Malin Plaza abalone stall" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Abalone stall · 200 — 300 THB</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("malin-clams.jpeg")} alt="Malin Plaza stir-fried clams" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Stir-fried clams · spicy and punchy</div>
            </div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("malin-fish.jpeg")} alt="Malin Plaza whole grilled fish" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Whole grilled fish · 200 THB</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("malin-shrimp-grilled.jpeg")} alt="Malin Plaza grilled big shrimp" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Big shrimp (cooked) · 250 THB</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("malin-crab.jpeg")} alt="Malin Plaza big crab" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Big crab · 350 THB per plate</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("malin-yum.jpeg")} alt="Malin Plaza yum seafood salad" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Yum seafood salad · sour-spicy + shrimp + glass noodles</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("malin-spread.jpeg")} alt="Full-table seafood spread at Malin Plaza" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Full-table photo · the seafood feast</div>
            </div>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("malin-stall.jpeg")} alt="Malin Plaza seafood stall overview" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Malin Plaza seafood stalls · more local than Patong</div>
            </div>
          </div>

          <div className="jtxt mt16">
            <p>Back at the hotel, we found a towel elephant folded on the bed by housekeeping, sitting next to a small card with the sweetest little smile. All the day&apos;s walking tiredness just dissolved. We fell asleep with the sea breeze, the spice, and the towel elephant still lingering.</p>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("towel-elephant.jpeg")} alt="Towel elephant on the hotel bed" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Towel elephant 🐘 · folded by housekeeping, instant cure</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌃 Malin Plaza tip</div>
            <p>Malin Plaza sits behind Patong&apos;s main drag, about a 10-minute walk from the beach. Quieter and friendlier on the wallet than the Patong night market — perfect for seafood without the crowds. We left around 21:00, swung by a 7-Eleven for tomorrow&apos;s dive snacks and drinks, then home for a soak and sleep by 23:00.</p>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </section>

      {/* ========= CARD 5: DAY 3 DIVE DAY ========= */}
      <section className="card-wrap" data-trip-section="day-3">
        <div className="card">
          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-teal)" }}>
              <span className="lbl">Day</span>
              <span className="num">3</span>
            </div>
            <div>
              <div className="day-title">Discover Scuba at Racha</div>
              <div className="day-sub">Saturday, August 22nd · Patong Dive Center · DSD day trip</div>
            </div>
            <div className="day-weather">🤿</div>
          </div>

          <div className="jtxt">
            <p>A snap decision on the beach yesterday, and today we cash it in. Pickup at the hotel lobby at 6:45 sharp — Patong Dive Center&apos;s van was right on time, picked up a few more dive buddies along the way, then on to Chalong Pier and a fast boat to Racha Island. The whole day runs roughly 7:00 to 17:00, with JJ and Xiaotu doing a DSD (Discover Scuba Diving) program: full gear rental, instructor and lunch included.</p>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("dive-booking.jpeg")} alt="Patong Dive Center booking sheet" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Patong Dive Center booking sheet · PADI certified</div>
            </div>
          </div>

          <div className="rbox mt16">
            <h4>🤿 DSD essentials</h4>
            <div className="ri"><span className="nm">Shop</span><span className="st">PADI</span><span className="cm">Patong Dive Center (PADI certified)</span></div>
            <div className="ri"><span className="nm">Destination</span><span className="st">Racha</span><span className="cm">Racha Island · day trip 7:00 — 17:00</span></div>
            <div className="ri"><span className="nm">Price</span><span className="st">4,400 THB / pp</span><span className="cm">2 people = 8,800 THB ≈ ¥1,800 (deposit 880 THB / pp paid; balance 7,040 THB on site). No park fee.</span></div>
            <div className="ri"><span className="nm">Gear</span><span className="st">All incl.</span><span className="cm">BCD / weights / fins / regulator / mask / snorkel</span></div>
            <div className="ri"><span className="nm">Pickup</span><span className="st">06:45</span><span className="cm">Hotel lobby tomorrow morning, van by the shop</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📞 Emergency contacts</div>
            <p>Simon +66 98-010-1652 · Morning Staff +66 93-583-3869 · patongdivecenter@gmail.com</p>
          </div>

          <div className="jtxt mt16">
            <p>The shop drops us back at the hotel around 17:00+; we&apos;ll fill in the details later. See you at Racha tomorrow 🐠</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>🐠</span></div>
            <p className="hwcn" style={{ maxWidth: 480, margin: "0 auto" }}>
              Tomorrow,<br />
              we read the blue from surface to seabed.
            </p>
          </div>

          <div className="page-num">- 05 -</div>
        </div>
      </section>

      {/* ========= CARD 6: FOOD & EXPENSES ========= */}
      <section className="card-wrap" data-trip-section="food-bill">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🍴</div>

          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-coral)" }}>
              <span style={{ fontSize: 24 }}>🍜</span>
              <span style={{ fontSize: 13 }}>FOOD</span>
            </div>
            <div>
              <div className="day-title">Food &amp; Bills</div>
              <div className="day-sub">Honest restaurant notes &amp; running expenses</div>
            </div>
          </div>

          <div className="rbox mt12">
            <h4>🌟 The winners</h4>
            <div className="ri"><span className="nm">Sassy traditional Isaan Thai restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Patong · Isaan flavors, highly recommended. Taste 4.2 / ambience 3.9 / service 3.9, open until 5:30 a.m.</span></div>
            <div className="ri"><span className="nm">SIAM Phuket - Seafood Restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Patong, Thawewong Rd · 4.8 rating · punchy tom yum, a steamed lemon fish you don&apos;t see in China, empty when we arrived, packed by the time we left</span></div>
            <div className="ri"><span className="nm">Malin Plaza seafood stalls</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Quieter and cheaper than the Patong night market · grilled fish 200 / big shrimp 250 / crab 350 THB</span></div>
            <div className="ri"><span className="nm">Goose Island Beer Co.</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Pudong T1 · solid sandwich, great fries 🍟</span></div>
            <div className="ri"><span className="nm">Merlin Beach Marriott breakfast buffet</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Huge spread, outdoor tables facing the pool and sea</span></div>
          </div>

          <div className="rbox warn mt16">
            <h4>⚠️ The misses</h4>
            <div className="ri"><span className="nm">FM831 in-flight chicken noodles</span><span className="st">⭐</span><span className="cm">Barely edible. Phone dramas saved the night 😖</span></div>
          </div>

          <div className="dv mt20 mb12"><span>🍤</span></div>

          <div className="jtxt">
            <p>SIAM Phuket is a seafood spot on Patong&apos;s Thawewong Road, rated 4.8. Tom yum was deep and just-spicy-enough, the lemon-steamed fish is a cooking style you rarely see in China, green mango salad was crisp, and the som tam brought peanuts, bean sprouts and chili to the table. A whole spread, and a much better deal than back home.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("siam-tomyum.jpeg")} alt="SIAM tom yum soup" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Tom yum · deep, mildly spicy</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("siam-fish.jpeg")} alt="SIAM lemon-steamed fish" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Lemon-steamed fish · a rare style in China</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("siam-somtam.jpeg")} alt="SIAM som tam (papaya salad)" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Som tam · peanuts + bean sprouts + chili</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>💰</span></div>

          <div className="bill">
            <h4>💳 Running expenses (CNY · for 2 people)</h4>
            <div className="br"><span>Shanghai-Phuket round-trip flights</span><span>¥ 5,512.00</span></div>
            <div className="br"><span>Merlin Beach Marriott 3 nights</span><span>¥ 4,876.22</span></div>
            <div className="br"><span>Currency exchange 5,000 THB</span><span>≈ ¥ 1,100.00</span></div>
            <div className="br"><span>Goose Island sandwich set</span><span>¥ 68.00</span></div>
            <div className="br"><span>Patong Dive Center DSD (8,800 THB · 2 pp deposit)</span><span>≈ ¥ 1,800.00 (deposit paid)</span></div>
            <div className="br"><span>DSD balance 7,040 THB</span><span>≈ ¥ 1,473 (pay on site, 8/22)</span></div>
            <div className="br"><span>Downtown → Pudong taxi</span><span>TBD</span></div>
            <div className="br"><span>Phuket car rental</span><span>TBD</span></div>
            <div className="br"><span>Late-night supper, 4 people split</span><span>TBD</span></div>
            <div className="br total"><span>Running total</span><span>¥ 11,556.22+</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📌 Expense note</div>
            <p>Expenses cover JJ &amp; Xiaotu only. Flights and hotel are priced for two. We are also holding 5,000 THB cash for local spending. Ellie and Rock settle their own bills separately. Final numbers will be updated as the trip continues.</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">❓ Still to confirm</div>
            <p>Downtown-to-Pudong taxi amount / Phuket rental details (model, daily rate, rental period) / late-night supper exact amount (was the &ldquo;120+&rdquo; in THB or CNY?) and the four-person split.</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>🌴</span></div>
            <p className="hwcn" style={{ maxWidth: 480, margin: "0 auto" }}>
              Island laziness in progress.<br />
              More notes as the days unfold.
            </p>
            <div style={{ marginTop: 24 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>TO BE CONTINUED</span>
            </div>
          </div>

          <div className="page-num">- 06 -</div>
        </div>
      </section>
    </div>
  );
}
