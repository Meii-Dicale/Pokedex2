import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';




function Pokedex({ PokeDetail }) {
  // Vérification si PokeDetail existe et contient abilities
  if (!PokeDetail || !PokeDetail.abilities) {
    return <div>Loading...</div>;
  }
  const stats = PokeDetail.stats;
  const types = PokeDetail.types;
  const games = PokeDetail.game_indices;
  const [damage, setDamage] = useState ();
  const [UrlImage , setUrlImage] = useState ("");
  const [evolve, setEvolve] = useState ();
  const [Evolution, setEvolution] = useState();
  const [Evolution2, setEvolution2] = useState();


  const fetchPokemonType = async () => {
    const typeInfo = await axios.get(`https://pokeapi.co/api/v2/type/${types[0].type.name}`);
    setDamage(typeInfo.data);
    //console.log(typeInfo.data)
    //console.log(PokeDetail)
    setUrlImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokeDetail.id}.png`);
   
  }
  const fetchPokemonEvolution = async () => {
    const Evolutions = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${PokeDetail.id}/`);
    setEvolve(Evolutions.data);
    fetchPokemonEvolutionType(Evolutions.data);
    //
  }

  const fetchPokemonEvolutionType  = async (evolve) => {
    
    if (evolve.evolution_chain) {
      const response = await axios.get(evolve.evolution_chain.url);
      const evolutionType = await axios.get(response.data.chain.evolves_to[0].evolves_to[0].species.url);
      const evolutionType2 = await axios.get(response.data.chain.evolves_to[0].species.url)
      //console.log(response.data.chain)
      setEvolution(evolutionType.data.name)
      setEvolution2(evolutionType2.data.name)
    }
  }

console.log(Evolution)
console.log(PokeDetail.name)
  useEffect(() => {
    fetchPokemonType();
    fetchPokemonEvolution();
},[])   


  return (
    <>
      <div  >
      <img
      style={{
        width: "150px",
        position: "relative",
        top: "210px",
        left: "520px"
        
      }}
  className="hoverPokemon"
  src={UrlImage}
  alt={PokeDetail.name}
  onClick={() => {
    if (UrlImage.includes("back"))
      setUrlImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokeDetail.id}.png`
      );
    else
      setUrlImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${PokeDetail.id}.png`
      );
  }}
/>
<div
style={{
    position: "absolute",
    top: "165px",
    left: "430px",
    fontSize: "14px",
    zIndex: "-5"
  
}}>
    <img style={{
        width: "610px",
    
  
    }}
    src="../img/pokedex2.png" alt="pokedex" />
