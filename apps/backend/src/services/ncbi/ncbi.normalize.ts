import he from "he";

export const normalizeText = (text?: string): string | undefined => {
  if (!text) return undefined;

  return he
    .decode(text)
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
};