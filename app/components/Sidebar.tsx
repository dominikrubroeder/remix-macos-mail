type Box = "Favoriten" | "Intelligente Postfächer" | "iCloud";

const boxes: Box[] = ["Favoriten", "Intelligente Postfächer", "iCloud"];
export default function Sidebar() {
  return (
    <div className="overflow-hidden overflow-y-scroll border-r bg-gray-100 p-4">
      <ul className="grid gap-8">
        {boxes.map((box) => (
          <li key={box}>{box}</li>
        ))}
      </ul>
    </div>
  );
}
