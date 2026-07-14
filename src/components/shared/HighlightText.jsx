import React from "react";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildAccentInsensitivePattern = (str) =>
  str
    .split("")
    .map((c) => {
      const map = {
        a: "[aáàâãä]",
        e: "[eéèêë]",
        i: "[iíìîï]",
        o: "[oóòôõö]",
        u: "[uúùûü]",
        c: "[cç]",
      };
      return map[c.toLowerCase()] || escapeRegex(c);
    })
    .join("");

export default function HighlightText({ text, query, className }) {
  if (!text) return null;
  if (!query || !query.trim()) return <span className={className}>{text}</span>;

  const terms = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(buildAccentInsensitivePattern);

  if (terms.length === 0) return <span className={className}>{text}</span>;

  const regex = new RegExp(`(${terms.join("|")})`, "gi");
  const parts = String(text).split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="bg-[#46BEE6]/30 text-[#735AAA] font-semibold rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}