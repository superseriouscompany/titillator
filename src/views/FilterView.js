import React from 'react'

export default function(props) {
  return (
    <form className="filter" onSubmit={props.submit}>
      <div className="explanation">
        Who do you recognize?
      </div>
      <div className="faces">
        {props.players.slice(props.batch * props.batchSize, (props.batch + 1) * props.batchSize).map((p, key) => (
          <label className="player" key={key + p.id}>
            <input type="checkbox" name="checked[]" defaultChecked={false} value={p.id} onChange={props.change}/>
            <div>
              <span className="greenCheck">✅</span>
              <img src={p.avatarUrl} alt={p.name} />
              <span className="text">{p.name}</span>
            </div>
          </label>
        ))}
      </div>
      <div className="button-container">
        <button>{props.count || 0} Selected &rarr;</button>
      </div>
    </form>
  )
}
