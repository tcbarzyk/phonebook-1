const Persons = ({persons, onClick}) => {
    return (
        <ul>
            {persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => onClick(person.name, person.id)}>delete</button></li>)}
        </ul>
    )
}

export default Persons