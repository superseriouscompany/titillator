import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default function(props) {
  return (
    <div className="fullheight results-container">
      { props.matchCount ?
        <h2>
          You have {props.matchCount} { props.matchCount === 1 ? "match" : "matches"}!<br/>
          <StripeCheckout
            token={props.onToken}
            stripeKey={props.stripeKey}
            name="Somebody likes you back!"
            description="💘 💘 💘 💘 💘 💘 💘 💘 💘 💘 💘 💘"
            panelLabel="🕵️ find out who"
            amount={1999}>
            <button className="pay">Find out who liked you back</button>
          </StripeCheckout>
        </h2>
      : props.noMatches ?
        <h2>
          You did it! Send this link to your friends before HR takes it down: <a href="https://linkedup.co" target="_blank">https://linkedup.co</a>
        </h2>
      :
        <h2>Loading...</h2>
      }

      { props.men.length ?
        <List list={props.men} revealed={props.revealed} gender="m"/>
      : null }

      { props.women.length ?
        <List list={props.women} revealed={props.revealed} gender="f"/>
      : null }

      <h5>
        Check back here for juicy updates ;)
      </h5>
    </div>
  )
}

function List(props) {
  return (
    <div className="list">
      <div>
        {props.gender === 'f' ? '🍑' : '🍆'}〰️〰️ Top 10 〰️〰️{props.gender === 'f' ? '🍑' : '🍆'}</div>
      { props.list.slice(0, 10).map((t, key) => (
        <div key={key}>
          { key === 0 ?
            <span>🥇  </span>
          : key === 1 ?
            <span>🥈  </span>
          : key === 2 ?
            <span>🥉  </span>
          :
            <span>🎖️  </span>
          }
          {t.name}
          {
            (props.revealed || []).find((p) => { return p.id === t.id }) ?
              <span>  ❤️s you back!</span>
            : null
          }
        </div>
      ))}
      <div>{props.gender === 'f' ? '🍑' : '🍆'}〰️〰️〰️〰️〰️〰️〰️〰️{props.gender === 'f' ? '🍑' : '🍆'}</div>
      { props.list.slice(10).map((t, key) => (
        <div key={key}>
          { key === props.list.length - 1 ?
            <span>💩  </span>
          :
            <span>{key + 11}.  </span>
          }
          {t.name}
        </div>
      ))}
    </div>
  )
}
