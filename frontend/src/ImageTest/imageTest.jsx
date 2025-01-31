import { useState } from "react";
import { uploadFile } from "../firebase/config";
import { storage } from "../firebase/config";




const ImageTest = () => {
  const [profile_picture, setProfile_picture] = useState(null);
  const [url, setUrl] = useState(null);


  console.log("Firebase Storage Bucket:", storage);
  console.log(process.env.REACT_APP_STORAGE_BUCKET);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageRef = await uploadFile(profile_picture);
    setUrl(storageRef);
    console.log(storageRef);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}><input
              id="profile_picture"
              type="file"
              className="form-control"
              onChange={(e) => setProfile_picture(e.target.files[0])}
              required
            />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageTest;