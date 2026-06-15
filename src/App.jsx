import React, { useState, useEffect } from "react";
import {
  Crown, Calendar, Clock, MapPin, Trophy, ArrowRight, ArrowUpRight, ArrowLeft,
  Menu, X, Quote, Phone, Send, GraduationCap, Medal, Star,
  Zap, Timer, Hourglass, ChevronDown, Sparkles, Users,
  ExternalLink, Copy, Globe, Target, ShieldCheck
} from "lucide-react";

const ChessPiece = ({ piece, className, style }) => (
  <div className={`font-display select-none pointer-events-none ${className}`} style={{ ...style }}>
    {piece}
  </div>
);

/* ============================================================
   ФЕДЕРАЦІЯ ШАХІВ МІСТА БРОВАРИ · chessbrovary.com.ua
   ============================================================

   ┌────────────────────────────────────────────────────────┐
   │ ФОТОГРАФІЇ — покладіть файли у папку public/images/     │
   │ із такими назвами (сайт сам підставить запасний         │
   │ варіант, якщо файлу ще немає):                          │
   ├────────────────────────────────────────────────────────┤
   │ ГОЛОВНИЙ ЕКРАН                                          │
   │   /images/hero.jpg     — обкладинка (горизонт., ≥2000px)│
   │                                                        │
   │ ТРЕНЕР (окрема сторінка-лендинг)                        │
   │   /images/coach.jpg    — портрет за дошкою (верт. 4:5)  │
   │   /images/coach-karolina.jpg — Кароліна з медалями     │
   │                                                        │
   │ НОВИНИ (порядок = порядок карток)                       │
   │   /images/news1.jpg … /images/news6.jpg (гориз. 1200×800)│
   │                                                        │
   │ УЧНІ «НАШІ ЧЕМПІОНИ»                                    │
   │   /images/player1.jpg — Кароліна Брюхович              │
   │   /images/player2.jpg — Артем Пільчук                  │
   │   /images/player3.jpg — Андрій Артемов                 │
   │   /images/player4.jpg — Іван Парьоха                   │
   │   /images/player5.jpg — Максим Громосяк                │
   │   /images/player6.jpg — Олексій Громосяк               │
   │                       (вертикальні портрети ~4:5)       │
   └────────────────────────────────────────────────────────┘

   ┌────────────────────────────────────────────────────────┐
   │ ТУРНІРИ. У константі TOURNAMENTS вкажіть isoDate        │
   │ ("2026-06-28"). Турніри з минулою датою ховаються       │
   │ автоматично. Якщо актуальних немає — на сайті           │
   │ з'являється повідомлення «Слідкуйте за анонсами».       │
   └────────────────────────────────────────────────────────┘
*/

const CONFIG = {
  phone: "+380988814141",
  phoneDisplay: "+380 (98) 881-41-41",
  telegramUrl: "https://t.me/+380988814141",
  telegramUsername: "",            // якщо є нікнейм (t.me/нік) — впишіть без @, текст підставлятиметься автоматично
  telegramGroupName: "Chess club Brovary",
  facebookGroupUrl: "https://www.facebook.com/groups/252352375197185",
  facebookCoachUrl: "https://www.facebook.com/GrebeniukSemen",
  youtubeName: "Semiks chess",
  youtubeUrl: "https://www.youtube.com/results?search_query=Semiks+chess",
  email: "info@chessbrovary.com.ua",
  mapsUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x40d4d965416525d7:0xb9d213cf2b4a0937",
  address: "бульвар Незалежності, 2, Бровари",
  addressFull: "бульвар Незалежності, 2, м. Бровари, Київська обл., 07400",
};

/* ---------- Палітра ---------- */
const C = {
  bg: "#F6F2EA",
  bgSoft: "#EFE9DD",
  card: "#FBF8F2",
  ink: "#2C2A26",
  inkSoft: "#5C564C",
  amber: "#B07A2A",
  amberSoft: "#E8C77F",
  amberDeep: "#8F5F1C",
  emerald: "#2F5D50",
  line: "#DDD4C4",
};

const FONTS = `
  .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-body { font-family: 'Manrope', system-ui, sans-serif; }
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { transition: none !important; animation: none !important; } }
  .link-anim { position: relative; display: inline-block; }
  .link-anim::after { content: ''; position: absolute; width: 100%; transform: scaleX(0); height: 1px; bottom: 0; left: 0; background-color: currentColor; transform-origin: bottom right; transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
  .link-anim:hover::after, .group:hover .link-anim::after { transform: scaleX(1); transform-origin: bottom left; }
  @keyframes float { 0% { transform: translateY(0px) rotate(-12deg); } 50% { transform: translateY(-20px) rotate(-12deg); } 100% { transform: translateY(0px) rotate(-12deg); } }
  @keyframes idleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
`;

/* ============================================================
   КОНТЕНТ — редагується тут, у константах
   ============================================================ */

const TOURNAMENTS = [
  {
    id: "t1",
    isoDate: "2026-05-28",
    title: "Кубок міста «Cup Brovary»",
    date: "28 червня 2026",
    time: "11:00",
    format: "Рапід",
    control: "10 хв + 5 с на хід",
    prize: "Кубок міста, медалі та грошові призи у вікових категоріях",
    place: "Шаховий клуб, бул. Незалежності, 2",
    details: "Регламент та запрошення — у Facebook-групі федерації.",
  },
  {
    id: "t2",
    isoDate: "2026-05-05",
    title: "Вечір блискавичних шахів",
    date: "5 липня 2026",
    time: "18:30",
    format: "Бліц",
    control: "3 хв + 2 с на хід",
    prize: "Перехідний кубок клубу",
    place: "Шаховий клуб, бул. Незалежності, 2",
    details: "Відкрито для всіх рівнів. Кількість місць обмежена.",
  },
  {
    id: "t3",
    isoDate: "2026-05-02",
    title: "Дитячий фестиваль «Перший хід»",
    date: "2 серпня 2026",
    time: "12:00",
    format: "Рапід · до 10 років",
    control: "15 хв на партію",
    prize: "Медалі кожному учаснику, кубки переможцям",
    place: "Шаховий клуб, бул. Незалежності, 2",
    details: "Перший офіційний старт для початківців клубу.",
  },
  {
    id: "t4",
    isoDate: "2026-05-16",
    title: "«Brovary Rating Cup»",
    date: "16–18 жовтня 2026",
    time: "10:00",
    format: "Класика",
    control: "45 хв + 30 с на хід",
    prize: "Міжнародний та український обрахунок рейтингу",
    place: "Велика зала, бул. Незалежності, 2",
    details: "Колові турніри за стартовим рейтингом ФІДЕ. Суддівство міжнародного арбітра.",
  },
];

