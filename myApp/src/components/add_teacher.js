import React, { Component } from 'react';
import './loginStyle.css';
import { Link, Redirect } from 'react-router-dom'
import Navigation from './Navigation';
import swal from 'sweetalert';

// let storId = 0;
// let strSections = [];
let selectSec = [];
let bool = true;
let findDulpEmail = ''
let chooseSec = '';
let dupClass = '';
let dupSec = '';
// let findSno= 0;

class add_teacher extends Component {

    constructor(props) {
        super(props);
        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.state = {
            teachersData: [],
            displayData: [],
            currentData: { sno: '', id: '', sec: '', name: '', email: '', pass: '' },
            displaySec: [],
            assignFilterData: [],
            hidePass: true,
            dupliEmail: '',
            class_error: '',
            sec_error: '',
            name_error: '',
            pass_error: '',
            sno_error:'',
            classes: [
                {
                    id: 'C1',
                    sections: [
                        'A', 'B'
                    ]
                },
                {
                    id: 'C2',
                    sections: [
                        'A', 'B', 'C'
                    ]
                },
                {
                    id: 'C3',
                    sections: [
                        'A', 'B', 'C', 'D', 'E'
                    ]
                },
                {
                    id: 'C4',
                    sections: [
                        'A', 'B', 'C', 'D', 'E'
                    ]
                },
                {
                    id: 'C5',
                    sections: [
                        'A', 'B', 'C', 'D', 'E'
                    ]
                }
            ]
        }
    }

    passwordToggle = () => {
        if (bool) {
            this.setState({
                hidePass: false
            })
            bool = false
        }
        else {
            this.setState({
                hidePass: true
            })
            bool = true
        }
    }

    onChangeEvent(e) {

        var stateCopy = Object.assign({}, this.state.currentData);
        stateCopy[e.target.name] = e.target.value;
        this.setState({ currentData: stateCopy });

        if (e.target.name === 'id') {
            let filterDropdown = this.state.classes.filter((result) => {

                if (result.id.indexOf(e.target.value) !== -1) {
                    chooseSec = result.sections
                    return result.sections
                }
                return null
            })

            // findSno = this.state.teachersData.length + 1
            // this.setState({
            //     sno : findSno
            // })

            this.setState({
                displaySec: chooseSec

            })
            console.log('findClass', filterDropdown)

            dupClass = this.state.teachersData.filter(result => result.id.indexOf(e.target.value) !== -1)

        }
        else if (e.target.name === 'sec') {

            dupSec = dupClass.filter(result => result.sec.indexOf(e.target.value) !== -1)
            if (dupSec.length > 0) {
                this.setState({
                    sec_error: 'Teachers already exists'
                })
            }
            else if(dupSec.length === 0)
            {
                this.setState({
                    sec_error: ''
                })
            }
        }
    }


    findSection = (event) => {
        selectSec = event.target.value;

        this.setState({
            sec: selectSec
        })
    }

    onSubmit = (e) => {

        e.preventDefault();

        let findCurrentEmail = this.state.currentData.email;

        let filterSec = this.state.teachersData.filter((result) => {
            if (result.email.indexOf(findCurrentEmail) !== -1) {
                findDulpEmail = result.email
                return null
            }
            return findCurrentEmail
        })

        console.log('filter', filterSec)

        if (!this.state.currentData.sno) {
            this.setState({
                sno_error: 'Sno should not be empty'
            })
        }
        
        else if (!this.state.currentData.sno.match(/^[0-9]+$/)) {
            this.setState({
                sno_error: 'Sno should be number'
            })
        }

        if (!this.state.currentData.id) {
            this.setState({
                class_error: 'Class should be selected'
            })
        }

        if (!this.state.currentData.sec) {
            this.setState({
                sec_error: 'Section should be selected'
            })
        }
        // else if(dupSec.length > 0) 
        // {
        //     this.setState({
        //         sec_error: 'Teachers already exists'
        //     })
        // }

        if (!this.state.currentData.name) {
            this.setState({
                name_error: 'Name should not be empty'
            })

        }
        else if (!this.state.currentData.name.match(/^[a-zA-Z\s ]+$/)) {
            this.setState({
                name_error: 'Name should be charachters'
            })
        }

        if (!this.state.currentData.pass) {
            this.setState({
                pass_error: 'Password should not be empty'
            })
        }

        if (!this.state.currentData.email) {
            this.setState({
                dupliEmail: 'Email should not be empty'
            })
        }
        else if (findCurrentEmail === findDulpEmail) {
            this.setState({
                dupliEmail: 'Duplicate email'
            })

        }

        else if ((this.state.currentData.name !== null) && (findCurrentEmail !== findDulpEmail) && (this.state.currentData.pass !== null) && (this.state.currentData.id !== null) && (this.state.currentData.sec !== null) && (dupSec.length === 0) && (this.state.currentData.sno !== null)) {
            swal('Good!', 'Saved successfully...', 'success');
            this.setState(state => {
                const teachersData = [...state.teachersData, state.currentData];
                return {
                    teachersData,
                    currentData: this.state.currentData,
                };
            });
            this.setState({
                dupliEmail: '',
                name_error: '',
                pass_error: '',
                class_error: '',
                sec_error: '',
                sno_error:''
            })
            return true;
        }

    }

