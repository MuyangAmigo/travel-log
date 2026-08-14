import CardScaleController from "@/components/CardScaleController";
import { img } from "./meta";

export default function ShaoxingZH() {
  return (
    <div className="shaoxing-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card">
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>SHAOXING<br />2025</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🛶 绍兴周末日记</div>
            <h1 className="cover-title">水巷墨香</h1>
            <div className="cover-subtitle">Canals and Ink</div>
            <div className="cover-date">2025.03.28 — 03.30</div>
            <p>高铁一小时，从上海钻进绍兴的水巷、旧宅与竹林，也走进那些从课本里认识了很多年的名字。</p>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">0</span></div>
            <div>
              <div className="day-title">周五夜里，先抵达江南</div>
              <div className="day-sub">上海虹桥 → 绍兴北站 · 云朵酒店</div>
            </div>
            <div className="day-weather">🚄</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc">
              <img src={img("traditional-water-town-mural.jpeg")} alt="描绘绍兴水乡街巷的水墨壁画" className="hero" />
              <div className="cap">白墙、黛瓦、水巷——旅程先从一幅江南画面开始</div>
            </div>
          </div>

          <div className="jtxt mt16">
            <p>周五晚上从上海虹桥出发，20:22 上车，21:39 就到了绍兴北站。一个多小时的高铁，把工作日和周末切得干干净净。</p>
            <p>住在塔山街道中兴南路 183 号的云朵酒店。从北站打车大约 31 分钟、35 元；不赶时间也可以坐 BRT1 号线，约 54 分钟。放下行李，第二天就从鲁迅故里开始。</p>
          </div>

          <div className="tlwrap mt20">
            <div className="tl-item"><span className="tm">20:22</span><div className="ev">上海虹桥出发</div><div className="dt">一小时出头的周末逃离</div></div>
            <div className="tl-item"><span className="tm">21:39</span><div className="ev">抵达绍兴北站</div><div className="dt">打车约 35 元 / 31 分钟，或乘 BRT1 号线约 54 分钟</div></div>
            <div className="tl-item"><span className="tm">夜里</span><div className="ev">入住云朵酒店</div><div className="dt">塔山街道中兴南路 183 号</div></div>
          </div>
          <div className="page-num">- 02 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">课本里的地方，突然立体了</div>
              <div className="day-sub">三味书屋 · 百草园 · 鲁迅故居</div>
            </div>
            <div className="day-weather">📚</div>
          </div>

          <div className="pgrid g12">
            <div className="pf fc">
              <img src={img("traditional-canal-boats-alley.jpeg")} alt="绍兴窄河道里依次驶过的乌篷船" className="pt" />
              <div className="cap">窄窄水巷里，乌篷船一艘接一艘</div>
            </div>
            <div className="pgrid g1">
              <div className="pf fw">
                <img src={img("hand-adjusting-world-map-art.jpeg")} alt="鲁迅故里街区里的互动艺术装置" className="sq" />
                <div className="cap">旧街里的小巧思</div>
              </div>
              <div className="pf fn">
                <img src={img("person-posing-with-blue-statue.jpeg")} alt="游客在鲁迅故里蓝衣人物雕塑旁留影" className="sq" />
                <div className="cap">和蓝衣人物雕塑留一张纪念照</div>
              </div>
            </div>
          </div>

          <div className="jtxt mt16">
            <p>三味书屋、百草园、鲁迅故居，一个个只在课文里读过的名字，沿着老街真正连在了一起。走进去以后，课本里的地方突然变得立体起来。</p>
            <p>百草园比想象中小，但三味书屋还是那个味儿。街巷旁有窄窄的河道，乌篷船贴着白墙与石阶慢慢经过，这就是绍兴最具体的一面。</p>
          </div>

          <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">📖</div><div className="lb">三味书屋</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌿</div><div className="lb">百草园</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏠</div><div className="lb">鲁迅故居</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🥢</div><div className="lb">绍兴味道</div></div>
          </div>
          <div className="page-num">- 03 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">晚餐，把一桌绍兴味道摆满</div>
              <div className="day-sub">绍兴味道 · 周六晚餐</div>
            </div>
            <div className="day-weather">🥢</div>
          </div>

          <div className="jtxt">
            <p>逛完鲁迅故里，晚餐就在「绍兴味道」坐下来。菌菇、豆腐、海鲜、蒸糕和包子摆满一桌，也让走了一天的周六慢慢收尾。</p>
          </div>

          <div className="pgrid g3 mt16">
            <div className="pf fw"><img src={img("mushroom-tofu-chicken-stirfry.jpeg")} alt="菌菇豆腐鸡肉小炒" className="sq" /><div className="cap">菌菇豆腐鸡肉</div></div>
            <div className="pf fn"><img src={img("spicy-seafood-hot-pot.jpeg")} alt="红汤海鲜锅" className="sq" /><div className="cap">热辣海鲜锅</div></div>
            <div className="pf fc"><img src={img("steamed-square-rice-cakes.jpeg")} alt="方形蒸糕" className="sq" /><div className="cap">软糯蒸糕</div></div>
            <div className="pf fs"><img src={img("creamy-vegetable-seafood-soup.jpeg")} alt="蔬菜海鲜浓汤" className="sq" /><div className="cap">蔬菜海鲜浓汤</div></div>
            <div className="pf fw"><img src={img("char-siu-bao-buns.jpeg")} alt="一笼叉烧包" className="sq" /><div className="cap">叉烧包</div></div>
            <div className="pf fn"><img src={img("tofu-and-pickled-mustard-stew.jpeg")} alt="雪菜豆腐煲" className="sq" /><div className="cap">雪菜豆腐煲</div></div>
          </div>

          <div className="nbox mt20">
            <div className="nbox-lbl">今天最深的印象</div>
            <p>不是某一个打卡点，而是那些从小读到大的地名终于有了尺度、气味和脚下真实的路。</p>
          </div>
          <div className="page-num">- 04 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">曲水兰亭，沿着书法往里走</div>
              <div className="day-sub">鹅池 · 曲水流觞 · 王右军祠 · 兰亭书法博物馆</div>
            </div>
            <div className="day-weather">✒️</div>
          </div>

          <div className="pgrid g2">
            <div className="pf fw"><img src={img("kuaijishan-lanting-display.jpeg")} alt="会稽山兰亭序主题景观" className="ls" /><div className="cap">从《兰亭集序》的故事走进景区</div></div>
            <div className="pf fc"><img src={img("arched-bridge-over-river.jpeg")} alt="兰亭山水间横跨河面的石拱桥" className="ls" /><div className="cap">远山、流水与一座石桥</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn"><img src={img("goose-pond-stone-tablet.jpeg")} alt="竹林前的鹅池石碑亭" className="pt" /><div className="cap">竹林里的鹅池碑亭</div></div>
            <div className="pf fs"><img src={img("calligraphy-zhi-wall.jpeg")} alt="兰亭景区巨幅之字书法装置" className="pt" /><div className="cap">把一个「之」字放大到整面墙</div></div>
          </div>

          <div className="jtxt mt16">
            <p>周日来到兰亭。门票 70 元，开放时间 8:00–17:00。这里的山水、竹林、碑亭和书法装置很适合慢慢走，也确实很出片。</p>
            <p>沿着鹅池、兰亭碑亭和曲水流觞一路往里，王羲之与《兰亭集序》不再只是一个书法史上的名字，而变成一条可以亲自走过的路径。</p>
          </div>
          <div className="page-num">- 05 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">把兰亭的路线走完整</div>
              <div className="day-sub">碑亭、古道、遗址与博物馆</div>
            </div>
            <div className="day-weather">🎋</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc"><img src={img("calligraphy-ribbon-corridor-group.jpeg")} alt="四人在悬挂书法绸带的兰亭廊桥合影" className="wd" /><div className="cap">书法绸带从廊桥顶端垂下来，留下一张周末合影</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw"><img src={img("person-in-black-jacket.jpeg")} alt="穿黑色外套的游客在兰亭景区留影" className="pt" /><div className="cap">竹林和碑刻之间慢慢走</div></div>
            <div className="pf fn"><img src={img("two-people-standing-outdoors.jpeg")} alt="两位游客在兰亭户外合影" className="pt" /><div className="cap">兰亭里的周日纪念照</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">建议游览顺序</div>
            <p>鹅池 → 兰亭碑亭 → 曲水流觞 → 王右军祠 → 御碑亭 → 临池十八缸 → 兰亭古道 → 天章寺遗址 → 兰亭书法博物馆。博物馆周一闭馆。</p>
          </div>

          <div className="bill mt16">
            <h4>已知花费与实用信息</h4>
            <div className="br"><span>北站交通</span><span>打车约 31 分钟</span><strong>约 35 元</strong></div>
            <div className="br"><span>公共交通</span><span>BRT1 号线</span><strong>约 54 分钟</strong></div>
            <div className="br"><span>兰亭门票</span><span>开放 8:00–17:00</span><strong>70 元 / 人</strong></div>
            <div className="br"><span>纪念品</span><span>景区有好看的冰箱贴</span><strong>值得看看</strong></div>
          </div>

          <div className="dv mt20 mb16"><span>🛶</span></div>
          <div className="tcenter">
            <div className="ending-title">绍兴，下次再见</div>
            <div className="ending-subtitle">两天，从鲁迅的旧宅走到王羲之的兰亭。</div>
          </div>
          <div className="tags mt20">
            <span className="tag-pink">鲁迅故里</span>
            <span className="tag-blue">乌篷船</span>
            <span className="tag-gold">兰亭</span>
            <span className="tag-green">曲水流觞</span>
          </div>
          <div className="page-num">- 06 -</div>
        </div>
      </div>
    </div>
  );
}
