import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import RecipeList from './components/RecipeList'
import Recipe from './components/Recipe'
import About from './components/About'
import Footer from './components/Footer'
import PrivateRoutes from './components/PrivateRoutes'

import recipeService from './services/recipes'
import loginService from './services/login'

import './App.css'
import {
  Container,
  StyledNav,
  StyledNavLinksContainer,
} from './components/styles/StyledContainers.styled'
import { NavHeader } from './components/styles/StyledText.styled'
import Admin from './components/Admin'

const App = () => {
  // CLIENT STATE
  const [recipes, setRecipes] = useState([])
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [show, setShow] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [file, setFile] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setNavOpen(false)
  }, [location])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAdmin')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      recipeService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    recipeService.getAll().then((response) => {
      setRecipes(response)
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedAdmin', JSON.stringify(user))
      recipeService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/admin')
    } catch (exception) {
      setMessage('Wrong credentials! 😅')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const inputRef = useRef(null)

  const addRecipe = async (recipeObject) => {
    try {
      const returnedRecipe = await recipeService.create(recipeObject)
      setRecipes(recipes.concat(returnedRecipe))
      setMessage(`Added new recipe: ${recipeObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addPhoto = async (photo) => {
    try {
      await recipeService.addPhoto(photo)
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeRecipe = async (id) => {
    try {
      await recipeService.remove(id)
      const updatedRecipes = await recipeService.getAll()
      setRecipes(updatedRecipes)
      setMessage(`New recipe created!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

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

  // ADMIN STATE

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
          className="checkbox"
          type="checkbox"
          checked={navOpen}
          onChange={() => setNavOpen(!navOpen)}
        />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
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
        <Route
          path="/login"
          element={
            <Login
              setPassword={setPassword}
              setUsername={setUsername}
              password={password}
              username={username}
              handleLogin={handleLogin}
              message={message}
            />
          }
        />
        <Route element={<PrivateRoutes user={user} />}>
          <Route
            path="/admin"
            element={
              <Admin
                setUser={setUser}
                createRecipe={addRecipe}
                deleteRecipe={removeRecipe}
                file={file}
                setFile={setFile}
                inputRef={inputRef}
                recipes={recipes}
                message={message}
                addPhoto={addPhoto}
              />
            }
          />
        </Route>
      </Routes>
      <Footer handler={getRandomRecipe} />
    </Container>
  )
}

export default App
