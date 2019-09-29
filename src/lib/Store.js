module.exports = class Store {
  constructor (reducer) {
    this._reducer = reducer
    this._state = undefined
    this._listeners = []
    this.dispatch({
      type: '@@init'
    })
  }

  _notifyListeners () {
    this._listeners.forEach((listener) => {
      listener(this._state)
    })
  }

  getState () {
    return this._state
  }

  subscribe (cb) {
    this._listeners.push(cb)
    return () => { // Unsubscribe fn
      const index = this._listeners.indexOf(cb)
      this._listeners.splice(index, 1)
    }
  }

  dispatch (action) {
    this._state = this._reducer(this._state, action)
    this._notifyListeners()
  }
}