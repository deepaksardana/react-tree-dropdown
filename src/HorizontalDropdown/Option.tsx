import * as React from "react";
import Checkbox from "../CheckboxLabel";
import Arrow, { Arrow_Direction } from "../Arrow";
import { IOption } from "../interface";

interface Props {
  option: IOption;
  handleOptionChange: any
  checked: boolean;
  handleExpandClick: any;
  isActive: boolean;
  isSearchActive: boolean;
  showHideOption: boolean;
  partialChecked: boolean;
}

function Option({ option, partialChecked, handleOptionChange, checked, handleExpandClick, isActive, isSearchActive, showHideOption }: Props) {
  const { value, childrens} = option;
  const hideOption = isSearchActive && !showHideOption;
  return (
    hideOption ? null : <div className={`horizontal-option ${isActive ? "selected": ""}`} onClick={handleExpandClick}>
      <Checkbox labelTxt={value} handleChange={handleOptionChange}
        checked={checked} partialChecked={partialChecked} />
      {childrens && <Arrow direction={isActive ? Arrow_Direction.LEFT:  Arrow_Direction.RIGHT} />}
    </div>
  );
}

export default Option