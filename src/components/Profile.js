import React, { Component } from 'react'
import Fireapp from '../config/firebaseConfig'

const storage = Fireapp.storage();

class BasicInfoForm extends Component {
    state = {
        firstName : '',
        lastName : '',
        phone : '',
        email : '',
        sentence : '',
        college : '',
        major : '',
        year : '',
        latitude: '',
        longitude: '',
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleLLChange = (l1,l2) =>{
      console.log(l1,l2,this.state);
        this.setState({
            latitude:l1,
            longitude:l2,
        })
        const db = Fireapp.firestore()
        const ref = db.collection('test_collection');
        console.log(this.state);
        ref.add(this.state);
    }

    showPosition = (position)=> {
      {this.handleLLChange(position.coords.latitude, position.coords.longitude)};
      console.log("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude)
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        else {
          alert("Please enable location")
        }

    }

    componentDidMount(){
        console.log("in basicinfo profile ..",this.props.profile)
        if (this.props.edit){
            const bio = this.props.profile['bio']
            this.setState({
                profilePicture :bio['profilePicture'],
                firstName : bio['firstName'],
                lastName : bio['lastName'],
                header : bio['header'],
                designation : bio['designation'],
                links : bio['links'],
            })
        }
    }
    render() {

        return (
            <div className="container">
                <form className = "white">
                    <h5 className="grey-text text-darken-3">
                        Enter your info
                    </h5>
                    <hr/>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" value = {this.state.firstName} id = "firstName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id = "lastName" value = {this.state.lastName} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Phone Number</label>
                        <input type="text" id = "phone" value = {this.state.phone} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Email Address</label>
                        <input type="text" id = "email" value = {this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="header">1 Sentence about you</label>
                        <input type="text" id = "sentence" value = {this.state.sentence}  onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">College/University</label>
                        <input type="text" id = "college" value = {this.state.college} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">Major</label>
                        <input type="text" id = "major" value = {this.state.major} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">Graduation Year</label>
                        <input type="month" id = "year" value = {this.state.year} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button type="button" className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default BasicInfoForm