    componentDidMount() {

        let data = JSON.parse(localStorage.getItem('data_teach'))

        if (data !== null) {
            this.setState({
                teachersData: data.teachersData,
                displayData: data.teachersData,
                // sno: data.teachersData.length + 1 
            })
        }

    }

    renderRedirect = () => {
        let sessusername = localStorage.getItem('username');
        if (!sessusername) {
            return <Redirect to='/' />
        }
    }

    clearData = () => {
        localStorage.removeItem('username');
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('data_teach', JSON.stringify(nextState))
    }

    render() {

 

        return (
            <div>
                <Navigation />
                <div className='background container w-50'>
                    <div>
                        <h2>Teachers Details</h2>
                        {/* <button className='btn btn-primary' onClick={this.clearData}><Link className='text-light' to='/'>Log out</Link></button> */}
                        <hr />
                    </div>

                    {this.renderRedirect()}

                    <div className='displayData m-b-5'>
                        <div className='container flex'>
                            <form onSubmit={this.onSubmit}>
                                <div>
                                    <label>Sno</label>
                                    <input type='text' className='form-control' name='sno' maxLength='2' value = {this.state.sno} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.sno_error}</label>
                                </div>
                                <div>
                                    <label>Class</label>
                                    {/* <input type='text' className='form-control' name='id' value={this.state.id} onChange={this.onChangeEvent}></input> */}

                                    <select className='form-control cursor-pointer' name='id' value={this.state.id} onChange={this.onChangeEvent}>
                                        <option>C1</option>
                                        <option>C2</option>
                                        <option>C3</option>
                                        <option>C4</option>
                                        <option>C5</option>
                                    </select>
                                    <label className='text-danger'>{this.state.class_error}</label>

                                </div>
                                <div>
                                    <label>Section</label>
                                    {/* <input type='text' className='form-control' name='sec' value={this.state.sec} onChange={this.onChangeEvent}></input> */}

                                    <select className='form-control cursor-pointer' onChange={this.onChangeEvent} name='sec' value={this.state.sec}>
                                        {this.state.displaySec.map(section =>
                                            <option key={section}>{section}
                                            </option>)}
                                    </select>
                                    <label className='text-danger'>{this.state.sec_error}</label>

                                </div>
                                <div>
                                    <label>Name</label>
                                    <input type='text' className='form-control' name='name' maxLength='20' value={this.state.name} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.name_error}</label>
                                </div>
                                {/* <div>
                                <label>Username</label>
                                <input type='text' className='form-control' name='teachuser' value={this.state.teachuser} onChange={this.onChangeEvent}></input>
                            </div> */}
                                <div>
                                    <label>Email</label>
                                    <input type='email' className='form-control' name='email' maxLength='20' value={this.state.email} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.dupliEmail}</label>
                                </div>
                                <div>
                                    <label>Password</label>
                                    {/* <input type={this.state.hidePass ? 'password' : 'text'} className='form-control' name='pass' value={this.state.pass} onChange={this.onChangeEvent}></input><span><IoIosEye onClick={this.passwordToggle} /></span> */}
                                    <input type={this.state.hidePass ? 'password' : 'text'} className='form-control' maxLength='10' name='pass' value={this.state.pass} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.pass_error}</label>
                                </div>
                                <div className='btn-grp'>
                                    <button className='btn btn-primary m-b-5'><Link className='text-light' to='/teachers-list'>Back</Link></button>
                                    <button className='btn btn-primary m-b-5 text-light'>Insert</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default add_teacher