"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { Button, DataTable, type Column } from "@/components/ui";
import type { Tag } from "@/services/catalogService";
import { TagRowActions } from "./TagRowActions";
import { TagFormModal } from "./TagFormModal";
import { DeleteTagDialog } from "./DeleteTagDialog";

interface TagsTableProps {
  tags: Tag[];
}

export function TagsTable({ tags }: TagsTableProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleSaved = useCallback(() => {
    setIsFormOpen(false);

    router.refresh();
  }, [router]);

  const handleDeleted = () => {
    setDeletingTag(null);

    router.refresh();
  };

  const columns: Column<Tag>[] = [
    {
      header: "Name",
      cell: (tag) => <p className="font-bold text-gray-900">{tag.name}</p>,
    },
    {
      header: "Slug",
      cell: (tag) => <span className="text-xs text-gray-400">/{tag.slug}</span>,
    },
    {
      header: "Actions",
      align: "right",
      cell: (tag) => <TagRowActions tag={tag} onDelete={setDeletingTag} />,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={tags}
        rowKey={(tag) => tag.id}
        title={`Tags (${tags.length})`}
        emptyMessage="No tags yet. Create your first tag."
        toolbar={
          <Button size="sm" onClick={() => setIsFormOpen(true)}>
            <PlusIcon size={16} weight="bold" />
            Add Tag
          </Button>
        }
      />

      {isFormOpen && <TagFormModal onClose={closeForm} onSaved={handleSaved} />}

      <DeleteTagDialog
        tag={deletingTag}
        onClose={() => setDeletingTag(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
