import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { NewspaperHeader } from './components/NewspaperHeader';
import { Countdown } from './components/Countdown';
import { AiToastGenerator } from './components/AiToastGenerator';
import { MapPin, Calendar, Heart, ArrowDown } from 'lucide-react';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const scrollRef = useRef(null);

  // Mock data for images - using high quality picsum/unsplash styling
  const coverImage = "https://image2url.com/images/1764944454983-7626361b-29ea-4831-a350-f22f3ee2c9e5.png"; 
  const coupleImage = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1770&auto=format&fit=crop"; // Paris Vibe

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Smooth scroll after unlock animation completes
    setTimeout(() => {
        const element = document.getElementById('main-content');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-paper bg-texture overflow-x-hidden selection:bg-accent selection:text-white">
      
      {/* --- COVER PAGE (Lock Screen) --- */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 bg-paper flex flex-col items-center justify-center p-4"
          >
            <div className="w-full max-w-md border-t border-b border-black py-2 mb-8">
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-body">
                    <span>Special Edition</span>
                    <span>Aug 01, 2026</span>
                </div>
            </div>

            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full max-w-lg aspect-[3/4] overflow-hidden border-4 border-double border-ink mb-8 shadow-2xl"
            >
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-8 left-0 right-0 text-center z-20 text-white">
                     <h2 className="font-headline italic text-4xl md:text-5xl px-4 drop-shadow-md">
                        They are tying the knot!
                     </h2>
                </div>
            </motion.div>

            <button 
                onClick={handleUnlock}
                className="group relative px-8 py-4 bg-ink text-white font-headline uppercase tracking-widest text-sm hover:bg-accent transition-colors duration-300"
            >
                Unlock the Story
                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-ink group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN NEWSPAPER CONTENT --- */}
      <motion.div 
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isUnlocked ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-4xl mx-auto min-h-screen pb-20 pt-8 px-4 md:px-8 border-l border-r border-gray-200/50 bg-white shadow-xl"
      >
        <NewspaperHeader />

        {/* --- SAVE THE DATE SECTION --- */}
        <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Headline & Image */}
                <div className="lg:col-span-8">
                    <div className="relative border-2 border-ink p-1 mb-4">
                         <img src={coupleImage} alt="Couple in Paris" className="w-full aspect-[4/5] object-cover grayscale-[30%] contrast-125" />
                         <div className="absolute top-4 left-4 bg-white px-3 py-1 border border-black">
                            <span className="font-body text-xs uppercase tracking-widest font-bold">Paris, France</span>
                         </div>
                    </div>
                    <div className="text-center lg:text-left">
                         <p className="font-body text-xs uppercase tracking-widest mb-2 text-gray-500">Photographed by The Observer</p>
                    </div>
                </div>

                {/* Right Column: Text & Details */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <h2 className="font-script text-7xl md:text-8xl text-center lg:text-left text-ink mb-2 leading-none">
                        Save <br/>
                        <span className="pl-8">The</span> <br/>
                        <span className="pl-16">Date</span>
                    </h2>
                    
                    <div className="my-8 text-center lg:text-left space-y-2">
                        <div className="font-headline text-3xl font-bold">Stephanie & Harry</div>
                        <div className="w-16 h-[2px] bg-accent mx-auto lg:mx-0"></div>
                        <p className="font-body text-sm text-gray-600 italic">"I'll choose you, always and forever."</p>
                    </div>

                    <div className="bg-paper p-6 border border-paper-border text-center">
                        <h3 className="font-headline font-bold text-xl uppercase mb-4">The Details</h3>
                        <div className="flex flex-col gap-4 text-sm font-body">
                            <div className="flex items-center gap-3 justify-center">
                                <Calendar className="w-4 h-4 text-accent" />
                                <span>August 1st, 2026</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center">
                                <MapPin className="w-4 h-4 text-accent" />
                                <span>The Peninsula, Hong Kong</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Countdown Strip */}
            <Countdown targetDate="2026-08-01T00:00:00" />
        </section>

        {/* --- ARTICLE / STORY SECTION --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b-2 border-black pb-12">
            <div className="md:col-span-2 space-y-4 font-headline text-justify leading-relaxed text-gray-800">
                <h3 className="font-script text-4xl md:text-5xl mb-6 text-ink">A Love Story for the Ages</h3>
                <p>
                    <span className="float-left text-6xl font-classic pr-2 leading-[0.8]">I</span>t started with a chance encounter on the busy streets of Central. Two coffees, one spilled, and a thousand apologies later, Stephanie and Harry found themselves laughing over napkins and stained shirts.
                </p>
                <p>
                    From the neon lights of Mong Kok to the sunset views at the Peak, their journey has been nothing short of cinematic. Now, as they embark on their greatest adventure yet, they invite you to be part of their special day.
                </p>
                <p>
                    "We wanted our wedding to feel like a timeless memory," says Stephanie. "A moment paused in time where everyone we love is together."
                </p>
            </div>
            <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-gray-300 pt-8 md:pt-0 md:pl-8 flex flex-col items-center justify-center">
                <div className="w-full aspect-square bg-gray-100 mb-4 overflow-hidden relative group cursor-pointer">
                    <img src="https://picsum.photos/id/338/600/600" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"/>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                         <span className="text-white font-body text-xs uppercase tracking-widest border border-white px-2 py-1">View Gallery</span>
                    </div>
                </div>
                <p className="font-body text-xs text-center text-gray-500 italic">Moments from their engagement shoot.</p>
            </div>
        </section>

        {/* --- AI INTERACTIVE FEATURE --- */}
        <section className="mb-16">
            <div className="flex items-center gap-4 mb-6">
                 <div className="h-[1px] bg-black flex-1"></div>
                 <h2 className="font-classic text-2xl md:text-3xl text-center uppercase">Guestbook Corner</h2>
                 <div className="h-[1px] bg-black flex-1"></div>
            </div>
            <AiToastGenerator />
        </section>

        {/* --- RSVP FORM --- */}
        <section className="max-w-xl mx-auto bg-paper p-8 border border-double border-4 border-paper-border mb-12">
            <div className="text-center mb-8">
                <h2 className="font-script text-5xl mb-2 text-ink">R.S.V.P.</h2>
                <p className="font-body text-sm uppercase tracking-widest text-gray-500">Kindly respond by June 1st, 2026</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block font-headline font-bold text-sm uppercase mb-2">Full Name</label>
                    <input type="text" className="w-full bg-white border-b border-gray-400 p-3 focus:outline-none focus:border-accent font-body transition-colors" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-headline font-bold text-sm uppercase mb-2">Attending?</label>
                        <select className="w-full bg-white border-b border-gray-400 p-3 focus:outline-none focus:border-accent font-body">
                            <option>Delighted to accept</option>
                            <option>Regretfully decline</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-headline font-bold text-sm uppercase mb-2">Guests</label>
                        <select className="w-full bg-white border-b border-gray-400 p-3 focus:outline-none focus:border-accent font-body">
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block font-headline font-bold text-sm uppercase mb-2">Dietary Requirements</label>
                    <input type="text" className="w-full bg-white border-b border-gray-400 p-3 focus:outline-none focus:border-accent font-body" placeholder="Any allergies?" />
                </div>

                <button className="w-full bg-accent text-white py-4 font-headline uppercase tracking-[0.2em] hover:bg-red-900 transition-colors mt-4">
                    Send Response
                </button>
            </form>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center pt-8 border-t border-gray-300">
            <Heart className="w-5 h-5 mx-auto text-accent mb-4 animate-pulse" />
            <h4 className="font-script text-3xl mb-2">Stephanie & Harry</h4>
            <p className="font-body text-xs text-gray-400 uppercase tracking-widest">Est. 2026</p>
        </footer>

      </motion.div>
    </div>
  );
}

export default App;