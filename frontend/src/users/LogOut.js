import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CurrentUser } from "../contexts/CurrentUser"

function LogOut() {
  const history = useHistory()
  const { setCurrentUser } = useContext(CurrentUser)

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/authentication/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json()
    setCurrentUser(data.user)
    history.push('/')
}

  return (
    <div>
      <a href="#" onClick={(e) => handleSubmit(e)}>
        Log Out
      </a>
    </div>
  )
}

export default LogOut