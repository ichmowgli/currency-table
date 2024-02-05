import { create } from 'zustand';

type CurrencyStore = {
  currencies: string[];
  selected: string[];
  isSelected: (currency: string) => boolean;
  select: (currency: string) => void;
  deselect: (currency: string) => void;
};

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currencies: ['EUR', 'PLN', 'GEL', 'DKK', 'CZK', 'GBP', 'SEK', 'USD', 'RUB'],
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
