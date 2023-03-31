import Card from "../components/Card.js";

const createCard = (
  item,
  { currentUserId, handleCardClick, handleCardLike, handleCardDelete }
) => {
  const card = new Card(
    item,
    "#card",
    currentUserId,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  );
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
