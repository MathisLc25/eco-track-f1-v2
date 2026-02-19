'use client';
import { useState } from 'react';
import ReactCountryFlag from "react-country-flag";

export default function EcoTrackF1() {
  const [co2, setCo2] = useState<number>(0);

  const departureCity = "Bordeaux (Mérignac)";
  const departureCountryCode = "FR";

  const circuits = [
    { name: "GP Monaco", km: 950, country: "Monaco", code: "MC" },
    { name: "GP Silverstone", km: 850, country: "Royaume-Uni", code: "GB" },
    { name: "GP Monza", km: 1100, country: "Italie", code: "IT" },
    { name: "GP Spa", km: 900, country: "Belgique", code: "BE" },
    { name: "GP Montréal", km: 5700, country: "Canada", code: "CA" },
    { name: "GP Interlagos", km: 9100, country: "Brésil", code: "BR" },
    { name: "GP Suzuka", km: 10200, country: "Japon", code: "JP" },
    { name: "GP Melbourne", km: 17200, country: "Australie", code: "AU" },
  ];

  const calculate = (dist: number) => setCo2(dist * 0.15);

  const getImpactLabel = () => {
    if (co2 > 500) return { text: "Impact Élevé", icon: "▲" };
    if (co2 === 0) return { text: "Sélectionnez un circuit", icon: "●" };
    return { text: "Impact Modéré", icon: "✓" };
  };

  const impact = getImpactLabel();

  return (
    <main className="grid grid-cols-3 min-h-screen p-10 bg-white text-black font-sans">
      
      <section className="col-span-2 pr-10 border-r-2 border-gray-100">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold italic uppercase tracking-tighter">
            ECO-TRACK F1
          </h1>

          <p className="text-gray-500 mt-2 flex items-center gap-2">
            Estimation depuis
            <span className="font-bold text-black border-b-2 border-red-600 flex items-center gap-2">
              {departureCity}
              <ReactCountryFlag
                countryCode={departureCountryCode}
                svg
                style={{ width: "1.4em", height: "1.4em" }}
              />
            </span>
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {circuits.map((c) => (
            <button 
              key={c.name}
              onClick={() => calculate(c.km)}
              className="flex justify-between items-center p-5 bg-gray-50 hover:bg-red-50 border-2 border-transparent focus:border-red-600 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <ReactCountryFlag
                  countryCode={c.code}
                  svg
                  style={{ width: "2em", height: "2em" }}
                />
                <div className="text-left">
                  <span className="block text-lg font-medium group-hover:text-red-600">
                    {c.name}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {c.country}
                  </span>
                </div>
              </div>
              <span className="text-gray-300 font-mono text-sm">
                {c.km} km
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="col-span-1 pl-10 flex flex-col justify-center bg-gray-50/30">
        <div className="sticky top-10" aria-live="polite">
          <h2 className="text-red-600 font-bold uppercase text-xs tracking-widest mb-2">
            Impact Estimé
          </h2>

          <div className="text-8xl font-black leading-none my-4 tracking-tighter">
            {co2.toFixed(0)}
            <span className="text-2xl ml-2 text-gray-400">kg</span>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
              co2 > 500
                ? "bg-red-100 text-red-700"
                : co2 === 0
                ? "bg-gray-100 text-gray-500"
                : "bg-green-100 text-green-700"
            }`}
          >
            <span>{impact.icon}</span>
            {impact.text}
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full mt-6 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                co2 > 500
                  ? "bg-red-500 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.2)_0,rgba(0,0,0,0.2)_5px,transparent_5px,transparent_10px)]"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min((co2 / 3000) * 100, 100)}%` }}
            />
          </div>

          {co2 > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              Équivalent à {(co2 / 10).toFixed(0)} jours d’émissions moyennes
            </p>
          )}
        </div>
      </section>

    </main>
  );
}
