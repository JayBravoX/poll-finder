const EXAMPLES = [
  'Animals are cute',
  'Traditional marriage is better than progressive',
  'Marijuana should be legal',
  'Aliens exist',
  'Gun laws should be stricter',
  'Pineapple belongs on pizza',
];

interface ExampleChipsProps {
  onPick: (query: string) => void;
}

export function ExampleChips({ onPick }: ExampleChipsProps) {
  return (
    <div className="example-chips">
      <span className="example-chips-label">Try:</span>
      {EXAMPLES.map((ex) => (
        <button key={ex} type="button" className="chip" onClick={() => onPick(ex)}>
          {ex}
        </button>
      ))}
    </div>
  );
}
