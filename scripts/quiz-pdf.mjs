import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { questions } from "../src/data/quiz.ts";

const STATE_DE = {
  "Baden-Württemberg": "Baden-Württemberg",
  Bavaria: "Bayern",
  Berlin: "Berlin",
  Brandenburg: "Brandenburg",
  Bremen: "Bremen",
  Hamburg: "Hamburg",
  Hesse: "Hessen",
  "Mecklenburg-Western Pomerania": "Mecklenburg-Vorpommern",
  "Lower Saxony": "Niedersachsen",
  "North Rhine-Westphalia": "Nordrhein-Westfalen",
  "Rhineland-Palatinate": "Rheinland-Pfalz",
  Saarland: "Saarland",
  Saxony: "Sachsen",
  "Saxony-Anhalt": "Sachsen-Anhalt",
  "Schleswig-Holstein": "Schleswig-Holstein",
  Thuringia: "Thüringen",
};

const KNOWN = {
  "printing with movable metal type in Mainz": "den Druck mit beweglichen Metalllettern in Mainz",
  "wanting to reform the church": "den Wunsch, die Kirche zu erneuern",
  "rules for how planets move": "Regeln dafür, wie Planeten sich bewegen",
  "calculus, which Newton also worked on": "die Infinitesimalrechnung, an der auch Newton gearbeitet hat",
  "paintings of insects and plants": "Bilder von Insekten und Pflanzen",
  "organ music and church music": "Orgelmusik und Kirchenmusik",
  "music, after growing up in Halle": "Musik, nachdem er in Halle aufgewachsen ist",
  "questions about what people can know": "Fragen dazu, was Menschen wissen können",
  "poems, plays, and Faust": "Gedichte, Theaterstücke und den Faust",
  "plays and the poem Ode to Joy": "Theaterstücke und das Gedicht An die Freude",
  "measuring lands where other people already lived": "das Messen von Ländern, in denen schon andere Menschen lebten",
  "deep work in numbers": "gründliche Arbeit mit Zahlen",
  "finding comets in England": "Kometen, die sie in England gefunden hat",
  "writing down old tales with his brother": "alte Geschichten, die er mit seinem Bruder aufgeschrieben hat",
  "symphonies, after a childhood in Bonn": "Sinfonien, nach einer Kindheit in Bonn",
  "the kindergarten": "den Kindergarten",
  "paintings and prints": "Gemälde und Drucke",
  "piano playing and her own music": "Klavierspiel und ihre eigene Musik",
  "a rule about electric current": "eine Regel zum elektrischen Strom",
  "an early car, the Patent-Motorwagen": "ein frühes Auto, den Patent-Motorwagen",
  "driving a car a long way in 1888": "eine lange Autofahrt im Jahr 1888",
  "the diesel engine": "den Dieselmotor",
  "X-rays": "Röntgenstrahlen",
  "finding germs that cause some diseases": "Keime, die manche Krankheiten machen",
  "new ideas about light, time, and gravity": "neue Ideen zu Licht, Zeit und Schwerkraft",
  "algebra and symmetry": "Algebra und Symmetrie",
  "sharing the fission work": "die gemeinsame Arbeit an der Kernspaltung",
  "sharing the fission experiments": "die gemeinsamen Spaltungsversuche",
  "helping make plant food from the air": "Hilfe dabei, Pflanzennahrung aus der Luft zu machen",
  "an early programmable computer": "einen frühen programmierbaren Computer",
  "the paper coffee filter": "den Papier-Kaffeefilter",
  "stuffed toy animals": "Stofftiere",
  "a diary": "ein Tagebuch",
  "papers that said the government was wrong": "Blätter, auf denen stand, dass die Regierung Unrecht hatte",
  "being the first chancellor of West Germany": "das Amt als erster Kanzler von Westdeutschland",
  "science training and years as chancellor": "eine Ausbildung als Wissenschaftlerin und Jahre als Kanzlerin",
  "how a fruit fly's body takes shape": "die Frage, wie der Körper einer Fruchtfliege seine Form bekommt",
  "MP3 work on a Fraunhofer team": "die MP3-Arbeit in einem Fraunhofer-Team",
  "jeans made in America with Jacob Davis": "Jeans, die er in Amerika mit Jacob Davis gemacht hat",
  "Emil and the Detectives": "Emil und die Detektive",
};

