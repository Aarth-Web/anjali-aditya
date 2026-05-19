type ContinueButtonProps = {
  label?: string
  onClick: () => void
}

export function ContinueButton({ label = 'Continue', onClick }: ContinueButtonProps) {
  return (
    <button type="button" className="btn-continue" onClick={onClick}>
      {label}
    </button>
  )
}
