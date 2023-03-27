import Card from "../components/Card.js";

const createCard = (
  item,
  { userIdInBase, handleCardClick, handleCardDelete }
) => {
  const card = new Card(
    item,
    "#card",
    userIdInBase,
    handleCardClick,
    handleCardDelete
  );
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
