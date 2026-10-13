export type Skin = "fair" | "light" | "olive";
export type HairColor = "black" | "brown" | "blonde" | "red" | "grey" | "white";
export type HairStyle =
  | "short"
  | "long"
  | "bob"
  | "bun"
  | "wild"
  | "wig"
  | "curly"
  | "side"
  | "shoulder"
  | "bald"
  | "crop"
  | "veil"
  | "braids"
  | "ponytail";
export type FacialHair = "none" | "beard" | "mustache" | "sideburns";

export type Look = {
  skin: Skin;
  hair: HairColor;
  style: HairStyle;
  face: FacialHair;
  glasses?: boolean;
};

const look = (skin: Skin, hair: HairColor, style: HairStyle, face: FacialHair, glasses?: boolean): Look => ({
  skin,
  hair,
  style,
  face,
  glasses,
});

export const LOOKS: Record<string, Look> = {
  "hildegard-of-bingen": look("fair", "brown", "veil", "none"),
  regiomontanus: look("fair", "brown", "short", "none"),
  "johannes-gutenberg": look("fair", "grey", "short", "beard"),
  "martin-behaim": look("fair", "brown", "short", "beard"),
  "tilman-riemenschneider": look("fair", "brown", "short", "none"),
  "lucas-cranach": look("fair", "brown", "short", "beard"),
  "albrecht-durer": look("fair", "brown", "long", "beard"),
  "adam-ries": look("fair", "brown", "short", "beard"),
  "martin-luther": look("fair", "brown", "short", "none"),
  "katharina-von-bora": look("fair", "blonde", "braids", "none"),
  "heinrich-schutz": look("fair", "brown", "short", "beard"),
  "johannes-kepler": look("fair", "brown", "short", "beard"),
  "maria-kirch": look("fair", "brown", "bun", "none"),
  "ehrenfried-tschirnhaus": look("fair", "brown", "wig", "none"),
  "gottfried-wilhelm-leibniz": look("fair", "brown", "wig", "none"),
  "otto-von-guericke": look("fair", "grey", "shoulder", "mustache"),
  "maria-sibylla-merian": look("fair", "brown", "bun", "none"),
  "johann-friedrich-bottger": look("fair", "brown", "wig", "none"),
  "daniel-fahrenheit": look("fair", "brown", "wig", "none"),
  "johann-sebastian-bach": look("fair", "white", "wig", "none"),
  "georg-friedrich-handel": look("fair", "white", "wig", "none"),
  "immanuel-kant": look("fair", "white", "wig", "none"),
  "dorothea-erxleben": look("fair", "brown", "bun", "none"),
  "moses-mendelssohn": look("fair", "brown", "short", "none"),
  "johann-wolfgang-von-goethe": look("fair", "grey", "short", "none"),
  "friedrich-schiller": look("fair", "blonde", "curly", "none"),
  "caroline-herschel": look("fair", "white", "bun", "none"),
  "wilhelm-von-humboldt": look("fair", "brown", "short", "none"),
  "alexander-von-humboldt": look("fair", "white", "side", "none"),
  "friedrich-frobel": look("fair", "white", "bald", "beard"),
  "carl-friedrich-gauss": look("fair", "white", "short", "none"),
  "friedrich-bessel": look("fair", "brown", "short", "none"),
  "joseph-von-fraunhofer": look("fair", "brown", "short", "none"),
  "johann-gottfried-galle": look("fair", "grey", "short", "beard"),
  "jacob-grimm": look("fair", "grey", "short", "none"),
  "wilhelm-grimm": look("fair", "brown", "short", "none"),
  "eta-hoffmann": look("fair", "brown", "wild", "none"),
  "karl-drais": look("fair", "brown", "short", "sideburns"),
  "ludwig-van-beethoven": look("fair", "brown", "wild", "none"),
  "caspar-david-friedrich": look("fair", "blonde", "side", "sideburns"),
  "hoffmann-von-fallersleben": look("fair", "grey", "short", "beard"),
  "heinrich-heine": look("fair", "brown", "curly", "sideburns"),
  "annette-von-droste-hulshoff": look("fair", "brown", "long", "none"),
  "felix-mendelssohn": look("fair", "brown", "curly", "none"),
  "fanny-mendelssohn-hensel": look("fair", "brown", "curly", "none"),
  "robert-schumann": look("fair", "brown", "side", "none"),
  "clara-schumann": look("fair", "brown", "bun", "none"),
  "johannes-brahms": look("fair", "grey", "bald", "beard"),
  "theodor-fontane": look("fair", "white", "short", "beard"),
  "louise-otto-peters": look("fair", "brown", "bun", "none"),
  "karl-marx": look("fair", "grey", "wild", "beard"),
  "friedrich-engels": look("fair", "brown", "short", "beard"),
  "otto-von-bismarck": look("fair", "grey", "bald", "mustache"),
  "justus-von-liebig": look("fair", "grey", "short", "sideburns"),
  "friedrich-wohler": look("fair", "grey", "bald", "sideburns"),
  "august-kekule": look("fair", "grey", "short", "beard"),
  "georg-ohm": look("fair", "brown", "short", "sideburns"),
  "matthias-schleiden": look("fair", "brown", "short", "beard"),
  "theodor-schwann": look("fair", "brown", "short", "none"),
  "rudolf-virchow": look("fair", "grey", "bald", "beard"),
  "werner-von-siemens": look("fair", "grey", "short", "beard"),
  "carl-zeiss": look("fair", "grey", "short", "beard"),
  "ernst-abbe": look("fair", "brown", "short", "beard", true),
  "robert-bosch": look("fair", "grey", "bald", "mustache"),
  "nikolaus-otto": look("fair", "brown", "short", "beard"),
  "karl-benz": look("fair", "white", "bald", "mustache"),
  "bertha-benz": look("fair", "brown", "bun", "none"),
  "gottlieb-daimler": look("fair", "white", "short", "beard"),
  "wilhelm-maybach": look("fair", "grey", "short", "mustache"),
  "rudolf-diesel": look("fair", "black", "short", "mustache"),
  "heinrich-hertz": look("fair", "brown", "short", "beard"),
  "philipp-reis": look("fair", "brown", "short", "beard"),
  "robert-koch": look("fair", "grey", "short", "beard", true),
  "emil-von-behring": look("fair", "grey", "short", "mustache"),
  "paul-ehrlich": look("fair", "grey", "bald", "mustache", true),
  "wilhelm-rontgen": look("fair", "black", "short", "beard"),
  "max-planck": look("fair", "grey", "bald", "mustache", true),
  "emmy-noether": look("fair", "brown", "bun", "none", true),
  "albert-einstein": look("fair", "white", "wild", "mustache"),
  "lise-meitner": look("fair", "brown", "bun", "none"),
  "otto-hahn": look("fair", "grey", "bald", "mustache"),
  "fritz-strassmann": look("fair", "brown", "short", "none"),
  "carl-bosch": look("fair", "grey", "bald", "mustache"),
  "fritz-haber": look("fair", "grey", "bald", "mustache", true),
  "david-hilbert": look("fair", "grey", "bald", "beard", true),
  "maria-goeppert-mayer": look("fair", "brown", "short", "none"),
  "max-born": look("fair", "grey", "bald", "none", true),
  "otto-lilienthal": look("fair", "brown", "bald", "mustache"),
  "ferdinand-von-zeppelin": look("fair", "white", "bald", "mustache"),
  "hugo-junkers": look("fair", "grey", "bald", "mustache"),
  "hans-von-ohain": look("fair", "brown", "crop", "none"),
  "felix-hoffmann": look("fair", "brown", "short", "none"),
  "arthur-eichengrun": look("fair", "brown", "short", "none"),
  "emil-berliner": look("fair", "brown", "short", "beard"),
  "levi-strauss": look("fair", "grey", "short", "beard"),
  "melitta-bentz": look("fair", "brown", "bun", "none"),
  "margarete-steiff": look("fair", "grey", "bun", "none"),
  "kathe-kollwitz": look("fair", "grey", "bun", "none"),
  "paula-modersohn-becker": look("fair", "brown", "shoulder", "none"),
  "erich-kastner": look("fair", "brown", "short", "none", true),
  "thomas-mann": look("fair", "grey", "short", "mustache"),
  "hermann-hesse": look("fair", "grey", "bald", "none", true),
  "bertolt-brecht": look("fair", "brown", "crop", "none"),
  "kurt-weill": look("fair", "brown", "short", "none", true),
  "annelies-frank": look("fair", "black", "shoulder", "none"),
  "sophie-scholl": look("fair", "brown", "bob", "none"),
  "dietrich-bonhoeffer": look("fair", "brown", "short", "none", true),
  "wernher-von-braun": look("fair", "brown", "short", "none"),
  "konrad-zuse": look("fair", "brown", "short", "none", true),
  "juergen-dethloff": look("fair", "grey", "short", "none"),
  "karlheinz-brandenburg": look("fair", "brown", "short", "none"),
  "konrad-adenauer": look("fair", "grey", "bald", "none"),
  "ludwig-erhard": look("fair", "grey", "bald", "none", true),
  "willy-brandt": look("fair", "grey", "short", "none"),
  "helmut-kohl": look("fair", "brown", "short", "none"),
  "hannah-arendt": look("fair", "black", "short", "none"),
  "nelly-sachs": look("fair", "brown", "short", "none"),
  "marlene-dietrich": look("fair", "blonde", "bob", "none"),
  "elly-beinhorn": look("fair", "blonde", "short", "none"),
  "michael-ende": look("fair", "grey", "bald", "beard"),
  "otfried-preussler": look("fair", "grey", "short", "none", true),
  "cornelia-funke": look("fair", "brown", "shoulder", "none"),
  "hans-riegel": look("fair", "brown", "short", "none"),
  "hans-beck": look("fair", "grey", "short", "none", true),
  "artur-fischer": look("fair", "grey", "short", "none"),
  "christiane-nusslein-volhard": look("fair", "blonde", "short", "none"),
  "harald-zur-hausen": look("fair", "grey", "short", "none"),
  "angela-merkel": look("fair", "blonde", "bob", "none"),
  "steffi-graf": look("fair", "blonde", "ponytail", "none"),
  "franz-beckenbauer": look("fair", "brown", "short", "none"),
  "birgit-prinz": look("fair", "blonde", "ponytail", "none"),
  "dirk-nowitzki": look("fair", "brown", "crop", "none"),
  "mesut-ozil": look("olive", "black", "crop", "beard"),
};

export function lookFor(slug: string): Look {
  return LOOKS[slug] ?? look("fair", "brown", "short", "none");
}
