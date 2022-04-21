import { OPTION_STYLE } from "./constants";

export interface IOption {
  id: string;
  value: string;
  childrens?: IOption[];
}

export interface IInputProps {
  hideIcon?: boolean;
  IconComponent?: any;
  inputPlaceholder?: string;
}

export interface ReactTreeDropdownProps {
  initializeValue?: string[];
  value: string[];
  dropdownOptions: IOption[];
  handleValueChange: (selectedOptions: string[]) => void;
  optionStyle: OPTION_STYLE;
  placeholder: string;
  renderSelectedOptions?: boolean;
  inputProps?: IInputProps;
  showClearIndicator?: boolean;
}

export interface ReactTreeDropdownRef {
  removeSelectedOption: (value: string) => void;
  clearAllValues: () => void;
}

export interface ReactTreeNode {
  node: IOption;
  parent: ReactTreeNode;
}

export interface ReactTreeObjectNode {
  [key: string]: any;
}

export interface ICheckedOptions {
  [key: string]: IChecked;
}

export interface IChecked {
  checked: boolean;
  partialChecked: boolean;
  childrens: string[];
  node: ReactTreeNode;
}
