import { Locale } from './translations';

export const CONTRACT_TYPES = ['employment', 'tenancy', 'nda', 'insurance', 'freelance'] as const;
export type ContractType = typeof CONTRACT_TYPES[number];

export interface ContractPageContent {
  h1: string;
  meta_title: string;
  meta_description: string;
  intro: string;
  red_flags_title: string;
  red_flags: readonly string[];
  laws_title: string;
  laws: readonly string[];
  faqs: readonly { q: string; a: string }[];
  cta: string;
}

export interface ContractBrowseSection {
  title: string;
  cards: Record<ContractType, { label: string; description: string }>;
}

export const contractBrowse: Record<Locale, ContractBrowseSection> = {
  en: {
    title: 'Browse by Contract Type',
    cards: {
      employment: { label: 'Employment Contract', description: 'Probation, notice periods, non-compete clauses' },
      tenancy: { label: 'Rental / Tenancy', description: 'Deposits, rent increases, termination protection' },
      nda: { label: 'NDA', description: 'Confidentiality scope, duration, penalties' },
      insurance: { label: 'Insurance Contract', description: 'Exclusions, cancellation rights, disclosure duties' },
      freelance: { label: 'Freelance Contract', description: 'Pseudo-employment, IP ownership, liability' },
    },
  },
  de: {
    title: 'Nach Vertragstyp durchsuchen',
    cards: {
      employment: { label: 'Arbeitsvertrag', description: 'Probezeit, Kündigungsfristen, Konkurrenzverbote' },
      tenancy: { label: 'Mietvertrag', description: 'Kaution, Mietzinserhöhungen, Kündigungsschutz' },
      nda: { label: 'Geheimhaltungsvereinbarung', description: 'Vertraulichkeitsumfang, Dauer, Vertragsstrafen' },
      insurance: { label: 'Versicherungsvertrag', description: 'Ausschlüsse, Kündigungsrechte, Anzeigepflichten' },
      freelance: { label: 'Freelance-Vertrag', description: 'Scheinselbstständigkeit, IP-Eigentum, Haftung' },
    },
  },
  fr: {
    title: 'Parcourir par type de contrat',
    cards: {
      employment: { label: 'Contrat de travail', description: 'Période d\'essai, délais de congé, clauses de non-concurrence' },
      tenancy: { label: 'Bail à loyer', description: 'Garantie de loyer, hausses de loyer, protection contre les congés' },
      nda: { label: 'Accord de confidentialité', description: 'Portée de la confidentialité, durée, pénalités' },
      insurance: { label: 'Contrat d\'assurance', description: 'Exclusions, droit de résiliation, devoir de déclaration' },
      freelance: { label: 'Contrat freelance', description: 'Faux indépendant, propriété intellectuelle, responsabilité' },
    },
  },
  it: {
    title: 'Cerca per tipo di contratto',
    cards: {
      employment: { label: 'Contratto di lavoro', description: 'Periodo di prova, termini di disdetta, divieto di concorrenza' },
      tenancy: { label: 'Contratto di locazione', description: 'Cauzione, aumenti di pigione, protezione dalla disdetta' },
      nda: { label: 'Accordo di riservatezza', description: 'Ambito di riservatezza, durata, penali' },
      insurance: { label: 'Contratto assicurativo', description: 'Esclusioni, diritto di disdetta, obbligo di dichiarazione' },
      freelance: { label: 'Contratto freelance', description: 'Falso indipendente, proprietà intellettuale, responsabilità' },
    },
  },
};

