import { useCallback } from "react";

import { useSpriteSheetsStore, SpriteType } from "@/stores";
import { styled } from "@/styles";
import { getSpriteBackground } from "./getSpriteBackground";

export interface SpriteProps<T = unknown> {
  type: SpriteType;
  name: string;
  selected?: boolean;
  showBackground?: boolean;
  disabled?: boolean;
  scale?: number;
  className?: string;
  label?: string;
  value?: T;
  onSelected?: (value: T) => void;
}

const SpriteImage = styled("div", {});

const SpriteContainer = styled("div", {
  position: "relative",
  flex: "0 0 auto",

  variants: {
    withLabel: {
      true: {
        padding: "$sizes$spriteLabelOverflow",
        paddingBottom: 0,
      },
    },
    clickable: {
      true: {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    selected: {
      true: {
        [`& ${SpriteImage}`]: {
          outline: "5px solid white",
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.3,
      },
    },
  },
});

const SpriteLabel = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 10,
  fontSize: "11px",
  color: "white",
  textAlign: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
  borderRadius: "3px",
  padding: "1px 0",
  lineHeight: "10px",
  height: "24px",
  pointerEvents: "none",
});

export const Sprite = <T,>({
  type,
  name,
  label,
  showBackground = false,
  scale = 1,
  className,
  selected = false,
  value,
  disabled,
  onSelected,
}: SpriteProps<T>) => {
  const spriteSheet = useSpriteSheetsStore(
    useCallback((state) => state.getSpriteSheet(type), [type])
  );
  const showLabel = !!label;

  return (
    <SpriteContainer
      className={className}
      css={
        // FIXME: calc + token how
        showLabel
          ? {
              width: `calc(${spriteSheet.width}px + (2 * var(--sprite-label-overflow)))`,
              height: `calc(${spriteSheet.height}px + var(--sprite-label-overflow))`,
            }
          : undefined
      }
      disabled={disabled}
      selected={selected}
      clickable={!!onSelected}
      withLabel={showLabel}
    >
      {showLabel && <SpriteLabel>{label}</SpriteLabel>}

      <SpriteImage
        onClick={onSelected ? () => onSelected(value!) : undefined}
        css={{
          width: `${spriteSheet.width}px`,
          height: `${spriteSheet.height}px`,
          transform: `scale(${scale})`,
          background: `${getSpriteBackground(spriteSheet, name)}${
            showBackground ? ", rgba(0, 0, 0, 0.1)" : ""
          }`,
        }}
      />
    </SpriteContainer>
  );
};
