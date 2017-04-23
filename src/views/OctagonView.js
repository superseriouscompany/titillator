import React from 'react'

export default function(props) {
  return (
    <div className="fullheight octagon-container">
      <div className="roundHeader">
        <a onClick={props.reorient}>
          Reset and Change Gender
        </a>
        <a onClick={props.showResults}>
          Results
        </a>
        <div className="round">Round</div>
        <div className="roundNumber">{props.round + 1}</div>
      </div>

      { !!props.blue || !!props.red ?
        <div className="octagon">
          <div className="blue corner">
            <div className="card">
              <img src={props.blue.avatarUrl} alt={`%{props.blue.name} on LinkedIn`} className="face" onClick={() => props.choose(props.blue.id, props.red.id)}/>
              <div className="full-name">{props.blue.name}</div>
            </div>
            <a className="remove" onClick={() => props.remove(props.blue.id)}>remove stranger</a>
          </div>
          <div className="red corner">
            <div className="card">
              <img src={props.red.avatarUrl} alt={`%{props.red.name} on LinkedIn`} className="face" onClick={() =>  props.choose(props.red.id, props.blue.id)}/>
              <div className="full-name">{props.red.name}</div>
            </div>
            <a className="remove" onClick={() => props.remove(props.red.id)}>remove stranger</a>
          </div>
        </div>
      : null }

      <div className="footer">
        <div className="arrowHint">
          <img className="arrow" src="/images/leftArrow.png" alt="Left Arrow"/>
          <img className="arrow" src="/images/rightArrow.png" alt="Right Arrow"/>
          <div className="kanyeQuote">Ima let you finish but use your arrow keys</div>
        </div>
        <img className="kanye" src="/images/Kanye.png" alt="Kanye West's Face"/>
      </div>
    </div>
  )
}
