import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

function Login() {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);
  
  const handleLogin= (e) =>{
    e.preventDefault();

    signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch({type:"LOGIN",payload: user})
    navigate("/")
    // ...
  })
  .catch((error) => {
    setError(true)
  });
  }

  return (
    <div className="login">
    <form onSubmit={handleLogin}>
      <label >vKART- LOGIN</label>
      {/* <AccountCircleOutlinedIcon style={{alignItems: "start"}}/> */}
      <input type="email" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)}/>
      {/* <KeyOutlinedIcon className="muicons"/> */}
      <input type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)}/>
      <button type="submit">Login</button>
      {error && <span>Wrong Email or Password</span>}
    </form>
    </div>
  )
}

export default Login
