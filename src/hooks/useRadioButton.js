import {useState} from 'react'

export const useRadioButton = name => {
    const [value, setValue] = useState(null)

    const handleChange = e => {
        setValue(e.target.value)
    }

    const inputProps = {
        name,
        type: 'radio',
        onChange: handleChange
    }

    return [value, inputProps]
}