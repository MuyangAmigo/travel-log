import CardScaleController from "@/components/CardScaleController";
import { img } from "./meta";

export default function ChengduZH() {
  return (
    <div className="chengdu-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card">
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>CHENGDU<br />2025</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">🐼 成都旅行日记</div>
            <h1 className="cover-title">在成都，慢慢耍</h1>
            <div className="cover-subtitle">Chengdu Travel Journal</div>
            <div className="cover-date">2025.01.01 — 01.04</div>
            <p>从春熙路一路逛到熊猫基地，在按摩、火锅气和锦江夜色里，过一个松弛的春节假期。</p>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
            <div>
              <div className="day-title">打飞的去洗脚城</div>
              <div className="day-sub">上海虹桥 ✈️ 成都天府 · 蔚来牛屋 · 大诚江南 SPA</div>
            </div>
            <div className="day-weather">🌙</div>
          </div>

          <div className="jtxt">
            <p>16:40 从虹桥起飞。候机时在 T2 D50 的蔚来牛屋歇脚，免费咖啡、饮料和小零食，把普通候机过成了一小段贵宾体验。</p>
            <p>20:05 落地天府机场时，两个人都已经有点透支。胖宝子一路还在处理工作，情绪终于在机场爆开，原本顺畅的行程因此停住了一个小时。好在话说开以后也就翻篇了，我们拖着行李坐上直达春熙路的机场大巴，窗外从空旷的机场高速慢慢切换成成都深夜的灯光。</p>
            <p>到酒店放下行李已经很晚，但“洗脚城”的第一晚当然不能直接睡。大诚江南的独立卫浴、按摩和随手可取的小食，把一路的疲惫和坏情绪一点点按散，旅行总算重新回到正轨。</p>
          </div>

          <div className="pgrid g3 mt16">
            <div className="pf fn"><img src={img("modern-dark-lounge-bar.jpeg")} alt="虹桥机场蔚来牛屋休息区" className="sq" /><div className="cap">候机时的一点松弛感</div></div>
            <div className="pf fw"><img src={img("nio-storefront-logo-wall.jpeg")} alt="蔚来牛屋品牌墙" className="sq" /><div className="cap">第一次体验“头等舱候机”</div></div>
            <div className="pf fc"><img src={img("panda-lobby-art-installation.jpeg")} alt="成都酒店大堂熊猫装置" className="sq" /><div className="cap">一落地就进入熊猫宇宙</div></div>
          </div>

          <div className="tlwrap mt20">
            <div className="tl-item"><span className="tm">16:40</span><div className="ev">虹桥起飞</div><div className="dt">东航 FM9543 · 波音 737 MAX 8</div></div>
            <div className="tl-item"><span className="tm">20:05</span><div className="ev">落地天府机场</div><div className="dt">两个人都累了，小吵一架，和好后继续旅行</div></div>
            <div className="tl-item"><span className="tm">21:40</span><div className="ev">机场大巴去春熙路</div><div className="dt">15 元，不堵车约一小时</div></div>
            <div className="tl-item"><span className="tm">23:00</span><div className="ev">大诚江南 SPA</div><div className="dt">269 元 / 80 分钟，独立卫浴和小食把疲惫清空</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">第一天的真实开场</div>
            <p>旅行不总从完美情绪开始。累、争执、和好，再一起去按摩——这才是属于我们的成都第一晚。</p>
          </div>
          <div className="page-num">- 02 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">春熙路街溜子 · 白天篇</div>
              <div className="day-sub">烤匠 · IFS · 大慈寺 · 太古里</div>
            </div>
            <div className="day-weather">☀️</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc"><img src={img("two-people-outdoor-cafe.jpeg")} alt="两人在成都户外咖啡座合影" className="hero" /><div className="cap">成都最舒服的打开方式：慢慢走，随时坐下</div></div>
          </div>

          <div className="jtxt mt16">
            <p>今天以春熙路为圆心，从午饭一路溜达到深夜。烤匠点了蒜香烤鱼，最后略腻，但一元点评打卡换来的两个冰箱贴很有旅行纪念感。</p>
            <p>IFS 楼下先看大熊猫趴在外墙上，只能看到圆滚滚的背影；一路上到七楼，才终于和它的正脸合影。再往太古里里面走，热闹的商场忽然被大慈寺安静地切开：一边是玻璃橱窗和人流，一边是红墙、竹影和午后的院落，放在一起竟然毫不违和。</p>
            <p>我们在寺里慢慢逛了文创店，也给这次旅行留下几枚印章。随后回到太古里的购物节奏，给胖宝买下 Stone Island 针织衫，也在 Le Labo 挑了送妹妹的礼物。成都的“松弛”和“剁手”，在同一个下午同时发生。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw"><img src={img("couple-in-winter-jackets-outdoors.jpeg")} alt="穿冬装的两人在春熙路合影" className="ls" /><div className="cap">春节档的春熙路街头</div></div>
            <div className="pf fn"><img src={img("people-with-large-panda-statue.jpeg")} alt="两人与 IFS 大熊猫雕塑合影" className="ls" /><div className="cap">IFS 七楼看趴墙熊猫的正脸</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fs"><img src={img("traditional-chinese-temple-courtyard.jpeg")} alt="大慈寺传统庭院" className="pt" /><div className="cap">被太古里环抱的大慈寺</div></div>
            <div className="pf fc"><img src={img("person-standing-by-bamboo-wall.jpeg")} alt="竹墙边的人像" className="pt" /><div className="cap">古寺、竹影与现代商业区同框</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">今日战利品</div>
            <p>Stone Island 针织衫 3,126 元，Le Labo 礼物 460 元。大慈寺文创店可以盖章，记得自带本子。</p>
          </div>
          <div className="page-num">- 03 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
            <div>
              <div className="day-title">春熙路街溜子 · 夜晚篇</div>
              <div className="day-sub">望平街 · 熊猫书店 · 安顺廊桥 · 九眼桥</div>
            </div>
            <div className="day-weather">🌃</div>
          </div>

          <div className="jtxt">
            <p>从太古里步行约十五分钟到望平街，在锦江边喝一杯李山山手作奶茶。晚餐的乐山胖哥跷脚牛肉，88 元双人团购，小份比上海的大份还扎实。</p>
            <p>天色暗下来后，锦江两岸的灯一点点亮起。我们没有赶行程，只沿着河边继续散步，又为了小红书上看到的熊猫书店多走了半小时。原本以为可能只是又一个网红点，进门后却被满屋的熊猫小物击中，最后还是带走了经典款冰箱贴和甜品。</p>
            <p>安顺廊桥、九眼桥和酒吧街连成了一段完全不同的成都：灯光倒映在水面，桥上桥下都是人，白天的寺庙和竹影已经切换成热闹的夜生活。走到十点，脚也差不多宣布罢工，正好用一场按摩结束这趟超长 citywalk。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fn"><img src={img("night-river-selfie-city-lights.jpeg")} alt="锦江夜景中的两人自拍" className="pt" /><div className="cap">安顺廊桥与锦江夜色</div></div>
            <div className="pf fw"><img src={img("two-people-in-traditional-backdrop.jpeg")} alt="传统布景前的两人合影" className="pt" /><div className="cap">一路逛到夜里，成都还很热闹</div></div>
          </div>

          <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
            <div className="rs"><div className="ic">🐟</div><div className="lb">烤匠</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🐼</div><div className="lb">IFS</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🏯</div><div className="lb">大慈寺</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🛍️</div><div className="lb">太古里</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌊</div><div className="lb">望平街</div></div><div className="ra">→</div>
            <div className="rs"><div className="ic">🌉</div><div className="lb">九眼桥</div></div>
          </div>

          <div className="nbox mt20">
            <div className="nbox-lbl">夜游笔记</div>
            <p>熊猫书店可爱到值得多走半小时；安顺廊桥、九眼桥和酒吧街连成一片，九眼桥一侧是拍廊桥夜景的好机位。最后用金足印象 298 元 / 人的按摩收尾。</p>
          </div>
          <div className="page-num">- 04 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
            <div>
              <div className="day-title">遇见网红花花</div>
              <div className="day-sub">大熊猫基地 · 宽窄巷子 · 人民公园</div>
            </div>
            <div className="day-weather">🐼</div>
          </div>

          <div className="pgrid g1">
            <div className="pf fc"><img src={img("giant-panda-sitting-by-bamboo.jpeg")} alt="坐在竹子旁的大熊猫花花" className="hero" /><div className="cap">排队一小时，只看三分钟，还是觉得值</div></div>
          </div>

          <div className="jtxt mt16">
            <p>前一晚睡太晚，9:45 才挣扎起床。楼下甘食记用包子、豆浆和肥肠粉快速开机，还把身份证落在店里，第一反应竟然是想赖给肥肥头。我有罪。</p>
            <p>从春熙路打车到熊猫基地大约半小时，二十元左右。听攻略从西门进，游客果然少一些，但到了花花面前还是要老老实实排队。一个小时的等待最终只换来三分钟见面，她就坐在竹子旁边认真营业，圆得几乎没有脖子，照片和视频根本装不下现场的可爱。</p>
            <p>离开基地后，下午的节奏彻底放慢。宽窄巷子更像一条热闹的网红小吃街，我们没有认真打卡，只随意走走、吃一顿便宜到惊讶的冒烤鸭和蹄花，再一路晃到人民公园。鹤鸣茶社没有想象中惊艳，但坐下来喝杯茶、看看周围的人，也算完成了成都式的慢生活体验。</p>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fw"><img src={img("person-pointing-at-panda-enclosure.jpeg")} alt="在熊猫馆舍前指向大熊猫" className="pt" /><div className="cap">西门进园人更少，直奔花花</div></div>
            <div className="pf fn"><img src={img("two-people-by-wooden-tower.jpeg")} alt="两人在熊猫基地木塔旁合影" className="pt" /><div className="cap">园区里的木塔与冬日阳光</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fs"><img src={img("two-people-near-pig-statue.jpeg")} alt="两人在雕塑旁合影" className="ls" /><div className="cap">宽窄巷子随意走走</div></div>
            <div className="pf fc"><img src={img("two-people-peace-signs-building.jpeg")} alt="两人在传统建筑前比耶" className="ls" /><div className="cap">人民公园附近的慢生活</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">今日好吃与踩坑</div>
            <p>宽窄巷子附近 55 元冒烤鸭 + 40 元蹄花，性价比离谱。鹤鸣茶社室外偏冷，茶点比较预制，市井感也有些刻意；路上的草莓和菠萝蜜则像是游客价。</p>
          </div>
          <div className="page-num">- 05 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
            <div>
              <div className="day-title">在蜀宴赋里当皇上</div>
              <div className="day-sub">蜀宴赋 · 东郊记忆 · 印象城蔚来牛屋 · 天府机场</div>
            </div>
            <div className="day-weather">👑</div>
          </div>

          <div className="jtxt">
            <p>最后一天没有早起 KPI，睡到 11:30 才退房。蜀宴赋把午餐做成了一场沉浸式宫廷演出，仪式、器皿、舞台和菜品一起上桌，真的有一刻觉得自己在当皇上。</p>
            <p>从拿到粉色票券开始，体验就不再只是一顿饭。茶具和木托盘先把仪式感铺好，菜品按节奏出现，舞台上的传统舞蹈又不断把注意力从餐桌拉向表演。它当然带着精心设计的“沉浸感”，但完成度足够高，所以我们也很乐意配合着进入这场蜀地宫廷梦。</p>
            <p>饭后去东郊记忆消食，旧厂房、管道和工业结构还在，里面却已经装进咖啡店、买手店和各种年轻人的娱乐空间。最后回到熟悉的蔚来牛屋补充电量，领完城市冰箱贴，也像给这四天盖下了最后一枚章。</p>
          </div>

          <div className="pgrid g3 mt12">
            <div className="pf fn"><img src={img("pink-event-tickets-in-hand.jpeg")} alt="手中的蜀宴赋粉色票券" className="pt" /><div className="cap">今天的宫廷入场券</div></div>
            <div className="pf fw"><img src={img("japanese-tea-ceremony-set.jpeg")} alt="蜀宴赋桌上的茶具" className="pt" /><div className="cap">从器皿开始营造仪式感</div></div>
            <div className="pf fc"><img src={img("wooden-serving-tray-with-bowls.jpeg")} alt="木托盘上的精致餐食" className="pt" /><div className="cap">一席蜀地风味慢慢展开</div></div>
          </div>

          <div className="pgrid g2 mt12">
            <div className="pf fs"><img src={img("traditional-dance-stage-performance.jpeg")} alt="蜀宴赋传统舞蹈演出" className="ls" /><div className="cap">边吃边看的传统舞台演出</div></div>
            <div className="pf fw"><img src={img("xiaobanyouli-cafe-storefront.jpeg")} alt="东郊记忆的小伴有礼店铺" className="ls" /><div className="cap">东郊记忆：老工厂里的新生活</div></div>
          </div>

          <div className="nbox mt16">
            <div className="nbox-lbl">最后一站</div>
            <p>在印象城蔚来牛屋领城市冰箱贴、喝饮料、充电和值机。天府机场离市区真的远，公共交通约一个半小时；好在提前值机、没有托运，回程依旧顺利。</p>
          </div>
          <div className="page-num">- 06 -</div>
        </div>
      </div>

      <div className="card-wrap">
        <div className="card">
          <div className="day-header">
            <div className="day-circle"><span className="lbl">¥</span><span className="num">10K</span></div>
            <div>
              <div className="day-title">四天三夜账单</div>
              <div className="day-sub">总计 10,474 RMB · 不含 Stone Island 后为 7,348 RMB</div>
            </div>
            <div className="day-weather">🧾</div>
          </div>

          <div className="bill mt16">
            <div className="br"><span>购物</span><span>Stone Island 3,126 + Le Labo 460</span><strong>3,586</strong></div>
            <div className="br"><span>娱乐</span><span>按摩、采耳、熊猫基地、蜀宴赋</span><strong>2,608</strong></div>
            <div className="br"><span>机酒</span><span>机票 1,818 + 酒店 1,246</span><strong>3,064</strong></div>
            <div className="br"><span>餐饮</span><span>四天各餐</span><strong>751</strong></div>
            <div className="br"><span>交通</span><span>机场大巴、打车与市内交通</span><strong>150</strong></div>
            <div className="br"><span>其他</span><span>水果、文创与杂费</span><strong>314</strong></div>
            <div className="br total"><span>合计</span><span>成都四天三夜</span><strong>10,474 RMB</strong></div>
          </div>

          <div className="dv mt20 mb16"><span>🐼</span></div>
          <div className="tcenter">
            <div className="ending-flag">👋</div>
            <div className="ending-title">成都，再见！</div>
            <div className="ending-subtitle">有点累、有点贵，但真的很好耍。</div>
          </div>
          <div className="tags mt20">
            <span className="tag-pink">花花</span>
            <span className="tag-blue">春熙路</span>
            <span className="tag-gold">蜀宴赋</span>
            <span className="tag-green">按摩之城</span>
          </div>
          <div className="page-num">- 07 -</div>
        </div>
      </div>
    </div>
  );
}
