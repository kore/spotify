'use strict'

import React from "react"

import Router from './router.js'

let Authentification = React.createClass({
    render: function () {
        let session = Router.get().getSession()

        return (<main className="layout-row">
            <div className="layout-cell">
            </div>
            <div className="layout-cell">
                <h1>Authentification Required</h1>
                <p>You need to authentificate with Spotify.</p>
                <p>
                    Please <a href={session.authentifactionUrl}>give this
                    application access by clicking on this link</a>.
                </p>
            </div>
            <div className="layout-cell">
            </div>
        </main>)
    },
})

export default Authentification
