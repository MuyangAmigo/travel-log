import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function TokyoEN() {
  return (
    <div className="tokyo-trip" style={{ display: "contents" }}>
      <CardScaleController />

      {/* ========= CARD 1: COVER ========= */}
      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>JAPAN<br />2025</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🇯🇵 ✈️ 🏯</div>
            <h1 className="cover-title">
              Coasts, Disney &amp; a Shopping Spree
            </h1>
            <div className="cover-subtitle">
              Travel Journal
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2025.10.05 — 10.10
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 460, textAlign: "center", marginTop: 10 }}>
              &ldquo;The roads you walk will remember you.<br />
              The things you buy will remember you.<br />
              Every day in Tokyo deserves a line in the ledger.&rdquo;
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">BOARDING PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      {/* ========= CARD 2: DAY 0 DEPARTURE ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="deco" style={{ width: 130, height: 130, top: -30, right: -20 }} />

          <div className="day-header">
            <div className="day-circle">
              <span className="lbl">Day</span>
              <span className="num">0</span>
            </div>
            <div>
              <div className="day-title">Departure &amp; Arrival</div>
              <div className="day-sub">Sunday, October 5th · Shanghai ✈️ Tokyo</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>Quick McDonald&apos;s breakfast, then a car straight to Pudong. Picked up a Davidoff cigar in the duty-free shop and discovered O&apos;Mills bakery at the terminal — easily the best airport bread I&apos;ve had, total recommendation for any bread-in-transit person. Landed in Tokyo after dark; first stop was Menya Musashi in Takadanobaba. Three tickets stacked up, and the trip was officially on.</p>
          </div>

          <div className="pgrid g1 mt16">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("day0-menya-musashi-ramen-receipts.jpeg")} alt="Menya Musashi ramen tickets" className="hero" />
              <div className="cap">First meal on the ground: Menya Musashi, Takadanobaba</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">Morning</span><div className="ev">McDonald&apos;s breakfast, drive to Pudong</div><div className="dt">National Day begins — alarm clock earlier than the holiday</div></div>
            <div className="tl-item"><span className="tm">Midday</span><div className="ev">Pudong T2, boarding pass in hand</div><div className="dt">Duty-free Davidoff; O&apos;Mills bakery, highly recommended</div></div>
            <div className="tl-item"><span className="tm">Evening</span><div className="ev">Touched down in Tokyo</div><div className="dt">Immigration, taxi to the hotel</div></div>
            <div className="tl-item"><span className="tm">Night</span><div className="ev">Menya Musashi, Takadanobaba</div><div className="dt">Three tickets thick, fully recharged 🍜</div></div>
          </div>

          <div className="page-num">- 02 -</div>
        </div>
      </div>

      {/* ========= CARD 3: DAY 1 KAMAKURA I ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🌊</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">Kamakura Coast · I</div>
              <div className="day-sub">Monday, October 6th · Enoshima · Shichirigahama</div>
            </div>
            <div className="day-weather">⛅</div>
          </div>

          <div className="jtxt">
            <p>Two onigiri from the convenience store for breakfast, then JR from central Tokyo to Ofuna, switching onto the Shonan Monorail. Ice cream and pudding on Enoshima, then a slow walk through the shopping street. Lunch at a seaside restaurant in Shichirigahama — the one famous for its Mount Fuji view, except the clouds rolled in and Fuji-san played shy all afternoon.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("green-train-at-station.jpeg")} alt="Enoden green train" className="ls" />
              <div className="cap">The Enoden hanging train — Kamakura&apos;s signature</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("coastal-stream-between-trees.jpeg")} alt="Coastal stream" className="ls" />
              <div className="cap">A tree-shaded stream down to the coast</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🍦</span></div>

          <div className="jtxt">
            <p>The ice cream and pudding on Enoshima are legit dessert-shop quality — eating them in the sea breeze hits differently. The shopping street is good for a 30-minute wander; the pace is just right.</p>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🚃 Getting around Kamakura</div>
            <p>Take the JR to Ofuna, then transfer to the Enoden (hanging train) — one day pass, hop on and off. Every stop is worth a look: Hase, Gokurakuji, Kamakura, Enoshima. Trains run about every 12 minutes, so no need to memorize the timetable.</p>
          </div>

          <div className="page-num">- 03 -</div>
        </div>
      </div>

      {/* ========= CARD 4: DAY 1 KAMAKURA II ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">Kamakura Coast · II</div>
              <div className="day-sub">Gokurakuji · Hase · Komachi-dōri · Tsurugaoka Hachimangū</div>
            </div>
            <div className="day-weather">🌇</div>
          </div>

          <div className="jtxt">
            <p>Gokurakuji&apos;s temple gate is so small you almost miss it; bought a goshuin book inside. At Hase-ji I got so absorbed writing my goshuin that I completely forgot to walk over to the Great Buddha — classic travel-brain fail. Komachi-dōri rewarded me with a bag of pigeon-shaped cookies, absolutely worth a try. Tsurugaoka Hachimangū at night hits different under the lights, and Maisen tonkatsu was the perfect closing act.</p>
          </div>

          <div className="pgrid g1">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("illuminated-japanese-temple-at-night.jpeg")} alt="Tsurugaoka Hachimangu at night" className="hero" />
              <div className="cap">Tsurugaoka Hachimangū at night — Kamakura&apos;s full stop</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("urban-street-red-traffic-light.jpeg")} alt="Komachi street red light" className="sq" />
              <div className="cap">A red light on Komachi-dōri</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("japanese-tonkatsu-set-meal.jpeg")} alt="Maizara tonkatsu set" className="sq" />
              <div className="cap">Maizara tonkatsu — Kamakura&apos;s perfect ending 🍛</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tc" />
              <img src={img("gucci-bag-cafe-table.jpeg")} alt="Cafe table" className="sq" />
              <div className="cap">A street-side café</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("two-people-on-beach.jpeg")} alt="Shonan beach" className="sq" />
              <div className="cap">The Shichirigahama shore</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">⚠️ Hase-ji lesson learned</div>
            <p>Goshuin-stamping is hypnotic, but don&apos;t linger too long in Hase-ji&apos;s main hall — the Great Buddha is literally a few steps away. We were so focused on the calligraphy that by the time we thought of the Buddha, our feet had given out. See the Buddha first, then go back for the stamp.</p>
          </div>

          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🏨</div><div className="lb">Hotel</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🚃</div><div className="lb">Enoden</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏝️</div><div className="lb">Enoshima</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌊</div><div className="lb">Shichirigahama</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">⛩️</div><div className="lb">Gokurakuji</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛕</div><div className="lb">Hase-ji</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛍️</div><div className="lb">Komachi-dōri</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌙</div><div className="lb">Hachimangū</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🍛</div><div className="lb">Maizara</div></div>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </div>

      {/* ========= CARD 5: DAY 2 SHINJUKU ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🥩</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Shinjuku Shopping Spree &amp; Yakiniku</div>
              <div className="day-sub">Tuesday, October 7th · Shinjuku · Rokkasen</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>Slept in, then headed straight to Shinjuku after lunch. Rokkasen&apos;s wagyu yakiniku recharged us for the afternoon — ¥406 per person. Then the spending began: an Arc&apos;teryx tee at Ishii Sports, the Montbell Thunder Pass and ski accessories, a Purple Label sweatshirt and jeans at United Arrows, a full outfit for my partner at City Tokyo, the Salomon XT Whisper and four pairs of On runners, and basics at Uniqlo. Feet were numb by dinner; a quick massage sorted it out. Hakata Furyu ramen closed the night.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("two-people-wearing-patterned-aprons.jpeg")} alt="Grill aprons" className="ls" />
              <div className="cap">Rokkasen aprons — about to start grilling</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("wagyu-beef-slices-platter.jpeg")} alt="Wagyu platter" className="ls" />
              <div className="cap">Wagyu platter 🥩</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("shrimp-and-scallops-on-grill.jpeg")} alt="Shrimp scallops grill" className="sq" />
              <div className="cap">Shrimp and scallops on the grill</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("japanese-wall-art-interior.jpeg")} alt="Restaurant wall art" className="sq" />
              <div className="cap">Ukiyo-e wall art inside</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🛍️</span></div>

          <div className="jtxt">
            <p>Shinjuku sorted outdoor gear, accessories, and basics in a single afternoon. The hotel-room haul looked like a small mountain.</p>
          </div>

          <div className="sgrid mt16">
            <div className="sc">
              <img src={img("mont-bell-black-jacket.jpeg")} alt="Montbell jacket" />
              <div className="sc-info">
                <h5>Montbell Thunder Pass</h5>
                <div className="pr">¥ 640 · 14,800 JPY</div>
                <div className="ds">The MVP of the National Day haul</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("on-running-shoes-box.jpeg")} alt="On shoes" />
              <div className="sc-info">
                <h5>On Cloud runners ×4</h5>
                <div className="pr">¥ 892 · 19,380 JPY</div>
                <div className="ds">One for me, three for the family</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("folded-north-face-tshirt.jpeg")} alt="North Face tee" />
              <div className="sc-info">
                <h5>Purple Label long-sleeve</h5>
                <div className="pr">¥ 470 · 10,200 JPY</div>
                <div className="ds">United Arrows limited</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("white-sneakers-on-shoebox.jpeg")} alt="Salomon XT Whisper" />
              <div className="sc-info">
                <h5>Salomon XT Whisper</h5>
                <div className="pr">¥ 939 · 20,400 JPY</div>
                <div className="ds">Trail shoe meets fashion statement</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("gray-tapered-leg-jeans.jpeg")} alt="UA jeans" />
              <div className="sc-info">
                <h5>United Arrows jeans</h5>
                <div className="pr">¥ 850 · 18,462 JPY</div>
                <div className="ds">Slim fit, surprisingly comfortable</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("folded-black-graphic-tshirts.jpeg")} alt="Black tees" />
              <div className="sc-info">
                <h5>Arc&apos;teryx tees ×2</h5>
                <div className="pr">¥ 1,012</div>
                <div className="ds">From Ishii Sports</div>
              </div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🛒 Shinjuku shopping tips</div>
            <p>Montbell and United Arrows both have flagship stores in Shinjuku, with outlet prices noticeably lower than the department stores. The Uniqlo Shinjuku branch has the fullest stock — remember to scan for tax-free at checkout. Tax-refund queue at Montbell runs about 15 minutes; least crowded weekday afternoons.</p>
          </div>

          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🏨</div><div className="lb">Hotel</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🥩</div><div className="lb">Rokkasen</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🧗</div><div className="lb">Ishii Sports</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🧥</div><div className="lb">Montbell</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👔</div><div className="lb">United Arrows</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👖</div><div className="lb">City Tokyo</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👟</div><div className="lb">Salomon</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👕</div><div className="lb">Uniqlo</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">💆</div><div className="lb">Massage</div></div>
          </div>

          <div className="page-num">- 05 -</div>
        </div>
      </div>

      {/* ========= CARD 6: DAY 3 CITY WALK ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🍃</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
            <div>
              <div className="day-title">City Walk &amp; Omotesandō</div>
              <div className="day-sub">Wednesday, October 8th · Yoyogi · Meiji Jingū · Omotesandō</div>
            </div>
            <div className="day-weather">🍂</div>
          </div>

          <div className="jtxt">
            <p>Tsubame Coffee&apos;s Americano was a touch too sour for me, but Verve&apos;s Signature Latte is excellent — easy recommendation. Yoyogi Park was calm and golden; walking between the ancient trees, you end up right at the main hall of Meiji Jingū. Afternoon was all about Omotesandō: two Arc&apos;teryx tees from the Paygate store. Dinner was shichirin yakiniku Ushigushi with friends at Renee. Closed out the day with a Don Quijote drugstore run for about ¥600 of skincare.</p>
          </div>

          <div className="pgrid g2">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("day3-yoyogi-street.jpeg")} alt="Yoyogi street" className="ls" />
              <div className="cap">Road toward Yoyogi Park</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day3-meiji-jingu-poem-board.jpeg")} alt="Meiji poem board" className="ls" />
              <div className="cap">Emperor Meiji&apos;s poem at the shrine</div>
            </div>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("day3-tokyo-street-trees.jpeg")} alt="Tokyo tree-lined street" className="hero" />
              <div className="cap">A tree-lined street under the expressway</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🧥</span></div>

          <div className="jtxt">
            <p>Arc&apos;teryx Omotesandō: black tee 13,000 JPY (¥598), gray tee 9,000 JPY (¥414). Black is sleeker; gray is more versatile. Both are worth it.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("arcteryx-paygate-store-receipt.jpeg")} alt="Arcteryx receipt" className="sq" />
              <div className="cap">Paygate store receipt</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("don-quijote-shopping-bag.jpeg")} alt="Don Quijote bag" className="sq" />
              <div className="cap">Don Quijote drugstore haul</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">☕ Verve Coffee</div>
            <p>Verve, just south of Yoyogi Park, was the best coffee of the trip — the Signature Latte is rich and creamy with serious espresso backbone. Yoyogi Hachiman-gū is a quiet shrine worth a quick stop on the way back.</p>
          </div>

          <div className="page-num">- 06 -</div>
        </div>
      </div>

      {/* ========= CARD 7: DAY 4 DISNEYSEA DAY ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 36 }}>🏰</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
            <div>
              <div className="day-title">Tokyo DisneySea · Daytime</div>
              <div className="day-sub">Thursday, October 9th · Tokyo DisneySea</div>
            </div>
            <div className="day-weather">⛅</div>
          </div>

          <div className="jtxt">
            <p>Fast McDonald&apos;s breakfast, then the Disney Resort Line monorail into the park. Right at rope-drop, Peter Pan (DPA at 2,000 JPY) — feels like a 3D Transformers ride, easy recommendation. Lunch at Lookout was nothing to write home about. Frozen: no DPA, so we waited about two hours for the boat ride; the story is fine but it runs long. Aquatopia had a short line, a fun way to cool down. Nemo around 5 PM, only a 30-minute wait — Minions-style, very fun. 20,000 Leagues submarine dive, 20-minute line, lost civilization and reef fish, easy pick. Aladdin musical was short but the music was strong.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("day4-disney-resort-line-tickets.jpeg")} alt="Disney monorail tickets" className="ls" />
              <div className="cap">Disney Resort Line single tickets</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day4-fortress-ship-ride.jpeg")} alt="Fortress ship ride" className="ls" />
              <div className="cap">Wooden ship at Fortress Explorations</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("day4-arabian-coast.jpeg")} alt="Arabian coast" className="sq" />
              <div className="cap">Arabian Coast&apos;s domes 🕌</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("day4-tower-of-terror-hotel.jpeg")} alt="Tower of Terror hotel" className="sq" />
              <div className="cap">Tower of Terror in daylight</div>
            </div>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day4-tangled-lantern-ride.jpeg")} alt="Tangled lanterns ride" className="hero" />
              <div className="cap">Tangled lanterns — floating lights from a little boat</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🎟️ DPA strategy</div>
            <p>During a National Day week, DPA is the only way to keep your sanity. Priority: Peter Pan and Tangled — one is a 3D ride and the other a boat ride, and both are absolutely worth the upcharge. Frozen&apos;s DPA sells out instantly; standby hovers around 2 hours, but it&apos;s still worth it if you time it right.</p>
          </div>

          <div className="page-num">- 07 -</div>
        </div>
      </div>

      {/* ========= CARD 8: DAY 4 DISNEYSEA NIGHT ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="deco" style={{ width: 180, height: 180, bottom: -40, right: -40 }} />

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
            <div>
              <div className="day-title">Tokyo DisneySea · Night</div>
              <div className="day-sub">Tangled · Tower of Terror · Nighttime show</div>
            </div>
            <div className="day-weather">🌃</div>
          </div>

          <div className="jtxt">
            <p>DisneySea becomes a different park after dark. Tangled (DPA) was a sea of floating lanterns in a tiny boat — gorgeous, but over before you wanted it to be. The night show needs a good spot; the castle terrace view is the best in the park. The big thrill was Tower of Terror — hands down the most fun ride in the entire park, and the shopping street outside is also stacked. Matsuya beef bowl on the way home, cheap and exactly enough.</p>
          </div>

          <div className="pgrid g1">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day4-mermaid-lagoon-night.jpeg")} alt="Mermaid lagoon at night" className="hero" />
              <div className="cap">Mermaid Lagoon — DisneySea at night is straight out of a fairytale</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("day4-tower-of-terror-ride-photo.jpeg")} alt="Tower of Terror ride photo" className="sq" />
              <div className="cap">Tower of Terror ride photo</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day4-tower-of-terror-dpa-ticket.jpeg")} alt="Tower of Terror DPA" className="sq" />
              <div className="cap">DPA ticket — the best ride in the park</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("day4-night-fountain-show.jpeg")} alt="Night fountain show" className="sq" />
              <div className="cap">Nighttime fountain show</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("day4-disney-night-selfie.jpeg")} alt="Disney night selfie" className="sq" />
              <div className="cap">Quick selfie in the park at night</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🧸</span></div>

          <div className="jtxt">
            <p>One Disney crystal-strap plush from the park shop — ¥1,451 — now lives on my backpack as a souvenir badge for the trip.</p>
          </div>

          <div className="pgrid g1 mt8" style={{ maxWidth: 320, margin: "0 auto" }}>
            <div className="pf fc" style={{ position: "relative", padding: 8 }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("pink-plush-toys-with-stickers.png")} alt="Disney plush" className="pt" />
              <div className="cap" style={{ fontSize: 17, marginTop: 6 }}>The crystal strap — Disney&apos;s official parting gift</div>
            </div>
          </div>

          <div className="page-num">- 08 -</div>
        </div>
      </div>

      {/* ========= CARD 9: DAY 5 CHANEL & DEPT STORES ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>👜</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
            <div>
              <div className="day-title">Chanel Century Exhibition &amp; Department Store Wars</div>
              <div className="day-sub">Friday, October 10th · Takashimaya · Isetan · 19M Tokyo</div>
            </div>
            <div className="day-weather">🛍️</div>
          </div>

          <div className="jtxt">
            <p>Last day. Convenience-store breakfast, then straight to Takashimaya for the gift run — Pola, Fancl, Mikimoto, Shiseido, all done in one sweep. My own haul was Kanebo, Fancl, and a small LV wallet. Checked the Arc&apos;teryx collaboration at Beams — the design was a miss, skipped it. Moved to Isetan: the LV Keepall 35 and two Canada Goose parkas went home with us. Snacks at Takashimaya B2, then the Chanel century exhibition — the most cultural hour of the whole trip, and the perfect closing act.</p>
          </div>

          <div className="pgrid g1">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day5-ginza-cocoon-tower.jpeg")} alt="Ginza Cocoon" className="hero" />
              <div className="cap">Shinjuku&apos;s Cocoon Tower — the department-store war begins</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("day5-chanel-19m-tokyo-banner.jpeg")} alt="Chanel 19M Tokyo banner" className="ls" />
              <div className="cap">Chanel La Galerie du 19M Tokyo</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("day5-chanel-exhibition-outfits.jpeg")} alt="Chanel exhibition outfits" className="ls" />
              <div className="cap">Ready-to-wear pieces in the century exhibition</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("day5-mori-art-museum.jpeg")} alt="Mori Art Museum" className="sq" />
              <div className="cap">A pass-by at Mori Art Museum</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("black-louis-vuitton-handbag-cat.jpeg")} alt="LV Keepall" className="sq" />
              <div className="cap">LV Keepall 35 + a cat 👜</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("folded-black-puffer-jacket.jpeg")} alt="Canada Goose" className="sq" />
              <div className="cap">Canada Goose parka</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("louis-vuitton-wallet-box.jpeg")} alt="LV wallet" className="sq" />
              <div className="cap">LV compact wallet (Takashimaya)</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("lancome-skincare-products-flatlay.jpeg")} alt="Skincare flatlay" className="sq" />
              <div className="cap">Counter purchases from the day</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("kanebo-sealed-cosmetic-sample.jpeg")} alt="Kanebo sample" className="sq" />
              <div className="cap">Kanebo sealed sample</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🛍️ Tax-refresh tips</div>
            <p>Both Takashimaya and Isetan have tax-refund counters in the B1 service area. UnionPay + passport is the fastest. Weekday afternoons queue about 15 minutes; holidays can easily run 40+. Big-ticket items (LV, Canada Goose) are best done at the department stores, then you can still top up at the airport duty-free on the way back.</p>
          </div>

          <div className="page-num">- 09 -</div>
        </div>
      </div>

      {/* ========= CARD 10: SHOPPING RECORDS ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-coral)" }}>
              <span style={{ fontSize: 24 }}>🛍️</span>
              <span style={{ fontSize: 13 }}>SHOP</span>
            </div>
            <div>
              <div className="day-title">Shopping Records</div>
              <div className="day-sub">Five-day total: ¥ 43,675</div>
            </div>
          </div>

          <div className="jtxt">
            <p>A National Day Tokyo shopping explosion: airport duty-free cigar + a full Shinjuku outdoor kit + Omotesandō Arc&apos;teryx + a Disney crystal strap + LV and Canada Goose at Takashimaya and Isetan. Every day had another bag to carry, and by the time we sat down with the receipts, the total was hovering near forty-five grand.</p>
          </div>

          <div className="dv mt20 mb12"><span>💳</span></div>

          <div className="bill">
            <h4>10.5 — Duty free</h4>
            <div className="br"><span>Davidoff cigar</span><span>¥ 1,844</span></div>
            <div className="br total"><span>Subtotal</span><span>¥ 1,844</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.7 — Shinjuku shopping spree</h4>
            <div className="br"><span>Montbell Thunder Pass</span><span>¥ 640</span></div>
            <div className="br"><span>Montbell outdoor accessories</span><span>¥ 396</span></div>
            <div className="br"><span>United Arrows Purple Label tee</span><span>¥ 470</span></div>
            <div className="br"><span>United Arrows jeans</span><span>¥ 850</span></div>
            <div className="br"><span>On Cloud runners ×4</span><span>¥ 892</span></div>
            <div className="br"><span>City Tokyo jeans</span><span>¥ 845</span></div>
            <div className="br"><span>Salomon XT Whisper</span><span>¥ 939</span></div>
            <div className="br"><span>Uniqlo (basics/socks/shorts)</span><span>¥ 371</span></div>
            <div className="br total"><span>Subtotal</span><span>¥ 5,403</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.8 — Omotesandō Arc&apos;teryx &amp; drugstore</h4>
            <div className="br"><span>Arc&apos;teryx black tee</span><span>¥ 598</span></div>
            <div className="br"><span>Arc&apos;teryx gray tee</span><span>¥ 414</span></div>
            <div className="br"><span>Don Quijote drugstore</span><span>¥ 699</span></div>
            <div className="br total"><span>Subtotal</span><span>¥ 1,711</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.9 — Disney</h4>
            <div className="br"><span>Crystal strap plush</span><span>¥ 1,451</span></div>
            <div className="br total"><span>Subtotal</span><span>¥ 1,451</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.10 — Takashimaya &amp; Isetan</h4>
            <div className="br"><span>Takashimaya Kanebo</span><span>¥ 346</span></div>
            <div className="br"><span>Takashimaya Fancl</span><span>¥ 69</span></div>
            <div className="br"><span>China duty-free skincare</span><span>¥ 406</span></div>
            <div className="br"><span>Isetan LV Keepall 35</span><span>¥ 16,155</span></div>
            <div className="br"><span>Isetan Canada Goose parka</span><span>¥ 12,378</span></div>
            <div className="br"><span>Takashimaya LV wallet</span><span>¥ 3,258</span></div>
            <div className="br"><span>Japan duty-free drinks &amp; snacks</span><span>¥ 654</span></div>
            <div className="br total"><span>Subtotal</span><span>¥ 33,266</span></div>
          </div>

          <div className="dv mt24 mb12"><span>📊</span></div>

          <div className="bill">
            <h4>Five-day total</h4>
            <div className="br"><span>10.5 Duty free</span><span>¥ 1,844</span></div>
            <div className="br"><span>10.7 Shinjuku</span><span>¥ 5,403</span></div>
            <div className="br"><span>10.8 Omotesandō</span><span>¥ 1,711</span></div>
            <div className="br"><span>10.9 Disney</span><span>¥ 1,451</span></div>
            <div className="br"><span>10.10 Takashimaya / Isetan</span><span>¥ 33,266</span></div>
            <div className="br total"><span>TOTAL</span><span>¥ 43,675</span></div>
          </div>

          <div className="page-num">- 10 -</div>
        </div>
      </div>

      {/* ========= CARD 11: SHARED EXPENSES ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">$</span></div>
            <div>
              <div className="day-title">Shared Expenses</div>
              <div className="day-sub">National Day Tokyo AA ledger · CNY + JPY</div>
            </div>
          </div>

          <div className="jtxt">
            <p>The shared-spending ledger: hotel, SIM card, Disney entry, and the big group meals all split evenly. The numbers below are already per-person — read them straight off.</p>
          </div>

          <div className="dv mt16 mb12"><span>💴</span></div>

          <div className="bill">
            <h4>In CNY</h4>
            <div className="br"><span>SIM card (270 ÷ 2)</span><span>¥ 135 / person</span></div>
            <div className="br"><span>Disney entry (1784 ÷ 4)</span><span>¥ 446 / person</span></div>
            <div className="br"><span>Yakiniku (1623.8 ÷ 4)</span><span>¥ 405.95 / person</span></div>
            <div className="br"><span>Skyliner (496.98 ÷ 4)</span><span>¥ 124.25 / person</span></div>
            <div className="br"><span>Shichirigahama lunch (358.88 ÷ 4)</span><span>¥ 89.72 / person</span></div>
            <div className="br"><span>Tonkatsu (338.3 ÷ 3)</span><span>¥ 112.77 / person</span></div>
            <div className="br"><span>Tokyo hotel (8173.5 ÷ 2)</span><span>¥ 4,087 / person</span></div>
            <div className="br"><span>JPY cash change (50,000 JPY)</span><span>¥ 2,430</span></div>
            <div className="br total"><span>CNY per person</span><span>¥ 975 / person</span></div>
          </div>

          <div className="bill mt16">
            <h4>In JPY</h4>
            <div className="br"><span>Local train</span><span>1,200 JPY</span></div>
            <div className="br"><span>Lookout lunch</span><span>4,320 JPY</span></div>
            <div className="br"><span>DPA — Tangled</span><span>8,000 JPY</span></div>
            <div className="br"><span>DPA — Peter Pan</span><span>8,000 JPY</span></div>
            <div className="br total"><span>JPY per person (÷ 2)</span><span>10,760 JPY / person</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🧮 A few notes</div>
            <p>Lizi Lu: 5,000 JPY (separate). The tonkatsu is split 3 ways because Pang Yuan didn&apos;t join. Hotel is 2 people to a room, so split 2 ways. We changed 50,000 JPY in cash, almost exactly used it up; ended up converting a bit more for the way back.</p>
          </div>

          <div className="page-num">- 11 -</div>
        </div>
      </div>

      {/* ========= CARD 12: CLOSING ========= */}
      <div className="card-wrap">
        <div className="card" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div className="deco" style={{ width: 260, height: 260, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="ending-flag">🇯🇵</div>
            <h2 className="ending-title">See You Next Time</h2>
            <p className="ending-subtitle">
              Tokyo, Japan · 2025.10
            </p>
            <div className="cover-line" />
            <div className="hwcn" style={{ maxWidth: 500, margin: "20px auto", textAlign: "center" }}>
              <p>From the Kamakura shoreline to the Shinjuku shopping streets,</p>
              <p>from a DisneySea night to the last room of the Chanel exhibition,</p>
              <p>six days and five nights,</p>
              <p>a pile of bags and a whole new journal.</p>
              <p style={{ marginTop: 20 }}>The meaning of travel isn&apos;t the destination —</p>
              <p>it&apos;s the roads we walked together.</p>
            </div>
            <div className="cover-line" />
            <div className="tags mt24">
              <span className="tag tag-g">#JapanTravel</span>
              <span className="tag tag-c">#TokyoPlog</span>
              <span className="tag tag-t">#DigitalJournal</span>
              <span className="tag tag-b">#Kamakura</span>
              <span className="tag tag-p">#Shinjuku</span>
              <span className="tag tag-g">#DisneySea</span>
              <span className="tag tag-c">#ChanelExhibition</span>
              <span className="tag tag-t">#ShopTrip</span>
            </div>
            <div style={{ marginTop: 40 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2025.10</span>
            </div>
          </div>

          <div className="page-num">- 12 -</div>
        </div>
      </div>
    </div>
  );
}
