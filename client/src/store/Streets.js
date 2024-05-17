import { makeAutoObservable } from 'mobx';

export default class Streets {
  constructor() {
    this._streets = [];
    makeAutoObservable(this);
  }

  setStreets(streets) {
    this._streets = streets;
  }

  addStreet(street) {
    this._streets.push(street);
  }

  updateStreet(updatedStreet) {
    this._streets = this._streets.map(street =>
      street.id === updatedStreet.id ? updatedStreet : street
    );
  }

  deleteStreet(id) {
    this._streets = this._streets.filter(street => street.id !== id);
  }

  get streets() {
    return this._streets;
  }
}
