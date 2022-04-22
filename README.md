Inspire from react-select and react-tree-dropdown.

Creating `react-multi-style-dropdown-tree` which will give two types for hirerarchy `Vertical` as well as `horizontal`.


>Demo:

- [Horizontal Style Tree Dropdown](https://codesandbox.io/s/react-tree-dropdown-horizontal-nnv5v0)

- [Vertical Style Tree Dropdown](https://codesandbox.io/s/react-tree-dropdown-vertical-eiyik9)

- [Render value outside the dropdown](https://codesandbox.io/s/react-tree-dropdown-outside-values-gfs3bs)

- [Adding custom props to search input](https://codesandbox.io/s/react-tree-dropdown-search-input-props-3g4xz1)

>Install

```
npm i react-multi-style-dropdown-tree
```


>USAGE

```
import ReactTreeDropdown, {
  OPTION_STYLE
} from "react-multi-style-dropdown-tree";
import "react-multi-style-dropdown-tree/lib/index.css";
import { OPTIONS } from "./DummyData";

export default function App() {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <div className="App">
      <ReactTreeDropdown
        value={selectedValues}
        dropdownOptions={OPTIONS}
        handleValueChange={(selectedData) => {
          setSelectedValues(selectedData);
        }}
        optionStyle={OPTION_STYLE.VERTICAL}
        placeholder="Select Options"
      />
    </div>
  );
}
```
