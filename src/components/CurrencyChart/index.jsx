import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CurrencyChart = ({ chartData, selectedCurrency }) => {
  return (
    <div className="mt-8">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Döviz Grafiği - {selectedCurrency}/TRY</h4>
      <div className="h-64 w-full rounded-lg border border-gray-100 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} domain={['dataMin - 0.2', 'dataMax + 0.2']} />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrencyChart;