import { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

import Home from './components/Home'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import About from './components/About'
import Footer from './components/Footer'

import './App.css'
import {
  Container,
  StyledNav,
  StyledNavLinksContainer,
} from './components/styles/StyledContainers.styled'
import { NavHeader } from './components/styles/StyledText.styled'

const App = () => {
  const [recipes, setRecipes] = useState([])
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [show, setShow] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setNavOpen(false)
  }, [location])

  useEffect(() => {
    axios.get(`/api/recipes`).then((response) => {
      setRecipes(response.data)
    })
  }, [])

  useEffect(() => {
    if (searchTerm.length > 0) {
      axios.get(`/api/search/${searchTerm}`).then((response) => {
        setSearchResults(response.data.data)
        console.log('effect fired!')
      })
    }
  }, [searchTerm])

  let filteredRecipes = recipes
    .map((r) => ({
      ...r,
      ingredients: r.ingredients.filter((i) =>
        i.name.toLowerCase().includes(filter.toLowerCase())
      ),
    }))
    .filter((obj) => obj.ingredients.length > 0)
  // returns array of objects whose 'ingredients' array isn't empty after filtering

  const menuItems = recipes.filter((r) => r.menuItem)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const getRandomRecipe = () => {
    const id = recipes[Math.floor(Math.random() * (recipes.length - 1))].id
    navigate(`/recipes/${id}`)
  }

  const handleTagClick = (tag) => {
    setSearchTerm(tag)
  }

  filteredRecipes = searchResults.length > 0 ? searchResults : filteredRecipes

  return (
    <Container>
      <StyledNav>
        <NavHeader>Daphne's</NavHeader>
        <StyledNavLinksContainer className={navOpen ? 'nav-open' : ''}>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    fontWeight: 700,
                    borderBottom: '1px solid #fff',
                    paddingBottom: '0.5rem',
                  }
                : { paddingBottom: '0.5rem' }
            }
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    fontWeight: 700,
                    borderBottom: '1px solid #fff',
                    paddingBottom: '0.5rem',
                  }
                : { paddingBottom: '0.5rem' }
            }
            to="/recipes"
          >
            Recipes
          </NavLink>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    fontWeight: 700,
                    borderBottom: '1px solid #fff',
                    paddingBottom: '0.5rem',
                  }
                : { paddingBottom: '0.5rem' }
            }
            to="/about"
          >
            About
          </NavLink>
        </StyledNavLinksContainer>
        <input
          class="checkbox"
          type="checkbox"
          checked={navOpen}
          onChange={() => setNavOpen(!navOpen)}
        />
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
        {/* <button style={{ border: 'none' }} onClick={() => setNavOpen(!navOpen)}>
          <span className="hamburger-icon line1"></span>
          <span className="hamburger-icon line2"></span>
        </button> */}
      </StyledNav>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              show={show}
              toggleShow={() => setShow(!show)}
              menuItems={menuItems}
            />
          }
        />
        {/* <Route
          path="/home"
          element={
            <Home
              show={show}
              toggleShow={() => setShow(!show)}
              menuItems={menuItems}
            />
          }
        /> */}
        <Route
          path="/recipes/:id"
          element={
            <Recipe
              handleTagClick={handleTagClick}
              filteredRecipes={filteredRecipes}
              recipes={recipes}
            />
          }
        />
        <Route
          path="/recipes"
          element={
            <RecipeList
              filteredRecipes={filteredRecipes}
              recipes={recipes}
              filter={filter}
              handler={handleFilterChange}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer handler={getRandomRecipe} />
    </Container>
  )
}

export default App
