import React, { useState } from 'react';
import { MultilingualTerm, MULTILINGUAL_GLOSSARY_PRESET } from '../data/curriculumData';
import { Globe2, Volume2, Search, Filter, Check, Copy, BookOpen } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [playingTerm, setPlayingTerm] = useState<string | null>(null);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = ['all', 'Certificación', 'Fitosanitario', 'Poscosecha', 'Agroecología', 'Comercio Exterior'];

  const filteredTerms = MULTILINGUAL_GLOSSARY_PRESET.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      term.spanish.term.toLowerCase().includes(search.toLowerCase()) ||
      term.english.term.toLowerCase().includes(search.toLowerCase()) ||
      term.french.term.toLowerCase().includes(search.toLowerCase()) ||
      term.spanish.definition.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const speakTerm = (text: string, lang: 'en-US' | 'fr-FR' | 'es-ES', termId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingTerm(null);
      utterance.onerror = () => setPlayingTerm(null);
      setPlayingTerm(termId + '-' + lang);
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyTermCard = (term: MultilingualTerm) => {
    const text = `Término Técnico Agropecuario:\n• Español: ${term.spanish.term} - ${term.spanish.definition}\n• Inglés: ${term.english.term} (${term.english.phonetic}) - ${term.english.definition}\n• Francés: ${term.french.term} (${term.french.phonetic}) - ${term.french.definition}\n• Contexto: ${term.agroContext}`;
    navigator.clipboard.writeText(text);
    setCopiedTerm(term.id);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200 mb-2">
            <Globe2 className="h-3.5 w-3.5" />
            <span>ESTRATEGIA LINGÜÍSTICA INTEGRADA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Glosario Técnico Trilingüe (Español • Inglés • Francés)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Terminología homologada para el comercio agroexportador, normativas fitosanitarias internacionales (Codex, GlobalG.A.P., EFSA, USDA) y certificación de calidad con pronunciación interactiva.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar término en español, inglés o francés..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Categoría:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Term Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Category & Copy */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {term.category}
                </span>
                <button
                  onClick={() => copyTermCard(term)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Copiar ficha de término"
                >
                  {copiedTerm === term.id ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Spanish Primary */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">
                    {term.spanish.term}
                  </h3>
                  <button
                    onClick={() => speakTerm(term.spanish.term, 'es-ES', term.id)}
                    className="p-1 text-slate-400 hover:text-emerald-600 cursor-pointer"
                    title="Escuchar en Español"
                  >
                    <Volume2 className={`h-4 w-4 ${playingTerm === term.id + '-es-ES' ? 'text-emerald-600 animate-pulse' : ''}`} />
                  </button>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {term.spanish.definition}
                </p>
              </div>

              {/* English */}
              <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 mb-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-sky-800 uppercase font-mono">
                      Inglés (EN)
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {term.english.term}
                    </h4>
                  </div>
                  <button
                    onClick={() => speakTerm(term.english.term, 'en-US', term.id)}
                    className="p-1 text-sky-600 hover:text-sky-800 cursor-pointer"
                    title="Escuchar pronunciación en Inglés"
                  >
                    <Volume2 className={`h-4 w-4 ${playingTerm === term.id + '-en-US' ? 'text-sky-700 animate-pulse' : ''}`} />
                  </button>
                </div>
                <span className="text-[11px] font-mono text-slate-500 block mb-1">
                  {term.english.phonetic}
                </span>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {term.english.definition}
                </p>
              </div>

              {/* French */}
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-purple-800 uppercase font-mono">
                      Francés (FR)
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {term.french.term}
                    </h4>
                  </div>
                  <button
                    onClick={() => speakTerm(term.french.term, 'fr-FR', term.id)}
                    className="p-1 text-purple-600 hover:text-purple-800 cursor-pointer"
                    title="Escuchar pronunciación en Francés"
                  >
                    <Volume2 className={`h-4 w-4 ${playingTerm === term.id + '-fr-FR' ? 'text-purple-700 animate-pulse' : ''}`} />
                  </button>
                </div>
                <span className="text-[11px] font-mono text-slate-500 block mb-1">
                  {term.french.phonetic}
                </span>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {term.french.definition}
                </p>
              </div>
            </div>

            {/* Contexto Agroexportador */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic flex items-start gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{term.agroContext}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
