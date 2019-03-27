import React, { Component } from 'react'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return <li onClick={() => this.props.handleDelete(this.props.id)} key={this.props.id}>{this.props.inputsubmitted}</li>
  }
}

export default List
