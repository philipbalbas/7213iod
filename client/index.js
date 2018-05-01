const choo = require('choo')
const css = require('sheetify')
const html = require('choo/html')

const app = choo()

const regex = /^(https?:\/\/)?((?:www\.)?(?:[\w+\-\.]*\.[a-z]{1,6})\/?)((?:[\w\-\.]*\/?){1,6})(?:\?((?:[\w]+\=[\w]+)(?:\&(?:[\w]+\=[\w]+))*))?$/m

app.use((state, emitter) => {
  state.url = {
    original: '',
    protocol: '',
    hostname: '',
    pathname: '',
    queries: '',
    params: {},
    error: ''
  }

  state.error = ''

  emitter.on('editUrl', text => {
    state.url.original = text

    const urlBreakdown = regex.exec(text)
    if (urlBreakdown) {
      if (urlBreakdown[4]) {
        const queries = urlBreakdown[4]
        const params = queries
          .split('&')
          .map(item => item.split('='))
          .map(item => ({ [item[0]]: item[1] }))
        state.url.params = params
      }

      state.url.protocol = urlBreakdown[1] ? urlBreakdown[1] : ''
      state.url.hostname = urlBreakdown[2] ? urlBreakdown[2] : ''
      state.url.pathname = urlBreakdown[3] ? urlBreakdown[3] : ''
      state.url.queries = urlBreakdown[4] ? urlBreakdown[4] : ''
      emitter.emit('render')
    }
    if (!text.length) {
      state.url = {
        original: '',
        protocol: '',
        hostname: '',
        pathname: '',
        queries: '',
        params: {}
      }
    }
  })

  emitter.on('editProtocol', text => {
    const { hostname = '', pathname = '', queries = '' } = state.url
    state.url.protocol = text
    state.url.original = `${text}${hostname}${pathname}${queries}`
  })

  emitter.on('editHostname', text => {
    const { protocol = '', pathname = '', queries = '' } = state.url
    state.url.hostname = text
    state.url.original = `${protocol}${text}${pathname}${queries}`
  })

  emitter.on('editPathname', text => {
    const { protocol = '', hostname = '', queries = '' } = state.url
    state.url.pathname = text
    state.url.original = `${protocol}${hostname}${text}${queries}`
  })

  // emitter.on('editParams')

  emitter.on('deleteParam', param => {
    const [key, value] = Object.entries(param)[0]
    const newParams = state.url.params.filter(
      item => Object.entries(item)[0][0] !== key
    )
    const newQueries = newParams
      .map(item => Object.entries(item)[0])
      .map(item => item.join('='))
      .join('&')

    state.url.params = newParams
    state.url.queries = newQueries

    state.url.original = `${state.url.protocol}${state.url.hostname}${
      state.url.pathname
    }?${state.url.queries}`

    emitter.emit('render')
  })

  emitter.on('testUrl', text => {
    if (!regex.test(text)) {
      state.error = 'Please enter a valid URL'
      emitter.emit('render')
    } else {
      state.error = ''
      emitter.emit('render')
    }
  })
})

const container = css`
  :host {
    width: 1000px;
    display: grid;
    grid-template-areas:
      'title title title'
      'main main main'
      'error error error'
      'group group group';
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
    height: 25px;
    text-align: center;
    font-size: 110%;
    border-radius: 5px;
  }
`

const error = css`
  :host {
    grid-area: error;
    color: red;
  }
`

const main = (state, emit) => {
  return html`
  <div class=${container}>
    <h2 class=${title}>URL Editor</h2>
    <input class=${inputMain} type="text" placeholder="Paste your URL here" value=${
    state.url.original
  } oninput=${edit} />
  ${state.error ? html`<span class=${error}>${state.error}</span>` : ''}
    <div class="input--group">
      <label>Protocol</label>
      <input 
        type="text" 
        value=${state.url.protocol} 
        oninput=${editProtocol}/>          
      <label>Hostname</label>
      <input type="text" value=${state.url.hostname} oninput=${editHostname} />
      <label>Pathname</label>
      <input type="text" value=${state.url.pathname} oninput=${editPathname} />
    </div>
    <table>
      <thead>
        <tr>
          <td>Key</td>
          <td>Value</td>
        </tr>
      </thead>
      <tbody>
      ${state.url.params.length &&
        state.url.params.map(item => {
          const [key, value] = Object.entries(item)[0]
          return html`
            <tr>
              <td>
                <input type=text value=${key} />
              </td>
              <td>
                <input type=text value=${value}/>
              </td>
              <td><button onclick=${() =>
                deleteParam(item)}>Delete</button></td>
            </tr>
            `
        })}
      </tbody>
    </table>
  </div>`

  function edit(e) {
    emit('testUrl', e.target.value)
    emit('editUrl', e.target.value)
  }

  function editProtocol(e) {
    emit('editProtocol', e.target.value)
    emit('testUrl', state.url.original)
  }

  function editHostname(e) {
    emit('editHostname', e.target.value)
    emit('testUrl', state.url.original)
  }

  function deleteParam(item) {
    emit('deleteParam', item)
  }

  function editPathname(e) {
    emit('editPathname', e.target.value)
    emit('testUrl', state.url.original)
  }
}

app.route('/', main)

app.mount('div')
