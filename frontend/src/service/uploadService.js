import axios from "axios";

const UPLOAD_URL = `${import.meta.env.VITE_API_BASE_URL}/api/upload`;

export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    const { data } = await axios.post(`${UPLOAD_URL}/pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
    });
    return data;
};
