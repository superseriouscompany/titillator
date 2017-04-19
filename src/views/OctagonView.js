import React from 'react'

export default function(props) {
  return (
    <div>
      <div className="roundHeader">
        <div className="round">Round</div>
        <div className="roundNumber">{props.round + 1}</div>
      </div>
      { !!props.blue || !!props.red ?
        <div className="octagon">
          <div className="blue corner">
            <div className="card" onClick={() => props.choose(props.blue.id, props.red.id)}>
              <img src={props.blue.avatar_url} alt={`%{props.blue.name} on LinkedIn`} className="face"/>
              <div className="full-name">{props.blue.name}</div>
            </div>
            <a className="remove" onClick={() => props.remove(props.blue.id)}>remove stranger</a>
          </div>
          <div className="red corner">
            <div className="card" onClick={() =>  props.choose(props.red.id, props.blue.id)}>
              <img src={props.red.avatar_url} alt={`%{props.red.name} on LinkedIn`} className="face"/>
              <div className="full-name">{props.red.name}</div>
            </div>
            <a className="remove" onClick={() => props.remove(props.red.id)}>remove stranger</a>
          </div>
        </div>
      : null }
    </div>
  )
}
