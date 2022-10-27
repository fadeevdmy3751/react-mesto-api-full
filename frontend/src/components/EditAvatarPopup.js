import PopupWithForm from "./PopupWithForm";
import {useRef, useEffect, useContext} from "react";
import {CurrentPopupContext} from "../contexts/CurrentPopupContext";


export function EditAvatarPopup(props){
  const avatarInput = useRef()

  const { isLoading } = useContext(CurrentPopupContext);

  useEffect(() => {
    avatarInput.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e){
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: avatarInput.current.value
    });
  }
  
  return (
    <PopupWithForm {...props}
                   onSubmit = {handleSubmit}
                   name='avatar-edit'
                   buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
                   title='Обновить аватар'>
      <input className="form__field"
             id="form__field-ava"
             name="avatar"
             ref={avatarInput}
             placeholder="Введите ссылку на новый аватар"
             type="url"
             required/>
      <span className="form__error form__field-ava-error"/>
    </PopupWithForm>
  )
}
