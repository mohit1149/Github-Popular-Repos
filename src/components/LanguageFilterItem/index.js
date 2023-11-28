// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageDetails, onClickUpdates} = props
  const {language, id} = eachLanguageDetails
  const onClickButton = () => {
    onClickUpdates(id)
  }

  return (
    <li className="list-item">
      <button className="click-button" onClick={onClickButton} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
