import Head from 'next/head';
import { useEffect } from 'react';
import Marquee from '../components/Marquee';
import Ethos from '../components/Ethos';
import Contact from '../components/Contact';

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <>
      <Head>
        <title>CLB Consultancy - AI-Powered Solutions</title>
        <meta name="description" content="AI-focused consultancy providing intelligent solutions and development services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <main className="min-h-screen bg-black text-white">
        <Marquee />
        <section className="pt-16 pb-8 px-6 text-center">
          <h2 className="text-4xl font-heading mb-4 bg-gradient-to-r from-white via-molten to-white bg-clip-text text-transparent">
            AI-Powered Consultancy
          </h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto leading-relaxed">
            <span className="text-molten font-bold">Ask EVE anything</span> about AI strategy, development, or consulting. 
            Get instant expert insights tailored to your project needs.
          </p>
        </section>
        <Ethos />
        <Contact />
      </main>
    </>
  );
}