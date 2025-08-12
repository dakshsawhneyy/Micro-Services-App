import { Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'


const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Cart/>} />
      </Routes>
    </div>
  )
}

export default App
