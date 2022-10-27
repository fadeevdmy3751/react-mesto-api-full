import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentPopupContext} from "../contexts/CurrentPopupContext";


export function AddPlacePopup(props) {
    const [nameInput, setNameInput] = useState('');
    const [linkInput, setLinkInput] = useState('');

    const { isLoading } = useContext(CurrentPopupContext);

    function handleNameChange(e) {
        setNameInput(e.target.value);
    }
    function handleLinkChange(e) {
        setLinkInput(e.target.value);
    }

    useEffect(() => {
        setNameInput('');
        setLinkInput('');
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameInput,
            link: linkInput
        })
    }

    return (
        <PopupWithForm {...props}
                       name='card-add'
                       title='Новое место'
                       buttonText={isLoading ? 'Сохранение...' : 'Создать'}
                       onSubmit={handleSubmit}>
            <input className="form__field"
                   id="card-add-name"
                   name="card-name"
                   value={nameInput || ''}
                   placeholder="Название"
                   required
                   type="text"
                   minLength="2"
                   maxLength="30"
                   onChange={handleNameChange}
            />
            <span className="form__error card-add-name-error"/>
            <input className="form__field"
                   id="card-add-link"
                   name="card-link"
                   value={linkInput || ''}
                   placeholder="Ссылка на картинку"
                   required
                   type="url"
                   onChange={handleLinkChange}
            />
            <span className="card-add-link-error form__error"/>
        </PopupWithForm>
    )
}