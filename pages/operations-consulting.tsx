import { motion } from 'motion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import Header from '../components/Header';
import SectionTracker from '../components/SectionTracker';

export default function OperationsConsulting() {
  useEffect(() => {
    // Parallax scroll effect for Operations page
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.operations-parallax-bg') as HTMLElement;

      if (parallaxBg) {
        const speed = 0.5;
        parallaxBg.style.transform = `translateY(${scrolled * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pain points data
  const painPoints = [
    {
      title: 'Labor Inefficiencies',
      description:
        'Overstaffing, scheduling conflicts, and poor resource allocation draining your payroll budget without delivering proportional value.',
    },
    {
      title: 'Safety Oversights',
      description:
        'Compliance gaps and protocol weaknesses that could trigger costly incidents, lawsuits, and production shutdowns.',
    },
    {
      title: 'Logistics Bottlenecks',
      description:
        'Supply chain disruptions, equipment delays, and coordination failures that cause expensive downtime and missed deadlines.',
    },
    {
      title: 'Forecasting Errors',
      description:
        'Inaccurate projections that leave you short-staffed on sold-out nights or overstaffed on slow ones—margin killers hiding in plain sight.',
    },
  ];

  // Solutions data
  const solutions = [
    {
      title: 'Operational Audit',
      description:
        "I review your schedules, settlements, vendor contracts, and crew logs to find where money's leaking.",
    },
    {
      title: 'Strategic Solutions',
      description:
        'Proven methodologies and industry insights that address root causes, not just symptoms.',
    },
    {
      title: 'Risk Prevention',
      description:
        'I spot the compliance gaps and safety issues before they become insurance claims or lawsuits.',
    },
    {
      title: 'Measurable Results',
      description:
        'Cost savings that consistently exceed consulting fees, freeing you to focus on growth and innovation.',
    },
  ];

  return (
    <>
      <Head>
        <title>Operations Consulting | Venue & Entertainment Operations - CLB Consulting</title>
        <meta
          name="description"
          content="Expert operations consulting for venues and live entertainment. Find hidden losses, fix labor inefficiencies, prevent safety issues, and optimize your bottom line. 20 years of hands-on experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Chris Lee Bergstrom" />
        <meta
          name="keywords"
          content="operations consulting, venue operations, entertainment consulting, labor efficiency, safety compliance, logistics optimization, production management, venue management, live events consulting, Chris Lee Bergstrom, CLB Consulting"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#9370DB" />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/images/Favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/Favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/Favicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/Favicon/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/Favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/images/Favicon/android-chrome-512x512.png"
        />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Operations Consulting | CLB Consulting" />
        <meta
          property="og:description"
          content="Expert operations consulting for venues and live entertainment. Find hidden losses, fix labor inefficiencies, prevent safety issues, and optimize your bottom line."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chrisleebergstrom.com/operations-consulting" />
        <meta property="og:image" content="https://chrisleebergstrom.com/images/operational.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Operations Consulting - CLB Consulting by Chris Lee Bergstrom"
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chrisleebergstrom" />
        <meta name="twitter:creator" content="@chrisleebergstrom" />
        <meta name="twitter:title" content="Operations Consulting | CLB Consulting" />
        <meta
          name="twitter:description"
          content="Expert operations consulting for venues and live entertainment. Find hidden losses, fix labor inefficiencies, prevent safety issues, and optimize your bottom line."
        />
        <meta
          name="twitter:image"
          content="https://chrisleebergstrom.com/images/operational.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Operations Consulting - CLB Consulting by Chris Lee Bergstrom"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://chrisleebergstrom.com/operations-consulting" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              '@id': 'https://chrisleebergstrom.com/operations-consulting#service',
              name: 'Operations Consulting',
              description:
                'Expert operations consulting for venues and live entertainment. Comprehensive audits, strategic solutions, risk prevention, and measurable cost savings.',
              provider: {
                '@type': 'Organization',
                '@id': 'https://chrisleebergstrom.com/#organization',
                name: 'CLB Consulting',
              },
              serviceType: 'Venue Operations Consulting',
              areaServed: 'Worldwide',
              audience: {
                '@type': 'Audience',
                audienceType: 'Venues, Arts Organizations, Live Entertainment Companies',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Operations Consulting Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Operational Audit',
                      description:
                        'Review schedules, settlements, vendor contracts, and crew logs to identify cost leaks',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Strategic Solutions',
                      description:
                        'Proven methodologies addressing root causes of operational inefficiencies',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Risk Prevention',
                      description:
                        'Identify compliance gaps and safety issues before they become costly problems',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Measurable Results',
                      description: 'Cost savings that consistently exceed consulting fees',
                    },
                  },
                ],
              },
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://chrisleebergstrom.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Operations Consulting',
                    item: 'https://chrisleebergstrom.com/operations-consulting',
                  },
                ],
              },
            }),
          }}
        />
      </Head>

      <Header />

      {/* Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-10]">
        <div
          className="operations-parallax-bg absolute inset-0 bg-top bg-cover md:bg-fixed"
          style={{
            backgroundImage: "url('/images/operationsbg.webp')",
            minHeight: '300vh',
            top: '-80vh',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      <main className="min-h-screen bg-transparent text-white pt-24 md:pt-40 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <SectionTracker
            name="Operations - Hero"
            butlerMessage="Twenty years finding where the money disappears. Chris doesn't audit from a conference room—he walks your load-ins."
          >
            <div className="text-center mb-16">
              <motion.h1
                className="text-3xl md:text-5xl font-heading mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                I've Never Cost a Client More Than I've Saved Them
              </motion.h1>
              <div className="w-full max-w-xl mx-auto my-6">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    {
                      src: '/images/TDWOSO.webp',
                      alt: 'The Dandy Warhols in Portland with the Oregon Symphony',
                    },
                    { src: '/images/NY.webp', alt: 'Large concert in upstate New York' },
                    { src: '/images/Faster.webp', alt: 'Large concert in Michigan' },
                    {
                      src: '/images/Rain.webp',
                      alt: 'Tour bus with a rainbow reflection and storm in the background',
                    },
                  ].map((img, index) => (
                    <motion.div
                      key={index}
                      className="border-none rounded-lg overflow-hidden bg-transparent cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1, ease: 'easeOut' }}
                      whileHover={{ scale: 1.08 }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={128}
                        height={128}
                        className={`w-full h-auto object-cover aspect-video opacity-70 ${img.src.includes('Rain') ? 'object-bottom' : ''}`}
                        quality={85}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.p
                className="text-base md:text-lg font-body leading-relaxed max-w-3xl mx-auto"
                style={{ color: '#F5F5DC' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Twenty years on stages, in production offices, and on tour buses taught me where
                money disappears—and how to stop the bleeding. I find the overtime leaks, the vendor
                overcharges, the scheduling collisions, and the compliance gaps before they become
                six-figure problems. My fees come out of savings you didn't know you had.
              </motion.p>
            </div>
          </SectionTracker>

          {/* Problem Section */}
          <SectionTracker
            name="Operations - Problem"
            butlerMessage="10-20% budget overruns are the industry norm. But it doesn't have to be your norm."
          >
            <div className="mb-16">
              <motion.div
                className="bg-black/80 rounded-lg border-2 border-mauve/50 p-8 md:p-12 shadow-[0_0_30px_rgba(147,112,219,0.4)] hover:shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center">
                  You're Losing Money Somewhere — But You Don't Have Time to Find It
                </h2>
                <p
                  className="text-base font-body leading-relaxed text-center max-w-3xl mx-auto mb-8"
                  style={{ color: '#F5F5DC' }}
                >
                  Hidden losses lurk in labor inefficiencies, safety oversights, logistics
                  bottlenecks, and forecasting errors. Industry standards recommend 10-20%
                  contingency buffers—but without proper systems, that buffer becomes wishful
                  thinking.
                </p>
                <p
                  className="text-base font-body leading-relaxed text-center max-w-3xl mx-auto mb-10"
                  style={{ color: '#F5F5DC', opacity: 0.85 }}
                >
                  These gaps quietly drain your bottom line, often unnoticed until it's too
                  late—eating away at margins, threatening production timelines, and exposing your
                  operation to costly compliance risks.
                </p>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <motion.div
                    className="text-center p-6 bg-black/80 rounded-lg border-2 border-mauve/50 shadow-[0_0_30px_rgba(147,112,219,0.4)] hover:shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-shadow duration-300"
                    whileHover={{ scale: 1.03, borderColor: 'rgba(147, 112, 219, 0.5)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl md:text-5xl font-heading text-molten mb-2">10-20%</div>
                    <div className="text-sm font-body" style={{ color: '#F5F5DC' }}>
                      Typical Budget Overrun
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#F5F5DC', opacity: 0.7 }}>
                      On productions without expert oversight
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-center p-6 bg-black/80 rounded-lg border-2 border-mauve/50 shadow-[0_0_30px_rgba(147,112,219,0.4)] hover:shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-shadow duration-300"
                    whileHover={{ scale: 1.03, borderColor: 'rgba(147, 112, 219, 0.5)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl md:text-5xl font-heading text-molten mb-2">80-90%</div>
                    <div className="text-sm font-body" style={{ color: '#F5F5DC' }}>
                      Of Incidents Are Preventable
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#F5F5DC', opacity: 0.7 }}>
                      Caused by human error and process gaps
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </SectionTracker>

          {/* Pain Points Section */}
          <SectionTracker
            name="Operations - Pain Points"
            butlerMessage="Labor, safety, logistics, forecasting—these are the four horsemen of production chaos."
          >
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                Where Productions Lose Money
              </h2>
              <div className="w-full max-w-sm mx-auto my-6">
                <motion.div
                  className="border-none rounded-lg overflow-hidden bg-transparent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src="/images/crystal.webp"
                    alt="Concert at the Crystal Ballroom in Portland, OR"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover opacity-70"
                    quality={85}
                    loading="lazy"
                  />
                </motion.div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/80 rounded-lg border-2 border-mauve/50 p-6 shadow-[0_0_30px_rgba(147,112,219,0.4)] hover:shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#F5F5DC' }}>
                      {point.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#F5F5DC', opacity: 0.85 }}
                    >
                      {point.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTracker>

          {/* Approach Section */}
          <SectionTracker
            name="Operations - Approach"
            butlerMessage="Chris walks load-ins, sits in production meetings, and reviews settlements line by line. That's how you find the truth."
          >
            <div className="mb-16">
              <motion.div
                className="bg-black/80 rounded-lg border-2 border-mauve/50 p-8 md:p-12 text-center shadow-[0_0_30px_rgba(147,112,219,0.4)] hover:shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                  I Dive Deep Into Your Entire Operation
                </h2>
                <p
                  className="text-base font-body leading-relaxed max-w-3xl mx-auto"
                  style={{ color: '#F5F5DC' }}
                >
                  I don't audit from a conference room. I walk your load-ins, sit in your production
                  meetings, and review your settlements line by line. I've seen how costs hide in
                  crew overtime, vendor markups, and scheduling gaps that nobody's watching. That's
                  where I focus.
                </p>
              </motion.div>
            </div>
          </SectionTracker>

          {/* Solutions Section */}
          <SectionTracker
            name="Operations - Solutions"
            butlerMessage="Audit, strategy, risk prevention, results. The full operational toolkit."
          >
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                What I Deliver
              </h2>
              <div className="w-full max-w-sm mx-auto my-6">
                <motion.div
                  className="border-none rounded-lg overflow-hidden bg-transparent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src="/images/TDWVL.webp"
                    alt="Large concert in Valencia, Spain"
                    width={800}
                    height={516}
                    className="w-full h-auto object-cover opacity-70"
                    quality={85}
                    loading="lazy"
                  />
                </motion.div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/80 rounded-lg border-2 border-mauve/50 p-6 shadow-[0_0_30px_rgba(147,112,219,0.4)] hover:shadow-[0_0_40px_rgba(147,112,219,0.6)] transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#F5F5DC' }}>
                      {solution.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#F5F5DC', opacity: 0.85 }}
                    >
                      {solution.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionTracker>

          {/* Tagline */}
          <div className="text-center py-12">
            <p className="text-xl italic font-heading" style={{ color: '#F5F5DC', opacity: 0.8 }}>
              Strategy Born from the Wreckage, Intelligence Forged in the Fire
            </p>
            <div className="mt-8">
              <span className="block h-0.5 bg-molten w-32 mx-auto animate-pulse-width"></span>
            </div>
          </div>

          {/* Contact Section */}
          <SectionTracker name="Operations - Contact">
            <section className="py-12 px-6 text-center">
              <div className="max-w-lg mx-auto space-y-6">
                <div className="space-y-4">
                  <a
                    href="mailto:chrisleebergstrom@gmail.com?subject=Operations Consulting Inquiry - Let's Find the Leaks"
                    className="group block relative overflow-hidden py-4 px-8 bg-transparent text-white font-bold rounded-lg border border-molten hover:border-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  >
                    <div className="relative flex flex-col items-center justify-center text-center">
                      <div className="text-lg font-bold">Ready to see the difference?</div>
                      <div className="text-sm opacity-80">chrisleebergstrom@gmail.com</div>
                    </div>
                  </a>
                  <p className="text-sm text-molten/70">
                    Let's discuss your operational challenges
                  </p>
                </div>
              </div>
            </section>
          </SectionTracker>
        </div>
      </main>
    </>
  );
}
