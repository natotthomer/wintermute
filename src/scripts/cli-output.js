import React from 'react'
import Typist from 'react-typist'

const CliOutput = (props) => {
  if (Object.keys(props.command).length > 0) {
    const { message, content, guides } = props.command

    const splitContent = content.split('\n')

    return (
      <section>
        <Typist key={props.command.command} avgTypingDelay={1} cursor={{ show: false }} stdTypingDelay={1}>
          <div className='message'>{message}</div>
          <div className='content'>
            {splitContent.map((newLine, idx) => {
              return (
                <p key={Math.random() + idx}>
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

export default CliOutput
