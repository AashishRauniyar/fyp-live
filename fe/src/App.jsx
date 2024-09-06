import { Outlet } from 'react-router-dom'
import './App.css'
import Button from './components/Button'

function App() {
  return (
    <>
      <Outlet/>
      <Button title={"Like"} isDark={false} />
      <Button title={"Follow"} isDark={false}/>
      <Button title={"Share"} isDark={false}/>
    </>
  )
}

export default App
