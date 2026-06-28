import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '4.9★', label: 'Average rating' },
  { value: '3+', label: 'Years in business' },
  { value: '100%', label: 'Client retention' },
];

const features = [
  {
    title: 'Lightning fast delivery',
    desc: 'From discovery to launch in weeks, not months. We move with urgency without cutting corners.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Pixel-perfect design',
    desc: 'Every detail is intentional. We craft interfaces that convert visitors into paying clients.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
      </svg>
    ),
  },
  {
    title: 'Scalable architecture',
    desc: 'Built to grow with your business. Clean code, solid foundations, zero technical debt.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'Dedicated support',
    desc: "We don't disappear after launch. You get a long-term partner invested in your growth.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: '01',
    title: 'Discovery call',
    desc: "We start by understanding your goals, audience, and vision. No templates — every project begins with a blank canvas.",
  },
  {
    number: '02',
    title: 'Design & build',
    desc: 'We design and develop in parallel, sharing progress at every milestone so there are never any surprises.',
  },
  {
    number: '03',
    title: 'Launch & grow',
    desc: "We hand over a fully tested, production-ready product — and stay on as your partner for what comes next.",
  },
];

const services = [
  { name: 'Web Development', desc: 'High-performance websites and web applications.' },
  { name: 'Branding', desc: 'Identity systems that make a lasting impression.' },
  { name: 'UI/UX Design', desc: 'Interfaces your users will love to navigate.' },
  { name: 'Graphic Design', desc: 'Visual assets that tell your brand story.' },
  { name: 'Marketing', desc: 'Growth strategies grounded in data and results.' },
];

const testimonials = [
  {
    quote: 'Working with Rory Dev completely transformed our brand. The attention to detail was exceptional and the turnaround was faster than we expected.',
    author: 'Rory Cameron',
    role: 'President, University of Aberdeen Men\'s Hockey Club',
    initials: 'RC',
  },
  {
    quote: "Fast, professional, and genuinely invested in our success. They didn't just build what we asked for — they understood the brief and made it better.",
    author: 'Jacques Scott Agnew',
    role: 'Graphic Designer, weareghost',
    initials: 'JS',
  },
  {
    quote: 'Rory Dev built us a slick, professional website that perfectly represents the club. The whole process was smooth from start to finish.',
    author: 'Rory Harris',
    role: 'Club Secretary, University of Aberdeen Men\'s Hockey Club',
    initials: 'RH',
  },
  {
    quote: 'An outstanding service from start to finish. Our new site has received nothing but compliments from members and visitors alike.',
    author: 'Ethan Patel',
    role: 'Founder, Harlaw Consulting',
    initials: 'EP',
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Home = () => (
  <div className="overflow-hidden">

    {/* ── Hero ── */}
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white px-6 pt-20 pb-8">
      {/* Background: subtle grid + purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124,58,237,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(124,58,237,0.10),transparent)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-1.5 text-sm font-medium mb-8 border border-purple-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          Now accepting new clients
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Build something<br />
          <span className="text-purple-700">extraordinary.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          A full-service digital studio for ambitious brands. We design and build premium websites, brand identities, and digital products that drive real growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link to="/contact">
            <Button size="lg" className="shadow-lg shadow-purple-200">Start a project</Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" size="lg">View our services</Button>
          </Link>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white px-6 py-5 text-center">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Trusted by (brand logos placeholder) ── */}
    <section className="py-12 px-6 bg-gray-50 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-8">Trusted by teams at</p>
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {['weareghost', 'Harlaw Consulting', 'University of Aberdeen Men\'s Hockey Club', 'Royal Burgess Golfing Society'].map((name) => (
          <span key={name} className="text-sm font-semibold text-gray-300 tracking-tight">{name}</span>
        ))}
      </div>
    </section>

    {/* ── Features ── */}
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-3">Why us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built different, by design</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We combine craft with strategy to deliver digital work that performs — not just looks good.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Card key={f.title} hover className="p-6">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ── How it works ── */}
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-3">The process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How we work</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Simple, transparent, and designed to get you results without the agency runaround.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
          {steps.map((s) => (
            <div key={s.number} className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <span className="text-4xl font-bold text-purple-100 mb-4 block">{s.number}</span>
              <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Services overview ── */}
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-3">What we offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to grow online</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              From your first logo to a full digital ecosystem — we handle every touchpoint of your brand's online presence.
            </p>
            <Link to="/services">
              <Button variant="secondary">Explore all services</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {services.map((s, i) => (
              <Link
                key={s.name}
                to="/services"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200 group"
              >
                <span className="text-xs font-mono text-gray-400 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── Testimonials ── */}
    <section className="py-24 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by great teams</h2>
          <p className="text-gray-500">Don't take our word for it — hear from clients who've been there.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 flex flex-col">
              <Stars />
              <p className="text-gray-300 leading-relaxed mb-6 text-sm flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-700 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-950 rounded-3xl px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,58,237,0.25),transparent)] pointer-events-none" />
          <div className="relative">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">Let's talk</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to build something great?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Tell us about your project and we'll put together a proposal within 24 hours. No commitment required.
            </p>
            <Link to="/contact">
              <Button size="lg" className="shadow-lg shadow-purple-900">Start a project today</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
