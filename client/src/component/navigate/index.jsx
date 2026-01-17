import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavigateOption() {
    const [selectedOption, setSelectedOption] = useState("Today");
    const navigate = useNavigate();

    const options = ["All", "Today", "Pending", "Overdue"];

    function clickHandler(option) {
        setSelectedOption(option);
        console.log("Selected Option:", option);
        
        // Navigate instead of rendering nested components
        if (option === "All") navigate("/");
        if (option === "Today") navigate("/today");
        if (option === "Pending") navigate("/pending");
        if (option === "Overdue") navigate("/overdue");
    }

    return (
        <div className="mb-4 rounded-xl">
            <ul className="flex rounded-lg overflow-hidden bg-emerald-700 text-white">
                {options.map((option) => (
                    <li 
                        key={option}
                        onClick={() => clickHandler(option)}  
                        className={`
                            flex-1 text-center p-3 cursor-pointer 
                            transition-colors duration-200
                            ${selectedOption === option 
                                ? "bg-emerald-100 text-emerald-900 font-semibold" 
                                : "hover:bg-emerald-600"
                            }
                        `}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NavigateOption;