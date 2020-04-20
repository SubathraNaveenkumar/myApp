import React, { Component } from 'react';
import './loginStyle.css';
import * as ReactBootstrap from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { IoMdCreate } from 'react-icons/io'
import Navigation from './Navigation';
import swal from 'sweetalert';

let storId = 0;
let strSections = [];
let selectSec = [];
let get_url_id = '';
let assignLogin = '';
let btnVisibility = false;
let calRow = [];
let findTotalLength = 0;
let displayRecord = 0;

class students_list extends Component {

    constructor(props) {
        super(props);
        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.state = {
            studentsData: [],
            displayData: [],
            currentStudentData: { rollno: '20S1', sno: '1', id: 'C3', sec: 'A', tutor: 'John', name: 'Thara', email: 'thara@gmail.com', pass: '12345' },
            displaySec: [],
            assignFilterData: [],
            hiddenPass: 'password',
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
        assignLogin = localStorage.getItem('username')
        if (assignLogin === 'admin') {
            btnVisibility = true;
        }
        else {
            btnVisibility = false;
        }

    }


    onChangeEvent(e) {
        var stateCopy = Object.assign({}, this.state.currentStudentData);
        stateCopy[e.target.name] = e.target.value;
        this.setState({ currentStudentData: stateCopy });
    }

    findSelectedClass = (event) => {

        storId = event.target.value;

        let filterDropdown = this.state.classes.filter((result) => {

            if (result.id.indexOf(storId) !== -1) {
                strSections = result.sections
                return result
            }
            return null
        })

        console.log(filterDropdown, '******')


        let filterData = this.state.studentsData.filter((result) => {

            if (result.id.indexOf(storId) !== -1) {
                return result
            }
            return null
        })

        this.setState({
            displaySec: strSections,
            assignFilterData: filterData
        })

        if (event.target.value === 'NA') {
            this.setState({
                displayData: this.state.studentsData
            })
        }

        else {
            this.setState({
                displayData: filterData
            })
        }

    }

    findSection = (event) => {
        selectSec = event.target.value;

        let filterSec = this.state.assignFilterData.filter((result) => {

            if (result.sec.indexOf(selectSec) !== -1) {
                return result
            }
            return null
        })

        if (event.target.value === 'NA') {

            this.setState({
                displayData: this.state.assignFilterData
            })
        }

        else {
            this.setState({
                displayData: filterSec
            })
        }
    }

    onSubmit = (e) => {

        e.preventDefault();
        this.setState(state => {
            const studentsData = [...state.studentsData, state.currentStudentData];
            return {
                studentsData,
                currentStudentData: this.state.currentStudentData,
            };
        });

    }

    componentDidMount() {

        calRow.length = 0;
        let data = JSON.parse(localStorage.getItem('data_student'));

        findTotalLength = data.studentsData.length;

        displayRecord = 5;

        let findLastIndex = 1 * displayRecord;
        let findFirstIndex = findLastIndex - displayRecord;

        if (findTotalLength !== null) {
            for (let i = 1; i <= Math.ceil(findTotalLength / displayRecord); i++) {
                calRow.push(i);
            }
        }

        if (data !== null) {
            this.setState({
                studentsData: data.studentsData,
                displayData: data.studentsData,
                // currentStudentData: data.studentsData[0]
            })
        }

        let findLogin = localStorage.getItem('username')

        get_url_id = window.location.pathname.split('/')
        let split_id = get_url_id[2];
        let findStud = '';

        if (data.studentsData) {
            findStud = data.studentsData.filter(result => result.studname.indexOf(split_id) !== -1)
        }

        if (findLogin === 'admin') {
            if (data !== null) {
                this.setState({
                    studentsData: data.studentsData,
                    displayData: data.studentsData.slice(findFirstIndex, findLastIndex),
                    // currentStudentData: data.studentsData[0]
                })
            }
        }
        else if (get_url_id[2] === ':j') {
            if (data !== null) {
                this.setState({
                    studentsData: data.studentsData,
                    displayData: data.studentsData,
                    // currentStudentData: data.studentsData[0]
                })
            }
            btnVisibility = true;
        }
        else {
            if (data !== null) {
                this.setState({
                    studentsData: data.studentsData,
                    displayData: findStud,
                    // currentStudentData: data.studentsData[0]
                })
            }
        }
    }

    renderRedirect = () => {
        let sessusername = localStorage.getItem('username');
        if (!sessusername) {
            return <Redirect to='/' />
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('data_student', JSON.stringify(nextState))
    }

    clearData = () => {
        localStorage.removeItem('username');
    }

    deleteRow(e) {

        let check = JSON.parse(localStorage.getItem('data_student'))
        let result = check.studentsData.filter((ele, i) => i !== e)

        console.log(result)
        swal({
            title: 'Delete',
            text: 'Do you want to delete this record?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.setState({
                        studentsData: result,
                        displayData: result
                    })
                    swal('Deleted!', {
                        icon: 'success',
                    });
                }
            });
    }

    displayPageTab(e) {
        let findLastIndex = e * displayRecord;
        let findFirstIndex = findLastIndex - displayRecord;
        this.setState({
            displayData: this.state.studentsData.slice(findFirstIndex, findLastIndex)
        })
    }


    render() {

        return (
            <div>
                <Navigation />

                <div className='background container w-75'>
                    <div>
                        <h2>Student Details</h2>
                        {/* <button className='btn btn-primary' onClick={this.clearData}><Link className='text-light' to='/'>Log out</Link></button> */}

                        <hr />
                    </div>

                    {this.renderRedirect()}

                    <div>
                        <div className='displayData m-b-5'>
                            <div className='container flex'>
                                <label className='drop'>Class </label>
                                <select onChange={this.findSelectedClass} id='select-class' className='cursor-pointer'>
                                    <option value='NA'>--select class--</option>
                                    {this.state.classes.map(clas =>
                                        <option key={clas.id}>{clas.id}</option>)}
                                </select>
                            </div>

                            <div className='container flex'>
                                <label className='drop'>Section</label>
                                <select id='select-section' onChange={this.findSection} className='cursor-pointer'>
                                    <option value='NA'>--select section--</option>
                                    {this.state.displaySec.map(section =>
                                        <option key={section}>{section}
                                        </option>)}
                                </select>
                            </div>

                            <div className='container flex'>
                                {btnVisibility ? <button className='btn btn-primary m-t-5'><Link className='text-light' to='/add-student'>Add student</Link></button> : null}
                            </div>


                        </div>

                        <div className='container w-100 flex fixed-height'>
                            <ReactBootstrap.Table striped bordered hover>

                                <thead className='font-weight-bold'>
                                    <tr>

                                        <td>Class</td>
                                        <td>Section</td>
                                        <td>Tutor Name</td>
                                        <td>Student Name</td>
                                        <td>Father's Name</td>
                                        <td>Mother's Name</td>
                                        <td>Address</td>
                                        <td colSpan='2'>Edit</td>
                                    </tr>
                                </thead>
                                <tbody className='teachers_list'>
                                    {this.state.displayData.map((teachCol, i) =>
                                        <tr key={i}>

                                            <td>{teachCol.id}</td>
                                            <td>{teachCol.sec}</td>
                                            <td>{teachCol.tutor.charAt(0).toUpperCase() + teachCol.tutor.slice(1)}</td>
                                            <td>{teachCol.name.charAt(0).toUpperCase() + teachCol.name.slice(1)}</td>
                                            <td>{teachCol.f_name.charAt(0).toUpperCase() + teachCol.f_name.slice(1)}</td>
                                            <td>{teachCol.m_name.charAt(0).toUpperCase() + teachCol.m_name.slice(1)}</td>
                                            <td>{teachCol.address}</td>
                                            <td><Link className='text-dark' to={`/edit-student/${teachCol.studname}`}><IoMdCreate className='cursor-pointer' /></Link></td>
                                            <td><MdDelete onClick={() => this.deleteRow(i)} className='cursor-pointer' /></td>
                                        </tr>)}
                                </tbody>
                            </ReactBootstrap.Table>
                        </div>



                        <div className='list'>
                            <ul className='ul-pagination'>
                                <li>&#8592;</li>
                                {calRow.map(result =>
                                    <li key={result} className='cursor-pointer' onClick={() => this.displayPageTab(result)}>
                                        {result}
                                    </li>)
                                }
                                <li>&#8594;</li>
                            </ul>
                        </div>

                        {/* <button className='btn btn-primary m-b-5'><Link className='text-light' to='/add_teacher'>Add New</Link></button> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default students_list