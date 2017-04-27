import React from 'react'

export default function(props) {
  return (
    <div className="fullheight octagon-container">
      <div className="progress-bar" style={{width: `${props.progress * 100}%`}}></div>
      <div className="roundHeader">
        <div className="round">Round</div>
        <div className="roundNumber">
          {props.round + 1}
        </div>
        <div className="round">&nbsp;/ 7</div>
      </div>

      { !!props.blue || !!props.red ?
        <div className="octagon">
          <div className="blue corner">
            <div key={props.blue.id} className={[
              "card",
              props.winner === props.blue.id ? "win" : null,
              props.loser === props.blue.id ? "loss" : null,
              props.entering ? "enter" : null,
            ].join(' ')}>
              <img src={props.blue.avatarUrl} alt={`%{props.blue.name} on LinkedIn`} className="face" onClick={() => props.choose(props.blue.id, props.red.id)}/>
              <div className="full-name">{props.blue.name.split(' ')[0]}</div>
            </div>
          </div>
          <div className="red corner">
            <div key={props.red.id} className={[
              "card",
              props.winner === props.red.id ? "win" : null,
              props.loser === props.red.id ? "loss" : null,
              props.entering ? "enter" : null
            ].join(' ')}>
              <img src={props.red.avatarUrl} alt={`%{props.red.name} on LinkedIn`} className="face" onClick={() =>  props.choose(props.red.id, props.blue.id)}/>
              <div className="full-name">{props.red.name.split(' ')[0]}</div>
            </div>
          </div>
        </div>
      : null }

      { props.showHint ?
        <div className="footer">
          <div className="arrowHint">
            <div className="kanyeQuote">
              psst, choose faster with
              <span className="key">&larr;</span>
              <span className="key">&rarr;</span>
            </div>
          </div>
        </div>
      : null }
    </div>
  )
}
