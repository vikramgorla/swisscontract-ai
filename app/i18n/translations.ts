export type Locale = 'en' | 'de' | 'fr' | 'it';

export const translations = {
  en: {
    badge: 'No account needed · Try it now',
    h1: 'Understand any Swiss contract',
    h1_accent: 'in seconds',
    subtitle: 'Upload your employment, tenancy, insurance, or NDA contract — get a plain-English summary with red flags highlighted and Swiss law context.',
    upload_title: 'Drop your contract here',
    upload_browse: 'click to browse',
    upload_hint: 'PDF, Word (.docx) or .txt · Max 5MB · Max 20 pages',
    question_label: 'Your question',
    question_optional: '(optional)',
    analyse_btn: 'Analyse Contract',
    analysing: 'Analysing…',
    ask_btn: 'Ask',
    asking: 'Asking…',
    ask_question_label: 'Ask a question about this contract',
    results_reset: 'Analyse another contract',
    how_title: 'How it works',
    how_steps: [
      { title: 'Upload your contract', desc: 'PDF, Word, or plain text. Employment, rental, NDA, insurance — any Swiss contract.' },
      { title: 'AI analyses it', desc: 'Our AI reads your contract and extracts key terms, red flags, and Swiss law context in seconds.' },
      { title: 'Understand clearly', desc: 'Get a plain-English summary. No jargon. No account. Nothing stored.' },
    ],
    features: [
      { title: 'Red Flag Detection', desc: 'Unusual clauses, unfair terms, and risky commitments highlighted clearly.' },
      { title: 'Swiss Law Context', desc: 'Relevant Swiss legal context — OR, CO, tenancy law — explained in plain English.' },
      { title: 'Private & Secure', desc: 'Your document is analysed and immediately discarded. Nothing is stored.' },
    ],
    faq_title: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much does swisscontract.ai cost?', a: 'Try it without creating an account — no credit card required to get started.' },
      { q: 'What types of Swiss contracts can I analyse?', a: 'Employment contracts, tenancy agreements (Mietvertrag), NDAs, insurance contracts, and freelance contracts. PDF, Word (.docx), and .txt files are supported.' },
      { q: 'Is my contract kept private?', a: 'Yes. Your document is analysed and immediately discarded. Nothing is stored on our servers — privacy by design.' },
      { q: 'Can it analyse contracts in German or French?', a: 'Yes. Upload your contract in any language — German, French, Italian, or English. The AI detects the language and returns the results in plain English.' },
      { q: 'Is this legal advice?', a: 'No. swisscontract.ai provides informational analysis only. For binding legal advice, consult a qualified Swiss lawyer.' },
    ],
    footer_tagline: 'AI-powered contract analysis',
    footer_disclaimer: 'For informational purposes only. Not legal advice.',
    footer_built: '🇨🇭 Built in Switzerland',
    footer_private: 'Private by design',
    built_in: 'Built in Switzerland',
    error_short: 'Contract text is too short or empty. Please upload a valid contract document.',
    error_network: 'Network error. Please check your connection and try again.',
    file_change: 'Click to change file',
    analysing_time: 'This usually takes 10–20 seconds',
    question_placeholder_fallback: 'Ask a question about this contract…',
    results_language_label: 'Results language',
    upload_change: 'Click to change file',
    upload_time: 'This usually takes 10–20 seconds',
    progress_uploading: 'Uploading document…',
    progress_extracting: 'Extracting text…',
    progress_reading: 'Reading contract…',
    progress_identifying: 'Identifying clauses…',
    progress_redflags: 'Checking for red flags…',
    progress_swiss: 'Applying Swiss law context…',
    progress_clearing: 'Clearing document from memory…',
    progress_finalising: 'Finalising analysis…',
    progress_done: 'Done!',
    typewriter_examples: [
      "Do I need additional insurance for this contract?",
      "Can my employer terminate me during probation?",
      "Is my notice period legally compliant?",
      "Are there any unusual penalty clauses?",
      "What are my rights if the landlord sells the property?",
      "Is this non-compete clause enforceable in Switzerland?",
      "Can I sublet my apartment under this agreement?",
    ],
  },
  de: {
    badge: 'Kein Konto nötig · Jetzt ausprobieren',
    h1: 'Jeden Schweizer Vertrag verstehen',
    h1_accent: 'in Sekunden',
    subtitle: 'Laden Sie Ihren Arbeits-, Miet-, Versicherungs- oder NDA-Vertrag hoch — erhalten Sie eine verständliche Zusammenfassung mit hervorgehobenen Risiken und Schweizer Rechtskontext.',
    upload_title: 'Vertrag hier ablegen',
    upload_browse: 'zum Durchsuchen klicken',
    upload_hint: 'PDF, Word (.docx) oder .txt · Max. 5 MB · Max. 20 Seiten',
    question_label: 'Ihre Frage',
    question_optional: '(optional)',
    analyse_btn: 'Vertrag analysieren',
    analysing: 'Wird analysiert…',
    ask_btn: 'Fragen',
    asking: 'Wird gefragt…',
    ask_question_label: 'Stellen Sie eine Frage zu diesem Vertrag',
    results_reset: 'Einen weiteren Vertrag analysieren',
    how_title: 'So funktioniert es',
    how_steps: [
      { title: 'Vertrag hochladen', desc: 'PDF, Word oder Text. Arbeits-, Miet-, NDA-, Versicherungsvertrag — jeder Schweizer Vertrag.' },
      { title: 'KI analysiert ihn', desc: 'Unsere KI liest Ihren Vertrag und extrahiert in Sekunden wichtige Begriffe, Risiken und Schweizer Rechtskontext.' },
      { title: 'Klar verstehen', desc: 'Erhalten Sie eine verständliche Zusammenfassung. Kein Fachjargon. Kein Konto. Nichts gespeichert.' },
    ],
    features: [
      { title: 'Risikoerkennung', desc: 'Ungewöhnliche Klauseln, unfaire Bedingungen und riskante Verpflichtungen klar hervorgehoben.' },
      { title: 'Schweizer Rechtskontext', desc: 'Relevanter Schweizer Rechtskontext — OR, CO, Mietrecht — in verständlicher Sprache erklärt.' },
      { title: 'Privat & Sicher', desc: 'Ihr Dokument wird analysiert und sofort gelöscht. Es wird nichts gespeichert.' },
    ],
    faq_title: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Was kostet swisscontract.ai?', a: 'Sie können es ohne Konto ausprobieren — keine Kreditkarte erforderlich.' },
      { q: 'Welche Schweizer Verträge kann ich analysieren?', a: 'Arbeitsverträge, Mietverträge, NDAs, Versicherungsverträge und Freelancer-Verträge. PDF, Word (.docx) und .txt werden unterstützt.' },
      { q: 'Bleibt mein Vertrag privat?', a: 'Ja. Ihr Dokument wird analysiert und sofort gelöscht. Es wird nichts auf unseren Servern gespeichert.' },
      { q: 'Kann es Verträge auf Deutsch oder Französisch analysieren?', a: 'Ja. Laden Sie Ihren Vertrag in beliebiger Sprache hoch. Die KI erkennt die Sprache und gibt die Ergebnisse in der gewählten Sprache zurück.' },
      { q: 'Ist das Rechtsberatung?', a: 'Nein. swisscontract.ai liefert nur informative Analysen. Für verbindliche Rechtsberatung wenden Sie sich an einen Schweizer Anwalt.' },
    ],
    footer_tagline: 'KI-gestützte Vertragsanalyse',
    footer_disclaimer: 'Nur zu Informationszwecken. Keine Rechtsberatung.',
    footer_built: '🇨🇭 In der Schweiz entwickelt',
    footer_private: 'Datenschutz by Design',
    built_in: 'In der Schweiz entwickelt',
    error_short: 'Vertragstext ist zu kurz oder leer. Bitte laden Sie ein gültiges Vertragsdokument hoch.',
    error_network: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.',
    file_change: 'Zum Ändern klicken',
    analysing_time: 'Dies dauert normalerweise 10–20 Sekunden',
    question_placeholder_fallback: 'Stellen Sie eine Frage zu diesem Vertrag…',
    results_language_label: 'Ergebnissprache',
    upload_change: 'Zum Ändern klicken',
    upload_time: 'Dies dauert normalerweise 10–20 Sekunden',
    progress_uploading: 'Dokument wird hochgeladen…',
    progress_extracting: 'Text wird extrahiert…',
    progress_reading: 'Vertrag wird gelesen…',
    progress_identifying: 'Klauseln werden identifiziert…',
    progress_redflags: 'Risiken werden geprüft…',
    progress_swiss: 'Schweizer Rechtskontext wird angewendet…',
    progress_clearing: 'Dokument wird aus dem Speicher gelöscht…',
    progress_finalising: 'Analyse wird abgeschlossen…',
    progress_done: 'Fertig!',
    typewriter_examples: [
      "Benötige ich eine zusätzliche Versicherung für diesen Vertrag?",
      "Kann mein Arbeitgeber mich während der Probezeit kündigen?",
      "Ist meine Kündigungsfrist rechtskonform?",
      "Gibt es ungewöhnliche Strafklauseln?",
      "Was sind meine Rechte, wenn der Vermieter die Wohnung verkauft?",
      "Ist diese Konkurrenzklausel in der Schweiz durchsetzbar?",
      "Kann ich meine Wohnung gemäss diesem Vertrag untervermieten?",
    ],
  },
  fr: {
    badge: 'Sans compte · Essayez maintenant',
    h1: 'Comprenez tout contrat suisse',
    h1_accent: 'en quelques secondes',
    subtitle: "Déposez votre contrat de travail, bail, assurance ou NDA — obtenez un résumé clair avec les points d'attention et le contexte juridique suisse.",
    upload_title: 'Déposez votre contrat ici',
    upload_browse: 'cliquez pour parcourir',
    upload_hint: 'PDF, Word (.docx) ou .txt · Max 5 Mo · Max 20 pages',
    question_label: 'Votre question',
    question_optional: '(optionnel)',
    analyse_btn: 'Analyser le contrat',
    analysing: 'Analyse en cours…',
    ask_btn: 'Demander',
    asking: 'En cours…',
    ask_question_label: 'Posez une question sur ce contrat',
    results_reset: 'Analyser un autre contrat',
    how_title: 'Comment ça marche',
    how_steps: [
      { title: 'Déposez votre contrat', desc: 'PDF, Word ou texte. Travail, bail, NDA, assurance — tout contrat suisse.' },
      { title: "L'IA l'analyse", desc: 'Notre IA lit votre contrat et extrait en quelques secondes les termes clés, les risques et le contexte juridique suisse.' },
      { title: 'Comprenez clairement', desc: "Obtenez un résumé en langage clair. Sans jargon. Sans compte. Rien n'est stocké." },
    ],
    features: [
      { title: 'Détection des risques', desc: 'Clauses inhabituelles, conditions injustes et engagements risqués clairement mis en évidence.' },
      { title: 'Contexte juridique suisse', desc: 'Contexte juridique suisse pertinent — CO, droit du bail — expliqué en langage clair.' },
      { title: 'Privé & Sécurisé', desc: "Votre document est analysé puis immédiatement supprimé. Rien n'est stocké." },
    ],
    faq_title: 'Questions fréquentes',
    faqs: [
      { q: 'Combien coûte swisscontract.ai ?', a: 'Essayez sans créer de compte — aucune carte de crédit requise.' },
      { q: 'Quels types de contrats suisses puis-je analyser ?', a: "Contrats de travail, baux, NDAs, contrats d'assurance et contrats freelance. PDF, Word (.docx) et .txt sont supportés." },
      { q: 'Mon contrat reste-t-il privé ?', a: "Oui. Votre document est analysé puis immédiatement supprimé. Rien n'est stocké sur nos serveurs." },
      { q: 'Peut-il analyser des contrats en allemand ou en italien ?', a: "Oui. Déposez votre contrat dans n'importe quelle langue. L'IA détecte la langue et retourne les résultats dans la langue choisie." },
      { q: 'Est-ce un conseil juridique ?', a: 'Non. swisscontract.ai fournit uniquement une analyse informative. Pour un conseil juridique contraignant, consultez un avocat suisse qualifié.' },
    ],
    footer_tagline: 'Analyse de contrats par IA',
    footer_disclaimer: 'À titre informatif uniquement. Pas de conseil juridique.',
    footer_built: '🇨🇭 Conçu en Suisse',
    footer_private: 'Confidentialité by design',
    built_in: 'Conçu en Suisse',
    error_short: 'Le texte du contrat est trop court ou vide. Veuillez télécharger un document contractuel valide.',
    error_network: 'Erreur réseau. Veuillez vérifier votre connexion.',
    file_change: 'Cliquer pour changer le fichier',
    analysing_time: 'Cela prend généralement 10 à 20 secondes',
    question_placeholder_fallback: 'Posez une question sur ce contrat…',
    results_language_label: 'Langue des résultats',
    upload_change: 'Cliquer pour changer le fichier',
    upload_time: 'Cela prend généralement 10 à 20 secondes',
    progress_uploading: 'Téléchargement du document…',
    progress_extracting: 'Extraction du texte…',
    progress_reading: 'Lecture du contrat…',
    progress_identifying: 'Identification des clauses…',
    progress_redflags: "Vérification des points d'attention…",
    progress_swiss: 'Application du contexte juridique suisse…',
    progress_clearing: 'Suppression du document de la mémoire…',
    progress_finalising: "Finalisation de l'analyse…",
    progress_done: 'Terminé !',
    typewriter_examples: [
      "Ai-je besoin d'une assurance supplémentaire pour ce contrat ?",
      "Mon employeur peut-il me licencier pendant la période d'essai ?",
      "Mon délai de préavis est-il légalement conforme ?",
      "Y a-t-il des clauses pénales inhabituelles ?",
      "Quels sont mes droits si le propriétaire vend le bien ?",
      "Cette clause de non-concurrence est-elle applicable en Suisse ?",
      "Puis-je sous-louer mon appartement selon ce contrat ?",
    ],
  },
  it: {
    badge: 'Senza account · Prova ora',
    h1: 'Comprendi qualsiasi contratto svizzero',
    h1_accent: 'in pochi secondi',
    subtitle: 'Carica il tuo contratto di lavoro, affitto, assicurazione o NDA — ottieni un riassunto chiaro con i rischi evidenziati e il contesto giuridico svizzero.',
    upload_title: 'Trascina qui il tuo contratto',
    upload_browse: 'clicca per sfogliare',
    upload_hint: 'PDF, Word (.docx) o .txt · Max 5 MB · Max 20 pagine',
    question_label: 'La tua domanda',
    question_optional: '(opzionale)',
    analyse_btn: 'Analizza il contratto',
    analysing: 'Analisi in corso…',
    ask_btn: 'Chiedi',
    asking: 'In corso…',
    ask_question_label: 'Fai una domanda su questo contratto',
    results_reset: 'Analizza un altro contratto',
    how_title: 'Come funziona',
    how_steps: [
      { title: 'Carica il contratto', desc: 'PDF, Word o testo. Lavoro, affitto, NDA, assicurazione — qualsiasi contratto svizzero.' },
      { title: "L'IA lo analizza", desc: 'La nostra IA legge il contratto ed estrae in pochi secondi i termini chiave, i rischi e il contesto giuridico svizzero.' },
      { title: 'Comprendi chiaramente', desc: 'Ottieni un riassunto in linguaggio semplice. Niente gergo. Nessun account. Nulla viene salvato.' },
    ],
    features: [
      { title: 'Rilevamento dei rischi', desc: 'Clausole insolite, condizioni inique e impegni rischiosi evidenziati chiaramente.' },
      { title: 'Contesto giuridico svizzero', desc: 'Contesto giuridico svizzero rilevante — CO, diritto locativo — spiegato in linguaggio chiaro.' },
      { title: 'Privato & Sicuro', desc: 'Il documento viene analizzato e immediatamente eliminato. Nulla viene salvato.' },
    ],
    faq_title: 'Domande frequenti',
    faqs: [
      { q: 'Quanto costa swisscontract.ai?', a: 'Provalo senza creare un account — nessuna carta di credito richiesta.' },
      { q: 'Quali tipi di contratti svizzeri posso analizzare?', a: 'Contratti di lavoro, affitti, NDA, contratti assicurativi e contratti freelance. Supporta PDF, Word (.docx) e .txt.' },
      { q: 'Il mio contratto rimane privato?', a: 'Sì. Il documento viene analizzato e immediatamente eliminato. Nulla viene salvato sui nostri server.' },
      { q: 'Può analizzare contratti in tedesco o francese?', a: "Sì. Carica il contratto in qualsiasi lingua. L'IA rileva la lingua e restituisce i risultati nella lingua scelta." },
      { q: 'È una consulenza legale?', a: 'No. swisscontract.ai fornisce solo analisi informative. Per una consulenza legale vincolante, consulta un avvocato svizzero qualificato.' },
    ],
    footer_tagline: 'Analisi contratti con IA',
    footer_disclaimer: 'Solo a scopo informativo. Non è una consulenza legale.',
    footer_built: '🇨🇭 Sviluppato in Svizzera',
    footer_private: 'Privacy by design',
    built_in: 'Sviluppato in Svizzera',
    error_short: 'Il testo del contratto è troppo breve o vuoto. Carica un documento contrattuale valido.',
    error_network: 'Errore di rete. Controlla la connessione.',
    file_change: 'Clicca per cambiare file',
    analysing_time: 'Di solito richiede 10-20 secondi',
    question_placeholder_fallback: 'Fai una domanda su questo contratto…',
    results_language_label: 'Lingua dei risultati',
    upload_change: 'Clicca per cambiare file',
    upload_time: 'Di solito richiede 10-20 secondi',
    progress_uploading: 'Caricamento documento…',
    progress_extracting: 'Estrazione testo…',
    progress_reading: 'Lettura del contratto…',
    progress_identifying: 'Identificazione delle clausole…',
    progress_redflags: 'Verifica dei rischi…',
    progress_swiss: 'Applicazione del contesto giuridico svizzero…',
    progress_clearing: 'Cancellazione del documento dalla memoria…',
    progress_finalising: "Finalizzazione dell'analisi…",
    progress_done: 'Fatto!',
    typewriter_examples: [
      "Ho bisogno di un'assicurazione aggiuntiva per questo contratto?",
      "Il mio datore di lavoro può licenziarmi durante il periodo di prova?",
      "Il mio periodo di preavviso è legalmente conforme?",
      "Ci sono clausole penali insolite?",
      "Quali sono i miei diritti se il proprietario vende l'immobile?",
      "Questa clausola di non concorrenza è applicabile in Svizzera?",
      "Posso subaffittare il mio appartamento secondo questo contratto?",
    ],
  },
} as const;

