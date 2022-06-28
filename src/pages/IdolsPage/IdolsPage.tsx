import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";

import { Idol } from "@/models/Idol";
import { Heading, Box } from "@/components";
import { useIdolsStore } from "@/stores/idolsStore";

import "./IdolsPage.scss"

const gensOrder = [
  "Myth",
  "Council",
  "Hope"
];

export const IdolsPage: React.FC = () => {
  const [selectedIdol, setSelectedIdol] = useState<Idol>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, idols, loadIdols, getIdolsByGen] = useIdolsStore(state => [
    state.loading,
    state.idols,
    state.loadIdols,
    state.getIdolsByGen
  ]);

  useEffect(() => {
    loadIdols();
  }, [])

  useEffect(() => {
    const idolName = searchParams.get('i') || 'Amelia Watson';

    if (idols) {
      setSelectedIdol(idols.filter(i => i.name === idolName)[0] || idols[0]);
    }
  }, [searchParams, idols])

  const handleIdolClicked = (idol: Idol): void => {
    setSearchParams({ i: idol.name })
  }

  const getIdolImagePath = (idol?: Idol): string => {
    if (!idol) {
      return '';
    }

    return `/idols/${idol.image}`;
  }

  if (loading) {
    return null;
  }

  return (
    <div className="idols-page flex-row">
      <Box label={selectedIdol?.name} className="selected-idol">
        <img src={getIdolImagePath(selectedIdol)} alt={selectedIdol?.name} />

        <div className="stats">
          here be stats
        </div>
      </Box>

      <div className="generations">
        {gensOrder.map(genName => {
          return (
            <section className="generation flex-fill" key={genName}>
              <Heading>{genName}</Heading>

              <div className="idols flex-row">
                {getIdolsByGen(genName)
                  .map(idol => (
                    <div
                      className={classNames("idol", { selected: idol === selectedIdol })}
                      key={idol.name}
                      onClick={() => handleIdolClicked(idol)}
                    >
                      <img src={getIdolImagePath(idol)} title={idol.name} />
                    </div>
                  ))
                }
              </div>
            </section>
          )
        })}
      </div>

      <div className="selected-idol-details flex-column">
        <Box label="Attack" className="attack">
          <div className="name">{selectedIdol?.attack.name}</div>

          {selectedIdol?.attack.levels.map(level => (
            <div key={level.level}>{`Level ${level.level}:`} {level.desc}</div>
          ))}
        </Box>

        <Box label="Special" className="special">
          <div className="name">{selectedIdol?.special.name}</div>
          <div className="desc">{selectedIdol?.special.desc}</div>
        </Box>

        <Box label="Skills" className="skills">
          {selectedIdol?.skills.map(skill => (
            <Fragment key={skill.name}>
              <div className="name">{skill.name}</div>

              {skill.levels.map(level => (
                <div key={level.level}>{`Level ${level.level}:`} {level.desc}</div>
              ))}
            </Fragment>
          ))}
        </Box>
      </div>
    </div>
  )
}