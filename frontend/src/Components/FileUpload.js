import Form from "react-bootstrap/Form";
import React, { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { getToken } from "../utils/helper";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { BASE_URL } from "../utils/helper";

export default function FileUpload() {
  const [Image, setImage] = useState(null);
  const navigate = useNavigate()
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const maxSize = 3 * 1024 * 1024; // 3 MB (in bytes)
      if (file.size <= maxSize) {
        setImage(file);
      }
    } else {
      setImage(null);
      alert("Please select an image file which less than 3 mb.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Image) {
      alert("Please select an image file which less than 3 mb.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", Image);
    const authToken = getToken();
    if(authToken)
    {
      try {
     
        const response = await axios.post(`${BASE_URL}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        });
        setImage(null);
        alert(response.data.message);
        navigate('/gallery')
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        alert("Image is already there");
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        console.error();
      }
    }
    else{
      alert("For authentication token must be require")
    }
   
  };
  return (
    <>
      <MDBContainer breakpoint="sm" className="p-3 my-5 d-flex flex-column">
        <MDBRow center>
          <MDBCol size='5' className="col-fileupload">
            <Form.Group controlId="formFile" className="mb-3 mb-fileupload">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" className="placeholder-font" ref={fileInputRef} onChange={handleChange} />
              <br></br>
              <Button onClick={handleSubmit}>Add Image</Button>
            </Form.Group>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    </>
  );
}
