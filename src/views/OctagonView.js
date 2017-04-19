import React from 'react'

export default function(props) {
  return (
    <div>
      <h2>Round {props.round + 1}</h2>
      { !!props.blue || !!props.red ?
        <div className="octagon">
          <div className="blue corner" onClick={() => props.choose(props.blue.id, props.red.id)}>
            <img src={props.blue.avatar_url} alt={`%{props.blue.name} on LinkedIn`} className="face"/>
            <div>
              <div>{props.blue.name}</div>
            </div>
          </div>
          <div className="red corner" onClick={() =>  props.choose(props.red.id, props.blue.id)}>
            <img src={props.red.avatar_url} alt={`%{props.red.name} on LinkedIn`} className="face"/>
            <div>
              <div>{props.red.name}</div>
            </div>
          </div>
        </div>
      : null }
    </div>
  )
}
