'use strict'

import jQuery from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, useRouterHistory } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import useQueries from 'history/lib/useQueries'
import useBasename from 'history/lib/useBasename'
import httpParseQuery from './helper/httpParseQuery.js'
import httpBuildQuery from './helper/httpBuildQuery.js'

import NotFound from './helper/not_found.jsx'

import SpotifyRoute from './helper/spotifyRoute.jsx'
import AppRouter from './router.js'
import App from './app.jsx'

import Overview from './overview.jsx'

(function (jQuery) {
    jQuery.fn.app = function (options) {
        options = jQuery.extend({}, jQuery.fn.app.defaults, options)

        return jQuery(this).each(function () {
            let rootElement = jQuery(this)[0]
            let appData = jQuery(rootElement).data('app')
            let history = useBasename(useQueries(useRouterHistory(createHistory)))({
                basename: '/',
                parseQueryString: httpParseQuery,
                stringifyQuery: httpBuildQuery,
            })
            window.spotifyRouter = new AppRouter(history, appData.routes, appData.session)

            ReactDOM.unmountComponentAtNode(rootElement)

            return ReactDOM.render(
                <Router history={history}>
                    {SpotifyRoute('spotify.frontend.index', Overview)}

                    {/* Should always be last */}
                    <Route path="*" component={App} subcomponent={NotFound} />
                </Router>,
                rootElement
            )
        })
    }
    jQuery.fn.app.defaults = {}
})(jQuery)

window.pluginRegistry.register({ selector: '[data-app]', invoke: 'app', isReact: true })
