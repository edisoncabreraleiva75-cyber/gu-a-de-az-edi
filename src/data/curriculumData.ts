/**
 * Datos curriculares y metodológicos para el diseño de Guías de Aprendizaje SENA
 * Enfoque: Sector Agropecuario, DUA (Diseño Universal para el Aprendizaje) y Trilingüismo (ES/EN/FR)
 */

export interface MultilingualTerm {
  id: string;
  category: 'Fitosanitario' | 'Poscosecha' | 'Certificación' | 'Agroecología' | 'Comercio Exterior';
  spanish: {
    term: string;
    definition: string;
  };
  english: {
    term: string;
    phonetic: string;
    definition: string;
  };
  french: {
    term: string;
    phonetic: string;
    definition: string;
  };
  agroContext: string;
}

export interface DuaMethodologyRow {
  id: string;
  momentoSena: string;
  faseCodigo: '3.1' | '3.2' | '3.3' | '3.4' | '4.0';
  principioDua: 'Compromiso (Redes Afectivas)' | 'Representación (Redes de Reconocimiento)' | 'Acción y Expresión (Redes Estratégicas)';
  pautaDua: string;
  estrategiaAgropecuaria: string;
  integracionMultilingue: {
    es: string;
    en: string;
    fr: string;
    usoTecnico: string;
  };
  evidenciaAprendizaje: string;
  tipoEvidencia: 'Conocimiento' | 'Desempeño' | 'Producto';
}

export interface LearningGuideModel {
  id: string;
  title: string;
  identificacion: {
    denominacionPrograma: string;
    codigoPrograma: string;
    nombreProyecto: string;
    faseProyecto: string;
    actividadProyecto: string;
    competencia: string;
    resultadosAprendizaje: string[];
    duracionGuiaHoras: number;
    regional: string;
    centroFormacion: string;
  };
  presentacion: string;
  actividades: {
    reflexionInicial: {
      titulo: string;
      descripcion: string;
      estrategiaDua: string;
      preguntaProblematizadora: string;
      multilinguismo: string;
    };
    contextualizacion: {
      titulo: string;
      descripcion: string;
      estrategiaDua: string;
      actividadDiagnostica: string;
      multilinguismo: string;
    };
    apropiacion: {
      titulo: string;
      subactividadesCognitivas: string[];
      subactividadesProcedimentales: string[];
      estrategiaDua: string;
      multilinguismo: string;
    };
    transferencia: {
      titulo: string;
      retoEnFinca: string;
      estrategiaDua: string;
      multilinguismo: string;
    };
  };
  evaluacion: Array<{
    criterio: string;
    evidencia: string;
    tipo: 'Conocimiento' | 'Desempeño' | 'Producto';
    tecnica: string;
    instrumento: string;
  }>;
  glosario: MultilingualTerm[];
  referentesBibliograficos: string[];
  controlDocumento: {
    autor: string;
    cargo: string;
    dependencia: string;
    fecha: string;
  };
}

