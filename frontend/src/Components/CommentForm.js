import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/helper';
import { MDBBtn } from 'mdb-react-ui-kit';
import { BASE_URL } from '../utils/helper';

export default function CommentForm({ imageId ,onCommentSubmit}){
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (comment.trim().length > 20) {
          alert("Comment length must be less than or equal to 20 characters.");
          return;
    }
    const authToken = getToken();
    if(authToken)
    {
      try{
      
        const headers = { Authorization: `Bearer ${authToken}` };
         await axios.post(`${BASE_URL}/${imageId}/comment`, { comment },{headers})
         onCommentSubmit();
         setComment('');
     }
     catch(error){
         alert("Somthing went wrong")
         console.error(error)
     } 
    }
    else{
      alert("For authentication token must be require");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={handleCommentChange}
        className="placeholder-font"
      />
      <MDBBtn type="submit">Submit</MDBBtn>
    </form>
  );
};

