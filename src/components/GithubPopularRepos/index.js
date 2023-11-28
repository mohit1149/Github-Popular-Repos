import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageFilterId: 'ALL',
  }

  componentDidMount() {
    this.GithubPopularReposFunction()
  }

  GithubPopularReposFunction = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLanguageFilterId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickUpdates = activeLanguageFilterId => {
    this.setState({activeLanguageFilterId}, this.GithubPopularReposFunction)
  }

  languageFiltersDataFunction = () => (
    <ul className="unorder-list">
      {languageFiltersData.map(eachLanguage => (
        <LanguageFilterItem
          key={eachLanguage.id}
          eachLanguageDetails={eachLanguage}
          onClickUpdates={this.onClickUpdates}
        />
      ))}
    </ul>
  )

  renderSuccessRepo = () => {
    const {repoList} = this.state

    return (
      <>
        <ul className="unorder-list-repo-list">
          {repoList.map(eachRepoList => (
            <RepositoryItem
              key={eachRepoList.id}
              eachRepoDetails={eachRepoList}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFailureRepo = () => (
    <>
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </>
  )

  renderProgressRepo = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  allPossibleCases = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessRepo()
      case apiStatusConstants.failure:
        return this.renderFailureRepo()
      case apiStatusConstants.inProgress:
        return this.renderProgressRepo()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.languageFiltersDataFunction()}
        {this.allPossibleCases()}
      </div>
    )
  }
}

export default GithubPopularRepos
