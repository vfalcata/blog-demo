import React from "react";


//takes comments from a post object which is retrieved in PostList.js with the QUERY SERVICE
const CommentList = ({comments})=>{
//NO LONGER NEDDED SINCE QUERY SERVICE IS USED TO JOIN EVERYTHING AND THE COMMENTS ARRAY IS PASSED DIRECTLY
    //THIS MAKES IT SO THAT A SINGLE POST CALL CAN BE USED TO GET ALL THE COMMENTS INSTEAD OF A POST CALL FOR EACH COMMENT
    // const [comments, setComments] = useState([])
    // const fetchComments = async ()=>{
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    //     setComments(res.data)
    // }
    // useEffect(()=>{fetchComments()},[])

    const renderedComments = comments.map(comment =>{
        let content;
        if (comment.status === 'approved'){
            content = comment.content
        }
        if (comment.status === 'pending'){
            content = 'This comment is awaiting moderation'
        }

        if(comment.status === 'rejected'){
            content = 'This comment has been rejected'
        }
            return <li key={comment.id}>{content}</li>
        //because we are building a list react is going to expect a key property assigned to it
        })
    return <ul>
        {renderedComments}
    </ul>
}

export default CommentList;