const PROMPTS = {
  "The Kölner Dom is in which city?": "In welcher Stadt steht der Kölner Dom?",
  "What is Cologne Cathedral called in German?": "Wie heißt die Kathedrale von Köln auf Deutsch?",
  "What is true about Schloss Neuschwanstein?": "Was stimmt über Schloss Neuschwanstein?",
  "Neuschwanstein stands in which state?": "In welchem Bundesland steht Neuschwanstein?",
  "The Brandenburger Tor is in which city?": "In welcher Stadt steht das Brandenburger Tor?",
  "Which parliament meets in the Reichstag building now?": "Welches Parlament tagt jetzt im Reichstagsgebäude?",
  "Sanssouci Palace is in which city?": "In welcher Stadt steht Schloss Sanssouci?",
  "The Wartburg stands above which town?": "Über welcher Stadt steht die Wartburg?",
  "Heidelberg sits on which river?": "An welchem Fluss liegt Heidelberg?",
  "The Lorelei rock is on which river?": "An welchem Fluss liegt der Lorelei-Felsen?",
  "The tale of a singer at the Lorelei is what?": "Was ist die Geschichte von einer Sängerin an der Lorelei?",
  "The Zugspitze is which of these?": "Was ist die Zugspitze?",
  "The rebuilt Frauenkirche is in which city?": "In welcher Stadt steht die wieder aufgebaute Frauenkirche?",
  "Hamburger Hafen is known for what?": "Wofür ist der Hamburger Hafen bekannt?",
  "The Holstentor is in which town?": "In welcher Stadt steht das Holstentor?",
  "Aachen's old chapel is linked with which king?": "Mit welchem König ist die alte Kapelle in Aachen verbunden?",
  "Charlemagne was which kind of king?": "Was für ein König war Karl der Große?",
  "The Porta Nigra is in which city?": "In welcher Stadt steht die Porta Nigra?",
  "Luther's castle church on this site is in which town?": "In welcher Stadt steht Luthers Schlosskirche auf dieser Seite?",
  "Goethe and Schiller both lived in which town?": "In welcher Stadt haben Goethe und Schiller beide gelebt?",
  "The Wattenmeer is which place?": "Welcher Ort ist das Wattenmeer?",
  "The Donau at Passau is which river?": "Welcher Fluss ist die Donau bei Passau?",
  "The Berlin memorial is a place to remember whom?": "An wen erinnert die Gedenkstätte in Berlin?",
  "Movable type was already used in which places before Gutenberg?": "Wo hat man bewegliche Lettern schon vor Gutenberg benutzt?",
  "Who else, besides Leibniz, worked on calculus?": "Wer hat außer Leibniz an der Infinitesimalrechnung gearbeitet?",
  "The diphtheria serum work was shared with whom?": "Mit wem wurde die Arbeit am Diphtherie-Serum geteilt?",
  "Porcelain was made where, long before Meissen?": "Wo wurde Porzellan schon lange vor Meißen gemacht?",
  "Who else belongs in the telephone story with Philipp Reis?": "Wer gehört noch in die Geschichte des Telefons, zusammen mit Philipp Reis?",
  "Who else belongs in the jet story with Hans von Ohain?": "Wer gehört noch in die Geschichte des Düsenflugzeugs, zusammen mit Hans von Ohain?",
  "What did people use for pain long before aspirin?": "Was haben Menschen lange vor dem Aspirin gegen Schmerzen benutzt?",
  "Historians still debate Arthur Eichengrün's part in aspirin. What should we say?": "Historiker sind sich über Arthur Eichengrüns Anteil am Aspirin nicht einig. Was sagen wir?",
  "MP3 was made by whom?": "Von wem wurde MP3 gemacht?",
  "Who in America also made a teddy when Steiff did?": "Wer in Amerika hat zur gleichen Zeit einen Teddy gemacht wie Steiff?",
  "Early computers were also built in which places, besides Zuse's Germany?": "Wo wurden frühe Computer außerdem gebaut, nicht nur bei Zuse in Deutschland?",
  "The smart-card idea was also worked on in which country?": "In welchem Land wurde auch an der Idee der Chipkarte gearbeitet?",
  "Who shared the riveted-jeans idea with Levi Strauss?": "Wer hat die Idee der genieteten Jeans mit Levi Strauss geteilt?",
  "Who else belongs in the story of recorded sound, with Emil Berliner?": "Wer gehört noch in die Geschichte der Tonaufnahme, zusammen mit Emil Berliner?",
  "Who shared the fission work with Lise Meitner?": "Wer hat die Arbeit an der Kernspaltung mit Lise Meitner geteilt?",
  "Artur Fischer's plastic wall plug was also worked on in which country?": "In welchem Land wurde auch an Artur Fischers Kunststoffdübel gearbeitet?",
  "Who shared the cell idea with Matthias Schleiden?": "Wer hat die Idee von der Zelle mit Matthias Schleiden geteilt?",
  "Galle saw Neptune because whose maths said where to look?": "Galle hat den Neptun gesehen, weil wessen Rechnung gesagt hat, wohin man schauen soll?",
  "Nikolaus Otto built a practical engine. What else is true?": "Nikolaus Otto hat einen brauchbaren Motor gebaut. Was stimmt noch?",
  "Haribo was started by Hans Riegel's father in which city?": "In welcher Stadt hat Hans Riegels Vater Haribo gegründet?",
  "Playmobil figures were designed by whom?": "Wer hat die Playmobil-Figuren entworfen?",
  "Who wrote the words of the Deutschlandlied in 1841?": "Wer hat 1841 die Worte des Deutschlandlieds geschrieben?",
  "Who wrote the anthem tune earlier, for a different song?": "Wer hat die Melodie der Hymne früher für ein anderes Lied geschrieben?",
  "In what year did the Berlin Wall open?": "In welchem Jahr ging die Berliner Mauer auf?",
  "In what year was a wall built in Berlin?": "In welchem Jahr wurde in Berlin eine Mauer gebaut?",
  "In what year was Germany one country again?": "In welchem Jahr war Deutschland wieder ein Land?",
  "In what year did two German governments begin?": "In welchem Jahr begannen zwei deutsche Regierungen?",
  "How many states does Germany have today?": "Wie viele Bundesländer hat Deutschland heute?",
  "Where does the Bundestag meet?": "Wo tagt der Bundestag?",
  "The Basic Law does what?": "Was tut das Grundgesetz?",
  "From 1949 to 1990 there were how many German governments?": "Wie viele deutsche Regierungen gab es von 1949 bis 1990?",
  "In 1871 many states became what?": "Was wurden 1871 viele Länder?",
  "The long war of the 1600s ran from which years?": "Von wann bis wann dauerte der lange Krieg im 17. Jahrhundert?",
  "From 1933 a cruel government hurt Jewish people and many others. What is true?": "Ab 1933 hat eine grausame Regierung jüdischen Menschen und vielen anderen geschadet. Was stimmt?",
  "Austria is which of these?": "Was ist Österreich?",
  "Switzerland is which of these?": "Was ist die Schweiz?",
  "German spoken in Austria means what?": "Was bedeutet es, dass man in Österreich Deutsch spricht?",
  "Where did the first farmers on this timeline live?": "Wo haben die ersten Bauern auf dieser Zeitlinie gelebt?",
  "The Pied Piper tale comes from which town?": "Aus welcher Stadt kommt die Geschichte vom Rattenfänger?",
  "The Pied Piper tale is what?": "Was ist die Geschichte vom Rattenfänger?",
  "The Grimm tales are what?": "Was sind die Märchen der Brüder Grimm?",
  "What can we say about beliefs at very old graves?": "Was können wir über den Glauben an sehr alten Gräbern sagen?",
  "Many families in Germany today are which of these?": "Was trifft auf viele Familien in Deutschland heute zu?",
  "Jewish people have been part of these towns for how long?": "Seit wann gehören jüdische Menschen zu diesen Städten?",
  "Christmas and Easter on this site are what?": "Was sind Weihnachten und Ostern auf dieser Seite?",
  "Arguments in Luther's time did what to churches?": "Was haben die Streitigkeiten zu Luthers Zeit mit den Kirchen gemacht?",
};

