import './style.css'
import { Home } from './src/pages/Home/Home.js'
import { Header } from './src/components/Header/Header.js'
const main = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `
  <header></header>
  <main></main>
  `
}

main()
Header()
Home()
