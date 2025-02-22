import React from "react"
import dottedface from "/images/dottedface.gif"

export default function DottedFace(props: any) {
  return (
    <div className="flex justify-center items-center">
      <img src={dottedface} alt="loading..." width={200} height={200} />
    </div>
  )
}
