import React from 'react';

import Card from './Card';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Main({ onEditAvatar,
                               onEditProfile,
                               onAddPlace,
                               onCardClick,
                               cards,
                               onCardLike,
                               onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}
                     style={{backgroundImage: `url(${currentUser.avatar})`}}/>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria-label="редактировать"
                            className="button profile__edit-button"
                            type="button"
                            onClick={onEditProfile}/>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button button" type="button"
                        onClick={onAddPlace}/>
            </section>
            <section aria-label="elements" className="elements">
                {cards.map(card => (
                    <Card
                        cardData={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike = {onCardLike}
                        onCardDelete = {onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

