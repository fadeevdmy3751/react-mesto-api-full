export default function PopupWithForm ({title, name, isOpen, onClose, onSubmit, children, buttonText}){
    return (
        <div className={`popup popup-${name} ${isOpen? 'popup_opened': ''}`} onClick={onClose}>
            <form className="form" name={`popup-${name}-form`} /*noValidate*/ onSubmit={onSubmit}>
                <h2 className="popup__header">{title}</h2>
                {children}
                <button className="form__button" type="submit">{buttonText}</button>
                <button className="popup__close button" type="reset" onClick={onClose}/>
            </form>
        </div>
    )
}
