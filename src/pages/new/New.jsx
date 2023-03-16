import "./new.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useEffect, useState} from "react";
import { setDoc, doc, serverTimestamp,addDoc,collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function New({inputs, title, type}) {
  console.log("new "+ type);
const [file, setFile] = useState("");
const [data, setData] = useState({});
const [per, setPer] = useState(null);
const navigate = useNavigate();

useEffect(()=>{
  const uploadFile = () => {
    const name = new Date().getTime() + file.name
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setPer(progress);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default: 
      break;
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setData((prev)=>({...prev, img: downloadURL}))
    });
  }
);
  }

  file && uploadFile();
},[file])

const handleAdd = async (e) => {
  e.preventDefault();
  try
  {
    if (type === "users")
    {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await setDoc(doc(db, type, res.user.uid ), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    }
    else
    {
      const res = await addDoc(collection(db, type), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      console.log(res);
    }
    
    navigate(-1);
  }
  catch(err)
  {
    console.log(err);
  }
}

const handleInput = (e) => {
  const id = e.target.id;
  const value = e.target.value;

  setData({...data, [id]: value});
}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
            <div className="formInput">
                <label htmlFor="file">Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
                <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display: "none"}}/>
              </div>
              {
                  inputs.map((input)=>(
                    <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                  </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">Send</button>
            </form>
          </div>
        </div>
        </div>
    </div>
  )
}

export default New
