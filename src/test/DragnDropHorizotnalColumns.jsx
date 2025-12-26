import { useState } from 'react';
import { useDragSwap } from './hooks/useDragSwap';

function DragnDropHorizontalColumns() {
  const [items, setItems] = useState([
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ]);

  const { getItemProps, getHandleProps, containerRef } = useDragSwap({
    items,
    onReorder: setItems,
    gap: 16,
    direction: 'horizontal', // hoặc bỏ qua (mặc định là horizontal)
  });

  return (
    <div ref={containerRef} className="flex gap-4">
      {items.map((item) => (
        <div key={item.id} {...getItemProps(item)}>
          <div {...getHandleProps(item.id)}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}