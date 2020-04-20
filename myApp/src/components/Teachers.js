import React, { Component } from 'react'
import teachersData from './teachersData.json'

// let teachData = teachersData.teachList;
let filterDropdown = null;
let storId = 0;
let secId = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

class Teachers extends Component {

    constructor() {
        super()
        this.state = {
            teachData: teachersData.teachList,
            secValues: []
        }
    }

    findSelectedClass = (event) => { 
        storId = event.target.value;
        
        filterDropdown = teachersData.teachList.filter(function (result) {
            if (result.id.indexOf(storId) !== -1) {
                return result
            }
            return null
        })

        if (event.target.value === 'NA') {
            this.setState({
                teachData: teachersData.teachList
            })
        }
        else {
            this.setState({
                teachData: filterDropdown
            })
        }

        for(var k=0;k<filterDropdown.length;k++)
        {
           this.setState({
                secValues: secId[k]
           })
           //console.log(this.state.secValues)
        }        
    }

    render() {
        return (
            <div>
                <h2>Teachers Dashboard</h2>
                <div>
                    <div>
                        <label>Class</label>
                        <select onChange={this.findSelectedClass} id='select-class'>
                            <option value='NA'>--select class--</option>
                            <option>C1</option>
                            <option>C2</option>
                            <option>C3</option>
                        </select>
                    </div>
                    <div>
                        <label>Section</label>
                        <select id='select-section'>
                            <option value='NA'>--select section--</option>
                            
                        </select>
                    </div>
                </div>
                <table border='1'>
                    <thead>
                        <tr>
                            <td>Teachers_Id</td>
                            <td>Teachers_Name</td>
                            <td>Teachers_Email</td>
                            <td>Teachers_Password</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teachData.map(teachCol =>
                            <tr key={teachCol.id}>
                                <td>{teachCol.id}</td>
                                <td>{teachCol.name}</td>
                                <td>{teachCol.email}</td>
                                <td>{teachCol.password}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Teachers