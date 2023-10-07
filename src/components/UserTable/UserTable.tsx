import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { fetchData } from '../../api/user';
import { UserData } from '../../models/userTypes';
import './styles.css';

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const itemsPerPage = 6;

    useEffect(() => {
        const retrieveData = async () => {
            const data = await fetchData();
            if (data) setUsers(data);
        };
        retrieveData();
    }, []);

    const handleSort = (field: keyof UserData) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    
        setUsers(users.slice().sort((a, b) => {
            const valA = a[field];
            const valB = b[field];
    
            if (typeof valA === 'string' && typeof valB === 'string') {
                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            } else if (typeof valA === 'number' && typeof valB === 'number') {
                return sortOrder === 'asc' ? valA - valB : valB - valA;
            }
    
            return 0;
        }));
    };

    const getSortSymbol = (field: keyof UserData) => {
        if (sortField !== field) return;
        return sortOrder === 'asc' ? '↑' : '↓';
    };
    
    const displayedData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => handleSort('id')}>
                            id 
                            {getSortSymbol('id')}
                        </th>
                        <th 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => handleSort('first_name')}>
                            first_name 
                            {getSortSymbol('first_name')}
                        </th>
                        <th>middle_name</th>
                        <th>last_name</th>
                        <th 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => handleSort('email_id')}>
                            email_id 
                            {getSortSymbol('email_id')}
                        </th>
                        <th>mobile_no</th>
                        <th>dob</th>
                        <th>gender</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.middle_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email_id}</td>
                            <td>{user.mobile_no}</td>
                            <td>{user.dob}</td>
                            <td>{user.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item key={idx} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
            </Pagination>
        </>
    );
}

export default UserTable;
