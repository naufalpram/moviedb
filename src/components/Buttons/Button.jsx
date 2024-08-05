

const styles = {
    primary: "bg-primary-400",
    secondary: "bg-secondary-400",
    ternaryBlue: "border-2 border-primary-400 bg-transparent",
    ternaryYellow: "border border-secondary-400 bg-transparent",
    unselect: "bg-unselect-gray/20 text-white/20 border-[0.5px] border-white/20",
}

const Button = ({ variant = "primary", onClick, icon, children, isLoading, ...props }) => {
  return (
    <button 
        className={`flex justify-center gap-1 px-7 py-3 min-h-8 rounded-[20px] text-sm font-medium transition-all ${styles[variant]} ${!isLoading ? !props.disabled ? 'cursor-pointer': '' : 'cursor-not-allowed'}`}
        onClick={onClick}
        {...props}
    >
        {isLoading && 'Loading'}
        {!isLoading && children}
        {!isLoading && icon && <span className='w-4 h-4'>{icon}</span>}
    </button>
  )
}

export default Button