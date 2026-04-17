import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function BangkokZH() {
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
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 420, textAlign: "center", marginTop: 10 }}>
              「旅行的意义不在于抵达终点，<br />而是我们度过的那些无可替代的时光」
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
            <p>下午工作结束匆匆赶去机场，在浦东 T1 卫星厅的 VIP Lounge 吃上了面和小馄饨，旅程就这样开始了。</p>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("IMG_1721.jpeg")} alt="Airport lounge soup" className="pt" />
              <div className="cap">Lounge 的面和小馄饨</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("IMG_1722.jpeg")} alt="Peace sign airplane" className="pt" />
              <div className="cap">✨ Let&apos;s go Bangkok!</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">17:30</span><div className="ev">下班出发，赶往浦东机场</div><div className="dt">工作日赶飞机，心情已经飞到曼谷了</div></div>
            <div className="tl-item"><span className="tm">20:00</span><div className="ev">到达卫星厅 VIP Lounge</div><div className="dt">吃上了面和小馄饨，等待登机 ☕</div></div>
            <div className="tl-item"><span className="tm">01:15</span><div className="ev">落地曼谷素万那普机场</div><div className="dt">入境排队人好多，排了将近一小时</div></div>
            <div className="tl-item"><span className="tm">02:30</span><div className="ev">打车前往酒店</div><div className="dt">用了高德的优惠，但机场的4层找了半天</div></div>
            <div className="tl-item"><span className="tm">03:30</span><div className="ev">终于到酒店 Crowne Plaza</div><div className="dt">Silom 区，位置很方便，洗漱睡觉 😴</div></div>
          </div>

          <div className="nbox mt20">
            <div className="nbox-lbl">📋 行前功课</div>
            <p>曼谷素万那普机场（BKK）是泰国最大的国际机场，距市区约30公里，打车到 Silom 区大约40-60分钟。建议提前下载好 Grab APP，曼谷打车基本靠它。入境排队通常30-60分钟，深夜航班人更多，耐心等待。泰铢汇率约 1 CNY = 4.5 THB。</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 500, margin: "0 auto" }}>
              深夜落地的曼谷，湿热的空气裹挟而来，<br />属于泰国的故事正式开始。
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
              <div className="day-title">曼谷初体验 · 上</div>
              <div className="day-sub">Friday, April 3rd · Silom · Lumpini Park · BACC</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("IMG_1725.jpeg")} alt="Bangkok skyline" className="hero" />
              <div className="cap">酒店窗外的曼谷 — 第一眼就被天际线震撼</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🍴</span></div>

          <div className="jtxt">
            <p>睡到下午才出门觅食，第一顿泰餐在 Ginger Green Farm Kitchen，连锁餐厅口味一般，但这碗 Khao Soi 还是给了惊喜。</p>
          </div>

          <div className="pgrid g2 mt8">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("IMG_1733.jpeg")} alt="Khao Soi" className="sq" />
              <div className="cap">Khao Soi 🍜 香浓的咖喱汤底</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("IMG_1731.jpeg")} alt="Ginger Farm" className="sq" />
              <div className="cap">Ginger Farm Kitchen 餐厅</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🌳</span></div>

          <div className="jtxt">
            <p>伦披尼公园不用门票，曼谷市中心最大的绿地，占地57公顷。吸氧发呆超舒服，还看到了体长达2米的巨蜥（Water Monitor）在游泳！不用怕，它们不攻击人。</p>
          </div>

          <div className="pgrid g3 mt8">
            <div className="pf fg"><img src={img("IMG_1739.jpeg")} alt="Rama VI" className="sq" /><div className="cap">拉玛六世像</div></div>
            <div className="pf fc"><img src={img("IMG_1747.jpeg")} alt="Lumpini lake" className="sq" /><div className="cap">城市绿洲 🏙️</div></div>
            <div className="pf fw"><img src={img("IMG_1751.jpeg")} alt="Monitor lizard" className="sq" /><div className="cap">巨蜥出没！🦎</div></div>
          </div>

          <div className="nbox mt12">
            <div className="nbox-lbl">📍 伦披尼公园 Tips</div>
            <p>免费开放，下午3-5点去最舒服。公园有湖泊、棕榈树和巨蜥，吸氧发呆绝佳去处。距离 Silom 区步行10分钟。</p>
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
              <div className="day-title">曼谷初体验 · 下</div>
              <div className="day-sub">BACC · Siam · 朱拉隆功夜市 · 姐娟海鲜</div>
            </div>
            <div className="day-weather">🌃</div>
          </div>

          <div className="pgrid g2">
            <div className="pf fs"><img src={img("IMG_1767.jpeg")} alt="BACC spiral" className="ls" /><div className="cap">BACC 螺旋内部</div></div>
            <div className="pf fn"><img src={img("IMG_1784.jpeg")} alt="Siam night" className="ls" /><div className="cap">曼谷夜晚的霸气</div></div>
          </div>

          <div className="dv mt16 mb12"><span>🌌</span></div>

          <div className="jtxt">
            <p>朱拉隆功夜市超级热闹，松松海鲜排队太久，转战姐娟海鲜 Jae Keang，鲈鱼超级好评！</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn tl-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("IMG_1813.jpeg")} alt="Song Song" className="ls" />
              <div className="cap">松松海鲜 🦀 排队太久</div>
            </div>
            <div className="pf fw tr-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("IMG_1812.jpeg")} alt="Basil squid" className="ls" />
              <div className="cap">姐娟的罗勒鲈鱼 🤩</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🍼 牛奶小子 Milk Boy</div>
            <p>网红店人太多，尝了下味道一般，不值得大排长龙。但包装确实很可爱～</p>
          </div>

          <div className="pgrid g2 mt16" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1800.jpeg")} alt="Milk Boy" /><div className="pol-t">超可爱的包装</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1794.jpeg")} alt="Cow Moo Moo" /><div className="pol-t">龙的壁画 🐉</div></div>
          </div>

          <div className="spacer" />

          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🏨</div><div className="lb">酒店</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🍜</div><div className="lb">Ginger<br />Farm</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌳</div><div className="lb">伦披尼<br />公园</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🎨</div><div className="lb">BACC</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛍️</div><div className="lb">MBK &<br />Siam</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌌</div><div className="lb">夜市</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">💆‍♂️</div><div className="lb">按摩</div></div>
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
              <div className="day-title">水门寺朝圣 · 上</div>
              <div className="day-sub">Saturday, April 4th · Northeast 泰餐 · Wat Paknam</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>午餐在 Northeast，韩国人开的泰餐店，跟着韩国人吃准没错！冬阴功汤味道很正，大虾空心菜也很好吃。</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("IMG_1828.jpeg")} alt="Tom Yum" /><div className="pol-t">冬阴功汤 🔥</div></div>
            <div className="pol tr-tilt"><img src={img("IMG_1812.jpeg")} alt="Stir fry" /><div className="pol-t">罗勒鲈鱼 🤩</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🏛️</span></div>

          <div className="jtxt">
            <p>下午开启水门寺的"四个机位"打卡之旅，金色大佛在不同角度都有不同的震撼。</p>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fg" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("IMG_1854.jpeg")} alt="Golden Buddha" className="ls" style={{ objectPosition: "center 20%" }} />
              <div className="cap">河边视角的金色大佛 — 本次旅行最震撼的一幕</div>
            </div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fg"><img src={img("IMG_1905.jpeg")} alt="Buddha head" className="sq" /><div className="cap">屋檐后的佛首</div></div>
            <div className="pf fg"><img src={img("IMG_1969.jpeg")} alt="Temple spires" className="sq" /><div className="cap">金碧辉煌的塔尖</div></div>
            <div className="pf fw"><img src={img("IMG_1975.jpeg")} alt="Stilt house" className="sq" /><div className="cap">河边的吃水屋</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📸 水门寺四大机位</div>
            <p>
              <strong>#1 Mama Cafe</strong> 巷子口拍大佛全景 &nbsp;|&nbsp;
              <strong>#2 造船厂咖啡</strong> 20🐷门票抵扣饮品<br />
              <strong>#3 水门寺本寺</strong> 拍大佛全身像 &nbsp;|&nbsp;
              <strong>#4 Talat Phlu</strong> 河边视角，还能看到卧佛
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
              <div className="day-title">Icon Siam · 下</div>
              <div className="day-sub">Pop Mart · 曼谷天际线 · 和幸晚餐</div>
            </div>
            <div className="day-weather">🌇</div>
          </div>

          <div className="jtxt">
            <p>傍晚转战 Icon Siam，这是曼谷最豪华的河边商场，位于湄南河西岸，2018年开业，总面积52万平米。顶楼的 Pop Mart 超大，室外露台拍照打卡，曼谷天际线尽收眼底。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("IMG_1993.jpeg")} alt="Skyline" className="sq" />
              <div className="cap">Icon Siam 顶楼的曼谷天际线</div>
            </div>
            <div className="pf fv" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("IMG_1998.jpeg")} alt="Molly" className="sq" />
              <div className="cap">巨型 Molly 👑</div>
            </div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fv"><img src={img("IMG_1992.jpeg")} alt="Popbean" className="sq" /><div className="cap">Popbean 螺旋 🌀</div></div>
            <div className="pf fw"><img src={img("IMG_2019.jpeg")} alt="Tonkatsu" className="sq" /><div className="cap">和幸炸猪排 🍛</div></div>
            <div className="pf fc"><img src={img("IMG_2004.jpeg")} alt="Mirror pillars" className="sq" /><div className="cap">镜柱装置艺术 ✨</div></div>
          </div>

          <div className="dv mt16 mb12"><span>🛍️</span></div>

          <div className="jtxt">
            <p>在商场收获不少：阿迪达斯 Climacool 鞋子一双，Alo 篮球短裤，Divana 和 Journal 香薰。还帮朋友代购了屈臣氏。另外，肖战成功拦下了一个星巴克 Stanley 联名杯子，史称"星巴克百元咖啡杯事变"。</p>
          </div>

          <div className="dv mt16 mb12"><span>🗺️</span></div>
          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🍜</div><div className="lb">Northeast</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">☕</div><div className="lb">Mama Cafe</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🚢</div><div className="lb">造船厂</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🙏</div><div className="lb">水门寺</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🚤</div><div className="lb">Talat Phlu</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏬</div><div className="lb">Icon Siam</div></div>
          </div>

          <div className="nbox mt12">
            <div className="nbox-lbl">💡 Tips</div>
            <p>Icon Siam 打车离开很难，Grab 完全打不到。可以乘坐金线转绿线 BTS 顺利离开。商场内有泰国的"水上市场"复刻版，G层有各种泰国街头小吃，值得逛逛。</p>
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
              <div className="day-title">慢日子 · 上</div>
              <div className="day-sub">Sunday, April 5th · 泳池 · Nachapt · Bean Coffee</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>今天是慢节奏的一天。上午在酒店泳池晒太阳，下午去 CentralPark 吃美食、喝咖啡。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tl" />
              <img src={img("IMG_2028.jpeg")} alt="Pool" className="ls" />
              <div className="cap">酒店天台泳池 🏊</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("IMG_2029.jpeg")} alt="Room view" className="ls" />
              <div className="cap">房间窗外的曼谷</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🍜</span></div>

          <div className="pgrid g3 mt8">
            <div className="pf fw"><img src={img("IMG_2037.jpeg")} alt="Crab" className="sq" /><div className="cap">粉丝蟹肉煲 🤩</div></div>
            <div className="pf fw"><img src={img("IMG_2035.jpeg")} alt="Curry" className="sq" /><div className="cap">绿咖喱 🌿</div></div>
            <div className="pf fw"><img src={img("IMG_2040.jpeg")} alt="Coffee" className="sq" /><div className="cap">Bean 冰咖啡 ☕</div></div>
          </div>

          <div className="rbox mt20">
            <h4>🍽️ Today&apos;s Food Rating</h4>
            <div className="ri"><span className="nm">Nachapt 粉丝蟹肉</span><span className="st">⭐⭐⭐⭐</span><span className="cm">蟹肉很多很新鲜，强烈推荐！</span></div>
            <div className="ri"><span className="nm">Nachapt 绿咖喱</span><span className="st">⭐⭐⭐⭐</span><span className="cm">绿咖喱也很好吃</span></div>
            <div className="ri"><span className="nm">CentralPark 美食街</span><span className="st">⭐⭐⭐</span><span className="cm">米其林小店聚集，猪蹄不错</span></div>
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
              <div className="day-title">伴手礼 &amp; 小象 · 下</div>
              <div className="day-sub">Good Goods · Panpuri · Pop Mart · 毛巾小象</div>
            </div>
            <div className="day-weather">🌟</div>
          </div>

          <div className="jtxt">
            <p>在 Good Goods 挑了伴手礼，蓝白格编织包和香薰超适合送人。还去 Panpuri 买了滚珠香水，均价300多一只很值得。</p>
          </div>

          <div className="sgrid mt16">
            <div className="sc">
              <img src={img("IMG_2081.jpeg")} alt="Good Goods" />
              <div className="sc-info">
                <h5>Good Goods 伴手礼</h5>
                <div className="pr">3,770 THB</div>
                <div className="ds">编织包+小象挂件+香薰蜡烛</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("IMG_2063.jpeg")} alt="Panpuri" />
              <div className="sc-info">
                <h5>Panpuri 滚珠香水</h5>
                <div className="pr">3,180 THB</div>
                <div className="ds">Cloudwalker &amp; Andaman Sails</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("IMG_2069.jpeg")} alt="Pop Mart" />
              <div className="sc-info">
                <h5>Pop Mart 盲盒</h5>
                <div className="pr">1,780 THB</div>
                <div className="ds">小春野/木鱼敲/比奇堡2代</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("IMG_2070.jpeg")} alt="Perfumes" />
              <div className="sc-info">
                <h5>香氛收藏</h5>
                <div className="pr">2,695 THB</div>
                <div className="ds">Phutawan / Divana / Journal</div>
              </div>
            </div>
          </div>

          <div className="dv mt24 mb16"><span>🐘</span></div>

          <div className="jtxt tcenter">
            <p style={{ textIndent: 0 }}>回到酒店发现了超可爱的毛巾小象！用 100🐷 换的，超级开心，泰国行程完美落幕。</p>
          </div>

          <div style={{ maxWidth: 360, margin: "16px auto", position: "relative", zIndex: 1 }}>
            <div className="pf fs" style={{ padding: 8, position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("IMG_2054.jpeg")} alt="Towel elephant" className="pt" />
              <div className="cap" style={{ fontSize: 18, marginTop: 6 }}>🐘 毛巾小象 — 本次旅行的 MVP</div>
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
              <div className="day-title">再见曼谷</div>
              <div className="day-sub">Monday, April 6th · Bangkok → Shanghai</div>
            </div>
            <div className="day-weather">✈️</div>
          </div>

          <div className="jtxt">
            <p>最后一天，硬着头皮起床吃早餐，拿了一盒纳豆尝尝咸淡，差点被送走——一股子臭鞋垫子味道。</p>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("IMG_2103.jpeg")} alt="Breakfast" className="sq" />
              <div className="cap">最后的早餐（测评一星）</div>
            </div>
            <div className="pf fs tr-tilt" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("IMG_2110.jpeg")} alt="Elephant bye" className="sq" />
              <div className="cap">再见啦小象 👋</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">08:00</span><div className="ev">起床吃早餐</div><div className="dt">纳豆的味道"难以忘怀"</div></div>
            <div className="tl-item"><span className="tm">09:45</span><div className="ev">打车去机场</div><div className="dt">泰兰德拜拜啦 👋</div></div>
            <div className="tl-item"><span className="tm">10:30</span><div className="ev">机场退税</div><div className="dt">退回 878 THB ❤️</div></div>
            <div className="tl-item"><span className="tm">12:50</span><div className="ev">登机 ✈️</div><div className="dt">素万那普机场效率真的很低…</div></div>
            <div className="tl-item"><span className="tm">18:30</span><div className="ev">落地上海</div><div className="dt">Back Home 🏠</div></div>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 460, margin: "0 auto" }}>
              飞机滑行15分钟才停下来，也是绝了。<br />但泰国的故事，已经装进了这本手帐里。
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
              <div className="day-title">美食红黑榜</div>
              <div className="day-sub">4天7家餐厅真实测评</div>
            </div>
          </div>

          <div className="rbox">
            <h4>🌟 推荐榜</h4>
            <div className="ri"><span className="nm">Northeast 泰餐</span><span className="st">⭐⭐⭐⭐</span><span className="cm">韩国人开的泰餐 性价比口味都很绝 364THB/人</span></div>
            <div className="ri"><span className="nm">姐娟海鲜 Jae Keang</span><span className="st">⭐⭐⭐⭐</span><span className="cm">松松边上人少 鲈鱼超好评 430THB/人</span></div>
            <div className="ri"><span className="nm">Nachapt 粉丝蟹肉</span><span className="st">⭐⭐⭐⭐</span><span className="cm">有点小贵但蟹肉真的很不错 892THB/人</span></div>
            <div className="ri"><span className="nm">CentralPark 美食街</span><span className="st">⭐⭐⭐</span><span className="cm">米其林小店聚集 猪蹄和海南鸡都好吃 ~400THB/人</span></div>
          </div>

          <div className="rbox warn mt20">
            <h4>⚠️ 踩雷榜</h4>
            <div className="ri"><span className="nm">Ginger Farm Kitchen</span><span className="st">⭐⭐</span><span className="cm">连锁餐厅 口味一般价格贵 430THB/人</span></div>
            <div className="ri"><span className="nm">和幸炸猪排</span><span className="st">⭐⭐</span><span className="cm">和日本比差很多 不推荐 495THB/人</span></div>
            <div className="ri"><span className="nm">皇冠假日早餐</span><span className="st">⭐</span><span className="cm">吃了个寂寞和臭晕的纳豆 470THB/人</span></div>
          </div>

          <div className="dv mt24 mb16"><span>💰</span></div>

          <div className="bill">
            <h4>💳 总账单（人民币）</h4>
            <div className="br"><span>微信支付</span><span>¥ 5,205.68</span></div>
            <div className="br"><span>酒店住宿</span><span>¥ 4,016.60</span></div>
            <div className="br"><span>机票</span><span>¥ 6,892.00</span></div>
            <div className="br"><span>现金（20000 THB）</span><span>¥ 4,434.00</span></div>
            <div className="br total"><span>TOTAL</span><span>¥ 20,548.28</span></div>
          </div>

          <div className="bill mt16">
            <h4>📦 退税记录（泰铢）</h4>
            <div className="br"><span>屈臣氏</span><span>5,932 THB</span></div>
            <div className="br"><span>Adidas Climacool</span><span>5,700 THB</span></div>
            <div className="br"><span>Alo Shorts</span><span>3,390 THB</span></div>
            <div className="br"><span>Good Goods</span><span>3,770 THB</span></div>
            <div className="br"><span>Panpuri</span><span>3,180 THB</span></div>
            <div className="br total"><span>退税 (4%)</span><span style={{ color: "var(--accent-teal)" }}>+878.88 THB ❤️</span></div>
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
            <div className="hwcn" style={{ maxWidth: 480, margin: "20px auto", textAlign: "center" }}>
              <p>4天3晚，从深夜落地到清晨离开，</p>
              <p>吃了美食，见了大佛，买了好物，</p>
              <p>还收获了一只毛巾小象。</p>
              <p style={{ marginTop: 20 }}>旅行的意义不在于抵达终点，</p>
              <p>而是我们一起走过的那些路。</p>
            </div>
            <div className="cover-line" />
            <div className="tags mt24">
              <span className="tag tag-g">#泰国旅行</span>
              <span className="tag tag-c">#曼谷plog</span>
              <span className="tag tag-t">#电子手帐</span>
              <span className="tag tag-b">#旅行日记</span>
              <span className="tag tag-p">#生活记录</span>
              <span className="tag tag-g">#水门寺</span>
              <span className="tag tag-c">#泰国美食</span>
              <span className="tag tag-t">#日常碎片plog</span>
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
