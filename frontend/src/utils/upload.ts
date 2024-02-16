import axios from "axios";

const upload = async (file: File | null) => {
  if (!file) {
    // Handle the case when 'file' is null (optional)
    return null;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "talenthive");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dxcqwkdf1/image/upload", data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
    // Handle the error as needed
    return null;
  }
};

export default upload;
