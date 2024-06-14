
import './App.css';
import Icon from './MemoryGameIcons';
import classnames from "classnames";





const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {

  // console.log(isFlipped   ,  isDisabled  ,  isInactive)
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("wrapper", {
      "is-flipped": isFlipped,
      "is-inactive": isInactive
    })}
    onClick={handleClick}
  >
    <div className ='frontcard'>

      </div>

    <div className='backcard'  >

    <Icon  svgNo={card.image} >  </Icon>


         </div>
  </div>
)
}
export default Card;






