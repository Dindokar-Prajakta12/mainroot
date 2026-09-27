import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (darkMode) {
            root.classList.add("dark-theme");
            root.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.add("light-theme");
            root.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
