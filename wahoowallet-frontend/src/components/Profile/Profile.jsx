import style from './Profile.module.css';

export default function Profile() {
  return (
    <>
      <h1 className = {style.title}> User Profile </h1>
      
      <div className= {style.container}>
        <div className = {style.body}>
          <div className = {style.items}>
            <h2 className = {style.item}> Username: </h2>
            <h2 className = {style.item}> Password: </h2>
            <h2 className = {style.item}> Email: </h2>
          </div>
          <div className = {style.changeButtons}>
            <input className = {style.changeButton} type='text' placeholder='Change Username'/>
            <input className = {style.changeButton} type='text' placeholder='Change Password'/>
            <input className = {style.changeButton} type='text' placeholder='Change Email'/>
          </div>
        </div>
        
        <div className = {style.grubhub}>
          <button className = {style.grubhubButton}> Connect to GrubHub </button>
        </div>
      </div>
    </>
  )
}