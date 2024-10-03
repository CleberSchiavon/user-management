import React from 'react'

export type SelectOptions = {
  name: string
  value: string | number
  disabled?: boolean
  selected?: boolean
}

interface ISelect {
  options: SelectOptions[]
  selectDisabled?: boolean
  label?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<ISelect> = ({ options, label, onChange, selectDisabled }) => {
  return (
    <label className="form-controller w-full max-w-xs">
      <div className="label">
        <span className="label-text text-gray-500">{label}</span>
      </div>
      <select
        className="select w-full max-w-xs bg-white"
        onChange={onChange}
        disabled={selectDisabled}
      >
        {options?.map((option, index) => (
          <option
            key={index}
            disabled={option.disabled}
            value={option.value}
            selected={option.selected}
          >
            {option.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
