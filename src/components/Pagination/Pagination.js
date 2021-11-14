import './index.css'

const Pagination = props => {
  const {number, clickPageNumber, isActive} = props

  const onClickChangePageNumber = () => {
    clickPageNumber(number)
  }

  const activePageNumberClassName = isActive ? 'active-page-number' : ''

  return (
    <nav>
      <li className={`pagenumber-box ${activePageNumberClassName}`}>
        <a onClick={onClickChangePageNumber} className="pagenumber" href="!#">
          {number}
        </a>
      </li>
    </nav>
  )
}
export default Pagination
