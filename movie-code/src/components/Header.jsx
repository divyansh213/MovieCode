import React from 'react'
import {styled} from 'styled-components'
import logo from '../assets/movieIcon.png'
import {useNavigate} from 'react-router-dom'



export default function Header(props) {
  
const navigate=useNavigate();
  return (
    <StyledHeader className="flex j-between a-center">

<div className='logo'>
<img src={logo} lat="logo"/>
</div>
<button onClick={()=> navigate(props.login?"/login":"/signup")}>
  {props.login?"Log In":"Sign In"}
</button>
</StyledHeader>
  )
}

const StyledHeader= styled.header`
padding:0.4rem;
.logo
{
    img{
        height: 2.9rem;
       }

}
button{
    padding: .45rem 1.2rem;
    Background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.63rem;
    font-weight: bolder;
    font-size: 1.24rem;
  
}`
