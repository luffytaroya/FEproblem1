import {FaTrashAlt} from 'react-icons/fa'
import './index.css'

const UserData = props => {
  const {userDetails, deleteUser, selectedUserDataStatus} = props
  const {name, email, role, id} = userDetails
  const onDelete = () => {
    deleteUser(id)
  }

  const isCheckedStatus = () => {
    selectedUserDataStatus(id)
  }

  return (
    <li className="user-card-container">
      <button onClick={isCheckedStatus} type="button" className="list-button">
        <div className="user-details-container">
          <div className="input-container">
            <input className="check-box" type="checkbox" />
          </div>

          <div className="user-name-container">
            <p className="user-name"> {name} </p>
          </div>
          <div className="email-container">
            <p>{email}</p>
          </div>
          <div className="role-container">
            <p> {role} </p>
          </div>

          <button type="button" className="delete-button" onClick={onDelete}>
            <FaTrashAlt className="delete-img" />
          </button>
        </div>
      </button>

      <hr className="h-line" />
    </li>
  )
}
export default UserData
