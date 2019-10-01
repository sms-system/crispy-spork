module.exports = class DOMView {
  constructor (el, store) {
    this._el = el
    this._store = store
    this._unsubscribe = store.subscribe(
      this._prepareRender.bind(this)
    )
    this._prepareRender(store.getState())
  }

  _prepareRender (state) {
    if (this.shouldUpdate && !this.shouldUpdate(state)) { return }
    this._el.innerHTML = this.render(state)
  }

  render() {
    throw new Error('This method should be overriden')
  }

  destroy () {
    this._el.innerHTML = ''
    this._unsubscribe()
  }
}