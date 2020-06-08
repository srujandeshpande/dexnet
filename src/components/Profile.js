import React, { Component } from 'react'
import Fireapp from '../config/firebaseConfig'

const storage = Fireapp.storage();
const email = Fireapp.auth().currentUser

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
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        //firebase save
        if(this.props.edit == true && this.state.image == null)
        {
            this.setState({
                profilePicture:this.props.profile['bio']['profilePicture']
            })
        }
        console.log("IMAGE UPLOADED!",this.state.profilePicture)
        const db = Fireapp.firestore()
        const ref = db.collection('profiles');
        const bio = {
            'profilePicture' : this.state.profilePicture,
            'firstName' : this.state.firstName,
            'lastName' : this.state.lastName,
            'header' : this.state.header,
            'designation' : this.state.designation,
            'links' : this.state.links,
        }
        if(this.props.id == ''){
        ref.add({
            email:email,
            bio:bio
        }).then(
            (docRef) => {
                this.props.next(docRef.id)
            }
        )
        .catch((error)=>{
            console.log("Some error occured")
        })
        }
        else{
            ref.doc(this.props.id).update({
                email:email,
                bio:bio
            })
            .then(
                this.props.next(this.props.id)
            )
            .catch((error)=>{
                console.log(
                    'Some error occured'
                )
            })
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
                        <input type="text" id = "lastName" value = {this.state.lastName} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="header">1 Sentence about you</label>
                        <input type="text" id = "header" value = {this.state.header}  onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">College/University</label>
                        <input type="text" id = "designation" value = {this.state.designation} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">Major</label>
                        <input type="text" id = "designation" value = {this.state.designation} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="designation">Graduation Year</label>
                        <input type="year" id = "designation" value = {this.state.designation} onChange={this.handleChange} />
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
