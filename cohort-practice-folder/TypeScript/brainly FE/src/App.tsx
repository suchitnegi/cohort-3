import './App.css'
import { Button } from './assets/components/UI/button'
import { PlusIcon } from './assets/icons/PlusIcon'

function App() {

  return (
    <div>    <Button startIcon={<PlusIcon/>} variant="primary" text="share" size="md"/>
    <Button startIcon={<PlusIcon/>} variant="secondary" text="add content" size="lg"/>

</div>
  )
}

export default App
