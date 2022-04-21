import * as React from 'react';
import { debounce } from "lodash";
import  SearchIcon from "../assets/search"; 
import "./styles.scss";
import { IInputProps } from '../interface';

interface Props {
  onChange?: any;
  name?: string;
  inputProps?: IInputProps;
}

const DebouncedTextInput = ({ value, onChange, name, inputProps }: any) => {

  // Creates a debounced function that delays invoking the function defined as the first parameter
  // after waiting the miliseconds defined in the second parameter have elapsed since the last time
  // the debounced function was invoked.
  const debouncedUpdate = debounce((searchTxt, searchName) => onChange(searchTxt, searchName), 500);
  const { IconComponent, inputPlaceholder, hideIcon}: IInputProps = inputProps || {}
  return (
    <div className={`react-tree-search-input ${hideIcon? "" : "icon-active"}`}>
      {!hideIcon && <div className='search-input-icon'>
        {IconComponent ? <IconComponent/> : <SearchIcon />}
      </div>
      }
      <div className='search-input-container'>
          <input type="text" placeholder={inputPlaceholder || "Enter Search Text"} value={value} name={name} onChange={({ target }) => debouncedUpdate(target.value.trim(), target.name)}/>
      </div>
    </div>
  )
}

function SearchInput(props: Props) {
    const {onChange, name, inputProps} = props; 
    return (
        <DebouncedTextInput inputProps={inputProps} onChange={onChange} name={name} />
    )
}

export default SearchInput;