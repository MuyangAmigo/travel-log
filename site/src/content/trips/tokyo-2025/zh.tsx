import { img } from "./meta";
import CardScaleController from "@/components/CardScaleController";

export default function TokyoZH() {
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
              海岸、迪士尼与买买买
            </h1>
            <div className="cover-subtitle">
              Travel Journal
            </div>
            <div className="cover-line" />
            <div className="cover-date">
              2025.10.05 — 10.10
            </div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 440, textAlign: "center", marginTop: 10 }}>
              「走过的路会记得，<br />买过的东西会记得，<br />在东京的每一天都值得记一笔」
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
              <div className="day-title">出发 &amp; 落地</div>
              <div className="day-sub">Sunday, October 5th · Shanghai ✈️ Tokyo</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>早上一个麦当劳匆匆出发，开车直奔浦东。机场免税店扫了根雪茄，还顺便尝了一把 O'Mills 的面包——强烈推荐给所有机场面包党。落地东京已经入夜，第一顿直奔高田馬場的麺屋武蔵，三张机厚小票叠在一起，旅途就这样开始了。</p>
          </div>

          <div className="pgrid g1 mt16">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tl" />
              <div className="tape tg t-tr" />
              <img src={img("day0-menya-musashi-ramen-receipts.jpeg")} alt="Menya Musashi ramen tickets" className="hero" />
              <div className="cap">落地第一顿：麺屋武蔵 高田馬場</div>
            </div>
          </div>

          <div className="dv mt20 mb16"><span>✈️</span></div>

          <div className="tlwrap">
            <div className="tl-item"><span className="tm">上午</span><div className="ev">麦当劳早餐，开车出发浦东</div><div className="dt">国庆的第一天，闹钟比假期还早</div></div>
            <div className="tl-item"><span className="tm">午间</span><div className="ev">浦东机场 T2 候机</div><div className="dt">免税店扫了一根 Davidoff 雪茄；O'Mills 面包强烈推荐</div></div>
            <div className="tl-item"><span className="tm">傍晚</span><div className="ev">落地东京</div><div className="dt">入境排队，出关打车去酒店</div></div>
            <div className="tl-item"><span className="tm">夜间</span><div className="ev">麺屋武蔵 高田馬場</div><div className="dt">三张机厚小票，吃完满血复活 🍜</div></div>
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
              <div className="day-title">镰仓海岸 · 上</div>
              <div className="day-sub">Monday, October 6th · 江之岛 · 七里滨</div>
            </div>
            <div className="day-weather">⛅</div>
          </div>

          <div className="jtxt">
            <p>便利店抓两个饭团当早餐，从东京坐到大船换倒挂电车。江之岛上吃冰淇淋和布丁，商店街随便走走；七里滨找了家能看海的海边餐厅吃饭——本来应该能看富士山，可惜那天云层太厚，残念。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("green-train-at-station.jpeg")} alt="Enoden green train" className="ls" />
              <div className="cap">江之电 —— 镰仓的标志</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("coastal-stream-between-trees.jpeg")} alt="Coastal stream" className="ls" />
              <div className="cap">海岸线边的林间小溪</div>
            </div>
          </div>

          <div className="dv mt16 mb12"><span>🍦</span></div>

          <div className="jtxt">
            <p>江之岛上的冰淇淋和布丁是正经的甜品店水准，海风吹着吃特别舒服。商店街里能逛半小时，节奏刚刚好。</p>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🚃 镰仓交通 Tips</div>
            <p>从东京市区坐 JR 到大船，换江之岛电铁（倒挂电车）一票玩一天。沿线每一站都能下：长谷、极乐寺、镰仓、江之岛都值得停。江之电发车间隔大约 12 分钟，不用死守时刻表。</p>
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
              <div className="day-title">镰仓海岸 · 下</div>
              <div className="day-sub">极乐寺 · 长谷寺 · 小町通 · 鹤冈八幡宫</div>
            </div>
            <div className="day-weather">🌇</div>
          </div>

          <div className="jtxt">
            <p>极乐寺的门洞特别小，进去买了本御朱印本子；长谷寺顾着写御朱印，结果一抬头发现忘记去看镰仓大佛了……小町通买了一包鸽子饼干，造型很特别，推荐试试。晚上回到鹤冈八幡宫看夜景，灯打下来又是另一番味道，最后用舞泉炸猪排收尾。</p>
          </div>

          <div className="pgrid g1">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("illuminated-japanese-temple-at-night.jpeg")} alt="Tsurugaoka Hachimangu at night" className="hero" />
              <div className="cap">鹤冈八幡宫的夜色 —— 走完镰仓的句号</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("urban-street-red-traffic-light.jpeg")} alt="Komachi street red light" className="sq" />
              <div className="cap">小町通的红绿灯街角</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("japanese-tonkatsu-set-meal.jpeg")} alt="Maisen tonkatsu set" className="sq" />
              <div className="cap">舞泉炸猪排 —— 镰仓的完美收尾 🍛</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tb t-tc" />
              <img src={img("gucci-bag-cafe-table.jpeg")} alt="Cafe table" className="sq" />
              <div className="cap">路边咖啡馆</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("two-people-on-beach.jpeg")} alt="Shonan beach" className="sq" />
              <div className="cap">七里滨的海岸</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">⚠️ 长谷寺的教训</div>
            <p>写御朱印很上头，但千万别在长谷寺正殿停留太久——镰仓大佛就在隔壁几步路。我们光顾着盖章，回头已经累到走不动，佛像就这么错过了。下次先看佛再盖章。</p>
          </div>

          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🏨</div><div className="lb">酒店</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🚃</div><div className="lb">江之电</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏝️</div><div className="lb">江之岛</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌊</div><div className="lb">七里滨</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">⛩️</div><div className="lb">极乐寺</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛕</div><div className="lb">长谷寺</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛍️</div><div className="lb">小町通</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌙</div><div className="lb">八幡宫</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🍛</div><div className="lb">舞泉</div></div>
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
              <div className="day-title">新宿大扫货 &amp; 烤肉</div>
              <div className="day-sub">Tuesday, October 7th · 新宿 · 六歌仙</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="jtxt">
            <p>睡到自然醒，下午直奔新宿。午饭用一顿六歌仙的和牛烤肉回血，人均 406 RMB；接着一整个下午用来扫货：石井运动收了一件始祖鸟短袖，Montbell 拿下了雷霆冲锋衣加一堆滑雪配件，United Arrows 拎走北面紫标卫衣和牛仔裤，City Tokyo 给宝子配了一身，Salomon XT Whisper 和昂跑 x4 全部到手，最后优衣库把打底衫、内裤、袜子打包。一天下来脚都走麻了，晚上马杀鸡放松，末了博多风龙拉面收尾。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("two-people-wearing-patterned-aprons.jpeg")} alt="Grill aprons" className="ls" />
              <div className="cap">六歌仙的围裙 —— 准备开烤</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("wagyu-beef-slices-platter.jpeg")} alt="Wagyu platter" className="ls" />
              <div className="cap">和牛拼盘 🥩</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("shrimp-and-scallops-on-grill.jpeg")} alt="Shrimp scallops grill" className="sq" />
              <div className="cap">大虾和带子</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("japanese-wall-art-interior.jpeg")} alt="Restaurant wall art" className="sq" />
              <div className="cap">店内浮世绘</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🛍️</span></div>

          <div className="jtxt">
            <p>新宿一站把户外装备、配饰、基础款全部扫齐，回酒店直接堆成小山。</p>
          </div>

          <div className="sgrid mt16">
            <div className="sc">
              <img src={img("mont-bell-black-jacket.jpeg")} alt="Montbell jacket" />
              <div className="sc-info">
                <h5>Montbell 雷霆冲锋衣</h5>
                <div className="pr">¥ 640 · 14,800 JPY</div>
                <div className="ds">Thunder Pass · 国庆的当家战利品</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("on-running-shoes-box.jpeg")} alt="On shoes" />
              <div className="sc-info">
                <h5>On 昂跑 x4</h5>
                <div className="pr">¥ 892 · 19,380 JPY</div>
                <div className="ds">给自己一双，给家人三双</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("folded-north-face-tshirt.jpeg")} alt="North Face tee" />
              <div className="sc-info">
                <h5>北面紫标长袖</h5>
                <div className="pr">¥ 470 · 10,200 JPY</div>
                <div className="ds">United Arrows 限定</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("white-sneakers-on-shoebox.jpeg")} alt="Salomon XT Whisper" />
              <div className="sc-info">
                <h5>Salomon XT Whisper</h5>
                <div className="pr">¥ 939 · 20,400 JPY</div>
                <div className="ds">越野鞋里的时装单品</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("gray-tapered-leg-jeans.jpeg")} alt="UA jeans" />
              <div className="sc-info">
                <h5>United Arrows 牛仔裤</h5>
                <div className="pr">¥ 850 · 18,462 JPY</div>
                <div className="ds">修身版型很合身</div>
              </div>
            </div>
            <div className="sc">
              <img src={img("folded-black-graphic-tshirts.jpeg")} alt="Black tees" />
              <div className="sc-info">
                <h5>始祖鸟短袖 x2</h5>
                <div className="pr">¥ 1,012</div>
                <div className="ds">石井运动拿下</div>
              </div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🛒 新宿扫货 Tips</div>
            <p>Montbell 和 United Arrows 在新宿都有旗舰店，Outlet 款比百货便宜。优衣库新宿店货最全，结账时记得扫免税。Montbell 退税排队大概 15 分钟，工作日午后人最少。</p>
          </div>

          <div className="route mb8" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🏨</div><div className="lb">酒店</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🥩</div><div className="lb">六歌仙</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🧗</div><div className="lb">石井运动</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🧥</div><div className="lb">Montbell</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👔</div><div className="lb">UA</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👖</div><div className="lb">City</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👟</div><div className="lb">Salomon</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">👕</div><div className="lb">优衣库</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">💆</div><div className="lb">马杀鸡</div></div>
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
              <div className="day-title">City Walk &amp; 表参道</div>
              <div className="day-sub">Wednesday, October 8th · 代代木 · 明治神宫 · 表参道</div>
            </div>
            <div className="day-weather">🍂</div>
          </div>

          <div className="jtxt">
            <p>燕子咖啡的美式有点酸、口感一般，但 Verve 的 Signature 拿铁真的好喝，强烈推荐。代代木公园很安静，从苍天大树之间穿过去就走到了明治神宫本殿。下午转战表参道，鸟店收了两件短袖，晚上在 Renee 和宝子吃了七轮烤肉牛繁，堂吉诃德补了一批药妆。</p>
          </div>

          <div className="pgrid g2">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("day3-yoyogi-street.jpeg")} alt="Yoyogi street" className="ls" />
              <div className="cap">代代木公园方向的车道</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day3-meiji-jingu-poem-board.jpeg")} alt="Meiji poem board" className="ls" />
              <div className="cap">明治神宫 明治天皇御製</div>
            </div>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("day3-tokyo-street-trees.jpeg")} alt="Tokyo tree-lined street" className="hero" />
              <div className="cap">高架桥下的林荫道</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🧥</span></div>

          <div className="jtxt">
            <p>表参道始祖鸟：黑色短袖 13000 JPY（598 RMB），灰色短袖 9000 JPY（414 RMB）。黑色更显瘦，灰色更百搭，两件都值得入。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("arcteryx-paygate-store-receipt.jpeg")} alt="Arcteryx receipt" className="sq" />
              <div className="cap">表参道始祖鸟 Paygate 小票</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("don-quijote-shopping-bag.jpeg")} alt="Don Quijote bag" className="sq" />
              <div className="cap">堂吉诃德药妆 600 RMB 装袋</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">☕ Verve Coffee</div>
            <p>代代木公园南侧的 Verve 是这次行程里最满意的咖啡，Signature 拿铁奶泡绵密、咖啡味扎实。代代木八幡宫可以顺路逛一圈，小而安静，适合坐下来发呆。</p>
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
              <div className="day-title">东京迪士尼海洋 · 白天</div>
              <div className="day-sub">Thursday, October 9th · Tokyo DisneySea</div>
            </div>
            <div className="day-weather">⛅</div>
          </div>

          <div className="jtxt">
            <p>麦当劳快速吃完早餐，坐上迪士尼度假区线入园。上午一开园直奔小飞侠（用了 DPA 2000 JPY），体验有点像变形金刚 3D Ride，推荐；午餐在 Lookout 解决，味道很一般。下午冰雪奇缘没抢到 DPA，排了将近两小时的水上小船，剧情还行但时间太长。Aquatopia 水上旋转小车排队不长，可以放松一下；Nemo 下午五点才去，半小时就排到了，像小黄人风格很好玩；海底两万里坐小潜艇下潜，看海底生物和失落古文明，排队只要 20 分钟，强推。阿拉丁音乐剧简短但音乐好听。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("day4-disney-resort-line-tickets.jpeg")} alt="Disney monorail tickets" className="ls" />
              <div className="cap">迪士尼度假区线单程票</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day4-fortress-ship-ride.jpeg")} alt="Fortress ship ride" className="ls" />
              <div className="cap">要塞探险里的木质船</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("day4-arabian-coast.jpeg")} alt="Arabian coast" className="sq" />
              <div className="cap">阿拉伯海岸的穹顶 🕌</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("day4-tower-of-terror-hotel.jpeg")} alt="Tower of Terror hotel" className="sq" />
              <div className="cap">惊魂古堡外景</div>
            </div>
          </div>

          <div className="pgrid g1 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day4-tangled-lantern-ride.jpeg")} alt="Tangled lanterns ride" className="hero" />
              <div className="cap">天灯 —— 坐在小船里抬头看满天灯火</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🎟️ DPA 使用心得</div>
            <p>国庆假期的迪士尼海洋，DPA 是真金白银换时间。推荐优先抢小飞侠和天灯，一个 3D 一个水上小船，体验都值。冰雪奇缘热门到 DPA 秒空，普通排队 2 小时起步，但坐到就是赚。</p>
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
              <div className="day-title">东京迪士尼海洋 · 夜晚</div>
              <div className="day-sub">天灯 · 惊魂古堡 · 夜间秀</div>
            </div>
            <div className="day-weather">🌃</div>
          </div>

          <div className="jtxt">
            <p>入夜后迪士尼海洋换了另一张脸。天灯用了 DPA，场景像长发公主漫天灯火，但太短了，有点意犹未尽。音乐秀要占好位置，城堡上方视野绝佳。最刺激的还是惊魂古堡——全园最值得的项目，没有之一，外面商店街东西也超多。最后松屋牛肉饭收尾，便宜管饱。</p>
          </div>

          <div className="pgrid g1">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day4-mermaid-lagoon-night.jpeg")} alt="Mermaid lagoon at night" className="hero" />
              <div className="cap">美人鱼礁湖 —— 夜晚的迪士尼海洋最像童话</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("day4-tower-of-terror-ride-photo.jpeg")} alt="Tower of Terror ride photo" className="sq" />
              <div className="cap">惊魂古堡 ride photo</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tg t-tr" />
              <img src={img("day4-tower-of-terror-dpa-ticket.jpeg")} alt="Tower of Terror DPA" className="sq" />
              <div className="cap">DPA 票 —— 全园最刺激</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("day4-night-fountain-show.jpeg")} alt="Night fountain show" className="sq" />
              <div className="cap">夜间喷泉秀</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("day4-disney-night-selfie.jpeg")} alt="Disney night selfie" className="sq" />
              <div className="cap">夜晚园区留个影</div>
            </div>
          </div>

          <div className="dv mt20 mb12"><span>🧸</span></div>

          <div className="jtxt">
            <p>在迪士尼商店拿下七宝挂件一个，1451 RMB，挂在书包上当本次旅行的战利品徽章。</p>
          </div>

          <div className="pgrid g1 mt8" style={{ maxWidth: 320, margin: "0 auto" }}>
            <div className="pf fc" style={{ position: "relative", padding: 8 }}>
              <div className="tape tp t-tl" />
              <div className="tape tp t-tr" />
              <img src={img("pink-plush-toys-with-stickers.png")} alt="Disney plush" className="pt" />
              <div className="cap" style={{ fontSize: 17, marginTop: 6 }}>七宝挂件 —— 迪士尼的官方礼物</div>
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
              <div className="day-title">香奈儿百年展 &amp; 百货大战</div>
              <div className="day-sub">Friday, October 10th · 高岛屋 · 伊势丹 · 19M Tokyo</div>
            </div>
            <div className="day-weather">🛍️</div>
          </div>

          <div className="jtxt">
            <p>最后一天，便利店早餐后直奔高岛屋代购 —— Pola、Fancl、Mikimoto、资生堂一次性收齐；自己血拼 Kanebo、Fancl 和一个 LV 小皮夹。Beams 看到始祖鸟联名款，颜值一般没入。转战伊势丹，LV Keepall 35 + Canada Goose 两件羽绒服强势拿下。高岛屋 B2 美食补给，最后用香奈儿百年艺术展收尾 —— 整趟旅行最文艺的一个小时。</p>
          </div>

          <div className="pgrid g1">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <div className="tape ty t-tr" />
              <img src={img("day5-ginza-cocoon-tower.jpeg")} alt="Ginza Cocoon" className="hero" />
              <div className="cap">新宿的 Cocoon 塔 —— 百货大战开始</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tp t-tl" />
              <img src={img("day5-chanel-19m-tokyo-banner.jpeg")} alt="Chanel 19M Tokyo banner" className="ls" />
              <div className="cap">香奈儿 La Galerie du 19M Tokyo</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tr" />
              <img src={img("day5-chanel-exhibition-outfits.jpeg")} alt="Chanel exhibition outfits" className="ls" />
              <div className="cap">百年展的成衣陈列</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("day5-mori-art-museum.jpeg")} alt="Mori Art Museum" className="sq" />
              <div className="cap">顺路经过森美术馆</div>
            </div>
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape ty t-tc" />
              <img src={img("black-louis-vuitton-handbag-cat.jpeg")} alt="LV Keepall" className="sq" />
              <div className="cap">LV Keepall 35 + 一只猫 👜</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape ty t-tl" />
              <img src={img("folded-black-puffer-jacket.jpeg")} alt="Canada Goose" className="sq" />
              <div className="cap">Canada Goose 羽绒服</div>
            </div>
            <div className="pf fn" style={{ position: "relative" }}>
              <div className="tape tp t-tr" />
              <img src={img("louis-vuitton-wallet-box.jpeg")} alt="LV wallet" className="sq" />
              <div className="cap">LV 小皮夹（高岛屋）</div>
            </div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fc" style={{ position: "relative" }}>
              <div className="tape tg t-tc" />
              <img src={img("lancome-skincare-products-flatlay.jpeg")} alt="Skincare flatlay" className="sq" />
              <div className="cap">百货柜台的战利品</div>
            </div>
            <div className="pf fw" style={{ position: "relative" }}>
              <div className="tape tp t-tc" />
              <img src={img("kanebo-sealed-cosmetic-sample.jpeg")} alt="Kanebo sample" className="sq" />
              <div className="cap">Kanebo 封样</div>
            </div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🛍️ 百货大战 Tips</div>
            <p>高岛屋和伊势丹退税柜台在 B1 退税区，银联卡 + 护照最快。工作日下午排队 15 分钟，节假日可能要 40+。LV / Canada Goose 这种大件建议直接走百货，回程还能在机场免税店补刀。</p>
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
              <div className="day-title">购物战绩</div>
              <div className="day-sub">五天总账单 ¥ 43,675</div>
            </div>
          </div>

          <div className="jtxt">
            <p>国庆东京购物大爆发：免税店雪茄 + 新宿户外全套 + 表参道始祖鸟 + 迪士尼七宝 + 高岛屋伊势丹的 LV &amp; Canada Goose。每天都在买买买，回过神来账单已经接近四万五。</p>
          </div>

          <div className="dv mt20 mb12"><span>💳</span></div>

          <div className="bill">
            <h4>10.5 — 免税店</h4>
            <div className="br"><span>Davidoff 雪茄</span><span>¥ 1,844</span></div>
            <div className="br total"><span>小计</span><span>¥ 1,844</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.7 — 新宿大扫货</h4>
            <div className="br"><span>Montbell 雷霆冲锋衣</span><span>¥ 640</span></div>
            <div className="br"><span>Montbell 户外配件</span><span>¥ 396</span></div>
            <div className="br"><span>United Arrows 北面紫标长袖</span><span>¥ 470</span></div>
            <div className="br"><span>United Arrows 牛仔裤</span><span>¥ 850</span></div>
            <div className="br"><span>On 昂跑 x4</span><span>¥ 892</span></div>
            <div className="br"><span>City Tokyo 牛仔裤</span><span>¥ 845</span></div>
            <div className="br"><span>Salomon XT Whisper</span><span>¥ 939</span></div>
            <div className="br"><span>优衣库（打底/袜子/短裤）</span><span>¥ 371</span></div>
            <div className="br total"><span>小计</span><span>¥ 5,403</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.8 — 表参道始祖鸟 &amp; 药妆</h4>
            <div className="br"><span>始祖鸟黑色短袖</span><span>¥ 598</span></div>
            <div className="br"><span>始祖鸟灰色短袖</span><span>¥ 414</span></div>
            <div className="br"><span>堂吉诃德药妆</span><span>¥ 699</span></div>
            <div className="br total"><span>小计</span><span>¥ 1,711</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.9 — 迪士尼</h4>
            <div className="br"><span>七宝挂件</span><span>¥ 1,451</span></div>
            <div className="br total"><span>小计</span><span>¥ 1,451</span></div>
          </div>

          <div className="bill mt12">
            <h4>10.10 — 高岛屋 &amp; 伊势丹</h4>
            <div className="br"><span>高岛屋 Kanebo</span><span>¥ 346</span></div>
            <div className="br"><span>高岛屋 Fancl</span><span>¥ 69</span></div>
            <div className="br"><span>中国免税店护肤品</span><span>¥ 406</span></div>
            <div className="br"><span>伊势丹 LV Keepall 35</span><span>¥ 16,155</span></div>
            <div className="br"><span>伊势丹 Canada Goose 羽绒服</span><span>¥ 12,378</span></div>
            <div className="br"><span>高岛屋 LV 小皮夹</span><span>¥ 3,258</span></div>
            <div className="br"><span>日本免税店酒和零食</span><span>¥ 654</span></div>
            <div className="br total"><span>小计</span><span>¥ 33,266</span></div>
          </div>

          <div className="dv mt24 mb12"><span>📊</span></div>

          <div className="bill">
            <h4>五日总账单</h4>
            <div className="br"><span>10.5 免税店</span><span>¥ 1,844</span></div>
            <div className="br"><span>10.7 新宿</span><span>¥ 5,403</span></div>
            <div className="br"><span>10.8 表参道</span><span>¥ 1,711</span></div>
            <div className="br"><span>10.9 迪士尼</span><span>¥ 1,451</span></div>
            <div className="br"><span>10.10 高岛屋/伊势丹</span><span>¥ 33,266</span></div>
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
              <div className="day-title">共同开支</div>
              <div className="day-sub">国庆东京 AA 账单 · 人民币 + 日元</div>
            </div>
          </div>

          <div className="jtxt">
            <p>这趟旅行的 AA 账：酒店、电话卡、迪士尼入场、几顿大餐都按人头均摊。下面的数字已经除好，单人直接看即可。</p>
          </div>

          <div className="dv mt16 mb12"><span>💴</span></div>

          <div className="bill">
            <h4>人民币部分</h4>
            <div className="br"><span>电话卡（270 ÷ 2）</span><span>¥ 135 / 人</span></div>
            <div className="br"><span>迪士尼入场（1784 ÷ 4）</span><span>¥ 446 / 人</span></div>
            <div className="br"><span>烤肉（1623.8 ÷ 4）</span><span>¥ 405.95 / 人</span></div>
            <div className="br"><span>天空快线（496.98 ÷ 4）</span><span>¥ 124.25 / 人</span></div>
            <div className="br"><span>七里滨午饭（358.88 ÷ 4）</span><span>¥ 89.72 / 人</span></div>
            <div className="br"><span>炸猪排（338.3 ÷ 3）</span><span>¥ 112.77 / 人</span></div>
            <div className="br"><span>东京酒店（8173.5 ÷ 2）</span><span>¥ 4,087 / 人</span></div>
            <div className="br"><span>日元兑换（5 万 JPY）</span><span>¥ 2,430</span></div>
            <div className="br total"><span>人民币人均</span><span>¥ 975 / 人</span></div>
          </div>

          <div className="bill mt16">
            <h4>日元部分</h4>
            <div className="br"><span>小火车</span><span>1,200 JPY</span></div>
            <div className="br"><span>Lookout 午餐</span><span>4,320 JPY</span></div>
            <div className="br"><span>DPA 天灯</span><span>8,000 JPY</span></div>
            <div className="br"><span>DPA 小飞侠</span><span>8,000 JPY</span></div>
            <div className="br total"><span>日元人均（÷ 2）</span><span>10,760 JPY / 人</span></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">🧮 一些提醒</div>
            <p>李子璐：5000 JPY（单独记）。炸猪排因为胖圆没去所以按 3 人分。酒店是 2 人一间，按 2 人均摊。日元换 5 万，最后几乎用完，回程还多换了一点现金。</p>
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
              <p>从镰仓的海岸线到新宿的扫货街，</p>
              <p>从迪士尼海洋的夜晚到香奈儿百年展的尾声，</p>
              <p>五天四夜，买了一堆东西，</p>
              <p>也装回了一整本手帐。</p>
              <p style={{ marginTop: 20 }}>旅行的意义不在于抵达终点，</p>
              <p>而是我们一起走过的那些路。</p>
            </div>
            <div className="cover-line" />
            <div className="tags mt24">
              <span className="tag tag-g">#日本旅行</span>
              <span className="tag tag-c">#东京plog</span>
              <span className="tag tag-t">#电子手帐</span>
              <span className="tag tag-b">#镰仓</span>
              <span className="tag tag-p">#新宿</span>
              <span className="tag tag-g">#迪士尼海洋</span>
              <span className="tag tag-c">#香奈儿展</span>
              <span className="tag tag-t">#买买买</span>
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
