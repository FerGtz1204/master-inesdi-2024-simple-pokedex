import { useTheme } from "contexts/use-theme";
import { Pokemon } from "models";
import "./team-pokemons.css";
import classNames from "classnames";

interface TeamPokemonSelectProps {
  teamPokemons: Pokemon[];
  setTeamPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const TeamPokemons: React.FC<TeamPokemonSelectProps> = ({ teamPokemons, setTeamPokemon }) => {
  const { theme } = useTheme();

  const removePokemon = (indexToRemove: number) => {
    setTeamPokemon(prevTeam => prevTeam.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={classNames("team-pokemons-container", `team-pokemons-${theme}`)}>
      <h3 className="team-title">Pokemon Team</h3>
      <div className="team-grid">
        {teamPokemons.map((pokemon, index) => (
          <div
            key={index}
            className={classNames("team-slot", { clickable: !!pokemon })}
            onClick={() => pokemon && removePokemon(index)}
          >
            {pokemon ? (
              <>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="team-pokemon-sprite"
                />
                <span className="team-name-tooltip">{pokemon.name}</span>
              </>
            ) : (
                 <span className="avail-slot">Open Position</span>
            )}
          </div>
        ))}
        {/* Renderizar slots vacíos si el equipo tiene menos de 6 Pokémon */}
        {teamPokemons.length < 6 &&
          Array.from({ length: 6 - teamPokemons.length }, (_, index) => (
            <div key={teamPokemons.length + index} className="team-slot">
              <span className="avail-slot">Open Position</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamPokemons;