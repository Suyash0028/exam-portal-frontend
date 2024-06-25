import React from 'react';
import { Table } from 'react-bootstrap';
import { approveUser, rejectUser } from '../../../Utils/UserService';
import { toast } from 'react-toastify';

interface UserListProps {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {

  const onApproveBtnClick = async (userId: string) => {
    try {
      await approveUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isApproved: true } : user
        )
      );
      toast.success('User approved successfully.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Approval error:', error);
    }
  };

  const onRejectBtnClick = async (userId: string) => {
    try {
      await rejectUser(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isApproved: false } : user
        )
      );
      toast.success('User rejected successfully.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Rejection error:', error);
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-numeric characters from the phone number
    const numericOnly = phoneNumber.replace(/\D/g, '');

    // Format the number based on your requirements
    // Example: Format as (XXX) XXX-XXXX for US numbers
    const formattedNumber = `(${numericOnly.substring(0, 3)}) ${numericOnly.substring(3, 6)}-${numericOnly.substring(6, 10)}`;

    return formattedNumber;
  };

  return (
    <Table striped bordered responsive className='mt-5'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{formatPhoneNumber(user.contactNumber)}</td>
            <td>{user.isApproved ? 'Approved' : 'Not Approved'}</td>
            <td>
              {!user.isApproved ? (
                <button className="btn btn-success" onClick={() => onApproveBtnClick(user._id)}>Approve</button>
              ) : (
                <button className="btn btn-danger" onClick={() => onRejectBtnClick(user._id)}>Reject</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
