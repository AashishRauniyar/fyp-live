

// eslint-disable-next-line react/prop-types
const CustomInput = ({ hint, onChange, value, isPassword }) => {
    return (
        <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={hint ?? "guess what?"}
            onChange={onChange}
            value={value}
            type={isPassword ? "password" : "text"}
        />
    )
}

export default CustomInput