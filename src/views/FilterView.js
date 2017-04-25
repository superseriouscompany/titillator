import React from 'react'

export default function(props) {
  return (
    <form className="filter" onSubmit={props.submit}>
      {props.players.slice(props.batch * props.batchSize, (props.batch + 1) * props.batchSize).map((p, key) => (
        <label className="player" key={key + p.id}>
          <input type="checkbox" name="checked[]" defaultChecked={false} value={p.id} />
          <div>
            <span className="greenCheck">✅</span>
            <img src={p.avatarUrl} alt={p.name} />
            <span className="text">{p.name}</span>
          </div>
        </label>
      ))}
      <button>Done.</button>
    </form>
  )
}
