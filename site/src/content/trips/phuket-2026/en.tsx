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
    detail: "Lazy breakfast · private beach · decide to dive",
  },
  {
    id: "day-2-sunset",
    marker: "DAY 2",
    label: "Sunset, Paragliding, and Sea Wind",
    detail: "SIAM Phuket · Patong stroll · Malin Plaza",
  },
  {
    id: "day-3",
    marker: "DAY 3",
    label: "Racha Island: From Wrecked to Working",
    detail: "Three DSD dives · Naughty Nuri's · 2h Thai massage",
  },
  {
    id: "day-4",
    marker: "DAY 4",
    label: "From Sassy to Sassy",
    detail: "Jungceylon & BigC · beach downtime · Panouri gift",
  },
  {
    id: "food-bill",
    marker: "FOOD",
    label: "Food & Bill",
    detail: "Honest reviews & JJ & Xiaotu's running total",
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
              Phuket · An Unexpected Dive
            </h1>
            <div className="cover-subtitle">
              Travel Journal
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2026.08.20 — 08.24
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 420, textAlign: "center", marginTop: 10 }}>
              "The island chill plan:<br />no rush, no checklist — waking up is the whole point."
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
            <p>After weeks and weeks of grind, the day finally came — I pulled myself out of work and flew toward the island. EVP Visit had wrapped the day before, Xiaotu had just resigned and signed an offer at the next place. Like the universe had lined it all up, everything landed before departure. No loose ends, only the good kind of anticipation. Everything is just right. Bring on the Thailand summer 🌴</p>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">15:30</span><div className="ev">Cab from the city</div><div className="dt">Heading to Pudong T1, mind already in Phuket</div></div>
            <div className="tl-item"><span className="tm">16:00+</span><div className="ev">Arrive Pudong T1</div><div className="dt">Check-in + bag drop</div></div>
            <div className="tl-item"><span className="tm">17:00</span><div className="ev">Exchange 5,000 THB</div><div className="dt">About ¥1,100+ at the airport counter</div></div>
            <div className="tl-item"><span className="tm">Pre-dinner</span><div className="ev">Goose Island craft beer pub</div><div className="dt">Pudong T1 · sandwich + fries combo</div></div>
            <div className="tl-item"><span className="tm">18:40 → ~20:00</span><div className="ev">FM831 delayed departure</div><div className="dt">Pudong T1 → Phuket Intl Terminal I</div></div>
            <div className="tl-item"><span className="tm">On board</span><div className="ev">Chicken noodle in-flight meal</div><div className="dt">Truly awful 😖 — survived on cultivation dramas</div></div>
            <div className="tl-item"><span className="tm">Midnight</span><div className="ev">Land in Phuket</div><div className="dt">Pick up rental, ~1h drive to the hotel</div></div>
            <div className="tl-item"><span className="tm">02:00</span><div className="ev">Check in at Merlin Beach Marriott</div><div className="dt">Pool-view king room</div></div>
            <div className="tl-item"><span className="tm">02:00+</span><div className="ev">Sassy late-night dinner</div><div className="dt">Isaan flavors — the table set us right</div></div>
            <div className="tl-item"><span className="tm">03:30</span><div className="ev">Asleep</div><div className="dt">Tomorrow, the island 🌴</div></div>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("goose-island.jpeg")} alt="Goose Island craft beer pub sign at Pudong T1" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Goose Island at Pudong T1</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("airport-hotdog-fries.jpeg")} alt="Goose Island sandwich and fries combo" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Sandwich + fries combo · ¥68</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>🍜</span></div>

          <div className="jtxt">
            <p>The evening flight didn't lift off until nearly 8 p.m. The in-flight chicken noodle was barely edible, and I only made it through the long red-eye by binge-watching cultivation dramas. Touchdown at midnight, an hour's drive through the dark, and we finally rolled into the hotel. I was ready to collapse, but a tiny Isaan spot sat right next door — Sassy traditional Isaan Thai restaurant — and one late-night table erased every hour of the journey.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="Sassy raw shrimp glass-noodle salad" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Raw shrimp glass-noodle salad 🦐</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("sassy-pad-thai.jpeg")} alt="Sassy Pad Thai with tom yum on the side" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Pad Thai, tom yum on the side</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🏨 Merlin Beach Marriott Resort & Spa</div>
            <p>Phuket · 3 nights (8/20 — 8/23) · pool-view king room. The lobby — black-and-white patterned base, white peaked lamps, purple florals — is more design-forward than expected.</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">✈️ Flight delay note</div>
            <p>FM831 was scheduled for 18:40, actually took off around 20:00. Delay insurance can pay up to ¥300 — keep the SMS / app notification as proof.</p>
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
              <div className="day-sub">Friday, August 21st · hotel breakfast · private beach · booked a dive</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>The night undid itself the moment I woke up naturally. After ten, I wandered to breakfast — lavish buffet, an outdoor table facing the hotel's huge pool and the sea beyond. Loaded the omelette with toppings; tried a local noodle that tasted like nowhere else. Back to the room by 11. No plans, no ticking clock. Today, doing nothing is the whole plan.</p>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("breakfast-poolside.jpeg")} alt="Outdoor breakfast facing the pool and sea" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Outdoor breakfast · pool + sea view</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🌴</span></div>

          <div className="jtxt">
            <p>We didn't leave until 2 p.m. — I just wanted a swim — then bumped into Ellie and Rock by the pool. Spontaneously, the four of us went to check out the hotel's private beach. It was genuinely private, though the sand ran a bit firm and rocky. From the stone steps, the bay opened up: scattered rooftops, coconut trees on the far hill. Everything loosened a little.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("private-beach.jpeg")} alt="Hotel private beach with sea and palms" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Private beach · sea + palms</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("beach-view.jpeg")} alt="Beach view with red and blue roof huts on the far hill" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Bungalows on the far shore (dive shop nearby)</div>
            </div>
          </div>

          <div className="jtxt mt12">
            <p>A dive shop sat right by the beach, and the four of us agreed on the spot: tomorrow, we're diving. One afternoon, one new plan. Back at the hotel pool, I practiced freestyle and gave up to a lounger. Sea breeze, palms, distant surf — every element in place.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("pool-swimmer.jpeg")} alt="JJ practicing freestyle in the pool" className="pt" loading="lazy" decoding="async" />
              <div className="cap">JJ in the pool · freestyle practice</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("pool-palms.jpeg")} alt="Pool-side palms and blue umbrella loungers" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Pool palms · blue-umbrella loungers</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("resort-pool-view.jpeg")} alt="Winding pool and palms from the room" loading="lazy" decoding="async" /><div className="pol-t">Winding pool + palms 🌴</div></div>
            <div className="pol tr-tilt"><img src={img("pool-building.jpeg")} alt="Pool and hotel building" loading="lazy" decoding="async" /><div className="pol-t">Pool + hotel building</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🤿 The dive shop on the beach</div>
            <p>Patong Dive Center (PADI-certified) sits right next to the private beach. Two resident cats own the place — one on the sign, one on the floor, neither especially welcoming to cameras 🐱. We booked tomorrow's DSD on the spot: full-day Racha trip at 4,400 THB / person, 8,800 THB for two ≈ ¥1,800 (880 THB / person deposit paid, no extra park fee). Pickup 6:45 a.m. at the hotel lobby.</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol"><img src={img("dive-shop-cat.jpeg")} alt="Cat on the dive shop sign" loading="lazy" decoding="async" /><div className="pol-t">Sign cat · owns the C-spot</div></div>
            <div className="pol"><img src={img("dive-shop-cat2.jpeg")} alt="Tabby cat on the dive shop floor" loading="lazy" decoding="async" /><div className="pol-t">Tabby on the floor · looking a bit grumpy</div></div>
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
              <div className="day-title">Sunset, Paragliding, and Sea Wind</div>
              <div className="day-sub">Friday, August 21st · SIAM Phuket · Patong stroll · Malin Plaza</div>
            </div>
            <div className="day-weather">🌅</div>
          </div>

          <div className="dv mt20 mb12"><span>🍤</span></div>

          <div className="jtxt">
            <p>SIAM Phuket is a Thawewong Rd seafood spot with a 4.8 rating. Bold tom yum, lemon-steamed fish you don't see in China, refreshing green mango salad, and a punchy som tam with peanuts, bean sprouts, and chili. The whole table cost less than the same meal back home.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("siam-tomyum.jpeg")} alt="SIAM tom yum" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Tom yum · bold and slightly spicy</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("siam-fish.jpeg")} alt="SIAM lemon-steamed fish" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Lemon-steamed fish · rarely seen in China</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("siam-somtam.jpeg")} alt="SIAM som tam" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Som tam · peanuts + bean sprouts + chili</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🌅</span></div>

          <div className="jtxt">
            <p>After dinner, while the light was still warm, we walked Patong Beach for a long stretch. The sea burned orange under evening clouds, the surf was gentle, a few swimmers and surfers drifted. The best part was up in the sky — paragliders being tugged by speedboats, the colored canoes banking and turning between clouds like someone was painting the sky. We lost track of time. You and the parachute behind you ended up in the same frame, perfectly.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("sunset-paragliding.jpeg")} alt="Paragliding against the Patong sunset" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Paragliding + sunset · the colored sail steals the frame</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("patong-sunset.jpeg")} alt="Patong sunset over the bay" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Patong sunset · clouds painted red</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("selfie-paragliding.jpeg")} alt="JJ and Xiaotu selfie on Patong beach with a paraglider behind" loading="lazy" decoding="async" /><div className="pol-t">JJ & Xiaotu · paraglider sneaking in behind</div></div>
            <div className="pol tr-tilt"><img src={img("selfie-peace.jpeg")} alt="Beach peace-sign selfie" loading="lazy" decoding="async" /><div className="pol-t">Peace ✌️ · standard island pose</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🦐</span></div>

          <div className="jtxt">
            <p>Malin Plaza is a quieter alternative to Patong Night Market — fewer crowds, slower pace, vendors who don't hover. A whole grilled fish for 200 THB, a giant prawn for 250, a plate of crab for 350, abalone 200–300. Every bite kept us grinning. The full-table seafood shot at the end might be the most generous spread of the whole trip.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("malin-shrimp.jpeg")} alt="Malin Plaza prawn stall" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Prawn stall · 100 / 150 / 200 / 250 THB</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("malin-abalone.jpeg")} alt="Malin Plaza abalone stall" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Abalone · 200 — 300 THB</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("malin-clams.jpeg")} alt="Malin Plaza stir-fried clams" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Stir-fried clams · spicy and fragrant</div>
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
              <img src={img("malin-shrimp-grilled.jpeg")} alt="Malin Plaza grilled prawn" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Grilled prawn · 250 THB</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("malin-crab.jpeg")} alt="Malin Plaza large crab" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Large crab · 350 THB</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("malin-yum.jpeg")} alt="Malin Plaza seafood yum salad" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Seafood yum · sour-spicy + prawn + glass noodles</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("malin-spread.jpeg")} alt="Full-table seafood spread at Malin Plaza" className="pt" loading="lazy" decoding="async" />
              <div className="cap">The full table · seafood feast</div>
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
            <p>Back at the hotel, the housekeeping team had folded a tiny towel elephant on the bed — sitting there grinning at the welcome card. All the walking melted away. Fell asleep on the warmth of sea wind, chili, and one small stuffed elephant.</p>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("towel-elephant.jpeg")} alt="Towel elephant on the hotel bed" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Towel elephant 🐘 · folded by the team, pure comfort</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌃 Malin Plaza tip</div>
            <p>Malin Plaza sits behind Patong's main drag, about 10 minutes from the beach. Quieter and cheaper than the Patong Night Market — perfect for a seafood night without the crowds. We left at 21:00, grabbed snacks and drinks at 7-Eleven for tomorrow's dive, soaked in the tub at 22:30, asleep by 23:00.</p>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </section>

      {/* ========= CARD 5: DAY 3 DIVE + EVENING ========= */}
      <section className="card-wrap" data-trip-section="day-3">
        <div className="card">
          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-teal)" }}>
              <span className="lbl">Day</span>
              <span className="num">3</span>
            </div>
            <div>
              <div className="day-title">Racha Island: From Wrecked to Working</div>
              <div className="day-sub">Saturday, August 22nd · three DSD dives · Naughty Nuri's · Let's Relax</div>
            </div>
            <div className="day-weather">🤿</div>
          </div>

          <div className="jtxt">
            <p>Lobby pickup at 6:55 a.m. (we were ten minutes late — the driver was not amused), and we picked up fellow divers along the way before reaching Chalong Pier past 8:00. A bouncy speedboat ride to Racha Noi and Racha Yai, three dive sites. JJ and Xiaotu both skipped lunch — seasick and wrecked. The third dive at 14:00 finally clicked: back straight, hips forward, exhale to sink, inhale to rise — for the first time I felt like I was swimming in the water, not being shoved by it. Coral spread like a garden. The whole seafloor left us speechless.</p>
          </div>

          <div className="tlwrap mt12">
            <div className="tl-item"><span className="tm">06:55</span><div className="ev">Hotel lobby pickup</div><div className="dt">10 minutes late, driver was not happy</div></div>
            <div className="tl-item"><span className="tm">08:00+</span><div className="ev">Chalong Pier</div><div className="dt">Picked up the rest of the group, everyone late</div></div>
            <div className="tl-item"><span className="tm">10:00+</span><div className="ev">Dive 1 (shallow intro)</div><div className="dt">Buoyancy all over, couldn't regulate; both of us threw up; Xiaotu scraped her foot on the bottom</div></div>
            <div className="tl-item"><span className="tm">11:30</span><div className="ev">Dive 2</div><div className="dt">Choked on water, accidentally closed the BCD inflator, instructor towed me with a red strap; second half, fish started appearing</div></div>
            <div className="tl-item"><span className="tm">14:00</span><div className="ev">Dive 3 (last dive)</div><div className="dt">It finally clicked — back straight, hips forward, exhale to sink, inhale to rise</div></div>
            <div className="tl-item"><span className="tm">15:00</span><div className="ev">Dives over</div><div className="dt">Pack up, slow ride back</div></div>
            <div className="tl-item"><span className="tm">17:00</span><div className="ev">Back in Phuket</div><div className="dt">Transfer to a smaller car, head into town</div></div>
            <div className="tl-item"><span className="tm">18:00+</span><div className="ev">Naughty Nuri's dinner</div><div className="dt">Famous ribs · 4 people, ¥550</div></div>
            <div className="tl-item"><span className="tm">19:30</span><div className="ev">Back at hotel · second towel elephant</div><div className="dt">Note signed Viong 🐘</div></div>
            <div className="tl-item"><span className="tm">21:30</span><div className="ev">Let's Relax · 2h Thai massage</div><div className="dt">2,400 THB ≈ ¥504</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🐠</span></div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("dive-dive1.jpeg")} alt="Dive 1 · instructor with JJ and Xiaotu · underwater peace sign" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Dive 1 · instructor + JJ + Xiaotu · underwater peace 🤙</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("dive-jj-underwater.jpeg")} alt="Dive 2 · JJ underwater mask and bubbles" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Dive 2 · JJ's mask + bubbles · the red strap makes an entrance</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("dive-rope2.jpeg")} alt="By the descent line · instructor leading" loading="lazy" decoding="async" /><div className="pol-t">By the descent line · instructor leading</div></div>
            <div className="pol tr-tilt"><img src={img("dive-rope3.jpeg")} alt="Group shot by the descent line · buoyancy stabilizing" loading="lazy" decoding="async" /><div className="pol-t">Group shot by the descent line · buoyancy stabilizing</div></div>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("dive-farewell.jpeg")} alt="Underwater goodbye shot · unforgettable third dive" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Underwater goodbye · the unforgettable third dive</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌊 What three dives actually gave me</div>
            <p>From "I can't control anything" to "I finally get it" took exactly one dive. The coral and fish on dive three made me not want to surface. My body finally remembered how to breathe 🐠🌊</p>
          </div>

          <div className="dv mt20 mb12"><span>🍖</span></div>

          <div className="jtxt">
            <p>Back from the pier, Naughty Nuri's pink lucky pig at the door is unmissable. Caramelized ribs, a four-sausage platter, satay skewers with peanut sauce — the full table has a real ceremony to it. The ribs themselves run a touch greasy, and add-on ribs cost extra; for a网红 BBQ spot, the value is so-so.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("naughty-ribs.jpeg")} alt="Naughty Nuri's signature ribs" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Signature ribs · caramelized, with slaw and a little flag</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("naughty-sausage.jpeg")} alt="Sausage platter" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Sausage platter · four kinds + slaw + corn + sauce</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("naughty-satay.jpeg")} alt="Satay skewers with peanut sauce" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Satay skewers + peanut sauce</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("naughty-pig.jpeg")} alt="Pink lucky pig at the entrance" className="pt" loading="lazy" decoding="async" />
              <div className="cap">At the door · pink lucky pig 🐷 · Instagram-famous</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("naughty-table.jpeg")} alt="Naughty Nuri's full-table spread" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Full table · ribs + sausages + satay + rice noodles + corn + fries + drinks</div>
            </div>
          </div>

          <div className="rbox warn mt16">
            <h4>🍖 Naughty Nuri's verdict</h4>
            <div className="ri"><span className="nm">Naughty Nuri's Phuket</span><span className="st">⭐⭐⭐</span><span className="cm">网红 BBQ · 4 people, ¥550. Cool decor, photo-worthy; ribs a bit greasy, add-on ribs cost extra — 3 stars max</span></div>
          </div>

          <div className="dv mt20 mb12"><span>🐘</span></div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("towel-elephant2.jpeg")} alt="Second towel elephant · note signed Viong" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Second towel elephant 🐘 · note signed Viong</div>
            </div>
          </div>

          <div className="jtxt mt12">
            <p>Back at the hotel, another mini towel elephant awaited — that's two now. The card was signed Viong, likely the night-shift housekeeping lead. A two-hour Thai massage right after, and every knot from sea to land was worked out.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("massage-lobby.jpeg")} alt="Let's Relax lobby" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Lobby · shea product counter + white rose</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("massage-lounge.jpeg")} alt="Massage shop lounge" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Lounge · deep green walls + big tree + brown sofas</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("massage-shampoo.jpeg")} alt="Hair-washing area" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Wash area · black basins + grey sofa + colorful pillows</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">💆 Massage notes</div>
            <p>Let's Relax · 2-hour Thai massage (JJ &amp; Xiaotu, 21:30 — 23:30) · 2,400 THB ≈ ¥504. The back pain from a full day of diving was gone by the time we walked out. Asleep at the hotel past midnight 💤</p>
          </div>

          <div className="page-num">- 05 -</div>
        </div>
      </section>

      {/* ========= CARD 6: DAY 4 SHOPPING & FAREWELL ========= */}
      <section className="card-wrap" data-trip-section="day-4">
        <div className="card">
          <div className="day-header">
            <div className="day-circle" style={{ background: "linear-gradient(135deg, #ffb74d, #ffd54f)" }}>
              <span className="lbl">Day</span>
              <span className="num">4</span>
            </div>
            <div>
              <div className="day-title">From Sassy to Sassy</div>
              <div className="day-sub">Sunday, August 23rd · Jungceylon & BigC · beach downtime · flight home</div>
            </div>
            <div className="day-weather">🏖️</div>
          </div>

          <div className="jtxt">
            <p>The last day started with coffee at our usual table 97. Toast, fried egg, sunshine, the familiar morning — it tasted of leaving. Packed up, checked out at 12:00 sharp, hit Jungceylon in the afternoon for BigC and Phutawan, then back to the hotel for beach downtime. The forecast said rain, but the sky stayed clear and blue. One more Sassy run before check-out, a 90-min massage at Let's Relax 3rd St to close, and a Panouri gift box at the airport duty-free.</p>
          </div>

          <div className="tlwrap mt12">
            <div className="tl-item"><span className="tm">10:00+</span><div className="ev">Wake naturally · hotel buffet</div><div className="dt">Our usual table 97 · last meal</div></div>
            <div className="tl-item"><span className="tm">12:00</span><div className="ev">Check out ✅</div><div className="dt">Bags stored at front desk</div></div>
            <div className="tl-item"><span className="tm">13:00</span><div className="ev">Jungceylon shopping mall</div><div className="dt">Souvenirs · BigC + Phutawan</div></div>
            <div className="tl-item"><span className="tm">15:00</span><div className="ev">Back at hotel · beach downtime 🏖️</div><div className="dt">Sea breeze, sand, blue loungers</div></div>
            <div className="tl-item"><span className="tm">17:30</span><div className="ev">Sassy, second visit</div><div className="dt">Fish + seafood salad · 4 people, 250 THB ≈ ¥52</div></div>
            <div className="tl-item"><span className="tm">19:00</span><div className="ev">Let's Relax 3rd St</div><div className="dt">90-min Thai massage · 2,000 THB ≈ ¥420</div></div>
            <div className="tl-item"><span className="tm">20:45</span><div className="ev">Head to the airport</div><div className="dt">Return car + check-in + security</div></div>
            <div className="tl-item"><span className="tm">22:00+</span><div className="ev">Duty-free · Panouri gift box</div><div className="dt">¥1,300+ (for the two of us)</div></div>
            <div className="tl-item"><span className="tm">00:00+</span><div className="ev">Lounge snack → boarding</div><div className="dt">Trip over · now 8/24, on the plane</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🍳</span></div>

          <div className="pgrid g1 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day4-breakfast.jpeg")} alt="Day 4 breakfast at table 97" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Day 4 breakfast · table 97 · toast + egg + salad + coffee</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🛍️</span></div>

          <div className="jtxt">
            <p>Jungceylon's pirate ship is the landmark you can't miss. BigC ran up 1,100+ THB on tom yum packets, inhalers, pain patches, milk tablets, and coconut-mango strips. Phutawan added two Reed Diffuser sets (Rainforest in Bloom) for Xiaotu's colleagues — 1,080 THB. JJ and Xiaotu skipped lunch; Ellie &amp; Rock grabbed a quick bite in the food court.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("jungceylon-ship.jpeg")} alt="Jungceylon's landmark pirate ship" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Jungceylon · the pirate ship 🚢</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("bigc-shopping.jpeg")} alt="BigC haul" className="pt" loading="lazy" decoding="async" />
              <div className="cap">BigC haul · tom yum + inhalers + patches + milk tablets + coconut-mango strips</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("phutawan-box.jpeg")} alt="Phutawan reed diffuser gift set" loading="lazy" decoding="async" /><div className="pol-t">Phutawan · Rainforest in Bloom</div></div>
            <div className="pol tr-tilt"><img src={img("phutawan-receipt.jpeg")} alt="Phutawan receipt for 1,080 THB" loading="lazy" decoding="async" /><div className="pol-t">Receipt · 2 × 540 = 1,080 THB</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🌴</span></div>

          <div className="jtxt">
            <p>Bags down at the hotel, straight to the beach. Red flag was up (no swimming), but sea breeze, palms, sunshine, blue loungers — all in place. The forecast lied; the sky stayed clear. Napped a little, then retreated to shower once the heat turned up.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("beach-palms-ocean.jpeg")} alt="Palm trees with turquoise sea and rocky bay" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Palms + turquoise sea + rocky bay</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("beach-rocks-ocean.jpeg")} alt="Rocky coast and turquoise water" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Rocky coast + turquoise water</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("beach-palms-lawn.jpeg")} alt="Palms, lawn and a small playground in the distance" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Palms + lawn + playground + green hut in the distance</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("beach-chair-view.jpeg")} alt="Blue lounger view" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Blue lounger view · sea breeze, palms, sunlight</div>
            </div>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol"><img src={img("beach-warning.jpeg")} alt="Hotel beach · red flag, no swimming" loading="lazy" decoding="async" /><div className="pol-t">Hotel beach · 🚩 red flag, no swimming</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🍜</span></div>

          <div className="jtxt">
            <p>17:30 — back to Sassy. We came here on the first night, and we ended here too. Pad Thai + tom yum + seafood salad platter + steamed lemon fish, 4 people for 250 THB ≈ ¥52. The value is unreal. Then Let's Relax 3rd St for a 90-min Thai massage, and the backache from the trip was finally, properly, pushed out.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("day4-sassy-padthai.jpeg")} alt="Sassy Pad Thai" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Pad Thai · prawns + bean sprouts</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("day4-sassy-tomyum.jpeg")} alt="Sassy tom yum soup" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Tom yum</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day4-sassy-fish.jpeg")} alt="Sassy steamed lemon fish" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Steamed lemon fish · clean and fragrant</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("day4-sassy-platter.jpeg")} alt="Sassy seafood salad platter" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Seafood salad platter · mussels + sea snails + squid + crab legs</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("relax-3rd-st.jpeg")} alt="Let's Relax 3rd St branch" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Let's Relax 3rd St · 25th anniversary display + sea-view window</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌅 Day 4 wrap-up</div>
            <p>Started at Sassy, ended at Sassy. One more 90-minute massage. The Panouri gift box. Lounge snack at the airport. Then the plane. Now 8/24, somewhere over the East China Sea, the cabin is quiet — we shot what we wanted, ate what we wanted, dove what we wanted, lay flat what we wanted.</p>
          </div>

          <div className="page-num">- 06 -</div>
        </div>
      </section>

      {/* ========= CARD 7: FOOD & EXPENSES ========= */}
      <section className="card-wrap" data-trip-section="food-bill">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🍴</div>

          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-coral)" }}>
              <span style={{ fontSize: 24 }}>🍜</span>
              <span style={{ fontSize: 13 }}>FOOD</span>
            </div>
            <div>
              <div className="day-title">Food & Bill</div>
              <div className="day-sub">Honest reviews & JJ & Xiaotu's running total</div>
            </div>
          </div>

          <div className="rbox mt12">
            <h4>🌟 Recommended</h4>
            <div className="ri"><span className="nm">Sassy traditional Isaan Thai restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Patong · Isaan flavors. Food 4.2 / Ambience 3.9 / Service 3.9, open until 5:30 a.m.; ¥52 for 4 on the farewell visit</span></div>
            <div className="ri"><span className="nm">SIAM Phuket - Seafood Restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Patong Thawewong Rd · 4.8 rating · bold tom yum, lemon-steamed fish, beat the dinner rush by going early</span></div>
            <div className="ri"><span className="nm">Malin Plaza seafood stalls</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Quieter than Patong Night Market — grilled fish 200, prawn 250, crab 350 THB</span></div>
            <div className="ri"><span className="nm">Goose Island craft beer pub</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Pudong T1 · solid sandwich, excellent fries 🍟</span></div>
            <div className="ri"><span className="nm">Merlin Beach Marriott buffet</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Lavish, outdoor seating with pool + sea view, the most relaxed breakfast</span></div>
            <div className="ri"><span className="nm">Let's Relax Thai massage</span><span className="st">⭐⭐⭐⭐</span><span className="cm">JJ &amp; Xiaotu, 2h + 90min — essential for a real reset, therapists know their pressure</span></div>
          </div>

          <div className="rbox warn mt16">
            <h4>⚠️ Skip / so-so</h4>
            <div className="ri"><span className="nm">FM831 in-flight chicken noodle</span><span className="st">⭐</span><span className="cm">Truly awful, only the cultivation dramas saved the night 😖</span></div>
            <div className="ri"><span className="nm">Naughty Nuri's Phuket</span><span className="st">⭐⭐⭐</span><span className="cm">网红 BBQ · 4 people, ¥550. Cool decor, lucky pig photo op; ribs a bit greasy, add-on ribs cost extra — 3 stars max</span></div>
          </div>

          <div className="dv mt20 mb12"><span>💰</span></div>

          <div className="bill">
            <h4>💳 Total spend (CNY · JJ &amp; Xiaotu, 2 people)</h4>
            <div className="br"><span>Round-trip Shanghai–Phuket flights</span><span>¥ 5,512.00</span></div>
            <div className="br"><span>Merlin Beach Marriott · 3 nights</span><span>¥ 4,876.22</span></div>
            <div className="br"><span>Currency exchange · 5,000 THB</span><span>≈ ¥ 1,100.00</span></div>
            <div className="br"><span>Goose Island sandwich + fries combo</span><span>¥ 68.00</span></div>
            <div className="br"><span>DSD dive deposit (2 people · 1,760 THB)</span><span>≈ ¥ 368.00 (paid)</span></div>
            <div className="br"><span>DSD balance · 7,040 THB</span><span>≈ ¥ 1,473 (settled 8/22)</span></div>
            <div className="br"><span>Dive photo package</span><span>2,000 THB ≈ ¥ 420</span></div>
            <div className="br"><span>Tips for instructor / boat crew</span><span>20 THB ≈ ¥ 4</span></div>
            <div className="br"><span>Naughty Nuri's dinner (4 people)</span><span>¥ 550.00</span></div>
            <div className="br"><span>Let's Relax · 2h Thai massage</span><span>2,400 THB ≈ ¥ 504</span></div>
            <div className="br"><span>Let's Relax 3rd St · 90min Thai massage</span><span>2,000 THB ≈ ¥ 420</span></div>
            <div className="br"><span>BigC souvenirs (1,100+ THB)</span><span>≈ ¥ 230</span></div>
            <div className="br"><span>Phutawan reed diffusers × 2 (1,080 THB)</span><span>≈ ¥ 227</span></div>
            <div className="br"><span>Sassy second dinner (4 people, 250 THB)</span><span>≈ ¥ 52</span></div>
            <div className="br"><span>Airport duty-free · Panouri gift box (2 people)</span><span>¥ 1,300+</span></div>
            <div className="br"><span>City → Pudong Airport cab</span><span>pending</span></div>
            <div className="br"><span>Phuket rental car</span><span>pending</span></div>
            <div className="br"><span>Late-night local dinner · 4-person split</span><span>pending</span></div>
            <div className="br"><span>Malin Plaza (each paid their own)</span><span>pending</span></div>
            <div className="br"><span>7-Eleven snacks and drinks</span><span>pending</span></div>
            <div className="br total"><span>Running total</span><span>¥ 17,063.42+</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📌 Accounting scope</div>
            <p>Only JJ &amp; Xiaotu's expenses are included (flights and hotel split between the two of them); an extra 5,000 THB in cash stayed for local spending. Ellie and Rock cover their own costs, not counted here. Future spends will be logged at the actual exchange rate.</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">❓ Open items (to finalize at trip end)</div>
            <p>City-to-Pudong cab fare / Phuket rental car details (model · rate · period) / Late-night dinner exact amount (the "120+" — THB or CNY?) and 4-person split / Malin Plaza 4-person total / 7-Eleven small haul.</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>🌴</span></div>
            <p className="hwen" style={{ maxWidth: 480, margin: "0 auto" }}>
              We shot it all, ate it all,<br />dove it all, and lay flat for all of it.
            </p>
            <div style={{ marginTop: 24 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>Trip over · Rest well</span>
            </div>
          </div>

          <div className="page-num">- 07 -</div>
        </div>
      </section>
    </div>
  );
}
