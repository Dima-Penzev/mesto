import Card from "../components/Card.js";

const createCard = (item, handleCardClick) => {
  const card = new Card(item, "#card", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

export default createCard;