const NEWS = [
  {
    id: "n1",
    tag: "Травень 2026 · Чемпіонат області",
    title: "Бровари приймали чемпіонат Київщини до 8 та 10 років",
    text: "Три дні в готелі «Grand Sport» 50 юних шахістів з усієї області грали класику у 9 турів. У броварчан — 2 золота і 2 бронзи: Кароліна Брюхович виграла турнір дівчат до 10 років, Максим Громосяк — турнір юнаків до 10, Віра Михайлова та Миколай Кадурін здобули бронзу серед наймолодших.",
    img: "./images/news1.jpg",
  },
  {
    id: "n2",
    tag: "2026 · Чемпіонат України",
    title: "Кароліна Брюхович — абсолютна чемпіонка України до 8 років",
    text: "У Мукачеві юна броварчанка зробила шаховий «хет-трик»: три золоті медалі у трьох дисциплінах — класиці, рапіді та бліці. У класичних шахах — 7,5 очка з 9 і чисте перше місце. Це вже другий титул чемпіонки країни з класики у її віці.",
    img: "./images/news2.jpg",
  },
  {
    id: "n3",
    tag: "Квітень 2026 · Чемпіонат світу",
    title: "Два срібла чемпіонату світу їдуть до Броварів",
    text: "На FIDE World Cadet & Youth Championships у сербській Врнячці-Бані Кароліна Брюхович здобула срібло у складі команди «Ukrainian chess queens» (5 перемог у 6 партіях на другій дошці) та особисте срібло у бліці серед дівчат до 8 років — 9 очок з 11, пів-очка до золота.",
    img: "./images/news3.jpg",
  },
  {
    id: "n4",
    tag: "Березень 2026 · Чемпіонат області",
    title: "Чемпіонат Київщини до 12 років: золото і бронза господарів",
    text: "48 дітей з регіонів області грали у Броварах 9 турів класики. Кароліна Брюхович виграла турнір дівчат з результатом 8 очок, Максим Громосяк завоював бронзу серед хлопців. Усі учасники отримали пам'ятні подарунки.",
    img: "./images/news4.jpg",
  },
  {
    id: "n5",
    tag: "Лютий–березень 2026 · Кваліфікація",
    title: "«Зимова казка»: 9 з 9 — ідеальний турнір Ігоря Кравця",
    text: "На київському кваліфікаційному турнірі Ігор Кравець виграв усі дев'ять партій і здобув норматив 2 розряду. Кароліна Брюхович фінішувала другою у турнірі з нормою 1 розряду.",
    img: "./images/news5.jpg",
  },
  {
    id: "n6",
    tag: "Січень 2026 · Чемпіонат Києва",
    title: "Шість медалей чемпіонатів Києва до 10 та 16 років",
    text: "Кароліна Брюхович виграла класику дівчат до 10 років з абсолютним результатом 9 з 9, додавши золото рапіду та срібло бліцу. Артем Пільчук — чемпіон з бліцу до 16 років (10,5 з 11) і срібний призер рапіду. Іван Парьоха — срібло у класиці до 16. Марк Рєзнік виконав норматив 2 розряду.",
    img: "./images/news6.jpg",
  },
];

const PLAYERS = [
  {
    id: "p1",
    name: "Кароліна Брюхович",
    born: "2018",
    photo: "./images/player1.jpg",
    fideId: "529014778",
    case_: "Абсолютна чемпіонка України-2026 до 8 років (3 золота). Дворазова віце-чемпіонка світу 2026 з рапіду (команда) та бліцу.",
    metric: "Віце-чемпіонка світу",
  },
  {
    id: "p2",
    name: "Артем Пільчук",
    born: "2010",
    photo: "./images/player2.jpg",
    fideId: "34139931",
    case_: "КМС. Чемпіон Києва з бліцу до 16 та до 20 років. Срібний призер відкритого Кубка Києва з бліцу — 9 з 11 та +66 пунктів міжнародного рейтингу.",
    metric: "КМС · чемпіон Києва з бліцу",
  },
  {
    id: "p3",
    name: "Андрій Артемов",
    born: "",
    photo: "./images/player3.jpg",
    fideId: "34121307",
    case_: "Учасник чемпіонату Європи-2025 до 16 років (Будва, Чорногорія). Віце-чемпіон громади 2024 року з рапіду та бліцу серед дорослих.",
    metric: "Учасник ЧЄ-2025",
  },
  {
    id: "p4",
    name: "Іван Парьоха",
    born: "",
    photo: "./images/player4.jpg",
    fideId: "",
    case_: "1 розряд. Переможець свого турніру «Brovary Rating Cup 2025» (+54 пункти ЕЛО). Срібло чемпіонату Києва з класики до 16 років, бронза з бліцу до 20.",
    metric: "Переможець Brovary Rating Cup",
  },
  {
    id: "p5",
    name: "Максим Громосяк",
    born: "",
    photo: "./images/player5.jpg",
    fideId: "",
    case_: "Чемпіон Київської області 2026 року серед юнаків до 10 років. Бронзовий призер чемпіонату області до 12 років.",
    metric: "Чемпіон області до 10 років",
  },
  {
    id: "p6",
    name: "Олексій Громосяк",
    born: "",
    photo: "./images/player6.jpg",
    fideId: "",
    case_: "Найкращий результат фестивалю «Зимова казка» серед гравців до 12 років. Четверте місце чемпіонату Києва з рапіду.",
    metric: "1 розряд",
  },
];

/* ---------- Розклад: групи + слоти ----------
   level: 0 = «1–2 розряд та КМС», 1 = «3–4 розряд та б/р», 2 = «Початківці»
*/
const SCHEDULE_GROUPS = [
  { key: 0, label: "1–2 розряд та КМС", short: "Розрядники / КМС", color: C.amber },
  { key: 1, label: "3–4 розряд та б/р", short: "3–4 розряд", color: C.emerald },
  { key: 2, label: "Початківці і б/р", short: "Початківці", color: C.amberDeep },
];
const SCHEDULE_ROWS = [
  { day: "Понеділок", cells: ["", "10:00–11:30", ""] },
  { day: "Вівторок", cells: ["17:30–19:30", "15:00–16:30", "14:00–15:00"] },
  { day: "Середа", cells: ["", "10:00–11:30", ""] },
  { day: "Четвер", cells: ["17:30–19:30", "15:00–16:30", "14:00–15:00"] },
  { day: "Субота", cells: ["11:30–13:00", "10:00–11:30", "10:00–11:30"] },
];

