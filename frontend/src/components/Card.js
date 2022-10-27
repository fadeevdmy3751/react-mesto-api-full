import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({cardData, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const {likes, link, name, owner} = cardData

  const likesCount = likes.length;
  const myLike = likes.some(like => like === currentUser._id)

  function handleClick() {
    onCardClick(cardData);
  }
  function handleLikeClick() {
    onCardLike(cardData)
  }
  function handleDeleteClick() {
    onCardDelete(cardData)
  }

  return (
    <div className="card">
      <img alt={name}
           className="card__image"
           src={link}
           onClick={handleClick}/>
      <h2 className="card__name">{name}</h2>
      <button className={`card__like ${myLike ? 'card__like_set' : ''}`}
              type="button"
              onClick={handleLikeClick}/>
      <span className="card__like-count">{likesCount}</span>
      {(owner === currentUser._id) &&
        (<button
        className="card__delete button"
        onClick={handleDeleteClick}
        type="button"/>)}
    </div>
  );
}

export default Card;