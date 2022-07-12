import React from 'react'

import Editor from "../../components/Editor/Editor"
import {useParams} from "react-router-dom"

function Edit(props) {
  const params = useParams()
  console.log(params)

  return (
      <div>
        <Editor/>
      </div>
  )
}

export default Edit
