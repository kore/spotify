'use strict'

import React from "react"
import Link from '../link.jsx'

let Footer = React.createClass({
    render: function () {
        return (<ul className="list-inline">
            <li>&copy; 2016 - {(new Date()).getFullYear()} Spotify</li>
            <li><Link route="spotify.frontend.legal">Impressum</Link></li>
            <li><a target="_blank" href="https://bitbucket.org/koredn/spotify/issues">Problem melden</a></li>
        </ul>)
    },
})

export default Footer
