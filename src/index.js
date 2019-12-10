import React, { Suspense, useState, useTransition } from "react";
import ReactDOM from "react-dom";
import { fetchUserData } from './fakeApi';
import './styles.css';

const getNextUserId = (id) => id === 3 ? 0 : id + 1;

const App = () => {
  const [withTransition, setWithTransition] = useState(true);
  const [resources, setResources] = useState(fetchUserData(0));
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  const refreshResources = () => {
    const nextUserId = getNextUserId(resources.userId);
    setResources(fetchUserData(nextUserId));
  };

  const getClickHandler = () => {
    if (!withTransition) return refreshResources;

    return () => {
      startTransition(refreshResources)
    }
  }

  return (
    <div className="container">

      <div className="controls-group">
        <label>
          With delay
          <input
            type="checkbox"
            checked={withTransition}
            onChange={() => setWithTransition(!withTransition)}
          />
        </label>
      </div>

      <div className="next-button-row">
        <button
          onClick={getClickHandler()}
          disabled={isPending}
        >
          Next Artist
        </button>
        <p className="pending-text">{isPending ? 'Loading...' : null}</p>
      </div>

      <Raper raper={resources.raper} songs={resources.songs} />
    </div>
  )
};

const Raper = ({ raper, songs }) => {

  return (
    <Suspense fallback={<div>Loading raper name...</div>}>
      <Details raper={raper} />
      <Suspense fallback={<div>Loading songs....</div>}>
        <Songs songs={songs} />
      </Suspense>
    </Suspense>
  )
};

const Details = ({ raper  }) => {
  const { name: rapperName, image } = raper.read();

  return (
    <div className="raper-name-container">
      <h1>{rapperName}</h1>
      <img src={image} alt={rapperName} className="raper-image"/>
    </div>
  )
}

const Songs = ({ songs = [] }) => {
  const rapperSongs = songs.read();
  return (
    <ul>
      {rapperSongs.map(song => (
        <li key={song.id}>{song.text}</li>
      ))}
    </ul>
  );
}

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(<App />);
