'use strict'

import jQuery from "jquery"

import Router from "./router.js"

let Api = function () {
    let state = {
        loading: false,
        error: null,
    }

    this.request = function (method, route, parameters, body, callback) {
        state.loading = true
        jQuery.ajax({
            method: method || "GET",
            url: Router.get().path(route, parameters),
            data: body ? JSON.stringify(body) : null,
            contentType: 'application/json',
            dataType: 'json',
            success: (function (data) {
                state.loading = false
                state.error = null

                callback(data)
            }).bind(this),
            error: (function (response) {
                if (response.responseJSON &&
                    response.responseJSON.error &&
                    (typeof response.responseJSON.error === 'string')) {
                    console.error("Error:", response.responseJSON)
                    state.error = response.responseJSON
                    state.loading = false
                } else {
                    console.error("Unhandled Error:", response)
                    state.error = { error: "Internal Server Error", stack: [] }
                    state.loading = false
                }
            }).bind(this),
        })
    }

    this.reset = function () {
        state = {
            loading: false,
            error: null,
            data: null,
        }
    }

    this.getState = function () {
        return state
    }
}

Api.get = function () {
    if (!window.spotifyApi) {
        window.spotifyApi = new Api()
    }

    return window.spotifyApi
}

export default Api
