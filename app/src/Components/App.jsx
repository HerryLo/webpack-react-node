import React, {Component} from 'react'
import Index from './Index'
import {RouteTransition} from 'react-router-transition';

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