export const PEDAGOGICAL_REASONING = {
  fase1: {
    titulo: '1. Análisis Curricular Agropecuario (FPI - SENA)',
    subtitulo: 'Descomposición de competencias y RAPs en producción agropecuaria sostenible',
    detalles: [
      {
        aspecto: 'Modelo Pedagógico de la Formación Profesional Integral (FPI)',
        analisis: 'Se fundamenta en el desarrollo de competencias laborales orientadas al "Saber", "Saber Hacer" y "Saber Ser" en contextos productivos reales (fincas campesinas, agroindustrias y centros de biotecnología). La unidad fundamental es el Resultado de Aprendizaje (RAP), articulado al Proyecto Formativo y a las Normas Sectoriales de Competencia Laboral (NSCL).'
      },
      {
        aspecto: 'Descomposición de la Competencia Rector',
        analisis: 'Ejemplo representativo: "Implementar Buenas Prácticas Agrícolas según normativa técnica y requerimientos del mercado". Se desglosa en 3 dimensiones: 1) Cognitiva (criterios de inocuidad, fisiología vegetal, química de bioplaguicidas y Límites Máximos de Residuos - LMR); 2) Procedimental (dosificación de enmiendas, calibración de aspersores, monitoreo de umbrales económicos de plagas, manejo de bitácoras de campo); 3) Actitudinal/Ética (responsabilidad ambiental, protección del operario agrícola, conservación de cuencas y biodiversidad).'
      },
      {
        aspecto: 'Formulación de Resultados de Aprendizaje (RAPs)',
        analisis: 'RAP 1: Monitorear el estado fitosanitario y nutricional del cultivo siguiendo protocolos de manejo integrado y Buenas Prácticas Agrícolas. RAP 2: Ejecutar labores de cosecha y poscosecha garantizando la trazabilidad, inocuidad y estándares internacionales de calidad agroexportadora.'
      }
    ]
  },
  fase2: {
    titulo: '2. Articulación DUA / UDL en Ambientes de Aprendizaje Agropecuarios',
    subtitulo: 'Mapeo de las redes neurocognitivas del aprendizaje en contextos rurales y de campo',
    detalles: [
      {
        red: 'Redes Afectivas (El "Por qué" del aprendizaje) - Principio I: Múltiples formas de Compromiso',
        pautas: 'Pauta 7: Opciones para captar el interés | Pauta 8: Opciones para mantener el esfuerzo y la persistencia | Pauta 9: Opciones para la autorregulación.',
        aplicacionAgro: 'En el campo agropecuario, los aprendices rurales tienen saberes empíricos generacionales diversos. Se contextualiza la guía mediante dilemas productivos auténticos (ej. "Rechazo de un contenedor marítimo de aguacate o cacao en el puerto de Róterdam por contaminación microbiológica o exceso de clorpirifos"). Se promueve la autonomía brindando opciones para liderar roles en la parcela demostrativa (jefe de inocuidad, analista de suelos, auditor BPA).'
      },
      {
        red: 'Redes de Reconocimiento (El "Qué" del aprendizaje) - Principio II: Múltiples formas de Representación',
        pautas: 'Pauta 1: Opciones para la percepción | Pauta 2: Opciones para el lenguaje y los símbolos | Pauta 3: Opciones para la comprensión.',
        aplicacionAgro: 'El trabajo agrícola a menudo ocurre a la intemperie bajo condiciones climáticas variables y con diversidad de niveles de lectoescritura. Se proporciona la información en formatos multimodales: infografías laminadas resistentes al agua, videocápsulas breves en dispositivos móviles descargables para uso offline, muestras botánicas y fitopatológicas tangibles (hojas con síntomas de antracnosis o roya), y glosarios trilingües con iconografía técnica estandarizada.'
      },
      {
        red: 'Redes Estratégicas (El "Cómo" del aprendizaje) - Principio III: Múltiples formas de Acción y Expresión',
        pautas: 'Pauta 4: Opciones para la acción física | Pauta 5: Opciones para la expresión y la comunicación | Pauta 6: Opciones para las funciones ejecutivas.',
        aplicacionAgro: 'Demostración práctica de habilidades en parcela. Los aprendices pueden evidenciar su competencia a través de múltiples canales: 1) Ejecución directa de la calibración de un equipo de aspersión; 2) Registro fotográfico y podcast explicativo de su protocolo de biofertilización; 3) Simulación de auditoría interna de certificación con listas de chequeo digitales o en papel; 4) Presentación de pitch técnico comercial en dos idiomas.'
      }
    ]
  },
  fase3: {
    titulo: '3. Estrategia Lingüística Integrada (Español, Inglés, Francés)',
    subtitulo: 'Lógica de progresión para terminología agroexportadora y mercados globales',
    detalles: [
      {
        nivel: 'Nivel 1 - Identificación Fitosanitaria y Técnica Básica (Vocabulario Esencial)',
        descripcion: 'El aprendiz asocia los nombres de plagas, labores culturales e insumos clave con sus equivalentes universales. Ej: Manejo Integrado de Plagas (MIP) -> Integrated Pest Management (IPM) -> Protection Intégrée des Cultures (PIC).'
      },
      {
        nivel: 'Nivel 2 - Fichas Técnicas, Trazabilidad y Hojas de Datos de Seguridad (Comprensión Documental)',
        descripcion: 'Interpretación de etiquetas de agroinsumos, Hojas de Datos de Seguridad (MSDS / Fiche de Données de Sécurité - FDS) y certificados de análisis de suelo y agua. Ej: Límite Máximo de Residuos (LMR) -> Maximum Residue Limit (MRL) -> Limite Maximale de Résidus (LMR).'
      },
      {
        nivel: 'Nivel 3 - Negociación Agroexportadora y Auditorías Internacionales (Expresión y Transferencia)',
        descripcion: 'Interacción con auditores de sellos internacionales (GlobalG.A.P., Rainforest Alliance, Fairtrade / Commerce Équitable) e importadores de la Unión Europea y Norteamérica. Ej: Certificado Fitosanitario -> Phytosanitary Certificate -> Certificat Phytosanitaire; Trazabilidad desde el lote -> Traceability from farm to fork -> Traçabilité de la ferme à la table.'
      }
    ]
  },
  fase4: {
    titulo: '4. Estructura GFPI del SENA (Guía de Aprendizaje Última Versión)',
    subtitulo: 'Mapeo estricto del formato institucional GFPI-F-135',
    detalles: [
      {
        seccion: '1. Identificación de la Guía de Aprendizaje',
        descripcion: 'Datos administrativos: Programa de Formación, Código de Ficha, Proyecto Formativo, Fase del Proyecto (Análisis, Planeación, Ejecución o Evaluación), Actividad de Proyecto, Competencia, RAPs asociados y Duración total en horas de trabajo directo e independiente.'
      },
      {
        seccion: '2. Presentación',
        descripcion: 'Introducción motivacional redactada en tono empático y estimulante (Principio DUA I). Conecta el objeto de aprendizaje con el valor económico, ambiental y social de la actividad agropecuaria en el territorio colombiano y los mercados globales.'
      },
      {
        seccion: '3. Formulación de las Actividades de Aprendizaje',
        descripcion: 'Secuencia didáctica FPI: 3.1 Actividades de Reflexión Inicial (problematización individual y vivencial sin calificación previa); 3.2 Actividades de Contextualización e identificación de conocimientos necesarios (sondeo diagnóstico y contraste cognitivo); 3.3 Actividades de Apropiación del conocimiento (teoría y práctica: procesos cognitivos y procedimentales para asimilar el saber); 3.4 Actividades de Transferencia del conocimiento (aplicación directa en unidad productiva, parcela demostrativa o proyecto formativo).'
      },
      {
        seccion: '4. Actividades de Evaluación',
        descripcion: 'Matriz de valoración que relaciona Resultados de Aprendizaje, Criterios de Evaluación, Evidencias de Aprendizaje (Conocimiento, Desempeño, Producto), y sus Técnicas e Instrumentos de Evaluación (Rúbricas, Listas de Chequeo, Cuestionarios).'
      },
      {
        seccion: '5, 6 y 7. Glosario Trilingüe, Referentes Bibliográficos y Control del Documento',
        descripcion: 'Soporte terminológico en ES/EN/FR, citación normalizada bajo estilo APA 7ª edición, y trazabilidad de los diseñadores curriculares, revisores y aprobadores del centro agropecuario.'
      }
    ]
  }
};

