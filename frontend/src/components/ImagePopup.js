export default function ImagePopup({cardData, onClose}) {
    const {link, name, _id} = cardData

    return (
        <div className={`popup big-img ${_id? 'popup_opened': ''}`} onClick={onClose}>
            <figure className="big-img__figure">
                <img className="big-img__image" src={String(link)} alt={name} />
                <figcaption className='big-img__caption'>{name}</figcaption>
                <button className="popup__close button" type="reset" onClick={onClose}/>
            </figure>
        </div>
    )
}
