import type { Category } from "@/services/catalogService";

export interface CategoryOption {
  id: number;
  name: string;
}

export function flattenCategoryOptions(categories: Category[]): CategoryOption[] {
  const options: CategoryOption[] = [];

  for (const category of categories) {
    options.push({ id: category.id, name: category.name });

    for (const child of category.children ?? []) {
      options.push({ id: child.id, name: `${category.name} › ${child.name}` });
    }
  }

  return options;
}
