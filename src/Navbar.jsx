

export default function Navbar (props) {
    function clickHandler(){
        props.method()
    }

        return (
            <div className='navbar'>
               <h4>Memory Game</h4>
               <div className='status'>
                   <div>Time:{props.totalTime}</div>
                   <div>Moves:{props.moves}</div>
                   <div>Scores:{props.scores}</div>
                   <div><button className='restart' onClick={clickHandler}>Restart</button></div>
               </div>

            </div>
        );
    }

