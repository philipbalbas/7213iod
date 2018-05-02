const html = require('choo/html')
const css = require('sheetify')

const inputGroupContainerStyle = css`
  :host {
    grid-area: group;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 5px;
  }
`

const inputGroupStyle = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    margin: 10px;
  }

  :host > label {
    font-weight: bold;
    font-size: 120%;
    margin: 10px;
  }
`

const inputGroup = (url, emit) => {
  return html`
    <div class=${inputGroupContainerStyle}>
      <div class=${inputGroupStyle}>
        <label class="sans-serif" >Protocol</label>
        <input 
          class="input-reset ba b--black-20 pa2 mb2 db w-100 f5 bg-dark-blue yellow hover-black hover-bg-white"
          type="text" 
          value=${url.protocol} 
          oninput=${editProtocol}
          placeholder="http:// or https://"
          />  
      </div>
      <div class=${inputGroupStyle}>
        <label class="sans-serif">Hostname</label>
        <input 
          class="input-reset ba b--black-20 pa2 mb2 db w-100 f5 bg-dark-blue yellow hover-black hover-bg-white" 
          type="text" 
          value=${url.hostname} 
          oninput=${editHostname} 
          placeholder="www.example.com/"
        />

      </div>
      <div class=${inputGroupStyle}>
        <label class="sans-serif">Pathname</label>
        <input 
          class="input-reset ba b--black-20 pa2 mb2 db w-100 bg-dark-blue yellow hover-black hover-bg-white"
          type="text" 
          value=${url.pathname} 
          oninput=${editPathname} 
          placeholder="path/to/url/"
        />
      </div>
    </div>
    `

  function editProtocol(e) {
    emit('editProtocol', e.target.value)
    emit('testUrl', url.original)
  }

  function editHostname(e) {
    emit('editHostname', e.target.value)
    emit('testUrl', url.original)
  }

  function editPathname(e) {
    emit('editPathname', e.target.value)
    emit('testUrl', url.original)
  }
}

module.exports = inputGroup