export const MULTILINGUAL_GLOSSARY_PRESET: MultilingualTerm[] = [
  {
    id: 'term-1',
    category: 'Certificación',
    spanish: {
      term: 'Buenas Prácticas Agrícolas (BPA)',
      definition: 'Conjunto de principios, normas y recomendaciones técnicas aplicables a la producción, procesamiento y transporte de alimentos orientadas a cuidar la salud humana, el medio ambiente y la inocuidad.'
    },
    english: {
      term: 'Good Agricultural Practices (GAP)',
      phonetic: '/ɡʊd ˌæɡrɪˈkʌltʃərəl ˈpræktɪsɪz/',
      definition: 'Practices that address environmental, economic and social sustainability for on-farm processes, resulting in safe and quality food.'
    },
    french: {
      term: 'Bonnes Pratiques Agricoles (BPA)',
      phonetic: '/bɔn pʁa.tik a.ɡʁi.kɔl/',
      definition: 'Ensemble de pratiques visant la durabilité environnementale et la sécurité sanitaire des aliments à la ferme.'
    },
    agroContext: 'Requisito mandatorio para exportación de frutas y hortalizas bajo estándar GlobalG.A.P. versión 6.'
  },
  {
    id: 'term-2',
    category: 'Fitosanitario',
    spanish: {
      term: 'Manejo Integrado de Plagas (MIP)',
      definition: 'Estrategia que utiliza una combinación de métodos biológicos, culturales, físicos y químicos para reducir poblaciones de plagas por debajo del Umbral de Daño Económico (UDE).'
    },
    english: {
      term: 'Integrated Pest Management (IPM)',
      phonetic: '/ˈɪntɪɡreɪtɪd pɛst ˈmænɪdʒmənt/',
      definition: 'An ecosystem-based strategy that focuses on long-term prevention of pests through biological control, habitat manipulation, and cultural practices.'
    },
    french: {
      term: 'Protection Intégrée des Cultures (PIC)',
      phonetic: '/pʁɔ.tɛk.sjɔ̃ ɛ̃.te.ɡʁe de kyl.tyʁ/',
      definition: 'Prise en considération attentive de toutes les techniques de protection des plantes disponibles pour maintenir les ravageurs sous le seuil de nuisibilité.'
    },
    agroContext: 'Aplicable en monitoreo semanal de trips y ácaros en cultivo de aguacate Hass y broca en cafetales.'
  },
  {
    id: 'term-3',
    category: 'Certificación',
    spanish: {
      term: 'Límite Máximo de Residuos (LMR)',
      definition: 'Concentración máxima de residuo de plaguicida legalmente tolerada en o sobre alimentos o piensos basada en Buenas Prácticas Agrícolas.'
    },
    english: {
      term: 'Maximum Residue Limit (MRL)',
      phonetic: '/ˈmæksɪməm ˈrɛzɪdjuː ˈlɪmɪt/',
      definition: 'The maximum legally permissible concentration of a pesticide residue in food products or animal feed.'
    },
    french: {
      term: 'Limite Maximale de Résidus (LMR)',
      phonetic: '/li.mit mak.si.mal də ʁe.zi.dy/',
      definition: 'La concentration maximale admissible de résidus de pesticides autorisée légalement dans ou sur les denrées alimentaires.'
    },
    agroContext: 'Crucial para cumplir regulaciones sanitarias de la EFSA en la Unión Europea y EPA/FDA en Estados Unidos.'
  },
  {
    id: 'term-4',
    category: 'Poscosecha',
    spanish: {
      term: 'Trazabilidad (Rastreabilidad)',
      definition: 'Capacidad de seguir el rastro a través de todas las etapas de producción, transformación y distribución de un producto agropecuario.'
    },
    english: {
      term: 'Traceability (Track and Trace)',
      phonetic: '/ˌtreɪsəˈbɪlɪti/',
      definition: 'The ability to verify the history, location, or application of an item by means of documented recorded identifications.'
    },
    french: {
      term: 'Traçabilité',
      phonetic: '/tʁa.sa.bi.li.te/',
      definition: 'Capacité de retracer, à travers toutes les étapes de la production, de la transformation et de la distribution, le cheminement d’une denrée.'
    },
    agroContext: 'Codificación de lotes de cosecha con código QR o código GS1-128 para exportación marítima.'
  },
  {
    id: 'term-5',
    category: 'Agroecología',
    spanish: {
      term: 'Bioinsumo / Bioplaguicida',
      definition: 'Producto biológico formulado a base de microorganismos, extractos botánicos o macroorganismos benéficos para nutrición vegetal o control de patógenos.'
    },
    english: {
      term: 'Biopesticide / Bio-input',
      phonetic: '/ˌbaɪ.oʊˈpɛstɪsaɪd/',
      definition: 'Naturally occurring substances that control pests (biochemical pesticides), microorganisms that control pests (microbial pesticides), and plant-incorporated protectants.'
    },
    french: {
      term: 'Produit de Biocontrôle / Bio-intrant',
      phonetic: '/bjo.kɔ̃.tʁol / bjo.ɛ̃.tʁɑ̃/',
      definition: 'Agent biologique issu du milieu naturel utilisé pour protéger les végétaux contre les bioagresseurs.'
    },
    agroContext: 'Uso de Trichoderma harzianum y Beauveria bassiana en agricultura orgánica certificada.'
  },
  {
    id: 'term-6',
    category: 'Comercio Exterior',
    spanish: {
      term: 'Certificado Fitosanitario',
      definition: 'Documento oficial expedido por la ONPF (ICA en Colombia) que certifica que un cargamento de vegetales cumple con los requisitos fitosanitarios de importación.'
    },
    english: {
      term: 'Phytosanitary Certificate',
      phonetic: '/ˌfaɪtoʊˌsænɪˈtɛri sərˈtɪfɪkət/',
      definition: 'An official paper issued by a plant health authority certifying that plants or plant products are free from quarantine pests.'
    },
    french: {
      term: 'Certificat Phytosanitaire',
      phonetic: '/sɛʁ.ti.fi.ka fi.to.sa.ni.tɛʁ/',
      definition: 'Document officiel délivré par les autorités phytosanitaires attestant de l’absence d’organismes de quarantaine.'
    },
    agroContext: 'Inspección previa al embarque en puerto de Buenaventura o Cartagena para despachos internacionales.'
  }
];

