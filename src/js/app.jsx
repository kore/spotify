'use strict'

import React from 'react'
import jQuery from 'jquery'

import Head from './partials/head.jsx'
import Navigation from './partials/navigation.jsx'
import Footer from './partials/footer.jsx'

import Router from './router.js'

let App = React.createClass({
    propTypes: {
        route: React.PropTypes.shape({
            public: React.PropTypes.bool,
            path: React.PropTypes.string.isRequired,
        }).isRequired,
    },

    getDefaultProps: function () {
        return {
            route: {
                public: false,
            },
        }
    },

    getInitialState: function () {
        return {
        }
    },

    render: function () {
        return (<div className="application">
            <header className="layout-row">
                <div className="layout-cell hidden-xs">&nbsp;</div>
                <div className="layout-cell text-center">
                    <h1>Spotify Party Queue</h1>
                </div>
                <div className="layout-cell hidden-xs">&nbsp;</div>
            </header>
            <main className="layout-row">
                <div className="layout-cell">
                    <ul className="queue list-unstyled">
                        <li>Track 1</li>
                    </ul>
                </div>
                <div className="layout-cell">
                    <ul className="playlist list-unstyled">
                        <li>Track 1</li>
                    </ul>
                </div>
                <div className="layout-cell">
                    <h2>Search</h2>
                    <ul className="playlist list-unstyled">
                    </ul>
                </div>
            </main>
            <footer className="layout-row">
                <div className="layout-cell footer hidden-xs">&nbsp;</div>
                <div className="layout-cell footer text-center">
                    <Footer />
                </div>
                <div className="layout-cell footer hidden-xs">&nbsp;</div>
            </footer>
        </div>)
    },
})

export default App
