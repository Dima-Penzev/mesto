import Card from "../components/Card.js";

const createCard = (
  item,
  { userIdInBase, handleCardClick, handleCardLike, handleCardDelete }
) => {
  const card = new Card(
    item,
    "#card",
    userIdInBase,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  );
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
