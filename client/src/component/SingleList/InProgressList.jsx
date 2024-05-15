import "./List.scss"

const InProgressList = ({inProgressList}) => {
  return (
    <div className="column__wrapper">
    <h2 className="column__title">{inProgressList.name}</h2>
      <ul className="column__list">
        {inProgressList.map((item) => (
          <li key={item.id} className="column__item">
            <input type="checkbox" className="column__item-copy"/>
            {item.body}
            <button onClick={() => handleOnClick(item.id)} className="column__item-button">Del</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InProgressList;