import CardScaleController from "@/components/CardScaleController";
import { img } from "./meta";

export default function ShaoxingEN() {
  return (
    <div className="shaoxing-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card">
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>SHAOXING<br />2025</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🛶 Shaoxing Weekend Diary</div>
            <h1 className="cover-title">Canals and Ink</h1>
            <div className="cover-subtitle">Shaoxing Travel Journal</div>
            <div className="cover-date">2025.03.28 — 03.30</div>
            <p>One hour from Shanghai by train, we stepped into Shaoxing&apos;s canals, old homes, and bamboo groves — and into names we had known from schoolbooks for years.</p>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">0</span></div>
            <div>
              <div className="day-title">Friday Night, Arriving in Jiangnan</div>
              <div className="day-sub">Shanghai Hongqiao → Shaoxing North · Yun Duo Hotel</div>
            </div>
            <div className="day-weather">🚄</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc">
              <img src={img("traditional-water-town-mural.jpeg")} alt="Ink-wash mural of Shaoxing water-town lanes" className="hero" />
              <div className="cap">White walls, dark tiles, and canals — the trip began with a Jiangnan scene</div>
            </div>
          </div>

          <div className="jtxt mt16">
            <p>We left Shanghai Hongqiao at 8:22 PM on Friday and reached Shaoxing North at 9:39. Just over an hour by high-speed rail made a clean cut between the workweek and the weekend.</p>
            <p>We stayed at Yun Duo Hotel, 183 Zhongxing South Road in Tashan Subdistrict. A taxi from the station takes about 31 minutes and costs roughly RMB 35; BRT Line 1 takes around 54 minutes if there is no rush. Once the bags were down, Lu Xun&apos;s hometown was ready for the next morning.</p>
          </div>

          <div className="tlwrap mt20">
            <div className="tl-item"><span className="tm">20:22</span><div className="ev">Left Shanghai Hongqiao</div><div className="dt">A weekend escape in just over an hour</div></div>
            <div className="tl-item"><span className="tm">21:39</span><div className="ev">Reached Shaoxing North</div><div className="dt">Taxi about RMB 35 / 31 minutes, or BRT Line 1 in about 54 minutes</div></div>
            <div className="tl-item"><span className="tm">Night</span><div className="ev">Checked into Yun Duo Hotel</div><div className="dt">183 Zhongxing South Road, Tashan Subdistrict</div></div>
          </div>
          <div className="page-num">- 02 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">The Textbook Suddenly Became Real</div>
              <div className="day-sub">Sanwei Study · Baicao Garden · Lu Xun&apos;s Former Residence</div>
            </div>
            <div className="day-weather">📚</div>
          </div>

          <div className="pgrid g12">
            <div className="pf fc">
              <img src={img("traditional-canal-boats-alley.jpeg")} alt="Black-canopy boats moving through a narrow Shaoxing canal" className="pt" />
              <div className="cap">Black-canopy boats passing one after another through the narrow canal</div>
            </div>
            <div className="pgrid g1">
              <div className="pf fw">
                <img src={img("hand-adjusting-world-map-art.jpeg")} alt="Interactive artwork in the Lu Xun hometown district" className="sq" />
                <div className="cap">A playful detail in the old neighborhood</div>
              </div>
              <div className="pf fn">
                <img src={img("person-posing-with-blue-statue.jpeg")} alt="Visitor posing beside a blue-robed figure statue" className="sq" />
                <div className="cap">A quick portrait with the blue-robed figure</div>
              </div>
            </div>
          </div>

          <div className="jtxt mt16">
            <p>Sanwei Study, Baicao Garden, and Lu Xun&apos;s former residence — names we had only read in school were suddenly connected by real lanes and courtyards. Walking through them made the textbook world three-dimensional.</p>
            <p>Baicao Garden was smaller than expected, but Sanwei Study still felt exactly right. Beside the lanes, black-canopy boats slipped slowly past white walls and stone steps along the narrow canal: Shaoxing in its most tangible form.</p>
          </div>

          <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">📖</div><div className="lb">Sanwei Study</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌿</div><div className="lb">Baicao Garden</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏠</div><div className="lb">Lu Xun&apos;s Home</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🥢</div><div className="lb">Shaoxing Weidao</div></div>
          </div>
          <div className="page-num">- 03 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">Dinner, a Table Full of Shaoxing</div>
              <div className="day-sub">Shaoxing Weidao · Saturday Dinner</div>
            </div>
            <div className="day-weather">🥢</div>
          </div>

          <div className="jtxt">
            <p>After Lu Xun&apos;s neighborhood, we sat down for dinner at Shaoxing Weidao. Mushrooms, tofu, seafood, steamed cakes, and buns filled the table and brought a full Saturday of walking to a gentle close.</p>
          </div>

          <div className="pgrid g3 mt16">
            <div className="pf fw"><img src={img("mushroom-tofu-chicken-stirfry.jpeg")} alt="Mushroom, tofu, and chicken stir-fry" className="sq" /><div className="cap">Mushroom, tofu, and chicken</div></div>
            <div className="pf fn"><img src={img("spicy-seafood-hot-pot.jpeg")} alt="Spicy red-broth seafood pot" className="sq" /><div className="cap">Spicy seafood pot</div></div>
            <div className="pf fc"><img src={img("steamed-square-rice-cakes.jpeg")} alt="Square steamed rice cakes" className="sq" /><div className="cap">Soft steamed cakes</div></div>
            <div className="pf fs"><img src={img("creamy-vegetable-seafood-soup.jpeg")} alt="Creamy vegetable and seafood soup" className="sq" /><div className="cap">Vegetable and seafood soup</div></div>
            <div className="pf fw"><img src={img("char-siu-bao-buns.jpeg")} alt="Basket of char siu buns" className="sq" /><div className="cap">Char siu buns</div></div>
            <div className="pf fn"><img src={img("tofu-and-pickled-mustard-stew.jpeg")} alt="Tofu and pickled mustard stew" className="sq" /><div className="cap">Tofu and pickled mustard</div></div>
          </div>

          <div className="nbox mt20">
            <div className="nbox-lbl">The day&apos;s strongest impression</div>
            <p>It was not one particular sight, but the way places known since childhood finally gained scale, atmosphere, and real roads beneath our feet.</p>
          </div>
          <div className="page-num">- 04 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Walking into Lanting through Calligraphy</div>
              <div className="day-sub">Goose Pond · Winding Stream · Wang Youjun Shrine · Calligraphy Museum</div>
            </div>
            <div className="day-weather">✒️</div>
          </div>

          <div className="pgrid g2">
            <div className="pf fw"><img src={img("kuaijishan-lanting-display.jpeg")} alt="Kuaiji Mountain display inspired by the Lanting Preface" className="ls" /><div className="cap">Entering through the story of the Lanting Preface</div></div>
            <div className="pf fc"><img src={img("arched-bridge-over-river.jpeg")} alt="Stone bridge crossing the water beneath the hills at Lanting" className="ls" /><div className="cap">Distant hills, calm water, and a stone bridge</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn"><img src={img("goose-pond-stone-tablet.jpeg")} alt="Goose Pond stone tablet pavilion before a bamboo grove" className="pt" /><div className="cap">The Goose Pond pavilion in the bamboo</div></div>
            <div className="pf fs"><img src={img("calligraphy-zhi-wall.jpeg")} alt="Large zhi character installation at Lanting" className="pt" /><div className="cap">A single “zhi” character expanded across an entire wall</div></div>
          </div>

          <div className="jtxt mt16">
            <p>Sunday took us to Lanting. Admission was RMB 70 and opening hours were 8:00 AM–5:00 PM. Its hills, bamboo, pavilions, and calligraphy installations rewarded a slow walk — and made excellent photographs.</p>
            <p>From Goose Pond and the Lanting Tablet Pavilion to the Winding Stream, the route carried us deeper into the story. Wang Xizhi and the Lanting Preface stopped being names from calligraphy history and became a path we could walk ourselves.</p>
          </div>
          <div className="page-num">- 05 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Walking the Full Lanting Route</div>
              <div className="day-sub">Pavilions, Old Path, Temple Ruins, and Museum</div>
            </div>
            <div className="day-weather">🎋</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc"><img src={img("calligraphy-ribbon-corridor-group.jpeg")} alt="Four travelers beneath hanging calligraphy ribbons at Lanting" className="wd" /><div className="cap">Calligraphy ribbons overhead and one weekend group portrait beneath them</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw"><img src={img("person-in-black-jacket.jpeg")} alt="Visitor in a black jacket at Lanting" className="pt" /><div className="cap">Walking slowly between bamboo and stone inscriptions</div></div>
            <div className="pf fn"><img src={img("two-people-standing-outdoors.jpeg")} alt="Two visitors posing outdoors at Lanting" className="pt" /><div className="cap">A Sunday portrait at Lanting</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">Suggested walking order</div>
            <p>Goose Pond → Lanting Tablet Pavilion → Winding Stream → Wang Youjun Shrine → Imperial Tablet Pavilion → Eighteen Water Jars → Lanting Old Path → Tianzhang Temple Ruins → Lanting Calligraphy Museum. The museum is closed on Mondays.</p>
          </div>

          <div className="bill mt16">
            <h4>Known costs and practical notes</h4>
            <div className="br"><span>From North Station</span><span>Taxi, about 31 minutes</span><strong>About RMB 35</strong></div>
            <div className="br"><span>Public transport</span><span>BRT Line 1</span><strong>About 54 minutes</strong></div>
            <div className="br"><span>Lanting ticket</span><span>Open 8:00 AM–5:00 PM</span><strong>RMB 70 / person</strong></div>
            <div className="br"><span>Souvenirs</span><span>Look out for the fridge magnets</span><strong>Worth browsing</strong></div>
          </div>

          <div className="dv mt20 mb16"><span>🛶</span></div>
          <div className="tcenter">
            <div className="ending-title">Until Next Time, Shaoxing</div>
            <div className="ending-subtitle">Two days, from Lu Xun&apos;s old home to Wang Xizhi&apos;s Lanting.</div>
          </div>
          <div className="tags mt20">
            <span className="tag tag-p">Lu Xun</span>
            <span className="tag tag-b">Canal Boats</span>
            <span className="tag tag-g">Lanting</span>
            <span className="tag tag-t">Winding Stream</span>
          </div>
          <div className="page-num">- 06 -</div>
        </div>
      </div>
    </div>
  );
}
