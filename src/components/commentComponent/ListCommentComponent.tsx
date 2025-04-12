import { comments } from '@/interfaces/comment';
import { getComments, likeComment, unlikeComment } from '@/utils/createComment';
import React, { useEffect, useState } from 'react'
import { AiFillLike } from "react-icons/ai";
import "./commentStyle.css"
import { FaEdit, FaTrashAlt  } from "react-icons/fa";


interface Props {
    productId: string;
    editComment: (comment: comments) => void;
    deleteComment: (commentId: string) => void;
    userId?: string;
    forceUpdate: boolean;
}
const ListCommentComponent = (props: Props) => {
    const { productId, editComment, userId, deleteComment, forceUpdate } = props;
    const[comments, setComments] = useState<comments[]>([]);
    

    useEffect(() => {
        const fetchComments = async () => {
            try{
                const reponse = await getComments(productId);
                console.log(reponse);
                // setComments(reponse);
            }catch(error){
                console.error('Error fetching comments', error)
            }
        }
        fetchComments();
    },[productId, forceUpdate]);


    const handlePressLike = async (commentId: string, userId: string) => {
        const comment = comments.find((c) => c._id === commentId);
        if (!comment) return;

        const isLiked = comment.likedBy.includes(userId);
        try{   
            if(isLiked) {
                await unlikeComment(commentId, userId);
            } else {
                await likeComment(commentId, userId);
            }

            setComments((prevComments) =>
                prevComments.map((c) =>
                    c._id === commentId
                        ? {
                              ...c,
                              likedBy: isLiked
                                  ? c.likedBy.filter((id) => id !== userId)
                                  : [...c.likedBy, userId],
                              like: isLiked ? c.like - 1 : c.like + 1,
                          }
                        : c
                )
            );
           
        }catch(error) {
            console.error('Error pressing like', error)
        }
    }
  return (
    <div className='mg-t-20'>
       {comments && comments.map((comment, index) => (
           <div key={index}>
                <div className="user_info">
                    <div className="avatar">
                        <img src={comment.user.avatar.path} alt={comment.user.name} />
                    </div>
                    <div className="user_name">
                        <p>{comment.user.name}</p>
                    </div>
                    <div className="icon_group">
                        <div className="edit" onClick={() => editComment(comment)}>
                            {comment.userId === userId && <FaEdit size={20}/>}
                        </div>
                        <div className="delete" onClick={() => deleteComment(comment._id)}>
                            {comment.userId === userId && <FaTrashAlt size={20}/>}
                        </div>
                    </div>
                </div>
                <div className="comment_content">
                    <p>{comment.content}</p>
                </div>
                <div className="like_icon_group">
                    <AiFillLike size={20} className={`like_icon ${comment.likedBy.includes(comment.userId) ? "isLike" : "noLike"}`}
                        onClick={() => handlePressLike(comment._id, comment.userId)}
                    />
                    <span>{comment.like}</span>
                </div>
            </div>
  
       ))}
    </div>
  )
}

export default ListCommentComponent