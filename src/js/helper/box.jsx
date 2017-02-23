'use strict'

import React from "react"

import LoadingCover from './loadingCover.jsx'
import ErrorCover from './errorCover.jsx'

let Box = React.createClass({
    propTypes: {
        loading: React.PropTypes.bool,
        error: React.PropTypes.any,
        className: React.PropTypes.string,
    },

    getDefaultProps: function () {
        return {
            loading: false,
            error: null,
            className: "",
            children: null,
        }
    },

    render: function () {
        let className = "box " + this.props.className

        return (<div className={className}>
            {this.props.error ? <ErrorCover message={this.props.error.msg} /> : null}
            {!this.props.error && this.props.loading ? <LoadingCover /> : null}
            {this.props.children}
        </div>)
    },
})

export default Box
