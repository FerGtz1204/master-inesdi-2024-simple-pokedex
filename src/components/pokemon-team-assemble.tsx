import { Pokemon } from "models";
import { TiPlus } from "react-icons/ti";

import { useEffect } from "react";
import "./pokemon-team-assemble.css";


interface PokemonTeamAssemble {
    teamPokemons: Pokemon[] | undefined;
    setTeamPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    currentPokemon: Pokemon | undefined;
}

const PokemonTeamPick: React.FC<PokemonTeamAssemble> = ({
    teamPokemons,
    setTeamPokemon,
    currentPokemon,
}) => {

    useEffect(() => {
        console.log(teamPokemons);
    }, [teamPokemons]);

    const handleTeamPokemon = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (teamPokemons && (teamPokemons?.length + 1) > 6) {
            alert("You can only have 6 pokemons in your team!")
            return;
        }
        if(currentPokemon && teamPokemons){
            if(teamPokemons.includes(currentPokemon)){
                setTeamPokemon(teamPokemons.filter((pokemon) => pokemon !== currentPokemon));
            } else {
                setTeamPokemon([...teamPokemons, currentPokemon]);
            }
        }
    }

  return (
    <div className="team-button-container">
        <button onClick={handleTeamPokemon} className="team-button">
            {
                currentPokemon && !teamPokemons?.includes(currentPokemon) && <TiPlus size="30px" />
            }
        </button>
    </div>
  )
}

export default PokemonTeamPick