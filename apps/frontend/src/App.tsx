import { useEffect, useRef } from "react";

function App() {
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    fetch("/api/search?term=strength+training")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

  }, []);


  return <h1>Hello world</h1>;
}

export default App;