// TranslationKeys is a structural type with string values (not literal types)
// to allow all locale translations to be assignable to it.
export type TranslationKeys = {
  badge: string;
  h1: string;
  h1_accent: string;
  subtitle: string;
  upload_title: string;
  upload_browse: string;
  upload_hint: string;
  question_label: string;
  question_optional: string;
  analyse_btn: string;
  analysing: string;
  ask_btn: string;
  asking: string;
  ask_question_label: string;
  results_reset: string;
  how_title: string;
  how_steps: ReadonlyArray<{ readonly title: string; readonly desc: string }>;
  features: ReadonlyArray<{ readonly title: string; readonly desc: string }>;
  faq_title: string;
  faqs: ReadonlyArray<{ readonly q: string; readonly a: string }>;
  footer_tagline: string;
  footer_disclaimer: string;
  footer_built: string;
  footer_private: string;
  built_in: string;
  error_short: string;
  error_network: string;
  file_change: string;
  analysing_time: string;
  question_placeholder_fallback: string;
  results_language_label: string;
  upload_change: string;
  upload_time: string;
  progress_uploading: string;
  progress_extracting: string;
  progress_reading: string;
  progress_identifying: string;
  progress_redflags: string;
  progress_swiss: string;
  progress_clearing: string;
  progress_finalising: string;
  progress_done: string;
  typewriter_examples: ReadonlyArray<string>;
};
