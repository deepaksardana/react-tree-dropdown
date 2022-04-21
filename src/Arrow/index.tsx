import * as React from "react";
import ArrowLeft  from "../assets/arrow-left";
import ArrowRight  from "../assets/arrow-right";
import ArrowDown  from "../assets/arrow-down";
import ArrowUp  from "../assets/arrow-up";
import Minus  from "../assets/minus";
import PLus  from "../assets/plus";



interface Props {
  direction: Arrow_Direction;
}

export enum Arrow_Direction {
  "UP" = "arrow-up",
  "DOWN" = "arrow-down",
  "LEFT" = "arrow-left",
  "RIGHT" = "arrow-right",
  "MINUS" = "minus",
  "PLUS" = "plus"
}

const SVGComponent = {
  [Arrow_Direction.UP]: ArrowUp,
  [Arrow_Direction.DOWN]: ArrowDown,
  [Arrow_Direction.LEFT]: ArrowLeft,
  [Arrow_Direction.RIGHT]: ArrowRight,
  [Arrow_Direction.MINUS]: Minus,
  [Arrow_Direction.PLUS]: PLus,
}

export default ({ direction }: Props) => {
  const SVGIcon = SVGComponent[direction] || null;
  return <div  className="arrow-container">
    <div className="arrow">
      {SVGIcon && <SVGIcon />}
    </div>
  </div>
}