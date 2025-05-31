import Head from 'next/head';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Head>
        <title>About Chris - CLB Consultancy</title>
        <meta name="description" content="Learn about Chris Lee Bergstrom's background and experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading mb-8 text-center">About Chris</h1>
          <div className="min-h-96 flex items-center justify-center">
            <p className="text-xl opacity-70">Content coming soon...</p>
          </div>
        </div>
      </main>
    </>
  );
}