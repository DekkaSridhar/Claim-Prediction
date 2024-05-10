import React, { useEffect, useState } from 'react';

interface User {
  PatientName: string;
  MostImportantFeatures: string[];
}

interface Props {
  users: User[];
}

const UserList: React.FC<Props> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    console.log(users)
  })

  return (
    <div className='h-screen flex items-center justify-center flex-row'>
        <div className="flex h-screen items-center justify-center z-40 w-5/6">
        <div className="flex-1 h-1/2 z-50 justify-center items-center overflow-y-scroll w-1/2">
            <h2 className=" pl-40 font-poppins text-lg font-bold z-40 mb-3">Potential Patients:</h2>
            <ul className='flex flex-col pl-40 justify-center'>
            {users.map((user, index) => (
                
                <li key={index} onClick={() => handleUserClick(user)} className="font-poppins cursor-pointer hover:text-blue-500">
                {user.PatientName}
                </li>
            ))}
            </ul>
        </div>
        <div className="flex-1 ml-4 h-1/2 items-center justify-center z-50 w-1/2">
            {selectedUser && (
            <div>
                <h2 className="font-poppins text-lg font-bold z-50 mb-3">Key Features of Denial for {selectedUser.PatientName}:</h2>
                <ul className='font-poppins flex flex-col pl-32 justify-center'>
                {selectedUser.MostImportantFeatures.map((cause, index) => (
                    <li key={index}>{cause}</li>
                ))}
                </ul>
            </div>
            )}
        </div>
        </div>
    </div>
  );
};

export default UserList;
