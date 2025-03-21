import React, { useState } from 'react'
import { useAppSelector } from "@/lib/store"; 
import "./commentStyle.css"
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Swal from "sweetalert2";
import { postComment } from '@/interfaces/comment';
import { createComment } from '@/utils/createComment';
import ListCommentComponent from './ListCommentComponent';

interface Props {
    productId: string;
}

const CommentComponent = (props: Props) => {
    const { productId } = props;
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const [content, setContent] = useState('');
    const [like, setLike] = useState(0);

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
  return (
    <div className='comment_container'>
        <div className="comment_box">
            <textarea className='comment_input'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Nhập bình luận của bạn'
            ></textarea>
            <ButtonComponent label='Gửi' onClick={handleSubmitComment}
                style={{backgroundColor: '#4C75FC', padding: 5, maxWidth: 50, color: 'white'}}    
            ></ButtonComponent>
        </div>
        <div className="comment_list">
            <ListCommentComponent productId={productId}></ListCommentComponent>
        </div>
    </div>
  )
}

export default CommentComponent