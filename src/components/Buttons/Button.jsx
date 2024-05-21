import React from 'react'

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