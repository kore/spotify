'use strict'

import React from 'react'

import Router from './router.js'

import Configuration from './configuration.jsx'
import Authentification from './authentification.jsx'

let App = React.createClass({
    propTypes: {
        route: React.PropTypes.shape({
            public: React.PropTypes.bool,
            path: React.PropTypes.string.isRequired,
        }).isRequired,
    },

    render: function () {
        let session = Router.get().getSession()

        if (!session.hasClientConfiguration) {
            return (<div className="application">
                <Configuration />
            </div>)
        }

        if (!session.isAuthentificated) {
            return (<div className="application">
                <Authentification />
            </div>)
        }

        return (<div className="application">
            <this.props.route.subcomponent {...this.props} />}
        </div>)
    },
})

export default App