const CHOICE = {
  "It is a North Sea harbour": "Es ist ein Hafen an der Nordsee",
  "It is a salt mine": "Es ist ein Salzbergwerk",
  "It is a young castle built to look old": "Es ist eine junge Burg, die alt aussehen soll",
  "It is a Roman gate": "Es ist ein römisches Tor",
  "A Roman gate": "Ein römisches Tor",
  "Black Gate": "Schwarzes Tor",
  "Holsten Gate": "Holstentor",
  "Lion Gate": "Löwentor",
  "Brandenburg Gate": "Brandenburger Tor",
  "A ship's crew": "Eine Schiffsbesatzung",
  "A school choir": "Ein Schulchor",
  "The Bundestag": "Der Bundestag",
  "A town market": "Ein Wochenmarkt",
  "The Danube": "Die Donau",
  "The Weser": "Die Weser",
  "The Spree": "Die Spree",
  "The Neckar": "Der Neckar",
  "The Saar": "Die Saar",
  "The Inn": "Der Inn",
  "The Rhine": "Der Rhein",
  "The Elbe": "Die Elbe",
  "A capital city": "Eine Hauptstadt",
  "A story": "Eine Geschichte",
  "A news report": "Eine Nachricht",
  "A maths law": "Ein Rechengesetz",
  "A city-state": "Ein Stadtstaat",
  "A Baltic island": "Eine Ostseeinsel",
  "Germany's highest peak": "Der höchste Berg in Deutschland",
  Ships: "Schiffe",
  Glaciers: "Gletscher",
  "Vine terraces only": "Nur Weinberge",
  "A Roman black gate": "Ein schwarzes römisches Tor",
  "A Roman shopkeeper": "Ein römischer Händler",
  "A Frankish king of many lands": "Ein fränkischer König über viele Länder",
  "A modern German chancellor": "Ein moderner deutscher Kanzler",
  "The mayor of Hamburg": "Der Bürgermeister von Hamburg",
  "The Wadden Sea": "Das Wattenmeer",
  "The Black Forest": "Der Schwarzwald",
  "The Zugspitze": "Die Zugspitze",
  "The Moselle": "Die Mosel",
  "The Ems": "Die Ems",
  "The Ruhr": "Die Ruhr",
  "Ship crews": "Schiffsbesatzungen",
  "Jewish people who were murdered": "Jüdische Menschen, die ermordet wurden",
  "Roman builders": "Römische Bauleute",
  "Only kings": "Nur Könige",
  "China and Korea": "China und Korea",
  "Benz and Daimler": "Benz und Daimler",
  "Graf and Nowitzki": "Graf und Nowitzki",
  "Otto Hahn and Fritz Strassmann": "Otto Hahn und Fritz Strassmann",
  "The Grimm brothers": "Die Brüder Grimm",
  "Only in Bremen": "Nur in Bremen",
  "Only in Hamburg": "Nur in Hamburg",
  "Only in Kiel": "Nur in Kiel",
  "Only Mainz": "Nur Mainz",
  "Only London": "Nur London",
  "Only Vienna": "Nur Wien",
  "Coffee filters": "Kaffeefilter",
  Gliders: "Gleitflugzeuge",
  "Willow bark": "Weidenrinde",
  "Plastic bricks": "Plastikbausteine",
  "He wrote Faust": "Er schrieb den Faust",
  "We are not sure": "Wir sind nicht sicher",
  "He did it all alone": "Er hat alles allein gemacht",
  "He invented the car": "Er hat das Auto erfunden",
  "A team at Fraunhofer": "Ein Team bei Fraunhofer",
  "One child in a kitchen": "Ein Kind in einer Küche",
  "A Roman workshop": "Eine römische Werkstatt",
  "A football club": "Ein Fußballverein",
  "Only on the Zugspitze": "Nur auf der Zugspitze",
  "Only in Aachen": "Nur in Aachen",
  "Britain and America": "Großbritannien und Amerika",
  "Only in Trier": "Nur in Trier",
  "Japan's mountains only": "Nur die Berge in Japan",
  France: "Frankreich",
  "Only on Helgoland": "Nur auf Helgoland",
  Iceland: "Island",
  Britain: "Großbritannien",
  "Only in the Wadden Sea": "Nur im Wattenmeer",
  Egypt: "Ägypten",
  "A football coach": "Ein Fußballtrainer",
  "A baker": "Ein Bäcker",
  "A piper in a story": "Ein Pfeifer in einer Geschichte",
  "He built the kindergarten": "Er hat den Kindergarten gebaut",
  "He painted the Lorelei": "Er hat die Lorelei gemalt",
  "Other people were also thinking about engines": "Andere Menschen haben auch über Motoren nachgedacht",
  "Nobody else ever studied engines": "Niemand sonst hat jemals Motoren untersucht",
  "It names one castle": "Es nennt eine Burg",
  "It sets football scores": "Es legt Fußballergebnisse fest",
  "It prints pretzels": "Es druckt Brezeln",
  "It protects people's rights": "Es schützt die Rechte der Menschen",
  Sixteen: "Sechzehn",
  None: "Keine",
  Two: "Zwei",
  One: "Eine",
  "A single village": "Ein einziges Dorf",
  "One empire": "Ein Kaiserreich",
  "A kindergarten": "Ein Kindergarten",
  "A harbour only": "Nur ein Hafen",
  "1618 to 1648": "1618 bis 1648",
  "1914 to 1918": "1914 bis 1918",
  "1933 to 1945": "1933 bis 1945",
  "1840 to 1871": "1840 bis 1871",
  "That was kind": "Das war freundlich",
  "That was a game": "Das war ein Spiel",
  "That was a science fair": "Das war ein Wissenschaftsfest",
  "That was wrong": "Das war Unrecht",
  "The capital of Bayern": "Die Hauptstadt von Bayern",
  "A part of Berlin": "Ein Teil von Berlin",
  "A different country": "Ein anderes Land",
  "A German state": "Ein deutsches Bundesland",
  "A suburb of Hamburg": "Ein Vorort von Hamburg",
  "The Black Forest": "Der Schwarzwald",
  "Austria is still a different country": "Österreich ist trotzdem ein anderes Land",
  "Austria is a German state": "Österreich ist ein deutsches Bundesland",
  "Austria is Berlin": "Österreich ist Berlin",
  "Austria is the Bundestag": "Österreich ist der Bundestag",
  "In the Reichstag": "Im Reichstag",
  "In space rockets": "In Weltraumraketen",
  "In Playmobil boxes": "In Playmobil-Schachteln",
  "In small villages": "In kleinen Dörfern",
  "A car manual": "Eine Autoanleitung",
  "A law of the Bundestag": "Ein Gesetz des Bundestags",
  "A star chart": "Eine Sternkarte",
  Stories: "Geschichten",
  "Today's news": "Die Nachrichten von heute",
  "State capitals": "Landeshauptstädte",
  "Science measurements": "Wissenschaftliche Messungen",
  "They all played football": "Sie haben alle Fußball gespielt",
  "They all drove cars": "Sie sind alle Auto gefahren",
  "They all used MP3": "Sie haben alle MP3 benutzt",
  "Only sailors": "Nur Seeleute",
  "Muslim, Christian, Jewish, or of no religion": "Muslimisch, christlich, jüdisch oder ohne Religion",
  "Only one faith": "Nur ein Glaube",
  Never: "Nie",
  "Many centuries": "Viele Jahrhunderte",
  "Only since 1990": "Erst seit 1990",
  "Only one year": "Nur ein Jahr",
  "Customs many families keep": "Bräuche, die viele Familien pflegen",
  "Old borders": "Alte Grenzen",
  "Car engines": "Automotoren",
  "Computer chips": "Computerchips",
  "They ended all music": "Sie haben alle Musik beendet",
  "They built the Zugspitze": "Sie haben die Zugspitze gebaut",
  "They opened the wall in 1989": "Sie haben 1989 die Mauer geöffnet",
  "They split churches": "Sie haben die Kirchen gespalten",
  Munich: "München",
  Hanover: "Hannover",
  Cologne: "Köln",
  Nuremberg: "Nürnberg",
  Vienna: "Wien",
};

