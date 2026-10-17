import React, { useState, useRef } from 'react';
import { LearningGuideModel } from '../data/curriculumData';
import { generateFullMarkdownReport } from '../utils/markdownExporter';
import { 
  Download, 
  Copy, 
  Check, 
  FileText, 
  CheckCircle2, 
  Printer, 
  FileCode, 
  Upload, 
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

interface ExportViewProps {
  guide: LearningGuideModel;
  onImportGuide?: (guide: LearningGuideModel) => void;
}

export const ExportView: React.FC<ExportViewProps> = ({ guide, onImportGuide }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const markdownContent = generateFullMarkdownReport(guide);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadMd = () => {
    const filename = `SENA_Guia_Aprendizaje_${guide.id}.md`;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJson = () => {
    const filename = `SENA_Backup_${guide.id}.json`;
    const blob = new Blob([JSON.stringify(guide, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.identificacion && onImportGuide) {
          onImportGuide(parsed);
          setCopiedType('import-success');
          setTimeout(() => setCopiedType(null), 3000);
        }
      } catch {
        alert('El archivo seleccionado no es un JSON válido de Guía de Aprendizaje SENA.');
      }
    };
    reader.readAsText(file);
  };

  // Section extracts
  const extractMatrixOnly = () => {
    const parts = markdownContent.split('### 2. MATRIZ METODOLÓGICA SENA-DUA AGROPECUARIA');
    if (parts.length > 1) {
      const matrixPart = parts[1].split('### 3. PLANTILLA OPERATIVA DE GUÍA DE APRENDIZAJE')[0];
      return `### 2. MATRIZ METODOLÓGICA SENA-DUA AGROPECUARIA\n${matrixPart.trim()}`;
    }
    return '';
  };

  const extractGuideOnly = () => {
    const parts = markdownContent.split('### 3. PLANTILLA OPERATIVA DE GUÍA DE APRENDIZAJE');
    if (parts.length > 1) {
      return `### 3. PLANTILLA OPERATIVA DE GUÍA DE APRENDIZAJE${parts[1]}`;
    }
    return '';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>CENTRO DE EXPORTACIÓN Y ENTREGA INSTITUCIONAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Exportador Oficial SENA-DUA Multiformato
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Exporte en Markdown estándar para la respuesta contractual, descargue archivos .md y .json para respaldo local, o imprima directamente con membrete oficial institucional.
            </p>
          </div>

          {/* Primary Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopy(markdownContent, 'all')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#39A900] hover:bg-emerald-600 text-white transition-all shadow-md cursor-pointer"
            >
              {copiedType === 'all' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedType === 'all' ? '¡Todo Copiado!' : 'Copiar Todo el Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadMd}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Descargar .md</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all cursor-pointer"
              title="Imprimir o Guardar en PDF"
            >
              <Printer className="h-4 w-4" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Granular Action Buttons Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1">Opciones Granulares:</span>

          <button
            onClick={() => handleCopy(extractMatrixOnly(), 'matrix')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
          >
            {copiedType === 'matrix' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>Copiar Solo la Matriz</span>
          </button>

          <button
            onClick={() => handleCopy(extractGuideOnly(), 'guide')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
          >
            {copiedType === 'guide' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>Copiar Solo la Guía GFPI</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer border border-emerald-200"
          >
            <Download className="h-3.5 w-3.5 text-emerald-700" />
            <span>Respaldar Guía (JSON)</span>
          </button>

          {onImportGuide && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer border border-sky-200"
              >
                <Upload className="h-3.5 w-3.5 text-sky-700" />
                <span>Cargar Guía (JSON)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </>
          )}

          {copiedType === 'import-success' && (
            <span className="text-xs font-bold text-emerald-600 ml-2 animate-pulse flex items-center gap-1">
              <Check className="h-3.5 w-3.5" /> ¡Guía importada correctamente!
            </span>
          )}
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
            Contrato de Salida Completo • GFPI SENA
          </span>
        </div>
        <div className="p-5 max-h-[650px] overflow-y-auto leading-relaxed whitespace-pre-wrap selection:bg-emerald-500 selection:text-white">
          {markdownContent}
        </div>
      </div>
    </div>
  );
};
