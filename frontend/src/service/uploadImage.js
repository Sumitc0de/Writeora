import { api } from "./api";

export const uploadImage = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    const formData = new FormData();
    formData.append("image", file);

    console.log("📤 Uploading image...");

    const { data } = await api.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.success) {
      throw new Error(data.message || "Upload failed");
    }

    console.log("✅ Upload response:", data);

    return {
      public_id: data.public_id,
      url: data.imageUrl,
    };

  } catch (err) {
    console.error(
      "❌ Image upload error:",
      err.response?.data?.message || err.message
    );
    throw err;
  }
};
