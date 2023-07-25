import React, { useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { setToken } from "../utils/helper";
import { BASE_URL } from "../utils/helper";

export default function LoginRegister() {
  const { setIsLoggedIn} = useContext(UserContext);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    age: "",
  });


  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Validate email and password fields
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      alert(
        "Password must be >6 and contain at least one uppercase char, one lowercase char, and one special char"
      );
      return;
    }

      try {
        const response = await axios.post(`${BASE_URL}/login`, formData);
        alert("Login successful:");
        setToken(response.data.token)
        setIsLoggedIn(true)
        navigate('/')
      } catch (error) {
        alert("Invalid User");
      }
    
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const namePattern = /^[a-zA-Z]+ ?[a-zA-Z]+$/;
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Validate name, email, age, and password fields
    if (!formData.username || !namePattern.test(formData.username) || formData.username.length > 15) {
      alert("Please enter a valid name containing only alphabets and maximum 15 length");
      return;
    }

    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.age || formData.age < 18) {
      alert("Age must be at least 18.");
      return;
    }

    if (!passwordPattern.test(formData.password)) {
      alert(
        "Password must be >6 and contain at least one uppercase char, one lowercase char, and one special char"
      );
      return;
    }
      try {
        const response = await axios.post(`${BASE_URL}/register`, formData);
        alert("Registration successful:");
        setToken(response.data.token);
        setIsLoggedIn(true)
         navigate('/')
      }
       catch (error) {
        alert("User is already register")
        console.error("Registration failed:", error.message);
      }
    
    
   
  };



  return (
    <MDBContainer breakpoint="sm" className="p-3 my-5 d-flex flex-column">
      <MDBRow center>
        <MDBCol size='5'>
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === "tab1"}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === "tab1"}>
              <form onSubmit={handleLoginSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleFormChange}

                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleFormChange}



                />

                <MDBBtn className="mb-4 w-100" type="submit">
                  Sign in
                </MDBBtn>
              </form>
            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === "tab2"}>
              <form onSubmit={handleRegisterSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="form1"
                  type="text"
                  name="username"
                  value={formData.username}
                  required
                  onChange={handleFormChange}

                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form2"
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleFormChange}

                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Age"
                  id="form3"
                  type="number"
                  name="age"
                  required
                  min={18}
                  value={formData.age}
                  onChange={handleFormChange}

                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleFormChange}

                />

                <MDBBtn className="mb-4 w-100" type="submit">
                  Sign up
                </MDBBtn>
              </form>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

