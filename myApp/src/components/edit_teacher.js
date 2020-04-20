import React, { Component } from 'react';
import './loginStyle.css';
import { Link, Redirect } from 'react-router-dom'
import Navigation from './Navigation';
import swal from 'sweetalert';

// let storId = 0;
// let strSections = [];
let selectSec = [];
// let bool = true;
// let findDulpEmail= ''
let chooseSec = '';
let get_url_id = 0;
let findTeacher = 0;

class edit_teahcer extends Component {

    constructor(props) {
        super(props);
        this.onChangeEvent = this.onChangeEvent.bind(this);

        let data = JSON.parse(localStorage.getItem('data_teach'))

        get_url_id = window.location.pathname.split('/')
        let split_id = get_url_id[2];


        findTeacher = data.teachersData.filter(result => result.email.indexOf(split_id) !== -1)

        this.state = {
            teachersData: [],
            displayData: [],
            currentData: { sno: '', id: '', sec: '', name: '', email: '', pass: '' },
            displaySec: [],
            assignFilterData: [],
            hiddenPass: true,
            dupliEmail: '',
            name_error: '',
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

        this.state.currentData = findTeacher[0];
        this.state.sno = findTeacher[0].sno
        this.state.id = findTeacher[0].id
        this.state.sec = findTeacher[0].sec
        this.state.name = findTeacher[0].name
        this.state.email = findTeacher[0].email
        this.state.pass = findTeacher[0].pass

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

            this.setState({
                displaySec: chooseSec
            })
            console.log(filterDropdown)
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

        let data = JSON.parse(localStorage.getItem('data_teach'))

        get_url_id = window.location.pathname.split('/')

        let split_id = get_url_id[2];

        findTeacher = data.teachersData.filter(result => result.email.indexOf(split_id) !== -1)

        const findIndex = data.teachersData.map(e => e.email).indexOf(split_id);

        let findCurrentEmail = this.state.currentData.email;

        let filterSec = this.state.teachersData.filter((result) => {
            if (result.email.indexOf(findCurrentEmail) !== -1) {
                // findDulpEmail = result.email
                return null
            }
            return null
        })

        console.log('filter', filterSec)

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
        else if (this.state.currentData) {

            this.setState({
                name_error: ''
            })
        }

        if (!this.state.currentData.email) {

            this.setState({
                dupliEmail: 'Email should not be empty'
            })
        }       
        else {

            this.setState({
                dupliEmail: ''
            })
            swal('Good!', 'Update successfully...', 'success');
            const profile = JSON.parse(localStorage.getItem('data_teach'));
            profile.teachersData.splice(findIndex,1,this.state.currentData)
            this.setState({
                teachersData: profile.teachersData
            })

        }

    }

    componentDidMount() {

        let data = JSON.parse(localStorage.getItem('data_teach'))

        get_url_id = window.location.pathname.split('/')

        if (data !== null) {
            this.setState({
                teachersData: data.teachersData,
                displayData: data.teachersData,
                // sno: Number(get_url_id[2])
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
                        <hr />
                    </div>

                    {this.renderRedirect()}

                    <div className='displayData m-b-5'>
                        <div className='container flex'>
                            <form onSubmit={this.onSubmit}>
                                <div>
                                    <label>Sno</label>
                                    <input type='text' className='form-control' name='sno' defaultValue={this.state.sno} onChange={this.onChangeEvent}></input>

                                </div>
                                <div>
                                    <label>Class</label>
                                    <select className='form-control' name='id' defaultValue={this.state.id} onChange={this.onChangeEvent}>
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
                                    <select className='form-control' onChange={this.onChangeEvent} name='sec' defaultValue={this.state.sec}>
                                        {this.state.displaySec.map(section =>
                                            <option key={section}>{section}
                                            </option>)}
                                    </select>
                                    <label className='text-danger'>{this.state.sec_error}</label>
                                </div>
                                <div>
                                    <label>Name</label>
                                    <input type='text' className='form-control' name='name' maxLength='20' defaultValue={this.state.name} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.name_error}</label>
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type='text' className='form-control' name='email' maxLength='20' defaultValue={this.state.email} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.dupliEmail}</label>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type={this.state.hiddenPass ? 'password' : 'text'} maxLength='20' className='form-control' name='pass' defaultValue={this.state.pass} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.pass_error}</label>
                                </div>
                                <div className='btn-grp'>
                                    <button className='btn btn-primary m-b-5'><Link className='text-light' to='/teachers-list'>Back</Link></button>
                                    <button className='btn btn-primary m-b-5'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default edit_teahcer