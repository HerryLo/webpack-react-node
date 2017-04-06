import React from 'react'
import {render,PropTypes} from 'react-dom'
import {Router, Route, browserHistory } from 'react-router'
import RouteConfig from './Routes/Route'
import './Style/global.css'
import './Stubs/COURSES'
render((
    <Router
        history={browserHistory}
        routes={RouteConfig}>
    </Router>
),document.getElementById('root'))
