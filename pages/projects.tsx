import Head from 'next/head';
import Header from '../components/Header';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - CLB Consultancy</title>
        <meta name="description" content="View Chris Lee Bergstrom's portfolio and project work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      
      <Header />
      
      <main className="min-h-screen bg-black text-white pt-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-heading mb-4 glow-subtle">Current Projects</h1>
            <p className="text-xl text-molten font-bold">CLB Consulting</p>
          </div>
          
          <div className="grid gap-8 md:gap-12">
            {/* Project 1 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">1.</span>
                <h2 className="text-2xl font-heading glow">AI Consulting Sandbox</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                A Firebase-powered testbed for hospitality strategy. This project analyzes live sales data to uncover patterns, predict demand, and turn operational noise into actionable insight—for restaurants ready to move beyond spreadsheets.
              </p>
            </div>

            {/* Project 2 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">2.</span>
                <h2 className="text-2xl font-heading glow">EVA — Events Virtual Assistant</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                The orchestration core of CLB's AI system. EVA routes client inquiries, manages agent workflows, and coordinates behind-the-scenes logistics for tours, productions, and consulting pipelines. She's the planner that never misses a cue.
              </p>
            </div>

            {/* Project 3 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">3.</span>
                <h2 className="text-2xl font-heading glow">R.Y.D.E.R. — Mental Health AI for Creatives</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                R.Y.D.E.R. (Reminding You: Darkness Eventually Recedes) is a trauma-aware conversational agent built for freelancers and event staff. Anonymous, reflective, and emotionally attuned—this isn't therapy, it's a check-in with soul.
              </p>
            </div>

            {/* Project 4 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">4.</span>
                <h2 className="text-2xl font-heading glow">EVE — Conversational AI for CLB</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                The velvet rope meets sharp strategy. EVE guides visitors through CLB's services, sparks insights, and converts interest into contact. She's part concierge, part co-pilot—and she always sends the curious straight to Chris.
              </p>
            </div>

            {/* Project 5 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">5.</span>
                <h2 className="text-2xl font-heading glow">Byte — Voice-to-Voice Semantic Research Agent</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                Byte is a voice-native AI built for deep file parsing, archival search, and contextual synthesis. Housed in a clean voice interface, Byte speaks with clarity, thinks with nuance, and commands a suite of its own sub-agents to handle complex research.
              </p>
            </div>

            {/* Project 6 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">6.</span>
                <h2 className="text-2xl font-heading glow">Glytch — Retro-Futurist API Assistant</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                Glytch lives inside a vintage iMac and channels the spirit of TARS from Interstellar. Running on the Assistants API, it's a local, voice-interactive consulting companion—designed for creative ideation, irreverent insights, and unexpected brilliance.
              </p>
            </div>

            {/* Project 7 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">7.</span>
                <h2 className="text-2xl font-heading glow">Multi-Agent Intelligence Lab</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                The CLB skunkworks. Here, we develop federated agent architectures, experiment with cross-agent communication, and prototype consulting flows that can adapt in real time. This is where the future of interface meets the reality of execution.
              </p>
            </div>

            {/* Project 8 */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-molten/30 p-8 hover:border-molten/60 transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-molten text-2xl font-bold">8.</span>
                <h2 className="text-2xl font-heading glow">JAMES — Core Memory & Strategic AI Backbone</h2>
              </div>
              <p className="text-base leading-relaxed opacity-90 ml-8">
                JAMES is the cognitive substrate behind it all. Long-term memory, real-time synthesis, and multi-agent orchestration—all designed to align with Chris's evolving strategy. He remembers everything, challenges assumptions, and ensures that CLB isn't just smart—it's alive.
              </p>
            </div>
          </div>
          
          <div className="text-center py-12 mt-16">
            <p className="text-lg opacity-70 italic">Strategy Born from the Wreckage, Intelligence Forged in the Fire</p>
          </div>
        </div>
      </main>
    </>
  );
}