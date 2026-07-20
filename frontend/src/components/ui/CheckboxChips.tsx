type ChipOption = {
  id: number;
  name: string;
};

type CheckboxChipsProps = {
  label: string;
  name: string;
  options: ChipOption[];
  selectedIds?: number[];
  error?: string;
  emptyMessage?: string;
};

export function CheckboxChips({
  label,
  name,
  options,
  selectedIds = [],
  error,
  emptyMessage = "No options available.",
}: CheckboxChipsProps) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium text-slate-700">{label}</legend>

      {options.length === 0 ? (
        <p className="text-sm text-slate-400">{emptyMessage}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label
              key={option.id}
              className="relative cursor-pointer rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-600 has-[:checked]:text-white"
            >
              <input
                type="checkbox"
                name={name}
                value={option.id}
                defaultChecked={selectedIds.includes(option.id)}
                className="sr-only"
              />
              {option.name}
            </label>
          ))}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </fieldset>
  );
}
