import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentPopupContext} from "../contexts/CurrentPopupContext";

export function EditProfilePopup(props) {
  const [name, setName] = useState('')
  const [description , setDescription ] = useState('')

  const { isLoading } = useContext(CurrentPopupContext);
  const currentUser = useContext(CurrentUserContext);

  // console.log('edit popup rendered')
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description
    });
  }
  return (
    <PopupWithForm {...props}
                   onSubmit = {handleSubmit}
                   name='profile-edit'
                   buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
                   title='Редактировать профиль'>
      <input className="form__field"
             id="form__field-name"
             name="name"
             placeholder="Введите имя"
             type="text"
             value={name || ''}
             onChange={handleNameChange}
             required
             minLength="2"
             maxLength="30"/>
      <span className="form__field-name-error form__error"/>
      <input className="form__field"
             id="form__field-profession"
             name="profession"
             placeholder="Введите профессию"
             type="text"
             value={description || ''}
             onChange={handleDescriptionChange}
             required
             minLength="2"
             maxLength="30"/>
      <span className="form__field-profession-error form__error"/>
    </PopupWithForm>
  )
}