import { useEffect } from "react";

function App() {
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/search?term=strength+training", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, []);


  return <h1>Hello world</h1>;
}

export default App;
