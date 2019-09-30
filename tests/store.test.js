const { Store } = require('../index.js')

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    default: return state
  }
}

test('Store subscribe', () => {
  expect.assertions(3)
  const testExpects = [1, 2, 1]
  let testRound = 0

  const store = new Store(counter)

  store.subscribe((state) => {
    expect(state).toBe(testExpects[testRound])
    testRound++
  })

  store.dispatch({ type: 'INCREMENT' })
  store.dispatch({ type: 'INCREMENT' })
  store.dispatch({ type: 'DECREMENT' })
})

test('Store unsubscribe', () => {
  expect.assertions(1)

  const store = new Store(counter)

  const unsubscribe = store.subscribe((state) => {
    expect(state).toBe(1)
  })

  store.dispatch({ type: 'INCREMENT' })
  unsubscribe()
  store.dispatch({ type: 'INCREMENT' })

})