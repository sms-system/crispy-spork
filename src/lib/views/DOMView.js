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
    const tpl = this.render(state)
    if (tpl === false) { return }
    this._el.innerHTML = tpl
  }

  render() {
    throw new Error('This method should be overriden')
  }

  destroy () {
    this._el.innerHTML = ''
    this._unsubscribe()
  }
}