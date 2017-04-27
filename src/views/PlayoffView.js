import React from 'react'


export default function (props) {
  console.log(props)
  return (
    <form onSubmit={props.submit}>
      { props.players.map((p, key) => (
        <div key={key}>
          <label>
            <input type="checkbox" name="checked[]" defaultChecked={false} value={p.id} onChange={props.change}/>
            {p.name}
          </label>
        </div>
      ))}
      <button>Submit</button>
    </form>
  )
}
