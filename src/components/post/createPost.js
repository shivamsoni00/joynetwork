import React, { useEffect, useState } from 'react'
import * as postActions from '../../actions/post'
import { useSelector, useDispatch } from 'react-redux'
import { useFiles } from '../../hoooks/useFiles';

function CreatePost() {
    const [status, setStatus] = useState('');
    const [mediaUrl, setMediaURL] = useState('')
    const [opa, setOpa] = useState(false)
    const [delete_token, setDeleteToken] = useState('')

    const dispatch = useDispatch()
    const { uploadFiles } = useFiles()
    const { ...state } = useSelector(state => state)

    async function handleimgFileChange(e) {
        await uploadFiles(e.target.files[0], setMediaURL, setOpa, setDeleteToken)
    }

    console.log('statehere', state)

    const handlecreatePost = async (e) => {
        e.preventDefault();
        let postData;
        if (mediaUrl || status) {
            postData = { content: { status: status, postMedia: mediaUrl } }
             dispatch(postActions?.createPost(postData, () => {
                console.log('createing post')
            }))
        }
        setTimeout(() => {
            setStatus('');
            setMediaURL('')
        }, 500)
    }

    const handlepostContent = (e) => {
        const val = e.target.value;
        setStatus(val)
    }
    return (
        <div className=''>
            <div className="p-6 max-w-lg mx-auto bg-gray-600 rounded-xl shadow-lg flex bg-cream mt-3">
                <div className='flex space-x-12'>
                    <div className="shrink-">
                        <span className="h-12 w-12 rounded-full bg-gray-dark"><img className='h-12 w-12 rounded-full' src={state?.settings?.currentUser?.profileImage?.url} /></span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <textarea value={status} onChange={(e) => handlepostContent(e)} placeholder='what is in your mind' className='w-80 h-32 outline-0 border-solid border-2 rounded-md' />
                        <div className='icons flex space-x-3'>
                            <span>
                                <label htmlFor="inputTag">
                                    <img className="h-6 w-6 rounded" src="/img/icon1.svg" alt="emoji" />
                                    <input className='hidden' id="inputTag" type="file" onChange={handleimgFileChange} accept="image/*  video/*" />
                                </label>
                            </span>
                            <img className="h-6 w-6 rounded" src="/img/emoji.png" alt="img" />

                        </div>
                        <button disabled={opa} onClick={handlecreatePost} className={`button bg-black rounded-md text-cream bg-slate-400 p-2 ${opa && "opacity-5"}`}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
