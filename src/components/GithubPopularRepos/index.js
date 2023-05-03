import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {activeFilter: 'ALL', activeStatus: status.loading, dataList: []}

  componentDidMount = () => {
    this.getData()
  }

  getFormattedData = dataList => {
    const formattedData = dataList.map(eachItem => ({
      id: eachItem.id,
      avatarUrl: eachItem.avatar_url,
      forksCount: eachItem.forks_count,
      issuesCount: eachItem.issues_count,
      name: eachItem.name,
      starsCount: eachItem.stars_count,
    }))
    return formattedData
  }

  getData = async () => {
    const {activeFilter} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeFilter}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      this.setState({activeStatus: status.success})
    } else {
      this.setState({activeStatus: status.failure})
    }
    this.setState({dataList: this.getFormattedData(data.popular_repos)})
  }

  updateActiveFilter = id => {
    this.setState({activeFilter: id}, this.getData)
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  renderSuccessView = () => {
    const {dataList} = this.state
    return (
      <ul className="items-list">
        {dataList.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderView = () => {
    const {activeStatus} = this.state

    switch (activeStatus) {
      case status.loading:
        return this.renderLoadingView()
      case status.failure:
        return this.renderFailureView()
      case status.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {activeFilter} = this.state
    return (
      <div className="container">
        <h1 className="heading">Popular</h1>
        <ul className="filters">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              eachItem={eachItem}
              updateActiveFilter={this.updateActiveFilter}
              isActive={activeFilter === eachItem.id}
            />
          ))}
        </ul>
        {this.renderView()}
      </div>
    )
  }
}

export default GithubPopularRepos
