import React, { useState } from 'react';
import { PEDAGOGICAL_REASONING } from '../data/curriculumData';
import { Brain, Sparkles, CheckCircle, Compass, Target, BookOpen, ChevronRight } from 'lucide-react';

export const ReasoningView: React.FC = () => {
  const [activeFase, setActiveFase] = useState<'all' | '1' | '2' | '3' | '4'>('all');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-700/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4 font-mono">
            <Brain className="h-4 w-4" />
            <span>&lt;razonamiento_pedagogico&gt; • ZERO-SHOT CHAIN OF THOUGHT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Fundamentación Curricular y Metodológica SENA - DUA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Desglose analítico riguroso del modelo de Formación Profesional Integral (FPI), la articulación de las redes neurocognitivas del Diseño Universal para el Aprendizaje en ambientes rurales y agrícolas, la progresión trilingüe técnica (Español, Inglés y Francés) y la estructura GFPI-F-135.
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/80">
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
              <span className="text-[11px] text-slate-400 block font-medium">Modelo Pedagógico</span>
              <span className="text-sm font-bold text-emerald-400">FPI SENA (Saber / Hacer / Ser)</span>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
              <span className="text-[11px] text-slate-400 block font-medium">Marco Inclusivo</span>
              <span className="text-sm font-bold text-purple-400">DUA / UDL (3 Redes / 9 Pautas)</span>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
              <span className="text-[11px] text-slate-400 block font-medium">Estrategia Lingüística</span>
              <span className="text-sm font-bold text-sky-400">Trilingüismo (ES / EN / FR)</span>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700">
              <span className="text-[11px] text-slate-400 block font-medium">Formato Oficial</span>
              <span className="text-sm font-bold text-amber-400">GFPI-F-135 (4 Fases)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Phases */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Filtrar Fase:</span>
        <button
          onClick={() => setActiveFase('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFase === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Ver Todas (1 a 4)
        </button>
        <button
          onClick={() => setActiveFase('1')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFase === '1'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          1. Curricular Agropecuario
        </button>
        <button
          onClick={() => setActiveFase('2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFase === '2'
              ? 'bg-purple-700 text-white shadow-sm'
              : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
          }`}
        >
          2. Articulación DUA
        </button>
        <button
          onClick={() => setActiveFase('3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFase === '3'
              ? 'bg-sky-700 text-white shadow-sm'
              : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
          }`}
        >
          3. Lingüística Trilingüe
        </button>
        <button
          onClick={() => setActiveFase('4')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeFase === '4'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          4. Estructura GFPI
        </button>
      </div>

      {/* Phase 1: Análisis Curricular Agropecuario */}
      {(activeFase === 'all' || activeFase === '1') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-emerald-50/70 border-b border-emerald-100 p-5 sm:p-6 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <Target className="h-4 w-4 text-emerald-600" />
                <span>Fase 1 • Modelo Pedagógico Institucional (FPI)</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {PEDAGOGICAL_REASONING.fase1.titulo}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {PEDAGOGICAL_REASONING.fase1.subtitulo}
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
              Sector Agropecuario
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {PEDAGOGICAL_REASONING.fase1.detalles.map((item, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-6 w-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    {item.aspecto}
                  </h4>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed pl-8">
                  {item.analisis}
                </p>
              </div>
            ))}

            {/* Triad Breakdown Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <h5 className="font-bold text-emerald-900 text-sm mb-1">Saber (Cognitivo)</h5>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Fisiología vegetal, toxicología de plaguicidas, cálculo estequiométrico de dosis y límites de residuos (LMR).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
                <h5 className="font-bold text-sky-900 text-sm mb-1">Saber Hacer (Procedimental)</h5>
                <p className="text-xs text-sky-800 leading-relaxed">
                  Monitoreo fitosanitario en campo, calibración de aspersores, elaboración de bioinsumos y bitácora de trazabilidad.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h5 className="font-bold text-amber-900 text-sm mb-1">Saber Ser (Actitudinal)</h5>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Ética de inocuidad alimentaria, protección integral del operario campesino y conservación de fuentes hídricas.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Phase 2: Articulación DUA/UDL */}
      {(activeFase === 'all' || activeFase === '2') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-purple-50/70 border-b border-purple-100 p-5 sm:p-6 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase tracking-wider mb-1">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>Fase 2 • Neurociencia del Aprendizaje Aplicada a Campo</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {PEDAGOGICAL_REASONING.fase2.titulo}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {PEDAGOGICAL_REASONING.fase2.subtitulo}
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full border border-purple-200">
              CAST DUA 2026
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {PEDAGOGICAL_REASONING.fase2.detalles.map((item, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80">
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-white text-sm shadow-sm ${
                    idx === 0 ? 'bg-emerald-600' : idx === 1 ? 'bg-purple-600' : 'bg-sky-600'
                  }`}>
                    {idx === 0 ? 'I' : idx === 1 ? 'II' : 'III'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-base mb-1">
                      {item.red}
                    </h4>
                    <div className="inline-block bg-white text-xs font-mono text-slate-600 px-2.5 py-1 rounded border border-slate-200 mb-2">
                      {item.pautas}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mt-2 bg-white/60 p-3 rounded-lg border border-slate-200/60">
                      <strong className="text-slate-900">Aplicación Práctica en Campo: </strong>
                      {item.aplicacionAgro}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Phase 3: Estrategia Lingüística Integrada */}
      {(activeFase === 'all' || activeFase === '3') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-sky-50/70 border-b border-sky-100 p-5 sm:p-6 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
                <Compass className="h-4 w-4 text-sky-600" />
                <span>Fase 3 • Agroexportación y Normatividad Internacional</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {PEDAGOGICAL_REASONING.fase3.titulo}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {PEDAGOGICAL_REASONING.fase3.subtitulo}
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-sky-100 text-sky-800 text-xs font-semibold rounded-full border border-sky-200">
              Español • Inglés • Francés
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {PEDAGOGICAL_REASONING.fase3.detalles.map((item, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.nivel}
                  </h4>
                  <span className="text-[11px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">
                    Escalón {idx + 1}
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Phase 4: Estructura GFPI del SENA */}
      {(activeFase === 'all' || activeFase === '4') && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-amber-50/70 border-b border-amber-100 p-5 sm:p-6 flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <BookOpen className="h-4 w-4 text-amber-600" />
                <span>Fase 4 • Formato Institucional GFPI-F-135</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {PEDAGOGICAL_REASONING.fase4.titulo}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {PEDAGOGICAL_REASONING.fase4.subtitulo}
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
              Secuencia Didáctica FPI
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {PEDAGOGICAL_REASONING.fase4.detalles.map((item, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-base">
                    {item.seccion}
                  </h4>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed pl-7">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