const ENGLISH_HINT = /(?<![\p{L}])(the|a|an|of|and|for|in|on|with|who|what|was|were|is|are|only|they|he|she|it|from|that|this|many|all|not|before|after|also|besides|to)(?![\p{L}])/iu;

function translatePrompt(prompt) {
  let match = prompt.match(/^What is the German name for (.+)\?$/);
  if (match) return `Wie heißt ${match[1]} auf Deutsch?`;
  match = prompt.match(/^What is the English name for (.+)\?$/);
  if (match) return `Wie heißt ${match[1]} auf Englisch?`;
  match = prompt.match(/^What is the capital of (.+)\?$/);
  if (match) return `Was ist die Hauptstadt von ${STATE_DE[match[1]] ?? match[1]}?`;
  match = prompt.match(/^Who is known for (.+)\?$/);
  if (match) {
    const known = KNOWN[match[1]];
    if (!known) throw new Error(`known: ${match[1]}`);
    return `Wer ist bekannt für ${known}?`;
  }
  match = prompt.match(/^Which place belongs with (.+) on this site\?$/);
  if (match) return `Welcher Ort gehört auf dieser Seite zu ${match[1]}?`;
  const mapped = PROMPTS[prompt];
  if (!mapped) throw new Error(`prompt: ${prompt}`);
  return mapped;
}

