import React from 'react'
import {styled} from 'styled-components'
import { BackgroundImage } from '../components/BackgroundImage'
import Header from '../components/Header'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { onAuthStateChanged, signInWithEmailAndPassword

} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export const Login=()=> {

  const [isUser,setIsUser]=useState(true);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  
const handleLogIn= async () => {
  try {
    const { email, password } = formValues;
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    

  } catch (error) {
    setIsUser(false)
    console.log(error);
  }
};
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")
  });

  return (
    <Container isUser={isUser}>
    <BackgroundImage/>
    <div className='content'>
    <Header/>
    <div className="body flex column a-center j-center">

          <div className="text flex column">
            <h2 >Unlimited movies, TV shows and more.</h2>
            
          </div>
        <div className='form text flex cloumn form-container j-center'>
       
        <h3 >Login</h3>  
          
          <div className="form flex column">
          
  
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
           
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            <div className='j-center'><button onClick={handleLogIn}>Log In</button>
          {!isUser && <i><h6 className='warning'>Incorrect Username or Password!</h6></i>}</div>
          </div>
        
          </div>
        </div>
    </div>
  
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0, 0, 0, .75);
    height: 100vh;
    width: 100vw;
    .body {
      gap: .5rem;
      .text {
        gap: .1rem;
        text-align: center;
        font-size: 2rem;
        color:white;
        h2 {
          
          margin:.01rem;
        }
       
       
      }
.form-container{
  background-color: rgba(0, 0, 0, 0);
  margin:1rem;

  padding: .1rem 4rem;
  border-radius:.5rem;

   h3 {
          
          margin:10px;
          color:#e50914;
        }
  h6 {
          
          margin:2px
          
        }

  
  button {
        padding: 0.1rem .1rem;
        background-color: #e50914;
        border: none;
        width:20rem;
        cursor: pointer;
        color: white;
        border-radius: 3rem;
        font-weight: bolder;
        font-size: 1.5rem;
      }
}

      .form {
        display: grid;
        margin:2rem;
        width: 35%;
        input {
          color: black;
          border: none;
          width:25rem;
          margin: 0.3rem;
          border-radius:.1rem;
          padding: .2rem 5rem;
          font-size: 2.1rem;
          border: .8px solid black;
          &:focus {
            outline: none;
          }
        }
      }
      
    }
  }
`;

