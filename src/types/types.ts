export type Stock ={
  l18: string;
  l30: string;
  mv: number | string; 

    id: string;
    name: string;
    price: number;
    change: number;
    percentChange: number;
  };

  export type StockTableProps = {
    stocks: Stock[];
  };

  export type ChartData = {
    date: string;
    price: number;
  };
