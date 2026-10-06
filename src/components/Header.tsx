import React from 'react';
import { Sprout, BookOpen, Layers, Globe2, FileText, Download, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'reasoning' | 'matrix' | 'guide' | 'glossary' | 'export';
  setActiveTab: (tab: 'reasoning' | 'matrix' | 'guide' | 'glossary' | 'export') => void;
  selectedGuideTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, selectedGuideTitle }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-xl backdrop-blur-md">
      {/* Top Banner SENA Brand Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#39A900] via-emerald-400 to-[#00324D]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-3">
          {/* Logo & Institutional Title */}
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#39A900] to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-400/30">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold tracking-widest uppercase bg-[#39A900]/25 text-emerald-400 px-2 py-0.5 rounded border border-[#39A900]/30 font-mono">
                  SENA • FPI • DUA
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  GFPI-F-135 v02
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Diseñador Curricular Agropecuario Multilingüe</span>
                <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  ES • EN • FR
                </span>
              </h1>
            </div>
          </div>

          {/* Quick Active Guide Pill & CTA */}
          <div className="flex items-center justify-between lg:justify-end gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 max-w-sm truncate">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="truncate font-medium">{selectedGuideTitle}</span>
            </div>

            <button
              onClick={() => setActiveTab('export')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#39A900] hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-900/30 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Exportar Markdown</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-medium border-t border-slate-800/70 pt-2">
          <button
            onClick={() => setActiveTab('reasoning')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'reasoning'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>1. Razonamiento Pedagógico</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>2. Matriz Metodológica SENA-DUA</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>3. Plantilla Operativa GFPI (Editor)</span>
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'glossary'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Globe2 className="h-4 w-4" />
            <span>Glosario Trilingüe (ES-EN-FR)</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'export'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Download className="h-4 w-4" />
            <span>Generar Contrato Markdown</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
