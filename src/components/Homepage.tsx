// import { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

interface HomepageProps {
  handleInput: any
  handleSubmit: any
  searchInput: any
  searchResults: any
  getTrack: any
}

const Homepage = (props: HomepageProps & RouteComponentProps) => {

  return (
    <div>
      <SearchBox>
          <form onSubmit={props.handleSubmit}>
            <input 
              type="text"
              name='searchInput'
              onChange={props.handleInput}
              value={props.searchInput} />
            <button type='submit'>Search</button>
          </form>
        </SearchBox>
        {props.searchResults.length > 0 && 
        <ListGroup>
            {props.searchResults.map((result:any) => (
              <ListGroup.Item key={result.id} onClick={() => props.getTrack(result.id)}>
                <img src={result.album.cover} alt="Album's cover" />
                <p>{result.album.title}</p>
                <p>{result.artist.name}</p>
              </ListGroup.Item>
            ))}
        </ListGroup>
        }
      </div>
  );
};

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  padding: 5px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default Homepage;