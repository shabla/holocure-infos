import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Idol } from "@/models";
import { useIdolsStore, } from "@/stores";
import { IdolGenerations } from "./IdolGenerations/IdolGenerations";
import { IdolProfileBox } from "./IdolProfileBox/IdolProfileBox";
import { IdolSkillBox } from "./IdolSkillBox/IdolSkillBox";

import "./IdolsPage.scss"

export const IdolsPage = () => {
  const routeParams = useParams<{ idolId: string }>();
  const navigate = useNavigate();
  const [selectedIdol, setSelectedIdol] = useState<Idol>();
  const [loaded, idols, loadIdols, getIdolById] = useIdolsStore(state => [
    state.loaded,
    state.idols,
    state.loadIdols,
    state.getIdolById,
  ]);

  useEffect(() => {
    loadIdols();
  }, [])

  useEffect(() => {
    if (loaded) {
      const idol = getIdolById(routeParams.idolId || '');
      if (!idol) {
        return navigate(idols[0]?.id);
      }

      setSelectedIdol(idol)
    }
  }, [routeParams, idols]);

  const handleIdolSelected = (idol: Idol): void => {
    navigate(idol.id);
  }

  if (!loaded) {
    return null;
  }

  return (
    <div className="idols-page flex-row content-container">
      <div className="sticky-section flex-column">
        <IdolProfileBox idol={selectedIdol} />
        <IdolGenerations selectedIdol={selectedIdol} onSelected={handleIdolSelected} />
      </div>

      <div className="flex-column flex-fill">
        {selectedIdol && (
          <React.Fragment>
            <IdolSkillBox
              title="Attack"
              skills={[selectedIdol.attack]}
            />
            <IdolSkillBox
              title="Special"
              skills={[{
                name: selectedIdol.special.name,
                levels: [{ level: 1, desc: selectedIdol.special.desc }]
              }]}
            />
            <IdolSkillBox
              title="Skills"
              skills={selectedIdol.skills}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}