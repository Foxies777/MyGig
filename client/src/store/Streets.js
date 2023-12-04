import { makeAutoObservable } from 'mobx'
export default class Streets {
    constructor() {
        this._streets = [
            {
                id: 0,
                street: "70 лет Октября"
            },
            {
                "id": 1,
                "street": "70 лет Победы"
            },
            {
                id: 2,
                street: "8 Марта"
            },
            {
                id: 3,
                street: "Аббяса Кашаева"
            },
            {
                id: 4,
                street: "Абдуллы Алиша"
            },
            {
                id: 5,
                street: "Автомобилистов"
            }
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