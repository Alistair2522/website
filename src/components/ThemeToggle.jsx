import { useEffect, useState } from "react"
import {Moon, Sun} from "lucide-react"
import { cn } from "@/lib/utils"

export const ThemeToggle=()=>{
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(()=>{
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme==="dark"){
            setIsDarkMode(true)
            document.documentElement.classList.add("dark");
        } else{
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    })


    const toggleTheme =() =>{
        if (isDarkMode){
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme","ligt");
            setIsDarkMode(false);
        } else{
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme","dark");
            setIsDarkMode(true);
        }
    };

    return(
    <button 
    onClick={toggleTheme}     
    className=
        "p-2 rounded-full transition-colors duration-300 focus:outline-hidden">
        {" "}
        {isDarkMode ? (
         <Sun className="h-6 w-6 text-yellow-300"/>
        ) : (
        <Moon className="h-6 w-6 text-white-300"/> 
        )}
    </button>
    )
}