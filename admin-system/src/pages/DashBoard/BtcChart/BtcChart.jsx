import React, {useEffect, useState} from 'react'

import { Line } from '@ant-design/plots'

import {GetBitcoinTrendApi} from "../../../request/api"


function BtcChart(props) {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    GetBitcoinTrendApi().then(res => {
      const day = res.data.prices.length // 天数

      let arr = []

      for (let i = 0; i < day; i++) {
        let temp = {
          'trade_date': new Date(res.data.prices[i][0]).toISOString().substring(0, 10),
          'prices': res.data.prices[i][1]
        }
        arr.push(temp)
      }

      setDataSource(arr)

    }).catch(error => console.log(error))
  }, [])

  console.log(dataSource)
  const config = {
    data: dataSource,
    padding: 'auto',
    xField: 'trade_date',
    yField: ['prices'],
    // 绿涨红跌
    fallingFill: '#ef5350',
    risingFill: '#26a69a',
  }


  return (
      <Line {...config} />
  )
}

export default BtcChart
