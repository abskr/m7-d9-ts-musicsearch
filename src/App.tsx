import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Result, Track } from './types/types'

import Homepage from './components/Homepage'

function App() {

  const [searchInput, setSearchInput] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Result[]>([])
  const [track, setTrack] = useState<Track | null >(null)
  
  const handleInput = (e:any) => {
    let {value} = e.target
    setSearchInput(value)
  }

  const handleSubmit = async(e:any, searchQuery : string = searchInput) => {
    e.preventDefault()
    try {
      const resp = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchQuery}`)
      if (resp.ok) {
        const { data } = await resp.json()
        setSearchResults(data)
        console.log(searchResults)
      } else {
        console.log('ERROR')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTrack = async(id : number) => {
    try {
      const resp = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/track/${id}`)
      if (resp.ok) {
        const data = await resp.json()
        setTrack(data)
        console.log(track)
      } else {
        console.log('ERROR')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Router>
      <Route 
        path='/' 
        exact 
        render={(routerProps) => <Homepage {...routerProps} handleInput={handleInput} handleSubmit={handleSubmit} searchInput={searchInput} searchResults={searchResults} getTrack={getTrack} />} />
        {/* <Route 
        path='/details/:id' 
        exact 
        render={(routerProps) => <DetailPage {...routerProps} track={track} />} /> */}
    </Router>
  );
}

export default App;
