export function formatCategory(category) {
  return category.replace(/-/, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}