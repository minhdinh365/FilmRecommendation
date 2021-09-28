import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'



export default function Comment(props) {
    const [comment, setcomment] = useState("")

    const handleChange = (e) => {
        setcomment(e.currentTarget.value)
        console.log(comment)
    }
    const _id ='6149c767e7de5927f6881aff'
    const onSubmit = (e) =>{
        e.preventDefault();

        const varibles ={
            content: comment,
            writer : _id,
            postId: props.postId
        }
        axios.post('http://localhost:5000/comment', varibles)
        .then(response =>{
            if(response.data.susccess){
                setcomment('')
                props.refreshFuntion(response.data.result)
            }
            else{
                alert('Fail to save')
            }
        })

    }
    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/* Comment List
            Comment Form */}
            {console.log(props.CommentLists)}   
            <form className ="form-comment" onSubmit ={onSubmit}>
                <input className ="input-comment"
                        onChange={handleChange}
                        placeholder = " Bạn đang nghĩ gì!"
                        value = {comment}
                ></input>
                <button className ="button-comment" onClick ={onSubmit}>Bình luận</button>
            </form>
        </div>
    )
}
