import React from 'react'
import ReactDOM from 'react-dom/client'
import { configure } from 'mobx'
import { App } from './application/portal/App'

configure({
  enforceActions: "never",
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)