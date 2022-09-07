import { Box, Sprite } from "@/components";
import { Idol } from "@/models/Idol";
import { useSpriteOffsetsStore } from "@/stores";
import hpIcon from "@/assets/stat-hp.png";
import crtIcon from "@/assets/stat-crt.png";
import atkIcon from "@/assets/stat-atk.png";
import spdIcon from "@/assets/stat-spd.png";

import "./IdolProfileBox.scss";

export interface IdolProfileBoxProps {
  idol?: Idol;
}

interface IdolStat {
  name: string;
  image: string;
  key: "hp" | "atk" | "spd" | "crt",
  format?: (value: any) => string;
}

const stats: IdolStat[] = [
  { name: 'HP', key: 'hp', image: hpIcon },
  { name: 'ATK', key: 'atk', image: atkIcon, format: (val: number) => `${val.toFixed(2)}x` },
  { name: 'SPD', key: 'spd', image: spdIcon, format: (val: number) => `${val.toFixed(2)}x` },
  { name: 'CRT', key: 'crt', image: crtIcon, format: (val: number) => `${val * 100}%` },
];

export const IdolProfileBox = ({ idol }: IdolProfileBoxProps) => {
  const getSpriteSheet = useSpriteOffsetsStore(state => state.getSpriteSheet);
  const idolsSpriteSheet = getSpriteSheet('idols');

  return (
    <Box label={idol?.name} className="idol-profile-box">
      <div className="model flex-column align-center align-x-center">
        {idol && (
          <Sprite
            spriteSheet={idolsSpriteSheet}
            name={idol.name}
            showBackground={false}
          />
        )}
      </div>

      <div className="stats">
        {stats.map(stat => {
          const value = idol?.stats?.[stat.key];

          return (
            <div className="stat flex-row align-x-center" key={stat.key}>
              <img src={stat.image} alt={stat.name} />
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
  )
}