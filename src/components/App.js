import React, {Component} from 'react';
import '../App.css';
import {observer} from 'mobx-react';
import Moment from 'moment';
import InputMask from 'react-input-mask';

@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      surname: '',
      dob: '',
      phone: '',
      email: ''
    };

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  API_KEY = 'b39b649d28msh5237f7a0c53af84p1f3fb2jsne97795af1f05';

  componentDidMount() {
    // get all entities - GET
    fetch("https://fairestdb.p.rapidapi.com/users/user", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY
      }
    })
        .then(response => response.json())
        .then(response => {
          this.setState({
            users: response
          })
        })
        .catch(err => {
          console.log(err);
        });
  }

  create(e) {
    // add entity - POST
    e.preventDefault();

    // creates entity
    fetch("https://fairestdb.p.rapidapi.com/users/user", {
      "method": "POST",
      "headers": {
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY,
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        name: this.state.name,
        surname: this.state.surname,
        dob: this.state.dob,
        phone: this.state.phone,
        email: this.state.email
      })
    })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          this.clearFormInputs();
          this.componentDidMount();
        })
        .catch(err => {
          alert(err);
        });
    this.componentDidMount();
  }

  update(e) {
    // update entity - PUT
    e.preventDefault();

    // this will update entries with PUT
    fetch("https://fairestdb.p.rapidapi.com/users/user", {
      "method": "PUT",
      "headers": {
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY,
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        _id: this.state.id,
        name: this.state.name,
        surname: this.state.surname,
        dob: this.state.dob,
        phone: this.state.phone,
        email: this.state.email
      })
    })
        .then(response => response.json())
        .then(response => {
          if (response.errorCode === 400){
            alert('id is not defined');
          } else {
            this.clearFormInputs();
            this.componentDidMount();
          }
        })
        .catch(err => {
          alert(err);
        });
  }


  delete(e, userId) {
    // delete entity - DELETE
    e.preventDefault();
    // deletes entities
    fetch(`https://fairestdb.p.rapidapi.com/users/user/_id/${userId}`, {
      "method": "DELETE",
      "headers": {
        "x-rapidapi-host": "fairestdb.p.rapidapi.com",
        "x-rapidapi-key": this.API_KEY
      }
    })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.componentDidMount();
        })
        .catch(err => {
          alert(err)
        });
  }

  clearFormInputs() {
    Object.values(this.refs).map(input => input.value = '');
    this.setState({
      id: '',
      name: '',
      surname: '',
      dob: '',
      phone: '',
      email: ''
    });
  }

  completeInputs(e, user) {
    console.log(document.getElementsByClassName('form-control'));
    this.setState({
      id: user._id,
      name: user.name,
      surname: user.surname,
      dob: user.dob,
      phone: user.phone,
      email: user.email
    });
    this.refs.id.value = user._id;
    this.refs.name.value = user.name;
    this.refs.surname.value = user.surname;
    this.refs.dob.value = user.dob;
    this.refs.phone.value = user.phone;
    this.refs.email.value = user.email;
  }

  handleChange(changeObject) {
    this.setState(changeObject)
  }

  render() {
    return (
        <div className="container">
          <div>
            <form>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="id">User ID:</label>
                </div>
                <div className="col-75">
                  <input
                      name="id"
                      id="id"
                      ref='id'
                      type="text"
                      readOnly
                      disabled
                      className="form-control"
                      value={this.state.id}
                      onChange={(e) => this.handleChange({id: e.target.value})}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="name">User name:</label>
                </div>
                <div className="col-75">
                  <input
                      name="name"
                      id="name"
                      ref='name'
                      type="text"
                      maxLength='60'
                      className="form-control"
                      value={this.state.name}
                      onChange={(e) => this.handleChange({name: e.target.value})}
                      required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="surname">User surname:</label>
                </div>
                <div className="col-75">
                  <input
                      name="surname"
                      id="surname"
                      ref='surname'
                      type="text"
                      maxLength='60'
                      className="form-control"
                      value={this.state.surname}
                      onChange={(e) => this.handleChange({surname: e.target.value})}
                      required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="dob">User date-of-birthday:</label>
                </div>
                <div className="col-75">
                  <InputMask mask="99-999999"
                      name="dob"
                      id="dob"
                      ref='dob'
                      type="text"
                      className="form-control"
                      value={this.state.dob}
                      onChange={(e) => this.handleChange({dob: e.target.value})}
                      required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="phone">User phone:</label>
                </div>
                <div className="col-75">
                  <InputMask mask="0999999999"
                             name="phone"
                             id="phone"
                             ref='phone'
                             type="text"
                             className="form-control"
                             value={this.state.phone}
                             onChange={(e) => this.handleChange({phone: e.target.value})}/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="email">User email:</label>
                </div>
                <div className="col-75">
                  <input
                      name="email"
                      id="email"
                      ref='email'
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(e) => this.handleChange({email: e.target.value})}
                      required
                  />
                </div>
              </div>
              <div className="form-btns__wrp">
                <button type='button' onClick={(e) => this.create(e)}>
                  Add
                </button>
                <button type='button' onClick={(e) => this.update(e)}>
                  Update
                </button>
                <button type='button' onClick={(e) => this.clearFormInputs(e)}>
                  clear
                </button>
              </div>
            </form>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table>
              <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Create&nbsp;user&nbsp;date</th>
                <th>Update&nbsp;user&nbsp;date</th>
                <th></th>
              </tr>
              {this.state && this.state.users.map(user => {
                return <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.dob}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{Moment(user._tags._createdOn).format('DD-MM-YYYY HH:mm')}</td>
                  <td>{Moment(user._tags._lastModifiedOn).format('DD-MM-YYYY HH:mm')}</td>
                  <td>
                    <button type='button' onClick={(e) => this.delete(e, user._id)}>Delete</button>
                    <button type='button' onClick={(e) => this.completeInputs(e, user)}>Update</button>
                  </td>
                </tr>
              })}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

export default App;
