import React, { useState } from 'react';

function DragAndDrop() {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, item: string) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const dragIndex = items.indexOf(draggedItem);
    if (index !== dragIndex) {
      const newItems = [...items];
      newItems.splice(dragIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setItems(newItems);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DragAndDrop;
