import TeamPokemons from "components/pokemons-team";
import { Pokedex } from "components/pokedex";
import { ThemeProvider } from "contexts/theme-context";
import { Pokemon } from "models";
import { useState } from "react";

export function App() {

  const [teamPokemons, setTeamPokemon] = useState<Pokemon[]>([]);
  
  return (
    <main>
      <ThemeProvider>
        <TeamPokemons teamPokemons={teamPokemons} setTeamPokemon={setTeamPokemon} />
        <Pokedex teamPokemons={teamPokemons} setTeamPokemon={setTeamPokemon} />
      </ThemeProvider>
    </main>
  );
}