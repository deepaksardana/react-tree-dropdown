import * as React from "react";
export default ({labelTxt, checked, handleChange, partialChecked}: any) => {
    return (
        <label className="reactCustomCheckbox">{labelTxt}
            <input type="checkbox" checked={checked} onChange={(event) => {
                handleChange(event);
                event.stopPropagation();
            }}/>
            <span className={`checkmark ${!checked && partialChecked ? "partialChecked" : ""}`}>
                {
                  partialChecked && <div className="partialCheckContainer"/>  
                }
            </span>
        </label>
    )
}