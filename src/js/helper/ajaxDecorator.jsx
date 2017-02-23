'use strict'

import React from "react"
import jQuery from "jquery"
import _ from "underscore"

/**
 * AJAX aware components
 *
 * @NOTE: Does not automatically reload if no parameters are passes. paratemers
 * are normally automatically passed when wrapped into a ParameterDecorator.
 */
let Ajax = function (WrappedComponent, configuration) {
    configuration = _.extend({
        method: 'GET',
        // Run with parameters received tom Parameter converter before sending them to the server
        parameterConverter: function (parameters) {
            return parameters
        },
    }, configuration)

    if (!('route' in configuration)) {
        throw new Error("Route required")
    }

    let AjaxDecorator = React.createClass({
        propTypes: {
            parameters: React.PropTypes.object,
        },

        getDefaultProps: function () {
            return {
                parameters: {},
            }
        },

        getInitialState: function () {
            return {
                loading: false,
                error: null,
                data: null,
            }
        },

        componentDidMount: function () {
            this.reload()
        },

        componentDidUpdate: function (prevProps) {
            if (!_.isEqual(prevProps.parameters, this.props.parameters)) {
                this.reload()
            }
        },

        reload: function (background) {
            this.setState({ loading: !background })

            jQuery.ajax({
                method: configuration.method,
                url: window.spotifyRouter.path(
                    configuration.route,
                    configuration.parameterConverter(
                        _.extend({}, window.spotifyRoute.route.parameters, this.props.parameters)
                    )
                ),
                contentType: 'application/json',
                dataType: 'json',
                success: (function (data) {
                    this.setState({
                        error: null,
                        loading: false,
                        data: data
                    })
                }).bind(this),
                error: (function (response) {
                    if (response.responseJSON &&
                        response.responseJSON.msg &&
                        (typeof response.responseJSON.msg === 'string')) {
                        console.error("Error:", response.responseJSON)
                        this.setState({
                            error: response.responseJSON,
                            loading: false,
                        })
                    } else {
                        console.error("Unhandled Error:", response)
                        this.setState({
                            error: { status: 500, msg: "Internal Server Error" },
                            loading: false,
                        })
                    }
                }).bind(this),
            })
        },

        render: function () {
            return <WrappedComponent
                loader={this}
                loading={this.state.loading}
                error={this.state.error}
                data={this.state.data}
                {...this.props}>
                {this.children}
            </WrappedComponent>
        },
    })

    return AjaxDecorator
}

export default Ajax
