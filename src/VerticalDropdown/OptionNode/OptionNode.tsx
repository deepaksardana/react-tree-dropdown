import * as React from "react";
import { map } from "lodash";
import { Fragment, useState } from "react";
import { IChecked, ICheckedOptions, IOption, ReactTreeNode } from "../../interface";
import OptionComponent from "./Option";

interface Props {
  option: IOption;
  parent: ReactTreeNode;
  isSearchActive: boolean;
  showHideNodes: { [key: string]: boolean }
  checkedOptions: ICheckedOptions;
  handleOptionChange: (checked: boolean, option: IOption, options: ReactTreeNode) => void;
}

function OptionNode({ option, parent, isSearchActive, showHideNodes, checkedOptions, handleOptionChange }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false)
  const renderChildren = (childOption: IOption) => {
    return renderChild(childOption, { node: option, parent }, isSearchActive, showHideNodes, checkedOptions, handleOptionChange)
  }
  const hideNode: boolean = !!isSearchActive && !!!showHideNodes[option.id];
  const { checked, partialChecked }: IChecked = checkedOptions[option.id] || { checked: false, partialChecked: false };
  const canExpand: boolean = !!(option.childrens && option.childrens.length >= 1);
  return (
    hideNode ? null : <Fragment key={option.id}>
      <OptionComponent
        option={option}
        checked={checked}
        partialChecked={partialChecked}
        expanded={expanded}
        canExpand={canExpand}
        handleExpandClick={() => {
          setExpanded(!expanded)
        }}
        handleOptionChange={({ target }: any) => {
          handleOptionChange(target.checked, option, parent);
        }}
      />
      {expanded && canExpand && <div className="vertical-options-children-container">
        {map(option.childrens, renderChildren)}
      </div>
      }
    </Fragment>
  )
}


function renderChild(option: IOption, parent: ReactTreeNode, isSearchActive: boolean, showHideNodes: { [key: string]: boolean }, checkedOptions: ICheckedOptions, handleOptionChange: (checked: boolean, option: IOption, options: ReactTreeNode) => void) {
  return <OptionNode key={option.id} option={option} parent={parent} isSearchActive={isSearchActive} showHideNodes={showHideNodes} checkedOptions={checkedOptions} handleOptionChange={handleOptionChange} />
}

export default OptionNode;