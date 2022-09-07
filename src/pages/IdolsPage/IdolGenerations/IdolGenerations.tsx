import { useIdolsStore } from "@/stores/idolsStore";
import { Idol } from "@/models/Idol";
import { Sprite } from "@/components";

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
  const [getIdolsByGen] = useIdolsStore(state => [
    state.getIdolsByGen
  ]);

  return (
    <div className="idol-generations flex-row flex-wrap">
      {gensOrder.map(genName => {
        return (
          <section key={genName}>
            <div className="gen-name">{genName}</div>

            <div className="flex-row gap-10">
              {getIdolsByGen(genName)
                .map(idol => (
                  <Sprite
                    type="idol-icon"
                    offset={idol.spriteOffset}
                    value={idol}
                    selected={idol === selectedIdol}
                    onSelected={onSelected}
                    key={idol.id}
                  />
                ))
              }
            </div>
          </section>
        )
      })}
    </div>
  )
}