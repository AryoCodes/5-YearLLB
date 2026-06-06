// Highly structured legal curriculum placeholder data
// Reflects a complete 5-Year Integrated LLB Course Syllabus with detailed lessons for demonstration
export const placeholderCurriculum = {
  semesters: [
    { id: 'sem-1', number: 1, title: 'Semester I' },
    { id: 'sem-2', number: 2, title: 'Semester II' },
    { id: 'sem-3', number: 3, title: 'Semester III' },
    { id: 'sem-4', number: 4, title: 'Semester IV' },
    { id: 'sem-5', number: 5, title: 'Semester V' },
    { id: 'sem-6', number: 6, title: 'Semester VI' },
    { id: 'sem-7', number: 7, title: 'Semester VII' },
    { id: 'sem-8', number: 8, title: 'Semester VIII' },
    { id: 'sem-9', number: 9, title: 'Semester IX' },
    { id: 'sem-10', number: 10, title: 'Semester X' }
  ],
  
  subjects: [
    // Semester 1
    { id: 'subj-torts', semesterId: 'sem-1', code: 'LLB-101', title: 'Law of Torts & Consumer Protection', description: 'Study of civil wrongs, negligence, strict liability, and rights of consumers under consumer protection laws.' },
    { id: 'subj-legal-lang', semesterId: 'sem-1', code: 'LLB-102', title: 'English & Legal Language', description: 'Fundamentals of legal vocabulary, drafting techniques, and study of historical legal maxims.' },
    { id: 'subj-sociology-1', semesterId: 'sem-1', code: 'LLB-103', title: 'Sociology I (Introduction)', description: 'Introduction to social institutions, structure, and social stratification relevant to legal study.' },
    
    // Semester 2
    { id: 'subj-contracts-1', semesterId: 'sem-2', code: 'LLB-201', title: 'Law of Contracts I (General Principles)', description: 'Introduction to formation of contracts, consideration, free consent, breach of contract, and remedies.' },
    { id: 'subj-polsci-1', semesterId: 'sem-2', code: 'LLB-202', title: 'Political Science I', description: 'State authority, sovereignty, organs of government, and evolution of political concepts.' },
    
    // Semester 3
    { id: 'subj-consti-1', semesterId: 'sem-3', code: 'LLB-301', title: 'Constitutional Law I (Structure & Rights)', description: 'Fundamental Rights, Directive Principles of State Policy, and basic structural framework of the Constitution.' },
    { id: 'subj-contracts-2', semesterId: 'sem-3', code: 'LLB-302', title: 'Law of Contracts II (Special Contracts)', description: 'Indemnity, guarantee, bailment, pledge, agency, partnership, and sale of goods.' },
    
    // Semester 4
    { id: 'subj-consti-2', semesterId: 'sem-4', code: 'LLB-401', title: 'Constitutional Law II (Organs of State)', description: 'Federal relations, parliamentary systems, judiciary, emergency provisions, and amendments.' },
    { id: 'subj-juris', semesterId: 'sem-4', code: 'LLB-402', title: 'Jurisprudence (Legal Theory)', description: 'Philosophical study of law, legal sources, concepts of rights, duties, ownership, and possession.' },
    
    // Semester 5
    { id: 'subj-crimes-1', semesterId: 'sem-5', code: 'LLB-501', title: 'Law of Crimes I (Penal Code)', description: 'General exceptions, offenses against the body, offenses against property, and criminal liability principles.' },
    { id: 'subj-property', semesterId: 'sem-5', code: 'LLB-502', title: 'Property Law (Transfer of Property Act)', description: 'Transfer of immovable property by sale, mortgage, lease, gift, and exchange.' },
    
    // Semester 6
    { id: 'subj-crimes-2', semesterId: 'sem-6', code: 'LLB-601', title: 'Law of Crimes II (Criminal Procedure)', description: 'Powers of criminal courts, arrest procedures, investigation, bail, trial procedure, and judgments.' },
    { id: 'subj-evidence', semesterId: 'sem-6', code: 'LLB-602', title: 'Law of Evidence', description: 'Relevancy of facts, confessions, dying declarations, burden of proof, and examination of witnesses.' },
    
    // Semester 7
    { id: 'subj-intl-law', semesterId: 'sem-7', code: 'LLB-701', title: 'Public International Law', description: 'Sources of international law, state recognition, treaties, territorial sovereignty, and the UN system.' },
    { id: 'subj-company', semesterId: 'sem-7', code: 'LLB-702', title: 'Company Law', description: 'Incorporation of companies, share capital, management, winding-up procedures, and corporate governance.' },
    
    // Semester 8
    { id: 'subj-adr', semesterId: 'sem-8', code: 'LLB-801', title: 'Alternative Dispute Resolution (ADR)', description: 'Study of arbitration, conciliation, mediation, Lok Adalats, and judicial settlements.' },
    { id: 'subj-ethics', semesterId: 'sem-8', code: 'LLB-802', title: 'Professional Ethics & Bar-Bench Relations', description: 'Standards of professional conduct, advocacy ethics, and contempt of court rules.' },
    
    // Semester 9
    { id: 'subj-drafting', semesterId: 'sem-9', code: 'LLB-901', title: 'Drafting, Pleading & Conveyancing', description: 'Pleadings in civil and criminal litigation, conveyancing deeds, petitions, and legal drafting practices.' },
    { id: 'subj-banking', semesterId: 'sem-9', code: 'LLB-902', title: 'Banking & Insurance Law', description: 'Regulatory framework for banks, negotiable instruments, insurance contracts, and customer claims.' },
    
    // Semester 10
    { id: 'subj-moot', semesterId: 'sem-10', code: 'LLB-1001', title: 'Moot Court & Internship Training', description: 'Practical court-room simulation, memorial writing, oral arguments, and professional internships.' },
    { id: 'subj-cyber', semesterId: 'sem-10', code: 'LLB-1002', title: 'Information Technology & Cyber Law', description: 'E-commerce regulations, digital signatures, cyber offenses, and data privacy framework.' }
  ],
  
  lessons: [
    // ----------------------------------------------------
    // SUBJECT: Law of Torts (subj-torts)
    // ----------------------------------------------------
    {
      id: 'less-torts-1',
      subjectId: 'subj-torts',
      title: 'Introduction to Tortious Liability',
      order: 1,
      content: `<h3>1. Basic Definition of a Tort</h3>
<p>The word <strong>"Tort"</strong> is derived from the Latin term <em>"tortum"</em> which means "twisted" or "crooked". In legal terms, a tort is a <strong>civil wrong</strong> (other than a breach of contract or breach of trust) that causes harm or injury to an individual, leading to civil liability which is redressed by an action for unliquidated damages.</p>

<h3>2. Essential Ingredients of a Tort</h3>
<p>To succeed in an action in torts, the plaintiff must prove three critical elements:</p>
<ul class="list-disc pl-5 my-3 space-y-1">
  <li><strong>Wrongful Act or Omission:</strong> The defendant must have committed an act or failed to act (omission) in a way that violates a legal duty.</li>
  <li><strong>Legal Damage (Injuria):</strong> There must be an infringement of a legally protected right. This is explained by two classic legal maxims:
    <ul class="list-circle pl-5 my-2 space-y-1">
      <li><em>Injuria sine Damno:</em> Violation of a legal right without actual physical or financial damage (Actionable per se, e.g., Trespass).</li>
      <li><em>Damnum sine Injuria:</em> Substantial damage or loss suffered without the infringement of a legal right (Not actionable, e.g., setting up a rival school).</li>
    </ul>
  </li>
  <li><strong>Legal Remedy:</strong> The wrongful act must give rise to a legal remedy, usually in the form of an action for damages (expressed in the maxim <em>"Ubi jus ibi remedium"</em> - where there is a right, there is a remedy).</li>
</ul>`,
      cases: [
        {
          citation: 'Ashby v. White (1703) 2 Ld Raym 938',
          facts: 'The plaintiff was a qualified voter who was wrongfully prevented from casting his vote by the defendant, an election officer. Despite the candidate he favored winning the election and no pecuniary damage occurring, the plaintiff sued.',
          holding: 'The Court held that the infringement of a legal right (the right to vote) is actionable even in the absence of actual physical or financial harm. This is a classic demonstration of Injuria sine Damno.'
        },
        {
          citation: 'Gloucester Grammar School Case (1410) YB 11 Hen IV',
          facts: 'The defendant, a schoolmaster, set up a rival grammar school next door to the plaintiff\'s established school. Due to competition, the plaintiff had to reduce his tuition fees from 40 pence to 12 pence per quarter, suffering heavy financial loss.',
          holding: 'The court held that no action lay. The defendant had merely exercised his legal right to compete in trade, and while the plaintiff suffered damage (Damnum), no legal right was infringed (Injuria). Hence, Damnum sine Injuria is not actionable.'
        }
      ],
      templates: [
        {
          id: 'temp-torts-plaint',
          title: 'Draft Template: Legal Notice for Tortious Interference',
          draftText: `LEGAL NOTICE

To,
[Recipient Name]
[Recipient Address]

Under instructions from my client, [Client Name], resident of [Client Address], I hereby serve you with this Legal Notice as follows:

1. My client is the owner of [describe property/business].
2. On [Date], you committed a wrongful act of [describe interference/nuisance], causing substantial disruption and injury to my client's rights.
3. Your actions constitute a clear tort of [Nuisance/Trespass/Interference] resulting in legal damage (Injuria) to my client.

Therefore, I call upon you to cease and desist from such wrongful acts and pay a sum of INR [Amount] towards damages within 15 days of receipt of this notice, failing which civil litigation will be initiated against you at your sole cost and risk.

Date: [Date]
[Advocate Signature]`
        }
      ],
      quizzes: [
        {
          id: 'q-torts-1-1',
          question: 'Which legal maxim translates to "Damage without the infringement of a legal right"?',
          options: ['Injuria sine damno', 'Damnum sine injuria', 'Ubi jus ibi remedium', 'Res ipsa loquitur'],
          correctAnswerIndex: 1,
          explanation: '"Damnum sine injuria" refers to damage or loss (damnum) suffered without any injury (injuria) to a legally protected right. It is not actionable in a court of law.'
        },
        {
          id: 'q-torts-1-2',
          question: 'What was the core legal outcome established in the landmark case Ashby v. White?',
          options: [
            'Competitions in trade are illegal if they cause loss.',
            'A person can sue for violation of their right to vote even if no financial loss occurs.',
            'Negligence requires proof of a contractual relationship.',
            'Public officers have absolute immunity from tort actions.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Ashby v. White established the principle of "Injuria sine damno" (injury without damage), holding that the violation of a legal right (in this case, voting) is actionable by itself.'
        }
      ]
    },
    {
      id: 'less-torts-2',
      subjectId: 'subj-torts',
      title: 'The Law of Negligence',
      order: 2,
      content: `<h3>1. Understanding Negligence in Law</h3>
<p>Negligence is the breach of a legal duty to take care, which results in unintended damage to the plaintiff. According to Baron Alderson, negligence is <em>"the omission to do something which a reasonable man, guided upon those considerations which ordinarily regulate the conduct of human affairs, would do, or doing something which a prudent and reasonable man would not do."</em></p>

<h3>2. Essential Elements of Negligence</h3>
<p>To establish liability in a negligence claim, three factors must be proved:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
  <li><strong>Duty of Care:</strong> The existence of a legal duty of care owed by the defendant to the plaintiff (based on the foreseeability of harm).</li>
  <li><strong>Breach of Duty:</strong> The defendant failed to behave with the standard of care expected of a reasonable person in those circumstances.</li>
  <li><strong>Consequential Damage:</strong> The breach directly caused damage to the plaintiff, and the damage was not too remote.</li>
</ol>`,
      cases: [
        {
          citation: 'Donoghue v. Stevenson [1932] AC 562',
          facts: 'The plaintiff drank a bottle of ginger beer manufactured by the defendant, which contained the decomposed remains of a snail. The bottle was opaque, so the snail was not visible until she poured the rest. She fell ill and sued the manufacturer.',
          holding: 'The House of Lords held that the manufacturer owed a duty of care to the consumer. Lord Atkin stated: "You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbour." This established the modern Neighbour Principle.'
        }
      ],
      templates: [
        {
          id: 'temp-negligence-plaint',
          title: 'Model Drafting: Plaint in a Suit for Damages (Negligence)',
          draftText: `IN THE COURT OF THE CIVIL JUDGE, SENIOR DIVISION, [CITY NAME]

Civil Suit No. ________ of 2026

[Plaintiff Name],
S/o [Father's Name],
Resident of [Address]                                   ...PLAINTIFF

Versus

[Defendant Name],
S/o [Father's Name],
Resident of [Address]                                   ...DEFENDANT

SUIT FOR RECOVERY OF DAMAGES FOR CIVIL NEGLIGENCE

The Plaintiff respectfully submits as under:

1. The Plaintiff is a resident of [Address] and works as a [Occupation].
2. The Defendant is the owner and operator of [Entity/Vehicle], bearing registration number [Number].
3. On [Date] at [Time], the Defendant acted with gross negligence by [describe negligent act, e.g., driving at excessive speed/failing to maintain safety standards].
4. Due directly to the Defendant's breach of duty of care, the Plaintiff suffered injuries and damages amounting to INR [Amount].

PRAYER:
The Plaintiff, therefore, prays that this Court may be pleased to decree the suit in favor of the Plaintiff, directing the Defendant to pay a sum of INR [Amount] towards damages along with interest at [Percent]% per annum.

Place: [City]
Date: [Date]

Plaintiff (Through Advocate)`
        }
      ],
      quizzes: [
        {
          id: 'q-torts-2-1',
          question: 'Who formulated the famous "Neighbour Principle" in Donoghue v. Stevenson?',
          options: ['Lord Denning', 'Lord Atkin', 'Lord Halsbury', 'Baron Alderson'],
          correctAnswerIndex: 1,
          explanation: 'Lord Atkin formulated the Neighbour Principle in Donoghue v. Stevenson (1932), which defines who a "neighbour" is in law: someone so closely and directly affected by an act that their safety should be kept in mind.'
        }
      ]
    },

    // ----------------------------------------------------
    // SUBJECT: Constitutional Law I (subj-consti-1)
    // ----------------------------------------------------
    {
      id: 'less-consti-1',
      subjectId: 'subj-consti-1',
      title: 'Introduction to Constitutionalism & Basic Structure',
      order: 1,
      content: `<h3>1. What is Constitutionalism?</h3>
<p><strong>Constitutionalism</strong> is the political philosophy that the authority of government is derived from, and limited by, a body of fundamental law. It stands in direct contrast to arbitrary power or autocracy. It demands institutional mechanisms (such as separation of powers, judicial review, and independent tribunals) to ensure government actions remain within constitutional limits.</p>

<h3>2. The Basic Structure Doctrine</h3>
<p>In jurisdictions like India, the legislature's power to amend the constitution is not absolute. Under the <strong>Basic Structure Doctrine</strong>, the parliament cannot alter, destroy, or modify the core identity or basic features of the Constitution, such as democracy, secularism, federalism, judicial review, and fundamental rights.</p>`,
      cases: [
        {
          citation: 'Kesavananda Bharati v. State of Kerala (1973) 4 SCC 225',
          facts: 'A 13-judge bench reviewed the validity of the 24th, 25th, and 29th Constitutional Amendments, which sought to limit judicial review and property rights claims.',
          holding: 'In a 7-6 majority verdict, the Supreme Court of India held that while the Parliament has wide powers to amend the Constitution under Article 368, this power does not extend to altering its "Basic Structure". This remains the most significant constitutional precedent in Indian jurisprudence.'
        }
      ],
      templates: [
        {
          id: 'temp-consti-writ',
          title: 'Draft Template: Writ Petition under Article 226',
          draftText: `IN THE HIGH COURT OF JUDICATURE AT [CITY]

Writ Petition No. ________ of 2026

In the matter of:
[Petitioner Name],
Resident of [Address]                                   ...PETITIONER

Versus

1. State of [State Name], through [Department/Officer]
2. [Other Public Authority Name]                       ...RESPONDENTS

PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA FOR ISSUANCE OF A WRIT OF MANDAMUS

The Petitioner respectfully submits:

1. The Petitioner is a citizen of India residing at [Address].
2. The Respondents have wrongfully refused to perform their statutory public duty of [describe public duty], thereby directly infringing the Petitioner's rights.
3. The act of the Respondents is arbitrary, unjust, and violates Article 14 and Article 21 of the Constitution.

PRAYER:
The Petitioner prays that this Court issue a Writ of Mandamus or any other appropriate Writ directing Respondent No. 1 to [state desired action] and grant such other reliefs as deemed fit.

Place: [City]
Date: [Date]

Petitioner`
        }
      ],
      quizzes: [
        {
          id: 'q-consti-1-1',
          question: 'Which constitutional case established the "Basic Structure Doctrine" in India?',
          options: ['Golaknath v. State of Punjab', 'Kesavananda Bharati v. State of Kerala', 'Minerva Mills v. Union of India', 'Maneka Gandhi v. Union of India'],
          correctAnswerIndex: 1,
          explanation: 'The Basic Structure Doctrine was established by a 13-judge bench in Kesavananda Bharati v. State of Kerala in 1973.'
        }
      ]
    },

    // ----------------------------------------------------
    // SUBJECT: Law of Contracts I (subj-contracts-1)
    // ----------------------------------------------------
    {
      id: 'less-contracts-1',
      subjectId: 'subj-contracts-1',
      title: 'Formation of Contract: Offer and Acceptance',
      order: 1,
      content: `<h3>1. Meaning of an Agreement & Contract</h3>
<p>An agreement enforceable by law is a contract. The progression is:</p>
<div class="bg-primary-900 border border-primary-700 font-mono text-sm p-4 rounded-md my-3 text-gold-300">
  Proposal (Offer) + Acceptance = Promise<br/>
  Promise + Consideration = Agreement<br/>
  Agreement + Enforceability by Law = Contract
</div>

<h3>2. Essentials of a Valid Offer</h3>
<ul class="list-disc pl-5 my-2 space-y-1">
  <li>Must be made with the intention to create legal relations (e.g., social agreements are not offers).</li>
  <li>Must be definite, clear, and unambiguous.</li>
  <li>Must be communicated to the offeree (you cannot accept an offer you do not know about).</li>
  <li>Distinguished from an <em>"Invitation to Offer"</em> (e.g., display of goods in a shop window, catalogs).</li>
</ul>`,
      cases: [
        {
          citation: 'Carlill v. Carbolic Smoke Ball Co. [1893] 1 QB 256',
          facts: 'The company advertised that they would pay £100 to anyone who contracted influenza after using their smoke ball product. Carlill used it as directed and fell ill. The company claimed the advertisement was a mere "puff" and not a serious offer.',
          holding: 'The Court of Appeal held that the advertisement was a "General Offer" made to the public at large. Carlill accepted by performing the conditions, and the company was bound to pay. Performance of conditions constitutes acceptance of a general offer.'
        },
        {
          citation: 'Balfour v. Balfour [1919] 2 KB 571',
          facts: 'A husband promised to pay his wife a monthly allowance of £30 while they lived apart due to her health. He failed to pay and she sued.',
          holding: 'The court held that social or domestic agreements do not carry an intention to create legal relations, and are therefore not contracts.'
        }
      ],
      templates: [
        {
          id: 'temp-contracts-agreement',
          title: 'Draft Template: Simple Mutual Contract Agreement',
          draftText: `MUTUAL SERVICE AGREEMENT

This Agreement is made on this [Day] day of [Month], 2026, by and between:

[Party A Name], residing at [Address] (hereinafter referred to as the "Service Provider"), AND
[Party B Name], residing at [Address] (hereinafter referred to as the "Client").

WITNESSETH:

1. Services: The Service Provider agrees to perform [describe services] for the Client.
2. Consideration: The Client agrees to pay the Service Provider a sum of INR [Amount] upon completion of the services.
3. Term: This agreement shall commence on [Date] and conclude on [Date].

IN WITNESS WHEREOF, the parties hereto have signed this Agreement on the date first written above.

__________________                   __________________
Service Provider                      Client`
        }
      ],
      quizzes: [
        {
          id: 'q-contracts-1-1',
          question: 'Which of the following is considered an "Invitation to Offer" rather than a legal offer?',
          options: ['A public announcement of reward for a lost dog', 'A display of priced items in a shop window', 'A letter offering to sell a car for $5,000', 'A verbal promise to sell a house to a specific buyer'],
          correctAnswerIndex: 1,
          explanation: 'A display of goods in a shop window is legally classified as an "invitation to offer" or "invitation to treat". It is an invitation to others to make an offer, which the shopkeeper can then accept or reject.'
        }
      ]
    },

    // ----------------------------------------------------
    // SUBJECT: Drafting, Pleading & Conveyancing (subj-drafting)
    // ----------------------------------------------------
    {
      id: 'less-drafting-1',
      subjectId: 'subj-drafting',
      title: 'Fundamental Rules of Drafting Pleadings',
      order: 1,
      content: `<h3>1. What are Pleadings?</h3>
<p>Under civil procedure codes, <strong>"Pleadings"</strong> mean a Plaint (the statement of claim filed by the plaintiff) or a Written Statement (the defense statement filed by the defendant). The core objective is to narrow down the controversy between the parties to specific, well-defined issues.</p>

<h3>2. The Four Golden Rules of Pleadings</h3>
<p>Every pleader must strictly adhere to the following rules:</p>
<ol class="list-decimal pl-5 my-3 space-y-2">
  <li><strong>Plead facts, not law:</strong> State the facts of the case, and leave it to the Court to apply the law to those facts.</li>
  <li><strong>Plead material facts only:</strong> Only state facts that are essential to establish your claim or defense. Do not write unnecessary details.</li>
  <li><strong>Do not plead evidence:</strong> State the facts you intend to prove, not the evidence by which you intend to prove them.</li>
  <li><strong>State facts concisely:</strong> Draft statements clearly, stating dates, sums, and numbers in figures as well as words.</li>
</ol>`,
      cases: [
        {
          citation: 'Virendra Kashinath v. Vinayak Kashinath (1999) 1 SCC 648',
          facts: 'The court reviewed a civil suit where pleadings were filled with lengthy arguments, citations, and emotional statements, rather than concise facts.',
          holding: 'The Supreme Court held that pleadings must be concise and state only material facts. Courts have the power to strike out irrelevant or argumentative pleadings under procedural rules.'
        }
      ],
      templates: [
        {
          id: 'temp-drafting-gpa',
          title: 'Draft Template: General Power of Attorney (GPA)',
          draftText: `GENERAL POWER OF ATTORNEY

KNOW ALL MEN BY THESE PRESENTS that I, [Principal Name], S/o [Father's Name], resident of [Address], do hereby nominate, constitute, and appoint [Agent Name], S/o [Agent Father's Name], resident of [Agent Address], as my true and lawful Attorney, to act on my behalf to do all or any of the following acts:

1. Management: To manage, supervise, and look after my property located at [Property Address].
2. Litigation: To sign, verify, and file plaints, written statements, appeals, and petitions in respect of the said property in any court of law.
3. Representation: To appear before government departments, sub-registrars, and municipal offices.

I hereby agree to ratify and confirm all acts, deeds, and things lawfully done by my said Attorney under this Power of Attorney.

IN WITNESS WHEREOF, I have executed this power of attorney on this [Date] day of [Month], 2026.

_____________________
EXECUTANT (Principal)

Witnesses:
1. __________________
2. __________________`
        }
      ],
      quizzes: [
        {
          id: 'q-draft-1-1',
          question: 'Which of the following is NOT one of the golden rules of pleadings?',
          options: ['Plead facts, not law', 'Plead evidence, not facts', 'Plead material facts only', 'State facts with conciseness'],
          correctAnswerIndex: 1,
          explanation: 'Pleadings must state facts, NOT evidence. The evidence to support those facts is presented later during trials and hearings.'
        }
      ]
    }
  ]
};