export const contractPages: Record<Locale, Record<ContractType, ContractPageContent>> = {
  // ─────────────────────────────────────────────
  // ENGLISH
  // ─────────────────────────────────────────────
  en: {
    employment: {
      h1: 'Swiss Employment Contract Analysis',
      meta_title: 'Swiss Employment Contract Analysis — swisscontract.ai',
      meta_description: 'Upload your Swiss employment contract and get an instant AI analysis with red flags, key clauses, and Swiss law context. Free, private, no account needed.',
      intro: `Your Swiss employment contract (Arbeitsvertrag / contrat de travail) governs one of the most important relationships in your professional life. Swiss employment law — primarily found in the Swiss Code of Obligations (OR, Art. 319–362) — sets out mandatory protections that cannot be waived to the employee's detriment. Yet many contracts contain clauses that push the boundaries of what's permissible.

Key areas to watch include the probation period (OR Art. 335b), which may not exceed three months, and the notice periods (OR Art. 335c) that apply after probation — one month in the first year, two months from the second to the ninth year, and three months thereafter. Non-compete clauses (OR Art. 340–340c) are only valid if they meet strict conditions: they must be in writing, the employee must have had insight into the client base or trade secrets, and the restriction must be limited in time, geography, and scope.

Overtime rules are another common pitfall. Swiss law caps weekly working hours at 45 hours for industrial and office workers and 50 hours for others (ArG Art. 9). Employees are entitled to at least four weeks of paid holiday per year (five weeks for those under 20), and this minimum cannot be reduced by contract. Any clause waiving overtime compensation or reducing vacation below the legal minimum is void.

Upload your employment contract below for a free, instant analysis powered by Swiss AI.`,
      red_flags_title: 'Common Red Flags in Employment Contracts',
      red_flags: [
        'Non-compete clause exceeding 3 years, covering too broad a geographic area, or lacking compensation — likely unenforceable under OR Art. 340a',
        'Vacation entitlement below 4 weeks per year (5 weeks if under 20) — violates OR Art. 329a',
        'Overtime compensation waived entirely or replaced by an inadequate flat-rate — check OR Art. 321c',
        'Probation period exceeding 3 months or attempting to extend notice during probation beyond 7 days — void under OR Art. 335b',
      ],
      laws_title: 'Key Swiss Laws',
      laws: [
        'OR Art. 319–362 — Employment contract provisions',
        'OR Art. 335b — Probation period (max. 3 months)',
        'OR Art. 335c — Notice periods',
        'OR Art. 340–340c — Non-compete clauses',
        'OR Art. 329a — Minimum vacation entitlement',
        'OR Art. 321c — Overtime compensation',
        'ArG Art. 9 — Maximum weekly working hours',
      ],
      faqs: [
        { q: 'What is the maximum probation period in Switzerland?', a: 'Under OR Art. 335b, the probation period may not exceed three months. During probation, either party can terminate the contract with 7 days\' notice. Any clause extending probation beyond 3 months is void.' },
        { q: 'Can my employer include a non-compete clause?', a: 'Yes, but only under strict conditions (OR Art. 340–340c). The clause must be in writing, the employee must have had access to clients or trade secrets, and the restriction is limited to a maximum of 3 years. Courts can reduce or void overly broad non-compete clauses.' },
        { q: 'What are the minimum vacation days in Switzerland?', a: 'Swiss law guarantees at least 4 weeks (20 working days) of paid vacation per year. Employees under 20 are entitled to 5 weeks. These minimums cannot be reduced by contract (OR Art. 329a).' },
      ],
      cta: 'Upload your employment contract for a free AI analysis',
    },

    tenancy: {
      h1: 'Swiss Rental Contract Check',
      meta_title: 'Swiss Rental Contract Check — swisscontract.ai',
      meta_description: 'Upload your Swiss rental or tenancy agreement and get an instant AI analysis highlighting red flags, deposit rules, and tenant protections under Swiss law.',
      intro: `Swiss tenancy law (Mietrecht / droit du bail) is heavily regulated to protect tenants. The relevant provisions are found in OR Art. 253–273c, supplemented by the VMWG ordinance. Whether you're renting an apartment in Zürich, Geneva, or a smaller town, understanding your rights is essential before signing.

One of the most critical areas is the rental deposit (Mietzinskaution / garantie de loyer). Under OR Art. 257e, the deposit may not exceed three months' rent, and the landlord must deposit it in a separate escrow account (Sperrkonto) at a bank in the tenant's name. Any clause requiring a higher deposit or allowing the landlord to hold the deposit privately is illegal.

Tenants can challenge the initial rent as abusive within 30 days of moving in (OR Art. 270). Rent increases are only valid if they follow the official procedure using the approved form and are justified by reference rate changes, cost increases, or capital improvements. Termination of tenancy is protected: the landlord must use an approved form, and tenants can request an extension of up to 4 years for residential leases if termination would cause hardship.

Upload your rental contract below to identify potential issues before you sign — or to check your existing agreement.`,
      red_flags_title: 'Common Red Flags in Rental Contracts',
      red_flags: [
        'Deposit exceeding 3 months\' rent — illegal under OR Art. 257e',
        'No escrow account (Sperrkonto) for the deposit — the landlord must hold it in a separate bank account in the tenant\'s name',
        'Unfair renovation or restoration clauses requiring the tenant to restore the property to "as new" condition — exceeds normal wear and tear obligations',
        'Termination provisions that bypass the required official form or shorten notice periods below the legal minimum (OR Art. 266a ff.)',
      ],
      laws_title: 'Key Swiss Laws',
      laws: [
        'OR Art. 253–273c — Tenancy law provisions',
        'OR Art. 257e — Rental deposit (max. 3 months, escrow required)',
        'OR Art. 259a–259i — Defects and repairs',
        'OR Art. 266a ff. — Termination of tenancy',
        'OR Art. 270 — Challenging the initial rent (within 30 days)',
        'OR Art. 271–271a — Protection against abusive termination',
        'VMWG — Ordinance on tenancy and lease (implementing rules)',
      ],
      faqs: [
        { q: 'Can my landlord ask for more than 3 months\' deposit?', a: 'No. Under OR Art. 257e, the rental deposit may not exceed three months\' rent for residential leases. The deposit must be held in a bank escrow account in the tenant\'s name. Any clause requiring a higher deposit is void.' },
        { q: 'Can I challenge my initial rent?', a: 'Yes. Under OR Art. 270, you can challenge the initial rent within 30 days of moving in if you believe it is abusive. This is especially relevant in areas with housing shortages. The conciliation authority or rental tribunal will assess whether the rent is excessive.' },
        { q: 'What happens when I move out — do I have to repaint?', a: 'Normal wear and tear (Abnützung) is the landlord\'s responsibility. You only need to repair damage beyond normal use. Clauses requiring tenants to repaint or renovate at their own cost upon move-out are often contested and may be void if they exceed what is reasonable.' },
      ],
      cta: 'Upload your rental contract for a free AI analysis',
    },

    nda: {
      h1: 'Swiss NDA Review',
      meta_title: 'Swiss NDA Review — swisscontract.ai',
      meta_description: 'Upload your Swiss NDA or confidentiality agreement and get an instant AI review of scope, duration, penalties, and enforceability under Swiss law.',
      intro: `Non-disclosure agreements (NDAs) — also called Geheimhaltungsvereinbarungen or accords de confidentialité — are common in Swiss business. They can be standalone agreements or clauses embedded in employment or service contracts. While Swiss law does not have a specific NDA statute, several provisions of the Code of Obligations apply.

For employees, OR Art. 321a establishes a general duty of loyalty and confidentiality during the employment relationship. After termination, the duty is limited to genuine trade secrets. For business-to-business NDAs, the parties have broad contractual freedom, but the terms must still be reasonable and enforceable.

Key elements to review in any Swiss NDA include: the definition of confidential information (is it overly broad?), the duration of the confidentiality obligation (unlimited NDAs are problematic), the carve-outs for publicly available information and information the recipient already possessed, the penalties for breach (are they proportionate?), and whether the NDA applies to the receiving party's employees and subcontractors.

Swiss courts can reduce disproportionate contractual penalties under OR Art. 163. An NDA that restricts common knowledge or imposes unlimited obligations may be partially or fully void under general contract law principles.

Upload your NDA below for a free, instant analysis.`,
      red_flags_title: 'Common Red Flags in NDAs',
      red_flags: [
        'Unlimited duration — a confidentiality obligation should have a reasonable time limit (typically 2–5 years after the end of the business relationship)',
        'Overly broad definition of confidential information — if "everything discussed" is confidential, the clause may be unenforceable',
        'Disproportionate penalty clauses — Swiss courts can reduce excessive penalties under OR Art. 163',
        'No carve-outs for publicly available information, independently developed knowledge, or information received from third parties',
      ],
      laws_title: 'Key Swiss Laws',
      laws: [
        'OR Art. 321a — Employee duty of loyalty and confidentiality',
        'OR Art. 163 — Judicial reduction of contractual penalties',
        'OR Art. 398 — Duty of care and confidentiality in mandates',
        'UWG Art. 6 — Unfair Competition Act: protection of trade secrets',
        'StGB Art. 162 — Criminal penalty for violation of trade secrets',
      ],
      faqs: [
        { q: 'Can an NDA last forever under Swiss law?', a: 'While there is no explicit prohibition, Swiss courts generally consider unlimited NDAs as disproportionate. A reasonable duration is typically 2 to 5 years after the end of the business relationship. For genuine trade secrets, longer periods may be justified.' },
        { q: 'What happens if the penalty clause is too high?', a: 'Under OR Art. 163, Swiss courts have the power to reduce contractual penalties they deem excessive. If your NDA includes a disproportionate penalty (e.g. CHF 1 million for a minor infringement), a court will likely reduce it to a reasonable amount.' },
        { q: 'Do I need a separate NDA if I have an employment contract?', a: 'Not necessarily. OR Art. 321a already imposes a confidentiality obligation on employees during the employment relationship. However, a separate NDA can clarify the scope, extend the duty post-employment for genuine trade secrets, and define penalties for breach.' },
      ],
      cta: 'Upload your NDA for a free AI review',
    },

    insurance: {
      h1: 'Swiss Insurance Contract Analysis',
      meta_title: 'Swiss Insurance Contract Analysis — swisscontract.ai',
      meta_description: 'Upload your Swiss insurance policy and get an instant AI analysis of coverage exclusions, cancellation rights, and disclosure obligations under Swiss law.',
      intro: `Swiss insurance contracts are governed by the Insurance Contract Act (VVG/LCA — Bundesgesetz über den Versicherungsvertrag). This law sets out the rights and obligations of policyholders and insurers, with specific rules on disclosure, coverage, claims, and cancellation.

One of the most important obligations for policyholders is the duty of disclosure (Anzeigepflicht / devoir de déclaration, VVG Art. 6). When applying for insurance, you must truthfully answer all questions on the application form. If you fail to disclose a material fact, the insurer can void the contract within 4 weeks of discovering the omission — even retroactively.

Coverage exclusions are a common source of disputes. Insurers may exclude pre-existing conditions, specific activities (extreme sports, travel to certain countries), or damage caused by gross negligence. These exclusions must be clearly stated in the general conditions (AVB/CGA). Cancellation rights vary: for non-life insurance, either party can typically terminate at the end of the contract period with 3 months' notice. After a claim, both parties often have a right to cancel.

The revised VVG (effective 1 January 2022) strengthened policyholder protections, including a 14-day cooling-off period for new contracts and clearer rules on partial claims.

Upload your insurance contract or policy documents below for a free AI analysis.`,
      red_flags_title: 'Common Red Flags in Insurance Contracts',
      red_flags: [
        'Excessive exclusion clauses — check whether common scenarios (natural disasters, pandemic, gross negligence) are excluded without clear justification',
        'Short claims reporting deadlines — some policies require notification within days, which can cause loss of coverage if missed',
        'Automatic renewal with long lock-in periods — watch for multi-year contracts that auto-renew with limited cancellation windows',
        'Unclear coverage limits or sub-limits — ensure maximum payouts are clearly defined and adequate for your needs',
      ],
      laws_title: 'Key Swiss Laws',
      laws: [
        'VVG Art. 6 — Duty of disclosure (Anzeigepflicht)',
        'VVG Art. 14 — Consequences of breach of duty of disclosure',
        'VVG Art. 35a — 14-day cooling-off period (since 2022)',
        'VVG Art. 38 — Claims reporting obligations',
        'VVG Art. 42 — Right to cancel after a claim',
        'VVG Art. 46 — Cancellation at end of contract period',
      ],
      faqs: [
        { q: 'What happens if I forget to disclose something on my insurance application?', a: 'Under VVG Art. 6, you must truthfully answer all questions on the application. If you fail to disclose a material fact, the insurer can void the contract within 4 weeks of discovering the omission (VVG Art. 6). This can be retroactive, meaning past claims may also be affected.' },
        { q: 'Can I cancel my insurance contract at any time?', a: 'For most non-life insurance contracts, you can cancel at the end of the contract period with at least 3 months\' notice (VVG Art. 46). After a claim, both parties typically have the right to cancel. Since 2022, new policyholders also have a 14-day cooling-off period (VVG Art. 35a).' },
        { q: 'Are exclusion clauses always valid?', a: 'Exclusion clauses are generally valid if they are clearly stated in the general conditions (AVB/CGA) and were communicated before contract conclusion. However, exclusions that are unusual or unexpected (ungewöhnliche Klauseln) may be challenged under the "Ungewöhnlichkeitsregel" — the rule against unusual clauses.' },
      ],
      cta: 'Upload your insurance contract for a free AI analysis',
    },

    freelance: {
      h1: 'Swiss Freelance Contract Check',
      meta_title: 'Swiss Freelance Contract Check — swisscontract.ai',
      meta_description: 'Upload your Swiss freelance or service contract and get an instant AI analysis checking for pseudo-employment risks, IP clauses, and liability terms.',
      intro: `Freelance contracts in Switzerland are typically governed by the mandate provisions of the Code of Obligations (OR Art. 394–406, Auftrag / mandat) or by the contract for work and services (OR Art. 363–379, Werkvertrag / contrat d'entreprise). The distinction between a freelance arrangement and an employment contract (OR Art. 319, Arbeitsvertrag) is crucial — it affects social security contributions, tax obligations, and worker protections.

Swiss authorities and courts look at the actual circumstances, not just the contract label. Key indicators of genuine freelance status include: the freedom to organise one's own work, bearing entrepreneurial risk, working for multiple clients, providing one's own tools and infrastructure, and the ability to delegate tasks. If these conditions are not met, the arrangement may be reclassified as employment (Scheinselbstständigkeit / faux indépendant), with significant consequences for both parties — including back-payment of social security contributions (AHV/IV/EO/ALV).

Other critical clauses in freelance contracts include intellectual property ownership (who owns the work product?), payment terms (net 30 is common, but watch for long payment cycles), liability limitations, and termination provisions. Unlike employment contracts, mandate contracts can generally be terminated at any time by either party (OR Art. 404), though the terminating party may owe damages if the timing is unfavourable.

Upload your freelance contract below for a free analysis.`,
      red_flags_title: 'Common Red Flags in Freelance Contracts',
      red_flags: [
        'Pseudo-employment indicators (Scheinselbstständigkeit) — if the contract dictates work hours, location, and tools, it may be reclassified as employment by social security authorities',
        'No clear IP ownership clause — without explicit terms, the ownership of work product may be disputed (OR Art. 16 URG for copyright)',
        'Unlimited personal liability — freelancers should negotiate reasonable liability caps; unlimited liability exposes you to disproportionate risk',
        'Unfair payment terms — watch for payment deadlines exceeding 60 days, retention clauses, or "pay when paid" terms that shift financial risk entirely to the freelancer',
      ],
      laws_title: 'Key Swiss Laws',
      laws: [
        'OR Art. 394–406 — Mandate (Auftrag) provisions',
        'OR Art. 363–379 — Contract for work and services (Werkvertrag)',
        'OR Art. 319 — Employment contract definition',
        'OR Art. 404 — Termination of mandates',
        'AHVG Art. 5 & 9 — AHV/social security contribution obligations',
        'URG Art. 16 — Copyright and work product ownership',
      ],
      faqs: [
        { q: 'How do Swiss authorities determine if I\'m truly freelance?', a: 'Swiss social security authorities (AHV/SVA) assess the actual working relationship, not just the contract title. Key factors include: whether you bear entrepreneurial risk, work for multiple clients, provide your own tools, and have freedom to organise your work. If these are not met, you may be reclassified as an employee, triggering back-payments of social contributions.' },
        { q: 'Who owns the intellectual property I create as a freelancer?', a: 'Under Swiss law, copyright arises with the creator (URG Art. 6). However, the contract can transfer or license IP rights to the client. Without a clear IP clause, the freelancer generally retains ownership. For software, special rules apply under URG Art. 17. Always ensure the contract clearly addresses IP ownership.' },
        { q: 'Can my client terminate the freelance contract at any time?', a: 'For mandate contracts (Auftrag), yes — OR Art. 404 allows either party to terminate at any time. However, the terminating party may owe damages for termination at an inopportune time. For work contracts (Werkvertrag), the client can withdraw at any time but must compensate the contractor for work done and lost profit (OR Art. 377).' },
      ],
      cta: 'Upload your freelance contract for a free AI analysis',
    },
  },

  // ─────────────────────────────────────────────
  // GERMAN
  // ─────────────────────────────────────────────
  de: {
    employment: {
      h1: 'Schweizer Arbeitsvertrag Analyse',
      meta_title: 'Schweizer Arbeitsvertrag Analyse — swisscontract.ai',
      meta_description: 'Laden Sie Ihren Schweizer Arbeitsvertrag hoch und erhalten Sie eine sofortige KI-Analyse mit Risiken, Schlüsselklauseln und Schweizer Rechtskontext. Kostenlos und ohne Konto.',
      intro: `Ihr Schweizer Arbeitsvertrag regelt eines der wichtigsten Verhältnisse in Ihrem Berufsleben. Das Schweizer Arbeitsvertragsrecht — hauptsächlich im Obligationenrecht (OR, Art. 319–362) verankert — legt zwingende Schutzbestimmungen fest, die nicht zuungunsten des Arbeitnehmers abgeändert werden dürfen. Dennoch enthalten viele Verträge Klauseln, die an die Grenzen des Zulässigen gehen.

Wichtige Bereiche sind die Probezeit (OR Art. 335b), die maximal drei Monate betragen darf, sowie die Kündigungsfristen (OR Art. 335c) nach der Probezeit — ein Monat im ersten Dienstjahr, zwei Monate vom zweiten bis zum neunten Dienstjahr und drei Monate danach. Konkurrenzverbote (OR Art. 340–340c) sind nur gültig, wenn strenge Voraussetzungen erfüllt sind: Schriftform, Einblick des Arbeitnehmers in den Kundenkreis oder Geschäftsgeheimnisse, und Begrenzung in Zeit, Gebiet und Gegenstand.

Überstundenregelungen sind eine weitere häufige Stolperfalle. Das Arbeitsgesetz (ArG Art. 9) begrenzt die wöchentliche Arbeitszeit auf 45 Stunden für industrielle und Büroangestellte und 50 Stunden für andere. Arbeitnehmer haben Anspruch auf mindestens vier Wochen bezahlte Ferien pro Jahr (fünf Wochen für Arbeitnehmer unter 20 Jahren), und dieses Minimum darf vertraglich nicht unterschritten werden. Klauseln, die auf Überstundenvergütung verzichten oder die Ferien unter das gesetzliche Minimum senken, sind nichtig.

Laden Sie Ihren Arbeitsvertrag unten hoch für eine kostenlose, sofortige Analyse mit Schweizer KI.`,
      red_flags_title: 'Häufige Risiken in Arbeitsverträgen',
      red_flags: [
        'Konkurrenzverbot über 3 Jahre, zu grosses geografisches Gebiet oder ohne Entschädigung — wahrscheinlich nicht durchsetzbar gemäss OR Art. 340a',
        'Ferienanspruch unter 4 Wochen pro Jahr (5 Wochen unter 20 Jahren) — verstösst gegen OR Art. 329a',
        'Überstundenvergütung vollständig ausgeschlossen oder durch unzureichende Pauschale ersetzt — OR Art. 321c prüfen',
        'Probezeit über 3 Monate oder Versuch, die Kündigungsfrist während der Probezeit über 7 Tage auszudehnen — nichtig gemäss OR Art. 335b',
      ],
      laws_title: 'Wichtige Schweizer Gesetze',
      laws: [
        'OR Art. 319–362 — Arbeitsvertragsrecht',
        'OR Art. 335b — Probezeit (max. 3 Monate)',
        'OR Art. 335c — Kündigungsfristen',
        'OR Art. 340–340c — Konkurrenzverbot',
        'OR Art. 329a — Mindestferienanspruch',
        'OR Art. 321c — Überstundenvergütung',
        'ArG Art. 9 — Maximale wöchentliche Arbeitszeit',
      ],
      faqs: [
        { q: 'Wie lang darf die Probezeit in der Schweiz maximal sein?', a: 'Gemäss OR Art. 335b darf die Probezeit maximal drei Monate betragen. Während der Probezeit kann das Arbeitsverhältnis von beiden Seiten mit einer Frist von 7 Tagen gekündigt werden. Jede Klausel, die die Probezeit über 3 Monate hinaus verlängert, ist nichtig.' },
        { q: 'Darf mein Arbeitgeber ein Konkurrenzverbot aufnehmen?', a: 'Ja, aber nur unter strengen Voraussetzungen (OR Art. 340–340c). Die Klausel muss schriftlich sein, der Arbeitnehmer muss Einblick in den Kundenkreis oder Geschäftsgeheimnisse gehabt haben, und die Beschränkung ist auf maximal 3 Jahre begrenzt. Gerichte können übermässige Konkurrenzverbote reduzieren oder aufheben.' },
        { q: 'Wie viele Ferientage stehen mir in der Schweiz mindestens zu?', a: 'Das Schweizer Recht garantiert mindestens 4 Wochen (20 Arbeitstage) bezahlte Ferien pro Jahr. Arbeitnehmer unter 20 Jahren haben Anspruch auf 5 Wochen. Diese Mindestansprüche können vertraglich nicht unterschritten werden (OR Art. 329a).' },
      ],
      cta: 'Laden Sie Ihren Arbeitsvertrag hoch für eine kostenlose KI-Analyse',
    },

    tenancy: {
      h1: 'Schweizer Mietvertrag Prüfung',
      meta_title: 'Schweizer Mietvertrag Prüfung — swisscontract.ai',
      meta_description: 'Laden Sie Ihren Schweizer Mietvertrag hoch und erhalten Sie eine sofortige KI-Analyse zu Kautionsregeln, Mieterschutz und Kündigungsbestimmungen.',
      intro: `Das Schweizer Mietrecht ist stark reguliert, um Mieter zu schützen. Die relevanten Bestimmungen finden sich in OR Art. 253–273c, ergänzt durch die VMWG. Ob Sie eine Wohnung in Zürich, Genf oder einer kleineren Gemeinde mieten — es ist wichtig, Ihre Rechte vor der Unterschrift zu kennen.

Einer der kritischsten Bereiche ist die Mietkaution (Mietzinskaution). Gemäss OR Art. 257e darf die Kaution maximal drei Monatsmieten betragen, und der Vermieter muss sie auf einem separaten Sperrkonto bei einer Bank auf den Namen des Mieters hinterlegen. Jede Klausel, die eine höhere Kaution verlangt oder dem Vermieter erlaubt, die Kaution privat zu halten, ist rechtswidrig.

Mieter können den Anfangsmietzins innerhalb von 30 Tagen nach Einzug als missbräuchlich anfechten (OR Art. 270). Mietzinserhöhungen sind nur gültig, wenn sie dem offiziellen Verfahren mit dem genehmigten Formular folgen und durch Referenzzinsänderungen, Kostensteigerungen oder wertvermehrende Investitionen begründet sind. Die Kündigung ist geschützt: Der Vermieter muss das amtliche Formular verwenden, und Mieter können eine Erstreckung von bis zu vier Jahren für Wohnungsmiete beantragen, wenn die Kündigung eine Härte darstellt.

Laden Sie Ihren Mietvertrag hoch, um mögliche Probleme vor der Unterschrift zu erkennen — oder um Ihren bestehenden Vertrag zu überprüfen.`,
      red_flags_title: 'Häufige Risiken in Mietverträgen',
      red_flags: [
        'Kaution über 3 Monatsmieten — rechtswidrig gemäss OR Art. 257e',
        'Kein Sperrkonto für die Kaution — der Vermieter muss sie auf einem separaten Bankkonto auf den Namen des Mieters hinterlegen',
        'Unfaire Renovierungs- oder Wiederherstellungsklauseln, die den Mieter verpflichten, die Wohnung im Neuzustand zurückzugeben — übersteigt die normalen Abnutzungspflichten',
        'Kündigungsbestimmungen, die das vorgeschriebene amtliche Formular umgehen oder Fristen unter das gesetzliche Minimum verkürzen (OR Art. 266a ff.)',
      ],
      laws_title: 'Wichtige Schweizer Gesetze',
      laws: [
        'OR Art. 253–273c — Mietrecht',
        'OR Art. 257e — Mietkaution (max. 3 Monatsmieten, Sperrkonto erforderlich)',
        'OR Art. 259a–259i — Mängel und Reparaturen',
        'OR Art. 266a ff. — Kündigung des Mietverhältnisses',
        'OR Art. 270 — Anfechtung des Anfangsmietzinses (innert 30 Tagen)',
        'OR Art. 271–271a — Schutz vor missbräuchlicher Kündigung',
        'VMWG — Verordnung über die Miete und Pacht',
      ],
      faqs: [
        { q: 'Darf mein Vermieter mehr als 3 Monatsmieten als Kaution verlangen?', a: 'Nein. Gemäss OR Art. 257e darf die Mietkaution bei Wohnungsmiete maximal drei Monatsmieten betragen. Die Kaution muss auf einem Sperrkonto bei einer Bank auf den Namen des Mieters hinterlegt werden. Jede Klausel, die eine höhere Kaution verlangt, ist nichtig.' },
        { q: 'Kann ich meinen Anfangsmietzins anfechten?', a: 'Ja. Gemäss OR Art. 270 können Sie den Anfangsmietzins innerhalb von 30 Tagen nach Einzug anfechten, wenn Sie ihn für missbräuchlich halten. Dies ist besonders relevant in Gebieten mit Wohnungsmangel. Die Schlichtungsbehörde oder das Mietgericht beurteilt, ob der Mietzins überhöht ist.' },
        { q: 'Muss ich beim Auszug die Wohnung streichen?', a: 'Normale Abnutzung (Abnützung) geht zu Lasten des Vermieters. Sie müssen nur Schäden reparieren, die über die normale Nutzung hinausgehen. Klauseln, die Mieter verpflichten, auf eigene Kosten zu streichen oder zu renovieren, werden häufig angefochten und können nichtig sein, wenn sie über das Zumutbare hinausgehen.' },
      ],
      cta: 'Laden Sie Ihren Mietvertrag hoch für eine kostenlose KI-Analyse',
    },

    nda: {
      h1: 'Schweizer Geheimhaltungsvereinbarung prüfen',
      meta_title: 'Schweizer Geheimhaltungsvereinbarung prüfen — swisscontract.ai',
      meta_description: 'Laden Sie Ihre Schweizer Geheimhaltungsvereinbarung (NDA) hoch und erhalten Sie eine sofortige KI-Prüfung von Umfang, Dauer, Vertragsstrafen und Durchsetzbarkeit.',
      intro: `Geheimhaltungsvereinbarungen (NDAs) sind im Schweizer Geschäftsleben weit verbreitet. Sie können als eigenständige Verträge oder als Klauseln in Arbeits- oder Dienstleistungsverträgen auftreten. Obwohl das Schweizer Recht kein spezifisches NDA-Gesetz kennt, finden verschiedene Bestimmungen des Obligationenrechts Anwendung.

Für Arbeitnehmer begründet OR Art. 321a eine allgemeine Treue- und Geheimhaltungspflicht während des Arbeitsverhältnisses. Nach Beendigung ist die Pflicht auf echte Geschäftsgeheimnisse beschränkt. Bei Business-to-Business-NDAs haben die Parteien weitgehende Vertragsfreiheit, aber die Bedingungen müssen dennoch angemessen und durchsetzbar sein.

Wichtige Punkte bei jeder Schweizer NDA sind: die Definition der vertraulichen Informationen (ist sie zu weit gefasst?), die Dauer der Geheimhaltungspflicht (unbefristete NDAs sind problematisch), die Ausnahmen für öffentlich zugängliche Informationen und bereits bekannte Informationen, die Vertragsstrafen bei Verstoss (sind sie verhältnismässig?) und ob die NDA auch für Mitarbeiter und Subunternehmer der empfangenden Partei gilt.

Schweizer Gerichte können unverhältnismässige Vertragsstrafen gemäss OR Art. 163 herabsetzen. Eine NDA, die Allgemeinwissen einschränkt oder unbefristete Pflichten auferlegt, kann teilweise oder ganz nichtig sein.

Laden Sie Ihre NDA unten hoch für eine kostenlose, sofortige Analyse.`,
      red_flags_title: 'Häufige Risiken bei Geheimhaltungsvereinbarungen',
      red_flags: [
        'Unbefristete Dauer — eine Geheimhaltungspflicht sollte eine angemessene Zeitbegrenzung haben (typischerweise 2–5 Jahre nach Ende der Geschäftsbeziehung)',
        'Zu weit gefasste Definition vertraulicher Informationen — wenn „alles Besprochene" vertraulich ist, kann die Klausel undurchsetzbar sein',
        'Unverhältnismässige Vertragsstrafen — Schweizer Gerichte können übermässige Strafen gemäss OR Art. 163 herabsetzen',
        'Keine Ausnahmen für öffentlich zugängliche Informationen, unabhängig entwickeltes Wissen oder von Dritten erhaltene Informationen',
      ],
      laws_title: 'Wichtige Schweizer Gesetze',
      laws: [
        'OR Art. 321a — Treue- und Geheimhaltungspflicht des Arbeitnehmers',
        'OR Art. 163 — Richterliche Herabsetzung von Vertragsstrafen',
        'OR Art. 398 — Sorgfalts- und Geheimhaltungspflicht bei Aufträgen',
        'UWG Art. 6 — Gesetz gegen unlauteren Wettbewerb: Schutz von Geschäftsgeheimnissen',
        'StGB Art. 162 — Strafbare Verletzung von Geschäftsgeheimnissen',
      ],
      faqs: [
        { q: 'Kann eine NDA nach Schweizer Recht unbefristet gelten?', a: 'Ein ausdrückliches Verbot gibt es nicht, aber Schweizer Gerichte betrachten unbefristete NDAs in der Regel als unverhältnismässig. Eine angemessene Dauer beträgt typischerweise 2 bis 5 Jahre nach Ende der Geschäftsbeziehung. Für echte Geschäftsgeheimnisse können längere Zeiträume gerechtfertigt sein.' },
        { q: 'Was passiert, wenn die Vertragsstrafe zu hoch ist?', a: 'Gemäss OR Art. 163 haben Schweizer Gerichte die Befugnis, Vertragsstrafen herabzusetzen, die sie als übermässig erachten. Wenn Ihre NDA eine unverhältnismässige Strafe vorsieht (z.B. CHF 1 Million für einen geringfügigen Verstoss), wird ein Gericht diese wahrscheinlich auf einen angemessenen Betrag reduzieren.' },
        { q: 'Brauche ich eine separate NDA, wenn ich einen Arbeitsvertrag habe?', a: 'Nicht unbedingt. OR Art. 321a auferlegt Arbeitnehmern bereits eine Geheimhaltungspflicht während des Arbeitsverhältnisses. Eine separate NDA kann jedoch den Umfang präzisieren, die Pflicht nach Beendigung für echte Geschäftsgeheimnisse verlängern und Strafen für Verstösse definieren.' },
      ],
      cta: 'Laden Sie Ihre Geheimhaltungsvereinbarung hoch für eine kostenlose KI-Prüfung',
    },

    insurance: {
      h1: 'Schweizer Versicherungsvertrag Analyse',
      meta_title: 'Schweizer Versicherungsvertrag Analyse — swisscontract.ai',
      meta_description: 'Laden Sie Ihren Schweizer Versicherungsvertrag hoch und erhalten Sie eine sofortige KI-Analyse zu Deckungsausschlüssen, Kündigungsrechten und Anzeigepflichten.',
      intro: `Schweizer Versicherungsverträge werden durch das Versicherungsvertragsgesetz (VVG) geregelt. Dieses Gesetz legt die Rechte und Pflichten von Versicherungsnehmern und Versicherern fest, mit spezifischen Regeln zu Anzeigepflicht, Deckung, Schadenabwicklung und Kündigung.

Eine der wichtigsten Pflichten für Versicherungsnehmer ist die Anzeigepflicht (VVG Art. 6). Bei Vertragsabschluss müssen Sie alle Fragen im Antragsformular wahrheitsgemäss beantworten. Wenn Sie eine wesentliche Tatsache verschweigen, kann der Versicherer den Vertrag innerhalb von 4 Wochen nach Entdeckung der Verletzung auflösen — auch rückwirkend.

Deckungsausschlüsse sind eine häufige Streitquelle. Versicherer können Vorerkrankungen, bestimmte Aktivitäten (Extremsportarten, Reisen in bestimmte Länder) oder durch grobe Fahrlässigkeit verursachte Schäden ausschliessen. Diese Ausschlüsse müssen in den Allgemeinen Versicherungsbedingungen (AVB) klar formuliert sein. Kündigungsrechte variieren: Bei Nichtlebensversicherungen kann in der Regel jede Partei zum Ende der Vertragslaufzeit mit 3 Monaten Frist kündigen. Nach einem Schadensfall haben beide Parteien oft ein Sonderkündigungsrecht.

Das revidierte VVG (in Kraft seit 1. Januar 2022) hat den Schutz der Versicherungsnehmer gestärkt, einschliesslich eines 14-tägigen Widerrufsrechts für neue Verträge.

Laden Sie Ihren Versicherungsvertrag unten hoch für eine kostenlose KI-Analyse.`,
      red_flags_title: 'Häufige Risiken in Versicherungsverträgen',
      red_flags: [
        'Übermässige Ausschlussklauseln — prüfen Sie, ob häufige Szenarien (Naturkatastrophen, Pandemie, grobe Fahrlässigkeit) ohne klare Begründung ausgeschlossen sind',
        'Kurze Schadenmeldefristen — manche Policen verlangen eine Meldung innerhalb weniger Tage, was bei Versäumnis zum Deckungsverlust führen kann',
        'Automatische Verlängerung mit langen Bindungsfristen — achten Sie auf Mehrjahresverträge mit eingeschränkten Kündigungsfenstern',
        'Unklare Deckungslimiten oder Sublimiten — stellen Sie sicher, dass Maximalleistungen klar definiert und für Ihre Bedürfnisse ausreichend sind',
      ],
      laws_title: 'Wichtige Schweizer Gesetze',
      laws: [
        'VVG Art. 6 — Anzeigepflicht',
        'VVG Art. 14 — Folgen der Verletzung der Anzeigepflicht',
        'VVG Art. 35a — 14-tägiges Widerrufsrecht (seit 2022)',
        'VVG Art. 38 — Schadensmeldepflicht',
        'VVG Art. 42 — Kündigungsrecht nach Schadensfall',
        'VVG Art. 46 — Kündigung zum Ende der Vertragsperiode',
      ],
      faqs: [
        { q: 'Was passiert, wenn ich im Versicherungsantrag etwas vergesse anzugeben?', a: 'Gemäss VVG Art. 6 müssen Sie alle Fragen im Antrag wahrheitsgemäss beantworten. Wenn Sie eine wesentliche Tatsache verschweigen, kann der Versicherer den Vertrag innerhalb von 4 Wochen nach Entdeckung auflösen (VVG Art. 6). Dies kann rückwirkend erfolgen, was bedeutet, dass auch vergangene Schäden betroffen sein können.' },
        { q: 'Kann ich meinen Versicherungsvertrag jederzeit kündigen?', a: 'Bei den meisten Nichtlebensversicherungen können Sie zum Ende der Vertragsperiode mit mindestens 3 Monaten Frist kündigen (VVG Art. 46). Nach einem Schadensfall haben beide Parteien in der Regel ein Sonderkündigungsrecht. Seit 2022 haben neue Versicherungsnehmer zudem ein 14-tägiges Widerrufsrecht (VVG Art. 35a).' },
        { q: 'Sind Ausschlussklauseln immer gültig?', a: 'Ausschlussklauseln sind grundsätzlich gültig, wenn sie in den AVB klar formuliert und vor Vertragsabschluss mitgeteilt wurden. Allerdings können ungewöhnliche oder überraschende Ausschlüsse (ungewöhnliche Klauseln) nach der Ungewöhnlichkeitsregel angefochten werden.' },
      ],
      cta: 'Laden Sie Ihren Versicherungsvertrag hoch für eine kostenlose KI-Analyse',
    },

    freelance: {
      h1: 'Schweizer Freelance-Vertrag Prüfung',
      meta_title: 'Schweizer Freelance-Vertrag Prüfung — swisscontract.ai',
      meta_description: 'Laden Sie Ihren Schweizer Freelance-Vertrag hoch und erhalten Sie eine sofortige KI-Analyse zu Scheinselbstständigkeit, IP-Klauseln und Haftungsbedingungen.',
      intro: `Freelance-Verträge in der Schweiz unterstehen typischerweise dem Auftragsrecht (OR Art. 394–406) oder dem Werkvertragsrecht (OR Art. 363–379). Die Abgrenzung zwischen einer Freelance-Tätigkeit und einem Arbeitsverhältnis (OR Art. 319) ist entscheidend — sie beeinflusst Sozialversicherungsbeiträge, Steuerpflichten und Arbeitnehmerrechte.

Schweizer Behörden und Gerichte beurteilen die tatsächlichen Verhältnisse, nicht nur den Vertragstitel. Wichtige Indizien für eine echte Selbstständigkeit sind: die Freiheit, die eigene Arbeit zu organisieren, das Tragen des unternehmerischen Risikos, die Tätigkeit für mehrere Auftraggeber, die Verwendung eigener Arbeitsmittel und Infrastruktur sowie die Möglichkeit, Aufgaben zu delegieren. Sind diese Bedingungen nicht erfüllt, kann das Verhältnis als Arbeitsverhältnis umqualifiziert werden (Scheinselbstständigkeit), mit erheblichen Folgen für beide Parteien — einschliesslich Nachzahlung von Sozialversicherungsbeiträgen (AHV/IV/EO/ALV).

Weitere kritische Klauseln in Freelance-Verträgen betreffen das geistige Eigentum (wem gehören die Arbeitsergebnisse?), Zahlungsbedingungen (30 Tage netto ist üblich, aber achten Sie auf lange Zahlungsfristen), Haftungsbeschränkungen und Kündigungsbestimmungen. Anders als bei Arbeitsverträgen können Auftragsverträge grundsätzlich jederzeit von beiden Parteien gekündigt werden (OR Art. 404), wobei die kündigende Partei unter Umständen Schadenersatz schuldet, wenn der Zeitpunkt ungünstig ist.

Laden Sie Ihren Freelance-Vertrag unten hoch für eine kostenlose Analyse.`,
      red_flags_title: 'Häufige Risiken in Freelance-Verträgen',
      red_flags: [
        'Scheinselbstständigkeit — wenn der Vertrag Arbeitszeiten, Arbeitsort und Arbeitsmittel vorschreibt, kann er von den Sozialversicherungsbehörden als Arbeitsverhältnis umqualifiziert werden',
        'Keine klare IP-Klausel — ohne ausdrückliche Regelung kann das Eigentum an den Arbeitsergebnissen strittig sein (URG Art. 16 für Urheberrecht)',
        'Unbeschränkte persönliche Haftung — Freelancer sollten angemessene Haftungsobergrenzen aushandeln; unbeschränkte Haftung setzt Sie einem unverhältnismässigen Risiko aus',
        'Unfaire Zahlungsbedingungen — achten Sie auf Zahlungsfristen über 60 Tage, Einbehaltungsklauseln oder „Zahlung bei Zahlung"-Bedingungen, die das finanzielle Risiko vollständig auf den Freelancer verlagern',
      ],
      laws_title: 'Wichtige Schweizer Gesetze',
      laws: [
        'OR Art. 394–406 — Auftragsrecht',
        'OR Art. 363–379 — Werkvertragsrecht',
        'OR Art. 319 — Definition des Arbeitsvertrags',
        'OR Art. 404 — Kündigung des Auftrags',
        'AHVG Art. 5 & 9 — AHV-/Sozialversicherungsbeiträge',
        'URG Art. 16 — Urheberrecht und Eigentum an Arbeitsergebnissen',
      ],
      faqs: [
        { q: 'Wie beurteilen Schweizer Behörden, ob ich wirklich selbstständig bin?', a: 'Die Sozialversicherungsbehörden (AHV/SVA) beurteilen das tatsächliche Arbeitsverhältnis, nicht nur den Vertragstitel. Wichtige Faktoren sind: ob Sie unternehmerisches Risiko tragen, für mehrere Auftraggeber arbeiten, eigene Arbeitsmittel verwenden und die Freiheit haben, Ihre Arbeit zu organisieren. Sind diese nicht erfüllt, können Sie als Arbeitnehmer umqualifiziert werden, was Nachzahlungen von Sozialversicherungsbeiträgen auslöst.' },
        { q: 'Wem gehört das geistige Eigentum, das ich als Freelancer schaffe?', a: 'Nach Schweizer Recht entsteht das Urheberrecht beim Urheber (URG Art. 6). Der Vertrag kann jedoch die IP-Rechte auf den Auftraggeber übertragen oder lizenzieren. Ohne klare IP-Klausel behält der Freelancer in der Regel das Eigentum. Für Software gelten besondere Regeln nach URG Art. 17. Stellen Sie immer sicher, dass der Vertrag das IP-Eigentum klar regelt.' },
        { q: 'Kann mein Auftraggeber den Freelance-Vertrag jederzeit kündigen?', a: 'Bei Auftragsverträgen ja — OR Art. 404 erlaubt beiden Parteien, jederzeit zu kündigen. Die kündigende Partei kann jedoch Schadenersatz schulden, wenn die Kündigung zur Unzeit erfolgt. Bei Werkverträgen kann der Auftraggeber jederzeit zurücktreten, muss aber den Unternehmer für geleistete Arbeit und entgangenen Gewinn entschädigen (OR Art. 377).' },
      ],
      cta: 'Laden Sie Ihren Freelance-Vertrag hoch für eine kostenlose KI-Analyse',
    },
  },

  // ─────────────────────────────────────────────
  // FRENCH
  // ─────────────────────────────────────────────
  fr: {
    employment: {
      h1: 'Analyse du contrat de travail suisse',
      meta_title: 'Analyse du contrat de travail suisse — swisscontract.ai',
      meta_description: 'Téléchargez votre contrat de travail suisse et obtenez une analyse IA instantanée avec les risques, clauses clés et contexte juridique suisse. Gratuit et sans compte.',
      intro: `Votre contrat de travail suisse (Arbeitsvertrag) régit l'une des relations les plus importantes de votre vie professionnelle. Le droit du travail suisse — principalement ancré dans le Code des obligations (CO, art. 319–362) — établit des protections impératives qui ne peuvent pas être modifiées au détriment du travailleur. Pourtant, de nombreux contrats contiennent des clauses qui repoussent les limites de ce qui est autorisé.

Les domaines clés à surveiller incluent la période d'essai (CO art. 335b), qui ne peut excéder trois mois, et les délais de congé (CO art. 335c) après la période d'essai — un mois la première année, deux mois de la deuxième à la neuvième année, et trois mois ensuite. Les clauses de non-concurrence (CO art. 340–340c) ne sont valables que si des conditions strictes sont remplies : forme écrite, accès du travailleur à la clientèle ou aux secrets d'affaires, et limitation dans le temps, le territoire et l'objet.

Les heures supplémentaires sont un autre piège fréquent. La loi sur le travail (LTr art. 9) limite la durée hebdomadaire du travail à 45 heures pour les travailleurs industriels et de bureau et à 50 heures pour les autres. Les travailleurs ont droit à au moins quatre semaines de vacances payées par an (cinq semaines pour les moins de 20 ans), et ce minimum ne peut pas être réduit par contrat. Toute clause supprimant la compensation des heures supplémentaires ou réduisant les vacances en dessous du minimum légal est nulle.

Téléchargez votre contrat de travail ci-dessous pour une analyse gratuite et instantanée par l'IA suisse.`,
      red_flags_title: 'Points d\'attention fréquents dans les contrats de travail',
      red_flags: [
        'Clause de non-concurrence excédant 3 ans, couvrant un territoire trop large ou sans compensation — probablement inapplicable selon CO art. 340a',
        'Droit aux vacances inférieur à 4 semaines par an (5 semaines si moins de 20 ans) — violation du CO art. 329a',
        'Compensation des heures supplémentaires entièrement supprimée ou remplacée par un forfait insuffisant — vérifier CO art. 321c',
        'Période d\'essai excédant 3 mois ou tentative de prolonger le délai de congé pendant l\'essai au-delà de 7 jours — nul selon CO art. 335b',
      ],
      laws_title: 'Lois suisses clés',
      laws: [
        'CO art. 319–362 — Dispositions sur le contrat de travail',
        'CO art. 335b — Période d\'essai (max. 3 mois)',
        'CO art. 335c — Délais de congé',
        'CO art. 340–340c — Clauses de non-concurrence',
        'CO art. 329a — Droit minimum aux vacances',
        'CO art. 321c — Compensation des heures supplémentaires',
        'LTr art. 9 — Durée maximale du travail hebdomadaire',
      ],
      faqs: [
        { q: 'Quelle est la durée maximale de la période d\'essai en Suisse ?', a: 'Selon le CO art. 335b, la période d\'essai ne peut excéder trois mois. Pendant l\'essai, chaque partie peut résilier le contrat avec un préavis de 7 jours. Toute clause prolongeant l\'essai au-delà de 3 mois est nulle.' },
        { q: 'Mon employeur peut-il inclure une clause de non-concurrence ?', a: 'Oui, mais uniquement sous des conditions strictes (CO art. 340–340c). La clause doit être écrite, le travailleur doit avoir eu accès à la clientèle ou aux secrets d\'affaires, et la restriction est limitée à un maximum de 3 ans. Les tribunaux peuvent réduire ou annuler les clauses de non-concurrence excessives.' },
        { q: 'Combien de jours de vacances me reviennent au minimum en Suisse ?', a: 'Le droit suisse garantit au moins 4 semaines (20 jours ouvrables) de vacances payées par an. Les travailleurs de moins de 20 ans ont droit à 5 semaines. Ces minimums ne peuvent pas être réduits par contrat (CO art. 329a).' },
      ],
      cta: 'Téléchargez votre contrat de travail pour une analyse IA gratuite',
    },

    tenancy: {
      h1: 'Vérification du bail suisse',
      meta_title: 'Vérification du bail suisse — swisscontract.ai',
      meta_description: 'Téléchargez votre bail suisse et obtenez une analyse IA instantanée des règles de garantie, des droits des locataires et des protections contre les congés abusifs.',
      intro: `Le droit du bail suisse est fortement réglementé pour protéger les locataires. Les dispositions pertinentes se trouvent aux art. 253–273c CO, complétées par l'OBLF. Que vous louiez un appartement à Zurich, Genève ou dans une plus petite ville, il est essentiel de comprendre vos droits avant de signer.

L'un des domaines les plus critiques est la garantie de loyer (caution). Selon l'art. 257e CO, la garantie ne peut excéder trois mois de loyer, et le bailleur doit la déposer sur un compte bloqué auprès d'une banque au nom du locataire. Toute clause exigeant une garantie plus élevée ou permettant au bailleur de conserver la caution à titre privé est illégale.

Les locataires peuvent contester le loyer initial comme abusif dans les 30 jours suivant l'emménagement (CO art. 270). Les augmentations de loyer ne sont valables que si elles suivent la procédure officielle avec le formulaire agréé et sont justifiées par des changements du taux de référence, des augmentations de coûts ou des améliorations à plus-value. La résiliation est protégée : le bailleur doit utiliser le formulaire officiel, et les locataires peuvent demander une prolongation allant jusqu'à 4 ans pour les baux d'habitation si la résiliation constitue une rigueur.

Téléchargez votre bail ci-dessous pour identifier les problèmes potentiels avant de signer — ou pour vérifier votre contrat existant.`,
      red_flags_title: 'Points d\'attention fréquents dans les baux',
      red_flags: [
        'Garantie excédant 3 mois de loyer — illégale selon CO art. 257e',
        'Pas de compte bloqué pour la garantie — le bailleur doit la déposer sur un compte bancaire séparé au nom du locataire',
        'Clauses de remise en état abusives exigeant du locataire qu\'il restitue le logement à l\'état neuf — excède les obligations de compensation de l\'usure normale',
        'Dispositions de résiliation contournant le formulaire officiel obligatoire ou réduisant les délais en dessous du minimum légal (CO art. 266a ss.)',
      ],
      laws_title: 'Lois suisses clés',
      laws: [
        'CO art. 253–273c — Droit du bail',
        'CO art. 257e — Garantie de loyer (max. 3 mois, compte bloqué requis)',
        'CO art. 259a–259i — Défauts et réparations',
        'CO art. 266a ss. — Résiliation du bail',
        'CO art. 270 — Contestation du loyer initial (dans les 30 jours)',
        'CO art. 271–271a — Protection contre les congés abusifs',
        'OBLF — Ordonnance sur le bail à loyer et le bail à ferme',
      ],
      faqs: [
        { q: 'Mon bailleur peut-il demander plus de 3 mois de garantie ?', a: 'Non. Selon l\'art. 257e CO, la garantie de loyer ne peut excéder trois mois de loyer pour les baux d\'habitation. La caution doit être déposée sur un compte bloqué au nom du locataire. Toute clause exigeant une garantie plus élevée est nulle.' },
        { q: 'Puis-je contester mon loyer initial ?', a: 'Oui. Selon l\'art. 270 CO, vous pouvez contester le loyer initial dans les 30 jours suivant l\'emménagement si vous le considérez comme abusif. C\'est particulièrement pertinent dans les zones de pénurie de logements. L\'autorité de conciliation ou le tribunal des baux évaluera si le loyer est excessif.' },
        { q: 'Dois-je repeindre en quittant mon logement ?', a: 'L\'usure normale est à la charge du bailleur. Vous ne devez réparer que les dommages excédant l\'usage normal. Les clauses obligeant le locataire à repeindre ou rénover à ses frais sont souvent contestées et peuvent être nulles si elles excèdent ce qui est raisonnable.' },
      ],
      cta: 'Téléchargez votre bail pour une analyse IA gratuite',
    },

    nda: {
      h1: 'Vérification d\'un NDA suisse',
      meta_title: 'Vérification d\'un NDA suisse — swisscontract.ai',
      meta_description: 'Téléchargez votre accord de confidentialité suisse (NDA) et obtenez une vérification IA instantanée de la portée, la durée, les pénalités et l\'applicabilité en droit suisse.',
      intro: `Les accords de confidentialité (NDA) — également appelés Geheimhaltungsvereinbarungen — sont courants dans les affaires en Suisse. Ils peuvent être des accords autonomes ou des clauses intégrées dans des contrats de travail ou de services. Bien que le droit suisse ne dispose pas d'une loi spécifique sur les NDA, plusieurs dispositions du Code des obligations s'appliquent.

Pour les employés, l'art. 321a CO établit un devoir général de fidélité et de confidentialité pendant la durée du rapport de travail. Après la fin du contrat, le devoir est limité aux véritables secrets d'affaires. Pour les NDA entre entreprises, les parties disposent d'une large liberté contractuelle, mais les conditions doivent rester raisonnables et applicables.

Les éléments clés à vérifier dans tout NDA suisse incluent : la définition des informations confidentielles (est-elle trop large ?), la durée de l'obligation de confidentialité (les NDA illimités sont problématiques), les exceptions pour les informations publiques et les informations que le destinataire possédait déjà, les pénalités en cas de violation (sont-elles proportionnées ?) et si le NDA s'applique aux employés et sous-traitants de la partie réceptrice.

Les tribunaux suisses peuvent réduire les peines conventionnelles disproportionnées en vertu de l'art. 163 CO. Un NDA qui restreint des connaissances courantes ou impose des obligations illimitées peut être partiellement ou totalement nul.

Téléchargez votre NDA ci-dessous pour une analyse gratuite et instantanée.`,
      red_flags_title: 'Points d\'attention fréquents dans les NDA',
      red_flags: [
        'Durée illimitée — une obligation de confidentialité devrait avoir une limite de temps raisonnable (typiquement 2–5 ans après la fin de la relation d\'affaires)',
        'Définition trop large des informations confidentielles — si « tout ce qui a été discuté » est confidentiel, la clause peut être inapplicable',
        'Peines conventionnelles disproportionnées — les tribunaux suisses peuvent réduire les pénalités excessives selon CO art. 163',
        'Aucune exception pour les informations publiques, les connaissances développées indépendamment ou les informations reçues de tiers',
      ],
      laws_title: 'Lois suisses clés',
      laws: [
        'CO art. 321a — Devoir de fidélité et de confidentialité du travailleur',
        'CO art. 163 — Réduction judiciaire des peines conventionnelles',
        'CO art. 398 — Devoir de diligence et de confidentialité dans le mandat',
        'LCD art. 6 — Loi fédérale contre la concurrence déloyale : protection des secrets d\'affaires',
        'CP art. 162 — Sanction pénale pour violation de secrets d\'affaires',
      ],
      faqs: [
        { q: 'Un NDA peut-il durer indéfiniment en droit suisse ?', a: 'Bien qu\'il n\'existe pas d\'interdiction explicite, les tribunaux suisses considèrent généralement les NDA illimités comme disproportionnés. Une durée raisonnable est typiquement de 2 à 5 ans après la fin de la relation d\'affaires. Pour de véritables secrets d\'affaires, des périodes plus longues peuvent être justifiées.' },
        { q: 'Que se passe-t-il si la peine conventionnelle est trop élevée ?', a: 'En vertu de l\'art. 163 CO, les tribunaux suisses ont le pouvoir de réduire les peines conventionnelles qu\'ils jugent excessives. Si votre NDA prévoit une pénalité disproportionnée (p. ex. CHF 1 million pour une infraction mineure), un tribunal la réduira probablement à un montant raisonnable.' },
        { q: 'Ai-je besoin d\'un NDA séparé si j\'ai un contrat de travail ?', a: 'Pas nécessairement. L\'art. 321a CO impose déjà une obligation de confidentialité aux travailleurs pendant la durée du rapport de travail. Cependant, un NDA séparé peut préciser la portée, prolonger l\'obligation après la fin du contrat pour les véritables secrets d\'affaires et définir les sanctions en cas de violation.' },
      ],
      cta: 'Téléchargez votre NDA pour une vérification IA gratuite',
    },

    insurance: {
      h1: 'Analyse du contrat d\'assurance suisse',
      meta_title: 'Analyse du contrat d\'assurance suisse — swisscontract.ai',
      meta_description: 'Téléchargez votre contrat d\'assurance suisse et obtenez une analyse IA instantanée des exclusions, droits de résiliation et obligations de déclaration selon la LCA.',
      intro: `Les contrats d'assurance suisses sont régis par la Loi sur le contrat d'assurance (LCA — Loi fédérale sur le contrat d'assurance). Cette loi établit les droits et obligations des preneurs d'assurance et des assureurs, avec des règles spécifiques sur la déclaration, la couverture, les sinistres et la résiliation.

L'une des obligations les plus importantes pour les preneurs d'assurance est le devoir de déclaration (LCA art. 6). Lors de la conclusion du contrat, vous devez répondre de manière véridique à toutes les questions du formulaire de proposition. Si vous omettez de déclarer un fait important, l'assureur peut résilier le contrat dans les 4 semaines suivant la découverte de l'omission — même rétroactivement.

Les exclusions de couverture sont une source fréquente de litiges. Les assureurs peuvent exclure les affections préexistantes, certaines activités (sports extrêmes, voyages dans certains pays) ou les dommages causés par négligence grave. Ces exclusions doivent être clairement énoncées dans les conditions générales d'assurance (CGA). Les droits de résiliation varient : pour les assurances non-vie, chaque partie peut généralement résilier à la fin de la période contractuelle avec un préavis de 3 mois. Après un sinistre, les deux parties ont souvent un droit de résiliation.

La LCA révisée (en vigueur depuis le 1er janvier 2022) a renforcé les protections des preneurs d'assurance, y compris un délai de réflexion de 14 jours pour les nouveaux contrats.

Téléchargez votre contrat d'assurance ci-dessous pour une analyse IA gratuite.`,
      red_flags_title: 'Points d\'attention fréquents dans les contrats d\'assurance',
      red_flags: [
        'Clauses d\'exclusion excessives — vérifiez si des scénarios courants (catastrophes naturelles, pandémie, négligence grave) sont exclus sans justification claire',
        'Délais de déclaration de sinistre courts — certaines polices exigent une notification en quelques jours, ce qui peut entraîner une perte de couverture en cas de retard',
        'Renouvellement automatique avec longues périodes d\'engagement — attention aux contrats pluriannuels avec des fenêtres de résiliation limitées',
        'Limites de couverture ou sous-limites peu claires — assurez-vous que les montants maximaux sont clairement définis et adaptés à vos besoins',
      ],
      laws_title: 'Lois suisses clés',
      laws: [
        'LCA art. 6 — Devoir de déclaration',
        'LCA art. 14 — Conséquences de la violation du devoir de déclaration',
        'LCA art. 35a — Délai de réflexion de 14 jours (depuis 2022)',
        'LCA art. 38 — Obligations de déclaration de sinistre',
        'LCA art. 42 — Droit de résiliation après sinistre',
        'LCA art. 46 — Résiliation à la fin de la période contractuelle',
      ],
      faqs: [
        { q: 'Que se passe-t-il si j\'oublie de déclarer quelque chose dans ma proposition d\'assurance ?', a: 'En vertu de la LCA art. 6, vous devez répondre de manière véridique à toutes les questions de la proposition. Si vous omettez de déclarer un fait important, l\'assureur peut résilier le contrat dans les 4 semaines suivant la découverte de l\'omission (LCA art. 6). Cela peut être rétroactif, ce qui signifie que les sinistres passés peuvent également être affectés.' },
        { q: 'Puis-je résilier mon contrat d\'assurance à tout moment ?', a: 'Pour la plupart des assurances non-vie, vous pouvez résilier à la fin de la période contractuelle avec un préavis d\'au moins 3 mois (LCA art. 46). Après un sinistre, les deux parties ont généralement un droit de résiliation. Depuis 2022, les nouveaux preneurs d\'assurance bénéficient aussi d\'un délai de réflexion de 14 jours (LCA art. 35a).' },
        { q: 'Les clauses d\'exclusion sont-elles toujours valables ?', a: 'Les clauses d\'exclusion sont en principe valables si elles sont clairement énoncées dans les CGA et ont été communiquées avant la conclusion du contrat. Toutefois, les exclusions inhabituelles ou inattendues peuvent être contestées en vertu de la « règle de l\'insolite » — la règle contre les clauses inhabituelles.' },
      ],
      cta: 'Téléchargez votre contrat d\'assurance pour une analyse IA gratuite',
    },

    freelance: {
      h1: 'Vérification du contrat freelance suisse',
      meta_title: 'Vérification du contrat freelance suisse — swisscontract.ai',
      meta_description: 'Téléchargez votre contrat freelance suisse et obtenez une analyse IA instantanée des risques de faux indépendant, clauses de PI et conditions de responsabilité.',
      intro: `Les contrats freelance en Suisse relèvent typiquement du droit du mandat (CO art. 394–406) ou du contrat d'entreprise (CO art. 363–379). La distinction entre une activité indépendante et un contrat de travail (CO art. 319) est cruciale — elle affecte les cotisations sociales, les obligations fiscales et les protections du travailleur.

Les autorités et tribunaux suisses examinent les circonstances réelles, pas seulement le titre du contrat. Les indicateurs clés d'un véritable statut d'indépendant incluent : la liberté d'organiser son propre travail, le fait de supporter le risque entrepreneurial, de travailler pour plusieurs clients, de fournir ses propres outils et infrastructure, et la possibilité de déléguer des tâches. Si ces conditions ne sont pas remplies, la relation peut être requalifiée en contrat de travail (faux indépendant), avec des conséquences significatives pour les deux parties — y compris le paiement rétroactif des cotisations sociales (AVS/AI/APG/AC).

D'autres clauses critiques dans les contrats freelance concernent la propriété intellectuelle (à qui appartient le résultat du travail ?), les conditions de paiement (30 jours nets est courant, mais attention aux longs délais de paiement), les limitations de responsabilité et les dispositions de résiliation. Contrairement aux contrats de travail, les contrats de mandat peuvent généralement être résiliés à tout moment par l'une ou l'autre partie (CO art. 404), bien que la partie qui résilie puisse devoir des dommages-intérêts si le moment est inopportun.

Téléchargez votre contrat freelance ci-dessous pour une analyse gratuite.`,
      red_flags_title: 'Points d\'attention fréquents dans les contrats freelance',
      red_flags: [
        'Indicateurs de faux indépendant — si le contrat dicte les horaires, le lieu et les outils de travail, il peut être requalifié en contrat de travail par les autorités de sécurité sociale',
        'Pas de clause IP claire — sans termes explicites, la propriété des résultats du travail peut être contestée (LDA art. 16 pour le droit d\'auteur)',
        'Responsabilité personnelle illimitée — les freelances devraient négocier des plafonds de responsabilité raisonnables ; une responsabilité illimitée vous expose à un risque disproportionné',
        'Conditions de paiement inéquitables — attention aux délais de paiement excédant 60 jours, aux clauses de retenue ou aux conditions « paiement après encaissement » qui transfèrent entièrement le risque financier au freelance',
      ],
      laws_title: 'Lois suisses clés',
      laws: [
        'CO art. 394–406 — Dispositions sur le mandat',
        'CO art. 363–379 — Contrat d\'entreprise',
        'CO art. 319 — Définition du contrat de travail',
        'CO art. 404 — Résiliation du mandat',
        'LAVS art. 5 et 9 — Cotisations AVS/assurances sociales',
        'LDA art. 16 — Droit d\'auteur et propriété des résultats',
      ],
      faqs: [
        { q: 'Comment les autorités suisses déterminent-elles si je suis véritablement indépendant ?', a: 'Les autorités de sécurité sociale (AVS/caisse de compensation) évaluent la relation de travail réelle, pas seulement le titre du contrat. Les facteurs clés incluent : si vous supportez le risque entrepreneurial, travaillez pour plusieurs clients, fournissez vos propres outils et avez la liberté d\'organiser votre travail. Si ces conditions ne sont pas remplies, vous pouvez être requalifié comme employé, déclenchant des arriérés de cotisations sociales.' },
        { q: 'À qui appartient la propriété intellectuelle que je crée en tant que freelance ?', a: 'En droit suisse, le droit d\'auteur naît avec le créateur (LDA art. 6). Cependant, le contrat peut transférer ou concéder sous licence les droits de PI au client. Sans clause IP claire, le freelance conserve généralement la propriété. Pour les logiciels, des règles spéciales s\'appliquent selon LDA art. 17. Assurez-vous toujours que le contrat traite clairement de la propriété de la PI.' },
        { q: 'Mon client peut-il résilier le contrat freelance à tout moment ?', a: 'Pour les contrats de mandat, oui — l\'art. 404 CO permet à chaque partie de résilier à tout moment. Toutefois, la partie qui résilie peut devoir des dommages-intérêts pour résiliation en temps inopportun. Pour les contrats d\'entreprise, le client peut se retirer à tout moment mais doit indemniser l\'entrepreneur pour le travail effectué et le gain manqué (CO art. 377).' },
      ],
      cta: 'Téléchargez votre contrat freelance pour une analyse IA gratuite',
    },
  },

  // ─────────────────────────────────────────────
  // ITALIAN
  // ─────────────────────────────────────────────
  it: {
    employment: {
      h1: 'Analisi del contratto di lavoro svizzero',
      meta_title: 'Analisi del contratto di lavoro svizzero — swisscontract.ai',
      meta_description: 'Caricate il vostro contratto di lavoro svizzero e ottenete un\'analisi IA immediata con rischi, clausole chiave e contesto giuridico svizzero. Gratuito e senza account.',
      intro: `Il vostro contratto di lavoro svizzero (Arbeitsvertrag / contrat de travail) disciplina uno dei rapporti più importanti della vostra vita professionale. Il diritto del lavoro svizzero — contenuto principalmente nel Codice delle obbligazioni (CO, art. 319–362) — stabilisce protezioni imperative che non possono essere modificate a svantaggio del lavoratore. Eppure molti contratti contengono clausole che spingono ai limiti di ciò che è consentito.

Le aree chiave da verificare includono il periodo di prova (CO art. 335b), che non può superare tre mesi, e i termini di disdetta (CO art. 335c) dopo il periodo di prova — un mese nel primo anno, due mesi dal secondo al nono anno e tre mesi successivamente. Le clausole di divieto di concorrenza (CO art. 340–340c) sono valide solo se soddisfano condizioni rigorose: forma scritta, accesso del lavoratore alla clientela o ai segreti commerciali, e limitazione nel tempo, nel territorio e nell'oggetto.

Le ore supplementari sono un'altra insidia frequente. La legge sul lavoro (LL art. 9) limita la durata settimanale del lavoro a 45 ore per i lavoratori dell'industria e degli uffici e a 50 ore per gli altri. I lavoratori hanno diritto ad almeno quattro settimane di vacanze retribuite all'anno (cinque settimane per chi ha meno di 20 anni), e questo minimo non può essere ridotto per contratto. Qualsiasi clausola che rinunci alla compensazione degli straordinari o riduca le vacanze sotto il minimo legale è nulla.

Caricate il vostro contratto di lavoro qui sotto per un'analisi gratuita e immediata con l'IA svizzera.`,
      red_flags_title: 'Rischi frequenti nei contratti di lavoro',
      red_flags: [
        'Divieto di concorrenza superiore a 3 anni, con territorio troppo ampio o senza compenso — probabilmente inapplicabile secondo CO art. 340a',
        'Diritto alle vacanze inferiore a 4 settimane all\'anno (5 settimane se sotto i 20 anni) — viola CO art. 329a',
        'Compensazione delle ore supplementari completamente esclusa o sostituita da un forfait insufficiente — verificare CO art. 321c',
        'Periodo di prova superiore a 3 mesi o tentativo di estendere il termine di disdetta durante la prova oltre 7 giorni — nullo secondo CO art. 335b',
      ],
      laws_title: 'Leggi svizzere chiave',
      laws: [
        'CO art. 319–362 — Disposizioni sul contratto di lavoro',
        'CO art. 335b — Periodo di prova (max. 3 mesi)',
        'CO art. 335c — Termini di disdetta',
        'CO art. 340–340c — Divieto di concorrenza',
        'CO art. 329a — Diritto minimo alle vacanze',
        'CO art. 321c — Compensazione delle ore supplementari',
        'LL art. 9 — Durata massima del lavoro settimanale',
      ],
      faqs: [
        { q: 'Qual è la durata massima del periodo di prova in Svizzera?', a: 'Secondo il CO art. 335b, il periodo di prova non può superare tre mesi. Durante il periodo di prova, ciascuna parte può disdire il contratto con un preavviso di 7 giorni. Qualsiasi clausola che prolunghi la prova oltre 3 mesi è nulla.' },
        { q: 'Il mio datore di lavoro può includere un divieto di concorrenza?', a: 'Sì, ma solo a condizioni rigorose (CO art. 340–340c). La clausola deve essere scritta, il lavoratore deve aver avuto accesso alla clientela o ai segreti commerciali, e la restrizione è limitata a un massimo di 3 anni. I tribunali possono ridurre o annullare divieti di concorrenza eccessivi.' },
        { q: 'Quanti giorni di vacanza mi spettano come minimo in Svizzera?', a: 'Il diritto svizzero garantisce almeno 4 settimane (20 giorni lavorativi) di vacanze retribuite all\'anno. I lavoratori sotto i 20 anni hanno diritto a 5 settimane. Questi minimi non possono essere ridotti per contratto (CO art. 329a).' },
      ],
      cta: 'Caricate il vostro contratto di lavoro per un\'analisi IA gratuita',
    },

    tenancy: {
      h1: 'Verifica del contratto di locazione svizzero',
      meta_title: 'Verifica del contratto di locazione svizzero — swisscontract.ai',
      meta_description: 'Caricate il vostro contratto di locazione svizzero e ottenete un\'analisi IA immediata sulle regole della cauzione, i diritti dei locatari e la protezione dalla disdetta.',
      intro: `Il diritto della locazione svizzero è fortemente regolamentato per proteggere gli inquilini. Le disposizioni pertinenti si trovano negli art. 253–273c CO, integrate dall'OLAL. Che affittiate un appartamento a Zurigo, Ginevra o in una cittadina più piccola, è essenziale comprendere i vostri diritti prima di firmare.

Uno degli ambiti più critici è la cauzione (garanzia di affitto). Secondo l'art. 257e CO, la cauzione non può superare tre mesi di pigione, e il locatore deve depositarla su un conto vincolato presso una banca a nome del conduttore. Qualsiasi clausola che richieda una cauzione superiore o che consenta al locatore di trattenerla privatamente è illegale.

Gli inquilini possono contestare la pigione iniziale come abusiva entro 30 giorni dal trasloco (CO art. 270). Gli aumenti di pigione sono validi solo se seguono la procedura ufficiale con il modulo approvato e sono giustificati da variazioni del tasso di riferimento, aumenti dei costi o migliorie che accrescono il valore. La disdetta è protetta: il locatore deve utilizzare il modulo ufficiale, e gli inquilini possono richiedere una protrazione fino a 4 anni per le locazioni abitative se la disdetta comporta un rigore.

Caricate il vostro contratto di locazione qui sotto per identificare potenziali problemi prima di firmare — o per verificare il vostro contratto esistente.`,
      red_flags_title: 'Rischi frequenti nei contratti di locazione',
      red_flags: [
        'Cauzione superiore a 3 mesi di pigione — illegale secondo CO art. 257e',
        'Nessun conto vincolato per la cauzione — il locatore deve depositarla su un conto bancario separato a nome del conduttore',
        'Clausole di rimessa in stato abusive che richiedono al conduttore di restituire l\'immobile come nuovo — eccede gli obblighi di compensazione dell\'usura normale',
        'Disposizioni di disdetta che aggirano il modulo ufficiale obbligatorio o riducono i termini sotto il minimo legale (CO art. 266a segg.)',
      ],
      laws_title: 'Leggi svizzere chiave',
      laws: [
        'CO art. 253–273c — Diritto della locazione',
        'CO art. 257e — Cauzione (max. 3 mesi, conto vincolato richiesto)',
        'CO art. 259a–259i — Difetti e riparazioni',
        'CO art. 266a segg. — Disdetta della locazione',
        'CO art. 270 — Contestazione della pigione iniziale (entro 30 giorni)',
        'CO art. 271–271a — Protezione dalla disdetta abusiva',
        'OLAL — Ordinanza concernente la locazione e l\'affitto',
      ],
      faqs: [
        { q: 'Il mio locatore può richiedere più di 3 mesi di cauzione?', a: 'No. Secondo l\'art. 257e CO, la cauzione non può superare tre mesi di pigione per le locazioni abitative. La cauzione deve essere depositata su un conto vincolato a nome del conduttore. Qualsiasi clausola che richieda una cauzione superiore è nulla.' },
        { q: 'Posso contestare la mia pigione iniziale?', a: 'Sì. Secondo l\'art. 270 CO, potete contestare la pigione iniziale entro 30 giorni dal trasloco se la ritenete abusiva. Ciò è particolarmente rilevante nelle zone con carenza di alloggi. L\'autorità di conciliazione o il tribunale delle locazioni valuterà se la pigione è eccessiva.' },
        { q: 'Devo ritinteggiare quando lascio l\'appartamento?', a: 'L\'usura normale è a carico del locatore. Dovete riparare solo i danni che eccedono l\'uso normale. Le clausole che obbligano il conduttore a ritinteggiare o rinnovare a proprie spese sono spesso contestate e possono essere nulle se eccedono quanto ragionevole.' },
      ],
      cta: 'Caricate il vostro contratto di locazione per un\'analisi IA gratuita',
    },

    nda: {
      h1: 'Verifica del NDA svizzero',
      meta_title: 'Verifica del NDA svizzero — swisscontract.ai',
      meta_description: 'Caricate il vostro accordo di riservatezza svizzero (NDA) e ottenete una verifica IA immediata dell\'ambito, della durata, delle penali e dell\'applicabilità secondo il diritto svizzero.',
      intro: `Gli accordi di riservatezza (NDA) — chiamati anche Geheimhaltungsvereinbarungen o accords de confidentialité — sono comuni negli affari in Svizzera. Possono essere accordi autonomi o clausole integrate in contratti di lavoro o di servizi. Sebbene il diritto svizzero non preveda una legge specifica sugli NDA, diverse disposizioni del Codice delle obbligazioni trovano applicazione.

Per i dipendenti, l'art. 321a CO stabilisce un dovere generale di fedeltà e riservatezza durante il rapporto di lavoro. Dopo la cessazione, il dovere è limitato ai veri segreti commerciali. Per gli NDA tra imprese, le parti godono di ampia libertà contrattuale, ma le condizioni devono comunque essere ragionevoli e applicabili.

Gli elementi chiave da verificare in ogni NDA svizzero includono: la definizione delle informazioni confidenziali (è troppo ampia?), la durata dell'obbligo di riservatezza (gli NDA illimitati sono problematici), le eccezioni per le informazioni pubbliche e quelle già in possesso del destinatario, le penali per violazione (sono proporzionate?) e se l'NDA si applica anche ai dipendenti e subappaltatori della parte ricevente.

I tribunali svizzeri possono ridurre le penali contrattuali sproporzionate secondo l'art. 163 CO. Un NDA che limiti conoscenze comuni o imponga obblighi illimitati può essere parzialmente o totalmente nullo.

Caricate il vostro NDA qui sotto per un'analisi gratuita e immediata.`,
      red_flags_title: 'Rischi frequenti nei NDA',
      red_flags: [
        'Durata illimitata — un obbligo di riservatezza dovrebbe avere un limite temporale ragionevole (tipicamente 2–5 anni dopo la fine del rapporto commerciale)',
        'Definizione troppo ampia delle informazioni confidenziali — se « tutto ciò che è stato discusso » è confidenziale, la clausola può essere inapplicabile',
        'Penali contrattuali sproporzionate — i tribunali svizzeri possono ridurre le penali eccessive secondo CO art. 163',
        'Nessuna eccezione per le informazioni pubbliche, le conoscenze sviluppate autonomamente o le informazioni ricevute da terzi',
      ],
      laws_title: 'Leggi svizzere chiave',
      laws: [
        'CO art. 321a — Dovere di fedeltà e riservatezza del lavoratore',
        'CO art. 163 — Riduzione giudiziale delle penali contrattuali',
        'CO art. 398 — Dovere di diligenza e riservatezza nel mandato',
        'LCSl art. 6 — Legge federale contro la concorrenza sleale: protezione dei segreti commerciali',
        'CP art. 162 — Sanzione penale per violazione di segreti commerciali',
      ],
      faqs: [
        { q: 'Un NDA può durare per sempre secondo il diritto svizzero?', a: 'Non esiste un divieto esplicito, ma i tribunali svizzeri considerano generalmente gli NDA illimitati come sproporzionati. Una durata ragionevole è tipicamente da 2 a 5 anni dopo la fine del rapporto commerciale. Per i veri segreti commerciali, periodi più lunghi possono essere giustificati.' },
        { q: 'Cosa succede se la penale contrattuale è troppo alta?', a: 'In virtù dell\'art. 163 CO, i tribunali svizzeri hanno il potere di ridurre le penali contrattuali che ritengono eccessive. Se il vostro NDA prevede una penale sproporzionata (ad es. CHF 1 milione per un\'infrazione minore), un tribunale la ridurrà probabilmente a un importo ragionevole.' },
        { q: 'Ho bisogno di un NDA separato se ho un contratto di lavoro?', a: 'Non necessariamente. L\'art. 321a CO impone già un obbligo di riservatezza ai lavoratori durante il rapporto di lavoro. Tuttavia, un NDA separato può precisare l\'ambito, estendere l\'obbligo dopo la cessazione per i veri segreti commerciali e definire le sanzioni in caso di violazione.' },
      ],
      cta: 'Caricate il vostro NDA per una verifica IA gratuita',
    },

    insurance: {
      h1: 'Analisi del contratto assicurativo svizzero',
      meta_title: 'Analisi del contratto assicurativo svizzero — swisscontract.ai',
      meta_description: 'Caricate il vostro contratto di assicurazione svizzero e ottenete un\'analisi IA immediata delle esclusioni, dei diritti di disdetta e degli obblighi di dichiarazione secondo la LCA.',
      intro: `I contratti di assicurazione svizzeri sono disciplinati dalla Legge sul contratto d'assicurazione (LCA — Legge federale sul contratto d'assicurazione). Questa legge stabilisce i diritti e gli obblighi dei contraenti e degli assicuratori, con regole specifiche sulla dichiarazione, la copertura, i sinistri e la disdetta.

Uno degli obblighi più importanti per i contraenti è l'obbligo di dichiarazione (LCA art. 6). Al momento della conclusione del contratto, dovete rispondere veritieramente a tutte le domande del modulo di proposta. Se omettete di dichiarare un fatto rilevante, l'assicuratore può risolvere il contratto entro 4 settimane dalla scoperta dell'omissione — anche retroattivamente.

Le esclusioni di copertura sono una fonte frequente di controversie. Gli assicuratori possono escludere condizioni preesistenti, determinate attività (sport estremi, viaggi in certi Paesi) o danni causati da colpa grave. Queste esclusioni devono essere chiaramente indicate nelle condizioni generali di assicurazione (CGA). I diritti di disdetta variano: per le assicurazioni non vita, ciascuna parte può generalmente disdire alla fine del periodo contrattuale con un preavviso di 3 mesi. Dopo un sinistro, entrambe le parti hanno spesso un diritto di disdetta speciale.

La LCA riveduta (in vigore dal 1° gennaio 2022) ha rafforzato le protezioni dei contraenti, incluso un termine di riflessione di 14 giorni per i nuovi contratti.

Caricate il vostro contratto di assicurazione qui sotto per un'analisi IA gratuita.`,
      red_flags_title: 'Rischi frequenti nei contratti assicurativi',
      red_flags: [
        'Clausole di esclusione eccessive — verificate se scenari comuni (catastrofi naturali, pandemia, colpa grave) sono esclusi senza chiara giustificazione',
        'Termini brevi per la denuncia dei sinistri — alcune polizze richiedono la notifica entro pochi giorni, il che può comportare la perdita della copertura in caso di ritardo',
        'Rinnovo automatico con lunghi periodi di vincolo — attenzione ai contratti pluriennali con finestre di disdetta limitate',
        'Limiti di copertura o sublimiti poco chiari — assicuratevi che i massimali siano chiaramente definiti e adeguati alle vostre esigenze',
      ],
      laws_title: 'Leggi svizzere chiave',
      laws: [
        'LCA art. 6 — Obbligo di dichiarazione',
        'LCA art. 14 — Conseguenze della violazione dell\'obbligo di dichiarazione',
        'LCA art. 35a — Termine di riflessione di 14 giorni (dal 2022)',
        'LCA art. 38 — Obblighi di denuncia del sinistro',
        'LCA art. 42 — Diritto di disdetta dopo sinistro',
        'LCA art. 46 — Disdetta alla fine del periodo contrattuale',
      ],
      faqs: [
        { q: 'Cosa succede se dimentico di dichiarare qualcosa nella proposta di assicurazione?', a: 'In virtù della LCA art. 6, dovete rispondere veritieramente a tutte le domande della proposta. Se omettete di dichiarare un fatto rilevante, l\'assicuratore può risolvere il contratto entro 4 settimane dalla scoperta dell\'omissione (LCA art. 6). Ciò può essere retroattivo, il che significa che anche i sinistri passati possono essere interessati.' },
        { q: 'Posso disdire il mio contratto di assicurazione in qualsiasi momento?', a: 'Per la maggior parte delle assicurazioni non vita, potete disdire alla fine del periodo contrattuale con un preavviso di almeno 3 mesi (LCA art. 46). Dopo un sinistro, entrambe le parti hanno generalmente un diritto di disdetta speciale. Dal 2022, i nuovi contraenti beneficiano anche di un termine di riflessione di 14 giorni (LCA art. 35a).' },
        { q: 'Le clausole di esclusione sono sempre valide?', a: 'Le clausole di esclusione sono in linea di principio valide se sono chiaramente indicate nelle CGA e sono state comunicate prima della conclusione del contratto. Tuttavia, le esclusioni insolite o inaspettate possono essere contestate in base alla « regola dell\'insolito » — la regola contro le clausole inusuali.' },
      ],
      cta: 'Caricate il vostro contratto di assicurazione per un\'analisi IA gratuita',
    },

    freelance: {
      h1: 'Verifica del contratto freelance svizzero',
      meta_title: 'Verifica del contratto freelance svizzero — swisscontract.ai',
      meta_description: 'Caricate il vostro contratto freelance svizzero e ottenete un\'analisi IA immediata dei rischi di falso indipendente, delle clausole PI e delle condizioni di responsabilità.',
      intro: `I contratti freelance in Svizzera rientrano tipicamente nel diritto del mandato (CO art. 394–406) o nel contratto d'appalto (CO art. 363–379). La distinzione tra un'attività indipendente e un contratto di lavoro (CO art. 319) è cruciale — influisce sui contributi previdenziali, sugli obblighi fiscali e sulle tutele del lavoratore.

Le autorità e i tribunali svizzeri esaminano le circostanze effettive, non solo il titolo del contratto. Gli indicatori chiave di un autentico statuto di indipendente includono: la libertà di organizzare il proprio lavoro, il fatto di sostenere il rischio imprenditoriale, lavorare per più clienti, fornire i propri strumenti e infrastruttura, e la possibilità di delegare compiti. Se queste condizioni non sono soddisfatte, il rapporto può essere riqualificato come rapporto di lavoro (falso indipendente / Scheinselbstständigkeit), con conseguenze significative per entrambe le parti — incluso il pagamento retroattivo dei contributi previdenziali (AVS/AI/IPG/AD).

Altre clausole critiche nei contratti freelance riguardano la proprietà intellettuale (a chi appartengono i risultati del lavoro?), le condizioni di pagamento (30 giorni netti è comune, ma attenzione ai lunghi cicli di pagamento), le limitazioni di responsabilità e le disposizioni sulla disdetta. A differenza dei contratti di lavoro, i contratti di mandato possono generalmente essere disdetti in qualsiasi momento da entrambe le parti (CO art. 404), sebbene la parte che disdice possa dovere un risarcimento se il momento è inopportuno.

Caricate il vostro contratto freelance qui sotto per un'analisi gratuita.`,
      red_flags_title: 'Rischi frequenti nei contratti freelance',
      red_flags: [
        'Indicatori di falso indipendente (Scheinselbstständigkeit) — se il contratto prescrive orari, luogo e strumenti di lavoro, può essere riqualificato come rapporto di lavoro dalle autorità previdenziali',
        'Nessuna clausola PI chiara — senza termini espliciti, la proprietà dei risultati del lavoro può essere contestata (LDA art. 16 per il diritto d\'autore)',
        'Responsabilità personale illimitata — i freelance dovrebbero negoziare limiti di responsabilità ragionevoli; una responsabilità illimitata vi espone a un rischio sproporzionato',
        'Condizioni di pagamento inique — attenzione ai termini di pagamento superiori a 60 giorni, alle clausole di trattenuta o alle condizioni « pagamento dopo incasso » che trasferiscono interamente il rischio finanziario al freelance',
      ],
      laws_title: 'Leggi svizzere chiave',
      laws: [
        'CO art. 394–406 — Disposizioni sul mandato',
        'CO art. 363–379 — Contratto d\'appalto',
        'CO art. 319 — Definizione del contratto di lavoro',
        'CO art. 404 — Disdetta del mandato',
        'LAVS art. 5 e 9 — Contributi AVS/assicurazioni sociali',
        'LDA art. 16 — Diritto d\'autore e proprietà dei risultati',
      ],
      faqs: [
        { q: 'Come determinano le autorità svizzere se sono veramente indipendente?', a: 'Le autorità previdenziali (AVS/cassa di compensazione) valutano il rapporto di lavoro effettivo, non solo il titolo del contratto. I fattori chiave includono: se sostenete il rischio imprenditoriale, lavorate per più clienti, fornite i vostri strumenti e avete la libertà di organizzare il vostro lavoro. Se queste condizioni non sono soddisfatte, potreste essere riqualificati come dipendenti, innescando arretrati di contributi previdenziali.' },
        { q: 'A chi appartiene la proprietà intellettuale che creo come freelance?', a: 'Secondo il diritto svizzero, il diritto d\'autore nasce con il creatore (LDA art. 6). Tuttavia, il contratto può trasferire o concedere in licenza i diritti PI al cliente. Senza una clausola PI chiara, il freelance conserva generalmente la proprietà. Per il software, si applicano regole speciali secondo LDA art. 17. Assicuratevi sempre che il contratto tratti chiaramente della proprietà della PI.' },
        { q: 'Il mio cliente può disdire il contratto freelance in qualsiasi momento?', a: 'Per i contratti di mandato, sì — l\'art. 404 CO consente a ciascuna parte di disdire in qualsiasi momento. Tuttavia, la parte che disdice può dovere un risarcimento per disdetta intempestiva. Per i contratti d\'appalto, il committente può recedere in qualsiasi momento ma deve risarcire l\'appaltatore per il lavoro svolto e il guadagno mancato (CO art. 377).' },
      ],
      cta: 'Caricate il vostro contratto freelance per un\'analisi IA gratuita',
    },
  },
};
