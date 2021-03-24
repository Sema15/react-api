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
      button: 1,
      user: {
        name: '',
        surname: '',
        dob: '',
        phone: '',
        email: ''
      }
    };

    this.delete = this.delete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
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

  onSubmit(e) {
    e.preventDefault();
    if (this.state.button === 1) {
      fetch("https://fairestdb.p.rapidapi.com/users/user", {
        "method": "POST",
        "headers": {
          "x-rapidapi-host": "fairestdb.p.rapidapi.com",
          "x-rapidapi-key": this.API_KEY,
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          name: this.state.user.name,
          surname: this.state.user.surname,
          dob: this.state.user.dob,
          phone: this.state.user.phone,
          email: this.state.user.email
        })
      })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            this.clearFormInputs(e);
            this.componentDidMount();
          })
          .catch(err => {
            alert(err);
          });
    }
    if (this.state.button === 0) {
      fetch("https://fairestdb.p.rapidapi.com/users/user", {
        "method": "PUT",
        "headers": {
          "x-rapidapi-host": "fairestdb.p.rapidapi.com",
          "x-rapidapi-key": this.API_KEY,
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          _id: this.state.user.id,
          name: this.state.user.name,
          surname: this.state.user.surname,
          dob: this.state.user.dob,
          phone: this.state.user.phone,
          email: this.state.user.email
        })
      })
          .then(response => response.json())
          .then(response => {
            if (response.errorCode === 400) {
              alert('id is not defined');
            } else {
              this.clearFormInputs(e);
              this.componentDidMount();
              this.setState({
                isUpdate: true,
              })
            }

          })
          .catch(err => {
            alert(err);
          });
    }
  };


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

  clearFormInputs(e) {
    e.preventDefault();
    this.setState({
      button: 1,
      user: {
        id: '',
        name: '',
        surname: '',
        dob: '',
        phone: '',
        email: ''
      }
    });
  }

  completeInputs(e, user) {
    this.setState({
      button: 0,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        dob: user.dob,
        phone: user.phone,
        email: user.email
      }
    });
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => {
          return {
            user: {
              ...prevState.user, [name]: value
            }
          }
        }
    )
  }

  render() {
    return (
        <div className="container">
          <div>
            <form onSubmit={(e) => this.onSubmit(e)}>
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
                      value={this.state.user.id}
                      onChange={(e) => this.handleInput(e)}
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
                      value={this.state.user.name}
                      onChange={(e) => this.handleInput(e)}
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
                      value={this.state.user.surname}
                      onChange={(e) => this.handleInput(e)}
                      required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="dob">User date-of-birthday:</label>
                </div>
                <div className="col-75">
                  <InputMask mask="99.99.9999"
                             name="dob"
                             id="dob"
                             ref='dob'
                             type="text"
                             className="form-control"
                             value={this.state.user.dob}
                             onChange={(e) => this.handleInput(e)}
                             required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="phone">User phone:</label>
                </div>
                <div className="col-75">
                  <InputMask mask="0(99)9999999"
                             name="phone"
                             id="phone"
                             ref='phone'
                             type="text"
                             className="form-control"
                             value={this.state.user.phone}
                             onChange={(e) => this.handleInput(e)}
                             required
                  />
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
                      value={this.state.user.email}
                      onChange={(e) => this.handleInput(e)}
                      required
                  />
                </div>
              </div>
              <div className="form-btns__wrp">
                <button type="submit" onClick={() => (this.setState({button: 1}))}>
                  Add
                </button>
                <button disabled={this.state.button} type="submit" onClick={() => (this.setState({button: 0}))}>
                  Update
                </button>
                <button type='button' onClick={(e) => this.clearFormInputs(e)}>
                  Clear
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
              {this.state && this.state.users.map((user, index) => {
                return <tr key={index}>
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
