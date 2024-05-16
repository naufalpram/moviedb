import React from 'react'


// button {
//     border-radius: 8px;
//     border: 1px solid transparent;
//     padding: 0.6em 1.2em;
//     font-size: 1em;
//     font-weight: 500;
//     font-family: inherit;
//     background-color: #1a1a1a;
//     cursor: pointer;
//     transition: border-color 0.25s;
//   }

const styles = {
    primary: "bg-primary-400",
    secondary: "bg-secondary-400",
    ternaryBlue: "border-2 border-primary-400 bg-transparent",
    ternaryYellow: "border border-secondary-400 bg-transparent",
    unselect: "bg-unselect-gray/20 text-white/20 border-[0.5px] border-white/20"
}

const Button = ({ variant = "primary", onClick, icon, children }) => {
  return (
    <button 
        className={`flex gap-1 px-6 py-2 rounded-[20px] text-sm font-medium cursor-pointer transition-all ${styles[variant]}`}
        onClick={onClick}
    >
        {children}
        {icon && <span className='w-4 h-4'>{icon}</span>}
    </button>
  )
}

export default Button