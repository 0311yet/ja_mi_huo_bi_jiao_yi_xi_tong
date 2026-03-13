import { ProfitPoint, TimeRange } from "@/types/trading";

export const totalProfitByRange: Record<TimeRange, ProfitPoint[]> = {
  "1D": [
    { time: "09:00", value: 121840 },
    { time: "10:00", value: 122120 },
    { time: "11:00", value: 122690 },
    { time: "12:00", value: 122420 },
    { time: "13:00", value: 123100 },
    { time: "14:00", value: 123560 },
    { time: "15:00", value: 124582.4 },
  ],
  "1W": [
    { time: "Mon", value: 118420 },
    { time: "Tue", value: 117900 },
    { time: "Wed", value: 119450 },
    { time: "Thu", value: 117200 },
    { time: "Fri", value: 120380 },
    { time: "Sat", value: 119780 },
    { time: "Sun", value: 124582.4 },
  ],
  "1M": [
    { time: "W1", value: 108120 },
    { time: "W2", value: 112490 },
    { time: "W3", value: 117030 },
    { time: "W4", value: 124582.4 },
  ],
  ALL: [
    { time: "Jan", value: 71200 },
    { time: "Feb", value: 75440 },
    { time: "Mar", value: 80210 },
    { time: "Apr", value: 85600 },
    { time: "May", value: 90220 },
    { time: "Jun", value: 95440 },
    { time: "Jul", value: 100600 },
    { time: "Aug", value: 109220 },
    { time: "Sep", value: 112430 },
    { time: "Oct", value: 118420 },
    { time: "Nov", value: 124582.4 },
  ],
};
