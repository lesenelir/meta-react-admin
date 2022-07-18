import React from 'react'
import TopPanel from "./TopPanel/TopPanel";

import './DashBoard.css'

import boy from '../../assets/images/boy.png'
import doraemon from '../../assets/images/doraemon.png'
import sheep from '../../assets/images/sheep.png'
import wolf from '../../assets/images/wolf.png'



const data = [
  {
    id: 1,
    img: boy,
    title: '铁臂阿童木',
    desc: '阿童木会永远保护你哒'
  },
  {
    id: 2,
    img: doraemon,
    title: '哆啦A梦',
    desc: '哆啦A梦永远给你惊喜'
  },
  {
    id: 3,
    img: sheep,
    title: '喜羊羊',
    desc: '别看我只是一只羊'
  },
  {
    id: 4,
    img: wolf,
    title: '灰太狼',
    desc: '灰太狼只抓大灰狼'
  }
]


function DashBoard() {
  return (
      <div className="dashboard-box">
        {
          data.map(item => {
            return (
                <TopPanel
                    id={item.id}
                    img={item.img}
                    title={item.title}
                    desc={item.desc}
                />
            )
          })
        }


      </div>
  )
}

export default DashBoard
