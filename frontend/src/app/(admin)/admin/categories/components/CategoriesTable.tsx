"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { Button, DataTable, type Column } from "@/components/ui";
import type { Category } from "@/services/catalogService";
import { buildCategoryRows, type CategoryRow } from "./categoryRows";
import { CategoryThumbnail } from "./CategoryThumbnail";
import { CategoryActiveBadge } from "./CategoryActiveBadge";
import { CategoryRowActions } from "./CategoryRowActions";
import { CategoryFormModal } from "./CategoryFormModal";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

interface CategoriesTableProps {
  categories: Category[];
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  const rows = buildCategoryRows(categories);

  const openCreateForm = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingCategory(null);
  }, []);

  const handleSaved = useCallback(() => {
    setIsFormOpen(false);
    setEditingCategory(null);
    router.refresh();
  }, [router]);

  const handleDeleted = () => {
    setDeletingCategory(null);
    router.refresh();
  };

  const columns: Column<CategoryRow>[] = [
    {
      header: "Image",
      cell: ({ category }) => (
        <CategoryThumbnail image={category.image} name={category.name} />
      ),
    },
    {
      header: "Name",
      cell: ({ category, parentName }) => (
        <div className={parentName ? "pl-4" : ""}>
          <p className="font-bold text-gray-900">
            {parentName && <span className="text-gray-300">↳ </span>}
            {category.name}
          </p>
          <p className="text-xs text-gray-400">/{category.slug}</p>
        </div>
      ),
    },
    {
      header: "Parent",
      cell: ({ parentName }) => parentName ?? "—",
    },
    {
      header: "Status",
      cell: ({ category }) => <CategoryActiveBadge isActive={category.is_active} />,
    },
    {
      header: "Actions",
      align: "right",
      cell: ({ category }) => (
        <CategoryRowActions
          category={category}
          onEdit={openEditForm}
          onDelete={setDeletingCategory}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={rows}
        rowKey={({ category }) => category.id}
        title={`Categories (${rows.length})`}
        emptyMessage="No categories yet. Create your first category."
        toolbar={
          <Button size="sm" onClick={openCreateForm}>
            <PlusIcon size={16} weight="bold" />
            Add Category
          </Button>
        }
      />

      {isFormOpen && (
        <CategoryFormModal
          onClose={closeForm}
          onSaved={handleSaved}
          category={editingCategory}
          parentOptions={categories}
        />
      )}

      <DeleteCategoryDialog
        category={deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
