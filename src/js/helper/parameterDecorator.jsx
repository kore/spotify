'use strict'

import React from "react"
import _ from 'lodash'

let Parameter = function (WrappedComponent, configuration) {
    configuration = _.extend({
        used: [],
    }, configuration)

    let ParameterDecorator = React.createClass({
        propTypes: {
            parameters: React.PropTypes.object,
        },

        getDefaultProps: function () {
            return {
                parameters: {},
            }
        },

        push: function (parameters, route) {
            route = route || this.currentRoute()
            window.kabikoRouter.push(
                route,
                this.mergeParameters(parameters)
            )
        },

        replace: function (parameters, route) {
            route = route || this.currentRoute()
            window.kabikoRouter.replace(
                route,
                this.mergeParameters(parameters)
            )
        },

        mergeParameters: function (parameters) {
            return _.extend({}, window.kabikoRoute.parameters, parameters)
        },

        currentRoute: function () {
            return window.kabikoRoute.route
        },

        render: function () {
            if (!window.kabikoRoute) {
                throw new Error("You forgot to use KabikoRoute in app.jquery.js for the current route.")
            }

            let parameters = _.pick(
                _.extend({}, this.props.parameters, window.kabikoRoute.parameters),
                configuration.used
            )

            return (<WrappedComponent
                navigator={this}
                parameters={parameters}
                {...(_.omit(this.props, ['parameters']))}>
                {this.children}
            </WrappedComponent>)
        },
    })

    return ParameterDecorator
}

export default Parameter
