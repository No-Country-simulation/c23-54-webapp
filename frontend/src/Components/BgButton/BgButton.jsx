const BgButton = ({
    title,
    onClick,
    color = "button-blue",
    otherClasess,
    disabled = false,
    type = 'button'
}) => {

    return (
        <button
            className={disabled ? "button button-disabled" : `button ${color} ${otherClasess}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >

            {title}
        </button>
    )
}

export default BgButton;