import React from 'react'
import style from "./quiz.module.css"
import { useNavigate, Link} from 'react-router-dom';


const Quiz = () => {
    const navigate = useNavigate();
    
  return (
    <div className={style.home_box}>
        <h1>Quiz Instructions:</h1>
        <div className={style.instruction_box}>
        <li>first</li>
        <li>second</li>
        <li>third</li>
        <li>fourth</li>
        </div>
        <div className={style.quiz_link_start_back_box}>
          <Link to="/">Logout!</Link>
          <button onClick={()=>{navigate("/questionspaper")}}>Start Quiz</button>
        </div>
    </div>
  )
}

export default Quiz;