import Image from "next/image";
import { ImageIcon } from "@phosphor-icons/react";

interface CategoryThumbnailProps {
  image?: string | null;
  name: string;
}

export function CategoryThumbnail({ image, name }: CategoryThumbnailProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={44}
        height={44}
        className="h-11 w-11 rounded-lg object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
      <ImageIcon size={20} />
    </div>
  );
}
