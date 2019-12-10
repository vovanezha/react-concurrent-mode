import AsapRockyImage from './assets/A$AP_ROCKY.jpg';
import BigSeanImage from './assets/BIG_SEAN.jpg';
import MetroBoominImage from './assets/METRO_BOOMIN.jpg';
import TylerTheCreatorImage from './assets/TYLER_THE_CREATOR.jpg';

export function fetchUserData(userId) {
  const raperPromise = fetchRaper(userId);
  const songsPromise = fetchRaperSongs(userId);

  return {
    userId,
    raper: wrapPromise(raperPromise),
    songs: wrapPromise(songsPromise),
  }
}

function wrapPromise(promise) {
  let status = 'pending';
  let result;
  const suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e
    }
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  }
}

function fetchRaper(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (userId) {
        case 0: resolve({ name: 'Big Sean', image: BigSeanImage }); break;
        case 1: resolve({ name: 'A$AP Rocky', image: AsapRockyImage }); break;
        case 2: resolve({ name: 'Tyler, The Creator', image: TylerTheCreatorImage  }); break;
        case 3: resolve({ name: 'Metro Boomin', image: MetroBoominImage }); break;
        default: throw Error('Unknown user');
      }
    }, 1000 * Math.random())
  })
}

function fetchRaperSongs(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (userId) {
        case 0: resolve([
          { id: 0, text: 'Bounce Back' },
          { id: 1, text: 'No Favors' },
          { id: 2, text: 'I Don\'t F**k With You' },
          { id: 3, text: 'Who\'s Stopping Me' },
        ]);
        break;
        case 1: resolve([
          { id: 0, text: 'A$AP Forever' },
          { id: 1, text: 'Tony Tone' },
          { id: 2, text: 'F**k Sleep' },
          { id: 3, text: 'Lord Pretty Flacko Jodye 2' },
        ]);
        break;
        case 2: resolve([
          { id: 0, text: 'Earfquake' },
          { id: 1, text: 'Who Dat Boy' },
          { id: 2, text: 'See You Again' },
          { id: 3, text: 'Lights On' },
        ]);
        break;
        case 3: resolve([
          { id: 0, text: 'Rick Flair Drip' },
          { id: 1, text: 'Ghostface Killers' },
          { id: 2, text: 'X' },
          { id: 3, text: 'Rap Saved Me' },
        ]);
        break;
        default: throw Error('Unknown user id')
      }
    }, 4000 * Math.random())
  })
}
