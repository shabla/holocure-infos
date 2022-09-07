import React from "react";

import { Box, Sprite } from "@/components";
import { Skill } from "@/models";
import { useSpriteOffsetsStore } from "@/stores";
import { getHighlightedElements } from "@/utils/getHighlightedElements";

import "./IdolSkillBox.scss";

export interface IdolSkillBoxProps {
  title: string;
  skills: Skill[];
}

export const IdolSkillBox = ({ title, skills }: IdolSkillBoxProps) => {
  const getSpriteSheet = useSpriteOffsetsStore(state => state.getSpriteSheet);
  const skillsSpriteSheet = getSpriteSheet('skills');

  return (
    <Box label={title} className="idol-skill-box">
      {skills.map(skill => (
        <React.Fragment key={skill.name}>
          <div className="skill-name flex-row align-x-center">
            <Sprite
              spriteSheet={skillsSpriteSheet}
              name={skill.name}
              showBackground={false}
            />
            {skill.name}
          </div>

          {skill?.levels?.length === 1 ? (
            <div className="desc-only">{skill.levels[0].desc}</div>
          ) : (
            <table className="info-table">
              <tbody>
                {skill.levels.map(level => (
                  <tr key={level.level}>
                    <td className="name">Level {level.level}</td>
                    <td>{getHighlightedElements(level.desc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </React.Fragment>
      ))}
    </Box>
  )
}