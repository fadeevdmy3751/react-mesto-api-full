export default function InfoTooltip({ onClose, status: { isOpen, successful }}) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return(
    <div id="popup-info-tooltip" className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={handleClickOverlay}>
        <div className={`popup__status ${successful ? 'popup__status_success' : 'popup__status_fail'}`}/>
        <h2 className="popup__header">{successful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button type="reset" className="popup__close button" onClick={onClose}/>
      </div>
    </div>
  );
}
