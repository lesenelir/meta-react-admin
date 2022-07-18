import React from 'react'
import {Card} from "antd"

const {Meta} = Card

function TopPanel(props) {
  return (
      <>
        <Card
            hoverable
            style={{width: 300}}
            cover={<img src={props.img} alt="show" style={{height: 300}} />}
        >
          <Meta title={props.title} description={props.desc} />
        </Card>
      </>
  )
}

export default TopPanel
