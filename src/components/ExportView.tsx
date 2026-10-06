import React, { useState } from 'react';
import { LearningGuideModel } from '../data/curriculumData';
import { generateFullMarkdownReport } from '../utils/markdownExporter';
import { Download, Copy, Check, FileText, CheckCircle2 } from 'lucide-react';

interface ExportViewProps {
  guide: LearningGuideModel;
}

export const ExportView: React.FC<ExportViewProps> = ({ guide }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const markdownContent = generateFullMarkdownReport(guide);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const filename = `SENA_Guia_Aprendizaje_${guide.id}.md`;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>CONTRATO DE SALIDA COMPLETO EN FORMATO MARKDOWN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Exportador de Entrega Oficial SENA-DUA
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Generación íntegra de los 3 bloques obligatorios: Razonamiento Pedagógico, Matriz Metodológica SENA-DUA y Plantilla Operativa GFPI-F-135 con glosario trilingüe.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#39A900] hover:bg-emerald-600 text-white transition-all shadow-md cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? '¡Copiado al Portapapeles!' : 'Copiar Todo el Markdown'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Descargar Archivo .md</span>
          </button>
        </div>
      </div>

      {/* Code / Markdown Display */}
      <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-400" />
            <span>DOCUMENTO_ENTREGA_SENA_DUA.md</span>
          </div>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
            Markdown Estándar • GFPI SENA
          </span>
        </div>
        <div className="p-5 max-h-[650px] overflow-y-auto leading-relaxed whitespace-pre-wrap selection:bg-emerald-500 selection:text-white">
          {markdownContent}
        </div>
      </div>
    </div>
  );
};
