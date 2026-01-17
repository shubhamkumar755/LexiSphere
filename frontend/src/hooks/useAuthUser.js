import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api.js';

const useAuthUser = () => {
    // Tanstack query
    const authUser=useQuery({
        queryKey:["authUser"],
        queryFn:getAuthUser,
        retry:false // auth check, check only one time
  });

  return {isLoading:authUser.isLoading, authUser:authUser.data?.user};
}

export default useAuthUser
