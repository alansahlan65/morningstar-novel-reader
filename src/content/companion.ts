export type CompanionCategory = "Character" | "Lore Note";

export type CompanionItem = {
  id: string;
  name: string;
  initial: string;
  category: CompanionCategory;
  origin: string;
  role: string;
  subtitle: string;
  biography: string[];
  profile: Array<{ label: string; value: string }>;
  relationships: string[];
  inMorningstar: string[];
};

export const characterNotes: CompanionItem[] = [
  {
    id: "jack-morningstar",
    name: "Jack Morningstar",
    initial: "J",
    category: "Character",
    origin: "Morningstar original",
    role: "Witcher and last bearer",
    subtitle: "A witcher carrying a name older than his own life.",
    biography: [
      "Jack begins as a witcher on the Path, moving through contracts, quiet villages, and notices marked by black seals. His first instinct is professional suspicion: read the ground, distrust the paperwork, survive the room.",
      "The Morningstar name slowly stops being a family detail and becomes the center of the story. Jack learns that his bloodline was not built for rule, but for maintenance: a living hinge in an old warding system that offices and empires would rather classify than understand.",
      "At the canyon, Jack refuses the crown-shaped version of inheritance. He chooses the cost that quiets the seal, giving up the crimson gift and the future continuation of the Morningstar line so the world cannot turn his blood into another weapon."
    ],
    profile: [
      { label: "Affiliation", value: "Wolf medallion, Morningstar line" },
      { label: "Burden", value: "The barbed-star inheritance" },
      { label: "Arc", value: "Solitary witcher to chosen companion" }
    ],
    relationships: [
      "Asha becomes the hard witness who brings him toward the truth.",
      "Yennefer and Ciri change the question from destiny to choice.",
      "Geralt offers context where reassurance would be too cheap."
    ],
    inMorningstar: [
      "The protagonist and emotional center of the manuscript.",
      "His biography is also the biography of the Morningstar line: misfiled, hunted, then finally chosen on his own terms."
    ]
  },
  {
    id: "asha",
    name: "Asha",
    initial: "A",
    category: "Character",
    origin: "Morningstar original",
    role: "Faithel guardian",
    subtitle: "A survivor who treats truth as a duty, not a comfort.",
    biography: [
      "Asha enters the story like a locked door deciding to open: controlled, scarred, and unwilling to waste words. She knows the history around Helena, Jacob, the Faithel, and the Morningstar burden before Jack is ready to hear it.",
      "Her biography is shaped by stewardship. She does not romanticize sacrifice, myth, or grief. To Asha, the work matters because the world keeps trying to turn necessary labor into useful lies.",
      "In Zerrikania and at the canyon, she becomes both guide and commander. She holds the line while others face the basin, making sure the old truth survives in bodies, not only records."
    ],
    profile: [
      { label: "Affiliation", value: "Faithel guardians" },
      { label: "Method", value: "Practical honesty" },
      { label: "Function", value: "Guide, witness, shield" }
    ],
    relationships: [
      "She pushes Jack toward the parts of his history others tried to soften.",
      "She understands Ciri as another person surrounded by useful names.",
      "She stands apart from comfort, but not from loyalty."
    ],
    inMorningstar: [
      "Asha turns the plot east and makes Zerrikania unavoidable.",
      "Her presence keeps the story from confusing beauty with maintenance."
    ]
  },
  {
    id: "helena-morningstar",
    name: "Helena Morningstar",
    initial: "H",
    category: "Character",
    origin: "Morningstar original",
    role: "Line bearer and living anchor",
    subtitle: "The woman the archive tried to turn into a function.",
    biography: [
      "Helena enters Jack's life through records, memory, and the ache of late discovery. The office writes her as a target line, a bearer, and a containment problem, but the manuscript keeps returning her to personhood: a woman with mud on her hem, discipline in her silence, and a talent for surviving rooms that wanted her simplified.",
      "Her story is the buried biography of the Morningstar line. She did not flee because she was weak. She repositioned the last bearer because the lattice needed time, and because love in this world often looks like a route chosen under pressure.",
      "By the time Jack reaches the canyon, Helena has become more than a mother he never knew. She is the proof that the line was maintenance, not dynasty, and that sacrifice is too pretty a word for labor no one else was willing to name."
    ],
    profile: [
      { label: "Affiliation", value: "Morningstar line, Faithel memory" },
      { label: "Archive label", value: "Living anchor" },
      { label: "Legacy", value: "Survival by repositioning, not surrender" }
    ],
    relationships: [
      "Jacob loved her because her silence told the truth before her words did.",
      "Jack inherits her stubbornness long before he understands where it came from.",
      "Asha remembers Helena as a custodian, not a victim."
    ],
    inMorningstar: [
      "Helena changes the family mystery into a history of labor and choice.",
      "Her memory breaks the crown-shaped lie around the Morningstar line."
    ]
  },
  {
    id: "jacob",
    name: "Jacob",
    initial: "J",
    category: "Character",
    origin: "Morningstar original",
    role: "Nilfgaardian escort turned protector",
    subtitle: "A frightened, competent man who chose love over orders.",
    biography: [
      "Jacob reaches Jack through a letter hidden where only need would think to look. He writes without polishing himself into a hero: he was angry, tired, observant, and late to the full meaning of Helena's burden.",
      "Assigned to escort Helena under the clean language of trade security, Jacob understood too late that custody could be another word for removal. His betrayal of orders became an act of protection, and his final usefulness was practical: routes, warnings, names, and proof.",
      "His biography matters because it refuses legend. Jacob does not give Jack glory. He gives him direction, a damaged medallion, a broken hilt, and the knowledge that a father can be absent without being empty."
    ],
    profile: [
      { label: "Former colors", value: "Nilfgaardian auxiliary" },
      { label: "Defining act", value: "Refused the handoff of Helena and the child" },
      { label: "Keepsake", value: "Letter, medallion, broken hilt" }
    ],
    relationships: [
      "He loved Helena after recognizing that her silence was not weakness.",
      "He protects Jack by leaving exact instructions instead of grand promises.",
      "Asha respects what Jacob chose, not what he claimed to be."
    ],
    inMorningstar: [
      "Jacob's proof gives Jack a father as a route rather than a myth.",
      "His letter makes the archive's violence personal and impossible to dismiss."
    ]
  },
  {
    id: "mara",
    name: "Mara",
    initial: "M",
    category: "Character",
    origin: "Morningstar original",
    role: "Roadside survivor",
    subtitle: "A woman whose practicality keeps grief from becoming theater.",
    biography: [
      "Mara belongs to the early road: inns, contracts, damp halls, and the human cost hidden behind official seals. She meets Jack before the full shape of Morningstar has emerged, when the story still looks like a witcher's work gone wrong.",
      "Her scenes matter because they refuse to let mystery become abstract. The danger around Jack touches ordinary people first: landlords, women with keys, families, hired blades, and towns trying to survive language they did not write.",
      "Mara's biography is smaller than the canyon and therefore necessary. She reminds the reader that every large secret begins by making somebody local pay for it."
    ],
    profile: [
      { label: "Affiliation", value: "The road towns" },
      { label: "Role", value: "Witness to the early black-seal pattern" },
      { label: "Tone", value: "Guarded, capable, unsentimental" }
    ],
    relationships: [
      "She meets Jack when he is still measuring the work as a contract.",
      "Her presence reveals how quickly danger becomes social rumor.",
      "She belongs to the human scale of the story."
    ],
    inMorningstar: [
      "Mara grounds the first movement of the novel in lived consequence.",
      "She shows what the offices and monsters look like before the mythology is named."
    ]
  },
  {
    id: "tala",
    name: "Tala",
    initial: "T",
    category: "Character",
    origin: "Morningstar original",
    role: "Zerrikanian guardian",
    subtitle: "A border guardian who trusts tests more than promises.",
    biography: [
      "Tala appears in the Zerrikanian movement, where old roads, desert law, and guardian custom reshape Jack's understanding of the Morningstar line. She does not greet danger politely. She tests it.",
      "Her biography is bound to threshold work: passes, rings, blades, ash water, and the old rituals that decide whether a person is only dangerous or dangerous enough to be useful.",
      "Tala's bluntness gives the eastern chapters a sharper social texture. In her world, trust is not declared. It is endured, observed, and revised after the body survives."
    ],
    profile: [
      { label: "Affiliation", value: "Zerrikanian guardians" },
      { label: "Specialty", value: "Ritual trial and border defense" },
      { label: "Temperament", value: "Direct, severe, amused by competence" }
    ],
    relationships: [
      "She tests Jack before deciding how much of him to believe.",
      "She respects Asha's stubbornness even when it complicates the order.",
      "She treats danger as a practical language."
    ],
    inMorningstar: [
      "Tala gives the Korath chapters their ritual edge.",
      "She makes the reader feel that Morningstar history is judged by living cultures, not only dead ledgers."
    ]
  },
  {
    id: "saesenthessis",
    name: "Saesenthessis",
    initial: "S",
    category: "Character",
    origin: "Witcher canon, reworked in Morningstar",
    role: "Dragon and witness",
    subtitle: "A stillness old enough to make politics look brief.",
    biography: [
      "Saesenthessis belongs to the older, stranger edge of the Witcher world: a dragon whose presence makes every human category feel temporary. In Morningstar, she becomes less spectacle than witness.",
      "Her power lies in restraint. Around Jack, Ciri, and the canyon, her stillness often matters as much as speech. She watches the human argument over blood, office, and seal from a height that makes ownership look absurd.",
      "The story uses her as a reminder that dragons do not need to announce themselves to shape history. Sometimes the most dangerous creature in the room is the one refusing to reduce truth to paperwork."
    ],
    profile: [
      { label: "Affiliation", value: "Dragonkind, Zerrikanian memory" },
      { label: "Function", value: "Witness to old power" },
      { label: "Presence", value: "Quiet, ancient, politically inconvenient" }
    ],
    relationships: [
      "She observes Jack as a hinge between bloodline and seal.",
      "She recognizes the danger of humans turning old work into ownership.",
      "Her stillness contrasts with the office's hunger to classify."
    ],
    inMorningstar: [
      "Saesenthessis deepens the dragon mythology around Zerrikania.",
      "She helps the canyon feel older than the people trying to control it."
    ]
  },
  {
    id: "merek",
    name: "Merek",
    initial: "M",
    category: "Character",
    origin: "Morningstar original",
    role: "Black Ink clerk",
    subtitle: "A bureaucrat who begins to understand the cost of the file.",
    biography: [
      "Merek is one of the most useful minor figures because he shows the Black Ink Office from the inside. He is not a monster with claws. He is a man trained to make impossible things fit a line of text.",
      "After the canyon, his certainty begins to rot. The report says too much and not enough. The office wants containment language, but Merek can feel the story escaping the drawer.",
      "His biography is the biography of institutional doubt: the moment a clerk realizes the record may be less truthful than the rumor."
    ],
    profile: [
      { label: "Affiliation", value: "Black Ink Office" },
      { label: "Conflict", value: "Record versus truth" },
      { label: "Symbol", value: "The human face of paperwork" }
    ],
    relationships: [
      "He is connected to Jack through reports, not friendship.",
      "He sees how the Morningstar name becomes dangerous after the canyon.",
      "He exposes the office's fear of losing narrative control."
    ],
    inMorningstar: [
      "Merek makes the aftermath political without turning it abstract.",
      "He shows how Jack's choice damages the office's ability to own the story."
    ]
  },
  {
    id: "ciri",
    name: "Ciri",
    initial: "C",
    category: "Character",
    origin: "Witcher canon",
    role: "Claimant, survivor, companion",
    subtitle: "A Child of Destiny who refuses to remain a useful symbol.",
    biography: [
      "In Witcher canon, Ciri is Geralt's adopted daughter and a figure of extraordinary power, famously hunted by the Wild Hunt in The Witcher 3. Her Elder Blood makes her politically and magically valuable long before anyone asks what she wants.",
      "Morningstar uses that history carefully. Ciri enters the eastern road already surrounded by escorts, claims, and people trying to turn her existence into leverage. Around Jack, she becomes less symbol than person: sharp, watchful, and unwilling to be filed into someone else's plan.",
      "At the canyon, the office tries to use her legitimacy as pressure. Ciri answers by moving, choosing the living crisis over the legal trap."
    ],
    profile: [
      { label: "Canon lineage", value: "Elder Blood, Cintran inheritance" },
      { label: "Found family", value: "Adopted daughter of Geralt and Yennefer" },
      { label: "Morningstar role", value: "Companion and political pressure point" }
    ],
    relationships: [
      "Geralt and Yennefer are her family in the deep, complicated Witcher sense.",
      "Jack sees her as a person before he treats her as a claimant.",
      "The office sees her presence as leverage and misjudges the result."
    ],
    inMorningstar: [
      "Ciri helps shift the road from solitary survival to chosen company.",
      "Her presence makes the canyon's legal trap personal rather than procedural."
    ]
  },
  {
    id: "geralt",
    name: "Geralt",
    initial: "G",
    category: "Character",
    origin: "Witcher canon",
    role: "Witcher of the Wolf School",
    subtitle: "The professional who knows a road can lie.",
    biography: [
      "Geralt of Rivia is the Witcher world's central monster slayer: trained from childhood, mutated for the work, and bound to the practical violence of the Path. The official Witcher 3 framing calls the world one that needs a professional, not a hero.",
      "In Morningstar, Geralt has already survived enough to prefer context over comfort. At Corvo Bianco, he gives Jack language for old disturbances: soft ground, places that warn before they become disasters.",
      "He becomes a steady witness to Jack's cost. His final advice is not sentimental. It is the older witcher's warning that payment does not end a burden; it changes the way the burden is carried."
    ],
    profile: [
      { label: "School", value: "Wolf School" },
      { label: "Home ground", value: "Kaer Morhen, Corvo Bianco" },
      { label: "Morningstar role", value: "Mentor, witness, difficult family" }
    ],
    relationships: [
      "Ciri is his adopted daughter and one of the central facts of his life.",
      "Yennefer is his true, complicated love.",
      "Jack receives from Geralt the rare gift of unsentimental context."
    ],
    inMorningstar: [
      "Geralt connects Jack's new burden to older witcher knowledge.",
      "He makes the crossover feel inherited rather than ornamental."
    ]
  },
  {
    id: "yennefer",
    name: "Yennefer",
    initial: "Y",
    category: "Character",
    origin: "Witcher canon",
    role: "Sorceress of Vengerberg",
    subtitle: "A mind sharp enough to cut through official mercy.",
    biography: [
      "Yennefer of Vengerberg is one of the defining sorceresses of the Witcher universe: a powerful mage, Geralt's great love, and a mother figure to Ciri. Her canon history is full of politics, magic, and the cost of wanting a life that power keeps complicating.",
      "In Morningstar, she enters as an analyst of old records and wrong language. She understands immediately that offices can make violence look civic if the sentence is polished enough.",
      "Her relationship with Jack grows out of scrutiny before softness. She reads him as both a man and a problem, then remains when the problem becomes a cost no one can safely admire."
    ],
    profile: [
      { label: "Profession", value: "Sorceress" },
      { label: "Canon ties", value: "Geralt's love, Ciri's mother figure" },
      { label: "Morningstar role", value: "Investigator, protector, chosen companion" }
    ],
    relationships: [
      "She and Geralt carry a long, difficult history that still shapes rooms.",
      "She treats Ciri's freedom as more important than anyone's paperwork.",
      "With Jack, she refuses both sentimentality and bureaucratic ownership."
    ],
    inMorningstar: [
      "Yennefer makes the record-reading scenes feel dangerous.",
      "At the basin, she helps hold the moment open long enough for Jack's choice to remain his."
    ]
  },
  {
    id: "triss",
    name: "Triss Merigold",
    initial: "T",
    category: "Character",
    origin: "Witcher canon",
    role: "Sorceress and healer",
    subtitle: "Warmth with discipline behind it.",
    biography: [
      "Triss Merigold is a major Witcher sorceress, remembered in canon as the Fourteenth of the Hill after Sodden and known for her ties to Geralt, Yennefer, Ciri, and the Lodge of Sorceresses.",
      "In Morningstar, Triss appears at Corvo Bianco as practical care rather than decoration. She asks precise questions, feeds people who would rather pretend they do not need feeding, and keeps tenderness disciplined enough to be useful.",
      "Her role is quiet but important: she makes refuge feel real without making it safe. Around Jack, information lands better because Triss insists the body matters too."
    ],
    profile: [
      { label: "Profession", value: "Sorceress, healer, political actor" },
      { label: "Canon title", value: "Fourteenth of the Hill" },
      { label: "Morningstar role", value: "Care, questions, Corvo Bianco warmth" }
    ],
    relationships: [
      "She is a close friend of Geralt and Yennefer in Witcher canon.",
      "She has a sisterly history with Ciri.",
      "She reads Jack's exhaustion as data, not weakness."
    ],
    inMorningstar: [
      "Triss gives the early Corvo Bianco chapters their humane counterweight.",
      "She helps distinguish comfort from denial."
    ]
  },
  {
    id: "dandelion",
    name: "Dandelion",
    initial: "D",
    category: "Character",
    origin: "Witcher canon",
    role: "Bard and chronicler",
    subtitle: "The man most likely to turn survival into a ballad.",
    biography: [
      "Dandelion, also known as Jaskier in Polish and some adaptations, is Geralt's famous bard companion in Witcher canon: poet, performer, memoirist, and professional maker of trouble.",
      "He does not need to stand at the canyon to matter to Morningstar's world. The novel is deeply concerned with who controls a story after blood has dried, and Dandelion represents the dangerous mercy of narrative: songs can preserve truth, distort it, or make it impossible for an office to bury.",
      "In a Morningstar companion shelf, Dandelion belongs as a canon profile because the aftermath of Jack's sacrifice quickly becomes rumor, tavern song, and political problem."
    ],
    profile: [
      { label: "Profession", value: "Bard, poet, chronicler" },
      { label: "Canon tie", value: "Geralt's closest friend" },
      { label: "Morningstar relevance", value: "Rumor, song, public memory" }
    ],
    relationships: [
      "His canon friendship with Geralt gives him a natural place near any story the road starts repeating.",
      "His art contrasts with Black Ink paperwork: both preserve, but only one admits it is shaping the truth.",
      "He belongs to the part of the world that turns private cost into public legend."
    ],
    inMorningstar: [
      "Dandelion's profile helps frame the novel's concern with story ownership.",
      "He is an optional canon lens for the songs and rumors that follow the canyon."
    ]
  },
  {
    id: "vesemir",
    name: "Vesemir",
    initial: "V",
    category: "Character",
    origin: "Witcher canon",
    role: "Elder witcher of Kaer Morhen",
    subtitle: "The old teacher whose absence still instructs.",
    biography: [
      "Vesemir is canonically the oldest and most experienced witcher of Kaer Morhen, a father figure to Geralt and the Wolf School. His history is tied to survival, training, and the old keep's damaged memory.",
      "In Morningstar, Vesemir matters through records, hidden ledgers, and the kind of preparation that outlives the person who made it. His notes point Jack toward the Morningstar line and the seal's maintenance geometry.",
      "He is biography by residue: handwriting, warnings, omissions, and a keep that has been waiting for the world to catch up."
    ],
    profile: [
      { label: "School", value: "Wolf School" },
      { label: "Canon role", value: "Mentor and father figure" },
      { label: "Morningstar role", value: "Posthumous guide through records" }
    ],
    relationships: [
      "He shaped Geralt and the old culture of Kaer Morhen.",
      "His surviving notes become a bridge between witcher history and Morningstar duty.",
      "Jack inherits part of Vesemir's caution through the archive."
    ],
    inMorningstar: [
      "Vesemir gives the Kaer Morhen chapters their sense of old responsibility.",
      "His records make the Morningstar reveal feel discovered, not invented."
    ]
  },
  {
    id: "eredin",
    name: "Eredin",
    initial: "E",
    category: "Character",
    origin: "Witcher canon",
    role: "King of the Wild Hunt",
    subtitle: "The ruler behind the spectral riders who wanted Ciri's power.",
    biography: [
      "Eredin Breacc Glas is known in Witcher canon as the King of the Wild Hunt, the leader of riders feared across the Continent as omens of death, war, and disaster. The Witcher 3 frames the Hunt's pursuit of Ciri around the incredible power others want to claim from her.",
      "As a biography entry inside Morningstar, Eredin functions less as a present antagonist than as pressure from Ciri's past. He explains why a person with Elder Blood learns to distrust every institution that calls her valuable.",
      "His relevance to Jack is indirect but sharp. Morningstar is also a story about people being reduced to mechanisms, bloodlines, and useful symbols; Eredin is one of the clearest canon examples of that hunger."
    ],
    profile: [
      { label: "People", value: "Aen Elle" },
      { label: "Command", value: "Wild Hunt, Red Riders" },
      { label: "Morningstar relevance", value: "A warning about power hunting blood" }
    ],
    relationships: [
      "He hunts Ciri because her power can serve his people's ambitions.",
      "Geralt's search for Ciri places him against the Wild Hunt's claim.",
      "His legend makes Ciri's suspicion of custody and leverage feel earned."
    ],
    inMorningstar: [
      "Eredin's profile clarifies the shadow behind Ciri's history.",
      "He deepens the app's biography archive without pulling the novel away from Jack."
    ]
  }
];

