export const uploadImage = async (file) => {
  try {
    if (!file) throw new Error("No file provided");

    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    const formData = new FormData();
    formData.append("image", file);

    console.log("📤 Uploading image...");

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });


    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Upload failed");
    }

    // console.log("✅ Upload response:", data);

    // RETURN EXACT STRUCTURE FOR POST SCHEMA
    return {
      public_id: data.public_id,
      url: data.imageUrl,
    };

  } catch (err) {
    console.error("❌ Image upload error:", err);
    throw err;
  }
};
