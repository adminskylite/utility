"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Globe2,
  LayoutDashboard,
  Monitor,
  PenLine,
  PlayCircle,
  Plus,
  Settings,
  Server,
  TerminalSquare,
  Video,
  Zap,
} from "lucide-react";

const stats = [
  {
    label: "Total Courses",
    value: "24",
    change: "+4 this month",
    icon: BookOpen,
  },
  {
    label: "Video Courses",
    value: "12",
    change: "+2 this month",
    icon: Video,
  },
  {
    label: "Published Blogs",
    value: "68",
    change: "+11 this month",
    icon: FileText,
  },
  {
    label: "VPS Guides",
    value: "31",
    change: "+5 this month",
    icon: Server,
  },
];

const quickActions = [
  {
    title: "Write Blog",
    description: "Create and publish a new VPS article",
    icon: PenLine,
    href: "/blogs/new",
  },
  {
    title: "Build Text Course",
    description: "Create a structured VPS learning course",
    icon: BookOpen,
    href: "/courses/new",
  },
  {
    title: "Link Video Course",
    description: "Add a YouTube or hosted video course",
    icon: Video,
    href: "/video-courses/new",
  },
  {
    title: "Add VPS Guide",
    description: "Create a practical deployment guide",
    icon: Monitor,
    href: "/guides/new",
  },
];

const recentContent = [
  {
    title: "Complete Nginx Reverse Proxy Guide",
    type: "Blog",
    status: "Published",
    date: "Today",
    icon: FileText,
  },
  {
    title: "Linux VPS Security Masterclass",
    type: "Video Course",
    status: "Draft",
    date: "Yesterday",
    icon: Video,
  },
  {
    title: "Deploying Next.js on a VPS",
    type: "Text Course",
    status: "Published",
    date: "Aug 14",
    icon: BookOpen,
  },
  {
    title: "PM2 Production Deployment",
    type: "VPS Guide",
    status: "Published",
    date: "Aug 12",
    icon: Server,
  },
];

const quickLinks = [
  {
    title: "All Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Video Library",
    href: "/video-courses",
    icon: PlayCircle,
  },
  {
    title: "Blog Manager",
    href: "/blogs",
    icon: FileText,
  },
  {
    title: "VPS Guides",
    href: "/guides",
    icon: TerminalSquare,
  },
  {
    title: "Website",
    href: "/website",
    icon: Globe2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm">
              Q
            </div>

            <div>
              <h1 className="text-[17px] font-bold tracking-tight text-slate-950">
                QuerLabs
              </h1>

              <p className="text-[11px] font-medium text-slate-400">
                VPS Content Studio
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/website"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:flex"
            >
              <Globe2 size={16} strokeWidth={1.8} />
              View Website
            </a>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              TS
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
        {/* ================= HERO ================= */}
        <section className="relative mb-7 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-sm sm:px-9 sm:py-10">
          {/* Decorative Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                  <Zap
                    size={12}
                    className="text-emerald-400"
                    strokeWidth={2}
                  />
                </span>

                <span className="text-xs font-semibold text-slate-300">
                  Internal Content Studio
                </span>
              </div>

              <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
                Build better VPS
                <span className="text-emerald-400"> learning content.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-[15px]">
                Manage courses, technical blogs, video lessons and practical
                VPS guides from one centralized workspace.
              </p>

              {/* Small indicators */}
              <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-medium text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Content organized
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-400"
                  />
                  Publishing ready
                </div>
              </div>
            </div>

            {/* Hero CTA */}
            <div className="shrink-0">
              <a
                href="/content/new"
                className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-400/10 transition hover:bg-emerald-300"
              >
                <Plus size={18} strokeWidth={2.2} />
                Create Content
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                      {stat.value}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <BarChart3 size={13} strokeWidth={2} />
                      {stat.change}
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mb-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-950">
                Create something
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Choose what you want to add to the QuerLabs platform.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <a
                  href={action.href}
                  key={action.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
                      <Icon size={21} strokeWidth={1.7} />
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition group-hover:bg-slate-50 group-hover:text-slate-900">
                      <ArrowRight
                        size={17}
                        className="transition group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-950">
                    {action.title}
                  </h4>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    {action.description}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* ================= CONTENT AREA ================= */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Recent Content */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h3 className="font-bold text-slate-950">
                  Recent Content
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Latest changes across the platform
                </p>
              </div>

              <a
                href="/content"
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                View all
                <ChevronRight size={15} />
              </a>
            </div>

            <div className="divide-y divide-slate-100">
              {recentContent.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600">
                        <Icon size={18} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.title}
                        </p>

                        <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
                          <span>{item.type}</span>

                          <span className="text-slate-300">•</span>

                          <span className="flex items-center gap-1">
                            <Clock3 size={12} />
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-bold ${
                        item.status === "Published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-6">
            {/* Monthly Goal */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-950">
                    August Goal
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Content publishing target
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <BarChart3 size={17} />
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <span className="text-3xl font-bold tracking-tight">
                  78%
                </span>

                <span className="text-xs font-medium text-slate-500">
                  18 / 23 published
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[78%] rounded-full bg-emerald-400" />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                5 more pieces of content to reach this month's target.
              </p>
            </div>

            {/* Quick Access */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-950">
                    Quick Access
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Navigate your workspace
                  </p>
                </div>

                <LayoutDashboard
                  size={18}
                  className="text-slate-400"
                  strokeWidth={1.7}
                />
              </div>

              <div className="mt-4 space-y-1">
                {quickLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      href={link.href}
                      key={link.title}
                      className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          size={17}
                          strokeWidth={1.7}
                          className="text-slate-400 transition group-hover:text-slate-700"
                        />

                        {link.title}
                      </span>

                      <ChevronRight
                        size={15}
                        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-700"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-950">
                    Platform Status
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    All systems operational
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-slate-600">
                    Content Platform
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-emerald-600">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 py-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} QuerLabs. Internal Content Studio.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/help"
              className="transition hover:text-slate-700"
            >
              Help
            </a>

            <a
              href="/settings"
              className="transition hover:text-slate-700"
            >
              Settings
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}