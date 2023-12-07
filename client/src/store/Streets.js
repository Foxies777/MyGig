import { makeAutoObservable } from 'mobx'
export default class Streets {
    constructor() {
        this._streets = [
            {
                id: 0,
                street_name: "70 лет Октября",
                description: 'sdgfdgdfgdfd'
            },
            {
                id: 1,
                street: "70 лет Победы",
                description: 'sdgfdgdfgdfd'
            },

        ]


        makeAutoObservable(this)
    }
    setStreets(streets) {
        this._streets = streets
    }

    get streets() {
        return this._streets
    }
}