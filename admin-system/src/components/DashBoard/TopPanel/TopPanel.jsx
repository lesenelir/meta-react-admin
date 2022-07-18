// import React from 'react'
// import {Card} from "antd"
//
// import boy from '../../../assets/images/boy.png'
// import doraemon from '../../../assets/images/doraemon.png'
// import sheep from '../../../assets/images/sheep.png'
// import wolf from '../../../assets/images/wolf.png'
//
// const {Meta} = Card
//
//
// function TopPanel() {
//   return (
//       <div className="topPanel-box">
//         <Card
//             hoverable
//             style={{
//               width: 300,
//             }}
//             cover={<img alt="example" src={boy} />}
//         >
//           <Meta title="boy" description="铁臂阿童木" />
//         </Card>
//
//         <Card
//             hoverable
//             style={{
//               width: 300,
//             }}
//             cover={<img alt="example" src={doraemon} />}
//         >
//           <Meta title="doraemon" description="哆啦A梦" />
//         </Card>
//
//         <Card
//             hoverable
//             style={{
//               width: 300,
//             }}
//             cover={<img alt="example" src={sheep} />}
//         >
//           <Meta title="sheep" description="喜洋洋" />
//         </Card>
//
//         <Card
//             hoverable
//             style={{
//               width: 300,
//             }}
//             cover={<img alt="example" src={wolf} />}
//         >
//           <Meta title="wolf" description="灰太狼" />
//         </Card>
//       </div>
//   )
// }
//
// export default TopPanel

import React from 'react'
import {Card} from "antd"

const {Meta} = Card

function TopPanel(props) {
  return (
      <>
        <Card
            hoverable
            style={{width: 300}}
            cover={<img src={props.img} alt="show picture" style={{height: 300}} />}
        >
          <Meta title={props.title} description={props.desc} />
        </Card>
      </>
  )
}

export default TopPanel
