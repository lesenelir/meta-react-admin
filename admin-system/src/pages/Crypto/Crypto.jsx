import React, {useEffect, useState} from 'react'
import {GetCryptoApi} from "../../request/api"
import Coin from "./Coin/Coin"

import './Crypto.css'

function Crypto() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    GetCryptoApi().then(res => {
      console.log(res)
      setCoins(res.data)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
      <div className="crypto-box">
        <div className="coin-search">
          <h1>Search a currency</h1>
          <form>
            <input
                className="coin-input"
                type="text"
                placeholder="Search"
                onChange={handleChange}
            />
          </form>

          <div className="coin-header">
            <ul>
              <li style={{marginLeft: '0'}}>Coin</li>
              <li>Symbol</li>
              <li>Price(USD)</li>
              <li>Market Cap</li>
              <li>Change 24H</li>
              <li>Supply</li>
            </ul>
          </div>
        </div>

        {
          filteredCoins.map((item) => {
            return (
                <Coin
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    symbol={item.symbol}
                    price={item.current_price}
                    marketcap={item.market_cap}
                    priceChange={item.price_change_percentage_24h}
                    circulating_supply={item.circulating_supply}
                />
            )
          })
        }
      </div>
  )
}

export default Crypto
