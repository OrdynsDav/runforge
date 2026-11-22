import { useContext } from 'react'
import { DevSettingsContext } from '../context/DevSettings/DevSettingsContext'

export function useDevSettings() {
  return useContext(DevSettingsContext)
}