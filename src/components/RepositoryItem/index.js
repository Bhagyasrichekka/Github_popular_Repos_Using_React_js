// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, name, forksCount, starsCount, issuesCount} = eachItem
  return (
    <li className="card">
      <img src={avatarUrl} alt={name} className="card-img" />
      <h1 className="card-heading">{name}</h1>
      <div className="card-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="card-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="icon"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="card-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
