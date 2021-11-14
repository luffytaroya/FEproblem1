import {Component} from 'react'
import UserData from './components/UserData'

import Pagination from './components/Pagination/Pagination'
import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    userDetailsList: [],
    currentPage: 1,
    userDataPerPage: 10,
    activePageNumber: 1,
    selectedUserData: [],
  }

  componentDidMount() {
    this.getUsersList()
  }

  clickPageNumber = id => {
    this.setState({activePageNumber: id, currentPage: id})
  }

  getUsersList = async () => {
    const apiUrl =
      ' https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedUsersList = fetchedData.map(eachUser => ({
      id: eachUser.id,
      name: eachUser.name,
      email: eachUser.email,
      role: eachUser.role,
    }))
    this.setState({
      userDetailsList: updatedUsersList,
    })
  }

  selectedUserDataStatus = id => {
    this.setState(prevState => ({
      selectedUserData: [...prevState.selectedUserData, id],
    }))
  }

  deleteSelectedUserData = () => {
    const {userDetailsList, selectedUserData} = this.state
    const filteredUsersData = userDetailsList.filter(
      each => !selectedUserData.includes(parseInt(each, 10)),
    )

    this.setState({userDetailsList: filteredUsersData})
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  deleteUser = id => {
    const {userDetailsList} = this.state
    const filteredUsersData = userDetailsList.filter(each => each.id !== id)
    this.setState({
      userDetailsList: filteredUsersData,
    })
  }

  render() {
    const {
      searchInput,
      userDetailsList,
      currentPage,
      userDataPerPage,
      activePageNumber,
    } = this.state

    const searchResults = userDetailsList.filter(eachUser =>
      Object.keys(eachUser).some(key =>
        eachUser[key]
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase()),
      ),
    )

    const indexOfLastData = currentPage * userDataPerPage
    const indexOfFirstData = indexOfLastData - userDataPerPage
    const currentUserData = searchResults.slice(
      indexOfFirstData,
      indexOfLastData,
    )

    const totalUsers = searchResults.length

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / userDataPerPage); i += 1) {
      pageNumbers.push(i)
    }

    return (
      <div className="app-container">
        <div>
          <input
            className="search-input"
            placeholder="Search by name,email or role"
            value={searchInput}
            type="search"
            onChange={this.onChangeSearchInput}
          />
        </div>
        <div>
          <ul className="titles">
            <input className="title-check-box" type="checkbox" />
            <p className="title-name">Name</p>
            <p className="title-email">Email</p>
            <p className="title-role">Role</p>
            <p className="title-actions">Actions</p>
          </ul>
        </div>

        <hr className="h-line" />
        <div>
          <ul className="list-container">
            {currentUserData.map(eachUser => (
              <UserData
                userDetails={eachUser}
                deleteUser={this.deleteUser}
                key={eachUser.id}
                selectedUserDataStatus={this.selectedUserDataStatus}
              />
            ))}
          </ul>
          <div className="footer">
            <button
              onClick={this.deleteSelectedUserData}
              className="delete-selected"
              type="button"
            >
              Delete Selected
            </button>
            <ul className="pagenumbers-container">
              {pageNumbers.map(eachNumber => (
                <Pagination
                  key={eachNumber}
                  number={eachNumber}
                  clickPageNumber={this.clickPageNumber}
                  isActive={activePageNumber === eachNumber}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
