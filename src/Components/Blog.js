// import { type } from "@testing-library/user-event/dist/type";
import { useState,useRef ,useEffect, useReducer} from "react";


function blogsReducer(state,action) {
    switch(action.type) {
        case "ADD":
            return [action.blog,...state];
        case "DELETE":
            return state.filter((blog,index)=> index !== action.index); 
        default:
            return []      
    }
}

export default function Blog(){

    // const [title,setTitle]= useState(" ");
    // const [content,setContent]= useState(" ");
    const [formData,setFormData]= useState({title:"",content:""});
    // const [blogs,setBlogs]=useState([]);
    const[blogs,dispatch]=useReducer(blogsReducer,[]);
    const titleRef=useRef(null);

useEffect(()=>{
    titleRef.current.focus()
},[])

useEffect(()=>{
    if(blogs.length && blogs[0].title){
        document.title=blogs[0].title;
    }else{
        document.title ="NO blogs";
    }
},[blogs])

    function handleSubmit(e){
        e.preventDefault();
        // setBlogs([{title:formData.title,content:formData.content},...blogs]);
        // setTitle("");
        // setContent("");
        dispatch({type:"ADD", blog:{title:formData.title,content:formData.content}})
        setFormData({title:"",content:""})
        titleRef.current.focus();
        console.log(blogs);
        
    }
    function removeBlogs(i){
        dispatch({type:"DELETE",index:i })

        // setBlogs(blogs.filter((blog,index)=> i!==index))

    }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                required
                                ref={titleRef}
                                onChange={(e)=>setFormData({title:e.target.value,content:formData.content})} 

                                />
                </Row >
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.." 
                                value={formData.content}
                                required
                                onChange={(e)=>setFormData({title:formData.title,content:e.target.value})} />
                </Row >
                <button className = "btn">ADD</button>
            </form>                   
        </div>
        <hr/>
        <h2> Blogs </h2>
        {blogs.map((blog,i)=>(
<div className="blog" key={i}>
    <h3>{blog.title}</h3>
     <p>{blog.content}</p> 
     <div className="blog-btn">
     <button  className="btn remove"   onClick={()=>removeBlogs(i)}>
        Delete
     </button>
     </div>
</div>
       ))}
        </>
        )
    }
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