export const METHODOLOGY_MATRIX_DATA: DuaMethodologyRow[] = [
  {
    id: 'mat-1',
    momentoSena: '3.1 Actividad de Reflexión Inicial',
    faseCodigo: '3.1',
    principioDua: 'Compromiso (Redes Afectivas)',
    pautaDua: 'Pauta 7.1: Optimizar la elección individual y la autonomía. Pauta 7.2: Optimizar la relevancia, el valor y la autenticidad.',
    estrategiaAgropecuaria: 'Presentación de caso real de rechazo en puerto europeo (Amberes) de un contenedor de 20 toneladas de fruta por detección de residuos no permitidos o plagas cuarentenarias. Los aprendices analizan el impacto económico y social en la asociación de pequeños productores locales, debatiendo en círculos socráticos rurales.',
    integracionMultilingue: {
      es: 'Inocuidad alimentaria y Cuarentena vegetal',
      en: 'Food Safety & Plant Quarantine Alert',
      fr: 'Sécurité sanitaire des aliments et Quarantaine végétale',
      usoTecnico: 'Interpretación del aviso de interceptación fitosanitaria del sistema RASFF (Rapid Alert System for Food and Feed).'
    },
    evidenciaAprendizaje: 'Evidencia de Conocimiento: Diagnóstico inicial de dilema ético-productivo en formato audio, texto o video-minuto.',
    tipoEvidencia: 'Conocimiento'
  },
  {
    id: 'mat-2',
    momentoSena: '3.2 Actividad de Contextualización e Identificación de Conocimientos',
    faseCodigo: '3.2',
    principioDua: 'Compromiso (Redes Afectivas)',
    pautaDua: 'Pauta 8.3: Fomentar la colaboración y la comunidad. Pauta 9.1: Promover expectativas y creencias que optimicen la motivación.',
    estrategiaAgropecuaria: 'Taller de cartografía social de la finca agropecuaria y autodiagnóstico de saberes empíricos vs. saberes técnicos sobre manejo de suelos, sanidad del cultivo y calibración de aspersores de espalda mediante una estación de chequeo participativo.',
    integracionMultilingue: {
      es: 'Muestreo de suelo y Calibración de equipos',
      en: 'Soil sampling & Knapsack sprayer calibration',
      fr: 'Échantillonnage du sol & Calibrage du pulvérisateur à dos',
      usoTecnico: 'Comparación de manuales del fabricante de boquillas (TeeJet, Albuz) en español, inglés y francés.'
    },
    evidenciaAprendizaje: 'Evidencia de Conocimiento: Mapa conceptual o infografía comparativa de la línea base técnico-productiva.',
    tipoEvidencia: 'Conocimiento'
  },
  {
    id: 'mat-3',
    momentoSena: '3.3.1 Actividad de Apropiación (Cognitiva - Saber)',
    faseCodigo: '3.3',
    principioDua: 'Representación (Redes de Reconocimiento)',
    pautaDua: 'Pauta 1: Múltiples opciones para la percepción. Pauta 2: Múltiples opciones para el lenguaje, expresiones matemáticas y símbolos.',
    estrategiaAgropecuaria: 'Modelado taxonómico de plagas y enfermedades mediante especímenes botánicos vivos en campo, lupas entomológicas 40x y tarjetas plastificadas de identificación rápida con códigos QR a audioguías en español e inglés.',
    integracionMultilingue: {
      es: 'Ciclo biológico del insecto y Umbral de Daño Económico (UDE)',
      en: 'Insect life cycle & Economic Injury Level (EIL)',
      fr: 'Cycle biologique des insectes & Seuil de nuisibilité économique',
      usoTecnico: 'Clasificación de agentes causales según códigos EPPO y fichas CABI internacionales.'
    },
    evidenciaAprendizaje: 'Evidencia de Conocimiento: Cuestionario interactivo o glosario técnico ilustrado de fitopatología aplicada.',
    tipoEvidencia: 'Conocimiento'
  },
  {
    id: 'mat-4',
    momentoSena: '3.3.2 Actividad de Apropiación (Procedimental - Saber Hacer)',
    faseCodigo: '3.3',
    principioDua: 'Acción y Expresión (Redes Estratégicas)',
    pautaDua: 'Pauta 4: Múltiples medios físicos de acción. Pauta 5: Múltiples herramientas para la construcción y la composición.',
    estrategiaAgropecuaria: 'Práctica de campo guiada en parcela demostrativa: Preparación de biofertilizante aeróbico tipo té de compost o caldo sulfocálcico, y calibración de caudal por método volumétrico (L/min) con cálculo de dosificación hectárea.',
    integracionMultilingue: {
      es: 'Dosificación de enmiendas y Hoja de Datos de Seguridad (FDS)',
      en: 'Dosage calculation & Safety Data Sheet (SDS)',
      fr: 'Calcul de dosage & Fiche de Données de Sécurité (FDS)',
      usoTecnico: 'Lectura de pictogramas del Sistema Globalmente Armonizado (SGA / GHS) y hojas técnicas trilingües.'
    },
    evidenciaAprendizaje: 'Evidencia de Desempeño: Lista de chequeo en tiempo real de la preparación de biopreparado y protocolo de calibración.',
    tipoEvidencia: 'Desempeño'
  },
  {
    id: 'mat-5',
    momentoSena: '3.4 Actividad de Transferencia del Conocimiento (Aplicación Real)',
    faseCodigo: '3.4',
    principioDua: 'Acción y Expresión (Redes Estratégicas)',
    pautaDua: 'Pauta 6: Múltiples opciones para las funciones ejecutivas (establecimiento de metas, planificación y monitoreo).',
    estrategiaAgropecuaria: 'Auditoría interna simulada en una finca campesina de la región. El aprendiz diseña e implementa el Plan de Manejo Integrado de Plagas y el Cuaderno de Explotación (Bitácora de Campo) bajo los estándares de GlobalG.A.P. IFA v6 o norma orgánica NOP/UE.',
    integracionMultilingue: {
      es: 'Plan de Manejo Integrado y Bitácora de Campo',
      en: 'Integrated Management Plan & Field Logbook (Farm Record)',
      fr: 'Plan de Protection Intégrée & Cahier d’enregistrement de l’exploitation',
      usoTecnico: 'Redacción del resumen ejecutivo en español con ficha de trazabilidad bilingüe (ES/EN) o trilingüe (ES/EN/FR).'
    },
    evidenciaAprendizaje: 'Evidencia de Producto: Cuaderno de campo diligenciado con plan fitosanitario y registro de trazabilidad exportable.',
    tipoEvidencia: 'Producto'
  },
  {
    id: 'mat-6',
    momentoSena: '4.0 Actividades de Evaluación Integral',
    faseCodigo: '4.0',
    principioDua: 'Compromiso, Representación y Expresión',
    pautaDua: 'Pauta 9.3: Desarrollar la autoevaluación y la reflexión. Pauta 5.1: Múltiples medios de comunicación.',
    estrategiaAgropecuaria: 'Evaluación auténtica y tripartita: Autoevaluación, Coevaluación entre pares en cuadrilla agrícola y Heteroevaluación del instructor técnico con rúbrica analítica DUA que permite sustentar vía informe técnico escrito, defensa oral en parcela o video-portafolio digital.',
    integracionMultilingue: {
      es: 'Rúbrica de evaluación de competencias agropecuarias',
      en: 'Agricultural Competency Rubric & Peer Review',
      fr: 'Grille d’évaluation des compétences agricoles & Évaluation par les pairs',
      usoTecnico: 'Uso de glosario técnico homologado en la sustentación del plan de inocuidad.'
    },
    evidenciaAprendizaje: 'Portafolio de Evidencias Integradas (Conocimiento + Desempeño + Producto) validado bajo criterios SENA.',
    tipoEvidencia: 'Producto'
  }
];

