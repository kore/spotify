'use strict'

import moment from 'moment'

let Season = function (season) {
    this.id = season.id
    this.name = null
    this.start = moment(season.start)
    this.end = moment(season.end)

    this.getName = function (id) {
        return id.replace(/^(\d+)-(\d)$/, "$2. Halbjahr $1")
    }

    this.startsBefore = function (date) {
        return moment(date || []).isAfter(this.start)
    }

    this.contains = function (date) {
        date = moment(date || null)
        return date.isAfter(this.start) &&
            date.isBefore(this.end)
    }

    if (!this.id) {
        throw new Error("Required property id not specified")
    }
    this.name = this.getName(this.id)
}

export default Season
