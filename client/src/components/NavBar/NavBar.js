import React from 'react'
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
import DateToday from '../DateToday/DateToday';
import {Logout,Person, Notifications} from '@mui/icons-material';
import SideBar from "../SideBar/SideBar"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
function NavBar() {
  const navigate = useNavigate()
  const handleLogout = ()=>{

    navigate("/signin")
  }

    return (
        <div>
            <Navbar className='navbar' expand="lg">
              <SideBar />
           
  <Container>    
    <Navbar.Toggle aria-controls="basic-navbar-nav" className='ml-auto'   />
    <Navbar.Collapse id="basic-navbar-nav" className='ml-auto'>
      <Nav className="ml-auto flex items-end">
        <Nav.Link href="#link"><Notifications /></Nav.Link>
        <NavDropdown title="Ajmal Nasumudeen" id="basic-nav-dropdown">
        <NavDropdown.Item >  <DateToday/> </NavDropdown.Item>
          <NavDropdown.Item > <Link to="/profile"><Person />  Profile </Link> </NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}> <Logout />  Logout </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        </div>
    )
}

export default NavBar
