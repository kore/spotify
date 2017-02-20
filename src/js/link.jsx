'use strict'

import React from "react"
import { Link } from 'react-router'
import _ from 'lodash'

import Router from "./router.js"

let SymfonyLink = React.createClass({
    propTypes: {
        route: React.PropTypes.string.isRequired,
        params: React.PropTypes.object,
        children: React.PropTypes.node,
    },

    getDefaultProps: function () {
        return {
            params: {},
            children: '',
        }
    },

    render: function () {
        let router = Router.get()
        let childProps = _.omit(this.props, ['route', 'params'])
        let parameters = this.props.params
        if (('kabikoRoute' in window) &&
            ('parameters' in window.kabikoRoute)) {
            parameters = _.extend(
                _.pick(window.kabikoRoute.parameters, ['season']),
                parameters
            )
        }

        return (<Link to={{
            pathname: router.path(this.props.route, parameters),
            query: router.query(this.props.route, parameters),
        }} {...childProps}>
            {this.props.children}
        </Link>)
    },
})

export default SymfonyLink
