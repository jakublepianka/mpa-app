import { useEffect, useRef } from "react";

function App() {
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    fetch("/api/analyze?term=vitamin+d+supplementation", {
      headers: {
        "client-id": "09cd72ff-5b78-4acf-bc91-0ff66eeae89e",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });
  }, []);

  return <h1>Hello world</h1>;
}

export default App;
