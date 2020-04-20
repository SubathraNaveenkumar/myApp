
import React, { Component } from 'react';
import './loginStyle.css'
import { Redirect, Link } from 'react-router-dom'
import { IoIosEye } from 'react-icons/io';
import { GiTeacher } from 'react-icons/gi';

let bool = true;
let checkUsername = '';
let checkPassword = '';
class login extends Component {

    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            userError: '',
            passError: '',
            loginStatus: '',
            findLogin: '',
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

        let findTeacherLogin = this.state.findLogin.filter((result) => {
                if (result.email.indexOf(this.state.userName) !== -1) {
                    checkUsername = result.email
                    checkPassword = result.pass
                    return result.email
                }
            return null
        })

        console.log(findTeacherLogin)

        if (this.state.userName === checkUsername && this.state.password === checkPassword) {

            localStorage.setItem('username', this.state.userName);
            localStorage.setItem('findTeachLogin', 'teacherLogin');

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

    componentDidMount() {

        let data = JSON.parse(localStorage.getItem('data_teach'))

        if (data !== null) {
            this.setState({
                findLogin: data.teachersData
                // currentStudentData: data.studentsData[0]
            })
        }
    }

    renderRedirect = () => {
        if (this.state.login) {
            return <Redirect to={`/teachers-list/${checkUsername}`} />
        }

        let sessusername = localStorage.getItem('username');
        if (sessusername) {
            return <Redirect to={`/teachers-list/${checkUsername}`} />
        }

    }

    render() {
        return (
            <div className='background login_page'>
                <div className='container w-75'>
                    <h2><GiTeacher /> Teachers Login</h2>
                    <hr />

                    {this.renderRedirect()}

                    <form className='' onSubmit={this.validateLoginForm}>
                        <div>
                            <div><label>Username</label></div>
                            <div><input type='text' className='form-control' name='username' value={this.state.userName} maxLength='25' placeholder='Username' onChange={this.getLoginValue}></input></div>
                            <div><label className='text-danger'>{this.state.userError}</label></div>
                        </div>
                        <div>
                            <div><label>Password</label></div>
                            <div><input type={this.state.hiddenPass ? 'password' : 'text'} className='form-control' name='password' maxLength='15' value={this.state.password} placeholder='Password' onChange={this.getLoginValue}></input><span><IoIosEye className='cursor-pointer' onClick={this.passwordToggle} /></span></div>
                            <div><label className='text-danger'>{this.state.passError}</label></div>
                        </div>
                        <div>
                            <label><Link className='text-dark' to='/'>Click here to admin login</Link></label> 
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
