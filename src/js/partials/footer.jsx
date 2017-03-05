'use strict'

import React from "react"

let Footer = React.createClass({
    render: function () {
        return (<ul className="list-inline">
            <li>&copy; 2016 - {(new Date()).getFullYear()} Spotify Party Queue</li>
        </ul>)
    },
})

export default Footer
