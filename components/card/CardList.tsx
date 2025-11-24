import Card from "./Card";
import type { CardProps } from "./Card"; 

type CardListProps = {
  items: CardProps[];
};

// 여러개의 Card를 받아 그리드 형태로 렌더링하는 리스트 레이아웃 
export default function CardList({ items}: CardListProps) {
  return (
      <div className="max-w-[964px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
  );
}
