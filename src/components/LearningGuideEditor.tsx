import React, { useState } from 'react';
import { LearningGuideModel, PRESET_GUIDES, createEmptyGuide, MultilingualTerm } from '../data/curriculumData';
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
  Copy,
  Check,
  Save,
  RotateCcw,
  Download,
  AlertCircle,
  HelpCircle
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
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleCopyMarkdown = () => {
    const md = generateFullMarkdownReport(guide);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveLocal = () => {
    try {
      localStorage.setItem(`sena_guide_${guide.id}`, JSON.stringify(guide));
      setSaveToast('¡Guía guardada exitosamente en el navegador!');
    } catch {
      setSaveToast('Guía almacenada en memoria de la sesión.');
    }
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleResetCurrentPreset = () => {
    const defaultPreset = PRESET_GUIDES.find(g => g.id === guide.id);
    if (defaultPreset) {
      onUpdateGuide(JSON.parse(JSON.stringify(defaultPreset)));
      setSaveToast('Se restablecieron los valores predeterminados de este preset.');
    } else {
      onUpdateGuide(createEmptyGuide());
      setSaveToast('Plantilla restablecida a blanco.');
    }
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleDownloadMd = () => {
    const md = generateFullMarkdownReport(guide);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SENA_${guide.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for deep immutable updates
  const updateField = (path: string[], value: any) => {
    const updated = JSON.parse(JSON.stringify(guide));
    let cur = updated;
    for (let i = 0; i < path.length - 1; i++) {
      cur = cur[path[i]];
    }
    cur[path[path.length - 1]] = value;
    onUpdateGuide(updated);
  };

  // List manipulation helpers
  const handleAddRap = () => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.identificacion.resultadosAprendizaje.push(
      `RAP 0${updated.identificacion.resultadosAprendizaje.length + 1}: Nuevo Resultado de Aprendizaje técnico.`
    );
    onUpdateGuide(updated);
  };

  const handleRemoveRap = (index: number) => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.identificacion.resultadosAprendizaje.splice(index, 1);
    onUpdateGuide(updated);
  };

  const handleAddCognitiveSubactivity = () => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.actividades.apropiacion.subactividadesCognitivas.push(
      `3.3.${updated.actividades.apropiacion.subactividadesCognitivas.length + 1} Nueva fundamentación teórica o cálculo agronómico.`
    );
    onUpdateGuide(updated);
  };

  const handleRemoveCognitiveSubactivity = (index: number) => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.actividades.apropiacion.subactividadesCognitivas.splice(index, 1);
    onUpdateGuide(updated);
  };

  const handleAddProceduralSubactivity = () => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.actividades.apropiacion.subactividadesProcedimentales.push(
      `3.3.${updated.actividades.apropiacion.subactividadesProcedimentales.length + 4} Nueva práctica guiada en parcela o taller.`
    );
    onUpdateGuide(updated);
  };

  const handleRemoveProceduralSubactivity = (index: number) => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.actividades.apropiacion.subactividadesProcedimentales.splice(index, 1);
    onUpdateGuide(updated);
  };

  const handleAddEvaluationRow = () => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.evaluacion.push({
      criterio: 'Criterio técnico de evaluación SENA según protocolo.',
      evidencia: 'Evidencia práctica de aprendizaje entregada por el aprendiz.',
      tipo: 'Producto',
      tecnica: 'Valoración de producto',
      instrumento: 'Rúbrica analítica'
    });
    onUpdateGuide(updated);
  };

  const handleRemoveEvaluationRow = (index: number) => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.evaluacion.splice(index, 1);
    onUpdateGuide(updated);
  };

  const handleAddReference = () => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.referentesBibliograficos.push('Autor. (2026). Título del documento técnico o norma (7ª ed.). Editorial o Entidad.');
    onUpdateGuide(updated);
  };

  const handleRemoveReference = (index: number) => {
    const updated = JSON.parse(JSON.stringify(guide));
    updated.referentesBibliograficos.splice(index, 1);
    onUpdateGuide(updated);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-18 right-6 z-50 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce border border-emerald-500">
          <CheckCircle className="h-4 w-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold bg-[#39A900]/15 text-[#39A900] px-2.5 py-0.5 rounded-md border border-[#39A900]/30">
                FORMATO OFICIAL GFPI-F-135
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Procedimiento Desarrollo Curricular SENA
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Plantilla Operativa de Guía de Aprendizaje</span>
            </h2>
          </div>

          {/* Action Toolbars */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl text-xs font-medium text-white shadow-sm">
              <button
                onClick={() => setViewMode('preview')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-[#39A900] text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Ver documento oficial con formato institucional SENA"
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
                title="Editar todos los campos de la guía"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Editor de Campos</span>
              </button>
            </div>

            {/* Quick Action Buttons */}
            <button
              onClick={handleSaveLocal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all cursor-pointer"
              title="Guardar cambios en el navegador"
            >
              <Save className="h-4 w-4 text-emerald-600" />
              <span className="hidden sm:inline">Guardar</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all cursor-pointer"
              title="Copiar guía completa en Markdown"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleDownloadMd}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all cursor-pointer"
              title="Descargar archivo Markdown (.md)"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Descargar .md</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all cursor-pointer"
              title="Imprimir documento oficial SENA"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={handleResetCurrentPreset}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
              title="Restablecer plantilla"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Case Preset Selector */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Cargar Caso Agropecuario:
          </span>
          <button
            onClick={() => onSelectPreset('guia-aguacate-bpa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              guide.id === 'guia-aguacate-bpa'
                ? 'bg-emerald-700 text-white shadow-sm font-bold'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            🥑 Aguacate Hass (BPA / GlobalG.A.P.)
          </button>
          <button
            onClick={() => onSelectPreset('guia-cafe-especial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              guide.id === 'guia-cafe-especial'
                ? 'bg-amber-800 text-white shadow-sm font-bold'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            ☕ Café Especial (SCA / Fermentación)
          </button>
          <button
            onClick={() => onSelectPreset('guia-cacao-exportacion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              guide.id === 'guia-cacao-exportacion'
                ? 'bg-orange-800 text-white shadow-sm font-bold'
                : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
            }`}
          >
            🍫 Cacao Fino (ICCO / Poscosecha)
          </button>
          <button
            onClick={() => onUpdateGuide(createEmptyGuide())}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
          >
            ➕ Nueva Guía Personalizada
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
                  {guide.actividades.contextualizacion?.actividadDiagnostica && (
                    <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-slate-600">
                      <span className="font-bold text-slate-900 block text-xs uppercase mb-1">
                        Actividad Diagnóstica de Campo:
                      </span>
                      <p className="text-slate-800">
                        {guide.actividades.contextualizacion.actividadDiagnostica}
                      </p>
                    </div>
                  )}
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
        /* VIEW MODE: FULL INTERACTIVE FORM EDITOR FOR ALL 7 SECTIONS */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-emerald-600" />
                <span>Editor Integral de la Guía de Aprendizaje (GFPI-F-135)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Todos los campos, botones de agregar, eliminar y modificar están activos y sincronizados en tiempo real.
              </p>
            </div>
            <button
              onClick={() => setViewMode('preview')}
              className="px-4 py-2 bg-[#39A900] text-white rounded-xl text-xs font-bold hover:bg-emerald-600 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="h-4 w-4" />
              <span>Ver Documento Final</span>
            </button>
          </div>

          {/* Section 1: Identificación */}
          <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800 flex items-center gap-2">
                <Building2 className="h-4 w-4" /> 1. Identificación Institucional
              </h4>
              <span className="text-xs text-slate-500 font-mono">GFPI-F-135</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Programa de Formación</label>
                <input
                  type="text"
                  value={guide.identificacion.denominacionPrograma}
                  onChange={(e) => updateField(['identificacion', 'denominacionPrograma'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Código del Programa</label>
                <input
                  type="text"
                  value={guide.identificacion.codigoPrograma}
                  onChange={(e) => updateField(['identificacion', 'codigoPrograma'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Proyecto Formativo</label>
                <input
                  type="text"
                  value={guide.identificacion.nombreProyecto}
                  onChange={(e) => updateField(['identificacion', 'nombreProyecto'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Fase del Proyecto</label>
                <input
                  type="text"
                  value={guide.identificacion.faseProyecto}
                  onChange={(e) => updateField(['identificacion', 'faseProyecto'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Actividad de Proyecto</label>
                <input
                  type="text"
                  value={guide.identificacion.actividadProyecto}
                  onChange={(e) => updateField(['identificacion', 'actividadProyecto'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Duración Total (Horas)</label>
                <input
                  type="number"
                  value={guide.identificacion.duracionGuiaHoras}
                  onChange={(e) => updateField(['identificacion', 'duracionGuiaHoras'], Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Regional SENA</label>
                <input
                  type="text"
                  value={guide.identificacion.regional}
                  onChange={(e) => updateField(['identificacion', 'regional'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Centro de Formación</label>
                <input
                  type="text"
                  value={guide.identificacion.centroFormacion}
                  onChange={(e) => updateField(['identificacion', 'centroFormacion'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Competencia Rector</label>
                <input
                  type="text"
                  value={guide.identificacion.competencia}
                  onChange={(e) => updateField(['identificacion', 'competencia'], e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Editable RAPs */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-slate-700 uppercase">
                  Resultados de Aprendizaje a Alcanzar (RAPs):
                </label>
                <button
                  type="button"
                  onClick={handleAddRap}
                  className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Agregar RAP
                </button>
              </div>

              {guide.identificacion.resultadosAprendizaje.map((rap, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400 w-6 text-right">{index + 1}.</span>
                  <input
                    type="text"
                    value={rap}
                    onChange={(e) => {
                      const updated = JSON.parse(JSON.stringify(guide));
                      updated.identificacion.resultadosAprendizaje[index] = e.target.value;
                      onUpdateGuide(updated);
                    }}
                    className="flex-1 p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                  />
                  {guide.identificacion.resultadosAprendizaje.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRap(index)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Eliminar este RAP"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Presentación */}
          <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> 2. Presentación (Disparador Motivacional)
            </h4>
            <p className="text-xs text-slate-500">
              Redacte una introducción estimulante que conecte la realidad productiva de los aprendices con el valor económico, ambiental y ético del sector.
            </p>
            <textarea
              rows={4}
              value={guide.presentacion}
              onChange={(e) => updateField(['presentacion'], e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Section 3.1: Reflexión Inicial */}
          <div className="space-y-3 bg-emerald-50/40 p-5 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-950 text-sm">3.1 Actividad de Reflexión Inicial (Redes Afectivas - DUA I)</h4>
              <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Sin Calificación Previa</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Título de la Actividad</label>
                <input
                  type="text"
                  value={guide.actividades.reflexionInicial.titulo}
                  onChange={(e) => updateField(['actividades', 'reflexionInicial', 'titulo'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Descripción del Dilema Productivo</label>
                <textarea
                  rows={3}
                  value={guide.actividades.reflexionInicial.descripcion}
                  onChange={(e) => updateField(['actividades', 'reflexionInicial', 'descripcion'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Pregunta Problematizadora</label>
                <input
                  type="text"
                  value={guide.actividades.reflexionInicial.preguntaProblematizadora}
                  onChange={(e) => updateField(['actividades', 'reflexionInicial', 'preguntaProblematizadora'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-semibold text-emerald-900"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estrategia DUA Aplicada</label>
                  <input
                    type="text"
                    value={guide.actividades.reflexionInicial.estrategiaDua}
                    onChange={(e) => updateField(['actividades', 'reflexionInicial', 'estrategiaDua'], e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Componente Lingüístico (ES/EN/FR)</label>
                  <input
                    type="text"
                    value={guide.actividades.reflexionInicial.multilinguismo}
                    onChange={(e) => updateField(['actividades', 'reflexionInicial', 'multilinguismo'], e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3.2: Contextualización */}
          <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm">3.2 Actividades de Contextualización e Identificación de Conocimientos</h4>
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Título</label>
                <input
                  type="text"
                  value={guide.actividades.contextualizacion ? guide.actividades.contextualizacion.titulo : ''}
                  onChange={(e) => updateField(['actividades', 'contextualizacion', 'titulo'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Descripción Metodológica</label>
                <textarea
                  rows={2}
                  value={guide.actividades.contextualizacion ? guide.actividades.contextualizacion.descripcion : ''}
                  onChange={(e) => updateField(['actividades', 'contextualizacion', 'descripcion'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Actividad Diagnóstica de Campo</label>
                <input
                  type="text"
                  value={guide.actividades.contextualizacion ? guide.actividades.contextualizacion.actividadDiagnostica : ''}
                  onChange={(e) => updateField(['actividades', 'contextualizacion', 'actividadDiagnostica'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estrategia DUA</label>
                  <input
                    type="text"
                    value={guide.actividades.contextualizacion ? guide.actividades.contextualizacion.estrategiaDua : ''}
                    onChange={(e) => updateField(['actividades', 'contextualizacion', 'estrategiaDua'], e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Componente Lingüístico</label>
                  <input
                    type="text"
                    value={guide.actividades.contextualizacion ? guide.actividades.contextualizacion.multilinguismo : ''}
                    onChange={(e) => updateField(['actividades', 'contextualizacion', 'multilinguismo'], e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3.3: Apropiación */}
          <div className="space-y-4 bg-purple-50/40 p-5 rounded-2xl border border-purple-200">
            <h4 className="font-bold text-purple-950 text-sm">3.3 Actividades de Apropiación (Redes de Reconocimiento - DUA II)</h4>
            
            {/* Cognitivas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-purple-900 uppercase">Subactividades Cognitivas (Saber):</label>
                <button
                  type="button"
                  onClick={handleAddCognitiveSubactivity}
                  className="inline-flex items-center gap-1 text-xs text-purple-700 hover:text-purple-800 font-bold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Agregar Cognitiva
                </button>
              </div>
              {guide.actividades.apropiacion.subactividadesCognitivas.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => {
                      const updated = JSON.parse(JSON.stringify(guide));
                      updated.actividades.apropiacion.subactividadesCognitivas[idx] = e.target.value;
                      onUpdateGuide(updated);
                    }}
                    className="flex-1 p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                  />
                  {guide.actividades.apropiacion.subactividadesCognitivas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCognitiveSubactivity(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Procedimentales */}
            <div className="space-y-2 pt-2 border-t border-purple-200/60">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-sky-900 uppercase">Subactividades Procedimentales (Saber Hacer):</label>
                <button
                  type="button"
                  onClick={handleAddProceduralSubactivity}
                  className="inline-flex items-center gap-1 text-xs text-sky-700 hover:text-sky-800 font-bold cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" /> Agregar Procedimental
                </button>
              </div>
              {guide.actividades.apropiacion.subactividadesProcedimentales.map((sub, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={sub}
                    onChange={(e) => {
                      const updated = JSON.parse(JSON.stringify(guide));
                      updated.actividades.apropiacion.subactividadesProcedimentales[idx] = e.target.value;
                      onUpdateGuide(updated);
                    }}
                    className="flex-1 p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                  />
                  {guide.actividades.apropiacion.subactividadesProcedimentales.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProceduralSubactivity(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="font-semibold text-slate-700 block mb-1 text-xs">Estrategia DUA Aplicada</label>
              <input
                type="text"
                value={guide.actividades.apropiacion.estrategiaDua}
                onChange={(e) => updateField(['actividades', 'apropiacion', 'estrategiaDua'], e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Section 3.4: Transferencia */}
          <div className="space-y-3 bg-sky-50/40 p-5 rounded-2xl border border-sky-200">
            <h4 className="font-bold text-sky-950 text-sm">3.4 Actividades de Transferencia del Conocimiento (Redes Estratégicas - DUA III)</h4>
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Título del Reto</label>
                <input
                  type="text"
                  value={guide.actividades.transferencia.titulo}
                  onChange={(e) => updateField(['actividades', 'transferencia', 'titulo'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Reto en Parcela / Unidad Productiva</label>
                <textarea
                  rows={2}
                  value={guide.actividades.transferencia.retoEnFinca}
                  onChange={(e) => updateField(['actividades', 'transferencia', 'retoEnFinca'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estrategia DUA</label>
                  <input
                    type="text"
                    value={guide.actividades.transferencia.estrategiaDua}
                    onChange={(e) => updateField(['actividades', 'transferencia', 'estrategiaDua'], e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Componente Lingüístico</label>
                  <input
                    type="text"
                    value={guide.actividades.transferencia.multilinguismo}
                    onChange={(e) => updateField(['actividades', 'transferencia', 'multilinguismo'], e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Actividades de Evaluación */}
          <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" /> 4. Matriz de Evaluación (Conocimiento, Desempeño y Producto)
              </h4>
              <button
                type="button"
                onClick={handleAddEvaluationRow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar Evidencia
              </button>
            </div>

            <div className="space-y-3">
              {guide.evaluacion.map((ev, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500 font-mono">Evidencia #{index + 1}</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={ev.tipo}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(guide));
                          updated.evaluacion[index].tipo = e.target.value as any;
                          onUpdateGuide(updated);
                        }}
                        className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-700"
                      >
                        <option value="Conocimiento">Conocimiento</option>
                        <option value="Desempeño">Desempeño</option>
                        <option value="Producto">Producto</option>
                      </select>
                      {guide.evaluacion.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEvaluationRow(index)}
                          className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                          title="Eliminar esta fila de evaluación"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Criterio de Evaluación SENA</label>
                      <textarea
                        rows={2}
                        value={ev.criterio}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(guide));
                          updated.evaluacion[index].criterio = e.target.value;
                          onUpdateGuide(updated);
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Descripción de la Evidencia Entregable</label>
                      <textarea
                        rows={2}
                        value={ev.evidencia}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(guide));
                          updated.evaluacion[index].evidencia = e.target.value;
                          onUpdateGuide(updated);
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Técnica de Evaluación</label>
                      <input
                        type="text"
                        value={ev.tecnica}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(guide));
                          updated.evaluacion[index].tecnica = e.target.value;
                          onUpdateGuide(updated);
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Instrumento de Evaluación</label>
                      <input
                        type="text"
                        value={ev.instrumento}
                        onChange={(e) => {
                          const updated = JSON.parse(JSON.stringify(guide));
                          updated.evaluacion[index].instrumento = e.target.value;
                          onUpdateGuide(updated);
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Referentes Bibliográficos */}
          <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800">
                6. Referentes Bibliográficos (APA 7ª Edición)
              </h4>
              <button
                type="button"
                onClick={handleAddReference}
                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar Cita APA
              </button>
            </div>
            {guide.referentesBibliograficos.map((ref, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={ref}
                  onChange={(e) => {
                    const updated = JSON.parse(JSON.stringify(guide));
                    updated.referentesBibliograficos[idx] = e.target.value;
                    onUpdateGuide(updated);
                  }}
                  className="flex-1 p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                />
                {guide.referentesBibliograficos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveReference(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Section 7: Control del Documento */}
          <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm uppercase text-emerald-800">
              7. Control del Documento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Autor / Metodólogo</label>
                <input
                  type="text"
                  value={guide.controlDocumento.autor}
                  onChange={(e) => updateField(['controlDocumento', 'autor'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cargo</label>
                <input
                  type="text"
                  value={guide.controlDocumento.cargo}
                  onChange={(e) => updateField(['controlDocumento', 'cargo'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Dependencia / Centro</label>
                <input
                  type="text"
                  value={guide.controlDocumento.dependencia}
                  onChange={(e) => updateField(['controlDocumento', 'dependencia'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Fecha de Elaboración</label>
                <input
                  type="text"
                  value={guide.controlDocumento.fecha}
                  onChange={(e) => updateField(['controlDocumento', 'fecha'], e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveLocal}
                className="px-4 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Save className="h-4 w-4" />
                <span>Guardar Cambios</span>
              </button>
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-4 py-2.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 cursor-pointer flex items-center gap-1.5"
              >
                <Copy className="h-4 w-4" />
                <span>Copiar en Markdown</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className="px-5 py-2.5 bg-[#39A900] text-white rounded-xl text-xs font-bold hover:bg-emerald-600 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="h-4 w-4" />
              <span>Ver Vista Previa Oficial SENA</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
