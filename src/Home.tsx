import { Link } from "react-router-dom";
import { PostArray } from "./App";

function Home({ postArray }: { postArray: PostArray[] }) {
  return (
    <>
      <div>
        <Link to={`/new`}>
          <button>Create</button>
        </Link>
        <button>Edit Tags</button> {/*Ek modal bn ke aaega */}
      </div>
      {postArray.map((e) => (
        <Link to={`/${e.id}`}>
          <div>
            <h2>{e.title}</h2>
            <div>
              <h2>
                {e.tags.map((e) => (
                  <button style={{ marginLeft: "1rem" }}>{e.name}</button>
                ))}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Home;
