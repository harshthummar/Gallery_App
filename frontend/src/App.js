import "./App.css";
import FileUpload from "./Components/FileUpload";
import Navbar from "./Components/NavbarC";
import Gallery from "./Components/Gallery";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./Components/LoginRegister";
import  React,{useContext} from "react"
import { UserContext } from "./UserContext";


function App() {
  const { isLoggedIn} = useContext(UserContext);

  return (
    <div className="App">
      <Router>
         <Navbar></Navbar>
        
         <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          {isLoggedIn ? (
            <>
              
              <Route path="/fileupload" element={<FileUpload />} />
              <Route path="/gallery" element={<Gallery />} />
            </>
          ) : (
            <Route path="/" element={<LoginRegister />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
