import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 text-center">
      <h2 className="text-3xl font-heading mb-6">Ready to Transform Your Project?</h2>
      <div className="max-w-lg mx-auto space-y-6">
        <p className="text-lg text-gray-300">
          Let's discuss how AI can accelerate your goals
        </p>
        <div className="space-y-4">
          <motion.a 
            href="mailto:chrisleebergstrom@gmail.com?subject=AI Project Inquiry - Let's Build Something Amazing"
            className="group block relative overflow-hidden py-4 px-8 bg-gradient-to-r from-molten to-molten/80 text-black font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <span className="text-2xl">🚀</span>
              <div className="text-left">
                <div className="text-lg font-bold">Start Your AI Project</div>
                <div className="text-sm opacity-80">chrisleebergstrom@gmail.com</div>
              </div>
            </div>
          </motion.a>
          <p className="text-sm text-molten/70 flex items-center justify-center space-x-2">
            <span>⚡</span>
            <span>Or chat with EVE above for instant insights</span>
            <span>⚡</span>
          </p>
        </div>
      </div>
    </section>
  );
}