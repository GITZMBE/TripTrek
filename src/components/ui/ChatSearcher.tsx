'use client';

import { request } from '@/src/utils';
import { User } from '@prisma/client';
import React, { ComponentPropsWithoutRef, Dispatch, LegacyRef, SetStateAction, useEffect, useState } from 'react';
import Icon from './Icon';
import { RxCross2 } from 'react-icons/rx';
import { useCurrentUser, useToggleMenu } from '@/src/hooks';

interface IProps extends ComponentPropsWithoutRef<"input"> {
  setChatWith: Dispatch<SetStateAction<string | null>>;
};

export const ChatSearcher = ({ setChatWith, ...props }: IProps) => {
  const { currentUser: user } = useCurrentUser();
  const { isOpen, setIsOpen, navComponent } = useToggleMenu();
  const [users, setUsers] = useState<User[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null | undefined>(null);

  const host = window.location.origin;

  const getUsers = async () => {
    const uri = '/api/users';
    const options: RequestInit = {
      method: 'GET'
    };
    const data = await request<User[]>(host, uri, options) || [];
    return data;
  };
  
  useEffect(() => {
    getUsers().then(setUsers);
  }, [])
  
  return (
    <div
      className='w-full relative flex flex-col items-center'
      ref={navComponent as LegacyRef<HTMLDivElement>}
    >
      <div className='relative w-full px-4 flex items-center gap-2'>
        { selectedUser && (
          <div className='flex items-center gap-2 p-2 rounded-full bg-secondary'>
            { (selectedUser?.avatar || selectedUser?.image) ? (
              <img src={ selectedUser.avatar || selectedUser.image || '' } className='w-6 aspect-square rounded-full' alt="" />
            ) : (
              <Icon icon='avatar' className='w-6' />
            )}
            <p className='text-grey text-nowrap group-hover:text-light'>{ selectedUser.name }</p>
            <RxCross2
              size={32}
              className='text-grey hover:text-light h-full aspect-square cursor-pointer' 
              onClick={() => setSelectedUser(null)} 
            />
          </div>
        )}
        <input 
          {...props} 
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className='w-full py-2 px-4 rounded-full text-grey bg-secondary border-none outline-none' 
          placeholder='User...'
        />
        { inputValue !== '' && (
          <RxCross2 
            size={24} 
            className='absolute top-2 right-6 text-grey hover:text-light cursor-pointer' 
            onClick={() => setInputValue('')} 
          />
        )}
      </div>
      <div 
        className={`absolute top-12 left-0 right-0 w-full bg-secondary flex flex-col max-h-[30vh] overflow-y-auto scrollbar-style ${ isOpen ? 'block': 'hidden' }`}
      >
        { users.map(u => ((!inputValue.trim() || u.name.toLowerCase().includes(inputValue.toLocaleLowerCase())) && u.id !== user?.id) && (
          <div 
            key={u.id}
            className='group w-full flex items-center gap-4 px-4 py-2 hover:bg-grey cursor-pointer'
            onClick={() => {
              setInputValue('');
              setSelectedUser(u)
              setChatWith(u.id);
              setIsOpen(false);
            }}
          >
            { (u?.avatar || u?.image) ? (
              <img src={ u.avatar || u.image || '' } className='w-6 aspect-square rounded-full' alt="" />
            ) : (
              <Icon icon='avatar' className='w-6' />
            )}
            <p className='text-grey group-hover:text-light'>{ u.name }</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSearcher;