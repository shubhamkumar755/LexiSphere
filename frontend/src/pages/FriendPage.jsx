import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

// import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const FriendPage = () => {

  const queryClient=useQueryClient();
  const [outgoingRequestsIds,setOutgoingRequestsIds]=useState(new Set());

  const {data:friends=[], isLoading:loadingFriends}=useQuery({
    queryKey:["friends"],
    queryFn: getUserFriends
  })

  const {data:recommendedUsers=[],isLoading:loadingUsers}=useQuery({
    queryKey:["Users"],
    queryFn: getRecommendedUsers
  })

  const {data:outgoingFriendReqs}=useQuery({
    queryKey:["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs
  })

  const {mutate:sendRequestMutation,isPending}=useMutation({
    mutationFn:sendFriendRequest,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]}),
  });

  useEffect(()=>{
    const outGoingIds=new Set()
    if(outgoingFriendReqs && outgoingFriendReqs.length>0){
      outgoingFriendReqs.forEach((req)=>{
        outGoingIds.add(req.recipient._id);
      })
      setOutgoingRequestsIds(outGoingIds)
    }
  },[outgoingFriendReqs])

  return (

    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        
      </div>
    </div>
  )
}

export default FriendPage

const capitialize=(str)=>str.charAt(0).toUpperCase()+str.slice(1);