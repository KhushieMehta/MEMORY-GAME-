import Card from "./Card";
import { useEffect, useState ,useRef} from "react";
import Navbar from "./Navbar";


const uniqueCardsArray = [

{
  type: 1,
  image: 1
},
{
  type: 2,
  image: 2
},
{
  type: 3,
  image: 3
},
{
  type: 4,
  image: 4
},
{
  type: 5,
  image: 5
},
{
  type: 6,

  image: 6
},
{
  type: 7,

  image: 7
},
{
  type: 8,

  image: 8
}
];


function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
export default function App() {
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [scores, setScores] = useState(0);
  const [startTime ,setStartTime]=useState({startTime:new Date()})
  const [endTime ,setEndTime]=useState({endTime:new Date()})
  const[totalTime,setTotalTime]=useState(0)
  const [showModal ,setShowModal]=useState(true)


  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(false);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    // console.log("checkCompletion")
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
       setShowModal(false);
      // const highScore = Math.min(moves, bestScore);
      // setBestScore(highScore);
      setEndTime({endTime:new Date()})
      console.log(" checkCompletion  "+  endTime.endTime.getTime()  + "   AND.."+ startTime.startTime.getTime())
    let diff= ( Math.abs(endTime.endTime.getTime() -startTime.startTime.getTime()))/1000;
       diff /= 60;
       console.log(diff)
        setTotalTime(diff.toFixed(2))

    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setScores((scores) => scores + 1);
       setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
       setStartTime({startTime:new Date()})
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
    // eslint-disable-next-line
  }, [clearedCards]);

  const checkIsFlipped = (index) => {
      //console.log("checkIsFlipped", openCards   , index)
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    //console.log("checkIsInactive", clearedCards   , card)

    return (clearedCards[card.type]);
  };

  function handleRestart()  {
    setClearedCards({});
    setOpenCards([]);
     setShowModal(true);
     setScores(0)
    setMoves(0);
    setShouldDisableAllCards(false);
    setTotalTime(0)
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };


    return(
        <div className='container'>

        <Navbar
        moves={moves}
        scores={scores}
        totalTime={totalTime}
        showModal={showModal}
        method={handleRestart}
        ></Navbar>

        <div className={ showModal  ?"board" : 'hidden'}>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
               isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}

            />
          );
        })}
      </div>

      <div className={showModal ? 'hidden' : 'resultBoard'}>
                       <div className='result'> Congratulation! You won in {moves} moves, You took {totalTime} min</div>
                   </div>
      </div>

    )


}