import { map, forEach, every, includes, findIndex, some } from "lodash";
import { OPTION_STYLE } from "../constants";
import {
  ICheckedOptions,
  IOption,
  ReactTreeNode,
  ReactTreeObjectNode,
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
  value: string[],
  valueNodes: ReactTreeObjectNode
) => {
  const parentNode: ReactTreeNode = { node, parent };

  const valueIndex: number = findIndex(value, (item) => item === node.id);
  if (valueIndex >= 0) {
    valueNodes[node.id] = parentNode;
    return valueNodes;
  }
  if (node.childrens && node.childrens.length >= 0) {
    forEach(node.childrens, (child) => {
      findNode(child, parentNode, value, valueNodes);
    });
  }
  return valueNodes;
};

export const filterNodes = (dropdownOptions: IOption[], searchtxt: string) => {
  const showHide = {};
  forEach(dropdownOptions, (dropdownOption) => {
    searchString(dropdownOption, searchtxt, showHide);
  });
  return showHide;
};

export const searchString = (
  node: IOption,
  searchtxt: string,
  showHide: ReactTreeObjectNode
) => {
  let found = includes(node.value, searchtxt);
  if (node.childrens && node.childrens.length >= 1) {
    forEach(node.childrens, (childItem) => {
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

    const partialChecked = some(
      node.childrens,
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
      const allParentNodeChildrensChecked = every(
        node.childrens,
        (parentChildNode) =>
          checkedOptions[parentChildNode.id] &&
          checkedOptions[parentChildNode.id].checked
      );

      checkedOptions[node.id] = {
        checked: allParentNodeChildrensChecked,
        partialChecked,
        childrens:
          node.childrens && node.childrens.length >= 1
            ? map(node.childrens, "id")
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
      childrens && childrens.length >= 1 ? map(childrens, "id") : undefined,
    node: {
      node: option,
      parent: options,
    },
  };
  if (childrens) {
    forEach(childrens, (child) => {
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
  forEach(selectedIds, (optionId) => {
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
