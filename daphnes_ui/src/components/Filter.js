import { SearchBar, SearchInput } from './styles/StyledContainers.styled'
import { SearchButton } from './styles/StyledButtons.styled'

const Filter = ({ filter, handler }) => {
  return (
    <SearchBar>
      <SearchInput
        value={filter}
        placeholder="filter by ingredient..."
        onChange={handler}
      ></SearchInput>
      <SearchButton>
        <i className="fa fa-search" />
      </SearchButton>{' '}
    </SearchBar>
  )
}

export default Filter
