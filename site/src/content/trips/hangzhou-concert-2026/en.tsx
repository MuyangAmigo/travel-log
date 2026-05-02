import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function HangzhouConcertEN() {
  return (
    <div className="hangzhou-trip" style={{ display: "contents" }}>
      <CardScaleController />

      {/* ========= CARD 1: COVER ========= */}
      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>HANGZHOU<br />2026</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🚅 🎤 🌸</div>
            <h1 className="cover-title">
              Hangzhou
            </h1>
            <div className="cover-subtitle">
              Concert Weekend
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2026.03.14 — 03.15
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 500, textAlign: "center", marginTop: 10 }}>
              &ldquo;Sometimes a trip only needs one reason:<br />a concert in another city.&rdquo;
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">WEEKEND PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      {/* ========= CARD 2: DAY 1 ARRIVAL ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="deco" style={{ width: 130, height: 130, top: -30, right: -20 }} />

          <div className="day-header">
            <div className="day-circle">
              <span className="lbl">Day</span>
              <span className="num">1</span>
            </div>
            <div>
              <div className="day-title">Afternoon train, straight to Big Lotus</div>
              <div className="day-sub">Saturday, March 14th · Shanghai 🚅 Hangzhou</div>
            </div>
            <div className="day-weather">🎤</div>
          </div>

          <div className="jtxt">
            <p>We left Shanghai a little after two on Saturday afternoon, carrying an unreasonable amount of snacks onto the high-speed train. Technically it was a trip; emotionally, it was just one thing — Phoenix Legend.</p>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("IMG_1546.jpeg")} alt="Concert ticket outside the stadium" className="pt" />
              <div className="cap">Ticket photo outside Big Lotus: we really made it</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("IMG_1534.jpeg")} alt="Concert stage before opening" className="pt" />
              <div className="cap">Big Lotus stage before the opening ✨</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>🏨</span></div>

          <div className="nbox mt12">
            <div className="nbox-lbl">🏨 Atour Hotel, Binjiang Starlight Avenue</div>
            <p>Address: 1786 Binsheng Road, Binjiang District, about a 950-meter walk from Jianghan Road metro station. We booked a river-view twin room: spacious, clean, comfortable beds. When the front desk heard we were there for the concert, they gave us Phoenix Legend wristbands. The only minus: shower temperature kept drifting hot and cold.</p>
          </div>

          <div className="tlwrap mt20">
            <div className="tl-item"><span className="tm">14:00+</span><div className="ev">Left Shanghai</div><div className="dt">High-speed train, snacks, weekend escape mode</div></div>
            <div className="tl-item"><span className="tm">Evening</span><div className="ev">Checked into Atour in Binjiang</div><div className="dt">River view room + surprise concert wristbands</div></div>
            <div className="tl-item"><span className="tm">19:30</span><div className="ev">Phoenix Legend &ldquo;Jixiang Ruyi&rdquo;</div><div className="dt">Hangzhou Olympic Sports Center Stadium — Big Lotus</div></div>
            <div className="tl-item"><span className="tm">Afterwards</span><div className="ev">Straight to Ouji for supper</div><div className="dt">Ending the adrenaline with Jiangxi-level heat</div></div>
          </div>

          <div className="page-num">- 02 -</div>
        </div>
      </div>

      {/* ========= CARD 3: CONCERT ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">Phoenix Legend: Jixiang Ruyi</div>
              <div className="day-sub">Hangzhou Olympic Sports Center Stadium · Section C2, Row 9</div>
            </div>
            <div className="day-weather">🌹</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("IMG_1508.jpeg")} alt="Phoenix Legend concert stage" className="hero" />
              <div className="cap">The giant rose moment — the whole stadium went with it</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🎶</span></div>

          <div className="jtxt">
            <p>Once we sat down, the four characters &ldquo;吉祥如意&rdquo; filled the entire screen, backed by an ink-painting landscape that rolled across the stage. Then the show started and never really let up: the open-sky momentum of &ldquo;策马奔腾,&rdquo; the full-stadium singalong to &ldquo;月亮之上,&rdquo; and that huge rose blooming across the screens while lyrics floated out above the crowd. Ten thousand people singing at once does something to you.</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("IMG_1534.jpeg")} alt="Auspicious concert opening screen" className="ls" />
              <div className="cap">Before the opening: Jixiang Ruyi</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tc" />
              <img src={img("IMG_1546.jpeg")} alt="Concert ticket with Big Lotus lights" className="ls" />
              <div className="cap">The ticket with Big Lotus glowing behind it</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">💡 Concert notes</div>
            <p>Tell the hotel front desk you are in town for a concert — sometimes there are small surprises. Tickets were through Damai; bring your ID for entry. After the show, crowds are heavy, so plan your exit route and go straight to supper.</p>
          </div>

          <div className="page-num">- 03 -</div>
        </div>
      </div>

      {/* ========= CARD 4: LATE NIGHT FOOD ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">Jiangxi spice after the show</div>
              <div className="day-sub">Ouji Food Stall · Jingdezhen cuisine · Hangzhou flagship</div>
            </div>
            <div className="day-weather">🌶️</div>
          </div>

          <div className="jtxt">
            <p>After the concert we went straight to Ouji, and this late-night meal became one of the trip&apos;s highlights. Stir-fried pork buried under red and green chilies; braised chicken feet in a deep, sticky sauce; boiled squid as the table&apos;s only clean pause; and stone-pot chicken arriving still bubbling. We clinked two drinks — one pink, one green — and called the night complete.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("IMG_1549.jpeg")} alt="Spicy pork with peppers" className="sq" />
              <div className="cap">Chili pork: sweating before the first bite</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("IMG_1550.jpeg")} alt="Braised chicken feet" className="sq" />
              <div className="cap">Braised chicken feet, soft and sticky</div>
            </div>
            <div className="pf fv" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("IMG_1553.jpeg")} alt="Stone pot chicken" className="sq" />
              <div className="cap">Stone-pot chicken, still steaming</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1551.jpeg")} alt="Boiled squid" /><div className="pol-t">Boiled squid: the refresh button</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1552.jpeg")} alt="Cheers at Ouji" /><div className="pol-t">Pink + green, cheers 🍹</div></div>
          </div>

          <div className="rbox warn mt16">
            <h4>Spice warning</h4>
            <div className="ri"><span className="nm">Ouji Food Stall</span><span className="st">★★★★★</span><span className="cm">Real Jiangxi heat, not a gimmick. If you cannot handle spice, ask for less chili up front.</span></div>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </div>

      {/* ========= CARD 5: WULIU LANE ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 65, fontSize: 34 }}>🐈</div>

          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">No breakfast — old Hangzhou instead</div>
              <div className="day-sub">Sunday, March 15th · Wuliu Lane Historic Block</div>
            </div>
            <div className="day-weather">🌿</div>
          </div>

          <div className="jtxt">
            <p>No breakfast. We checked out and went straight into the quieter side of the city. The moment we turned into Wuliu Lane, the frequency changed: white walls, black tiles, stone paths, a narrow canal running beside us, willow branches dipping down, and pink magnolias in bloom.</p>
          </div>

          <div className="pgrid g12 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("IMG_1562.jpeg")} alt="Wuliu Lane canal and blossoms" className="pt" />
              <div className="cap">Blossoms, canal, old-lane slow motion</div>
            </div>
            <div className="pgrid g1">
              <div className="pf fw"><img src={img("IMG_1556.jpeg")} alt="Cafe and bar sign" className="sq" /><div className="cap">Coffee by day, drinks by night</div></div>
              <div className="pf fs"><img src={img("IMG_1558.jpeg")} alt="Small tableware shop" className="sq" /><div className="cap">A tiny tableware shop</div></div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🐱</span></div>

          <div className="jtxt">
            <p>The scene that stopped us was a calico cat sitting on a stone post at the lane entrance. Back turned to everyone, head tilted up toward a tree full of pink flowers, not moving at all. A few bits of cat food sat on the next post — probably left by a neighbor. The cat ignored us completely and kept watching its own view.</p>
          </div>

          <div className="pgrid g3 mt8">
            <div className="pf fg"><img src={img("IMG_1563.jpeg")} alt="Calico cat watching blossoms" className="sq" /><div className="cap">The blossom-watching cat</div></div>
            <div className="pf fw"><img src={img("IMG_1555.jpeg")} alt="White wall and old wooden window" className="sq" /><div className="cap">White walls and an old wooden window</div></div>
            <div className="pf fc"><img src={img("IMG_1566.jpeg")} alt="Stinky tofu banner" className="sq" /><div className="cap">Stinky tofu banner</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">✅ Best for</div>
            <p>Slow walkers, old-lane people, and anyone who likes a place that still feels lived-in. It does not try too hard to be a tourist attraction, which is exactly why it works.</p>
          </div>

          <div className="page-num">- 05 -</div>
        </div>
      </div>

      {/* ========= CARD 6: DESHOU PALACE ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Southern Song Deshou Palace</div>
              <div className="day-sub">Imperial ruins · restored halls · archaeological site gallery</div>
            </div>
            <div className="day-weather">🏛️</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fg" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("IMG_1572.jpeg")} alt="Deshou Palace red wall sign" className="hero" />
              <div className="cap">The red wall and gold sign set the tone before we even entered</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🏯</span></div>

          <div className="jtxt">
            <p>Deshou Palace is walkable from Wuliu Lane. It preserves and displays the remains of the Southern Song imperial city; standing over foundations from eight centuries ago, the history feels like it is rising from the floor. Inside are reconstructed Song-style halls and gardens, with pines, courtyards, and water-stone compositions restoring the outline of the old palace.</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fg"><img src={img("IMG_1578.jpeg")} alt="Restored Song dynasty hall" className="sq" /><div className="cap">Restored hall, ink landscape screen</div></div>
            <div className="pf fc"><img src={img("IMG_1580.jpeg")} alt="Archaeological site hall" className="sq" /><div className="cap">Underground ruins gallery</div></div>
            <div className="pf fw"><img src={img("IMG_1579.jpeg")} alt="Longquan celadon vase" className="sq" /><div className="cap">Longquan celadon vase</div></div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fs"><img src={img("IMG_1575.jpeg")} alt="Pine in Deshou Palace" className="sq" /><div className="cap">Pine against white walls</div></div>
            <div className="pf fg"><img src={img("IMG_1581.jpeg")} alt="Deshou Palace garden" className="sq" /><div className="cap">Palace garden</div></div>
            <div className="pf fc"><img src={img("IMG_1582.jpeg")} alt="Covered garden corridor" className="sq" /><div className="cap">Old and new layered together</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🏛️ Visit note</div>
            <p>The exhibition design is thoughtful, especially the way old foundations and new reconstruction are layered. If you like history, give it 1.5-2 hours.</p>
          </div>

          <div className="page-num">- 06 -</div>
        </div>
      </div>

      {/* ========= CARD 7: FOOD + RETURN ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">Dongpo noodles, then back to Shanghai</div>
              <div className="day-sub">Zhongshan Middle Road · massage reset · train home</div>
            </div>
            <div className="day-weather">🍜</div>
          </div>

          <div className="jtxt">
            <p>After Deshou Palace, hunger finally caught up with us. Around the corner was Dongpo Wenren Noodle House: white walls, black tiles, and a warm-lit sign that made the whole facade feel like a Jiangnan study.</p>
          </div>

          <div className="pgrid g12 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tb t-tl" />
              <img src={img("IMG_1588.jpeg")} alt="Dongpo Wenren Noodle House storefront" className="pt" />
              <div className="cap">White walls, black tiles, very Hangzhou</div>
            </div>
            <div className="pgrid g1">
              <div className="pf fg"><img src={img("IMG_1590.jpeg")} alt="Signature soup noodles" className="sq" /><div className="cap">Signature soup noodles, milky broth</div></div>
              <div className="pf fv"><img src={img("IMG_1593.jpeg")} alt="Dongpo pork" className="sq" /><div className="cap">Dongpo pork, soft and glossy</div></div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1591.jpeg")} alt="Scallion oil noodles" /><div className="pol-t">Scallion oil noodles</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1592.jpeg")} alt="Braised river shrimp" /><div className="pol-t">Braised river shrimp</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🗺️</span></div>
          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🚅</div><div className="lb">Shanghai</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏨</div><div className="lb">Atour<br />Binjiang</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🎤</div><div className="lb">Big Lotus<br />concert</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌶️</div><div className="lb">Ouji<br />supper</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🐈</div><div className="lb">Wuliu<br />Lane</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏛️</div><div className="lb">Deshou<br />Palace</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🍜</div><div className="lb">Dongpo<br />noodles</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">⚠️ Lesson learned</div>
            <p>After lunch we found a well-rated massage place for shoulders, neck, and feet — absolutely necessary after a concert night. But schedule it earlier and leave enough time for the station, unless you also want the final act to be a sprint for the train.</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 600, margin: "0 auto" }}>
              Hangzhou is not only West Lake.<br />It is also a stadium singing together, late-night spice, and a cat watching flowers in an old lane.
            </p>
          </div>

          <div className="page-num">- 07 -</div>
        </div>
      </div>
    </div>
  );
}
