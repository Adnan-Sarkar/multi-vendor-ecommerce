"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button, Input, Modal } from "@/components/ui";
import {
  createAttributeAction,
  type AttributeFormState,
} from "@/actions/attributeActions";

interface AttributeFormModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export function AttributeFormModal({
  onClose,
  onSaved,
}: AttributeFormModalProps) {
  const [state, formAction, isPending] = useActionState<
    AttributeFormState | null,
    FormData
  >(createAttributeAction, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);

      onSaved();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSaved]);

  return (
    <Modal open onClose={onClose} size="sm" title="Add Attribute">
      <form action={formAction} className="space-y-5">
        <Input
          label="Name"
          name="name"
          placeholder="e.g., Size"
          error={state?.errors?.name?.[0]}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" pending={isPending} pendingLabel="Saving...">
            Create Attribute
          </Button>
        </div>
      </form>
    </Modal>
  );
}
