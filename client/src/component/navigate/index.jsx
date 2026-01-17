import { useNavigate, useLocation } from "react-router-dom";

function NavigateOption() {
    const navigate = useNavigate();
    const location = useLocation();

    const options = ["All", "Today", "Pending", "Overdue"];

    const pathMap = {
        All: "/",
        Today: "/today",
        Pending: "/pending",
        Overdue: "/overdue",
    };

    function clickHandler(option) {
        navigate(pathMap[option]);
    }

    return (
        <div className="mb-4 rounded-xl">
            <ul className="flex rounded-lg overflow-hidden bg-emerald-700 text-white">
                {options.map(option => {
                    const isActive = location.pathname === pathMap[option];

                    return (
                        <li
                            key={option}
                            onClick={() => clickHandler(option)}
                            className={`
                                flex-1 text-center p-3 cursor-pointer
                                transition-colors duration-200
                                ${isActive
                                    ? "bg-emerald-100 text-emerald-900 font-semibold"
                                    : "hover:bg-emerald-600"
                                }
                            `}
                        >
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default NavigateOption;
