import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { IoIosHome, IoMdLogOut, IoMdPeople } from 'react-icons/io';
import { GiTeacher } from 'react-icons/gi';
import { FaSchool } from 'react-icons/fa';

let whichLogin= '';
let findLogin = '';
let teachLogin= '';
let hiddenMenu = false;
class Navigation extends Component {

    clearData = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('findTeachLogin');

    }
    componentDidMount() {
        whichLogin = localStorage.getItem('username');
        teachLogin = localStorage.getItem('findTeachLogin')
        findLogin = window.location.pathname.split('/')
        if(whichLogin === 'admin')
        {
            hiddenMenu = true;
        }
        else if(teachLogin === 'teacherLogin')
        {
            hiddenMenu = true;
        }
        else if(findLogin[1] === 'students-list')
        {
            hiddenMenu = false;
        }
    }
    render() {
        return (
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='nav-bar' sticky='top'>
                <Navbar.Brand ><FaSchool /></Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        {hiddenMenu ? 
                        <Nav>
                            <NavLink to='/home' className='nav-links'><IoIosHome /> Home</NavLink>
                            <NavLink to='/teachers-list' className='nav-links'><GiTeacher /> Teacher</NavLink>
                            <NavLink to='/students-list' className='nav-links'><IoMdPeople /> Student</NavLink>
                        </Nav>
                         : null} 
                    </Nav>
                    <Nav>
                        <NavLink onClick={this.clearData} to='/' className='nav-links'><IoMdLogOut /> Logout</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Navigation