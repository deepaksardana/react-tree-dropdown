import * as React from "react";
import { map } from "lodash";
import { Fragment } from "react";
import CrossSVG from "../assets/cross";
import { TreeDropdownValue } from "../interface";

interface Props {
  selectedValues: TreeDropdownValue[];
  handleCloseClick: (event: any, value: string) => void;
}

export default ({ selectedValues, handleCloseClick }: Props) => {

  const renderOption = ({id, value}: TreeDropdownValue, index: number) => {
    return (
      <div className="selected-option" key={`selectedValue${index}`}>
        <div className="selected-option-value">{value}</div>
        <div className="selected-option-icon" onClick={(e) => {
          handleCloseClick(e, id);
        }}><CrossSVG /></div>
      </div>
    );
  }

  return (
    <Fragment>
      {map(selectedValues, renderOption)}
    </Fragment>
  )
}