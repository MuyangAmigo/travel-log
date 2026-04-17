import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function BangkokEN() {
  return (
    <div className="bangkok-trip" style={{ display: "contents" }}>
      <CardScaleController />

      {/* ========= CARD 1: COVER ========= */}
      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>THAILAND<br />2026</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🇹🇭 ✈️ 🏝️</div>
            <h1 className="cover-title">
              BANGKOK
            </h1>
            <div className="cover-subtitle">
              Travel Journal
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2026.04.02 — 04.06
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 460, textAlign: "center", marginTop: 10 }}>
              &ldquo;The meaning of travel is not in the arrival,<br />
              but in the irreplaceable hours we pass along the way.&rdquo;
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
              <div className="day-title">Departure</div>
              <div className="day-sub">Thursday, April 2nd · Shanghai ✈️ Bangkok</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>Rushed to the airport straight after work. Ate noodles and little wontons in the T1 satellite VIP lounge at Pudong. And with that, the trip began.</p>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("IMG_1721.jpeg")} alt="Airport lounge soup" className="pt" />
              <div className="cap">Noodles &amp; wontons at the lounge</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("IMG_1722.jpeg")} alt="Peace sign airplane" className="pt" />
              <div className="cap">✨ Let&apos;s go Bangkok!</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">17:30</span><div className="ev">Left the office, headed for Pudong</div><div className="dt">Workday takeoff — mind already in Bangkok</div></div>
            <div className="tl-item"><span className="tm">20:00</span><div className="ev">Arrived at the satellite VIP lounge</div><div className="dt">Noodles, wontons, a quiet wait before boarding ☕</div></div>
            <div className="tl-item"><span className="tm">01:15</span><div className="ev">Touched down at Suvarnabhumi</div><div className="dt">Immigration queue was massive — almost an hour</div></div>
            <div className="tl-item"><span className="tm">02:30</span><div className="ev">Taxi to the hotel</div><div className="dt">Used a Gaode coupon, but spent ages hunting the level-4 pickup</div></div>
            <div className="tl-item"><span className="tm">03:30</span><div className="ev">Finally at Crowne Plaza</div><div className="dt">Silom — great location. Shower, sleep 😴</div></div>
          </div>

          <div className="nbox mt20">
            <div className="nbox-lbl">📋 Pre-trip notes</div>
            <p>Suvarnabhumi (BKK) is Thailand&apos;s largest international airport, ~30 km from the city. Taxi to Silom runs 40–60 minutes. Install Grab before you leave — it&apos;s how Bangkok moves. Immigration queues are usually 30–60 minutes, longer for late-night flights. Exchange rate roughly 1 CNY ≈ 4.5 THB.</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 520, margin: "0 auto" }}>
              Landed in Bangkok deep in the night. The humid air wrapped around us,<br />
              and the Thailand chapter officially began.
            </p>
          </div>

          <div className="page-num">- 02 -</div>
        </div>
      </div>

      {/* ========= CARD 3: DAY 1 PART 1 ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">First Taste of Bangkok · I</div>
              <div className="day-sub">Friday, April 3rd · Silom · Lumpini Park · BACC</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("IMG_1725.jpeg")} alt="Bangkok skyline" className="hero" />
              <div className="cap">Bangkok from the hotel window — that skyline, right away</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🍴</span></div>

          <div className="jtxt">
            <p>Slept in until late afternoon, then went looking for lunch. First Thai meal at Ginger Green Farm Kitchen — a chain, fine but unremarkable. The khao soi, though, was the surprise of the meal.</p>
          </div>

          <div className="pgrid g2 mt8">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("IMG_1733.jpeg")} alt="Khao Soi" className="sq" />
              <div className="cap">Khao Soi 🍜 rich curry broth</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("IMG_1731.jpeg")} alt="Ginger Farm" className="sq" />
              <div className="cap">Ginger Farm Kitchen</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🌳</span></div>

          <div className="jtxt">
            <p>Lumpini Park is free — 57 hectares of green in the middle of the city. Perfect for an afternoon of doing nothing in particular. And there it was: a two-meter water monitor swimming past like it owned the place. Don&apos;t worry — they don&apos;t attack people.</p>
          </div>

          <div className="pgrid g3 mt8">
            <div className="pf fg"><img src={img("IMG_1739.jpeg")} alt="Rama VI" className="sq" /><div className="cap">Statue of Rama VI</div></div>
            <div className="pf fc"><img src={img("IMG_1747.jpeg")} alt="Lumpini lake" className="sq" /><div className="cap">An urban oasis 🏙️</div></div>
            <div className="pf fw"><img src={img("IMG_1751.jpeg")} alt="Monitor lizard" className="sq" /><div className="cap">Monitor lizard sighting! 🦎</div></div>
          </div>

          <div className="nbox mt12">
            <div className="nbox-lbl">📍 Lumpini Park Tips</div>
            <p>Free admission. Best around 3–5 PM when the sun softens. Lake, palms, and yes — the monitor lizards. Ten minutes on foot from Silom.</p>
          </div>

          <div className="page-num">- 03 -</div>
        </div>
      </div>

      {/* ========= CARD 4: DAY 1 PART 2 ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">First Taste of Bangkok · II</div>
              <div className="day-sub">BACC · Siam · Chula Night Market · Jae Keang</div>
            </div>
            <div className="day-weather">🌃</div>
          </div>

          <div className="pgrid g2">
            <div className="pf fs"><img src={img("IMG_1767.jpeg")} alt="BACC spiral" className="ls" /><div className="cap">Inside the BACC spiral</div></div>
            <div className="pf fn"><img src={img("IMG_1784.jpeg")} alt="Siam night" className="ls" /><div className="cap">Bangkok at night</div></div>
          </div>

          <div className="dv mt16 mb12"><span>🌌</span></div>

          <div className="jtxt">
            <p>The Chula night market was packed. Song Song Seafood had a queue we couldn&apos;t justify, so we pivoted to Jae Keang. The sea bass — honestly worth every minute of wandering.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn tl-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("IMG_1813.jpeg")} alt="Song Song" className="ls" />
              <div className="cap">Song Song 🦀 queue was brutal</div>
            </div>
            <div className="pf fw tr-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("IMG_1812.jpeg")} alt="Basil squid" className="ls" />
              <div className="cap">Jae Keang basil sea bass 🤩</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🍼 Milk Boy</div>
            <p>Viral for the packaging, but the drinks themselves are… fine. Not worth the line. Packaging is genuinely adorable, though.</p>
          </div>

          <div className="pgrid g2 mt16" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1800.jpeg")} alt="Milk Boy" /><div className="pol-t">That packaging</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1794.jpeg")} alt="Cow Moo Moo" /><div className="pol-t">Dragon mural 🐉</div></div>
          </div>

          <div className="spacer" />

          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🏨</div><div className="lb">Hotel</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🍜</div><div className="lb">Ginger<br />Farm</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌳</div><div className="lb">Lumpini</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🎨</div><div className="lb">BACC</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛍️</div><div className="lb">MBK &amp;<br />Siam</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌌</div><div className="lb">Market</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">💆‍♂️</div><div className="lb">Massage</div></div>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </div>

      {/* ========= CARD 5: DAY 2 PART 1 ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 65, fontSize: 34 }}>🏛️</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Pilgrimage to Wat Paknam · I</div>
              <div className="day-sub">Saturday, April 4th · Northeast · Wat Paknam</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>Lunch at Northeast, a Thai restaurant run by Koreans — follow the Koreans and you won&apos;t go wrong. The tom yum tastes the way tom yum is supposed to taste, and the prawn stir-fried morning glory was excellent.</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1828.jpeg")} alt="Tom Yum" /><div className="pol-t">Tom Yum 🔥</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1812.jpeg")} alt="Stir fry" /><div className="pol-t">Basil sea bass 🤩</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🏛️</span></div>

          <div className="jtxt">
            <p>Afternoon: the Wat Paknam four-angle pilgrimage. The giant golden Buddha lands differently from each viewpoint.</p>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fg" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("IMG_1854.jpeg")} alt="Golden Buddha" className="ls" style={{ objectPosition: "center 20%" }} />
              <div className="cap">The river-side view — the most stunning moment of the trip</div>
            </div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fg"><img src={img("IMG_1905.jpeg")} alt="Buddha head" className="sq" /><div className="cap">Buddha&apos;s head behind the eaves</div></div>
            <div className="pf fg"><img src={img("IMG_1969.jpeg")} alt="Temple spires" className="sq" /><div className="cap">Gilded spires</div></div>
            <div className="pf fw"><img src={img("IMG_1975.jpeg")} alt="Stilt house" className="sq" /><div className="cap">Riverside stilt houses</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📸 The four angles</div>
            <p>
              <strong>#1 Mama Cafe</strong> — the classic alleyway-framed wide shot &nbsp;|&nbsp;
              <strong>#2 Shipyard Coffee</strong> — 20฿ entry, deducted from your drink<br />
              <strong>#3 Wat Paknam itself</strong> — full-body portrait of the Buddha &nbsp;|&nbsp;
              <strong>#4 Talat Phlu</strong> — across the river, where you can also see the Reclining Buddha
            </p>
          </div>

          <div className="page-num">- 05 -</div>
        </div>
      </div>

      {/* ========= CARD 6: DAY 2 PART 2 ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Icon Siam · II</div>
              <div className="day-sub">Pop Mart · Bangkok skyline · Wako dinner</div>
            </div>
            <div className="day-weather">🌇</div>
          </div>

          <div className="jtxt">
            <p>Evening pivot to Icon Siam — Bangkok&apos;s most lavish riverside mall, on the west bank of the Chao Phraya, opened 2018, 520,000 square meters. The rooftop Pop Mart is enormous, the outdoor terrace is where the skyline photos happen, and you get all of Bangkok in one frame.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("IMG_1993.jpeg")} alt="Skyline" className="sq" />
              <div className="cap">The Bangkok skyline from the top</div>
            </div>
            <div className="pf fv" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("IMG_1998.jpeg")} alt="Molly" className="sq" />
              <div className="cap">Giant Molly 👑</div>
            </div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fv"><img src={img("IMG_1992.jpeg")} alt="Popbean" className="sq" /><div className="cap">Popbean spiral 🌀</div></div>
            <div className="pf fw"><img src={img("IMG_2019.jpeg")} alt="Tonkatsu" className="sq" /><div className="cap">Wako tonkatsu 🍛</div></div>
            <div className="pf fc"><img src={img("IMG_2004.jpeg")} alt="Mirror pillars" className="sq" /><div className="cap">Mirror pillar installation ✨</div></div>
          </div>

          <div className="dv mt16 mb12"><span>🛍️</span></div>

          <div className="jtxt">
            <p>The haul: Adidas Climacool, Alo basketball shorts, Divana and Journal home fragrances. Also a Watsons run for a friend. And — a Stanley × Starbucks collab cup acquired in dramatic fashion, later nicknamed the &ldquo;hundred-yuan Starbucks cup incident.&rdquo;</p>
          </div>

          <div className="dv mt16 mb12"><span>🗺️</span></div>
          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🍜</div><div className="lb">Northeast</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">☕</div><div className="lb">Mama Cafe</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🚢</div><div className="lb">Shipyard</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🙏</div><div className="lb">Wat Paknam</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🚤</div><div className="lb">Talat Phlu</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏬</div><div className="lb">Icon Siam</div></div>
          </div>

          <div className="nbox mt12">
            <div className="nbox-lbl">💡 Tips</div>
            <p>Leaving Icon Siam by Grab is a nightmare — cars just don&apos;t come. Take the BTS Gold Line, transfer to Green Line, and you&apos;re out. Inside the mall, there&apos;s a replica floating market and the G-floor has proper Thai street-food stalls. Worth an hour of wandering.</p>
          </div>

          <div className="page-num">- 06 -</div>
        </div>
      </div>

      {/* ========= CARD 7: DAY 3 PART 1 ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
            <div>
              <div className="day-title">Slow Day · I</div>
              <div className="day-sub">Sunday, April 5th · Pool · Nachapt · Bean Coffee</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>A slow-tempo day. Morning in the hotel pool in the sun. Afternoon at Central Park — food and coffee.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tl" />
              <img src={img("IMG_2028.jpeg")} alt="Pool" className="ls" />
              <div className="cap">Rooftop pool 🏊</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("IMG_2029.jpeg")} alt="Room view" className="ls" />
              <div className="cap">Bangkok from the room</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🍜</span></div>

          <div className="pgrid g3 mt8">
            <div className="pf fw"><img src={img("IMG_2037.jpeg")} alt="Crab" className="sq" /><div className="cap">Glass noodle crab pot 🤩</div></div>
            <div className="pf fw"><img src={img("IMG_2035.jpeg")} alt="Curry" className="sq" /><div className="cap">Green curry 🌿</div></div>
            <div className="pf fw"><img src={img("IMG_2040.jpeg")} alt="Coffee" className="sq" /><div className="cap">Bean iced coffee ☕</div></div>
          </div>

          <div className="rbox mt20">
            <h4>🍽️ Today&apos;s Food Rating</h4>
            <div className="ri"><span className="nm">Nachapt crab noodles</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Generous, fresh crab meat. Strongly recommend.</span></div>
            <div className="ri"><span className="nm">Nachapt green curry</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Also excellent.</span></div>
            <div className="ri"><span className="nm">Central Park food hall</span><span className="st">⭐⭐⭐</span><span className="cm">Cluster of Michelin stalls. The pork knuckle is good.</span></div>
          </div>

          <div className="spacer" />
          <div className="page-num">- 07 -</div>
        </div>
      </div>

      {/* ========= CARD 8: DAY 3 PART 2 ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 36 }}>🐘</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
            <div>
              <div className="day-title">Gifts &amp; Elephants · II</div>
              <div className="day-sub">Good Goods · Panpuri · Pop Mart · Towel elephant</div>
            </div>
            <div className="day-weather">🌟</div>
          </div>

          <div className="jtxt">
            <p>Picked up gifts at Good Goods — the blue-and-white woven bag and the incense make great presents. Then Panpuri, where the rollerball perfumes at ~300 THB each felt like a steal.</p>
          </div>

          <div className="sgrid mt16">
            <div className="sc">
              <img src={img("IMG_2081.jpeg")} alt="Good Goods" />
              <div className="sc-info">
                <h5>Good Goods gifts</h5>
                <div className="pr">3,770 THB</div>
                <div className="ds">Woven bag + elephant charm + candles</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("IMG_2063.jpeg")} alt="Panpuri" />
              <div className="sc-info">
                <h5>Panpuri rollerballs</h5>
                <div className="pr">3,180 THB</div>
                <div className="ds">Cloudwalker &amp; Andaman Sails</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("IMG_2069.jpeg")} alt="Pop Mart" />
              <div className="sc-info">
                <h5>Pop Mart blind boxes</h5>
                <div className="pr">1,780 THB</div>
                <div className="ds">Kohana / Mokugyo / Bikini Bottom s2</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("IMG_2070.jpeg")} alt="Perfumes" />
              <div className="sc-info">
                <h5>Fragrance collection</h5>
                <div className="pr">2,695 THB</div>
                <div className="ds">Phutawan / Divana / Journal</div>
              </div>
            </div>
          </div>

          <div className="dv mt24 mb16"><span>🐘</span></div>

          <div className="jtxt tcenter">
            <p style={{ textIndent: 0 }}>Back at the hotel, a discovery: a towel elephant! Traded for 100 THB. The perfect note to close the trip on.</p>
          </div>

          <div style={{ maxWidth: 360, margin: "16px auto", position: "relative", zIndex: 1 }}>
            <div className="pf fs" style={{ padding: 8, position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("IMG_2054.jpeg")} alt="Towel elephant" className="pt" />
              <div className="cap" style={{ fontSize: 18, marginTop: 6 }}>🐘 Towel elephant — MVP of the trip</div>
            </div>
          </div>

          <div className="page-num">- 08 -</div>
        </div>
      </div>

      {/* ========= CARD 9: DAY 4 DEPARTURE ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
            <div>
              <div className="day-title">Goodbye, Bangkok</div>
              <div className="day-sub">Monday, April 6th · Bangkok → Shanghai</div>
            </div>
            <div className="day-weather">✈️</div>
          </div>

          <div className="jtxt">
            <p>Last day. Dragged myself up for breakfast, grabbed a box of natto to give it a fair shot, and nearly tapped out — the smell can only be described as &ldquo;old shoe insole.&rdquo;</p>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("IMG_2103.jpeg")} alt="Breakfast" className="sq" />
              <div className="cap">Final breakfast (one star)</div>
            </div>
            <div className="pf fs tr-tilt" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("IMG_2110.jpeg")} alt="Elephant bye" className="sq" />
              <div className="cap">Bye little elephant 👋</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">08:00</span><div className="ev">Woke up for breakfast</div><div className="dt">The natto — an unforgettable experience</div></div>
            <div className="tl-item"><span className="tm">09:45</span><div className="ev">Taxi to the airport</div><div className="dt">Thailand, farewell 👋</div></div>
            <div className="tl-item"><span className="tm">10:30</span><div className="ev">VAT refund</div><div className="dt">Got back 878 THB ❤️</div></div>
            <div className="tl-item"><span className="tm">12:50</span><div className="ev">Boarding ✈️</div><div className="dt">Suvarnabhumi is genuinely not efficient…</div></div>
            <div className="tl-item"><span className="tm">18:30</span><div className="ev">Landed in Shanghai</div><div className="dt">Back home 🏠</div></div>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 520, margin: "0 auto" }}>
              The plane taxied 15 full minutes before it stopped — incredible.<br />
              But the Thailand story is already packed into this journal.
            </p>
          </div>

          <div className="page-num">- 09 -</div>
        </div>
      </div>

      {/* ========= CARD 10: FOOD REVIEW ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🍻</div>

          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-coral)" }}>
              <span style={{ fontSize: 24 }}>🍴</span>
              <span style={{ fontSize: 13 }}>FOOD</span>
            </div>
            <div>
              <div className="day-title">Food verdict</div>
              <div className="day-sub">Seven restaurants in four days, honest review</div>
            </div>
          </div>

          <div className="rbox">
            <h4>🌟 The winners</h4>
            <div className="ri"><span className="nm">Northeast Thai</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Korean-run Thai. Price and taste both excellent. ~364 THB/person</span></div>
            <div className="ri"><span className="nm">Jae Keang</span><span className="st">⭐⭐⭐⭐</span><span className="cm">Next to Song Song but calmer. Sea bass is outstanding. ~430 THB/person</span></div>
            <div className="ri"><span className="nm">Nachapt crab noodles</span><span className="st">⭐⭐⭐⭐</span><span className="cm">A bit pricey, but the crab delivers. ~892 THB/person</span></div>
            <div className="ri"><span className="nm">Central Park food hall</span><span className="st">⭐⭐⭐</span><span className="cm">A cluster of Michelin stalls — pork knuckle and Hainan chicken both good. ~400 THB/person</span></div>
          </div>

          <div className="rbox warn mt20">
            <h4>⚠️ The misses</h4>
            <div className="ri"><span className="nm">Ginger Farm Kitchen</span><span className="st">⭐⭐</span><span className="cm">Chain energy. Unremarkable food, prices too high. ~430 THB/person</span></div>
            <div className="ri"><span className="nm">Wako tonkatsu</span><span className="st">⭐⭐</span><span className="cm">Nowhere near the Japan original. Skip. ~495 THB/person</span></div>
            <div className="ri"><span className="nm">Crowne Plaza breakfast</span><span className="st">⭐</span><span className="cm">A hollow experience. And the natto. ~470 THB/person</span></div>
          </div>

          <div className="dv mt24 mb16"><span>💰</span></div>

          <div className="bill">
            <h4>💳 Total (CNY)</h4>
            <div className="br"><span>WeChat Pay</span><span>¥ 5,205.68</span></div>
            <div className="br"><span>Hotel</span><span>¥ 4,016.60</span></div>
            <div className="br"><span>Flights</span><span>¥ 6,892.00</span></div>
            <div className="br"><span>Cash (20,000 THB)</span><span>¥ 4,434.00</span></div>
            <div className="br total"><span>TOTAL</span><span>¥ 20,548.28</span></div>
          </div>

          <div className="bill mt16">
            <h4>📦 VAT-refundable purchases (THB)</h4>
            <div className="br"><span>Watsons</span><span>5,932 THB</span></div>
            <div className="br"><span>Adidas Climacool</span><span>5,700 THB</span></div>
            <div className="br"><span>Alo Shorts</span><span>3,390 THB</span></div>
            <div className="br"><span>Good Goods</span><span>3,770 THB</span></div>
            <div className="br"><span>Panpuri</span><span>3,180 THB</span></div>
            <div className="br total"><span>Refund (4%)</span><span style={{ color: "var(--accent-teal)" }}>+878.88 THB ❤️</span></div>
          </div>

          <div className="page-num">- 10 -</div>
        </div>
      </div>

      {/* ========= CARD 11: CLOSING ========= */}
      <div className="card-wrap">
        <div className="card" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div className="deco" style={{ width: 260, height: 260, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="ending-flag">🇹🇭</div>
            <h2 className="ending-title">See You Next Time</h2>
            <p className="ending-subtitle">
              Bangkok, Thailand
            </p>
            <div className="cover-line" />
            <div className="hwcn" style={{ maxWidth: 520, margin: "20px auto", textAlign: "center" }}>
              <p>Four days, three nights — from a midnight landing to a morning farewell.</p>
              <p>Ate well. Saw the Buddha. Bought the things worth buying.</p>
              <p>Came home with a towel elephant.</p>
              <p style={{ marginTop: 20 }}>The meaning of travel is not the arrival —</p>
              <p>it&apos;s the roads we walked together.</p>
            </div>
            <div className="cover-line" />
            <div className="tags mt24">
              <span className="tag tag-g">#thailand</span>
              <span className="tag tag-c">#bangkok</span>
              <span className="tag tag-t">#plog</span>
              <span className="tag tag-b">#journal</span>
              <span className="tag tag-p">#everyday</span>
              <span className="tag tag-g">#wat-paknam</span>
              <span className="tag tag-c">#thai-food</span>
              <span className="tag tag-t">#slow-travel</span>
            </div>
            <div style={{ marginTop: 40 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2026.04</span>
            </div>
          </div>

          <div className="page-num">- 11 -</div>
        </div>
      </div>
    </div>
  );
}
