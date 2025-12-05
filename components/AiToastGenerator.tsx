import React, { useState } from 'react';
import { generateWeddingWish } from '../services/geminiService';
import { Loader2, Sparkles, Send } from 'lucide-react';

export const AiToastGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [style, setStyle] = useState<'heartfelt' | 'funny' | 'poetic'>('heartfelt');
  const [generatedWish, setGeneratedWish] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name || !relationship) return;
    setLoading(true);
    const wish = await generateWeddingWish(name, relationship, style);
    setGeneratedWish(wish);
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 border border-paper-border shadow-sm max-w-2xl mx-auto my-12 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-paper-border opacity-20"></div>
        
        <div className="text-center mb-6">
            <h3 className="font-headline text-2xl font-bold mb-2">Need Help with a Wish?</h3>
            <p className="font-body text-gray-600 italic">Let our AI Scribe draft a perfect note for the guestbook.</p>
        </div>

        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-b border-gray-300 p-2 focus:outline-none focus:border-accent bg-transparent font-body"
                />
                <input
                    type="text"
                    placeholder="Relationship (e.g., Groom's Brother)"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="border-b border-gray-300 p-2 focus:outline-none focus:border-accent bg-transparent font-body"
                />
            </div>

            <div className="flex justify-center space-x-4 py-2">
                {(['heartfelt', 'funny', 'poetic'] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-4 py-1 rounded-full text-sm font-body transition-colors ${
                            style === s ? 'bg-accent text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            <button
                onClick={handleGenerate}
                disabled={loading || !name || !relationship}
                className="w-full bg-ink text-white font-headline uppercase tracking-widest py-3 hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                Generate Wish
            </button>
        </div>

        {generatedWish && (
            <div className="mt-8 p-6 bg-paper border border-dashed border-gray-400 relative">
                <div className="font-script text-3xl text-gray-800 text-center mb-2">"</div>
                <p className="font-headline italic text-lg text-center leading-relaxed">
                    {generatedWish}
                </p>
                <div className="font-script text-3xl text-gray-800 text-center mt-2">"</div>
                
                <div className="mt-4 text-center">
                    <button className="text-xs font-bold uppercase tracking-widest text-accent hover:underline flex items-center justify-center gap-1 mx-auto">
                        <Send className="w-3 h-3" />
                        Add to Guestbook
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};