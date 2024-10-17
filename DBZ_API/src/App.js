import React, {useEffect,useState} from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";

import "bootstrap/dist/css/bootstrap.min.css";
function App(){
  const [characters,setCharacters] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [clickedCharacter,setClickedCharacter] = useState(null);
  const [transformations,setTransformations] = useState(null);
  /**
   * Create a new state variable which is for the clicked
   *characters
   and if its empty, dont display, else display 
   and hide the other stuff
  display all the transformations
   */
  /**
   * When component mounts, useEffect will run
   * That is why there is no dependencies
   */
  useEffect(()=>{




/**using promise function to recieve DragonballZ API data */
fetch("https://dragonball-api.com/api/characters?limit=60")
.then((response)=> response.json())
.then((data)=>{
setCharacters(data.items);
})
.catch((error)=> console.error("Error Fetching data", error));

  },[]);

/**Create a function that searches the filtered character name */
/**this useEffect will take effect when a character gets clicked */
useEffect(()=>{
  
  /**Display regular form
   * and display the rest of the transformations under,
   * if none, display no transformations
   * 
   */

},[clickedCharacter])
const emptyclick = ()=>{
  setClickedCharacter(null);return;
}
const filteredCharacters = characters.filter((character)=>character.name.toLowerCase().includes(searchTerm.toLowerCase()));
const handleCharacterClick = (character) =>{
  //fetch new link data
 const characterID= character.id;
  const url = "https://dragonball-api.com/api/characters/".concat(characterID);
  console.log(url);
  fetch(url)
  .then((response)=>response.json())
  .then((data)=>{
    setClickedCharacter(data);
    setTransformations(data.transformations);
  })
}

  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand><Button onClick={emptyclick}>Dragon Ball Z Characters</Button></Navbar.Brand>
       <Nav className="mr-auto">
       </Nav>
       <Form inline>
        <FormControl type="text"
        placeholder='Search Characters'
        className="mr-sm-2"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        >

        </FormControl>
       </Form>
      </Navbar>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
  {filteredCharacters && !clickedCharacter ? (
    filteredCharacters.map((character) => (
      <div key={character.id} style={{ textAlign: "center", margin: "10px" }}>
        <Button onClick={() => handleCharacterClick(character)}>
          <img
            src={character.image}
            alt={character.name}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
          <p>{character.name}</p>
        </Button>
      </div>
    ))
  ) : (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {/* Clicked Character */}
      <div style={{ textAlign: "center", margin: "10px" }}>
        <img
          src={clickedCharacter.image}
          alt={clickedCharacter.name}
          style={{ width: "200px", height: "auto", margin: "10px" }}
        />
        <p>{clickedCharacter.name}</p>
      </div>

      {/* Transformations */}
      {!transformations ? (
        <h1 style={{ width: "100%", textAlign: "center" }}>No transformations</h1>
      ) : (
        transformations.map((transformation) => (
          <div key={transformation.id} style={{ textAlign: "center", margin: "10px" }}>
            <img
              src={transformation.image}
              alt={transformation.name}
              style={{ width: "200px", height: "auto", margin: "10px" }}
            />
            <p>{transformation.name}</p>
          </div>
        ))
      )}
    </div>
  )}
</div>


          
        
    </div>
);
}

export default App;

