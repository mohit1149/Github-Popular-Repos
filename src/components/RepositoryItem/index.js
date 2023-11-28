// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepoDetails

  return (
    <li className="list-item-repos">
      <div className="upper-container">
        <img className="list-image" src={avatarUrl} alt={name} />
        <h1 className="list-headings">{name}</h1>
      </div>
      <div className="star-container">
        <img
          className="star-image"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="list-heading">{starsCount}</p>
        <p className="list-heading-star">stars</p>
      </div>
      <div className="star-container">
        <img
          className="star-image"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="list-heading">{forksCount}</p>
        <p className="list-heading-star">forks</p>
      </div>
      <div className="star-container">
        <img
          className="star-image"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="list-heading">{issuesCount}</p>
        <p className="list-heading-star">open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
