export interface Props {
  children: React.ReactNode
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  disabled?: boolean
  modal: any
  selectedIdRow?: string
  onClose: () => void
}