import { useIdolsStore, useSpriteOffsetsStore } from "@/stores";
import { Idol } from "@/models";
import { SpriteProps, SpriteList } from "@/components";

import "./IdolGenerations.scss";

export interface IdolGenerationsProps {
  selectedIdol?: Idol;
  onSelected: (idol: Idol) => void;
}

const gensOrder = [
  "Myth",
  "Council",
  "Hope",
  "Gamers",
  "Gen 0"
];

export const IdolGenerations = ({ selectedIdol, onSelected }: IdolGenerationsProps) => {
  const getIdolsByGen = useIdolsStore(state => state.getIdolsByGen);
  const getSpriteSheet = useSpriteOffsetsStore(state => state.getSpriteSheet);
  const idolsIconSpriteSheet = getSpriteSheet('idols-icon');

  return (
    <div className="idol-generations flex-row flex-wrap">
      {gensOrder.map(genName => {
        return (
          <section key={genName}>
            <div className="gen-name">{genName}</div>

            <SpriteList
              sprites={getIdolsByGen(genName)
                .map(idol => ({
                  spriteSheet: idolsIconSpriteSheet,
                  name: idol.name,
                  value: idol,
                  selected: idol === selectedIdol,
                  onSelected: onSelected,
                  key: idol.id,
                } as SpriteProps))
              }
            />
          </section>
        )
      })}
    </div>
  )
}