import { getTags } from "@/services/catalogService";
import { TagsTable } from "./components/TagsTable";

export default async function AdminTagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage product tags that vendors can attach to their products.
        </p>
      </div>

      <TagsTable tags={tags} />
    </div>
  );
}
