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
                <div className="layout-cell logo-cell">
                    <a href="/" className="brand">
                        <img src="/assets/title.png" className="img-responsive"
                            alt="Spotify" width="170" height="50" title="Spotify" />
                    </a>
                </div>
                <div className="layout-cell">
                    <Head {...this.props} />
                </div>
            </header>
            <div className="layout-row">
                <div className="layout-cell side">
                    <Navigation active={this.props.route.path} />
                </div>
                <main className="layout-cell container-fluid">
                    <this.props.route.subcomponent {...this.props} />
                </main>
            </div>
            <footer className="layout-row">
                <div className="layout-cell footer hidden-xs">&nbsp;</div>
                <div className="layout-cell footer">
                    <Footer />
                </div>
            </footer>
        </div>)
    },
})

export default App
