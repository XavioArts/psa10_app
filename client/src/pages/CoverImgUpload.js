import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Alert, Button, Icon, Input } from "@mui/material";
import axios from "axios";

const CoverImgUpload = () => {
  const auth = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleUpload = async (e) => {
      e.preventDefault();
      setClicked(true);
      let data = new FormData();
      let file = document.getElementById("input").files[0];
      data.append("file", file);
      try {
          let res = await axios.post('/api/users/cover_image', data);
          setSuccess(true);
          auth.setUser(res.data);
          setClicked(false);
      } catch (err) {
          console.log(err.response);
          alert("there was an error uploading")
      }
  }

  const fileValidation = () => {
    const fi = document.getElementById('input');
    // Check if any file is selected.
    if (fi.files.length > 0) {
        for (const i = 0; i <= fi.files.length - 1; i++) {

            const fsize = fi.files.item(i).size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 4096) {
                alert(
                  "File too Big, please select a file less than 4mb");
            } else if (file < 200) {
                alert(
                  "File too small, please select a file greater than 200kb");
            } else {
                document.getElementById('size').innerHTML = '<b>'
                + file + '</b> KB';
            }
        }
    }
}

const onChangeFunc = (e) => {
    setFiles(e)
    fileValidation(e)
}

  return (
      <div className="messagePageContainer">
          <h3>Update your cover image</h3>
          {success && <Alert severity="success" >Successfully updated cover image!</Alert>}
          {auth.cover_image === null &&
              <div style={{ width: "200px", height: "200px", background: "#D7D7D7", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                  <Icon sx={{ fontSize: "115px", margin: "0" }} >
                      image
                  </Icon>
                  <p style={{ fontSize: "12px" }} >No cover image</p>
              </div>}
          {auth.cover_image &&
              <div style={{ width: "500px", height: "300px", overflow: "hidden", display: "flex" }} >
                  <img src={auth.cover_image} alt="profile" style={{ objectFit: "cover", width: "auto", height: "auto", margin: "0", flexShrink: 1 }} />
              </div>}
          <br />
          <label htmlFor="contained-button-file" >
              <Input accept="image/*" value={files} type="file" id="input" onChange={(e) => onChangeFunc(e.target.value)} />
              <Button disabled={clicked} variant="contained" component="span" endIcon={<Icon>photocamera</Icon>} onClick={handleUpload} >Upload</Button>
          </label>
      </div>
  )
}

export default CoverImgUpload





