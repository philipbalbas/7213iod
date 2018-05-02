const html = require('choo/html')
const css = require('sheetify')

const tableContainerStyle = css`
  :host {
    grid-area: table;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow: auto;
    margin: 5px;
  }

  :host > table {
    width: 100%;
    border-collapse: collapse;
  }

  :host > label {
    font-weight: bold;
    font-size: 120%;
    margin: 10px;
  }
`

const paramTable = (url, emit) => {
  return html`
    <div class=${tableContainerStyle}>
      <label class="sans-serif">Params Table</label>
        <table class="f6 w-100 mw8 center"  cellspacing="0">
          <thead>
            <tr>
              <th class="fw6 bb tl pb3 pr3 sans-serif">Key</th>
              <th class="fw6 bb tl pb3 pr3 sans-serif">Value</th>
            </tr>
          </thead>
          <tbody class="lh-copy">
            <tr>
              <td class="pr3">
                <input class="input-reset ba b--black-20 pa2 mb2 db w-100 f5 bg-dark-blue yellow hover-black hover-bg-white" type="text" oninput=${e =>
                  emit('addTempKey', e.target.value)} />            
              </td>
              <td class="pr3">
                <input class="input-reset ba b--black-20 pa2 mb2 db w-100 f5 bg-dark-blue yellow hover-black hover-bg-white" type="text" oninput=${e =>
                  emit('addTempValue', e.target.value)} />
              </td>
              <td class="pr3">
                <a class="sans-serif f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue" onclick=${() =>
                  emit('addParam')}>+</a>
              </td>
            </tr>
          ${
            url.params.length
              ? url.params.map((item, index) => {
                  const [key, value] = Object.entries(item)[0]
                  return html`
                <tr>
                  <td class="pr3">
                    <input class="input-reset ba b--black-20 pa2 mb2 db w-100 f5 bg-dark-blue yellow hover-black hover-bg-white" type=text value=${key} oninput=${e =>
                    editParam(e.target.value, value, index)} />
                  </td>
                  <td class="pr3">
                    <input class="input-reset ba b--black-20 pa2 mb2 db w-100 f5 bg-dark-blue yellow hover-black hover-bg-white" type=text value=${value} oninput=${e =>
                    editParam(key, e.target.value, index)} />
                  </td>
                  <td class="pr3">
                  <a class="sans-serif f6 link dim br3 ph3 pv2 mb2 dib white bg-light-red" onclick=${() =>
                    deleteParam(item)}>x</a></td>
                </tr>
                `
                })
              : ''
          }
        </tbody>
      </table>
    </div>
    
  `

  function deleteParam(param) {
    emit('deleteParam', param)
  }

  function editParam(key, value, index) {
    emit('editParam', key, value, index)
  }
}

module.exports = paramTable
