import React, {Component} from 'react';
import '../App.css';
import {observer} from 'mobx-react';
import Moment from 'moment';
import InputMask from 'react-input-mask';
import ReactPaginate from 'react-paginate';
import "./paginationStyle.css";

@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      button: 1,
      offset: 0,
      data: [],
      paginationData: [],
      filteredListtt: [],
      filterBy: '_id',
      perPage: 10,
      currentPage: 0,
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
    this.handlePageClick = this.handlePageClick.bind(this);
  }


  API_KEY = 'b39b649d28msh5237f7a0c53af84p1f3fb2jsne97795af1f05';


  componentDidMount() {
    this.receivedData()
  }

  receivedData() {
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
          const postData = this.state.users.slice(this.state.offset, this.state.offset + this.state.perPage)
          this.setState({
            pageCount: Math.ceil(this.state.users.length / this.state.perPage),
            paginationData: postData
          })
        })
        .catch(err => {
          console.log(err);
        });
  }

  setFilter(e, sortType) {
    let filteredList
    // eslint-disable-next-line default-case
    switch (sortType) {
      case 'name':
        filteredList = this.state.paginationData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'surname':
        filteredList = this.state.paginationData.sort((a, b) => a.surname.localeCompare(b.surname));
        break;
      case '_id':
        filteredList = this.state.paginationData.sort((a, b) => a._id.localeCompare(b._id));
        break;
    }
    this.setState({
      filteredListtt: filteredList,
      filterBy: sortType
    })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });
  };

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
                filterBy: '_id'
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
            <form className="ui form" onSubmit={(e) => this.onSubmit(e)}>
              <div className="field">
                <label htmlFor="id">User ID:</label>
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
              <div className="field">
                <label htmlFor="name">User name:</label>
                <input
                    name="name"
                    id="name"
                    ref='name'
                    type="text"
                    maxLength='60'
                    className="form-control"
                    value={this.state.user.name}
                    pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                    onChange={(e) => this.handleInput(e)}
                    required
                />
              </div>
              <div className="field">
                <label htmlFor="surname">User surname:</label>
                <input
                    name="surname"
                    id="surname"
                    ref='surname'
                    pattern="^[A-Za-zА-Яа-яЁё\s]+$"
                    type="text"
                    maxLength='60'
                    className="form-control"
                    value={this.state.user.surname}
                    onChange={(e) => this.handleInput(e)}
                    required
                />
              </div>
              <div className="field">
                <label htmlFor="dob">User DOB:</label>
                <InputMask mask="99.99.9999"
                           pattern="^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$"
                           name="dob"
                           id="dob"
                           ref='dob'
                           type="text"
                           className="form-control"
                           title='31.12.1xxx'
                           value={this.state.user.dob}
                           onChange={(e) => this.handleInput(e)}
                           required
                />
              </div>
              <div className="field">
                <label htmlFor="phone">User phone:</label>
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
              <div className="field">
                <label htmlFor="email">User email:</label>
                <input
                    name="email"
                    id="email"
                    ref='email'
                    type="text"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    className="form-control"
                    title='xxxx@xxxx.xx'
                    value={this.state.user.email}
                    onChange={(e) => this.handleInput(e)}
                    required
                />
              </div>
              <div className="ui buttons ">
                <button
                    type="submit"
                    className="ui button"
                    onClick={() => (this.setState({button: 1}))}>Add
                </button>
                <button
                    className="ui button"
                    disabled={this.state.button}
                    type="submit"
                    onClick={() => (this.setState({button: 0}))}>Update
                </button>
                <button
                    className="ui button"
                    type='button'
                    onClick={(e) => this.clearFormInputs(e)}>Clear
                </button>
              </div>
            </form>
          </div>
          <div className="ui buttons">
            <button
                className="ui button"
                disabled={this.state.filterBy === 'name'}
                onClick={(e) => this.setFilter(e, 'name')}>Name filter
            </button>
            <button
                className="ui button"
                disabled={this.state.filterBy === 'surname'}
                onClick={(e) => this.setFilter(e, 'surname')}>Surname filter
            </button>
            <button
                className="ui button"
                disabled={this.state.filterBy === '_id'}
                onClick={(e) => this.setFilter(e, '_id')}>all
            </button>
          </div>

          <div className='userList'>
            <table className="ui single line table">
              <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Create&nbsp;user&nbsp;date</th>
                <th>Update&nbsp;user&nbsp;date</th>
                <th></th>
              </tr>
              </thead>
              <tbody>

              {this.state && this.state.paginationData.map((user, index) => {
                return <React.Fragment key={index}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.dob}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{Moment(user._tags._createdOn).format('DD-MM-YYYY HH:mm')}</td>
                    <td>{Moment(user._tags._lastModifiedOn).format('DD-MM-YYYY HH:mm')}</td>
                    <td>
                      <div className="ui buttons">
                        <button className="ui button" onClick={(e) => this.delete(e, user._id)}>Delete</button>
                        <div className="or"></div>
                        <button className="ui positive button" onClick={(e) => this.completeInputs(e, user)}>Update</button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              })}
              </tbody>
            </table>
            {this.state.pageCount > 1 ? <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/> : null}

          </div>
        </div>
    );
  }
}

export default App;
