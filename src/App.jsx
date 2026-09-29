import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Моя первая запись' },
  ])
  const [activeId, setActiveId] = useState(1)
  const [search, setSearch] = useState('')

  const activeNote = notes.find((note) => note.id === activeId)

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  )

  function addNote() {
    const newNote = { id: Date.now(), text: '' }
    setNotes([...notes, newNote])
    setActiveId(newNote.id)
  }

  function changeText(event) {
    setNotes(
      notes.map((note) =>
        note.id === activeId ? { ...note, text: event.target.value } : note
      )
    )
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id))
    if (id === activeId) {
      setActiveId(null)
    }
  }

  function getTitle(text) {
    if (text.trim() === '') {
      return 'Новая запись'
    }
    return text.slice(0, 20)
  }

  return (
    <div className="notepad">
      <div className="menu">
        <button className="add-btn" onClick={addNote}>
          + Новая запись
        </button>

        <input
          className="search"
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <ul>
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              className={note.id === activeId ? 'active' : ''}
              onClick={() => setActiveId(note.id)}
            >
              <span>{getTitle(note.text)}</span>
              <button
                className="delete-btn"
                onClick={(event) => {
                  event.stopPropagation()
                  deleteNote(note.id)
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {filteredNotes.length === 0 && <p className="empty">Ничего не найдено</p>}
      </div>

      <div className="editor">
        {activeNote ? (
          <textarea
            value={activeNote.text}
            onChange={changeText}
            placeholder="Начните писать..."
          />
        ) : (
          <p className="empty">Выберите запись слева или создайте новую</p>
        )}
      </div>
    </div>
  )
}

export default App