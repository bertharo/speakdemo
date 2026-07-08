import React, { createContext, useContext, useState, useCallback } from "react";
import {
  LayoutGrid,
  Users,
  Armchair,
  FileBarChart,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Bell,
  ChevronDown,
  ArrowUpRight,
  FileDown,
  TrendingUp,
  Plus,
  Sparkles,
  Clock,
  CheckCircle2,
  Trophy,
  Zap,
  Search,
  MoreHorizontal,
  PanelLeftClose,
  Activity,
  Flame,
  AlertTriangle,
  CalendarClock,
  Send,
  Mail,
  Award,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Toast system                                                       */
/* ------------------------------------------------------------------ */
const ToastCtx = createContext(() => {});
const useToast = () => useContext(ToastCtx);

function ToastHost({ toasts }) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg shadow-gray-200/60 animate-[fadeIn_.15s_ease-out]"
          style={{ minWidth: 260, maxWidth: 360 }}
        >
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <CheckCircle2 size={15} />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-gray-900">{t.title}</p>
            {t.body && <p className="mt-0.5 text-gray-500">{t.body}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */
const CARD_SHADOW =
  "shadow-[0_1px_2px_rgba(16,24,40,0.04),0_6px_20px_rgba(16,24,40,0.05)]";

function Card({ className = "", children, ...rest }) {
  return (
    <div
      className={
        "rounded-2xl bg-white ring-1 ring-gray-100/80 " + CARD_SHADOW + " " + className
      }
      {...rest}
    >
      {children}
    </div>
  );
}

function Avatar({ name, className = "" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const palette = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
    "bg-indigo-100 text-indigo-700",
  ];
  const idx =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  return (
    <div
      className={
        "flex shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
        palette[idx] +
        " " +
        className
      }
    >
      {initials}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand mark (matches Speak logo — bars + wordmark)                  */
/* ------------------------------------------------------------------ */
function Logo() {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="flex items-center gap-[3px]">
        <span className="h-2.5 w-[3px] rounded-full bg-blue-600" />
        <span className="h-4 w-[3px] rounded-full bg-blue-600" />
        <span className="h-2.5 w-[3px] rounded-full bg-blue-500" />
        <span className="h-2 w-2 rounded-full bg-blue-600" />
        <span className="h-2 w-2 rounded-full bg-blue-400" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-gray-900">Speak</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */
const NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "learners", label: "Learners", icon: Users },
  { id: "seats", label: "Seats", icon: Armchair },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "proof", label: "Proof & Renewal", icon: ShieldCheck, isNew: true },
  { id: "cohorts", label: "Cohorts & Nudges", icon: SlidersHorizontal, isNew: true },
  { id: "engagement", label: "Engagement", icon: Activity, isNew: true },
  { id: "settings", label: "Organization settings", icon: Settings },
];

function Sidebar({ active, onNavigate }) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-gray-100 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo />
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-50 hover:text-gray-600">
          <PanelLeftClose size={17} />
        </button>
      </div>
      <nav className="flex flex-col gap-1 px-3 py-2">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                (isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")
              }
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-600" />
              )}
              <Icon size={18} className={isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"} />
              <span className="truncate">{item.label}</span>
              {item.isNew && (
                <span className="ml-auto rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600">
                  New
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto p-3">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">
          <p className="text-sm font-semibold">Acme Corp</p>
          <p className="mt-0.5 text-xs text-blue-100">Enterprise · 100 seats</p>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Top bar                                                            */
/* ------------------------------------------------------------------ */
function TopBar({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between gap-4 px-8 pt-8">
      <div>
        <h1 className="text-[30px] font-extrabold leading-tight tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:text-gray-900">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
        </button>
        <button className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
          English <ChevronDown size={15} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SCREEN 1 — Proof & Renewal                                         */
/* ================================================================== */
const SCORECARD = [
  {
    key: "activation",
    label: "Activation",
    score: 87,
    explainer: "% of seats that started a lesson",
    detail: "87 of 100 seats have completed at least one lesson.",
  },
  {
    key: "completion",
    label: "Completion",
    score: 74,
    explainer: "% of learners on-track for assigned level",
    detail: "74% of active learners are pacing to hit their target CEFR level.",
  },
  {
    key: "progress",
    label: "Progress Evidence",
    score: 82,
    explainer: "Documented skill-level gains (CEFR B1 → B2)",
    detail: "41 learners advanced at least one CEFR band this cycle.",
  },
  {
    key: "renewal",
    label: "Renewal Support",
    score: 91,
    explainer: "Usage trend vs. last renewal cycle",
    detail: "Weekly active usage is up 30% versus the prior renewal cycle.",
  },
  {
    key: "gtm",
    label: "GTM Load",
    score: 46,
    explainer: "Manual CS touches this quarter — lower is better",
    detail: "12 manual CS touches this quarter. Self-serve tooling saved ~9 CS hours.",
    invert: true,
  },
];

function scoreColor(score) {
  if (score >= 80) return { text: "text-green-600", bg: "bg-green-50", ring: "ring-green-100", bar: "#16a34a" };
  if (score >= 50) return { text: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-100", bar: "#d97706" };
  return { text: "text-red-500", bg: "bg-red-50", ring: "ring-red-100", bar: "#ef4444" };
}

function ScoreTile({ item, onClick }) {
  // GTM is "lower is better", so color it on inverted health
  const health = item.invert ? 100 - item.score : item.score;
  const c = scoreColor(health);
  return (
    <button
      onClick={onClick}
      className={
        "group flex flex-col rounded-2xl bg-white p-4 text-left ring-1 ring-gray-100/80 transition hover:-translate-y-0.5 hover:shadow-md " +
        CARD_SHADOW
      }
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {item.label}
        </span>
        <span className={"flex h-2 w-2 rounded-full " + c.bar.replace("#", "bg-[") + "]"} style={{ backgroundColor: c.bar }} />
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className={"text-3xl font-bold " + c.text}>{item.score}</span>
        <span className="text-sm font-medium text-gray-400">/100</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full" style={{ width: item.score + "%", backgroundColor: c.bar }} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">{item.explainer}</p>
    </button>
  );
}

const PROOF_LEARNERS = [
  {
    name: "Anna Ferguson",
    role: "Account Executive · EMEA",
    lang: "Spanish",
    from: "B1",
    to: "B2",
    hours: 126,
    unlocked: "Can now lead a full sales call in Spanish",
  },
  {
    name: "Daja Bradley",
    role: "Customer Success · LATAM",
    lang: "Portuguese",
    from: "A2",
    to: "B1",
    hours: 84,
    unlocked: "Handles support escalations without a translator",
  },
  {
    name: "Taylor Roberts",
    role: "Product Manager",
    lang: "German",
    from: "B1",
    to: "B2",
    hours: 97,
    unlocked: "Runs sprint reviews with the Berlin team",
  },
  {
    name: "Samuel Jackson",
    role: "Sales Director",
    lang: "French",
    from: "A2",
    to: "B1",
    hours: 112,
    unlocked: "Negotiates renewals with Paris accounts solo",
  },
];

function ProofCard({ p, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "group flex flex-col rounded-2xl bg-white p-5 text-left ring-1 ring-gray-100/80 transition hover:-translate-y-0.5 hover:shadow-md " +
        CARD_SHADOW
      }
    >
      <div className="flex items-center gap-3">
        <Avatar name={p.name} className="h-10 w-10 text-sm" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">{p.name}</p>
          <p className="truncate text-xs text-gray-500">{p.role}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">
          {p.lang} {p.from}
        </span>
        <ArrowUpRight size={16} className="text-green-500" />
        <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-600">
          {p.lang} {p.to}
        </span>
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50/60 p-3">
        <Sparkles size={15} className="mt-0.5 shrink-0 text-blue-600" />
        <p className="text-sm font-medium leading-snug text-gray-700">{p.unlocked}</p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
        <Clock size={13} />
        {p.hours} hours studied
      </div>
    </button>
  );
}

function EngagementChart() {
  // Two renewal cycles of weekly active learners; renewal marked between them.
  const data = [
    38, 41, 40, 44, 47, 45, 49, 52, 50, 54, 58, 55, /* renewal ~here */ 60,
    63, 61, 66, 70, 68, 72, 77, 74, 79, 83, 88,
  ];
  const renewalIdx = 12;
  const width = 640;
  const height = 150;
  const max = Math.max(...data);
  const min = Math.min(...data) - 4;
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((d, i) => [i * step, height - ((d - min) / range) * (height - 10) - 5]);
  const line = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${width} ${height} L 0 ${height} Z`;
  const rx = renewalIdx * step;
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full" style={{ minWidth: 480 }}>
        <defs>
          <linearGradient id="engFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={width} y1={height * g} y2={height * g} stroke="#f1f5f9" strokeWidth="1" />
        ))}
        <path d={area} fill="url(#engFill)" />
        <path d={line} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* renewal marker */}
        <line x1={rx} x2={rx} y1="0" y2={height} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx={rx} cy={pts[renewalIdx][1]} r="4" fill="#fff" stroke="#2563EB" strokeWidth="2.5" />
        <text x={rx + 6} y="14" fontSize="11" fontWeight="600" fill="#64748b">
          Last renewal
        </text>
        <text x={width - 4} y="14" fontSize="11" fontWeight="700" fill="#2563EB" textAnchor="end">
          +30% vs. last cycle
        </text>
      </svg>
    </div>
  );
}

function ProofRenewal() {
  const toast = useToast();
  return (
    <div className="space-y-6 px-8 pb-12 pt-6">
      {/* Export banner */}
      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Renewal packet ready</p>
            <p className="text-sm text-gray-500">
              Q3 FY26 · Acme Corp · Renews Dec 12, 2026 · Compiled from live account data
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            toast({
              title: "Generating renewal packet…",
              body: "Scorecard, proof of learning & trends → Acme_Renewal_Q3FY26.pdf",
            })
          }
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <FileDown size={17} />
          Export Renewal Packet
        </button>
      </Card>

      {/* Scorecard */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Enterprise Readiness Scorecard</h2>
            <p className="text-sm text-gray-500">
              Five signals that tell the renewal story at a glance
            </p>
          </div>
          <span className="hidden items-center gap-1.5 text-xs font-medium text-gray-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Healthy
            <span className="ml-2 h-2 w-2 rounded-full bg-amber-500" /> Watch
            <span className="ml-2 h-2 w-2 rounded-full bg-red-500" /> At risk
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SCORECARD.map((item) => (
            <ScoreTile
              key={item.key}
              item={item}
              onClick={() => toast({ title: item.label, body: item.detail })}
            />
          ))}
        </div>
      </section>

      {/* Proof of learning + trend */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="mb-3">
            <h2 className="text-base font-bold text-gray-900">Proof of Learning</h2>
            <p className="text-sm text-gray-500">
              Real outcomes from real people — the story behind the numbers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROOF_LEARNERS.map((p) => (
              <ProofCard
                key={p.name}
                p={p}
                onClick={() =>
                  toast({
                    title: `${p.name} · ${p.lang} ${p.from} → ${p.to}`,
                    body: p.unlocked,
                  })
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 xl:col-span-1">
          <Card className="p-5">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Engagement trend</h3>
              <TrendingUp size={17} className="text-green-500" />
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Weekly active learners across the last two renewal cycles
            </p>
            <EngagementChart />
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-bold text-gray-900">Time saved for your team</h3>
            <p className="mb-4 text-sm text-gray-500">
              Self-serve tooling replacing manual CS work
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">9.2</span>
                  <span className="text-xs font-medium text-gray-400">hrs</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">CS hours saved this quarter</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">1</span>
                  <span className="text-xs font-medium text-gray-400">click</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">to a leave-behind packet</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  SCREEN 2 — Cohorts & Nudges                                        */
/* ================================================================== */
const COHORTS = [
  {
    id: "c1",
    name: "Sales Team — EMEA",
    track: "Business Spanish · B1→B2",
    seats: 24,
    activation: 92,
  },
  {
    id: "c2",
    name: "New Hires Q3",
    track: "Onboarding English · A2→B1",
    seats: 31,
    activation: 68,
  },
  {
    id: "c3",
    name: "Exec Spanish Track",
    track: "Executive Spanish · B2→C1",
    seats: 8,
    activation: 100,
  },
  {
    id: "c4",
    name: "Support — LATAM",
    track: "Customer Support Portuguese · A2→B1",
    seats: 17,
    activation: 54,
  },
];

const ACCESS_RULES = [
  {
    id: "a1",
    label: "Auto-add new hires with title contains \u201cSales\u201d",
    desc: "New Workday records matching the rule join within 24h",
    on: true,
  },
  {
    id: "a2",
    label: "Auto-enroll anyone in the EMEA org unit",
    desc: "Scoped to region = EMEA from your HRIS sync",
    on: true,
  },
  {
    id: "a3",
    label: "Require manager approval before a seat activates",
    desc: "Adds a one-click approval step for the reporting manager",
    on: false,
  },
  {
    id: "a4",
    label: "Reclaim seats after 30 days of inactivity",
    desc: "Frees unused licenses back into the pool automatically",
    on: false,
  },
];

const ASSESSMENTS = [
  { id: "as1", name: "Baseline placement (CEFR)", cadence: "On enrollment", passRate: 100, taken: 24 },
  { id: "as2", name: "Checkpoint 1 — Discovery calls", cadence: "Week 4", passRate: 88, taken: 22 },
  { id: "as3", name: "Checkpoint 2 — Objection handling", cadence: "Week 8", passRate: 71, taken: 19 },
  { id: "as4", name: "Certification — Lead a sales call", cadence: "Week 12", passRate: 63, taken: 12 },
];

const NUDGE_TEMPLATES = [
  {
    id: "n1",
    trigger: "inactive 5 days",
    action: "send lesson reminder",
    channel: "Push + Email",
    evidence: "Reactivation",
    icon: Bell,
    on: true,
  },
  {
    id: "n2",
    trigger: "streak about to break (inactive 20h)",
    action: "send streak-save nudge",
    channel: "Push",
    evidence: "Habit protection",
    icon: Flame,
    on: true,
  },
  {
    id: "n3",
    trigger: "module completed",
    action: "schedule Day 1 / 3 / 7 spaced-review quiz",
    channel: "In-app",
    evidence: "Spaced repetition",
    icon: CalendarClock,
    on: true,
  },
  {
    id: "n4",
    trigger: "weekly · Monday 9am",
    action: "send at-risk digest to the cohort manager",
    channel: "Email + Slack",
    evidence: "Manager visibility",
    icon: Mail,
    on: false,
  },
  {
    id: "n5",
    trigger: "milestone reached (level up or streak record)",
    action: "celebrate + suggest next track",
    channel: "In-app + Slack",
    evidence: "Motivation",
    icon: Award,
    on: false,
  },
];

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors " +
        (on ? "bg-blue-600" : "bg-gray-200")
      }
    >
      <span
        className={
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform " +
          (on ? "translate-x-5" : "translate-x-0.5")
        }
      />
    </button>
  );
}

function CohortRow({ c, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "flex w-full flex-col rounded-xl border p-3 text-left transition " +
        (active
          ? "border-blue-200 bg-blue-50/70 ring-1 ring-blue-100"
          : "border-transparent hover:border-gray-100 hover:bg-gray-50")
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold text-gray-900">{c.name}</span>
        <span className="shrink-0 text-xs font-semibold text-gray-400">{c.seats} seats</span>
      </div>
      <span className="mt-0.5 truncate text-xs text-gray-500">{c.track}</span>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className={"h-full rounded-full " + (c.activation >= 80 ? "bg-green-500" : c.activation >= 60 ? "bg-amber-500" : "bg-red-400")}
            style={{ width: c.activation + "%" }}
          />
        </div>
        <span className="text-xs font-medium text-gray-500">{c.activation}%</span>
      </div>
    </button>
  );
}

function AccessTab({ toast }) {
  const [rules, setRules] = useState(ACCESS_RULES);
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Define who gets a seat automatically. These rules replace the manual roster
        spreadsheet CS used to maintain.
      </p>
      {rules.map((r) => (
        <div
          key={r.id}
          className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900">{r.label}</p>
            <p className="mt-0.5 text-xs text-gray-500">{r.desc}</p>
          </div>
          <Toggle
            on={r.on}
            onChange={() => {
              setRules((prev) => prev.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)));
              toast({
                title: !r.on ? "Rule activated" : "Rule paused",
                body: r.label,
              });
            }}
          />
        </div>
      ))}
      <button
        onClick={() => toast({ title: "Add access rule", body: "Rule builder would open here" })}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-3 text-sm font-semibold text-gray-500 transition hover:border-blue-300 hover:text-blue-600"
      >
        <Plus size={16} /> Add access rule
      </button>
    </div>
  );
}

function AssessmentsTab({ toast }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Checkpoint assessments prove skills are sticking. Pass-rate bars flag where a
        cohort needs a nudge.
      </p>
      {ASSESSMENTS.map((a) => {
        const color = a.passRate >= 80 ? "bg-green-500" : a.passRate >= 65 ? "bg-amber-500" : "bg-red-400";
        return (
          <button
            key={a.id}
            onClick={() => toast({ title: a.name, body: `${a.passRate}% pass rate · ${a.taken} learners assessed` })}
            className="flex w-full items-center gap-4 rounded-xl border border-gray-100 p-4 text-left transition hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CheckCircle2 size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-gray-900">{a.name}</p>
                <span className="shrink-0 text-sm font-bold text-gray-900">{a.passRate}%</span>
              </div>
              <p className="text-xs text-gray-500">{a.cadence} · {a.taken} assessed</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div className={"h-full rounded-full " + color} style={{ width: a.passRate + "%" }} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function NudgesTab({ toast }) {
  const [nudges, setNudges] = useState(NUDGE_TEMPLATES);
  const activeCount = nudges.filter((n) => n.on).length;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          The Slack messages CS used to send by hand — now a stackable library of
          evidence-based rules. Flip on the ones this cohort needs.
        </p>
        <span className="hidden shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 sm:inline">
          {activeCount} active
        </span>
      </div>

      {/* Rule builder */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-blue-600">Rule builder</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-gray-700">If</span>
          <span className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 font-medium text-gray-900">
            inactive 5 days
          </span>
          <span className="font-semibold text-gray-700">then</span>
          <span className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 font-medium text-gray-900">
            send lesson reminder
          </span>
          <button
            onClick={() => toast({ title: "Nudge created", body: "If inactive 5 days → send lesson reminder" })}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Zap size={14} /> Activate
          </button>
        </div>
      </div>

      <p className="pt-1 text-xs font-bold uppercase tracking-wide text-gray-400">
        Evidence-based templates
      </p>
      {nudges.map((n) => {
        const Icon = n.icon || Zap;
        return (
          <div
            key={n.id}
            className={
              "flex items-center justify-between gap-4 rounded-xl border p-4 transition " +
              (n.on ? "border-blue-100 bg-blue-50/30" : "border-gray-100")
            }
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg " +
                  (n.on ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400")
                }
              >
                <Icon size={17} />
              </div>
              <div className="min-w-0 text-sm">
                <p className="text-gray-900">
                  <span className="font-semibold">If</span> {n.trigger}{" "}
                  <span className="font-semibold">then</span> {n.action}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                    {n.channel}
                  </span>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600">
                    {n.evidence}
                  </span>
                </div>
              </div>
            </div>
            <Toggle
              on={n.on}
              onChange={() => {
                setNudges((prev) => prev.map((x) => (x.id === n.id ? { ...x, on: !x.on } : x)));
                toast({ title: !n.on ? "Nudge activated" : "Nudge paused", body: `If ${n.trigger} → ${n.action}` });
              }}
            />
          </div>
        );
      })}

      <button
        onClick={() => toast({ title: "Add nudge rule", body: "Custom rule builder would open here" })}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 py-3 text-sm font-semibold text-gray-500 transition hover:border-blue-300 hover:text-blue-600"
      >
        <Plus size={16} /> Add custom nudge
      </button>
    </div>
  );
}

function CohortsNudges() {
  const toast = useToast();
  const [selected, setSelected] = useState(COHORTS[0].id);
  const [tab, setTab] = useState("access");
  const cohort = COHORTS.find((c) => c.id === selected);

  const tabs = [
    { id: "access", label: "Access" },
    { id: "assessments", label: "Assessments" },
    { id: "nudges", label: "Nudges" },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 px-8 pb-12 pt-6 lg:grid-cols-[320px_1fr]">
      {/* Left — cohort list */}
      <Card className="flex h-fit flex-col p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">Cohorts</h2>
          <button
            onClick={() => toast({ title: "New cohort", body: "Cohort creation wizard would open here" })}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={14} /> New Cohort
          </button>
        </div>
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search cohorts"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-300 focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          {COHORTS.map((c) => (
            <CohortRow key={c.id} c={c} active={c.id === selected} onClick={() => setSelected(c.id)} />
          ))}
        </div>
      </Card>

      {/* Right — config panel */}
      <Card className="flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{cohort.name}</h2>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                  {cohort.seats} seats
                </span>
              </div>
              <p className="text-sm text-gray-500">{cohort.track}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Activation</p>
              <p className="text-lg font-bold text-gray-900">{cohort.activation}%</p>
            </div>
            <button
              onClick={() => toast({ title: cohort.name, body: "Cohort settings menu" })}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:text-gray-700"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-100 px-5">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                "relative px-3 py-3 text-sm font-semibold transition-colors " +
                (tab === t.id ? "text-blue-600" : "text-gray-500 hover:text-gray-900")
              }
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === "access" && <AccessTab toast={toast} />}
          {tab === "assessments" && <AssessmentsTab toast={toast} />}
          {tab === "nudges" && <NudgesTab toast={toast} />}
        </div>
      </Card>
    </div>
  );
}

/* ================================================================== */
/*  SCREEN 3 — Engagement                                              */
/* ================================================================== */
const ENGAGEMENT_METRICS = [
  {
    key: "dau",
    label: "Daily Active %",
    score: 64,
    explainer: "Learners active in the last 24 hours",
    detail: "64 of 100 seats opened a lesson in the last 24h — above the 55% enterprise benchmark.",
  },
  {
    key: "streak",
    label: "Streak Retention",
    score: 78,
    explainer: "% keeping a 3-day+ streak alive",
    detail: "78% of active learners are protecting a 3-day-or-longer daily streak.",
  },
  {
    key: "nudge",
    label: "Nudge Response Rate",
    score: 71,
    explainer: "% who act within 48h of a nudge",
    detail: "71% of nudged learners returned and completed a session within 48 hours.",
  },
  {
    key: "risk",
    label: "At-Risk Learners",
    score: 18,
    explainer: "Inactive 3+ days — lower is better",
    detail: "18 learners are inactive 3+ days. Early nudges recover ~7 in 10 before they churn.",
    invert: true,
  },
];

const AT_RISK = [
  {
    name: "Marcus Chen",
    role: "SDR · APAC",
    lastActive: "4 days ago",
    streak: 0,
    reason: "stalled mid-module",
    severity: "high",
  },
  {
    name: "Priya Nair",
    role: "Account Manager · EMEA",
    lastActive: "3 days ago",
    streak: 6,
    reason: "missed 2 nudges",
    severity: "med",
  },
  {
    name: "Liam O'Brien",
    role: "Support · LATAM",
    lastActive: "5 days ago",
    streak: 0,
    reason: "stalled mid-module",
    severity: "high",
  },
  {
    name: "Sofia Martinez",
    role: "BDR · North America",
    lastActive: "6 days ago",
    streak: 2,
    reason: "no baseline assessment",
    severity: "high",
  },
  {
    name: "Kenji Tanaka",
    role: "Product Manager · APAC",
    lastActive: "3 days ago",
    streak: 11,
    reason: "missed 2 nudges",
    severity: "med",
  },
];

const STREAK_LEADERS = [
  { name: "Kenji Tanaka", role: "PM · APAC", streak: 41 },
  { name: "Anna Ferguson", role: "AE · EMEA", streak: 38 },
  { name: "Daja Bradley", role: "CS · LATAM", streak: 29 },
  { name: "Taylor Roberts", role: "PM", streak: 22 },
  { name: "Priya Nair", role: "AM · EMEA", streak: 18 },
];

const SPACED_REVIEW = [
  { label: "Day 1", desc: "Same-day recall", completion: 88 },
  { label: "Day 3", desc: "Short-term reinforcement", completion: 74 },
  { label: "Day 7", desc: "Long-term retention", completion: 61 },
];

function severityChip(sev) {
  return sev === "high"
    ? "bg-red-50 text-red-600"
    : "bg-amber-50 text-amber-600";
}

function AtRiskRow({ r, toast }) {
  return (
    <div className="grid grid-cols-[1.6fr_1fr_0.7fr_1.3fr_auto] items-center gap-3 border-b border-gray-50 px-4 py-3 last:border-0 hover:bg-gray-50/60">
      <div className="flex items-center gap-3">
        <Avatar name={r.name} className="h-9 w-9 text-xs" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{r.name}</p>
          <p className="truncate text-xs text-gray-500">{r.role}</p>
        </div>
      </div>
      <span className="text-sm text-gray-500">{r.lastActive}</span>
      <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
        <Flame size={14} className={r.streak > 0 ? "text-orange-500" : "text-gray-300"} />
        {r.streak}
      </span>
      <span className={"w-fit rounded-full px-2 py-1 text-xs font-medium " + severityChip(r.severity)}>
        {r.reason}
      </span>
      <button
        onClick={() =>
          toast({ title: `Nudge sent to ${r.name}`, body: "Lesson reminder delivered via Push + Email" })
        }
        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
      >
        <Send size={13} /> Send nudge
      </button>
    </div>
  );
}

function SpacedReviewViz() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      {SPACED_REVIEW.map((s, i) => {
        const color = s.completion >= 80 ? "#16a34a" : s.completion >= 65 ? "#2563EB" : "#d97706";
        return (
          <React.Fragment key={s.label}>
            <div className="flex-1 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-gray-100">
                  <CalendarClock size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{s.label}</p>
                  <p className="text-[11px] text-gray-500">{s.desc}</p>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-xs text-gray-500">Quiz completion</span>
                <span className="text-sm font-bold text-gray-900">{s.completion}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full" style={{ width: s.completion + "%", backgroundColor: color }} />
              </div>
            </div>
            {i < SPACED_REVIEW.length - 1 && (
              <div className="hidden items-center text-gray-300 sm:flex">
                <ArrowUpRight size={18} className="rotate-45" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Engagement() {
  const toast = useToast();
  return (
    <div className="space-y-6 px-8 pb-12 pt-6">
      {/* Health strip */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Engagement health</h2>
            <p className="text-sm text-gray-500">Four signals for whether learning is becoming a habit</p>
          </div>
          <span className="hidden items-center gap-1.5 text-xs font-medium text-gray-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Healthy
            <span className="ml-2 h-2 w-2 rounded-full bg-amber-500" /> Watch
            <span className="ml-2 h-2 w-2 rounded-full bg-red-500" /> At risk
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ENGAGEMENT_METRICS.map((item) => (
            <ScoreTile
              key={item.key}
              item={item}
              onClick={() => toast({ title: item.label, body: item.detail })}
            />
          ))}
        </div>
      </section>

      {/* At-risk table + streaks */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* At-risk table */}
        <Card className="flex flex-col overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">At-risk learners</h3>
                <p className="text-sm text-gray-500">Inactive 3+ days — intervene before they churn, no CS ticket</p>
              </div>
            </div>
            <button
              onClick={() =>
                toast({ title: "Nudged 5 at-risk learners", body: "Lesson reminders queued via Push + Email" })
              }
              className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 sm:inline-flex"
            >
              <Send size={13} /> Nudge all
            </button>
          </div>
          <div className="grid grid-cols-[1.6fr_1fr_0.7fr_1.3fr_auto] gap-3 border-y border-gray-100 bg-gray-50/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            <span>Learner</span>
            <span>Last active</span>
            <span>Streak</span>
            <span>Reason</span>
            <span className="text-right">Action</span>
          </div>
          <div>
            {AT_RISK.map((r) => (
              <AtRiskRow key={r.name} r={r} toast={toast} />
            ))}
          </div>
        </Card>

        {/* Streaks & microlearning */}
        <div className="space-y-4 xl:col-span-1">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Top streaks</h3>
                <p className="text-sm text-gray-500">Protected daily habits, not vanity</p>
              </div>
              <Flame size={18} className="text-orange-500" />
            </div>
            <div className="flex flex-col gap-2.5">
              {STREAK_LEADERS.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => toast({ title: s.name, body: `${s.streak}-day streak · ${s.role}` })}
                  className="flex items-center gap-3 rounded-lg p-1.5 text-left transition hover:bg-gray-50"
                >
                  <span className="w-4 shrink-0 text-center text-xs font-bold text-gray-400">{i + 1}</span>
                  <Avatar name={s.name} className="h-8 w-8 text-xs" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{s.name}</p>
                    <p className="truncate text-xs text-gray-500">{s.role}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-bold text-orange-600">
                    <Flame size={12} /> {s.streak}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-base font-bold text-gray-900">5-min daily habit</h3>
            <p className="mb-4 text-sm text-gray-500">Microlearning adoption across active seats</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">72</span>
                  <span className="text-xs font-medium text-gray-400">%</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">keep a 5-min daily session</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">6.4</span>
                  <span className="text-xs font-medium text-gray-400">min</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">avg. daily session length</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Spaced review */}
      <section>
        <Card className="p-5">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Spaced-review schedule</h3>
              <p className="text-sm text-gray-500">
                Auto-generated review quizzes fire after each module completion to lock in retention
              </p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 sm:inline-flex">
              <CalendarClock size={13} /> Auto-scheduled
            </span>
          </div>
          <div className="mt-4">
            <SpacedReviewViz />
          </div>
        </Card>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  Placeholder screen for existing (non-built) nav items             */
/* ================================================================== */
function Placeholder({ title }) {
  return (
    <div className="px-8 pb-12 pt-6">
      <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
          <Trophy size={22} />
        </div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="max-w-md text-sm text-gray-500">
          This is an existing screen in the Acme Corp dashboard. This prototype focuses on
          the new surfaces — open <span className="font-semibold text-blue-600">Proof &amp; Renewal</span>,{" "}
          <span className="font-semibold text-blue-600">Cohorts &amp; Nudges</span>, or{" "}
          <span className="font-semibold text-blue-600">Engagement</span> from the sidebar.
        </p>
      </Card>
    </div>
  );
}

/* ================================================================== */
/*  App shell                                                          */
/* ================================================================== */
const META = {
  overview: { title: "Your Organization", subtitle: "Overview of the organization" },
  learners: { title: "Learners", subtitle: "Everyone learning at Acme Corp" },
  seats: { title: "Seats", subtitle: "Manage licenses and activation" },
  reports: { title: "Reports", subtitle: "Usage and outcome reporting" },
  proof: { title: "Proof & Renewal", subtitle: "Everything you need for your next renewal conversation" },
  cohorts: { title: "Cohorts & Nudges", subtitle: "Configure how your teams launch, learn, and stay engaged — no CS ticket required" },
  engagement: { title: "Engagement", subtitle: "Keep Acme Corp's learners active — intervene early, build habits, reinforce retention" },
  settings: { title: "Organization settings", subtitle: "Configure your workspace" },
};

export default function App() {
  const [active, setActive] = useState(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    return NAV.some((n) => n.id === hash) ? hash : "proof";
  });
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3200);
  }, []);

  const meta = META[active];

  return (
    <ToastCtx.Provider value={pushToast}>
      <div className="flex h-screen w-full overflow-hidden bg-[#F7F8FA] text-gray-900">
        <Sidebar active={active} onNavigate={setActive} />
        <main className="flex flex-1 flex-col overflow-y-auto">
          <TopBar title={meta.title} subtitle={meta.subtitle} />
          {active === "proof" ? (
            <ProofRenewal />
          ) : active === "cohorts" ? (
            <CohortsNudges />
          ) : active === "engagement" ? (
            <Engagement />
          ) : (
            <Placeholder title={meta.title} />
          )}
        </main>
      </div>
      <ToastHost toasts={toasts} />
    </ToastCtx.Provider>
  );
}
