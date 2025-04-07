
export default function Test() {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    height: '100vh',
    paddingTop: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <>
      <p style={{margin: 0}}>Demonstration to show template that our components ("outlets") reside in</p>
      <div style={style}>
        <p style={{margin: 0}}>Everything is inside of this blue container</p>
        <p style={{margin: 0}}>And if needed, the container will include a scroll bar</p>
        <p style={{marginTop: '30px'}}>Wahoowa</p>
      </div>
    </>
  )
}