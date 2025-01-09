import { create } from "zustand";

export const useStore = create((set) => ({
  discounts: { date: 0, options: 0, menu: 0 },
  guests: 0,
  total: [],
  resetDateTime: (id) => {
    set((state) => ({
      total: state.total.map((item) =>
        item.id === id
          ? {
              ...item,
              date: item.date,
              time: [NaN, NaN],
              price: 0,
              amount: 0,
              type: "date",
            }
          : item
      ),
    }));
  },
  changeDiscount: (type, newDiscount) => {
    set((state) => ({
      discounts: {
        ...state.discounts,
        [type]: newDiscount,
      },
    }));
  },
  changeDate: (newDate, id) => {
    set((state) => ({
      total: state.total.map((item) =>
        item.id === id ? { ...item, date: newDate } : item
      ),
    }));
  },
  changeTime: (newTime, price, id) => {
    set((state) => ({
      total: state.total.map((item) =>
        item.id === id ? { ...item, time: newTime, price } : item
      ),
    }));
  },
  initTotal: (items) => set(() => ({ total: items })),
  changeAmount: (id, amount, price) =>
    set((state) => ({
      total: state.total.map((item) =>
        item.id === id ? { ...item, amount, price: price || item.price } : item
      ),
    })),
  changeGuests: (people) =>
    set(() => ({
      guests: people,
    })),
  resetByType: (type) =>
    set((state) => ({
      total: state.total.map((item) =>
        item.type === type ? { ...item, amount: 0 } : item
      ),
    })),
}));
