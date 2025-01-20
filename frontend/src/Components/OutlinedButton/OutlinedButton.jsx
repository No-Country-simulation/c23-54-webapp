const OutlinedButton = ({
    title,
    onClick,
    textColor = "text-blue",
    otherClases,
    disabled = false,
    type = 'button'
}) => {

    return (
        <button
            className={`button ${textColor} ${otherClases}`}
            onClick={onClick}
            disabled={disabled}

            type={type}
        >

            {title}
        </button>
    )
}

export default OutlinedButton;