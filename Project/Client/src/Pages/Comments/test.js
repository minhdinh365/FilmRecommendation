import React, {useState} from 'react'
import Comment from './comment'


export default function Test() {
    const [CommentLists, setCommentLists] = useState([])
    const updateComment =(newcomment) =>{
        setCommentLists(CommentLists.concat(newcomment))
    }
    const postId ='6149c7b4e7de5927f6881b03'
    return (
        <div>
            <Comment CommentLists = {CommentLists} postId = {postId} refreshFunction = {updateComment}></Comment>
        </div>
    )
}
