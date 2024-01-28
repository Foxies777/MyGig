import { makeAutoObservable } from 'mobx'
export default class Streets {
    constructor() {
        this._streets = []


        makeAutoObservable(this)
    }
    setStreets(streets) {
        this._streets = streets
    }

    get streets() {
        return this._streets
    }
}