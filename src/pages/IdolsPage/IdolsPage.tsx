import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Idol } from "@/models/Idol";
import { Box, Sprite } from "@/components";
import { useIdolsStore } from "@/stores/idolsStore";
import { getHighlightedElements } from "@/utils/getHighlightedElements";
import { IdolGenerations } from "./IdolGenerations/IdolGenerations";
import { IdolStats } from "./IdolStats/IdolStats";

import "./IdolsPage.scss"

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

  return (
    <div className="idols-page flex-row content-container gap-10">
      <div className="sticky-section flex-column gap-10">
        <IdolStats idol={selectedIdol} />
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
                    return (
                      <tr key={level.level}>
                        <td className="name">Level {level.level}</td>
                        <td>{getHighlightedElements(level.desc)}</td>
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