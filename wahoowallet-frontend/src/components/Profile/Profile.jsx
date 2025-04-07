import style from './Profile.module.css'
import { useState } from 'react'
import { getImageUrl } from '../../utils'
export default function Profile() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [mealExchanges, setMealExchanges] = useState("")
  const [flexDollars, setFlexDollars] = useState("")

  function handleUsernameChange() {
    const username = document.getElementById('usernameInput').value
    setUsername(username)
     // ADDED FOR DJANGO:
    // Example POST request to update the username on the backend
    fetch('/api/update_username/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'X-CSRFToken': '{{ csrf_token }}' // If CSRF is enabled
      },
      body: JSON.stringify({ username })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Username updated on server:', data)
        // Optionally handle success logic, like setting a success message in state
      })
      .catch(err => console.error('Error updating username:', err))
    // END ADDED FOR DJANGO
  }
  function handlePasswordChange() {
    const password = document.getElementById('passwordInput').value
    setPassword(password)
// ADDED FOR DJANGO:
    // Example POST request to update the password on the backend
    fetch('/api/update_password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'X-CSRFToken': '{{ csrf_token }}'
      },
      body: JSON.stringify({ password })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Password updated on server:', data)
      })
      .catch(err => console.error('Error updating password:', err))
    // END ADDED FOR DJANGO
  }

  function handleEmailChange() {
    const email = document.getElementById('emailInput').value
    setEmail(email)
    // ADDED FOR DJANGO:
    // Example POST request to update the email on the backend
    fetch('/api/update_email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'X-CSRFToken': '{{ csrf_token }}'
      },
      body: JSON.stringify({ email })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Email updated on server:', data)
      })
      .catch(err => console.error('Error updating email:', err))
    // END ADDED FOR DJANGO
  }

  function connectGrubhub() {
    const mealExchanges = document.getElementById('mealExchanges')
    mealExchanges.style.display = 'block'
    const flexDollars  = document.getElementById('flexDollars')
    flexDollars.style.display = 'block'

    setMealExchanges("100")
    setFlexDollars("$300")
    // ADDED FOR DJANGO:
    // Example POST request to link the user's account with GrubHub
    fetch('/api/connect_grubhub/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'X-CSRFToken': '{{ csrf_token }}'
      },
      body: JSON.stringify({ connected: true })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('GrubHub connected:', data)
      })
      .catch(err => console.error('Error connecting to GrubHub:', err))
    // END ADDED FOR DJANGO

  }
  return (
    <>
      <h1 className = {style.title}> User Profile </h1>
      
      <div className= {style.container}>
        <div className = {style.body}>

          <div className = {style.items}>
            <h2 className = {style.item} id = 'username'> 
            Username: {username}
            </h2>
            <h2 className = {style.item} id = 'password'> 
            Password: {password}
            </h2>
            <h2 className = {style.item} id = 'email'> 
            Email: {email} 
            </h2>
            <h2 className = {style.grubhubItem} id = "mealExchanges" style= {{display: "none"}} >
              Meal Exchanges: {mealExchanges}
            </h2>
            <h2 className = {style.grubhubItem} id = "flexDollars" style= {{display: "none"}}>
              Flex Dollars: {flexDollars}
            </h2>
          </div>

          <div className = {style.changeButtons}>
            <input className = {style.changeButton} id = 'usernameInput' type='text' placeholder='Change Username'/>
            <input className = {style.changeButton} id = 'passwordInput' type='text' placeholder='Change Password'/>
            <input className = {style.changeButton} id = 'emailInput' type='text' placeholder='Change Email'/>
            
          </div>
          <div className = {style.submitButtons}>
            <button type = 'submit' className = {style.submit} onClick={handleUsernameChange}>
              <img src = {getImageUrl("Profile/arrow.png")}/>
            </button>
            <button type = 'submit' className = {style.submit} onClick={handlePasswordChange}>
              <img src = {getImageUrl("Profile/arrow.png")}/>
            </button>
            <button type = 'submit' className = {style.submit} onClick={handleEmailChange}>
              <img src = {getImageUrl("Profile/arrow.png")}/>
            </button>
          </div>
        </div>

        {/* GrubHub Button */}

        <div className = {style.grubhub}>
          <button id = "grubhubButton" className = {style.grubhubButton} type = 'submit' onClick= {connectGrubhub}> Connect to GrubHub </button>
        </div>
      </div>
    </>
  )
}