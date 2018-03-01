import React from 'react'

export default class App extends React.Component {
  render () {
    return (
      <div className='app-container'>
        <div className='cli'>
          <div className='command'>
            <label htmlFor='command'>wintermute //</label>
            <input type='text' id='command' />
          </div>
        </div>
      </div>
    )
  }
}
