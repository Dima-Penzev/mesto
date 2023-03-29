import Card from "../components/Card.js";

const createCard = (
  item,
  { userIdInBase, handleCardClick, handleIpLike, handleCardDelete }
) => {
  const card = new Card(
    item,
    "#card",
    userIdInBase,
    handleCardClick,
    handleIpLike,
    handleCardDelete
  );
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
