import c from "classnames";

import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition } from "hooks";
import { useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { Pokemon } from "models";
import { usePokemonVulnerabilitiesTypes } from "hooks/use-pokemon-vulnerability";

import TypesDisplay from "./pokemon-types";
import TeamPokemonSelect from "./pokemon-team-assemble";

import "./pokedex.css";

type PokemonArray = Pokemon[];

interface TeamPokemonProps {
  teamPokemons: PokemonArray | undefined;
  setTeamPokemon: React.Dispatch<React.SetStateAction<PokemonArray>>;
}

export function Pokedex({ teamPokemons, setTeamPokemon } : TeamPokemonProps) {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);
  const { vulnerabilities, types } = usePokemonVulnerabilitiesTypes(selectedPokemon);

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel types-weaks-panel">
        <div className="types-weaks-container">
          <TypesDisplay types={types} title="Types" />
          <TypesDisplay types={vulnerabilities} title="Weaknesses" />
        </div>
      </div>

      <div className="panel left-panel">
        <div className="screen main-screen">
        <TeamPokemonSelect teamPokemons={teamPokemons} setTeamPokemon={setTeamPokemon} currentPokemon={selectedPokemon} />
          {selectedPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>

        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
      </div>

      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
    </div>
  );
}
