import Card from "../components/Card.js";

const createCard = (item, handleCardClick, handleCardDelete) => {
  const card = new Card(item, "#card", handleCardClick, handleCardDelete);
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
