import type { ReactNode } from "react";
import CardScaleController from "@/components/CardScaleController";
import { img } from "./meta";

type PhotoProps = {
  file: string;
  alt: string;
  caption: string;
  shape?: "hero" | "pt" | "ls" | "sq" | "wd";
};

function Photo({ file, alt, caption, shape = "pt" }: PhotoProps) {
  return (
    <div className="pf">
      <img src={img(file)} alt={alt} className={shape} loading="lazy" decoding="async" />
      <div className="cap">{caption}</div>
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

export default function SeoulZH() {
  return (
    <div className="seoul-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>SEOUL<br />2024</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">❄️ 🛍️ 🎆</div>
            <h1 className="cover-title">
              <span style={{ display: "block" }}>首尔，</span>
              <span style={{ display: "block" }}>雪坡霓虹跨年夜</span>
            </h1>
            <div className="cover-subtitle">A New Year Travel Journal</div>
            <div className="cover-line" />
            <div className="cover-date">2023.12.29 — 2024.01.01</div>
            <div className="cover-line" />
            <p
              style={{
                fontFamily: "var(--font-serif-cn)",
                fontSize: 17,
                color: "var(--ink-light)",
                fontStyle: "italic",
                lineHeight: 2.2,
                maxWidth: 480,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              「弘大的霓虹、南山的雪，<br />还有在烟花里抵达的 2024。」
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">NEW YEAR PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <JournalCard page={2}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🗺️</span><span style={{ fontSize: 12 }}>ROUTE</span></div>
          <div>
            <div className="day-title">四天，从购物清单走进跨年烟花</div>
            <div className="day-sub">上海 · 仁川 · 弘大 · 南山 · 梨泰院 · 明洞</div>
          </div>
        </div>

        <div className="jtxt">
          <p>12 月 29 日 11:35 起飞，14:30 抵达仁川 T1；1 月 1 日 14:10 从首尔返程，15:10 落地上海浦东 T2。住在梨花女子大学站附近的 H Avenue Hotel Idae Shinchon，把四天压缩在首尔西侧与市中心。</p>
          <p>出发前的攻略写得很满，真正打勾的路线却很清楚：弘大扫货、解放村与南山、梨泰院小坡、乱打秀、明洞 ALAND，以及最后的跨年活动。</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">12.29</span><div className="ev">仁川 → 弘大</div><div className="dt">落地就钻进潮牌街区，从霓虹逛到夜里</div></div>
          <div className="tl-item"><span className="tm">12.30</span><div className="ev">南山 → 解放村 → 梨泰院 → 明洞</div><div className="dt">雪后 City Walk，坐缆车下山，20:00 看乱打秀</div></div>
          <div className="tl-item"><span className="tm">12.31</span><div className="ev">宫殿攻略、明洞购物与跨年</div><div className="dt">计划与实际交叠，确定完成的是 ALAND 和跨年活动</div></div>
          <div className="tl-item"><span className="tm">01.01</span><div className="ev">首尔 → 上海</div><div className="dt">午餐后前往机场，结束这趟跨年短途旅行</div></div>
        </div>

        <div className="pgrid g3 mt20">
          <Photo file="20-seoul-attractions-map.webp" alt="首尔热门景点路线图" caption="出发前收藏的首尔景点地图" />
          <Photo file="22-hotel-location-map.webp" alt="H Avenue Hotel 在首尔地图上的位置" caption="住在梨大、新村一带" />
          <Photo file="23-incheon-airport-route.webp" alt="仁川机场前往酒店的导航路线" caption="从仁川 T1 进城的第一段路" />
        </div>
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">落地就去弘大扫货</div>
            <div className="day-sub">Friday, December 29th · Hongdae</div>
          </div>
          <div className="day-weather">🌙</div>
        </div>

        <div className="jtxt">
          <p>下午落地后直接去弘大。这里的潮流文化很成熟，店铺密度高，价格也比国内亲民不少；弘大门口和商业街一直热闹到晚上，霓虹、招牌和人流把第一晚一下拉满。</p>
          <p>梨花女子大学原本也在清单里：想看 ECC 下沉建筑、校门左侧的教堂，再顺路逛 Olive Young。最后没有打勾，酒店虽住在梨大附近，校园还是留给下次。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="01-hongdae-night-street.webp" alt="夜晚人流密集的弘大商业街" caption="落地第一站：弘大热闹的夜街" shape="ls" />
          <Photo file="02-neon-night-street.webp" alt="首尔夜生活街区的霓虹招牌与行人" caption="招牌和人流一直延伸进夜色" shape="ls" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="03-hongdae-shopping-map.webp" alt="标注弘大潮牌店铺的购物地图" caption="出发前做的弘大潮牌地图，最后真的按图扫了几家" shape="hero" />
        </div>

        <div className="rbox mt20">
          <h4>第一晚实际买到</h4>
          <div className="ri"><span className="nm">Griptok</span><span className="cm">爱豆同款手机壳与手机支架</span></div>
          <div className="ri"><span className="nm">Covernat</span><span className="cm">明星同款很多，帽子尤其好买</span></div>
          <div className="ri"><span className="nm">what it isn&apos;t</span><span className="cm">小飞鸟很火，质感在线，价格也友好</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">看了但没有特别心动</div>
          <p>Nerdy 有折扣，Marithé François Girbaud 的同款很多；thisisneverthat 像韩版 Supreme，但当时觉得价格没有那么合适。</p>
        </div>
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">雪后的首尔，一路都在爬坡</div>
            <div className="day-sub">Saturday, December 30th · Namsan · Haebangchon</div>
          </div>
          <div className="day-weather">❄️</div>
        </div>

        <div className="jtxt">
          <p>这天按 City Walk 的思路向南山走。首尔冬天的城市景观很特别：密集楼群背后是山，山坡上的南山塔始终在视线里。雪把街道、公交车和楼缝都压成低饱和色，走起来却一点也轻松——这里的坡是真的多。</p>
          <p>明洞漫画街、国立中央博物馆、绿莎坪行人天桥和两家日落咖啡馆都留在未完成清单里；实际打卡的是解放村、南山塔和梨泰院。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="06-seoul-cityscape.webp" alt="群山环绕的首尔城市楼群" caption="楼群之外就是山，这是首尔最鲜明的城市轮廓" />
          <Photo file="07-namsan-tower-city-view.webp" alt="从城市建筑间望见南山首尔塔" caption="南山塔一直在坡顶提醒方向" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="08-snowy-city-buildings.webp" alt="雪中的首尔高楼街道" caption="雪后的市中心被压成黑白色调" />
          <Photo file="10-snowy-city-bus.webp" alt="雪天首尔街头驶过的蓝色公交车" caption="雪还没化，公交照常穿过街区" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">最真实的提醒</div>
          <p>首尔很多路都有坡度，一定要穿舒服、柔软、能久走的鞋。风景在高处，代价也写在小腿上。</p>
        </div>
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">解放村、梨泰院与乱打秀</div>
            <div className="day-sub">Haebangchon · Itaewon · Myeongdong</div>
          </div>
          <div className="day-weather">🥁</div>
        </div>

        <div className="jtxt">
          <p>在解放村换着角度看南山塔，又到梨泰院那条小坡打卡。上山之后从南山塔坐缆车下来，傍晚回到城市灯光里。晚上 20:00 赶到明洞 UNESCO 大厦三楼看乱打秀，锅碗瓢盆被敲成一场节奏很满的收尾。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="04-snowy-city-friends.webp" alt="两个人在雪后的首尔街头合影" caption="雪后的街头合影，城市比想象中更冷" shape="ls" />
          <Photo file="05-city-overlook-friends.webp" alt="两个人在俯瞰首尔的高处合影" caption="爬到高处，背后是铺开的首尔" shape="ls" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="09-wanta-store-group.webp" alt="一行人在 WANTA 店铺内合影" caption="City Walk 途中，在 WANTA 店里留下的一张合影" shape="hero" />
        </div>

        <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
          <div className="rs"><div className="ic">🏘️</div><div className="lb">解放村</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🗼</div><div className="lb">南山塔</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🚡</div><div className="lb">缆车下山</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">📺</div><div className="lb">梨泰院坡</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🥁</div><div className="lb">乱打秀</div></div>
        </div>
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">宫殿攻略写得很细，完成记号却留白</div>
            <div className="day-sub">Sunday, December 31st · Gyeongbokgung · Myeongdong</div>
          </div>
          <div className="day-weather">🏯</div>
        </div>

        <div className="jtxt">
          <p>当天标题写着“景福宫与跨年”，攻略里甚至记下了景福宫站 5 号口、成人 3,000 韩币、儿童 1,500 韩币，以及周二闭馆。但这部分没有完成标记；青瓦台的护照领粉色手带和完整参观路线，也更像出发前留下的备忘。</p>
          <p>确定打勾的是明洞 ALAND 和晚上的跨年活动。圣水洞、江南与狎鸥亭都曾是下午候选，最后没有按购物清单一路追过去。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="11-gyeongbokgung-poster.webp" alt="以景福宫屋檐为主题的旅行海报" caption="景福宫攻略页：屋檐、宫墙与出发前的期待" />
          <Photo file="19-gyeongbokgung-light-show.webp" alt="景福宫夜间灯光投影画面" caption="收藏的宫殿灯光画面，为跨年前夜预热" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="18-designer-toy-citywalk.webp" alt="首尔潮玩店和设计店 City Walk 拼图" caption="购物路线做了很多功课，真正走到哪里就随当天体力决定" shape="hero" />
        </div>

        <div className="rbox mt16">
          <h4>这趟实际确认的购物收获</h4>
          <div className="ri"><span className="nm">明洞 ALAND</span><span className="cm">潮牌聚集地，12 月 31 日完成打卡</span></div>
          <div className="ri"><span className="nm">Le Labo</span><span className="cm">首尔限定味道，手帐特意写下“已买到！”</span></div>
        </div>
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🛍️</span><span style={{ fontSize: 12 }}>SHOP</span></div>
          <div>
            <div className="day-title">收藏很多，真正买到的更值得记</div>
            <div className="day-sub">Hongdae · Myeongdong · the wish list left for next time</div>
          </div>
        </div>

        <div className="jtxt">
          <p>首尔最让人满意的是购物体验。潮牌成熟、选择密、很多价格比国内友好；四天时间有限，没有必要把收藏夹里的每家店都变成任务。</p>
        </div>

        <div className="rbox mt20">
          <h4>当时最想逛的区域</h4>
          <div className="ri"><span className="nm">圣水洞</span><span className="cm">Ader 太空店、emis、Fennec、KUOCA、Dior 主题店与 Le Labo</span></div>
          <div className="ri"><span className="nm">江南</span><span className="cm">星空图书馆、BEAKER、新沙洞林荫路 Tamburins 与地下商街</span></div>
          <div className="ri"><span className="nm">狎鸥亭</span><span className="cm">Worksout、Wooyoungmi、Solid Homme、Juun.J、10 Corso Como 与 Ader Error</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">清单里最有感情的一家</div>
          <p>“向鸡家”的炒鸡加拉面，在原笔记里留下了连续四个“爱”。哪怕这次没有完成标记，光看语气也知道它在期待榜上有多高。</p>
        </div>
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🎆</span><span style={{ fontSize: 12 }}>2024</span></div>
          <div>
            <div className="day-title">在烟花里迎接 2024</div>
            <div className="day-sub">New Year&apos;s Eve · Seoul</div>
          </div>
          <div className="day-weather">✨</div>
        </div>

        <div className="jtxt">
          <p>跨年活动是这天明确打勾的一项。烟花在夜空里散开，2023 和 2024 的分界被照得很亮。至于收藏的活动指南里，普信阁敲钟、“午夜的太阳”、首尔花灯、DDP 的“数字亚特兰蒂斯”、松岘灯光庆典和道林川星光庆典排得满满当当；手帐没有把某一场写成确定到场，所以它们仍保留为当时的备选。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="12-new-year-fireworks.webp" alt="首尔跨年夜空中的烟花" caption="烟花升起，四天的旅行也走到最亮的一刻" shape="hero" />
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">普信阁</span><div className="ev">跨年敲钟 33 次</div><div className="dt">地点在钟路区贯铁洞，是当时攻略里的主活动</div></div>
          <div className="tl-item"><span className="tm">世宗大路</span><div className="ev">直径 12 米的“午夜太阳”</div><div className="dt">敲钟后升起，并安排舞团表演</div></div>
          <div className="tl-item"><span className="tm">光化门与清溪川</span><div className="ev">首尔花灯庆典</div><div className="dt">活动期从 2023.12.15 延续到 2024.01.21</div></div>
          <div className="tl-item"><span className="tm">DDP</span><div className="ev">首尔之光：数字亚特兰蒂斯</div><div className="dt">东大门设计广场外墙的大型光影节目</div></div>
        </div>
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🥾</span><span style={{ fontSize: 12 }}>WALK</span></div>
          <div>
            <div className="day-title">南山的冬天，雪路比塔更难忘</div>
            <div className="day-sub">Namsan hillside · winter paths · Seoul Tower</div>
          </div>
          <div className="day-weather">🌲</div>
        </div>

        <div className="jtxt">
          <p>回看照片，南山塔当然醒目，但更能留下身体记忆的是坡路、冬树和没有化完的雪。山坡一路把城市藏在身后，走累了才发现，首尔的风景常常不是一个点，而是抵达那个点之前的长路。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="13-namsan-hike-friends.webp" alt="两个人在南山冬季树林中徒步" caption="山里的一张合影，坡度已经写在表情上" shape="ls" />
          <Photo file="14-namsan-tower-hillside.webp" alt="冬季山坡上的南山首尔塔" caption="隔着冬林望见南山塔" shape="ls" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="15-namsan-hillside-road.webp" alt="南山脚下通往塔区的冬季公路" caption="盘山路边，城市和山坡接在一起" />
          <Photo file="16-snowy-winter-trail.webp" alt="冬树之间留有积雪的山路" caption="背阴处的雪还没有化" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="17-winter-park-path.webp" alt="冬日树木围绕的公园步道" caption="树叶落尽之后，步道显得格外安静" shape="hero" />
        </div>
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>📋</span><span style={{ fontSize: 12 }}>PLAN</span></div>
          <div>
            <div className="day-title">没打勾的清单，也属于这趟旅行</div>
            <div className="day-sub">Plans saved, routes changed, no need to complete every square</div>
          </div>
        </div>

        <div className="pgrid g1">
          <Photo file="21-seoul-four-day-guide.webp" alt="首尔四天三夜旅行路线参考图" caption="出发前收藏的四日路线，真正走起来还是由天气和体力决定" shape="hero" />
        </div>

        <div className="rbox mt20">
          <h4>最后没有完成</h4>
          <div className="ri"><span className="nm">文化线</span><span className="cm">梨花女子大学、国立中央博物馆、青瓦台</span></div>
          <div className="ri"><span className="nm">City Walk</span><span className="cm">明洞漫画街、绿莎坪天桥、日落咖啡馆</span></div>
          <div className="ri"><span className="nm">购物线</span><span className="cm">乐天与新世界免税店、圣水洞、江南、狎鸥亭整日慢逛</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">旅行不是完成表格</div>
          <p>清单的意义是让出发前有所期待，不是要求落地后逐项交作业。真正留下来的，是弘大的店、南山的坡、乱打秀的鼓点和跨年的烟花。</p>
        </div>
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>💭</span><span style={{ fontSize: 12 }}>NOTES</span></div>
          <div>
            <div className="day-title">首尔很好逛，也很考验准备</div>
            <div className="day-sub">What worked · what annoyed me · what I would bring again</div>
          </div>
        </div>

        <div className="jtxt">
          <p>这趟旅行最明确的好评给购物：潮流文化成熟、品牌选择多、体验顺手。最明确的提醒则来自城市本身——坡多、公共厕所和垃圾桶少，走一天以后这些细节比景点更有存在感。</p>
          <p>语言上，Papago 很有用；途中用英文沟通并不总是顺利。也遇到过插队，让人有点不舒服。酒店不提供牙刷牙膏，入住时还会担心臭虫；仁川机场人多，出入境和返程都该预留足够时间。</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">带对了</span><div className="ev">充电宝、当地电话卡、转换插头、T-Money</div><div className="dt">中国电话卡的境外流量不一定能打开所有韩国 App</div></div>
          <div className="tl-item"><span className="tm">App</span><div className="ev">Naver 导航，Papago / Kulikuli 翻译</div><div className="dt">路线和语言都不要只依赖一个工具</div></div>
          <div className="tl-item"><span className="tm">出门前</span><div className="ev">穿软底鞋，先找洗手间</div><div className="dt">首尔街头公共厕所与垃圾桶比预想中少</div></div>
          <div className="tl-item"><span className="tm">手帐余额</span><div className="ev">3,500 / 3,600 韩币</div><div className="dt">原笔记最后留下的数字，原样保留</div></div>
        </div>

        <div className="dv mt24 mb16"><span>🎆</span></div>
        <div className="hwcn" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p>四天很短，清单很长。</p>
          <p>没有走完的地方留给下次，</p>
          <p>走过的雪坡、霓虹和烟花已经足够完整。</p>
        </div>
        <div className="tags mt24">
          <span className="tag tag-c">#首尔跨年</span>
          <span className="tag tag-t">#弘大购物</span>
          <span className="tag tag-g">#南山雪路</span>
          <span className="tag tag-b">#梨泰院CityWalk</span>
          <span className="tag tag-p">#2024你好</span>
        </div>
        <div style={{ marginTop: 34, textAlign: "center" }}>
          <span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2024.01</span>
        </div>
      </JournalCard>
    </div>
  );
}
