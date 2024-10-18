import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import api from '../../api';

const PaymentsDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortAmount, setSortAmount] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const paymentsPerPage = 10;

  useEffect(() => {
    // Fetch payments from the API
    api.get('/api/payment/')
      .then(response => {
        const sortedPayments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by latest
        setPayments(sortedPayments);
        setFilteredPayments(sortedPayments);
      })
      .catch(error => console.error('Error fetching payments:', error));
  }, []);

  const handleSearch = () => {
    let filtered = payments;

    // Filter by email
    if (searchEmail) {
      filtered = filtered.filter(payment => payment.email.toLowerCase().includes(searchEmail.toLowerCase()));
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter(payment => {
        const paymentDate = new Date(payment.createdAt);
        return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
      });
    }

    // Sort by amount
    if (sortAmount === 'asc') {
      filtered = filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortAmount === 'desc') {
      filtered = filtered.sort((a, b) => b.amount - a.amount);
    }

    setFilteredPayments(filtered);
    setCurrentPage(0); // Reset to first page after filtering
  };

  // Handle pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Payments to display on the current page
  const paymentsToDisplay = filteredPayments.slice(currentPage * paymentsPerPage, (currentPage + 1) * paymentsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payments Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
        />
        <select
          onChange={(e) => setSortAmount(e.target.value)}
          value={sortAmount}
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/4"
        >
          <option value="">Sort by Amount</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {paymentsToDisplay.map(payment => (
          <div
            key={payment._id}
            className="bg-white border border-gray-200 p-4 rounded-md shadow-md flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-lg font-medium">{payment.email}</div>
            <div>
              <strong>Amount:</strong> ${payment.amount} {payment.currency.toUpperCase()}
            </div>
            <div>
              <strong>Status:</strong> {payment.status}
            </div>
            <div>
              <strong>Payment ID:</strong> {payment.paymentIntentId}
            </div>
            <div>
              <strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredPayments.length / paymentsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center space-x-4 mt-4'}
          pageClassName={'px-4 py-2 border border-gray-300 rounded-md'}
          activeClassName={'bg-blue-500 text-white'}
          previousClassName={'px-4 py-2 border border-gray-300 rounded-md'}
          nextClassName={'px-4 py-2 border border-gray-300 rounded-md'}
          disabledClassName={'opacity-50'}
        />
      </div>
    </div>
  );
};

export default PaymentsDashboard;
