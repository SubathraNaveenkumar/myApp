import React, { Component } from 'react';
import './loginStyle.css';
import * as ReactBootstrap from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { IoIosEye } from 'react-icons/io';
import { IoMdCreate } from 'react-icons/io'
import Navigation from './Navigation';
import { MdDelete } from 'react-icons/md';
import swal from 'sweetalert';

let storId = 0;
let strSections = [];
let selectSec = [];
let get_url_id = '';
let passwordVisible = true;
let findLogin = '';
let findTotalLength = 0;
let displayRecord = 0;
let calRow = [];

class teachers_list extends Component {

    constructor(props) {
        super(props);
        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.state = {
            teachersData: [],
            displayData: [],
            currentData: { sno: '', id: '', sec: '', name: '', email: '', pass: '' },
            displaySec: [],
            findCurrentRow: '',
            assignFilterData: [],
            hiddenPass: true,
            assignDummy: [],
            pagination: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

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

    passwordToggle(e) {
        if (passwordVisible) {

            this.setState({
                hiddenPass: true,
                findCurrentRow: e
            })
            passwordVisible = false
        }
        else {
            this.setState({
                hiddenPass: false,
                findCurrentRow: e
            })
            passwordVisible = true
        }
    }

    onChangeEvent(e) {

        var stateCopy = Object.assign({}, this.state.currentData);
        stateCopy[e.target.name] = e.target.value;
        this.setState({ currentData: stateCopy });

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


        let filterData = this.state.teachersData.filter((result) => {

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
                displayData: this.state.teachersData
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
            const teachersData = [...state.teachersData, state.currentData];
            return {
                teachersData,
                currentData: this.state.currentData,
            };
        });

    }

    componentDidMount() {

        calRow.length = 0;
        let data = JSON.parse(localStorage.getItem('data_teach'));

        findTotalLength = data.teachersData.length;

        displayRecord = 5;

        if (findTotalLength !== null) {
            for (let i = 1; i <= Math.ceil(findTotalLength / displayRecord); i++) {
                calRow.push(i);
            }
        }

        findLogin = localStorage.getItem('username')

        get_url_id = window.location.pathname.split('/');
        let split_id = get_url_id[2];
        let findStud = '';

        let findLastIndex = 1 * displayRecord;
        let findFirstIndex = findLastIndex - displayRecord;

        // this.setState({
        //     displayData: this.state.teachersData.slice(findFirstIndex, findLastIndex)
        // })

        if (data.teachersData !== null) {
            findStud = data.teachersData.filter(result => result.email.indexOf(split_id) !== -1)
        }

        if (findLogin === 'admin') {
            if (data !== null) {
                this.setState({
                    teachersData: data.teachersData,
                    displayData: data.teachersData.slice(findFirstIndex, findLastIndex),
                    //currentData: data.teachersData[0]
                })
            }
        }
        else if (get_url_id[2] === ':k') {
            if (data !== null) {
                this.setState({
                    teachersData: data.teachersData,
                    displayData: data.teachersData,
                    //currentData: data.teachersData[0]
                })
            }
        }
        else {
            if (data !== null) {
                this.setState({
                    teachersData: data.teachersData,
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
        localStorage.setItem('data_teach', JSON.stringify(nextState))
    }

    clearData = () => {
        localStorage.removeItem('username');
    }

    deleteRow(e) {
        let check = JSON.parse(localStorage.getItem('data_teach'))
        let result = check.teachersData.filter((ele, i) => i !== e)
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
                        teachersData: result,
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
            displayData: this.state.teachersData.slice(findFirstIndex, findLastIndex)
        })
    }

    render() {

        return (
            <div>
                <Navigation />

                <div className='background container w-75'>

                    <div>
                        <h2>Teachers Details</h2>
                        {/* <button className='btn btn-primary' onClick={this.clearData}><Link className='text-light' to='/'>Log out</Link></button> */}

                        <hr />
                    </div>

                    {this.renderRedirect()}

                    <div>
                        <div className='displayData m-b-5'>
                            <div className='container flex'>
                                <label className='drop'>Class</label>
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
                                <button className='btn btn-primary m-t-5'><Link className='text-light' to='/add-teacher'>Add teacher</Link></button>
                            </div>

                        </div>
                        <div className='container w-100 flex fixed-height m-b-5'>
                            <ReactBootstrap.Table striped bordered hover>
                                <thead className='font-weight-bold'>
                                    <tr>
                                        {/* <td>Sno</td> */}
                                        <td>Class</td>
                                        <td>Sec</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Password</td>
                                        <td colSpan='2'>Edit</td>
                                    </tr>
                                </thead>
                                <tbody className='teachers_list'>
                                    {(this.state.displayData !== null) ? this.state.displayData.map((teachCol, i) =>
                                        <tr key={i}>
                                            {/* <td>{i+1}</td> */}
                                            <td>{teachCol.id}</td>
                                            <td>{teachCol.sec}</td>
                                            <td>{teachCol.name.charAt(0).toUpperCase() + teachCol.name.slice(1)}</td>
                                            <td>{teachCol.email}</td>
                                            <td key={i}><input id={i} type={(this.state.hiddenPass && this.state.findCurrentRow === i) ? 'text' : 'password'} readOnly value={teachCol.pass} />
                                            <span><IoIosEye onClick={() => this.passwordToggle(i)} className='cursor-pointer' /></span></td>
                                            <td><Link className='text-dark' to={`/edit-teacher/${teachCol.email}`}><IoMdCreate className='cursor-pointer' /></Link></td>
                                            <td><MdDelete onClick={() => this.deleteRow(i)} className='cursor-pointer' /></td>
                                        </tr>) : null}
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

                        {/* <div className='list w-25'>
                            <ul className='ul-pagination'>
                                {this.state.pagination.map(result =>
                                    <li key={result} className='cursor-pointer' onClick={() => this.displayPageTab(result)}>
                                        {result}
                                    </li>)
                                }
                            </ul>
                        </div> */}

                    </div>
                </div>
            </div>
        )
    }
}
export default teachers_list