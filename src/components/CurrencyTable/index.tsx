import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

import { Checkbox } from '../ui/checkbox';
import { useCurrencyStore } from './store';

function SelectableCurrencyItem({ currency }: { currency: string }) {
  const { select, deselect, isSelected } = useCurrencyStore();

  const checked = isSelected(currency);

  return (
    <div
      className={cn(
        'flex min-w-24 items-center gap-1.5 border border-neutral-400 bg-neutral-200 p-1 text-xl  text-sky-900 hover:bg-neutral-300 sm:min-w-36',
        { 'bg-white': checked },
      )}
      onClick={() => {
        if (checked) {
          deselect(currency);
        } else {
          select(currency);
        }
      }}
    >
      <Checkbox checked={checked} />
      <label className="cursor-pointer" htmlFor={currency}>
        {currency}
      </label>
    </div>
  );
}

function CurrencyWithDeselectChip({ currency }: { currency: string }) {
  const { deselect } = useCurrencyStore();

  return (
    <div className="relative rounded-sm bg-neutral-200 p-1">
      {currency}
      <button
        className="absolute right-[-8px] top-[-8px] items-center justify-center rounded-full border-2 border-white bg-neutral-700 text-center text-2xl font-bold text-white hover:border-neutral-700 hover:bg-white hover:text-neutral-700"
        onClick={() => deselect(currency)}
      >
        <X width={14} height={14} />
      </button>
    </div>
  );
}

export default function CurrencyTable() {
  const store = useCurrencyStore();

  return (
    <div className="mx-auto flex w-fit flex-col gap-5 rounded border border-neutral-400 p-4 shadow-sm shadow-neutral-400 ">
      <div className="m-2 grid grid-cols-3 gap-4">
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
