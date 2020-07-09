import React, {useState } from 'react'
import axios from 'axios'

export default function CustomDrink() {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")

  const imageChange = e => {
    setFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  }

  const onSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('category', category)
    formData.append('ingredients', ingredients)
    formData.append('instructions', instructions)
    formData.append('image_url', filename)

    try {
      await axios.post('/api/drinks/uploadcustomdrink', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
    } catch (err) {
      console.log(err.response.status)
    }
  }

  return (
    <>
      <h2>Upload a new drink!</h2>
      <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input type='text' className='custom-drink-input' id='name' onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="cocktail">Cocktail</option>
                <option value="shot">Shot</option>
                <option value="beer">Beer</option>
                <option value="ordinary drink">Ordinary drink</option>
                <option value="punch / party drink">Punch / party drink</option>
                <option value="milk / float / shake">Milk / float / shake</option>
                <option value="other / unknown">Other / unknown</option>
            </select>

            <label htmlFor="ingredients">Ingredients</label>
            <input type='text' className='custom-drink-input' id='ingredients' onChange={(e) => setIngredients(e.target.value)}/>
            <label htmlFor="instructions">Instructions</label>
            <input type='text' className='custom-drink-input' id='instructions' onChange={(e) => setInstructions(e.target.value)}/>
            <label className='custom-drink-label' htmlFor='image'>{filename}</label>
            <input type='file' className='custom-drink-input' id='image' onChange={imageChange}/>
        </div>
        <input type='submit' value='Upload' className='upload-btn'/>
      </form>
    </>
  )
}

