import { Route } from 'react-router-dom';
import Pokemons from '../pokemons/pokemons';
import Nav from '../nav/nav.js';
import Footer from '../footer/footer.js';
import DetailPokemon from '../detailPokemon/detailPokemon';
import CreatePokemon from '../createPokemon/createPokemon';

const Home= () => {
  const divStyle = {

    width:'1200px',
    margin:'0px auto',
    minHeight:'600px'
  };
return (
    <>
     <Nav/>
     <div style={divStyle}>
     <Route exact path={'/home'} component={Pokemons}/>
     {/*<Pokemons/>*/}
     <Route exact path={'/home/:idPokemon'} render={({match})=>{
       return <DetailPokemon idPokemon={match.params.idPokemon} />
     }}/> 
     <Route  path={'/home/pokemon/create'} component={CreatePokemon} />
     </div>
     <Footer/>
    </>
)
}

export default Home;