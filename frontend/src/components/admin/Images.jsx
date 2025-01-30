import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaTimes } from 'react-icons/fa'

export default function Images({ isMulti, onImageSelect, imageUrl }) {

    const [previewSrc, setPreviewSrc] = useState(imageUrl ?? null)

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        if (file) {
            onImageSelect(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setPreviewSrc(e.target.result)
            }
        }
    }, [])

    const ImageRemove = (e) => {
        e.stopPropagation()
        setPreviewSrc(null)
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    return (
        <div className='col-span-1 border rounded p-3 cursor-pointer'>
            <div {...getRootProps()} >
                <input {...getInputProps()} multiple={isMulti} accept={'image/png ,image/jpg,image/jpeg'} />
                {
                    previewSrc == null
                        ? isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Upload Image</p>
                        :
                        <div className='relative'>
                            <img className='max-h-[250px]' src={previewSrc} alt='Main_Image' />
                            <button className='absolute top-0 right-0 bg-white'><FaTimes onClick={ImageRemove} /> </button>
                        </div>
                }
            </div>
        </div>
    )
}
