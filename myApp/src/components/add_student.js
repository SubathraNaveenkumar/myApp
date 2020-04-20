import React, { Component } from 'react';
import './loginStyle.css';
import { Link, Redirect } from 'react-router-dom'
import Navigation from './Navigation';
import swal from 'sweetalert';

// let storId = 0;
// let strSections = [];
let selectSec = [];
let chooseSec = '';
let findDupUser = '';

class add_teacher extends Component {

    constructor(props) {
        super(props);
        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.state = {
            studentsData: [],
            displayData: [],
            currentStudentData: { id: '', sec: '', tutor: '', name: '', studname: '', studpass: '', f_name: '', m_name: '', address: '' },
            displaySec: [],
            assignFilterData: [],
            tutor_error:'',
            studpass_error:'',
            fname_error:'',
            mname_error:'',
            studuser_error: '',
            name_error:'',
            hiddenPass: true,
            class_error:'',
            sec_error:'',
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

        //findDataLength = this.state.displayData.length + 1

        // this.setState({
        //     sno: findDataLength
        // })
    }

    onChangeEvent(e) {

        var stateCopy = Object.assign({}, this.state.currentStudentData);
        stateCopy[e.target.name] = e.target.value;
        this.setState({ currentStudentData: stateCopy });


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

        let data = JSON.parse(localStorage.getItem('data_student'))

       

        let filterSec = data.studentsData.filter((result) =>{
            if (result.studname.indexOf(this.state.currentStudentData.studname) !== -1) {
                findDupUser = result.studname
                return null 
            }     
            return result 
        })

        console.log('filter', filterSec);

        if(!this.state.currentStudentData.id)
        {
            this.setState({
                class_error: 'Class should be selected'
            })
        }  

        if(!this.state.currentStudentData.sec)
        {
            this.setState({
                sec_error: 'Section should selected'
            })
        }  

        if(!this.state.currentStudentData.tutor)
        {
            this.setState({
                tutor_error: 'Tutor should not be empty'
            })
        }
        else if(!this.state.currentStudentData.tutor.match(/^[a-zA-Z\s ]+$/))
        {
            this.setState({
                tutor_error: 'Tutor should be charachters'
            })
        }

        if(!this.state.currentStudentData.studpass)
        {
            this.setState({
                studpass_error: 'Password should not be empty'
            })
        }

        if(!this.state.currentStudentData.name)
        {
            this.setState({
                name_error:'Student name should not be empty'
            })
        }
        else if(!this.state.currentStudentData.name.match(/^[a-zA-Z\s ]+$/))
        {
            this.setState({
                name_error: 'Student name should be charachters'
            })
        }

        if(!this.state.currentStudentData.f_name)
        {
            this.setState({
                fname_error:'Fathers name should not be empty'
            })
        }
        else if(!this.state.currentStudentData.f_name.match(/^[a-zA-Z\s ]+$/))
        {
            this.setState({
                fname_error: 'Fathers name should be charachters'
            })
        }

        if(!this.state.currentStudentData.m_name)
        {
            this.setState({
                mname_error:'Mothers name should not be empty'
            })
        }
        else if(!this.state.currentStudentData.m_name.match(/^[a-zA-Z\s ]+$/))
        {
            this.setState({
                mname_error: 'Mothers name should be charachters'
            })
        }


        if(!this.state.currentStudentData.studname) 
        {
            this.setState({
                studuser_error:'Username should not be empty'
            })
        } 
        else if(this.state.currentStudentData.studname === findDupUser) 
        {
            this.setState({
                studuser_error:'Duplicate username'
            })
        }  

        else if(this.state.currentStudentData.studname !== findDupUser)
        {
            swal('Good!', 'Saved successfully...', 'success');
            this.setState(state => {
                const studentsData = [...state.studentsData, state.currentStudentData];
                return {
                    studentsData,
                    currentStudentData: this.state.currentStudentData,
                    studuser_error:'',
                    mname_error:'',
                    fname_error:'',
                    name_error:'',
                    studpass_error:'',
                    tutor_error:'',
                    class_error:'',
                    sec_error:''
                };
            });
        }       

    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('data_student'))
        if (data !== null) {
            this.setState({
                studentsData: data.studentsData,
                displayData: data.studentsData
                //currentStudentData: data.studentsData[0]
            })
        }

        console.log('search',window.localStorage.key(2))

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
        localStorage.setItem('data_student', JSON.stringify(nextState))
    }

   
    render() {
       
        return (
            <div>
                <Navigation />

                <div className='background container w-50'>
                    <div>
                        <h2>Student Details</h2>
                        {/* <button className='btn btn-primary' onClick={this.clearData}><Link className='text-light' to='/'>Log out</Link></button> */}
                        <hr />
                    </div>

                    {this.renderRedirect()}

                    <div className='displayData m-b-5'>
                        <div className='container flex'>
                            <form onSubmit={this.onSubmit}>
                                {/* <div>
                                    <label>Sno</label>
                                    <input type='text' className='form-control' name='sno' readOnly value={findStudCount} onChange={this.onChangeEvent}></input>
                                </div> */}

                                {/* <div>
                                    <label>Roll No</label>
                                    <input type='text' className='form-control' name='rollno' value={this.state.rollno} onChange={this.onChangeEvent}></input>
                                </div> */}

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
                                    <label>Tutor</label>
                                    <input type='text' className='form-control' name='tutor' maxLength = '20' value={this.state.tutor} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.tutor_error}</label>
                                </div>
                                <div>
                                    <label>Name</label>
                                    <input type='text' className='form-control' name='name' maxLength = '20' value={this.state.name} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.name_error}</label>
                                </div>
                                <div>
                                    <label>Username</label>
                                    <input type='text' className='form-control' name='studname' maxLength = '20' value={this.state.studname} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.studuser_error}</label>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input type='text' className='form-control' name='studpass'  maxLength = '20'value={this.state.studpass} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.studpass_error}</label>
                                </div>
                                <div>
                                    <label>Father's Name</label>
                                    <input type='text' className='form-control' name='f_name' maxLength = '20' value={this.state.f_name} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.fname_error}</label>
                                </div>
                                <div>
                                    <label>Mother's Name</label>
                                    <input type='text' className='form-control' name='m_name' maxLength = '20' value={this.state.m_name} onChange={this.onChangeEvent}></input>
                                    <label className='text-danger'>{this.state.mname_error}</label>
                                </div>
                                <div>
                                    <label>Address</label>
                                    <textarea className='form-control' name='address' resize='none' value={this.state.address} onChange={this.onChangeEvent}></textarea>
                                    <label className='text-danger'></label>
                                </div>
                                {/* <div>
                                <label>Password</label>
                                <input type={this.state.hiddenPass ? 'password' : 'text'} className='form-control' name='pass' value={this.state.pass} onChange={this.onChangeEvent}></input>
                            </div> */}
                                <div className='btn-grp'>
                                    <button className='btn btn-primary m-b-5'><Link className='text-light' to='/students-list'>Back</Link></button>
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