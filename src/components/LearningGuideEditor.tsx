import React, { useState } from 'react';
import { LearningGuideModel, PRESET_GUIDES } from '../data/curriculumData';
import { 
  FileText, 
  Eye, 
  Edit3, 
  Printer, 
  Sparkles, 
  Building2, 
  BookOpen, 
  CheckCircle, 
  Compass, 
  GraduationCap, 
  Plus, 
  Trash2,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { generateFullMarkdownReport } from '../utils/markdownExporter';

interface LearningGuideEditorProps {
  guide: LearningGuideModel;
  onUpdateGuide: (guide: LearningGuideModel) => void;
  onSelectPreset: (presetId: string) => void;
}

export const LearningGuideEditor: React.FC<LearningGuideEditorProps> = ({
  guide,
  onUpdateGuide,
  onSelectPreset,
}) => {
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyMarkdown = () => {
    const md = generateFullMarkdownReport(guide);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Field change handlers for editing
  const updateField = (path: string[], value: any) => {
    const updated = JSON.parse(JSON.stringify(guide));
    let cur = updated;
    for (let i = 0; i < path.length - 1; i++) {
      cur = cur[path[i]];
    }
    cur[path[path.length - 1]] = value;
    onUpdateGuide(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold bg-[#39A900]/15 text-[#39A900] px-2.5 py-0.5 rounded-md border border-[#39A900]/30">
              FORMATO OFICIAL GFPI-F-135
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Procedimiento Desarrollo Curricular
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Plantilla Operativa de Guía de Aprendizaje</span>
          </h2>
        </div>

        {/* Preset Selector and View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => onSelectPreset('guia-aguacate-bpa')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                guide.id === 'guia-aguacate-bpa'
                  ? 'bg-white text-emerald-800 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🥑 Aguacate Hass (BPA / GlobalG.A.P.)
            </button>
            <button
              onClick={() => onSelectPreset('guia-cafe-especial')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                guide.id === 'guia-cafe-especial'
                  ? 'bg-white text-amber-800 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ☕ Café Especial (SCA / Fermentación)
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl text-xs font-medium text-white">
            <button
              onClick={() => setViewMode('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-[#39A900] text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Vista Oficial SENA</span>
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'editor'
                  ? 'bg-[#39A900] text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Editor de Campos</span>
            </button>
          </div>

          {/* Quick Copy / Print */}
          <button
            onClick={handleCopyMarkdown}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
            title="Copiar guía completa en Markdown"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
            title="Imprimir documento oficial SENA"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* VIEW MODE: PREVIEW (OFFICIAL SENA DOCUMENT FORMAT) */}
      {viewMode === 'preview' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none">
          {/* Institutional Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 border-b-4 border-[#39A900]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-2xl bg-white p-2.5 shadow-md flex items-center justify-center shrink-0">
                  <div className="text-center">
                    <span className="text-[#39A900] font-black text-xl block leading-tight tracking-tighter">
                      SENA
                    </span>
                    <span className="text-[9px] text-slate-600 font-bold block uppercase tracking-wider">
                      FPI Agro
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    Servicio Nacional de Aprendizaje • SENA
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    GUÍA DE APRENDIZAJE GFPI-F-135
                  </h1>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    Modelo de Formación Profesional Integral • Enfoque DUA & Trilingüismo
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-300 font-mono space-y-1 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <div><strong>Regional:</strong> {guide.identificacion.regional}</div>
                <div><strong>Centro:</strong> {guide.identificacion.centroFormacion}</div>
                <div><strong>Duración:</strong> {guide.identificacion.duracionGuiaHoras} Horas</div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8 text-slate-800 text-sm leading-relaxed">
            {/* 1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-[#39A900] pb-2">
                <Building2 className="h-5 w-5 text-[#39A900]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  1. Identificación de la Guía de Aprendizaje
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Programa de Formación</span>
                  <span className="font-semibold text-slate-900">{guide.identificacion.denominacionPrograma}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Código del Programa</span>
                  <span className="font-mono font-semibold text-slate-900">{guide.identificacion.codigoPrograma}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 md:col-span-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Nombre del Proyecto Formativo</span>
                  <span className="font-semibold text-slate-900">{guide.identificacion.nombreProyecto}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Fase del Proyecto</span>
                  <span className="text-slate-800">{guide.identificacion.faseProyecto}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Actividad de Proyecto</span>
                  <span className="text-slate-800">{guide.identificacion.actividadProyecto}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 md:col-span-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Competencia Rector</span>
                  <span className="font-bold text-emerald-800">{guide.identificacion.competencia}</span>
                </div>
              </div>

              {/* RAPs */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  Resultados de Aprendizaje a Alcanzar (RAPs)
                </span>
                <ul className="space-y-1.5 pl-2 text-xs sm:text-sm text-slate-800">
                  {guide.identificacion.resultadosAprendizaje.map((rap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-emerald-700 shrink-0">[{i + 1}]</span>
                      <span>{rap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 2. PRESENTACIÓN */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-[#39A900] pb-2">
                <BookOpen className="h-5 w-5 text-[#39A900]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  2. Presentación
                </h2>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
                {guide.presentacion}
              </div>
            </section>

            {/* 3. FORMULACIÓN DE ACTIVIDADES DE APRENDIZAJE */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b-2 border-[#39A900] pb-2">
                <Compass className="h-5 w-5 text-[#39A900]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  3. Formulación de las Actividades de Aprendizaje
                </h2>
              </div>

              {/* 3.1 Reflexión Inicial */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-emerald-900 text-white p-3.5 flex items-center justify-between">
                  <h3 className="font-bold text-sm">
                    {guide.actividades.reflexionInicial.titulo}
                  </h3>
                  <span className="text-[11px] font-mono bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                    Redes Afectivas (DUA I)
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
                  <p className="text-slate-700">
                    {guide.actividades.reflexionInicial.descripcion}
                  </p>
                  <div className="bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-600">
                    <span className="font-bold text-emerald-900 block text-xs uppercase mb-1">
                      Pregunta Problematizadora:
                    </span>
                    <p className="text-slate-800 italic">
                      "{guide.actividades.reflexionInicial.preguntaProblematizadora}"
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                      <strong className="text-slate-900">Estrategia DUA: </strong>
                      <span className="text-slate-600">{guide.actividades.reflexionInicial.estrategiaDua}</span>
                    </div>
                    <div className="bg-sky-50/70 p-2.5 rounded border border-sky-200">
                      <strong className="text-sky-900">Componente Lingüístico: </strong>
                      <span className="text-sky-800">{guide.actividades.reflexionInicial.multilinguismo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.2 Contextualización */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-800 text-white p-3.5 flex items-center justify-between">
                  <h3 className="font-bold text-sm">
                    {guide.actividades.contextualizacion ? guide.actividades.contextualizacion.titulo : '3.2 Actividades de Contextualización e Identificación de Conocimientos'}
                  </h3>
                  <span className="text-[11px] font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                    Saberes Previos vs. Estándar
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
                  <p className="text-slate-700">
                    {guide.actividades.contextualizacion ? guide.actividades.contextualizacion.descripcion : ''}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                      <strong className="text-slate-900">Estrategia DUA: </strong>
                      <span className="text-slate-600">{guide.actividades.contextualizacion ? guide.actividades.contextualizacion.estrategiaDua : ''}</span>
                    </div>
                    <div className="bg-sky-50/70 p-2.5 rounded border border-sky-200">
                      <strong className="text-sky-900">Componente Lingüístico: </strong>
                      <span className="text-sky-800">{guide.actividades.contextualizacion ? guide.actividades.contextualizacion.multilinguismo : ''}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3.3 Apropiación */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-purple-900 text-white p-3.5 flex items-center justify-between">
                  <h3 className="font-bold text-sm">
                    {guide.actividades.apropiacion.titulo}
                  </h3>
                  <span className="text-[11px] font-mono bg-purple-800 text-purple-200 px-2 py-0.5 rounded">
                    Redes de Reconocimiento (DUA II)
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cognitivas */}
                    <div className="bg-purple-50/50 p-3.5 rounded-xl border border-purple-200">
                      <h4 className="font-bold text-purple-900 text-xs uppercase mb-2">
                        Subactividades Cognitivas (Saber):
                      </h4>
                      <ul className="space-y-2 list-disc pl-4 text-slate-800">
                        {guide.actividades.apropiacion.subactividadesCognitivas.map((sub, i) => (
                          <li key={i}>{sub}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Procedimentales */}
                    <div className="bg-sky-50/50 p-3.5 rounded-xl border border-sky-200">
                      <h4 className="font-bold text-sky-900 text-xs uppercase mb-2">
                        Subactividades Procedimentales (Saber Hacer):
                      </h4>
                      <ul className="space-y-2 list-disc pl-4 text-slate-800">
                        {guide.actividades.apropiacion.subactividadesProcedimentales.map((sub, i) => (
                          <li key={i}>{sub}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                    <strong className="text-slate-900">Estrategia DUA Aplicada: </strong>
                    <span className="text-slate-700">{guide.actividades.apropiacion.estrategiaDua}</span>
                  </div>
                </div>
              </div>

              {/* 3.4 Transferencia */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-sky-900 text-white p-3.5 flex items-center justify-between">
                  <h3 className="font-bold text-sm">
                    {guide.actividades.transferencia.titulo}
                  </h3>
                  <span className="text-[11px] font-mono bg-sky-800 text-sky-200 px-2 py-0.5 rounded">
                    Redes Estratégicas (DUA III)
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block text-xs uppercase mb-1">
                      Reto en Unidad Productiva Campesina:
                    </span>
                    <p className="text-slate-800">
                      {guide.actividades.transferencia.retoEnFinca}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                      <strong className="text-slate-900">Estrategia DUA: </strong>
                      <span className="text-slate-600">{guide.actividades.transferencia.estrategiaDua}</span>
                    </div>
                    <div className="bg-sky-50/70 p-2.5 rounded border border-sky-200">
                      <strong className="text-sky-900">Componente Lingüístico: </strong>
                      <span className="text-sky-800">{guide.actividades.transferencia.multilinguismo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. ACTIVIDADES DE EVALUACIÓN */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-[#39A900] pb-2">
                <GraduationCap className="h-5 w-5 text-[#39A900]" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  4. Actividades de Evaluación
                </h2>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-3 px-3.5 font-bold">Criterios de Evaluación</th>
                      <th className="py-3 px-3.5 font-bold">Evidencias de Aprendizaje</th>
                      <th className="py-3 px-3.5 font-bold">Tipo</th>
                      <th className="py-3 px-3.5 font-bold">Técnicas e Instrumentos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {guide.evaluacion.map((ev, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-3.5 px-3.5 align-top font-medium text-slate-900">
                          {ev.criterio}
                        </td>
                        <td className="py-3.5 px-3.5 align-top text-slate-700">
                          {ev.evidencia}
                        </td>
                        <td className="py-3.5 px-3.5 align-top">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            ev.tipo === 'Conocimiento' ? 'bg-amber-100 text-amber-900' :
                            ev.tipo === 'Desempeño' ? 'bg-sky-100 text-sky-900' :
                            'bg-emerald-100 text-emerald-900'
                          }`}>
                            {ev.tipo}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 align-top text-xs text-slate-600">
                          <div><strong>Técnica:</strong> {ev.tecnica}</div>
                          <div><strong>Instrumento:</strong> {ev.instrumento}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. GLOSARIO DE TÉRMINOS TRILINGÜE */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b-2 border-[#39A900] pb-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  5. Glosario de Términos (Trilingüe: ES - EN - FR)
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.glosario.map((term) => (
                  <div key={term.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{term.spanish.term}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                        {term.category}
                      </span>
                    </div>
                    <p className="text-slate-600">{term.spanish.definition}</p>
                    <div className="pt-2 border-t border-slate-200/80 space-y-1 font-mono text-[11px]">
                      <div>
                        <span className="font-bold text-sky-700">EN:</span> {term.english.term} <span className="text-slate-400">({term.english.phonetic})</span>
                      </div>
                      <div>
                        <span className="font-bold text-purple-700">FR:</span> {term.french.term} <span className="text-slate-400">({term.french.phonetic})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 italic mt-1">
                        Contexto: {term.agroContext}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. REFERENTES BIBLIOGRÁFICOS */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-[#39A900] pb-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
                  6. Referentes Bibliográficos (APA 7ª Edición)
                </h2>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                {guide.referentesBibliograficos.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </section>

            {/* 7. CONTROL DEL DOCUMENTO */}
            <section className="space-y-3 pt-4 border-t border-slate-300">
              <div className="flex items-center gap-2 pb-2">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                  7. Control del Documento
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-100 p-4 rounded-xl text-xs">
                <div>
                  <span className="text-slate-500 block font-bold">Autor / Metodólogo:</span>
                  <span className="font-semibold text-slate-900">{guide.controlDocumento.autor}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold">Cargo:</span>
                  <span className="text-slate-800">{guide.controlDocumento.cargo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold">Dependencia / Centro:</span>
                  <span className="text-slate-800">{guide.controlDocumento.dependencia}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-bold">Fecha:</span>
                  <span className="font-mono text-slate-800">{guide.controlDocumento.fecha}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        /* VIEW MODE: LIVE INTERACTIVE FORM EDITOR */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-emerald-600" />
              <span>Editor de la Guía de Aprendizaje (GFPI-F-135)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Modifique los campos institucionales. Los cambios se reflejarán instantáneamente en la vista previa y en la exportación Markdown.
            </p>
          </div>

          {/* Section 1: Identificación */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800 flex items-center gap-2">
              <Building2 className="h-4 w-4" /> 1. Identificación Institucional
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Programa de Formación</label>
                <input
                  type="text"
                  value={guide.identificacion.denominacionPrograma}
                  onChange={(e) => updateField(['identificacion', 'denominacionPrograma'], e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Código del Programa</label>
                <input
                  type="text"
                  value={guide.identificacion.codigoPrograma}
                  onChange={(e) => updateField(['identificacion', 'codigoPrograma'], e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Proyecto Formativo</label>
                <input
                  type="text"
                  value={guide.identificacion.nombreProyecto}
                  onChange={(e) => updateField(['identificacion', 'nombreProyecto'], e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Fase del Proyecto</label>
                <input
                  type="text"
                  value={guide.identificacion.faseProyecto}
                  onChange={(e) => updateField(['identificacion', 'faseProyecto'], e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Duración Total (Horas)</label>
                <input
                  type="number"
                  value={guide.identificacion.duracionGuiaHoras}
                  onChange={(e) => updateField(['identificacion', 'duracionGuiaHoras'], Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Competencia Rector</label>
                <input
                  type="text"
                  value={guide.identificacion.competencia}
                  onChange={(e) => updateField(['identificacion', 'competencia'], e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Presentación */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> 2. Presentación (Disparador Motivacional)
            </h4>
            <textarea
              rows={4}
              value={guide.presentacion}
              onChange={(e) => updateField(['presentacion'], e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Section 3.1: Reflexión Inicial */}
          <div className="space-y-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-950 text-sm">3.1 Actividad de Reflexión Inicial</h4>
            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Título"
                value={guide.actividades.reflexionInicial.titulo}
                onChange={(e) => updateField(['actividades', 'reflexionInicial', 'titulo'], e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
              />
              <textarea
                rows={3}
                placeholder="Descripción del dilema agropecuario..."
                value={guide.actividades.reflexionInicial.descripcion}
                onChange={(e) => updateField(['actividades', 'reflexionInicial', 'descripcion'], e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg"
              />
              <input
                type="text"
                placeholder="Pregunta problematizadora..."
                value={guide.actividades.reflexionInicial.preguntaProblematizadora}
                onChange={(e) => updateField(['actividades', 'reflexionInicial', 'preguntaProblematizadora'], e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-emerald-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => setViewMode('preview')}
              className="px-5 py-2.5 bg-[#39A900] text-white rounded-xl text-xs font-bold hover:bg-emerald-600 shadow-md cursor-pointer"
            >
              Ver Vista Previa Oficial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
