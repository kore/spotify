'use strict'

import React from "react"

import Router from "../router.js"
import Link from "../link.jsx"

let Navigation = React.createClass({
    propTypes: {
        active: React.PropTypes.string,
    },

    isActive: function (route) {
        if (this.props.active &&
            this.props.active.indexOf(Router.get().route(route)) === 0) {
            return "active"
        }

        return null
    },

    render: function () {
        return (<nav>
            <ul className="nav nav-pills nav-stacked">
                <li className={this.isActive("spotify.frontend.index")}>
                    <Link route="spotify.frontend.index">Start</Link>
                </li>
            </ul>
        </nav>)
    },
})

export default Navigation