export const PRESET_GUIDES: LearningGuideModel[] = [
  {
    id: 'guia-aguacate-bpa',
    title: 'Guía de Aprendizaje: BPA y Manejo Integrado en Aguacate Hass para Agroexportación',
    identificacion: {
      denominacionPrograma: 'Tecnólogo en Gestión de Empresas Agropecuarias',
      codigoPrograma: '723121 Versión 102',
      nombreProyecto: 'Optimización de la productividad y sostenibilidad en sistemas agrícolas de ladera con destino agroexportador',
      faseProyecto: 'Ejecución: Implementación de protocolos técnicos, Buenas Prácticas Agrícolas y aseguramiento de la inocuidad',
      actividadProyecto: 'AP 3: Ejecutar planes de manejo integrado del cultivo, cosecha y poscosecha según normatividad técnica internacional',
      competencia: '270401017: Coordinar procesos de producción agrícola según manuales técnicos y normativa ecológica/BPA',
      resultadosAprendizaje: [
        'RAP 01: Monitorear el estado fitosanitario y nutricional del cultivo de aguacate Hass aplicando métodos biológicos y Buenas Prácticas Agrícolas.',
        'RAP 02: Diligenciar registros de trazabilidad y aplicar protocolos de inocuidad para certificación bajo estándar GlobalG.A.P. versión 6.',
        'RAP 03: Comunicar técnicamente información agronómica y fitosanitaria en contextos de inspección y comercio internacional en español, inglés y francés.'
      ],
      duracionGuiaHoras: 48,
      regional: 'Regional Antioquia / Caldas / Risaralda',
      centroFormacion: 'Centro de los Recursos Naturales Renovables La Salada / Centro para la Formación Cafetera'
    },
    presentacion: 'Estimado Aprendiz: El cultivo de aguacate Hass (Persea americana Mill) se ha consolidado como uno de los pilares del comercio agroexportador de Colombia hacia Europa y Norteamérica. No obstante, el acceso y permanencia en estos exigentes mercados no depende únicamente del volumen producido, sino del estricto cumplimiento de estándares de inocuidad alimentaria, protección ambiental, bienestar del trabajador rural y bioseguridad fitosanitaria (certificaciones GlobalG.A.P., Rainforest Alliance). Durante esta guía de aprendizaje, usted desarrollará habilidades técnicas indispensables para liderar el Manejo Integrado de Plagas (MIP), la nutrición orgánica/mineral equilibrada y la trazabilidad de lote. Con un enfoque de Diseño Universal para el Aprendizaje (DUA), usted contará con diversas rutas para explorar, experimentar y demostrar su saber tanto en campo como en escenarios de auditoría técnica internacional.',
    actividades: {
      reflexionInicial: {
        titulo: '3.1 Situación Problema: El dilema del contenedor bloqueado en el Puerto de Róterdam',
        descripcion: 'Imagine que su asociación campesina envía su primer contenedor marítimo refrigerado con 22 toneladas de aguacate Hass calibre 16 al puerto de Róterdam (Países Bajos). Al arribar, las autoridades fitosanitarias de la Unión Europea (EFSA) emiten una alerta sanitaria por detección de trazas de un pesticida no autorizado (clorpirifos a 0.08 mg/kg cuando el LMR es 0.01 mg/kg) y presencia viva de trips del género Scirtothrips. El cargamento es confiscado y la exportadora enfrenta pérdidas de más de 65.000 USD y la suspensión del certificado fitosanitario.',
        estrategiaDua: 'Múltiples opciones para la motivación (DUA Pauta 7): El caso se presenta mediante tres formatos alternativos: 1) Texto narrativo de la notificación oficial RASFF; 2) Audio podcast de 3 minutos dramatizado con la llamada del comprador internacional; 3) Gráfico infográfico del flujo logístico puerto-finca.',
        preguntaProblematizadora: '¿De qué manera una falla en el registro del cuaderno de campo o una mala calibración de la bomba de aspersión en la vereda puede arruinar la economía de una comunidad exportadora? ¿Qué rol juega la ética profesional del tecnólogo agropecuario en la inocuidad alimentaria?',
        multilinguismo: 'Conceptos clave analizados: "Maximum Residue Limit (MRL) / Limite Maximale de Résidus (LMR)", "Food Alert / Alerte Sanitaire".'
      },
      actividadesContextualizacion: {
        titulo: '3.2 Estaciones de autodiagnóstico: Saberes empíricos vs. Estándar técnico',
        descripcion: 'En cuadrillas de trabajo en la finca de formación SENA, los aprendices rotan por 3 estaciones agropecuarias: Estación 1: Identificación táctil y visual de estados fenológicos (floración, cuajado, engorde, cosecha) y daños foliares; Estación 2: Reconocimiento de equipos de protección personal (EPP) y boquillas de pulverización; Estación 3: Lectura de etiquetas de bioinsumos y análisis de pictogramas SGA/GHS.',
        estrategiaDua: 'DUA Pauta 8.3: Trabajo colaborativo con roles rotativos adaptados a fortalezas individuales (explorador de campo, registrador de datos, portavoz técnico). Soporte visual táctil para superar barreras lectoras.',
        actividadDiagnostica: 'Construcción de un mapa de flujo de riesgos de contaminación (física, química y microbiológica) del predio agrícola.',
        multilinguismo: 'Manejo de terminología en etiquetas técnicas: "Pre-harvest Interval (PHI) / Délai Avant Récolte (DAR)" y "Personal Protective Equipment (PPE) / Équipement de Protection Individuelle (EPI)".'
      },
      apropiacion: {
        titulo: '3.3 Actividades de Apropiación Cognitiva y Procedimental',
        subactividadesCognitivas: [
          '3.3.1 Matriz Fitosanitaria: Identificación de plagas limitantes para la exportación (Monalonion velezangeli, Heilipus lauri, Stenoma catenifer) y enemigos naturales (Chrysoperla carnea, parasitoides de la familia Trichogrammatidae).',
          '3.3.2 Cálculo de dosificación y calibración hidráulica: Determinación del volumen de caldo por hectárea (L/ha) según índice foliar y velocidad de avance del operario.',
          '3.3.3 Marco normativo GlobalG.A.P. IFA v6: Criterios de cumplimiento mayores, menores y recomendados aplicados a la bodega de agroquímicos y fuentes de agua.'
        ],
        subactividadesProcedimentales: [
          '3.3.4 Práctica de monitoreo en parcela: Muestreo sistemático de 10 árboles al azar por lote, evaluando brotes nuevos y frutos con hoja de registro.',
          '3.3.5 Preparación y aplicación de biofungicida a base de Trichoderma harzianum para prevención de pudrición radical (Phytophthora cinnamomi).',
          '3.3.6 Diligenciamiento de la bitácora de campo oficial conforme a la Resolución ICA 448 / 824.'
        ],
        estrategiaDua: 'DUA Pauta 1 y 2 (Representación): Guías de identificación con fotos de alta resolución en color real, audiodescripciones en código QR, fórmulas matemáticas de calibración desglosadas paso a paso con calculadoras físicas y digitales.',
        multilinguismo: 'Glosario técnico trilingüe integrado en el cuaderno de campo. Práctica de pronunciación de términos de inspección fitosanitaria.'
      },
      transferencia: {
        titulo: '3.4 Reto en Finca: Simulación de Auditoría de Certificación GlobalG.A.P.',
        descripcion: 'Los aprendices asumen el rol de equipo de calidad de una hacienda productora. Deben intervenir un lote de 2 hectáreas, levantar la línea base fitosanitaria, ejecutar la calibración de equipos, diseñar el plan de contingencia ambiental y presentar el Cuaderno de Explotación listo para auditoría.',
        estrategiaDua: 'DUA Pauta 5 y 6 (Acción y Expresión): Múltiples formatos de entrega: 1) Sustentación oral guiada in situ en el cultivo; 2) Video-recorrido técnico grabado en celular con subtítulos; 3) Carpeta de evidencias técnica física/digital con listas de verificación.',
        retoEnFinca: 'Demostrar en campo que el lote cumple con el 100% de los puntos críticos mayores de inocuidad y trazabilidad.',
        multilinguismo: 'El informe ejecutivo incluye un resumen trilingüe (ES / EN / FR) con la ficha técnica del lote para compradores internacionales.'
      }
    },
    evaluacion: [
      {
        criterio: 'Monitorea plagas y enfermedades del cultivo de aguacate de acuerdo con el protocolo técnico y las Buenas Prácticas Agrícolas.',
        evidencia: 'Cuestionario técnico y glosario trilingüe ilustrado de plagas cuarentenarias.',
        tipo: 'Conocimiento',
        tecnica: 'Formulación de preguntas / Test interactivo multimodal',
        instrumento: 'Cuestionario estructurado con soporte gráfico'
      },
      {
        criterio: 'Ejecuta la calibración del equipo de aspersión y la aplicación de bioinsumos cumpliendo normas de seguridad y medio ambiente.',
        evidencia: 'Práctica de calibración hidráulica y uso correcto de EPP en campo.',
        tipo: 'Desempeño',
        tecnica: 'Observación directa sistemática en parcela',
        instrumento: 'Lista de chequeo de desempeño procedimental'
      },
      {
        criterio: 'Diligencia los registros de trazabilidad y el plan de manejo fitosanitario conforme a la norma GlobalG.A.P.',
        evidencia: 'Cuaderno de campo / Bitácora de explotación con trazabilidad y plan MIP.',
        tipo: 'Producto',
        tecnica: 'Valoración de producto / Auditoría de registros',
        instrumento: 'Rúbrica analítica integral de producto'
      }
    ],
    glosario: MULTILINGUAL_GLOSSARY_PRESET,
    referentesBibliograficos: [
      'ICA. (2020). Resolución 0824 de 2020: Por la cual se establecen los requisitos para el registro ante el ICA de los predios productores de vegetales para la exportación en fresco. Instituto Colombiano Agropecuario.',
      'GlobalG.A.P. (2022). Integrated Farm Assurance (IFA) Standard for Fruit and Vegetables. Version 6.0. FoodPLUS GmbH, Cologne, Germany.',
      'Bernal, J. A., & Díaz, C. A. (2021). Manual técnico: Actualización tecnológica y Buenas Prácticas Agrícolas en el cultivo de aguacate (Persea americana). Corporación Colombiana de Investigación Agropecuaria (AGROSAVIA).',
      'CAST (Center for Agricultural Science and Technology). (2020). Universal Design for Learning in Agricultural Science Education. Ames, Iowa.'
    ],
    controlDocumento: {
      autor: 'Equipo de Instructores Metodólogos Agropecuarios',
      cargo: 'Instructores de Formación Profesional Integral',
      dependencia: 'Centro de los Recursos Naturales Renovables La Salada - SENA Regional Antioquia',
      fecha: 'Octubre de 2026'
    }
  },
  {
    id: 'guia-cafe-especial',
    title: 'Guía de Aprendizaje: Fermentación Controlada y Beneficio Ecológico de Café Especial',
    identificacion: {
      denominacionPrograma: 'Técnico en Producción de Café',
      codigoPrograma: '733115 Versión 101',
      nombreProyecto: 'Agregación de valor y estandarización de procesos de poscosecha para cafés diferenciados de alta calidad',
      faseProyecto: 'Ejecución: Estandarización de procesos de beneficio húmedo, fermentación y secado solar',
      actividadProyecto: 'AP 2: Controlar las variables de recolección selectiva, beneficio ecológico y fermentación anaeróbica del grano',
      competencia: '270401018: Beneficiar café de acuerdo con protocolos de calidad y manuales de procedimiento',
      resultadosAprendizaje: [
        'RAP 01: Realizar recolección selectiva de frutos en madurez óptima utilizando refractómetro óptico (grados Brix).',
        'RAP 02: Monitorear variables fisicoquímicas (pH, temperatura, ºBrix) durante la fermentación controlada.',
        'RAP 03: Describir perfiles organolépticos de taza y atributos sensoriales utilizando léxico técnico internacional en ES, EN y FR.'
      ],
      duracionGuiaHoras: 40,
      regional: 'Regional Huila / Quindío / Cauca',
      centroFormacion: 'Centro de Gestión y Desarrollo Sostenible Surcolombiano / Escuela Nacional del Café'
    },
    presentacion: 'Apreciado Aprendiz: Colombia es líder mundial en café arábica suave lavado. Sin embargo, la revolución de los "Cafés Especiales" (Specialty Coffee / Café de Spécialité) exige hoy dominancia de la fermentación anaeróbica, maceración carbónica y secado controlado para obtener notas en taza superiores a 85 puntos SCA (Specialty Coffee Association). Esta guía le brindará los fundamentos biocatáliticos y las herramientas operativas para transformar el cerezo en microlotes de alta cotización internacional, aplicando metodologías DUA para garantizar que cada aprendiz domine el manejo instrumental y sensorial.',
    actividades: {
      reflexionInicial: {
        titulo: '3.1 Dilema: ¿Por qué un microlote alcanza 50 USD/libra y otro es castigado en la cooperativa?',
        descripcion: 'Comparación sensorial a ciegas de dos cafés provenientes de la misma variedad Castillo: uno beneficiado tradicionalmente con sobrefermentación fenólica y otro con recolección selectiva a 22° Brix y fermentación anaeróbica controlada a 18°C.',
        estrategiaDua: 'Estimulación multisensorial directa (DUA Pauta 1 y 7): Degustación olfativa y gustativa, visualización de curvas de fermentación y debate en mesa redonda.',
        preguntaProblematizadora: '¿Cómo influye la microbiología de levaduras y bacterias lácticas en el valor final que recibe la familia caficultora?',
        multilinguismo: 'Términos de catación: "Cup Profile / Profil de Tasse", "Acidity / Acidité", "Body / Corps", "Aftertaste / Longueur en bouche".'
      },
      actividadesContextualizacion: {
        titulo: '3.2 Estaciones de medición física y química del grano',
        descripcion: 'Uso de refractómetros, termómetros sumergibles y cintas medidoras de pH en tanques de fermentación piloto.',
        estrategiaDua: 'Múltiples opciones para la percepción (DUA Pauta 1): Calibración con muestras reales, escalas de color pantone para cerezas maduras.',
        actividadDiagnostica: 'Registro de curvas de pH y temperatura en gráficos físicos y hojas de cálculo digitales.',
        multilinguismo: 'Vocabulario técnico: "Anaerobic Fermentation / Fermentation Anaérobie", "Honey Process / Procédé Honey".'
      },
      apropiacion: {
        titulo: '3.3 Prácticas de Beneficio y Fermentación Asistida',
        subactividadesCognitivas: [
          '3.3.1 Dinámica cinética de la degradación del mucílago por enzimas pectinolíticas.',
          '3.3.2 Parámetros críticos de inocuidad y ahorro hídrico en desmucilaginadores ecológicos (Becolsub / Ecomill).'
        ],
        subactividadesProcedimentales: [
          '3.3.3 Despulpado calibrado con cero daño mecánico al embrión.',
          '3.3.4 Inoculación de levaduras nativas seleccionadas (Saccharomyces cerevisiae) en biorreactores herméticos con trampa de gas.'
        ],
        estrategiaDua: 'Instrucciones paso a paso con video-tutoriales mudos subtitulados y fichas plastificadas con iconografía clara para el cuarto de beneficio.',
        multilinguismo: 'Manejo de fichas de exportación SCA (Specialty Coffee Association) y protocolos CQI (Coffee Quality Institute) en inglés y francés.'
      },
      transferencia: {
        titulo: '3.4 Reto: Procesamiento de un Microlote Demostrativo',
        descripcion: 'Cada equipo procesa 50 kg de café cereza, monitorea su curva fermentativa, realiza el secado en marquesina solar hasta 10.5% de humedad y elabora la ficha de trazabilidad para subasta internacional.',
        estrategiaDua: 'Opciones de divulgación (DUA Pauta 5): Presentación tipo infografía física, muestra comercial de grano con ficha técnica trilingüe o podcast explicativo.',
        retoEnFinca: 'Obtener un café libre de defectos con perfil diferenciado documentado.',
        multilinguismo: 'Ficha técnica en formato trilingüe con descripción de origen, altitud, variedad y notas de cata.'
      }
    },
    evaluacion: [
      {
        criterio: 'Mide y registra variables de fermentación empleando instrumentos de precisión.',
        evidencia: 'Curva gráfica de fermentación y reporte de variables fisicoquímicas.',
        tipo: 'Conocimiento',
        tecnica: 'Revisión de registros técnicos',
        instrumento: 'Cuestionario y análisis de gráficas'
      },
      {
        criterio: 'Opera equipos de beneficio ecológico aplicando normas de seguridad y conservación ambiental.',
        evidencia: 'Operación de despulpado y control de fermentador en taller de café.',
        tipo: 'Desempeño',
        tecnica: 'Observación directa en planta de beneficio',
        instrumento: 'Lista de chequeo de operación técnica'
      },
      {
        criterio: 'Presenta el microlote pergamino seco con trazabilidad y ficha técnica trilingüe.',
        evidencia: 'Microlote secado al 10-12% de humedad con ficha técnica de origen.',
        tipo: 'Producto',
        tecnica: 'Evaluación física y documental de muestra',
        instrumento: 'Rúbrica de calidad física y documental'
      }
    ],
    glosario: MULTILINGUAL_GLOSSARY_PRESET,
    referentesBibliograficos: [
      'Cenicafé. (2021). Manual del Cafetero Colombiano: Investigación y tecnología para la sostenibilidad de la caficultura. Tomo 3: Poscosecha y Calidad.',
      'SCA (Specialty Coffee Association). (2023). The Coffee Sensory and Cupping Standards. Specialty Coffee Association Publications.',
      'Puerta, G. I. (2018). Fundamentos de la fermentación y calidad del café suave colombiano. Boletín Técnico Cenicafé No. 43.'
    ],
    controlDocumento: {
      autor: 'Red de Conocimiento Agropecuario y Agroindustrial',
      cargo: 'Instructores de Café y Catación FPI',
      dependencia: 'SENA Regional Huila / Centro de Gestión y Desarrollo Sostenible',
      fecha: 'Octubre de 2026'
    }
  }
];
