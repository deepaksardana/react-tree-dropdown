import * as React from "react";
import { map } from "lodash";
import { ICheckedOptions, IInputProps, IOption, ReactTreeNode } from "../interface";
import SearchInput from "../SearchInput";
import OptionNode from "./OptionNode";

interface Props {
  dropdownOptions: IOption[];
  checkedOptions: ICheckedOptions;
  handleOptionChange: (checked: boolean, option: IOption, options: ReactTreeNode) => void;
  searchTxt: string
  setSearchTxt: any;
  isSearchActive: boolean;
  showHideNodes: { [key: string]: boolean };
  inputProps: IInputProps;

}

function VerticalDropdown(props: Props) {
  const { setSearchTxt, dropdownOptions, showHideNodes,  isSearchActive, checkedOptions, handleOptionChange, inputProps} = props;

  const renderOption = (option: IOption, index: number) => {
    return (
      <OptionNode
      checkedOptions={checkedOptions}
      key={`verticalParent${index}`}
      option={option}
      parent={undefined!}
      isSearchActive={isSearchActive} 
      showHideNodes={showHideNodes}
      handleOptionChange={handleOptionChange}
      />
    )
  }


  return (
    <div className="react-tree-menu vertical-wrapper">
      <SearchInput onChange={(value: string) => {
        setSearchTxt(value)
      }}
      inputProps={inputProps}
      />
      <div className="vertical-dropdown">
        {
          map(dropdownOptions, renderOption)
        }

      </div>
    </div>
  )
}

export default VerticalDropdown;