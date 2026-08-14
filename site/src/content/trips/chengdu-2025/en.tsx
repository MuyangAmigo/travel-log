import CardScaleController from "@/components/CardScaleController";
import { img } from "./meta";

export default function ChengduEN() {
  return (
    <div className="chengdu-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card">
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>CHENGDU<br />2025</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🐼 Chengdu Diary</div>
            <h1 className="cover-title">Chengdu, Take It Slow</h1>
            <div className="cover-subtitle">Chengdu Travel Journal</div>
            <div className="cover-date">2025.01.01 — 01.04</div>
            <p>From Chunxi Road to the panda base, with massages, hotpot steam, and the Jin River lights filling a laid-back New Year escape.</p>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">Flying to the City of Foot Massages</div>
              <div className="day-sub">Shanghai Hongqiao ✈️ Chengdu Tianfu · NIO House · Dacheng Jiangnan Spa</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>Our 4:40 PM flight left Hongqiao after a pause at the NIO House near T2 gate D50. Free coffee, drinks, and snacks turned an ordinary wait into a tiny taste of lounge life.</p>
            <p>By the time we landed at Tianfu at 8:05 PM, we were both running on empty. My partner was still dealing with work, and the frustration finally spilled over at the airport, putting the trip on pause for an hour. Once we had talked it through, we dragged our luggage onto the direct bus to Chunxi Road and watched the empty airport expressway slowly give way to Chengdu&apos;s late-night lights.</p>
            <p>It was already very late when we dropped our bags at the hotel, but we could not spend our first night in the “city of foot massages” simply going to bed. The private shower, massage, and endless snacks at Dacheng Jiangnan worked the travel fatigue — and the bad mood — out of us until the trip finally felt back on track.</p>
          </div>

          <div className="pgrid g3 mt16">
            <div className="pf fn"><img src={img("modern-dark-lounge-bar.jpeg")} alt="Dark lounge seating at Hongqiao Airport" className="sq" loading="lazy" decoding="async" /><div className="cap">A calm pocket before takeoff</div></div>
            <div className="pf fw"><img src={img("nio-storefront-logo-wall.jpeg")} alt="NIO House logo wall" className="sq" loading="lazy" decoding="async" /><div className="cap">Our first taste of “first-class waiting”</div></div>
            <div className="pf fc"><img src={img("panda-lobby-art-installation.jpeg")} alt="Panda installation in a Chengdu hotel lobby" className="sq" loading="lazy" decoding="async" /><div className="cap">Straight into the panda universe</div></div>
          </div>

          <div className="tlwrap mt20">
            <div className="tl-item"><span className="tm">16:40</span><div className="ev">Departed Hongqiao</div><div className="dt">China Eastern FM9543 · Boeing 737 MAX 8</div></div>
            <div className="tl-item"><span className="tm">20:05</span><div className="ev">Landed at Tianfu</div><div className="dt">We were both exhausted, argued, made up, and carried on</div></div>
            <div className="tl-item"><span className="tm">21:40</span><div className="ev">Airport bus to Chunxi Road</div><div className="dt">RMB 15 and about an hour without traffic</div></div>
            <div className="tl-item"><span className="tm">23:00</span><div className="ev">Dacheng Jiangnan Spa</div><div className="dt">RMB 269 for 80 minutes, private shower, and plenty of snacks</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">An honest first night</div>
            <p>Trips do not always begin in a perfect mood. Fatigue, a disagreement, making up, then getting a massage together — that was our real Chengdu opening.</p>
          </div>
          <div className="page-num">- 02 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Chunxi Road Wanderers · Day</div>
              <div className="day-sub">Kao Jiang · IFS · Daci Temple · Taikoo Li</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc"><img src={img("two-people-outdoor-cafe.jpeg")} alt="Two people sitting at an outdoor cafe in Chengdu" className="hero" loading="lazy" decoding="async" /><div className="cap">The best Chengdu rhythm: walk slowly, sit whenever you like</div></div>
          </div>

          <div className="jtxt mt16">
            <p>Chunxi Road was the center of the day, from lunch until well after dark. We ordered garlic grilled fish at Kao Jiang. It became a little rich by the end, but the service was excellent, and a one-yuan review check-in earned us two fridge magnets.</p>
            <p>At street level, the giant IFS panda offered only its round back as it clung to the facade. We rode up to level seven to finally meet it face to face. Deeper inside Taikoo Li, the busy shopping district was suddenly interrupted by the quiet of Daci Temple: glass storefronts and crowds on one side, red walls, bamboo shadows, and afternoon courtyards on the other, somehow perfectly at ease together.</p>
            <p>We wandered through the temple shop, adding a few stamps to the trip, then stepped straight back into shopping mode. A Stone Island sweater came home for my partner, and we found a Le Labo gift for my sister. Chengdu&apos;s laid-back rhythm and our enthusiastic spending occupied the very same afternoon.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw"><img src={img("couple-in-winter-jackets-outdoors.jpeg")} alt="Couple in winter jackets on Chunxi Road" className="ls" loading="lazy" decoding="async" /><div className="cap">New Year on Chunxi Road</div></div>
            <div className="pf fn"><img src={img("people-with-large-panda-statue.jpeg")} alt="Two people with the giant IFS panda sculpture" className="ls" loading="lazy" decoding="async" /><div className="cap">Up to level seven for the panda&apos;s face</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fs"><img src={img("traditional-chinese-temple-courtyard.jpeg")} alt="Traditional courtyard at Daci Temple" className="pt" loading="lazy" decoding="async" /><div className="cap">Daci Temple, wrapped inside Taikoo Li</div></div>
            <div className="pf fc"><img src={img("person-standing-by-bamboo-wall.jpeg")} alt="Person standing beside a bamboo wall" className="pt" loading="lazy" decoding="async" /><div className="cap">Temple calm beside modern storefronts</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">Today&apos;s haul</div>
            <p>A Stone Island sweater for RMB 3,126 and a Le Labo gift for RMB 460. Daci Temple&apos;s creative shop has stamp stations — bring your own notebook.</p>
          </div>
          <div className="page-num">- 03 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Chunxi Road Wanderers · Night</div>
              <div className="day-sub">Wangping Street · Panda Bookstore · Anshun Bridge · Jiuyan Bridge</div>
            </div>
            <div className="day-weather">🌃</div>
          </div>

          <div className="jtxt">
            <p>Wangping Street was a fifteen-minute walk from Taikoo Li. We sat beside the Jin River with handmade milk tea from Li Shanshan. Dinner was Leshan Pang Ge&apos;s qiaojiao beef: an RMB 88 set for two whose “small” serving was bigger than a Shanghai large.</p>
            <p>As daylight faded, the lamps along both banks of the Jin River came on one by one. With no schedule to chase, we kept walking, adding another half hour for a Panda Bookstore we had seen on Xiaohongshu. We expected another photogenic internet stop, but the roomful of panda treasures won us over, and we left with a classic fridge magnet and dessert.</p>
            <p>Anshun Bridge, Jiuyan Bridge, and the bar street revealed a completely different Chengdu. Reflections trembled on the water, people filled both levels of the riverfront, and the temples and bamboo shadows of the afternoon gave way to nightlife. By ten, our feet had officially resigned — perfect timing for a massage after one very long city walk.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn"><img src={img("night-river-selfie-city-lights.jpeg")} alt="Night selfie beside the Jin River" className="pt" loading="lazy" decoding="async" /><div className="cap">Anshun Bridge and the Jin River at night</div></div>
            <div className="pf fw"><img src={img("two-people-in-traditional-backdrop.jpeg")} alt="Two people posing in a traditional backdrop" className="pt" loading="lazy" decoding="async" /><div className="cap">Still wandering long after dark</div></div>
          </div>

          <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🐟</div><div className="lb">Kao Jiang</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🐼</div><div className="lb">IFS</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏯</div><div className="lb">Daci</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛍️</div><div className="lb">Taikoo Li</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌊</div><div className="lb">Wangping</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌉</div><div className="lb">Jiuyan</div></div>
          </div>

          <div className="nbox mt20">
            <div className="nbox-lbl">Night notes</div>
            <p>The Panda Bookstore was cute enough to justify the thirty-minute walk. Anshun Bridge, Jiuyan Bridge, and the bar street form one lively riverfront stretch; Jiuyan Bridge has the best angle back toward Anshun. We finished with another massage at Jinzu Yinxiang, RMB 298 each.</p>
          </div>
          <div className="page-num">- 04 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
            <div>
              <div className="day-title">Meeting Internet Star Huahua</div>
              <div className="day-sub">Panda Base · Kuanzhai Alley · People&apos;s Park</div>
            </div>
            <div className="day-weather">🐼</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc"><img src={img("giant-panda-sitting-by-bamboo.jpeg")} alt="Giant panda Huahua sitting beside bamboo" className="hero" loading="lazy" decoding="async" /><div className="cap">One hour in line, three minutes together — still worth it</div></div>
          </div>

          <div className="jtxt mt16">
            <p>After staying up too late, we dragged ourselves out of bed at 9:45. Baozi, soy milk, and pork-intestine noodles at Ganshiji got us moving — and then I left my ID there and briefly tried to blame my partner. Guilty.</p>
            <p>A taxi from Chunxi Road to the panda base took about thirty minutes and cost around RMB 20. We followed the advice to enter from the west gate, where the crowds were lighter, but there was still no escaping the line for Huahua. One hour of waiting bought us just three minutes with her. She sat beside the bamboo, diligently being adorable, so perfectly round that photos and videos could not quite capture the real thing.</p>
            <p>After the panda base, the afternoon slowed right down. Kuanzhai Alley felt more like a busy internet-famous snack street, so we skipped the serious checklist and simply wandered, ate a startlingly affordable meal of roast duck mao cai and pig-trotter soup, then drifted toward People&apos;s Park. Heming Teahouse was less magical than expected, but sitting with tea and watching the people around us still counted as a small taste of Chengdu&apos;s slower life.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw"><img src={img("person-pointing-at-panda-enclosure.jpeg")} alt="Person pointing toward a panda enclosure" className="pt" loading="lazy" decoding="async" /><div className="cap">The west gate was quieter — straight to Huahua</div></div>
            <div className="pf fn"><img src={img("two-people-by-wooden-tower.jpeg")} alt="Two people beside a wooden tower at the panda base" className="pt" loading="lazy" decoding="async" /><div className="cap">Winter sun inside the panda base</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fs"><img src={img("two-people-near-pig-statue.jpeg")} alt="Two people posing beside a sculpture" className="ls" loading="lazy" decoding="async" /><div className="cap">An easy stroll through Kuanzhai Alley</div></div>
            <div className="pf fc"><img src={img("two-people-peace-signs-building.jpeg")} alt="Two people making peace signs outside a traditional building" className="ls" loading="lazy" decoding="async" /><div className="cap">A slower afternoon near People&apos;s Park</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">Great food, mixed reviews</div>
            <p>Near Kuanzhai Alley, roast duck mao cai cost RMB 55 and pig-trotter soup RMB 40 — absurdly good value. Heming Teahouse was cold outdoors, with fairly packaged snacks and a street-life atmosphere that felt a little staged. The roadside fruit also felt priced for visitors.</p>
          </div>
          <div className="page-num">- 05 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
            <div>
              <div className="day-title">Emperor for a Meal at Shuyan Fu</div>
              <div className="day-sub">Shuyan Fu · Eastern Suburb Memory · NIO House · Tianfu Airport</div>
            </div>
            <div className="day-weather">👑</div>
          </div>

          <div className="jtxt">
            <p>No morning KPI on our final day: we slept until checkout at 11:30. Shuyan Fu turned lunch into an immersive court banquet, bringing ritual, tableware, stagecraft, and food together until it genuinely felt like we were dining as royalty.</p>
            <p>From the moment we received the pink tickets, this was clearly more than a meal. The tea set and wooden trays established the ceremony, dishes arrived in a deliberate rhythm, and traditional dance kept pulling our attention from the table back to the stage. The immersion was carefully engineered, of course, but polished enough that we happily stepped into its Sichuan court fantasy.</p>
            <p>After lunch, we walked it off at Eastern Suburb Memory. The old factory shells, pipes, and industrial structures remain, but cafes, boutiques, and entertainment now fill the spaces between them. Our last stop was another familiar NIO House for drinks, charging, and a city fridge magnet — one final stamp on four days in Chengdu.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fn"><img src={img("pink-event-tickets-in-hand.jpeg")} alt="Pink Shuyan Fu tickets held in one hand" className="pt" loading="lazy" decoding="async" /><div className="cap">Tickets to today&apos;s royal banquet</div></div>
            <div className="pf fw"><img src={img("japanese-tea-ceremony-set.jpeg")} alt="Tea set on the Shuyan Fu table" className="pt" loading="lazy" decoding="async" /><div className="cap">The ceremony began with the tableware</div></div>
            <div className="pf fc"><img src={img("wooden-serving-tray-with-bowls.jpeg")} alt="Small dishes arranged on a wooden tray" className="pt" loading="lazy" decoding="async" /><div className="cap">Sichuan flavors arriving course by course</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fs"><img src={img("traditional-dance-stage-performance.jpeg")} alt="Traditional dance performance at Shuyan Fu" className="ls" loading="lazy" decoding="async" /><div className="cap">Traditional dance alongside lunch</div></div>
            <div className="pf fw"><img src={img("xiaobanyouli-cafe-storefront.jpeg")} alt="Xiaobanyouli storefront at Eastern Suburb Memory" className="ls" loading="lazy" decoding="async" /><div className="cap">New life inside an old industrial district</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">The final stop</div>
            <p>At the NIO House in InCity we collected a city magnet, had drinks, charged our devices, and checked in. Tianfu Airport really is far — around ninety minutes by public transit — but advance check-in and no checked luggage kept the journey smooth.</p>
          </div>
          <div className="page-num">- 06 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">¥</span><span className="num">10K</span></div>
            <div>
              <div className="day-title">The Four-Day Bill</div>
              <div className="day-sub">RMB 10,474 total · RMB 7,348 excluding Stone Island</div>
            </div>
            <div className="day-weather">🧾</div>
          </div>

          <div className="bill mt16">
            <div className="br"><span>Shopping</span><span>Stone Island 3,126 + Le Labo 460</span><strong>3,586</strong></div>
            <div className="br"><span>Activities</span><span>Massages, ear cleaning, pandas, Shuyan Fu</span><strong>2,608</strong></div>
            <div className="br"><span>Flight &amp; hotel</span><span>Flights 1,818 + hotel 1,246</span><strong>3,064</strong></div>
            <div className="br"><span>Food</span><span>Meals across four days</span><strong>751</strong></div>
            <div className="br"><span>Transport</span><span>Airport bus, taxis, and local travel</span><strong>150</strong></div>
            <div className="br"><span>Other</span><span>Fruit, souvenirs, and incidentals</span><strong>314</strong></div>
            <div className="br total"><span>Total</span><span>Four days and three nights</span><strong>10,474 RMB</strong></div>
          </div>

          <div className="dv mt20 mb16"><span>🐼</span></div>
          <div className="tcenter">
            <div className="ending-flag">👋</div>
            <div className="ending-title">Goodbye, Chengdu!</div>
            <div className="ending-subtitle">A little tiring, a little expensive, and a whole lot of fun.</div>
          </div>
          <div className="tags mt20">
            <span className="tag-pink">Huahua</span>
            <span className="tag-blue">Chunxi Road</span>
            <span className="tag-gold">Shuyan Fu</span>
            <span className="tag-green">Massage City</span>
          </div>
          <div className="page-num">- 07 -</div>
        </div>
      </div>
    </div>
  );
}
