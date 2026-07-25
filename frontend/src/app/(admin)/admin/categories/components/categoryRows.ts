import type { Category } from "@/services/catalogService";

export interface CategoryRow {
  category: Category;
  parentName: string | null;
}

export function buildCategoryRows(categories: Category[]): CategoryRow[] {
  const rows: CategoryRow[] = [];

  for (const category of categories) {
    rows.push({ category, parentName: null });

    for (const child of category.children ?? []) {
      rows.push({ category: child, parentName: category.name });
    }
  }

  return rows;
}
