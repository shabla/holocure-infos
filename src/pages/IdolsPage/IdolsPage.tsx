import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Idol } from "@/models/Idol";
import { Box, Sprite } from "@/components";
import { useIdolsStore } from "@/stores/idolsStore";
import { IdolGenerations } from "./IdolGenerations/IdolGenerations";

import "./IdolsPage.scss"

const skillTokenPattern = /\{(.*?)\}/g;

export const IdolsPage = () => {
  const [selectedIdol, setSelectedIdol] = useState<Idol>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loaded, idols, loadIdols] = useIdolsStore(state => [
    state.loaded,
    state.idols,
    state.loadIdols,
  ]);

  useEffect(() => {
    loadIdols();
  }, [])

  useEffect(() => {
    const idolId = searchParams.get('i') || 'ame';

    if (idols) {
      setSelectedIdol(idols.filter(i => i.id === idolId)[0] || idols[0]);
    }
  }, [searchParams, idols])

  const handleIdolSelected = (idol: Idol): void => {
    setSearchParams({ i: idol.id })
  }

  if (!loaded) {
    return null;
  }

  const stats: {
    name: string;
    key: "hp" | "atk" | "spd" | "crt",
    format?: (value: any) => string;
  }[] = [
      { name: 'HP', key: 'hp' },
      { name: 'ATK', key: 'atk', format: (val: number) => `${val.toFixed(2)}x` },
      { name: 'SPD', key: 'spd', format: (val: number) => `${val.toFixed(2)}x` },
      { name: 'CRT', key: 'crt', format: (val: number) => `${val * 100}%` },
    ];

  return (
    <div className="idols-page flex-row content-container gap-10">
      <div className="sticky-section flex-column gap-10">
        <Box label={selectedIdol?.name} className="selected-idol">
          <div className="model flex-column align-center align-x-center">
            <Sprite
              type="idol-model"
              offset={selectedIdol?.spriteOffset}
              showBackground={false}
            />
          </div>

          <div className="stats">
            {stats.map(stat => {
              const value = selectedIdol?.stats?.[stat.key];

              return (
                <div className="stat flex-row align-x-center" key={stat.key}>
                  <img src={`stats/stat-${stat.key}.png`} alt={stat.name} />
                  <div className="text flex-row align-space-between flex-fill">
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

        <IdolGenerations selectedIdol={selectedIdol} onSelected={handleIdolSelected} />
      </div>

      <div className="selected-idol-details flex-column flex-fill">
        <Box label="Attack" className="attack">
          <div className="skill-name flex-row align-x-center">
            {selectedIdol && (
              <Sprite
                type="skill"
                offset={selectedIdol.attack.spriteOffset}
                showBackground={false}
              />
            )}
            {selectedIdol?.attack.name}
          </div>

          <table className="info-table">
            <tbody>
              {selectedIdol?.attack.levels.map(level => (
                <tr key={level.level}>
                  <td className="name">Level {level.level}</td>
                  <td>{level.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box label="Special" className="special">
          <div className="skill-name flex-row align-x-center">
            {selectedIdol && (
              <Sprite
                type="skill"
                offset={selectedIdol.special.spriteOffset}
                showBackground={false}
              />
            )}
            {selectedIdol?.special.name}
          </div>

          <div className="desc">{selectedIdol?.special.desc}</div>
        </Box>

        <Box label="Skills" className="skills">
          {selectedIdol?.skills.map(skill => (
            <React.Fragment key={skill.name}>
              <div className="skill-name flex-row align-x-center">
                {selectedIdol && (
                  <Sprite
                    type="skill"
                    offset={skill.spriteOffset}
                    showBackground={false}
                  />
                )}
                {skill.name}
              </div>

              <table className="info-table">
                <tbody>
                  {skill.levels.map(level => {
                    const match = level.desc.match(skillTokenPattern);
                    let descChildren: React.ReactNode[] = [];

                    if (match) {
                      let remaining = level.desc;

                      match.forEach(m => {
                        const tokenIndex = remaining.indexOf(m);

                        const beforeToken = remaining.slice(0, tokenIndex);
                        descChildren.push(beforeToken)

                        const tokenValue = m.replaceAll(/[{}]/g, "");
                        descChildren.push(<span className="highlight">{tokenValue}</span>)

                        remaining = remaining.slice(m.length + tokenIndex);
                      })

                      descChildren.push(remaining);

                    } else {
                      descChildren = [level.desc];
                    }

                    return (
                      <tr key={level.level}>
                        <td className="name">Level {level.level}</td>
                        <td>{descChildren}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </Box>
      </div>
    </div>
  )
}