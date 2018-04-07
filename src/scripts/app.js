import React from 'react'

import CliOutput from './cli-output.js'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      prompt: '',
      command: {}
    }

    this.commands = undefined

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePromptChange = this.handlePromptChange.bind(this)
    this.handleWidthChange = this.handleWidthChange.bind(this)
    this.onEnterPress = this.onEnterPress.bind(this)
  }

  componentDidMount () {
    this.input.focus()

    fetch('/api/commands')
      .then(response => {
        return response.json()
      })
      .then(commands => {
        this.commands = commands
        this.setState({ command: commands.end })
      })
      .catch(error => console.error(error))
  }

  handleSubmit (e) {
    if (e) {
      e.preventDefault()
    }

    if (Object.keys(this.commands).includes(this.state.prompt)) {
      this.setState({ command: this.commands[this.state.prompt] })
    } else {
      this.setState({ command: this.commands['error'] })
    }

    this.setState({ prompt: '' })
  }

  handlePromptChange (e) {
    if (e) {
      e.preventDefault()
      this.setState({ prompt: e.target.value })
    }
  }

  handleOnBlur (e) {
    e.preventDefault()
    this.input.focus()
  }

  handleWidthChange (e) {
    return parseInt(document.getElementById('command-label').getAttribute('width'))
  }

  onEnterPress (e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  render () {
    return (
      <div className='app-container'>
        <div className='cli'>
          <CliOutput command={this.state.command} />
          <div className='command'>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='command' id='command-label'>wintermute //</label>
              <textarea
                className='main-input'
                ref={input => { this.input = input }}
                id='command'
                onChange={this.handlePromptChange}
                onBlur={() => this.input.focus()}
                value={this.state.prompt}
                onKeyDown={this.onEnterPress} />
              <input type='submit' onBlur={this.handleOnBlur} style={{ display: 'none' }} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
