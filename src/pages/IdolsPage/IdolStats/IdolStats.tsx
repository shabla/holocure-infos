import { Box, Sprite } from "@/components";
import { Idol } from "@/models/Idol";
import { useSpriteOffsetsStore } from "@/stores/spritesStore";

export interface IdolStatsProps {
  idol?: Idol;
}

interface IdolStat {
  name: string;
  key: "hp" | "atk" | "spd" | "crt",
  format?: (value: any) => string;
}

const stats: IdolStat[] = [
  { name: 'HP', key: 'hp' },
  { name: 'ATK', key: 'atk', format: (val: number) => `${val.toFixed(2)}x` },
  { name: 'SPD', key: 'spd', format: (val: number) => `${val.toFixed(2)}x` },
  { name: 'CRT', key: 'crt', format: (val: number) => `${val * 100}%` },
];

export const IdolStats = ({ idol }: IdolStatsProps) => {
  const getSpriteSheet = useSpriteOffsetsStore(state => state.getSpriteSheet);
  const idolsSpriteSheet = getSpriteSheet('idols');

  return (
    <Box label={idol?.name} className="selected-idol">
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
  )
}