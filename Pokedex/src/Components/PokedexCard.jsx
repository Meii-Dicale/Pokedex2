import '../App.css';



function Pokedex({ PokeDetail }) {
  // Vérification si PokeDetail existe et contient abilities
  if (!PokeDetail || !PokeDetail.abilities) {
    return <div>Loading...</div>;
  }
  const stats = PokeDetail.stats;
  const types = PokeDetail.types;



  return (
    <>
      <div>
        <img
          style={{
            width: "150px",
            position: "relative",
            top: "210px",
            left: "520px"
          }}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${PokeDetail.id}.png`}
          alt={PokeDetail.name}
        />
      </div>
      <div
        style={{
          position: "relative",
          top: "100px",
          left: "800px",
          fontSize: "26px",
          color: "white"
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
          top: "300px",
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
          <button style = {{
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
    </>
  );
}

export default Pokedex;
