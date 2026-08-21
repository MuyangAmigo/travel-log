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
    id: "day-2",
    marker: "DAY 2",
    label: "Waking Up Slowly",
    detail: "Hotel breakfast · pool · doing nothing",
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
            <p>After a long stretch of work, we finally escaped to Thailand for a lazy island break. Xiaotu had just handed in notice and accepted the next offer — everything wrapped up right on time. No loose ends, just anticipation.</p>
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
            <p>We landed around midnight. After collecting the rental car and driving for an hour, we finally reached the hotel. We only meant to grab a quick bite before sleep, but Sassy, a local Isaan spot nearby, turned the whole exhausting journey into something worth it.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="Raw shrimp glass noodle salad at Sassy" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Raw shrimp glass noodle salad 🦐</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
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

      {/* ========= CARD 3: DAY 2 SLOW MORNING ========= */}
      <section className="card-wrap" data-trip-section="day-2">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Waking Up Slowly</div>
              <div className="day-sub">Friday, August 21st · Hotel breakfast · Pool · Doing nothing</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>The restless night was healed by a slow morning. We ambled down to breakfast after ten. It was an enormous buffet, and we picked an outdoor table with the hotel&apos;s huge pool ahead and the sea just beyond.</p>
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
            <p>The omelette station lets you pile on toppings, and the local noodle dish had a flavor all its own. After 11, it was back to the room to keep doing nothing. No itinerary, no checkpoints — today, that is the whole plan.</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("resort-pool-view.jpeg")} alt="Winding resort pool and palm trees" loading="lazy" decoding="async" /><div className="pol-t">Winding pool + palms 🌴</div></div>
            <div className="pol tr-tilt"><img src={img("lobby-floral.jpeg")} alt="Hotel lobby floral display" loading="lazy" decoding="async" /><div className="pol-t">Lobby flowers, well styled</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🍳 Breakfast tip</div>
            <p>The Merlin Beach Marriott buffet is generous. Grab an outdoor seat overlooking the pool and sea. Don&apos;t miss the made-to-order omelette station and the local noodle option.</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 520, margin: "0 auto" }}>
              Sleep at 3:30 a.m., sleep in anyway.<br />
              Island mornings are for doing nothing well.
            </p>
          </div>

          <div className="page-num">- 03 -</div>
        </div>
      </section>

      {/* ========= CARD 4: FOOD & EXPENSES ========= */}
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
            <div className="ri"><span className="nm">Sassy traditional Isaan Thai restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Patong · highly recommended. Taste 4.2 / ambience 3.9 / service 3.9, open until 5:30 a.m.</span></div>
            <div className="ri"><span className="nm">Goose Island Beer Co.</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Pudong T1 · solid sandwich, great fries 🍟</span></div>
            <div className="ri"><span className="nm">Merlin Beach Marriott breakfast buffet</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Huge spread, outdoor tables facing the pool and sea</span></div>
          </div>

          <div className="rbox warn mt16">
            <h4>⚠️ The misses</h4>
            <div className="ri"><span className="nm">FM831 in-flight chicken noodles</span><span className="st">⭐</span><span className="cm">Barely edible. Phone dramas saved the night 😖</span></div>
          </div>

          <div className="pgrid g2 mt16" style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fs tl-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("sassy-dianping.jpeg")} alt="Dianping page for Sassy restaurant" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Sassy on Dianping · taste 4.2</div>
            </div>
            <div className="pf fc tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="Close-up of raw shrimp salad" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Isaan-style raw shrimp salad</div>
            </div>
          </div>

          <div className="dv mt24 mb16"><span>💰</span></div>

          <div className="bill">
            <h4>💳 Running expenses (CNY · for 2 people)</h4>
            <div className="br"><span>Shanghai-Phuket round-trip flights</span><span>¥ 5,512.00</span></div>
            <div className="br"><span>Merlin Beach Marriott 3 nights</span><span>¥ 4,876.22</span></div>
            <div className="br"><span>Currency exchange 5,000 THB</span><span>≈ ¥ 1,100.00</span></div>
            <div className="br"><span>Goose Island sandwich set</span><span>¥ 68.00</span></div>
            <div className="br"><span>Downtown → Pudong taxi</span><span>TBD</span></div>
            <div className="br"><span>Phuket car rental</span><span>TBD</span></div>
            <div className="br"><span>Late-night supper, 4 people split</span><span>TBD</span></div>
            <div className="br total"><span>Running total</span><span>¥ 11,556.22+</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📌 Expense note</div>
            <p>Expenses cover JJ &amp; Xiaotu only. Flights and hotel are priced for two. We are also holding 5,000 THB cash for local spending. Ellie and Rock settle their own bills separately. Final numbers will be updated as the trip continues.</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>🌴</span></div>
            <p className="hwcn" style={{ maxWidth: 520, margin: "0 auto" }}>
              Island laziness in progress.<br />
              More notes as the days unfold.
            </p>
            <div style={{ marginTop: 24 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>TO BE CONTINUED</span>
            </div>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </section>
    </div>
  );
}
