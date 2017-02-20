'use strict'

import { Route } from 'react-router'

import React from "react"

import RouteListener from './routeListener.jsx'

let KabikoRouter = function (route, component, additionalProps) {
    additionalProps = additionalProps || {}

    return (<Route
        path={window.kabikoRouter.route(route)}
        component={RouteListener}
        subcomponent={component}
        routeIdentifier={route}
        {...additionalProps}
    />)
}

export default KabikoRouter
