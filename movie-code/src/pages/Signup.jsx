import React from 'react'
import {styled} from 'styled-components'
import { BackgroundImage } from '../components/BackgroundImage'
import Header from '../components/Header'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export const Signup=()=> {

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
    <BackgroundImage/>
    <div className='content'>
    <Header login />
    <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h2 >Unlimited movies, TV shows and more.</h2>
            <h5 >Watch anywhere. Cancel anytime.</h5>
            <h6>Ready to watch? Enter your email to create or restart membership.</h6>
          </div>
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
            {showPassword &&
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
              />}
            
            {!showPassword &&
              <button onClick={() => setShowPassword(true)}>Get Started</button>}
           
          </div>
          {showPassword && <button onClick={handleSignIn}>Sign In</button>}
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
        font-size: 2.5rem;
        color:white;
        h2 {
          
          margin:60px 40px
        }
        h5{
         
          
          margin:10px 0px;
        }
        h6{
          
          margin:10px 0px;
        
        }
       
      }
      .form {
        display: grid;
        grid-template-rows: ${({showPassword})=>showPassword?"1fr 1fr":"1.3fr 1fr"};
        width: 30%;
        input {
          color: black;
          border: none;
          margin: 1px;
          border-radius:.1rem;
          padding: .2rem 5rem;
          font-size: 1.4rem;
          border: .8px solid black;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 2rem;
          background-color: #e50914;
          border-radius:0.7rem;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.2rem;
          margin:1px;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

