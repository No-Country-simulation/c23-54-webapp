


const SearchText = ({
    name,
    placeholder,
    children,
    funcSaveValue
}) => {

    return (
        <div className="search__text__container">
            <label htmlFor={name}>
                {children}
            </label>
            <input type="text"
                placeholder={placeholder}
                name={name}
                onChange={funcSaveValue}
            />
        </div>
    )
}


export default SearchText