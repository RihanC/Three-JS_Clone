import './App.css'
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber'

function App() {

  return (
    <>
    <main>
      <Canvas style={{
        height: "100vh",
        width:"100vw",
        position:"fixed",
        left:0,
        top:0,
        zIndex:1,
        backgroundImage:"url(models/golden.jpeg)",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        backgroundPosition:"center"


      }}>

      <Dog />


      </Canvas>
      <section id='section-1'></section>
      <section id='section-2'></section>
      <section id='section-3'></section>
    </main>
    
    </>
  )
}

export default App
