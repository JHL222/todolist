import React, { useState } from 'react';
import './App.css';
import { FaRegCircle, FaRegCheckCircle, FaTrash } from "react-icons/fa";

const CustomDate = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  return (
    <div className='date'>
      {formattedDate}
    </div>
  );
}


function Header() {
  return (
    <header>
      <div className='todotop'>
        <h1>
          <CustomDate />
        </h1>
        <hr />
      </div>
    </header>
  )
}

function Nav(props) {
  const topics = props.topics || [];
  const handleDelete = (id) => {
    const updatedTopics = topics.filter(topic => topic.id !== id);
    props.onDelete(updatedTopics);
  };

  let lis = []
  lis = topics.map((t) =>
    <div key={t.id} className="navigation">
      <div className='check' onClick={() => props.onLike(t.id)}>
        {t.like ? <FaRegCheckCircle /> : <FaRegCircle />}
      </div>
      <li className={`navi ${t.like ? 'liked' : ''}`}>
        <h3>{t.title}</h3>
      </li>
      <button className='deletebutton' onClick={() => handleDelete(t.id)}>
        <FaTrash />
      </button>
    </div>
  );
  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>

  )
}

function Article({ title }) {
  return (
    <article>
      <h2>{title}</h2>

    </article>
  )
}
function Create(props) {
  return (
    <article>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        props.onCreate(title);
      }}>
        <p><input type='text' className='title' name='title' placeholder='작성 후 Enter를 눌러주세요.' autoFocus/></p>
        <input className='titlebutton' type='submit' />
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('READ')
  const [id, setID] = useState()
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
  ]);

  const handleLike = (id) => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === id ? { ...topic, like: !topic.like } : topic
      )
    );
  };

  const handleDelete = (updatedTopics) => {
    setTopics(updatedTopics);
  };

  let content = null;

  if (mode === "READ") {
    let title = null;
    content = <Article title={title} />

  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title }
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setID(nextId);
      setNextId(nextId + 1);
    }}></Create>

  }

  return (
    <div className="App">
      <Header />
      <div className="navitap">
        <Nav onDelete={handleDelete} onChangeMode={(id) => { console.log(id); setMode("READ"); setID(id) }} onLike={handleLike} topics={topics} />
      </div>
      <div>
        <hr />
        <button className={`createbutton ${mode === 'CREATE' ? 'rotate' : ''}`} onClick={event => {
          event.preventDefault();
          setMode(mode === 'READ' ? 'CREATE' : 'READ');
        }}>+</button>
      </div>
      {content}
    </div>
  );
}

export default App;