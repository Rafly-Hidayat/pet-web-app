import { useEffect, useState } from "react";
import axios from "axios";

function UploadProfilePicture() {
  const [formData, setFormData] = useState({
    username: "",
    profilePicture: null,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profilePicture" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    // formDataToSend.append('username', formData.username);
    formDataToSend.append("file", formData.profilePicture);

    try {
      const response = await axios.post("user/upload", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  useEffect(async () => {
    axios
      .get("user/media/15", {
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setImage(url)
      });
  }, []);

  return (
    <div className="mt-20">
      <h2>Upload Profile Picture</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div> */}
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      <div className="w-32 h-32 rounded-full overflow-hidden">
          <img src={image} alt="Media" className="w-full h-auto" />
        </div>
    </div>
  );
}

export default UploadProfilePicture;
