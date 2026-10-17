import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ReasoningView } from './components/ReasoningView';
import { MethodologyMatrixView } from './components/MethodologyMatrixView';
import { LearningGuideEditor } from './components/LearningGuideEditor';
import { GlossaryView } from './components/GlossaryView';
import { ExportView } from './components/ExportView';
import { PRESET_GUIDES, LearningGuideModel } from './data/curriculumData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'reasoning' | 'matrix' | 'guide' | 'glossary' | 'export'>('reasoning');
  const [currentGuide, setCurrentGuide] = useState<LearningGuideModel>(() => {
    try {
      const saved = localStorage.getItem('sena_active_guide');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return PRESET_GUIDES[0];
  });

  // Keep active guide synced in localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_active_guide', JSON.stringify(currentGuide));
    } catch {
      // ignore
    }
  }, [currentGuide]);

  const handleSelectPreset = (presetId: string) => {
    const found = PRESET_GUIDES.find(g => g.id === presetId);
    if (found) {
      setCurrentGuide(JSON.parse(JSON.stringify(found)));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedGuideTitle={currentGuide.title}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'reasoning' && (
          <ReasoningView
            onNavigateToMatrix={() => setActiveTab('matrix')}
            onNavigateToGuide={() => setActiveTab('guide')}
          />
        )}

        {activeTab === 'matrix' && <MethodologyMatrixView />}

        {activeTab === 'guide' && (
          <LearningGuideEditor
            guide={currentGuide}
            onUpdateGuide={setCurrentGuide}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'glossary' && <GlossaryView />}

        {activeTab === 'export' && (
          <ExportView
            guide={currentGuide}
            onImportGuide={(imported) => {
              setCurrentGuide(imported);
              setActiveTab('guide');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#39A900]" />
            <span className="font-semibold text-slate-300">
              SENA - Servicio Nacional de Aprendizaje
            </span>
            <span>• Dirección de Formación Profesional (FPI)</span>
          </div>

          <div className="text-center sm:text-right text-slate-500">
            Diseño Universal para el Aprendizaje (DUA/UDL) • Formato GFPI-F-135 • Sector Agropecuario (ES/EN/FR)
          </div>
        </div>
      </footer>
    </div>
  );
}
