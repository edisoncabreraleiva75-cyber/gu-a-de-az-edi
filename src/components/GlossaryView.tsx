import React, { useState } from 'react';
import { MultilingualTerm, MULTILINGUAL_GLOSSARY_PRESET } from '../data/curriculumData';
import { 
  Globe2, 
  Volume2, 
  Search, 
  Filter, 
  Check, 
  Copy, 
  BookOpen, 
  Plus, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Download, 
  Trash2,
  X,
  Gauge
} from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [terms, setTerms] = useState<MultilingualTerm[]>(MULTILINGUAL_GLOSSARY_PRESET);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [playingTerm, setPlayingTerm] = useState<string | null>(null);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New term form state
  const [newTerm, setNewTerm] = useState<Omit<MultilingualTerm, 'id'>>({
    category: 'Certificación',
    spanish: { term: '', definition: '' },
    english: { term: '', phonetic: '', definition: '' },
    french: { term: '', phonetic: '', definition: '' },
    agroContext: ''
  });

  const categories = ['all', 'Certificación', 'Fitosanitario', 'Poscosecha', 'Agroecología', 'Comercio Exterior'];

  const filteredTerms = terms.filter((term) => {
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
      utterance.rate = speechRate;
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

  const copyAllMarkdown = () => {
    const content = filteredTerms.map(t => 
      `### ${t.spanish.term} / ${t.english.term} / ${t.french.term}\n- **Categoría:** ${t.category}\n- **ES:** ${t.spanish.definition}\n- **EN:** *${t.english.term}* (${t.english.phonetic}) — ${t.english.definition}\n- **FR:** *${t.french.term}* (${t.french.phonetic}) — ${t.french.definition}\n- **Contexto:** ${t.agroContext}\n`
    ).join('\n---\n\n');
    navigator.clipboard.writeText(content);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(terms, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'glosario_agropecuario_sena_es_en_fr.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.spanish.term || !newTerm.english.term || !newTerm.french.term) return;

    const created: MultilingualTerm = {
      ...newTerm,
      id: `term-${Date.now()}`
    };

    setTerms(prev => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewTerm({
      category: 'Certificación',
      spanish: { term: '', definition: '' },
      english: { term: '', phonetic: '', definition: '' },
      french: { term: '', phonetic: '', definition: '' },
      agroContext: ''
    });
  };

  const handleDeleteTerm = (id: string) => {
    setTerms(prev => prev.filter(t => t.id !== id));
  };

  // Flashcard navigation
  const currentCard = filteredTerms[flashcardIndex] || filteredTerms[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % filteredTerms.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + filteredTerms.length) % filteredTerms.length);
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

        {/* Global actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl text-xs font-medium text-white shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#39A900] text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'flashcard' ? 'bg-[#39A900] text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Flashcards
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Término</span>
          </button>

          <button
            onClick={copyAllMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer"
            title="Copiar todos los términos filtrados en Markdown"
          >
            {copiedAll ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">{copiedAll ? 'Copiado' : 'Copiar Todo'}</span>
          </button>

          <button
            onClick={downloadJson}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
            title="Descargar glosario en JSON"
          >
            <Download className="h-4 w-4" />
          </button>
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
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Categories & Audio speed */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Categoría:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setFlashcardIndex(0);
              }}
              className={`px-2.5 py-1 rounded-md font-medium capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}

          {/* Speed toggle */}
          <button
            onClick={() => setSpeechRate(r => r === 0.9 ? 0.7 : 0.9)}
            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200 cursor-pointer"
            title="Ajustar velocidad de pronunciación"
          >
            <Gauge className="h-3 w-3" />
            <span>Voz: {speechRate === 0.9 ? 'Normal (0.9x)' : 'Lenta (0.7x)'}</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE: FLASHCARDS */}
      {viewMode === 'flashcard' && currentCard && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col items-center justify-center min-h-[420px] text-center space-y-6">
          <div className="flex items-center justify-between w-full max-w-lg text-xs text-slate-400 font-mono">
            <span>Tarjeta {flashcardIndex + 1} de {filteredTerms.length}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              {currentCard.category}
            </span>
          </div>

          <div 
            onClick={() => setIsFlipped(f => !f)}
            className="w-full max-w-lg p-8 rounded-2xl border-2 border-dashed border-emerald-400 bg-gradient-to-br from-emerald-50/50 to-sky-50/50 hover:bg-emerald-50 transition-all cursor-pointer min-h-[220px] flex flex-col justify-center items-center relative group"
          >
            <div className="absolute top-3 right-3 text-slate-400 group-hover:text-emerald-700 flex items-center gap-1 text-[11px] font-medium">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Voltear</span>
            </div>

            {!isFlipped ? (
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">Español</span>
                <h3 className="text-2xl font-black text-slate-900">{currentCard.spanish.term}</h3>
                <p className="text-sm text-slate-600 max-w-md">{currentCard.spanish.definition}</p>
                <div className="pt-2 text-xs text-slate-400 italic">Haga clic para ver equivalentes en Inglés y Francés</div>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                <div className="p-3 rounded-xl bg-white/90 border border-sky-200 shadow-sm text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-sky-800 uppercase font-mono">Inglés (EN)</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakTerm(currentCard.english.term, 'en-US', currentCard.id);
                      }}
                      className="text-sky-700 hover:text-sky-900 p-1"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{currentCard.english.term}</h4>
                  <span className="text-xs font-mono text-slate-400 block mb-1">{currentCard.english.phonetic}</span>
                  <p className="text-xs text-slate-600">{currentCard.english.definition}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/90 border border-purple-200 shadow-sm text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-800 uppercase font-mono">Francés (FR)</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakTerm(currentCard.french.term, 'fr-FR', currentCard.id);
                      }}
                      className="text-purple-700 hover:text-purple-900 p-1"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{currentCard.french.term}</h4>
                  <span className="text-xs font-mono text-slate-400 block mb-1">{currentCard.french.phonetic}</span>
                  <p className="text-xs text-slate-600">{currentCard.french.definition}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Anterior</span>
            </button>
            <button
              onClick={() => setIsFlipped(f => !f)}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <RotateCw className="h-4 w-4" />
              <span>{isFlipped ? 'Ver Español' : 'Voltear Tarjeta'}</span>
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <span>Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE: GRID / CATALOG */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Category & Actions */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                    {term.category}
                  </span>
                  <div className="flex items-center gap-1">
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
                    {terms.length > 3 && (
                      <button
                        onClick={() => handleDeleteTerm(term.id)}
                        className="text-slate-300 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                        title="Eliminar término"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
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
      )}

      {/* Modal: Add New Term */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-emerald-600" />
                <span>Agregar Nuevo Término Técnico Trilingüe</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTerm} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Categoría</label>
                <select
                  value={newTerm.category}
                  onChange={(e) => setNewTerm(p => ({ ...p, category: e.target.value as any }))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <option value="Certificación">Certificación</option>
                  <option value="Fitosanitario">Fitosanitario</option>
                  <option value="Poscosecha">Poscosecha</option>
                  <option value="Agroecología">Agroecología</option>
                  <option value="Comercio Exterior">Comercio Exterior</option>
                </select>
              </div>

              {/* Spanish */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block text-xs">Término en Español</span>
                <input
                  type="text"
                  placeholder="Ej. Buenas Prácticas Agrícolas (BPA)"
                  required
                  value={newTerm.spanish.term}
                  onChange={(e) => setNewTerm(p => ({ ...p, spanish: { ...p.spanish, term: e.target.value } }))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
                <textarea
                  rows={2}
                  placeholder="Definición técnica en español..."
                  required
                  value={newTerm.spanish.definition}
                  onChange={(e) => setNewTerm(p => ({ ...p, spanish: { ...p.spanish, definition: e.target.value } }))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              {/* English */}
              <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100 space-y-2">
                <span className="font-bold text-sky-900 block text-xs">Equivalente en Inglés (EN)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Term (e.g. Good Agricultural Practices)"
                    required
                    value={newTerm.english.term}
                    onChange={(e) => setNewTerm(p => ({ ...p, english: { ...p.english, term: e.target.value } }))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Phonetics (e.g. /ɡʊd ˌæɡrɪˈkʌltʃərəl/)"
                    value={newTerm.english.phonetic}
                    onChange={(e) => setNewTerm(p => ({ ...p, english: { ...p.english, phonetic: e.target.value } }))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="English technical definition..."
                  value={newTerm.english.definition}
                  onChange={(e) => setNewTerm(p => ({ ...p, english: { ...p.english, definition: e.target.value } }))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              {/* French */}
              <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100 space-y-2">
                <span className="font-bold text-purple-900 block text-xs">Equivalente en Francés (FR)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Terme (ex. Bonnes Pratiques Agricoles)"
                    required
                    value={newTerm.french.term}
                    onChange={(e) => setNewTerm(p => ({ ...p, french: { ...p.french, term: e.target.value } }))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Phonétique (ex. /bɔn pʁa.tik/)"
                    value={newTerm.french.phonetic}
                    onChange={(e) => setNewTerm(p => ({ ...p, french: { ...p.french, phonetic: e.target.value } }))}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Définition technique en français..."
                  value={newTerm.french.definition}
                  onChange={(e) => setNewTerm(p => ({ ...p, french: { ...p.french, definition: e.target.value } }))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              {/* Agro Context */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contexto Agroexportador / Normativa</label>
                <input
                  type="text"
                  placeholder="Ej. Requisito de la norma GlobalG.A.P. v6 o NOP"
                  value={newTerm.agroContext}
                  onChange={(e) => setNewTerm(p => ({ ...p, agroContext: e.target.value }))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Guardar Término
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
