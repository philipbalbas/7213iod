const choo = require('choo')
const css = require('sheetify')
const html = require('choo/html')

const inputGroup = require('./client/inputGroup')
const paramTable = require('./client/paramTable')
const main = require('./client/main')

css('tachyons')

const app = choo()
app.use(require('./client/store'))

const mainView = (state, emit) => {
  return main(state, emit)
}

app.route('/', mainView)
app.mount('body')
