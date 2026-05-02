import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function HangzhouConcertZH() {
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
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 460, textAlign: "center", marginTop: 10 }}>
              「有时候旅行的理由可以很简单，<br />就是为一场演唱会奔赴一座城。」
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
              <div className="day-title">下午出发，直奔大莲花</div>
              <div className="day-sub">Saturday, March 14th · Shanghai 🚅 Hangzhou</div>
            </div>
            <div className="day-weather">🎤</div>
          </div>

          <div className="jtxt">
            <p>周六下午两点多，拎着一堆零食坐高铁出发。说是旅行，心里其实只装着一件事——凤凰传奇。</p>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("IMG_1546.jpeg")} alt="Concert ticket outside the stadium" className="pt" />
              <div className="cap">大莲花外的票根照：我真的来了</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("IMG_1534.jpeg")} alt="Concert stage before opening" className="pt" />
              <div className="cap">入场前的大莲花舞台 ✨</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>🏨</span></div>

          <div className="nbox mt12">
            <div className="nbox-lbl">🏨 杭州滨江星光大道亚朵酒店</div>
            <p>滨江区滨盛路1786号，距江汉路地铁站步行约950米。江景双床房、房间宽敞干净、床很舒服，前台知道我们来看演唱会后还送了凤凰传奇限定手环。唯一扣分项是淋浴水温忽冷忽热。</p>
          </div>

          <div className="tlwrap mt20">
            <div className="tl-item"><span className="tm">14:00+</span><div className="ev">上海出发</div><div className="dt">高铁、零食、周末逃离感</div></div>
            <div className="tl-item"><span className="tm">傍晚</span><div className="ev">入住滨江亚朵</div><div className="dt">江景房 + 演唱会限定手环</div></div>
            <div className="tl-item"><span className="tm">19:30</span><div className="ev">凤凰传奇「吉祥如意」杭州站</div><div className="dt">杭州奥体中心体育场，大莲花开唱</div></div>
            <div className="tl-item"><span className="tm">散场后</span><div className="ev">直奔欧记大排档</div><div className="dt">用江西辣给亢奋的夜晚收尾</div></div>
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
              <div className="day-title">凤凰传奇「吉祥如意」</div>
              <div className="day-sub">杭州奥体中心体育场 · C2区9排26号</div>
            </div>
            <div className="day-weather">🌹</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("IMG_1508.jpeg")} alt="Phoenix Legend concert stage" className="hero" />
              <div className="cap">巨幅玫瑰亮起的瞬间，全场一起上头</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🎶</span></div>

          <div className="jtxt">
            <p>进场落座，台上「吉祥如意」四个大字铺满整块屏幕，水墨山河的背景连绵铺开，气势磅礴。开场之后完全停不下来——《策马奔腾》的辽阔，《月亮之上》的全场大合唱，还有那幕舞台打出巨幅玫瑰、屏幕飘出歌词的瞬间，台下万人齐声，真的有点上头。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("IMG_1534.jpeg")} alt="Auspicious concert opening screen" className="ls" />
              <div className="cap">开场前的「吉祥如意」</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tc" />
              <img src={img("IMG_1546.jpeg")} alt="Concert ticket with Big Lotus lights" className="ls" />
              <div className="cap">票根和远处亮起的大莲花</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">💡 演唱会 Tips</div>
            <p>提前告诉酒店前台是来看演唱会的，可能有惊喜。大麦 App 购票，入场记得带身份证；散场后人流量大，提前规划好离场路线，直接去宵夜效率最高。</p>
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
              <div className="day-title">散场后的江西辣</div>
              <div className="day-sub">欧记大排档 · 景德菜 · 杭州旗舰店</div>
            </div>
            <div className="day-weather">🌶️</div>
          </div>

          <div className="jtxt">
            <p>散场直奔欧记，这顿宵夜是整趟旅行的高潮之一。辣椒炒肉红绿椒密密麻麻，卤凤爪酱汁浓稠，白灼鱿鱼给嘴巴短暂喘息，石锅鸡带着热气上桌，香气直冲脑门。最后两人举起饮料碰了一杯——一粉一绿，算是给这个亢奋的夜晚正式画上句号。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("IMG_1549.jpeg")} alt="Spicy pork with peppers" className="sq" />
              <div className="cap">辣椒炒肉：光看颜色就冒汗</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("IMG_1550.jpeg")} alt="Braised chicken feet" className="sq" />
              <div className="cap">卤凤爪，软烂入味</div>
            </div>
            <div className="pf fv" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("IMG_1553.jpeg")} alt="Stone pot chicken" className="sq" />
              <div className="cap">石锅鸡，热气腾腾</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1551.jpeg")} alt="Boiled squid" /><div className="pol-t">白灼鱿鱼：清爽喘息位</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1552.jpeg")} alt="Cheers at Ouji" /><div className="pol-t">一粉一绿，碰杯收尾 🍹</div></div>
          </div>

          <div className="rbox warn mt16">
            <h4>辣度预警</h4>
            <div className="ri"><span className="nm">欧记大排档</span><span className="st">★★★★★</span><span className="cm">是真实的江西辣，不是噱头，不能吃辣请务必提前备注少辣。</span></div>
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
              <div className="day-title">不吃早饭，去逛老杭州</div>
              <div className="day-sub">Sunday, March 15th · 五柳巷历史街区</div>
            </div>
            <div className="day-weather">🌿</div>
          </div>

          <div className="jtxt">
            <p>没吃早餐，直接退房出门，用脚步丈量这座城市安静的那一面。转进五柳巷，立刻换了一种频道：白墙黑瓦、石板小道，旁边流着一条窄窄的河，柳枝垂下来，粉色玉兰开得正好。</p>
          </div>

          <div className="pgrid g12 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("IMG_1562.jpeg")} alt="Wuliu Lane canal and blossoms" className="pt" />
              <div className="cap">粉花、河道、老街的慢镜头</div>
            </div>
            <div className="pgrid g1">
              <div className="pf fw"><img src={img("IMG_1556.jpeg")} alt="Cafe and bar sign" className="sq" /><div className="cap">日咖夜酒</div></div>
              <div className="pf fs"><img src={img("IMG_1558.jpeg")} alt="Small tableware shop" className="sq" /><div className="cap">器物小店</div></div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🐱</span></div>

          <div className="jtxt">
            <p>最让人停下来的，是街口石墩上坐着的那只三花猫。背对着人，仰头望着一树粉花，纹丝不动，旁边石墩上还剩几粒干粮——大概是哪位街坊留给它的。也不理我们，就自顾自地看它的风景。</p>
          </div>

          <div className="pgrid g3 mt8">
            <div className="pf fg"><img src={img("IMG_1563.jpeg")} alt="Calico cat watching blossoms" className="sq" /><div className="cap">看花的三花猫</div></div>
            <div className="pf fw"><img src={img("IMG_1555.jpeg")} alt="White wall and old wooden window" className="sq" /><div className="cap">白墙黑瓦，老木窗</div></div>
            <div className="pf fc"><img src={img("IMG_1566.jpeg")} alt="Stinky tofu banner" className="sq" /><div className="cap">臭豆腐旗幡</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">✅ 适合</div>
            <p>不赶行程、喜欢市井气息、爱拍照出片的人。这里没有刻意的景点感，就是一条还在过日子的老街。</p>
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
              <div className="day-title">南宋德寿宫</div>
              <div className="day-sub">皇城遗址 · 宋代寝殿 · 地下原址展厅</div>
            </div>
            <div className="day-weather">🏛️</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fg" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("IMG_1572.jpeg")} alt="Deshou Palace red wall sign" className="hero" />
              <div className="cap">朱红宫墙配上「丙午御吉」，还没进去就已经有感觉</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🏯</span></div>

          <div className="jtxt">
            <p>从五柳巷步行可达。这里是南宋皇城原址保护展示，脚踩着八百年前的地基，历史感从脚底渗上来。馆内有复原的宋代寝殿和御苑，古朴松树、山水庭院，还原了当年皇城的格局。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fg"><img src={img("IMG_1578.jpeg")} alt="Restored Song dynasty hall" className="sq" /><div className="cap">复原寝殿，水墨山屏</div></div>
            <div className="pf fc"><img src={img("IMG_1580.jpeg")} alt="Archaeological site hall" className="sq" /><div className="cap">地下原址遗迹展厅</div></div>
            <div className="pf fw"><img src={img("IMG_1579.jpeg")} alt="Longquan celadon vase" className="sq" /><div className="cap">龙泉窑青釉瓶</div></div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fs"><img src={img("IMG_1575.jpeg")} alt="Pine in Deshou Palace" className="sq" /><div className="cap">松树与白墙</div></div>
            <div className="pf fg"><img src={img("IMG_1581.jpeg")} alt="Deshou Palace garden" className="sq" /><div className="cap">御苑庭院</div></div>
            <div className="pf fc"><img src={img("IMG_1582.jpeg")} alt="Covered garden corridor" className="sq" /><div className="cap">古今叠加的走廊</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🏛️ 参观感受</div>
            <p>展陈方式很用心，古今叠加的层次感做得很好。对历史感兴趣的话，建议预留1.5-2小时慢慢看。</p>
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
              <div className="day-title">东坡文人面馆，然后回上海</div>
              <div className="day-sub">中山中路 · 按摩放松 · 高铁返程</div>
            </div>
            <div className="day-weather">🍜</div>
          </div>

          <div className="jtxt">
            <p>逛完德寿宫，肚子正好开始抗议。转个弯就看到东坡文人面馆——白墙黛瓦的江南建筑外立面，门楣上几个金字在暖光里很有气质，一眼就想走进去。</p>
          </div>

          <div className="pgrid g12 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tb t-tl" />
              <img src={img("IMG_1588.jpeg")} alt="Dongpo Wenren Noodle House storefront" className="pt" />
              <div className="cap">白墙黛瓦，门头很江南</div>
            </div>
            <div className="pgrid g1">
              <div className="pf fg"><img src={img("IMG_1590.jpeg")} alt="Signature soup noodles" className="sq" /><div className="cap">招牌汤面，奶白浓汤</div></div>
              <div className="pf fv"><img src={img("IMG_1593.jpeg")} alt="Dongpo pork" className="sq" /><div className="cap">东坡肉，酥烂即化</div></div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1591.jpeg")} alt="Scallion oil noodles" /><div className="pol-t">葱油拌面，油润顺口</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1592.jpeg")} alt="Braised river shrimp" /><div className="pol-t">油焖河虾，鲜香下饭</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🗺️</span></div>
          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🚅</div><div className="lb">上海<br />出发</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏨</div><div className="lb">滨江<br />亚朵</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🎤</div><div className="lb">大莲花<br />演唱会</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌶️</div><div className="lb">欧记<br />宵夜</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🐈</div><div className="lb">五柳巷</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏛️</div><div className="lb">德寿宫</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🍜</div><div className="lb">东坡<br />文人面</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">⚠️ 血泪提醒</div>
            <p>吃完饭找了一家口碑不错的按摩店，按了肩颈和足底——演唱会站了那么久，这一步非常必要。但按摩要早点安排，留足赶车时间，否则就会像我们一样最后只能狂奔。</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 560, margin: "0 auto" }}>
              杭州，不只有西湖。<br />还有大莲花的万人合唱、辣到冒汗的宵夜、老街里看花的猫。
            </p>
          </div>

          <div className="page-num">- 07 -</div>
        </div>
      </div>
    </div>
  );
}
