import React from 'react'
import { Select } from '@chakra-ui/react'

const LangSelectDropdown = ({ handleSelect, defaultValue }) => {
  return (
    <Select placeholder='Select Language...' size='sm' defaultValue={defaultValue} onChange={(e) => handleSelect(e.target.value)} >
      <option value='EN'>English</option>
      <option value='FI'>Finnish</option>
      <option value='DE'>German</option>
      <option value='PT'>Portuguese</option>
    </Select>
  )
}

export default LangSelectDropdown