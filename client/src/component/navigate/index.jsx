import { useState } from "react";
import Today from "../Today";
import Pending from "../Pending";     // Add this
import Overdue from "../Overdue";     // Add this

function NavigateOption() {
    const [selectedOption, setSelectedOption] = useState("Today");

    const options = ["Today", "Pending", "Overdue"];

    function clickHandler(option) {
        setSelectedOption(option);
        console.log("Selected Option:", option);
    }

    return (
        <>
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

            <div>
                {selectedOption === "Today" && <Today />}
                {selectedOption === "Pending" && <Pending />}
                {selectedOption === "Overdue" && <Overdue />}
            </div>
        </>
    )
}

export default NavigateOption;