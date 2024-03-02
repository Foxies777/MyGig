import { makeAutoObservable } from 'mobx';

export default class Notification {
  _notifications = [];

  constructor() {
    makeAutoObservable(this);
    this._notifications = []; // Правильное место для инициализации
  }

  setNotifications(notifications) {
    this._notifications = notifications;
  }

  get notifications() {
    return this._notifications;
  }
}


