import React, { useState, useRef } from 'react'
import { useAppSelector } from "@/lib/store"; 
import "./commentStyle.css"
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Swal from "sweetalert2";
import { comments, postComment } from '@/interfaces/comment';
import { createComment, deleteComment, updateComment } from '@/utils/createComment';
import ListCommentComponent from './ListCommentComponent';

interface Props {
    productId: string;
}

const CommentComponent = (props: Props) => {
    const { productId } = props;
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const [content, setContent] = useState('');
    const [like, setLike] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [editedComment, setEditedComment] = useState<comments>()
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [forceUpdate, setForceUpdate] = useState(false);


    const handleSubmitComment = async () => {
        if(!currentUser) {
            alert("Bạn cần phải đăng nhập để đánh giá");
        }else if(content === '') {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng nhập nội dung bình luận",
                icon: "info",
            });
        }else {
           try{
                const comment: postComment = {
                    content,
                    like
                }
                setContent('');
                
                await createComment(productId, currentUser._id, comment);
                Swal.fire({
                    title: "Thông báo",
                    text: "Bạn đã gửi đánh giá thành công",
                    icon: "success",
                });
                setForceUpdate(!forceUpdate); // Tự đông refresh lại danh sách bình luận khi gửi bình luận thành công
           }catch(error) {
             Swal.fire({
                 title: "Thông báo",
                 text: "Có l��i xảy ra. Vui lòng thử lại",
                 icon: "error",
                 confirmButtonText: "Ok",
             });
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
        if (!editedComment || !content) {
            
            return;
        }

        try {
            await updateComment(editedComment._id, editedComment.userId, content);
            setIsEditable(false);
            setContent("");
            Swal.fire({
                title: "Thông báo",
                text: "Bạn đã sửa bình luận thành công",
                icon: "success",
            });
            setForceUpdate(!forceUpdate); // Tự đông refresh lại danh sách bình luận khi sửa bình luận thành công
        } catch(error) {
            Swal.fire({
                title: "Thông báo",
                text: "Có l��i xảy ra. Vui lòng thử lại",
                icon: "error",
                confirmButtonText: "Ok",
            });
            console.error(error);
            return;
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        try {
            if (currentUser?._id) {
                await deleteComment(commentId, currentUser._id);
            } else {
                Swal.fire({
                    title: "Thông báo",
                    text: "Người dùng không hợp lệ. Vui lòng đăng nhập lại.",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
            Swal.fire({
                title: "Thông báo",
                text: "Bạn đã xóa bình luận thành công",
                icon: "success",
            });
            setForceUpdate(!forceUpdate); // Tự đông refresh lại danh sách bình luận khi xóa bình luận thành công
        } catch(error) {
            Swal.fire({
                title: "Thông báo",
                text: "Có l��i xảy ra. Vui lòng thử lại",
                icon: "error",
                confirmButtonText: "Ok",
            });
            console.error(error);
            return;
        }
    }


  return (
    <div className='comment_container'>
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