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

export default function SeoulEN() {
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
              <span style={{ display: "block" }}>Seoul,</span>
              <span style={{ display: "block" }}>Snow, Slopes &amp;</span>
              <span style={{ display: "block" }}>Midnight Neon</span>
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
              “Hongdae neon, snow on Namsan,<br />and 2024 arriving in a sky full of fireworks.”
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
            <div className="day-title">Four Days from Shopping Lists to Fireworks</div>
            <div className="day-sub">Shanghai · Incheon · Hongdae · Namsan · Itaewon · Myeongdong</div>
          </div>
        </div>

        <div className="jtxt">
          <p>The outbound flight left at 11:35 on December 29 and reached Incheon T1 at 14:30. On January 1, the return flight departed Seoul at 14:10 and landed at Shanghai Pudong T2 at 15:10. We stayed at H Avenue Hotel Idae Shinchon near Ewha Womans University Station, keeping the four days around western and central Seoul.</p>
          <p>The pre-trip plan was packed, but the checked-off route was much clearer: browsing Hongdae, Haebangchon and Namsan, the Itaewon hill, NANTA, ALAND in Myeongdong, and finally the New Year celebration.</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">12.29</span><div className="ev">Incheon → Hongdae</div><div className="dt">Straight from the airport into the streetwear district, shopping beneath the neon</div></div>
          <div className="tl-item"><span className="tm">12.30</span><div className="ev">Namsan → Haebangchon → Itaewon → Myeongdong</div><div className="dt">A snowy city walk, cable car down the mountain, and NANTA at 20:00</div></div>
          <div className="tl-item"><span className="tm">12.31</span><div className="ev">Palace plans, Myeongdong shopping, and New Year</div><div className="dt">Plans and reality overlapped; ALAND and the countdown were definitely completed</div></div>
          <div className="tl-item"><span className="tm">01.01</span><div className="ev">Seoul → Shanghai</div><div className="dt">Lunch, then the airport and the end of a short New Year trip</div></div>
        </div>

        <div className="pgrid g3 mt20">
          <Photo file="20-seoul-attractions-map.webp" alt="Map of popular Seoul attractions and routes" caption="A Seoul attractions map saved before departure" />
          <Photo file="22-hotel-location-map.webp" alt="Location of H Avenue Hotel on a Seoul map" caption="Staying around Ewha and Sinchon" />
          <Photo file="23-incheon-airport-route.webp" alt="Navigation route from Incheon Airport to the hotel" caption="The first route into town from Incheon T1" />
        </div>
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">Straight from the Airport to Browse Hongdae</div>
            <div className="day-sub">Friday, December 29th · Hongdae</div>
          </div>
          <div className="day-weather">🌙</div>
        </div>

        <div className="jtxt">
          <p>We headed directly to Hongdae after landing in the afternoon. Seoul&apos;s streetwear culture felt mature, the shops were densely packed, and many prices were friendlier than back home. Hongdae&apos;s entrance and commercial streets stayed lively into the night; neon signs and crowds switched the trip on immediately.</p>
          <p>Ewha Womans University had also been on the list: the sunken ECC complex, the church to the left of the gate, and an Olive Young browse nearby. It never received a check mark. We stayed near Ewha, but the campus itself remains for another trip.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="01-hongdae-night-street.webp" alt="Crowded Hongdae shopping street at night" caption="First stop after landing: Hongdae at full volume" shape="ls" />
          <Photo file="02-neon-night-street.webp" alt="Pedestrians and neon signs in a Seoul nightlife district" caption="Signs and crowds stretching into the night" shape="ls" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="03-hongdae-shopping-map.webp" alt="Shopping map marked with Hongdae streetwear stores" caption="The Hongdae streetwear map—several stops really did get checked off" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">Browsed, but not quite convinced</div>
          <p>Nerdy had discounts and Marithé François Girbaud had plenty of celebrity-linked pieces. thisisneverthat felt like a Korean Supreme, but the pricing did not feel as attractive that day.</p>
        </div>
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">Snowy Seoul, Uphill All the Way</div>
            <div className="day-sub">Saturday, December 30th · Namsan · Haebangchon</div>
          </div>
          <div className="day-weather">❄️</div>
        </div>

        <div className="jtxt">
          <p>The day followed a loose city-walk route toward Namsan. Seoul&apos;s winter cityscape was striking: dense apartment blocks in front, mountains behind, and N Seoul Tower staying in view above the slopes. Snow muted the streets, buses, and buildings—but did nothing to make the walking easy. The hills here are real.</p>
          <p>Myeongdong Cartoon Street, the National Museum of Korea, the Noksapyeong pedestrian bridge, and two sunset cafés all remained unchecked. Haebangchon, N Seoul Tower, and Itaewon were the places we actually reached.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="06-seoul-cityscape.webp" alt="Seoul apartment blocks framed by surrounding mountains" caption="Mountains beyond the towers: Seoul&apos;s clearest silhouette" />
          <Photo file="07-namsan-tower-city-view.webp" alt="N Seoul Tower seen between city buildings" caption="N Seoul Tower kept pointing out the top of the hill" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="08-snowy-city-buildings.webp" alt="High-rise Seoul street covered in snow" caption="The city center reduced to a wintry monochrome" />
          <Photo file="10-snowy-city-bus.webp" alt="Blue city bus crossing a snowy Seoul street" caption="Snow still on the road; the city moving as usual" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">The most practical warning</div>
          <p>Many Seoul streets are steep. Bring soft, comfortable shoes that can handle a full day. The views are uphill, and your calves will keep the receipt.</p>
        </div>
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">Haebangchon, Itaewon, and NANTA</div>
            <div className="day-sub">Haebangchon · Itaewon · Myeongdong</div>
          </div>
          <div className="day-weather">🥁</div>
        </div>

        <div className="jtxt">
          <p>We found different angles on N Seoul Tower from Haebangchon, then stopped at the familiar Itaewon hill. After reaching the tower, we took the cable car back down and returned to the city lights. At 20:00, NANTA at the UNESCO Building in Myeongdong turned pots, pans, and knives into a fast, percussive finale.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="04-snowy-city-friends.webp" alt="Two friends posing on a snowy Seoul street" caption="A snowy street portrait; the city was colder than expected" shape="ls" />
          <Photo file="05-city-overlook-friends.webp" alt="Two friends posing above the Seoul skyline" caption="At the top of the climb, Seoul opened behind us" shape="ls" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="09-wanta-store-group.webp" alt="A group posing inside the WANTA store" caption="A group photo inside WANTA during the city walk" shape="hero" />
        </div>

        <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
          <div className="rs"><div className="ic">🏘️</div><div className="lb">Haebangchon</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🗼</div><div className="lb">N Seoul Tower</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🚡</div><div className="lb">Cable car</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">📺</div><div className="lb">Itaewon hill</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🥁</div><div className="lb">NANTA</div></div>
        </div>
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">A Detailed Palace Plan, but No Check Mark</div>
            <div className="day-sub">Sunday, December 31st · Gyeongbokgung · Myeongdong</div>
          </div>
          <div className="day-weather">🏯</div>
        </div>

        <div className="jtxt">
          <p>The day was titled “Gyeongbokgung &amp; New Year,” and the notes went as far as Exit 5 of Gyeongbokgung Station, KRW 3,000 for adults, KRW 1,500 for children, and Tuesday closure. Yet this section never received a completion mark. The pink wristband collected with a passport at Cheongwadae and the full visitor route also read more like pre-trip notes.</p>
          <p>What definitely got checked off was ALAND in Myeongdong and the New Year celebration that night. Seongsu, Gangnam, and Apgujeong were all candidates for the afternoon, but we did not chase the entire shopping list.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="11-gyeongbokgung-poster.webp" alt="Travel poster featuring the eaves of Gyeongbokgung Palace" caption="The palace planning page: tiled roofs, walls, and pre-trip anticipation" />
          <Photo file="19-gyeongbokgung-light-show.webp" alt="Night light projection at Gyeongbokgung Palace" caption="A saved palace light-show image setting the mood for New Year&apos;s Eve" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="18-designer-toy-citywalk.webp" alt="Collage of Seoul designer-toy and concept-store stops" caption="Plenty of shopping research; the day&apos;s energy still decided the real route" shape="hero" />
        </div>

        <div className="rbox mt16">
          <h4>Shopping stops confirmed in the journal</h4>
          <div className="ri"><span className="nm">ALAND, Myeongdong</span><span className="cm">A streetwear collection store, checked off on December 31</span></div>
          <div className="ri"><span className="nm">Le Labo</span><span className="cm">The Seoul-exclusive scent, proudly marked “bought it!”</span></div>
        </div>
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🛍️</span><span style={{ fontSize: 12 }}>SHOP</span></div>
          <div>
            <div className="day-title">Many Saves, but the Stops We Made Matter More</div>
            <div className="day-sub">Hongdae · Myeongdong · the wish list left for next time</div>
          </div>
        </div>

        <div className="jtxt">
          <p>Shopping was the clearest success of the trip. Seoul&apos;s streetwear scene felt mature, the choice was dense, and many prices were better than at home. With only four days, there was no need to turn every saved store into an assignment.</p>
        </div>

        <div className="rbox mt20">
          <h4>The districts I most wanted to browse</h4>
          <div className="ri"><span className="nm">Seongsu</span><span className="cm">Ader Space, emis, Fennec, KUOCA, the Dior concept store, and Le Labo</span></div>
          <div className="ri"><span className="nm">Gangnam</span><span className="cm">Starfield Library, BEAKER, Tamburins on Garosu-gil, and the underground mall</span></div>
          <div className="ri"><span className="nm">Apgujeong</span><span className="cm">Worksout, Wooyoungmi, Solid Homme, Juun.J, 10 Corso Como, and Ader Error</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">The most emotional entry on the list</div>
          <p>The stir-fried chicken and ramen at 向鸡家 (Xiangjijia) earned four consecutive “love”s in the original note. Even without a check mark, the punctuation says how high it ranked.</p>
        </div>
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🎆</span><span style={{ fontSize: 12 }}>2024</span></div>
          <div>
            <div className="day-title">Welcoming 2024 Beneath Fireworks</div>
            <div className="day-sub">New Year&apos;s Eve · Seoul</div>
          </div>
          <div className="day-weather">✨</div>
        </div>

        <div className="jtxt">
          <p>The New Year celebration was explicitly checked off. Fireworks opened above us, drawing a bright line between 2023 and 2024. The saved guide also listed the Bosingak bell-ringing, the “Midnight Sun,” the Seoul Lantern Festival, DDP&apos;s “Digital Atlantis,” the Songhyeon light festival, and the Dorimcheon starlight festival. The journal never confirms a specific one, so they remain the choices we had that night rather than places I claim we attended.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="12-new-year-fireworks.webp" alt="Fireworks bursting over Seoul on New Year's Eve" caption="Fireworks rising as the four-day trip reached its brightest moment" shape="hero" />
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">Bosingak</span><div className="ev">The bell rings 33 times at midnight</div><div className="dt">The main event in the notes, held in Jongno</div></div>
          <div className="tl-item"><span className="tm">Sejong-daero</span><div className="ev">A 12-meter “Midnight Sun”</div><div className="dt">Raised after the bell ceremony, followed by dance performances</div></div>
          <div className="tl-item"><span className="tm">Gwanghwamun &amp; Cheonggyecheon</span><div className="ev">Seoul Lantern Festival</div><div className="dt">Running from December 15, 2023 through January 21, 2024</div></div>
          <div className="tl-item"><span className="tm">DDP</span><div className="ev">Seoul Light: Digital Atlantis</div><div className="dt">A large projection across the Dongdaemun Design Plaza façade</div></div>
        </div>
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🥾</span><span style={{ fontSize: 12 }}>WALK</span></div>
          <div>
            <div className="day-title">Namsan in Winter: the Path Outlasted the Tower</div>
            <div className="day-sub">Namsan hillside · winter paths · Seoul Tower</div>
          </div>
          <div className="day-weather">🌲</div>
        </div>

        <div className="jtxt">
          <p>Looking back, N Seoul Tower is the obvious landmark, but the slopes, bare trees, and patches of unmelted snow carry the stronger physical memory. The hillside hid the city behind us one step at a time. Seoul&apos;s scenery often was not a single viewpoint, but the long climb needed to reach it.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="13-namsan-hike-friends.webp" alt="Two friends hiking through winter woods on Namsan" caption="A hillside photo; the climb is already visible on our faces" shape="ls" />
          <Photo file="14-namsan-tower-hillside.webp" alt="N Seoul Tower above a winter hillside" caption="N Seoul Tower seen through the winter trees" shape="ls" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="15-namsan-hillside-road.webp" alt="Winter road climbing toward N Seoul Tower" caption="A winding road where the city meets the hillside" />
          <Photo file="16-snowy-winter-trail.webp" alt="Snow remaining on a trail between winter trees" caption="Snow lingering wherever the sun could not reach" />
        </div>
        <div className="pgrid g1 mt12">
          <Photo file="17-winter-park-path.webp" alt="Park path surrounded by bare winter trees" caption="With the leaves gone, the path felt exceptionally quiet" shape="hero" />
        </div>
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>📋</span><span style={{ fontSize: 12 }}>PLAN</span></div>
          <div>
            <div className="day-title">The Unchecked List Still Belongs to the Trip</div>
            <div className="day-sub">Plans saved, routes changed, no need to complete every square</div>
          </div>
        </div>

        <div className="pgrid g1">
          <Photo file="21-seoul-four-day-guide.webp" alt="Reference map for a four-day Seoul itinerary" caption="A four-day route saved before departure; weather and energy chose the real one" shape="hero" />
        </div>

        <div className="rbox mt20">
          <h4>What never got checked off</h4>
          <div className="ri"><span className="nm">Culture</span><span className="cm">Ewha Womans University, the National Museum of Korea, and Cheongwadae</span></div>
          <div className="ri"><span className="nm">City walk</span><span className="cm">Myeongdong Cartoon Street, the Noksapyeong bridge, and the sunset cafés</span></div>
          <div className="ri"><span className="nm">Shopping</span><span className="cm">Lotte and Shinsegae duty-free, plus full days in Seongsu, Gangnam, and Apgujeong</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">Travel is not a completed spreadsheet</div>
          <p>The checklist gave me something to anticipate before leaving; it did not become homework on arrival. What remained was enough: Hongdae shops, Namsan slopes, NANTA&apos;s drums, and New Year fireworks.</p>
        </div>
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>💭</span><span style={{ fontSize: 12 }}>NOTES</span></div>
          <div>
            <div className="day-title">Seoul Shops Brilliantly—and Rewards Preparation</div>
            <div className="day-sub">What worked · what annoyed me · what I would bring again</div>
          </div>
        </div>

        <div className="jtxt">
          <p>The strongest praise goes to shopping: a mature streetwear culture, broad choice, and an easy browsing experience. The clearest warnings came from the city itself—steep streets and fewer public toilets and bins than expected. After a full day, those details felt more immediate than any landmark.</p>
          <p>Papago was genuinely useful, because English did not always get us through. A few people cutting lines also left a sour impression. Hotels do not routinely provide toothbrushes or toothpaste, bedbugs were on our minds at check-in, and Incheon Airport was crowded enough that both arrival and departure deserved extra time.</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">Packed right</span><div className="ev">Power bank, local SIM, plug adapter, and T-Money</div><div className="dt">A Chinese carrier&apos;s roaming package may not open every Korean app</div></div>
          <div className="tl-item"><span className="tm">Apps</span><div className="ev">Naver for navigation; Papago and Kuli Kuli for translation</div><div className="dt">Do not depend on a single tool for either routes or language</div></div>
          <div className="tl-item"><span className="tm">Before leaving</span><div className="ev">Wear soft-soled shoes and use the restroom</div><div className="dt">Public toilets and bins were much harder to find than expected</div></div>
          <div className="tl-item"><span className="tm">Journal balance</span><div className="ev">KRW 3,500 / 3,600</div><div className="dt">The final numbers in the original note, preserved without interpretation</div></div>
        </div>

        <div className="dv mt24 mb16"><span>🎆</span></div>
        <div className="hwcn" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p>Four days were short, and the list was long.</p>
          <p>The places we missed can wait for next time;</p>
          <p>the snowy slopes, neon, and fireworks already make a complete trip.</p>
        </div>
        <div className="tags mt24">
          <span className="tag tag-c">#SeoulNewYear</span>
          <span className="tag tag-t">#HongdaeShopping</span>
          <span className="tag tag-g">#SnowyNamsan</span>
          <span className="tag tag-b">#ItaewonCityWalk</span>
          <span className="tag tag-p">#Hello2024</span>
        </div>
        <div style={{ marginTop: 34, textAlign: "center" }}>
          <span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2024.01</span>
        </div>
      </JournalCard>
    </div>
  );
}
