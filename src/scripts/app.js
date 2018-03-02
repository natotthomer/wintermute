import React from 'react'
import Typist from 'react-typist'

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
    this.renderContent = this.renderContent.bind(this)
  }

  componentDidMount () {
    this.setState({ command: commands.end })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (Object.keys(commands).includes(this.state.prompt)) {
      this.setState({ command: commands[this.state.prompt] })
    }

    this.setState({ prompt: '' })
  }

  handlePromptChange (e) {
    e.preventDefault()
    this.setState({ prompt: e.target.value })
  }

  renderContent () {
    if (Object.keys(this.state.command).length > 0) {
      const { message, content, guides } = this.state.command

      const splitContent = content.split('\n')

      return (
        <section>
          <Typist avgTypingDelay={1} cursor={{ show: false }} stdTypingDelay={1}>
            <div className='message'>{message}</div>
            <div className='content'>
              {splitContent.map((newLine, idx) => {
                return (
                  <p key={idx}>
                    {newLine}
                  </p>
                )
              })}
            </div>
            <div className='guides'>
              {guides.map((guide, idx) => {
                return (
                  <div className='guide' key={idx}>
                    // '{ guide.name }' + <kbd>enter</kbd> -- { guide.label }
                  </div>
                )
              })}
            </div>
          </Typist>
        </section>
      )
    } else {
      return <section />
    }
  }

  render () {
    return (
      <div className='app-container'>
        <div className='cli'>
          <div className='command'>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='command'>wintermute //</label>
              <input type='text' id='command' onChange={this.handlePromptChange} value={this.state.prompt} />
              <input type='submit' style={{ display: 'none' }} />
            </form>
          </div>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
