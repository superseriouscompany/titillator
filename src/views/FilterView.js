import React from 'react'

export default function(props) {
  return (
    <form className="filter" onSubmit={props.submit}>
      {props.players.map((p, key) => (
        <label className="player">
          <input type="checkbox" name="checked[]" defaultChecked={false} value={p.id}/>
          <img src={p.avatarUrl} />
          {p.name}
        </label>
      ))}
      <button>Done.</button>
    </form>
  )
}
