'use strict'

import _ from 'lodash'
import jQuery from 'jquery'

import httpBuildQuery from './helper/httpBuildQuery.js'

let Router = function (history, routes, session) {
    this.history = history
    this.routes = routes
    this.session = session
    this.parameters = {}

    this.parameterMatcher = /\{([A-Za-z0-9]+)\}/g
    this.getRouteKeys = function (route) {
        if (!(route in this.routes)) {
            throw new Error("Route " + route + " not defined.")
        }

        let keys = []
        let matches = false
        while ((matches = this.parameterMatcher.exec(this.routes[route])) !== null) {
            keys.push(matches[1])
        }

        return keys
    }

    this.path = function (route, parameters) {
        let allParameters = _.extend(this.parameters, parameters || {})

        let keys = this.getRouteKeys(route)
        let unknownKeys = _.difference(keys, _.keys(allParameters))
        if (unknownKeys.length) {
            throw new Error("Missing values for " + route + ": " + unknownKeys.join(", "))
        }

        return _.reduce(
            keys,
            function (link, key) {
                return link.replace('{' + key + '}', allParameters[key])
            },
            this.routes[route]
        )
    }

    this.query = function (route, parameters) {
        let allParameters = _.extend(this.parameters, parameters || {})

        // @HACK: We should make sure we do not carry around all parameters all the time
        let keys = _.union(this.getRouteKeys(route), ['class', 'pupil', 'test', 'subject', 'grades'])
        let queryKeys = _.difference(_.keys(allParameters), keys)
        return _.pick(allParameters, queryKeys)
    }

    this.fullPath = function (route, parameters) {
        return this.path(route, parameters) + '?' + httpBuildQuery(this.query(route, parameters))
    }

    this.route = function (route) {
        let keys = this.getRouteKeys(route)
        return _.reduce(
            keys,
            function (link, key) {
                return link.replace('{' + key + '}', ':' + key)
            },
            this.routes[route]
        )
    }

    this.push = function (route, parameters) {
        this.history.push(this.fullPath(route, parameters))
    }

    this.replace = function (route, parameters) {
        this.history.replace(this.fullPath(route, parameters))
    }

    this.setDefaultParameter = function (name, value) {
        this.parameters[name] = value
    }

    this.setSession = function (session) {
        this.session = session
        jQuery(window).trigger('sessionChange', [session])
    }

    this.getSession = function () {
        return this.session
    }

    window.spotifyRouter = this
}

Router.get = function () {
    if (!window.spotifyRouter) {
        throw new Error("Router not yet intialized")
    }

    return window.spotifyRouter
}

export default Router
