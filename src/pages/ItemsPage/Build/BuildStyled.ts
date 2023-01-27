import { styled } from "@/styles";

export const BuildContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$4",
});

export const SectionName = styled("div", {
  writingMode: "vertical-rl",
  textOrientation: "upright",
  borderLeft: "5px solid white",
  textAlign: "center",
});

export const IdolContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
});

export const StampsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
});

export const Stamp = styled("div", {
  border: "2px solid rgba(50,50,50,0.2)",
  backgroundColor: "rgba(100,100,100,0.5)",
  height: 80,
  width: 80,
  position: "relative",

  "&::before": {
    position: "absolute",
    top: 0,
    left: 0,
    content: "'+'",
    color: "rgb(255,255,255,0.2)",
    fontSize: "60px",
    textAlign: "center",
    width: "100%",
    height: "100%",
    lineHeight: "80px",
  },
});

export const WeaponsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$4",
  marginBottom: "$4",
});

export const WeaponContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 180,
  backgroundColor: "rgba(255,255,255,0.1)",
  padding: "$2",
});

export const WeaponComponentsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$2",
});

export const ItemsContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "$4",
});