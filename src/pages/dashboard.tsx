import { PluseIcon } from "../icon/plusicon";
import { ShareIcon } from "../icon/shareicon";
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { CreateModal } from "../component/ui/createModeal";
import { SideBar } from "../component/ui/sideBar";
import type { FormValues } from "../component/ui/createModeal";

export function Dashboard() {
  const [modelopen, setmodal] = useState(false);
  const [cards, setCards] = useState<FormValues[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FormValues[]>([]);
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/content", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message ?? "Failed to load content");
        }

        setCards(result.content ?? []);
      } catch (error) {
        setSearchError(error instanceof Error ? error.message : "Failed to load content");
      }
    }

    void loadContent();
  }, []);

  async function addCard(card: FormValues) {
    try {
      const response = await fetch("http://localhost:3000/api/v1/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
        body: JSON.stringify({
          title: card.title,
          link: card.link,
          type: card.type,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to create content");
      }

      console.log("Backend response:", result);

      setCards(prev => [...prev, result.content ?? card]);
      setmodal(false);

    } catch (error) {
      console.error("Error creating content:", error);
    }
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      setSearchError('');
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    setIsSearching(true);
    setSearchError('');

    try {
      const response = await fetch(`http://localhost:3000/api/v1/search?q=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? 'Search failed');
      }

      setSearchResults(result.content ?? []);

    } catch (error) {
      setSearchResults([]);
      setSearchError(error instanceof Error ? error.message : 'Search failed');

    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="h-screen">

      <CreateModal
        open={modelopen}
        onClose={() => setmodal(false)}
        onAddCard={addCard}
      />

      <div
        className={modelopen ? "pointer-events-none" : ""}
        aria-hidden={modelopen}
      >

        <div className="flex h-screen">

          <div>
            <SideBar />
          </div>

          <div className="ml-50 flex-1 bg-gray-100">

            <div className="flex flex-wrap gap-2 p-4 justify-between">

              <form onSubmit={handleSearch} className="flex gap-2">

                <input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setHasSearched(false);
                  }}
                  placeholder="Search your brain"
                  className="w-64 rounded-md border border-slate-300 bg-white px-3 py-2"
                />

                <Button
                  variant="secondary"
                  size="md"
                  text={isSearching ? 'Searching...' : 'Search'}
                  type="submit"
                />

              </form>

              <div className="flex gap-2">

                <Button
                  variant='secondary'
                  startIcon={<ShareIcon />}
                  size="md"
                  text='Share Brain'
                />

                <Button
                  variant='primary'
                  startIcon={<PluseIcon />}
                  size="md"
                  text='Add Content'
                  onClick={() => setmodal(true)}
                />

              </div>

            </div>

            {searchError && (
              <p className="px-4 text-red-600">
                {searchError}
              </p>
            )}

            {!isSearching &&
              hasSearched &&
              !searchError &&
              searchResults.length === 0 && (
                <p className="px-4 text-slate-600">
                  No content found.
                </p>
              )}

            <div className="h-[calc(100vh-80px)] overflow-y-auto">

              <div className="flex flex-wrap gap-2 p-4">

                {(hasSearched ? searchResults : cards).map((card, index) => (
                  <Card
                    key={`${card.title}-${index}`}
                    {...card}
                  />
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}