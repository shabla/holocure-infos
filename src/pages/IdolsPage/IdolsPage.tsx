import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";

import { Idol } from "@/models/Idol";
import { Heading, Box } from "@/components";

import "./IdolsPage.scss"

const gensOrder = [
  "Myth",
  "Council",
  "Hope"
];

export const IdolsPage: React.FC = () => {
  const [idols, setIdols] = useState<Idol[]>();
  const [selectedIdol, setSelectedIdol] = useState<Idol>();

  useEffect(() => {
    fetch('/idols.json')
      .then(data => data.json())
      .then(idols => {
        setIdols(idols);
        setSelectedIdol(idols[0]);
      });
  }, [])

  const handleIdolClicked = (idol: Idol): void => {
    setSelectedIdol(idol);
  }

  const getIdolImagePath = (idol?: Idol): string => {
    if (!idol) {
      return '';
    }

    return `/idols/${idol.image}`;
  }

  if (!idols) {
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
                {idols
                  .filter(idol => idol.gen === genName)
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