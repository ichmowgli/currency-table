import "./App.css";
import { create } from "zustand";

type CurrencyStore = {
  currencies: string[];
  selected: string[];
  isSelected: (currency: string) => boolean;
  select: (currency: string) => void;
  deselect: (currency: string) => void;
};

const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currencies: ["EUR", "PLN", "GEL", "DKK", "CZK", "GBP", "SEK", "USD", "RUB"],
  selected: [],
  isSelected: (c) => {
    return get().selected.includes(c);
  },
  select: (c) => {
    if (get().isSelected(c)) {
      return;
    }

    set({
      selected: get().selected.concat(c),
    });
  },
  deselect: (c) => {
    if (!get().isSelected(c)) {
      return;
    }

    set({
      selected: get().selected.filter((item) => item !== c),
    });
  },
}));

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
      {currency}{" "}
      <button className="text-red-600" onClick={() => deselect(currency)}>
        X
      </button>
    </div>
  );
}

function App() {
  const store = useCurrencyStore();

  return (
    <div className="border-2 border-red-600 flex flex-col w-fit mx-auto gap-5">
      <div className="grid grid-cols-3  gap-2 m-2">
        {store.selected.map((c) => (
          <CurrencyWithDeselectChip currency={c} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 m-2">
        {store.currencies.map((c) => (
          <SelectableCurrencyItem currency={c} />
        ))}
      </div>
    </div>
  );
}

export default App;