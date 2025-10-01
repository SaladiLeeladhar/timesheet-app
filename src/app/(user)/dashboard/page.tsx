"use client";

import React, { use, useState } from "react";

interface TimesheetEntry {
  id: number;
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
}

const initialData: TimesheetEntry[] = [
  { id: 1, week: 1, dateRange: "1 - 5 January, 2024", status: "COMPLETED" },
  { id: 2, week: 2, dateRange: "8 - 12 January, 2024", status: "COMPLETED" },
  { id: 3, week: 3, dateRange: "15 - 19 January, 2024", status: "INCOMPLETE" },
  { id: 4, week: 4, dateRange: "22 - 26 January, 2024", status: "COMPLETED" },
  { id: 5, week: 5, dateRange: "28 January - 1 February, 2024", status: "MISSING" },
];

const getStatusClasses = (status: TimesheetEntry["status"]) => {
  switch (status) {
    case "COMPLETED": return "bg-green-100 text-green-800";
    case "INCOMPLETE": return "bg-yellow-100 text-yellow-800";
    case "MISSING": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Dashboard: React.FC = () => {
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);
  const [formData, setFormData] = useState({ week: "", dateRange: "", status: "COMPLETED" });

  const openAddModal = () => {
    setEditingEntry(null);
    setFormData({ week: "", dateRange: "", status: "COMPLETED" });
    setModalOpen(true);
  };

  const openEditModal = (entry: TimesheetEntry) => {
    setEditingEntry(entry);
    setFormData({ week: entry.week.toString(), dateRange: entry.dateRange, status: entry.status });
    setModalOpen(true);
  };

  const deleteEntry = (id: number) => {
    if (confirm("Are you sure you want to delete this timesheet?")) {
      setTimesheets(timesheets.filter((e) => e.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { week, dateRange, status } = formData;
    if (!week || !dateRange || !status) return;
    if (editingEntry) {
      setTimesheets(timesheets.map((t) => t.id === editingEntry.id ? { ...t, week: +week, dateRange, status: status as TimesheetEntry["status"] } : t));
    } else {
      const newEntry: TimesheetEntry = { id: Date.now(), week: +week, dateRange, status: status as TimesheetEntry["status"] };
      setTimesheets([newEntry, ...timesheets]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800">ticktock</div>
          <button onClick={openAddModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Timesheet</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Timesheets</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Week #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timesheets.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{entry.week}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{entry.dateRange}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(entry.status)}`}>{entry.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <button onClick={() => openEditModal(entry)} className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button onClick={() => deleteEntry(entry.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingEntry ? "Edit Timesheet" : "Add Timesheet"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="number" placeholder="Week #" value={formData.week} onChange={(e) => setFormData({ ...formData, week: e.target.value })} required className="w-full border px-3 py-2 rounded" />
              <input type="text" placeholder="Date Range" value={formData.dateRange} onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })} required className="w-full border px-3 py-2 rounded" />
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border px-3 py-2 rounded">
                <option value="COMPLETED">COMPLETED</option>
                <option value="INCOMPLETE">INCOMPLETE</option>
                <option value="MISSING">MISSING</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">{editingEntry ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
