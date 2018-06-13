import React, {Component} from 'react'
import Index from './Index'

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children || <Index/>}
      </div>

    )
  }
}

module.exports = App
