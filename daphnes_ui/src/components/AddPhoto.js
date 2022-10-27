import { StyledInputContainer } from './styles/StyledContainers.styled'
import { SubmitButton } from './styles/StyledButtons.styled'
import axios from 'axios'

const AddPhoto = ({ file, setFile, inputRef, addPhoto }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData()
    form.append('photo', file)

    axios
      .post('/api/upload', form)
      .then((response) => {
        alert('The file is successfully uploaded')
      })
      .catch((error) => {})
  }

  return (
    <div style={{ fontSize: '2rem' }}>
      <p>
        <strong>NOTE:</strong> &nbsp; file name must be formatted correctly
      </p>
      <p>Example: 'last-word.jpg'</p>
      <br></br>
      <StyledInputContainer>
        <input
          type="file"
          accept="image/jpeg"
          id="photo"
          name="photo"
          ref={inputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <SubmitButton id="submit-photo" onClick={handleSubmit}>
          Submit
        </SubmitButton>
      </StyledInputContainer>
    </div>
  )
}

export default AddPhoto
