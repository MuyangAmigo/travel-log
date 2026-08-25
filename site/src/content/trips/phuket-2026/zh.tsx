import type { TripEntrySection } from "@/components/TripEntryLayout";
import { img } from "./meta";

export const sections = [
  {
    id: "overview",
    marker: "PHUKET",
    label: "旅程封面",
    detail: "海岛躺平度假 · 2026.08.20 — 08.24",
  },
  {
    id: "day-1",
    marker: "DAY 1",
    label: "延误起飞，凌晨落地",
    detail: "上海 ✈️ 普吉 · 鹅岛、Sassy 与凌晨三点半",
  },
  {
    id: "day-2-morning",
    marker: "DAY 2",
    label: "海风、泳池与慢时光",
    detail: "自然醒的早餐 · 私人沙滩 · 决定去潜水",
  },
  {
    id: "day-2-sunset",
    marker: "DAY 2",
    label: "日落、滑翔伞与海风",
    detail: "芭东散步 · Malin Plaza 夜市 · 毛巾小象",
  },
  {
    id: "day-3",
    marker: "DAY 3",
    label: "Racha 岛 · 失控到入门",
    detail: "三潜 DSD · Naughty Nuri's · 2 小时泰式按摩",
  },
  {
    id: "day-4",
    marker: "DAY 4",
    label: "Sassy 出发，Sassy 收尾",
    detail: "江西冷 BigC · 海边躺平 · Panouri 礼盒",
  },
  {
    id: "food-bill",
    marker: "FOOD",
    label: "美食与账单",
    detail: "真实测评 & JJ & 小土支出汇总",
  },
] satisfies readonly TripEntrySection[];

