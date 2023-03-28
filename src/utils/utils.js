import Card from "../components/Card.js";

const createCard = (
  item,
  { userIdInBase, handleCardClick, handleAddLike, handleCardDelete }
) => {
  const card = new Card(
    item,
    "#card",
    userIdInBase,
    handleCardClick,
    handleAddLike,
    handleCardDelete
  );
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
