import React, { Component } from 'react'
import './App.css'
// import Input from './components/Input'
import ListItem from './components/ListItem'
import Axios from 'axios'

//GET https://one-list-api.herokuapp.com/items?access_token=illustriousvoyage

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputsubmitted: '',
      impendingList: [],
      access_token: "Liz64EncodedReactClass"
    }
  }

  getApiUrl = () => {
    return `https://one-list-api.herokuapp.com/items?access_token=${this.state.access_token}`
  }

  getListFromAPI = event => {
    Axios.get(this.getApiUrl()).then(
      response => {
        console.log(response.data);
        this.setState({impendingList: response.data})
      }
    )
  }

  componentDidMount(){
    this.getListFromAPI()
  }

  submitForm = event => {
    event.preventDefault()
    this.setState({
      inputsubmitted: event.target.value
    })
    console.log(this.state.inputsubmitted + 'here')
    const newImpendingList = this.state.impendingList.concat(
      this.state.inputsubmitted
    )
    this.setState({
      impendingList: newImpendingList
    })
    console.log(this.state.impendingList)

    // Axios.post(this.getApiUrl(), {
    //   inputsubmitted: this.state.inputsubmitted
    // })
    Axios
      .post(this.getApiUrl(), {
        item: {
          text: this.state.inputsubmitted
        }
      })
      .then(resp => {
        // get lateset list form API
        this.getListFromAPI()
        // update state to clear out the input field
        this.setState({
          inputsubmitted: ''
        })
      })
  }


  handleDelete = itemId => {
    const getApiUrlDeleter = `https://one-list-api.herokuapp.com/items/${itemId}?access_token=${this.state.access_token}`
    Axios.delete(getApiUrlDeleter).then(
      response => {
        this.getListFromAPI()
      }
    )
  }

  handleChange = event => {
    this.setState({ inputsubmitted: event.target.value })
    // console.log(this.state.inputsubmitted)
  }
  render() {
    const items = this.state.impendingList.map((item) => {
      return <ListItem handleDelete={this.handleDelete} inputsubmitted={item.text} id={item.id} />
    })
    console.log(items);
    console.log(this.state.impendingList);
//.map(needText => needText.text)

    return (
      <div className="App">
        <ul>
          {items}
        </ul>
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            placeholder="We will make this pretty later"
            inputsubmitted={this.state.inputsubmitted}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default App
