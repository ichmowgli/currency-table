import { useCurrencyStore } from './store';

function SelectableCurrencyItem({ currency }: { currency: string }) {
  const { select, deselect, isSelected } = useCurrencyStore();

  return (
    <div className="bg-gray-300">
      <input
        type="checkbox"
        id={currency}
        checked={isSelected(currency)}
        onChange={(e) => {
          if (e.target.checked) {
            select(currency);
          } else {
            deselect(currency);
          }
        }}
      />
      <label htmlFor={currency}>{currency}</label>
    </div>
  );
}

function CurrencyWithDeselectChip({ currency }: { currency: string }) {
  const { deselect } = useCurrencyStore();

  return (
    <div className="bg-gray-300">
      {currency}{' '}
      <button className="text-red-600" onClick={() => deselect(currency)}>
        X
      </button>
    </div>
  );
}

export default function CurrencyTable() {
  const store = useCurrencyStore();

  return (
    <div className="mx-auto flex w-fit flex-col gap-5 border-2 border-red-600">
      <div className="m-2 grid  grid-cols-3 gap-2">
        {store.selected.map((c) => (
          <CurrencyWithDeselectChip currency={c} />
        ))}
      </div>
      <div className="m-2 grid grid-cols-3 gap-2">
        {store.currencies.map((c) => (
          <SelectableCurrencyItem currency={c} />
        ))}
      </div>
    </div>
  );
}
