import { OPTION_STYLE } from "../constants";
import {
  ICheckedOptions,
  IOption,
  ReactTreeNode,
  ReactTreeObjectNode,
  TreeDropdownValue,
} from "../interface";

export function isVerticalOption(optionStyle: OPTION_STYLE) {
  return optionStyle === OPTION_STYLE.VERTICAL;
}

export function isHorizontalOption(optionStyle: OPTION_STYLE) {
  return optionStyle === OPTION_STYLE.HORIZONTAL;
}

export const findNode = (
  node: IOption,
  parent: ReactTreeNode,
  value: TreeDropdownValue[],
  valueNodes: ReactTreeObjectNode
) => {
  const parentNode: ReactTreeNode = { node, parent };

  const valueIndex: number = value.findIndex((item) => item.id === node.id);
  if (valueIndex >= 0) {
    valueNodes[node.id] = parentNode;
    return valueNodes;
  }
  if (node.childrens && node.childrens.length >= 0) {
    node.childrens.forEach((child) => {
      findNode(child, parentNode, value, valueNodes);
    });
  }
  return valueNodes;
};

export const filterNodes = (dropdownOptions: IOption[], searchtxt: string) => {
  const showHide = {};
  dropdownOptions.forEach((dropdownOption) => {
    searchString(dropdownOption, searchtxt, showHide);
  });
  return showHide;
};

export const searchString = (
  node: IOption,
  searchtxt: string,
  showHide: ReactTreeObjectNode
) => {
  let found = node.value.includes(searchtxt);
  if (node.childrens && node.childrens.length >= 1) {
    node.childrens.forEach((childItem) => {
      const childFound = searchString(childItem, searchtxt, showHide);
      if (!found && childFound) {
        found = childFound;
      }
    });
  }
  showHide[node.id] = found;
  return found;
};

export const backwardSelectionChange = (
  checked: boolean,
  checkedOptions: ReactTreeObjectNode,
  _currentNode: IOption,
  parentNodes: ReactTreeNode
) => {
  if (parentNodes) {
    const { node, parent } = parentNodes;

    const partialChecked = (node.childrens || []).some(
      (parentChildNode) =>
        (checkedOptions[parentChildNode.id] &&
          checkedOptions[parentChildNode.id].checked) ||
        (checkedOptions[parentChildNode.id] &&
          checkedOptions[parentChildNode.id].partialChecked)
    );

    if (!checked) {
      checkedOptions[node.id] = { checked, partialChecked };
      if (parent) {
        backwardSelectionChange(checked, checkedOptions, node, parent);
      }
    } else {
      const allParentNodeChildrensChecked = (node.childrens || []).every(
        (parentChildNode) =>
          checkedOptions[parentChildNode.id] &&
          checkedOptions[parentChildNode.id].checked
      );

      checkedOptions[node.id] = {
        checked: allParentNodeChildrensChecked,
        partialChecked,
        childrens:
          node.childrens && node.childrens.length >= 1
            ?  node.childrens.map(obj => obj.id)
            : undefined,
        node: {
          node,
          parent,
        },
      };
      if (allParentNodeChildrensChecked || partialChecked) {
        backwardSelectionChange(
          allParentNodeChildrensChecked,
          checkedOptions,
          node,
          parent
        );
      }
    }
  }
  return checkedOptions;
};

export const forwardSelectionChange = (
  checked: boolean,
  checkedOptions: ReactTreeObjectNode,
  option: IOption,
  options: ReactTreeNode
) => {
  const { id, childrens } = option;
  checkedOptions[id] = {
    checked,
    partialChecked: checked,
    childrens:
      childrens && childrens.length >= 1 ? childrens.map(obj => obj.id) : undefined,
    node: {
      node: option,
      parent: options,
    },
  };
  if (childrens) {
    childrens.forEach((child) => {
      forwardSelectionChange(checked, checkedOptions, child, {
        node: option,
        parent: options,
      });
    });
  }
  return checkedOptions;
};

export const getSelectedOptions = (
  selectedIds: string[],
  checkedOptionState: ICheckedOptions,
  isDependent: boolean
) => {
  selectedIds.forEach((optionId) => {
    if (checkedOptionState[optionId]) {
      const { checked, childrens } = checkedOptionState[optionId];
      if (checked) {
        if (childrens && childrens.length >= 1) {
          getSelectedOptions(childrens, checkedOptionState, true);
        }
        if (isDependent) {
          delete checkedOptionState[optionId];
        }
      } else {
        delete checkedOptionState[optionId];
      }
    }
  });
  return checkedOptionState;
};


export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: any;
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}