import { map } from "lodash";
import * as React from "react";
import { useState } from "react";
import { ICheckedOptions, IInputProps, IOption, ReactTreeNode } from "../interface";
import OptionComponent from "./Option";
import SearchInput from "../SearchInput";


interface Props {
  dropdownOptions: IOption[];
  checkedOptions: ICheckedOptions;
  handleOptionChange: (checked: boolean, option: IOption, options: ReactTreeNode) => void;
  searchTxt: string
  setSearchTxt: any;
  isSearchActive: boolean;
  showHideNodes: {[key: string]: boolean};
  inputProps: IInputProps;
}

function HorizontalDropdown({ dropdownOptions, checkedOptions, handleOptionChange, setSearchTxt, isSearchActive, showHideNodes, inputProps }: Props) {
  const [hirerarchy, setHirerarchy] = useState<ReactTreeNode[]>([]);

  const renderNodes = (options: ReactTreeNode, index: number) => {
    const { node } = options;
    const renderNodeOptions = (option: IOption) => {
      const activeHirerachy = hirerarchy && hirerarchy[index+1] && hirerarchy[index+1].node.id === option.id; 
      return (
        <OptionComponent
        checked={!!(
          checkedOptions[option.id] &&
          checkedOptions[option.id].checked
        )}
        partialChecked={checkedOptions[option.id] && checkedOptions[option.id].partialChecked}
        handleOptionChange={({ target: { checked } }: any) => {
          handleOptionChange(checked, option, options);
        }}
        handleExpandClick={() => {
          if (option.childrens) {
            const isAlreadyActive: boolean = option.id === (hirerarchy[index+1] && hirerarchy[index+1].node.id);
            if(isAlreadyActive) {
              setHirerarchy(hirerarchy.slice(0, index + 1));
            } else {
              const tmp =
                index === 0
                  ? [hirerarchy[0]]
                  : hirerarchy.slice(0, index + 1);
              setHirerarchy([
                ...tmp,
                {
                  node: option,
                  parent: options,
                },
              ]);
            }

            
          }
        }}
        option={option}
        key={option.id}
        isActive={activeHirerachy}
        isSearchActive={isSearchActive}
        showHideOption={!!showHideNodes[option.id]}
        />
      );
    };
    return (
      <div className="horizontal-level" key={`container${index}`}>
        {map(node.childrens, renderNodeOptions)}
      </div>
    );
  };

  const renderParent = () => {
    const renderParentOptions = (option: IOption) => {
      const activeHirerachy = hirerarchy && hirerarchy[0] && hirerarchy[0].node.id === option.id;
      return (
        <OptionComponent
        checked={!!(
          checkedOptions[option.id] &&
          checkedOptions[option.id].checked
        )}
        partialChecked={checkedOptions[option.id] && checkedOptions[option.id].partialChecked}
        handleOptionChange={({ target: { checked } }: any) => {
          handleOptionChange(checked, option, undefined!);
        }}
        handleExpandClick={() => {
          if (option.childrens) {
            const isAlreadyActive: boolean = option.id === (hirerarchy[0] && hirerarchy[0].node.id);

            if(isAlreadyActive) {
              setHirerarchy([]);
            } else {
              setHirerarchy([
                {
                  node: option,
                  parent: undefined!,
                },
              ]);
            }
          }
        }}
        option={option}
        key={option.id}
        isActive={activeHirerachy}
        isSearchActive={isSearchActive}
        showHideOption={!!showHideNodes[option.id]}
        />
      );
    };

    return (
      <div className="horizontal-level" key={`container_parent`}>
        {map(dropdownOptions, renderParentOptions)}
      </div>
    );
  };

  return (
    <div className="react-tree-menu horizontal-container">
      <SearchInput onChange={(value: string) => {
        setSearchTxt(value)
      }}
      inputProps={inputProps}
      />
      <div className="horizontal-dropdown">
        {renderParent()}
        {map(hirerarchy, renderNodes)}
      </div>
    </div>
  )
}

export default HorizontalDropdown;