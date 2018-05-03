const css = require('sheetify')

exports.container = css`
  :host {
    display: flex;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir,
      'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial,
      sans-serif;
    background-color: white;
  }
`
exports.box = css`
  :host {
    background-color: #eee;
    padding: 1rem;
    margin: 5%;
    height: 85%;
    width: 100%;
  }
`

exports.error = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(154, 30, 30);
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`

exports.cell = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    margin: 10px;
    background-color: white;
    color: black;
    padding: 1rem;
    border: 1px solid #e2dcdc;
    border-radius: 5px;
  }
`

exports.label = css`
  :host {
    font-weight: bold;
    font-size: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2dcdc;
    margin-bottom: 1rem;
  }
`
exports.input = css`
  :host {
    font-weight: bold;
    color: #07a1d4;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`

exports.strike = css`
  :host {
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 1rem;
  }

  :host > span {
    position: relative;
    display: inline-block;
    font-size: 0.7rem;
    color: #bfbdbd;
  }

  :host > span:before,
  :host > span:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: #e2dcdc;
  }

  :host > span:before {
    right: 100%;
    margin-right: 1rem;
  }

  :host > span:after {
    left: 100%;
    margin-left: 1rem;
  }
`
