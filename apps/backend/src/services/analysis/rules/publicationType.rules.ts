export const PUBLICATION_TYPE_PATTERNS = [
  {
    type: "systematic review",
    patterns: [/\bsystematic review\b/i],
  },
  {
    type: "narrative review",
    patterns: [/\bnarrative review\b/i],
  },
  {
    type: "meta-analysis",
    patterns: [/\bmeta-analysis\b/i, /\bmeta analysis\b/i],
  },
  {
    type: "scoping review",
    patterns: [/\bscoping review\b/i],
  },
  {
    type: "umbrella review",
    patterns: [/\bumbrella review\b/i],
  },
  {
    type: "review",
    patterns: [/(?<!systematic\s)(?<!narrative\s)(?<!scoping\s)\breview\b/i],
  },
  {
    type: "randomized controlled trial",
    patterns: [
      /\brandomized controlled trial\b/i,
      /\brandomised controlled trial\b/i,
      /\brct\b/i,
    ],
  },
  {
    type: "randomized clinical trial",
    patterns: [
      /\brandomized clinical trial\b/i,
      /\brandomised clinical trial\b/i,
    ],
  },
  {
    type: "clinical trial",
    patterns: [/\bclinical trial\b/i],
  },
  {
    type: "case study",
    patterns: [/\bcase study\b/i],
  },
  {
    type: "comparative study",
    patterns: [/\bcomparative study\b/i],
  },
  {
    type: "observational study",
    patterns: [/\bobservational study\b/i],
  },
  {
    type: "pilot study",
    patterns: [/\bpilot study\b/i],
  },
  {
    type: "validation study",
    patterns: [/\bvalidation study\b/i],
  },
  {
    type: "experimental study",
    patterns: [/\bexperimental study\b/i],
  },
  {
    type: "mixed-methods study",
    patterns: [/\bmixed-methods study\b/i],
  },
];
