import React from 'react';

interface TimesheetEntry {
  week: number;
  dateRange: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
  action: 'View' | 'Update' | 'Create';
}

const timesheetData: TimesheetEntry[] = [
  { week: 1, dateRange: '1 - 5 January, 2024', status: 'COMPLETED', action: 'View' },
  { week: 2, dateRange: '8 - 12 January, 2024', status: 'COMPLETED', action: 'View' },
  { week: 3, dateRange: '15 - 19 January, 2024', status: 'INCOMPLETE', action: 'Update' },
  { week: 4, dateRange: '22 - 26 January, 2024', status: 'COMPLETED', action: 'View' },
  { week: 5, dateRange: '28 January - 1 February, 2024', status: 'MISSING', action: 'Create' },
];

const getStatusClasses = (status: TimesheetEntry['status']): string => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'INCOMPLETE':
      return 'bg-yellow-100 text-yellow-800';
    case 'MISSING':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-gray-800">ticktock</div>
            <nav className="hidden md:flex space-x-4 text-sm font-medium">
              <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">Timesheets</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">John Doe</span>
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
              JD
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Timesheets</h1>
          <div className="flex space-x-4 mb-8">
            <div className="relative">
              <select 
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm"
                defaultValue="Date Range"
              >
                <option disabled>Date Range</option>
                <option>This Week</option>
                <option>Last Week</option>
                <option>Last Month</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="relative">
              <select 
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm"
                defaultValue="Status"
              >
                <option disabled>Status</option>
                <option>All</option>
                <option>Completed</option>
                <option>Incomplete</option>
                <option>Missing</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    WEEK # <span className="text-gray-400">↓</span>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                    DATE <span className="text-gray-400">↓</span>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    STATUS <span className="text-gray-400">↓</span>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timesheetData.map((entry) => (
                  <tr key={entry.week}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.week}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.dateRange}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(entry.status)}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a 
                        href="#" 
                        className={entry.action === 'Create' || entry.action === 'Update' 
                          ? 'text-blue-600 hover:text-blue-900' 
                          : 'text-gray-600 hover:text-gray-900'}
                      >
                        {entry.action}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <select className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none text-sm" defaultValue="5 per page">
                <option>5 per page</option>
                <option>10 per page</option>
                <option>20 per page</option>
              </select>
              <span>per page</span>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </a>
              {['1', '2', '3', '4', '5', '6', '7', '8', '99'].map((page, index) => (
                <a
                  key={page}
                  href="#"
                  aria-current={page === '1' ? 'page' : undefined}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                    ${page === '1' ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}
                    ${index === 5 && 'hidden sm:inline-flex'}
                    ${page === '99' && 'ml-2'}
                  `}
                >
                  {page}
                </a>
              ))}
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </a>
            </nav>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
          © 2024 tentwenty. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
