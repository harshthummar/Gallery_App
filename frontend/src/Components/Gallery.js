import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import SearchInput from "./SearchInput";
import { getToken } from "../utils/helper";
import {
  MDBBtn,
  MDBCard,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBPopover,
  MDBPopoverBody,
  MDBRow,
} from "mdb-react-ui-kit";
import { BASE_URL } from "../utils/helper";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [mainImages, setMainImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const popoverRef = useRef(null);

  const handleAlbumCreate = async (e) => {
    e.preventDefault();
    if (albumName.length > 10) {
      alert("Album name must be less than or equal to 10 characters.");
      return;
    }
    const authToken = getToken();
    if (authToken) {
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        await axios.post(
          `${BASE_URL}/albums`,
          {
            name: albumName,
          },
          {
            headers,
          }
        );
        alert("Album created successfully");
        setAlbumName("");
        fetchData();
      } catch (error) {
        alert("Album is already created");
        setSelectedAlbum("");
        console.error("Error creating album:", error.message);
      }
    } else {
      alert("For authentication token must be require");
    }
  };

  const fetchAlbums = async () => {
    const authToken = getToken();
    if (authToken) {
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        const response = await axios.get(`${BASE_URL}/albums`, {
          headers,
        });

        const data = response.data;
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error.message);
      }
    } else {
      alert("For authentication token must be require");
    }
  };

  const handleAlbumSelect = (e) => {
    setSelectedAlbum(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const maxSize = 3 * 1024 * 1024; // 3 MB (in bytes)
      if (file.size <= maxSize) {
        setSelectedFile(file);
      }
    } else {
      setSelectedFile("");
      alert("Please select an image file which less than 3 mb.");
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !selectedAlbum) {
      alert("please select specific folder and image");
      return;
    }

    const formData = new FormData();
    formData.append("album", selectedAlbum);
    formData.append("image", selectedFile);
    const authToken = getToken();
    if (authToken) {
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        await axios.post(`${BASE_URL}/image`, formData, { headers });
        const selectedAlbumName = albums.find((album) => album._id === selectedAlbum)?.name;
        alert(`Upload image successfully on ${selectedAlbumName}`);
        setSelectedFile("");
        fetchAlbums();
        fetchData();
      } catch (error) {
        alert("Image is already upload");
        
      }
    } else {
      alert("For authentication token must be require");
    }
  };

  const handleShareIconClick = async (image) => {
    setSelectedImage(image);
  };

  const handleLike = async (imageId) => {
    const authToken = getToken();
    if (authToken) {
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        const response = await axios.post(
          `${BASE_URL}/${imageId}/like`,
          { liked: !liked },
          { headers }
        );
        setLiked(response.data);
        fetchData();
      } catch (error) {
        console.error("Error of liking image:", error.message);
      }
    } else {
      alert("For authentication token must be require");
    }
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDownloadImage = (imageName) => {
    const imageDownloadUrl = `${BASE_URL}/${imageName}`;
    window.open(imageDownloadUrl, "_blank");
  };

  const handleShareOnFacebook = (imageName) => {
    const imageUrl = `${BASE_URL}/${imageName}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      imageUrl
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleShareOnWhatsApp = (imageName) => {
    const imageUrl = `${BASE_URL}/${imageName}`;
    const shareText = `Check out this awesome image: ${imageUrl}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareOnInstagram = (imageName) => {
    const imageUrl = `${BASE_URL}/${imageName}`;
    const caption = "Check out this awesome image!";
    const shareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(
      imageUrl
    )}&caption=${encodeURIComponent(caption)}`;
    window.open(shareUrl, "_blank");
  };

  const handleShareOnTwitter = (imageName) => {
    const imageUrl = `${BASE_URL}/${imageName}`;
    const tweetText = "Check out this awesome image!";
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      imageUrl
    )}&text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const fetchData = async () => {
    const authToken = getToken();
    if (authToken) {
      try {
        const headers = { Authorization: `Bearer ${authToken}` };
        let url = `${BASE_URL}/images/`;
        if (selectedAlbum) {
          url += `?albumId=${selectedAlbum}`;
        }

        const response = await axios.get(url, {
          headers,
        });
        const data = response.data;
        setImages(data);
        setMainImages(data);
      } catch (error) {
        console.error("Error fetching images:", error.message);
      }
    } else {
      alert("For authentication token must be require");
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      setImages(mainImages);
      return;
    }

    const filteredName = mainImages.filter((image) => {
      const isNameMatch = image.imageName
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const isDateMatch = image.date
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      return isNameMatch || isDateMatch;
    });

    setImages(filteredName);
  }, [searchInput, mainImages]);

  useEffect(() => {
    fetchData();
  }, [selectedAlbum]);

  useEffect(() => {
    fetchAlbums();
  }, [albumName]);

  useEffect(() => {
    fetchData();
    fetchAlbums();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setSelectedImage(null);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <MDBContainer breakpoint="sm" className="p-3 my-5 d-flex flex-column">
        <MDBRow center>
          <MDBCol size="5">
            <SearchInput handleSearchInput={handleSearchInput}></SearchInput>
          </MDBCol>
        </MDBRow>
        <MDBRow center className="search_new_row mt-3">
          <MDBCol size="4">
            <form onSubmit={handleAlbumCreate}>
              <input
                type="text"
                placeholder="Album Name"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                className="placeholder-font"
              />
              <MDBBtn type="submit">Create Album</MDBBtn>
            </form>
          </MDBCol>
          <MDBCol size="3">
            <select
              value={selectedAlbum}
              onChange={handleAlbumSelect}
              className="placeholder-font"
            >
              <option value="">Select Album</option>
              {albums.map((album) => (
                <option key={album._id} value={album._id}>
                  {album.name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol size="5">
            <MDBFile
              type="file"
              onChange={handleFileChange}
              className="placeholder-font"
            />
            <MDBBtn onClick={handleImageUpload}>Upload Image</MDBBtn>
          </MDBCol>
        </MDBRow>
        <MDBRow center>
          {images?.map((image) => (
            <MDBCol size="4" className="gallery_new" key={image._id}>
              <MDBCard>
                <MDBCardImage
                  key={image._id}
                  src={`${BASE_URL}/${image.imageName}`}
                  alt={image.imageName}
                  height={250}
                  position="top"
                />

                <MDBCardTitle>
                  <p>{image.comment !== null ? image.comment : "comment :"}</p>
                </MDBCardTitle>

                <p>{image.imageName}</p>
                <CommentForm
                  imageId={image._id}
                  onCommentSubmit={fetchData}
                ></CommentForm>
                <div className="button_custom_group">
                  <button onClick={() => handleDownloadImage(image.imageName)}>
                    <i className="fa-solid fa-download"></i>
                  </button>
                  <button onClick={() => handleLike(image._id)}>
                    {image.like === true ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </button>
                  <MDBPopover
                    color="secondary"
                    ref={popoverRef}
                    btnChildren={
                      <button onClick={() => handleShareIconClick(image)}>
                        <i className="fa-regular fa-share-from-square"></i>
                      </button>
                    }
                    placement="bottom"
                  >
                    <MDBPopoverBody>
                      {selectedImage && selectedImage._id === image._id && (
                        <div className="share_icon">
                          <button
                            onClick={() =>
                              handleShareOnFacebook(image.imageName)
                            }
                          >
                            <i className="fa-brands fa-facebook-f"></i>
                          </button>
                          <button
                            onClick={() =>
                              handleShareOnInstagram(image.imageName)
                            }
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </button>
                          <button
                            onClick={() =>
                              handleShareOnWhatsApp(image.imageName)
                            }
                          >
                            <i className="fa-brands fa-whatsapp"></i>
                          </button>
                          <button
                            onClick={() =>
                              handleShareOnTwitter(image.imageName)
                            }
                          >
                            <i className="fa-brands fa-twitter"></i>
                          </button>
                        </div>
                      )}
                    </MDBPopoverBody>
                  </MDBPopover>
                </div>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
