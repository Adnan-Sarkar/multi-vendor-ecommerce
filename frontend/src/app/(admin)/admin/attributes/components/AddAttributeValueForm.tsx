"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import {
  createAttributeValueAction,
  type AttributeFormState,
} from "@/actions/attributeActions";

interface AddAttributeValueFormProps {
  attributeId: number;
}

export function AddAttributeValueForm({
  attributeId,
}: AddAttributeValueFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const action = createAttributeValueAction.bind(null, attributeId);

  const [state, formAction, isPending] = useActionState<
    AttributeFormState | null,
    FormData
  >(action, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);

      formRef.current?.reset();

      router.refresh();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={formAction} className="flex items-start gap-2">
      <div className="flex-1">
        <Input
          name="value"
          placeholder="Add a value (e.g., Small)"
          error={state?.errors?.value?.[0]}
        />
      </div>

      <Button type="submit" size="md" variant="outline" pending={isPending}>
        <PlusIcon size={16} weight="bold" />
        Add
      </Button>
    </form>
  );
}
