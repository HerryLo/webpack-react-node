import React from 'react'
import {render,PropTypes} from 'react-dom'
import {Router, Route, browserHistory } from 'react-router'
import RouteConfig from './Routes/Route'
import './Stubs/COURSES'

import './Style/common/header.css'
import './Style/common/download.css'
import './Style/common/toast.css'
import './Style/global.css'
import './Style/moments.css'
import './Style/protect.css'
import './Style/activity.css'

render((
    <Router 
        style={{height: '100%'}}
        history={browserHistory}
        routes={RouteConfig}>
    </Router>
),document.getElementById('root'))
