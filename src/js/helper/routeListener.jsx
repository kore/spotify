'use strict'

import React from "react"
import _ from "lodash"

import App from "../app.jsx"

let RouteListener = React.createClass({
    propTypes: {
        location: React.PropTypes.shape({
            query: React.PropTypes.object.isRequired,
        }).isRequired,
        route: React.PropTypes.shape({
            path: React.PropTypes.string.isRequired,
            subcomponent: React.PropTypes.any.isRequired,
            routeIdentifier: React.PropTypes.string.isRequired,
        }).isRequired,
        params: React.PropTypes.object.isRequired,
    },

    componentWillMount: function () {
        this.updateRouteObject(this.props)
    },

    componentWillUpdate: function (nextProps) {
        this.updateRouteObject(nextProps)
    },

    updateRouteObject: function (props) {
        let parameters = _.extend(
            {},
            props.location.query,
            props.params
        )

        window.kabikoRoute = {
            path: props.route.path,
            route: props.route.routeIdentifier,
            parameters: parameters,
        }
    },

    render: function () {
        return (<App {..._.omit(this.props, ['history', 'location', 'params', 'routeParams', 'routes'])}>
            {this.children}
        </App>)
    },
})

export default RouteListener
