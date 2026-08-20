import type { ReactNode } from "react";

import { img } from "./meta";

type Photo = {
  file: string;
  alt: string;
  caption: string;
  shape?: "hero" | "pt" | "ls" | "sq" | "wd";
};

function Gallery({ photos, grid = "g2" }: { photos: Photo[]; grid?: string }) {
  return (
    <div className={`pgrid ${grid} mt16`}>
      {photos.map(({ file, alt, caption, shape = "pt" }) => (
        <div className="pf" key={file}>
          <img src={img(file)} alt={alt} className={shape} loading="lazy" decoding="async" />
          <div className="cap">{caption}</div>
        </div>
      ))}
    </div>
  );
}

function JournalCard({ page, children }: { page: number; children: ReactNode }) {
  return (
    <div className="card-wrap">
      <div className="card">
        {children}
        <div className="page-num">- {String(page).padStart(2, "0")} -</div>
      </div>
    </div>
  );
}

export default function Japan2023ZH() {
  return (
    <div className="japan-2023-trip" style={{ display: "contents" }}>
      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>JAPAN<br />2023</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🗻 ♨️ 🌃</div>
            <h1 className="cover-title">
              <span style={{ display: "block" }}>富士静景，</span>
              <span style={{ display: "block" }}>东京热游</span>
            </h1>
            <div className="cover-subtitle">Fuji Stillness, Tokyo in Motion</div>
            <div className="cover-line" />
            <div className="cover-date">NOVEMBER · 2023</div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 500, textAlign: "center", marginTop: 10 }}>
              「先在河口湖慢下来，<br />再一头扎进东京的街区、夜景和购物袋。」
            </p>
            <div style={{ marginTop: 35 }}><span className="stamp-box">TOKYO · FUJI PASS</span></div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <JournalCard page={2}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🗺️</span><span style={{ fontSize: 12 }}>ROUTE</span></div>
          <div>
            <div className="day-title">七天，从富士山脚走到东京霓虹</div>
            <div className="day-sub">河口湖 · 上野 · 浅草 · 涩谷 · 银座 · 横滨 · 丰岛园</div>
          </div>
        </div>
        <div className="jtxt">
          <p>这趟十一月的日本旅行以河口湖开场：先住进富士吟景，在湖边温泉旅馆看富士山；再回到东京，以高田马场的相铁 Grand Fresa 为据点，把上野、浅草、原宿、涩谷、皇居、银座、秋叶原和横滨串成一条越来越热闹的路线。</p>
          <p>最后一天留给东京哈利波特影城，返程前还在日上免税补上最大一笔购物。原笔记把总花费概括为约 2 万元；比景点更醒目的，是一路不断变厚的购物清单。</p>
        </div>
        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">Day 1–2</span><div className="ev">河口湖</div><div className="dt">湖畔温泉、富士山、新仓山浅间公园与忍野八海</div></div>
          <div className="tl-item"><span className="tm">Day 3</span><div className="ev">上野 → 浅草</div><div className="dt">公园、神社、浅草寺与夜晚商店街</div></div>
          <div className="tl-item"><span className="tm">Day 4–5</span><div className="ev">原宿涩谷 → 皇居银座秋叶原</div><div className="dt">白天穿街区，晚上看东京铺成灯海</div></div>
          <div className="tl-item"><span className="tm">Day 6–7</span><div className="ev">购物 → 横滨 → 哈利波特影城 → 回家</div><div className="dt">城市建筑、港口天际线、电影布景和最后一轮采购</div></div>
        </div>
        <Gallery grid="g2 guide-thumbs" photos={[
          { file: "tokyo-city-one-day-tour.jpeg", alt: "东京一日游路线参考图", caption: "出发前收藏的东京一日路线" },
          { file: "lake-kawaguchi-hotel-areas-map.jpeg", alt: "河口湖酒店区域分布图", caption: "河口湖住宿区域参考" },
        ]} />
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1–2</span></div>
          <div><div className="day-title">河口湖，把节奏交给富士山</div><div className="day-sub">Kawaguchiko · Fuji Ginkei · Oshino Hakkai</div></div>
          <div className="day-weather">🗻</div>
        </div>
        <div className="jtxt">
          <p>从东京出发来到河口湖，住进湖边的富士吟景。推开窗就是富士山，温泉旅馆的安静让整趟旅行先慢了下来。天气并不完美，但山、湖和低低的云仍然足够让人停下来多看一会儿。</p>
          <p>两天里经过河口湖站、新仓山浅间公园一带，也把忍野八海与河口湖音乐森林附近的炸鸡店记进路线。这里没有东京那么满，风景本身就是行程。</p>
        </div>
        <Gallery grid="g1" photos={[
          { file: "mount-fuji-lake-view.png", alt: "河口湖畔远望富士山", caption: "湖水、富士山与旅馆窗外的安静", shape: "hero" },
        ]} />
        <Gallery grid="g2" photos={[
          { file: "kawaguchiko-station-sign-entrance.png", alt: "河口湖站入口与站名标识", caption: "抵达河口湖，富士山段正式开始", shape: "sq" },
          { file: "chureito-pagoda-overlooking-fujiyoshida.png", alt: "新仓山浅间公园五重塔俯瞰富士吉田", caption: "五重塔与山下城市铺在同一层景深里", shape: "sq" },
        ]} />
        <Gallery photos={[
          { file: "group-at-japanese-temple.jpeg", alt: "一行人在日本寺社建筑前合影", caption: "富士山脚下的同行合影", shape: "ls" },
          { file: "two-people-under-tree.jpeg", alt: "两个人站在树下合影", caption: "树影下的一张旅行照，把河口湖的慢留住", shape: "ls" },
        ]} />
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div><div className="day-title">从上野的朱红鸟居走到浅草夜街</div><div className="day-sub">Ueno Park · Hanazono Inari · Senso-ji</div></div>
          <div className="day-weather">⛩️</div>
        </div>
        <div className="jtxt">
          <p>回到东京后先逛上野公园，再一路走向浅草寺。花园稻荷神社的红色奉纳旗、手里的御守、香炉升起的烟和浅草寺招牌，把这天的寺社记忆拼得很具体。</p>
          <p>浅草商店街的氛围很好，白天的参拜动线到了晚上变成招牌、路口和人流，顺手淘了一些小纪念品。东京国立博物馆也在这一区的收藏路线里。</p>
        </div>
        <Gallery grid="g3" photos={[
          { file: "hanazono-inari-shrine-banners.png", alt: "花园稻荷神社朱红色奉纳旗", caption: "上野公园里的花园稻荷神社", shape: "pt" },
          { file: "hand-holding-japanese-temple-charm.png", alt: "手里拿着日本寺社御守", caption: "从寺社带走的一枚小纪念", shape: "pt" },
          { file: "japanese-shrine-incense-burner.png", alt: "日本寺社香炉与参拜人群", caption: "香炉的烟把浅草的喧闹隔开一层", shape: "pt" },
        ]} />
        <Gallery grid="g3" photos={[
          { file: "sensoji-temple-japanese-signboard.png", alt: "浅草寺日文招牌与建筑入口", caption: "浅草寺的入口标识", shape: "sq" },
          { file: "tokyo-urban-street-intersection.png", alt: "东京城市街区十字路口", caption: "从寺社走回现代东京的路口", shape: "sq" },
          { file: "tokyo-night-shopping-street.png", alt: "东京夜晚商店街与灯光招牌", caption: "夜色落下，商店街依旧热闹", shape: "sq" },
        ]} />
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div><div className="day-title">原宿、表参道与涩谷的夜空</div><div className="day-sub">Meiji Jingu · Omotesando · Shibuya Sky</div></div>
          <div className="day-weather">🌃</div>
        </div>
        <div className="jtxt">
          <p>白天的路线在明治神宫、原宿、表参道与根津美术馆一带展开，到了晚上，Shibuya Sky 成了这天最强烈的记忆。站在高处，东京不再是一条街，而是一整片向远处延伸的灯光。</p>
          <p>购物也在这天突然加速：ATOMS 两件 T 恤 11,019 日元；PSG 店一件 T 恤加一件卫衣 31,900 日元；ABC Mart 的 Nike 板鞋 14,000 日元；两件 Aape 毛衣 28,666 日元；Air Jordan 板鞋 18,315 日元。原笔记合计 103,900 日元，约 5,082 元。</p>
        </div>
        <Gallery grid="g1" photos={[
          { file: "night-city-view-observatory-couple.jpeg", alt: "两个人在观景台前看东京夜景", caption: "Shibuya Sky 上，城市灯光铺到视线尽头", shape: "ls" },
        ]} />
        <Gallery grid="g4" photos={[
          { file: "two-people-outdoors-near-building.jpeg", alt: "两个人在东京建筑旁合影", caption: "白天穿过原宿与表参道", shape: "sq" },
          { file: "friends-on-observation-deck.png", alt: "朋友们站在东京高空观景台", caption: "在观景台留下合影", shape: "sq" },
          { file: "group-city-night-view.jpeg", alt: "一行人在东京城市夜景前合影", caption: "一群人与一整座夜东京", shape: "sq" },
          { file: "two-people-city-night-view.jpeg", alt: "两个人以东京夜景为背景合影", caption: "夜景很震撼，照片只是缩小版", shape: "sq" },
        ]} />
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div><div className="day-title">皇居到银座，再去秋叶原看雨夜</div><div className="day-sub">Imperial Palace · Ginza · Akihabara</div></div>
          <div className="day-weather">🌧️</div>
        </div>
        <div className="jtxt">
          <p>这天从皇居一带的开阔道路走进银座整齐的商业建筑，再转向秋叶原。东京的反差被压在一天里：树木与商务区、GINZA SIX 的玻璃幕墙、密集招牌，以及雨水反射出来的夜色。</p>
          <p>购物记录比行程更简短：优衣库 1,060.52 元。前一天的大采购之后，这个数字反而显得克制。</p>
        </div>
        <Gallery grid="g4" photos={[
          { file: "modern-city-intersection-buildings.png", alt: "东京现代建筑围绕的城市路口", caption: "从皇居一带走向商业区", shape: "pt" },
          { file: "ginza-six-shopping-center.png", alt: "GINZA SIX 购物中心外立面", caption: "银座的建筑与购物动线", shape: "pt" },
          { file: "tokyo-business-district-parkway.png", alt: "东京商务区林荫道路", caption: "高楼之间仍留着宽阔树影", shape: "pt" },
          { file: "rainy-japanese-city-street-night.png", alt: "雨夜中的日本城市街道", caption: "秋叶原一带的雨夜，灯牌落进湿漉漉的路面", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">6</span></div>
          <div><div className="day-title">“捕鸟大厦”、城市穿行与横滨天际线</div><div className="day-sub">Tokyo architecture · shopping · Yokohama</div></div>
          <div className="day-weather">🏙️</div>
        </div>
        <div className="jtxt">
          <p>原笔记把这天写成“捕鸟大厦 &amp; 横滨”。照片从一座利落的立方体建筑开始，经过广场、高架铁路、施工中的街区与动漫招牌，最后抵达横滨地标塔天际线。东京的密度被一路带到港口边。</p>
          <p>当天买了两件始祖鸟，4,850.06 元；堂吉诃德 118.79 元。原笔记把 Day 6 总计记为 5,698.85 元，这里按原记录保留。</p>
        </div>
        <Gallery grid="g3" photos={[
          { file: "modern-cube-building-exterior.png", alt: "现代立方体建筑外观", caption: "原笔记“捕鸟大厦”一站的现代建筑", shape: "sq" },
          { file: "urban-plaza-with-tall-buildings.png", alt: "高楼围绕的城市广场", caption: "在高楼之间继续穿行", shape: "sq" },
          { file: "tokyo-urban-train-overpass.png", alt: "东京城市铁路高架与街景", caption: "高架列车从城市纹理中穿过", shape: "sq" },
        ]} />
        <Gallery grid="g3" photos={[
          { file: "tokyo-street-with-crane.png", alt: "有施工吊车的东京街道", caption: "不断更新中的东京街区", shape: "sq" },
          { file: "tokyo-anime-district-nightscape.png", alt: "东京动漫街区夜景与灯牌", caption: "动漫招牌把夜色重新点亮", shape: "sq" },
          { file: "yokohama-landmark-tower-skyline.png", alt: "横滨地标塔与港口城市天际线", caption: "一天的终点落在横滨天际线", shape: "sq" },
        ]} />
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">7</span></div>
          <div><div className="day-title">走进哈利波特片场，然后回家</div><div className="day-sub">Warner Bros. Studio Tour Tokyo · The Making of Harry Potter</div></div>
          <div className="day-weather">🪄</div>
        </div>
        <div className="jtxt">
          <p>最后一天去了东京华纳兄弟哈利波特影城。对哈迷来说，这里确实像圣地：电影里的海报、服装、道具与布景从屏幕里变成立体空间，连搅动发光坩埚这样的互动也足够让人停很久。</p>
          <p>返程前的购物仍然没有收手：松本清药妆 853.96 元、哈利波特周边 585.02 元、祖马龙香水 758.83 元、伴手礼 720.60 元、日上免税 4,438.55 元；Day 7 合计 7,356.96 元。</p>
        </div>
        <Gallery grid="g4" photos={[
          { file: "wizard-robe-by-display-case.jpeg", alt: "穿巫师袍站在哈利波特展柜旁", caption: "换上巫师袍，走进电影世界", shape: "pt" },
          { file: "harry-potter-undesirable-no-1-poster.png", alt: "哈利波特头号不受欢迎人物海报", caption: "熟悉的通缉海报变成实景陈列", shape: "pt" },
          { file: "harry-potter-poster-display.png", alt: "哈利波特主题海报展陈", caption: "片场里的海报与道具细节", shape: "pt" },
          { file: "wizard-stirring-glowing-cauldron.jpeg", alt: "巫师装扮游客搅动发光坩埚", caption: "最后一天最有参与感的一幕", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🛍️</span><span style={{ fontSize: 12 }}>HAUL 1</span></div>
          <div><div className="day-title">战利品摊开，鞋服先占满一地</div><div className="day-sub">Sneakers · streetwear · outerwear</div></div>
        </div>
        <div className="jtxt"><p>原笔记说“每次都买太多了”，照片把这句话证明得很彻底。鞋盒、T 恤、卫衣、羽绒服、长裤与背包逐件铺开，购物不只是附带项目，而是这趟东京旅行的一条主线。</p></div>
        <Gallery grid="g4" photos={[
          { file: "nike-shoes-in-open-boxes.png", alt: "打开鞋盒摆放的 Nike 运动鞋", caption: "两双鞋盒打开，板鞋采购正式入账", shape: "pt" },
          { file: "folded-puffer-jacket-and-pants.png", alt: "叠放的羽绒服与长裤", caption: "外套与裤装战利品", shape: "pt" },
          { file: "black-backpack-and-khaki-pants.png", alt: "黑色背包与卡其色长裤", caption: "背包和日常裤装", shape: "pt" },
          { file: "packaged-bape-crewneck-shirt.png", alt: "包装中的 Bape 圆领上衣", caption: "Bape 单品收进购物清单", shape: "pt" },
          { file: "atmo-black-shirts-packaged.png", alt: "包装好的黑色 ATOMS T恤", caption: "ATOMS 两件 T 恤", shape: "pt" },
          { file: "uniqlo-kaws-graphic-tshirts.png", alt: "优衣库 KAWS 联名图案 T恤", caption: "优衣库的图案 T 恤采购", shape: "pt" },
          { file: "paris-saint-germain-clothing-set.png", alt: "巴黎圣日耳曼 T恤与卫衣套装", caption: "PSG 店带回的 T 恤与卫衣", shape: "pt" },
          { file: "arcteryx-black-jackets-folded.png", alt: "叠放的两件始祖鸟黑色外套", caption: "Day 6 的两件始祖鸟", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🎁</span><span style={{ fontSize: 12 }}>HAUL 2</span></div>
          <div><div className="day-title">药妆、零食、厨具与魔法周边</div><div className="day-sub">Drugstore · snacks · souvenirs · kitchenware</div></div>
        </div>
        <div className="jtxt"><p>另一半行李箱属于药妆、零食与伴手礼。哈利波特周边单独成组，眼药水、感冒药、护肤品与点心盒则把返程前的采购铺得密密麻麻；三把陶瓷刀是其中最不一样的一组。</p></div>
        <Gallery grid="g4" photos={[
          { file: "harry-potter-souvenir-items.png", alt: "哈利波特主题纪念品摆放在一起", caption: "影城带回的魔法世界周边", shape: "pt" },
          { file: "japanese-snack-boxes-on-carpet-2.png", alt: "地毯上摆放的日本点心礼盒", caption: "伴手礼与点心盒第一组", shape: "pt" },
          { file: "japanese-healthcare-products-flatlay.png", alt: "日本保健与药妆产品平铺", caption: "药妆店采购摊开记录", shape: "pt" },
          { file: "three-ceramic-kitchen-knives.png", alt: "三把陶瓷厨房刀具", caption: "行李里很有存在感的三把陶瓷刀", shape: "pt" },
        ]} />
        <Gallery grid="g3" photos={[
          { file: "japanese-eye-and-cold-medicines.png", alt: "日本眼药水与感冒药", caption: "眼药水与常用药补货", shape: "pt" },
          { file: "japanese-snack-boxes-on-carpet.png", alt: "多盒日本零食与伴手礼", caption: "点心盒第二组，返程行李继续膨胀", shape: "pt" },
          { file: "korean-skincare-products-flatlay.png", alt: "多件护肤品平铺陈列", caption: "护肤品集中记录", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🧾</span><span style={{ fontSize: 12 }}>BILL</span></div>
          <div><div className="day-title">购物账单：约两万元的旅行注脚</div><div className="day-sub">Recorded totals · shared expenses · no silent corrections</div></div>
        </div>
        <div className="bill mt20">
          <div className="br"><span>Day 4 · 涩谷购物</span><b>¥103,900 / RMB 5,082</b></div>
          <div className="br"><span>Day 5 · 优衣库</span><b>RMB 1,060.52</b></div>
          <div className="br"><span>Day 6 · 始祖鸟与堂吉诃德</span><b>RMB 5,698.85</b></div>
          <div className="br"><span>Day 7 · 药妆、周边、香水、伴手礼、免税</span><b>RMB 7,356.96</b></div>
          <div className="br total"><span>按每日记录合计</span><b>RMB 19,198.33</b></div>
        </div>
        <div className="nbox mt20">
          <div className="nbox-lbl">AA 摊销项 · 原笔记已划掉</div>
          <p>Shibuya Sky 8,800 日元、河口湖到新宿大巴 8,800 日元、吃饭 16,500 日元、天妇罗 8,100 日元、九州拉面 7,090 日元。这些属于共同分摊项，不重复并入上面的购物总计。</p>
        </div>
        <div className="rbox mt16">
          <h4>住宿</h4>
          <div className="ri"><span className="nm">河口湖</span><span className="cm">FUJI GINKEI 富士吟景 · 湖畔温泉旅馆</span></div>
          <div className="ri"><span className="nm">东京</span><span className="cm">Sotetsu Grand Fresa Takadanobaba · 相铁高田马场</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">账目保留原貌</div>
          <p>Day 6 的两笔明细与手写总计并不完全吻合；这里不擅自改写，仍保留原笔记的 5,698.85 元。旅行账单有时也是当时记忆的一部分。</p>
        </div>
      </JournalCard>

      <JournalCard page={12}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>💭</span><span style={{ fontSize: 12 }}>FIN</span></div>
          <div><div className="day-title">前半程看山，后半程把东京装进行李箱</div><div className="day-sub">Lake quiet · city lights · a very full suitcase</div></div>
        </div>
        <div className="jtxt">
          <p>回看这七天，河口湖和东京像两种完全不同的速度。前两天的记忆是窗外富士山、湖水与温泉旅馆；之后则是浅草香火、涩谷高空夜景、银座玻璃幕墙、秋叶原雨夜、横滨天际线和哈利波特片场。</p>
          <p>购物确实买得很多，甚至足以单独成为两页。但真正把旅行串起来的，还是那些尺度变化：从一座山的安静，到一整座城市的灯光，再到回家后把每件战利品铺开拍照的满足感。</p>
        </div>
        <div className="dv mt24 mb16"><span>🗻</span></div>
        <div className="hwcn" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p>富士山留在窗外，东京被装进行李箱。</p>
          <p>七天很满，照片更多，</p>
          <p>而下一次日本旅行，仍然有新的街区可走。</p>
        </div>
        <div className="tags mt24">
          <span className="tag tag-c">#河口湖</span>
          <span className="tag tag-t">#东京街区</span>
          <span className="tag tag-g">#涩谷夜景</span>
          <span className="tag tag-b">#横滨</span>
          <span className="tag tag-p">#购物战利品</span>
        </div>
        <div style={{ marginTop: 34, textAlign: "center" }}><span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2023.11</span></div>
      </JournalCard>
    </div>
  );
}
