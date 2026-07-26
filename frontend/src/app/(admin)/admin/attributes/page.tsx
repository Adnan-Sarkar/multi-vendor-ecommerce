import { getAttributes } from "@/services/attributeService";
import { AttributesPanel } from "./components/AttributesPanel";

export default async function AdminAttributesPage() {
  const attributes = await getAttributes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attributes</h1>

        <p className="mt-1 text-sm text-gray-500">
          Define product attributes and their values that vendors use to build
          product variants.
        </p>
      </div>

      <AttributesPanel attributes={attributes} />
    </div>
  );
}
