import React, { useState } from 'react';
import { METHODOLOGY_MATRIX_DATA, DuaMethodologyRow } from '../data/curriculumData';
import { 
  Layers, 
  Copy, 
  Check, 
  Filter, 
  Search, 
  Download, 
  FileSpreadsheet, 
  Volume2, 
  Printer, 
  X, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const MethodologyMatrixView: React.FC = () => {
  const [filterPrinciple, setFilterPrinciple] = useState<string>('all');
  const [filterFase, setFilterFase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedRow, setCopiedRow] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<DuaMethodologyRow | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const filteredData = METHODOLOGY_MATRIX_DATA.filter((row) => {
    const matchesPrinciple =
      filterPrinciple === 'all' || row.principioDua.includes(filterPrinciple);
    const matchesFase =
      filterFase === 'all' || row.faseCodigo === filterFase;
    const matchesSearch =
      searchQuery === '' ||
      row.momentoSena.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.estrategiaAgropecuaria.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.integracionMultilingue.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.integracionMultilingue.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.integracionMultilingue.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.evidenciaAprendizaje.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPrinciple && matchesFase && matchesSearch;
  });

  const copyMarkdownTable = () => {
    const tableHeader = `| Momento Didáctico SENA | Principio DUA | Estrategia Agropecuaria Aplicada | Integración Multilingüe [ES / EN / FR] | Evidencia de Aprendizaje |\n| :--- | :--- | :--- | :--- | :--- |\n`;
    const tableRows = filteredData.map(
      (r) =>
        `| **${r.momentoSena}** | **${r.principioDua}**<br>${r.pautaDua} | ${r.estrategiaAgropecuaria.replace(/\n/g, ' ')} | **ES:** ${r.integracionMultilingue.es}<br>**EN:** ${r.integracionMultilingue.en}<br>**FR:** ${r.integracionMultilingue.fr}<br>*Uso:* ${r.integracionMultilingue.usoTecnico} | **${r.tipoEvidencia}:** ${r.evidenciaAprendizaje} |`
    ).join('\n');

    navigator.clipboard.writeText(tableHeader + tableRows);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copySingleRowMarkdown = (r: DuaMethodologyRow) => {
    const rowMd = `### Momento SENA: ${r.momentoSena} (Fase ${r.faseCodigo})\n- **Principio DUA:** ${r.principioDua} (${r.pautaDua})\n- **Estrategia Agropecuaria:** ${r.estrategiaAgropecuaria}\n- **Multilingüismo:** ES: ${r.integracionMultilingue.es} | EN: ${r.integracionMultilingue.en} | FR: ${r.integracionMultilingue.fr}\n- **Evidencia (${r.tipoEvidencia}):** ${r.evidenciaAprendizaje}`;
    navigator.clipboard.writeText(rowMd);
    setCopiedRow(true);
    setTimeout(() => setCopiedRow(false), 2500);
  };

  const playSpeech = (text: string, lang: 'es-ES' | 'en-US' | 'fr-FR', key: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.9;
      u.onend = () => setPlayingAudio(null);
      u.onerror = () => setPlayingAudio(null);
      setPlayingAudio(key);
      window.speechSynthesis.speak(u);
    }
  };

  const downloadCsv = () => {
    const headers = ['Momento Didactico SENA', 'Fase FPI', 'Principio DUA', 'Pauta DUA', 'Estrategia Agropecuaria', 'Termino ES', 'Termino EN', 'Termino FR', 'Evidencia de Aprendizaje', 'Tipo Evidencia'];
    const csvRows = [headers.join(',')];

    filteredData.forEach(row => {
      const escaped = [
        `"${row.momentoSena}"`,
        `"${row.faseCodigo}"`,
        `"${row.principioDua}"`,
        `"${row.pautaDua.replace(/"/g, '""')}"`,
        `"${row.estrategiaAgropecuaria.replace(/"/g, '""')}"`,
        `"${row.integracionMultilingue.es.replace(/"/g, '""')}"`,
        `"${row.integracionMultilingue.en.replace(/"/g, '""')}"`,
        `"${row.integracionMultilingue.fr.replace(/"/g, '""')}"`,
        `"${row.evidenciaAprendizaje.replace(/"/g, '""')}"`,
        `"${row.tipoEvidencia}"`
      ];
      csvRows.push(escaped.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'matriz_metodologica_sena_dua_agropecuaria.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>SECCIÓN 2 DEL CONTRATO DE SALIDA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Matriz Metodológica SENA - DUA Agropecuaria
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Articulación entre los 4 momentos formativos del SENA (Reflexión, Contextualización, Apropiación, Transferencia), las 3 redes DUA, la terminología técnica agroexportadora y las evidencias de aprendizaje.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={copyMarkdownTable}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm cursor-pointer"
            title="Copiar tabla en formato Markdown estándar para informes"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? '¡Tabla Copiada!' : 'Copiar Tabla Markdown'}</span>
          </button>

          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all cursor-pointer"
            title="Descargar en formato CSV para Excel"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-700" />
            <span className="hidden sm:inline">Descargar CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200 cursor-pointer"
            title="Imprimir o Exportar PDF de la Matriz"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por momento, término o estrategia..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Principle Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Red DUA:
            </span>
            <button
              onClick={() => setFilterPrinciple('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                filterPrinciple === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterPrinciple('Compromiso')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                filterPrinciple === 'Compromiso'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Compromiso (Afectivas)
            </button>
            <button
              onClick={() => setFilterPrinciple('Representación')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                filterPrinciple === 'Representación'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              Representación (Reconocimiento)
            </button>
            <button
              onClick={() => setFilterPrinciple('Acción y Expresión')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                filterPrinciple === 'Acción y Expresión'
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
              }`}
            >
              Acción/Expresión (Estratégicas)
            </button>
          </div>
        </div>

        {/* Phase Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1">Momento SENA:</span>
          <button
            onClick={() => setFilterFase('all')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              filterFase === 'all' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos los Momentos
          </button>
          <button
            onClick={() => setFilterFase('3.1')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              filterFase === '3.1' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3.1 Reflexión Inicial
          </button>
          <button
            onClick={() => setFilterFase('3.2')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              filterFase === '3.2' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3.2 Contextualización
          </button>
          <button
            onClick={() => setFilterFase('3.3')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              filterFase === '3.3' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3.3 Apropiación
          </button>
          <button
            onClick={() => setFilterFase('3.4')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              filterFase === '3.4' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3.4 Transferencia
          </button>
          <button
            onClick={() => setFilterFase('4.0')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
              filterFase === '4.0' ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            4.0 Evaluación
          </button>

          {(filterPrinciple !== 'all' || filterFase !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setFilterPrinciple('all');
                setFilterFase('all');
                setSearchQuery('');
              }}
              className="ml-auto text-[11px] text-emerald-700 hover:underline font-bold"
            >
              Restablecer Filtros
            </button>
          )}
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/6">
                  Momento Didáctico SENA
                </th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/6">
                  Principio DUA
                </th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-2/6">
                  Estrategia Agropecuaria Aplicada
                </th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/6">
                  Integración Multilingüe [ES / EN / FR]
                </th>
                <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/6">
                  Evidencia de Aprendizaje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRow(row)}
                  className="hover:bg-emerald-50/50 transition-colors divide-x divide-slate-100 cursor-pointer group"
                  title="Haga clic para ver el detalle pedagógico ampliado y escuchar la terminología"
                >
                  {/* Momento SENA */}
                  <td className="py-4 px-4 align-top">
                    <span className="font-bold text-slate-900 block group-hover:text-emerald-700 transition-colors">
                      {row.momentoSena}
                    </span>
                    <span className="inline-block mt-1 font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      Fase FPI {row.faseCodigo}
                    </span>
                  </td>

                  {/* Principio DUA */}
                  <td className="py-4 px-4 align-top">
                    <div className="space-y-1">
                      <span
                        className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          row.principioDua.includes('Compromiso')
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : row.principioDua.includes('Representación')
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-sky-100 text-sky-800 border border-sky-200'
                        }`}
                      >
                        {row.principioDua.split(' ')[0]}
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono leading-tight">
                        {row.pautaDua}
                      </p>
                    </div>
                  </td>

                  {/* Estrategia Agropecuaria */}
                  <td className="py-4 px-4 align-top leading-relaxed text-slate-700">
                    <p className="text-xs sm:text-[13px]">{row.estrategiaAgropecuaria}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Ver detalles y audios</span> →
                    </span>
                  </td>

                  {/* Multilingüe */}
                  <td className="py-4 px-4 align-top space-y-1.5 font-mono text-[11px]">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-700">ES:</span>
                        <span className="text-slate-800 truncate ml-1">{row.integracionMultilingue.es}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-700">EN:</span>
                        <span className="text-slate-800 truncate ml-1">{row.integracionMultilingue.en}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-700">FR:</span>
                        <span className="text-slate-800 truncate ml-1">{row.integracionMultilingue.fr}</span>
                      </div>
                      <div className="pt-1 border-t border-slate-200 text-[10px] text-slate-500 italic">
                        {row.integracionMultilingue.usoTecnico}
                      </div>
                    </div>
                  </td>

                  {/* Evidencia */}
                  <td className="py-4 px-4 align-top space-y-1">
                    <span
                      className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        row.tipoEvidencia === 'Conocimiento'
                          ? 'bg-amber-100 text-amber-800'
                          : row.tipoEvidencia === 'Desempeño'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {row.tipoEvidencia}
                    </span>
                    <p className="text-xs text-slate-800 leading-snug">
                      {row.evidenciaAprendizaje}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-8 text-center text-slate-500 space-y-2">
            <p>No se encontraron filas que coincidan con el criterio de búsqueda o filtro seleccionado.</p>
            <button
              onClick={() => {
                setFilterPrinciple('all');
                setFilterFase('all');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>

      {/* Selected Row Modal / Inspector */}
      {selectedRow && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  Fase {selectedRow.faseCodigo} • {selectedRow.momentoSena}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Detalle Metodológico Ampliado
                </h3>
              </div>
              <button
                onClick={() => setSelectedRow(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase text-slate-500 mb-1">
                  Principio y Pautas DUA
                </h4>
                <p className="font-semibold text-slate-800">{selectedRow.principioDua}</p>
                <p className="text-xs text-slate-600 mt-1">{selectedRow.pautaDua}</p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 text-xs uppercase mb-1">
                  Estrategia Agropecuaria Aplicada en Campo
                </h4>
                <p className="text-slate-800 text-xs leading-relaxed">
                  {selectedRow.estrategiaAgropecuaria}
                </p>
              </div>

              {/* Trilingual pronunciation station */}
              <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sky-900 text-xs uppercase">
                    Articulación Lingüística Trilingüe (Haga clic para escuchar)
                  </h4>
                  <span className="text-[10px] text-sky-700 font-mono">Audio Web Speech</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono mt-1">
                  <div className="bg-white p-2.5 rounded border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-emerald-600 block text-[10px]">Español</span>
                      <span className="text-slate-800 font-semibold">{selectedRow.integracionMultilingue.es}</span>
                    </div>
                    <button
                      onClick={() => playSpeech(selectedRow.integracionMultilingue.es, 'es-ES', 'modal-es')}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
                    >
                      <Volume2 className={`h-3.5 w-3.5 ${playingAudio === 'modal-es' ? 'animate-pulse text-emerald-600' : ''}`} />
                      <span>Escuchar</span>
                    </button>
                  </div>

                  <div className="bg-white p-2.5 rounded border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-sky-600 block text-[10px]">Inglés</span>
                      <span className="text-slate-800 font-semibold">{selectedRow.integracionMultilingue.en}</span>
                    </div>
                    <button
                      onClick={() => playSpeech(selectedRow.integracionMultilingue.en, 'en-US', 'modal-en')}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-900 font-bold cursor-pointer"
                    >
                      <Volume2 className={`h-3.5 w-3.5 ${playingAudio === 'modal-en' ? 'animate-pulse text-sky-600' : ''}`} />
                      <span>Pronunciar</span>
                    </button>
                  </div>

                  <div className="bg-white p-2.5 rounded border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-purple-600 block text-[10px]">Francés</span>
                      <span className="text-slate-800 font-semibold">{selectedRow.integracionMultilingue.fr}</span>
                    </div>
                    <button
                      onClick={() => playSpeech(selectedRow.integracionMultilingue.fr, 'fr-FR', 'modal-fr')}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 font-bold cursor-pointer"
                    >
                      <Volume2 className={`h-3.5 w-3.5 ${playingAudio === 'modal-fr' ? 'animate-pulse text-purple-600' : ''}`} />
                      <span>Prononcer</span>
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 italic">
                  Contexto normativo/comercial: {selectedRow.integracionMultilingue.usoTecnico}
                </p>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">Evidencia Requerida</span>
                  <span className="text-xs text-slate-700">{selectedRow.evidenciaAprendizaje}</span>
                </div>
                <span className="px-2 py-1 bg-amber-200 text-amber-900 font-bold text-xs rounded">
                  {selectedRow.tipoEvidencia}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <button
                onClick={() => copySingleRowMarkdown(selectedRow)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer border border-slate-200"
              >
                {copiedRow ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedRow ? '¡Fila Copiada!' : 'Copiar esta Fila en Markdown'}</span>
              </button>

              <button
                onClick={() => setSelectedRow(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
