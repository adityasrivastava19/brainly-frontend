import { PluseIcon } from "../icon/plusicon";
import { ShareIcon } from "../icon/shareicon";
import { useState } from 'react';
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { CreateModal } from "../component/ui/createModeal";
import { SideBar } from "../component/ui/sideBar";
import type { FormValues } from "../component/ui/createModeal";

export function Dashboard() {
  const [modelopen, setmodal] = useState(false);
  const [cards, setCards] = useState<FormValues[]>([]);

  function addCard(card: FormValues) {
    setCards(prev => [...prev, card]);
  }

  return (
    <div className="h-screen">

      <CreateModal open={modelopen} onClose={() => setmodal(false)} onAddCard={addCard}/>

      <div
        className={modelopen ? "pointer-events-none" : ""} aria-hidden={modelopen}>

        <div className="flex h-screen">

          <div>
            <SideBar />
          </div>

          <div className="ml-50 flex-1 bg-gray-100">

            <div className="flex gap-2 p-4 justify-end">
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

            <div className="h-[calc(100vh-80px)] overflow-y-auto">
              <div className="flex flex-wrap gap-2 p-4">
                {cards.map((card, index) => (
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