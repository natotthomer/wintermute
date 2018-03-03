import React from 'react'

import CliOutput from './cli-output.js'
import commands from '../../commands.json'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      prompt: '',
      command: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePromptChange = this.handlePromptChange.bind(this)
  }

  componentDidMount () {
    this.input.focus()
    this.setState({ command: commands.end })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (Object.keys(commands).includes(this.state.prompt)) {
      this.setState({ command: commands[this.state.prompt] })
    } else {
      this.setState({ command: commands['error'] })
    }

    this.setState({ prompt: '' })
  }

  handlePromptChange (e) {
    e.preventDefault()
    this.setState({ prompt: e.target.value })
  }

  render () {
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
