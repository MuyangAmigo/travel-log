import type { ReactNode } from "react";
import CardScaleController from "@/components/CardScaleController";
import TripEntryLayout, {
  type TripEntrySection,
} from "@/components/TripEntryLayout";
import { img } from "./meta";

const SECTIONS = [
  {
    id: "overview",
    marker: "FUKUOKA",
    label: "Trip cover",
    detail: "Wandering at my own pace · June 3–7, 2026",
  },
  {
    id: "route",
    marker: "ROUTE",
    label: "Trip overview",
    detail: "Fukuoka City · Seaside · Dazaifu · Five days, four nights",
  },
  {
    id: "day-1",
    marker: "DAY 1",
    label: "Arriving in Fukuoka",
    detail: "Shanghai to Hakata · Ramen, shrines, and a Nakasu night walk",
  },
  {
    id: "day-2",
    marker: "DAY 2",
    label: "Shrines in the rain",
    detail: "Goshuin, Tenjin, and a shopping day rewritten by heavy rain",
  },
  {
    id: "day-3",
    marker: "DAY 3",
    label: "An impromptu seaside",
    detail: "Parks, castle ruins, tsukemen, and a long walk home",
  },
  {
    id: "day-4",
    marker: "DAY 4",
    label: "A day in Dazaifu",
    detail: "Tenmangu, the Kyushu National Museum, and Kamado Shrine",
  },
  {
    id: "day-5",
    marker: "DAY 5",
    label: "An easy goodbye",
    detail: "Fukuoka Airport to Shanghai · One last photo above the clouds",
  },
  {
    id: "notes",
    marker: "NOTES",
    label: "Shopping and reflection",
    detail: "The bill, the unused plan, and what a first solo trip left behind",
  },
] satisfies readonly TripEntrySection[];

const RAIL_LABELS = {
  navigation: "Trip chapters",
  current: "Current chapter",
  progress: "Reading progress",
};

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
  anchor = false,
  page,
  sectionId,
  children,
}: {
  anchor?: boolean;
  page: number;
  sectionId: string;
  children: ReactNode;
}) {
  return (
    <section
      className="card-wrap"
      id={anchor ? sectionId : undefined}
      data-trip-section={sectionId}
    >
      <div className="card">
        {children}
        <div className="page-num">- {String(page).padStart(2, "0")} -</div>
      </div>
    </section>
  );
}