export default function PhuketZH() {
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
              <div className="day-title">延误起飞，凌晨落地</div>
              <div className="day-sub">Thursday, August 20th · Shanghai ✈️ Phuket</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>忙碌了很久很久，终于在这一天，从工作里抽身出来，去往海岛躺平。昨天刚结束 EVP Visit，小土提了离职、也接好了下一家的 Offer——像是冥冥之中安排好的，所有事情都赶在出发前收了尾。没有遗留的牵挂，只有满满的期待。一切刚刚好。好期待泰兰德的夏天 🌴</p>
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
            <p>原定傍晚的航班，拖到夜里近八点才离地。机上那份鸡肉面实在难以下咽，全靠修仙短剧撑过漫长的夜航，觉也没睡踏实。落地已是午夜，取了租来的车穿过夜色开了一小时，终于到了酒店。本想吃口东西就睡，没想到酒店附近藏着一家很 Local 的小店——Sassy traditional Isaan Thai restaurant，一桌宵夜下肚，瞬间原谅了这一路的折腾。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("sassy-restaurant.jpeg")} alt="Sassy traditional Isaan Thai restaurant 店面" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Sassy · 酒店附近的深夜食堂</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("sassy-shrimp-salad.jpeg")} alt="Sassy 生虾米粉丝沙拉" className="sq" loading="lazy" decoding="async" />
              <div className="cap">生虾米粉丝沙拉 🦐</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("sassy-pad-thai.jpeg")} alt="Sassy Pad Thai 配冬阴功" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Pad Thai，旁边疑似冬阴功</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🏨 普吉岛美林海滩万豪度假酒店</div>
            <p>Merlin Beach Marriott Resort & Spa，入住 8/20 — 8/23 共 3 晚，池景特大床客房。大堂黑白花纹底座 + 白色尖顶灯 + 紫色系花艺，挺有设计感。</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">✈️ 航班延误提醒</div>
            <p>FM831 原定 18:40 起飞，实际延误至约 20:00 离地。延误险最高可赔 ¥300，记得保留延误证明（航司短信 / App 延误通知）。</p>
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
              <div className="day-title">海风、泳池与慢时光</div>
              <div className="day-sub">Friday, August 21st · 酒店早餐 · 私人沙滩 · 决定去潜水</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>一夜的折腾，被一个自然醒的上午治愈了。十点多慢悠悠晃去吃早餐——超级丰盛，挑了个户外的位子，眼前就是酒店超大的泳池，再远一点是海。Omelette 自己加满小料，当地的面条味道也很特别。11 点多回房间接着躺。不赶路，不打卡，今天什么都不做，就很好。</p>
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
            <p>休息到两点才出门，本想简单游个泳，结果在泳池边偶遇 Ellie 和 Rock，四个人临时组队去探了酒店的私人沙滩。沙滩非常私密，脚下沙子硬了点、还有碎石头，但胜在安静、没人。站在石阶上看海，看对岸山坡上零星的房子和椰林，整个人都松弛下来。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("private-beach.jpeg")} alt="酒店私人沙滩的海与棕榈" className="pt" loading="lazy" decoding="async" />
              <div className="cap">私人沙滩 · 海 + 棕榈</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("beach-view.jpeg")} alt="沙滩远景，对岸山坡红顶蓝顶小屋" className="pt" loading="lazy" decoding="async" />
              <div className="cap">远眺对岸的小屋（潜水店就在附近）</div>
            </div>
          </div>

          <div className="jtxt mt12">
            <p>沙滩旁有家潜水店，四个人一合计——明天去潜水。就这样，一个下午多出了个新安排。回酒店泳池接着泡水。练了会儿自由泳，在躺椅上彻底躺平。海风、棕榈、远处浪声——所有元素都到位。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("pool-swimmer.jpeg")} alt="泳池里自由泳练习中的 JJ" className="pt" loading="lazy" decoding="async" />
              <div className="cap">泳池里的 JJ · 自由泳练习中</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("pool-palms.jpeg")} alt="泳池边的棕榈和蓝伞躺椅" className="pt" loading="lazy" decoding="async" />
              <div className="cap">泳池棕榈 · 蓝伞躺椅区</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("resort-pool-view.jpeg")} alt="房间窗外蜿蜒的泳池与棕榈树" loading="lazy" decoding="async" /><div className="pol-t">蜿蜒的泳池 + 棕榈 🌴</div></div>
            <div className="pol tr-tilt"><img src={img("pool-building.jpeg")} alt="泳池与酒店建筑" loading="lazy" decoding="async" /><div className="pol-t">泳池 + 酒店建筑</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🤿 沙滩旁的潜水店</div>
            <p>潜店叫 Patong Dive Center（PADI 认证），就在私人沙滩旁边。店里还有两只常住猫，一只霸占招牌位、一只趴地板，看似都不太欢迎拍照 🐱。我们当场预订了明天 DSD 体验潜水：Racha 岛全日行程 4,400 THB / 人，2 人共 8,800 THB ≈ ¥1,800（押金 880 THB / 人 已付，无需另付公园费）。明早 6:45 酒店大堂集合。</p>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol"><img src={img("dive-shop-cat.jpeg")} alt="潜店招牌上的猫" loading="lazy" decoding="async" /><div className="pol-t">潜店招牌猫 · 占了 C 位</div></div>
            <div className="pol"><img src={img("dive-shop-cat2.jpeg")} alt="潜店地板上的虎斑猫" loading="lazy" decoding="async" /><div className="pol-t">地板上的虎斑猫 · 表情有点凶</div></div>
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
              <div className="day-title">日落、滑翔伞与海风</div>
              <div className="day-sub">Friday, August 21st · 芭东散步 · Malin Plaza · 毛巾小象</div>
            </div>
            <div className="day-weather">🌅</div>
          </div>

          <div className="jtxt">
            <p>吃完晚饭，趁着天色还早，在芭东海滩散了好久的步。海被傍晚的云烧成了一整片橙红色，浪声很轻，偶尔有人冲浪、游泳。最好看的是天上的滑翔伞——被快艇拉着在天空飞，彩色的伞在云层间起伏、转向、盘旋，像是有人在用天空当画布。看着看着就忘了时间。还有你和身后那把伞，恰好同时入了镜。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("sunset-paragliding.jpeg")} alt="芭东日落下的滑翔伞" className="pt" loading="lazy" decoding="async" />
              <div className="cap">滑翔伞 + 日落 · 彩条伞在天空特别有画面感</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("patong-sunset.jpeg")} alt="芭东日落晚霞" className="pt" loading="lazy" decoding="async" />
              <div className="cap">芭东日落 · 晚霞染红了云</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("selfie-paragliding.jpeg")} alt="JJ 和小土在芭东自拍，背后是滑翔伞" loading="lazy" decoding="async" /><div className="pol-t">JJ & 小土 · 背后刚好有滑翔伞</div></div>
            <div className="pol tr-tilt"><img src={img("selfie-peace.jpeg")} alt="海边的比耶自拍" loading="lazy" decoding="async" /><div className="pol-t">比个耶 ✌️ · 海岛标准姿势</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🦐</span></div>

          <div className="jtxt">
            <p>马琳夜市（Malin Plaza）比芭东夜市更小众、人也少，节奏慢，摊主也不像游客区那样紧盯着钱包。一条大烤鱼 200 泰铢、一只大虾 250 泰铢、一份螃蟹 350 泰铢，鲍鱼 200 — 300 泰铢，每一道都让嘴角停不下来。吃到最后满桌海鲜合影一张，是这趟旅行最丰盛的一顿。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("malin-shrimp.jpeg")} alt="马琳夜市大虾档" className="sq" loading="lazy" decoding="async" />
              <div className="cap">大虾档 · 100/150/200/250 THB</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("malin-abalone.jpeg")} alt="马琳夜市鲍鱼档" className="sq" loading="lazy" decoding="async" />
              <div className="cap">鲍鱼档 · 200 — 300 THB</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("malin-clams.jpeg")} alt="马琳夜市炒花甲" className="sq" loading="lazy" decoding="async" />
              <div className="cap">炒花甲 · 香辣味足</div>
            </div>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("malin-fish.jpeg")} alt="马琳夜市大烤鱼" className="sq" loading="lazy" decoding="async" />
              <div className="cap">大烤鱼 · 200 THB 一整条</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("malin-shrimp-grilled.jpeg")} alt="马琳夜市大虾成品" className="sq" loading="lazy" decoding="async" />
              <div className="cap">大虾（成品）· 250 THB</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("malin-crab.jpeg")} alt="马琳夜市大螃蟹" className="sq" loading="lazy" decoding="async" />
              <div className="cap">大螃蟹 · 350 THB 一份</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("malin-yum.jpeg")} alt="马琳夜市海鲜沙拉" className="pt" loading="lazy" decoding="async" />
              <div className="cap">海鲜沙拉 · 酸辣 + 鲜虾 + 粉丝</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("malin-spread.jpeg")} alt="满桌海鲜合影" className="pt" loading="lazy" decoding="async" />
              <div className="cap">满桌合影 · 海鲜全宴</div>
            </div>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("malin-stall.jpeg")} alt="Malin Plaza 海鲜摊整体" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Malin Plaza 海鲜摊 · 比芭东夜市更 local</div>
            </div>
          </div>

          <div className="jtxt mt16">
            <p>回到酒店，意外发现客房被工作人员叠了一只毛巾小象，憨态可掬地坐在床上、盯着小卡片微笑——所有走路的疲惫都瞬间化了。带着海风、辣味、毛巾小象的余温入眠。</p>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("towel-elephant.jpeg")} alt="酒店客房的毛巾小象" className="hero" loading="lazy" decoding="async" />
              <div className="cap">毛巾小象 🐘 · 工作人员叠的，超治愈</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌃 Malin Plaza 小贴士</div>
            <p>Malin Plaza 在芭东主路背面，从海滩走过来大概十分钟。比芭东夜市人少、价格更友好，适合想避开人潮又想吃海鲜的夜晚。我们 21:00 离开，回酒店路上顺路在 7-Eleven 补了明天潜水的零食饮料，22:30 洗漱泡澡，23:00 入睡。</p>
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
              <div className="day-title">Racha 岛 · 失控到入门</div>
              <div className="day-sub">Saturday, August 22nd · 三潜 DSD · Naughty Nuri's · Let's Relax</div>
            </div>
            <div className="day-weather">🤿</div>
          </div>

          <div className="jtxt">
            <p>6:55 从酒店出发（迟了 10 分钟，司机大哥有点黑脸），一路接上同船潜友，8:00+ 才到码头。快艇颠到皇帝岛 Racha Noi + Racha Yai，三个潜点。船上午餐 JJ 和小土都因为晕船没吃，14:00 的第三潜终于开窍——背挺直、胯前挺、吐气下沉、吸气上浮，第一次感觉自己不是被水推着走，是在水里游的。珊瑚像花园一样铺开，整个海底震撼到说不出话。</p>
          </div>

          <div className="tlwrap mt12">
            <div className="tl-item"><span className="tm">06:55</span><div className="ev">酒店大堂集合</div><div className="dt">迟了 10 分钟，司机的脸有点黑</div></div>
            <div className="tl-item"><span className="tm">08:00+</span><div className="ev">到查龙码头</div><div className="dt">接了一堆同船潜友，大家都在迟到</div></div>
            <div className="tl-item"><span className="tm">10:00+</span><div className="ev">第一潜（浅探）</div><div className="dt">浮力难控、不会调呼吸；JJ 和小土都吐了，小土脚蹭到海底</div></div>
            <div className="tl-item"><span className="tm">11:30</span><div className="ev">第二潜</div><div className="dt">呛水、误关 BCD 充气、被教练用红带拽着走；后半段开始看到鱼群</div></div>
            <div className="tl-item"><span className="tm">14:00</span><div className="ev">第三潜（最后一潜）</div><div className="dt">终于开窍：背挺直、胯前挺、吐气下沉、吸气上浮</div></div>
            <div className="tl-item"><span className="tm">15:00</span><div className="ev">潜水结束</div><div className="dt">收东西、慢慢回程</div></div>
            <div className="tl-item"><span className="tm">17:00</span><div className="ev">回到普吉岛</div><div className="dt">换小车回市区</div></div>
            <div className="tl-item"><span className="tm">18:00+</span><div className="ev">Naughty Nuri's 晚餐</div><div className="dt">招牌烤肋排 · 4 人共 ¥550</div></div>
            <div className="tl-item"><span className="tm">19:30</span><div className="ev">回酒店 · 收获第二只小象</div><div className="dt">卡片署名 Viong 🐘</div></div>
            <div className="tl-item"><span className="tm">21:30</span><div className="ev">Let's Relax 2 小时泰式按摩</div><div className="dt">2,400 THB ≈ ¥504</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🐠</span></div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("dive-dive1.jpeg")} alt="第一潜 · 教练 + JJ + 小土 · 水下比耶" className="pt" loading="lazy" decoding="async" />
              <div className="cap">第一潜 · 教练 + JJ + 小土 · 水下比耶 🤙</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("dive-jj-underwater.jpeg")} alt="第二潜 · JJ 水下面镜 + 气泡" className="pt" loading="lazy" decoding="async" />
              <div className="cap">第二潜 · JJ 水下面镜 + 气泡 · 教练的红带出场了</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("dive-rope2.jpeg")} alt="下潜绳旁 · 教练带路" loading="lazy" decoding="async" /><div className="pol-t">下潜绳旁 · 教练带路</div></div>
            <div className="pol tr-tilt"><img src={img("dive-rope3.jpeg")} alt="下潜绳合影 · 浮力慢慢稳了" loading="lazy" decoding="async" /><div className="pol-t">下潜绳合影 · 浮力慢慢稳了</div></div>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("dive-farewell.jpeg")} alt="水下来一张 · 难忘的第三次潜水" className="hero" loading="lazy" decoding="async" />
              <div className="cap">水下告别 · 难忘的第三次潜水</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌊 三潜最大的收获</div>
            <p>从"完全不会控制"到"终于入门"只用了一潜的距离。第三潜的珊瑚和鱼群，让人不想上来。身体终于记得住怎么呼吸 🐠🌊</p>
          </div>

          <div className="dv mt20 mb12"><span>🍖</span></div>

          <div className="jtxt">
            <p>从码头回普吉市区，Naughty Nuri's 的粉色招牌猪特别显眼。烤肋排焦糖色、香肠拼盘四种、沙爹串配花生酱——摆满一桌挺有仪式感。不过肋排本身有点腻、加肋排要加价，对网红 BBQ 来说性价比一般。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("naughty-ribs.jpeg")} alt="Naughty Nuri's 招牌烤肋排" className="sq" loading="lazy" decoding="async" />
              <div className="cap">招牌烤肋排 · 焦糖色 + 沙拉 + 小红旗</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("naughty-sausage.jpeg")} alt="香肠拼盘" className="sq" loading="lazy" decoding="async" />
              <div className="cap">香肠拼盘 · 4 种 + 沙拉 + 玉米 + 酱料</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("naughty-satay.jpeg")} alt="沙爹烤肉串" className="sq" loading="lazy" decoding="async" />
              <div className="cap">沙爹烤肉串 + 花生酱</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("naughty-pig.jpeg")} alt="店门口粉红招财猪" className="pt" loading="lazy" decoding="async" />
              <div className="cap">店门口 · 粉红招财猪 🐷 · 网红打卡</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("naughty-table.jpeg")} alt="Naughty Nuri's 满桌合影" className="pt" loading="lazy" decoding="async" />
              <div className="cap">满桌合影 · 肋排 + 香肠 + 沙爹 + 米粉 + 玉米 + 薯条 + 饮料</div>
            </div>
          </div>

          <div className="rbox warn mt16">
            <h4>🍖 Naughty Nuri's 评价</h4>
            <div className="ri"><span className="nm">Naughty Nuri's Phuket</span><span className="st">⭐⭐⭐</span><span className="cm">网红 BBQ 店 · 4 人共 ¥550。装修有特色、打卡点足；肋排有点腻、加肋排有点贵，最多 3 星</span></div>
          </div>

          <div className="dv mt20 mb12"><span>🐘</span></div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("towel-elephant2.jpeg")} alt="第二只毛巾小象 · 卡片署名 Viong" className="hero" loading="lazy" decoding="async" />
              <div className="cap">第二只小象 🐘 · 卡片署名 Viong</div>
            </div>
          </div>

          <div className="jtxt mt12">
            <p>回酒店又收获一只迷你毛巾小象——这是第二只了。卡片署名 Viong，应该是做晚班打扫的工作人员。两小时泰式按摩紧跟着，把这一天从海底到陆地的酸痛全推开了。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("massage-lobby.jpeg")} alt="Let's Relax 大堂" className="sq" loading="lazy" decoding="async" />
              <div className="cap">大堂 · 乳木果产品柜 + 白玫瑰</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("massage-lounge.jpeg")} alt="按摩店休息区" className="sq" loading="lazy" decoding="async" />
              <div className="cap">休息区 · 深绿墙 + 大树 + 棕沙发</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("massage-shampoo.jpeg")} alt="按摩店洗头区" className="sq" loading="lazy" decoding="async" />
              <div className="cap">洗头区 · 黑盆 + 灰色沙发 + 彩色抱枕</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">💆 马杀鸡小记</div>
            <p>Let's Relax · 2 小时泰式按摩（JJ &amp; 小土 · 21:30 — 23:30）共 2,400 THB ≈ ¥504。推完之后背上酸痛全散了，回酒店已经过了午夜，倒头就睡 💤</p>
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
              <div className="day-title">Sassy 出发，Sassy 收尾</div>
              <div className="day-sub">Sunday, August 23rd · 江西冷 BigC · 海边躺平 · 回国</div>
            </div>
            <div className="day-weather">🏖️</div>
          </div>

          <div className="jtxt">
            <p>最后一天从一杯 97 号老位置的咖啡开始。吐司、煎蛋、阳光、熟悉的早晨——吃得出离别的味道。回房间整行李、12:00 准时退房，下午直奔江西冷扫 BigC 和 Phutawan，下午回酒店海边躺平，天气好到离谱，预报说下雨实际一点没下。傍晚再去一次 Sassy（离店前回访），然后 Let's Relax 3rd St 店 90 分钟马杀鸡收尾，机场免税店挑了 Panouri 礼盒。</p>
          </div>

          <div className="tlwrap mt12">
            <div className="tl-item"><span className="tm">10:00+</span><div className="ev">自然醒 · 酒店自助早餐</div><div className="dt">老位置 97 号 · 最后一顿</div></div>
            <div className="tl-item"><span className="tm">12:00</span><div className="ev">准时退房 ✅</div><div className="dt">行李寄存前台</div></div>
            <div className="tl-item"><span className="tm">13:00</span><div className="ev">江西冷购物中心</div><div className="dt">买伴手礼 · BigC + Phutawan</div></div>
            <div className="tl-item"><span className="tm">15:00</span><div className="ev">回酒店海边躺平 🏖️</div><div className="dt">海风、沙滩、蓝色躺椅</div></div>
            <div className="tl-item"><span className="tm">17:30</span><div className="ev">Sassy 第二次打卡</div><div className="dt">鱼 + 海鲜沙拉 · 4 人共 250 THB ≈ ¥52</div></div>
            <div className="tl-item"><span className="tm">19:00</span><div className="ev">Let's Relax 3rd St 店</div><div className="dt">90 分钟泰式按摩 · 2,000 THB ≈ ¥420</div></div>
            <div className="tl-item"><span className="tm">20:45</span><div className="ev">出发去机场</div><div className="dt">还车 + 值机 + 安检</div></div>
            <div className="tl-item"><span className="tm">22:00+</span><div className="ev">免税店 · Panouri 礼盒</div><div className="dt">1,300+ RMB（两人份）</div></div>
            <div className="tl-item"><span className="tm">00:00+</span><div className="ev">休息室宵夜 → 登机</div><div className="dt">旅行结束 · 现在 8/24 · 坐在飞机上</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🍳</span></div>

          <div className="pgrid g1 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day4-breakfast.jpeg")} alt="Day 4 早餐 · 97 号老位置" className="hero" loading="lazy" decoding="async" />
              <div className="cap">Day 4 早餐 · 97 号老位置 · 吐司 + 蛋 + 沙拉 + 咖啡</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🛍️</span></div>

          <div className="jtxt">
            <p>江西冷（Jungceylon）的标志性海盗船是个熟悉的坐标。BigC 买了冬阴功汤、鼻吸器、膏药贴、牛奶片、椰奶芒果干（1,100+ THB），Phutawan 拿了两个香薰礼盒 Rainforest in Bloom Reed Diffuser Set 送小土同事（1,080 THB）。中午 JJ 和小土没吃午饭，Ellie &amp; Rock 在美食广场随便吃了点。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw tl-tilt" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("jungceylon-ship.jpeg")} alt="江西冷标志性海盗船" className="pt" loading="lazy" decoding="async" />
              <div className="cap">江西冷 · 标志性海盗船 🚢</div>
            </div>
            <div className="pf fn tr-tilt" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("bigc-shopping.jpeg")} alt="BigC 战利品" className="pt" loading="lazy" decoding="async" />
              <div className="cap">BigC 战利品 · 冬阴功 + 鼻吸器 + 膏药 + 牛奶片 + 椰奶芒果干</div>
            </div>
          </div>

          <div className="pgrid g2 mt12" style={{ maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol tl-tilt"><img src={img("phutawan-box.jpeg")} alt="Phutawan 香薰礼盒" loading="lazy" decoding="async" /><div className="pol-t">Phutawan 香薰 · Rainforest in Bloom</div></div>
            <div className="pol tr-tilt"><img src={img("phutawan-receipt.jpeg")} alt="Phutawan 收据 1,080 THB" loading="lazy" decoding="async" /><div className="pol-t">收据 · 2 × 540 = 1,080 THB</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🌴</span></div>

          <div className="jtxt">
            <p>回酒店放下战利品，直奔海边。红旗插着（不游泳），但海风、棕榈、阳光、蓝色躺椅全到位。预报说会下雨，结果一点没下。睡了一会儿，天气开始变热才回去冲澡。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("beach-palms-ocean.jpeg")} alt="棕榈树 + 碧绿海 + 岩石海湾" className="pt" loading="lazy" decoding="async" />
              <div className="cap">棕榈树 + 碧绿海 + 岩石海湾</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("beach-rocks-ocean.jpeg")} alt="礁石海岸 + 碧绿海水" className="pt" loading="lazy" decoding="async" />
              <div className="cap">礁石海岸 + 碧绿海水</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <img src={img("beach-palms-lawn.jpeg")} alt="棕榈 + 草坪 + 远处小游乐场" className="pt" loading="lazy" decoding="async" />
              <div className="cap">棕榈 + 草坪 + 远处小游乐场 + 绿木屋</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tb t-tr" />
              <img src={img("beach-chair-view.jpeg")} alt="蓝色躺椅视角" className="pt" loading="lazy" decoding="async" />
              <div className="cap">蓝色躺椅视角 · 海风、棕榈、阳光</div>
            </div>
          </div>

          <div className="pgrid g1 mt12" style={{ maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            <div className="pol"><img src={img("beach-warning.jpeg")} alt="酒店海滩 · 红旗不游泳" loading="lazy" decoding="async" /><div className="pol-t">酒店海滩 · 🚩 红旗（不游泳）</div></div>
          </div>

          <div className="dv mt20 mb12"><span>🍜</span></div>

          <div className="jtxt">
            <p>17:30+ 又去了一次 Sassy——这家店我们到普吉第一晚就来过。点了 Pad Thai + 冬阴功 + 海鲜沙拉拼盘 + 柠檬蒸鱼，4 人共 250 泰铢 ≈ ¥52。性价比绝了，离开到达都在同一家店。Let's Relax 3rd St 店 90 分钟泰式按摩紧跟着收尾，背上酸痛被推开了。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("day4-sassy-padthai.jpeg")} alt="Sassy Pad Thai" className="sq" loading="lazy" decoding="async" />
              <div className="cap">Pad Thai · 大虾 + 豆芽</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("day4-sassy-tomyum.jpeg")} alt="Sassy 冬阴功汤" className="sq" loading="lazy" decoding="async" />
              <div className="cap">冬阴功汤</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day4-sassy-fish.jpeg")} alt="Sassy 柠檬蒸鱼" className="sq" loading="lazy" decoding="async" />
              <div className="cap">柠檬蒸鱼 · 清爽入味</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("day4-sassy-platter.jpeg")} alt="Sassy 海鲜沙拉拼盘" className="pt" loading="lazy" decoding="async" />
              <div className="cap">海鲜沙拉拼盘 · 青口贝 + 海螺 + 鱿鱼 + 蟹腿</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("relax-3rd-st.jpeg")} alt="Let's Relax 3rd St 店" className="pt" loading="lazy" decoding="async" />
              <div className="cap">Let's Relax 3rd St · 25 周年展架 + 海景窗</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🌅 Day 4 收官</div>
            <p>从 Sassy 出发、Sassy 收尾；再来一发 90 分钟马杀鸡；Panouri 礼盒；机场休息室宵夜 → 飞机 → 旅行结束。8/24 凌晨坐在回上海的飞机上，窗外是墨色，机舱里大家都没说话——这趟该拍的拍了、该吃的吃了、该潜的潜了、该躺的躺了。</p>
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
              <div className="day-title">美食与账单</div>
              <div className="day-sub">已尝餐厅真实测评 & JJ & 小土支出汇总</div>
            </div>
          </div>

          <div className="rbox mt12">
            <h4>🌟 推荐榜</h4>
            <div className="ri"><span className="nm">Sassy traditional Isaan Thai restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">巴东 · 伊桑风味，非常推荐。口味 4.2 / 环境 3.9 / 服务 3.9，营业至次日凌晨 5:30；离店前再访 4 人 ¥52</span></div>
            <div className="ri"><span className="nm">SIAM Phuket - Seafood Restaurant</span><span className="st">⭐⭐⭐⭐</span><span className="cm">巴东 Thawewong Rd · 评分 4.8 · 冬阴功入味微辣、柠檬蒸鱼国内少见，去的早人少，吃完已爆满</span></div>
            <div className="ri"><span className="nm">Malin Plaza 海鲜摊</span><span className="st">⭐⭐⭐⭐</span><span className="cm">比芭东夜市小众、便宜，烤鱼 200 / 大虾 250 / 螃蟹 350 THB</span></div>
            <div className="ri"><span className="nm">Goose Island 鹅岛精酿啤酒屋</span><span className="st">⭐⭐⭐⭐</span><span className="cm">浦东 T1 · 三明治不错，薯条很棒 🍟</span></div>
            <div className="ri"><span className="nm">美林海滩万豪自助早餐</span><span className="st">⭐⭐⭐⭐</span><span className="cm">超级丰盛，户外直面泳池 + 海滩，太惬意</span></div>
            <div className="ri"><span className="nm">Let's Relax 泰式按摩</span><span className="st">⭐⭐⭐⭐</span><span className="cm">JJ &amp; 小土 2 小时 + 90 分钟，收官必备，技师手劲到位</span></div>
          </div>

          <div className="rbox warn mt16">
            <h4>⚠️ 踩雷榜</h4>
            <div className="ri"><span className="nm">FM831 航空餐鸡肉面</span><span className="st">⭐</span><span className="cm">特别难吃，全靠修仙短剧撑过去 😖</span></div>
            <div className="ri"><span className="nm">Naughty Nuri's Phuket</span><span className="st">⭐⭐⭐</span><span className="cm">网红 BBQ · 4 人共 ¥550。装修有特色、招财猪打卡足；肋排有点腻、加肋排有点贵，最多 3 星</span></div>
          </div>

          <div className="dv mt20 mb12"><span>🍤</span></div>

          <div className="jtxt">
            <p>SIAM Phuket 是一家在巴东 Thawewong Rd 上的海鲜餐厅，评分 4.8。冬阴功入味微辣、柠檬蒸鱼用柠檬直接蒸、国内少见的吃法，青芒沙拉爽口、木瓜沙拉花生豆芽辣椒齐上。一桌菜下来，比国内划算很多。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("siam-tomyum.jpeg")} alt="SIAM 冬阴功汤" className="sq" loading="lazy" decoding="async" />
              <div className="cap">冬阴功汤 · 入味微辣</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("siam-fish.jpeg")} alt="SIAM 柠檬蒸鱼" className="sq" loading="lazy" decoding="async" />
              <div className="cap">柠檬蒸鱼 · 国内少见的吃法</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("siam-somtam.jpeg")} alt="SIAM 木瓜沙拉" className="sq" loading="lazy" decoding="async" />
              <div className="cap">木瓜沙拉 · 花生 + 豆芽 + 辣椒</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>💰</span></div>

          <div className="bill">
            <h4>💳 支出汇总（人民币 · JJ &amp; 小土 2 人）</h4>
            <div className="br"><span>上海-普吉往返机票</span><span>¥ 5,512.00</span></div>
            <div className="br"><span>美林海滩万豪 3 晚</span><span>¥ 4,876.22</span></div>
            <div className="br"><span>兑换泰铢 5,000 THB</span><span>≈ ¥ 1,100.00</span></div>
            <div className="br"><span>鹅岛精酿三明治套餐</span><span>¥ 68.00</span></div>
            <div className="br"><span>DSD 体验潜水押金（2 人 1,760 THB）</span><span>≈ ¥ 368.00（已付）</span></div>
            <div className="br"><span>DSD 余额 7,040 THB</span><span>≈ ¥ 1,473（8/22 现场结）</span></div>
            <div className="br"><span>潜水照片包</span><span>2,000 THB ≈ ¥ 420</span></div>
            <div className="br"><span>教练/船工小费</span><span>20 THB ≈ ¥ 4</span></div>
            <div className="br"><span>Naughty Nuri's 晚餐（4 人）</span><span>¥ 550.00</span></div>
            <div className="br"><span>Let's Relax 2 小时泰式按摩</span><span>2,400 THB ≈ ¥ 504</span></div>
            <div className="br"><span>Let's Relax 3rd St · 90min 泰式按摩</span><span>2,000 THB ≈ ¥ 420</span></div>
            <div className="br"><span>BigC 伴手礼（1,100+ THB）</span><span>≈ ¥ 230</span></div>
            <div className="br"><span>Phutawan 香薰礼盒 × 2（1,080 THB）</span><span>≈ ¥ 227</span></div>
            <div className="br"><span>Sassy 第二次晚餐（4 人共 250 THB）</span><span>≈ ¥ 52</span></div>
            <div className="br"><span>机场免税店 Panouri 礼盒（2 人份）</span><span>¥ 1,300+</span></div>
            <div className="br"><span>市区 → 浦东机场打车</span><span>待确认</span></div>
            <div className="br"><span>普吉租车</span><span>待确认</span></div>
            <div className="br"><span>本地宵夜 4 人分摊</span><span>待确认</span></div>
            <div className="br"><span>马琳夜市（4 人各自买）</span><span>待补</span></div>
            <div className="br"><span>7-Eleven 潜水零食饮料</span><span>待补</span></div>
            <div className="br total"><span>累计支出</span><span>¥ 17,063.42+</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">📌 记账口径</div>
            <p>以上消费仅含 JJ &amp; 小土 2 人（机票、酒店均按 2 人计），另持 5,000 泰铢现金用于当地零花。Ellie、Rock 的费用各自承担，不计入本表。后续消费按实际汇率折算后补。</p>
          </div>

          <div className="nbox warn mt16">
            <div className="nbox-lbl">❓ 待确认（最后统一补完）</div>
            <p>市区打车去浦东机场金额 / 普吉租车详情（车型 · 租金 · 租期）/ 宵夜具体金额（"120+" 是泰铢还是人民币）和 4 人分摊方式 / 马琳夜市 4 人总额 / 7-Eleven 小计。</p>
          </div>

          <div className="spacer" />

          <div className="tcenter" style={{ position: "relative", zIndex: 1 }}>
            <div className="dv mb16"><span>🌴</span></div>
            <p className="hwcn" style={{ maxWidth: 480, margin: "0 auto" }}>
              该拍的拍了、该吃的吃了、<br />该潜的潜了、该躺的躺了。
            </p>
            <div style={{ marginTop: 24 }}>
              <span className="stamp-box" style={{ transform: "rotate(0)" }}>旅行结束 · 回家休息</span>
            </div>
          </div>

          <div className="page-num">- 07 -</div>
        </div>
      </section>
    </div>
  );
}
