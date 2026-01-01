
export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="space-y-4">
          <a 
            href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Let's Build Something Amazing"
            className="group block relative overflow-hidden py-4 px-8 bg-transparent font-bold rounded-lg border border-molten hover:border-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            style={{color: '#F5F5DC'}}
          >
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className="text-lg font-bold" style={{color: '#F5F5DC'}}>Ready to go?</div>
              <div className="text-sm opacity-80" style={{color: '#F5F5DC'}}>chrisleebergstrom@gmail.com</div>
            </div>
          </a>
          <p className="text-sm" style={{color: '#F5F5DC', opacity: 0.7}}>
            Or chat with EVE for instant insights
          </p>
        </div>
      </div>
    </section>
  );
}