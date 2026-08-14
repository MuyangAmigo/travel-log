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

export default function KansaiZH() {
  return (
    <div className="kansai-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>KANSAI<br />2024</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🌸 🎢 🍵</div>
            <h1 className="cover-title">
              <span style={{ display: "block" }}>关西 ·</span>
              <span style={{ display: "block" }}>樱灯、魔法与抹茶</span>
            </h1>
            <div className="cover-subtitle">A Spring Travel Journal</div>
            <div className="cover-line" />
            <div className="cover-date">2024.04.10 — 04.15</div>
            <div className="cover-line" />
            <p
              style={{
                fontFamily: "var(--font-serif-cn)",
                fontSize: 17,
                color: "var(--ink-light)",
                fontStyle: "italic",
                lineHeight: 2.2,
                maxWidth: 470,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              「从大阪的霓虹与魔法世界，<br />走到京都樱灯，再慢下来闻一整条街的茶香。」
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">SPRING PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <JournalCard page={2}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🗺️</span><span style={{ fontSize: 12 }}>ROUTE</span></div>
          <div>
            <div className="day-title">六天，把关西切成三种速度</div>
            <div className="day-sub">大阪 · 环球影城 · 京都 · 宇治</div>
          </div>
        </div>

        <div className="jtxt">
          <p>4 月 10 日从浦东飞往关西，住在淀屋桥的 Sotetsu Fresa Inn。前半程是大阪夜街和环球影城的高密度快乐，中段把体力交给京都、梅田两轮购物，后半程才在宇治河边真正慢下来。</p>
          <p>这趟旅行的照片也很诚实：霍格沃茨尖塔下是阴天，马里奥世界却亮得像游戏开机；京都白天是拥挤商店街，夜里则只剩五重塔、樱花和灯。最后一天回大阪补货，行李和账单一起抵达上限。</p>
        </div>

        <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
          <div className="rs"><div className="ic">✈️</div><div className="lb">关西机场</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🌃</div><div className="lb">大阪</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🎢</div><div className="lb">USJ</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🌸</div><div className="lb">京都</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🛍️</div><div className="lb">梅田</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🍵</div><div className="lb">宇治</div></div>
        </div>

        <div className="pgrid g2 mt20">
          <Photo file="kyoto-temple-and-tower.jpg" alt="古寺屋顶后方升起京都塔" caption="古寺与京都塔同框，关西的旧与新叠在一起" shape="ls" />
          <Photo file="japanese-temple-garden-pond.jpg" alt="春日阳光下的寺院池塘与松树" caption="春天还在水面和松枝上留着安静的一面" shape="ls" />
        </div>
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">落地大阪，先用烤肉开场</div>
            <div className="day-sub">Wednesday, April 10th · KIX → Yodoyabashi</div>
          </div>
          <div className="day-weather">🌙</div>
        </div>

        <div className="jtxt">
          <p>HO1621 在下午抵达关西 T1。把行李放进淀屋桥的酒店后，没有给第一天安排复杂任务，只是钻进大阪的街道随便走。霓虹亮起来时，旅行才算真正开始。</p>
          <p>晚餐选了可以在 Google Maps 预约的 OKINI 烤肉放题，最后现金结账。烤网上的肉刚翻面，杯子已经碰到一起；比起景点，这种刚落地、还没完全切换到旅行状态的晚饭，更像六天故事的开机画面。</p>
        </div>

        <div className="pgrid g3 mt16">
          <Photo file="busy-city-nightlife-selfie.jpeg" alt="两个人在大阪拥挤霓虹街头合影" caption="行李放下后的第一圈夜游，大阪已经挤满灯光和人" shape="sq" />
          <Photo file="korean-bbq-table-grill.jpg" alt="手在桌面烤炉上翻烤肉片" caption="OKINI 烤肉放题：第一顿要吃得有开场感" shape="sq" />
          <Photo file="japanese-izakaya-drinks-toast.jpg" alt="两杯日式饮品在餐桌上碰杯" caption="落地碰杯，时差和疲惫都先放一边" shape="sq" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">当天小账单</div>
          <p>星巴克 618 JPY，约 29 CNY。烤肉现金支付，记得给旅途中只收现金的小店留足日元。</p>
        </div>
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">环球影城：先抢时间，再进入魔法</div>
            <div className="day-sub">Thursday, April 11th · Universal Studios Japan</div>
          </div>
          <div className="day-weather">🎢</div>
        </div>

        <div className="jtxt">
          <p>这一天靠准备工作决定体验：提前下载 USJ App，带好 100 日元硬币、拍照道具和一次性雨衣，7:15 前抵达，7:45 入园。扫码进门后立刻绑定电子号码券、抽马里奥区域整理券，动作越快，后面的路线越从容。</p>
          <p>第一站直奔哈利波特禁忌之旅。灰蓝天空压在霍格沃茨尖塔后面，城堡反而更像电影里的样子；手里那张任天堂世界票券，则把下午的期待提前装进口袋。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="hogwarts-castle-turrets.jpg" alt="阴天下霍格沃茨城堡的高耸尖塔" caption="阴天替霍格沃茨加了一层电影滤镜" />
          <Photo file="universal-studios-japan-nintendo-world-tickets.jpg" alt="手持环球影城任天堂世界纸质票券" caption="整理券到手，马里奥世界的时间窗口确定了" />
        </div>
        <div className="pgrid g4 mt12">
          <Photo file="palm-lined-city-street-scene.jpg" alt="棕榈树围绕的环球影城大道与游客" caption="园区大道的人潮和棕榈树，把早晨迅速推入兴奋模式" shape="sq" />
          <Photo file="doraemon-adventureland-entrance-signs.jpg" alt="哆啦A梦主题区域彩色入口牌" caption="一路都是熟悉角色，像穿过童年频道" shape="sq" />
          <Photo file="sesame-street-central-park-mascot.jpg" alt="芝麻街主题区域的粉色角色雕像" caption="连路边角色都保持着饱和度满格" shape="sq" />
          <Photo file="usj-concrete-attraction-building.jpg" alt="环球影城园区内具有雕塑感的混凝土建筑" caption="园区里像巨型雕塑一样展开的混凝土建筑" shape="sq" />
        </div>

        <div className="rbox mt16">
          <h4>开园后的核心顺序</h4>
          <p>哈利波特禁忌之旅 → 马里奥区域 → 小黄人乐园 → 大白鲨 → 鬼灭之刃。13:00 花车巡游尽量在起点看，13:20 左右结束后衔接马里奥；水世界场次留意 12:00、14:15、16:30。</p>
        </div>
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">马里奥世界，颜色像真的会发声</div>
            <div className="day-sub">Super Nintendo World · Parade · Souvenirs</div>
          </div>
          <div className="day-weather">🍄</div>
        </div>

        <div className="jtxt">
          <p>走进超级任天堂世界，最大的冲击不是某个单独项目，而是整个山坡都被做成游戏画面：蘑菇、砖块、城堡和绿色管道挤在同一个视野里，颜色浓得像真的会发声。合影里的兔耳帽、园区入口和背后的蓝天，把这一天最轻松的部分都留了下来。</p>
          <p>项目之间继续收集小细节：Cookie Monster 藏在功能指示牌旁，马里奥商店的钥匙扣还有隐藏款，记得直接问店员。最后用园区 Pizza 和纪念品把快乐延长，晚餐再以粘面拉面收尾。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="super-mario-mushroom-kingdom-castle.jpg" alt="层层叠叠的超级马里奥蘑菇王国城堡" caption="从高处看，整个园区就是一张立体游戏地图" shape="hero" />
        </div>
        <div className="pgrid g3 mt12">
          <Photo file="super-nintendo-world-entrance.jpeg" alt="两个人在超级任天堂世界入口合影" caption="终于走进票券上的那扇门" shape="sq" />
          <Photo file="friends-in-bunny-hats.jpeg" alt="两个人戴着兔耳帽在环球影城合影" caption="道具一戴，主题乐园的认真程度立刻加倍" shape="sq" />
          <Photo file="cookie-monster-restaurant-sign.jpg" alt="Cookie Monster 造型的餐厅指示牌" caption="连指示牌都不肯只是普通指示牌" shape="sq" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>门票</span><span>818 CNY</span></div>
          <div className="br"><span>怪物猎人周边</span><span>187 CNY</span></div>
          <div className="br"><span>园区 Pizza</span><span>175 CNY</span></div>
          <div className="br"><span>USJ 纪念品</span><span>306 CNY</span></div>
          <div className="br"><span>Melon 星巴克 + 晚餐拉面</span><span>184 CNY</span></div>
          <div className="br total"><span>Day 2</span><span>1,670 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">京都白天：商店街与一碗鳗鱼饭</div>
            <div className="day-sub">Friday, April 12th · Shijō · Kawaramachi</div>
          </div>
          <div className="day-weather">🛍️</div>
        </div>

        <div className="jtxt">
          <p>电车到四条后，从 1 号口开始逛：始祖鸟旗舰店、京都友都八喜，再一路进河原町和新京极。拱顶商店街把人流、招牌和店铺压进一条长廊，计划里的品牌一个接一个出现，很容易失去时间感。</p>
          <p>午餐用鳗鱼饭补体力，木盒揭开时米饭和酱汁还冒着热气。Patagonia Kyoto 的货品很全，但独立店不能退税，也没有购物袋；这条实用信息，比“值得逛”三个字更应该留给下次。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="shinkyogoku-shopping-arcade-kyoto.jpg" alt="新京极拱顶商店街的人流和店铺招牌" caption="新京极的长廊，把一天的购物路线串起来" shape="ls" />
          <Photo file="grilled-eel-rice-bowl-meal.jpg" alt="木桶里的烤鳗鱼饭与配汤" caption="11,370 JPY 的鳗鱼饭，是下午继续走路的燃料" shape="ls" />
        </div>
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">京都夜里：东寺樱灯亮起</div>
            <div className="day-sub">Tō-ji · Night Blossoms</div>
          </div>
          <div className="day-weather">🌸</div>
        </div>

        <div className="jtxt">
          <p>白天手里都是购物袋，晚上抵达东寺后，注意力一下换了方向。五重塔被暖光从黑夜里托出来，樱花在前景里变成一层轻雾；水面、枝条和塔影互相叠着，确实是照片无法完全还原的“超级美”。</p>
          <p>路上经过木门茶屋、院落小社和大阪烧店的灯牌。它们不是计划里的大景点，却把京都从一张购物清单重新变回一座有人生活的城市。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="illuminated-pagoda-cherry-blossoms-night.jpg" alt="夜樱前方灯光照亮的东寺五重塔" caption="东寺夜樱：这张照片成了整趟关西的封面" shape="hero" />
        </div>
        <div className="pgrid g3 mt12">
          <Photo file="cherry-blossoms-around-temple-at-night.jpg" alt="黑夜里围绕寺院绽放的樱花" caption="樱花把寺院边缘一点点照亮" shape="sq" />
          <Photo file="illuminated-japanese-pagoda-night.jpg" alt="黑夜中独自被灯光照亮的五重塔" caption="拿掉前景，只剩塔与纯黑夜色" shape="sq" />
          <Photo file="traditional-japanese-teahouse-entrance.jpg" alt="绿树间带红色门帘的传统茶屋入口" caption="白天经过的木门茶屋，安静藏在绿意里" shape="sq" />
        </div>
        <div className="pgrid g3 mt12">
          <Photo file="japanese-garden-shrine-altar.jpg" alt="日式庭院石灯笼旁的小型神社供奉处" caption="石灯笼、纸灯与小小供奉处，把街角收得很静" shape="sq" />
          <Photo file="night-temple-selfie-japan.jpeg" alt="两个人与夜间点灯五重塔合影" caption="走了一整天，还是要和夜樱留下一张合影" shape="sq" />
          <Photo file="kyoto-okonomiyaki-restaurant-sign.jpg" alt="夜间大阪烧餐厅的日文灯牌" caption="从寺院走回街巷，灯牌把人重新拉回烟火气" shape="sq" />
        </div>
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">购物袋堆成京都战绩</div>
            <div className="day-sub">Arc&apos;teryx · Nanga · Snow Peak · Beams</div>
          </div>
          <div className="day-weather">🧾</div>
        </div>

        <div className="jtxt">
          <p>这天真正的主线仍然是买买买：外套、T 恤、鞋一路加入购物袋。夜樱负责把一天变得浪漫，账单则负责把现实一项项写清楚。</p>
        </div>

        <div className="pgrid g3 mt16">
          <Photo file="human-made-store-mirror.jpg" alt="两个人在 Human Made 店内镜面前合影" caption="Human Made 店里的镜面打卡" shape="sq" />
          <Photo file="two-people-by-cat-mural.jpeg" alt="两个人站在松树与猫壁画前合影" caption="购物间隙，遇见一面安静又有点古怪的猫墙" shape="sq" />
          <Photo file="cat-mural-under-pine-tree.jpg" alt="松树下卧着巨大猫咪的日式壁画" caption="把人移出画面后，才看清松树下那只巨猫" shape="sq" />
        </div>

        <div className="sgrid mt16">
          <div className="sc"><div className="sc-title">Arc&apos;teryx</div><div className="sc-sub">Solano Jacket M</div><div className="sc-price">2,122 CNY</div></div>
          <div className="sc"><div className="sc-title">Snow Peak</div><div className="sc-sub">外套 × 2</div><div className="sc-price">2,484 CNY</div></div>
          <div className="sc"><div className="sc-title">The North Face</div><div className="sc-sub">冲锋衣</div><div className="sc-price">1,452 CNY</div></div>
          <div className="sc"><div className="sc-title">ABC Mart</div><div className="sc-sub">Adidas 板鞋</div><div className="sc-price">466 CNY</div></div>
          <div className="sc"><div className="sc-title">Barbour</div><div className="sc-sub">Tee</div><div className="sc-price">466 CNY</div></div>
          <div className="sc"><div className="sc-title">Beams</div><div className="sc-sub">North Face Tee × 2</div><div className="sc-price">452 CNY</div></div>
          <div className="sc"><div className="sc-title">Bape</div><div className="sc-sub">Tee</div><div className="sc-price">431 CNY</div></div>
          <div className="sc"><div className="sc-title">Nanga</div><div className="sc-sub">Tee</div><div className="sc-price">250 CNY</div></div>
        </div>

        <div className="bill mt20">
          <div className="br total"><span>Day 3 当日小计</span><span>8,656 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">梅田：逛到晚上十点还没停</div>
            <div className="day-sub">Saturday, April 13th · Umeda</div>
          </div>
          <div className="day-weather">🏬</div>
        </div>

        <div className="jtxt">
          <p>午餐先吃饺子，随后在梅田把商场路线拉满：友都八喜买 G-Star 牛仔裤、保温杯和剃须刀，Lucua 看 Lululemon，再从户外石井一路逛回始祖鸟。阪神梅田站的蓝色招牌从白天看到夜里，22:00 还在店里，购物体力比预想中更持久。</p>
          <p>晚餐是现金支付的亲子鸡蛋拌饭，之后去 Taiyoo Massage 给双腿补偿。甜点 42 CNY，是这场长距离商场徒步最后的一点糖分。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="hanshin-railway-umeda-station-sign.jpg" alt="大阪城市建筑前的阪神电车梅田站蓝色招牌" caption="梅田的坐标：电车、百货与密集楼群" shape="ls" />
          <Photo file="the-north-face-store-display.jpg" alt="绿植围绕的 The North Face 店铺标志" caption="户外品牌继续接管购物清单" shape="ls" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>Arc&apos;teryx Solano Hoody M</span><span>2,541 CNY</span></div>
          <div className="br"><span>松下 9 系剃须刀</span><span>2,117 CNY</span></div>
          <div className="br"><span>Lululemon × 2</span><span>1,181 CNY</span></div>
          <div className="br"><span>保温杯 × 6</span><span>808 CNY</span></div>
          <div className="br"><span>G-Star Raw 牛仔裤</span><span>763 CNY</span></div>
          <div className="br total"><span>Day 4 当日小计</span><span>7,591 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div>
            <div className="day-title">宇治，把步速调慢</div>
            <div className="day-sub">Sunday, April 14th · Byōdō-in · Uji River</div>
          </div>
          <div className="day-weather">🍵</div>
        </div>

        <div className="jtxt">
          <p>从京阪宇治或 JR 宇治站出发，城市的音量明显低了下来。窄窄住宅街没有大阪的屏幕和京都商圈的人潮，只有灰白墙面、电线与远处的山。午餐现金吃猪排饭，然后沿平等院、宇治神社、宇治上神社一路走。</p>
          <p>宇治是那种会主动让人慢下来的地方。茶铺把抹茶气味送到街上，河水从树木和山坡之间摊开；长椅上的人低头读书，咖啡师在吧台后认真工作，这些安静画面反而比“打卡完成”更像这一天。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="narrow-japanese-residential-street.jpg" alt="宇治安静狭窄的日式住宅街" caption="离开车站后，街道先把声音降下来" />
          <Photo file="barista-behind-coffee-counter.jpg" alt="白衬衫咖啡师在木质吧台后制作饮品" caption="吧台后的动作很慢，正好配合宇治的节奏" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="person-reading-on-park-bench.jpg" alt="树影下一人坐在公园长椅阅读" caption="树下读书的人，像是这座城市给出的步速示范" shape="ls" />
          <Photo file="japanese-shrine-torii-gate.jpg" alt="树林深处通向宇治神社的红色鸟居" caption="红色鸟居藏在层层绿意之间" shape="ls" />
        </div>
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div>
            <div className="day-title">河边发呆，也算当天行程</div>
            <div className="day-sub">Uji River · Matcha Souvenirs · Kyoto Station</div>
          </div>
          <div className="day-weather">🌿</div>
        </div>

        <div className="jtxt">
          <p>走到河边后，没有再给时间塞进更多任务。堤坝、林木和远山在晴天里铺成几层绿色，两个人就站在水边留下一张合影。坐着发呆本身就是宇治的核心体验，不需要解释成“休息”。</p>
          <p>离开前买了抹茶伴手礼和“宇治老爷爷抹茶”，晚上回到京都站一带，顺路看东本愿寺与京都塔，再用回转寿司结束这段慢速日程。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="river-dam-and-wooded-hills.jpg" alt="宇治河堤坝与树林覆盖的山坡" caption="河水、堤坝和远山，把视野拉得很开" shape="hero" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="two-people-by-riverside.jpeg" alt="两个人在宇治河与青山前合影" caption="这一天最完整的纪念，是河边的一张普通合影" shape="ls" />
          <Photo file="japanese-temple-garden-pond.jpg" alt="平等院庭园水池与寺院建筑" caption="庭园水面把春日阳光完整接住" shape="ls" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>宇治抹茶伴手礼</span><span>331 CNY</span></div>
          <div className="br"><span>宇治老爷爷抹茶</span><span>156 CNY</span></div>
          <div className="br"><span>晚餐回转寿司</span><span>382 CNY</span></div>
          <div className="br total"><span>Day 5</span><span>869 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={12}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">6</span></div>
          <div>
            <div className="day-title">中崎町最后一走，再回家</div>
            <div className="day-sub">Monday, April 15th · Nakazakichō → KIX</div>
          </div>
          <div className="day-weather">✈️</div>
        </div>

        <div className="jtxt">
          <p>最后一天还是舍不得直接去机场。先到少彦名神社，午餐吃 Mos Burger，再去中崎町 City Walk。老木屋、狭窄门面和白色小咖啡馆夹在大阪现代办公楼之间，Neel Coffee 附近的街景像是城市临走前翻出的另一面。</p>
          <p>手里举着冰凉果饮走完最后一段路，随后回到大丸任天堂与 Pokémon 商店补货，在 Osaka Station 的 7-Eleven 买伴手礼，再冲松本清。机场拉面是最后一顿，21:30 的 HO1338 把我们送回浦东。</p>
        </div>

        <div className="pgrid g4 mt16">
          <Photo file="weathered-wooden-building-japan-street.jpg" alt="中崎町街角带手写招牌的旧木楼" caption="中崎町的旧木屋，让大阪忽然缩小成邻里街巷" shape="sq" />
          <Photo file="white-stucco-cafe-exterior-planter.jpg" alt="白色灰泥咖啡馆门口的植物与小窗" caption="白墙、植物和小窗，是 City Walk 里最轻的一角" shape="sq" />
          <Photo file="urban-office-building-street-traffic.jpg" alt="大阪现代办公楼与路口车流" caption="转过街角，旧街区又接回现代大阪" shape="sq" />
          <Photo file="holding-passionfruit-drinks-outdoors.jpg" alt="两只手在户外举着冰果饮碰杯" caption="临走前的最后一杯，边走边喝完" shape="sq" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>Mos Burger + 流量包</span><span>194 CNY</span></div>
          <div className="br"><span>7-Eleven 伴手礼</span><span>455 CNY</span></div>
          <div className="br"><span>松本清药妆</span><span>592 CNY</span></div>
          <div className="br"><span>动森水壶 + 机场拉面</span><span>390 CNY</span></div>
          <div className="br total"><span>Day 6</span><span>1,631 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={13}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>¥</span><span style={{ fontSize: 12 }}>TOTAL</span></div>
          <div>
            <div className="day-title">六天账单与带回家的东西</div>
            <div className="day-sub">Flights · Hotel · Cash · Shopping</div>
          </div>
        </div>

        <div className="jtxt">
          <p>这是一趟购物占比很高的旅行。出发前列下的 Lululemon、剃须刀和始祖鸟都打了勾，DJI Osmo Mobile 6 也已提前入手；Stone Island、Gentle Monster、梅子酒和柚子酒则继续留在清单上。</p>
          <p>总额沿用当时手账的记法：机酒、西瓜卡充值和现金兑换先记一笔，各日消费再逐项汇总。它是旅行结束时的个人账本，不是去重后的会计口径。</p>
        </div>

        <div className="bill mt20">
          <div className="br"><span>机票</span><span>3,744 CNY</span></div>
          <div className="br"><span>酒店</span><span>2,945 CNY</span></div>
          <div className="br"><span>西瓜卡 18,100 JPY</span><span>852 CNY</span></div>
          <div className="br"><span>现金 66,000 JPY</span><span>3,105 CNY</span></div>
          <div className="br"><span>六日消费与购物</span><span>20,446 CNY</span></div>
          <div className="br total"><span>全程记录</span><span>31,092 CNY</span></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">下次出发前照着做</div>
          <p>带信用卡和上次剩余日元，提前充西瓜卡；预订接送机并在线值机；御朱印本别忘；出发前填写 Visit Japan Web。去 USJ 另备 100 日元硬币和一次性雨衣。</p>
        </div>

        <div className="tags mt20">
          <span className="tag-red">USJ</span>
          <span className="tag-blue">京都夜樱</span>
          <span className="tag-green">宇治抹茶</span>
          <span className="tag-yellow">购物战绩</span>
        </div>
      </JournalCard>
    </div>
  );
}
