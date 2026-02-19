'use client';
import { useState } from 'react';

export default function EcoTrackF1() {
  const [co2, setCo2] = useState<number>(0);

  // MVP : Développement minimal (données en dur) pour un feedback rapide
  const circuits = [
    { name: "GP Monaco", km: 1000 },
    { name: "GP Silverstone", km: 500 },
    { name: "GP Monza", km: 800 },
  ];

  const calculate = (dist: number) => setCo2(dist * 0.15);

  return (
    <main className="grid grid-cols-3 min-h-screen p-10 bg-white text-black">
      
      {/* ZONE 1 : RÉSULTAT (Coin supérieur gauche - 41% d'attention)  */}
      <section className="col-span-1 border-r-2 border-gray-100 pr-10">
        <h2 className="text-red-600 font-bold uppercase tracking-tighter">Impact Carbone</h2>
        <div className="text-7xl font-black mt-4">{co2} kg</div>
        <p className="text-gray-400 mt-2 text-sm italic">Validation de la structure (Low-fi) [cite: 115]</p>
      </section>

      {/* ZONE 2 : ACTIONS (1 zone = 1 objectif)  */}
      <section className="col-span-2 pl-10">
        <h1 className="text-4xl font-extrabold mb-10 italic">ECO-TRACK F1 v2</h1>
        <div className="flex flex-col gap-4">
          {circuits.map((c) => (
            <button 
              key={c.name}
              onClick={() => calculate(c.km)}
              className="p-5 bg-gray-50 hover:bg-red-50 border-2 border-transparent hover:border-red-600 rounded-xl font-bold transition-all text-left flex justify-between"
            >
              <span>{c.name}</span>
              <span className="text-gray-300 italic">{c.km} km</span>
            </button>
          ))}
        </div>
        <p className="mt-10 text-xs text-gray-400">Importance du feedback et approche itérative [cite: 141]</p>
      </section>

    </main>
  );
}