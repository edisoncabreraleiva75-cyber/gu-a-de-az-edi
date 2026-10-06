import {
  PEDAGOGICAL_REASONING,
  METHODOLOGY_MATRIX_DATA,
  PRESET_GUIDES,
  LearningGuideModel
} from '../data/curriculumData';

export function generateFullMarkdownReport(activeGuide: LearningGuideModel = PRESET_GUIDES[0]): string {
  const guide = activeGuide;

  return `### 1. RAZONAMIENTO PASO A PASO (<razonamiento_pedagogico>)

#### Fase 1: Análisis Curricular Agropecuario (Modelo FPI - SENA)
El modelo de Formación Profesional Integral (FPI) del SENA se estructura sobre la formación por competencias laborales, integrando armónicamente el Saber (cognitivo), el Saber Hacer (procedimental) y el Saber Ser (actitudinal y axiológico). En el sector agropecuario, esta dinámica no puede operar en un plano meramente memorístico; debe anclarse en realidades biofísicas, agroecológicas y socioeconómicas tangibles de la ruralidad colombiana.

1. **Descomposición de la Competencia Rector Agropecuaria:**
   - *Competencia seleccionada:* **270401017 - Coordinar procesos de producción agrícola según manuales técnicos y normativa ecológica / Buenas Prácticas Agrícolas (BPA)**.
   - *Dimensión Cognitiva (Saber):* Fisiología vegetal del cultivo (ej. estados fenológicos del aguacate Hass o café arábica), dinámica de poblaciones de insectos plaga, microbiología de suelos, modos de acción de bioinsumos y agroquímicos, cálculo estequiométrico de fertilización, y comprensión de Límites Máximos de Residuos (LMR / MRL) exigidos por mercados de destino.
   - *Dimensión Procedimental (Saber Hacer):* Muestreo sistemático de plagas en campo, calibración volumétrica de aspersores de espalda y motorizados, biofabricación de caldos minerales y biofertilizantes aeróbicos, ejecución de podas sanitarias y estructurales, y diligenciamiento riguroso de cuadernos de campo y bitácoras de trazabilidad.
   - *Dimensión Actitudinal (Saber Ser):* Responsabilidad bioética con la inocuidad alimentaria, compromiso irrenunciable con la protección del operario rural y el medio ambiente (uso estricto de EPP, respeto de periodos de carencia y reentrada), honestidad en los registros de auditoría y solidaridad comunitaria en asociaciones campesinas.

2. **Articulación de Resultados de Aprendizaje (RAPs):**
   - **RAP 01:** Monitorear el estado fitosanitario y nutricional del cultivo siguiendo protocolos de manejo integrado y Buenas Prácticas Agrícolas.
   - **RAP 02:** Diligenciar registros de trazabilidad y aplicar protocolos de inocuidad requeridos para la certificación de predios exportadores bajo estándares como GlobalG.A.P. v6 y normativas ICA.
   - **RAP 03:** Comunicar técnicamente información agronómica y fitosanitaria en contextos de inspección y comercio internacional en español, inglés y francés.

---

#### Fase 2: Articulación DUA / UDL en Ambientes de Aprendizaje Agropecuarios
La población rural y los aprendices del sector agropecuario presentan una marcada diversidad: edades heterogéneas, variados niveles de alfabetización formal, saberes campesinos empíricos ancestrales, y ambientes formativos abiertos (fincas, lotes demostrativos, bodegas de poscosecha) expuestos a variables climáticas. El Diseño Universal para el Aprendizaje (DUA) se convierte en el garante de la equidad y la permanencia formativa.

1. **Principio I: Múltiples formas de Compromiso (Redes Afectivas - El "Por qué" del aprendizaje):**
   - *Pauta 7 (Opciones para captar el interés):* Se conecta el aprendizaje con situaciones reales de alto impacto económico para el productor rural. Por ejemplo, plantear el caso auténtico de la interdicción de un cargamento de exportación en el puerto de Róterdam o Hamburgo por residuos de pesticidas o presencia de plagas cuarentenarias. El aprendiz experimenta la relevancia directa de su labor.
   - *Pauta 8 (Opciones para mantener el esfuerzo y la persistencia):* Se organizan cuadrillas colaborativas de trabajo en campo con roles rotativos y complementarios (auditor de inocuidad, muestreador fitosanitario, calibrador de equipos, registrador documental), evitando que las dificultades individuales en lectura o cálculo aíslen al aprendiz.
   - *Pauta 9 (Opciones para la autorregulación):* Empleo de rúbricas transparentes y listas de autoverificación en parcela antes de someter el lote a evaluación del instructor.

2. **Principio II: Múltiples formas de Representación (Redes de Reconocimiento - El "Qué" del aprendizaje):**
   - *Pauta 1 (Opciones para la percepción):* La enseñanza no se limita a documentos PDF o exposiciones magistrales. Se emplean muestras botánicas y entomológicas vivas en campo (tallos con antracnosis, lupas de campo 40x), infografías laminadas resistentes al agua y al barro, videocápsulas cortas descargables para consulta offline en áreas rurales sin señal de internet, y códigos QR en parcelas demostrativas.
   - *Pauta 2 (Opciones para el lenguaje y los símbolos):* Acompañamiento de cada término técnico con iconografía estandarizada internacional (pictogramas del Sistema Globalmente Armonizado - SGA/GHS), diagramas de flujo visuales y glosarios trilingües contextualizados.
   - *Pauta 3 (Opciones para la comprensión):* Desglose escalonado de operaciones complejas, como la calibración hidráulica mediante guías nemotécnicas y fórmulas visuales de tres pasos.

3. **Principio III: Múltiples formas de Acción y Expresión (Redes Estratégicas - El "Cómo" del aprendizaje):**
   - *Pauta 4 (Opciones para la acción física):* Prácticas manipulativas directas en campo, garantizando herramientas ergonómicas accesibles y adaptaciones para aprendices con limitaciones físicas o sensoriales.
   - *Pauta 5 (Opciones para la expresión y la comunicación):* Se flexibilizan las vías para demostrar la competencia adquirida: el aprendiz puede sustentar mediante una demostración práctica guiada en el cultivo, un video explicativo grabado en su teléfono móvil, un podcast en audio o un informe técnico escrito.
   - *Pauta 6 (Opciones para las funciones ejecutivas):* Suministro de plantillas prediseñadas para la bitácora de campo, listas de verificación de puntos críticos de control y guías de planificación semanal de actividades agropecuarias.

---

#### Fase 3: Estrategia Lingüística Integrada (Español, Inglés, Francés)
El sector agropecuario colombiano tiene una vocación exportadora indiscutible (cafés especiales, aguacate Hass, cacao fino de aroma, flores, pasifloras). La inserción de lenguas extranjeras no debe ser un apéndice gramatical abstracto, sino una herramienta de empoderamiento técnico y comercial.

1. **Nivel 1 - Identificación Fitosanitaria y Técnica Básica (Español - Inglés - Francés):**
   - Integración léxica directa en actividades de apropiación:
     * *Español:* Manejo Integrado de Plagas (MIP) | Límite Máximo de Residuos (LMR) | Periodo de Carencia (PC).
     * *Inglés:* Integrated Pest Management (IPM) | Maximum Residue Limit (MRL) | Pre-harvest Interval (PHI).
     * *Francés:* Protection Intégrée des Cultures (PIC) | Limite Maximale de Résidus (LMR) | Délai Avant Récolte (DAR).
2. **Nivel 2 - Comprensión e Interpretación Documental (Normatividad y Fichas Técnicas):**
   - Lectura aplicada de Hojas de Datos de Seguridad (SDS / FDS), fichas de bioinsumos y certificados de análisis químico del suelo y agua emitidos por laboratorios acreditados internacionales.
3. **Nivel 3 - Negociación, Trazabilidad y Auditorías Internacionales:**
   - Simulación de diálogos con inspectores y compradores de la Unión Europea y Norteamérica. Elaboración de la ficha técnica comercial del producto (Technical Data Sheet / Fiche Technique du Produit) y certificados fitosanitarios (Phytosanitary Certificate / Certificat Phytosanitaire).

---

#### Fase 4: Estructura GFPI del SENA (Mapeo de la Guía de Aprendizaje)
La guía se ajusta estrictamente al formato institucional vigente GFPI-F-135, asegurando el ciclo metodológico completo:
1. **Identificación de la Guía:** Localización curricular precisa (Programa, Proyecto, Fase, Actividad de Proyecto, Competencia y RAPs).
2. **Presentación:** Disparador motivacional redactado con lenguaje accesible y desafiante, conectando la profesión del aprendiz con el bienestar alimentario de la sociedad.
3. **Formulación de las Actividades de Aprendizaje:**
   - *3.1 Actividades de Reflexión Inicial:* Situación problematizadora auténtica que desestabiliza preconceptos y genera curiosidad sin calificar.
   - *3.2 Actividades de Contextualización e Identificación de Conocimientos:* Exploración diagnóstica de saberes empíricos previos para contrastarlos con el estándar técnico formal.
   - *3.3 Actividades de Apropiación del Conocimiento:* Adquisición rigurosa de conceptos (procesos cognitivos) y destrezas prácticas en taller/campo (procesos procedimentales).
   - *3.4 Actividades de Transferencia del Conocimiento:* Aplicación real e integradora en la unidad productiva, culminando en productos útiles para el proyecto formativo.
4. **Actividades de Evaluación:** Relación unívoca entre RAPs, Criterios de Evaluación, Evidencias (Conocimiento, Desempeño y Producto) y sus Instrumentos de Evaluación (Rúbricas DUA, Listas de Chequeo).
5. **Glosario de Términos (Trilingüe), Referentes Bibliográficos (APA 7ª ed.) y Control del Documento:** Rigor académico, trazabilidad pedagógica y soporte lingüístico.

---

### 2. MATRIZ METODOLÓGICA SENA-DUA AGROPECUARIA

| Momento Didáctico SENA | Principio DUA | Estrategia Agropecuaria Aplicada | Integración Multilingüe [ES / EN / FR] | Evidencia de Aprendizaje |
| :--- | :--- | :--- | :--- | :--- |
| **3.1 Actividad de Reflexión Inicial** | **Compromiso** *(Redes Afectivas)*<br>Pauta 7.2: Relevancia y autenticidad | Análisis de caso real: Notificación oficial del sistema RASFF europeo por interdicción en puerto de Róterdam de 20 toneladas de fruta por detección de plagas cuarentenarias o pesticidas fuera de norma. Debate grupal sobre el impacto económico en la asociación campesina. | **ES:** Alerta Sanitaria e Inocuidad<br>**EN:** Food Alert & Food Safety<br>**FR:** Alerte Sanitaire & Sécurité Sanitaire<br>*Uso:* Interpretación del aviso de interceptación de la autoridad aduanera. | **Evidencia de Conocimiento:** Diagnóstico reflexivo grupal o individual presentado en audio, infografía o video breve. |
| **3.2 Contextualización e Identificación de Conocimientos** | **Compromiso** *(Redes Afectivas)*<br>Pauta 8.3: Colaboración y comunidad | Estaciones de autodiagnóstico en finca: Comparación guiada de saberes campesinos empíricos vs. estándares de inocuidad en el almacenamiento de agroinsumos y calibración de equipos de espalda. | **ES:** Muestreo de suelo y Calibración<br>**EN:** Soil sampling & Sprayer calibration<br>**FR:** Échantillonnage du sol & Calibrage du pulvérisateur<br>*Uso:* Lectura de tablas de calibración de boquillas de aspersión. | **Evidencia de Conocimiento:** Matriz comparativa de saberes empíricos vs. criterios técnicos de Buenas Prácticas Agrícolas. |
| **3.3.1 Apropiación (Cognitiva - Saber)** | **Representación** *(Redes de Reconocimiento)*<br>Pauta 1: Opciones de percepción<br>Pauta 2: Lenguaje y símbolos | Identificación taxonómica de plagas y benéficos mediante especímenes vivos con lupas 40x, claves dicotómicas ilustradas y tarjetas laminadas resistentes al agua con códigos QR a audioguías en ES y EN. | **ES:** Umbral de Daño Económico (UDE)<br>**EN:** Economic Injury Level (EIL)<br>**FR:** Seuil de Nuisibilité Économique<br>*Uso:* Clasificación fitosanitaria según base de datos EPPO y CABI. | **Evidencia de Conocimiento:** Cuestionario técnico multimodal o glosario taxonómico ilustrado en campo. |
| **3.3.2 Apropiación (Procedimental - Saber Hacer)** | **Acción y Expresión** *(Redes Estratégicas)*<br>Pauta 4: Acción física<br>Pauta 5: Expresión fluida | Práctica guiada en parcela demostrativa: Preparación de biofertilizante aeróbico enriquecido y calibración hidráulica del equipo aspersor determinando caudal (L/min) y volumen de aplicación por hectárea. | **ES:** Hoja de Datos de Seguridad (FDS)<br>**EN:** Safety Data Sheet (SDS)<br>**FR:** Fiche de Données de Sécurité (FDS)<br>*Uso:* Interpretación de pictogramas SGA/GHS y dosis de aplicación. | **Evidencia de Desempeño:** Lista de chequeo procedimental en tiempo real de calibración y manejo seguro de bioinsumos. |
| **3.4 Transferencia del Conocimiento** | **Acción y Expresión** *(Redes Estratégicas)*<br>Pauta 6: Funciones ejecutivas y metas | Reto en Finca: Formulación e implementación del Plan de Manejo Integrado de Plagas (MIP) y apertura del Cuaderno de Explotación (Bitácora de Campo) para auditoría de certificación GlobalG.A.P. v6. | **ES:** Bitácora de Campo y Trazabilidad<br>**EN:** Field Logbook & Traceability<br>**FR:** Cahier d’enregistrement & Traçabilité<br>*Uso:* Elaboración de la ficha técnica trilingüe del lote agroexportable. | **Evidencia de Producto:** Cuaderno de explotación diligenciado y plan fitosanitario validado en parcela real. |
| **4.0 Actividades de Evaluación Integral** | **Compromiso, Representación y Expresión** *(DUA Tripartito)* | Evaluación auténtica 360°: Autoevaluación metacognitiva, coevaluación entre pares en cuadrilla agrícola y heteroevaluación con rúbrica analítica DUA multiformato (oral, video, maqueta o informe escrito). | **ES:** Rúbrica de evaluación por competencias<br>**EN:** Competency-based assessment rubric<br>**FR:** Grille d’évaluation des compétences<br>*Uso:* Defensa técnica del plan de inocuidad en sesión de cierre. | **Portafolio de Evidencias:** Compendio integral (Conocimiento, Desempeño y Producto) acreditado por el instructor. |

---

### 3. PLANTILLA OPERATIVA DE GUÍA DE APRENDIZAJE (ÚLTIMA VERSIÓN - GFPI-F-135)

#### 1. IDENTIFICACIÓN DE LA GUÍA DE APRENDIZAJE
- **Denominación del Programa de Formación:** ${guide.identificacion.denominacionPrograma}
- **Código del Programa de Formación:** ${guide.identificacion.codigoPrograma}
- **Nombre del Proyecto Formativo:** ${guide.identificacion.nombreProyecto}
- **Fase del Proyecto:** ${guide.identificacion.faseProyecto}
- **Actividad de Proyecto:** ${guide.identificacion.actividadProyecto}
- **Competencia:** ${guide.identificacion.competencia}
- **Resultados de Aprendizaje a Alcanzar:**
${guide.identificacion.resultadosAprendizaje.map(rap => `  * ${rap}`).join('\n')}
- **Duración de la Guía:** ${guide.identificacion.duracionGuiaHoras} Horas (Trabajo Directo e Independiente)
- **Regional:** ${guide.identificacion.regional}
- **Centro de Formación:** ${guide.identificacion.centroFormacion}

---

#### 2. PRESENTACIÓN
${guide.presentacion}

---

#### 3. FORMULACIÓN DE LAS ACTIVIDADES DE APRENDIZAJE

##### 3.1 Actividades de Reflexión Inicial
- **Título de la Actividad:** ${guide.actividades.reflexionInicial.titulo}
- **Descripción de la Situación Problematizadora:** ${guide.actividades.reflexionInicial.descripcion}
- **Pregunta Problematizadora Orientadora:** ${guide.actividades.reflexionInicial.preguntaProblematizadora}
- **Estrategia DUA Aplicada:** ${guide.actividades.reflexionInicial.estrategiaDua}
- **Componente Lingüístico (ES/EN/FR):** ${guide.actividades.reflexionInicial.multilinguismo}

##### 3.2 Actividades de Contextualización e Identificación de Conocimientos Necesarios para el Aprendizaje
- **Título de la Actividad:** ${guide.actividades.contextualizacion ? guide.actividades.contextualizacion.titulo : '3.2 Estaciones de autodiagnóstico en campo'}
- **Descripción Metodológica:** ${guide.actividades.contextualizacion ? guide.actividades.contextualizacion.descripcion : 'Diagnóstico participativo en estaciones agropecuarias.'}
- **Actividad Diagnóstica de Campo:** ${guide.actividades.contextualizacion ? guide.actividades.contextualizacion.actividadDiagnostica : 'Mapeo de riesgos de contaminación en parcela.'}
- **Estrategia DUA Aplicada:** ${guide.actividades.contextualizacion ? guide.actividades.contextualizacion.estrategiaDua : 'Trabajo cooperativo en cuadrillas con roles rotativos adaptados.'}
- **Componente Lingüístico (ES/EN/FR):** ${guide.actividades.contextualizacion ? guide.actividades.contextualizacion.multilinguismo : 'Interpretación de simbología en etiquetas técnicas internacionales.'}

##### 3.3 Actividades de Apropiación del Conocimiento (Conceptualización y Teorización)
- **Título de la Actividad:** ${guide.actividades.apropiacion.titulo}
- **Subactividades Cognitivas (Saber):**
${guide.actividades.apropiacion.subactividadesCognitivas.map(sub => `  * ${sub}`).join('\n')}
- **Subactividades Procedimentales (Saber Hacer):**
${guide.actividades.apropiacion.subactividadesProcedimentales.map(sub => `  * ${sub}`).join('\n')}
- **Estrategia DUA Aplicada:** ${guide.actividades.apropiacion.estrategiaDua}
- **Componente Lingüístico (ES/EN/FR):** ${guide.actividades.apropiacion.multilinguismo}

##### 3.4 Actividades de Transferencia del Conocimiento
- **Título de la Actividad:** ${guide.actividades.transferencia.titulo}
- **Reto Práctico en Unidad Productiva:** ${guide.actividades.transferencia.retoEnFinca}
- **Estrategia DUA Aplicada:** ${guide.actividades.transferencia.estrategiaDua}
- **Componente Lingüístico (ES/EN/FR):** ${guide.actividades.transferencia.multilinguismo}

---

#### 4. ACTIVIDADES DE EVALUACIÓN

| Criterios de Evaluación | Evidencias de Aprendizaje | Tipo de Evidencia | Técnicas e Instrumentos de Evaluación |
| :--- | :--- | :--- | :--- |
${guide.evaluacion.map(ev => `| ${ev.criterio} | ${ev.evidencia} | **${ev.tipo}** | **Técnica:** ${ev.tecnica}<br>**Instrumento:** ${ev.instrumento} |`).join('\n')}

---

#### 5. GLOSARIO DE TÉRMINOS TÉCNICOS (TRILINGÜE: ESPAÑOL - INGLÉS - FRANCÉS)

${guide.glosario.map(term => `
##### ${term.spanish.term} / ${term.english.term} / ${term.french.term}
- **Categoría:** \`${term.category}\`
- **Español:** ${term.spanish.definition}
- **Inglés:** *${term.english.term}* (${term.english.phonetic}) — ${term.english.definition}
- **Francés:** *${term.french.term}* (${term.french.phonetic}) — ${term.french.definition}
- **Contexto Agroexportador:** *${term.agroContext}*
`).join('\n')}

---

#### 6. REFERENTES BIBLIOGRÁFICOS (NORMA APA 7ª EDICIÓN)
${guide.referentesBibliograficos.map(ref => `* ${ref}`).join('\n')}

---

#### 7. CONTROL DEL DOCUMENTO
- **Autor / Diseñador Curricular:** ${guide.controlDocumento.autor}
- **Cargo:** ${guide.controlDocumento.cargo}
- **Dependencia y Centro:** ${guide.controlDocumento.dependencia}
- **Fecha de Elaboración / Actualización:** ${guide.controlDocumento.fecha}
`;
}
