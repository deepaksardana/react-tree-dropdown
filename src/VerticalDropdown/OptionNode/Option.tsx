import * as React from "react";
import Checkbox from "../../CheckboxLabel";
import { IOption } from "../../interface";
import Arrow, { Arrow_Direction } from "../../Arrow";

interface Props {
  option: IOption;
  expanded: boolean;
  handleExpandClick: () => void;
  checked: boolean;
  partialChecked: boolean;
  handleOptionChange: any;
  canExpand: boolean;
}

function Option({option, checked, partialChecked, handleOptionChange, expanded, canExpand, handleExpandClick}: Props) {
  const {value} = option;
  return (
    <div className="vertical-option" onClick={handleExpandClick}>
      {canExpand ?<Arrow direction={expanded ? Arrow_Direction.MINUS : Arrow_Direction.PLUS}/> : <div className="arrow-container"/>}
      <Checkbox labelTxt={value} handleChange={handleOptionChange} checked={checked} partialChecked={partialChecked} />
    </div>
  )
}

export default Option;
