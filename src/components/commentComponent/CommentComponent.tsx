import React, { useState, useRef } from 'react'
import { useAppSelector } from "@/lib/store"; 
import "./commentStyle.css"
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { comments, postComment } from '@/interfaces/comment';
import { createComment, deleteComment, updateComment } from '@/utils/createComment';
import ListCommentComponent from './ListCommentComponent';
import { toast } from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { RatingStar } from '@/models/ProductModel';

interface Props {
    productId: string;
    starRating?: RatingStar;
    reloadPage?: () => void;
}

const CommentComponent = (props: Props) => {
    const { productId, starRating, reloadPage} = props;
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const [content, setContent] = useState('');
    const [like, setLike] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [editedComment, setEditedComment] = useState<comments>()
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [ratingStar, setRatingStar] = useState(0)
    
    


    const handleSubmitComment = async () => {
        if(!currentUser?._id) {
            toast.error("Bạn cần phải đăng nhập để đánh giá");
        }else if(content === '') {
            toast.error("Bạn cần nhập bình luận để đánh giá");
        }else if(ratingStar === 0) {
            toast.error("Bạn cần chọn sao để đánh giá");
        } else{
           try{
                const comment: postComment = {
                    content,
                    like,
                    ratingStar
                }
                setContent('');
                
                await createComment(productId, currentUser._id, comment);
                toast.success("Bạn đã gửi đánh giá thành công");
                setForceUpdate(!forceUpdate); // Tự đông refresh lại danh sách bình luận khi gửi bình luận thành công
                reloadPage?.();
           }catch(error) {
             
             console.error(error);
             return;
           }
        }
    }

    const handleEditComment = (comment: comments) => {
        setContent(comment.content);
        setEditedComment(comment);
        setIsEditable(true);
        setTimeout(() => {
            inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            inputRef.current?.focus(); // Đặt focus vào input
        }, 100);
    }

    const saveEditComment = async() => {
        toast.success("Đây là test");
        if (!editedComment || !content) {
            
            return;
        }

        try {
            await updateComment(editedComment._id, editedComment.userId, content);
            setIsEditable(false);
            setContent("");
            toast.success("Bạn đã sửa bình luận thành công");
            setForceUpdate(!forceUpdate); // Tự đông refresh lại danh sách bình luận khi sửa bình luận thành công
            reloadPage?.();
        } catch(error) {
            toast.error("Có lỗi xải ra, vui lòng thử lại!")
            console.error(error);
            return;
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        try {
            if (currentUser?._id) {
                await deleteComment(commentId, currentUser._id);
            } else {
                toast.error("Người dùng không hợp lệ, vui lòng đăng nhập lại")
            }
            toast.success("Bạn đã xóa bình luận thành công");
            setForceUpdate(!forceUpdate); // Tự đông refresh lại danh sách bình luận khi xóa bình luận thành công
            reloadPage?.()
        } catch(error) {
           toast.error("Có lỗi xảy ra, vui lòng thử lại");
            console.error(error);
            return;
        }
    }


  return (
    <div className='comment_container'>

        <div className="star_rating_box">
            <StarRatings
                rating={ratingStar}
                starRatedColor="#FFD700"
                changeRating={(newRating) => setRatingStar(newRating)}
                numberOfStars={5}
                starDimension="24px"
                starSpacing="3px"
            />
        </div>
        <div className="comment_box">
            <textarea className='comment_input'
                ref={inputRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Nhập bình luận của bạn'
            ></textarea>
            {!isEditable ? 
            <ButtonComponent label='Gửi' onClick={handleSubmitComment}
                style={{backgroundColor: '#4C75FC', padding: 5, maxWidth: 50, color: 'white'}}    
            ></ButtonComponent> : 
            <ButtonComponent label='Lưu' onClick={saveEditComment}
                style={{backgroundColor: '#4C75FC', padding: 5, maxWidth: 50, color: 'white'}}    
            ></ButtonComponent>}
        </div>
        <div className="comment_list">
            <ListCommentComponent productId={productId} 
                editComment={handleEditComment} 
                userId={currentUser?._id}
                deleteComment={handleDeleteComment}
                forceUpdate={forceUpdate}
                ></ListCommentComponent>
        </div>
    </div>
  )
}

export default CommentComponent