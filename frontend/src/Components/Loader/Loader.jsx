
const Loader = ({
    message = "Cargando..."
}) => {
    return (
        <div class="loader-container">
            <div class="spinner"></div>
            <div>{message}</div>
        </div>
    )
}

export default Loader