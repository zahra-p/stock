import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StockChart from "../components/StockChart";
import Tabs from "../components/Tabs";
import StockTable from "../components/StockTable";
import { Stock, ChartData } from "../types/types";

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [showTable1, setShowTable1] = useState(true);
  const [showTable2, setShowTable2] = useState(true);
  const [showTable3, setShowTable3] = useState(true);
  const [showTable4, setShowTable4] = useState(true);

  const chartData: ChartData[] = [
    { date: "2024-01-01", price: 100 },
    { date: "2024-01-02", price: 110 },
    { date: "2024-01-03", price: 105 },
    // Add more data points
  ];

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/api/stocks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Stock[] = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    const startLongPolling = () => {
      const pollInterval = setInterval(() => {
        fetchStocks();
      }, 5000);

      return () => clearInterval(pollInterval);
    };

    startLongPolling();
  }, []);

  return (
    <Layout>
      <Tabs>
        <Tabs.Tab label="در یک نگاه">
          <div className="relative rounded-xl shadow-2xl h-screen">
            <div className="w-full flex flex-row h-6 rounded-t font-bold bg-gray-400 text-black justify-start px-2">
              بورس اوراق بهادار تهران
            </div>
            <div
              className="w-full overflow-y-auto px-3 overflow-x-auto pb-2 h-full text-black text-sm font-sans bg-white"
              style={{ borderRadius: "0 0 0.375rem 0.375rem" }}
            >
              <div className="flex flex-col h-full">
                <div className="w-full">
                  <div className="flex items-center justify-between mt-2">
                    <div className="bg-gray-400 text-black font-bold flex items-center justify-start rounded-t px-2">
                      بازار نقدی بورس در یک نگاه
                    </div>
                    <input
                      type="checkbox"
                      checked={showTable1}
                      onChange={() => setShowTable1(!showTable1)}
                      className="mr-2"
                    />
                  </div>
                  {showTable1 && (
                    <div className="h-auto mb-2 border-gray-500 border bg-white text-black flex items-center justify-center rounded-b w-full">
                      <StockTable stocks={stocks} />
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between mt-2">
                    <div className="bg-gray-400 text-black font-bold flex items-center justify-start rounded-t px-2">
                      شاخص های منتخب
                    </div>
                    <input
                      type="checkbox"
                      checked={showTable2}
                      onChange={() => setShowTable2(!showTable2)}
                      className="mr-2"
                    />
                  </div>
                  {showTable2 && (
                    <div className="h-auto mb-2 border-gray-500 border bg-white text-black flex items-center justify-center rounded-b w-full">
                      <StockTable stocks={stocks} />
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between mt-2">
                    <div className="bg-gray-400 text-black font-bold flex items-center justify-start rounded-t px-2">
                      تاثیر بر شاخص
                    </div>
                    <input
                      type="checkbox"
                      checked={showTable3}
                      onChange={() => setShowTable3(!showTable3)}
                      className="mr-2"
                    />
                  </div>
                  {showTable3 && (
                    <div className="h-auto mb-2 border-gray-500 border bg-white text-black flex items-center justify-center rounded-b w-full">
                      <StockTable stocks={stocks} />
                    </div>
                  )}
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between mt-2">
                    <div className="bg-gray-400 text-black font-bold flex items-center justify-start rounded-t px-2">
                      نمادهای پرتراکنش
                    </div>
                    <input
                      type="checkbox"
                      checked={showTable4}
                      onChange={() => setShowTable4(!showTable4)}
                      className="mr-2"
                    />
                  </div>
                  {showTable4 && (
                    <div className="h-auto mb-2 border-gray-500 border bg-white text-black flex items-center justify-center rounded-b w-full">
                      <StockTable stocks={stocks} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Tabs.Tab>
        <Tabs.Tab label="بورس اوراق بهادار تهران">
          <StockChart data={chartData} />
        </Tabs.Tab>
      </Tabs>
    </Layout>
  );
};

export default Home;
