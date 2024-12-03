import React from "react";
import "./FilterSelect.css";
import { useLocation } from "react-router-dom";

function FilterSelect({ 
    label, 
    options, 
    city, 
    onFunction, 
    onCountChange, 
    onDayChange,
    value // Add value prop
}) {
    const location = useLocation();

    const handleDayChange = (event) => {
        if (onDayChange) {
            onDayChange(event.target.value);
        }
    };

    return (
        <div className="filter_select">
            {location.pathname.startsWith('/catalog/') && (
                <div className="selected_line">
                    <div className="selected_line_item">
                        <label htmlFor="count_item">Count of days:</label>
                        <input 
                            type="number" 
                            id="count_item" 
                            name="count_item" 
                            min="1" 
                            defaultValue="1" 
                            onChange={(e) => onCountChange(Math.max(1, parseInt(e.target.value)))}
                        />
                    </div>
                    <div className="selected_line_item">
                        <label htmlFor="day_select">Day:</label>
                        <select 
                            id="day_select"
                            onChange={handleDayChange}
                            defaultValue="Monday"
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {location.pathname === '/catalog' && (
                <div className="filter-container">
                    <label>{label}</label>
                    <select 
                        value={value || ""} 
                        onChange={onFunction}
                    >
                        <option value="">{label}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default FilterSelect;