export const loreNoteDetails: CompanionItem[] = [
  {
    id: "the-path",
    name: "The Path",
    initial: "P",
    category: "Lore Note",
    origin: "Witcher and Morningstar lore",
    role: "Road, profession, spiritual pressure",
    subtitle: "Contracts, roads, and the cost of motion.",
    biography: [
      "The Path is Jack's witcher life before it becomes a larger inheritance problem. It is not adventure. It is repetition, suspicion, contracts, bad rooms, and the discipline of surviving places that remember too much.",
      "In Witcher tradition, the Path is the road witchers take for work. In Morningstar, it becomes a moral condition: keep moving, keep reading the ground, and do not let anyone else write the shape of your fear."
    ],
    profile: [
      { label: "Type", value: "Witcher road tradition" },
      { label: "Morningstar meaning", value: "Solitude under pressure" },
      { label: "Transformation", value: "From lonely motion to chosen company" }
    ],
    relationships: [
      "Jack begins as a man shaped by the Path.",
      "Geralt understands the Path as profession and warning.",
      "Ciri and Yennefer change what the road can mean after the canyon."
    ],
    inMorningstar: [
      "The Path teaches Jack to distrust neat answers.",
      "By the end, the road remains dangerous, but it no longer demands solitude."
    ]
  },
  {
    id: "the-chain",
    name: "The Chain",
    initial: "C",
    category: "Lore Note",
    origin: "Morningstar lore",
    role: "Barbed-star inheritance",
    subtitle: "An heirloom that behaves like recognition.",
    biography: [
      "The chain and barbed-star disk are not simple heirlooms. They answer to old sites, old pressure, and the hidden work of the Morningstar line.",
      "Across the novel, the chain warms, chills, pulls, and refuses to remain decorative. Its reactions teach Jack that inheritance can be a mechanism before it becomes a memory."
    ],
    profile: [
      { label: "Object", value: "Barbed-star disk and chain" },
      { label: "Linked to", value: "Morningstar seal, anchor sites, blood memory" },
      { label: "Final meaning", value: "Identity after the mechanism is gone" }
    ],
    relationships: [
      "Asha understands the chain as stewardship rather than ornament.",
      "Jack reads its behavior before he understands its history.",
      "The basin answers the same older geometry the chain has been pointing toward."
    ],
    inMorningstar: [
      "The chain makes hidden inheritance tactile.",
      "After the canyon, returning the disk marks the end of one kind of need."
    ]
  },
  {
    id: "the-korath",
    name: "The Korath",
    initial: "K",
    category: "Lore Note",
    origin: "Morningstar lore",
    role: "Desert of memory and tests",
    subtitle: "Where myth becomes maintenance.",
    biography: [
      "The Korath is where the Morningstar secret stops being a northern mystery. The desert reveals older stewardship, harsher tests, and a culture that remembers duty without dressing it as glory.",
      "Its markers, passes, shrines, and heat strip the myth down to use. What matters in the Korath is not whether a story sounds noble, but whether it can survive the next mile."
    ],
    profile: [
      { label: "Region", value: "Eastern desert and guardian routes" },
      { label: "Associated with", value: "Faithel, Tala, old anchor sites" },
      { label: "Theme", value: "Memory under pressure" }
    ],
    relationships: [
      "Asha leads Jack into the Korath because the truth lives there in practice.",
      "Tala tests him according to its guardian customs.",
      "The barbed-star disk becomes more certain the farther east Jack rides."
    ],
    inMorningstar: [
      "The Korath changes Morningstar from secret to duty.",
      "It makes the eastern parts feel older, drier, and less forgiving than office history."
    ]
  },
  {
    id: "the-obsidian-crown",
    name: "The Obsidian Crown",
    initial: "O",
    category: "Lore Note",
    origin: "Morningstar lore",
    role: "False throne, real maintenance",
    subtitle: "The crown is the lie; the seal is the work.",
    biography: [
      "The Obsidian Crown is the story's darkest correction of power. It is not a prize waiting for Jack. It is what people call the burden when they want old maintenance to look like authority.",
      "At the anchor site, Jack learns the Morningstar line was built for warding, not ruling. The basin and seal expose the cost hidden beneath dynasty, office, myth, and every pretty word used to avoid maintenance."
    ],
    profile: [
      { label: "Symbol", value: "Crown, basin, seal, bloodline" },
      { label: "Temptation", value: "Turn duty into rule" },
      { label: "Resolution", value: "End the line as usable leverage" }
    ],
    relationships: [
      "The dragon names the cost more honestly than the office can.",
      "Black Ink wants the crown-shaped story because it can be filed.",
      "Jack refuses to let inheritance become accidental dynasty."
    ],
    inMorningstar: [
      "The Obsidian Crown reframes the whole novel's inheritance plot.",
      "It turns the finale from a victory scene into a biography of consent and loss."
    ]
  }
];
