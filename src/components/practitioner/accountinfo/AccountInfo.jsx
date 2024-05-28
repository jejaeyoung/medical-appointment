import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarMenu from "../sidebar/SidebarMenu";

const AccountInfo = () => {
  const { did } = useParams();
  const [theId, setTheId] = useState("");
  const [theName, setTheName] = useState("");
  const [theImage, setTheImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/doctor/api/finduser/${did}`)
      .then((res) => {
        setTheImage(res.data.theDoctor.dr_image);
        setTheId(res.data.theDoctor._id);
        setTheName(res.data.theDoctor.dr_firstName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [did]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`http://localhost:8000/doctor/api/${did}/updateimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully:', response.data);
      setTheImage(response.data.updatedDoctor.dr_image); // Update image path
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div style={{ display: "flex", flex: "1 0 auto", height: "100vh", overflowY: "hidden" }}>
      <SidebarMenu doctor_name={theName} did={theId} />
      <div>
        <h2>Upload Image</h2>
        <p>My Image</p>
        {theImage && (
          <img src={`http://localhost:8000/${theImage}`} alt="Doctor" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        )}
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {selectedFile && (
          <div>
            <h3>Selected Image Preview</h3>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
