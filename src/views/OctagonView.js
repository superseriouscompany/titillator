import React from 'react'
import Tipsy from 'react-tipsy';

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
              <div className="full-name">{props.blue.name.split(' ')[0]}</div>
            </div>
            <Tipsy content="Remove anyone you don't know." position="bottom" trigger="hover">
              <a className="remove" onClick={() => props.remove(props.blue.id)}>
                <img src="/images/TrashCan.png" alt="Remove coworker"/>
              </a>
            </Tipsy>
          </div>
          <div className="red corner">
            <div className="card">
              <img src={props.red.avatarUrl} alt={`%{props.red.name} on LinkedIn`} className="face" onClick={() =>  props.choose(props.red.id, props.blue.id)}/>
              <div className="full-name">{props.red.name.split(' ')[0]}</div>
            </div>
            <Tipsy content="Remove anyone you don't know." position="bottom" trigger="hover">
              <a className="remove" onClick={() => props.remove(props.red.id)}>
                <img src="/images/TrashCan.png" alt="Remove coworker"/>
              </a>
            </Tipsy>
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
          <img className="kanye" src="/images/Kanye.png" alt="Kanye West's Face"/>
        </div>
      : null }
    </div>
  )
}
