import { cloneDeep, forEach, keys, map, values } from "lodash";
import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";

import { IChecked, ICheckedOptions, IOption, ReactTreeDropdownProps, ReactTreeNode, TreeDropdownValue } from "./interface";
import Container from "./DetectClickOutside";
import HorizontalDropdown from "./HorizontalDropdown";
import VerticalDropdown from "./VerticalDropdown";
import SelectedOptions from "./SelectedOptions";
import CrossIcon from "./assets/cross";
import ArrowDown  from "./assets/arrow-down";
import ArrowUp  from "./assets/arrow-up";


import { backwardSelectionChange, filterNodes, findNode, forwardSelectionChange, getSelectedOptions, isHorizontalOption, isVerticalOption } from "./utils";
import "./style.scss";

const ReactTreeDropdown = forwardRef((props: ReactTreeDropdownProps, ref) => {
  const { value, initializeValue, dropdownOptions, handleValueChange, optionStyle, placeholder, renderSelectedOptions = true, inputProps, showClearIndicator = true } = props;
  const [checkedOptions, setCheckedOptions] = useState<ICheckedOptions>({});
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [showHideNodes, setShowHideNodes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (initializeValue && initializeValue.length >= 1) {
      const valueNodes: any = {};
      forEach(dropdownOptions || [], (node) => {
        findNode(node, undefined!, initializeValue, valueNodes);
      });

      intializeCheckOptionState(values(valueNodes))
    }
  }, []);

  useEffect(() => {
    if (searchTxt && searchTxt.length >= 1) {
      setShowHideNodes(filterNodes(dropdownOptions, searchTxt));
    } else {
      setShowHideNodes({});
    }
  }, [searchTxt]);


  useImperativeHandle(ref, () => ({
    removeSelectedOption(id: string) {
      handleCrossClicked(undefined, id)
    },
    clearAllValues() {
      clearAllItem()
    }
  }));

  const intializeCheckOptionState = (node: ReactTreeNode[]) => {
    let cloneCheckOptions = cloneDeep(checkedOptions);
    forEach(node, (currentNode: ReactTreeNode) => {
      cloneCheckOptions = forwardSelectionChange(
        true,
        cloneCheckOptions,
        currentNode.node,
        currentNode.parent
      )
      cloneCheckOptions = backwardSelectionChange(
        true,
        cloneCheckOptions,
        currentNode.node,
        currentNode.parent
      )
    });
    handleValueChange(tranformSelectedOptions(cloneCheckOptions));
    setCheckedOptions(cloneCheckOptions);
  }

  const tranformSelectedOptions = (selectedOptions: ICheckedOptions): TreeDropdownValue[] => {
    const markChecked = getSelectedOptions(
      keys(selectedOptions),
      cloneDeep(selectedOptions),
      false
    )
    return map(markChecked, ({node: {node}}) => ({id: node.id, value: node.value}));
  }

  const handleOptionChange = (checked: boolean, option: IOption, options: ReactTreeNode) => {
    let tmpCheckOptionsState = forwardSelectionChange(
      checked,
      cloneDeep(checkedOptions),
      option,
      options
    );
    tmpCheckOptionsState = backwardSelectionChange(
      checked,
      tmpCheckOptionsState,
      option,
      options
    );
    setCheckedOptions(tmpCheckOptionsState);
    handleValueChange(tranformSelectedOptions(tmpCheckOptionsState));
  };

  const toggleMenuState = (state: boolean) => {
    setIsMenuOpen(state)
    if (!state) {
      setSearchTxt("");
    }
  }

  const handleCrossClicked = (event: any, id: string) => {
    if (checkedOptions[id]) {
      const { node } = checkedOptions[id] as IChecked;
      handleOptionChange(false, node.node, node.parent);
      if (event) {
        event.stopPropagation();
      }
    }
  }

  const clearAllItem = (event?: any) => {
    setCheckedOptions({});
    handleValueChange([]);
    if (event) {
      event.stopPropagation();
    }
  }

  const isSearchActive: boolean = !!(searchTxt && searchTxt.length >= 1);
  const isOptionsSelected = value && value.length >= 1;

  return (
    <Container baseClassName="tree-dropdown" handleOutsideClick={() => toggleMenuState(false)}>
      <div className={`tree-container ${isMenuOpen ? "dropdown-active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className="options-content-container">
          {isOptionsSelected && renderSelectedOptions ?
            <SelectedOptions selectedValues={value} handleCloseClick={handleCrossClicked} /> :
            <div className="options-placeholder">{placeholder || "Select..."}</div>
          }
        </div>
        {
          showClearIndicator && <div className="clear-container" onClick={clearAllItem}>
            {isOptionsSelected && <CrossIcon />}
          </div>
        }
        <div className="divider-container"></div>
        <div className="dropdown-indicator">
          {
            isMenuOpen ? <ArrowUp /> : <ArrowDown />
          }
        </div>
      </div>
      {
        isMenuOpen && isHorizontalOption(optionStyle) && <HorizontalDropdown
          dropdownOptions={dropdownOptions}
          checkedOptions={checkedOptions}
          handleOptionChange={handleOptionChange}
          searchTxt={searchTxt}
          setSearchTxt={setSearchTxt}
          isSearchActive={isSearchActive}
          showHideNodes={showHideNodes}
          inputProps={inputProps!}
        />
      }
      {
        isMenuOpen && isVerticalOption(optionStyle) && <VerticalDropdown
          dropdownOptions={dropdownOptions}
          checkedOptions={checkedOptions}
          handleOptionChange={handleOptionChange}
          searchTxt={searchTxt}
          setSearchTxt={setSearchTxt}
          isSearchActive={isSearchActive}
          showHideNodes={showHideNodes}
          inputProps={inputProps!}
        />
      }
    </Container>
  );
});

export default ReactTreeDropdown;