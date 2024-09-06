// eslint-disable-next-line react/prop-types
const Button = ({ title, isDark, width = 'w-[200px]', onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${isDark 
                ? 'bg-black text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-black' 
                : 'bg-blue-500 text-black hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-slate-200'} 
                p-3 text-center rounded-lg text-lg font-medium transition-all duration-300 ease-in-out ${width}`}
        >
            {title}
        </button>
    );
};

export default Button;
