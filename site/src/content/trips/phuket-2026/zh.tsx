import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function PhuketZH() {
  return (
    <div className="phuket-trip" style={{ display: "contents" }}>
      <CardScaleController />

      {/* ========= CARD 1: COVER ========= */}
      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>PHUKET<br />2026</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🏝️ 🌴 ✈️</div>
            <h1 className="cover-title">
              普吉慢慢躺
            </h1>
            <div className="cover-subtitle">
              Travel Journal
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2026.08.20 — 08.24
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 420, textAlign: "center", marginTop: 10 }}>
              「海岛躺平计划：<br />不赶路，不打卡，醒来就是目的。」
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">BOARDING PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      {/* ========= CARD 2: DAY 1 DEPARTURE & ARRIVAL ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="deco" style={{ width: 130, height: 130, top: -30, right: -20 }} />

          <div className="day-header">
            <div className="day-circle">
              <span className="lbl">Day</span>
              <span className="num">1</span>
            </div>
            <div>
              <div className="day-title">延误起飞，凌晨落地</div>
              <div className="day-sub">Thursday, August 20th · Shanghai ✈️ Phuket</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>忙碌了很久，终于在这一天从工作里抽身，飞往泰兰德躺平。小土刚提完离职、接好下一家 Offer，像是一切都掐着点收了个尾——没有遗留的牵挂，只有满满的期待。</p>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">15:30</span><div className="ev">打车从市区出发</div><div className="dt">直奔浦东 T1，心情已经先飞到普吉</div></div>
            <div className="tl-item"><span className="tm">16:00+</span><div className="ev">抵达浦东 T1</div><div className="dt">值机 + 行李托运</div></div>
            <div className="tl-item"><span className="tm">17:00</span><div className="ev">兑换泰铢 5,000 THB</div><div className="dt">约合 ¥1,100+，机场换汇点</div></div>
            <div className="tl-item"><span className="tm">晚餐前</span><div className="ev">Goose Island 鹅岛精酿啤酒屋</div><div className="dt">浦东 T1 · 三明治 + 薯条套餐</div></div>
            <div className="tl-item"><span className="tm">18:40 → ~20:00</span><div className="ev">上海航空 FM831 延误起飞</div><div className="dt">浦东 T1 → 普吉国际 I 航站楼</div></div>
            <div className="tl-item"><span className="tm">机上</span><div className="ev">航空餐鸡肉面</div><div className="dt">特别难吃 😖 靠修仙短剧撑过夜航</div></div>
            <div className="tl-item"><span className="tm">午夜</span><div className="ev">落地普吉</div><div className="dt">提租车，开约 1 小时到酒店</div></div>
            <div className="tl-item"><span className="tm">02:00</span><div className="ev">入住美林海滩万豪</div><div className="dt">池景特大床客房</div></div>
            <div className="tl-item"><span className="tm">02:00+</span><div className="ev">Sassy 深夜食堂</div><div className="dt">伊桑风味，一桌宵夜下肚才睡得着</div></div>
            <div className="tl-item"><span className="tm">03:30</span><div className="ev">洗漱完毕，睡觉</div><div className="dt">期待更浓 🌴</div></div>
          </div>

          <div className="pgrid g2 mt16">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("goose-island.jpeg")} alt="浦东 T1 鹅岛精酿啤酒屋招牌" className="pt" loading="lazy" decoding="async" />
              <div className="cap">浦东 T1 的鹅岛精酿啤酒屋</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("airport-hotdog-fries.jpeg")} alt="鹅岛三明治配薯条套餐" className="pt" loading="lazy" decoding="async" />
              <div className="cap">三明治 + 薯条套餐 ¥68</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>🍜</span></div>

          <div className="jtxt">
            <p>落地已是午夜。取完租来的车，穿过夜色开了一小时，终于到了酒店。本想吃口东西就睡，没想到酒店附近藏着一家很 Local 的伊桑风味小店 Sassy，一桌宵夜下肚，瞬间原谅了这一路的折腾。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="Sassy 生虾米粉丝沙拉" className="sq" loading="lazy" decoding="async" />
              <div className="cap">生虾米粉丝沙拉 🦐</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("sassy-pad-thai.jpeg")} alt="Sassy Pad Thai 配冬阴功" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Pad Thai，旁边那碗疑似冬阴功</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🏨 普吉岛美林海滩万豪度假酒店</div>
            <p>Merlin Beach Marriott Resort & Spa，入住 8/20 — 8/23 共 3 晚，池景特大床客房。大堂黑白花纹底座 + 白色尖顶灯 + 紫色系花艺，挺有设计感。</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">✈️ 航班延误提醒</div>
            <p>FM831 原定 18:40 起飞，实际延误至约 20:00 离地。延误险最高可赔 ¥300，记得保留延误证明。</p>
          </div>

          <div className="page-num">- 02 -</div>
        </div>
      </div>

      {/* ========= CARD 3: DAY 2 SLOW MORNING ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">自然醒的海岛早晨</div>
              <div className="day-sub">Friday, August 21st · 酒店早餐 · 泳池 · 躺平</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>一夜的折腾，被一个自然醒的上午治愈。十点多慢悠悠晃去吃早餐——超级丰盛，挑了个户外的位子，眼前就是酒店超大的泳池，再远一点是海。</p>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("breakfast-poolside.jpeg")} alt="户外早餐直面泳池与海景" className="hero" loading="lazy" decoding="async" />
              <div className="cap">户外早餐 · 直面泳池与海景</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🌴</span></div>

          <div className="jtxt">
            <p>Omelette 可以自己加很多小料，当地特色面味道也很特别。11 点多回房间接着躺。不赶路，不打卡，今天什么都不做，就很好。</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("resort-pool-view.jpeg")} alt="房间窗外蜿蜒的泳池与棕榈树" loading="lazy" decoding="async" /><div className="pol-t">蜿蜒的泳池 + 棕榈 🌴</div></div>
            <div className="pol tr-tilt"><img src={img("lobby-floral.jpeg")} alt="酒店大堂黑白底座的紫色花艺" loading="lazy" decoding="async" /><div className="pol-t">大堂花艺，设计感在线</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🍳 早餐 Tips</div>
            <p>美林海滩万豪的自助早餐很丰富，建议挑户外座位，边吃早餐边看泳池和海。Omelette  DIY 小料别错过，当地特色面也值得一试。</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>✨</span></div>
            <p className="hwcn" style={{ maxWidth: 480, margin: "0 auto" }}>
              洗漱完凌晨三点半，睡意很浓，期待更浓——<br />海岛早晨，慢慢躺。
            </p>
          </div>

          <div className="page-num">- 03 -</div>
        </div>
      </div>

      {/* ========= CARD 4: FOOD & EXPENSES ========= */}
      <div className="card-wrap">
        <div className="card">
          <div className="sticker" style={{ top: 18, right: 60, fontSize: 34 }}>🍴</div>

          <div className="day-header">
            <div className="day-circle" style={{ background: "var(--accent-coral)" }}>
              <span style={{ fontSize: 24 }}>🍜</span>
              <span style={{ fontSize: 13 }}>FOOD</span>
            </div>
            <div>
              <div className="day-title">美食与账单</div>
              <div className="day-sub">已尝餐厅真实测评 & 当前支出汇总</div>
            </div>
          </div>

          <div className="rbox mt12">
            <h4>🌟 推荐榜</h4>
            <div className="ri"><span className="nm">Sassy traditional Isaan Thai restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">巴东 · 伊桑风味，非常推荐。口味 4.2 / 环境 3.9 / 服务 3.9，营业至次日凌晨 5:30</span></div>
            <div className="ri"><span className="nm">Goose Island 鹅岛精酿啤酒屋</span><span className="st">⭐⭐⭐⭐</span><span className="cm">浦东 T1 · 三明治不错，薯条很棒 🍟</span></div>
            <div className="ri"><span className="nm">美林海滩万豪自助早餐</span><span className="st">⭐⭐⭐⭐</span><span className="cm">超级丰盛，户外直面泳池 + 海滩，太惬意</span></div>
          </div>

          <div className="rbox warn mt16">
            <h4>⚠️ 踩雷榜</h4>
            <div className="ri"><span className="nm">FM831 航空餐鸡肉面</span><span className="st">⭐</span><span className="cm">特别难吃，全靠修仙短剧撑过去 😖</span></div>
          </div>

          <div className="pgrid g2 mt16" style={{ maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fs tl-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("sassy-dianping.jpeg")} alt="Sassy 餐厅在大众点评的页面截图" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Sassy 点评页 · 口味 4.2</div>
            </div>
            <div className="pf fc tr-tilt" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="生虾米粉丝沙拉特写" className="pt" loading="lazy" decoding="async" />
              <div className="cap">伊桑风味的生虾沙拉</div>
            </div>
          </div>

          <div className="dv mt24 mb16"><span>💰</span></div>

          <div className="bill">
            <h4>💳 当前支出（人民币 · JJ & 小土 2 人）</h4>
            <div className="br"><span>上海-普吉往返机票</span><span>¥ 5,512.00</span></div>
            <div className="br"><span>美林海滩万豪 3 晚</span><span>¥ 4,876.22</span></div>
            <div className="br"><span>兑换泰铢 5,000 THB</span><span>≈ ¥ 1,100.00</span></div>
            <div className="br"><span>鹅岛精酿三明治套餐</span><span>¥ 68.00</span></div>
            <div className="br"><span>市区 → 浦东机场打车</span><span>待确认</span></div>
            <div className="br"><span>普吉租车</span><span>待确认</span></div>
            <div className="br"><span>本地宵夜 4 人分摊</span><span>待确认</span></div>
            <div className="br total"><span>累计支出</span><span>¥ 11,556.22+</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📌 记账口径</div>
            <p>以上消费仅含 JJ & 小土 2 人（机票、酒店均按 2 人计），另持 5,000 泰铢现金用于当地零花。Ellie、Rock 的费用各自承担，不计入本表。后续消费按实际汇率折算后补。</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>🌴</span></div>
            <p className="hwcn" style={{ maxWidth: 480, margin: "0 auto" }}>
              海岛躺平计划进行中，<br />后续行程随走随记。
            </p>
            <div style={{ marginTop: 24 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>持续更新中</span>
            </div>
          </div>

          <div className="page-num">- 04 -</div>
        </div>
      </div>
    </div>
  );
}