export default function FukuokaSoloEN() {
  return (
    <TripEntryLayout
      className="fukuoka-solo-trip"
      labels={RAIL_LABELS}
      sections={SECTIONS}
    >
      <CardScaleController />

      <section
        className="card-wrap"
        id="overview"
        data-trip-section="overview"
      >
        <div className="card" style={{ padding: "50px 55px" }}>
          <img
            className="trip-cover-image"
            src={img("cover-2026-08.png")}
            alt=""
            aria-hidden="true"
          />
          <div className="stamp-circle" style={{ position: "absolute", top: 30, right: 30 }}>
            <div>FUKUOKA<br />2026</div>
          </div>
          <div className="cover-border">
            <div className="cover-emoji">☔ ⛩️ 🌊</div>
            <h1 className="cover-title">
              <span style={{ display: "block" }}>Fukuoka,</span>
              <span style={{ display: "block" }}>Wandering at</span>
              <span style={{ display: "block" }}>My Own Pace</span>
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
              “It turns out I wasn&apos;t afraid of being alone;<br />I had simply never learned to be with myself.”
            </p>
            <div style={{ marginTop: 35 }}>
              <span className="stamp-box">SOLO PASS</span>
            </div>
          </div>
          <div className="page-num">- 01 -</div>
        </div>
      </section>

      <JournalCard page={2} sectionId="route" anchor>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>🗺️</span>
            <span style={{ fontSize: 12 }}>ROUTE</span>
          </div>
          <div>
            <div className="day-title">A Full Plan, a Gentler Trip</div>
            <div className="day-sub">Fukuoka City · Seaside · Dazaifu · Five days, four nights</div>
          </div>
        </div>

        <div className="jtxt">
          <p>Before I left, my itinerary had a Kumamoto Shinkansen trip, Fukuoka Tower, Momochi Seaside Park, Itoshima, and a long must-eat list. Once I arrived, rain, sleep, and spur-of-the-moment decisions took over the route.</p>
          <p>I never made it to Kumamoto or rushed out to Itoshima. Instead, there were rainy temples and shrines, a long gaze shared with a black-and-white cat, a quiet seaside and park, and so much time to walk and think slowly on my own.</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">06.03</span><div className="ev">Shanghai → Fukuoka</div><div className="dt">Shin Shin, Kushida Shrine, Canal City, and a night walk through Nakasu</div></div>
          <div className="tl-item"><span className="tm">06.04</span><div className="ev">Rainy shrines and Tenjin</div><div className="dt">The park and waterfront plans were cancelled; goshuin and shopping took their place</div></div>
          <div className="tl-item"><span className="tm">06.05</span><div className="ev">Kumamoto cancelled; an impromptu seaside instead</div><div className="dt">Canal City, the seaside, Ohori Park, Fukuoka Castle Ruins, tsukemen, and an epic walk</div></div>
          <div className="tl-item"><span className="tm">06.06</span><div className="ev">Dazaifu and Kamado Shrine</div><div className="dt">Tenmangu, the Kyushu National Museum, a shrine in the hills, and motsunabe</div></div>
          <div className="tl-item"><span className="tm">06.07</span><div className="ev">Fukuoka → Shanghai</div><div className="dt">Airport bus, duty free, and a goodbye above the clouds</div></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">The rhythm of this trip</div>
          <p>No rushing and no waiting for anyone. What time I got up, where I went, what I ate, whether I took a detour—I was answerable only to myself.</p>
        </div>
      </JournalCard>

      <JournalCard page={3} sectionId="day-1" anchor>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">Waking Naturally, Leaving Slowly</div>
            <div className="day-sub">Wednesday, June 3rd · Shanghai ✈️ Fukuoka</div>
          </div>
          <div className="day-weather">🌦️</div>
        </div>

        <div className="jtxt">
          <p>I had overdone the exercise the day before and hadn&apos;t slept soundly either. In the morning I drowsily scrolled through Microsoft Build news, then did not leave home until after ten. An RMB 40 taxi took me to the Jinghong Road station for the Airport Link; the train was almost perfectly timed, and I reached Pudong Airport in a little over twenty minutes.</p>
          <p>By 11:45, I was seated in Lounge 170. The hot dishes, salads, pastries, and fruit were more plentiful than I had expected, and I grabbed water, a sandwich, and coffee after eating. I had not thought through Fukuoka in detail. I was on my own, after all—I could figure it out once I got there.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="01-airport-lounge-meal.jpeg" alt="Meal by the window in Pudong Airport Lounge 170" caption="Lounge 170: taking my time over a meal before departure" />
          <Photo file="02-fukuoka-airport-arrival.jpeg" alt="Runway and sky outside the window on arrival in Fukuoka" caption="A 1-hour-18-minute flight, and Fukuoka was already outside the window" />
        </div>

        <div className="jtxt mt16">
          <p>We were meant to take off at 1:50 but did not push back until 2:00, so I expected another delay. Instead, the flight took only 1 hour and 18 minutes. Fukuoka Airport is small, yet strikingly clean. It had just rained, the air was cool, and fewer than thirty minutes passed from arrival through baggage claim and immigration.</p>
          <p>I took the shuttle bus around from the international terminal to the domestic terminal, then the subway to my hotel. Later I learned that the bus straight from the international terminal to Hakata Station would have been easier.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="03-the-b-hakata-room.jpeg" alt="Mirror selfie in a room at The B Hakata" caption="The B Hakata: a tiny room, just right for one" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">🏨 The B Hakata</div>
          <p>A classic tiny Japanese hotel room, RMB 400–500 a night and a little pricier than Osaka in low season. I finished the egg tart, sandwich, and small bread I had brought from the airport, lay down to rest, and waited for the rain outside to ease.</p>
        </div>
      </JournalCard>

      <JournalCard page={4} sectionId="day-1">
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">1</span></div>
          <div>
            <div className="day-title">Ramen, Shrines, and the River at Night</div>
            <div className="day-sub">Hakata · Kushida Shrine · Canal City · Nakasu</div>
          </div>
          <div className="day-weather">🌙</div>
        </div>

        <div className="jtxt">
          <p>When the evening rain let up, I walked ten minutes to Shin Shin in the Hakata Marui basement. The broth was rich; I chose the firmest setting for the thin noodles, and loved the texture. The broth was concentrated but neither too salty nor greasy. It was my first attempt at ordering in Japanese, and it went smoothly until I suddenly got stuck talking about noodle thickness and had to laugh it off.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="04-shin-shin-order-ticket.jpeg" alt="Order ticket for Shin Shin ramen" caption="The Japanese ordering went smoothly—until the noodle firmness" shape="ls" />
          <Photo file="05-shin-shin-ramen.jpeg" alt="Hakata tonkotsu ramen from Shin Shin" caption="Rich broth, thin noodles, firmest texture: an excellent first meal" shape="ls" />
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="06-hakata-station-night.jpeg" alt="Hakata Station lit up at night" caption="Just after seven, I began my walk from Hakata Station" />
          <Photo file="07-hakata-marui-night.jpeg" alt="Hakata Marui mall illuminated at night" caption="Mall lights made the rainy night feel lively" />
        </div>

        <div className="jtxt mt16">
          <p>It took twenty minutes to walk from Hakata Station to Kushida Shrine. The approach was so quiet at night that I decided to return in daylight for a goshuin the next day. Then I looped around to Canal City, where the yatai along the river were lighting up one by one. I did not sit down to eat, but seeing everyone crowd around the little stalls made dining by the river look wonderfully relaxing.</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="08-kushida-shrine-approach-night.jpeg" alt="Approach to Kushida Shrine at night" caption="The nighttime approach was as quiet as another city" />
          <Photo file="09-kushida-shrine-night.jpeg" alt="Kushida Shrine beneath lanterns at night" caption="A first meeting at night; I would return tomorrow for the goshuin" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">The end of my first night</div>
          <p>On the phone with my dear one, I slowly walked back from Nakasu to Hakata. The route took over an hour, but with someone keeping me company from the other end of the line, it did not feel tiring at all. As usual, I stopped at a convenience store before going upstairs: tea, a small ice cream, and Meiji dark chocolate. Ramen, a shrine, a canal, yatai, and a convenience store—I moved slowly by myself, and it felt so comfortable.</p>
        </div>
      </JournalCard>

      <JournalCard page={5} sectionId="day-2" anchor>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">Rainy Shrines and a Temple Cat</div>
            <div className="day-sub">Kushida Shrine · Tochoji · Mangyoji · Kego Shrine</div>
          </div>
          <div className="day-weather">☔</div>
        </div>

        <div className="jtxt">
          <p>I woke naturally after nine, feeling great, though I still had a little of the nervousness that comes with properly heading out alone for the first time. I followed last night&apos;s route back to Kushida Shrine and received the first goshuin of the trip. They also carefully stamped the backing paper, and it was beautiful. After ten, it began raining again.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="10-tenjin-shop-display.jpeg" alt="Food display in a Fukuoka streetside shop" caption="Heading out in the rain, beginning with everyday scenes by the street" />
          <Photo file="11-tochoji-pagoda.png" alt="Red five-story pagoda at Tochoji" caption="Tochoji&apos;s five-story pagoda was vivid even on a grey rainy day" />
        </div>

        <div className="jtxt mt16">
          <p>Tochoji is not large, but its sights are concentrated. It is said to be the first Shingon temple Kukai founded after returning from Tang China. The Fukuoka Daibutsu is a 16.1-meter wooden seated Shakyamuni; there is also an all-hinoki five-story pagoda and a standing wooden Thousand-Armed Kannon, an Important Cultural Property. A postcard of the Great Buddha was tucked beside my goshuin, though sadly I could not enter the central hall.</p>
          <p>I headed toward Tenjin to look for more places offering goshuin. Just after noon I passed Mangyoji; the rain was growing heavier, so I ducked inside. A black-and-white cat was lying by the temple office window. It kept looking at me, and I kept looking back. Rain drummed steadily on my umbrella, yet the moment felt as though we were somehow meant to meet.</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="12-mangyoji-temple-cat.png" alt="Black-and-white cat by the temple office window at Mangyoji" caption="An unexpected gift from the rain: we looked at each other for a long time" />
          <Photo file="13-tenjin-rainy-street.webp" alt="Rainy Tenjin street and intersection" caption="One subway stop later, I finally reached lively Tenjin" />
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="14-kego-shrine.webp" alt="Kego Shrine nestled among city buildings" caption="Linked to Kego Park, Kego Shrine was a quiet pocket within the bustle" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">A little goshuin mix-up</div>
          <p>The temple office displayed four kinds of Kego Shrine goshuin. Thinking the text differed too, I had two written at once. Thankfully the designs really were different, so the mistake still left me with two memorable pages.</p>
        </div>
      </JournalCard>

      <JournalCard page={6} sectionId="day-2">
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">2</span></div>
          <div>
            <div className="day-title">When Rain Turned the Day into Shopping</div>
            <div className="day-sub">Tenjin Underground Mall · One Fukuoka · Musashi</div>
          </div>
          <div className="day-weather">🌧️</div>
        </div>

        <div className="jtxt">
          <p>I had planned to visit Ohori Park, the Fukuoka Art Museum, Fukuoka Castle Ruins, Fukuoka Tower, and Momochi Seaside Park. The rain intensified, so every one of them had to go. I walked through Tenjin Underground Mall and browsed Patagonia first; there was no tax-free shopping, so I left behind the clothes I liked.</p>
        </div>

        <div className="pgrid g3 mt16">
          <Photo file="15-tenjin-green-installation.webp" alt="Bright green art installation outside a Tenjin shopping complex" caption="A burst of vivid green on a rainy day" />
          <Photo file="16-kego-park.webp" alt="Trees in Kego Park after rain" caption="A city park lay just beyond the shrine" />
          <Photo file="17-one-fukuoka-building.webp" alt="Exterior of One Fukuoka Building" caption="At One Fukuoka, I found KEEN shoes that were adorably ugly and wonderfully comfortable" />
        </div>

        <div className="jtxt mt16">
          <p>One Fukuoka did bring a find: a pair of KEENs for a little over ¥15,000—adorably ugly and exceptionally comfortable. Later I went to Super Sports looking for a badminton racket, but every model I wanted was sold out. Passing Daiso above Mitsukoshi, I remembered I wanted to write in my journal that night and bought a small pair of scissors.</p>
          <p>At five or six I decided to have a good dinner and chose Musashi beside Kego Park. I arrived around six, waited until seven-thirty, and finally ate. The wooden tub of rice was covered with medium-rare wagyu, with a searing-hot stone beside it so I could cook the meat to my liking.</p>
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="18-musashi-wagyu-bowl.webp" alt="Wooden tub of wagyu rice with a hot stone at Musashi" caption="Plain first, seared on the hot stone next, then finished as ochazuke: three ways to eat it" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">Musashi wagyu rice</div>
          <p>The local Fukuoka salt seasoning and crisp garlic chips were delicious. Finally I poured hot tea over the rice for ochazuke, and felt warmed through. The only price was the long queue—it was already after eight when I finished.</p>
        </div>

        <div className="jtxt mt16">
          <p>After nine I went back to the hotel to organize my journal, then went downstairs at ten to talk with my dear one until eleven. I took a bath hoping to soothe my sore feet, but lying down made sleep even harder; I tossed and turned past two. Being alone was easy and freeing, but I also had to know what I wanted to do and not be afraid of solitude.</p>
        </div>
      </JournalCard>

      <JournalCard page={7} sectionId="day-3" anchor>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">Skipping Kumamoto for a Quiet Seaside</div>
            <div className="day-sub">Canal City · Seaside · Ohori Park · Fukuoka Castle Ruins</div>
          </div>
          <div className="day-weather">🌤️</div>
        </div>

        <div className="jtxt">
          <p>On day three, I slept until eleven or noon and did not get out until after one. I bought a small onigiri at a convenience store and helped myself to a hotel coffee. Canal City was again my first stop. I had hoped to buy a badminton racket, but each person was limited to one, so I gave the chance to a colleague and did not get the one I wanted.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="19-canal-city-daytime.webp" alt="Red buildings surrounding Canal City Hakata in daylight" caption="Canal City in daylight: the red architecture and water both stood out" shape="hero" />
        </div>

        <div className="jtxt mt16">
          <p>After two in the afternoon, I spontaneously chose a small seaside place that may have been called something like “Matsuzono no Chi” on the map—the name is uncertain. I only remember forest on one side and the sea on the other. I wandered along the road for a long time, called a colleague too, and heard a whole earful of recent company gossip.</p>
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="20-seaside-torii.webp" alt="Pine trees and a torii facing the beach at the seaside stop" caption="A torii at the end of the forest, with the sea just beyond" />
          <Photo file="21-seaside-pine-path.webp" alt="Long path through a seaside pine grove" caption="On the path through pines, only my footsteps broke the quiet" />
          <Photo file="22-seaside-coast-path.webp" alt="Shaded path leading toward the coast" caption="Tree shade on one side, glimpses of blue sea on the other" />
        </div>

        <div className="jtxt mt16">
          <p>After leaving the coast, I went to Ohori Park. The park in the middle of the city was remarkably quiet. I spotted a donjon marker on the map nearby and followed it, only to find that there was no keep—just Fukuoka Castle Ruins. I spent the day moving among parks, forest, and sea, and both my body and mind relaxed.</p>
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="23-ohori-park-bench.webp" alt="Empty bench beneath a tree in Ohori Park" caption="An empty bench under a tree, perfect for doing nothing" />
          <Photo file="24-fukuoka-castle-ruins-sign.webp" alt="Wooden sign and trees in Fukuoka Castle Ruins Park" caption="I followed the map&apos;s keep marker and found only the ruins" />
          <Photo file="25-fukuoka-castle-ruins-park.webp" alt="Sunlit green trees near Fukuoka Castle Ruins" caption="No donjon, but a broad quiet expanse of green" />
        </div>
      </JournalCard>

      <JournalCard page={8} sectionId="day-3">
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">3</span></div>
          <div>
            <div className="day-title">Closed Motsunabe, Extra-Large Tsukemen</div>
            <div className="day-sub">Downtown Fukuoka · Tenjin · Walk Back to Hakata</div>
          </div>
          <div className="day-weather">🍜</div>
        </div>

        <div className="jtxt">
          <p>Past six in the evening, having not eaten a proper lunch, my stomach began protesting. A ten-minute bus ride took me from the quiet park straight into the busy city center. I looked first for a well-known motsunabe restaurant, only to find that it had closed for a long period. After hesitating outside, I walked all the way to Tenjin and eventually joined the queue at Senko.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="26-senko-tsukemen-entrance.webp" alt="Sign at the entrance of Senko tsukemen restaurant" caption="After missing out on motsunabe, I made an impromptu switch to Senko" />
          <Photo file="27-senko-tsukemen.webp" alt="Extra-large serving of tsukemen and side dishes at Senko" caption="I overestimated my appetite and finished it through sheer determination" />
        </div>

        <div className="jtxt mt16">
          <p>The tsukemen was delicious, but I thought I could eat a lot and only realized I could not finish it after ordering the extra-large portion. Leaving food in Japan made me feel as though people would stare, so I forced myself to finish every bite. I left after eight, uncomfortably full, and simply walked back to the hotel from Tenjin.</p>
          <p>Talking with my dear one again, I ambled for an hour and a half and did not arrive until after ten. Day three had not had much of a plan: parks, seaside, ruins, ramen, and an epic walk. A spur-of-the-moment day alone was nice too.</p>
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="28-seven-eleven-night.webp" alt="Glowing 7-Eleven sign on a street corner at night" caption="On a night walk of an hour and a half, convenience stores were familiar landmarks" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">Original plan: a Kumamoto day trip</div>
          <p>I had planned to take the JR Kyushu Shinkansen from Hakata to Kumamoto: 33–50 minutes one way, ¥5,230. My notes also listed WEB Hayatoku 3 return tickets at about ¥6,000–7,000 and a three-day Northern Kyushu Rail Pass at ¥10,000. The route was Kumamoto Castle → Sakura-no-baba Josaien → Suizenji Jojuen → Shimotori and Kamitori shopping streets → KUMAMON SQUARE, with taipi’en, horse meat, ikinari dango, and karashi renkon to eat. I did not do a single item; the whole day stayed with Fukuoka&apos;s green spaces.</p>
        </div>
      </JournalCard>

      <JournalCard page={9} sectionId="day-4" anchor>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">Nishitetsu from Tenjin to Dazaifu</div>
            <div className="day-sub">Hakata · Nishitetsu · Dazaifu Tenmangu</div>
          </div>
          <div className="day-weather">☀️</div>
        </div>

        <div className="jtxt">
          <p>On day four I slept in again and did not leave until after noon. As usual, I took a hotel coffee with me and bought three small breads at Hakata Station. Fukuoka&apos;s bread was delicious and inexpensive, averaging ¥100–200 apiece. I took the subway two stops to Tenjin, then transferred to Nishitetsu for Dazaifu.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="29-hakata-station-bakery.webp" alt="Summer bread poster at a Hakata Station bakery" caption="Choosing bread at Hakata Station before setting out" />
          <Photo file="30-hakata-station-bread.webp" alt="Small bread in Dazaifu-themed packaging held in hand" caption="¥100–200 each: cheap and delicious" />
        </div>

        <div className="jtxt mt16">
          <p>Nishitetsu is short for Nishi-Nippon Railroad. It grew out of Kyushu Electric Tramway, founded in 1908, and now runs trains, buses, hotels, shopping centers, and logistics—it is impossible to miss in Fukuoka life. In its classic black, red, and white livery, the train dove from lively Tenjin into Dazaifu&apos;s nostalgic atmosphere.</p>
          <p>Outside Dazaifu Station began the long omotesando. The weather was exceptionally bright, and both sides were filled with souvenirs, small goods, and snacks. At Tenmangu, I first crossed little bridges over flowing water and passed through the garden before making my way through the crowd to the main shrine. The main hall was under repair and hidden behind barriers, but goshuin were still being written.</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="31-dazaifu-tenmangu-approach.webp" alt="Stone torii and approach at the entrance to Dazaifu Tenmangu" caption="In the sunshine, Dazaifu suddenly made the trip feel much more real" />
          <Photo file="32-dazaifu-tenmangu-pond.webp" alt="Pond and trees in the Dazaifu Tenmangu grounds" caption="Past bridges and flowing water, deeper into the shrine grounds" />
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="33-dazaifu-goshuin.webp" alt="Dazaifu Tenmangu goshuin held in hand" caption="With the goshuin written, I sat for a while in the little garden beside it" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">Plans A and B became C</div>
          <p>Plan A was Dazaifu plus Itoshima; Plan B was shopping in Hakata and Tenjin. In the end I skipped Itoshima, added the Kyushu National Museum and Kamado Shrine to Dazaifu, then finished the shopping after returning to Hakata. Somehow the two plans unexpectedly came together.</p>
        </div>
      </JournalCard>

      <JournalCard page={10} sectionId="day-4">
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>🏛️</span>
            <span style={{ fontSize: 12 }}>MUSEUM</span>
          </div>
          <div>
            <div className="day-title">East Asia Through Kyushu&apos;s Eyes</div>
            <div className="day-sub">Kyushu National Museum · Cultural Exchange Exhibition</div>
          </div>
        </div>

        <div className="pgrid g1">
          <Photo file="34-kyushu-national-museum.webp" alt="Curved roof of the Kyushu National Museum under a blue sky" caption="Glass walls reflected green hills; the roof rolled like mountain ridges" shape="hero" />
        </div>

        <div className="jtxt mt16">
          <p>A long passage from Tenmangu led to the Kyushu National Museum. It is Japan&apos;s fourth national museum after Tokyo, Kyoto, and Nara, built around “the formation of Japanese culture from the perspective of Asian history.” Understanding the cultural flows between China, the Korean Peninsula, and Japan from Kyushu was a particularly fresh perspective.</p>
          <p>The roughly 4,000-square-meter Cultural Exchange Exhibition runs from the Paleolithic era to the Edo period. Chinese religious figures, Korean ceramics, and Japanese National Treasures appeared side by side, like a three-dimensional history of East Asian exchange. The ¥700 ticket was not cheap, but I thought it was worth it.</p>
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="35-kyushu-national-museum-ticket.webp" alt="Kyushu National Museum admission ticket held in hand" caption="A ¥700 ticket for the permanent exhibition" />
          <Photo file="36-museum-textile.webp" alt="Traditional textile garment on display at the Kyushu National Museum" caption="Textile patterns inside a display case" />
          <Photo file="37-museum-exhibit.webp" alt="Figure exhibit at the Kyushu National Museum" caption="Looking for particular people and objects within East Asian exchange" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">A corner I missed</div>
          <p>On the first floor, there is a free Asian cultural-experience area called Ajippa (Asiapa), where visitors can touch ethnic clothing and play traditional instruments. I was too absorbed in looking for artifacts in the permanent exhibition and missed it in the end. I also resisted buying anything at the museum shop, taking only a big stack of beautiful booklets as souvenirs.</p>
        </div>
      </JournalCard>

      <JournalCard page={11} sectionId="day-4">
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">Kamado Shrine in the hills</div>
            <div className="day-sub">Homangu Kamado Shrine · Afternoon Light</div>
          </div>
          <div className="day-weather">🌿</div>
        </div>

        <div className="jtxt">
          <p>I took the sightseeing mini-bus uphill from Dazaifu Station and reached Homangu Kamado Shrine in a little over ten minutes. The shrine has become a pilgrimage spot for fans because it shares a surname with the protagonist of Demon Slayer, and the author Koyoharu Gotouge is also from Fukuoka. It originally enshrined Tamayorihime-no-Mikoto, a deity of matchmaking, and sits in the “demon gate” direction from the ancient Dazaifu government office; legends of warding off misfortune happen to overlap with the story of demon slaying.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="38-kamado-shrine-selfie.webp" alt="Selfie in the woods at Homangu Kamado Shrine" caption="Even after coming alone into the hills, I made sure to leave myself a photo" />
          <Photo file="39-kamado-shrine-approach.webp" alt="Woodland approach to Homangu Kamado Shrine" caption="Sunlight filtered through the treetops; the mountain path felt quiet and full of spirit" />
        </div>

        <div className="pgrid g3 mt12">
          <Photo file="40-kamado-shrine-garden.webp" alt="Grass and woods at Homangu Kamado Shrine" caption="A patch of green at the foot of the mountain" />
          <Photo file="41-kamado-shrine-path.webp" alt="Path leading deeper into the woods at Homangu Kamado Shrine" caption="Beyond this lay the longer hiking trail" />
          <Photo file="42-kamado-shrine-hall.webp" alt="Wooden shrine hall at Homangu Kamado Shrine" caption="Afternoon sun made the wood glow clear and bright" />
        </div>

        <div className="jtxt mt16">
          <p>The goshuin here was beautiful, and there was a special version available only after climbing to the upper shrine on Mount Homangu. The one-way hike from the foot of the mountain is said to take about two hours. I truly had no energy left that day, so I gave myself a reason to return: next maple-leaf season, I will climb to the top and add that page.</p>
        </div>

        <div className="pgrid g1 mt12">
          <Photo file="43-kamado-shrine-goshuin.webp" alt="Homangu Kamado Shrine goshuin and stamped page held in hand" caption="I did not reach the summit, but still carefully kept this page from the mountain foot in my journal" shape="hero" />
        </div>
      </JournalCard>

      <JournalCard page={12} sectionId="day-4">
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">4</span></div>
          <div>
            <div className="day-title">Umegae Mochi, Shopping, and Motsunabe</div>
            <div className="day-sub">Dazaifu → Hakata · Hankyu · AMU · Maedaya</div>
          </div>
          <div className="day-weather">🛍️</div>
        </div>

        <div className="jtxt">
          <p>Back near Dazaifu Station, I bought freshly grilled umegae mochi. It was hot enough to turn my fingers red, but I still could not resist taking a bite first: crisp outside, with a soft red-bean filling. Named for the story connecting Sugawara no Michizane, enshrined at Tenmangu, with plum blossoms, it is the most classic snack along the approach.</p>
        </div>

        <div className="pgrid g2 mt16">
          <Photo file="44-umegae-mochi.webp" alt="Freshly grilled umegae mochi held in hand near Dazaifu Station" caption="My fingers turned red from the heat, but I still had to bite into it first" />
          <Photo file="45-hakata-station-ice-cream.webp" alt="Rich vanilla ice cream held in hand at Hakata Station" caption="Back in Hakata, I followed the queue and bought an ice cream too" />
        </div>

        <div className="jtxt mt16">
          <p>This time I tried the direct Dazaifu-to-Hakata bus, which took under forty minutes. A little after six in the evening, I began shopping on Hankyu&apos;s first floor: Kanebo face wash, FAS serum, and a Shiro mist. Then, at the connected AMU, I found the insulated cup my dear one had been longing for at Muji. After eight I hurried to Yodobashi and bought an Arc&apos;teryx T-shirt.</p>
          <p>After nine I was finally hungry. The motsunabe I had missed the first two days had a Maedaya branch near my hotel. I arrived after ten and still had to queue for a while; I ordered the spicy pot. The beef offal itself was too fatty for me, but the broth, Fukuoka-style cooked vegetables, and rice together were delicious.</p>
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="46-maedaya-entrance.webp" alt="Entrance to Maedaya motsunabe restaurant" caption="After ten at night, I finally made it into the motsunabe queue" />
          <Photo file="47-maedaya-motsunabe.webp" alt="Spicy motsunabe at Maedaya" caption="The offal was too fatty, but the spicy broth and vegetables were excellent" />
        </div>

        <div className="pgrid g2 mt12">
          <Photo file="48-maedaya-sign.webp" alt="Hakata motsunabe sign at Maedaya restaurant" caption="Maedaya: making up for the disappointment of the first two days" />
          <Photo file="49-maedaya-finale.webp" alt="Late-night meal of motsunabe, rice, and drinks" caption="Bite after bite with rice; it was already past eleven when I finished" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">The last night</div>
          <p>Walking back to the hotel, I suddenly felt a little reluctant to leave. The wind in Dazaifu, the learning of Tenmangu, the connections of Kamado Shrine, and the warmth of umegae mochi all seemed to linger on my tongue. I did not want to say goodbye, but was already thinking about the next time.</p>
        </div>
      </JournalCard>

      <JournalCard page={13} sectionId="day-5" anchor>
        <div className="day-header">
          <div className="day-circle"><span className="lbl">Day</span><span className="num">5</span></div>
          <div>
            <div className="day-title">A Small Airport, an Easy Goodbye</div>
            <div className="day-sub">Sunday, June 7th · Fukuoka ✈️ Shanghai</div>
          </div>
          <div className="day-weather">✈️</div>
        </div>

        <div className="jtxt">
          <p>My flight was at 11:55, yet I slept until 8:45. Fukuoka Airport is simply too close to the city center, inviting a certain laziness. For the return I deliberately took the airport bus from Hakata Station, which went directly to the international terminal in a little over twenty minutes. Before ten, I had checked in and cleared security; it all went as smoothly as a familiar routine.</p>
          <p>Every minute after security went to duty free. First I bought the THE GINZA Hybrid Gel Oil my dear one had been wanting, for over RMB 600. The liquor section had just restocked, with Hakushu and Yamazaki both available. I looked for a long time at the ¥60,000-plus bottle of Yamazaki, then could not bring myself to buy it and chose a Hakushu 12 instead.</p>
          <p>After eleven, I hurriedly picked up a sandwich and onigiri from 7-Eleven, then emptied all the coins in my pocket into a vending machine for a bottle of barley tea. We took off close to noon and landed in Shanghai at around 12:30 China time.</p>
        </div>

        <div className="pgrid g1 mt16">
          <Photo file="50-flight-home.webp" alt="Wing of the return flight above a layer of clouds" caption="The last photo above the clouds: Fukuoka, see you next time" shape="hero" />
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">Original plan vs. what happened</div>
          <p>I had planned to check out and leave my luggage, have one last bowl of ramen at Hakata 1st Street, browse AMU and Hankyu, then take the subway to the airport before 9:30. In the end I did none of it: I took the bus directly, and left all the shopping for the airport.</p>
        </div>
      </JournalCard>

      <JournalCard page={14} sectionId="notes" anchor>
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>🛍️</span>
            <span style={{ fontSize: 12 }}>SHOP</span>
          </div>
          <div>
            <div className="day-title">What I actually bought</div>
            <div className="day-sub">A little piece of Fukuoka for myself, and for people I missed</div>
          </div>
        </div>

        <div className="bill">
          <h4>Shopping details (JPY)</h4>
          <div className="br"><span>KEEN shoes</span><span>¥15,864</span></div>
          <div className="br"><span>YONEX NF700 Pro 5U5</span><span>¥31,617</span></div>
          <div className="br"><span>Kanebo Refreshing Creamy Wash</span><span>¥2,926</span></div>
          <div className="br"><span>Shiro Yuzu Face Mist</span><span>¥5,225</span></div>
          <div className="br"><span>FAS Serum</span><span>¥11,495</span></div>
          <div className="br"><span>MUJI insulated cup</span><span>¥2,990</span></div>
          <div className="br"><span>Hakata Station souvenirs</span><span>¥5,668</span></div>
          <div className="br"><span>Arc&apos;teryx T-shirt</span><span>¥12,000</span></div>
          <div className="br"><span>THE GINZA Hybrid Gel Oil</span><span>¥14,250</span></div>
          <div className="br"><span>Hakushu</span><span>¥19,000</span></div>
          <div className="br total"><span>Journal-recorded total</span><span>¥89,418 / RMB ¥3,794</span></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">About this total</div>
          <p>This retains the total recorded in the original journal rather than recalculating it from the line items. I ultimately gave the badminton racket to a colleague, and the shopping also includes gifts for my dear one; this bill is more a list of travel memories than a financial statement.</p>
        </div>

        <div className="rbox mt20">
          <h4>What I genuinely loved</h4>
          <div className="ri"><span className="nm">Shin Shin</span><span className="cm">Rich broth and thin noodles, without being too salty or greasy</span></div>
          <div className="ri"><span className="nm">Musashi wagyu rice</span><span className="cm">Three ways to eat it were fun; the ochazuke finish was comforting</span></div>
          <div className="ri"><span className="nm">Senko tsukemen</span><span className="cm">Absolutely delicious; I only ordered too much</span></div>
          <div className="ri"><span className="nm">Umegae mochi</span><span className="cm">Eat it hot—the crisp shell and red-bean filling are both deeply satisfying</span></div>
        </div>

        <div className="rbox warn mt16">
          <h4>Honest disappointments</h4>
          <div className="ri"><span className="nm">The offal itself</span><span className="cm">Too fatty for my taste; the broth and vegetables were better</span></div>
          <div className="ri"><span className="nm">The badminton racket</span><span className="cm">The model I wanted sold out, and I later gave the one allowed under the purchase limit to a colleague</span></div>
          <div className="ri"><span className="nm">The weather</span><span className="cm">Heavy rain cancelled Ohori Park, the Fukuoka Art Museum, and the waterfront plans</span></div>
        </div>
      </JournalCard>

      <JournalCard page={15} sectionId="notes">
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>📋</span>
            <span style={{ fontSize: 12 }}>PLAN</span>
          </div>
          <div>
            <div className="day-title">The Plan Stayed; the Trip Wandered</div>
            <div className="day-sub">The undone list still records what I hoped for before I left</div>
          </div>
        </div>

        <div className="jtxt">
          <p>My original must-eat list also had Ichiran, Ippudo, Daruma, Hanamidori mizutaki, yatai yakitori, mentaiko, and in Kumamoto, Kourantei taipi&apos;en and Suganoya horse meat. I ate far less than the list suggested, but had no regrets—travel is not about completing a checklist.</p>
        </div>

        <div className="nbox mt16">
          <div className="nbox-lbl">Original budget (excluding flights)</div>
          <p>Accommodation: ¥8,000–15,000 per night, or roughly ¥40,000–60,000 for four nights; food: roughly ¥25,000–40,000 for five days; local transport: ¥3,000, plus an originally estimated ¥7,000 for Kumamoto return travel; admission and incidentals: ¥5,000–8,000. The plan totalled about ¥80,000–120,000, or roughly RMB 4,000–6,000, excluding shopping.</p>
        </div>

        <div className="tlwrap mt20">
          <div className="tl-item"><span className="tm">Weather</span><div className="ev">Around the rainy season, 20–27°C</div><div className="dt">A folding umbrella and light jacket were things I should have packed; unfortunately, I never ticked off the umbrella on the checklist</div></div>
          <div className="tl-item"><span className="tm">Payment</span><div className="ev">Cash + IC card + credit card</div><div className="dt">For a ¥5,000 spend at one shop, look for the Tax Free sign</div></div>
          <div className="tl-item"><span className="tm">Transport</span><div className="ev">Google Maps, Navitime, JR Kyushu, Yahoo! Transit</div><div className="dt">For Fukuoka Airport&apos;s international terminal to and from Hakata, the bus is easier than the shuttle-bus-and-subway transfer</div></div>
          <div className="tl-item"><span className="tm">Emergency</span><div className="ev">Police 110 · Ambulance 119</div><div className="dt">Consulate-General of China in Fukuoka: +81-92-713-1121</div></div>
        </div>

        <div className="nbox mt20">
          <div className="nbox-lbl">Pre-departure checklist</div>
          <p>I brought my passport and visa, flight and hotel confirmations, cash and credit cards, IC card, eSIM, and power bank. I did not prepare a JR pass, Kumamoto early-bird tickets, a folding umbrella, or common medicines. Since I never went to Kumamoto, the first two naturally became irrelevant.</p>
        </div>
      </JournalCard>

      <JournalCard page={16} sectionId="notes">
        <div className="day-header">
          <div className="day-circle">
            <span style={{ fontSize: 23 }}>💭</span>
            <span style={{ fontSize: 12 }}>EPILOGUE</span>
          </div>
          <div>
            <div className="day-title">What Began When the Trip Ended</div>
            <div className="day-sub">On learning to enjoy my own company</div>
          </div>
        </div>

        <div className="jtxt">
          <p>On the flight home, I looked through the goshuin I had gathered over those days: Kushida Shrine&apos;s stamp seemed to still carry the dampness of that rainy morning; Tochoji held its Fukuoka Daibutsu postcard; Kego Shrine&apos;s extra page from my little mix-up still made me smile between the paper.</p>
          <p>The most wonderful thing about going out alone is being responsible only for myself from beginning to end. What time I wake up, where I go, what I eat, whether I take a detour, whether I am tired—I get to decide it all.</p>
          <p>I once thought solo travel meant loneliness. But after walking rainy Hakata streets, sitting outside Blue Bottle alone watching the rain, meeting a cat&apos;s gaze at Mangyoji, and daydreaming in Tenmangu&apos;s little garden, I realized that these moments with no “output” at all were precisely the most moving ones.</p>
          <p>It turns out I was not afraid of being alone; I had simply never tried to be with myself properly. Travel is not only scenery, food, and checking in at sights. It is also seeing the self that steps out of familiar surroundings, with no one there to define them, in a strange city.</p>
          <p>When I arrived, Fukuoka&apos;s small airport simply seemed small. Leaving, it felt exactly the right size. The city was the same: small enough to feel reassuring, small enough that just as I learned a few street names, it was time to say goodbye.</p>
        </div>

        <div className="dv mt24 mb16"><span>🌊</span></div>

        <div className="hwcn" style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
          <p>Even alone, life can be full,</p>
          <p>without waiting for someone else to fill it.</p>
          <p style={{ marginTop: 16 }}>Clouds gathered outside; the plane sailed steadily through them.</p>
          <p>Shrines, ramen, rain, convenience stores, and ochazuke</p>
          <p>were all gently packed into my suitcase.</p>
        </div>

        <div className="tags mt24">
          <span className="tag tag-c">#FukuokaSolo</span>
          <span className="tag tag-t">#SoloTravel</span>
          <span className="tag tag-g">#Goshuin</span>
          <span className="tag tag-b">#Dazaifu</span>
          <span className="tag tag-p">#MyOwnCompany</span>
        </div>

        <div style={{ marginTop: 34, textAlign: "center" }}>
          <span className="stamp-box" style={{ transform: "rotate(0)" }}>FIN · 2026.06</span>
        </div>
      </JournalCard>
    </TripEntryLayout>
  );
}