const missing = [];
function translateChoice(choice, prompt) {
  if (/^What is the (German|English) name /.test(prompt)) return choice;
  if (Object.prototype.hasOwnProperty.call(CHOICE, choice)) return CHOICE[choice];
  if (ENGLISH_HINT.test(choice)) {
    missing.push(choice);
    return choice;
  }
  return choice;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "\u0026amp;")
    .replaceAll("<", "\u0026lt;")
    .replaceAll(">", "\u0026gt;")
    .replaceAll('"', "\u0026quot;");
}

const letters = ["A", "B", "C", "D"];

if (questions.length !== 200) throw new Error(`expected 200 questions, got ${questions.length}`);

const blocks = questions
  .map((question, index) => {
    const german = translatePrompt(question.prompt);
    const choices = question.choices
      .map((choice, choiceIndex) => {
        const de = translateChoice(choice, question.prompt);
        const extra = de === choice ? "" : ` <span class="de">· ${escapeHtml(de)}</span>`;
        return `<li><span class="letter">${letters[choiceIndex]}</span><span class="en">${escapeHtml(choice)}${extra}</span></li>`;
      })
      .join("");
    return `<article class="q"><h2><span>${index + 1}.</span> ${escapeHtml(question.prompt)}</h2><p class="de">${escapeHtml(german)}</p><ol>${choices}</ol></article>`;
  })
  .join("\n");

