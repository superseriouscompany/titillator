import React from 'react'

export default function(props) {
  return (
    <div className="fullheight results-container">
      { props.matchCount ?
        <h2>
          You have {props.matchCount} matches.
        </h2>
      :
        <h2>
          Matches coming soon...standby
        </h2>
      }
      <div>〰️〰️ Top Ten 〰️〰️</div>
      { props.top.map((t, key) => (
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
      { props.list.map((t, key) => (
        <div key={key}>
          { key === props.list.length - 1 ?
            <span>💩  </span>
          :
            <span>{key + 11}.  </span>
          }
          {t.name}
        </div>
      ))}

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
