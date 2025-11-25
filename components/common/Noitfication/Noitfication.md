# NotificationModal 사용법

## Header에 추가하는 방법

### 1. Import 추가

```typescript
import NotificationModal, {
  Notification,
} from "@/components/common/Notification/NotificationModal";
```

### 2. 상태 추가

```typescript
const [open, setOpen] = useState(false);
const [notifications, setNotifications] = useState<Notification[]>([...]);

const handleDelete = (id: string) => {
  setNotifications((prev) => prev.filter((n) => n.id !== id));
};
```

### 3. JSX에 추가

relative 필수
현재 알림 버튼이 없는거 같아서 임시로 사용했습니다

```tsx
<div className="relative">
  <button onClick={() => setOpen(true)}>알림</button>

  <NotificationModal
    open={open}
    onClose={() => setOpen(false)}
    items={notifications}
    onDeleteAlert={handleDelete}
  />
</div>
```

## Props

| Prop            | 타입                   | 설명           |
| --------------- | ---------------------- | -------------- |
| `open`          | `boolean`              | 모달 열림/닫힘 |
| `onClose`       | `() => void`           | 닫기 함수      |
| `items`         | `Notification[]`       | 알림 배열      |
| `onDeleteAlert` | `(id: string) => void` | 삭제 함수      |

## Notification 타입

```typescript
type Notification = {
  id: string;
  createdAt: string; // ISO 문자열
  shopName: string; // 가게명
  noticeTime: string; // "2023-01-14 15:00~18:00"
  result: "accepted" | "rejected";
  read: boolean;
};
```
