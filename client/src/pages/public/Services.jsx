import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const services = [
  {
    name: 'Website Development',
    desc: 'High-performance, accessible websites built with modern frameworks. From marketing sites to complex web applications.',
    features: ['React / Next.js', 'Node.js backends', 'CMS integration', 'Performance optimisation', 'SEO best practices'],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    name: 'Branding',
    desc: 'Comprehensive brand identity systems that communicate your values and resonate with your audience at every touchpoint.',
    features: ['Logo design', 'Brand guidelines', 'Typography system', 'Colour palette', 'Brand voice & tone'],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    name: 'Graphic Design',
    desc: 'Striking visual assets for every format — digital and print. Designed to stop the scroll and start conversations.',
    features: ['Social media assets', 'Print collateral', 'Presentation design', 'Infographics', 'Marketing materials'],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Marketing',
    desc: 'Data-driven marketing strategies that attract, convert, and retain your ideal customers through every stage of the funnel.',
    features: ['SEO & content strategy', 'Paid advertising', 'Email campaigns', 'Analytics & reporting', 'Conversion optimisation'],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    name: 'UI/UX Design',
    desc: 'User research-led design that creates intuitive, delightful digital experiences. We design with your users at the centre.',
    features: ['User research', 'Wireframing', 'Interactive prototypes', 'Usability testing', 'Design systems'],
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const Services = () => (
  <div className="pt-20">
    {/* Header */}
    <section className="py-20 px-6 text-center bg-white">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Our services</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          A full-service digital studio. We combine strategy, design, and technology to build products that drive real growth.
        </p>
      </div>
    </section>

    {/* Service cards */}
    <section className="py-8 pb-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Card key={s.name} hover className="p-8 flex flex-col gap-5">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              {s.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
            <ul className="flex flex-col gap-2 mt-auto">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}

        {/* CTA card */}
        <Card className="p-8 bg-purple-700 border-purple-700 flex flex-col justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Not sure where to start?</h3>
            <p className="text-sm text-purple-200 leading-relaxed">Tell us about your project and we'll put together a tailored recommendation.</p>
          </div>
          <Link to="/contact">
            <Button variant="secondary" className="w-full">Get in touch</Button>
          </Link>
        </Card>
      </div>
    </section>
  </div>
);

export default Services;
