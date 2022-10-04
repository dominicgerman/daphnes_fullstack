import { API_URL } from './config.js'
import { MENU_IDS } from './config.js'
import { PAGE_URL } from './config.js'

const controlNavButton = () => {
  document.querySelector('.hamburger-icon').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('nav-open')
    document.querySelector('body').classList.toggle('fixed')
  })
}

const home = () => {
  //////////////////  MODEL  //////////////////////
  const state = {
    menu: [],
  }

  const getMenuItems = async () => {
    try {
      MENU_IDS.map(async (id) => {
        const res = await fetch(`${API_URL}/recipes/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(`${data.message} (${res.status})`)

        const newRecipe = {
          id: data.id,
          name: data.name,
          menuDescription: data.menuDescription,
        }
        state.menu.push(newRecipe)
      })
    } catch (err) {
      console.error(err)
    }
  }

  //////////////////  VIEW  //////////////////////
  const modal = document.querySelector('.modal')
  // const menuContainer = document.querySelector('.menu-container');
  const overlay = document.querySelector('.overlay')
  const menuLink = document.querySelector('.menu-link')

  const renderModal = (data) => {
    const markdown = `
    <button class="close-modal">Close</button>
    <div class="flex-div">
    <p class="menu-title">Today's Menu</p>
    <ul class="menu-list">
    ${data
      .map((el) => {
        return `
        <li><a class="menu-item-name" href="${PAGE_URL}/html/recipeIndex.html#${el.id}">${el.name}</a></li>
        <li class="menu-item-description">${el.menuDescription}</li>
        `
      })
      .join('')}
      </ul>
      </div>
      `
    modal.insertAdjacentHTML('afterbegin', markdown)

    const closeModalBtn = document.querySelector('.close-modal')
    closeModalBtn.addEventListener('click', closeModal)
  }

  const openMenu = () => {
    renderModal(state.menu)
    openModal()
  }

  const openModal = () => {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
  }

  const closeModal = () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
    modal.innerHTML = ''
  }

  menuLink.addEventListener('click', openMenu)

  //////////////////  CONTROLLER  //////////////////////
  getMenuItems()
}

const init = () => {
  // if (
  //   window.location.href === `${PAGE_URL}` ||
  //   window.location.href === `${PAGE_URL}/index.html` ||
  //   window.location.href === `${PAGE_URL}/index.html#` ||
  //   window.location.href === `http://127.0.0.1:5500/index.html` ||
  //   window.location.href === `http://127.0.0.1:5500/index.html#` ||
  //   window.location.href === `http://127.0.0.1:5500` ||
  //   window.location.href === `127.0.0.1:5500`
  // ) {
  //   home()
  // }
  controlNavButton()
  home()
}

init()
