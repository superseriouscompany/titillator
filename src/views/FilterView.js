import React from 'react'

export default function(props) {
  return (
    <form className="filter" onSubmit={props.submit}>
      {props.players.map((p, key) => (
        <label className="player" key={key}>
          <input type="checkbox" name="checked[]" defaultChecked={true} value={p.id}/>
          <img src={p.avatarUrl} alt={p.name} />
          {p.name}
        </label>
      ))}
      <button>Done.</button>
    </form>
  )
}