if (missing.length) {
  console.error([...new Set(missing)].sort().join("\n"));
  process.exit(1);
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Quiz · Every German Ever</title>
  <style>
    @page { size: A4; margin: 16mm 14mm 18mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #1A1814; background: #F6F0E4; font-family: "Source Sans 3", "Liberation Sans", sans-serif; font-size: 12pt; line-height: 1.35; }
    header.sheet { margin-bottom: 8mm; }
    h1 { margin: 0; color: #1C3D5A; font-family: Fraunces, "Liberation Serif", serif; font-size: 22pt; font-weight: 600; line-height: 1.15; }
    .sub { margin: 2mm 0 0; color: #8A6A24; font-family: Fraunces, "Liberation Serif", serif; font-size: 13pt; }
    .lead { margin: 4mm 0 0; max-width: 38em; }
    .q { break-inside: avoid; margin: 0 0 6mm; padding-top: 1mm; }
    h2 { margin: 0; color: #1C3D5A; font-family: "Source Sans 3", "Liberation Sans", sans-serif; font-size: 12.5pt; font-weight: 650; line-height: 1.3; }
    .de { margin: 0.5mm 0 0; color: #3E4A32; }
    ol { list-style: none; margin: 1.5mm 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1mm 6mm; }
    li { display: flex; gap: 2mm; align-items: baseline; }
    .letter { font-weight: 700; color: #1C3D5A; }
    li .de { display: inline; }
  </style>
</head>
<body>
  <header class="sheet">
    <h1>Every German Ever</h1>
    <p class="sub">Deutschland für alle</p>
    <p class="lead">Quiz. 200 questions. Read the English or the German. Circle A, B, C, or D.</p>
    <p class="de">Quiz. 200 Fragen. Lies den englischen oder den deutschen Satz. Kreise A, B, C oder D ein.</p>
    <p class="lead">A class may answer in German.</p>
  </header>
  ${blocks}
</body>
</html>`;

const outDir = "/workspace/public";
mkdirSync(outDir, { recursive: true });
const htmlPath = "/tmp/every-german-ever-quiz.html";
const pdfPath = `${outDir}/every-german-ever-quiz.pdf`;
writeFileSync(htmlPath, html);

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`);
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<div></div>",
  footerTemplate:
    '<div style="width:100%;font-size:9px;color:#1A1814;text-align:center;font-family:sans-serif;">Every German Ever · <span class="pageNumber"></span></div>',
  margin: { top: "14mm", bottom: "16mm", left: "14mm", right: "14mm" },
});
await page.screenshot({ path: "/workspace/screenshots/quiz-pdf-page1.png" });
await browser.close();
console.log(pdfPath);
