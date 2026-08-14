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

function JournalCard({
  page,
  children,
}: {
  page: number;
  children: ReactNode;
}) {
  return (
    <div className="card-wrap">
      <div className="card">
        {children}
        <div className="page-num">- {String(page).padStart(2, "0")} -</div>
      </div>
    </div>
  );
}

export default function FukuokaSoloZH() {
  return (
    <div className="fukuoka-solo-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>FUKUOKA<br />2026</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">☔ ⛩️ 🌊</div>
            <h1 className="cover-title">
              <span style={{ display: "block" }}>福冈，</span>
              <span style={{ display: "block" }}>一个人慢慢走</span>
            </h1>
            <div className="cover-subtitle">A Solo Travel Journal</div>
            <div className="cover-line" />
            <div className="cover-date">2026.06.03 — 06.07</div>
            <div className="cover-line" />
            <p
              style={{
                fontFamily: "var(--font-serif-cn)",
                fontSize: 17,
                color: "var(--ink-light)",
                fontStyle: "italic",
                lineHeight: 2.2,
                maxWidth: 460,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              「原来我不是害怕一个人，<br />只是没试过和自己好好相处。」
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">SOLO PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <JournalCard page={2}>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>🗺️</span>
            <span style={{ fontSize: 12 }}>ROUTE</span>
          </div>
          <div>
            <div className="day-title">计划写得很满，最后走得很松</div>
            <div className="day-sub">福冈市区 · 海边 · 太宰府 · 五天四晚</div>
          </div>
        </div>

        <div className="jtxt">
          <p>出发前的攻略里，有熊本新干线、福冈塔、百道海滨公园、糸岛和一长串必吃清单。真正落地之后，雨、睡眠和临时起意接管了路线。</p>
          <p>最后没有去熊本，也没有赶去糸岛。取而代之的是雨中的寺社、与一只奶牛猫长久对视、安静的海边和公园，以及很多一个人慢慢走、慢慢想的时间。</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">06.03</span><div className="ev">上海 → 福冈</div><div className="dt">Shin Shin、栉田神社、运河城与中洲夜行</div></div>
          <div className="tl-item"><span className="tm">06.04</span><div className="ev">雨中的寺社与天神</div><div className="dt">取消公园和海滨计划，改成御朱印与购物日</div></div>
          <div className="tl-item"><span className="tm">06.05</span><div className="ev">取消熊本，临时去海边</div><div className="dt">运河城、海边、大濠公园、福冈城迹、沾面与暴走</div></div>
          <div className="tl-item"><span className="tm">06.06</span><div className="ev">太宰府与灶门神社</div><div className="dt">天满宫、九州国立博物馆、山间神社和牛肠锅</div></div>
          <div className="tl-item"><span className="tm">06.07</span><div className="ev">福冈 → 上海</div><div className="dt">机场公交、免税店与云层上的告别</div></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">这趟旅行的节奏</div>
          <p>不用赶，不用等谁。几点起、去哪里、吃什么、要不要绕路，全都只对自己负责。</p>
        </div>
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">彻底自然醒，再慢慢出发</div>
            <div className="day-sub">Wednesday, June 3rd · Shanghai ✈️ Fukuoka</div>
          </div>
          <div className="day-weather">🌦️</div>
        </div>

        <div className="jtxt">
          <p>前一天运动过度，夜里也没睡踏实。早上醒来先迷迷糊糊刷了刷 Microsoft Build 的新闻，十点多才从家出门。打车 40 元到景洪路市域机场线站，车几乎刚好进站，二十几分钟便到了浦东机场。</p>
          <p>11:45 已经坐进 170 号贵宾室。热菜、沙拉、点心、水果比预想中丰盛，吃完还顺手拿了水、三明治和咖啡。福冈的行程没细想，一个人嘛，到了再说。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="01-airport-lounge-meal.jpeg" alt="浦东机场贵宾室窗边的餐食" caption="170 号贵宾室：出发前先慢慢吃一顿" />
          <Photo file="02-fukuoka-airport-arrival.jpeg" alt="抵达福冈时窗外的跑道与天空" caption="飞行 1 小时 18 分，窗外已经是福冈" />
        </div>

        <div className="jtxt mt16">
          <p>原定 1:50 起飞，2:00 才推出去，本以为又要延误，结果飞行只用了 1 小时 18 分。福冈机场很小，却干净得让人印象深刻。刚下过雨，空气清凉，从到达、取行李到出海关不到半小时。</p>
          <p>我搭 shuttle bus 从国际站绕到国内站，再转地铁去酒店。后来才发现，国际航站楼直达博多站的公交其实更方便。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="03-the-b-hakata-room.jpeg" alt="The B 博多站酒店房间里的镜面自拍" caption="The B 博多站：房间很小，一个人住刚刚好" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">🏨 The B 博多站</div>
          <p>典型的日本小房间，四五百元一晚，比淡季大阪还贵一些。把从机场带来的蛋挞、三明治和小面包吃掉，躺下休息，等窗外的雨变小。</p>
        </div>
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">拉面、神社与夜里的河</div>
            <div className="day-sub">Hakata · Kushida Shrine · Canal City · Nakasu</div>
          </div>
          <div className="day-weather">🌙</div>
        </div>

        <div className="jtxt">
          <p>傍晚雨小了，步行十分钟到博多站 0101 商场地下一层吃 Shin Shin。汤底浓郁，细面选了最硬的一档，口感特别好；汤浓却不齁咸、不腻，我很喜欢。第一次试着用日语点餐，前面都很顺，说到面条粗细时突然卡壳，只好笑场。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="04-shin-shin-order-ticket.jpeg" alt="Shin Shin 拉面的点餐券" caption="日语点餐一路顺利，直到面条硬度" shape="ls" />
          <Photo file="05-shin-shin-ramen.jpeg" alt="Shin Shin 的博多豚骨拉面" caption="浓汤、细面、最硬口感：第一餐就很满意" shape="ls" />
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="06-hakata-station-night.jpeg" alt="夜晚灯光下的博多站" caption="晚上七点多，从博多站开始散步" />
          <Photo file="07-hakata-marui-night.jpeg" alt="夜晚亮灯的博多 0101 商场" caption="商场的灯光把雨夜照得很热闹" />
        </div>

        <div className="jtxt mt16">
          <p>从博多站走二十分钟到栉田神社。夜里的参道很静，我已经决定第二天白天再来写御朱印。再绕去运河城，河边的屋台一个个亮着灯。没有坐下来吃，但看着大家挤在小摊前，觉得沿河吃饭应该很惬意。</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="08-kushida-shrine-approach-night.jpeg" alt="夜晚的栉田神社参道" caption="夜里的参道，安静得像另一座城市" />
          <Photo file="09-kushida-shrine-night.jpeg" alt="夜晚灯笼下的栉田神社" caption="先在夜里见一面，明天再回来写御朱印" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">第一晚的收尾</div>
          <p>和宝子打着电话，从中洲慢慢走回博多。一个多小时的路，因为有人在电话那头陪着，一点也不累。上楼前照例逛便利店：茶、小冰淇淋、明治黑巧克力。拉面、神社、运河、屋台、便利店，一个人走得很慢，但很舒服。</p>
        </div>
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">雨中的神社，与一只猫对视</div>
            <div className="day-sub">Kushida Shrine · Tochoji · Mangyoji · Kego Shrine</div>
          </div>
          <div className="day-weather">☔</div>
        </div>

        <div className="jtxt">
          <p>九点多自然醒，精神很好，却还是有一点第一次正式独自出门的小忐忑。沿着昨晚的路线回到栉田神社，写下这趟旅行的第一枚御朱印。垫纸上也细心盖了章，很好看。十点多，雨又开始下。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="10-tenjin-shop-display.jpeg" alt="福冈街头店铺里的食物陈列" caption="雨天出门，先从街边的日常开始" />
          <Photo file="11-tochoji-pagoda.png" alt="东长寺红色五重塔" caption="东长寺的五重塔，在阴雨天里仍然很亮" />
        </div>

        <div className="jtxt mt16">
          <p>东长寺占地不大，看点却很集中。相传这是空海从大唐归国后创建的第一所真言宗寺院。福冈大佛是一座约 16.1 米高的木制释迦佛坐像，另有全桧木五重塔和国家重要文化财木造千手观音立像。御朱印旁还夹了一张大佛画像明信片，可惜正中的佛堂没能进去。</p>
          <p>为了继续找能写御朱印的地方，我往天神方向走。十二点多路过万行寺，雨越下越大，就绕进去避一避。寺务所窗口旁趴着一只奶牛猫，它一直看着我，我也看着它。伞面上的雨声不断，那一刻却像冥冥中有种缘分。</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="12-mangyoji-temple-cat.png" alt="万行寺寺务所窗边的奶牛猫" caption="雨里的意外收获：和奶牛猫对视了很久" />
          <Photo file="13-tenjin-rainy-street.webp" alt="雨天的天神街道与路口" caption="坐一站地铁，终于进入热闹的天神" />
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="14-kego-shrine.webp" alt="夹在城市建筑之间的警固神社" caption="警固神社与警固公园相连，闹中取静" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">御朱印小乌龙</div>
          <p>寺务所摆了四种警固神社的御朱印。我以为文字也不同，一下写了两个；好在图案确实不一样，也算误打误撞留下了两页记忆。</p>
        </div>
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">大雨把行程改成了购物日</div>
            <div className="day-sub">Tenjin Underground Mall · One Fukuoka · Musashi</div>
          </div>
          <div className="day-weather">🌧️</div>
        </div>

        <div className="jtxt">
          <p>原本要去大濠公园、福冈美术馆、福冈城迹、福冈塔和百道海滨公园。雨越下越大，只能全部取消。穿过天神地下街，先逛 Patagonia；不免税，看中的几件衣服也就放下了。</p>
        </div>

        <div className="pgrid g3 mt16">
          <Photo file="15-tenjin-green-installation.webp" alt="天神商场前的绿色艺术装置" caption="阴雨天里的一团亮绿" />
          <Photo file="16-kego-park.webp" alt="雨后的警固公园与树木" caption="神社外就是城市公园" />
          <Photo file="17-one-fukuoka-building.webp" alt="One Fukuoka 大楼外观" caption="One Fukuoka 里买到丑萌又舒服的 KEEN" />
        </div>

        <div className="jtxt mt16">
          <p>One Fukuoka 倒有收获：一双 15,000 多日元的 KEEN，丑萌丑萌，穿着特别舒服。下午又去 Super Sports 找羽毛球拍，想要的款式全部售罄。路过三越楼上的 Daiso，想到晚上要写手帐，买了一把小剪刀。</p>
          <p>五六点决定吃顿好的，选了警固公园旁的武藏。六点左右到，排到七点半才吃上。木桶米饭铺满三分熟和牛，旁边放着滚烫铁块，可以自己把肉烤到喜欢的程度。</p>
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="18-musashi-wagyu-bowl.webp" alt="武藏和牛店的木桶和牛饭与热铁块" caption="原味、铁块炙烤、最后茶泡饭：三种吃法收尾" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">武藏和牛饭</div>
          <p>福冈本地盐味调料和脆蒜片很香。最后把热茶倒进米饭，做成茶泡饭，整个人都暖起来。唯一的代价是排队太久，吃完已经八点多。</p>
        </div>

        <div className="jtxt mt16">
          <p>九点多回酒店整理手帐，十点下楼和宝子打电话聊到十一点。再泡个澡，本来想缓解走路的酸痛，结果躺下反而睡不着，翻来覆去到两点多。一个人很轻松、很自在，但也要清楚自己想做什么，更别害怕孤独。</p>
        </div>
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">没有去熊本，去了一个小小的海边</div>
            <div className="day-sub">Canal City · Seaside · Ohori Park · Fukuoka Castle Ruins</div>
          </div>
          <div className="day-weather">🌤️</div>
        </div>

        <div className="jtxt">
          <p>第三天睡到十一二点，磨磨蹭蹭一点多才出门。便利店买一个小饭团，再薅一杯酒店咖啡。第一站还是运河城，本想买羽毛球拍，结果一人只能买一把，于是把机会让给同事，自己想要的那把没买成。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="19-canal-city-daytime.webp" alt="白天红色建筑环绕的博多运河城" caption="白天再看运河城，红色建筑与水面都很醒目" shape="hero" />
        </div>

        <div className="jtxt mt16">
          <p>下午两点多，临时决定去一个地图上似乎叫“松园之地”的小海边。名字记得并不确定，只记得那里一边是森林，一边是大海。我沿着路散了很久，也给同事打了个电话，听了一耳朵公司最近的八卦。</p>
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="20-seaside-torii.webp" alt="海边松树与面向沙滩的鸟居" caption="森林尽头的鸟居，另一边就是海" />
          <Photo file="21-seaside-pine-path.webp" alt="海边松林中的长路" caption="松林里的路，安静得只剩脚步声" />
          <Photo file="22-seaside-coast-path.webp" alt="树影下通向海岸的小路" caption="一边树影，一边露出海的蓝" />
        </div>

        <div className="jtxt mt16">
          <p>离开海边又去了大濠公园。城市中心的公园异常安静。地图上看到旁边有天守阁标记，顺路走过去，才发现没有天守，只剩福冈城迹。今天一直在公园、森林和海边转，身体和心都松了下来。</p>
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="23-ohori-park-bench.webp" alt="大濠公园树下的空长椅" caption="树下的空长椅，很适合什么都不做" />
          <Photo file="24-fukuoka-castle-ruins-sign.webp" alt="福冈城迹公园中的木牌与树木" caption="循着地图上的天守标记走来，只见遗址" />
          <Photo file="25-fukuoka-castle-ruins-park.webp" alt="福冈城迹附近被阳光照亮的绿树" caption="没有天守，却有一大片安静的绿色" />
        </div>
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">牛肠锅歇业，转身吃超大份沾面</div>
            <div className="day-sub">Downtown Fukuoka · Tenjin · Walk Back to Hakata</div>
          </div>
          <div className="day-weather">🍜</div>
        </div>

        <div className="jtxt">
          <p>傍晚六点多，中午没正经吃饭，肚子开始抗议。从安静的公园坐公交十分钟，一头扎进繁华市中心。先找那家很有名的牛肠锅，到了才发现长期歇业。站在门口犹豫半天，又一路走到天神，最后排进千虎拉面。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="26-senko-tsukemen-entrance.webp" alt="千虎沾面店门口的招牌" caption="牛肠锅扑空之后，临时改吃千虎" />
          <Photo file="27-senko-tsukemen.webp" alt="千虎拉面的超大份沾面与配菜" caption="高估了自己的饭量，还是硬着头皮吃完" />
        </div>

        <div className="jtxt mt16">
          <p>这家沾面非常好吃，可我以为自己能吃很多，点了超大份才发现根本吃不下。在日本剩食物总觉得会引来目光，只好硬着头皮全部吃完。八点多离店，撑得不行，干脆从天神走回酒店。</p>
          <p>又给宝子打着电话，磨磨蹭蹭走了一个半小时，十点多才到。第三天没有太多计划：公园、海边、遗址、拉面、暴走。一个人临时起意，也挺好。</p>
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="28-seven-eleven-night.webp" alt="夜晚街角亮着的 7-Eleven 招牌" caption="一个半小时的夜路，便利店像熟悉的路标" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">原计划：熊本一日往返</div>
          <p>本来要从博多坐 JR 九州新干线去熊本，单程 33–50 分钟、¥5,230；攻略里还记了 WEB 早特 3 往返约 ¥6,000–7,000，以及北九州周游券 3 日 ¥10,000。路线是熊本城 → 樱之马场城彩苑 → 水前寺成趣园 → 上下通商店街 → KUMAMON SQUARE，想吃太平燕、马肉、いきなり団子和辛子莲藕。最后一项都没执行，整天留给了福冈的绿色。</p>
        </div>
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">从天神坐上西铁，去太宰府</div>
            <div className="day-sub">Hakata · Nishitetsu · Dazaifu Tenmangu</div>
          </div>
          <div className="day-weather">☀️</div>
        </div>

        <div className="jtxt">
          <p>第四天继续睡懒觉，十二点多才出门。照例带走酒店一杯咖啡，在博多站买了三个小面包。福冈的面包好吃又不贵，平均一两百日元一个。坐两站地铁到天神，再转西铁去太宰府。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="29-hakata-station-bakery.webp" alt="博多站面包店的夏季面包海报" caption="出发前先在博多站挑面包" />
          <Photo file="30-hakata-station-bread.webp" alt="手里拿着太宰府主题包装的小面包" caption="一两百日元一个，便宜又好吃" />
        </div>

        <div className="jtxt mt16">
          <p>西铁的全称是西日本铁道。它从 1908 年的九州电气轨道一路发展而来，电车、巴士、酒店、商场、物流都做，是福冈生活里绕不开的存在。经典黑、红、白配色的车厢，从热闹的天神一头扎进太宰府的怀旧气息。</p>
          <p>太宰府站外就是长长的表参道。天气格外明亮，两边全是伴手礼、小物和小吃。走进天满宫，先是小桥流水和庭院，再穿过人群到神社主体。正殿正在修缮，被围挡遮住，好在御朱印照常写。</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="31-dazaifu-tenmangu-approach.webp" alt="太宰府天满宫入口的石鸟居与参道" caption="阳光下的太宰府，旅行感一下子变浓" />
          <Photo file="32-dazaifu-tenmangu-pond.webp" alt="太宰府天满宫庭院池塘与树木" caption="穿过小桥流水，再往神社深处走" />
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="33-dazaifu-goshuin.webp" alt="手持太宰府天满宫御朱印" caption="写好御朱印，在旁边的小园林里坐了一会" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">原计划 A / B，最后拼成了 C</div>
          <p>A 是太宰府加糸岛，B 是博多与天神购物。实际没有去糸岛，却在太宰府加上九州国立博物馆和灶门神社，回博多后再完成购物，意外把两个方案拼在了一起。</p>
        </div>
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>🏛️</span>
            <span style={{ fontSize: 12 }}>MUSEUM</span>
          </div>
          <div>
            <div className="day-title">从九州看东亚文明如何往来</div>
            <div className="day-sub">Kyushu National Museum · Cultural Exchange Exhibition</div>
          </div>
        </div>

        <div className="pgrid g1">
          <Photo file="34-kyushu-national-museum.webp" alt="蓝天下曲线屋顶的九州国立博物馆" caption="玻璃幕墙映着青山，屋顶像起伏的山脉" shape="hero" />
        </div>

        <div className="jtxt mt16">
          <p>从天满宫穿过一条很长的通道，就到了九州国立博物馆。它是继东京、京都、奈良之后，日本第四家国立博物馆，主题是“从亚洲历史的观点看日本文化的形成”。站在九州理解中国、朝鲜半岛与日本之间的文化流动，这个视角很特别。</p>
          <p>约 4,000 平方米的文化交流展，从旧石器时代讲到江户时代。中国造像、朝鲜瓷器和日本国宝并列出现，像在读一部立体的东亚交流史。门票 700 日元，不算便宜，但我觉得值得。</p>
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="35-kyushu-national-museum-ticket.webp" alt="手持九州国立博物馆门票" caption="700 日元的常设展门票" />
          <Photo file="36-museum-textile.webp" alt="九州国立博物馆展出的传统织物服饰" caption="展柜里的织物纹样" />
          <Photo file="37-museum-exhibit.webp" alt="九州国立博物馆中的人物展品" caption="在东亚文明的往来里找具体的人与物" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">这次错过的角落</div>
          <p>一楼有免费的“あじっぱ（Asiapa）”亚洲文化体验区，可以摸民族服饰、玩传统乐器。我只顾着在常设展里找文物，最后错过了。博物馆商店也忍住没买，只拿了一大摞精美小册子留念。</p>
        </div>
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">山里的灶门神社</div>
            <div className="day-sub">Homangu Kamado Shrine · Afternoon Light</div>
          </div>
          <div className="day-weather">🌿</div>
        </div>

        <div className="jtxt">
          <p>从太宰府站坐观光小巴上山，十几分钟到宝满宫灶门神社。因为与《鬼灭之刃》主角同姓，加上作者吾峠呼世晴也是福冈人，这里成了粉丝圣地。神社原本供奉结缘之神玉依姫命，也位于古代太宰府政厅的“鬼门”方向，驱厄传说与斩鬼故事恰好重叠。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="38-kamado-shrine-selfie.webp" alt="宝满宫灶门神社树林里的自拍" caption="一个人走到山里，也认真留下一张自己" />
          <Photo file="39-kamado-shrine-approach.webp" alt="宝满宫灶门神社林间参道" caption="阳光穿过树梢，山路幽静又有灵气" />
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="40-kamado-shrine-garden.webp" alt="宝满宫灶门神社的草地与树林" caption="山脚的一片绿" />
          <Photo file="41-kamado-shrine-path.webp" alt="宝满宫灶门神社通往树林深处的道路" caption="继续往前，就是更长的登山路" />
          <Photo file="42-kamado-shrine-hall.webp" alt="宝满宫灶门神社的木造社殿" caption="木头在下午阳光里被照得透亮" />
        </div>

        <div className="jtxt mt16">
          <p>这里的御朱印很漂亮，还有登到宝满山上宫后才能写的特别版。据说从山脚单程约两小时。今天实在没了那个精力，只好给自己找个理由：明年枫叶季再来登顶补写。</p>
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="43-kamado-shrine-goshuin.webp" alt="手持宝满宫灶门神社御朱印与印章页" caption="没登顶，也把山脚的这一页好好收进手帐" shape="hero" />
        </div>
      </JournalCard>

      <JournalCard page={12}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">梅饼、购物与终于吃上的牛肠锅</div>
            <div className="day-sub">Dazaifu → Hakata · Hankyu · AMU · Maedaya</div>
          </div>
          <div className="day-weather">🛍️</div>
        </div>

        <div className="jtxt">
          <p>回到太宰府站附近，买到现烤梅ヶ枝餅。烫得手指发红，还是忍不住先咬一口：外皮酥脆，红豆馅绵密。它因天满宫供奉的菅原道真与梅花的故事而得名，是参道上最经典的小吃。</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="44-umegae-mochi.webp" alt="太宰府站前手持现烤梅枝饼" caption="手指被烫红，也要趁热先咬一口" />
          <Photo file="45-hakata-station-ice-cream.webp" alt="手持奶味浓郁的香草冰淇淋" caption="回到博多，跟着排队人群又买了冰淇淋" />
        </div>

        <div className="jtxt mt16">
          <p>这次试了太宰府直达博多的大巴，不到四十分钟。傍晚六点多，先从阪急一楼开始购物：Kanebo 洗面奶、FAS 精华、Shiro 喷雾；再到相连的 AMU，在 Muji 给宝子买到心心念念的保冷杯。八点多又赶去友都八喜，买了一件始祖鸟 T 恤。</p>
          <p>九点多终于饿了。前两天没吃成的牛肠锅，在酒店附近有一家前田屋分店。十点多到还要排一会，点了辣味锅。牛肠本身太肥，不算喜欢，但锅底、福冈煮蔬菜和米饭搭在一起很香。</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="46-maedaya-entrance.webp" alt="前田屋牛肠锅餐厅入口" caption="晚上十点多，终于排上牛肠锅" />
          <Photo file="47-maedaya-motsunabe.webp" alt="前田屋辣味牛肠锅" caption="牛肠太肥，辣味汤底和蔬菜却很美味" />
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="48-maedaya-sign.webp" alt="前田屋餐厅的博多牛肠锅招牌" caption="前田屋：把前两天的遗憾补上" />
          <Photo file="49-maedaya-finale.webp" alt="牛肠锅、米饭与饮品组成的夜宵" caption="配着米饭一口接一口，吃完已是十一点多" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">最后一晚</div>
          <p>走回酒店的路上突然生出一丝不舍。太宰府的风、天满宫的学、灶门神社的缘，还有梅饼的热度都粘在舌尖上。不想道别，却已经在想下一次。</p>
        </div>
      </JournalCard>

      <JournalCard page={13}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div>
            <div className="day-title">机场太近，连告别都从容</div>
            <div className="day-sub">Sunday, June 7th · Fukuoka ✈️ Shanghai</div>
          </div>
          <div className="day-weather">✈️</div>
        </div>

        <div className="jtxt">
          <p>飞机 11:55 起飞，我却睡到 8:45 才起。福冈机场离市中心实在太近，让人忍不住懒散。回程特意从博多站坐机场公交，二十几分钟直达国际航站楼；不到十点已经办完托运、过完安检，顺遂得像熟门熟路的日常。</p>
          <p>安检后的时间全部献给免税店。先买到宝子惦记的 THE GINZA Hybrid Gel Oil，600 多元；酒水区刚好补货，白州、山崎都有。那瓶 60,000 多日元的山崎看了很久，最终没舍得，改拿了一瓶白州 12 年。</p>
          <p>十一点多，匆匆从 7-Eleven 拿了三明治和饭团，把口袋里的硬币全倒进自动售货机换一瓶大麦茶。接近中午起飞，按中国时间十二点半左右落地上海。</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="50-flight-home.webp" alt="返程飞机机翼与云层" caption="云层上的最后一张照片：福冈，下一次见" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">原计划 vs. 实际</div>
          <p>原本打算退房寄存行李、去博多 1 番街吃最后一碗拉面，再逛 AMU 和阪急，9:30 前坐地铁去机场。最后这些都没做：直接搭公交，购物也全部留到机场。</p>
        </div>
      </JournalCard>

      <JournalCard page={14}>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>🛍️</span>
            <span style={{ fontSize: 12 }}>SHOP</span>
          </div>
          <div>
            <div className="day-title">实际购物记录</div>
            <div className="day-sub">给自己，也给想念的人带回一点福冈</div>
          </div>
        </div>

        <div className="bill">
          <h4>购物明细（日元）</h4>
          <div className="br"><span>KEEN 鞋子</span><span>¥15,864</span></div>
          <div className="br"><span>YONEX NF700 Pro 5U5</span><span>¥31,617</span></div>
          <div className="br"><span>Kanebo Refreshing Creamy Wash</span><span>¥2,926</span></div>
          <div className="br"><span>Shiro Yuzu Face Mist</span><span>¥5,225</span></div>
          <div className="br"><span>FAS Serum</span><span>¥11,495</span></div>
          <div className="br"><span>MUJI 保冷杯</span><span>¥2,990</span></div>
          <div className="br"><span>博多车站伴手礼</span><span>¥5,668</span></div>
          <div className="br"><span>Arc&apos;teryx T-shirt</span><span>¥12,000</span></div>
          <div className="br"><span>THE GINZA Hybrid Gel Oil</span><span>¥14,250</span></div>
          <div className="br"><span>白州</span><span>¥19,000</span></div>
          <div className="br total"><span>手帐记录总计</span><span>¥89,418 / RMB ¥3,794</span></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">关于这笔总计</div>
          <p>这里保留手帐原文记录的总额，不用条目重新计算。羽毛球拍最终让给同事，购物里也混着给宝子的礼物；这张账单更像旅行记忆清单，不是财务报表。</p>
        </div>

        <div className="rbox mt20">
          <h4>这次真的喜欢</h4>
          <div className="ri"><span className="nm">Shin Shin</span><span className="cm">浓汤细面，却不咸不腻</span></div>
          <div className="ri"><span className="nm">武藏和牛饭</span><span className="cm">三种吃法很有趣，茶泡饭收尾舒服</span></div>
          <div className="ri"><span className="nm">千虎沾面</span><span className="cm">非常好吃，只怪自己点得太大份</span></div>
          <div className="ri"><span className="nm">梅ヶ枝餅</span><span className="cm">一定要趁热，酥皮和红豆馅都很满足</span></div>
        </div>

        <div className="rbox warn mt16">
          <h4>诚实的失望</h4>
          <div className="ri"><span className="nm">牛肠本身</span><span className="cm">太肥，不是我的口味；锅底和蔬菜反而更好吃</span></div>
          <div className="ri"><span className="nm">羽毛球拍</span><span className="cm">想要的型号售罄，后来又把限购的一把让给同事</span></div>
          <div className="ri"><span className="nm">天气</span><span className="cm">大雨取消了大濠公园、福冈美术馆与海滨计划</span></div>
        </div>
      </JournalCard>

      <JournalCard page={15}>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>📋</span>
            <span style={{ fontSize: 12 }}>PLAN</span>
          </div>
          <div>
            <div className="day-title">攻略留在这里，旅程已经走向别处</div>
            <div className="day-sub">没执行的清单，也记录了出发前的期待</div>
          </div>
        </div>

        <div className="jtxt">
          <p>最初的必吃清单里还有一兰、一风堂、daruma、水炊き华味鸟、屋台烤鸡串、明太子，以及熊本的红兰亭太平燕和菅乃屋马肉。真正吃到的远没有这么多，却也没有遗憾——旅行不是完成表格。</p>
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">原预算（不含机票）</div>
          <p>住宿 ¥8,000–15,000 / 晚，四晚约 ¥40,000–60,000；餐饮五天约 ¥25,000–40,000；市内交通 ¥3,000，加熊本往返原估 ¥7,000；门票与杂费 ¥5,000–8,000。攻略合计约 ¥80,000–120,000，人民币约 4,000–6,000，购物另算。</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">天气</span><div className="ev">梅雨季前后，20–27°C</div><div className="dt">折叠伞与薄外套本来就该带，可惜伞没有在 checklist 里勾上</div></div>
          <div className="tl-item"><span className="tm">支付</span><div className="ev">现金 + IC 卡 + 信用卡</div><div className="dt">单店满 ¥5,000 留意 Tax Free 标志</div></div>
          <div className="tl-item"><span className="tm">交通</span><div className="ev">Google Maps、Navitime、JR 九州、Yahoo 乘换案内</div><div className="dt">福冈机场国际航站楼往返博多，公交比 shuttle bus 转地铁省事</div></div>
          <div className="tl-item"><span className="tm">应急</span><div className="ev">警察 110 · 急救 119</div><div className="dt">中国驻福冈总领馆：+81-92-713-1121</div></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">出发前 checklist</div>
          <p>护照签证、机票酒店确认、现金与信用卡、IC 卡、eSIM、充电宝都带了；JR 周游券、熊本早特、折叠伞与常用药没有准备。最后没去熊本，前两项也就自然失效。</p>
        </div>
      </JournalCard>

      <JournalCard page={16}>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>💭</span>
            <span style={{ fontSize: 12 }}>EPILOGUE</span>
          </div>
          <div>
            <div className="day-title">旅程结束，有些东西才刚开始</div>
            <div className="day-sub">On learning to enjoy my own company</div>
          </div>
        </div>

        <div className="jtxt">
          <p>回程飞机上，我翻着这几天攒下的御朱印：栉田神社的章像还带着那天早晨的雨气，东长寺夹着福冈大佛明信片，警固神社多写一页的小乌龙仍在纸间笑。</p>
          <p>一个人出门最奇妙的地方，是从头到尾只对自己负责。几点起、去哪里、吃什么、要不要绕路、累不累，全由自己说了算。</p>
          <p>曾经以为独自旅行是孤独的。走过下雨的博多街头，独自坐在蓝瓶外看雨，在万行寺和一只猫对视，在天满宫的小园林发呆，我才发现：这些毫无“产出”的时间，恰恰是最动人的部分。</p>
          <p>原来我不是害怕一个人，只是没试过和自己好好相处。旅行也不只是风景、美食和打卡，更是在陌生城市里，看见那个脱离熟悉环境、没有人来定义的自己。</p>
          <p>福冈小小的机场，刚来时觉得它小，离开时却觉得小得恰到好处。城市也一样，小到让人安心，小到刚记住几条街的名字，就要说再见。</p>
        </div>

        <div className="dv mt24 mb16"><span>🌊</span></div>

        <div className="hwcn" style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
          <p>一个人也可以把生活过得很充实，</p>
          <p>不必等别人来填满。</p>
          <p style={{ marginTop: 16 }}>窗外多云，飞机平稳穿过云层。</p>
          <p>神社、拉面、雨声、便利店和茶泡饭，</p>
          <p>都被轻轻收进行李箱。</p>
        </div>

        <div className="tags mt24">
          <span className="tag tag-c">#福冈独旅</span>
          <span className="tag tag-t">#一个人旅行</span>
          <span className="tag tag-g">#御朱印</span>
          <span className="tag tag-b">#太宰府</span>
          <span className="tag tag-p">#与自己相处</span>
        </div>

        <div style={{ marginTop: 34, textAlign: "center" }}>
          <span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2026.06</span>
        </div>
      </JournalCard>
    </div>
  );
}
