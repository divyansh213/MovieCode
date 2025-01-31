import React, { useState } from 'react'
import {styled} from 'styled-components'
import logo from '../assets/movieIcon.png'
import { Link } from "react-router-dom";
import {firebaseAuth} from '../utils/firebase-config'
import {FaSearch,FaPowerOff} from 'react-icons/fa'
import { signOut } from "firebase/auth";

export default function Navbar({isScrolled}) {

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
      ];
      
  return (
    <Container >
    

        <nav className={`${isScrolled?"scrolled":""} flex j-between`}>
        <div className="left flex a-center ">
        <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
          <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
           
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
        </nav>        
    </Container>
  )
}
const Container = styled.div`

 .scrolled {
  background: linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%);
  }
nav{
    top:0;
    height: 4rem;
    width:100%;
    position:fixed;
    z-index: 2;
    padding: 0 3rem;
.left {
      gap: 2rem;
      .brand {
        img {
          height: 3rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 1.5rem;

        li {
          a{
           
            color: white;
            text-decoration: none;
            font-style:bolder;
          }
        }
      }

}
.right {
      gap: 1.5rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.5rem;
        }
      }
      .search {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.2rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
         
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity:0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.8);
        input {
          width:15rem;
          opacity: 2;
          visibility: visible;
          padding: 0.2rem;
        }
      }
    }
  }

`
