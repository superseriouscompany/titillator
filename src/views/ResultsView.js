import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default function(props) {
  return (
    <div className="fullheight results-container">
      { props.hasOtherResults ?
        <div>Ya done.</div>
      :
        <a onClick={() => props.changeOrientation(props.orientation === 'M' ? 'F' : 'M')}>Switch Teams</a>
      }

      { props.matchCount ?
        <h2>
          You have {props.matchCount} { props.matchCount === 1 ? "match" : "matches"}!<br/>
          <a onClick={props.reveal}>get it</a>
          <StripeCheckout
            token={props.onToken}
            stripeKey="pk_test_mmQIM1nxdtJu1AymtDN9nBCo"
            name="Super Serious Company"
            description="Help."
            panelLabel="Lose"
            amount={999}>
            <button className="pay">help.</button>
          </StripeCheckout>
          { props.match ? props.match.name : ' nada'}
        </h2>
      :
        <h2>
          Matches coming soon...standby
        </h2>
      }

      { props.men.length ?
        <List list={props.men} />
      : null }

      { props.women.length ?
        <List list={props.women} />
      : null }

      { props.tiers.map((t, key) => (
        <div className={`tier ${key % 2 ? 'even' : 'odd'}`} key={key}>
          <div className="place">
            { key === 0 ?
              <span>🥇</span>
            : key === 1 ?
              <span>🥈</span>
            : key === 2 ?
              <span>🥉</span>
            : key === props.tiers.length - 1 ?
              <span>💩</span>
            : key === props.tiers.length - 2 ?
              <span>🙄</span>
            : key === props.tiers.length - 3 ?
              <span>😬</span>
            : key < props.tiers.length / 2 ?
              <span>🆒</span>
            :
              <span>🆗</span>
            }
          </div>
          <div className="members">
            { t.map((p, key) => (
              <div className="member" key={key}>
                <img src={p.avatarUrl} alt={`%{p.name} on linkedin`} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}

function List(props) {
  return (
    <div className="list">
      <div>〰️〰️ Top Ten 〰️〰️</div>
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
        </div>
      ))}
      <div>〰️〰️〰️〰️〰️〰️〰️〰️〰️</div>
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
