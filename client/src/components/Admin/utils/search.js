export const filterItems = (items, query, key) => {
    if (!query) return items;
    return items.filter((item) =>
      item[key]?.toLowerCase().includes(query.toLowerCase())
    );
  };
  