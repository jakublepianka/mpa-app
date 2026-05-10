const HUMAN_GROUPS = [
  "women",
  "men",
  "females",
  "males",
  "patients",
  "athletes",
  "players",
  "adults",
  "children",
  "adolescents",
  "students",
  "employees",
  "workers",
  "volunteers",
  "staff",
  "youth",
  "residents",
  "teachers",
  "nurses",
  "firefighters",
  "officers",
  "soldiers",
  "drivers",
  "adults with disabilities",
  "gymnasts",
  "sprinters",
  "runners",
  "acrobats",
  "para-athletes",
  "people",
  "individuals",
  "general population",
];

const WITH_CLAUSE_PATTERN = new RegExp(
  `\\b(?<sampleType>(?:${HUMAN_GROUPS.join("|")})\\b(?:\\s+(?:\\w+(?:-\\w+)?)){0,2}\\s+with\\s+(?:\\w+(?:-\\w+)?\\s*){1,6})(?=\\s*(?:during|after|using|undergoing)|[().,;:]|$)`,
  "i",
);

const BASIC_PATTERN = new RegExp(
  `(?:among|of|in|for)\\s+(?<sampleType>(?:(?:\\w+(?:-\\w+)?\\s){0,3})?(?:${HUMAN_GROUPS.join("|")}))\\b`,
  "i",
);
// "rats",
// "mice",
// "fish",
// "cattle",
// "cows"

export const SAMPLE_TYPE_PATTERNS = [
  WITH_CLAUSE_PATTERN,
  // new RegExp(
  // `(?<sampleType>(?:${HUMAN_GROUPS.join("|")})(?:\\s+\\w+){0,2}\\s+with\\s+(?:\\w+(?:-\\w+)?\\s*){1,5})(?=\\s+(?:during|after|using|undergoing)|[.,;:]|$)`,
  // "i",
  // ),
  BASIC_PATTERN,
  // new RegExp(
  // `(?:among|of|in|for)\\s+(?<sampleType>(?:\\w+(?:-\\w+)?\\s){0,3})(?:${HUMAN_GROUPS.join("|")})\\b`,
  // "i",
  // ),
];
