import React from 'react'
import Postmenuicon from '../../assest/dots.png'

import { useSelector, useDispatch } from 'react-redux';
import { isLikedPost, isBookmarkedPost } from './utils';
import { Link } from 'react-router-dom';

import * as bookmarkActions from '../../actions/bookmark'
import * as likeDislikes from '../../actions/post'



function SinglePost(props) {
    const { post } = props;
    const { ...state } = useSelector(state => state);
    const dispatch = useDispatch()
    const { bookmarkPosts } = useSelector(state => state?.bookmarkPostReducer)

    // here check like status
    const isLiked = isLikedPost(state?.settings?.currentUser, post?.likes);
    // here check bookmark status
    const isBookmarked = isBookmarkedPost(post?._id, bookmarkPosts);

    const likeposts = (postId) => {
        dispatch(likeDislikes?.likePost(postId, () => {
            console.log('liking the post')
        }))
    }

    const dislikepost = (postId) => {
        dispatch(likeDislikes?.dislikePost(postId, () => {
            console.log('disliking post')
        }))
    }

    const addtobookmark = (postId) => {
        dispatch(bookmarkActions?.addPostToBookMark(postId, () => {
            console.log('adding post to bookmark');
        }))
    }

    const removefrombookmark = (postId) => {
        dispatch(bookmarkActions?.removePostFromBookMark(postId, () => {
            console.log('removing post from bookmark')
        }))
    }


    const handleShareClick = (postId) => {
        window.navigator.clipboard.writeText(
            `${window.location.origin}/post/${postId}`
        );
    };

    return (
        <>
            <div className="p-6 max-w-lg mx-auto bg-gray-600 rounded-xl shadow-lg flex bg-cream mt-3">
                <div className='flex space-x-12'>
                    <div className="shrink-0">
                        <span className="h-10 w-10 rounded-full bg-gray-dark"><img src={post?.profileImage?.url ? post?.profileImage?.url : state?.settings?.currentUser?.profileImage?.url} className='h-10 w-10 rounded-full' alt="profile-img" /></span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className=''>
                            <div className='titles flex flex-row gap-6'>
                                <span className='flex flex-row gap-5'>
                                    <Link to={`/profile/${post?.profileImage?.original_filename}`} className='text-lg'>{post?.username}</Link>
                                    <p className='font-light'>@{post?.firstName}</p>
                                    <p>.1min</p>
                                </span>
                                <span className='flex justify-center items-center'><img id="open-btn" className='h-6 w-5 mb-4 cursor-pointer' src={Postmenuicon} alt='menu-icon' /></span>
                            </div>
                          <p className='text-left about post'>{post?.content?.content?.status}</p>
                           <div className='w-full h-full'>
                           {post?.content?.content?.postMedia && <img src={post?.content?.content?.postMedia} className='w-full max-h-full rounded-sm' alt='postImage' />}
                           </div>
                        </div>
                        <div className='icons flex space-x-20'>
                            <span>
                                {isLiked ? <img onClick={() => { dislikepost(post?._id) }} className="h-6 w-6 rounded" src="/img/filledheart.png" alt="ChitChat Logo" /> : <img onClick={() => { likeposts(post?._id) }} className="h-6 w-6 rounded" src="/img/heart.png" alt="ChitChat Logo" />}
                            </span>
                            <span>
                                {isBookmarked ? <img onClick={() => { removefrombookmark(post?._id) }} className="h-6 w-6 rounded" src="/img/filledbokk.png" alt="ChitChat Logo" /> : <img onClick={() => { addtobookmark(post?._id) }} className="h-6 w-6 rounded" src="/img/bookmark.png" alt="ChitChat Logo" />}
                            </span>
                            <span><Link to={`/post/${post?._id}`}> <img className="h-6 w-6 rounded" src="/img/comment.png" alt="ChitChat Logo" /></Link>
                            
                            </span>
                            <img onClick={() => { handleShareClick() }} className="h-6 w-6 rounded" src="/img/share.png" alt="ChitChat Logo" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost
