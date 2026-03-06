export type Locale = 'en' | 'de' | 'fr' | 'it';

export const translations = {
  en: {
    badge: 'No account needed · Try it now',
    privacy_badge: 'Data never stored · Redact personal info before uploading',
    opensource_badge: 'Open source · Check the code',
    h1: 'Understand any Swiss contract',
    h1_accent: 'in seconds',
    subtitle: 'Upload your employment, tenancy, insurance, or NDA contract — get a plain-English summary with red flags highlighted and Swiss law context. Powered by Swiss AI.',
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
      { title: 'AI analyses it', desc: 'Apertus 70B — a Swiss-sovereign AI model hosted by Infomaniak — reads your contract and extracts key terms, red flags, and Swiss law context in seconds.' },
      { title: 'Understand clearly', desc: 'Get a plain-English summary. No jargon. No account. Nothing stored.' },
    ],
    features: [
      { title: 'Red Flag Detection', desc: 'Unusual clauses, unfair terms, and risky commitments highlighted clearly.' },
      { title: 'Swiss Law Context', desc: 'Relevant Swiss legal context — OR, CO, tenancy law — explained in plain English.' },
      { title: 'Private & Secure', desc: 'Your document is analysed and immediately discarded. Nothing is stored.' },
    ],
    faq_title: 'Frequently Asked Questions',
    faqs: [
      { q: 'How much does swisscontract.ai cost?', a: 'Use it without creating an account. No payment required to get started.' },
      { q: 'What types of Swiss contracts can I analyse?', a: 'Employment contracts, tenancy agreements (Mietvertrag), NDAs, insurance contracts, and freelance contracts. PDF, Word (.docx), and .txt files are supported.' },
      { q: 'Is my contract kept private?', a: 'Yes. Your contract is processed in memory and discarded immediately — never stored, never logged, never linked to you. All processing happens on Swiss servers operated by Infomaniak. We recommend redacting personal details before uploading as an extra precaution.' },
      { q: 'Can it analyse contracts in German or French?', a: 'Yes. Upload your contract in any language — German, French, Italian, or English. The AI detects the language and returns the results in plain English.' },
      { q: 'Is this legal advice?', a: 'No. swisscontract.ai provides informational analysis only. For binding legal advice, consult a qualified Swiss lawyer.' },
    ],
    footer_tagline: 'AI-powered contract analysis',
    footer_disclaimer: 'For informational purposes only. Not legal advice.',
    footer_built: '🇨🇭 Built in Switzerland',
    footer_private: 'Private by design',
    footer_privacy: 'Privacy Policy',
    footer_opensource: 'Open source',
    built_in: 'Built in Switzerland',
    meta_title: 'swisscontract.ai — Understand Any Swiss Contract in Seconds',
    meta_description: 'AI-powered contract analysis for Switzerland. Upload your employment contract, tenancy agreement, or NDA and get a plain-English summary with red flags highlighted.',
    html_lang: 'en',
    og_locale: 'en_CH',
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
    upload_tip: 'Tip: redact names, signatures and personal details before uploading',
    privacy_title: 'Your privacy, plainly stated',
    privacy_points: [
      'Your contract is sent directly to the AI for analysis and never written to any database or storage.',
      'We have no user accounts, no tracking of what you upload, and no way to link a document to a person.',
      'The analysis happens in memory and is discarded the moment your results are returned.',
      'We recommend redacting names, signatures and personal details before uploading — just to be safe.',
      'We built this to help people, not to collect data. That\'s it.',
    ],
    language_label: 'Language',
    typewriter_examples: [
      "Do I need additional insurance for this contract?",
      "Can my employer terminate me during probation?",
      "Is my notice period legally compliant?",
      "Are there any unusual penalty clauses?",
      "What are my rights if the landlord sells the property?",
      "Is this non-compete clause enforceable in Switzerland?",
      "Can I sublet my apartment under this agreement?",
    ],
    why_free_title: 'Why is this free?',
    why_free_p1: 'swisscontract.ai is free while we evaluate whether it\'s useful enough to sustain. We built this ourselves — just the two of us — as an experiment.',
    why_free_p2: 'If it grows, we\'ll find a way to cover costs — perhaps through partnerships with Swiss legal or insurance services, or a paid tier for heavy users. If it doesn\'t grow, we\'ll be honest about that too.',
    why_free_p3: 'No data sold. No hidden agenda. Just a tool we think Switzerland needs.',
    awareness_checkbox: 'I understand that even though swisscontract.ai does not store any data, I should not include personal information of third parties in documents I upload. If my contract contains personal data of other parties, I am responsible for informing them that their data was processed by an AI system.',
    badge_hosted: 'Hosted in Switzerland',
    badge_hosted_sub: 'AI runs on infrastructure in Switzerland',
    badge_swiss_ai: 'Swiss AI',
    badge_swiss_ai_sub: 'Powered by Apertus 70B',
    badge_zero_retention: 'Zero data retention',
    badge_zero_retention_sub: 'Your contract is never stored',
    badge_nfadp: 'Privacy-first',
    badge_nfadp_sub: 'Designed with Swiss data protection in mind',
    pp_title: 'Privacy Policy',
    pp_updated: 'Last updated: March 2026',
    pp_short_title: 'The short version',
    pp_short_body: 'We do not store your contracts, your questions, or your analysis results. Nothing you upload is written to a database. We have no user accounts and no way to link any document to any person. All AI processing happens on Swiss servers operated by Infomaniak.',
    pp_upload_title: 'What happens when you upload a contract',
    pp_upload_items: [
      'Your file is sent over HTTPS to our server.',
      'Text is extracted in memory and sent to the AI for analysis.',
      'The analysis result is returned to your browser.',
      'The extracted text is discarded immediately — it is never written to disk or any storage system.',
      'Your original file is never stored on our servers.',
    ],
    pp_ai_title: 'AI processing — Swiss infrastructure',
    pp_ai_items: [
      'All AI analysis runs on infrastructure operated by Infomaniak, a Swiss company headquartered in Geneva.',
      'We use the Apertus 70B model, hosted exclusively on Infomaniak\'s Swiss data centres.',
      'Infomaniak\'s AI service processes your contract text to generate the analysis. The text is sent over HTTPS and processed in real time.',
      'We use Infomaniak\'s infrastructure and AI services to power this tool. For details on how Infomaniak handles data in their AI products, refer to their privacy policy at infomaniak.com/en/legal/confidentiality-policy.',
      'No data leaves Switzerland during the analysis process.',
    ],
    pp_third_party_title: 'Third-party data in contracts',
    pp_third_party_body: 'Contracts often contain the personal data of multiple parties (employees, landlords, counterparties). swisscontract.ai does not store this data. However, you should be aware that by uploading a contract, you are processing third-party data through an AI system. Under nFADP, you may have an obligation to inform the other contracting parties. We recommend: only upload contracts where you are a party, and consider informing counterparties if their personal data appears in the document.',
    pp_no_tracking_title: 'No analytics, no cookies',
    pp_no_tracking_body: 'We do not use Google Analytics or any other tracking service. We set no cookies and collect no usage data. There is nothing to accept or decline.',
    pp_lang_title: 'Language preference',
    pp_lang_body: 'Your language preference (EN/DE/FR/IT) is stored as a cookie in your browser. It is used only to remember your chosen interface language and is never sent to any third party.',
    pp_no_collect_title: 'Data we do not collect',
    pp_no_collect_items: [
      'We do not collect your name, email, or any personal details.',
      'We do not store the contracts you upload.',
      'We do not log which contracts you analyse.',
      'We do not sell data to third parties.',
    ],
    pp_opensource_title: 'Open source',
    pp_opensource_body: 'swisscontract.ai is open source. You can review exactly how your contract is processed, what is sent to the AI, and what is discarded.',
    pp_rights_title: 'Your rights (nFADP / GDPR)',
    pp_rights_body: 'Because we do not store personal data or link any information to individuals, most data subject rights (access, deletion, portability) do not apply in practice — there is nothing to access or delete.',
  },
  de: {
    badge: 'Kein Konto nötig · Jetzt ausprobieren',
    privacy_badge: 'Daten nie gespeichert · Persönliche Daten vor dem Hochladen schwärzen',
    opensource_badge: 'Open Source · Code ansehen',
    h1: 'Jeden Schweizer Vertrag verstehen',
    h1_accent: 'in Sekunden',
    subtitle: 'Laden Sie Ihren Arbeits-, Miet-, Versicherungs- oder NDA-Vertrag hoch — erhalten Sie eine verständliche Zusammenfassung mit hervorgehobenen Risiken und Schweizer Rechtskontext. Powered by Schweizer KI.',
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
      { title: 'KI analysiert ihn', desc: 'Apertus 70B — ein Schweizer KI-Modell, gehostet von Infomaniak — liest Ihren Vertrag und extrahiert in Sekunden wichtige Begriffe, Risiken und Schweizer Rechtskontext.' },
      { title: 'Klar verstehen', desc: 'Erhalten Sie eine verständliche Zusammenfassung. Kein Fachjargon. Kein Konto. Nichts gespeichert.' },
    ],
    features: [
      { title: 'Risikoerkennung', desc: 'Ungewöhnliche Klauseln, unfaire Bedingungen und riskante Verpflichtungen klar hervorgehoben.' },
      { title: 'Schweizer Rechtskontext', desc: 'Relevanter Schweizer Rechtskontext — OR, CO, Mietrecht — in verständlicher Sprache erklärt.' },
      { title: 'Privat & Sicher', desc: 'Ihr Dokument wird analysiert und sofort gelöscht. Es wird nichts gespeichert.' },
    ],
    faq_title: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Was kostet swisscontract.ai?', a: 'Nutzen Sie es ohne Konto. Keine Zahlung erforderlich.' },
      { q: 'Welche Schweizer Verträge kann ich analysieren?', a: 'Arbeitsverträge, Mietverträge, NDAs, Versicherungsverträge und Freelancer-Verträge. PDF, Word (.docx) und .txt werden unterstützt.' },
      { q: 'Bleibt mein Vertrag privat?', a: 'Ja. Ihr Vertrag wird im Arbeitsspeicher verarbeitet und sofort gelöscht — niemals gespeichert, niemals protokolliert, niemals mit Ihnen verknüpft. Die gesamte Verarbeitung findet auf Schweizer Servern von Infomaniak statt. Wir empfehlen, persönliche Daten vor dem Hochladen zu schwärzen — als zusätzliche Sicherheit.' },
      { q: 'Kann es Verträge auf Deutsch oder Französisch analysieren?', a: 'Ja. Laden Sie Ihren Vertrag in beliebiger Sprache hoch. Die KI erkennt die Sprache und gibt die Ergebnisse in der gewählten Sprache zurück.' },
      { q: 'Ist das Rechtsberatung?', a: 'Nein. swisscontract.ai liefert nur informative Analysen. Für verbindliche Rechtsberatung wenden Sie sich an einen Schweizer Anwalt.' },
    ],
    footer_tagline: 'KI-gestützte Vertragsanalyse',
    footer_disclaimer: 'Nur zu Informationszwecken. Keine Rechtsberatung.',
    footer_built: '🇨🇭 In der Schweiz entwickelt',
    footer_private: 'Datenschutz by Design',
    footer_privacy: 'Datenschutz',
    footer_opensource: 'Open Source',
    built_in: 'In der Schweiz entwickelt',
    meta_title: 'swisscontract.ai — Jeden Schweizer Vertrag verstehen',
    meta_description: 'KI-gestützte Vertragsanalyse für die Schweiz. Laden Sie Ihren Arbeits-, Miet- oder NDA-Vertrag hoch und erhalten Sie eine verständliche Zusammenfassung mit hervorgehobenen Risiken.',
    html_lang: 'de',
    og_locale: 'de_CH',
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
    upload_tip: 'Tipp: Namen, Unterschriften und persönliche Daten vor dem Hochladen schwärzen',
    privacy_title: 'Ihr Datenschutz, klar ausgedrückt',
    privacy_points: [
      'Ihr Vertrag wird direkt zur Analyse an die KI gesendet und niemals in einer Datenbank oder einem Speicher abgelegt.',
      'Wir haben keine Benutzerkonten, kein Tracking dessen, was Sie hochladen, und keine Möglichkeit, ein Dokument einer Person zuzuordnen.',
      'Die Analyse findet im Arbeitsspeicher statt und wird gelöscht, sobald Ihre Ergebnisse zurückgegeben werden.',
      'Wir empfehlen, Namen, Unterschriften und persönliche Daten vor dem Hochladen zu schwärzen — nur zur Sicherheit.',
      'Wir haben das gebaut, um Menschen zu helfen, nicht um Daten zu sammeln. Das ist alles.',
    ],
    language_label: 'Sprache',
    typewriter_examples: [
      "Benötige ich eine zusätzliche Versicherung für diesen Vertrag?",
      "Kann mein Arbeitgeber mich während der Probezeit kündigen?",
      "Ist meine Kündigungsfrist rechtskonform?",
      "Gibt es ungewöhnliche Strafklauseln?",
      "Was sind meine Rechte, wenn der Vermieter die Wohnung verkauft?",
      "Ist diese Konkurrenzklausel in der Schweiz durchsetzbar?",
      "Kann ich meine Wohnung gemäss diesem Vertrag untervermieten?",
    ],
    why_free_title: 'Warum ist das kostenlos?',
    why_free_p1: 'swisscontract.ai ist kostenlos, während wir evaluieren, ob es nützlich genug ist, um es weiterzubetreiben. Wir haben es selbst entwickelt — nur wir zwei — als Experiment.',
    why_free_p2: 'Wenn es wächst, werden wir einen Weg finden, die Kosten zu decken — vielleicht durch Partnerschaften mit Schweizer Rechts- oder Versicherungsdiensten, oder ein kostenpflichtiges Angebot für Vielnutzer. Wenn nicht, werden wir auch das offen kommunizieren.',
    why_free_p3: 'Keine Datenweitergabe. Keine versteckte Agenda. Nur ein Werkzeug, das die Schweiz braucht.',
    awareness_checkbox: 'Ich verstehe, dass swisscontract.ai keine Daten speichert, ich jedoch keine persönlichen Daten Dritter in hochgeladene Dokumente einbeziehen sollte. Falls mein Vertrag personenbezogene Daten anderer Parteien enthält, bin ich dafür verantwortlich, diese darüber zu informieren, dass ihre Daten von einem KI-System verarbeitet wurden.',
    badge_hosted: 'In der Schweiz gehostet',
    badge_hosted_sub: 'KI läuft auf Infrastruktur in der Schweiz',
    badge_swiss_ai: 'Schweizer KI',
    badge_swiss_ai_sub: 'Powered by Apertus 70B',
    badge_zero_retention: 'Keine Datenspeicherung',
    badge_zero_retention_sub: 'Ihr Vertrag wird niemals gespeichert',
    badge_nfadp: 'Datenschutz zuerst',
    badge_nfadp_sub: 'Mit Blick auf das Schweizer Datenschutzrecht entwickelt',
    pp_title: 'Datenschutzerklärung',
    pp_updated: 'Letzte Aktualisierung: März 2026',
    pp_short_title: 'Die Kurzfassung',
    pp_short_body: 'Wir speichern weder Ihre Verträge noch Ihre Fragen oder Analyseergebnisse. Nichts, was Sie hochladen, wird in eine Datenbank geschrieben. Wir haben keine Benutzerkonten und keine Möglichkeit, ein Dokument einer Person zuzuordnen. Die gesamte KI-Verarbeitung findet auf Schweizer Servern von Infomaniak statt.',
    pp_upload_title: 'Was passiert, wenn Sie einen Vertrag hochladen',
    pp_upload_items: [
      'Ihre Datei wird über HTTPS an unseren Server gesendet.',
      'Der Text wird im Arbeitsspeicher extrahiert und zur Analyse an die KI gesendet.',
      'Das Analyseergebnis wird an Ihren Browser zurückgegeben.',
      'Der extrahierte Text wird sofort gelöscht — er wird niemals auf eine Festplatte oder in ein Speichersystem geschrieben.',
      'Ihre Originaldatei wird niemals auf unseren Servern gespeichert.',
    ],
    pp_ai_title: 'KI-Verarbeitung — Schweizer Infrastruktur',
    pp_ai_items: [
      'Die gesamte KI-Analyse läuft auf der Infrastruktur von Infomaniak, einem Schweizer Unternehmen mit Sitz in Genf.',
      'Wir verwenden das Apertus-70B-Modell, das ausschliesslich in den Schweizer Rechenzentren von Infomaniak gehostet wird.',
      'Der KI-Dienst von Infomaniak verarbeitet Ihren Vertragstext, um die Analyse zu erstellen. Der Text wird über HTTPS gesendet und in Echtzeit verarbeitet.',
      'Wir nutzen die Infrastruktur und KI-Dienste von Infomaniak für dieses Tool. Einzelheiten zur Datenverarbeitung durch Infomaniak finden Sie in deren Datenschutzerklärung unter infomaniak.com/en/legal/confidentiality-policy.',
      'Während des Analyseprozesses verlassen keine Daten die Schweiz.',
    ],
    pp_third_party_title: 'Personenbezogene Daten Dritter in Verträgen',
    pp_third_party_body: 'Verträge enthalten oft die personenbezogenen Daten mehrerer Parteien (Arbeitnehmer, Vermieter, Vertragspartner). swisscontract.ai speichert diese Daten nicht. Sie sollten sich jedoch bewusst sein, dass Sie durch das Hochladen eines Vertrags personenbezogene Daten Dritter durch ein KI-System verarbeiten. Gemäss nDSG sind Sie möglicherweise verpflichtet, die anderen Vertragsparteien zu informieren. Wir empfehlen: Laden Sie nur Verträge hoch, bei denen Sie selbst Vertragspartei sind, und informieren Sie gegebenenfalls die Gegenparteien.',
    pp_no_tracking_title: 'Keine Analyse-Tools, keine Cookies',
    pp_no_tracking_body: 'Wir verwenden weder Google Analytics noch andere Tracking-Dienste. Wir setzen keine Cookies und erheben keine Nutzungsdaten. Es gibt nichts zu akzeptieren oder abzulehnen.',
    pp_lang_title: 'Spracheinstellung',
    pp_lang_body: 'Ihre Spracheinstellung (EN/DE/FR/IT) wird als Cookie in Ihrem Browser gespeichert. Er dient ausschliesslich dazu, Ihre gewählte Sprache zu speichern, und wird niemals an Dritte weitergegeben.',
    pp_no_collect_title: 'Daten, die wir nicht erheben',
    pp_no_collect_items: [
      'Wir erheben weder Ihren Namen, Ihre E-Mail-Adresse noch andere persönliche Daten.',
      'Wir speichern die von Ihnen hochgeladenen Verträge nicht.',
      'Wir protokollieren nicht, welche Verträge Sie analysieren.',
      'Wir verkaufen keine Daten an Dritte.',
    ],
    pp_opensource_title: 'Open Source',
    pp_opensource_body: 'swisscontract.ai ist Open Source. Sie können genau nachvollziehen, wie Ihr Vertrag verarbeitet wird, was an die KI gesendet wird und was gelöscht wird.',
    pp_rights_title: 'Ihre Rechte (nDSG / DSGVO)',
    pp_rights_body: 'Da wir keine personenbezogenen Daten speichern oder Informationen mit Einzelpersonen verknüpfen, sind die meisten Betroffenenrechte (Auskunft, Löschung, Datenportabilität) in der Praxis nicht anwendbar — es gibt nichts abzufragen oder zu löschen.',
  },
  fr: {
    badge: 'Sans compte · Essayez maintenant',
    privacy_badge: 'Données jamais stockées · Masquez vos infos personnelles avant envoi',
    opensource_badge: 'Open source · Voir le code',
    h1: 'Comprenez tout contrat suisse',
    h1_accent: 'en quelques secondes',
    subtitle: "Déposez votre contrat de travail, bail, assurance ou NDA — obtenez un résumé clair avec les points d'attention et le contexte juridique suisse. Propulsé par l'IA suisse.",
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
      { title: "L'IA l'analyse", desc: "Apertus 70B — un modèle d'IA souverain suisse hébergé par Infomaniak — lit votre contrat et extrait en quelques secondes les termes clés, les risques et le contexte juridique suisse." },
      { title: 'Comprenez clairement', desc: "Obtenez un résumé en langage clair. Sans jargon. Sans compte. Rien n'est stocké." },
    ],
    features: [
      { title: 'Détection des risques', desc: 'Clauses inhabituelles, conditions injustes et engagements risqués clairement mis en évidence.' },
      { title: 'Contexte juridique suisse', desc: 'Contexte juridique suisse pertinent — CO, droit du bail — expliqué en langage clair.' },
      { title: 'Privé & Sécurisé', desc: "Votre document est analysé puis immédiatement supprimé. Rien n'est stocké." },
    ],
    faq_title: 'Questions fréquentes',
    faqs: [
      { q: 'Combien coûte swisscontract.ai ?', a: 'Utilisez-le sans créer de compte. Aucun paiement requis.' },
      { q: 'Quels types de contrats suisses puis-je analyser ?', a: "Contrats de travail, baux, NDAs, contrats d'assurance et contrats freelance. PDF, Word (.docx) et .txt sont supportés." },
      { q: 'Mon contrat reste-t-il privé ?', a: "Oui. Votre contrat est traité en mémoire et supprimé immédiatement — jamais stocké, jamais journalisé, jamais lié à vous. Tout le traitement se fait sur des serveurs suisses opérés par Infomaniak. Nous recommandons de masquer les données personnelles avant l'envoi, par précaution supplémentaire." },
      { q: 'Peut-il analyser des contrats en allemand ou en italien ?', a: "Oui. Déposez votre contrat dans n'importe quelle langue. L'IA détecte la langue et retourne les résultats dans la langue choisie." },
      { q: 'Est-ce un conseil juridique ?', a: 'Non. swisscontract.ai fournit uniquement une analyse informative. Pour un conseil juridique contraignant, consultez un avocat suisse qualifié.' },
    ],
    footer_tagline: 'Analyse de contrats par IA',
    footer_disclaimer: 'À titre informatif uniquement. Pas de conseil juridique.',
    footer_built: '🇨🇭 Conçu en Suisse',
    footer_private: 'Confidentialité by design',
    footer_privacy: 'Confidentialité',
    footer_opensource: 'Open source',
    built_in: 'Conçu en Suisse',
    meta_title: 'swisscontract.ai — Comprenez tout contrat suisse en quelques secondes',
    meta_description: "Analyse de contrats par IA pour la Suisse. Déposez votre contrat de travail, bail ou NDA et obtenez un résumé clair avec les points d'attention mis en évidence.",
    html_lang: 'fr',
    og_locale: 'fr_CH',
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
    upload_tip: 'Conseil : masquez les noms, signatures et données personnelles avant d\'envoyer',
    privacy_title: 'Votre confidentialité, clairement expliquée',
    privacy_points: [
      "Votre contrat est envoyé directement à l'IA pour analyse et n'est jamais écrit dans une base de données ou un stockage.",
      "Nous n'avons pas de comptes utilisateurs, pas de suivi de ce que vous téléchargez, et aucun moyen de lier un document à une personne.",
      'L\'analyse se déroule en mémoire et est supprimée dès que vos résultats sont retournés.',
      'Nous recommandons de masquer les noms, signatures et données personnelles avant d\'envoyer — par précaution.',
      'Nous avons construit ceci pour aider les gens, pas pour collecter des données. C\'est tout.',
    ],
    language_label: 'Langue',
    typewriter_examples: [
      "Ai-je besoin d'une assurance supplémentaire pour ce contrat ?",
      "Mon employeur peut-il me licencier pendant la période d'essai ?",
      "Mon délai de préavis est-il légalement conforme ?",
      "Y a-t-il des clauses pénales inhabituelles ?",
      "Quels sont mes droits si le propriétaire vend le bien ?",
      "Cette clause de non-concurrence est-elle applicable en Suisse ?",
      "Puis-je sous-louer mon appartement selon ce contrat ?",
    ],
    why_free_title: 'Pourquoi est-ce gratuit\u00a0?',
    why_free_p1: 'swisscontract.ai est gratuit le temps d\'évaluer s\'il est suffisamment utile pour être pérennisé. Nous l\'avons construit nous-mêmes — à deux — comme une expérience.',
    why_free_p2: 'S\'il se développe, nous trouverons un moyen de couvrir les coûts — peut-être via des partenariats avec des services juridiques ou d\'assurance suisses, ou un accès payant pour les grands utilisateurs. Sinon, nous le dirons clairement.',
    why_free_p3: 'Aucune donnée vendue. Aucun agenda caché. Juste un outil dont la Suisse a besoin.',
    awareness_checkbox: "Je comprends que même si swisscontract.ai ne stocke aucune donnée, je ne devrais pas inclure les données personnelles de tiers dans les documents que je télécharge. Si mon contrat contient des données personnelles d'autres parties, il m'incombe de les informer que leurs données ont été traitées par un système d'IA.",
    badge_hosted: 'Hébergé en Suisse',
    badge_hosted_sub: "L'IA tourne sur une infrastructure en Suisse",
    badge_swiss_ai: 'IA suisse',
    badge_swiss_ai_sub: 'Propulsé par Apertus 70B',
    badge_zero_retention: 'Zéro rétention de données',
    badge_zero_retention_sub: "Votre contrat n'est jamais stocké",
    badge_nfadp: 'Confidentialité d\'abord',
    badge_nfadp_sub: 'Conçu en tenant compte de la protection des données suisse',
    pp_title: 'Politique de confidentialité',
    pp_updated: 'Dernière mise à jour : mars 2026',
    pp_short_title: 'La version courte',
    pp_short_body: 'Nous ne stockons ni vos contrats, ni vos questions, ni vos résultats d\'analyse. Rien de ce que vous téléchargez n\'est écrit dans une base de données. Nous n\'avons pas de comptes utilisateurs et aucun moyen de relier un document à une personne. Tout le traitement IA se fait sur des serveurs suisses opérés par Infomaniak.',
    pp_upload_title: 'Ce qui se passe lorsque vous téléchargez un contrat',
    pp_upload_items: [
      'Votre fichier est envoyé via HTTPS à notre serveur.',
      'Le texte est extrait en mémoire et envoyé à l\'IA pour analyse.',
      'Le résultat de l\'analyse est renvoyé à votre navigateur.',
      'Le texte extrait est supprimé immédiatement — il n\'est jamais écrit sur un disque ou dans un système de stockage.',
      'Votre fichier original n\'est jamais stocké sur nos serveurs.',
    ],
    pp_ai_title: 'Traitement IA — infrastructure suisse',
    pp_ai_items: [
      'Toute l\'analyse IA s\'exécute sur l\'infrastructure d\'Infomaniak, une entreprise suisse dont le siège est à Genève.',
      'Nous utilisons le modèle Apertus 70B, hébergé exclusivement dans les centres de données suisses d\'Infomaniak.',
      'Le service IA d\'Infomaniak traite le texte de votre contrat pour générer l\'analyse. Le texte est envoyé via HTTPS et traité en temps réel.',
      'Nous utilisons l\'infrastructure et les services IA d\'Infomaniak pour faire fonctionner cet outil. Pour en savoir plus sur la gestion des données par Infomaniak, consultez leur politique de confidentialité sur infomaniak.com/en/legal/confidentiality-policy.',
      'Aucune donnée ne quitte la Suisse pendant le processus d\'analyse.',
    ],
    pp_third_party_title: 'Données de tiers dans les contrats',
    pp_third_party_body: 'Les contrats contiennent souvent les données personnelles de plusieurs parties (employés, propriétaires, cocontractants). swisscontract.ai ne stocke pas ces données. Cependant, sachez qu\'en téléchargeant un contrat, vous traitez des données de tiers via un système d\'IA. En vertu de la nLPD, vous pourriez avoir l\'obligation d\'informer les autres parties contractantes. Nous recommandons : ne téléchargez que des contrats dont vous êtes partie, et envisagez d\'informer les cocontractants si leurs données personnelles figurent dans le document.',
    pp_no_tracking_title: 'Aucun outil d\'analyse, aucun cookie',
    pp_no_tracking_body: 'Nous n\'utilisons ni Google Analytics ni aucun autre service de suivi. Nous ne définissons aucun cookie et ne collectons aucune donnée d\'utilisation. Il n\'y a rien à accepter ou refuser.',
    pp_lang_title: 'Préférence linguistique',
    pp_lang_body: 'Votre préférence linguistique (EN/DE/FR/IT) est enregistrée sous forme de cookie dans votre navigateur. Elle sert uniquement à mémoriser la langue choisie et n\'est jamais transmise à un tiers.',
    pp_no_collect_title: 'Données que nous ne collectons pas',
    pp_no_collect_items: [
      'Nous ne collectons ni votre nom, ni votre e-mail, ni aucun détail personnel.',
      'Nous ne stockons pas les contrats que vous téléchargez.',
      'Nous ne journalisons pas les contrats que vous analysez.',
      'Nous ne vendons pas de données à des tiers.',
    ],
    pp_opensource_title: 'Open source',
    pp_opensource_body: 'swisscontract.ai est open source. Vous pouvez vérifier exactement comment votre contrat est traité, ce qui est envoyé à l\'IA et ce qui est supprimé.',
    pp_rights_title: 'Vos droits (nLPD / RGPD)',
    pp_rights_body: 'Étant donné que nous ne stockons pas de données personnelles et ne lions aucune information à des individus, la plupart des droits des personnes concernées (accès, suppression, portabilité) ne s\'appliquent pas en pratique — il n\'y a rien à consulter ou supprimer.',
  },
  it: {
    badge: 'Senza account · Prova ora',
    privacy_badge: 'Dati mai salvati · Oscura i dati personali prima di caricare',
    opensource_badge: 'Open source · Vedi il codice',
    h1: 'Comprendi qualsiasi contratto svizzero',
    h1_accent: 'in pochi secondi',
    subtitle: "Carica il tuo contratto di lavoro, affitto, assicurazione o NDA — ottieni un riassunto chiaro con i rischi evidenziati e il contesto giuridico svizzero. Alimentato dall'IA svizzera.",
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
      { title: "L'IA lo analizza", desc: "Apertus 70B — un modello di IA sovrano svizzero ospitato da Infomaniak — legge il contratto ed estrae in pochi secondi i termini chiave, i rischi e il contesto giuridico svizzero." },
      { title: 'Comprendi chiaramente', desc: 'Ottieni un riassunto in linguaggio semplice. Niente gergo. Nessun account. Nulla viene salvato.' },
    ],
    features: [
      { title: 'Rilevamento dei rischi', desc: 'Clausole insolite, condizioni inique e impegni rischiosi evidenziati chiaramente.' },
      { title: 'Contesto giuridico svizzero', desc: 'Contesto giuridico svizzero rilevante — CO, diritto locativo — spiegato in linguaggio chiaro.' },
      { title: 'Privato & Sicuro', desc: 'Il documento viene analizzato e immediatamente eliminato. Nulla viene salvato.' },
    ],
    faq_title: 'Domande frequenti',
    faqs: [
      { q: 'Quanto costa swisscontract.ai?', a: 'Usalo senza creare un account. Nessun pagamento richiesto.' },
      { q: 'Quali tipi di contratti svizzeri posso analizzare?', a: 'Contratti di lavoro, affitti, NDA, contratti assicurativi e contratti freelance. Supporta PDF, Word (.docx) e .txt.' },
      { q: 'Il mio contratto rimane privato?', a: "Sì. Il tuo contratto viene elaborato in memoria e scartato immediatamente — mai salvato, mai registrato, mai collegato a te. Tutta l'elaborazione avviene su server svizzeri operati da Infomaniak. Consigliamo di oscurare i dati personali prima di caricare, come precauzione aggiuntiva." },
      { q: 'Può analizzare contratti in tedesco o francese?', a: "Sì. Carica il contratto in qualsiasi lingua. L'IA rileva la lingua e restituisce i risultati nella lingua scelta." },
      { q: 'È una consulenza legale?', a: 'No. swisscontract.ai fornisce solo analisi informative. Per una consulenza legale vincolante, consulta un avvocato svizzero qualificato.' },
    ],
    footer_tagline: 'Analisi contratti con IA',
    footer_disclaimer: 'Solo a scopo informativo. Non è una consulenza legale.',
    footer_built: '🇨🇭 Sviluppato in Svizzera',
    footer_private: 'Privacy by design',
    footer_privacy: 'Privacy',
    footer_opensource: 'Open source',
    built_in: 'Sviluppato in Svizzera',
    meta_title: 'swisscontract.ai — Comprendi qualsiasi contratto svizzero in pochi secondi',
    meta_description: "Analisi contratti con IA per la Svizzera. Carica il tuo contratto di lavoro, affitto o NDA e ottieni un riassunto chiaro con i rischi evidenziati.",
    html_lang: 'it',
    og_locale: 'it_CH',
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
    upload_tip: 'Suggerimento: oscura nomi, firme e dati personali prima di caricare',
    privacy_title: 'La tua privacy, detta chiaramente',
    privacy_points: [
      'Il tuo contratto viene inviato direttamente all\'IA per l\'analisi e non viene mai scritto in alcun database o archivio.',
      'Non abbiamo account utente, nessun tracciamento di ciò che carichi e nessun modo per collegare un documento a una persona.',
      'L\'analisi avviene in memoria e viene eliminata nel momento in cui i risultati ti vengono restituiti.',
      'Consigliamo di oscurare nomi, firme e dati personali prima di caricare — solo per sicurezza.',
      'Abbiamo costruito questo per aiutare le persone, non per raccogliere dati. Tutto qui.',
    ],
    language_label: 'Lingua',
    typewriter_examples: [
      "Ho bisogno di un'assicurazione aggiuntiva per questo contratto?",
      "Il mio datore di lavoro può licenziarmi durante il periodo di prova?",
      "Il mio periodo di preavviso è legalmente conforme?",
      "Ci sono clausole penali insolite?",
      "Quali sono i miei diritti se il proprietario vende l'immobile?",
      "Questa clausola di non concorrenza è applicabile in Svizzera?",
      "Posso subaffittare il mio appartamento secondo questo contratto?",
    ],
    why_free_title: 'Perché è gratuito?',
    why_free_p1: 'swisscontract.ai è gratuito mentre valutiamo se è abbastanza utile da sostenere. Lo abbiamo costruito noi stessi — in due — come esperimento.',
    why_free_p2: 'Se cresce, troveremo un modo per coprire i costi — forse attraverso partnership con servizi legali o assicurativi svizzeri, o un piano a pagamento per gli utenti più attivi. Se non cresce, lo diremo chiaramente.',
    why_free_p3: 'Nessun dato venduto. Nessuna agenda nascosta. Solo uno strumento di cui la Svizzera ha bisogno.',
    awareness_checkbox: "Comprendo che, sebbene swisscontract.ai non memorizzi alcun dato, non dovrei includere dati personali di terzi nei documenti che carico. Se il mio contratto contiene dati personali di altre parti, sono responsabile di informarle che i loro dati sono stati elaborati da un sistema di IA.",
    badge_hosted: 'Ospitato in Svizzera',
    badge_hosted_sub: "L'IA gira su infrastruttura in Svizzera",
    badge_swiss_ai: 'IA svizzera',
    badge_swiss_ai_sub: 'Alimentato da Apertus 70B',
    badge_zero_retention: 'Nessuna conservazione dei dati',
    badge_zero_retention_sub: 'Il tuo contratto non viene mai archiviato',
    badge_nfadp: 'Privacy prima di tutto',
    badge_nfadp_sub: 'Progettato con la protezione dei dati svizzera in mente',
    pp_title: 'Informativa sulla privacy',
    pp_updated: 'Ultimo aggiornamento: marzo 2026',
    pp_short_title: 'La versione breve',
    pp_short_body: 'Non conserviamo i vostri contratti, le vostre domande o i risultati delle analisi. Nulla di ciò che caricate viene scritto in un database. Non abbiamo account utente e nessun modo per collegare un documento a una persona. Tutta l\'elaborazione IA avviene su server svizzeri gestiti da Infomaniak.',
    pp_upload_title: 'Cosa succede quando caricate un contratto',
    pp_upload_items: [
      'Il vostro file viene inviato tramite HTTPS al nostro server.',
      'Il testo viene estratto in memoria e inviato all\'IA per l\'analisi.',
      'Il risultato dell\'analisi viene restituito al vostro browser.',
      'Il testo estratto viene eliminato immediatamente — non viene mai scritto su disco o in alcun sistema di archiviazione.',
      'Il vostro file originale non viene mai conservato sui nostri server.',
    ],
    pp_ai_title: 'Elaborazione IA — infrastruttura svizzera',
    pp_ai_items: [
      'Tutta l\'analisi IA viene eseguita sull\'infrastruttura di Infomaniak, un\'azienda svizzera con sede a Ginevra.',
      'Utilizziamo il modello Apertus 70B, ospitato esclusivamente nei data center svizzeri di Infomaniak.',
      'Il servizio IA di Infomaniak elabora il testo del vostro contratto per generare l\'analisi. Il testo viene inviato tramite HTTPS ed elaborato in tempo reale.',
      'Utilizziamo l\'infrastruttura e i servizi IA di Infomaniak per far funzionare questo strumento. Per dettagli sulla gestione dei dati da parte di Infomaniak, consultate la loro informativa sulla privacy su infomaniak.com/en/legal/confidentiality-policy.',
      'Nessun dato lascia la Svizzera durante il processo di analisi.',
    ],
    pp_third_party_title: 'Dati di terzi nei contratti',
    pp_third_party_body: 'I contratti contengono spesso i dati personali di più parti (dipendenti, locatori, controparti). swisscontract.ai non conserva questi dati. Tuttavia, tenete presente che caricando un contratto, state elaborando dati di terzi attraverso un sistema di IA. Ai sensi della nLPD, potreste avere l\'obbligo di informare le altre parti contrattuali. Raccomandiamo: caricate solo contratti di cui siete parte e considerate di informare le controparti se i loro dati personali compaiono nel documento.',
    pp_no_tracking_title: 'Nessuno strumento di analisi, nessun cookie',
    pp_no_tracking_body: 'Non utilizziamo Google Analytics né alcun altro servizio di tracciamento. Non impostiamo cookie e non raccogliamo dati di utilizzo. Non c\'è nulla da accettare o rifiutare.',
    pp_lang_title: 'Preferenza linguistica',
    pp_lang_body: 'La vostra preferenza linguistica (EN/DE/FR/IT) viene salvata come cookie nel vostro browser. Serve unicamente a ricordare la lingua scelta e non viene mai trasmessa a terzi.',
    pp_no_collect_title: 'Dati che non raccogliamo',
    pp_no_collect_items: [
      'Non raccogliamo il vostro nome, e-mail o altri dati personali.',
      'Non conserviamo i contratti che caricate.',
      'Non registriamo quali contratti analizzate.',
      'Non vendiamo dati a terzi.',
    ],
    pp_opensource_title: 'Open source',
    pp_opensource_body: 'swisscontract.ai è open source. Potete verificare esattamente come viene elaborato il vostro contratto, cosa viene inviato all\'IA e cosa viene eliminato.',
    pp_rights_title: 'I vostri diritti (nLPD / GDPR)',
    pp_rights_body: 'Dato che non conserviamo dati personali né colleghiamo informazioni a individui, la maggior parte dei diritti degli interessati (accesso, cancellazione, portabilità) non si applica in pratica — non c\'è nulla da consultare o cancellare.',
  },
} as const;

// TranslationKeys is a structural type with string values (not literal types)
// to allow all locale translations to be assignable to it.
export type TranslationKeys = {
  badge: string;
  privacy_badge: string;
  opensource_badge: string;
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
  footer_privacy: string;
  footer_opensource: string;
  built_in: string;
  meta_title: string;
  meta_description: string;
  html_lang: string;
  og_locale: string;
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
  upload_tip: string;
  privacy_title: string;
  privacy_points: ReadonlyArray<string>;
  language_label: string;
  typewriter_examples: ReadonlyArray<string>;
  why_free_title: string;
  why_free_p1: string;
  why_free_p2: string;
  why_free_p3: string;
  awareness_checkbox: string;
  badge_hosted: string;
  badge_hosted_sub: string;
  badge_swiss_ai: string;
  badge_swiss_ai_sub: string;
  badge_zero_retention: string;
  badge_zero_retention_sub: string;
  badge_nfadp: string;
  badge_nfadp_sub: string;
  pp_title: string;
  pp_updated: string;
  pp_short_title: string;
  pp_short_body: string;
  pp_upload_title: string;
  pp_upload_items: ReadonlyArray<string>;
  pp_ai_title: string;
  pp_ai_items: ReadonlyArray<string>;
  pp_third_party_title: string;
  pp_third_party_body: string;
  pp_no_tracking_title: string;
  pp_no_tracking_body: string;
  pp_lang_title: string;
  pp_lang_body: string;
  pp_no_collect_title: string;
  pp_no_collect_items: ReadonlyArray<string>;
  pp_opensource_title: string;
  pp_opensource_body: string;
  pp_rights_title: string;
  pp_rights_body: string;
};
