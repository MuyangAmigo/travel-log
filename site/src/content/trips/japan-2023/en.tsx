import type { ReactNode } from "react";
import CardScaleController from "@/components/CardScaleController";
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

export default function Japan2023EN() {
  return (
    <div className="japan-2023-trip" style={{ display: "contents" }}>
      <CardScaleController />

      <div className="card-wrap">
        <div className="card" style={{ padding: "50px 55px" }}>
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}><div>JAPAN<br />2023</div></div>
          <div className="cover-border">
            <div className="cover-emoji">🗻 ♨️ 🌃</div>
            <h1 className="cover-title"><span style={{ display: "block" }}>Fuji Stillness,</span><span style={{ display: "block" }}>Tokyo in Motion</span></h1>
            <div className="cover-subtitle">富士静景，东京热游</div>
            <div className="cover-line" />
            <div className="cover-date">NOVEMBER · 2023</div>
            <div className="cover-line" />
            <p style={{ fontFamily: "var(--font-serif-cn)", fontSize: 17, color: "var(--ink-light)", fontStyle: "italic", lineHeight: 2.2, maxWidth: 500, textAlign: "center", marginTop: 10 }}>
              “First, slow down at Lake Kawaguchi.<br />Then dive into Tokyo&apos;s streets, night views, and shopping bags.”
            </p>
            <div style={{ marginTop: 35 }}><span className="stamp-box">TOKYO · FUJI PASS</span></div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </div>

      <JournalCard page={2}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🗺️</span><span style={{ fontSize: 12 }}>ROUTE</span></div>
          <div><div className="day-title">Seven Days from Fuji&apos;s Foothills to Tokyo Neon</div><div className="day-sub">Kawaguchiko · Ueno · Asakusa · Shibuya · Ginza · Yokohama · Toshimaen</div></div>
        </div>
        <div className="jtxt">
          <p>This November trip opened at Lake Kawaguchi. We stayed at Fuji Ginkei, watching Mount Fuji from a lakeside onsen hotel, then returned to Tokyo and used Sotetsu Grand Fresa Takadanobaba as a base for Ueno, Asakusa, Harajuku, Shibuya, the Imperial Palace, Ginza, Akihabara, and Yokohama.</p>
          <p>The final day belonged to the Warner Bros. Studio Tour Tokyo, followed by the trip&apos;s largest shopping charge at Sunrise Duty Free. The original note summarizes the total at about RMB 20,000. As memorable as the sights were, the shopping list kept growing just as quickly.</p>
        </div>
        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">Day 1–2</span><div className="ev">Lake Kawaguchi</div><div className="dt">Lakeside onsen, Mount Fuji, Chureito Pagoda, and Oshino Hakkai</div></div>
          <div className="tl-item"><span className="tm">Day 3</span><div className="ev">Ueno → Asakusa</div><div className="dt">Park paths, shrines, Senso-ji, and shopping streets after dark</div></div>
          <div className="tl-item"><span className="tm">Day 4–5</span><div className="ev">Harajuku and Shibuya → Imperial Palace, Ginza, Akihabara</div><div className="dt">Neighborhoods by day and Tokyo spread into a sea of lights by night</div></div>
          <div className="tl-item"><span className="tm">Day 6–7</span><div className="ev">Shopping → Yokohama → Harry Potter Studio Tour → home</div><div className="dt">Architecture, harbor skyline, film sets, and one final buying round</div></div>
        </div>
        <Gallery grid="g2 guide-thumbs" photos={[
          { file: "tokyo-city-one-day-tour.jpeg", alt: "Reference itinerary for a one-day Tokyo tour", caption: "A Tokyo day route saved before departure" },
          { file: "lake-kawaguchi-hotel-areas-map.jpeg", alt: "Map of hotel areas around Lake Kawaguchi", caption: "A guide to where to stay around the lake" },
        ]} />
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1–2</span></div>
          <div><div className="day-title">Lake Kawaguchi, Moving at Mount Fuji&apos;s Pace</div><div className="day-sub">Kawaguchiko · Fuji Ginkei · Oshino Hakkai</div></div>
          <div className="day-weather">🗻</div>
        </div>
        <div className="jtxt">
          <p>We came from Tokyo to Lake Kawaguchi and checked into Fuji Ginkei beside the water. Mount Fuji filled the view when we opened the window, and the quiet onsen hotel slowed the whole trip down before it had properly begun. The weather was not perfect, but the mountain, lake, and low clouds still made us stop and look.</p>
          <p>The two days took us through Kawaguchiko Station and the Chureito Pagoda area, with Oshino Hakkai and a karaage shop near the Kawaguchiko Music Forest also saved on the route. Nothing here felt as packed as Tokyo; the scenery itself was the itinerary.</p>
        </div>
        <Gallery grid="g1" photos={[
          { file: "mount-fuji-lake-view.png", alt: "Mount Fuji seen across Lake Kawaguchi", caption: "Lake water, Mount Fuji, and the stillness outside the hotel", shape: "hero" },
        ]} />
        <Gallery grid="g2" photos={[
          { file: "kawaguchiko-station-sign-entrance.png", alt: "Entrance and station sign at Kawaguchiko Station", caption: "Arriving at Kawaguchiko—the Fuji chapter begins", shape: "sq" },
          { file: "chureito-pagoda-overlooking-fujiyoshida.png", alt: "Chureito Pagoda overlooking Fujiyoshida", caption: "The five-story pagoda and city sharing one deep view", shape: "sq" },
        ]} />
        <Gallery photos={[
          { file: "group-at-japanese-temple.jpeg", alt: "Travel group posing before a Japanese temple building", caption: "A group portrait below Mount Fuji", shape: "ls" },
          { file: "two-people-under-tree.jpeg", alt: "Two people posing beneath a tree", caption: "A quiet portrait beneath the trees", shape: "ls" },
        ]} />
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div><div className="day-title">From Ueno&apos;s Vermilion Banners to Asakusa at Night</div><div className="day-sub">Ueno Park · Hanazono Inari · Senso-ji</div></div>
          <div className="day-weather">⛩️</div>
        </div>
        <div className="jtxt">
          <p>Back in Tokyo, we started in Ueno Park and continued toward Senso-ji. The red prayer banners at Hanazono Inari Shrine, a charm held in one hand, incense smoke, and Senso-ji&apos;s signs made the day&apos;s shrine memories unusually tangible.</p>
          <p>Asakusa&apos;s shopping streets had a great atmosphere. The daytime temple route turned into signs, intersections, and crowds after dark, and we picked up a few small souvenirs along the way. The Tokyo National Museum was also saved among the stops in this area.</p>
        </div>
        <Gallery grid="g3" photos={[
          { file: "hanazono-inari-shrine-banners.png", alt: "Vermilion prayer banners at Hanazono Inari Shrine", caption: "Hanazono Inari inside Ueno Park", shape: "pt" },
          { file: "hand-holding-japanese-temple-charm.png", alt: "A hand holding a Japanese temple charm", caption: "A small keepsake from the shrine route", shape: "pt" },
          { file: "japanese-shrine-incense-burner.png", alt: "Incense burner and visitors at a Japanese temple", caption: "Incense smoke placing a soft veil over busy Asakusa", shape: "pt" },
        ]} />
        <Gallery grid="g3" photos={[
          { file: "sensoji-temple-japanese-signboard.png", alt: "Japanese sign and entrance at Senso-ji", caption: "The entrance signage at Senso-ji", shape: "sq" },
          { file: "tokyo-urban-street-intersection.png", alt: "Street intersection in central Tokyo", caption: "Walking from old temple grounds back into modern Tokyo", shape: "sq" },
          { file: "tokyo-night-shopping-street.png", alt: "Tokyo shopping street illuminated at night", caption: "The shopping street staying lively after dark", shape: "sq" },
        ]} />
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div><div className="day-title">Harajuku, Omotesando, and the Sky Above Shibuya</div><div className="day-sub">Meiji Jingu · Omotesando · Shibuya Sky</div></div>
          <div className="day-weather">🌃</div>
        </div>
        <div className="jtxt">
          <p>The daytime route moved around Meiji Jingu, Harajuku, Omotesando, and the Nezu Museum area. At night, Shibuya Sky became the day&apos;s strongest memory. From above, Tokyo stopped being a sequence of streets and became an entire field of light stretching toward the horizon.</p>
          <p>Shopping accelerated too: two ATOMS T-shirts for JPY 11,019; a T-shirt and sweatshirt at the PSG store for JPY 31,900; Nike sneakers at ABC Mart for JPY 14,000; two Aape sweaters for JPY 28,666; and Air Jordan sneakers for JPY 18,315. The note totals Day 4 at JPY 103,900, or about RMB 5,082.</p>
        </div>
        <Gallery grid="g1" photos={[
          { file: "night-city-view-observatory-couple.jpeg", alt: "Two people overlooking Tokyo at night from an observation deck", caption: "Tokyo&apos;s lights reaching the horizon from Shibuya Sky", shape: "ls" },
        ]} />
        <Gallery grid="g4" photos={[
          { file: "two-people-outdoors-near-building.jpeg", alt: "Two people posing beside a Tokyo building", caption: "Moving through Harajuku and Omotesando by day", shape: "sq" },
          { file: "friends-on-observation-deck.png", alt: "Friends standing on a high observation deck in Tokyo", caption: "A group portrait on the observation deck", shape: "sq" },
          { file: "group-city-night-view.jpeg", alt: "Travel group posing before the Tokyo night skyline", caption: "A whole group against a whole city of lights", shape: "sq" },
          { file: "two-people-city-night-view.jpeg", alt: "Two people posing with Tokyo at night behind them", caption: "The photograph is only a reduced version of the view", shape: "sq" },
        ]} />
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div><div className="day-title">Imperial Palace to Ginza, Then Akihabara in the Rain</div><div className="day-sub">Imperial Palace · Ginza · Akihabara</div></div>
          <div className="day-weather">🌧️</div>
        </div>
        <div className="jtxt">
          <p>We moved from the open roads around the Imperial Palace into Ginza&apos;s ordered commercial blocks, then on to Akihabara. Tokyo&apos;s contrasts fit into one day: trees and business towers, the glass façade of GINZA SIX, dense signs, and rain reflecting the city after dark.</p>
          <p>The shopping record is much shorter: RMB 1,060.52 at Uniqlo. After the previous day&apos;s haul, the number almost looks restrained.</p>
        </div>
        <Gallery grid="g4" photos={[
          { file: "modern-city-intersection-buildings.png", alt: "Tokyo intersection framed by modern buildings", caption: "Leaving the Imperial Palace area for the commercial district", shape: "pt" },
          { file: "ginza-six-shopping-center.png", alt: "Exterior of GINZA SIX shopping center", caption: "Ginza&apos;s architecture and shopping route", shape: "pt" },
          { file: "tokyo-business-district-parkway.png", alt: "Tree-lined road in a Tokyo business district", caption: "Broad tree cover between the towers", shape: "pt" },
          { file: "rainy-japanese-city-street-night.png", alt: "Japanese city street on a rainy night", caption: "Akihabara lights reflected on the wet street", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">6</span></div>
          <div><div className="day-title">The “Bird-Catching Building,” Tokyo Streets, and Yokohama&apos;s Skyline</div><div className="day-sub">Tokyo architecture · shopping · Yokohama</div></div>
          <div className="day-weather">🏙️</div>
        </div>
        <div className="jtxt">
          <p>The original note labels this day “Bird-Catching Building &amp; Yokohama.” The photographs begin with a crisp cubic building, pass through plazas, elevated rail, a street under construction, and anime signs, then end at the Yokohama Landmark Tower skyline. Tokyo&apos;s density followed us all the way to the harbor.</p>
          <p>We bought two Arc&apos;teryx pieces for RMB 4,850.06 and spent RMB 118.79 at Don Quijote. The original journal records the Day 6 total as RMB 5,698.85, which is preserved here as written.</p>
        </div>
        <Gallery grid="g3" photos={[
          { file: "modern-cube-building-exterior.png", alt: "Exterior of a modern cubic building", caption: "The modern building at the stop named in the journal", shape: "sq" },
          { file: "urban-plaza-with-tall-buildings.png", alt: "Urban plaza surrounded by high-rise buildings", caption: "Continuing through the towers", shape: "sq" },
          { file: "tokyo-urban-train-overpass.png", alt: "Elevated railway crossing a Tokyo street", caption: "Rail threading through the urban texture", shape: "sq" },
        ]} />
        <Gallery grid="g3" photos={[
          { file: "tokyo-street-with-crane.png", alt: "Tokyo street with a construction crane", caption: "A Tokyo neighborhood still being remade", shape: "sq" },
          { file: "tokyo-anime-district-nightscape.png", alt: "Anime district signs illuminated at night in Tokyo", caption: "Anime signs switching the night back on", shape: "sq" },
          { file: "yokohama-landmark-tower-skyline.png", alt: "Yokohama Landmark Tower in the harbor skyline", caption: "The day ending against Yokohama&apos;s skyline", shape: "sq" },
        ]} />
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">7</span></div>
          <div><div className="day-title">Into the Harry Potter Sets, Then Home</div><div className="day-sub">Warner Bros. Studio Tour Tokyo · The Making of Harry Potter</div></div>
          <div className="day-weather">🪄</div>
        </div>
        <div className="jtxt">
          <p>The last day went to Warner Bros. Studio Tour Tokyo. For a Harry Potter fan, it really did feel like a pilgrimage: posters, costumes, props, and sets stepped out of the screen and became full rooms, while interactions such as stirring a glowing cauldron made it easy to linger.</p>
          <p>Shopping continued before the flight: RMB 853.96 at Matsumoto Kiyoshi, RMB 585.02 in Harry Potter merchandise, RMB 758.83 for Jo Malone perfume, RMB 720.60 in gifts, and RMB 4,438.55 at Sunrise Duty Free. Day 7 totaled RMB 7,356.96.</p>
        </div>
        <Gallery grid="g4" photos={[
          { file: "wizard-robe-by-display-case.jpeg", alt: "Visitor in wizard robes beside a Harry Potter display case", caption: "Robes on, stepping into the film world", shape: "pt" },
          { file: "harry-potter-undesirable-no-1-poster.png", alt: "Harry Potter Undesirable No. 1 poster", caption: "A familiar wanted poster as a physical prop", shape: "pt" },
          { file: "harry-potter-poster-display.png", alt: "Harry Potter posters displayed in the studio tour", caption: "Posters and prop details inside the studio", shape: "pt" },
          { file: "wizard-stirring-glowing-cauldron.jpeg", alt: "Visitor in wizard robes stirring a glowing cauldron", caption: "The final day&apos;s most hands-on moment", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🛍️</span><span style={{ fontSize: 12 }}>HAUL 1</span></div>
          <div><div className="day-title">Shoes and Clothes Taking Over the Floor</div><div className="day-sub">Sneakers · streetwear · outerwear</div></div>
        </div>
        <div className="jtxt"><p>The journal says, “I buy too much every time,” and the photographs prove it thoroughly. Shoe boxes, T-shirts, sweatshirts, a puffer, trousers, and a backpack are laid out one by one. Shopping was not a side activity here; it was one of the trip&apos;s main routes.</p></div>
        <Gallery grid="g4" photos={[
          { file: "nike-shoes-in-open-boxes.png", alt: "Nike sneakers displayed in open shoe boxes", caption: "Two open boxes marking the sneaker haul", shape: "pt" },
          { file: "folded-puffer-jacket-and-pants.png", alt: "Folded puffer jacket and trousers", caption: "Outerwear and trousers from the haul", shape: "pt" },
          { file: "black-backpack-and-khaki-pants.png", alt: "Black backpack and khaki trousers", caption: "A backpack and everyday trousers", shape: "pt" },
          { file: "packaged-bape-crewneck-shirt.png", alt: "Packaged Bape crewneck shirt", caption: "A Bape piece added to the list", shape: "pt" },
          { file: "atmo-black-shirts-packaged.png", alt: "Packaged black ATOMS T-shirts", caption: "The two ATOMS T-shirts", shape: "pt" },
          { file: "uniqlo-kaws-graphic-tshirts.png", alt: "Uniqlo KAWS graphic T-shirts", caption: "Graphic T-shirts from Uniqlo", shape: "pt" },
          { file: "paris-saint-germain-clothing-set.png", alt: "Paris Saint-Germain T-shirt and sweatshirt", caption: "The T-shirt and sweatshirt from the PSG store", shape: "pt" },
          { file: "arcteryx-black-jackets-folded.png", alt: "Two folded black Arc'teryx jackets", caption: "The two Arc&apos;teryx pieces from Day 6", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🎁</span><span style={{ fontSize: 12 }}>HAUL 2</span></div>
          <div><div className="day-title">Drugstore Finds, Snacks, Knives, and Wizarding Souvenirs</div><div className="day-sub">Drugstore · snacks · souvenirs · kitchenware</div></div>
        </div>
        <div className="jtxt"><p>The other half of the suitcase belonged to drugstore products, snacks, and gifts. Harry Potter merchandise formed its own group; eye drops, cold remedies, skincare, and confectionery boxes filled the rest of the floor. Three ceramic knives were the most unexpected set.</p></div>
        <Gallery grid="g4" photos={[
          { file: "harry-potter-souvenir-items.png", alt: "Harry Potter souvenir items arranged together", caption: "Wizarding World souvenirs from the studio", shape: "pt" },
          { file: "japanese-snack-boxes-on-carpet-2.png", alt: "Japanese confectionery boxes arranged on a carpet", caption: "The first group of gifts and snack boxes", shape: "pt" },
          { file: "japanese-healthcare-products-flatlay.png", alt: "Japanese healthcare and drugstore products laid flat", caption: "The drugstore haul spread out", shape: "pt" },
          { file: "three-ceramic-kitchen-knives.png", alt: "Three ceramic kitchen knives", caption: "Three ceramic knives standing out in the luggage", shape: "pt" },
        ]} />
        <Gallery grid="g3" photos={[
          { file: "japanese-eye-and-cold-medicines.png", alt: "Japanese eye drops and cold medicine", caption: "Restocking eye drops and everyday medicine", shape: "pt" },
          { file: "japanese-snack-boxes-on-carpet.png", alt: "Multiple Japanese snack and gift boxes", caption: "A second group of snacks expanding the suitcase", shape: "pt" },
          { file: "korean-skincare-products-flatlay.png", alt: "Skincare products arranged in a flat lay", caption: "The skincare purchases in one record", shape: "pt" },
        ]} />
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>🧾</span><span style={{ fontSize: 12 }}>BILL</span></div>
          <div><div className="day-title">The Shopping Bill: Nearly RMB 20,000 in Footnotes</div><div className="day-sub">Recorded totals · shared expenses · no silent corrections</div></div>
        </div>
        <div className="bill mt20">
          <div className="br"><span>Day 4 · Shibuya shopping</span><b>JPY 103,900 / RMB 5,082</b></div>
          <div className="br"><span>Day 5 · Uniqlo</span><b>RMB 1,060.52</b></div>
          <div className="br"><span>Day 6 · Arc&apos;teryx and Don Quijote</span><b>RMB 5,698.85</b></div>
          <div className="br"><span>Day 7 · Drugstore, merchandise, perfume, gifts, duty free</span><b>RMB 7,356.96</b></div>
          <div className="br total"><span>Total from the daily records</span><b>RMB 19,198.33</b></div>
        </div>
        <div className="nbox mt20">
          <div className="nbox-lbl">Shared expenses · crossed out in the source</div>
          <p>Shibuya Sky JPY 8,800; bus from Kawaguchiko to Shinjuku JPY 8,800; meals JPY 16,500; tempura JPY 8,100; and Kyushu ramen JPY 7,090. These were split expenses and are not added to the shopping total above.</p>
        </div>
        <div className="rbox mt16">
          <h4>Where we stayed</h4>
          <div className="ri"><span className="nm">Lake Kawaguchi</span><span className="cm">Fuji Ginkei · lakeside onsen hotel</span></div>
          <div className="ri"><span className="nm">Tokyo</span><span className="cm">Sotetsu Grand Fresa Takadanobaba</span></div>
        </div>
        <div className="nbox mt16">
          <div className="nbox-lbl">Preserving the ledger as written</div>
          <p>The two Day 6 line items do not exactly match the handwritten total. Rather than silently correcting the diary, this entry keeps the original RMB 5,698.85 figure.</p>
        </div>
      </JournalCard>

      <JournalCard page={12}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>💭</span><span style={{ fontSize: 12 }}>FIN</span></div>
          <div><div className="day-title">A Quiet Mountain First, Then Tokyo Packed into the Suitcase</div><div className="day-sub">Lake quiet · city lights · a very full suitcase</div></div>
        </div>
        <div className="jtxt">
          <p>Looking back, Lake Kawaguchi and Tokyo moved at completely different speeds. The first two days are remembered through Mount Fuji outside the window, lake water, and an onsen hotel. Then came Asakusa incense, Shibuya&apos;s high night view, Ginza glass, Akihabara rain, Yokohama&apos;s skyline, and the Harry Potter sets.</p>
          <p>There was enough shopping to fill two whole pages. Yet the trip is held together by its shifts in scale: from the stillness of one mountain to an entire city of lights, then the satisfaction of laying every purchase out again after coming home.</p>
        </div>
        <div className="dv mt24 mb16"><span>🗻</span></div>
        <div className="hwcn" style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p>Mount Fuji stayed outside the window; Tokyo went into the suitcase.</p>
          <p>Seven full days, even more photographs,</p>
          <p>and still another Japanese neighborhood to walk next time.</p>
        </div>
        <div className="tags mt24">
          <span className="tag tag-c">#LakeKawaguchi</span><span className="tag tag-t">#TokyoStreets</span>
          <span className="tag tag-g">#ShibuyaSky</span><span className="tag tag-b">#Yokohama</span>
          <span className="tag tag-p">#JapanHaul</span>
        </div>
        <div style={{ marginTop: 34, textAlign: "center" }}><span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2023.11</span></div>
      </JournalCard>
    </div>
  );
}
