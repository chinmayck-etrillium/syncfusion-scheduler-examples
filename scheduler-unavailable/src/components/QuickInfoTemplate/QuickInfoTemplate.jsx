export default function QuickInfoTemplates(props) {
  return (
    <>
      <div className="quick-info-popup">
        <div>
          <h4>{props.Subject}</h4>
          <p>{props.Location}</p>
          <p>{props.Description}</p>
          {/* Custom Link */}
          <div>
            <a
              href={props.MeetLink} // Assuming 'CustomLink' is part of your event data
              target="_blank"
              rel="noopener noreferrer"
              className="custom-link"
            >
              Meet Link
            </a>
          </div>
        </div>
        <div className="quick-info-actions">
          <button onClick={() => props.onEditClick()}>Edit</button>
          <button onClick={() => props.onDeleteClick()}>Delete</button>
        </div>
      </div>
    </>
  );
}
