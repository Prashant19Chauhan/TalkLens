
function Events({events}) {
  return (
    <div>
      <ul>
          {
            events.map((event, index) =>
                <li key={ index }>{ event }</li>
            )
          }
        </ul>
    </div>
  )
}

export default Events