</div>
      </div>
      <div
        style={{
          position: "relative",
          top: "100px",
          left: "800px",
          fontSize: "26px",
          color: "white",
          width: "300px"
        }}
      >
        {PokeDetail.name.toUpperCase()}
      </div>
      <div 
           style={{
            position: "relative",
            top: "250px",
            left: "550px",
            fontSize: "8px",
            color: "green",
            display: "flex column",
            font: "bold 11px ",
            lineHeight: "1px",
            width: "300px"
            
            
            
          }}
      > <p style={{
        color: "black",
        
        
      }}> Abilities :</p>
        {PokeDetail.abilities.map((abilityObj, index) => (
          <li style={{
            color: "green",
            display: "flex",
            justifyContent: "space-between",
            padding: "3px"
          }} key={index}>
            {"-"}{abilityObj.ability.name }
          </li>
        ))}
      </div>
      <div 
      style={{     
         position: "absolute",
            top: "560px",
            left: "800px",
            fontSize: "8px",
            color: "white"}}>
        {"height :"}
        {PokeDetail.height}
      </div>
      <div 
      style={{     
         position: "absolute",
            top: "545px",
            left: "800px",
            fontSize: "8px",
            color: "white"}}>
        {"weight :"}
        {PokeDetail.weight}
      </div>
      <div
        style={{
          position: "absolute",
          top: "110px",
          left: "1050px",
          fontSize: "12px",
          color: "black"
        }}
      >
        <h3>Stats</h3>
        <ul>
          {stats.map((stat, index) => (
            <li key={index}>
              <strong>{stat.stat.name.replace("-", " ").toUpperCase()}:</strong>{" "}
              {stat.base_stat} (Effort: {stat.effort})
            </li>
          ))}
        </ul>
      </div>
      <div 
      style={{
        position: "absolute",
        top: "485px",
        left: "790px",
        fontSize: "18px",
        
       
      }}>
        {types.map((type, index) => (
          <button 
          style = {{
            borderRadius: "5px"
          }}key={index} className={type.type.name}>
            {type.type.name}
          </button>
           
           
            ))}
      </div>
      <div 
      style={{
        color: "white",
        position: "absolute",
        top: "550px",
        left: "900px",
        fontSize: "14px",
        fontWeight: "bold"
      }}>
        {"N°"}{PokeDetail.id}
      </div>
      <div
      style={{
        position: "absolute",
        top: "620px",
        left: "480px",
        fontSize: "14px",
        width : "450px"
        
      }}>
        <h5>Included in games :</h5>
      {games.map((game, index) => (
          <button 
          style = {{
            borderRadius: "5px"
          }}key={index} className={game.version.name}>
            {game.version.name}
          </button>
           
           
            ))}
      </div>
      <div
              style={{
                position: "absolute",
                top: "300px",
                left:"20px" }}>
   

      <h3>Weakness :</h3>
      {damage && damage.damage_relations.double_damage_from.map((doubleDamage)=> (
                <button key={doubleDamage.name} className={doubleDamage.name}>{doubleDamage.name}</button>
                

              ))}
              <h3> Strong to :</h3>
              {damage && damage.damage_relations.double_damage_to.map((doubleDamage)=> (
                <button key={doubleDamage.name} className={doubleDamage.name}>{doubleDamage.name}</button>
                

              ))}
              <h3> Half damage to :</h3>
              {damage && damage.damage_relations.half_damage_to.map((doubleDamage)=> (
                <button key={doubleDamage.name} className={doubleDamage.name}>{doubleDamage.name}</button>
                

              ))}
                   <h3> Half damage from :</h3>
              {damage && damage.damage_relations.half_damage_from.map((doubleDamage)=> (
                <button key={doubleDamage.name} className={doubleDamage.name}>{doubleDamage.name}</button>
                

              ))}

 
          
      </div>
      <div
  style={{
    position: "absolute",
    top: "280px",
    left: "1050px",
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Espacement entre les sections d'évolutions
  }}
>
  {evolve?.evolves_from_species?.name && (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3>I am the evolution of:</h3>
      <img
        style={{
          width: "80px",
          height: "80px",
          margin: "10px",
        }}
        src={`https://img.pokemondb.net/artwork/${evolve.evolves_from_species.name}.jpg`}
        alt={`Evolution of ${evolve.evolves_from_species.name}`}
      />
      <h4>{evolve.evolves_from_species.name.toUpperCase()}</h4>
    </div>
  )}

{(Evolution2 &&
  ((evolve?.evolves_from_species?.name && Evolution2 !== evolve.evolves_from_species.name) ||
   (Evolution2 !== PokeDetail.name))) && (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h3>I can evolve into:</h3>
    <div>
      <img
        style={{
          width: "80px",
          height: "80px",
          margin: "10px",
        }}
        src={`https://img.pokemondb.net/artwork/${Evolution2}.jpg`}
        alt={`Evolution2 of ${Evolution2}`}
        onClick={() =>
          navigate(`/pokemon/${PokeDetail.id}`, { state: { evolutionName: Evolution2 } })
        }
      />
      <h4>{Evolution2.toUpperCase()}</h4>
    </div>
  </div>
)}

{(Evolution && PokeDetail && Evolution !== PokeDetail.name) && (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h3>I can evolve into:</h3>
    <div>
      <img
        style={{
          width: "80px",
          height: "80px",
          margin: "10px",
        }}
        src={`https://img.pokemondb.net/artwork/${Evolution}.jpg`}
        alt={`Evolution of ${Evolution}`}
        onClick={() =>
          navigate(`/pokemon/${PokeDetail.id}`, { state: { evolutionName: Evolution } })
        }
      />
      <h4>{Evolution.toUpperCase()}</h4>
    </div>
  </div>
)}

</div>



    </>
  );
}

export default Pokedex;
