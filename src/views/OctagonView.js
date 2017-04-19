import React from 'react'

export default function(props) {
  return (
    <div>
      <h2>Round {props.round + 1}</h2>
      { !!props.blue || !!props.red ?
        <div className="octagon">
          <div className="blue corner">
            <div className="card" onClick={() => props.choose(props.blue.id, props.red.id)}>
              <img src={props.blue.avatar_url} alt={`%{props.blue.name} on LinkedIn`} className="face"/>
              <div>{props.blue.name}</div>
            </div>
            { props.round === 0 ?
              <a className="remove" onClick={() => props.remove(props.blue.id)}>I don't know {props.blue.name}</a>
            : null }
          </div>
          <div className="red corner">
            <div className="card" onClick={() =>  props.choose(props.red.id, props.blue.id)}>
              <img src={props.red.avatar_url} alt={`%{props.red.name} on LinkedIn`} className="face"/>
              <div>{props.red.name}</div>
            </div>
            { props.round === 0 ?
              <a className="remove" onClick={() => props.remove(props.red.id)}>I don't know {props.red.name}</a>
            : null }
          </div>
        </div>
      : null }
    </div>
  )
}
