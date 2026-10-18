import Link from 'next/link';
import { jsonLd } from '@/lib/seo';

const FAQS = [
  {
    q: 'What kinds of car covers do you make?',
    a: 'We make outdoor covers for rain, sun and dust, soft indoor covers for the garage or showroom, bespoke printed and monogrammed covers, and unveiling covers for launches and handovers. Every cover is cut for one car.',
  },
  {
    q: 'How do you get the fit right for my car?',
    a: 'You tell us your car\'s brand, model and year when you order. We then confirm the details with you on WhatsApp before we cut the cover, so it sits properly over mirrors, antenna and bumpers.',
  },
  {
    q: 'What do the prices include?',
    a: 'Prices on the site include shipping anywhere in India. GST at 18% is added at checkout. A bespoke cover is quoted after you share your design.',
  },
  {
    q: 'Can I order a cover with my own artwork, monogram or colours?',
    a: 'Yes. Bespoke covers can carry your artwork, livery, logo or monogram, and Elite covers can have contrast piping. Message us on WhatsApp with your idea and we will guide you.',
  },
  {
    q: 'Do you make covers for luxury and imported cars?',
    a: 'Yes. We work with luxury and performance cars such as Rolls-Royce, Bentley, Ferrari, Porsche, Range Rover and BMW, as well as everyday cars. Tell us the model and we will confirm we can make it.',
  },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

/** Plain, readable text for visitors and search engines: what we do, where to go next, common questions. */
export default function HomeIntro() {
  return (
    <section className="bg-white text-slate-900 py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <div className="container-am max-w-5xl">
        <h2 className="text-center uppercase text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(26px, 3.6vw, 44px)', lineHeight: 1.1 }}>
          Car covers made for one car
        </h2>
        <p className="mt-6 mx-auto max-w-3xl text-center text-slate-600 leading-relaxed">
          Signature Covers makes bespoke, made-to-measure car covers in India for luxury and performance cars. Each cover is cut to your exact model,
          with the right pockets for mirrors and antennas, and finished by hand. Choose an outdoor cover for rain and sun, an indoor cover for the garage,
          a bespoke printed cover, or an unveiling cover for a launch or handover. Shipping is free across India.
        </p>
        <nav aria-label="Explore" className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            ['/shop', 'Shop car covers'],
            ['/technology', 'See the technology'],
            ['/collections', 'View the gallery'],
            ['/about', 'About us'],
            ['/contact', 'Contact us'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="px-6 py-3 rounded-full border border-slate-300 hover:border-black text-sm font-medium text-black no-underline transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <h2 className="mt-20 text-center uppercase text-black" style={{ fontFamily: 'var(--font-hype)', fontWeight: 500, fontSize: 'clamp(22px, 2.8vw, 34px)', lineHeight: 1.15 }}>
          Questions, answered
        </h2>
        <div className="mt-8 mx-auto max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-semibold text-black">
                <h3 className="text-base font-semibold">{f.q}</h3>
                <span aria-hidden className="text-xl text-[#b38848] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
