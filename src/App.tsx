import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://qiita.com/api/v2/items?query=${search}`
    );
    console.log(response);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        {results.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">検索結果</h2>
            <div className="space-y-4">
              {results.map(
                (result: { id: string; title: string; url: string }) => (
                  <div
                    key={result.id}
                    className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                  >
                    <a
                      className="text-lg font-semibold text-gray-800"
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {result.title}
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
