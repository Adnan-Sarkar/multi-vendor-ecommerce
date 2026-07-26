"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button, Input, Modal } from "@/components/ui";
import { createTagAction, type TagFormState } from "@/actions/tagActions";

interface TagFormModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export function TagFormModal({ onClose, onSaved }: TagFormModalProps) {
  const [state, formAction, isPending] = useActionState<
    TagFormState | null,
    FormData
  >(createTagAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSaved();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSaved]);

  return (
    <Modal open onClose={onClose} size="sm" title="Add Tag">
      <form action={formAction} className="space-y-5">
        <Input
          label="Name"
          name="name"
          placeholder="e.g., Summer Sale"
          error={state?.errors?.name?.[0]}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" pending={isPending} pendingLabel="Saving...">
            Create Tag
          </Button>
        </div>
      </form>
    </Modal>
  );
}
