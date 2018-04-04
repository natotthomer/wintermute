import React from 'react'

import CliOutput from './cli-output.js'
// import commands from '../../commands.json'

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
    e.preventDefault()
    if (Object.keys(this.commands).includes(this.state.prompt)) {
      this.setState({ command: this.commands[this.state.prompt] })
    } else {
      this.setState({ command: this.commands['error'] })
    }

    this.setState({ prompt: '' })
  }

  handlePromptChange (e) {
    e.preventDefault()
    this.setState({ prompt: e.target.value })
  }

  render () {
    // add onBlur to never lose focus
    return (
      <div className='app-container'>
        <div className='cli'>
          <div className='command'>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='command'>wintermute //</label>
              <input
                ref={input => { this.input = input }}
                type='text'
                id='command'
                onChange={this.handlePromptChange}
                onBlur={() => this.input.focus()}
                value={this.state.prompt} />
              <input type='submit' style={{ display: 'none' }} />
            </form>
          </div>
          <CliOutput command={this.state.command} />
        </div>
      </div>
    )
  }
}
