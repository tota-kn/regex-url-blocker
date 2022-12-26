import '../../style/style.css'
import { setupCounter } from '../../components/counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
