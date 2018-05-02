const choo = require('choo')
const css = require('sheetify')
const html = require('choo/html')

const inputGroup = require('./inputGroup')
const paramTable = require('./paramTable')

const app = choo()

css('tachyons')

app.use(require('./store'))

const color = '#f0f0f0'

const container = css`
  :host {
    display: flex;
    justify-content: center;
    height: 100vh;
  }

  :host > .box {
    padding: 15px;
    margin: 5%;
    height: 85%;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 10% 5% 75%;
    grid-template-areas:
      'title title'
      'main main'
      'error error'
      'group table';
  }

  @media screen and (min-width: 1225px) {
    grid-template-areas:
      'title'
      'main'
      'error'
      'group'
      'table';
  }
`
const title = css`
  :host {
    grid-area: title;
    text-align: center;
  }
`

const inputMain = css`
  :host {
    grid-area: main;
    height: 30px;
    text-align: center;
    font-size: 110%;
  }
`

const error = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: error;
    color: rgb(154, 30, 30);
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    height: 100%;
  }
`

const main = (state, emit) => {
  return html`
    <div class=${`${container} yellow bg-dark-blue`}>
      <div class="box bg-navy">
        <h2 class=${`${title} fs-normal fw6 sans-serif`}>URL Editor</h2>
        <input 
          class=${`input-reset ba b--black-20 pa2 mb2 db w-100 bg-dark-blue yellow hover-black hover-bg-white ${inputMain}`}
          type="text" 
          placeholder="Paste your URL here" 
          value=${state.url.original} 
          oninput=${edit} />
        <span class=${`${error} sans-serif`}>${state.error}</span>
        ${inputGroup(state.url, emit)}
        ${
          !state.error.length && state.url.original.length
            ? paramTable(state.url, emit)
            : ''
        }
      </div>
    </div>`

  function edit(e) {
    emit('testUrl', e.target.value)
    emit('editUrl', e.target.value)
  }
}

app.route('/', main)

app.mount('div')
