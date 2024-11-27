import React from "react";
import "./FilterSelect.css";
import { useLocation } from "react-router-dom";

function FilterSelect({ label, options, place, onFunction }) {
    const location = useLocation();

    return (
        <div className="filter_select">
            {location.pathname.startsWith('/catalog/') && (
                <div className="selected_line">
                    <div className="selected_line_item">
                        <label>{label}</label>
                        <select 
                            defaultValue={place} 
                            onChange={onFunction}
                        >
                            {options && options.map((option) => (
                                <option 
                                    key={option.value} 
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {location.pathname === '/catalog' && (
                <select defaultValue="" onChange={onFunction}>
                    <option value="">{label}</option>
                    {options && options.map((option) => (
                        <option 
                            key={option.value} 
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default FilterSelect;
