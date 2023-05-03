// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, updateActiveFilter, isActive} = props
  const {id, language} = eachItem
  const tabStyles = isActive ? 'style' : 'invisible-btn'

  const callTheFun = () => {
    updateActiveFilter(id)
  }
  return (
    <li className="filter-item">
      <button type="button" onClick={callTheFun} className={tabStyles}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
