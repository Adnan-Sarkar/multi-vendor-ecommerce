const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

type UploadOptions = {
  folder?: string;
  tags?: string[];
};

export async function uploadImage(
  file: File,
  options: UploadOptions = {},
): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary env variables are not set");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  if (options.folder) {
    formData.append("folder", options.folder);
  }

  if (options.tags?.length) {
    formData.append("tags", options.tags.join(","));
  }

  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();

  return data.secure_url as string;
}

export async function uploadImages(
  files: File[],
  options: UploadOptions = {},
): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImage(file, options)));
}
