const normalize = (str) =>
  String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export const smartSearch = (items, query, fields) => {
  if (!query || !query.trim()) return items;

  const q = normalize(query);
  const terms = q.split(/\s+/).filter(Boolean);

  const getFieldValue = (item, key) => {
    const val = typeof key === "function" ? key(item) : item[key];
    return Array.isArray(val) ? val.join(" ") : val;
  };

  const scored = items.map((item) => {
    let score = 0;

    for (const field of fields) {
      const key = typeof field === "string" ? field : field.key;
      const weight = typeof field === "string" ? 1 : field.weight || 1;
      const value = normalize(getFieldValue(item, key));
      if (!value) continue;

      if (value.startsWith(q)) score += 30 * weight;
      if (value.includes(q)) score += 20 * weight;
      for (const term of terms) {
        if (value.includes(term)) score += 5 * weight;
      }
    }

    return { item, score };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
};