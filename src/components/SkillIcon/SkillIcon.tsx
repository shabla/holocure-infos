import { FC } from "react";

import { getSpriteBackground } from "@/utils/getSpriteBackground";
import skillsSprites from "@/assets/skills.png";

const SKILL_SPRITE_SIZE = 50;

export interface SkillIconProps {
  offset: [number, number];
}

export const SkillIcon: FC<SkillIconProps> = ({ offset }) => {
  return (
    <div
      className="skill-icon"
      style={{
        height: SKILL_SPRITE_SIZE + 'px',
        width: SKILL_SPRITE_SIZE + 'px',
        background: getSpriteBackground(
          skillsSprites,
          SKILL_SPRITE_SIZE,
          offset
        )
      }}></div>
  )
}