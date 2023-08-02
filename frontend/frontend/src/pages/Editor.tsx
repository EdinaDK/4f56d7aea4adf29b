
import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import { Controlled as ControlledEditor } from 'react-codemirror2'  

export function Editor(props:any) {
  const {
    language,
    value,
    onChange
  } = props

  function handleChange(editor:any, data:any, value:any) {
    onChange(value)
  }

  return (
    <ControlledEditor
    onBeforeChange={handleChange}
    value={value}
    className="code-mirror-wrapper"
    options={{
      lineWrapping: true,
      lint: true,
      theme: "material",
      mode: language,
      lineNumbers: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      spellcheck: true
    }}
  />

  )
}