const NAV = [
  { id: "filosofiya", label: "Федерація" },
  { id: "rozklad", label: "Розклад" },
  { id: "zhyttia", label: "Новини" },
  { id: "turniry", label: "Турніри" },
  { id: "aleia", label: "Чемпіони" },
  { id: "kontakty", label: "Контакти" },
];

const formatIcon = (format) => {
  const f = (format || "").toLowerCase();
  if (f.includes("бліц")) return Zap;
  if (f.includes("класика")) return Hourglass;
  if (f.includes("до 10") || f.includes("дит")) return Sparkles;
  return Timer;
};

/* ============================================================
   ДРІБНІ КОМПОНЕНТИ
   ============================================================ */

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translate3d(0, 32px, 0)",
    down: "translate3d(0, -32px, 0)",
    left: "translate3d(32px, 0, 0)",
    right: "translate3d(-32px, 0, 0)",
    none: "translate3d(0, 0, 0)"
  };

  return (
    <div ref={domRef} className={className} style={{
      transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translate3d(0, 0, 0)" : transforms[direction]
    }}>
      {children}
    </div>
  );
};

/* ============================================================
   HERO-ЧАСТИНКИ — світні пилинки, що поволі здіймаються в теплому
   промені. Canvas, легкий: ~46 точок, пауза при reduced-motion і
   коли секція не на екрані (економія батареї).
   ============================================================ */
const HeroParticles = ({ className = "" }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, W, H, parts = [], running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const seed = () => {
      // частинки по всьому екрану для гармонійного вигляду
      parts = Array.from({ length: 80 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.7, // збільшили розмір до оптимального
        s: Math.random() * 0.25 + 0.05,
        a: Math.random() * 0.5 + 0.18,
        drift: (Math.random() - 0.5) * 0.12,
      }));
    };
    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.s; p.x += p.drift;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = `rgba(232,199,127,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize(); seed(); tick();
    window.addEventListener("resize", resize);

    // пауза, коли hero не видно (прокрутили далі)
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) { raf = requestAnimationFrame(tick); } else { cancelAnimationFrame(raf); }
    }, { threshold: 0 });
    io.observe(canvas);

    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); io.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} aria-hidden="true" />;
};

const Eyebrow = ({ children, light = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="w-2.5 h-2.5 rotate-45 shrink-0" style={{ backgroundColor: light ? C.amberSoft : C.amber }} />
    <span className="font-body text-xs font-semibold tracking-widest uppercase" style={{ color: light ? "rgba(251,248,242,0.6)" : C.inkSoft }}>
      {children}
    </span>
  </div>
);

/* Зображення з автоматичним фолбеком */
const SmartImg = ({ src, fallback, alt, className }) => {
  const [s, setS] = useState(src);
  useEffect(() => setS(src), [src]);
  return <img src={s} alt={alt} className={className} onError={() => fallback && s !== fallback && setS(fallback)} />;
};

const NewsImage = ({ src, alt }) => {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [src]);
  if (err) {
    return (
      <div className="w-full h-64 sm:h-80 flex items-center justify-center" style={{ backgroundColor: C.ink }}>
        <Crown size={42} strokeWidth={1.2} style={{ color: C.amberSoft, opacity: 0.5 }} />
      </div>
    );
  }
  return (
    <img src={src} alt={alt} onError={() => setErr(true)}
      className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 hover:scale-105" />
  );
};

const Field = ({ label, value, onChange, textarea = false, placeholder = "" }) => (
  <div>
    <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: C.inkSoft }}>{label}</label>
    {textarea ? (
      <textarea rows={4} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.line}`, color: C.ink }} />
    ) : (
      <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none"
        style={{ backgroundColor: C.bg, border: `1px solid ${C.line}`, color: C.ink }} />
    )}
  </div>
);

