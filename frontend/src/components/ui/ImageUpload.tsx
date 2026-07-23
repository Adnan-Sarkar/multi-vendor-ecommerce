"use client";

import { useRef, useState } from "react";
import {
  UploadSimpleIcon,
  ImageIcon,
  TrashIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/cloudinary";

type ImageShape = "circle" | "square" | "wide";

type ImageUploadProps = {
  name: string;
  label: string;
  folder: string;
  defaultUrl?: string | null;
  shape?: ImageShape;
  helperText?: string;
  error?: string;
};

const MAXIMUM_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024;

const shapeClasses: Record<ImageShape, string> = {
  circle: "h-28 w-28 rounded-full",
  square: "h-40 w-40 rounded-xl",
  wide: "h-40 w-full rounded-xl",
};

export function ImageUpload({
  name,
  label,
  folder,
  defaultUrl,
  shape = "square",
  helperText,
  error,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(defaultUrl ?? "");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (selectedFile.size > MAXIMUM_FILE_SIZE_IN_BYTES) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const uploadedImageUrl = await uploadImage(selectedFile, { folder });
      setImageUrl(uploadedImageUrl);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleRemoveImage() {
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input type="hidden" name={name} value={imageUrl} readOnly />

      <div className="flex items-center gap-4">
        <div
          className={`flex flex-none items-center justify-center overflow-hidden border border-slate-200 bg-slate-50 ${shapeClasses[shape]}`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={label}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon size={28} className="text-slate-300" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploading ? (
              <CircleNotchIcon size={16} weight="bold" className="animate-spin" />
            ) : (
              <UploadSimpleIcon size={16} weight="bold" />
            )}
            {isUploading ? "Uploading..." : imageUrl ? "Change" : "Upload"}
          </button>

          {imageUrl && !isUploading && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <TrashIcon size={16} weight="bold" />
              Remove
            </button>
          )}
        </div>
      </div>

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
