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

  const getIdolIconPath = (idol?: Idol): string => {
    if (!idol) {
      return '';
    }

    return `/idol-icons/${idol.id}.jpg`;
  }

  const getIdolModelPath = (idol?: Idol): string => {
    if (!idol) {
      return '';
    }

    return `/idol-models/${idol.id}.png`;
  }

  if (loading) {
    return null;
  }

  const stats: {
    name: string;
    key: "hp" | "atk" | "spd" | "crt",
    icon: string;
    format?: (value: any) => string;
  }[] = [
      { name: 'HP', key: 'hp', icon: '' },
      { name: 'ATK', key: 'atk', icon: '', format: (val: number) => `${val.toFixed(2)}x` },
      { name: 'SPD', key: 'spd', icon: '', format: (val: number) => `${val.toFixed(2)}x` },
      { name: 'CRT', key: 'crt', icon: '', format: (val: number) => `${val * 100}%` },
    ];

  return (
    <div className="idols-page flex-row content-container">
      <Box label={selectedIdol?.name} className="selected-idol">
        <div className="model flex-column justify-center align-center">
          <img src={getIdolModelPath(selectedIdol)} alt={selectedIdol?.name} />
        </div>

        <div className="stats">
          {stats.map(stat => {
            const value = selectedIdol?.stats?.[stat.key];

            return (
              <div className="stat flex-row align-center">
                <img src={stat.icon} alt={stat.name} />
                <div className="text flex-row justify-space-between flex-fill">
                  <div className="name">{stat.name}</div>
                  <div className="value">
                    {stat.format && value ? stat.format(value) : value}
                  </div>
                </div>
              </div>
            )
          })}
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
                      <img src={getIdolIconPath(idol)} title={idol.name} />
                    </div>
                  ))
                }
              </div>
            </section>
          )
        })}
      </div>

      <div className="selected-idol-details flex-column flex-fill">
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