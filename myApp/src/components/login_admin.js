
import React, { Component } from 'react';
import loginData from './loginData';
import './loginStyle.css'
import { Redirect,Link } from 'react-router-dom'
import { IoIosEye, IoMdPerson } from 'react-icons/io';

const accessLoginData = loginData.data;

let bool = true;
class login extends Component {

    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            userError: '',
            passError: '',
            loginStatus: '',
            login: false,
            hiddenPass: true
        }
      
    }
    
    
      getLoginValue = (event) => {
        const { name } = event.target;
        switch (name) {
            case 'username':
                {
                    this.setState({
                        userName: event.target.value
                    })
                    break;
                }
            case 'password':
                {
                    this.setState({
                        password: event.target.value
                    })
                    break;
                }
            default:
                break;
        }
    }

    passwordToggle = () => {
        if(bool)
        {
            this.setState({
                hiddenPass: false
            })
            bool=false
        }
        else
        {
            this.setState({
                hiddenPass: true
            })
            bool=true
        }   
    }

    validateLoginForm = (event) => {
        event.preventDefault();
        if (!this.state.userName) {
            this.setState({
                userError: 'Username should not be empty'
            })
        }
        else if (!this.state.userName.match(/^[a-zA-Z\s]+$/)) {
            this.setState({
                userError: 'Username should be characters'
            })
        }
        else {
            this.setState({
                userError: ''
            })
        }

        if (!this.state.password) {
            this.setState({
                passError: 'Password should not be empty'
            })
        }
        else if (this.state.password.length < 5) {
            this.setState({
                passError: 'Password should be min 5 characters'
            })
        }
        else {
            this.setState({
                passError: ''
            })
        }

        if (this.state.userName === accessLoginData[0].username && this.state.password === accessLoginData[0].password) {
            
            localStorage.setItem('username',this.state.userName);
            
            this.setState({
                loginStatus: 'Login successful',
                login: true
            }) //constr
        }
        else if (this.state.userName === '' || this.state.password === '') {
            this.setState({
                loginStatus: ''
            })
            
        }
        else { 
            this.setState({
                loginStatus: 'Invalid username or password'
            })
        }
    }

      renderRedirect = () => {
        if (this.state.login) {
          return <Redirect to='/home'/> 
        }

        let sessusername = localStorage.getItem('username');
        if (sessusername) {
           return <Redirect to='/home'/>
        }
      }

    render() {
        return (
            <div className='background login_page'>
                <div className='container w-75'>
                    <h2><IoMdPerson/> Administrator Login</h2>
                    <hr />
                    
                    {this.renderRedirect()}  
                    <form className='' onSubmit={this.validateLoginForm}>
                        <div>
                            <div><label>Username</label></div>
                            <div><input type='text' className='form-control' name='username' value={this.state.userName} placeholder='Username' maxLength='15' onChange={this.getLoginValue}></input></div>
                            <div><label className='text-danger'>{this.state.userError}</label></div>
                        </div>
                        <div>
                            <div><label>Password</label></div>
                            <div><input type={this.state.hiddenPass ? 'password' : 'text'} className='form-control' name='password' value={this.state.password} placeholder='Password' maxLength='15' onChange={this.getLoginValue}></input><span><IoIosEye className='cursor-pointer' onClick={this.passwordToggle} /></span></div>
                            <div><label className='text-danger'>{this.state.passError}</label></div>
                        </div>
                        <div>
                            <label><Link className='text-dark' to='/login-teacher'>Click here to teacher login</Link></label> 
                        </div>
                        <div>
                            <label><Link className='text-dark' to='/login-student'>Click here to student login</Link></label> 
                        </div>
                       
                        <div>
                               {this.renderRedirect()}
                            <button className='btn btn-primary text-light'>Login</button><br />
                            <div>
                                <label className='text-danger'>{this.state.loginStatus}</label>
                            </div>
                        </div>
                    </form>
                </div>   
            </div>
        )
    }
}
export default login
