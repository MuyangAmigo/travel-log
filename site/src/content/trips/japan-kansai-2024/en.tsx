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

export default function KansaiEN() {
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
              <span style={{ display: "block" }}>Kansai ·</span>
              <span style={{ display: "block" }}>Cherry Lights, Magic &amp; Matcha</span>
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
                maxWidth: 500,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              &ldquo;From Osaka&apos;s neon and a world of magic,<br />
              to Kyoto under cherry lights, then a whole street scented with tea.&rdquo;
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
            <div className="day-title">Six days, three speeds of Kansai</div>
            <div className="day-sub">Osaka · Universal Studios · Kyoto · Uji</div>
          </div>
        </div>

        <div className="jtxt">
          <p>We flew from Pudong to Kansai on April 10 and based ourselves at Sotetsu Fresa Inn in Yodoyabashi. The first half ran on Osaka night streets and theme-park adrenaline; the middle went to two serious shopping pushes through Kyoto and Umeda. Only in Uji, near the end, did the trip truly slow down.</p>
          <p>The pictures tell the same story. Hogwarts rose into a grey sky while Mario&apos;s world glowed like a game booting up. Kyoto moved from a packed shopping arcade by day to a five-storey pagoda, blossoms and light after dark. On the final day, we returned to Osaka for one last supply run, with both luggage and ledger nearing capacity.</p>
        </div>

        <div className="route mt20" style={{ flexWrap: "wrap", gap: 4 }}>
          <div className="rs"><div className="ic">✈️</div><div className="lb">Kansai Airport</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🌃</div><div className="lb">Osaka</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🎢</div><div className="lb">USJ</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🌸</div><div className="lb">Kyoto</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🛍️</div><div className="lb">Umeda</div></div><div className="ra">→</div>
          <div className="rs"><div className="ic">🍵</div><div className="lb">Uji</div></div>
        </div>

        <div className="pgrid g2 mt20">
          <Photo file="kyoto-temple-and-tower.jpg" alt="Kyoto Tower rising behind the roof of a historic temple" caption="Old and new Kyoto stacked in a single frame" shape="ls" />
          <Photo file="japanese-temple-garden-pond.jpg" alt="Temple garden pond and pine trees in spring sunlight" caption="Spring kept a quieter face on the water and pine branches" shape="ls" />
        </div>
      </JournalCard>

      <JournalCard page={3}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">Osaka arrival, yakiniku opening act</div>
            <div className="day-sub">Wednesday, April 10th · KIX → Yodoyabashi</div>
          </div>
          <div className="day-weather">🌙</div>
        </div>

        <div className="jtxt">
          <p>HO1621 reached Kansai T1 in the afternoon. After dropping our bags at the Yodoyabashi hotel, we deliberately kept the first day loose and simply wandered into Osaka. The trip only felt switched on once the neon came up.</p>
          <p>Dinner was OKINI&apos;s all-you-can-eat yakiniku, bookable through Google Maps and paid in cash. Meat had barely hit the tabletop grill before glasses met above it. More than any landmark, that half-tired first dinner—still mentally arriving—became the opening frame of the six days.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="busy-city-nightlife-selfie.jpeg" alt="Two travellers taking a selfie on a crowded neon-lit Osaka street" caption="Our first night loop after dropping the bags: Osaka already full of light and people" shape="hero" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="korean-bbq-table-grill.jpg" alt="A hand turning slices of meat on a tabletop grill" caption="OKINI yakiniku: the first meal needed proper opening-scene energy" shape="sq" />
          <Photo file="japanese-izakaya-drinks-toast.jpg" alt="Two Japanese drinks meeting in a toast over dinner" caption="Arrival toast—jet lag and tired legs could wait" shape="sq" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">The tiny first-day ledger</div>
          <p>Starbucks was 618 JPY, about 29 CNY. Yakiniku was cash-only, a reminder to keep enough yen for the smaller places along the way.</p>
        </div>
      </JournalCard>

      <JournalCard page={4}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">USJ: win the morning, enter the magic</div>
            <div className="day-sub">Thursday, April 11th · Universal Studios Japan</div>
          </div>
          <div className="day-weather">🎢</div>
        </div>

        <div className="jtxt">
          <p>This was the day when preparation shaped everything: install the USJ app, pack 100-yen coins, photo props and a disposable poncho, arrive before 7:15, and enter around 7:45. The moment we scanned in, we linked the digital passes and entered the timed-entry lottery for Super Nintendo World. Move fast early, relax later.</p>
          <p>Harry Potter and the Forbidden Journey came first. Grey-blue cloud sat behind the Hogwarts turrets and made the castle feel even more cinematic. The Nintendo World ticket in hand carried the promise of the afternoon long before we reached it.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="hogwarts-castle-turrets.jpg" alt="Tall Hogwarts Castle turrets beneath an overcast sky" caption="The cloudy sky gave Hogwarts its own film filter" />
          <Photo file="universal-studios-japan-nintendo-world-tickets.jpg" alt="A hand holding paper entry tickets for Super Nintendo World at USJ" caption="Timed entry secured; the Mario window was officially on the schedule" />
        </div>
        <div className="pgrid g3 mt12">
          <Photo file="palm-lined-city-street-scene.jpg" alt="Visitors walking along a palm-lined avenue at Universal Studios Japan" caption="Crowds and palms pushed the morning straight into excitement" shape="sq" />
          <Photo file="doraemon-adventureland-entrance-signs.jpg" alt="Colourful Doraemon attraction entrance signs" caption="Familiar characters all the way through, like walking across childhood channels" shape="sq" />
          <Photo file="sesame-street-central-park-mascot.jpg" alt="A pink Sesame Street character statue in the themed area" caption="Even the roadside characters stayed at maximum saturation" shape="sq" />
        </div>

        <div className="rbox mt16">
          <h4>The opening-hour sequence</h4>
          <p>Harry Potter and the Forbidden Journey → Super Nintendo World → Minion Park → Jaws → Demon Slayer. Watch the 13:00 parade near its starting point, leave around 13:20 for Mario, and keep an eye on WaterWorld showings at 12:00, 14:15 and 16:30.</p>
        </div>
      </JournalCard>

      <JournalCard page={5}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">Mario&apos;s world, colour turned audible</div>
            <div className="day-sub">Super Nintendo World · Parade · Souvenirs</div>
          </div>
          <div className="day-weather">🍄</div>
        </div>

        <div className="jtxt">
          <p>The biggest surprise in Super Nintendo World was not one ride but the whole hillside rendered as a game screen: mushrooms, bricks, castles and green pipes crowded into a single view, the colours so dense they almost made sound. The bunny-ear hats, entrance portraits and clean blue sky kept the lightest part of the day intact.</p>
          <p>We kept collecting details between rides. Cookie Monster hid beside a practical sign; the Mario shop sold keychains with secret variants, worth asking a staff member about directly. Park pizza and souvenirs stretched the mood a little longer before tsukemen ended the night.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="super-mario-mushroom-kingdom-castle.jpg" alt="The layered castles and hills of Super Nintendo World" caption="From above, the entire park became a three-dimensional game map" shape="hero" />
        </div>
        <div className="pgrid g3 mt12">
          <Photo file="super-nintendo-world-entrance.jpeg" alt="Two travellers posing at the Super Nintendo World entrance" caption="Finally walking through the gate printed on the ticket" shape="sq" />
          <Photo file="friends-in-bunny-hats.jpeg" alt="Two travellers wearing bunny-ear hats at Universal Studios Japan" caption="Put on the props and theme-park commitment doubles immediately" shape="sq" />
          <Photo file="cookie-monster-restaurant-sign.jpg" alt="A restaurant direction sign shaped like Cookie Monster" caption="Even the signage refused to be merely practical" shape="sq" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>Admission</span><span>818 CNY</span></div>
          <div className="br"><span>Monster Hunter merchandise</span><span>187 CNY</span></div>
          <div className="br"><span>Park pizza</span><span>175 CNY</span></div>
          <div className="br"><span>USJ souvenirs</span><span>306 CNY</span></div>
          <div className="br"><span>Melon Starbucks + dinner</span><span>184 CNY</span></div>
          <div className="br total"><span>Day 2</span><span>1,670 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={6}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">Kyoto by day: arcades and eel rice</div>
            <div className="day-sub">Friday, April 12th · Shijō · Kawaramachi</div>
          </div>
          <div className="day-weather">🛍️</div>
        </div>

        <div className="jtxt">
          <p>From Shijō Station, we started at Exit 1 with the Arc&apos;teryx flagship, Kyoto Yodobashi, then continued through Kawaramachi and Shinkyogoku. The covered arcade compressed crowds, signs and shops into one long corridor; brand after brand appeared from the plan until time became difficult to track.</p>
          <p>Unagi rice restored enough energy for the afternoon, still steaming when the wooden tub opened. Patagonia Kyoto had a broad selection, but the standalone shop offered neither tax-free shopping nor bags. That practical detail deserved a place in the journal more than another generic “worth visiting.”</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="shinkyogoku-shopping-arcade-kyoto.jpg" alt="Crowds and shop signs beneath Shinkyogoku's covered arcade" caption="Shinkyogoku&apos;s long corridor tied the day&apos;s shopping route together" shape="ls" />
          <Photo file="grilled-eel-rice-bowl-meal.jpg" alt="Grilled eel over rice in a wooden tub with soup" caption="An 11,370 JPY unagi lunch, fuel for the rest of the afternoon" shape="ls" />
        </div>
        <div className="pgrid g3 mt12">
          <Photo file="human-made-store-mirror.jpg" alt="Two travellers posing in a mirror inside Human Made" caption="A mirror stop inside Human Made" shape="sq" />
          <Photo file="two-people-by-cat-mural.jpeg" alt="Two travellers posing in front of a pine-tree and cat mural" caption="Between shops, a quiet and slightly strange giant-cat wall" shape="sq" />
          <Photo file="cat-mural-under-pine-tree.jpg" alt="A Japanese mural of a giant cat resting beneath a pine tree" caption="Without us in frame, the enormous cat beneath the pine finally appeared" shape="sq" />
        </div>
      </JournalCard>

      <JournalCard page={7}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">Kyoto after dark: Tō-ji in cherry light</div>
            <div className="day-sub">Tō-ji · Night Blossoms</div>
          </div>
          <div className="day-weather">🌸</div>
        </div>

        <div className="jtxt">
          <p>Shopping bags filled the daytime, but reaching Tō-ji after dark reset our attention completely. Warm light lifted the five-storey pagoda out of the black sky while blossoms turned into a pale haze in the foreground. Water, branches and tower shadow layered together—it really was “stunning,” beyond what the photos could hold.</p>
          <p>Along the way were a wooden teahouse entrance, a tiny garden altar and the glowing sign of an okonomiyaki restaurant. None was a headline stop, yet together they returned Kyoto from a shopping list to a city where people actually live.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="illuminated-pagoda-cherry-blossoms-night.jpg" alt="Tō-ji's illuminated five-storey pagoda behind night cherry blossoms" caption="Tō-ji under night blossoms—the image that became this Kansai trip&apos;s cover" shape="hero" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="cherry-blossoms-around-temple-at-night.jpg" alt="Cherry blossoms surrounding a temple in the dark" caption="Blossoms slowly traced the edge of the temple" shape="ls" />
          <Photo file="illuminated-japanese-pagoda-night.jpg" alt="A five-storey pagoda illuminated alone against the night sky" caption="Remove the foreground and only tower and pure black remain" shape="ls" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="traditional-japanese-teahouse-entrance.jpg" alt="A traditional teahouse entrance with a red noren among trees" caption="A timber doorway tucked quietly into daytime green" />
          <Photo file="japanese-garden-shrine-altar.jpg" alt="A tiny shrine altar beside a stone lantern in a Japanese garden" caption="Stone lantern, paper light and a small altar made the street corner still" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="night-temple-selfie-japan.jpeg" alt="Two travellers posing with an illuminated pagoda at night" caption="After a full day on foot, one portrait with the night blossoms" shape="ls" />
          <Photo file="kyoto-okonomiyaki-restaurant-sign.jpg" alt="A Japanese okonomiyaki restaurant sign glowing at night" caption="Leaving the temple, a restaurant sign pulled us back into everyday warmth" shape="ls" />
        </div>
      </JournalCard>

      <JournalCard page={8}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">Kyoto's shopping-bag scorecard</div>
            <div className="day-sub">Arc&apos;teryx · Nanga · Snow Peak · Beams</div>
          </div>
          <div className="day-weather">🧾</div>
        </div>

        <div className="jtxt">
          <p>Shopping remained the real daytime plot: jackets, tees and shoes kept joining the bags. The blossoms made the ending romantic; the ledger made every earlier decision explicit.</p>
        </div>

        <div className="sgrid mt16">
          <div className="sc"><div className="sc-title">Arc&apos;teryx</div><div className="sc-sub">Solano Jacket M</div><div className="sc-price">2,122 CNY</div></div>
          <div className="sc"><div className="sc-title">Snow Peak</div><div className="sc-sub">Jackets × 2</div><div className="sc-price">2,484 CNY</div></div>
          <div className="sc"><div className="sc-title">The North Face</div><div className="sc-sub">Shell jacket</div><div className="sc-price">1,452 CNY</div></div>
          <div className="sc"><div className="sc-title">ABC Mart</div><div className="sc-sub">Adidas sneakers</div><div className="sc-price">466 CNY</div></div>
          <div className="sc"><div className="sc-title">Barbour</div><div className="sc-sub">Tee</div><div className="sc-price">466 CNY</div></div>
          <div className="sc"><div className="sc-title">Beams</div><div className="sc-sub">North Face tees × 2</div><div className="sc-price">452 CNY</div></div>
          <div className="sc"><div className="sc-title">Bape</div><div className="sc-sub">Tee</div><div className="sc-price">431 CNY</div></div>
          <div className="sc"><div className="sc-title">Nanga</div><div className="sc-sub">Tee</div><div className="sc-price">250 CNY</div></div>
        </div>

        <div className="bill mt20">
          <div className="br total"><span>Day 3 shopping</span><span>8,656 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={9}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">Umeda: still browsing at 10 p.m.</div>
            <div className="day-sub">Saturday, April 13th · Umeda</div>
          </div>
          <div className="day-weather">🏬</div>
        </div>

        <div className="jtxt">
          <p>Dumplings for lunch, then the full Umeda retail circuit: G-Star jeans, tumblers and a shaver at Yodobashi; Lululemon in Lucua; outdoor specialist Ishii; then back to Arc&apos;teryx. The blue Hanshin Umeda sign stayed with us from daylight into night, and at 22:00 we were somehow still shopping.</p>
          <p>Dinner was an oyakodon-style egg-and-chicken rice bowl paid in cash, followed by Taiyoo Massage as compensation for our legs. A 42 CNY dessert supplied the final sugar for this long-distance indoor hike.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="hanshin-railway-umeda-station-sign.jpg" alt="Blue Hanshin Railway Umeda Station sign against Osaka buildings" caption="Umeda&apos;s coordinates: railway, department stores and dense towers" shape="ls" />
          <Photo file="the-north-face-store-display.jpg" alt="The North Face store logo framed by indoor plants" caption="Outdoor labels continued to control the shopping list" shape="ls" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>Arc&apos;teryx Solano Hoody M</span><span>2,541 CNY</span></div>
          <div className="br"><span>Panasonic Series 9 shaver</span><span>2,117 CNY</span></div>
          <div className="br"><span>Lululemon × 2</span><span>1,181 CNY</span></div>
          <div className="br"><span>Thermal tumblers × 6</span><span>808 CNY</span></div>
          <div className="br"><span>G-Star Raw jeans</span><span>763 CNY</span></div>
          <div className="br total"><span>Day 4 shopping</span><span>7,591 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={10}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div>
            <div className="day-title">Uji, turning down the walking pace</div>
            <div className="day-sub">Sunday, April 14th · Byōdō-in · Uji River</div>
          </div>
          <div className="day-weather">🍵</div>
        </div>

        <div className="jtxt">
          <p>Starting from either Keihan Uji or JR Uji, the city volume dropped immediately. The narrow residential lanes had none of Osaka&apos;s screens or Kyoto&apos;s shopping crowds—only pale walls, power lines and hills at the far end. We paid cash for tonkatsu, then walked a line through Byōdō-in, Uji Shrine and Ujigami Shrine.</p>
          <p>Uji slows you down without asking. Tea shops sent matcha into the street; the river opened between trees and wooded slopes. Someone read on a bench while a barista worked carefully behind a counter. Those quiet scenes felt more like the day than any completed checklist.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="narrow-japanese-residential-street.jpg" alt="A quiet narrow residential lane in Uji" caption="Beyond the station, the streets lowered the volume first" />
          <Photo file="barista-behind-coffee-counter.jpg" alt="A barista in a white shirt preparing drinks behind a timber counter" caption="The movement behind the counter was slow enough to match Uji" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="person-reading-on-park-bench.jpg" alt="A person reading on a park bench beneath leafy trees" caption="A reader under the trees, demonstrating the city&apos;s preferred pace" shape="ls" />
          <Photo file="japanese-shrine-torii-gate.jpg" alt="A red torii leading into a wooded shrine in Uji" caption="The red torii sat deep inside layers of green" shape="ls" />
        </div>
      </JournalCard>

      <JournalCard page={11}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div>
            <div className="day-title">Doing nothing by the river counted</div>
            <div className="day-sub">Uji River · Matcha Souvenirs · Kyoto Station</div>
          </div>
          <div className="day-weather">🌿</div>
        </div>

        <div className="jtxt">
          <p>Once we reached the river, we stopped trying to add tasks. A dam, wooded hills and distant slopes spread into layers of green beneath the clear sky; we stood by the water for one simple portrait. Sitting and staring was the central Uji experience, not merely a break between sights.</p>
          <p>Before leaving, we bought matcha gifts and “Uji Grandpa Matcha.” Back near Kyoto Station that evening, we passed Higashi Hongan-ji and Kyoto Tower, then ended the slower day with conveyor-belt sushi.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="river-dam-and-wooded-hills.jpg" alt="A dam on the Uji River beneath wooded hills" caption="River, dam and distant hills pulled the view wide open" shape="hero" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="two-people-by-riverside.jpeg" alt="Two travellers posing beside the Uji River and green hills" caption="The day&apos;s fullest souvenir was an ordinary portrait by the water" shape="ls" />
          <Photo file="japanese-temple-garden-pond.jpg" alt="A temple garden pond and hall in spring sunlight" caption="The garden water held the spring light intact" shape="ls" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>Uji matcha souvenirs</span><span>331 CNY</span></div>
          <div className="br"><span>Uji Grandpa Matcha</span><span>156 CNY</span></div>
          <div className="br"><span>Conveyor-belt sushi</span><span>382 CNY</span></div>
          <div className="br total"><span>Day 5</span><span>869 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={12}>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">6</span></div>
          <div>
            <div className="day-title">One last Nakazakichō walk, then home</div>
            <div className="day-sub">Monday, April 15th · Nakazakichō → KIX</div>
          </div>
          <div className="day-weather">✈️</div>
        </div>

        <div className="jtxt">
          <p>We still could not bring ourselves to go straight to the airport. First came Sukunahikona Shrine, then Mos Burger and a Nakazakichō city walk. Weathered timber houses, narrow shopfronts and a white little café sat between Osaka&apos;s modern offices; the streets around Neel Coffee showed us one more version of the city before departure.</p>
          <p>We carried cold fruit drinks through the final walk, returned to Daimaru&apos;s Nintendo and Pokémon stores, bought gifts at the Osaka Station 7-Eleven, then made a Matsumoto Kiyoshi run. Airport ramen was the last meal before HO1338 left at 21:30 for Pudong.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="weathered-wooden-building-japan-street.jpg" alt="A weathered wooden corner building with hand-painted signs in Nakazakichō" caption="Nakazakichō&apos;s old timber houses briefly shrank Osaka into a neighbourhood" />
          <Photo file="white-stucco-cafe-exterior-planter.jpg" alt="A white stucco café entrance with plants and a small window" caption="White wall, plants and a tiny window—the lightest corner of the walk" />
        </div>
        <div className="pgrid g2 mt12">
          <Photo file="urban-office-building-street-traffic.jpg" alt="Modern Osaka office buildings above street traffic" caption="Turn one corner and the old lanes reconnect to modern Osaka" shape="ls" />
          <Photo file="holding-passionfruit-drinks-outdoors.jpg" alt="Two hands raising iced fruit drinks outdoors" caption="One last cold drink, finished while walking" shape="ls" />
        </div>

        <div className="bill mt16">
          <div className="br"><span>Mos Burger + mobile data</span><span>194 CNY</span></div>
          <div className="br"><span>7-Eleven gifts</span><span>455 CNY</span></div>
          <div className="br"><span>Matsumoto Kiyoshi</span><span>592 CNY</span></div>
          <div className="br"><span>Animal Crossing bottle + airport ramen</span><span>390 CNY</span></div>
          <div className="br total"><span>Day 6</span><span>1,631 CNY</span></div>
        </div>
      </JournalCard>

      <JournalCard page={13}>
        <div className="day-header">
          <div className="day-circle"><span style={{ fontSize: 23 }}>¥</span><span style={{ fontSize: 12 }}>TOTAL</span></div>
          <div>
            <div className="day-title">Six days, one ledger, many bags</div>
            <div className="day-sub">Flights · Hotel · Cash · Shopping</div>
          </div>
        </div>

        <div className="jtxt">
          <p>This was a shopping-heavy trip. Lululemon, the electric shaver and Arc&apos;teryx all received ticks, while the DJI Osmo Mobile 6 had already been bought before departure. Stone Island, Gentle Monster, plum wine and yuzu liqueur remained for another list.</p>
          <p>The total preserves the journal&apos;s original method: flights, hotel, Suica top-up and exchanged cash were recorded first, then each day&apos;s spending was added below. It is the personal closing ledger from the trip, not a deduplicated accounting statement.</p>
        </div>

        <div className="bill mt20">
          <div className="br"><span>Flights</span><span>3,744 CNY</span></div>
          <div className="br"><span>Hotel</span><span>2,945 CNY</span></div>
          <div className="br"><span>Suica, 18,100 JPY</span><span>852 CNY</span></div>
          <div className="br"><span>Cash, 66,000 JPY</span><span>3,105 CNY</span></div>
          <div className="br"><span>Six days of spending</span><span>20,446 CNY</span></div>
          <div className="br total"><span>Journal total</span><span>31,092 CNY</span></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">Repeat before the next departure</div>
          <p>Bring a credit card and leftover yen, top up Suica, book airport transfers and check in online, pack the goshuin book, and complete Visit Japan Web. For USJ, add 100-yen coins and a disposable poncho.</p>
        </div>

        <div className="tags mt20">
          <span className="tag-red">USJ</span>
          <span className="tag-blue">Kyoto at night</span>
          <span className="tag-green">Uji matcha</span>
          <span className="tag-yellow">Shopping haul</span>
        </div>
      </JournalCard>
    </div>
  );
}
