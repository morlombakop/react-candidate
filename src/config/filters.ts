const baseMessage = 'reactCandidate.filter.checkbox.'

// The name column will not be added to the filters, might be a mistake in the requirement.
// I makes more senses to use sort than filter by applicant name.
// We could add a search feature to handle filter by name.
const filters = [
  {
    column: 'status',
    titleLabel: 'reactCandidate.actionHeader.text.status',
    inputs: [
      {
        name: 'approved',
        displayText: `${baseMessage}approved`,
      },
      {
        name: 'waiting',
        displayText: `${baseMessage}waiting`,
      },

      {
        name: 'rejected',
        displayText: `${baseMessage}rejected`,
      },
    ],
  },
  {
    column: 'position_applied',
    titleLabel: 'reactCandidate.actionHeader.text.positionApplied',
    inputs: [],
  },
]

export default filters
