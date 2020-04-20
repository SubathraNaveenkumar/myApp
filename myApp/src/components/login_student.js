
import React, { Component } from 'react';
//import loginData from './loginData';
import './loginStyle.css'
import { Redirect, Link } from 'react-router-dom'
import { IoIosEye, IoMdPeople } from 'react-icons/io';


//const accesStudentLogin = loginData.student_login;
let checkUsername = '';
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
            hiddenPass: true,
            findName:''
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
        if (bool) {
            this.setState({
                hiddenPass: false
            })
            bool = false
        }
        else {
            this.setState({
                hiddenPass: true
            })
            bool = true
        }
    }

    componentDidMount() {

        let data = JSON.parse(localStorage.getItem('data_student'))

        if (data !== null) {
            this.setState({
                findName: data.studentsData
               // currentStudentData: data.studentsData[0]
            })
        }
    }


    validateLoginForm = (event) => {
        event.preventDefault();
        if (!this.state.userName) {
            this.setState({
                userError: 'Username should not be empty'
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


        let findStudentUser = this.state.findName.filter((result) => {
            if(result.studname.indexOf(this.state.userName) !== -1)
            {
                checkUsername = result.studname
                //passUrlId = result.rollno
                return result.studname
            }
            return null
        })

        console.log('aaa', findStudentUser)

        if (this.state.userName === checkUsername && this.state.password === checkUsername) {

            localStorage.setItem('username', this.state.userName);

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
            return <Redirect to={`/students-list/${checkUsername}`}/>
        }

        let sessusername = localStorage.getItem('username');
        if (sessusername) {
            return <Redirect to={`/students-list/${checkUsername}`}/>
        }

    }

    render() {
        return (
            <div className='background login_page'>
                <div className='container w-75'>
                    <h2><IoMdPeople /> Students Login</h2>
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
                            <div><input type={this.state.hiddenPass ? 'password' : 'text'} className='form-control' name='password' value={this.state.password} maxLength='15' placeholder='Password' onChange={this.getLoginValue}></input><span><IoIosEye className='cursor-pointer' onClick={this.passwordToggle} /></span></div>
                            <div><label className='text-danger'>{this.state.passError}</label></div>
                        </div>

                        <div>
                            <label><Link className='text-dark' to='/'>Click here to admin login</Link></label> 
                        </div>
                        <div>
                            <label><Link className='text-dark' to='/login-teacher'>Click here to teacher login</Link></label> 
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
