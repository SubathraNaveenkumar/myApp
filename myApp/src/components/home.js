import React, { Component } from 'react';
import './loginStyle.css';
import { Redirect } from 'react-router-dom'
import Navigation from './Navigation';

class home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            findTeachLength: 0,
            findStudLength: 0
        }
    }

    componentDidMount() {
        let fetchTeachData = JSON.parse(localStorage.getItem('data_teach'))
        let fetchStudData = JSON.parse(localStorage.getItem('data_student'))

        if (fetchTeachData !== null) {
            this.setState({
                findTeachLength : fetchTeachData.teachersData.length
            })
        }

        if (fetchStudData !== null) {
            this.setState({
                findStudLength : fetchStudData.studentsData.length
            })
        }
    
    }

    renderRedirect = () => {
        let sessusername = localStorage.getItem('username');
        if (!sessusername) {
            return <Redirect to='/' />
        }
    }

    componentWillUpdate(nextProps, nextState) {
    }


    render() {

        return (
            <div>
                <Navigation />
                <div className='background container w-50'>
                    <div>
                        <h2>Details</h2>
                        <hr />
                    </div>
                    <div>
                        Total number of teachers data: {this.state.findTeachLength}
                    </div>
                    <div>
                        Total number of students data: {this.state.findStudLength}
                    </div>
                </div>
            </div>
        )
    }
}
export default home