/* ---------- Картка учня ---------- */
const PlayerCard = ({ player }) => {
  const [imgErr, setImgErr] = useState(false);
  const initials = player.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const hasPhoto = player.photo && !imgErr;

  return (
    <div
      tabIndex={0}
      className="group relative rounded-3xl overflow-hidden aspect-[4/5] outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: "#3A372F" }}
    >
      {hasPhoto ? (
        <img src={player.photo} alt={player.name} onError={() => setImgErr(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: "radial-gradient(ellipse at 50% 35%, #4A4639 0%, #34312A 70%)" }}>
          <span className="font-display text-7xl font-semibold transition-transform duration-500 group-hover:scale-110"
            style={{ color: C.amberSoft, opacity: 0.85 }}>{initials}</span>
        </div>
      )}

      {/* постійний градієнт для читабельності імені */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(22,20,16,0.92) 0%, rgba(22,20,16,0.45) 55%, transparent 100%)" }} />

      <div className="absolute inset-x-0 bottom-0 p-6 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2 group-focus-visible:opacity-0">
        <h3 className="font-display text-2xl font-semibold leading-tight text-[#FBF8F2]">{player.name}</h3>
        <p className="mt-1.5 text-sm font-semibold" style={{ color: C.amberSoft }}>{player.metric}</p>
        {player.born && <p className="mt-0.5 text-xs" style={{ color: "rgba(251,248,242,0.55)" }}>{player.born} р.н.</p>}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 pt-7 rounded-t-3xl translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
        style={{ backgroundColor: "rgba(28,25,20,0.94)", backdropFilter: "blur(8px)", borderTop: `2px solid ${C.amberSoft}` }}>
        <h3 className="font-display text-xl font-semibold leading-tight text-[#FBF8F2]">{player.name}</h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(251,248,242,0.88)" }}>{player.case_}</p>
        {player.fideId && (
          <a href={`https://ratings.fide.com/profile/${player.fideId}`} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full transition-transform hover:scale-105"
            style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
            <ExternalLink size={13} /> Картка ФІДЕ
          </a>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   ЛЕНДИНГ ТРЕНЕРА (окрема сторінка)
   ============================================================ */
function CoachLanding({ goHome, onContact }) {
  const numbers = [
    { value: "2324", label: "піковий рейтинг ФІДЕ у класичних шахах" },
    { value: "6", label: "місце на Чемпіонаті України 2024 серед майстрів і гросмейстерів" },
    { value: "122", label: "позиція в активному національному рейтингу України" },
    { value: "5", label: "медалей чемпіонатів України та Європи у вихованців" },
  ];

  const cases = [
    {
      photo: "./images/player1.jpg",
      name: "Кароліна Брюхович",
      sub: "до 8 років",
      text: "Абсолютна чемпіонка України-2026 — золото в усіх трьох дисциплінах (у бліці 9,5 з 11). Дворазова віце-чемпіонка Європи з рапіду та бліцу. Шлях від перших уроків до рівня збірної країни.",
    },
    {
      photo: "./images/player2.jpg",
      name: "Артем Пільчук",
      sub: "КМС",
      text: "Чемпіон Києва з бліцу до 16 та до 20 років. Срібний призер відкритого Кубка Києва, +66 пунктів міжнародного рейтингу за один турнір.",
    },
    {
      photo: "./images/player3.jpg",
      name: "Андрій Артемов",
      sub: "ЧЄ-2025",
      text: "Учасник чемпіонату Європи до 16 років у Будві. Віце-чемпіон Броварської громади серед дорослих з рапіду та бліцу.",
    },
  ];

  const formats = [
    {
      icon: MapPin,
      tag: "Офлайн · Бровари",
      title: "Заняття у клубі",
      points: [
        "Дитячі групи від 5 років за ігровою методикою: логіка, посидючість, концентрація.",
        "Підготовка до розрядів на базі ДЮСШ для тих, хто прагне спортивного зростання.",
      ],
    },
    {
      icon: Globe,
      tag: "Онлайн · Україна та світ",
      title: "Індивідуальне наставництво",
      points: [
        "Персональна програма для дітей і дорослих: розбір партій, дебютний репертуар.",
        "Майстер-класи з тактики, ендшпільної техніки та психологічної стійкості.",
      ],
    },
    {
      icon: Trophy,
      tag: "Турніри ФІДЕ",
      title: "Офіційні змагання",
      points: [
        "Як ліцензований організатор ФІДЕ — проводить рейтингові турніри в Броварах.",
        "Учні виконують нормативи й отримують міжнародний рейтинг без коштовних поїздок.",
      ],
    },
  ];

  const advantages = [
    { icon: Target, title: "Діючий практик", text: "Тренер — топ-гравець національного рівня, який перемагає гросмейстерів у реальних турнірах, а не лише знає теорію." },
    { icon: Sparkles, title: "Сучасний підхід", text: "Передові платформи, аналіз із шаховими рушіями, формат Puzzle Rush та гейміфікація замість нудних підручників." },
    { icon: ShieldCheck, title: "Чесний спорт", text: "Експерт із протидії комп'ютерному шахрайству в онлайн-шахах. Вчимо перемагати чесно та поважати суперника." },
    { icon: GraduationCap, title: "Фахова освіта", text: "Друга вища освіта зі спеціальності «Фізична культура і спорт» (тренерська діяльність), Університет Григорія Сковороди в Переяславі." },
  ];

  return (
    <div className="font-body min-h-screen" style={{ backgroundColor: C.bg, color: C.ink }}>
      <style>{FONTS}</style>

      {/* Шапка */}
      <header className="py-5 px-5 sm:px-8 sticky top-0 z-40" style={{ backgroundColor: C.ink }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={goHome} className="group inline-flex items-center gap-2 text-sm font-semibold transition-opacity duration-300 hover:opacity-80" style={{ color: C.amberSoft }}>
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> <span className="link-anim">На головну</span>
          </button>
          <span className="font-display text-lg font-semibold text-[#FBF8F2] hidden sm:block">Федерація шахів · Бровари</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: C.ink }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <Eyebrow light>Семен Гребенюк · національний майстер</Eyebrow>
            <h1 className="font-display font-medium text-[#FBF8F2]" style={{ fontSize: "clamp(2.3rem, 5.5vw, 4rem)", lineHeight: 1.12 }}>
              Перетворюю захоплення шахами на{" "}
              <em className="italic" style={{ color: C.amberSoft }}>спортивні перемоги</em>
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "rgba(251,248,242,0.8)" }}>
              Професійне навчання для дітей і дорослих — онлайн по{" "}
              <span className="font-semibold" style={{ color: C.amberSoft }}>всьому світу</span>{" "}
              та офлайн у Броварах. Тренер чемпіонів і сертифікований організатор
              ФІДЕ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onContact}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
                Записатися на пробне заняття <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a href={CONFIG.telegramUrl} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border transition-colors hover:bg-white/10"
                style={{ borderColor: "rgba(251,248,242,0.4)", color: "#FBF8F2" }}>
                <Send size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> Консультація тренера
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative" style={{ backgroundColor: "#39362F" }}>
              <SmartImg src="./images/coach.jpg" alt="Семен Гребенюк за шахівницею"
                className="absolute inset-0 w-full h-full object-cover"
                fallback="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=800&q=80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none" style={{ zIndex: -1 }}>
                <span className="font-display text-7xl font-semibold" style={{ color: C.amberSoft }}>СГ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Цифри */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Eyebrow>Про тренера в цифрах</Eyebrow>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {numbers.map((n, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="rounded-2xl p-6 h-full transition-all hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: C.card, border: `1px solid ${C.line}` }}>
                  <p className="font-display text-4xl sm:text-5xl font-semibold" style={{ color: C.emerald }}>{n.value}</p>
                  <p className="mt-2 text-sm leading-snug" style={{ color: C.inkSoft }}>{n.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Кейси учнів */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: C.bgSoft }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Eyebrow>Результати учнів</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight mb-10 max-w-lg">
            Найкращий доказ методики — перемоги вихованців
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((c, i) => (
              <FadeIn key={i} delay={i * 150} className="h-full">
                <div className="rounded-3xl overflow-hidden flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: C.card, border: i === 0 ? `2px solid ${C.amber}` : `1px solid ${C.line}` }}>
                  <div className="aspect-[4/3] relative" style={{ backgroundColor: C.ink }}>
                    <CaseImage src={c.photo} name={c.name} />
                  </div>
                  <div className="p-6 flex-1">
                    {i === 0 && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: `${C.amber}1A`, color: C.amberDeep }}>
                        <Star size={12} /> Головний кейс
                      </span>
                    )}
                    <h3 className="font-display text-2xl font-semibold" style={{ lineHeight: 1.15 }}>{c.name}</h3>
                    <p className="text-sm font-semibold mb-3 mt-1" style={{ color: C.amber }}>{c.sub}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{c.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Формати навчання */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Eyebrow>Формати навчання</Eyebrow>
          <div className="grid md:grid-cols-3 gap-5">
            {formats.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 150} className="h-full">
                  <div className="rounded-3xl p-7 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: C.card, border: `1px solid ${C.line}` }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${C.amber}1A` }}>
                      <Icon size={20} style={{ color: C.amber }} />
                    </div>
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: C.emerald }}>{f.tag}</p>
                    <h3 className="font-display text-2xl font-semibold leading-tight mt-1 mb-4">{f.title}</h3>
                    <ul className="space-y-3 mt-auto">
                      {f.points.map((p, j) => (
                        <li key={j} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                          <ArrowRight size={15} className="shrink-0 mt-1 transition-transform group-hover:translate-x-1" style={{ color: C.amber }} /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Переваги */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: C.ink }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Eyebrow light>Чому обирають нашу школу</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-4">
            {advantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <FadeIn key={i} delay={i * 150} className="h-full">
                  <div className="rounded-2xl p-7 flex gap-4 h-full transition-all hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#39362F", border: "1px solid rgba(251,248,242,0.08)" }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${C.amber}26` }}>
                      <Icon size={19} style={{ color: C.amberSoft }} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-[#FBF8F2]" style={{ lineHeight: 1.2 }}>{a.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(251,248,242,0.7)" }}>{a.text}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Блок довіри */}
          <div className="mt-5 rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between" style={{ backgroundColor: "#39362F", border: "1px solid rgba(251,248,242,0.08)" }}>
            <div className="flex gap-4">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <div>
                <p className="font-display text-xl font-semibold text-[#FBF8F2]">Медіапроєкт «{CONFIG.youtubeName}»</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(251,248,242,0.7)" }}>
                  Аналітичні трансляції за участю гросмейстерів і майстрів: Рауф Мамедов,
                  Антон Коробов, Катерина Должикова.
                </p>
              </div>
            </div>
            <a
              href={CONFIG.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#E6C687] text-[#2A2723] px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-[#D9B776] transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Дивитися
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* CTA */}
      < section className="py-16 sm:py-24" >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-medium leading-tight">
            Зробіть перший крок до{" "}
            <em className="italic" style={{ color: C.amber }}>майстерності</em> вже сьогодні
          </h2>
          <p className="mt-5 text-base leading-relaxed" style={{ color: C.inkSoft }}>
            Залиште контакти — підберемо оптимальну групу або графік
            індивідуальних занять для вас чи вашої дитини.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={onContact}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
              Надіслати заявку <ArrowRight size={15} />
            </button>
            <a href={`tel:${CONFIG.phone}`}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-stone-50"
              style={{ borderColor: C.line, color: C.ink }}>
              <Phone size={15} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" style={{ color: C.amber }} /> {CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </section >
    </div >
  );
}

const CaseImage = ({ src, name }) => {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [src]);
  if (err) {
    const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 50%, #4A4639, #34312A)" }}>
        <span className="font-display text-6xl font-semibold leading-none" style={{ color: C.amberSoft, opacity: 0.85 }}>{initials}</span>
      </div>
    );
  }
  return <img src={src} alt={name} onError={() => setErr(true)} className="absolute inset-0 w-full h-full object-cover" />;
};

/* ============================================================
   ГОЛОВНА СТОРІНКА
   ============================================================ */
export default function BrovaryChessFederation() {
  const [view, setView] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [level, setLevel] = useState("all"); // фільтр розкладу

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goContactFromCoach = () => {
    setView("home");
    setTimeout(() => go("kontakty"), 60);
  };

  const submitForm = () => {
    if (!form.name.trim() || !form.contact.trim()) return;
    const text =
      `Вітаю! Пишу із сайту федерації.\n` +
      `Мене звати: ${form.name.trim()}\n` +
      `Контакт: ${form.contact.trim()}` +
      (form.message.trim() ? `\nПовідомлення: ${form.message.trim()}` : "");
    if (CONFIG.telegramUsername) {
      window.open(`https://t.me/${CONFIG.telegramUsername}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
      try { navigator.clipboard.writeText(text); } catch { }
      window.open(CONFIG.telegramUrl, "_blank", "noopener");
    }
    setSent(true);
  };

  if (view === "coach") return <CoachLanding goHome={() => setView("home")} onContact={goContactFromCoach} />;

  /* Фільтр майбутніх турнірів */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = TOURNAMENTS
    .filter((t) => { const d = new Date(t.isoDate); return isNaN(d) ? true : d >= today; })
    .sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));

  return (
    <div className="font-body min-h-screen" style={{ backgroundColor: C.bg, color: C.ink }}>
      <style>{FONTS}</style>

      {/* ===== Навігація ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(246,242,234,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <button onClick={() => go("hero")} className="group flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5">
            <Crown size={22} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" style={{ color: scrolled ? C.amber : C.amberSoft }} strokeWidth={1.6} />
            <span className="font-display text-lg sm:text-xl font-semibold tracking-wide link-anim" style={{ color: scrolled ? C.ink : "#FBF8F2" }}>
              Федерація шахів · Бровари
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)}
                className="text-sm font-medium tracking-wide transition-opacity hover:opacity-70 link-anim"
                style={{ color: scrolled ? C.ink : "#FBF8F2" }}>
                {n.label}
              </button>
            ))}
            <button onClick={() => setView("coach")}
              className="text-sm font-semibold px-4 py-2 rounded-full transition-transform hover:scale-105"
              style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
              Тренер
            </button>
          </nav>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            style={{ color: scrolled || menuOpen ? C.ink : "#FBF8F2" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 pb-6 pt-2 flex flex-col gap-1" style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.line}` }}>
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)} className="text-left py-3 text-base font-medium border-b" style={{ borderColor: C.line, color: C.ink }}>
                {n.label}
              </button>
            ))}
            <button onClick={() => { setMenuOpen(false); setView("coach"); }}
              className="mt-4 text-sm font-semibold px-5 py-3 rounded-full self-start"
              style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
              Про тренера
            </button>
          </div>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden" style={{ backgroundColor: C.ink }}>
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 640px)" srcSet="./images/hero-mobile.jpg" />
          <SmartImg src="./images/hero.jpg"
            fallback="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=2000&q=80"
            alt="Шахові фігури в теплому світлі"
            className="w-full h-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#181511E6] via-[#181511B3] to-transparent sm:bg-gradient-to-r sm:from-[#181511F2] sm:via-[#181511B3] sm:to-transparent" />
        <HeroParticles className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28 pt-40 w-full">
          <FadeIn delay={0} className="hero-rise">
            <p className="font-body text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: C.amberSoft }}>
              Офіційна федерація міста · з 2016 року
            </p>
          </FadeIn>
          <FadeIn delay={200} className="hero-rise">
            <h1 className="font-display font-medium leading-[1.04] text-[#FBF8F2]" style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}>
              Бровари{" "}
              <em className="font-display italic" style={{ color: C.amberSoft }}>грають</em>
              <br />у шахи
            </h1>
          </FadeIn>
          <FadeIn delay={400} className="hero-rise">
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: "rgba(251,248,242,0.85)" }}>
              Дитяча школа, дорослий клуб і турніри з обрахунком рейтингу ФІДЕ.
              Наші вихованці привозять медалі з чемпіонатів Києва, області,
              України та світу.
            </p>
          </FadeIn>
          <FadeIn delay={600} className="hero-rise mt-9 flex flex-wrap gap-4">
            <button onClick={() => go("rozklad")}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
              Розклад занять <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => go("zhyttia")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(251,248,242,0.5)", color: "#FBF8F2" }}>
              Останні новини
            </button>
          </FadeIn>
        </div>
        <button onClick={() => go("filosofiya")} aria-label="Прокрутити нижче"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block animate-bounce"
          style={{ color: "rgba(251,248,242,0.7)" }}>
          <ChevronDown size={26} />
        </button>
      </section>

      {/* ===== Федерація ===== */}
      <section id="filosofiya" className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="px-1 sm:px-4">
          <Eyebrow>Федерація</Eyebrow>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6">

            {/* Карточка тренера */}
            <FadeIn delay={100} className="lg:col-span-5 h-full">
              <div
                onClick={() => setView("coach")}
                className="bg-[#25231F] h-full rounded-3xl border border-stone-800 flex flex-col shadow-xl cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:flex-1 bg-[#EFF1F4] overflow-hidden flex items-center justify-center">
                  <img
                    src="./images/coach.jpg"
                    alt="Семен Гребенюк"
                    className="absolute inset-0 w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105 z-10"
                  />
                  <span className="text-stone-700 text-5xl font-serif font-bold z-0">СГ</span>
                </div>

                <div className="p-6 flex flex-col gap-4 bg-[#25231F] relative z-20">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#FBF8F2] leading-tight tracking-wide">
                      Семен Гребенюк
                    </h2>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#E6C687]">
                      Президент федерації · Головний тренер
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-stone-300/90 font-light">
                      Національний майстер, тренер чемпіонів{" "}
                      <span className="font-semibold text-[#E6C687]">України та Європи</span>,
                      сертифікований організатор ФІДЕ. Навчання офлайн у Броварах та онлайн по{" "}
                      <span className="font-semibold text-[#E6C687]">всьому світу</span>.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-800 mt-auto">
                    <div className="w-full bg-[#E6C687] hover:bg-[#D9B776] text-[#25231F] py-3 px-4 rounded-xl font-semibold text-center text-sm transition-colors flex items-center justify-center gap-2 shadow-md">
                      Відкрити сторінку тренера
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Карточка цитаты и цифр */}
            <FadeIn delay={200} className="lg:col-span-7 h-full">
              <div className="bg-white h-full rounded-3xl p-8 sm:p-12 border border-stone-200/60 flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md duration-300">
                <div className="flex-1 flex flex-col justify-center">
                  <Quote size={36} style={{ color: C.amber }} strokeWidth={1.5} className="mb-6 opacity-80" />
                  <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.2] font-medium text-stone-900 mb-6" style={{ textWrap: "balance" }}>
                    «Ми будуємо не фабрику розрядів, а місце, куди хочеться повертатися. Повага до гри, до суперника й до власного часу <span className="font-semibold" style={{ color: C.amberDeep }}>за дошкою</span>».
                  </blockquote>
                  <p className="text-base leading-relaxed text-stone-600 font-normal max-w-xl">
                    Громадська організація «Федерація шахів міста Бровари» працює
                    з 2016 року: дитяча школа за рівнями підготовки, дорослий клуб
                    і власний турнірний календар — від вечорів бліцу до чемпіонатів
                    Київської області, які проходять саме в Броварах.
                  </p>
                </div>

                {/* Блок статистики */}
                <div className="mt-10 sm:mt-12 pt-8 border-t border-stone-100 flex flex-wrap gap-8 sm:gap-16">
                  {[
                    ["10", "років працює федерація"],
                    ["300+", "учасників спільноти клубу"],
                    ["5", "медалей ЧС та ЧЄ у наших учнів"],
                  ].map(([num, label]) => (
                    <div key={label} className="group cursor-default flex-1 min-w-[120px]">
                      <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight transition-transform duration-300 group-hover:-translate-y-1" style={{ color: C.ink }}>{num}</p>
                      <p className="text-sm mt-2 text-stone-500 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ===== Розклад занять з фільтром ===== */}
      <section id="rozklad" className="py-20 sm:py-28" style={{ backgroundColor: C.bgSoft }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Eyebrow>Розклад занять</Eyebrow>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight max-w-md">
              Оберіть свій рівень гри
            </h2>
            <p className="text-sm max-w-xs leading-relaxed flex items-start gap-2" style={{ color: C.inkSoft }}>
              <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: C.amber }} />
              Шаховий клуб, {CONFIG.address}
            </p>
          </div>

          {/* Перемикач рівнів */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setLevel("all")}
              className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={level === "all"
                ? { backgroundColor: C.ink, color: "#FBF8F2" }
                : { backgroundColor: C.card, color: C.inkSoft, border: `1px solid ${C.line}` }}>
              Усі групи
            </button>
            {SCHEDULE_GROUPS.map((g) => (
              <button key={g.key} onClick={() => setLevel(g.key)}
                className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md inline-flex items-center gap-2"
                style={level === g.key
                  ? { backgroundColor: g.color, color: "#FBF8F2" }
                  : { backgroundColor: C.card, color: C.inkSoft, border: `1px solid ${C.line}` }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: level === g.key ? "#FBF8F2" : g.color }} />
                {g.short}
              </button>
            ))}
          </div>

          {/* Таблиця */}
          <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" style={{ minWidth: level === "all" ? "680px" : "auto" }}>
                <thead>
                  <tr>
                    <th className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wider align-bottom" style={{ backgroundColor: C.ink, color: C.amberSoft }}>
                      День
                    </th>
                    {SCHEDULE_GROUPS.filter((g) => level === "all" || level === g.key).map((g) => (
                      <th key={g.key} className="text-left px-5 py-4 align-bottom" style={{ backgroundColor: g.color }}>
                        <span className="block font-semibold text-sm text-[#FBF8F2] leading-snug">{g.short}</span>
                        <span className="block text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>{g.label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE_ROWS.map((row, i) => {
                    if (level !== "all" && !row.cells[level]) return null;
                    const visible = SCHEDULE_GROUPS.filter((g) => level === "all" || level === g.key);
                    return (
                      <tr key={row.day} style={{ borderTop: `1px solid ${C.line}` }}>
                        <td className="px-5 py-4 font-semibold" style={{ backgroundColor: C.bgSoft }}>{row.day}</td>
                        {visible.map((g) => {
                          const cell = row.cells[g.key];
                          return (
                            <td key={g.key} className="px-5 py-4"
                              style={{ backgroundColor: cell ? `${g.color}12` : C.card }}>
                              {cell ? (
                                <span className="inline-flex items-center gap-2 font-medium" style={{ color: C.ink }}>
                                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                                  {cell}
                                </span>
                              ) : (
                                <span style={{ color: C.line }}>—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-5 text-sm" style={{ color: C.inkSoft }}>
            Неділя — турнірний день. Запис у групу та перше гостьове заняття — за телефоном{" "}
            <a href={`tel:${CONFIG.phone}`} className="font-semibold" style={{ color: C.emerald }}>{CONFIG.phoneDisplay}</a>.
          </p>
        </div>
      </section>

      {/* ===== Новини ===== */}
      <section id="zhyttia" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Eyebrow>Життя клубу</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight mb-12 max-w-lg">
            Журнал: що відбулося за дошками
          </h2>

          <div className="space-y-14">
            {NEWS.map((s, i) => (
              <FadeIn key={s.id} delay={100}>
                <article
                  className={`grid md:grid-cols-2 gap-7 md:gap-12 items-center group ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-3xl transition-shadow duration-500 group-hover:shadow-xl" style={{ border: `1px solid ${C.line}` }}>
                    <NewsImage src={s.img} alt={s.title} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.amber }}>{s.tag}</p>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-snug transition-colors duration-300 group-hover:text-[#B07A2A]">{s.title}</h3>
                    <p className="mt-4 text-base leading-relaxed" style={{ color: C.inkSoft }}>{s.text}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a href={CONFIG.facebookGroupUrl} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: C.ink, color: "#FBF8F2" }}>
              <Crown size={15} style={{ color: C.amberSoft }} /> Усі новини — у групі Chess-Brovary <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== Турніри (гнучкий календар) ===== */}
      <section id="turniry" className="py-20 sm:py-28" style={{ backgroundColor: C.bgSoft }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Eyebrow>Турнірний хаб</Eyebrow>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight max-w-md">
              Календар майбутніх подій
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: C.inkSoft }}>
              Регламенти, запрошення та підсумкові таблиці публікуємо у{" "}
              <a href={CONFIG.facebookGroupUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline transition-colors hover:text-[#B07A2A]" style={{ color: C.emerald }}>
                Facebook-групі федерації
              </a>.
            </p>
          </div>

          {upcoming.length === 0 ? (
            <div className="rounded-3xl p-12 sm:p-16 text-center" style={{ backgroundColor: C.card, border: `1px dashed ${C.line}` }}>
              <ChessPiece piece="♞" className="mx-auto mb-5 text-6xl animate-[idleFloat_4s_ease-in-out_infinite]" style={{ color: C.amber }} />
              <h3 className="font-display text-2xl sm:text-3xl font-semibold">Турнірна пауза — клуб готує новий сезон</h3>
              <p className="mt-3 text-sm max-w-md mx-auto leading-relaxed" style={{ color: C.inkSoft }}>
                Найближчі старти ще не анонсовані... Стежте за анонсами у Facebook-групі —
                нові турніри з'являться тут одразу після оголошення.
              </p>
              <a href={CONFIG.facebookGroupUrl} target="_blank" rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-neutral-800"
                style={{ backgroundColor: C.ink, color: "#FBF8F2" }}>
                <Crown size={15} className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" style={{ color: C.amberSoft }} /> Стежити за анонсами
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {upcoming.map((t, i) => {
                const Icon = formatIcon(t.format);
                const accent = i % 2 === 0 ? C.amber : C.emerald;
                return (
                  <FadeIn key={t.id} delay={i * 100}>
                    <article
                      className="rounded-3xl p-7 sm:p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl duration-300 group h-full"
                      style={{ backgroundColor: C.card, border: `1px solid ${C.line}`, borderTop: `3px solid ${accent}` }}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-2xl sm:text-[1.7rem] font-semibold leading-snug">{t.title}</h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0" style={{ backgroundColor: `${accent}1A`, color: accent }}>
                          <Icon size={13} /> {t.format}
                        </span>
                      </div>
                      <div className="mt-5 space-y-2.5 text-sm" style={{ color: C.inkSoft }}>
                        <p className="flex items-center gap-2.5"><Calendar size={15} style={{ color: accent }} /> {t.date}</p>
                        <p className="flex items-center gap-2.5"><Clock size={15} style={{ color: accent }} /> Початок о {t.time} · {t.control}</p>
                        <p className="flex items-center gap-2.5"><Trophy size={15} style={{ color: accent }} /> {t.prize}</p>
                        <p className="flex items-center gap-2.5"><MapPin size={15} style={{ color: accent }} /> {t.place}</p>
                      </div>
                      {t.details && (
                        <p className="mt-5 pt-5 text-sm leading-relaxed" style={{ color: C.inkSoft, borderTop: `1px solid ${C.line}` }}>
                          {t.details}
                        </p>
                      )}
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== Наші чемпіони ===== */}
      <section id="aleia" className="py-20 sm:py-28" style={{ backgroundColor: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Eyebrow light>Наші чемпіони</Eyebrow>
          <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight text-[#FBF8F2] max-w-xl mb-3">
            Гравці, якими пишається місто
          </h2>
          <p className="text-sm mb-12 max-w-md" style={{ color: "rgba(251,248,242,0.6)" }}>
            Наведіть на картку, щоб побачити історію успіху. Дані рейтингу —
            на офіційній картці ФІДЕ кожного гравця.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLAYERS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <PlayerCard player={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Контакти ===== */}
      <section id="kontakty" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Eyebrow>Контакти</Eyebrow>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Форма → Telegram */}
            <div className="rounded-3xl p-8 sm:p-10" style={{ backgroundColor: C.card, border: `1px solid ${C.line}` }}>
              <h2 className="font-display text-3xl sm:text-4xl font-medium leading-tight">
                Перший хід —{" "}
                <em className="italic" style={{ color: C.amber }}>за вами</em>
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                Заповніть форму — повідомлення сформується автоматично
                й відкриється чат тренера в Telegram.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl p-6 space-y-3" style={{ backgroundColor: `${C.emerald}14`, border: `1px solid ${C.emerald}40` }}>
                  <p className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: C.emerald }}>
                    <Send size={18} className="mt-0.5 shrink-0" />
                    Чат у Telegram відкрито. {CONFIG.telegramUsername
                      ? "Текст уже підставлено — лишилося натиснути «Надіслати»."
                      : "Текст повідомлення скопійовано — вставте його в чат і надішліть."}
                  </p>
                  <button onClick={() => setSent(false)} className="text-xs font-semibold underline" style={{ color: C.emerald }}>
                    Заповнити ще раз
                  </button>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  <Field label="Ім'я" value={form.name} placeholder="Як до вас звертатися" onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Контакт для зв'язку" value={form.contact} placeholder="Телефон, Telegram або e-mail" onChange={(v) => setForm({ ...form, contact: v })} />
                  <Field label="Повідомлення" textarea value={form.message} placeholder="Вік учня (дитина / дорослий), досвід, що цікавить" onChange={(v) => setForm({ ...form, message: v })} />
                  <button onClick={submitForm}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: C.amber, color: "#FBF8F2" }}>
                    Надіслати заявку в Telegram <Send size={15} />
                  </button>
                  <p className="text-xs leading-relaxed flex items-center gap-1.5" style={{ color: C.inkSoft }}>
                    <Copy size={12} /> Текст автоматично копіюється — у чаті достатньо вставити та надіслати.
                  </p>
                </div>
              )}
            </div>

            {/* Інфо + мапа */}
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl p-8 sm:p-9" style={{ backgroundColor: C.bgSoft, border: `1px solid ${C.line}` }}>
                <div className="grid sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="flex items-center gap-2 font-semibold mb-2"><MapPin size={15} style={{ color: C.amber }} /> Адреса</p>
                    <p style={{ color: C.inkSoft }}>{CONFIG.addressFull}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-semibold mb-2"><Clock size={15} style={{ color: C.amber }} /> Графік</p>
                    <p style={{ color: C.inkSoft }}>Пн–Сб · згідно з розкладом груп<br />Нд · турнірний день</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-semibold mb-2"><Phone size={15} style={{ color: C.amber }} /> Зв'язок</p>
                    <p style={{ color: C.inkSoft }}>
                      <a href={`tel:${CONFIG.phone}`} style={{ color: C.inkSoft }}>{CONFIG.phoneDisplay}</a>
                      <br />{CONFIG.email}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-semibold mb-2"><Users size={15} style={{ color: C.amber }} /> Спільнота</p>
                    <div className="flex flex-col gap-2">
                      <a href={CONFIG.facebookGroupUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: C.emerald }}>
                        <Crown size={15} style={{ color: C.amberSoft }} /> Chess-Brovary
                      </a>
                      <a href={CONFIG.telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: C.emerald }}>
                        <Send size={14} /> {CONFIG.telegramGroupName}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-7 pt-6 text-xs" style={{ borderTop: `1px solid ${C.line}`, color: C.inkSoft }}>
                  ГО «Федерація шахів міста Бровари» · ЄДРПОУ 40945719 · зареєстрована 08.11.2016
                </div>
              </div>

              <a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="group relative rounded-3xl overflow-hidden flex-1 min-h-[220px] flex items-center justify-center"
                style={{ backgroundColor: C.emerald }}>
                <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
                  <line x1="0" y1="30%" x2="100%" y2="22%" stroke="#FBF8F2" strokeWidth="2" />
                  <line x1="0" y1="65%" x2="100%" y2="74%" stroke="#FBF8F2" strokeWidth="3" />
                  <line x1="25%" y1="0" x2="18%" y2="100%" stroke="#FBF8F2" strokeWidth="2" />
                  <line x1="70%" y1="0" x2="78%" y2="100%" stroke="#FBF8F2" strokeWidth="2" />
                  <circle cx="50%" cy="48%" r="46" fill="none" stroke="#FBF8F2" strokeWidth="1.5" strokeDasharray="5 6" />
                </svg>
                <div className="relative text-center px-6 py-5 rounded-2xl" style={{ backgroundColor: "rgba(20,30,26,0.45)", backdropFilter: "blur(2px)" }}>
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: C.amberSoft, color: C.ink }}>
                    <MapPin size={22} />
                  </div>
                  <p className="font-body text-lg font-bold text-white tracking-tight">бул. Незалежності, 2</p>
                  <p className="mt-1.5 text-sm font-medium inline-flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.92)" }}>
                    Відкрити маршрут у Google Maps <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Футер ===== */}
      <footer className="py-10" style={{ backgroundColor: C.ink }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => go("hero")} className="group flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5">
            <Crown size={18} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" style={{ color: C.amberSoft }} strokeWidth={1.6} />
            <span className="font-display text-base font-semibold text-[#FBF8F2] link-anim">Федерація шахів міста Бровари</span>
          </button>
          <p className="text-xs" style={{ color: "rgba(251,248,242,0.5)" }}>© 2026 · <a href="/" className="link-anim">chessbrovary.com.ua</a></p>
        </div>
      </footer>
    </div>
  );
}
