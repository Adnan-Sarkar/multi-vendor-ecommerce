"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  UploadSimpleIcon,
  TrashIcon,
  CircleNotchIcon,
  PencilSimpleIcon,
  CheckCircleIcon,
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
  onUploadingChange?: (isUploading: boolean) => void;
};

const MAXIMUM_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024;

const shapeClasses: Record<ImageShape, string> = {
  circle: "h-32 w-32 rounded-full",
  square: "h-44 w-44 rounded-2xl",
  wide: "h-44 w-full rounded-2xl",
};

export function ImageUpload({
  name,
  label,
  folder,
  defaultUrl,
  shape = "square",
  helperText,
  error,
  onUploadingChange,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(defaultUrl ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [hasJustUploaded, setHasJustUploaded] = useState(false);

  const onUploadingChangeRef = useRef(onUploadingChange);

  useEffect(() => {
    onUploadingChangeRef.current = onUploadingChange;
  });

  useEffect(() => {
    onUploadingChangeRef.current?.(isUploading);
  }, [isUploading]);

  async function processFile(selectedFile: File | undefined) {
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
      setHasJustUploaded(true);
      toast.success("Image ready. Click Save Changes to apply.");
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function openFilePicker() {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    processFile(event.target.files?.[0]);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
    if (!isUploading) {
      processFile(event.dataTransfer.files?.[0]);
    }
  }

  function handleRemoveImage(event: React.MouseEvent) {
    event.stopPropagation();
    setImageUrl("");
    setHasJustUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const hasImage = Boolean(imageUrl);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input type="hidden" name={name} value={imageUrl} readOnly />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div
        onClick={openFilePicker}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={`group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed transition-colors ${
          shapeClasses[shape]
        } ${
          isDraggingOver
            ? "border-indigo-500 bg-indigo-50"
            : hasImage
              ? "border-transparent"
              : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-slate-100"
        }`}
      >
        {hasImage && (
          <Image
            src={imageUrl}
            alt={label}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 176px"
            className="absolute inset-0 object-cover"
          />
        )}

        {isUploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 text-indigo-600">
            <CircleNotchIcon size={26} weight="bold" className="animate-spin" />
            <span className="text-xs font-semibold">Uploading...</span>
          </div>
        ) : hasImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/0 opacity-0 transition-all group-hover:bg-slate-900/50 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
              <PencilSimpleIcon size={14} weight="bold" />
              Change
            </span>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              <TrashIcon size={14} weight="bold" />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 px-3 text-center text-slate-400">
            <UploadSimpleIcon size={26} weight="bold" />
            <span className="text-xs font-medium">
              Click or drag an image here
            </span>
          </div>
        )}
      </div>

      {hasJustUploaded && !isUploading && (
        <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
          <CheckCircleIcon size={14} weight="fill" />
          Image ready — click Save Changes to apply.
        </p>
      )}
      {!hasJustUploaded && helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
